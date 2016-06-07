'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableHighlight,
  Alert,
  Platform,
  ScrollView,
  Picker,
  BackAndroid,
  Navigator,
  View
} from 'react-native';


var styles = null;
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}

class PhoneBillView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      language: 'js',
	    };
  	}

	render() {
		return(
			<ScrollView navigator={this.props.navigator} keyboardDismissMode='interactive'>
				<View style={[styles.container,{marginTop:10}]}>
	              	<TextInput style={[styles.textInput, styles.marginLine]}
			        	placeholder="手机号码"
			        	maxLength={11}
			        	clearButtonMode="always"
			        	keyboardType={"phone-pad"}
			        	/>
 					<Picker 
					  selectedValue={this.state.language}
					  onValueChange={(lang) => this.setState({language: lang})}>
					  <Picker.Item label="Java" value="java" />
					  <Picker.Item label="JavaScript" value="js" />
					</Picker>
        			<Text>当前选择的是:{this.state.language}</Text>
			        <TouchableHighlight underlayColor={'#f07000'} style={[styles.touchable, styles.marginLine]}>
		            	<View><Text style={styles.buttonTxt}>确定</Text></View>
		        	</TouchableHighlight>
	        	</View>
          	</ScrollView>
			);
	}
}



module.exports = PhoneBillView;