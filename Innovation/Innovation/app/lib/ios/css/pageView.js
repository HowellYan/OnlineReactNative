'use strict';
import React, {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  textInput : {
    height: 50,
    borderColor:"#e0e0e0",
    borderWidth: 0.5,
    padding: 4,
    fontSize: 22,
    marginLeft :15,
    marginRight :15
  },
  touchable : {
    borderRadius:30,
    backgroundColor:'#ff7e00',
    borderColor:'#ff7e00',
    width:300
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
    borderRadius:30,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    marginBottom: 10,
    color:'#FFFFFF',
    width:280
  },
  verifyCode:{
  	height: 50,
  	fontSize: 22,
    marginRight :15,
    borderColor:"#e0e0e0",
    borderWidth: 0.5,
 	  width:150
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
    marginTop: 15,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    color:'#FFFFFF',
    width:80
  },
  marginLine: {
    marginBottom: 10
  },
});

module.exports = styles;