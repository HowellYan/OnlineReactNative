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
  BackAndroid,
  Navigator,
  View
} from 'react-native';
var thisObj = null;

var ScrollableTabView = require('react-native-scrollable-tab-view');

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
      <ScrollableTabView>
        <View tabLabel="充话费"><Text>充话费</Text></View>
        <View tabLabel="充流量"><Text>充流量</Text></View>
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
