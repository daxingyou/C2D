"use strict";
cc._RF.push(module, 'e1db5UmhQpGr5ClM4svbut8', 'CardManager');
// Script/Modules/CardManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CardManager = /** @class */ (function () {
    function CardManager() {
    }
    /**
     * 获取IMGManager单例对象
     *
     * @static
     * @returns {CardManager}
     * @memberof CardManager
     */
    CardManager.getInstance = function () {
        if (CardManager._instance === null) {
            CardManager._instance = new CardManager();
        }
        return CardManager._instance;
    };
    /**
      * 根据id获取牌对象(花色1黑桃2红桃3梅花4方块,点数从2到14)
      *
      * @param {number} id
      * @returns
      * @memberof CardManager
      */
    CardManager.prototype.getCardObjById = function (id) {
        if (id >= 2 && id < 15) {
            return { suit: 1, point: id, cardId: id };
        }
        else if (id >= 15 && id < 28) {
            return { suit: 2, point: id - 13, cardId: id };
        }
        else if (id >= 28 && id < 41) {
            return { suit: 3, point: id - 26, cardId: id };
        }
        else if (id >= 41 && id < 54) {
            return { suit: 4, point: id - 39, cardId: id };
        }
        else {
            return null;
        }
    };
    /**
     * 获取牌型| 豹子 > 顺金 > 金花 > 顺子 > 对子 > 单张
     *
     * @param {number[]} ids
     * @returns {string}
     * @memberof CardManager
     */
    CardManager.prototype.getCardTypeByIds = function (ids) {
        if (ids.length !== 3)
            return null;
        var card1 = this.getCardObjById(ids[0]);
        var card2 = this.getCardObjById(ids[1]);
        var card3 = this.getCardObjById(ids[2]);
        if (card1 && card2 && card3) {
            if (card1.point === card2.point && card2.point === card3.point) {
                return '豹子';
            }
            else {
                var points = [card1.point, card2.point, card3.point].sort(function (a, b) { return a - b; });
                if ((Math.abs(points[0] - points[1]) === 1 && Math.abs(points[1] - points[2]) === 1)
                    || (points[0] === 2 && points[1] === 3 && points[2] === 14)) {
                    if (card1.suit === card2.suit && card2.suit === card3.suit) {
                        return '顺金';
                    }
                    else {
                        return '顺子';
                    }
                }
                else {
                    if (card1.suit === card2.suit && card2.suit === card3.suit) {
                        return '金花';
                    }
                    else {
                        if (card1.point !== card2.point && card2.point !== card3.point && card1.point !== card3.point) {
                            return '单牌';
                        }
                        else {
                            return '对子';
                        }
                    }
                }
            }
        }
        return null;
    };
    /**
     * 根据牌id返回牛几,(0-11,0是没牛,11是五花牛)
     *
     * @param {number[]} ids
     * @returns {number}
     * @memberof CardManager
     */
    CardManager.prototype.getNiuTypeByIds = function (ids) {
        var _this = this;
        if (!ids || ids.length !== 5)
            return 0;
        var points = ids.map(function (id) {
            return _this.getPointById(id);
        }, this);
        var sum = 0;
        points.forEach(function (point) {
            sum += point;
        }, this);
        if (sum === 50) {
            if (ids.every(function (id) {
                return _this.getCardObjById(id).point > 10;
            }, this)) {
                return 11;
            }
            else {
                return 10;
            }
        }
        var arrs = this.arrayCombine(points, 3);
        var result = [];
        for (var i = 0; i < arrs.length; i++) {
            var arr = arrs[i];
            sum = 0;
            arr.forEach(function (point) {
                sum += point;
            }, this);
            if (sum % 10 === 0) {
                result = arr;
                break;
            }
        }
        if (result.length === 0)
            return 0;
        cc.js.array.removeArray(points, result);
        sum = 0;
        points.forEach(function (point) {
            sum += point;
        }, this);
        var end = sum % 10;
        if (end === 0)
            return 10;
        else
            return end;
    };
    /**
     * 根据ID获取牌点数
     *
     * @param {number} id
     * @returns {number}
     * @memberof CardManager
     */
    CardManager.prototype.getPointById = function (id) {
        if (id >= 2 && id < 15) {
            if (id === 14)
                return 1;
            else if (id > 10 && id < 14)
                return 10;
            else
                return id;
        }
        else if (id >= 15 && id < 28) {
            if (id - 13 === 14)
                return 1;
            else if (id - 13 > 10 && id - 13 < 14)
                return 10;
            else
                return id - 13;
        }
        else if (id >= 28 && id < 41) {
            if (id - 26 === 14)
                return 1;
            else if (id - 26 > 10 && id - 26 < 14)
                return 10;
            else
                return id - 26;
        }
        else if (id >= 41 && id < 54) {
            if (id - 39 === 14)
                return 1;
            else if (id - 39 > 10 && id - 39 < 14)
                return 10;
            else
                return id - 39;
        }
        else {
            return null;
        }
    };
    /**
     * 从数组中取count个成员组成的数组集合
     *
     * @param {any[]} targetArr 需要组合的数据源
     * @param {number} count 需要选几个数来构成组合
     * @returns
     * @memberof CardManager
     */
    CardManager.prototype.arrayCombine = function (targetArr, count) {
        if (!targetArr || !targetArr.length || count < 1 || count > targetArr.length) {
            return [];
        }
        var len = targetArr.length;
        var resultArrs = [];
        var flagArrs = this.getFlagArrs(len, count);
        while (flagArrs.length) {
            var flagArr = flagArrs.shift();
            var combArr = [];
            for (var i = 0; i < len; i++) {
                flagArr[i] && combArr.push(targetArr[i]);
            }
            resultArrs.push(combArr);
        }
        return resultArrs;
    };
    /**
     * 获得从m中取n的所有组合
     *
     * @param {number} m
     * @param {number} n
     * @returns
     * @memberof CardManager
     */
    CardManager.prototype.getFlagArrs = function (m, n) {
        if (!n || n < 1) {
            return [];
        }
        var resultArrs = [], flagArr = [], isEnd = false, i, j, leftCnt;
        for (i = 0; i < m; i++) {
            flagArr[i] = i < n ? 1 : 0;
        }
        resultArrs.push(flagArr.concat());
        while (!isEnd) {
            leftCnt = 0;
            for (i = 0; i < m - 1; i++) {
                if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                    for (j = 0; j < i; j++) {
                        flagArr[j] = j < leftCnt ? 1 : 0;
                    }
                    flagArr[i] = 0;
                    flagArr[i + 1] = 1;
                    var aTmp = flagArr.concat();
                    resultArrs.push(aTmp);
                    if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                        isEnd = true;
                    }
                    break;
                }
                flagArr[i] == 1 && leftCnt++;
            }
        }
        return resultArrs;
    };
    /**
     * 释放图片管理器的资源
     *
     * @memberof CardManager
     */
    CardManager.prototype.destroySelf = function () {
        CardManager._instance = null;
    };
    CardManager._instance = null;
    return CardManager;
}());
exports.default = CardManager;

cc._RF.pop();