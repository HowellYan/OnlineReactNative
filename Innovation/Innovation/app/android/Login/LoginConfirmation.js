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
    Platform,
    Alert,
    Navigator,
    BackAndroid,
    View
} from 'react-native';
var { NativeModules } = require('react-native');
var requestParams = NativeModules.RequestParamsController;
var getString = NativeModules.GetStringController;

if (Platform.OS === 'android') {
    styles = require('../../lib/android/css/pageView');
} else {
    styles = require('../../lib/ios/css/pageView');
}

var base = require('../../lib/base');
var reqHttp = require('../../lib/reqHttp');
var global = require('../../lib/global');
var userID = null,
    pwd = null,
    verifyCode = null;

import main from '../main/mainView';

class LoginConfirmation extends React.Component {

    render() {
        thisObj = this;
        var { navigator, title, userIDVer } = this.props;
        userID = userIDVer;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });

        //保存信息
        this._onSaveUserLoginInfo = function(Value) {
            try {
                AsyncStorage.setItem("userInfo", Value);
            } catch (error) {
                console.log(error);
            }
        }


        this._login = function(paramsLogin) {
            var params = {
                'staffCode': userID,
                'custCode': userID,
                'password': paramsLogin['password'],
                'verifyCode': paramsLogin['verifyCode'],
                'isNewFlow': paramsLogin['isNewFlow'],
                'verifyType': '0002',
                'verifyLevel': '000',
                'serviceType': 'PAYEAST_ANDRI_CLIENT_LOGIN'
            };
            if (paramsLogin['isNewFlow'] == 'Y') {
                params['randomCodeIndex'] = paramsLogin['randomCodeIndex'];
            }
            AsyncStorage.setItem("staffCode", userID);
             //请求回调
            var ServiceCallBack = function(Params) {
                if (Params['code'] == global.RES.SUCCESS) {
                    thisObj._onSaveUserLoginInfo(JSON.stringify(Params));
                    thisObj.props.navigator.replace({
                        params: {
                            title: 'main',
                            responseText: JSON.stringify(Params)
                        },
                        component: main
                    })
                }
            };
            //nativeModules 回调
            var actionCallback = function(url, strJson) {
                    reqHttp.callHttpService({
                        'Url': url,
                        'Params': strJson,
                        'Success': ServiceCallBack
                    });
                }
                // 请求 Service
            reqHttp.setServiceParams({
                'interfaceName': 'MLgn001',
                'readableMap': params,
                'flagSign': false,
                'actionCallback': actionCallback
            });

        }


        //登陆
        this._onPressButton = function() {
            var isNewFlow = 'Y';
            reqHttp.getRandNum(isNewFlow, (json) => {
                var params = {};
                    params['staffCode'] = userID;
                    params['password'] = pwd;
                    params['randNum'] = json["randNum"];
                if (isNewFlow == 'N') {
                    params['isNewFlow'] = 'N';
                } else {
                    params['isNewFlow'] = 'Y';
                    params['randomCodeIndex'] = json["randomCodeIndex"];
                    params['randNumKey'] = json["randNumKey"];
                }

                if (isNewFlow == 'N') {
                    getString.getEncryptPassword(params, (encryptPasswordStr) => {
                        getString.getEncryptVerifyCode(verifyCode, (verifyCodeStr) => {
                            var paramsLogin = {
                                "isNewFlow": "N",
                                "password": encryptPasswordStr,
                                "verifyCode": verifyCodeStr
                            };
                            thisObj._login(paramsLogin);
                        })
                    });
                } else if (isNewFlow == 'Y') {
                    getString.getEncryptPassword(params, (encryptPasswordStr, decryptIndexStr) => {
                        getString.getEncryptVerifyCode(verifyCode, (verifyCodeStr) => {
                            var paramsLogin = {
                                "isNewFlow": "Y",
                                "randomCodeIndex": decryptIndexStr,
                                "password": encryptPasswordStr,
                                "verifyCode": verifyCodeStr
                            };
                            thisObj._login(paramsLogin);
                        })
                    });
                }

            });
        }

        //短信下发
        this._onGetVerifyCodeButton = function() {
            //请求参数
            var readableMap = {
                    'staffCode': userID,
                    'phone': userID,
                    'sendType': '3',
                    'serviceType': 'PAYEAST_ANDRI_CLIENT_LOGIN'
                }
                //请求回调
            var ServiceCallBack = function(Params) {
                Alert.alert(
                    'Alert Title',
                    Params['content'] + "(" + Params['code'] + ")", [
                        { text: 'OK', onPress: () => console.log('OK Pressed!') },
                    ]
                )
            };
            //nativeModules 回调
            var actionCallback = function(url, strJson) {
                    reqHttp.callHttpService({
                        'Url': url,
                        'Params': strJson,
                        'Success': ServiceCallBack
                    });
                }
                // 请求 Service
            reqHttp.setServiceParams({
                'interfaceName': 'MSms001',
                'readableMap': readableMap,
                'flagSign': false,
                'actionCallback': actionCallback
            });

        }
        return (
			<View style={styles.container}>
		        <TextInput style={[styles.textInput, styles.marginLine]}
		        	placeholder="Email或手机号码"
		        	clearButtonMode="always"
		        	//value={userIDVer}
		        	onChangeText={(text) => userID=text} />
		        <TextInput style={[styles.textInput, styles.marginLine]}
		        	placeholder="密码"
		        	secureTextEntry={true}
		        	clearButtonMode="always"
		        	onChangeText={(text) => pwd=text} />
		        <View style={styles.verifyView}>
		        	<TextInput style={[styles.verifyCode, styles.marginLine]}
		        	placeholder="验证码"
		        	clearButtonMode="always"
		        	onChangeText={(text) => verifyCode=text} />
		        	<TouchableHighlight underlayColor={'#f07000'} style={[styles.getCode, styles.marginLine]} onPress={this._onGetVerifyCodeButton}>
		            	<View><Text style={styles.getCodeTxt}>获取</Text></View>
		        	</TouchableHighlight>
				</View>
		        <TouchableHighlight underlayColor={'#f07000'} style={[styles.touchable, styles.marginLine]} onPress={this._onPressButton}>
		            <View><Text style={styles.buttonTxt}>确定</Text></View>
		        </TouchableHighlight>
	      	</View>
        );
    }
}


export default LoginConfirmation;
