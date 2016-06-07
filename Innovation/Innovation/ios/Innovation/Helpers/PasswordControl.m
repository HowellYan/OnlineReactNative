//
//  PasswordControl.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PasswordControl.h"
#import "MD5.h"
#define KEY @"aienbiei22&*#*(@ieizewbxwerq?"
@implementation PasswordControl
+(NSString *)encodePasswordWithUserAccount:(NSString *)userAccount
                                  password:(NSString *)password
                                   id_rand:(NSString *)id_rand{
    
    //分割字符串，分成id,和rand
    NSArray *array = [id_rand componentsSeparatedByString:@"_"];
    NSString *ID = [array objectAtIndex:0];     //获取第一个字符串
    NSString *RAND = [array objectAtIndex:1];   //获取第二个字符串
    
    //第一次加密
    NSString *oneEncrypt = [MD5 md5LowercaseString:[NSString stringWithFormat:@"%@%@%@",userAccount,password,KEY]];
    //BPLog(@"第一次加密:%@\n",oneEncrypt);
    
    
    //第二次加密
    NSString *twoEncrypt = [MD5 md5LowercaseString:oneEncrypt];
   
    //第三次加密
    NSString *resultEncrypt =[MD5 md5LowercaseString:[NSString stringWithFormat:@"%@%@%@",ID,twoEncrypt,RAND]];
    
    NSString *encodePassword = [NSString stringWithFormat:@"%@_%@",ID,resultEncrypt];
    
    return encodePassword;
}

+ (NSString *)encodePasswordWithString:(NSString *)string
                           UserAccount:(NSString *)userAccount
{
    NSLog(@"%lu",(unsigned long)string.length);
    NSString *encode = [NSString stringWithFormat:@"%@%@%@",userAccount,string,KEY];
    NSString *encode_newpassword = [MD5 md5LowercaseString:[MD5 md5LowercaseString:encode]];
    return encode_newpassword;
}
//
@end
