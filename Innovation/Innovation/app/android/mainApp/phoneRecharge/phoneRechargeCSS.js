'use strict';
import React, {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	viewBg:{
	    backgroundColor:'#f5f5f5'
	  },
	flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
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
	searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  flex: 4,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	},
	container: {
	  marginTop:10,
	  alignItems: 'center',
	},
	 textInput:{ 
	    backgroundColor: '#FEFFFF',
	    borderColor: '#DBDCDC',
	    borderStyle: 'solid',
	    borderWidth: 1,
	    marginBottom:12,
	    paddingLeft: 12,
	    paddingTop:12,
	    paddingBottom:12,
	    borderRadius: 4,
	    marginLeft:16,
    	marginRight:16
  	},
  	fontsize:{ 
    	fontSize:20,
    	color: '#626262'
  	},
  	input_Wrap:{
  		backgroundColor: '#FEFFFF',
  		borderColor: '#DBDCDC',
  		borderStyle: 'solid',
  		borderWidth: 1,
  		marginLeft:16,
    	marginRight:16,
    	marginBottom:12,
    	marginTop:12,
    	borderRadius: 4,
    	height:50
  	},
  	phone_input:{
  		backgroundColor: 'rgba(255,255,255,0)',
  		paddingBottom:0,
  	},
  	phoneadress:{
  		paddingLeft:20,
  		marginBottom:12
  	},
  	flowListView:{
  		backgroundColor:'white',
  		flexDirection: 'row',
  		alignItems:'center',
  		height:60,
  		marginLeft:16,
  		marginBottom:16,
  		borderStyle:'solid',
  		borderWidth:1,
  		borderColor:'white',
  		borderRadius:2
  	},
  	borderGreen:{
  		borderStyle:'solid',
  		borderWidth:1,
  		borderColor:'#84BB01',
  		borderRadius:2
  	},
  	flowsubview:{
  		flex:1,
  		flexDirection:'column',
  	},
  	flowtext:{
  		fontSize: 16,
  		textAlign:'center',
  		color:'#333333'
  	},
  	listView_warp:{
  		flex:1,
  		flexDirection: 'row',
  		flexWrap:'wrap',
  	},
  	btn_clear:{
  		position:'absolute',
  		right:15,
  		top:0,
  		width:20,
  		height:50
  	},
  	btn_clear_img:{
  		width:20,
  		marginTop:3,
  		resizeMode: 'contain'
  	}
});


module.exports = styles;