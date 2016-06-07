//
//  Utils.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Utils.h"
#import "math.h"
#import <AdSupport/ASIdentifierManager.h>
#import <UIKit/UIKit.h>
@implementation Utils
#if  TARGET_IPHONE_SIMULATOR
#else
+ (PYFaceDetectionApi*)getAPI
{
    if (!s_pyfda) {
        s_pyfda = [PYFaceDetectionApi new];
        [s_pyfda PYSetAnalysis:TRUE];
        [s_pyfda PYInit];
    }
    return s_pyfda;
}
+(NSString *) compareCurrentTime:(NSDate*) compareDate
//
{
    NSTimeInterval  timeInterval = [compareDate timeIntervalSinceNow];
    timeInterval = -timeInterval;
    NSString *result = [NSString stringWithFormat:@"%f",timeInterval];
    return  result;
}
#endif
+ (NSString *)getTheFormat:(NSString *)format date:(NSDate *)date
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:format];
    NSString *str = [formatter stringFromDate:date];
    return str;
}

+ (NSString *)getyyyyMMddHHmmssWithString:(NSString *)string
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyyMMddHHmmss"];
    NSDate *date = [formatter dateFromString:string];
    
    [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSString *dateString = [formatter stringFromDate:date];
    
    return dateString;
}

+ (NSString *)getyyyyMMddHHmmssTimestamp
{
    NSString *str = [self getTheFormat:@"yyyyMMddHHmmss" date:[NSDate date]];
    return str;
}
+ (NSString *)getyyyyMMddTimestamp
{
    NSString *str = [self getTheFormat:@"yyyyMMdd" date:[NSDate date]];
    return str;

}
+(NSString *)getRandWithDigit:(NSInteger)digit
{
    NSString *str = [NSString stringWithFormat:@"%ld",arc4random()%(long)(digit*0.9) + (long)(digit*0.1)];
    return str;
}

+(NSString *)getFourDigitRand
{
    NSString *str = [self getRandWithDigit:10000];
    return str;
}

+(NSString *)getIDFA
{
    NSString* adIdentifier = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    adIdentifier = [adIdentifier stringByReplacingOccurrencesOfString:@"-" withString:@""];
    return adIdentifier;
}

+ (NSString *)getSystemVersion
{
    return [[UIDevice currentDevice] systemVersion];
}
+ (NSString *)getDeviceModel
{
    return [[UIDevice currentDevice] model];
}
+ (NSString *)getAPPVesion
{
    return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
}

+ (NSString *)keepWithTmnnum:(NSString *)tmnnum;
{
    NSString *keep = [NSString stringWithFormat:@"%@%@%@",tmnnum,[Utils getyyyyMMddHHmmssTimestamp],[Utils getFourDigitRand]];
    return keep;
}

+(NSString *)yuanTofen:(NSString *)amount
{
    amount = [NSString stringWithFormat:@"%@",amount];
    
    if ([amount hasPrefix:@"."]) {
        
        amount = [NSString stringWithFormat:@"0%@",amount];
        
    }else if([amount rangeOfString:@"."].length == 0){
        
        amount = [NSString stringWithFormat:@"%@00",amount];
        
    }else{
        
        NSArray *str = [amount componentsSeparatedByString:@"."];
        NSString *first = [str objectAtIndex:0];
        NSString *second = [str objectAtIndex:1];
        
        if (second.length >2) {
            
            NSRange range;
            range.location = 1;
            range.length = 2;
            second = [second substringWithRange:range];
            
        }else if (second.length == 1){
            
            second = [NSString stringWithFormat:@"%@0",second];
        }
        
        amount = [NSString stringWithFormat:@"%@%@",first,second];
        
        // 2014-09-26 by baijiawei
        if ([second isEqualToString:@""]) { // 如果用户输入的格式为XX. 例12.
            amount = [NSString stringWithFormat:@"%@00",first];
        }
    }
    
    
    return amount;
}

+(NSString *)fenToyuan:(NSString *)money
{
    money = [NSString stringWithFormat:@"%@",money];
    if (!money||[money isEqualToString:@""]) {
        return @"";
    }
    NSMutableString *fen=[NSMutableString stringWithString:money];
    NSScanner * scan =[NSScanner scannerWithString:fen];
    int val;
    if (![scan scanInt:&val]) {
        return money;
    }
    switch (fen.length) {
        case 1:
            [fen insertString:@"0.0" atIndex:0];
            break;
            
        case 2:
            [fen insertString:@"0." atIndex:0];
            break;
        default:
            [fen insertString:@"." atIndex:fen.length-2];
            break;
    }
    
    [fen appendString:@"元"];
    return fen;
}
+(void)ShowDictionaryAllObject:(NSDictionary *)dictionary{
    for (NSString *key in dictionary) {
        if(dictionary[key] && [dictionary[key] isKindOfClass:[NSDictionary class]]){
            [self ShowDictionaryAllObject:dictionary[key]];
        }
        NSLog(@"%@ ——> %@", key, dictionary[key]);
    }
}
+ (NSDate *)getTheDateWithType:(NSString *)type andTheDelta:(NSInteger)delta
{
    NSCalendar *cal = [NSCalendar currentCalendar];
    NSDateComponents *components = [cal components:( NSHourCalendarUnit | NSMinuteCalendarUnit | NSSecondCalendarUnit ) fromDate:[[NSDate alloc] init]];
   NSDate *today = [cal dateByAddingComponents:components toDate:[NSDate date] options:0];
    if ([type isEqualToString:@"y"]) {
        [components setYear:delta];
    }else if([type isEqualToString:@"M"])
    {
        [components setMonth:delta];
    }else if([type isEqualToString:@"d"]){
        [components setDay:delta];
    }
    NSDate *date = [cal dateByAddingComponents:components toDate: today options:0];
    return date;
}


@end
