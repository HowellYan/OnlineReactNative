'use strict';
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
	ListView,
	Navigator,
	View
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');

var {NativeModules}=require('react-native');
var requestParams = NativeModules.RequestParamsController;

var base = require('../../lib/base');
var styles = require('../../lib/android/css/pageView');
var global = require('../../lib/global');
var mainCSS = require('./mainCSS');
var mainJS = require('./mainJS');
var thisObj=null;

var mainView = React.createClass({
  

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },
  _pressData: ({}: {[key: number]: boolean}),
  componentWillMount: function() {
    this._pressData = {};
  },
  render: function() {
  	thisObj = this;
    return (
      <ScrollableTabView  tabBarPosition="bottom">
        <View tabLabel="主页"> 
        <ListView
        initialListSize={12}
        contentContainerStyle={mainCSS.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        />
        </View>
        <View tabLabel="金融"><Text>金融</Text></View>
        <View tabLabel="个人"><Text>个人</Text></View>
      </ScrollableTabView>
     
    );
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var imgSource = mainJS.THUMB_URLS[rowID]['url'];
    return (
      <TouchableHighlight underlayColor="red" onPress={()=>{this._gotoPage(mainJS.THUMB_URLS[rowID]['component'], mainJS.THUMB_URLS[rowID]['name'])}}>
        <View>
          <View style={mainCSS.row}>
            <Image style={mainCSS.thumb} source={imgSource} />
            <Text style={mainCSS.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < mainJS.THUMB_URLS.length; ii++) {
      dataBlob.push(mainJS.THUMB_URLS[ii]['name']);
    }
    return dataBlob;
  },

	
	_gotoPage: function(component, name){
		//页面跳转 params传给下一个页面的值，component下一个页面的view
		thisObj.props.navigator.push({
			params: {
				title:name
			},
      title:name,
			component: component
		})
	}

});




export default mainView;