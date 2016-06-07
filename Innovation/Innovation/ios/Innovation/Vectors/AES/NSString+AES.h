//
//  NSString+AES.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (AES)
-(NSString*)aesEncryptWithKey:(NSString*)transferKey;
-(NSString*)aesDecryptWithKey:(NSString*)transferKey;
@end
