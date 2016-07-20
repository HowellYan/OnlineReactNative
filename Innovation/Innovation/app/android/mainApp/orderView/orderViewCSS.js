'use strict';
import React, {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  viewBg:{
      backgroundColor:'#f5f5f5',
      padding:12,
      flexDirection: 'column'
    },
  flexrow:{
    flexDirection:'row',
  },
  titleKey:{
    padding:15,
    paddingLeft:30,
    paddingRight:30
  },
  titleValue:{
    flex:1,
    paddingTop:15,
    paddingBottom:15,
  },
  padding10:{
    paddingTop:10,
    paddingBottom:10,
  },
  marginTOP10:{
    marginTop:10,
  },
  greenBottom:{
    borderBottomWidth:1,
    borderColor:'#B2D36B',
    borderStyle:'solid',
  },
  yellowBottom:{
    borderBottomWidth:1,
    borderColor:'#F9A858',
    borderStyle:'solid'
  },
  fontsize:{
    fontSize:20
  },
  eyesImg:{
    height:35,
    resizeMode: 'contain',
    marginTop:8
  },
  colorGary:{
    color:'#525253'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  resetMargin:{
    marginLeft:0,
    marginRight:0,
    marginTop:30
  },
  chioseimgWidth:{
    width:30,
    height:30,
  },
  chioseimgWrap:{
    height:45,
    width:55,
    alignItems:'center'
  },
  ImgiconWrap:{
    height:45,
    width:28,
    alignItems:'center' 
  },
  Imgicon:{
    width:20,
    alignItems:'center',
    resizeMode:'contain'
  },
  payType:{
    borderColor:'#e5e5e5',
    borderBottomWidth:1,
    borderStyle:'solid',
    paddingTop:8,
    paddingBottom:8
  },
  paytypeWrap:{
    flexDirection:'column',
    alignItems: 'center'
  },
  payGroupOne:{
    flex:2,
    height:45,
    alignItems:'center'
  },
  payGroupTwo:{
    flex:1,
    height:45,
    alignItems:'center'
  },
  fontsize16:{
    fontSize:16
  },
  arrowImg:{
    width:13,
    flexDirection:'row',
    resizeMode:'contain',
    transform:[{rotate: '-90deg'}],
    marginTop:3,
    marginLeft:2
  },
  marginLeft15:{
    marginLeft:15
  }
});


module.exports = styles;