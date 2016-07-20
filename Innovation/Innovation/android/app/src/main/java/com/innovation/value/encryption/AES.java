package com.innovation.value.encryption;


import java.security.GeneralSecurityException;

/**
 * AES算法
 * Author: Terence
 * Date:   2014/10/14
 * Time:   18:57
 */
public final class AES {
    public AES() {
        Nr = 0;
        Nk = 0;
        Nw = 0;
        rek = null;
        rdk = null;
    }

    private void expandKey(byte cipherKey[]) {
        int r = 0;
        int i = 0;
        for (int k = 0; i < Nk; k += 4) {
            rek[i] = cipherKey[k] << 24 | (cipherKey[k + 1] & 255) << 16 | (cipherKey[k + 2] & 255) << 8 | cipherKey[k + 3] & 255;
            i++;
        }

        i = Nk;
        int temp;
        for (int n = 0; i < Nw; n--) {
            temp = rek[i - 1];
            if (n == 0) {
                n = Nk;
                temp = Se[temp >>> 16 & 255] << 24 | (Se[temp >>> 8 & 255] & 255) << 16 | (Se[temp & 255] & 255) << 8 | Se[temp >>> 24] & 255;
                temp ^= rcon[r++];
            } else if (Nk == 8 && n == 4)
                temp = Se[temp >>> 24] << 24 | (Se[temp >>> 16 & 255] & 255) << 16 | (Se[temp >>> 8 & 255] & 255) << 8 | Se[temp & 255] & 255;
            rek[i] = rek[i - Nk] ^ temp;
            i++;
        }

        temp = 0;
    }

    private void invertKey() {
        int d = 0;
        int e = 4 * Nr;
        rdk[d] = rek[e];
        rdk[d + 1] = rek[e + 1];
        rdk[d + 2] = rek[e + 2];
        rdk[d + 3] = rek[e + 3];
        d += 4;
        e -= 4;
        for (int r = 1; r < Nr; r++) {
            int w = rek[e];
            rdk[d] = Td0[Se[w >>> 24] & 255] ^ Td1[Se[w >>> 16 & 255] & 255] ^ Td2[Se[w >>> 8 & 255] & 255] ^ Td3[Se[w & 255] & 255];
            w = rek[e + 1];
            rdk[d + 1] = Td0[Se[w >>> 24] & 255] ^ Td1[Se[w >>> 16 & 255] & 255] ^ Td2[Se[w >>> 8 & 255] & 255] ^ Td3[Se[w & 255] & 255];
            w = rek[e + 2];
            rdk[d + 2] = Td0[Se[w >>> 24] & 255] ^ Td1[Se[w >>> 16 & 255] & 255] ^ Td2[Se[w >>> 8 & 255] & 255] ^ Td3[Se[w & 255] & 255];
            w = rek[e + 3];
            rdk[d + 3] = Td0[Se[w >>> 24] & 255] ^ Td1[Se[w >>> 16 & 255] & 255] ^ Td2[Se[w >>> 8 & 255] & 255] ^ Td3[Se[w & 255] & 255];
            d += 4;
            e -= 4;
        }

        rdk[d] = rek[e];
        rdk[d + 1] = rek[e + 1];
        rdk[d + 2] = rek[e + 2];
        rdk[d + 3] = rek[e + 3];
    }

    public void makeKey(byte cipherKey[], int keyBits, int direction)
            throws GeneralSecurityException {
        if (keyBits != 128 && keyBits != 192 && keyBits != 256)
            throw new GeneralSecurityException((new StringBuilder("Invalid AES key size (")).append(keyBits).append(" bits)").toString());
        Nk = keyBits >>> 5;
        Nr = Nk + 6;
        Nw = 4 * (Nr + 1);
        rek = new int[Nw];
        rdk = new int[Nw];
        if ((direction & 3) != 0) {
            expandKey(cipherKey);
            if ((direction & 2) != 0)
                invertKey();
        }
    }

    public void makeKey(byte cipherKey[])
            throws GeneralSecurityException {
        makeKey(cipherKey, cipherKey.length * 8, 3);
    }

    public byte[] encryptBlock(byte pt[], byte ct[]) {
        int k = 0;
        int t0 = (pt[0] << 24 | (pt[1] & 255) << 16 | (pt[2] & 255) << 8 | pt[3] & 255) ^ rek[0];
        int t1 = (pt[4] << 24 | (pt[5] & 255) << 16 | (pt[6] & 255) << 8 | pt[7] & 255) ^ rek[1];
        int t2 = (pt[8] << 24 | (pt[9] & 255) << 16 | (pt[10] & 255) << 8 | pt[11] & 255) ^ rek[2];
        int t3 = (pt[12] << 24 | (pt[13] & 255) << 16 | (pt[14] & 255) << 8 | pt[15] & 255) ^ rek[3];
        for (int r = 1; r < Nr; r++) {
            k += 4;
            int a0 = Te0[t0 >>> 24] ^ Te1[t1 >>> 16 & 255] ^ Te2[t2 >>> 8 & 255] ^ Te3[t3 & 255] ^ rek[k];
            int a1 = Te0[t1 >>> 24] ^ Te1[t2 >>> 16 & 255] ^ Te2[t3 >>> 8 & 255] ^ Te3[t0 & 255] ^ rek[k + 1];
            int a2 = Te0[t2 >>> 24] ^ Te1[t3 >>> 16 & 255] ^ Te2[t0 >>> 8 & 255] ^ Te3[t1 & 255] ^ rek[k + 2];
            int a3 = Te0[t3 >>> 24] ^ Te1[t0 >>> 16 & 255] ^ Te2[t1 >>> 8 & 255] ^ Te3[t2 & 255] ^ rek[k + 3];
            t0 = a0;
            t1 = a1;
            t2 = a2;
            t3 = a3;
        }

        k += 4;
        int v = rek[k];
        ct[0] = (byte) (Se[t0 >>> 24] ^ v >>> 24);
        ct[1] = (byte) (Se[t1 >>> 16 & 255] ^ v >>> 16);
        ct[2] = (byte) (Se[t2 >>> 8 & 255] ^ v >>> 8);
        ct[3] = (byte) (Se[t3 & 255] ^ v);
        v = rek[k + 1];
        ct[4] = (byte) (Se[t1 >>> 24] ^ v >>> 24);
        ct[5] = (byte) (Se[t2 >>> 16 & 255] ^ v >>> 16);
        ct[6] = (byte) (Se[t3 >>> 8 & 255] ^ v >>> 8);
        ct[7] = (byte) (Se[t0 & 255] ^ v);
        v = rek[k + 2];
        ct[8] = (byte) (Se[t2 >>> 24] ^ v >>> 24);
        ct[9] = (byte) (Se[t3 >>> 16 & 255] ^ v >>> 16);
        ct[10] = (byte) (Se[t0 >>> 8 & 255] ^ v >>> 8);
        ct[11] = (byte) (Se[t1 & 255] ^ v);
        v = rek[k + 3];
        ct[12] = (byte) (Se[t3 >>> 24] ^ v >>> 24);
        ct[13] = (byte) (Se[t0 >>> 16 & 255] ^ v >>> 16);
        ct[14] = (byte) (Se[t1 >>> 8 & 255] ^ v >>> 8);
        ct[15] = (byte) (Se[t2 & 255] ^ v);
        return ct;
    }

    public byte[] decryptBlock(byte ct[], byte pt[]) {
        int k = 0;
        int t0 = (ct[0] << 24 | (ct[1] & 255) << 16 | (ct[2] & 255) << 8 | ct[3] & 255) ^ rdk[0];
        int t1 = (ct[4] << 24 | (ct[5] & 255) << 16 | (ct[6] & 255) << 8 | ct[7] & 255) ^ rdk[1];
        int t2 = (ct[8] << 24 | (ct[9] & 255) << 16 | (ct[10] & 255) << 8 | ct[11] & 255) ^ rdk[2];
        int t3 = (ct[12] << 24 | (ct[13] & 255) << 16 | (ct[14] & 255) << 8 | ct[15] & 255) ^ rdk[3];
        for (int r = 1; r < Nr; r++) {
            k += 4;
            int a0 = Td0[t0 >>> 24] ^ Td1[t3 >>> 16 & 255] ^ Td2[t2 >>> 8 & 255] ^ Td3[t1 & 255] ^ rdk[k];
            int a1 = Td0[t1 >>> 24] ^ Td1[t0 >>> 16 & 255] ^ Td2[t3 >>> 8 & 255] ^ Td3[t2 & 255] ^ rdk[k + 1];
            int a2 = Td0[t2 >>> 24] ^ Td1[t1 >>> 16 & 255] ^ Td2[t0 >>> 8 & 255] ^ Td3[t3 & 255] ^ rdk[k + 2];
            int a3 = Td0[t3 >>> 24] ^ Td1[t2 >>> 16 & 255] ^ Td2[t1 >>> 8 & 255] ^ Td3[t0 & 255] ^ rdk[k + 3];
            t0 = a0;
            t1 = a1;
            t2 = a2;
            t3 = a3;
        }

        k += 4;
        int v = rdk[k];
        pt[0] = (byte) (Sd[t0 >>> 24] ^ v >>> 24);
        pt[1] = (byte) (Sd[t3 >>> 16 & 255] ^ v >>> 16);
        pt[2] = (byte) (Sd[t2 >>> 8 & 255] ^ v >>> 8);
        pt[3] = (byte) (Sd[t1 & 255] ^ v);
        v = rdk[k + 1];
        pt[4] = (byte) (Sd[t1 >>> 24] ^ v >>> 24);
        pt[5] = (byte) (Sd[t0 >>> 16 & 255] ^ v >>> 16);
        pt[6] = (byte) (Sd[t3 >>> 8 & 255] ^ v >>> 8);
        pt[7] = (byte) (Sd[t2 & 255] ^ v);
        v = rdk[k + 2];
        pt[8] = (byte) (Sd[t2 >>> 24] ^ v >>> 24);
        pt[9] = (byte) (Sd[t1 >>> 16 & 255] ^ v >>> 16);
        pt[10] = (byte) (Sd[t0 >>> 8 & 255] ^ v >>> 8);
        pt[11] = (byte) (Sd[t3 & 255] ^ v);
        v = rdk[k + 3];
        pt[12] = (byte) (Sd[t3 >>> 24] ^ v >>> 24);
        pt[13] = (byte) (Sd[t2 >>> 16 & 255] ^ v >>> 16);
        pt[14] = (byte) (Sd[t1 >>> 8 & 255] ^ v >>> 8);
        pt[15] = (byte) (Sd[t0 & 255] ^ v);
        return pt;
    }

    public byte[] encryptArray(byte message[], int offset)
            throws GeneralSecurityException {
        if (offset > message.length)
            throw new GeneralSecurityException("Offset is greater than length of message");
        int length = message.length - offset;
        int numOfBlocks = length / 16;
        int lengthOfLastPart = length - numOfBlocks * 16;
        if (lengthOfLastPart == 0) {
            lengthOfLastPart = 16;
            numOfBlocks--;
        }
        byte result[] = new byte[0];
        byte block[] = new byte[16];
        for (int i = 0; i < numOfBlocks; i++) {
            System.arraycopy(message, offset + i * 16, block, 0, 16);
            result = HexUtils.addByteArrays(result, encryptBlock(block, new byte[16]));
        }

        byte last[] = new byte[lengthOfLastPart];
        System.arraycopy(message, offset + numOfBlocks * 16, last, 0, lengthOfLastPart);
        int numOfPads = 16 - last.length;
        if (numOfPads == 0)
            numOfPads = 16;
        byte pads[] = new byte[numOfPads];
        for (int i = 0; i < numOfPads; i++)
            pads[i] = (byte) numOfPads;

        if (numOfPads != 16) {
            last = HexUtils.addByteArrays(last, pads);
        } else {
            if (last.length == 0)
                last = pads;
            result = HexUtils.addByteArrays(encryptBlock(last, new byte[16]), encryptBlock(pads, new byte[16]));
            return result;
        }
        result = HexUtils.addByteArrays(result, encryptBlock(last, new byte[16]));
        return result;
    }

    public byte[] decryptArray(byte message[], int offset)
            throws GeneralSecurityException {
        if (offset > message.length)
            throw new GeneralSecurityException("Offset is greater than length of message");
        int length = message.length - offset;
        int numOfBlocks = length / 16;
        int lengthOfLastPart = length - numOfBlocks * 16;
        if (lengthOfLastPart == 0) {
            lengthOfLastPart = 16;
            numOfBlocks--;
        }
        byte result[] = new byte[0];
        byte block[] = new byte[16];
        for (int i = 0; i < numOfBlocks; i++) {
            System.arraycopy(message, offset + i * 16, block, 0, 16);
            result = HexUtils.addByteArrays(result, decryptBlock(block, new byte[16]));
        }

        byte last[] = new byte[lengthOfLastPart];
        System.arraycopy(message, offset + numOfBlocks * 16, last, 0, lengthOfLastPart);
        byte tmp[] = decryptBlock(last, new byte[16]);
        int numOfPads = tmp[tmp.length - 1];
        byte lastBlock[] = new byte[16 - numOfPads];
        System.arraycopy(tmp, 0, lastBlock, 0, lastBlock.length);
        result = HexUtils.addByteArrays(result, lastBlock);
        return result;
    }

    public byte[] encryptArrayNP(byte message[], int offset)
            throws GeneralSecurityException {
        if (offset > message.length)
            throw new GeneralSecurityException("Offset is greater than length of message");
        int length = message.length - offset;
        int numOfBlocks = length / 16;
        int lengthOfLastPart = length - numOfBlocks * 16;
        if (lengthOfLastPart == 0) {
            lengthOfLastPart = 16;
            numOfBlocks--;
        }
        byte result[] = new byte[0];
        byte block[] = new byte[16];
        for (int i = 0; i < numOfBlocks; i++) {
            System.arraycopy(message, offset + i * 16, block, 0, 16);
            result = HexUtils.addByteArrays(result, encryptBlock(block, new byte[16]));
        }

        byte last[] = new byte[lengthOfLastPart];
        System.arraycopy(message, offset + numOfBlocks * 16, last, 0, lengthOfLastPart);
        int numOfZeros = 16 - last.length;
        if (numOfZeros == 0) {
            result = HexUtils.addByteArrays(result, encryptBlock(last, new byte[16]));
            return result;
        }
        byte pads[] = new byte[numOfZeros];
        for (int i = 0; i < numOfZeros; i++)
            pads[i] = 0;

        if (numOfZeros != 16)
            last = HexUtils.addByteArrays(last, pads);
        else if (last.length == 0)
            return result;
        result = HexUtils.addByteArrays(result, encryptBlock(last, new byte[16]));
        return result;
    }

    public byte[] decryptArrayNP(byte message[], int offset)
            throws GeneralSecurityException {
        int length = message.length;
        int numOfBlocks = length / 16;
        int lengthOfLastPart = length - numOfBlocks * 16;
        if (lengthOfLastPart != 0)
            throw new GeneralSecurityException("Length of last part is not 0");
        byte result[] = new byte[0];
        byte block[] = new byte[16];
        for (int i = 0; i < numOfBlocks; i++) {
            System.arraycopy(message, i * 16, block, 0, 16);
            result = HexUtils.addByteArrays(result, decryptBlock(block, new byte[16]));
        }

        return result;
    }

    public static final boolean areEqual(byte a[], byte b[]) {
        int aLength = a.length;
        if (aLength != b.length)
            return false;
        for (int i = 0; i < aLength; i++)
            if (a[i] != b[i])
                return false;

        return true;
    }

    protected final void finalize() {
        if (rek != null) {
            for (int i = 0; i < rek.length; i++)
                rek[i] = 0;

            rek = null;
        }
        if (rdk != null) {
            for (int i = 0; i < rdk.length; i++)
                rdk[i] = 0;

            rdk = null;
        }
    }

    public static final int DIR_ENCRYPT = 1;
    public static final int DIR_DECRYPT = 2;
    public static final int DIR_BOTH = 3;
    public static final int BLOCK_BITS = 128;
    public static final int BLOCK_SIZE = 16;
    private static final String SS = "\u637C\u777B\uF26B\u6FC5\u3001\u672B\uFED7\uAB76\uCA82\uC97D\uFA59" +
            "\u47F0\uADD4\uA2AF\u9CA4\u72C0\uB7FD\u9326\u363F\uF7CC\u34A5\uE5F1" +
            "\u71D8\u3115\u04C7\u23C3\u1896\u059A\u0712\u80E2\uEB27\uB275\u0983" +
            "\u2C1A\u1B6E\u5AA0\u523B\uD6B3\u29E3\u2F84\u53D1\355\u20FC\uB15B" +
            "\u6ACB\uBE39\u4A4C\u58CF\uD0EF\uAAFB\u434D\u3385\u45F9\u027F\u503C" +
            "\u9FA8\u51A3\u408F\u929D\u38F5\uBCB6\uDA21\u10FF\uF3D2\uCD0C\u13EC" +
            "\u5F97\u4417\uC4A7\u7E3D\u645D\u1973\u6081\u4FDC\u222A\u9088\u46EE" +
            "\uB814\uDE5E\u0BDB\uE032\u3A0A\u4906\u245C\uC2D3\uAC62\u9195\uE479" +
            "\uE7C8\u376D\u8DD5\u4EA9\u6C56\uF4EA\u657A\uAE08\uBA78\u252E\u1CA6" +
            "\uB4C6\uE8DD\u741F\u4BBD\u8B8A\u703E\uB566\u4803\uF60E\u6135\u57B9" +
            "\u86C1\u1D9E\uE1F8\u9811\u69D9\u8E94\u9B1E\u87E9\uCE55\u28DF\u8CA1" +
            "\u890D\uBFE6\u4268\u4199\u2D0F\uB054\uBB16";
    private static final byte Se[], Sd[];
    private static final int Te0[], Te1[], Te2[], Te3[];
    private static final int Td0[], Td1[], Td2[], Td3[];
    private static final int rcon[];
    private int Nr, Nk, Nw;
    private int rek[], rdk[];

    static {
        Se = new byte[256];
        Te0 = new int[256];
        Te1 = new int[256];
        Te2 = new int[256];
        Te3 = new int[256];
        Sd = new byte[256];
        Td0 = new int[256];
        Td1 = new int[256];
        Td2 = new int[256];
        Td3 = new int[256];
        rcon = new int[10];
        int ROOT = 283;
        for (int i1 = 0; i1 < 256; i1++) {
            char c = SS.charAt(i1 >>> 1);

            int s1 = (byte) ((i1 & 1) != 0 ? c : c >>> 8) & 255;
            int s2 = s1 << 1;
            if (s2 >= 256)
                s2 ^= ROOT;
            int s3 = s2 ^ s1;
            int i2 = i1 << 1;
            if (i2 >= 256)
                i2 ^= ROOT;
            int i4 = i2 << 1;
            if (i4 >= 256)
                i4 ^= ROOT;
            int i8 = i4 << 1;
            if (i8 >= 256)
                i8 ^= ROOT;
            int i9 = i8 ^ i1;
            int ib = i9 ^ i2;
            int id = i9 ^ i4;
            int ie = i8 ^ i4 ^ i2;
            Se[i1] = (byte) s1;
            int t;
            Te0[i1] = t = s2 << 24 | s1 << 16 | s1 << 8 | s3;
            Te1[i1] = t >>> 8 | t << 24;
            Te2[i1] = t >>> 16 | t << 16;
            Te3[i1] = t >>> 24 | t << 8;
            Sd[s1] = (byte) i1;
            Td0[s1] = t = ie << 24 | i9 << 16 | id << 8 | ib;
            Td1[s1] = t >>> 8 | t << 24;
            Td2[s1] = t >>> 16 | t << 16;
            Td3[s1] = t >>> 24 | t << 8;
        }

        int r = 1;
        rcon[0] = r << 24;
        for (int i = 1; i < 10; i++) {
            r <<= 1;
            if (r >= 256)
                r ^= ROOT;
            rcon[i] = r << 24;
        }

    }
}