package com.innovation.bean;


public final class UserInfo  {
    /**
     * @Description 登录用户名
     */
    private String staffCode;
    /**
     * @Description 加签令牌
     */
    private String tokenCode;
    /**
     * @Description 客户编码
     */
    private String custCode;
    /**
     * @Description 接入机构商户编码
     */
    private String prtnCode;
    /**
     * @Description 登录客户权限列表
     */
    private String privUri;
    /**
     * @Description 账户标识（0:试用账户，1：正式账户）
     */
    private String acctStat;
    /**
     * @Description 注册类型（0:个人商户，1：企业商户）
     */
    private String regType;
    /**
     * @Description
     *              产品类型（100：企业账户，101：代收付，102：IPOS，103：批扣，104：手机IPOS，200：EPOS，201
     *              ：ATM，202：多媒体，203：自助终端）,其中手机端产品类型为三种：100、104、100|104
     */
    private String products;
    /**
     * @Description 产品线类型（0:不支持、1：资金归集、2：手机交费易、3：双产品线）
     */
    private int productType;
    /**
     * @Description 资金管理模式（BT1001：普通卡，BT1002：子母卡，BT1013：资金池母卡，BT1014：资金池子卡）
     */
    private String bankMode;
    /**
     * @Description 注册渠道（20：手机客户端，90：门户运营）
     */
    private String regChanal;
    /**
     * @Description 是否绑卡（0：未绑卡，1：已绑卡，2：绑卡中）
     */
    private String bindCard;
    /**
     * @Description 审核状态（S0V:待审核,S0A:审核通过,S0F:审核不通过）
     */
    private String aproStat;
    /**
     * @Description 审核意见
     */
    private String aproDesc = "";

    /**
     * PRINTYPE
     * 代理商：  PT901    普通商户：PT403
     */
    private String prinType;

    /**
     * 认证状态: A00 认证中，A01未认证，A02已认证，A99认证失败
     */
    private String authenStatus;

    /**
     * 商户名称
     */
    private String custName;

    /**
     * 地区编码
     */
    private String areaCode;

    /**
     * @return the custName
     */

    /**
     * 添益宝标识
     */
    private String hadEpt;



    public String getHadEpt() {
        return hadEpt;
    }

    public void setHadEpt(String hadEpt) {
        this.hadEpt = hadEpt;
    }

    public String getCustName() {
        return custName;
    }

    /**
     * @param custName the custName to set
     */
    public void setCustName(String custName) {
        this.custName = custName;
    }

    /**
     * 认证状态: A00 认证中，A01未认证，A02已认证，A99认证失败
     */
    public String getAuthenStatus() {
        return authenStatus;
    }

    /**
     * 认证状态: A00 认证中，A01未认证，A02已认证，A99认证失败
     * @param authenStatus
     */
    public void setAuthenStatus(String authenStatus) {
        this.authenStatus = authenStatus;
    }

    /**
     * PRINTYPE
     *    代理商：  PT901    普通商户：PT403
     */
    public String getPrinType() {
        return prinType;
    }

    /**
     * PRINTYPE
     *    代理商：  PT901    普通商户：PT403
     */
    public void setPrinType(String prinType) {
        this.prinType = prinType;
    }

    public UserInfo() {
        super();
    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public String getTokenCode() {
        return tokenCode;
    }

    public void setTokenCode(String tokenCode) {
        this.tokenCode = tokenCode;
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode;
    }

    public String getPrtnCode() {
        return prtnCode;
    }

    public void setPrtnCode(String prtnCode) {
        this.prtnCode = prtnCode;
    }

    public String getPrivUri() {
        return privUri;
    }

    public void setPrivUri(String privUri) {
        this.privUri = privUri;
    }

    public String getAcctStat() {
        return acctStat;
    }

    public void setAcctStat(String acctStat) {
        this.acctStat = acctStat;
    }

    public String getRegType() {
        return regType;
    }

    public void setRegType(String regType) {
        this.regType = regType;
    }

    public String getProducts() {
        return products;
    }

    public void setProducts(String products) {
        this.products = products;
    }

    public int getProductType() {
        return productType;
    }

    public void setProductType(int productType) {
        this.productType = productType;
    }

    public String getBankMode() {
        return bankMode;
    }

    public void setBankMode(String bankMode) {
        this.bankMode = bankMode;
    }

    public String getRegChanal() {
        return regChanal;
    }

    public void setRegChanal(String regChanal) {
        this.regChanal = regChanal;
    }

    public String getBindCard() {
        return bindCard;
    }

    public void setBindCard(String bindCard) {
        this.bindCard = bindCard;
    }

    public String getAproStat() {
        return aproStat;
    }

    public void setAproStat(String aproStat) {
        this.aproStat = aproStat;
    }

    public String getAproDesc() {
        return aproDesc;
    }

    public void setAproDesc(String aproDesc) {
        this.aproDesc = aproDesc;
    }


    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    @Override
    public String toString() {
        return "UserInfo [staffCode=" + staffCode + ", tokenCode=" + tokenCode
                + ", custCode=" + custCode + ", prtnCode=" + prtnCode
                + ", privUri=" + privUri + ", acctStat=" + acctStat
                + ", regType=" + regType + ", products=" + products
                + ", productType=" + productType + ", bankMode=" + bankMode
                + ", regChanal=" + regChanal + ", bindCard=" + bindCard
                + ", aproStat=" + aproStat + ", aproDesc=" + aproDesc
                + ", prinType=" + prinType + ", authenStatus=" + authenStatus
                + ", custName=" + custName+ ", areaCode=" + areaCode
                + ",hadEpt"+hadEpt+"]" ;
    }

}
