'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	ToastAndroid,
	TouchableHighlight,
	Alert,
	Navigator,
	BackAndroid,
	View
} from 'react-native';

var global = require('./global');

var {NativeModules}=require('react-native');
var requestParams = NativeModules.RequestParamsController;

//随机数下发接口
var getRandNum = function(callBack){
	console.log("reqHttp Comein!");
	var isNewFlow = 'Y';
	requestParams.setCPSServiceParams('MRdc001',{
				'isNewFlow':isNewFlow
			    },false,(url,strJson)=> fetch(url, {
			    method: 'POST',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json',
			    },
			    body: strJson
			}).then((response) => response.text()).then((responseText) => {
				var json=JSON.parse(responseText);
					if(json['code'] != global.RES.SUCCESS){
						Alert.alert(global.TITLE.dialog_title,json['content']+"("+json['code']+")",
				        [
				          {text: 'OK', onPress: () => console.log('OK Pressed!')},
				        ])
					} else {
						callBack(isNewFlow,json);
					}
			    console.log(responseText);
			}).catch((error) => {
			    console.warn(error);
			}))

};

var reqHttp = {
	getRandNum:getRandNum
};


module.exports = reqHttp;