//
//  NSData+AES.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSData (AES)
//AES 256  bcb pkcs7
- (NSData *)AES128CBCEncryptWithKey:(NSString *)key andVI:(NSString *)vi;
- (NSData *)AES128CBCDecryptWithKey:(NSString *)key andVI:(NSString *)vi;


//AES 256   ECB模式  填充方式PaddingMode.Zeros，VI不用填
- (NSData *)AES256ECBEncryptWithKey:(NSString *)key;
- (NSData *)AES256ECBDecryptWithKey:(NSString *)key;

@end
