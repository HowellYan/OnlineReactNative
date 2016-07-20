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

class orderDetailsView extends Component {
	constructor(props) {
	    super(props);
  	}
	render() {
		return(
			<View>
				<Text>orderDetailsView</Text>
		    </View>
		);
	}
}


module.exports = orderDetailsView;