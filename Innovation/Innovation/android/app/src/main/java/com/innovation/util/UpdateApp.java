package com.innovation.util;


import android.util.Log;

import com.facebook.react.devsupport.DevSupportManager;

/**
 * Created by Howell on 16/5/12.
 */
public class UpdateApp {

    public void reloadJS(DevSupportManager devSupportManager){
        Log.i("UpdateApp"," reloadJS: "+devSupportManager.hasUpToDateJSBundleInCache());
        devSupportManager.handleReloadJS();
    }
}
