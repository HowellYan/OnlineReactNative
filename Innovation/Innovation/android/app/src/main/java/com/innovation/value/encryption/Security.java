package com.innovation.value.encryption;


import com.innovation.value.sign.MSignUtil;


/**
 * Created by Howell on 16/5/11.
 */
public class Security {

    static final byte[] RAW_KEY_DATA = { 0x11, 0x22, 0x33, 0x44, 0x44, 0x33,
            0x22, 0x11 };
    public static String CONSTSTRING = "aienbiei22&*#*(@ieizewbxwerq?";
    private static String PUBLIC_KEY_OFF_VERIFYCODE_PRODUCE = "CGZK13qKzE$6ZiGI";// 生成环境验证码加密公钥

    private static String PUBLIC_KEY_OFF_VERIFYCODE_TEST = "PublicKeyThreeDES";// 测试环境验证码加密公钥

    /**
     * 加密密码
     *
     * @param staffCode
     *            用户名
     * @param password
     *            密码
     * @param random
     *            随机数
     * @return 加密后的密码
     */
    public static String encryptPassword(String staffCode, String password, String random) {
        String encryptedPassword = "";
        if (random.isEmpty()) {
            return encryptedPassword;
        }
        String[] array = random.split("_");
        String id = array[0];
        String rand = array[1];
        encryptedPassword = id
                + "_"
                + MSignUtil.MD5Encode(id + MSignUtil.MD5Encode(MSignUtil.MD5Encode(staffCode + password + CONSTSTRING)) + rand);
        return encryptedPassword;
    }

    /**
     *
     * @Method_name: encryptVerifyCode
     * @Description: 验证码加密
     * @param verifyCode
     * @return
     * @return type: String
     * @throws
     * @author GuoYuehui
     */
    public static String encryptVerifyCode(String verifyCode,int EVN) {
        if (verifyCode.isEmpty())
            return "";

        String encryCode = verifyCode;
        try {
            encryCode = ThreeDes.desEncrypt(verifyCode, getVerifyCodePublicKey(EVN));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encryCode;
    }

    /**
     *
     * @Method_name: getVerifyCodePublicKey
     * @Description: 根据不同环境设置短信验证码公钥
     * @return
     * @return type: String
     * @throws
     * @author GuoYuehui
     */
    public static String getVerifyCodePublicKey(int EVN) {
        switch (EVN) {
            case 0:// 生产环境
                return PUBLIC_KEY_OFF_VERIFYCODE_PRODUCE;
            case 1:
            case 2:
            case 3:
                return PUBLIC_KEY_OFF_VERIFYCODE_TEST;

            default:
                return PUBLIC_KEY_OFF_VERIFYCODE_TEST;
        }
    }
}
