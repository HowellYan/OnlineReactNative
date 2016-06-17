'use strict';

import React, { Component } from 'react';
import Picker from 'react-native-picker';
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
  BackAndroid,
  Dimensions,
  Navigator,
  NativeModules,
  View
} from 'react-native';
var requestParams = NativeModules.RequestParamsController;


var styles = null, phoneRechargeCSS = null;
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
phoneRechargeCSS = require('./phoneRechargeCSS');

var userInfo = {}, staffCode = null;

class PhoneBillView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	language: 'js',
	      	pickerData: ['50元','100元','150元'],
        	selectedValue: ['50元'],
        	text:''
	    };
	    AsyncStorage.getItem("userInfo", (err, result) => {
	        userInfo = JSON.parse(result);
      	});
		AsyncStorage.getItem("staffCode", (err, result) => {
	        staffCode = JSON.parse(result);
	        console.log("staffCode:"+staffCode);
      	});

  	}
	_onPressHandle(){
    	this.picker.toggle();
  	}

	 _textInputChange(text){
	    if(text.length===11){ 
	      //请求参数
	      let params = {
	          "type": "50",  //1:固话 3:宽带 50:手机
	          "isQryUserInfo": "Y",  //Y：查询 其他都不查询
	          "phone" : ""+text,
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
	              this.setState({text: text});
	          }
	      })
	      .catch(error => {
	          console.warn(error);
	      }));
	    }
	  }

	render() {
		return(
				
					<View style={{height: Dimensions.get('window').height}}>
						
		              	<TextInput style={styles.textInput}
				        	placeholder="手机号码"
				        	maxLength={11}
				        	clearButtonMode="always"
				        	onChangeText={(text) => {
		                      text = text.replace(/ /g, '_');
		                      this.setState({text});
		                      this._textInputChange(text);
		                    }}
		                    value={this.state.text}
				        	keyboardType={"phone-pad"}
				        	/>
	 			        <TouchableOpacity underlayColor={'#f07000'} style={phoneRechargeCSS.textInput} onPress={this._onPressHandle.bind(this)}>
             				<Text style={phoneRechargeCSS.fontsize}>{this.state.selectedValue}</Text>
            			</TouchableOpacity>
						<Picker
				            ref={picker => this.picker = picker}
				            style={{height: 320}}
				            showDuration={300}
				            pickerData={this.state.pickerData}
				            selectedValue={this.state.selectedValue}
				            onPickerDone={(pickedValue) => {
				                console.log(pickedValue);
				                this.setState({selectedValue: pickedValue});
				            }}
				            />
				        <TouchableHighlight underlayColor={'#f07000'} style={[styles.touchable, styles.marginLine]}>
			            	<View><Text style={styles.buttonTxt}>确定</Text></View>
			        	</TouchableHighlight>
		        	</View>
	          
			);
	}
}



module.exports = PhoneBillView;