package com.innovation.net;

/**
 * Created by Howell on 16/5/10.
 */
public class NetConstants {
    /**
     * 环境标识，0表示生产，1表示42测试,2表示44测试，3表示60环境,4表示46环境,5表示准生产
     */

    public static final int PRODUCT = 0;
    public static final int EVN42 = 1;
    public static final int EVN44 = 2;
    public static final int EVN60 = 3;
    public static final int EVN46 = 4;
    public static final int PRE_PRODUCT = 5;

    public final static int EVN = EVN44;


    /**
     * @Fields URL_TEST_CPS : 请求CPS 44环境
     */
    public final static String URL_TEST_CPS_44 = "http://172.26.13.104:8383";//44内网(新地址)

    /**
     * @Fields URL_TEST_CPS : 请求CPS 46环境
     */
    public final static String URL_TEST_CPS_46 = "http://172.26.13.112:8383";// 46新地址

    /**
     * @Fields URL_TEST_CPS : 请求CPS 60环境
     */
    public final static String URL_TEST_CPS_60 = "http://172.26.13.96:8383";

    /**
     * @Fields URL_TEST_CPS_42 : 请求CPS 42环境
     */
    public final static String URL_TEST_CPS_42 = "http://183.62.49.173:8383";

    /**
     * @Fields URL_TEST_CPS_62 : 请求CPS 准生产
     */
    public final static String URL_TEST_CPS_62 = "https://183.63.191.62:4443";

    /**
     * @Fields URL_CPS 生产环境
     */
    public final static String URL_CPS = "https://enterprise.bestpay.com.cn:4443";
    /**
     * @Method_name: getRequestUrl
     * @Description: 通过接口名获取数据访问的url
     * @param interfaceName
     *            请求的接口名
     * @return
     * @return_type: String
     * @throws
     * @author lijinwen
     */
    public static String getRequestUrl_CPS(String interfaceName) {
        StringBuffer sb = new StringBuffer();
        switch (EVN) {
            case PRODUCT:
                sb.append(URL_CPS);
                break;
            case EVN42:
                sb.append(URL_TEST_CPS_42);
                break;
            case EVN44:
                sb.append(URL_TEST_CPS_44);
                break;
            case EVN60:
                sb.append(URL_TEST_CPS_60);
                break;
            case EVN46:
                sb.append(URL_TEST_CPS_46);
                break;
            case PRE_PRODUCT:
                sb.append(URL_TEST_CPS_62);
                break;
            default:
                sb.append(URL_CPS);
                break;
        }
        return !checkNull(interfaceName) ? sb.append("/").append(interfaceName)
                .toString() : "interface name cannot be empty!";
    }

    /* 空值检测 */
    private static boolean checkNull(String arg) {
        return arg == null || arg.equals("");
    }
}
