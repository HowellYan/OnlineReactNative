package com.innovation.value.sign;


import android.util.Log;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.innovation.value.ValueUtil;

public class SignUtil {

    private static SignVersionOne signVersionOne = new SignVersionOne();
    private static SignVersionTwo signVersionTwo = new SignVersionTwo();

    /**
     *
     * @param obj
     * @param signKey
     * @return
     */
    public static String getSign(final Object obj, String signKey, String signVersion) {
        if (ValueUtil.isEmpty(signVersion)) {
            signVersion = AbstractSigner.DEFAULT_SIGN_VERSION;
        }
        if (AbstractSigner.SIGN_VERSION_ONE.equalsIgnoreCase(signVersion)) {
            return signVersionOne.sign(obj, signKey);
        } else if (AbstractSigner.SIGN_VERSION_TWO
                .equalsIgnoreCase(signVersion)) {
            return signVersionTwo.sign(obj, signKey);
        }
        return null;
    }

    public static String getSign(final Object obj, String signKey) {
        return signVersionTwo.sign(obj, signKey);
    }

    public static String getSign(final Map<String, Object> map, String signKey) {
        return signVersionTwo.sign(map, signKey);
    }

    public static Map<String, String> jsonStrToMap(String jsonStr) {

        if (null == jsonStr) {
            return null;
        }
        Map<String, String> map = new HashMap<String, String>();
        Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();
        Map<String, String> retMap2 = gson.fromJson(jsonStr, new TypeToken<Map<String, String>>() {}.getType());

        for (String key : retMap2.keySet()) {
            Log.d("SignUtil","key:" + key + " values:" + retMap2.get(key));
        }
        return map;
    }

    /**
     * 把JSON转成MAP
     *
     * @param jsonStr
     * @return
     */
    public static Map<String, Object> getMapForJson(String jsonStr) {
        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject(jsonStr);
            Iterator<String> keyIter = jsonObject.keys();
            String key;
            Object value;
            Map<String, Object> valueMap = new HashMap<String, Object>();
            while (keyIter.hasNext()) {
                key = keyIter.next();
                if ("sign".equals(key) || "serialVersionUID".equals(key)) {
                    continue;
                }
                value = jsonObject.get(key);

                if (value == null || "".equals(value.toString())
                        || "null".equals(value.toString())) {
                    continue;
                }
                valueMap.put(key, value);
            }
            return valueMap;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 把JSON转成MAP
     *
     * @param jsonObj
     * @return
     */
    public static Map<String, Object> getMapForJsonObj(JSONObject jsonObj) {
        try {
            Iterator<String> keyIter = jsonObj.keys();
            String key;
            Object value;
            Map<String, Object> valueMap = new HashMap<String, Object>();
            while (keyIter.hasNext()) {
                key = keyIter.next();
                if ("sign".equals(key) || "serialVersionUID".equals(key)) {
                    continue;
                }
                value = jsonObj.get(key);
                if (value == null || "".equals(value.toString())
                        || "null".equals(value.toString())) {
                    continue;
                }
                valueMap.put(key, value);
            }
            return valueMap;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * @param map
     * @param signKey
     * @return
     */
    public static String getSignForMap(Map<String, String> map, String signKey) {
        String signStr = null;
        String sign = null;
        try {
            StringBuffer buffer = new StringBuffer();
            List<Map.Entry<String, String>> list = new ArrayList<Map.Entry<String, String>>(
                    map.entrySet());
            // 排序
            Collections.sort(list, new Comparator<Map.Entry<String, String>>() {
                public int compare(final Map.Entry<String, String> o1,
                                   final Map.Entry<String, String> o2) {
                    return o1.getKey().compareTo(o2.getKey());
                }
            });
            for (Map.Entry<String, String> maEntry : list) {
                String val = maEntry.getValue();
                if (val == null || ((String) val).trim().equals("")) {
                    continue;
                }
                buffer.append(maEntry.getKey()).append("=").append(val)
                        .append("&");
            }

            if (buffer.length() == 0) {

                return null;
            }
            // key为空时，不带入
            if (signKey != null) {
                buffer.append("key=").append(signKey);
            } else {
                buffer.deleteCharAt(buffer.length() - 1);
            }

            signStr = buffer.toString();
            // Logger.i("================signStr================"+signStr);

            sign = MSignUtil.getMD5(signStr.getBytes("utf-8")).toUpperCase();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }

    /*
     * 把SIGN值去掉
     */
    public static String returnJsonNotSign(String json) {
        try {
            // json =
            // "{\"code\":\"000000\",\"content\":\"成功\",\"sign\":\"9B99A8AA3354BF6FD3C4A843F687B9C6\",\"bankMode\":\"BT1001\",\"dayLimit\":\"0\",\"dayTotal\":\"0\",\"motherBoard\":\"0\",\"monthLimit\":\"0\",\"monthTotal\":\"11000\",\"accountItems\":[{\"acctType\":\"0001\",\"acctStat\":\"2\",\"balance\":\"0\",\"activeBalance\":\"0\",\"frozenBalance\":\"0\"},{\"acctType\":\"0007\",\"acctStat\":\"2\",\"balance\":\"273480\",\"activeBalance\":\"273480\",\"frozenBalance\":\"0\"},{\"acctType\":\"0110\",\"acctStat\":\"2\",\"balance\":\"23\",\"activeBalance\":\"23\",\"frozenBalance\":\"0\"}]}";
            int i = json.indexOf("sign");
            if (i > 0) {
                int j = i + 32 + 10;
                json = json.substring(0, i - 2) + json.substring(j - 2);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return json;
    }

    /**
     * 不进行排序
     *
     * @param orgStr
     * @param signKey
     * @return
     */
    public static String getSignForMap1(String orgStr, String signKey) {
        String signStr = null;
        String sign = null;
        try {
            StringBuffer buffer = new StringBuffer(orgStr);
            // key为空时，不带入
            if (signKey != null) {
                buffer.append("&key=").append(signKey);
            } else {
                buffer.deleteCharAt(buffer.length() - 1);
            }
            signStr = buffer.toString();
            sign = MSignUtil.getMD5(signStr.getBytes("utf-8")).toUpperCase();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sign;
    }


}
