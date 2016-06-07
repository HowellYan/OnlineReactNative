//
//  User.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface User : NSObject <NSCoding>
@property (nonatomic, copy) NSString *userAcc; //用户账号，登陆后返回
@property (nonatomic, copy) NSString *userStaff;//登录账号，跟UserAcc是多对一关系
@property (nonatomic, copy) NSString *location;//用户注册位置  areaCode
@property (nonatomic, copy) NSString *acctstat;//
@property (nonatomic, copy) NSString *authenStatus;
@property (nonatomic, copy) NSString *bankMode;   // 资金管理模式
@property (nonatomic, copy) NSString *bindCard;
@property (nonatomic, copy) NSString *desRand;
@property (nonatomic, copy) NSString *products;   // 产品类型
@property (nonatomic, copy) NSString *prtnCode;
@property (nonatomic, copy) NSString *prtnType;   // 代理商标识
@property (nonatomic, copy) NSString *regChanal;
@property (nonatomic, copy) NSString *regType;    // 注册类型
@property (nonatomic, copy) NSString *custName;   //用户名称
@property (nonatomic, copy) NSString *hadEpt;     //是否开通添益宝
@property (nonatomic, copy) NSString *merchantType;//商户类型
@property (nonatomic, copy) NSString  *hadSdCode;//二维码付款开通状态 1 为开通
// 在登录状态退出时用到
@property (nonatomic, copy) NSString *userNo;
//- (void)saveValue;
- (void)signOut;
@end
