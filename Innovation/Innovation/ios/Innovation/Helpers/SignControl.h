//
//  SignControl.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "RCTLog.h"

@interface SignControl : NSObject
/**
 * CPS参数加签
 *  @param paramters 请求参数
 *  @param Type 请求加签类型 sign0 直接是不加签情况所以不会在这存在,sign1 md5一次,sign2 md5两次
 *  @param desRand token值
 */
+ (NSString *)getTheSignByParamters:(NSDictionary *)paramters
                      andRequstType:(NSString *)Type
                        //登录返回token值
                         andDesRand:(NSString *)desRand;
/**
 * 拼接加签参数
 *  @param paramters 请求参数
 */
+ (NSString *)jointTheStringBy:(NSDictionary *)paramters;
/**
 * INF参数加签
 *  @param appFrom 固定参数
 *  @param keep
 *  @param custCode staffCode 账户号
 *  @param desRand 登录下发随机数
 *  @param severName 服务名称
 *  @param severCode 服务编码
 */
+ (NSString *)getTheINFSignWithAppFrom:(NSString *)appFrom
                                  keep:(NSString *)keep
                              custCode:(NSString *)custCode
                             staffCode:(NSString *)staffCode
                               desRand:(NSString *)desRand
                             severName:(NSString *)severName
                             severCode:(NSString *)severCode;



/**
 * INF参数加签
 *  @param appFrom 固定参数
 *  @param keep
 *  @param custCode staffCode 账户号
 *  @param desRand 登录下发随机数
 *  @param severName 服务名称
 *  @param severCode 服务编码
 *  @param params   eg."<CUSTCODE>%@</CUSTCODE>""<STAFFCODE>%@</STAFFCODE>"
 */
+ (NSString *)getTheINFSignWithAppFrom:(NSString *)appFrom
                                  keep:(NSString *)keep
                              custCode:(NSString *)custCode
                             staffCode:(NSString *)staffCode
                               desRand:(NSString *)desRand
                             severName:(NSString *)severName
                             severCode:(NSString *)severCode
                                params:(NSString *)params;



/**
 * Web INF参数加签
 *  @param appFrom 固定参数
 *  @param keep
 *  @param custCode staffCode 账户号
 *  @param desRand 登录下发随机数
 *  @param severName 服务名称
 *  @param severCode 服务编码
 *  @param requesTime 请求时间
 *  @param params   eg."<CUSTCODE>%@</CUSTCODE>""<STAFFCODE>%@</STAFFCODE>"
 */
+ (NSString *)getTheWebINFSignWithAppFrom:(NSString *)appFrom
                                     keep:(NSString *)keep
                                 custCode:(NSString *)custCode
                                staffCode:(NSString *)staffCode
                                  desRand:(NSString *)desRand
                                severName:(NSString *)severName
                                severCode:(NSString *)severCode
                               requesTime:(NSString *)requesTime
                                   params:(NSString *)params;



+(NSString *)encodePasswordWithStaffCode:(NSString *)staffCode
                                password:(NSString *)password
                                 id_rand:(NSString *)id_rand;






@end
