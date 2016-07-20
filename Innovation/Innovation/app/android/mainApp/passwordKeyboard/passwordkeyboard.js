'use strict';

import React, {Component, PropTypes} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Animated,
	Platform,
	Dimensions,
	Image,
	ListView,
	TextInput,
	TouchableHighlight
} from 'react-native';

let {width, height} = Dimensions.get('window');

const longSide = width > height ? width : height;
const shortSide = width > height ? height : width;
const bottom = 80;

const img_upper = (<Image source={require('./images/upper.png')}  style={{width:15, height:15}} />);
const img_backspace = (<Image source={require('./images/delete.png')} style={{width:16, height:16}} />);

class PasswordKeyboard extends Component {

	static propTypes = {
		style: View.propTypes.style,
		keyboardElevation: PropTypes.number,
		keyboardBtnText: PropTypes.string,
		keyboardCancelBtnText: PropTypes.string,
		showMask: PropTypes.bool,
		showDuration: PropTypes.number,
		onKeyboardDone: PropTypes.func,
		onKeyboardCancel: PropTypes.func,
		onValueChange: PropTypes.func
	};

	static defaultProps = {
		style: {
			width: width
		},
		keyboardBtnText: 'Done',
		keyboardCancelBtnText: 'Cancel',
		keyboardTitleText: '输入密码',
		showMask: false,
		showDuration: 300,
		onKeyboardDone: ()=>{},
		onKeyboardCancel: ()=>{},
	};

	constructor(props){	
		super(props);
	}

	componentWillMount(){
		this.state = this._getStateFromProps(this.props);
		this._setkeyboardValue();
	}

	componentDidMount(){
		console.log("lowerCase ===" + this.state.lowerCase);
		console.log("dataSource ===" + this.state.dataSource);
		console.log("height ===" + height);
		console.log("style height ===" + this.state.style.height);
	}

	_getStateFromProps(props){
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let slideAnim = (this.state && this.state.slideAnim ? this.state.slideAnim : new Animated.Value(-height));

		return {
			...props,
			dataSource,
			slideAnim,
			returnPasswordValue:'',
			password:'',
			lowerCase: true,
			numberKeyboard: true
		};
	}

	_initialPassWord(){
		let keyNumber = this._mixNumber();
		console.log("new keyNumber===" + keyNumber);
		this.setState({
			returnPasswordValue:'',
			password:'',
			numberKeyboard: true,
			btnActive: false,
			keyNumber:keyNumber,
			dataSource: this.state.dataSource.cloneWithRows(keyNumber)
		});
	}

	_getPassWord(){
		return this.state.returnPasswordValue;
	}

	_slideUp(){
		this._initialPassWord();
		this._isMoving = true;
		Animated.timing(
			this.state.slideAnim,
			{
				toValue: 0,
				duration: this.state.showDuration,
			}
		).start((evt) => {
			if(evt.finished) {
				this._isMoving = false;
				this._isKeyboardShow = true;
			}
		});
	}

	_slideDown(){
		this._isMoving = true;
		Animated.timing(
			this.state.slideAnim,
			{
				toValue: -height,
				duration: this.state.showDuration,
			}
		).start((evt) => {
			if(evt.finished) {
				this._isMoving = false;
				this._isKeyboardShow = false;
			}
		});
	}

	_toggle(){
		if(this._isMoving) {
			return;
		}
		if(this._isKeyboardShow) {
			this._slideDown();
		}
		else{
			this._slideUp();
		}
	}
	
	toggle(){
		this._toggle();
	}

	show(){
		if(!this._isKeyboardShow){
			this._slideUp();
		}
	}

	hide(){
		if(this._isKeyboardShow){
			this._slideDown();
		}
	}

	isKeyboardShow(){
		return this._isKeyboardShow;
	}

	_keyboardCancel(){
		this._toggle();
		this.state.onKeyboardCancel();
	}

	_keyboardFinish(){
		if(this.state.btnActive){
			this._toggle();
			this.state.onKeyboardDone();
		}
	}

	_toEnglishKeyboard(){
		this._toLowerCaseKeyboard();
	}

	_toNumberKeyboard(){
		let key = this.state.keyNumber;
		this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(key)
		});
	}

	_toUpperCaseKeyboard(){
		let key = this.state.keyEnglishUpper;
		this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(key)
		});
	}

	_toLowerCaseKeyboard(){
		let key = this.state.keyEnglishLower;
		this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(key)
		});
	}

	_toggleLowerUpper(){
		if(this.state.lowerCase){
			this._toUpperCaseKeyboard();
		}else{ 
			this._toLowerCaseKeyboard();
		}
		this.setState({lowerCase: !this.state.lowerCase});
	}

	_toggleNumberEnglish(){
		this.setState({
			numberKeyboard: !this.state.numberKeyboard,
		});
		if(this.state.numberKeyboard){
			this._toEnglishKeyboard();
		}else{
			this._toNumberKeyboard();
		}
	}

	_backspacePassword(){
		let len = this.state.password.length-1;
		this.setState({
			returnPasswordValue:this.state.returnPasswordValue.slice(0, len),
			password:this.state.password.slice(0, len)
		});

		if(len < 6){
			this.setState({btnActive:false});
		}
	}

	_inputPassword(rowData){
		let password = this.state.password;
		rowData = (rowData).toString();
		this.setState({
			returnPasswordValue: this.state.returnPasswordValue + rowData,
			password: this.state.password + rowData
		});

		if (password.length+1 > 5) {
			this.setState({btnActive:true})
		}

		setTimeout(()=>{
			let replacePasswoardValue = '';
			for(let i = this.state.password.length; i--;){
				replacePasswoardValue += '●';
			}
			this.setState({
				password: replacePasswoardValue
			});
		}, 200);
	}

    _setkeyboardValue(){
    	let keyNumber;
    	let keyEnglishLower = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    	let keyEnglishUpper  = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

    	keyEnglishLower.splice(10,0,img_upper);
    	keyEnglishLower.splice(20,0,"123");
    	keyEnglishLower.push(img_backspace);

    	keyEnglishUpper.splice(10,0,img_upper);
    	keyEnglishUpper.splice(20,0,"123");
    	keyEnglishUpper.push(img_backspace);

    	this.setState({
    		keyEnglishLower:keyEnglishLower,
    		keyEnglishUpper:keyEnglishUpper
    	});

    	console.log("keyEnglishLower======" + this.state.keyEnglishLower);
    	console.log("keyEnglishUpper======" + this.state.keyEnglishUpper);
    }

    _mixNumber(){
    	let keyNumber = [0,1,2,3,4,5,6,7,8,9];
		let x,y,m,n;

		for(let i = 0; i<9; i++){
		  x = Math.random().toFixed(1).slice(2);
		  y = Math.random().toFixed(1).slice(2);
		  m = keyNumber[x];
		  n = keyNumber[y];
		  keyNumber[y] = m;
		  keyNumber[x] = n;
		  keyNumber = keyNumber
		}

		keyNumber.splice(9,0,"abc");
    	keyNumber.push(img_backspace);

		return keyNumber
    }

    _listViewOnPress(rowData,rowID){
    	if(!this.state.numberKeyboard){ //字母键盘
    		if(rowID == 10){ //大小写
				this._toggleLowerUpper();
			}else if(rowID == 20){ //数字键盘
				this._toggleNumberEnglish();
			}else if(rowID == 28){ //回退键
				this._backspacePassword();
			}else{ //字母
				this._inputPassword(rowData);
			}
    	}else{ //数字键盘
    		if(rowID == 9){ //字母键盘
    			this._toggleNumberEnglish();
    		}else if(rowID == 11){ //回退键
    			this._backspacePassword();
    		}else{ //数字
    			this._inputPassword(rowData);
    		}
    	}
    }

    _renderRow(rowData: string, sectionID: number, rowID: number){
    	let wrap = typeof rowData === 'object' ? (<View>{rowData}</View>) : (<Text>{rowData}</Text>);
    	return (
	      <TouchableHighlight 
	       style={[
	      	 	styles.keyboardStyle, 
	      	 	styles.englishWidth, 
	      	 	this.state.numberKeyboard && styles.numberWidth, 
	      	 	!this.state.numberKeyboard && rowID == 28 && styles.englishBackspace
	      	]}
	       underlayColor={'#999999'} 
	       onPress={this._listViewOnPress.bind(this,rowData,rowID)}
	       >
	      	 <View>
	      	  	{wrap}
	      	 </View>
	      </TouchableHighlight> 
	    );
    }

	render(){

		let mask = this.state.showMask ? (
			<View style={styles.mask} >
				<Text style={{width: width, height: height}} onPress={this._keyboardCancel.bind(this)}></Text>
			</View>
		) : null;

		return (
			<Animated.View style={[styles.keyboard, {
				elevation: this.state.keyboardElevation,
				width: longSide,
				height: this.state.showMask ? height : this.state.style.height,
				bottom: this.state.slideAnim
			}]}>
				{mask}
				<View style={[styles.keyboardBox, this.state.style]}>
					<View style={[styles.keyboardToolbar, {width: this.state.style.width || width}]}>
						<TouchableHighlight 
							style={styles.touchableCancel}
						    underlayColor={'rgba(255,255,255,0.3)'} 
						    onPress={this._keyboardCancel.bind(this)}
						    >
								<Text style={styles.touchableCancelTxt}>+</Text>
						</TouchableHighlight>
						<Text style={[styles.keyboardTitle]}>
							{this.state.keyboardTitleText}
						</Text>
						<View style={styles.rightBtn}></View>
					</View>
					<View style={[styles.listView_content, {width: this.state.style.width || width, bottom: this.state.style.bottom || bottom}]}>
						<View style={styles.input_wrap}>
			              	<TextInput 
			              	    ref="passwordText"
			              	    style={styles.input_text}
			              	    editable={false}
			              	    value={this.state.password}
					        	/>
				        </View>
				        <TouchableHighlight 
				         	underlayColor={this.state.btnActive ? '#f07000' : '#cccccc'} 
				         	style={[styles.buttonwrap, styles.bottonDisable, this.state.btnActive && styles.buttonActive]} 
				         	onPress={this._keyboardFinish.bind(this)}
				            >
		            		<View><Text style={styles.buttonTxt}>确定</Text></View>
		        		</TouchableHighlight>
		        		<View style={styles.listViewHeight}>
						<ListView
							ref="listView"
					        contentContainerStyle={[styles.listView_warp,{width: this.state.style.width || width}]}
					        dataSource={this.state.dataSource}
					        renderRow={this._renderRow.bind(this)}
					        initialListSize={28}
				        />
				        </View>
					</View>
				</View>
			</Animated.View>
		);
	}
};

let styles = StyleSheet.create({
	keyboard: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'transparent',
	},
	keyboardBox: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'white'
	},
	mask: {
		position: 'absolute',
		top: 0,
		backgroundColor: 'transparent',
		height: height,
		width: width
	},
	keyboardStyle:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderTopWidth:1,
		borderColor: '#DBDCDC',
		borderStyle: 'solid',
		backgroundColor:'white',
		height:50
	},
	input_wrap:{
  		backgroundColor: '#FEFFFF',
  		borderColor: '#DBDCDC',
  		borderStyle: 'solid',
  		borderWidth: 1,
  		marginLeft:16,
    	marginRight:16,
    	marginBottom:15,
    	borderRadius: 3,
    	height:50
  	},
  	input_text:{
  		backgroundColor: 'rgba(255,255,255,0)',
  		paddingBottom:0,
  		fontSize: 16,
  		color:'#333333'
  	},
  	buttonwrap:{
	    height: 45,
	    marginLeft:16,
	    marginRight:16,
	    borderRadius:3,
	    marginBottom:15,
    },
    buttonActive:{
	    backgroundColor:'#ff7e00',
	    borderColor:'#ff7e00'
    },
    bottonDisable:{
	    backgroundColor:'#cccccc',
	    borderColor:'#cccccc'
    },
    buttonTxt:{
	    fontSize: 16,
	    textAlign: 'center',
	    marginTop: 10,
	    marginBottom: 10,
	    color:'#FFFFFF'
  	},
	englishWidth:{
		width:width/10
	},
	numberWidth:{
		width:width/3
	},
	englishBackspace:{
		width:width/10 * 2
	},
	listView_content:{
		position:'absolute'
	},
	listViewHeight:{
		height:200
	},
	listView_warp: {
  		flexDirection: 'row',
  		flexWrap:'wrap',
  		justifyContent: 'center',
  		position:'absolute',
  		bottom:0,
  		left:0
	},
	keyboardToolbar: {
		height: 40,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#e5e5e5',
		alignItems: 'center'
	},
	keyboardBtnView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	keyboardMoveBtn: {
		color: '#149be0',
		fontSize: 16,
		marginLeft: 20
	},
	touchableCancel:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		width:50,
		height:40,
	},
	touchableCancelTxt:{
		fontSize:20,
		color:'#999999',
		transform:[{rotate: '45deg'}]
	},
	keyboardCancelBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width:20,
		height:40,
		marginLeft: 20
	},

	keyboardTitle: {
		flex: 4,
		color: 'black',
		textAlign: 'center'
	},
	rightBtn:{
		flexDirection:'row',
		width:50,
		height:40,
	},
	keyboardFinishBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginRight: 20
	},
	keyboardFinishBtnText: {
		fontSize: 16,
		color: 'white'
	}
});

module.exports = PasswordKeyboard;