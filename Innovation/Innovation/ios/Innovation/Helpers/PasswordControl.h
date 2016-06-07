//
//  PasswordControl.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PasswordControl : NSObject
/**
 *  加密密码
 *
 *  @param staffCode 手机号码
 *  @param password  明文密码
 *  @param id_rand   服务器提供的随机数
 *
 *  @return 加密成功的密码
 */
+(NSString *)encodePasswordWithUserAccount:(NSString *)userAccount
                                  password:(NSString *)password
                                   id_rand:(NSString *)id_rand;

/**
 *  修改登录/支付密码时用到，这个是新密码的加密方式
 *
 *  @param string    明文密码
 *  @param staffCode 手机号码
 *
 *  @return 加密成功的密码
 */
+ (NSString *)encodePasswordWithString:(NSString *)string
                           UserAccount:(NSString *)userAccount;



@end
