package com.facebook.react.devsupport;

import android.util.Log;

import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by Howell on 16/5/30.
 */
public class DownloadBundleFileMD5 {

    public static boolean checkMD5(String serverMD5Str, File downloadFile){
        boolean isOK=false;
        try {
            FileInputStream fisTargetFile = new FileInputStream(downloadFile);
            String targetFileStr = IOUtils.toString(fisTargetFile, null);
            String downloadFileMd5 = strToMD5(strToMD5(targetFileStr)+"bestpay1234567890abcdefghijk");

            if(serverMD5Str.equals(downloadFileMd5)){
                isOK = true;
                Log.i("downloadBundleFileMD5","Bundle File 校验成功");
            } else {
                Log.i("downloadBundleFileMD5","Bundle File 校验失败");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return isOK;
    }

    public static String strToMD5(String str){
        String md5Str = "";
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        md.update(str.getBytes());
        byte byteData[] = md.digest();
        //convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        md5Str = sb.toString();
        Log.i("","Digest(in hex format):: " + sb.toString());
        //convert the byte to hex format method 2
        /*StringBuffer hexString = new StringBuffer();
        for (int i=0;i<byteData.length;i++) {
            String hex=Integer.toHexString(0xff & byteData[i]);
            if(hex.length()==1) hexString.append('0');
            hexString.append(hex);
        }
        Log.i("","Digest(in hex format):: " + hexString.toString());*/

        return md5Str;
    }


}
