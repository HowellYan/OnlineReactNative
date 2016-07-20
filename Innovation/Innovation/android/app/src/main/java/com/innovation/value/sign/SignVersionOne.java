package com.innovation.value.sign;




import java.util.List;
import java.util.Map;


public class SignVersionOne extends AbstractSigner{


    @Override
    public String sign(Object obj,String signKey) {
        try {
            StringBuffer buffer = new StringBuffer();
            Map< String, Object > map = ObjectHelper.getClassFields(obj, true);
            List<Map.Entry<String, Object>> list = getSortedListFromMap(map);
            for (Map.Entry<String, Object> maEntry :list) {
                Object val = maEntry.getValue();

                if (val == null) {
                    continue;
                }

                buffer.append(maEntry.getKey()).append("=").append(val).append("&");
            }

            String sign = buffer.append("key=").append(signKey).toString();

            sign = MSignUtil.getMD5(sign.getBytes("UTF-8")).toUpperCase();

            return sign;
        } catch (Exception e) {

        }
        return null;
    }


}
