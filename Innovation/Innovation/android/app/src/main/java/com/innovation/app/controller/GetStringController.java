package com.innovation.app.controller;


import android.util.Log;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.innovation.app.service.FromJSObjService;
import com.innovation.net.NetConstants;
import com.innovation.value.encryption.AesCipher;
import com.innovation.value.encryption.Security;
import org.json.JSONException;
import org.json.JSONObject;

import java.security.GeneralSecurityException;
import java.util.Map;

import javax.annotation.Nullable;

import static com.innovation.value.encryption.AesCipher.decrypt;

/**
 * Created by Howell on 16/5/6.
 */
public class GetStringController extends ReactContextBaseJavaModule {
    FromJSObjService fromJSObjService = null;

    public GetStringController(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GetStringController";
    }

    @Override
    public void initialize() {
        fromJSObjService = new FromJSObjService();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    @ReactMethod
    public void getEncryptPassword(ReadableMap readableMap, Callback actionCallback){
        JSONObject json = fromJSObjService.readableMapToJson(readableMap);
        try {
            if(json.getString("isNewFlow").equals("N")){
                String encryptPasswordStr = Security.encryptPassword(json.getString("staffCode"), json.getString("password"), json.getString("randNum"));
                actionCallback.invoke(encryptPasswordStr);
            } else if(json.getString("isNewFlow").equals("Y")){
                try {
                    String decryptStr = AesCipher.decrypt(json.getString("randNumKey"), json.getString("randNum"));
                    String decryptIndexStr =  AesCipher.decrypt(json.getString("randNumKey"), json.getString("randomCodeIndex"));
                    String psw = AesCipher.encrypt(decryptStr,json.getString("password"));
                    actionCallback.invoke(psw, decryptIndexStr);
                } catch (GeneralSecurityException e) {
                    e.printStackTrace();
                    Log.i("getEncryptPassword", "getEncryptPassword:"+e.getMessage());
                }

            }


        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void getEncryptVerifyCode(String verifyCode, Callback actionCallback){
        String verifyCodeStr = Security.encryptVerifyCode(verifyCode, NetConstants.EVN);
        actionCallback.invoke(verifyCodeStr);
    }


    @ReactMethod
    public void getTime(String a, Callback actionCallback){
        System.out.println(a+","+actionCallback.toString());
        actionCallback.invoke("out");
    }
}
