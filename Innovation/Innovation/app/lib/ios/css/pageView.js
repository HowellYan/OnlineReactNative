'use strict';
import React, {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  inputText_wrap:{
    borderColor: '#cccccc', 
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    marginLeft:16,
    marginRight:16,
    marginTop:16,
  },
  textInput : {
    fontSize:20,
    height: 50,
    backgroundColor: '#FEFFFF',
    borderColor: '#DBDCDC',
    borderStyle: 'solid',
    borderWidth: 1,
    margin:16,
    paddingLeft: 12,
    paddingTop:12,
    paddingBottom:12,
    borderRadius: 4
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