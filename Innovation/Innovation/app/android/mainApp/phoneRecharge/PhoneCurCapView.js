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
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  Picker,
  BackAndroid,
  Navigator,
  View
} from 'react-native';


var styles = null,phoneRechargeStyles = null;
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
phoneRechargeStyles = require('./phoneRechargeCSS');

class PhoneCurCapView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      language: 'js',
	    };
  	}

	render() {
		return(
				<ScrollView navigator={this.props.navigator} keyboardDismissMode='interactive'>
					<View style={[phoneRechargeStyles.container,{marginTop:10,backgroundColor:'#ffffff'}]}>
					<View style={phoneRechargeStyles.flowRight}>
					  	<TextInput style={phoneRechargeStyles.searchInput} placeholder='Search via name or postcode'/>
					  	<TouchableHighlight style={phoneRechargeStyles.button} underlayColor='#99d9f4'>
					    	<Text style={phoneRechargeStyles.buttonText}>Go</Text>
					  	</TouchableHighlight>
					</View>
					<TouchableHighlight style={phoneRechargeStyles.button} underlayColor='#99d9f4'>
						<Text style={phoneRechargeStyles.buttonText}>Location</Text>
					</TouchableHighlight>
		        	</View>
	          	</ScrollView>
			);
	}
}



module.exports = PhoneCurCapView;