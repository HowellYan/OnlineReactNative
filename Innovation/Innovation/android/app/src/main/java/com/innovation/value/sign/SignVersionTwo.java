package com.innovation.value.sign;

/**
 * Created by Howell on 16/5/10.
 */
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


public class SignVersionTwo extends AbstractSigner {

    @Override
    public String sign(Object obj, String signKey) {
        try {
            StringBuffer buffer = new StringBuffer();
            //Map<String, Object> map = ObjectHelper.getClassFieldsVersion2(obj);

            Map<String, Object> map = new Gson().fromJson((JsonObject)obj,Map.class);
            for (Map.Entry<String, Object> maEntry : map.entrySet()) {
                Object val = maEntry.getValue();
                if (val instanceof String[]) {
                    maEntry.setValue(Arrays.toString((String[]) val));
                }
            }
            List<Map.Entry<String, Object>> list = getSortedListFromMap(map);
            for (Map.Entry<String, Object> maEntry : list) {
                Object val = maEntry.getValue();

                if (val == null) {
                    continue;
                }
                if (val instanceof String) {
                    if (((String) val).trim().equals("")) {
                        continue;
                    }
                }
                buffer.append(maEntry.getKey()).append("=").append(val).append("&");
            }
            String sign = "";
            if(signKey == null){
                sign = buffer.toString().substring(0, buffer.toString().length()-1);
            }else{
                sign = buffer.append("key=").append(signKey).toString();
            }
            Log.i("SIGN_VERSION_TWO","request object:" + sign);
            sign = MSignUtil.getMD5(sign.getBytes("utf-8")).toUpperCase();
            Log.i("SIGN_VERSION_TWO","sign:" + sign);
            return sign;
        } catch (Exception e) {
            Log.i("SIGN_VERSION_TWO", "sign: "+e.getMessage().toString());
        }
        return null;
    }

    /**
     * @Method_name: sign
     * @Description: 签名
     * @param map
     *            参数字段集
     * @param signKey
     *            关键字
     * @return
     * @Return_type: String
     * @throws
     * @author JW.Lee
     */
    public String sign(Map<String, Object> map, String signKey) {
        try {
            StringBuffer buffer = new StringBuffer();

            List<Map.Entry<String, Object>> list = getSortedListFromMap(map);
            for (Map.Entry<String, Object> maEntry : list) {
                Object val = maEntry.getValue();

                if (val == null) {
                    continue;
                }
                if (val instanceof String) {
                    if (((String) val).trim().equals("")) {
                        continue;
                    }
                }
                buffer.append(maEntry.getKey()).append("=").append(val)
                        .append("&");
            }

            String sign = buffer.append("key=").append(signKey).toString();

            sign = MSignUtil.getMD5(sign.getBytes("utf-8")).toUpperCase();

            return sign;
        } catch (Exception e) {

        }
        return null;
    }
}