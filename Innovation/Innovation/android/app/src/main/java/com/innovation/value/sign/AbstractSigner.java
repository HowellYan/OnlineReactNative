package com.innovation.value.sign;

/**
 * Created by Howell on 16/5/10.
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public abstract class AbstractSigner {

    public final static String DEFAULT_SIGN_VERSION="1";

    public final static String SIGN_VERSION_ONE="1";
    public final static String SIGN_VERSION_TWO="2";

    public abstract String sign(Object obj,String signKey);

    protected List<Map.Entry<String, Object>> getSortedListFromMap(Map<String,Object> map){
        List<Map.Entry<String, Object>> list = new ArrayList<Map.Entry<String, Object>>(map.entrySet());
        //排序
        Collections.sort(list, new Comparator<Map.Entry<String, Object>>() {
            public int compare(final Map.Entry<String, Object> o1, final Map.Entry<String, Object> o2) {
                return (o1.getKey()).toString().compareTo(o2.getKey());
            } });

        return list;
    }
}
