'use strict';
import React, { Component } from 'react';
import {
    ToastAndroid,
    Alert,
    NativeModules
} from 'react-native';

var global = require('./global');
var Lang = require('./lang');

var requestParams = NativeModules.RequestParamsController;

//随机数下发接口
var getRandNum = function(isNewFlow, callBack) {
    console.log("reqHttp Comein!");
    var isNewFlow = isNewFlow;

    // request nativeModules parameter
    var readableMap = {
        'isNewFlow': isNewFlow
    };

    // nativeModules response success callback
    var actionCallback = function(url, strJson) {
        callHttpService({
            'Url': url,
            'Params': strJson,
            'Success': callBack
        });
    };
    // Call setServiceParams function
    setServiceParams({
        'interfaceName': 'MRdc001',
        'readableMap': readableMap,
        'flagSign': false,
        'actionCallback': actionCallback
    });
};

var getOrderSeq = function () {
    var keep = '';
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var rand = Math.round(Math.random() * 899 + 100);
    keep = y + '' + m + '' + d + '' + h + '' + f + '' + s + '' + rand;
    return keep;
};

/**
 * [setServiceParams description]
 * @param {[type]} settings [interfaceName, readableMap, flagSign, actionCallback]
 */
var setServiceParams = function(settings) {
	var interfaceName = settings['interfaceName'];
	var flagSign = settings['flagSign'];
    requestParams.setCPSServiceParams(interfaceName, settings['readableMap'], flagSign ,settings.actionCallback);
};

/**
 * [callHttpService description]
 * @param  {[type]} settings [Url, Params, Success, Error, ShowLoading, Method]
 * @return {[type]}          [description]
 */
var callHttpService = function(settings) {

    //  request url
    var Url = settings['Url'];
    console.log("callHttpService Url:" + Url);
    if (Url == "" || Url == null) {
        console.log(" The settings 'Url' existence error ");
        return { "code": "001", "content": "The settings 'Url' existence error !" }
    }

    //  request method type
    var MethodStr = settings['Method'];
    if (MethodStr == "" || MethodStr == null) {
        MethodStr = "POST";
    }

    // request parameter
    var parame = settings['Params'];
    if (parame == "" || parame == null) {
        console.log(" The settings 'Params' existence error ");
        return { "code": "002", "content": "The settings 'Params' existence error !" }
    }

    // response success callback
    var SuccessCallBack = function(params) {
        var json = JSON.parse(params);
        console.log(params);
        if (json['code'] != global.RES.SUCCESS) {
            Alert.alert(global.TITLE.dialog_title, json['content'] + "(" + json['code'] + ")", [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
            ])
        } else {
            if (settings.Success !== null && typeof settings.Success == 'function') {
                settings.Success(json);
            } else {
                console.log(" The settings 'Success' existence error ");
                settings.Success({ "code": "003", "content": "The settings 'Success' existence error !" });
            }
        }
    };

    // response error callback
    var EerrorCallBack = function(params) {
        if (settings.Error !== null && typeof settings.Error == 'function') {
            settings.Error(params);
        }
        console.warn(params);
    };

    // start fetch request
    var FetchObj = fetch(Url, {
        method: MethodStr,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: parame
    }).then((response) => response.text()).then((responseText) => {
        SuccessCallBack(responseText);
    }).catch((error) => {
        EerrorCallBack(error);
    })

}

/**
 * 酬金查询
 * @param busType       config.BUS_TYPE.
 * @param busiCode      config.BUS_CODE.
 * @param productCode   ''
 * @param amount
 * @param supplyCode
 * @param objCode   业务对象
 */
 //busType, busiCode, productCode, amount, success ,showLoading, supplyCode, pecProductCode, objCode
var getCommission = function(_params, success) {

    for(let i in _params){
        console.log(i+': '+_params[i]);
    }

    let {busType, busiCode, productCode, amount, showLoading, supplyCode, pecProductCode, objCode, staffCode, userInfo} = _params;

    amount = amount +'';
    var params = {};
    params.pecProductCode = pecProductCode || '';
    params.actionCode = busiCode;
    params.acctType = global.ACCOUNT_TYPE.KEY_ACCOUNT_IPOS;
    params.supplyCode = !!supplyCode ? supplyCode : ''; //是否走智能路由
    params.objCode = objCode || '';
    params.staffCode = staffCode;
    params.userInfo = userInfo;

    if (busType === global.BUS_TYPE.BUS_TYPE_BESTPAY_CARD) {
        if ('10' === amount) {
            productCode = "05010100";
        } else if ('20' === amount) {
            productCode = "05010200";
        } else if ('30' === amount) {
            productCode = "05010300";
        } else if ('50' === amount) {
            productCode = "05010500";
        } else if ('100' === amount) {
            productCode = "05011100";
        } else if ('200' === amount) {
            productCode = "05011200";
        } else if ('300' === amount) {
            productCode = "05011300";
        } else if ('500' === amount) {
            productCode = "05011500";
        }
    } else if (busType === global.BUS_TYPE.BUS_TYPE_GAME_CARD) {
        if ('10' === amount) {
            productCode = "04020100";
        } else if ('30' === amount) {
            productCode = "04020300";
        } else if ('50' === amount) {
            productCode = "04020500";
        } else if ('100' === amount) {
            productCode = "04021100";
        }
    } else if (busType === global.BUS_TYPE.BUS_TYPE_TEL_CARD_TELECOM) {
        if ('30' === amount) {
            productCode = "01000300";
        } else if ('50' === amount) {
            productCode = "01020500";
        } else if ('100' === amount) {
            productCode = "01021100";
        }
    } else if (busType === global.BUS_TYPE.BUS_TYPE_TEL_CARD_UNICOM) {
        if ('30' === amount) {
            productCode = "03200300";
        } else if ('50' === amount) {
            productCode = "03200500";
        } else if ('100' === amount) {
            productCode = "03201100";
        }
    } else if (busType === global.BUS_TYPE.BUS_TYPE_QQ) {
        console.log("");
    }
    params.productCode = productCode;
    params.amount = Lang.yuan2fen(amount);

    requestParams.setCPSServiceParams('SRwd002',params,true,(url,strJson)=> fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: strJson
    })
    .then(response => response.text())
    .then(responseText => {
        let json = JSON.parse(responseText);
        success(json);
    })
    .catch(error => {
      console.warn(error);
    }));
};


var reqHttp = {
    getRandNum: getRandNum,
    setServiceParams: setServiceParams,
    callHttpService: callHttpService,
    getCommission: getCommission,
    getOrderSeq: getOrderSeq
};


module.exports = reqHttp;
