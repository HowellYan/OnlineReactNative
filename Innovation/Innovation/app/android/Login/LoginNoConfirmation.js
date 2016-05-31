import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	Image,
	ToastAndroid,
	AsyncStorage,
	TouchableHighlight,
	Alert,
	Navigator,
	View
} from 'react-native';
var {NativeModules}=require('react-native');
var requestParams = NativeModules.RequestParamsController;


var base = require('../../lib/base');
var styles = require('../../lib/android/css/pageView');
var global = require('../../lib/global');
var userID=null, pwd=null, verifyCode=null, thisObj=null;

import LoginConfirmation from './LoginConfirmation';
import main from '../main/mainView';


class LoginNoConfirmation extends React.Component {
	
	
	login(url,params) {
		 console.log(url+'OK Pressed!'+params)
	}
	
	render() {
		thisObj = this;
		this._openPage = function() {
			this.props.navigator.replace({
				title: 'LoginConfirmation',
				component: LoginConfirmation
			})
		}
		//登陆
		this._onPressButton = function(){
			requestParams.setCPSServiceParams('MLgn001',{
			      'staffCode': userID,
			      'password': pwd,
			      'serviceType': 'PAYEAST_ANDRI_CLIENT_LOGIN'
			    },false,(url,strJson)=> fetch(url, {
			    method: 'POST',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json',
			    },
			    body: strJson
			}).then((response) => response.text()).then((responseText) => {
				var json=JSON.parse(responseText);
			    Alert.alert(
			        'Alert Title',
			        responseText,
			        [
			          {text: 'OK', onPress: () => console.log('OK Pressed!')},
			        ]
			      )
			    if(json['code']=='011011' || json['code']=='011012' || json['code']=='020007'){
			    	//页面跳转 params传给下一个页面的值，component下一个页面的view
					thisObj.props.navigator.replace({
						params: {
							title:'LoginConfirmation',
							userIDVer:userID
						},
						component: LoginConfirmation
					})
				}

			      console.log(responseText);
			}).catch((error) => {
			      console.warn(error);
			}))
		}
		
		return (
			<View style={styles.container}>
	        <TextInput style={[styles.textInput, styles.marginLine]}
	        	placeholder="Email或手机号码"
	        	clearButtonMode="always"
	        	onChangeText={(text) => userID=text} />
	        <TextInput style={[styles.textInput, styles.marginLine]}
	        	placeholder="密码"
	        	secureTextEntry={true}
	        	clearButtonMode="always"
	        	onChangeText={(text) => pwd=text} />
	        <TouchableHighlight underlayColor={'#f07000'} style={[styles.touchable, styles.marginLine]} onPress={this._onPressButton.bind(this)}>
	            <View><Text style={styles.buttonTxt}>确定</Text></View>
	        </TouchableHighlight>
	      	</View>
		);
	}
}


export default LoginNoConfirmation;