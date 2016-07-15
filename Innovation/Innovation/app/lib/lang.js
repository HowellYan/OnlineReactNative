'use strict';

String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
};
String.prototype.isEmpty = function(){
    if(typeof this == 'undefined' || this == 'undefined' || this == '' || this == null || this == 'null' || this == 'NULL' || this == '(null)')
        return false;
    else
        return true;
};

var fen2yuan = function(fen) {
    fen = fen + '';
    if(fen==null ||fen.length<1){
        return '0.00';
    }else if(fen.length==1){
        return '0.0'+fen;
    }else if(fen.length==2){
        return '0.'+fen;
    }else {
        var f = fen.substring(fen.length - 2);
        var y = fen.substring(0, fen.length - 2);
        return y + "." + f;
    }
}

var yuan2fen = function(yuan) {
    var yuanStr = yuan+'';
    if (yuanStr.startWith('.')) {
        yuanStr = '0' + yuanStr;
    }
    yuan = new Number(yuanStr).toFixed(2);
    var currency = Math.round((yuan*100)*1000)/1000;
    if ((currency+"").indexOf(".") > 0) {
        currency = currency.substring(0, currency.indexOf("."));
    }
    return currency;
}

var DateTime = {
        /**
         * @Description 获取YYYYMMDD格式的日期字符串
         * @return {@link String}日期
         */
        getDate_YYYYMMDD : function(){
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return y + '' + m + '' + d;
        },
        /**
         * @Description 获取YYYYMMDD格式的日期字符串
         * @return {@link String}日期
         */
        getDate_YYYY_MM_DD : function(){
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return y + '-' + m;
        },
        /**
         * @Description 获取HHMMSS格式的时间字符串
         * @return {@link String}时间
         */
        getTime_HHMMSS : function(){
            var date = new Date();
            var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return h + '' + f + '' + s;
        },
        /**
         * 比较两个日期的时间差
         * @param time1 是之前的时间
         * @param time2 是之后的时间
         * @param type  0是比较天数 1是相差小时 2是相差分钟
         * @returns {string}
         */
        getTime_CONTRAST : function (time1,time2,type) {
            var keep = '';
            var timeSet = function(timeOut){
                var abc = '';
                var a = timeOut .substring(0,4);
                var b = timeOut .substring(4,6);
                var c =  timeOut .substring(6,8);
                var d =  timeOut .substring(8,10);
                var e =  timeOut .substring(10,12);
                var f =  timeOut .substring(12,14);
                abc = a+'/'+b+'/'+c+' '+d+':'+e+':'+f;
                console.log('abc = ' + abc);
                return abc;
            };
            var d1 = new Date(Date.parse(timeSet(time1)));
            var d2 = new Date(Date.parse(timeSet(time2)));//
            if(type == '2'){ //分钟数   把当前时间转为格式 2014/10/30 17:40:00
                keep = (d2 - d1) / 60000;
            }
            return keep;
        }
    };

var lang = {
    fen2yuan: fen2yuan,
    yuan2fen: yuan2fen,
    getDate_YYYYMMDD : DateTime.getDate_YYYYMMDD,
    getDate_YYYY_MM_DD : DateTime.getDate_YYYY_MM_DD,
    getTime_HHMMSS : DateTime.getTime_HHMMSS,
}

module.exports = lang;
