package com.innovation.value.encryption;

import com.innovation.value.decoder.BASE64Decoder;
import com.innovation.value.decoder.BASE64Encoder;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by Howell on 16/5/11.
 */
public class CryptTool {

    private static final String[] hexDigits = { "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" };

    public static String byteArrayToHexString(byte[] b) {
        StringBuffer resultSb = new StringBuffer();
        for (int i = 0; i < b.length; i++) {
            resultSb.append(byteToHexString(b[i]));
        }
        return resultSb.toString().toUpperCase();
    }

    public static byte[] hexString2ByteArray(String strIn) throws Exception {
        byte[] arrB = strIn.getBytes();
        int iLen = arrB.length;

        byte[] arrOut = new byte[iLen / 2];
        for (int i = 0; i < iLen; i += 2) {
            String strTmp = new String(arrB, i, 2);
            arrOut[(i / 2)] = ((byte) Integer.parseInt(strTmp, 16));
        }
        return arrOut;
    }

    private static String byteToHexString(byte b) {
        int n = b;
        if (n < 0)
            n += 256;
        int d1 = n / 16;
        int d2 = n % 16;
        return hexDigits[d1] + hexDigits[d2];
    }

    public static SecretKey genDESKey(byte[] key_byte) throws Exception {
        SecretKey k = null;
        k = new SecretKeySpec(key_byte, "DESede");
        return k;
    }

    public static SecretKey genDESKey() throws Exception {
        String keyStr = "$1#2@f3&4~6%7!a+*cd(e-h)";

        byte[] key_byte = keyStr.getBytes();
        SecretKey k = null;
        k = new SecretKeySpec(key_byte, "DESede");
        return k;
    }

    public static SecretKey genDESKey(String key) throws Exception {
        String keyStr = key;

        byte[] key_byte = keyStr.getBytes();
        SecretKey k = null;
        k = new SecretKeySpec(key_byte, "DESede");
        return k;
    }

    public static byte[] desDecrypt(SecretKey key, byte[] crypt)
            throws Exception {
        Cipher cipher = Cipher.getInstance("DESede");
        cipher.init(2, key);
        return cipher.doFinal(crypt);
    }

    public static String desDecrypt(SecretKey key, String crypt)
            throws Exception {
        return new String(desDecrypt(key, hexString2ByteArray(crypt)));
    }

    public static String desDecrypt(String key, String crypt) {
        String procKey = procKey(key);
        try {
            return desDecrypt(genDESKey(procKey), crypt);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String procKey(String key) {
        if (key.length() < 24) {
            while (key.length() < 24) {
                key = key + "0";
            }
            return key;
        }
        if (key.length() > 24) {
            return key.substring(0, 24);
        }

        return key;
    }

    public static byte[] desEncrypt(SecretKey key, byte[] src) throws Exception {
        Cipher cipher = Cipher.getInstance("DESede");
        cipher.init(1, key);
        return cipher.doFinal(src);
    }

    public static String desEncrypt(SecretKey key, String src) throws Exception {
        return byteArrayToHexString(desEncrypt(key, src.getBytes()));
    }

    public static String desEncrypt(String key, String src) {
        String procKey = procKey(key);
        try {
            return desEncrypt(genDESKey(procKey), src);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static byte[] md5Digest(byte[] src) throws Exception {
        MessageDigest alg = MessageDigest.getInstance("MD5");

        return alg.digest(src);
    }

    public static String md5Digest(String src) throws Exception {
        return byteArrayToHexString(md5Digest(src.getBytes()));
    }

    public static String base64Encode(String src) {
        BASE64Encoder encoder = new BASE64Encoder();

        return encoder.encode(src.getBytes());
    }

    public static String base64Encode(byte[] src) {
        BASE64Encoder encoder = new BASE64Encoder();

        return encoder.encode(src);
    }

    public static String base64Decode(String src) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            return byteArrayToHexString(decoder.decodeBuffer(src));
        } catch (Exception ex) {
        }
        return null;
    }

    public static byte[] base64DecodeToBytes(String src) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            return decoder.decodeBuffer(src);
        } catch (Exception ex) {
        }
        return null;
    }

    public static String urlEncode(String src) {
        try {
            return URLEncoder.encode(src, "UTF-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return src;
    }

    public String urlDecode(String value) {
        try {
            return URLDecoder.decode(value, "UTF-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return value;
    }

    public static void main(String[] args) {
        try {
            String desStr = "CHANNELCODE=0770000001ORDERID=2013071700637413SERNUM2013071700637413VOUCHER_NO=";

            String keyStr = "123456";
            desStr = desStr + "&KEY=" + keyStr;
            System.out.println("待加密的字符串 desStr ＝＝ " + desStr);

            byte[] src_byte = desStr.getBytes();

            byte[] md5Str = md5Digest(src_byte);

            String SING = byteArrayToHexString(md5Str);
            System.out.println("SING == " + SING);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
