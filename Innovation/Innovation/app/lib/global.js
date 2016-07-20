'use strict';
var global = {
	TITLE: {
        'no_repeat': '交易提示',
        'submited_title': '交易已受理',
        'dialog_title' : '处理失败'
    },
	RES: {
		'SUCCESS': '000000',
        'SUCCESS_MSG': '操作成功',
        
        'UNKNOWN_ERROR': '091102',
        'UNKNOWN_ERROR_MSG': '未知错误',

        'MONEY_NOT_ENOUGH': '006016',
        'MONEY_NOT_ENOUGH_MSG': '余额不足',

        'TOKEN_DISABLE' : '010054',
        'TOKEN_DISABLE_MSG' : '请重新登录',

        'CARD_NOT_ENOUGH' : '006914',
        'CARD_NOT_ENOUGH_MSG' : '卡库存不足',

        'PASSWORD_ERROR_LOCKED_002136' : '002136',  //输入密码错误次数超过三次，账户被锁定
        'PASSWORD_ERROR_LOCKED_002136_MSG' : '支付密码错误3次，账号已被锁定3小时后自动解锁，如需帮助请拨打客服4008011888',  //输入密码错误次数超过三次，账户被锁定

        'PASSWORD_ERROR_LOCKED_020004' : '020004'  //输入密码被锁定
	},
	'BUS_TYPE' : {
        'BUS_TYPE_TEL' : '手机充值',
        'BUS_TYPE_QQ' : 'QQ充值',
        'BUS_TYPE_TEL_CARD' : '话费充值卡',
        'BUS_TYPE_TEL_CARD_TELECOM' : '1001',   //电信
        'BUS_TYPE_TEL_CARD_UNICOM' : '1002',    // 联通
        'BUS_TYPE_GAME_DIRECT' : '游戏直充',
        'BUS_TYPE_GAME_CARD' : '游戏点卡',
        'BUS_TYPE_SDM' : '水电煤',
        'BUS_TYPE_3G' : '3G流量卡',
        'BUS_TYPE_PERSON_ACCOUNT' : '翼支付充值',
        'BUS_TYPE_FIXEDPHONEBROADBAND' : "固话宽带充值",
        'BUS_TYPE_BESTPAY_CARD' : '翼支付卡',
        'BUS_TYPE_TRAFFIC_FINES' : '交通罚款',
        'BUS_TYPE_BESTPAY_TOUCH' : '天翼碰碰',
        'BUS_TYPE_COMMON' : '订单详情公共信息',
        'BUS_TYPE_TIANYIBAO' : '添益宝'
    },
	'ACCOUNT_TYPE' : {
        'KEY_ACCOUNT_FUND' : '0001',            // 资金账户
        'KEY_ACCOUNT_CLEAR' : '0300',           // [BestPay20140415001] 添加“待结算账户”	 0300
        'KEY_ACCOUNT_IPOS' : '0007',            // 交费易账户
        'KEY_ACCOUNT_REWARD' : '0110'          // 酬金账户
    },
    'CARD_TYPE' : {
        'BANK_MODE_COMMON_CARD': 'BT1001',                      // 普通卡
        'BANK_MODE_FUND_POOL_MASTER_CARD': 'BT1013',            // 资金池母卡
        'BANK_MODE_FUND_POOL_MEMBER_CARD' : 'BT1014',           // 资金池子卡
        'BANK_MODE_FUND_POOL_MEMBER_MASTER_CARD' : 'BT1002'     // 资金池子母卡
    }
};

module.exports = global;

