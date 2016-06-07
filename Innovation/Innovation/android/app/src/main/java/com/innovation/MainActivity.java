package com.innovation;


import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;


import com.facebook.react.devsupport.DevSupportManager;
import com.facebook.react.modules.systeminfo.AndroidInfoHelpers;
import com.facebook.react.shell.MainReactPackage;

import com.innovation.app.PluginReactPackage;
import com.innovation.util.UpdateApp;

import java.util.Arrays;
import java.util.List;


public class MainActivity extends ReactActivity {
    UpdateApp updateApp = new UpdateApp();
    private ReactInstanceManager mReactInstanceManager;
    public static String DevUrl = "121.40.179.114:8081";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactInstanceManager = this.getReactInstanceManager();
    }

    @Override
    protected void onStart() {
        super.onStart();
        mReactInstanceManager.destroy();
        DevSupportManager devSupportManager = mReactInstanceManager.getDevSupportManager();
        updateApp.reloadJS(devSupportManager);
    }




    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Innovation";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new PluginReactPackage()
        );
    }



    @Override
    protected String getJSMainModuleName() {

        //DevUrl = "172.26.13.227:8081";//翼支付
        DevUrl = "10.0.3.2:8081";//本地
        AndroidInfoHelpers.GENYMOTION_LOCALHOST=DevUrl;
        AndroidInfoHelpers.EMULATOR_LOCALHOST=DevUrl;
        AndroidInfoHelpers.DEVICE_LOCALHOST=DevUrl;


        return "app/android/Login.android";
        //return "app/android/android_naviator_react-native";
        //return "index.android";
    }

}
