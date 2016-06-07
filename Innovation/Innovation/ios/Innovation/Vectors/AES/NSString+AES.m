//
//  NSString+AES.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//


#import "NSString+AES.h"
#import "NSData+AES.h"
#define AES_SALT @"a7fc844d17f43955783d7d6f5df7eb4e"

@implementation NSString (AES)

-(NSString*)aesEncryptWithKey:(NSString*)transferKey
{
    NSString* realKey32 = [self getRealKey:transferKey];
    NSData *encrypyTextBytes = [self dataUsingEncoding:NSUTF8StringEncoding];
    NSData *resultData = [encrypyTextBytes AES256ECBEncryptWithKey:realKey32];
    NSString *base64Result = [resultData base64EncodedStringWithOptions:0];
    return base64Result;
}

-(NSString*)aesDecryptWithKey:(NSString*)transferKey
{
    NSString* realKey32 = [self getRealKey:transferKey];
    NSData *decryptTextData = [[NSData alloc]initWithBase64EncodedString:self options:0];
    NSString *resultText = [[NSString alloc] initWithData:[decryptTextData AES256ECBDecryptWithKey:realKey32]  encoding:NSUTF8StringEncoding];
    return resultText;
}

-(NSString*)getRealKey:(NSString*)transferKey
{
    NSData *oriData = [transferKey dataUsingEncoding:NSUTF8StringEncoding];
    //解密传输密钥，还原真正的key
    NSString *realKey = [[oriData AES256ECBDecryptWithKey:AES_SALT] base64EncodedStringWithOptions:0];
    NSString *realKey32 = [realKey substringWithRange:NSMakeRange(0, 32)];
    return realKey32;
}

@end


