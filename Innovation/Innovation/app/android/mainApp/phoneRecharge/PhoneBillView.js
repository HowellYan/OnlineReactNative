'use strict';

import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  ListView,
  BackAndroid,
  Dimensions,
  Navigator,
  NativeModules,
  View
} from 'react-native';

import orderView from '../orderView/orderView';
import finishpage from '../finishpage/finishpage';
let requestParams = NativeModules.RequestParamsController;
let getString = NativeModules.GetStringController;

let styles = null; 
let prCss = null;
let self = null;
let userInfo = {};
let staffCode = null;
let promise = null;
let gobalValue = {}; 
let order={};
let global = require('../../../lib/global');
let Lang = require('../../../lib/lang');
let reqHttp = require('../../../lib/reqHttp');
prCss = require('./phoneRechargeCSS');

if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
const btn_clear = require('../../../lib/img/btn_clear.png');

let teleCharge = {
  CHINAMOBILE:['10元','30元','50元','100元','200元','300元','500元'],
  CHINATELECOM:['30元','50元','100元','300元','500元','其他金额'],
  CHINAUNICOM:['30元','50元','100元','300元','500元']
}

class PhoneBillView extends Component {
	constructor(props) {
	    super(props);

	    self = this;

	    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	    this.state = {
	      	language: 'js',
        	phone:'',
        	phoneadress:'',
        	showPhoneadress:false,
        	dataSource,
        	showButton:false,
        	selectedValue:''
	    };
	    AsyncStorage.getItem("userInfo", (err, result) => {
	        userInfo = JSON.parse(result);
      	});
		AsyncStorage.getItem("staffCode", (err, result) => {
	        staffCode = JSON.parse(result);
	        console.log("staffCode:"+staffCode);
      	});
  	}
  	
  	//手机归属地查询
	_textInputChange(phone){

	    if(phone.length===11){ 
	      //清空数组
	      this.setState({
	      	dataSource: this.state.dataSource.cloneWithRows([''])
	      });
	      //取消焦点
  		  this._blurSelfField('huafei_input');

	      //请求参数
	      let params = {
	          "type": "50",  //1:固话 3:宽带 50:手机
	          "isQryUserInfo": "Y",  //Y：查询 其他都不查询
	          "phone" : ""+phone,
	          "staffCode" : ""+staffCode,
	          "userInfo" : userInfo
	      };

	      //手机归属地查询
	      requestParams.setCPSServiceParams('SPhn004',params,true,(url,strJson)=> fetch(url, {
	          method: 'POST',
	          headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	          },
	          body: strJson
	      })
	      .then(response => response.text())
	      .then(responseText => {
	          Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
	          let json = JSON.parse(responseText);
	          if(json['code']==global.RES.SUCCESS){

				    this.setState({showPhoneadress: true});

		          	if(!json.actionName){
		          		this.setState({phoneadress: '未能查询到运营商'});
		          	}else{
						this.setState({phoneadress: json.provinceName + json.cityName + json.actionName});

						order={}; //reload object

						//显示数据
	              		this._onDataArrived(json.actionCode);     		
		          	}

	              
	          }
	      })
	      .catch(error => {
	          console.warn(error);
	      }));
	    }else{ 
	    	this.setState({
	    		showPhoneadress: false,
	    		rowID:'',
	    		showButton:false,
	    	});
	    }
	}

	//显示数据
  	_onDataArrived(data){
  		let ds = null;
  		if(data === '1000'){ 

  			//电信1000 显示其他金额(5-500元)
  			ds = teleCharge.CHINATELECOM;
  			order['RECHARGETYPE'] = '03010008';
			order['pecProductCode'] = '00000008';

  		}else if(data === '2000'){ 

  		    //联通2000 
  			ds = teleCharge.CHINAUNICOM;
  			order['RECHARGETYPE'] = '04010010';
			order['pecProductCode'] = '00000010';

  		}else if(data === '3000'){ 

  		    //移动3000
  			ds = teleCharge.CHINAMOBILE;
  			order['RECHARGETYPE'] = '04010011';
			order['pecProductCode'] = '00000009';

  		}

        this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(ds)
		});
  	}

	//溢价查询
	_getPremium(){
		let params = {
		  "staffCode" : ""+staffCode,
		  "userInfo" : userInfo,
		  "actionCode": order['RECHARGETYPE'],
          "faceAmount": Lang.yuan2fen(order['cost']),
		  "phone": this.state.phone,
          "prodCode": "003"
		};

		requestParams.setCPSServiceParams('SPrm001',params, true, (url,strJson)=> fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: strJson
		})
		.then(response => response.text())
		.then(responseText => {
		    Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
		    let json = JSON.parse(responseText);
		    if(json['code']==global.RES.SUCCESS){
			    let retFaceAmount = json.amount;
			    let retPremium = json.concession;

			    //充值应该收的金额溢价之后
			    order['rechargeAmount'] = retFaceAmount * 1 + retPremium * 1; 

			    //免密交易查询
				this._callQuickTradingQuery();
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	//免密交易查询
	_callQuickTradingQuery(){
		let params = {
		  "staffCode" : ""+staffCode,
		  "userInfo" : userInfo
		};

		requestParams.setCPSServiceParams('SQtran003',params, true, (url,strJson)=> fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: strJson
		})
		.then(response => response.text())
		.then(responseText => {
		  Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
		  let json = JSON.parse(responseText);
		  if(json['code']==global.RES.SUCCESS){

		  		let amount = order.cost;
		  		amount = Lang.yuan2fen(amount);
				const perAmount = json.perAmount*1;
				const allAmount = json.allamount*1;
				const allTransAction = json.alltransaction*1;
				if (amount <= perAmount && (amount + allTransAction) <= allAmount) {
					//	免密
					order['noPwd'] = false;
				} else {
					//	加密
					order['noPwd'] = true;
				}

				this._getCommission();
		  }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	//酬金查询
	_getCommission(){

		let param = {}
		param.busType = global.BUS_TYPE.BUS_TYPE_TEL;
		param.busiCode = order['RECHARGETYPE'];
		param.productCode = order['RECHARGETYPE'];
		param.amount = order['cost'];
		param.showLoading = false;
		param.supplyCode = false;
		param.pecProductCode = order['pecProductCode'];
		param.objCode = this.state.phone;
		param.staffCode = ''+staffCode;
		param.userInfo = userInfo;

		reqHttp.getCommission(param, function(result) {

			let retJson = result;

			//未找到酬金结算方式，不进行酬金计算, 也当做成功了，酬金为零
			if (result.code === global.RES.SUCCESS) {
				retJson.commission = Lang.fen2yuan(result.reward);
			} else if (result.code === '004010') {
				retJson.code = global.RES.SUCCESS;
				retJson.commission = '0.00';
			} else {
				retJson.code = global.RES.UNKNOWN_ERROR;
				retJson.content = global.RES.UNKNOWN_ERROR_MSG;
			}

			order['reward'] = retJson.commission;
			order['supplyCode'] = retJson.supplyCode;

	        if(userInfo.authenStatus == 'A02'){
	            if (userInfo.hadEpt == 1) {

	            	//企业理财用户理财产品列表接口(SEpt012)
	                self._getFinancialProducts(); 
	            } else {

	            	//资金账户余额查询 SAcc003
	               self._fundAccountBalanceInquiry(); 
	            }
	        }else{

	        	//资金账户余额查询 SAcc003
	            self._fundAccountBalanceInquiry(); 
	        }
		})
	}

	//企业理财
	_getFinancialProducts(){

		let params = {
		  "staffCode" : ""+staffCode,
		  "userInfo" : userInfo
		};

		requestParams.setCPSServiceParams('SEpt012',params, true, (url,strJson)=> fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: strJson
		})
		.then(response => response.text())
		.then(responseText => {
		    Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
		    let json = JSON.parse(responseText);
		    if(json['code']==global.RES.SUCCESS){

				let list = json['datas']; //用户产品列表
				for (let i = 0; i < list.length; i++) {
					order['productId'] = list[i]['productId']; //产品ID
					order['userId'] = list[i]['userId']; //userId
					order['tyb_amount'] = Lang.fen2yuan(list[i]['balance']); //添益宝余额
				}

				//资金账户余额查询
				this._fundAccountBalanceInquiry();
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	//资金账户余额查询
	_fundAccountBalanceInquiry(){

		let params = {
		  "staffCode" : ""+staffCode,
		  "userInfo" : userInfo,
		  'bankMode': userInfo.bankMode
		};

		requestParams.setCPSServiceParams('SAcc003',params, true, (url,strJson)=> fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: strJson
		})
		.then(response => response.text())
		.then(responseText => {
		    Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
		    let json = JSON.parse(responseText);
		    if(json['code']==global.RES.SUCCESS){

		  		let {dayLimit, dayTotal, monthLimit, monthTotal, motherBoard, accountItems} = json;
				let dayLimit_dayTotal = dayLimit * 1 - dayTotal * 1; //当日限额 - 当日累积
				let monthLimit_monthTotal = monthLimit * 1 - monthTotal * 1; //当月限额 - 当月累积

				for (let i = 0; i < accountItems.length; i++) {
					let acct = accountItems[i]['acctType'];
					if (!!acct) {
						if ("0007" == acct) { //0001：基本账户;0007：IPOS账户;0110：酬金账户
							let activeBalance = accountItems[i].activeBalance; //账户可用余额
							order['jfy_amount'] = Lang.fen2yuan(activeBalance);
							break;
						}
					}
				}

				if (global.CARD_TYPE.BANK_MODE_FUND_POOL_MEMBER_CARD === userInfo.bankMode) {

					let sub_bankMode = '';

					if(dayLimit === '0'){ 
						sub_bankMode = motherBoard;
					}else if(motherBoard > dayLimit_dayTotal){ //母卡余额 > (当日限额 - 当日累积)
						sub_bankMode = dayLimit_dayTotal;
					}else{  //母卡余额 < (当日限额 - 当日累积)
						sub_bankMode = motherBoard;
					}

					if(monthLimit === '0'){ 
						sub_bankMode = motherBoard;
					}else if(motherBoard > monthLimit_monthTotal){ //母卡余额 > (当月限额 - 当月累积)
						sub_bankMode = monthLimit_monthTotal;
					}else{ //母卡余额 < (当月限额 - 当月累积)
						sub_bankMode = motherBoard;
					}

					order['jfy_amount'] = Lang.fen2yuan(sub_bankMode);
				}

				let params = {
					title: '订单详情',
					phoneNo: this.state.phone,
					payMoney: order.cost,
					reward: order['reward'],
					hadEpt: userInfo.hadEpt,
					jfy_amount: order['jfy_amount'],
					tyb_amount: order['tyb_amount'],
					callback: this._encryptPassword //充值
				}

		  	    //跳转到订单页面
				this._gotoPage(orderView, '订单详情', params);
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	_encryptPassword(password, costWay){

		order['costWay'] = costWay;

		let encryptPassword = null;
		reqHttp.getRandNum('N', (json) => {
			let params = {};
            params['staffCode'] = ''+staffCode;
            params['password'] = password;
            params['randNum'] = json["randNum"];
            params['isNewFlow'] = 'N';
            promise = new Promise(function(resolve, reject){
	            getString.getEncryptPassword(params, (encryptPasswordStr) => {
	            	console.log("encryptPasswordStr==" + encryptPasswordStr);
	            	resolve(encryptPasswordStr);
	            });
            });

            promise.then(function(encryptPasswordStr){
            	self._rechargeResp(encryptPasswordStr);
            });
		});
	}

	//千行手机充值
	_rechargeResp(encryptPasswordStr){

		let params = {
			"staffCode" : ''+staffCode,
			"userInfo" : userInfo,
			"payPassword": encryptPasswordStr,
			"phone": this.state.phone,
			"rechargeAmount": Lang.yuan2fen(order['cost']),
			"rechargeType": order['RECHARGETYPE'],
			"tradeTime": Lang.getDate_YYYYMMDD() + '' + Lang.getTime_HHMMSS(),
			"txnAmount": order['rechargeAmount'],
			"supplyCode": order['supplyCode']
		};

		if(userInfo.hadEpt == 1){
			params.costWay = order['costWay']; //0是交费易  1是添益宝
			params.productId = '0030001';
			params.userId = order['userId'];
		}

		requestParams.setCPSServiceParams('TPhn001',params, true, (url,strJson)=> fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: strJson
		})
		.then(response => response.text())
		.then(responseText => {
		    Alert.alert('Alert Title',responseText,[{text: 'OK', onPress: () => console.log('OK Pressed!')}])
		    let json = JSON.parse(responseText);
		    if(json['code']==global.RES.SUCCESS){
		  		//成功
		  		console.log("充值成功");

		  		//付款详情
		  		let params = {
		  			pageType: 'success'
		  		}
				this._gotoPage(finishpage, '付款详情', params);
		    }else if(json['code'] === '009002'){

		    	//付款详情
		  		let params = {
		  			pageType: 'accept'
		  		}
				this._gotoPage(finishpage, '付款详情', params);
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	//页面跳转 params传给下一个页面的值，component下一个页面的view
	_gotoPage(component, name, params){
		this.props.navigator.push({
			params: params,
      		title:name,
			component: component
		});
	}

  	//设置选择金额
  	_selectCost(cost){
  		order['cost'] = cost;
  	}

  	//选择话费样式变化
  	_selectChange(rowData,rowID){
  		this.setState({rowID:rowID});
  		if(rowData === '其他金额') {
  			this.setState({showButton:true});
  		}else{
  			this.setState({showButton:false});
  			let cost = (rowData).replace('元','');

			//设置选择金额
			this._selectCost(cost);

			//溢价查询
			this._getPremium();
  		}
  	}

   	//验证充值金额(其他金额)
	_verifyCost(){ 
		if(this.state.selectedValue.length===0){
			ToastAndroid.show('请输入金额！', ToastAndroid.SHORT);
		}else if(this.state.selectedValue<5 || this.state.selectedValue>500){
			ToastAndroid.show('充值金额已超出范围！', ToastAndroid.SHORT);
		}else{
			//设置选择金额
			this._selectCost(this.state.selectedValue);

			//免密交易查询
			this._getPremium();
		}
	}


  	//显示话费列表
  	_showListView(){
  		if(!!this.state.showPhoneadress){ 
	  		return(
		        <ListView
		        contentContainerStyle={prCss.listView_warp}
		        dataSource={this.state.dataSource}
		        renderRow={this._renderRow.bind(this)}
		        />
	  		);
  		}
  	}

    //取消焦点
  	_blurSelfField(selfField) {
        this.refs[selfField].blur();
    }

    //输入框输入
    _textInputInput(phone){
      this.setState({phone});
      this._textInputChange(phone);	
    }

    //输入框清空
    _textInputClear(clearREF, callback){
    	this.refs[clearREF].clear();
    	if(!!callback && typeof callback === 'function') {
    		callback();
    	}	
    }

    //显示清空按钮
    _showClearBotton(text,clearREF,callback){
    	if(!!text && text.length>0){
	    	return(
		    	<TouchableOpacity style={prCss.btn_clear} onPress={this._textInputClear.bind(this,clearREF,callback)}>
		          <View>
		            <Image
                     style={prCss.btn_clear_img}
                     source={btn_clear}
                    />
                   </View>
		        </TouchableOpacity>
	    	)
    	}
    }

    //显示号码归属地
  	_showPhoneadress(){
  		if(!!this.state.showPhoneadress){ 
  			return(
  				<View style={prCss.phoneadress}><Text>{this.state.phoneadress}</Text></View>
  			)
  		}
  	}

    //话费类别渲染行
  	_renderRow(rowData: string, sectionID: number, rowID: number){
	    return (
	      <TouchableHighlight 
	       style={[prCss.flowListView,{width:Dimensions.get('window').width/3-21.3}, rowID == this.state.rowID && prCss.borderGreen]} 
	       underlayColor={'rgba(255,255,255,0)'} 
	       onPress={this._selectChange.bind(this,rowData,rowID)}
	       >
      	  	  <View style={prCss.flowsubview}>
	      	  	  <View><Text style={prCss.flowtext}>{rowData}</Text></View>
              </View>
	      </TouchableHighlight>
	    );
    }

	_children(){
		if(this.state.showButton){
			return(
				<View>
					<View style={prCss.input_Wrap}>
						<TextInput style={[prCss.phone_input, prCss.fontsize]}
						autoFocus={true}
						placeholder="请输入金额5-500元" 
						keyboardType={"numeric"} 
						returnKeyType="done"
						onChangeText={cost => {
	                      this.setState({selectedValue: cost.replace(/\s/g, '')});
	                    }}
	                    value={this.state.selectedValue}
	                    ></TextInput>
					</View>
			        <TouchableHighlight underlayColor={'#f07000'} style={[styles.touchable, styles.marginLine]} onPress={this._verifyCost.bind(this)}>
		            	<View><Text style={styles.buttonTxt}>确定</Text></View>
		        	</TouchableHighlight>
		        </View>
			)
		}
	}

	//渲染页面
	render() {
		return(
			<ScrollView>
				<View style={prCss.input_Wrap}>
	              	<TextInput style={[prCss.phone_input, prCss.fontsize]}
	              		ref="huafei_input"
			        	placeholder="请输入手机号码"
			        	autoFocus={true}
			        	maxLength={11}
			        	clearButtonMode="always"
			        	onChangeText={(phone) => {
	                      phone = phone.replace(/\s/g, '');
	                      this.setState({phone});
	                      this._textInputChange(phone);
	                    }}
	                    value={this.state.phone}
			        	keyboardType={"phone-pad"}
			        	/>
			        	{this._showClearBotton(this.state.phone,'huafei_input',() => {this._textInputInput('')})}
		        </View>
		        {this._showPhoneadress()}
		        {this._showListView()}
		        {this._children()}
        	</ScrollView>
		);
	}
}



module.exports = PhoneBillView;