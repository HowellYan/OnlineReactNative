'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  BackAndroid,
  Navigator,
  NativeModules,
  View
} from 'react-native';
let requestParams = NativeModules.RequestParamsController;
let {width, height} = Dimensions.get('window');

class finishpage extends Component{
    constructor(props) {
       super(props);
       this.state = {
          pageType: props.pageType
       };
    }

    _backtoTop(){
      this.props.navigator.popToTop(0);
    }

    _returnPage(){
        if(this.state.pageType === 'accept'){
          //已受理 009002
          return(
            <View style={selfStyles.wrap}>
                <Image source={require('./img/receving.png')} style={selfStyles.img} />
                <View><Text style={selfStyles.fontBig}>交易已受理</Text></View>
                <View><Text style={selfStyles.fontSmall}>稍后请确认订单状态</Text></View>
                <TouchableHighlight onPress={this._backtoTop.bind(this)} underlayColor={'#f07000'} style={[selfStyles.touchable]}>
                    <View><Text style={selfStyles.btnfont}>查看订单状态</Text></View>
                </TouchableHighlight>
            </View>
          )
        }else if(this.state.pageType === 'success'){
          //交易成功 000000
          return(
            <View style={selfStyles.wrap}>
                <Image source={require('./img/success.png')} style={selfStyles.img} />
                <View><Text style={selfStyles.fontBig}>交易成功</Text></View>
                <View><Text style={selfStyles.fontSmall}>预计10分钟内到账</Text></View>
                <View style={selfStyles.btn2wrap}>
                  <TouchableHighlight underlayColor={'#f5f5f5'} onPress={this._backtoTop.bind(this)} style={selfStyles.backBtn}>
                      <View><Text style={selfStyles.btnfont2}>返回大厅</Text></View>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor={'#f07000'} style={selfStyles.againBtn}>
                      <View><Text style={selfStyles.btnfont}>再来一次</Text></View>
                  </TouchableHighlight>
                </View>
            </View>
          )
        }else{
           return null;
        }
    }

    render() {
        return(
          <View>
            {this._returnPage()}
          </View>
        );
    }
}

let selfStyles = StyleSheet.create({
  wrap:{
    backgroundColor:'#f5f5f5',
    flexDirection:'column',
    alignItems:'center',
    width:width,
    height:height
  },
  img:{
    width:40,
    height:40,
    resizeMode:'contain',
    marginTop:76,
    marginBottom:25
  },
  touchable : {
    height: 56,
    borderRadius:4,
    marginTop: 30,
    backgroundColor:'#ff7e00',
    borderColor:'#ff7e00',
    width:width-32,
    alignItems: 'center',
    justifyContent:'center'
  },
  btnfont:{
    fontSize:20,
    color:'white'
  },
  btnfont2:{
    fontSize:20,
    color:'#333333'
  },
  fontBig:{
    fontSize:26,
    color:'#333333',
    padding:3
  },
  fontSmall:{
    fontSize:20,
    color:'#999999',
    padding:3
  },
  btn2wrap:{
    width:width,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:30
  },
  backBtn:{
    height: 56,
    borderRadius:4,
    backgroundColor:'white',
    borderColor:'#cccccc',
    borderWidth:1,
    borderStyle:'solid',
    width:width/2-16,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  againBtn:{
    height: 56,
    borderRadius:4,
    backgroundColor:'#ff7e00',
    borderColor:'#ff7e00',
    width:width/2-16,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row'
  }
});

module.exports = finishpage;