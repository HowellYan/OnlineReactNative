package com.innovation.value.encryption;

import com.innovation.value.decoder.BASE64Decoder;
import com.innovation.value.decoder.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by Howell on 16/5/11.
 */
public class ThreeDes {

    private static BASE64Encoder base64 = new BASE64Encoder();
    private static byte[] myIV = { 50, 51, 52, 53, 54, 55, 56, 57 };

    public static String desEncrypt(String input, String strkey)
            throws Exception {
        strkey = procKey(strkey);
        BASE64Decoder base64d = new BASE64Decoder();
        DESedeKeySpec p8ksp = null;
        p8ksp = new DESedeKeySpec(base64d.decodeBuffer(strkey));
        Key key = null;
        key = SecretKeyFactory.getInstance("DESede").generateSecret(p8ksp);

        input = padding(input);
        byte[] plainBytes = (byte[]) null;
        Cipher cipher = null;
        byte[] cipherText = (byte[]) null;

        plainBytes = input.getBytes("UTF8");
        cipher = Cipher.getInstance("DESede/CBC/NoPadding");
        SecretKeySpec myKey = new SecretKeySpec(key.getEncoded(), "DESede");
        IvParameterSpec ivspec = new IvParameterSpec(myIV);
        cipher.init(1, myKey, ivspec);
        cipherText = cipher.doFinal(plainBytes);
        String regStr = removeBR(base64.encode(cipherText));
        String rtn = CryptTool.byteArrayToHexString(regStr.getBytes());
        return rtn;
    }

    public static String desDecrypt(String cipherText, String strkey)
            throws Exception {
        cipherText = new String(CryptTool.hexString2ByteArray(cipherText));
        strkey = procKey(strkey);
        BASE64Decoder base64d = new BASE64Decoder();
        DESedeKeySpec p8ksp = null;
        p8ksp = new DESedeKeySpec(base64d.decodeBuffer(strkey));
        Key key = null;
        key = SecretKeyFactory.getInstance("DESede").generateSecret(p8ksp);

        Cipher cipher = null;
        byte[] inPut = base64d.decodeBuffer(cipherText);
        cipher = Cipher.getInstance("DESede/CBC/NoPadding");
        SecretKeySpec myKey = new SecretKeySpec(key.getEncoded(), "DESede");
        IvParameterSpec ivspec = new IvParameterSpec(myIV);
        cipher.init(2, myKey, ivspec);
        byte[] output = removePadding(cipher.doFinal(inPut));

        return new String(output, "UTF8");
    }

    private static String removeBR(String str) {
        StringBuffer sf = new StringBuffer(str);

        for (int i = 0; i < sf.length(); i++) {
            if (sf.charAt(i) == '\n') {
                sf = sf.deleteCharAt(i);
            }
        }
        for (int i = 0; i < sf.length(); i++) {
            if (sf.charAt(i) == '\r') {
                sf = sf.deleteCharAt(i);
            }
        }
        return sf.toString();
    }

    public static String padding(String str) {
        try {
            byte[] oldByteArray = str.getBytes("UTF8");
            int numberToPad = 8 - oldByteArray.length % 8;
            byte[] newByteArray = new byte[oldByteArray.length + numberToPad];
            System.arraycopy(oldByteArray, 0, newByteArray, 0,
                    oldByteArray.length);
            for (int i = oldByteArray.length; i < newByteArray.length; i++) {
                newByteArray[i] = 0;
            }
            return new String(newByteArray, "UTF8");
        } catch (UnsupportedEncodingException e) {
            System.out.println("Crypter.padding UnsupportedEncodingException");
        }
        return null;
    }

    public static byte[] removePadding(byte[] oldByteArray) {
        int numberPaded = 0;
        for (int i = oldByteArray.length; i >= 0; i--) {
            if (oldByteArray[(i - 1)] != 0) {
                numberPaded = oldByteArray.length - i;
                break;
            }
        }

        byte[] newByteArray = new byte[oldByteArray.length - numberPaded];
        System.arraycopy(oldByteArray, 0, newByteArray, 0, newByteArray.length);

        return newByteArray;
    }

    private static String procKey(String key) {
        if (key.length() < 32) {
            while (key.length() < 32) {
                key = key + "0";
            }
            return key;
        }
        if (key.length() > 32) {
            return key.substring(0, 32);
        }

        return key;
    }
//
//	public static void main(String[] args) throws Exception {
//		String input = "CHANNELCODE=0770000001ORDERID=2013071700637413SERNUM2013071700637413VOUCHER_NO=";
//		String strkey = "3536363832343930";
//		System.out.println("加密前：" + input);
//		System.out.println("密钥：" + strkey);
//		String desstr = desEncrypt(input, strkey);
//		System.out.println("加密后：" + desstr);
//		String input1 = desDecrypt(desstr, strkey);
//		System.out.println(input1);
//	}
}
