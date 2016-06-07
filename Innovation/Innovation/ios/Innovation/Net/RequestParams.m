//
//  RequestParams.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RequestParams.h"
#import "Utils.h"
#import "SignControl.h"
#import "NetConstants.h"

@implementation RequestParams  

+ (NSDictionary *)setCPSServiceParams:(NSDictionary *)request token:(NSString *)token userInfo:(User *)userInfo flagSign:(bool)flagSign
{
  NSDictionary *jsonObject = request;
  NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithDictionary:jsonObject];
  if(userInfo != NULL){
  
  }

  

  [dic setObject:@"02" forKey:@"bisChannel"];
  [dic setObject:@"RSA" forKey:@"signType"];
  [dic setObject:@"iOS" forKey:@"systemType"];
  [dic setObject:@"Apple" forKey:@"vender"];
  [dic setObject:ChannelCode forKey:@"channelCode"];

  [dic setObject:Merid forKey:@"merId"];
  [dic setObject:Tmnnum forKey:@"tmnNum"];
  [dic setObject:[Utils keepWithTmnnum:Tmnnum] forKey:@"keep"];
  
  [dic setObject:[Utils getIDFA] forKey:@"imei"];
  [dic setObject:[Utils getIDFA] forKey:@"imsi"];
  [dic setObject:[Utils getIDFA] forKey:@"aidentifier"];
  [dic setObject:[Utils getAPPVesion] forKey:@"clientVersion"];
  [dic setObject:[Utils getDeviceModel] forKey:@"model"];
  [dic setObject:[Utils getSystemVersion] forKey:@"systemVersion"];
  [dic setObject:@"" forKey:@"cpuId"];
  [dic setObject:@"" forKey:@"kernelVersion"];
  [dic setObject:@"" forKey:@"diskInfo"];
  [dic setObject:@"" forKey:@"isSucc"];
  [dic setObject:@"" forKey:@"mac"];
  [dic setObject:@"" forKey:@"operCity"];
  [dic setObject:@"" forKey:@"operationCode"];
  [dic setObject:@"" forKey:@"prmotePort"];
  
  [dic setObject:[SignControl getTheSignByParamters:dic andRequstType:@"sign1" andDesRand:@""] forKey:@"sign"];
  
  jsonObject = [NSDictionary dictionaryWithDictionary:dic];
  return jsonObject;
}



@end