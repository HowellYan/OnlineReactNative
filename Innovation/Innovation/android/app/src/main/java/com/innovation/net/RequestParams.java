package com.innovation.net;

import com.google.gson.JsonObject;
import com.innovation.bean.UserInfo;
import com.innovation.util.Util;
import com.innovation.value.ValueUtil;
import com.innovation.value.sign.SignUtil;

import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;
import java.util.Random;

/**
 * Created by Howell on 16/5/10.
 */
public class RequestParams {

    private Context context;
    public RequestParams(Context mContext) {
        this.context = mContext;
    }
    public final static String signKeyword = "bestpay987654321";
    public static String CONSTSTRING = "aienbiei22&*#*(@ieizewbxwerq?";

    public static int randomSequence = 0;// 随机数后面再加序列
    private static final int PRODUCT = 0;// 生产环境
    private static final int PRE_PRODUCT = 1;// 准生产环境
    private static final int PUBLIC = 2;// 42，常规版环境
    private static final int PRIVATE = 3;// 87.4，开发环境
    private static final int ENV44 = 4;// 44环境，紧急版测试环境
    private static final int ENV_REFINE = 5;// 重构环境
    private static final int ENV46 = 6;// 46环境，紧急版测试环境
    private static final int ENV60 = 7;// 60环境，新开发环境
    private static int ENV = 0;
    /**
     * 调CPS的接口
     *
     * @param request
     *            请求内容
     * @param Token
     *            用户信息
     * @param ENV
     *            环境
     *
     */
    public JSONObject setCPSServiceParams(JSONObject request, String Token, int ENV, UserInfo userInfo, boolean flagSign) throws JSONException {
        if (userInfo != null) {
            request.put("merId", userInfo.getPrtnCode());
            if(request.isNull("custCode")) {
                request.put("custCode", userInfo.getCustCode());
            }
            if(request.isNull("staffCode")){
                request.put("staffCode", userInfo.getStaffCode());
            }
        } else {
            // 如果用户信息为空，也不需要添加签名
            flagSign = false;
        }
        this.ENV = ENV;
        request.put("channelCode", "20");
        request.put("tmnNum", getTmnNumber(ENV));
        request.put("keep", getKeep(ENV));
        request.put("vender", android.os.Build.BRAND);
        request.put("model", android.os.Build.MODEL);
        request.put("kernelVersion", Util.getLinuxCoreVer());
        request.put("clientVersion", Util.getAppVersionName(context));
        request.put("softwareType", "交费易");
        request.put("systemVersion", android.os.Build.VERSION.RELEASE);
        request.put("systemType", "Android");
        request.put("bisChannel", "01");
        request.put("imsi", Util.getImsi(context));
        request.put("imei", Util.getImei(context));
        request.put("mac",Util.getWifiMac(context));
        request.put("signType","RSA");
        // 从ParentReq开始，才有Sign值
        if (flagSign) {

            JsonObject requestSon = new JsonObject();
            Iterator it = request.keys();
            while (it.hasNext()){
                String key = (String) it.next();

                if(request.get(key).getClass().getSimpleName().equals("Double")){
                    requestSon.addProperty(key,String.valueOf(request.getInt(key)));
                }else if(request.get(key).getClass().getSimpleName().equals("Integer")){
                    requestSon.addProperty(key,String.valueOf(request.getInt(key)));
                }else{
                    requestSon.addProperty(key,request.getString(key));
                }
            }
            //JsonObject requestSon = new Gson().fromJson(request.toString(),JsonObject.class);

            request.put("sign", SignUtil.getSign(requestSon, Token));
        }
        request.put("signVer", "2");
        return request;
    }

    public JSONObject setCPSVerificaParams(JSONObject request, String Token, int ENV) throws JSONException {
        request.put("channelCode", "20");
        request.put("keep", getKeep(ENV));
        // 从ParentReq开始，才有Sign值
        JsonObject requestSon = new JsonObject();
        Iterator it = request.keys();
        while (it.hasNext()){
            String key = (String) it.next();
            requestSon.addProperty(key,request.getString(key));
        }
        request.put("sign", SignUtil.getSign(requestSon, Token));
        return request;
    }
    public JSONObject setCPSParams(JSONObject request, String Token, int ENV, String kepp) throws JSONException {

        // 从ParentReq开始，才有Sign值
        JsonObject requestSon = new JsonObject();
        Iterator it = request.keys();
        while (it.hasNext()){
            String key = (String) it.next();
            requestSon.addProperty(key,request.getString(key));
        }
        request.put("sign", SignUtil.getSign(requestSon, Token));
        if(kepp == null){
            request.put("keep", getKeep(ENV));
        }else{
            request.put("keep", kepp);
        }


        request.put("channelCode", "20");
        return request;
    }
    /**
     * @Description 获取本次服务的标识流水
     * @return
     */
    public static synchronized String getKeep(int ENV) {
        return getKeep(getTmnNumber(ENV));
    }
    public static synchronized String getKeep() {
        return getKeep(getTmnNumber(ENV));
    }

    /**
     * @Description 获取本次服务的标识流水
     * @param tmnNum
     *            终端号，需要分配
     * @return 20渠道号 + 四位完全的随机数 +时间（毫秒级）+ 五位完全的随机数 + keep序列号（01到99）
     */
    public static String getKeep(String tmnNum) {
        if (randomSequence > 99) {
            randomSequence = 0;
        }
        String randomSequenceString = ValueUtil.sNull(randomSequence);
        if (ValueUtil.isNotEmpty(randomSequenceString) && randomSequenceString.length() == 1) {
            randomSequenceString = "0" + randomSequenceString;
        }
        String keep = "20" + get4RandomNumber() + getTime_yyyyMMddHHmmssSSS()
                + get5RandomNumber() + randomSequenceString;
        randomSequence++;
        return keep;
    }
    /**
     * 终端号
     *
     * @return
     */
    public static String getTmnNumber(int ENV) {
        String tmnNum = "";
        switch (ENV) {
            case PRODUCT:
            case PRE_PRODUCT:
                tmnNum = "440106014022";
                break;
            case PUBLIC:
            case ENV44:
            case ENV46:
                tmnNum = "440106003094";
                break;
            default:
                tmnNum = "440106014021";
        }
        return tmnNum;
    }

    /**
     * 接入机构编码
     *
     * @return
     */
    public static String getMerId(int ENV) {
        String merId = "";
        switch (ENV) {
            case PRODUCT:
            case PRE_PRODUCT:
                merId = "8604400000143100";
                break;
            case PUBLIC:
            case ENV44:
            case ENV46:
                merId = "8613051700001006";
                break;
            default:
                merId = "8613052900079605";
        }
        return merId;
    }

    /**
     * 获取四位随机数
     *
     * @return
     */
    public static String get4RandomNumber() {
        String randstr = "";
        Random ran = new Random(System.currentTimeMillis());
        randstr = "" + (ran.nextInt(9000) + 1000);
        return randstr;
    }

    /**
     * @Description 获取yyyyMMddHHmmssSSS格式的时间字符串(毫秒级别的)
     * @return {@link String}时间
     */
    public static String getTime_yyyyMMddHHmmssSSS() {
        Date currentDate = new Date();
        DateFormat formater = new SimpleDateFormat("yyyyMMddHHmmssSSS",
                Locale.CHINESE);
        return formater.format(currentDate);
    }

    /**
     * 获取五位随机数（完全随机）
     *
     * @return
     */
    public static String get5RandomNumber() {
        String randstr = "";
        Random ran = new Random();
        randstr = "" + (ran.nextInt(90000) + 10000);
        return randstr;
    }
}
