//
//  RequestParamsController.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestParamsController.h"
#import "RCTConvert.h"
#import "NetConstants.h"
#import "RequestParams.h"


@implementation RequestParamsController

RCT_EXPORT_MODULE();

//method: setCPSServiceParams
RCT_EXPORT_METHOD(setCPSServiceParams:(NSString *)interfaceName
                  readableMap:(NSDictionary*)readableMap
                  flagSign:(int)flagSign                //bool to int
                  actionCallback:(RCTResponseSenderBlock)actionCallback)
{
  

  NSString *staffCode = [RCTConvert NSString:readableMap[@"staffCode"]];
  
  RCTLogInfo(@"staffCode: %@ ", staffCode);
  RCTLogInfo(@"flagSign: %d ", flagSign);
  

  NSString *requestUrlCPS=[NSString stringWithFormat:@"%@%@",CPSURL,interfaceName];
  
  bool isSign = false;
  if(flagSign == 0){
    isSign = false;
  } else {
    isSign = true;
  }
  
  NSDictionary *jsonObject = [RequestParams setCPSServiceParams:readableMap token:NULL userInfo:NULL flagSign:isSign ];
  
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonObject options:NSJSONWritingPrettyPrinted error:nil];
  NSString *strJson=[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  //NSString *strJson=[NSString stringWithFormat:@"{ \"%@\" : \"%@\"}", @"staffCode", staffCode];

  actionCallback(@[requestUrlCPS, strJson]);
  
}

@end