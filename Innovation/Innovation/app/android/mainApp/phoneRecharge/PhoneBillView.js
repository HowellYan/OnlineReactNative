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
var requestParams = NativeModules.RequestParamsController;
import orderView from '../orderView/orderView';

var styles = null, prCss = null;
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
prCss = require('./phoneRechargeCSS');
var global = require('../../../lib/global');
var Lang = require('../../../lib/lang');
var userInfo = {}, staffCode = null, gobalValue = {}, order={};
const btn_clear = require('../../../lib/img/btn_clear.png');
var teleCharge = {
  CHINAMOBILE:['10元','30元','50元','100元','200元','300元','500元'],
  CHINATELECOM:['30元','50元','100元','300元','500元','其他金额'],
  CHINAUNICOM:['30元','50元','100元','300元','500元']
}

class PhoneBillView extends Component {
	constructor(props) {
	    super(props);
	    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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

    //话费类别渲染行
  	_renderRow(rowData: string, sectionID: number, rowID: number){
	    return (
	      <TouchableHighlight underlayColor={'rgba(255,255,255,0)'} onPress={this._selectChange.bind(this,rowData,rowID)}>
	      	  <View style={[prCss.flowListView,{width:Dimensions.get('window').width/3-21.3}, rowID == this.state.rowID && prCss.borderGreen]}>
	      	  	  <View style={prCss.flowsubview}>
		      	  	  <View><Text style={prCss.flowtext}>{rowData}</Text></View>
	              </View>
	      	 </View>
	      </TouchableHighlight>
	    );
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
	              this.setState({phoneadress: json.provinceName + json.cityName + json.actionName});
	              this.setState({showPhoneadress: true});

	              //显示数据
	              this._onDataArrived(json.actionCode);
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
  		if(data === '1000'){ //电信1000 
  			ds = teleCharge.CHINATELECOM;
  			//显示其他金额(5-500元)
  		}else if(data === '2000'){ //联通2000 
  			ds = teleCharge.CHINAUNICOM;
  		}else if(data === '3000'){ //移动3000
  			ds = teleCharge.CHINAMOBILE;
  		}

        this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(ds)
		});
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

			//免密交易查询
			this._callQuickTradingQuery();
  		}
  	}

  	//设置选择金额
  	_selectCost(cost){
  		order['cost'] = cost;
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
			this._callQuickTradingQuery();
		}
	}

	//页面跳转 params传给下一个页面的值，component下一个页面的view
	_gotoPage(component, name){
		this.props.navigator.push({
			params: {
				title:name,
				phoneNo:this.state.phone,
				payMoney:order.cost
			},
      		title:name,
			component: component
		});
	}

	//免密交易查询
	_callQuickTradingQuery(){
		//请求参数
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

				//跳转到订单页面
				this._gotoPage(orderView, '订单详情');
		  }
		})
		.catch(error => {
		  console.warn(error);
		}));
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