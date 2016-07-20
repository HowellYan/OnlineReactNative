'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Platform,
  BackAndroid,
  Navigator,
  NativeModules,
  View
} from 'react-native';
let requestParams = NativeModules.RequestParamsController;

let styles = null;
let orderViewCSS = require('./orderViewCSS');

if (Platform.OS === 'android') {
    styles = require('../../../lib/android/css/pageView');
} else {
    styles = require('../../../lib/ios/css/pageView');
}
let global = require('../../../lib/global');

import PasswordKeyboard from '../passwordKeyboard/passwordkeyboard';

const eyesImgs_open = require('./img/new_eyes_blue.png');
const eyesImgs_close = require('./img/new_eyes_gray.png');
const offclickImg = require('./img/circle.png');
const onclickImg = require('./img/circle-ok-pay.png');
const arrowImg = require('./img/Rounded-down.png');
const pigImg = require('./img/piggy2.png');
const dollarImg = require('./img/dollar-bag.png');

let tybPlay = null;
let tybRecharge = null;
let jfyRecharge = null;
let tybchiose_img = null;
let jfychiose_img = null;
let payMoneyText = null;
let rewardText = null;

class orderView extends Component{
    constructor(props) {
      super(props);
      this.state = {
        turnImg:true,
        costWay: '1',
        eyesImgsource: eyesImgs_open,
        reward: props.reward,
        hadEpt: props.hadEpt,
        jfy_amount: props.jfy_amount,
        tyb_amount: props.tyb_amount,
        payMoney:props.payMoney,
        phoneNo:props.phoneNo,
        callback:props.callback
      };
    }

    componentWillMount(){
      this._balanceCheck();
      this._setText();
    }

    _setText(show=true){
      if(show){
        payMoneyText = `${this.state.payMoney}元`;
        rewardText = `${this.state.reward}元`;     
      }else{
        payMoneyText = rewardText = '*****'; 
      }
    }

    _onPressEyesButton(){
      console.log("this.state.turnImg"+this.state.turnImg)
      if(!this.state.turnImg){
        this.setState({eyesImgsource:eyesImgs_open});
        this._setText();
      }else{ 
        this.setState({eyesImgsource:eyesImgs_close});
        this._setText(false);
      }
      this.setState({turnImg: !this.state.turnImg});
    }

    _onPressHandle(){
      this.passwordKeyboard.toggle();
    }

    _setCostWay(type){
      if(type === 'tyb'){
        this.setState({costWay:'1'});
      }else if(type === 'jfy'){
        this.setState({costWay:'0'});
      }
      
      this._setPaytypeImg(type);
    }

    _setPaytypeImg(type){
        if(type === 'tyb'){
            tybchiose_img = (<Image source={onclickImg} style={orderViewCSS.chioseimgWidth} />);
            jfychiose_img = (<Image source={offclickImg} style={orderViewCSS.chioseimgWidth}  />);
        }else{
            tybchiose_img = (<Image source={offclickImg} style={orderViewCSS.chioseimgWidth}  />);
            jfychiose_img = (<Image source={onclickImg} style={orderViewCSS.chioseimgWidth}  />);       
        }
    }

    _balanceCheck(){
        let rechargeMoney_number = this.state.payMoney * 1; //充值金额
        let jfyBalance_number = this.state.jfy_amount * 1; //交费易余额
        let tybBalance_number = this.state.tyb_amount * 1; //添益宝余额
        
        console.log("jfyBalance_number=="+jfyBalance_number);
        console.log("tybBalance_number=="+tybBalance_number);

        if(!!this.state.tyb_amount) { 
          //有开通添益宝
          //勾选添益宝
          this._setPaytypeImg('tyb');


          if(tybBalance_number < rechargeMoney_number){ 
            //添益宝余额不足
            //显示添益宝充值
            //按钮置灰
            tybRecharge = (<View style={[orderViewCSS.flexrow,orderViewCSS.marginLeft15]}><Text>余额不足</Text><Image source={arrowImg} style={orderViewCSS.arrowImg} /></View>);
          }

          if(!!this.state.jfy_amount && jfyBalance_number < rechargeMoney_number) { 
            //交费易余额不足
            //显示交费易充值
            jfyRecharge = (<View style={[orderViewCSS.flexrow,orderViewCSS.marginLeft15]}><Text>余额不足</Text><Image source={arrowImg} style={orderViewCSS.arrowImg} /></View>);
          }
        }else{ 
          //没开通添益宝
          //勾选交费易
          this._setPaytypeImg('jfy');

          if(!!this.state.jfy_amount && jfyBalance_number < rechargeMoney_number) {  
            //交费易余额不足
            //显示交费易充值
            //付款按钮置灰
            jfyRecharge = (<View style={[orderViewCSS.flexrow,orderViewCSS.marginLeft15]}><Text>余额不足</Text><Image source={arrowImg} style={orderViewCSS.arrowImg} /></View>);
          }
        }
    }

    render() {
      let tybPlay = !!this.state.tyb_amount ? (
      <View style={[orderViewCSS.flexrow, orderViewCSS.payType]}>
        <TouchableHighlight underlayColor={'transparent'} style={[orderViewCSS.flexrow, orderViewCSS.payGroupOne]} onPress={this._setCostWay.bind(this,'tyb')}>
            <View style={orderViewCSS.flexrow}>
              <View style={[orderViewCSS.flexrow,orderViewCSS.chioseimgWrap]}>
                {tybchiose_img}
              </View>
              <View style={[orderViewCSS.flexrow,orderViewCSS.ImgiconWrap]}>
                <Image source={pigImg} style={orderViewCSS.Imgicon} />
              </View>
              <View style={[orderViewCSS.flexrow, orderViewCSS.paytypeWrap]}>
                <View><Text style={orderViewCSS.fontsize16}>添益宝</Text></View>
                <View><Text>￥ {this.state.tyb_amount}</Text></View>
              </View>
            </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'transparent'} style={[orderViewCSS.flexrow, orderViewCSS.payGroupTwo]}>
          <View>
            {tybRecharge}
          </View>
        </TouchableHighlight>
      </View>
      ) : null;

      return(
        <View style={[orderViewCSS.viewBg,{height: Dimensions.get('window').height}]}>
            <View style={[orderViewCSS.flexrow]}>
                <View style={[orderViewCSS.titleKey, orderViewCSS.greenBottom]}><Text style={orderViewCSS.fontsize}>手机充值</Text></View>
                <View style={[orderViewCSS.titleValue, orderViewCSS.yellowBottom]}><Text style={[orderViewCSS.fontsize, orderViewCSS.colorGary]}>{this.state.phoneNo}</Text></View>
            </View>
            <View style={[orderViewCSS.flexrow, orderViewCSS.marginTOP10]}>
                <View style={[orderViewCSS.titleKey,orderViewCSS.padding10]}><Text style={orderViewCSS.fontsize}>应收顾客</Text></View>
                <View style={[orderViewCSS.titleValue,orderViewCSS.padding10]}><Text style={[orderViewCSS.fontsize, orderViewCSS.colorGary]}>{payMoneyText}</Text></View>
            </View>
            <View style={[orderViewCSS.flexrow]}>
                <View style={[orderViewCSS.titleKey,orderViewCSS.padding10]}><Text style={orderViewCSS.fontsize}>支付金额</Text></View>
                <View style={[orderViewCSS.titleValue,orderViewCSS.padding10]}><Text style={[orderViewCSS.fontsize, orderViewCSS.colorGary]}>{payMoneyText}</Text></View>
                <TouchableOpacity onPress={this._onPressEyesButton.bind(this)}>
                  <Image
                    style={orderViewCSS.eyesImg}
                    source={this.state.eyesImgsource}
                  />
                </TouchableOpacity>
            </View>
            <View style={[orderViewCSS.flexrow]}>
                <View style={[orderViewCSS.titleKey,orderViewCSS.padding10]}><Text style={orderViewCSS.fontsize}>酬&emsp;&emsp;金</Text></View>
                <View style={[orderViewCSS.titleValue,orderViewCSS.padding10]}><Text style={[orderViewCSS.fontsize, orderViewCSS.colorGary]}>{rewardText}</Text></View>
            </View>

            <View style={[orderViewCSS.flexrow]}>
                <View style={[orderViewCSS.titleKey, orderViewCSS.greenBottom]}><Text style={orderViewCSS.fontsize}>付款方式</Text></View>
                <View style={[orderViewCSS.titleValue, orderViewCSS.yellowBottom]}><Text style={[orderViewCSS.fontsize, orderViewCSS.colorGary]}>&emsp;</Text></View>
            </View>
            {tybPlay}
            <View style={[orderViewCSS.flexrow, orderViewCSS.payType]}>
              <TouchableHighlight underlayColor={'transparent'} style={[orderViewCSS.flexrow, orderViewCSS.payGroupOne]} onPress={this._setCostWay.bind(this,'jfy')}>
                  <View style={orderViewCSS.flexrow}>
                    <View style={[orderViewCSS.flexrow,orderViewCSS.chioseimgWrap]}>
                      {jfychiose_img}
                    </View>
                    <View style={[orderViewCSS.flexrow,orderViewCSS.ImgiconWrap]}>
                      <Image source={dollarImg} style={orderViewCSS.Imgicon} />
                    </View>
                    <View style={[orderViewCSS.flexrow, orderViewCSS.paytypeWrap]}>
                      <View><Text style={orderViewCSS.fontsize16}>余&emsp;额</Text></View>
                      <View><Text>￥ {this.state.jfy_amount}</Text></View>
                    </View>
                  </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={'transparent'} style={[orderViewCSS.flexrow, orderViewCSS.payGroupTwo]}>
                <View>
                  {jfyRecharge}
                </View>
              </TouchableHighlight>
            </View>


            <TouchableHighlight 
            underlayColor={'#f07000'} 
            style={[styles.touchable, orderViewCSS.resetMargin]} 
            onPress={this._onPressHandle.bind(this)}
            >
                <View><Text style={styles.buttonTxt}>确定</Text></View>
            </TouchableHighlight>
            <PasswordKeyboard 
              ref={passwordKeyboard => this.passwordKeyboard = passwordKeyboard}
              style={{height: 480}}
              showMask={true}
              onKeyboardDone={()=>this.state.callback(this.passwordKeyboard._getPassWord(), this.state.costWay)}
            >
            </PasswordKeyboard>
        </View>
      );
    };
}

module.exports = orderView;