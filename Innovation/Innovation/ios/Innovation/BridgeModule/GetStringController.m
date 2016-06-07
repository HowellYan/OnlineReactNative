//
//  GetStringController.m
//  Innovation
//
//  Created by Howell on 16/6/3.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GetStringController.h"
#import "NSString+ThreeDES.h"
#import "NSString+AES.h"
#import "PasswordControl.h"

@implementation GetStringController

RCT_EXPORT_MODULE();

//method: getEncryptVerifyCode
RCT_EXPORT_METHOD(getEncryptVerifyCode:(NSString *)verifyCode actionCallback:(RCTResponseSenderBlock)actionCallback)
{

  NSString *verifyCodeStr = [NSString encrypt:verifyCode];
  
  actionCallback(@[verifyCodeStr]);
}

//method: getEncryptPassword
RCT_EXPORT_METHOD(getEncryptPassword:(NSDictionary *)readableMap actionCallback:(RCTResponseSenderBlock)actionCallback)
{
  
  NSString *isNewFlow = [readableMap objectForKey:@"isNewFlow"];
  NSString *randNum = [readableMap objectForKey:@"randNum"];
  NSString *staffCode = [readableMap objectForKey:@"staffCode"];
  NSString *password = [readableMap objectForKey:@"password"];
  
  if([isNewFlow isEqualToString:@"N"]){
    NSString *encryptPwd =  [PasswordControl encodePasswordWithUserAccount:staffCode password:password id_rand:randNum];
    actionCallback(@[encryptPwd]);
    
  } else if([isNewFlow isEqualToString:@"Y"]) {
    NSString *randNumKey = [readableMap objectForKey:@"randNumKey"];
    NSString *randomCodeIndex = [readableMap objectForKey:@"randomCodeIndex"];
    NSString *decryptRandNum         = [randNum aesDecryptWithKey:randNumKey];
    NSString *decryptRandomCodeIndex = [[randomCodeIndex aesDecryptWithKey:randNumKey] stringByReplacingOccurrencesOfString:@"\0" withString:@""];
    NSString *encryptPwd = [password aesEncryptWithKey:decryptRandNum];
    NSLog(@"passwordStr: %@" , encryptPwd);
    actionCallback(@[encryptPwd, decryptRandomCodeIndex]);
    
  }

}

//method: getSignStr
RCT_EXPORT_METHOD(getSignStr:(NSDictionary *)readableMap actionCallback:(RCTResponseSenderBlock)actionCallback)
{
  
  
}


@end