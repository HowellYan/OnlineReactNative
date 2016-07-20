package com.innovation.util;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.innovation.net.NetConstants;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by Howell on 16/5/10.
 */
public class Util {
    /**
     * @Description 获取程序的版本名：VersionName
     * @param context
     *            程序上下文
     * @return {@link String} VersionName or empty String
     */
    public static String getAppVersionName(Context context) {
        String versionName = "";
        if (context != null) {
            PackageManager pm = context.getPackageManager();
            try {
                PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);
                versionName = pi.versionName;
            } catch (PackageManager.NameNotFoundException e) {
                versionName = "";
                Log.e("Util","getAppVersionName" + e);
            }
        }
        return versionName;
    }
    /**
     *
     * @Method_name: getWifiMac
     * @Description: 获取wifi地址
     * @param mContext
     * @return
     * @return_type: String
     * @throws
     * @author ChengYangxin
     */
    public static String getWifiMac(Context mContext) {
        WifiManager mWifiManager = (WifiManager) mContext
                .getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = mWifiManager.getConnectionInfo();
        String wifiMac = wifiInfo.getMacAddress();
        if (wifiMac == null || wifiMac.equals("")) {
            return "";
        }
        return wifiMac;
    }
    /**
     *
     * @Method_name: getImei
     * @Description: 获取Imei
     * @param context
     * @return
     * @return_type: String
     * @throws
     * @author ChengYangxin
     */
    public static String getImei(Context context) {
        if (Build.MODEL.equalsIgnoreCase("M463C")
                && Build.BRAND.equalsIgnoreCase("Meizu")) {
            return ((TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
        }
        return new GetImei(context).getImei();
    }
    /**
     *
     * @Method_name: getImsi
     * @Description: 获取Imsi号码
     * @param context
     * @return
     * @return_type: String
     * @throws
     * @author ChengYangxin
     */
    public static String getImsi(Context context) {
        TelephonyManager phoneMgr = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        String imsi = phoneMgr.getSubscriberId();
        if (imsi == null || imsi.equals("") || imsi.length() != 15) {
            imsi = "46003";
        }
        return imsi;
    }

    public static String getLinuxCoreVer() {
        Process process = null;
        String kernelVersion = "";
        try {
            process = Runtime.getRuntime().exec("cat /proc/version");
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // get the output line
        InputStream outs = process.getInputStream();
        InputStreamReader isrout = new InputStreamReader(outs);
        BufferedReader brout = new BufferedReader(isrout, 8 * 1024);

        String result = "";
        String line;
        // get the whole standard output string
        try {
            while ((line = brout.readLine()) != null) {
                result += line;
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            if (result != "") {
                String Keyword = "version ";
                int index = result.indexOf(Keyword);
                line = result.substring(index + Keyword.length());
                index = line.indexOf(" ");
                kernelVersion = line.substring(0, index);
            }
        } catch (IndexOutOfBoundsException e) {
            e.printStackTrace();
        }
        return kernelVersion;
    }

    public static String getMerId() {
        String merId = "";
        switch (NetConstants.EVN) {
            case NetConstants.PRODUCT:
            case NetConstants.PRE_PRODUCT:
                merId = "8604400000143100";
                break;
            case NetConstants.EVN42:
            case NetConstants.EVN44:
            case NetConstants.EVN46:
                merId = "8613051700001006";
                break;
            default:
                merId = "8613052900079605";
        }
        return merId;
    }
}
