/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
  ScrollView,
  Platform,
  BackAndroid,
  Navigator,
  View
} from 'react-native';
var thisObj = null;
var styles = null,phoneRechargeStyles = null;
if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
phoneRechargeStyles = require('./phoneRechargeCSS');


import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
var reqHttp = require('../../../lib/reqHttp');
var phoneRechargeJS = require('./phoneRechargeJS');

var PhoneBillView =  require('./PhoneBillView');
var PhoneCurCapView =  require('./PhoneCurCapView');

var phoneNum;

class phoneRechargeView extends Component {



  render() {
      thisObj = this;
      var {navigator,title,userIDVer} = this.props;
          BackAndroid.addEventListener('hardwareBackPress', function() {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
              navigator.pop();
              return true;
            }
            return false;
          });
    return (
        <ScrollableTabView initialPage={0} style={phoneRechargeStyles.viewBg}>
          <PhoneBillView tabLabel="充话费"></PhoneBillView>
          <PhoneCurCapView tabLabel="充流量"></PhoneCurCapView>
        </ScrollableTabView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


export default phoneRechargeView;
