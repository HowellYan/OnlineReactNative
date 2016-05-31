package com.innovation.value.sign;

import java.util.HashMap;
import java.lang.reflect.Field;

import java.util.Map;

/**
 * Created by Howell on 16/5/10.
 */
public class ObjectHelper {


    /**
     * 旧签名，只签名两层，且添加了test到签名明文中
     * @param obj
     * @param includeParentClass
     * @return
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    public static Map<String, Object> getClassFields(Object obj,
                                                     boolean includeParentClass) throws IllegalArgumentException,
            IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        getMap(obj, map);
        if (includeParentClass)
            getParentClassFields(map, obj);
        return map;
    }

    private static Map<String, Object> getMap(Object obj,
                                              Map<String, Object> map) throws IllegalAccessException {

        String filedName = "";

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            filedName = field.getName();
            if ("sign".equals(filedName)||"signVer".equals(filedName)||"CREATOR".equals(filedName)) {
                continue;
            }
            map.put(filedName, field.get(obj));
        }
        return map;
    }

    private static Map<String, Object> getParentClassFields(
            Map<String, Object> map, Object obj) throws IllegalAccessException {
        Field[] fields = obj.getClass().getSuperclass().getDeclaredFields();
        String filedName = "";
        for (Field field : fields) {
            field.setAccessible(true);
            filedName = field.getName();
            if ("sign".equals(filedName)||"signVer".equals(filedName)||"CREATOR".equals(filedName)) {
                continue;
            }
            map.put(filedName, field.get(obj));
        }
        return map;
    }

	/* --------------------------------------------------------------------------------------------------------- */

    /**
     * 新签名，使用get方法取值，去掉test
     * @param obj
     * @return
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    public static Map<String, Object> getClassFieldsVersion2(Object obj)
            throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        getParentClassFields(map, obj, obj.getClass());
        return map;
    }

    private static void getParentClassFields(Map<String, Object> map, Object obj, Class<?> currentClass)
            throws IllegalAccessException {
        //handle current level field
        Field[] fields = currentClass.getDeclaredFields();
        for (Field field : fields) {
            if(!isIgnoreAbleField(field,map)){
                processFields(field,obj,map);
            }
        }
        //handle superclass level field
        if (!(currentClass.getSuperclass().getSimpleName().equals(Object.class.getSimpleName()))) {
            getParentClassFields(map, obj, currentClass.getSuperclass());
        }
    }

    private static void processFields(Field field,Object obj,Map<String, Object> map){
        try {
            String fieldName = field.getName();
            field.setAccessible(true);
            map.put(fieldName, field.get(obj));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * ignore condition : 1. contain static description 2.fieldName= test/sign/signVer 3.duplicate in subClass
     *
     * @param field
     * @param map
     * @return
     */
    private static boolean isIgnoreAbleField(Field field,Map<?,?> map){
        if(field.toGenericString().contains("static")){
            return true;
        }else{
            String filedName = field.getName();
            if(filedName.equals("test")||filedName.equals("sign")||filedName.equals("signVer")||"CREATOR".equals(filedName)){
                return true;
            }else{
                if(map.get(filedName)!=null){
                    return true;
                }
            }
        }
        return false;
    }
}
