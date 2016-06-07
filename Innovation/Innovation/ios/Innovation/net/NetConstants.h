//
//  NetConstants.h
//  Innovation
//
//  Created by Howell on 16/6/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#ifndef NetConstants_h
#define NetConstants_h


#endif /* NetConstants_h */

// 切换环境变量
#define EVN EVN44


//--------------------------------------------------------------------- 44环境  ----------------------------------------------------------------------
#if (EVN == EVN44)
#define CPSURL            @"http://172.26.13.104:8383/"
#define INFMerid    @"8613101200002508"
#define INFAppFrom  @"440000-APP001-001-127.0.0.1"
#define INFAreaCode @"440000"
#define INFIP       @"127.0.0.1"
#define Tmnnum       @"440106003094"
#define Merid        @"8613051700001006"

//---------------------------------------------------------------------  46环境  ----------------------------------------------------------------------
#elif (EVN == EVN46)
#define CPSURL            @"http://172.26.13.112:8383/"
#define INFMerid    @"8613101200002508"
#define INFAppFrom  @"440000-APP001-001-127.0.0.1"
#define INFAreaCode @"440000"
#define INFIP       @"127.0.0.1"
#define Tmnnum       @"440106003094"
#define Merid        @"8613051700001006"


//---------------------------------------------------------------------  60环境 ----------------------------------------------------------------------
#elif (EVN == EVN60)
#define CPSURL            @"http://172.26.13.96:8383/"
#define INFMerid    @"8613101200002508"
#define INFAppFrom  @"440000-APP001-001-127.0.0.1"
#define INFAreaCode @"440000"
#define INFIP       @"127.0.0.1"
#define Tmnnum       @"440106003094"
#define Merid        @"8613051700001006"


//---------------------------------------------------------------------  准生产环境  -------------------------------------------------------------------
#elif (EVN == PRE_PRODUCT)
#define CPSURL            @"ttps://183.63.191.62:4443/"
#define INFMerid    @"8613101200002508"
#define INFAppFrom  @"440000-APP001-001-127.0.0.1"
#define INFAreaCode @"440000"
#define INFIP       @"127.0.0.1"
#define Tmnnum            @"440106014022"
#define Merid             @"8604400000143100"


//---------------------------------------------------------------------  生产环境 ----------------------------------------------------------------------
#elif (EVN == PRODUCT)
#define CPSURL            @"https://enterprise.bestpay.com.cn:4443/"
#define INFMerid    @"8613101200002508"
#define INFAppFrom  @"440000-APP001-001-127.0.0.1"
#define INFAreaCode @"440000"
#define INFIP       @"127.0.0.1"

#define Tmnnum            @"440106014022"
#define Merid             @"8604400000143100"


#endif

//----------------------------------------------------------------------  公用 ----------------------------------------------------------------------
#define ChannelCode  @"20"
#define NEWCHANNELID      @"100200"          //综管台
#define TYPE              @"2_8"             //综管台

