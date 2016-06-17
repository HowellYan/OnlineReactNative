'use strict';
import React, {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	viewBg:{
	    backgroundColor:'#ffffff'
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
  	}
});


module.exports = styles;