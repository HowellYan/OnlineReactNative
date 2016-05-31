'use strict';

import phoneRechargeView from '../mainApp/phoneRecharge/phoneRechargeView';
import broadbandView from '../mainApp/broadband/broadbandView';

var THUMB_URLS = [
  {url:require('./imgs/h.png'), name:'手机充值', component:phoneRechargeView },
  {url:require('./imgs/gh.png'), name:'固话宽带', component:broadbandView },
  {url:require('./imgs/yzf.png'), name:'翼支付充值', component:broadbandView },
  {url:require('./imgs/c.png'), name:'卡劵购买', component:broadbandView },
  {url:require('./imgs/e.png'), name:'二维码', component:broadbandView },
  {url:require('./imgs/g.png'), name:'游戏充值', component:broadbandView },
  {url:require('./imgs/jf.png'), name:'交通罚款', component:broadbandView },
  {url:require('./imgs/q.png'), name:'QQ', component:broadbandView },
  {url:require('./imgs/sdm.png'), name:'水电煤', component:broadbandView },
  {url:require('./imgs/m.png'), name:'更多', component:broadbandView }
];


var mainJS = {
  THUMB_URLS : THUMB_URLS
}


module.exports = mainJS;