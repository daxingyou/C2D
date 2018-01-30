"use strict";
cc._RF.push(module, '3550cBmAB5Pip6W07VMW445', 'Utils');
// Script/Modules/Utils.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * num是传入的正整数,返回千分位逗号分隔的字符串
 *
 * @export
 * @param {any} num
 * @returns
 */
function getThousandString(num) {
    if (isNaN(num))
        num = 0;
    var numString = num.toString();
    var result = "";
    while (numString.length > 3) {
        result = "," + numString.slice(-3) + result;
        numString = numString.slice(0, numString.length - 3);
    }
    if (numString) {
        result = numString + result;
    }
    return result;
}
exports.getThousandString = getThousandString;
/**
 * 传入千分位的字符串，返回去除逗号的字符串
 *
 * @export
 * @param {any} str
 * @returns
 */
function getBackNumString(str) {
    var list = str.split(",");
    str = "";
    for (var i = 0; i < list.length; i++) {
        str += list[i];
    }
    return str;
}
exports.getBackNumString = getBackNumString;
/**
 * 传入带小数点的数字字符串，返回去除小数点的数组
 * @export
 * @param {string} str
 * @returns
 */
function getPointNumString(str) {
    var list = str.split(".");
    var numList = [];
    for (var i = 0; i < list.length; i++) {
        numList.push(Number(list[i]));
    }
    return numList;
}
exports.getPointNumString = getPointNumString;
/**
 * 传入数字，返回每位数字的组成的数组
 * @export
 * @param {number} num
 * @returns
 */
function getNumberList(num) {
    var numList = num.toString().split("").map(function (i) {
        return Number(i);
    });
    return numList;
}
exports.getNumberList = getNumberList;
/**
 * 根据时间戳，返回对应时间格式的字符串
 *
 * @param {string} timestamp  时间戳(字符串类型)
 * @param {number} type 1是只获取日期，2是只获取时间,默认都获取（数字类型）
 * @returns {string}
 */
function getDateStringByTimestamp(timestamp, type) {
    var num = Number(timestamp);
    if (isNaN(num))
        return '';
    else {
        var timeDate = new Date();
        timeDate.setTime(num);
        var timeDateString = this.getDateStringByDate(timeDate);
        var timeString = this.getTimeStringByDate(timeDate);
        if (type === 1) {
            return timeDateString;
        }
        else if (type === 2) {
            return timeString;
        }
        else {
            return timeDateString + ' ' + timeString;
        }
    }
}
exports.getDateStringByTimestamp = getDateStringByTimestamp;
/**
 * 根据时间对象获取日期
 *
 * @param {Date} nowDate 时间对象
 * @param {string} connector 分隔符
 * @returns {string}
 */
function getDateStringByDate(nowDate, connector) {
    if (nowDate instanceof Date) {
        if (!connector) {
            connector = "-";
        }
        var year = nowDate.getFullYear() + '';
        var month = nowDate.getMonth() + 1;
        var monthStr = month + '';
        if (month < 10)
            monthStr = "0" + month;
        var day = nowDate.getDate();
        var dayStr = day + '';
        if (day < 10)
            dayStr = "0" + day;
        return year + connector + monthStr + connector + dayStr;
    }
    return '';
}
exports.getDateStringByDate = getDateStringByDate;
/**
 * 根据时间对象获取时间
 *
 * @param {Date} nowDate 时间对象
 * @param {string} connector 分隔符
 * @returns {string}
 */
function getTimeStringByDate(nowDate, connector) {
    if (nowDate instanceof Date) {
        if (!connector) {
            connector = ":";
        }
        var hour = nowDate.getHours();
        var hourStr = hour + '';
        if (hour < 10)
            hourStr = "0" + hour;
        var minute = nowDate.getMinutes();
        var minuteStr = minute + '';
        if (minute < 10)
            minuteStr = "0" + minute;
        // let second = nowDate.getSeconds();
        // let secondStr = second + '';
        // if (second < 10) secondStr = "0" + second;
        return hourStr + connector + minuteStr /*+ connector + secondStr*/;
    }
    return '';
}
exports.getTimeStringByDate = getTimeStringByDate;
/**
 * 获取倒计时字符串
 *
 * @param {number} time 倒计时毫秒数
 * @param {number} type 返回类型(默认空返回时分秒，1返回分秒)
 * @returns {string}
 */
function getCountDownString(time, type) {
    var obj = this.getCountDownObj(time);
    if (obj === null)
        return '';
    else {
        var str = '';
        if (type === 1) {
            obj.minute += obj.hour * 60;
        }
        else {
            if (obj.hour > 9)
                str += obj.hour + ':';
            else
                str += '0' + obj.hour + ':';
        }
        if (obj.minute > 9)
            str += obj.minute + ':';
        else
            str += '0' + obj.minute + ':';
        if (obj.second > 9)
            str += obj.second;
        else
            str += '0' + obj.second;
        return str;
    }
}
exports.getCountDownString = getCountDownString;
/**
 * 返回len位有效数字的数字，向下取整
 * @export
 * @param {number} num 数字
 * @param {number} len 最长的长度
 * @returns
 */
function getEffectiveNumbers(num, len) {
    var integerNum = Math.floor(num);
    var stringNum = num.toString();
    if (num === integerNum) {
        if (stringNum.length < len + 1) {
            return num;
        }
        else {
            return Number(stringNum.slice(0, len));
        }
    }
    else {
        if (stringNum.length < len + 2) {
            return num;
        }
        else {
            return Number(stringNum.slice(0, len + 1));
        }
    }
}
exports.getEffectiveNumbers = getEffectiveNumbers;
/**
 * 传入一个数字，返回带单位的4位有效数字和单位，有小数点
 * @export
 * @param {number} num
 * @param {boolean} [noSpace=true] 没有空格
 * @returns
 */
function getShowNumberString(num, noSpace) {
    if (noSpace === void 0) { noSpace = true; }
    if (num >= 10000) {
        var numStr = this.getEffectiveNumbers(num / 10000, 4);
        numStr += "万";
        return numStr;
    }
    else {
        return num + '';
    }
}
exports.getShowNumberString = getShowNumberString;
/**
 * 复制文本到剪切板
 *
 * @export
 * @param {string} text 需要复制的文本
 */
function copyToClipboard(text) {
    if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyToClipboard", "(Ljava/lang/String;)V", text);
    }
    else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
        jsb.reflection.callStaticMethod("AppController", "copyToClipboard:", text);
    }
    else {
        cc.log("该方法只支持原生平台");
    }
}
exports.copyToClipboard = copyToClipboard;
/**
 * 用默认浏览器打开指定url
 *
 * @export
 * @param {string} url url地址
 */
function openBrowser(url) {
    if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBrowser", "(Ljava/lang/String;)V", url);
    }
    else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
        jsb.reflection.callStaticMethod("AppController", "openBrowser:", url);
    }
    else {
        cc.log("该方法只支持原生平台");
    }
}
exports.openBrowser = openBrowser;

cc._RF.pop();