package com.innovation.value;

import com.google.gson.JsonObject;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValueUtil {
    private static DecimalFormat DecimalFormatter= new DecimalFormat("#.##");

    private static Pattern datetimepattern = Pattern
            .compile("^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$");
    private static Pattern datepattern = Pattern
            .compile("^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))");

    public static String sNull(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Double || value instanceof Float) {
            return DecimalFormatter.format(value);
        }
        return value.toString().trim();
    }

    public static String s(Object value) {
        if (value == null) {
            return "";
        }
        if (value instanceof Double || value instanceof Float) {
            return DecimalFormatter.format(value);
        }
        return value.toString().trim();
    }

    public static Integer iNull(Object value) {
        if (value == null) {
            return null;
        }
        Integer val = null;
        if (value instanceof String) {
            try {
                val = Integer.valueOf(value.toString());
            } catch (Exception e) {
            }
            if (val == null) {
                try {
                    val = Float.valueOf(value.toString()).intValue();
                } catch (Exception er) {
                    return null;
                }
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).intValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).intValue();
            return val;
        }

        return null;
    }

    public static Float fNull(Object value) {
        if (value == null) {
            return null;
        }
        Float val = null;
        if (value instanceof String) {
            try {
                val = Float.valueOf(value.toString());
            } catch (Exception e) {
                return null;
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).floatValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).floatValue();
            return val;
        }

        return null;
    }

    public static Double dNull(Object value) {
        if (value == null) {
            return null;
        }
        Double val = null;
        if (value instanceof String) {
            try {
                val = Double.valueOf(value.toString());
            } catch (Exception e) {
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).doubleValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).doubleValue();
            return val;
        }

        return val;
    }

    public static Double d(Object value) {
        if (value == null) {
            return 0d;
        }
        Double val = 0d;
        if (value instanceof String) {
            try {
                val = Double.valueOf(value.toString());
            } catch (Exception e) {
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).doubleValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).doubleValue();
            return val;
        }

        return val;
    }

    public static BigDecimal bd(Object value) {
        BigDecimal bd = null;
        if (value == null) {
            return new BigDecimal("0");
        }else {
            try {
                bd = new BigDecimal(value.toString().trim());
                return bd;
            } catch (Exception e) {
                e.printStackTrace();
                return new BigDecimal("0");
            }
        }
    }


    public static Long lNull(Object value) {
        if (value == null) {
            return null;
        }
        Long val = null;
        if (value instanceof String) {
            try {
                val = Long.valueOf(value.toString());
            } catch (Exception e) {
            }
            if (val == null) {
                try {
                    val = Double.valueOf(value.toString()).longValue();
                } catch (Exception er) {
                }
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).longValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).longValue();
            return val;
        }

        return val;
    }

    public static Long l(Object value) {
        if (value == null) {
            return 0l;
        }
        Long val = 0l;
        if (value instanceof String) {
            try {
                val = Long.valueOf(value.toString());
            } catch (Exception e) {
            }
            if (val == null) {
                try {
                    val = Double.valueOf(value.toString()).longValue();
                } catch (Exception er) {
                }
            }
            return val;
        }
        if (value instanceof BigDecimal) {
            val = ((BigDecimal) value).longValue();
            return val;
        }
        if (value instanceof Number) {
            val = ((Number) value).longValue();
            return val;
        }

        return val;
    }

    public static Date dateNull(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof Date) {
            return (Date) value;
        }

        if ((value instanceof Integer) || (value instanceof Long)) {
            try {
                return new Date(Long.parseLong(value.toString()));
            } catch (Exception e) {
                return null;
            }
        }

        if ((value instanceof String) && (value.toString().trim().length() > 0)) {
            if (datepattern.matcher(value.toString()).matches()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat(
                            "yyyy-MM-dd HH:mm:ss");
                    return sdf.parse(value + " 00:00:00");
                } catch (Exception e) {
                }
                try {
                    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                    return sdf2.parse(value + " 00:00:00");
                } catch (Exception e) {
                }
                return null;
            } else if (datetimepattern.matcher(value.toString()).matches()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    return sdf.parse(value.toString());
                } catch (Exception e) {
                }
                try {
                    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                    return sdf2.parse(value.toString());
                } catch (Exception e) {
                }
                return null;
            } else {
                boolean flag = true;
                for (char c : ((String) value).toCharArray()) {
                    if (c >= '0' && c <= '9') {
                        continue;
                    } else {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    try {
                        return new Date(Long.parseLong(value.toString()));
                    } catch (Exception e) {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * 判断是否相等
     */
    public static boolean equals(Object value1, Object value2) {
        if (value1 == null || value2 == null) {
            return false;
        }
        return value1.equals(value2);
    }

    public static String yyyyMMdd(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Date) {
            SimpleDateFormat sdf_yyyyMMdd = new SimpleDateFormat(
                    "yyyyMMdd");
            return sdf_yyyyMMdd.format(obj);
        }
        return null;
    }

    public static String yyyyMMddHHmmss(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Date) {
            SimpleDateFormat sdf_yyyyMMddHHmmss = new SimpleDateFormat("yyyyMMddHHmmss");
            return sdf_yyyyMMddHHmmss.format(obj);
        }
        return null;
    }

    // 浮点型判断
    public static boolean isDecimal(String str) {
        if (str == null || "".equals(str))
            return false;
        Pattern pattern = Pattern.compile("[0-9]*(\\.?)[0-9]*");
        return pattern.matcher(str).matches();
    }

    // 整型判断
    public static boolean isInteger(String str) {
        if (str == null)
            return false;
        Pattern pattern = Pattern.compile("[0-9]+");
        return pattern.matcher(str).matches();
    }

    /**
     * 转UTF-8
     * @param str
     * @return
     */
    public static String encodeStr(String str) {
        try {
            return new String(str.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String fenToYuan(String fen) {
        // 防止空值
        if (fen == null) {
            return "0";
        }
        BigDecimal bd = new BigDecimal(fen);
        String fenStr = bd.divide(new BigDecimal("100")).toPlainString();
        return fenStr;
    }

    /**
     * 将表头中的1,2替换成是，否
     *
     * @param keys
     *            字符数组 key
     * @param btMap
     */
    public static void dealFlag(String[] keys, Map btMap) {
        for (int i = 0; i < keys.length; i++) {
            if (ValueUtil.equals("1", btMap.get(keys[i]))) {
                btMap.put(keys[i], "是");
            } else if (ValueUtil.equals("2", btMap.get(keys[i]))) {
                btMap.put(keys[i], "否");
            }
        }
    }

    public static boolean isMatches(String regex, String str) {
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    @SuppressWarnings("rawtypes")
    public static boolean isEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        if (obj instanceof String) {
            return "".equals(((String) obj).trim());
        }
        if (obj instanceof Collection) {
            return ((Collection) (obj)).size() == 0;
        }
        if (obj instanceof Object[]) {
            return ((Object[]) (obj)).length == 0;
        }
        return false;
    }

    public static boolean isNotEmpty(Object obj) {
        return !isEmpty(obj);
    }



    /**
     * 去掉字符空格
     *
     * @param phoneNum
     * @return
     */
    public static String removeNumberSpace(String phoneNum) {
        String removedNum = "";
        if (ValueUtil.isNotEmpty(phoneNum)) {
            removedNum = phoneNum.replaceAll(" ", "");
        }
        return removedNum;
    }

    public static void main(String args[]) {
        System.out.println(dateNull("2012-12-22"));
        String arch = System.getProperty("sun.arch.data.model");
        System.out.println(arch);
    }


    /**
     * 去除电话号码的所有空格
     * @param phoneNum
     * @return
     */
    public static String removeNumberAllSpace(String phoneNum) {
        String removedNum = "";
        if (phoneNum != null) {
            removedNum = phoneNum.replaceAll(" ", "");
        }
        return removedNum;
    }

    /**
     * @Title: removeAllSpace
     * @Description: 删除一个{@link String}中所有的空格
     * @param source
     *            原{@link String}
     * @return 没有空格的{@link String}
     */
    public static String removeAllSpace(String source) {
        return removeNumberAllSpace(source);
    }

    /**
     * 将金额从以元为单位转换以为分为单位
     *
     * @param strYuan
     * @return strFen
     */
    public static String yuanToFen(String amount) {

        if (amount.startsWith(".")) {
            amount = "0" + amount;
        }
        BigDecimal bd = new BigDecimal(amount);
        String currency = bd.multiply(new BigDecimal("100")).toString();
        if (currency.indexOf(".") > 0) {
            currency = currency.substring(0, currency.indexOf("."));
        }
        return currency;
    }

    /**
     * 返回两个时间相差多少天
     * @param startTime
     * @param endTime
     * @param format
     * @return
     */
    public static int dateDiff(String startTime, String endTime, String format) {

        SimpleDateFormat sd = new SimpleDateFormat(format);

        long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数
        long diff, day = 0;

        try {
            // 获得两个时间的毫秒时间差异
            diff = sd.parse(endTime).getTime() - sd.parse(startTime).getTime();
            day = diff / nd;// 计算差多少天

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return (int) day;
    }

    // 当前日期
    public static String getCurrentDate(String format) {
        if (format == null || format.length() == 0)
            format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date currentdate = new Date();
        return sdf.format(currentdate);
    }

    /**
     * 根据传入的key获取不通过的验证中文字符串
     * @param key
     * @param value
     * @return
     */
    public static String getFindPwdErrorInfo(String key, String value) {
        String errorInfo = "";
        if (key.equals("CONTACTNO") && value.equals("0")) {
            errorInfo = "联系人身份证验证不通过";
        } else if (key.equals("PASSWORD") && value.equals("0")) {
            errorInfo = "登录密码验证不通过";
        } else if (key.equals("CERNO") && value.equals("0")) {
            errorInfo = "开户证件号码验证不通过";
        } else if (key.equals("BANKACCT") && value.equals("0")) {
            errorInfo = "银行账户验证不通过";
        } else if (key.equals("TRANSACCNAME") && value.equals("0")) {
            errorInfo = "开户姓名验证不通过";
        } else if (key.equals("REGVERIFYCODE") && value.equals("0")) {
            errorInfo = "注册验证码验证不通过";
        } else if (key.equals("CERTTYPE") && value.equals("0")) {
            errorInfo = "开户证件类型验证不通过";
        }
        return errorInfo;
    }


    /**
     * 遍历hashmap 如果有任意一项为空，则返回false
     *
     * @param hashMap
     * @return
     */
    public static boolean checkHashMap(HashMap<String, String> hashMap) {
        Set<String> keySet = hashMap.keySet();
        Iterator<String> iterator = keySet.iterator();
        while (iterator.hasNext()) {
            Object key = iterator.next();
            Object value = hashMap.get(key);
            if (isEmpty(value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 有一个为空就返回flase 否则返回true
     *
     * @param obj
     * @return
     */
    public static boolean isEmpty(Object... obj) {
        for (int i = 0; i < obj.length; i++) {
            if (isEmpty(obj[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * 把金额转换成带小数点后两位
     *
     * @param amt
     * @return
     */
    public static String formatAmt(String amt) {
        String formatAmt = amt;
        try {
            BigDecimal decimalAmt = new BigDecimal(amt);
            formatAmt = decimalAmt.setScale(2, BigDecimal.ROUND_HALF_UP)
                    .toString();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return formatAmt;
    }

    /**
     * 精确到小数点两位
     * @param data
     * @return
     */
    public static String setPrecision(Object data){
        String result = "";
        try {
            if (ValueUtil.isEmpty(data)) {
                return result;
            }
            DecimalFormat df=new DecimalFormat("0.00");
            BigDecimal bd = new BigDecimal(data.toString().trim());
            result = df.format(bd);
        } catch (Exception e) {
            e.printStackTrace();
            return "数据异常";
        }
        return result;
    }

}
