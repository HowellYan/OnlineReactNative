package com.innovation.value.encryption;

import org.apache.axiom.util.base64.Base64Utils;

import java.security.GeneralSecurityException;

/**
 * AES加密工具类
 * Author: Terence
 * Date:   2014/10/14
 * Time:   14:11
 */
public class AesCipher {
    public static final String AES_SALT = "a7fc844d17f43955783d7d6f5df7eb4e";

    public static void main(String[] args) throws GeneralSecurityException {

        System.out.println(encrypt("cx8j0xxacjnjh5ehxkppxnyzlxvecfgh", "132622265302850110698"));
    }

    /**
     * AES加密
     * @param transferKey 传输密钥
     * @param plainText 明文
     * @return 密文Base64串
     * @throws GeneralSecurityException 通用加密异常
     */
    public static String encrypt(String transferKey, String plainText) throws GeneralSecurityException {
        AES aes256 = getCipher(transferKey);
        byte cipherArray[] = aes256.encryptArrayNP(plainText.getBytes(), 0);
        String cipherText = Base64Utils.encode(cipherArray);
        return cipherText;
    }

    /**
     * AES解密
     * @param transferKey 传输密钥
     * @param cipherBase64Str 密文Base64串
     * @return 明文字符串
     * @throws GeneralSecurityException 通用加密异常
     */
    public static String decrypt(String transferKey, String cipherBase64Str) throws GeneralSecurityException {
        AES aes256 = getCipher(transferKey);
        byte[] cipherArray = Base64Utils.decode(cipherBase64Str);
        byte plainArray[] = aes256.decryptArrayNP(cipherArray, 0);
        String plainText = new String(plainArray).trim();

        return plainText;
    }


    public static AES getCipher(String transferKey) throws GeneralSecurityException {
        AES aes256 = new AES();
        aes256.makeKey(AES_SALT.getBytes());
        byte[] tmp = aes256.decryptArrayNP(transferKey.getBytes(), 0);
        byte[] realKey = new byte[32];
        System.arraycopy(Base64Utils.encode(tmp).getBytes(), 0, realKey, 0, 32);
        aes256.makeKey(realKey);

        return aes256;
    }


}
