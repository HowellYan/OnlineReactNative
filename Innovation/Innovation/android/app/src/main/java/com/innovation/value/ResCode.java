package com.innovation.value;

/**
 * Created by Howell on 16/5/12.
 */
public class ResCode {
    /**
     * 网络不给力s
     */
    public static final String NETWORK_ERROR = "091100";
    public static final String NETWORK_ERROR_MSG = "网络不给力";
    /**
     * 已经开通过
     */
    public static final String HAS_BEEN_OPENED = "006923";
    public static final String HAS_BEEN_OPENED_MSG = "您已经开通过此服务";
    /**
     * 服务返回的数据有误
     */
    public static final String DATA_ERROR = "091101";
    public static final String DATA_ERROR_MSG = "数据返回错误";
    /**
     * 未知错误
     */
    public static final String UNKNOWN_ERROR = "091102";
    public static final String UNKNOWN_ERROR_MSG = "未知错误";
    /**
     * 访问服务器超时
     */
    public static final String CALL_SERVICE_TIMEOUT = "091103";
    public static final String CALL_SERVICE_TIMEOUT_MSG = "连接超时";
    /**
     * 访问服务器出错
     */
    public static final String CALL_SERVICE_ERROR = "091104";
    public static final String CALL_SERVICE_ERROR_MSG = "连接失败";
    /**
     * 获取不到服务数据
     */
    public static final String GET_SERVICE_RESPONSE_ERROR = "091105";
    public static final String GET_SERVICE_RESPONSE_ERROR_MSG = "网络连接失败";
    /**
     * 请求服务器失败
     */
    public static final String CREATE_REQUEST_ERROR = "091106";
    public static final String CREATE_REQUEST_ERROR_MSG = "网络连接失败";

    /**
     * 请求服务器地址无效
     */
    public static final String REQUEST_URL_ERROR = "091107";
    public static final String REQUEST_URL_ERROR_MSG = "网络连接失败";
    /**
     * 取服务器数据出错
     */
    public static final String READ_SERVICE_DATA_ERROR = "091108";
    public static final String READ_SERVICE_DATA_ERROR_MSG = "网络连接失败";
    public static final String READ_SERVICE_DATA_ERROR_TIME_MSG = "亲，请确认您的手机时间设置无误再试";
    /**
     * 访问服务器发生未知错误
     */
    public static final String RESUEST_UNKNOWN_ERROR = "091109";
    public static final String RESUEST_UNKNOWN_ERROR_MSG = "网络连接失败";
    /**
     * 请求参数丢失
     */
    public static final String REQUEST_LOSE = "091110";
    public static final String REQUEST_LOSE_MSG = "网络连接失败";
    /**
     * 没有查询到成员卡数据
     */
    public static final String NO_QUERY_MEMBER_CARD = "091111";
    public static final String NO_QUERY_MEMBER_CARD_MSG = "没有查询到成员卡数据";
    /**
     * 没有查询到代理商户数据
     */
    public static final String NO_QUERY_AGENT_DATA = "091112";
    public static final String NO_QUERY_AGENT_DATA_MSG = "没有查询到代理商户数据";
    /**
     * 用户数据丢失
     */
    public static final String TOKEN_LOSE = "091119";
    public static final String TOKEN_LOSE_MSG = "用户数据丢失";
    /**
     * 没有查询到查到相关数据
     */
    public static final String NO_DATA = "091120";
    public static final String NO_DATA_MSG = "没有查询到相关数据";

    /**
     * 取消充值
     */
    public static final String CANCLE_TASK = "091121";
    public static final String CANCLE_TASK_MSG = "充值已经取消";
    /**
     * 取消充值
     */
    public static final String UNSUPPORTED_PRODUCT_TYPE = "091122";
    public static final String UNSUPPORTED_PRODUCT_TYPE_MSG = "不支持的产品类型的账户";
    /**
     * 绑卡状态检查
     */
    public static final String UN_BING_CARD_STAT = "091123";
    public static final String UN_BING_CARD_STAT_MSG = "请检查是否已绑卡，获取银行卡信息异常。";

    /**
     * 没有查到账单
     */
    public static final String NO_BILL_RECORD = "091124";
    public static final String NO_BILL_RECORD_MSG = "没有查到交易记录";

    /**
     * 没有查到账单
     */
    public static final String CHECK_SIGN_CODE = "091125";
    public static final String CHECK_SIGN_CODE_MSG = "返回的内容验签失败。";

    /**
     * 系统参考号重复
     */
    public static final String SYSTEMNO_ERROR = "091126";
    public static final String SYSTEMNO_ERROR_MSG = "为避免交易重复,请返回并重新进行充值";

    /**
     * 号码归属地查询为空
     */
    public static final String CHEACK_PHONE_ERROR = "091127";
    public static final String CHEACK_PHONE_ERROR_MSG = "未能查询到运营商";


	/*------------------------以下为服务器响应码----------------------------------*/
    /**
     * 操作成功
     */
    public static final String SUCCESS = "000000";
    public static final String SUCCESS_MSG = "操作成功";
    /**
     * 首次登录
     */
    public static final String FIRST_LOGIN = "011011";
    public static final String FIRST_LOGIN_MSG = "首次登录";
    /**
     * 登录设备改变
     */
    public static final String DEVICE_CHANGE = "011012";
    public static final String DEVICE_CHANGE_MSG = "登录设备改变";
    /**
     * 余额不足
     */
    public static final String MONEY_NOT_ENOUGH = "006016";
    public static final String MONEY_NOT_ENOUGH_MSG = "余额不足";
    public static final String MONEY_NOT_ENOUGH_PAYMSG = "交费易余额不足";
    public static final String MONEY_NOT_ENOUGH_BANKMSG = "银行账户余额不足";

    /**
     * 异地登陆响应码
     */
    public static final String LONG_DISTANCE_LOGIN = "012111";
    public static final String LONG_DISTANCE_LOGIN_MSG = "亲，别说我没告诉你，您的账号尝试在异地登录，可能存在风险，如需解除异地登录限制请联系在线客服或4008011888。";


    /**
     * 登录TOKEN过期
     */
    public static final String TOKEN_DISABLE = "010054";
    public static final String TOKEN_DISABLE_MSG = "登录TOKEN过期";

    /**
     * 无效签名
     */
    public static final String INVALID_SIGNATURE = "012054";
    public static final String INVALID_SIGNATURE_MSG = "无效签名";

    /**
     * 没有查到交易记录
     */
    public static final String NO_RECORD = "011010";
    public static final String NO_RECORD_MSG = "没有查到交易记录";



    /**
     * 密码错误次数提示
     */
    public static final String PASSWORD_ERROR_COUNT = "002135";

    /**
     * 输入密码错误次数超过三次，账户被锁定
     */
    public static final String PASSWORD_ERROR_LOCKED_002136 = "002136";

    /**
     * 输入密码错误次数超过三次，账户被锁定
     */
    public static final String PASSWORD_ERROR_LOCKED_002137 = "002137";

    /**
     * 调用接口超时
     */
    public static final String SERVICE_TIME_OUT = "011007";

    /**
     * 调用接口业务处理中
     */
    //public static final String SERVICE_DEALING_1 = "009090";

    /**
     * 调用接口业务处理中
     */
    //public static final String SERVICE_DEALING_2 = "009091";

    /**
     * 调用接口业务处理中
     */
    //public static final String SERVICE_DEALING_3 = "006751";

    /**
     * 调用接口业务处理中
     */
    //public static final String SERVICE_DEALING_4 = "000031";

    /**
     * 业务网关超时
     */
    public static final String BIZ_TIME_OUT = "009002";

    /**
     * 月消费额限制错误编码，如果收到此编码，要判断此用户是否是体验商户，如果是，则指引其去申请认证
     */
    public static final String MONTH_CONSUMPTION_EXCEED = "000092";

    /**
     * 未找到酬金结算方式，不进行酬金计算
     */
    public static final String COMMISSIO_ERROR = "004010";
}
