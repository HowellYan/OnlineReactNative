//
//  Utils.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#if  TARGET_IPHONE_SIMULATOR
#else
#import <PYFaceDetectionSDK/PYFaceDetectionApi.h>
#import <PYFaceDetectionSDK/PYCapCameraViewController.h>
static PYFaceDetectionApi* s_pyfda = nil;
#endif
@interface Utils : NSObject
#if  TARGET_IPHONE_SIMULATOR
#else
+ (PYFaceDetectionApi*)getAPI;
#endif
/** 计算两个时间点之间的时间差 */
+(NSString *) compareCurrentTime:(NSDate*) compareDate;
/** 讲string转化为yyyy-MM-dd HH:mm:ss返回 */
+ (NSString *)getyyyyMMddHHmmssWithString:(NSString *)string;
/**
 * 将date按format转换成字符串返回
 *  @param format 日期格式
 *  @param date 日期
 */
+ (NSString *)getTheFormat:(NSString *)format date:(NSDate *)date;
/**
 * 将当前date按yyyyMMddHHmmss转换成字符串返回
 */
+ (NSString *)getyyyyMMddHHmmssTimestamp;
/**
 * 将当前date按yyyyMMdd转换成字符串返回
 */
+ (NSString *)getyyyyMMddTimestamp;
/**
 * 获取digit位的随机数
 */
+(NSString *)getRandWithDigit:(NSInteger)digit;
/**
 * 获取4位的随机数
 */
+(NSString *)getFourDigitRand;
/**
 * 获取广告id
 */
+(NSString *)getIDFA;
/**
 * 获取系统版本号
 */
+ (NSString *)getSystemVersion;
/**
 * 获取设备型号
 */
+ (NSString *)getDeviceModel;
/**
 * 获应用当前版本号
 */
+ (NSString *)getAPPVesion;
/**
 * 请求keep值
 */
+ (NSString *)keepWithTmnnum:(NSString *)tmnnum;
/**
 * 将元为单位的数据转换成分为单位的数据
 */
+(NSString *)yuanTofen:(NSString *)amount;
/**
 * 将分为单位的数据转换成元为单位的数据
 */
+(NSString *)fenToyuan:(NSString *)money;

/**
 * 将date增加Delta的个单位
 * @param type @"y" 增加单位为年，@"M" 增加单位为月， @“d” 增加单位为日
 *@param delta 单位数量
 */
+ (NSDate *)getTheDateWithType:(NSString *)type andTheDelta:(NSInteger)delta;

/**
 * 打印所有key
 */
+(void)ShowDictionaryAllObject:(NSDictionary *)dictionary;


@end
