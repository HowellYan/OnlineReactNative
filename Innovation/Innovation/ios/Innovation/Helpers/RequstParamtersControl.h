//
//  RequstParamtersControl.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface RequstParamtersControl : NSObject
/**
 * cps 接口
 *  将业务参数拼接成统requst参数
 *  @param paramters 请求参数 不传通用参数和desRand
 *  @param channelCode 不解释
 *  @param merid 不解释
 *  @param tmnnum 不解释
 *  @param Type 请求加签类型 sign0 直接是不加签情况,sign1 md5一次,sign2 md5两次
 *  @param desRand token值
 */
+ (NSDictionary *)getTheRequsetParamtersByParamters:(NSDictionary *)paramters
                                     andChannelCode:(NSString *)channelCode
                                           andMerid:(NSString *)merid
                                          andTmnnum:(NSString *)tmnnum
                                      andRequstType:(NSString *)Type
                                         andDesRand:(NSString *)desRand;
//CPS限额修改的加签有些不一样为了能够适配CPS的新加签规则
+ (NSDictionary *)getNewRequsetParamtersByParamters:(NSDictionary *)paramters
                                     andChannelCode:(NSString *)channelCode
                                           andMerid:(NSString *)merid
                                          andTmnnum:(NSString *)tmnnum
                                      andRequstType:(NSString *)Type
                                         andDesRand:(NSString *)desRand ;


/**
 *cps 接口
 * 不需要token值得验签
 *  @param Type 请求加签类型 sign0 直接是不加签情况,sign1 md5一次,sign2 md5两次
 */
+ (NSDictionary *)getTheRequsetParamtersByParamters:(NSDictionary *)paramters
                                      andRequstType:(NSString *)Type;

/**
 * cps 接口
 * 需要token值得验签
 *  @param Type 请求加签类型 sign0 直接是不加签情况,sign1 md5一次,sign2 md5两次
  *  @param desRand token值
 */
+ (NSDictionary *)getTheRequsetParamtersByParamters:(NSDictionary *)paramters
                                      andRequstType:(NSString *)type
                                                     andDesRand:(NSString *)desRand;
/**
 * INF 接口
 * 需要token值得验签
 *  @param appFrom 固定参数 @"440000-APP001-001-127.0.0.1"
 *  @param serveName 请求接口名称 eg. @"客户银行信息查询接口"
 *  @param serveCode 请求接口编码 eg. @"INF02002"
 *  @param staffCode 账号
 *  @param sign 签名
 */

+ (NSString *)getINFMessageWithStaffCode:(NSString*)staffCode
                               serveName:(NSString *)serveName
                               serveCode:(NSString *)serveCode
                                    keep:(NSString *)keep
                                    sign:(NSString *)sign
                             paramString:(NSString *)paramStr;

//找回支付密码
+ (NSDictionary *)getRequsetParamtersByParamters:(NSDictionary *)paramters
                                  andChannelCode:(NSString *)channelCode
                                        andMerid:(NSString *)merid
                                       andTmnnum:(NSString *)tmnnum
                                   andRequstType:(NSString *)Type
                                      andDesRand:(NSString *)desRand ;

+ (NSDictionary *)getBaseParamsWithChannelCode:(NSString *)channelCode
                                      andMerid:(NSString *)merid
                                     andTmnnum:(NSString *)tmnnum;




@end
