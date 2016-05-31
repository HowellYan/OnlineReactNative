package com.innovation.app.controller;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.gson.JsonObject;
import com.innovation.app.service.FromJSObjService;
import com.innovation.net.NetConstants;
import com.innovation.net.RequestParams;
import com.innovation.util.Util;
import com.innovation.value.location.MyLocationListenner;
import com.innovation.value.sign.SignUtil;


import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;


/**
 * Created by Howell on 16/5/10.
 */
public class RequestParamsController extends ReactContextBaseJavaModule {
    FromJSObjService fromJSObjService = null;
    RequestParams requestParams = null;
    Context context = null;
    public RequestParamsController(ReactApplicationContext reactContext) {
        super(reactContext);
        context=reactContext;
        requestParams = new RequestParams(reactContext);
    }
    @Override
    public String getName() {
        return "RequestParamsController";
    }

    @Override
    public void initialize() {
        fromJSObjService = new FromJSObjService();

    }

    @ReactMethod
    public void setCPSServiceParams(String interfaceName,ReadableMap readableMap, boolean flagSign, Callback actionCallback){
        JSONObject jsonObject = fromJSObjService.readableMapToJson(readableMap);
        try {
            jsonObject = requestParams.setCPSServiceParams(jsonObject, null, NetConstants.EVN, null, flagSign);
            if(interfaceName.equals("MLgn001")){
                JsonObject requestSon = new JsonObject();
                jsonObject.put("areaCode", "440000");
                jsonObject.put("bluemac","0");
                jsonObject.put("wifimac",Util.getWifiMac(context));
                jsonObject.put("merId",Util.getMerId());
                Iterator it = jsonObject.keys();
                while (it.hasNext()){
                    String key = (String) it.next();
                    if(jsonObject.get(key).getClass().getSimpleName().equals("Double")){
                        requestSon.addProperty(key,String.valueOf(jsonObject.getInt(key)));
                    }else if(jsonObject.get(key).getClass().getSimpleName().equals("Integer")){
                        requestSon.addProperty(key,String.valueOf(jsonObject.getInt(key)));
                    }else{
                        requestSon.addProperty(key,jsonObject.getString(key));
                    }
                }

                jsonObject.put("sign", SignUtil.getSign(requestSon, "bestpay987654321"));
            }

            System.out.println("map:"+jsonObject.toString());
            actionCallback.invoke(NetConstants.getRequestUrl_CPS(interfaceName),jsonObject.toString());

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }



}
