'use strict';

import React, { Component, PropTypes } from 'react';
import {
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
  Picker,
  BackAndroid,
  ListView,
  Navigator,
  Dimensions,
  NativeModules,
  View
} from 'react-native';
import orderView from '../orderView/orderView';
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}

const btn_clear = require('../../../lib/img/btn_clear.png');

let requestParams = NativeModules.RequestParamsController;
let getString = NativeModules.GetStringController;
let prCss = require('./phoneRechargeCSS');
let global = require('../../../lib/global');
let Lang = require('../../../lib/lang');
let reqHttp = require('../../../lib/reqHttp');

let userInfo = {};
let staffCode = null;
let order={};
let styles = null;
let self = null;
let promise = null;
let ChinaTelecom_Data = [
	{'M':'10M', 'Y':'2元', 'V':'10'},
	{'M':'30M', 'Y':'5元', 'V':'30'},
	{'M':'60M', 'Y':'10元', 'V':'60'},
	{'M':'100M', 'Y':'10元', 'V':'100'},
	{'M':'150M', 'Y':'20元', 'V':'150'},
	{'M':'200M', 'Y':'15元', 'V':'200'},
	{'M':'300M', 'Y':'30元', 'V':'300'},
	{'M':'500M', 'Y':'30元', 'V':'500'},
	{'M':'1G', 'Y':'50元', 'V':'1024'}
];
let ChinaMobile_Data = [
	{'M':'10M', 'Y':'3元', 'V':'10'},
	{'M':'30M', 'Y':'5元', 'V':'30'},
	{'M':'70M', 'Y':'10元', 'V':'70'},
	{'M':'500M', 'Y':'30元', 'V':'500'},
	{'M':'1G', 'Y':'50元', 'V':'1024'},
	{'M':'2G', 'Y':'70元', 'V':'2048'},
	{'M':'3G', 'Y':'100元', 'V':'3072'},
	{'M':'4G', 'Y':'130元', 'V':'4096'},
	{'M':'6G', 'Y':'180元', 'V':'6144'}
];
let ChinaUnicom_Data = [
	{'M':'20M', 'Y':'3元', 'V':'20'},
	{'M':'50M', 'Y':'6元', 'V':'50'},
	{'M':'100M', 'Y':'10元', 'V':'100'},
	{'M':'200M', 'Y':'15元', 'V':'200'},
	{'M':'500M', 'Y':'30元', 'V':'500'}
];


class PhoneCurCapView extends Component {
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
          rowID:''
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
  		  this._blurSelfField('liuliang_input');

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

					//运营商
					order['provinceCode'] = json.actionCode;

					//传入数据
					this._onDataArrived();         		
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
	    	});
	    }
	}

  	_showPhoneadress(){
  		if(!this.state.showPhoneadress){ 
  			return null;
  		}else{ 
  			return(
  				<View style={prCss.phoneadress}><Text>{this.state.phoneadress}</Text></View>
  			)
  		}
  	}

  	_renderRow(rowData: string, sectionID: number, rowID: number){
	    return (
	      <TouchableHighlight underlayColor={'rgba(255,255,255,0)'} onPress={this._selectChange.bind(this,rowData,rowID)}>
	      	  <View style={[prCss.flowListView,{width:Dimensions.get('window').width/3-21.3}, rowID == this.state.rowID && prCss.borderGreen]}>
	      	  	  <View style={prCss.flowsubview}>
		      	  	  <View><Text style={prCss.flowtext}>{rowData.M}</Text></View>
		              <View><Text style={[prCss.flowtext,{fontSize:14}]}>{rowData.Y}</Text></View>
	              </View>
	      	 </View>
	      </TouchableHighlight> 
	    );
    }

  	_onDataArrived(){
  		let listViewData = null;

		if('1000' === order['provinceCode']){ //电信号码
			listViewData = ChinaTelecom_Data;
			order['prodCode'] = '00000098';  //电信流量
			order['rechargeType_flow'] = 1;
		}else if('3000' === order['provinceCode']){ //移动号码
			listViewData = ChinaMobile_Data;
			order['prodCode'] = '00000100';  //移动流量
			order['rechargeType_flow'] = 2;
		}else if('2000' === order['provinceCode']){  //联通号码
			listViewData = ChinaUnicom_Data;
			order['prodCode'] = '00000099';  //联通流量
			order['rechargeType_flow'] = 3;
		}
		
        this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(listViewData)
		});
  	}

  	_showListView(){
  		if(!!this.state.showPhoneadress){
	  		return(
		        <ListView
		        ref="2"
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

    //选择话费样式变化
  	_selectChange(rowData,rowID){
  		this.setState({rowID:rowID});

  		let cost = (rowData.Y).replace('元','');

		//设置选择金额
		order['cost'] = cost;

		//充值流量
		order['flow'] = rowData.V;

		//权监类型 0:个人账户 1：3G流量充值   2: 全国电信宽带充值   3：全国电信固话充值   4: 流量包；
		if('1000' === order['provinceCode']){ //电信
			if(rowID == '2' || rowID == '4' || rowID == '6'){
				order['verify'] = 1;
				order['actionCode'] = '03010020';
				order['productCode'] = '0042';
				order['pecProductCode'] = '00000033';
			}else{
				order['verify'] = 4;
				order['actionCode'] = '01010165';
				order['productCode'] = '001250';
				order['pecProductCode'] = '00000098';
			}
		}else if('3000' === order['provinceCode']){ //移动

			order['verify'] = 6;
			order['actionCode'] = '01010165';
			order['productCode'] = '001252';
			order['pecProductCode'] = '00000100';

		}else if('2000' === order['provinceCode']){ //联通

			order['verify'] = 5;
			order['actionCode'] = '01010165';
			order['productCode'] = '001251';
			order['pecProductCode'] = '00000099';

		}

		//免密交易查询
		this._callQuickTradingQuery();
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
				const alltransaction = json.alltransaction*1;
				if (amount <= perAmount && (amount + allTransAction) <= allAmount) {
					//	免密
					order['noPwd'] = false;
				} else {
					//	加密
					order['noPwd'] = true;
				}
                                                                                                                                           
				//酬金查询
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
		param.busiCode = order['actionCode'];
		param.productCode = order['productCode'];
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

				//鉴权
				this._getVerifyResp();
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	//鉴权
	_getVerifyResp(){

		let params = {
			'staffCode' : ''+staffCode,
			'userInfo' : userInfo,
			'verify' : order['verify'],                //鉴权类型
			'acctCode' : this.state.phone,             //验证号码（加受理区域编码）
			'reamount' : Lang.yuan2fen(order['cost']), //充值金额
			'acceptDate' : Lang.getDate_YYYYMMDD(),    //受理日期
			'acceptTime' : Lang.getTime_HHMMSS()       //受理时间
		};

		requestParams.setCPSServiceParams('MTrdAcc001',params, true, (url,strJson)=> fetch(url, {
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

		  	    order['systemNo'] = json.systemNo;

		  	    //跳转到订单页面
				this._gotoPage(orderView, '订单详情');
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));	
	}

    /* 页面跳转 
     * params 传给下一个页面的值
     * component 下一个页面的view
     */
	_gotoPage(component, name){
		this.props.navigator.push({
			params: {
				title: name,
				phoneNo: this.state.phone,
				payMoney: order.cost,
				reward: order['reward'],
				hadEpt: userInfo.hadEpt,
				jfy_amount: order['jfy_amount'],
				tyb_amount: order['tyb_amount'],
				callback: this._encryptPassword //充值
			},
      		title: name,
			component: component
		});
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
            	self._flowRecharge(encryptPasswordStr);
            });
		});
	}

	//流量充值
	_flowRecharge(encryptPasswordStr){

		let params = {
			'staffCode' : ''+staffCode,
			'userInfo' : userInfo,
			'orderNo' : reqHttp.getOrderSeq(),
			'phone' : this.state.phone,
			'rechargeFlow' : order['flow'],
			'rechargeType' : order['rechargeType_flow'],
			'payPassword' : encryptPasswordStr, 
			'systemNO' : order['systemNo'],
			'tradeTime' : Lang.getDate_YYYYMMDD() + '' + Lang.getTime_HHMMSS(),
			'txnAmount' : Lang.yuan2fen(order['cost']),
			'prodCode' : order['prodCode'],
			'actionCode' : '01010165', 
			'supplyCode': order['supplyCode']
		};

		if(userInfo.hadEpt == 1){
			params.costWay = order['costWay']; //0是交费易  1是添益宝
			params.productId = '0030001';
			params.userId = order['userId'];
		}

		requestParams.setCPSServiceParams('TTrdAcc008',params, true, (url,strJson)=> fetch(url, {
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
		    }
		})
		.catch(error => {
		  console.warn(error);
		}));
	}

	render() {
		return(
			<View keyboardShouldPersistTaps={true}>
	            <View style={prCss.input_Wrap}>
	              	<TextInput style={[prCss.phone_input, prCss.fontsize]}
	              	    ref="liuliang_input"
			        	placeholder="请输入手机号码"
			        	maxLength={11}
			        	clearButtonMode="always"
			        	onChangeText={(phone) => {
			        		this._textInputInput(phone);
	                    }}
	                    value={this.state.phone}
			        	keyboardType={"phone-pad"}
			        	/>
			        {this._showClearBotton(this.state.phone,'liuliang_input',() => {this._textInputInput('')})}
		        </View>
		        {this._showPhoneadress()}
		        {this._showListView()}
	        </View>
		);
	}
}

module.exports = PhoneCurCapView;