//
//  SignControl.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#import "SignControl.h"
#import "MD5.h"
@implementation SignControl
//去空值
+ (NSDictionary *)removeNullWithParamters:(NSDictionary *)paramters
{
    NSMutableDictionary *mutableDict;
    mutableDict = [NSMutableDictionary dictionary];
    
    for (id key in paramters) {
        NSString *value = paramters[key];
        if (![value isEqual:@""]&&value != (NSString*)[NSNull null] ) {
            [mutableDict setObject:value forKey:key];
        }
    }
    return mutableDict;

}
//排序 拼接加签字符串
+ (NSString *)jointTheStringBy:(NSDictionary *)paramters
                    andDesRand:(NSString *)desRand
{
    NSArray *arr = [paramters allKeys];
    arr = [arr sortedArrayUsingComparator:^NSComparisonResult(NSString* obj1, NSString* obj2) {
        return [obj1 compare:obj2];
    }];
    NSMutableString *sign = [NSMutableString string];
    for (int i = 0; i < arr.count; i++) {
        NSString *key = [arr objectAtIndex:i];
        [sign appendFormat:@"%@=%@&",key,[paramters objectForKey:key]];
    }
    [sign appendFormat:@"key=%@",desRand];
    return sign;

}

//排序 拼接加签字符串
+ (NSString *)jointTheStringBy:(NSDictionary *)paramters
{
    NSArray *arr = [paramters allKeys];
    arr = [arr sortedArrayUsingComparator:^NSComparisonResult(NSString* obj1, NSString* obj2) {
        return [obj1 compare:obj2];
    }];
    NSMutableString *sign = [NSMutableString string];
    for (int i = 0; i < arr.count; i++) {
        NSString *key = [arr objectAtIndex:i];
        [sign appendFormat:@"%@=%@&",key,[paramters objectForKey:key]];
    }
    return sign;
    
}

+ (NSString *)getTheSignByParamters:(NSDictionary *)paramters
                      andRequstType:(NSString *)Type
                      andDesRand:(NSString *)desRand
                        
{
    NSDictionary *signParamters = [self removeNullWithParamters:paramters];
    NSString *sign = [self jointTheStringBy:signParamters andDesRand:desRand];
    RCTLogInfo(@"SIGNSTR>>>>>>>%@",sign);
        sign = [MD5 md5UppercaseString:sign];
        if ([Type isEqualToString:@"sign2"]) {
            sign = [MD5 md5UppercaseString:sign];
        }
    return sign;
}

+ (NSString *)getTheINFSignWithAppFrom:(NSString *)appFrom
                                  keep:(NSString *)keep
                               custCode:(NSString *)custCode
                              staffCode:(NSString *)staffCode
                               desRand:(NSString *)desRand
                             severName:(NSString *)severName
                             severCode:(NSString *)severCode

{
//    NSString *pay = [NSString stringWithFormat:@"<PayPlatRequestParameter>"
//                     "<CTRL-INFO  WEBSVRNAME=\"%@\"  WEBSVRCODE=\"%@\"  APPFROM=\"%@\"  KEEP=\"%@\" />"
//                     "<PARAMETERS>"
//                     "<CUSTCODE>%@</CUSTCODE>"
//                     "<STAFFCODE>%@</STAFFCODE>"
//                     "</PARAMETERS></PayPlatRequestParameter>",severName,severCode,appFrom,keep,custCode,staffCode];
//    
//    NSString *encode = [NSString stringWithFormat:@"%@<KEY>%@</KEY>",pay,desRand];
    
//    return [MD5 md5LowercaseString:encode];
    return [self getTheINFSignWithAppFrom:appFrom keep:keep custCode:custCode staffCode:staffCode desRand:desRand severName:severName severCode:severCode params:@""];
}

+ (NSString *)getTheINFSignWithAppFrom:(NSString *)appFrom
                                  keep:(NSString *)keep
                              custCode:(NSString *)custCode
                             staffCode:(NSString *)staffCode
                               desRand:(NSString *)desRand
                             severName:(NSString *)severName
                             severCode:(NSString *)severCode
                                params:(NSString *)params
{
    NSString *pay = [NSString stringWithFormat:@"<PayPlatRequestParameter>"
                     "<CTRL-INFO  WEBSVRNAME=\"%@\"  WEBSVRCODE=\"%@\"  APPFROM=\"%@\"  KEEP=\"%@\" />"
                     "<PARAMETERS>"
                     "<CUSTCODE>%@</CUSTCODE>"
                     "<STAFFCODE>%@</STAFFCODE>"
                     "%@"
                     "</PARAMETERS></PayPlatRequestParameter>",severName,severCode,appFrom,keep,custCode,staffCode,params];
    
    NSString *encode = [NSString stringWithFormat:@"%@<KEY>%@</KEY>",pay,desRand];
    
    return [MD5 md5LowercaseString:encode];

}

+ (NSString *)getTheWebINFSignWithAppFrom:(NSString *)appFrom
                                  keep:(NSString *)keep
                              custCode:(NSString *)custCode
                             staffCode:(NSString *)staffCode
                               desRand:(NSString *)desRand
                             severName:(NSString *)severName
                             severCode:(NSString *)severCode
                            requesTime:(NSString *)requesTime
                                params:(NSString *)params
{
//    BWW2LPK4JUTHUT1P
    NSString *pay = [NSString stringWithFormat:@"<PayPlatRequestParameter>"
                     "<CTRL-INFO APPFROM=\"%@\" KEEP=\"%@\" REQUESTTIME=\"%@\" WEBSVRCODE=\"%@\" WEBSVRNAME=\"%@\"/>"
                     "<PARAMETERS>"
                     "%@"
                     "</PARAMETERS></PayPlatRequestParameter>"
                     ,@"440000-BestPayEEClient_V2.9.2-292-127.0.0.1"
                     ,keep
                     ,requesTime
                     ,severCode
                     ,severName
                     ,params];
    
    
    NSString *encode = [NSString stringWithFormat:@"%@<KEY>%@</KEY>",pay,desRand];
    
    
    
//    encode = @"<PayPlatRequestParameter><CTRL-INFO APPFROM=\"440000-BestPayEEClient_V2.9.2-292-127.0.0.1\" KEEP=\"440106003094201505121123176626\" REQUESTTIME=\"20150512112317\" WEBSVRCODE="01_004" WEBSVRNAME="lnj"/><PARAMETERS><ACCTTYPE>0001</ACCTTYPE><AGENTCODE>18688868906</AGENTCODE><OPERTYPE>1</OPERTYPE><ORDERSEQ>20150512112317654</ORDERSEQ><PASSWORD>1287907_01b66e354f167e51f7b80c6d0808773f</PASSWORD><STAFFCODE>18688868906</STAFFCODE><TXNAMOUNT>1000</TXNAMOUNT></PARAMETERS></PayPlatRequestParameter><KEY>BWW2LPK4JUTHUT1P</KEY>";
    
    return [MD5 md5LowercaseString:encode];
    
}

+(NSString *)encodePasswordWithStaffCode:(NSString *)staffCode
                                password:(NSString *)password
                                 id_rand:(NSString *)id_rand{
    
    NSString *CONSTSTRING = @"aienbiei22&*#*(@ieizewbxwerq?";
    
    //分割字符串，分成id,和rand
    NSArray *array = [id_rand componentsSeparatedByString:@"_"];
    NSString *ID = [array objectAtIndex:0];     //获取第一个字符串
    NSString *RAND = [array objectAtIndex:1];   //获取第二个字符串
    
    //第一次加密
    NSString *oneEncrypt = [MD5 md5:[NSString stringWithFormat:@"%@%@%@",staffCode,password,CONSTSTRING]];
    //BPLog(@"第一次加密:%@\n",oneEncrypt);
    
    
    //第二次加密
    NSString *twoEncrypt = [MD5 md5:oneEncrypt];
    //BPLog(@"第二次次加密:%@\n",twoEncrypt);
    //第三次加密
    NSString *resultEncrypt =[MD5 md5:[NSString stringWithFormat:@"%@%@%@",ID,twoEncrypt,RAND]];
    //BPLog(@"第三次加密:%@",resultEncrypt);
    
    NSString *encodePassword = [NSString stringWithFormat:@"%@_%@",ID,resultEncrypt];
    
    return encodePassword;
}





@end
