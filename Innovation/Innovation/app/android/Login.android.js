/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
	AppRegistry,
  	AsyncStorage,
  	Platform,
  	TouchableOpacity,
  	BackAndroid,
  	StyleSheet,
  	Navigator,
  	View,
  	Text}
from 'react-native';
import LoginNoConfirmation from './Login/LoginNoConfirmation';
import mainView from './main/mainView';

var _this = null, _navigator = null;;

const defaultRoute = {
  component: mainView
};

class LoginMain extends Component {
  	_renderScene(route, navigator) {
		_navigator = navigator;
	    let Component = route.component;
	    return (
	      <Component {...route.params} navigator={navigator} />
	    );
  	}
  	_renderNavBar(){
  		const styles = {
	      title: {
	        flex: 1, justifyContent: 'center', alignItems: 'center'
	      },
	      button: {
	        flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
	      },
	      buttonText: {
	        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
	      }
	    }
		var routeMapper = {
	      LeftButton(route, navigator, index, navState) {
	        if(index > 0) {
	          return (
	            <TouchableOpacity 
	              onPress={() => navigator.pop()}
	              style={styles.button}>
	              <Text style={styles.buttonText}>Back</Text>
	            </TouchableOpacity>
	          );
	        } else {
	          return null;
	        }
	      },
	      RightButton(route, navigator, index, navState) {
	          return null
	      },
	      Title(route, navigator, index, navState) {
	        return (
	            <View style={styles.title}>
		           <Text style={styles.buttonText}>{route.title ? route.title : 'Main'}</Text>
		        </View>
	        );
	      }
	    };
  		return(
			<Navigator.NavigationBar
		        style={{
		          	alignItems: 'center',
		          	backgroundColor: '#55ACEE',
		          	shadowOffset:{
		              width: 1,
		              height: 0.3,
		          	},
          			shadowColor: '#55ACEE',
          			shadowOpacity: 0.8,          
          		}}
        		routeMapper={routeMapper}
      		/>
  		);

  	}
  	render() {
		_this = this;
	    AsyncStorage.getItem("userInfo", (err, result) => {
	      	console.log("AsyncStorage getItem:"+result);
			console.log("AsyncStorage err:"+err);
			if(result == null || result == 'null'){
				_navigator.replace({
					params: {
						title:'main',
						responseText:result
					},
					component: LoginNoConfirmation
				})
			}
	    });

	    return (
	      <Navigator
	        initialRoute={defaultRoute}
	        renderScene={this._renderScene}
	        navigationBar={this._renderNavBar()}
	        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 57 : 74)}}
	         />
	    );
  	}
}

AppRegistry.registerComponent('Innovation', () => LoginMain);
