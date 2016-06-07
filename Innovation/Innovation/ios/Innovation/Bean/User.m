//
//  User.m
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import "User.h"

@implementation User

- (id)initWithCoder:(NSCoder *)aDecoder{
    if (self = [super init]) {
        self.userAcc = [aDecoder decodeObjectForKey:@"userAcc"]; //用户账号
        self.location = [aDecoder decodeObjectForKey:@"location"];//用户注册位置  areaCode
        self.acctstat = [aDecoder decodeObjectForKey:@"acctstat"];//
        self.authenStatus = [aDecoder decodeObjectForKey:@"authenStatus"];
        self.bankMode = [aDecoder decodeObjectForKey:@"bankMode"];
        self.bindCard = [aDecoder decodeObjectForKey:@"bindCard"];
        self.desRand = [aDecoder decodeObjectForKey:@"desRand"];
        self.products = [aDecoder decodeObjectForKey:@"products"];
        self.prtnCode = [aDecoder decodeObjectForKey:@"prtnCode"];
        self.prtnType = [aDecoder decodeObjectForKey:@"prtnType"];
        self.regChanal = [aDecoder decodeObjectForKey:@"regChanal"];
        self.regType = [aDecoder decodeObjectForKey:@"regType"];
        self.custName = [aDecoder decodeObjectForKey:@"custName"];
        self.userStaff = [aDecoder decodeObjectForKey:@"staffCode"];
        self.hadEpt=[aDecoder decodeObjectForKey:@"hadEpt"];
        self.merchantType = [aDecoder decodeObjectForKey:@"merchantType"];
        self.hadSdCode= [aDecoder decodeObjectForKey:@"hadSdCode"];
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)aCoder
{
     [aCoder encodeObject:self.hadEpt forKey:@"hadSdCode"];
    [aCoder encodeObject:self.hadEpt forKey:@"hadEpt"];
    [aCoder encodeObject:self.userAcc forKey:@"userAcc"];
    [aCoder encodeObject:self.location forKey:@"location"];
    [aCoder encodeObject:self.acctstat forKey:@"acctstat"];
    [aCoder encodeObject:self.authenStatus forKey:@"authenStatus"];
    [aCoder encodeObject:self.bankMode forKey:@"bankMode"];
    [aCoder encodeObject:self.bindCard forKey:@"bindCard"];
    [aCoder encodeObject:self.desRand forKey:@"desRand"];
    [aCoder encodeObject:self.products forKey:@"products"];
    [aCoder encodeObject:self.prtnCode forKey:@"prtnCode"];
    [aCoder encodeObject:self.prtnType forKey:@"prtnType"];
    [aCoder encodeObject:self.regChanal forKey:@"regChanal"];
    [aCoder encodeObject:self.regType forKey:@"regType"];
    [aCoder encodeObject:self.custName forKey:@"custName"];
    [aCoder encodeObject:self.userStaff forKey:@"staffCode"];
    [aCoder encodeObject:self.merchantType forKey:@"merchantType"];
}
- (void)signOut
{
    [self clearValue];
    [NSKeyedArchiver archiveRootObject:self toFile:[NSHomeDirectory() stringByAppendingPathComponent:@"Documents/user.archiver"]];
}
- (void)clearValue
{
    self.userAcc = nil; //用户账号
    self.location = nil;//用户注册位置  areaCode
    self.acctstat = nil;//
    self.authenStatus = nil;
    self.bankMode = nil;
    self.bindCard = nil;
    self.desRand = nil;
    self.products = nil;
    self.prtnCode = nil;
    self.prtnType = nil;
    self.regChanal = nil;
    self.regType = nil;
    self.custName = nil;
    self.userStaff = nil;
    self.hadEpt = nil;
    self.merchantType = nil;
}
@end
