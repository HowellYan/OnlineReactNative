'use strict';
import React, {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  textInput : {
    height: 50,
    borderWidth: 1,
    fontSize: 22,
    marginLeft :15,
    marginRight :15
  },

  touchable : {
    height: 45,
    marginLeft:16,
    marginRight:16,
    borderRadius:4,
    marginTop: 10,
    backgroundColor:'#ff7e00',
    borderColor:'#ff7e00'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  verifyView:{
  	flexDirection:'row'
  },
  buttonTxt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color:'#FFFFFF'

  },
  verifyCode:{
  	height: 50,
  	fontSize: 22,
    marginRight :15,
 	  width:200
  },
  getCode:{
  	borderRadius:30,
    backgroundColor:'#ff7e00',
    borderColor:'#ff7e00',
    width:100
  },
  getCodeTxt:{
  	borderRadius:30,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color:'#FFFFFF',
    width:100
  },
  marginLine: {
    marginBottom: 10
  },
});

module.exports = styles;