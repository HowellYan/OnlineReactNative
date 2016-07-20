package com.innovation.value.location;

import android.app.Application;
import android.util.Log;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.innovation.value.ValueUtil;

/**
 * Created by Howell on 16/5/12.
 */
public class MyLocationListenner extends Application implements BDLocationListener {
    public static String currentCitycode;
    public LocationClient mLocationClient = null;
    public MyLocationListenner myListener = new MyLocationListenner();

    @Override
    public void onCreate() {
        initBaiduGps();
        super.onCreate();
    }

    private void initBaiduGps() {
        // 百度地图gps初始化
        mLocationClient = new LocationClient(this);
        mLocationClient.registerLocationListener(myListener);
    }
    @Override
    public void onReceiveLocation(BDLocation location) {
        if (location == null)
            return;
        if (ValueUtil.isNotEmpty(location)) {
            String Citycode = location.getCityCode();
            if (ValueUtil.isNotEmpty(Citycode)) {
                currentCitycode = Citycode;
                Log.i("MainApplication","CityCode=" + Citycode);
            }
        }
    }
    public void onReceivePoi(BDLocation poiLocation) {
        if (poiLocation == null) {
            return;
        }
    }

    public static String getCurrentCitycode() {
        return currentCitycode;
    }

}
