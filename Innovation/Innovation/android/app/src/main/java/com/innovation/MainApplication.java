package com.innovation;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.systeminfo.AndroidInfoHelpers;
import com.facebook.react.shell.MainReactPackage;
import com.innovation.app.PluginReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new PluginReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      String DevUrl = "121.40.179.114:8081";

      DevUrl = "172.26.13.227:8081";//翼支付
      //  DevUrl = "10.0.3.2:8081";//本地
      AndroidInfoHelpers.GENYMOTION_LOCALHOST=DevUrl;
      AndroidInfoHelpers.EMULATOR_LOCALHOST=DevUrl;
      AndroidInfoHelpers.DEVICE_LOCALHOST=DevUrl;

      return "app/android/Login.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }


}
