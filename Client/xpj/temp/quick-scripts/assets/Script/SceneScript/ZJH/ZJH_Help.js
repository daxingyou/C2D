(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/ZJH/ZJH_Help.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a937ZeNq1LvpQ+sE/zB5Mh', 'ZJH_Help', __filename);
// Script/SceneScript/ZJH/ZJH_Help.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GMManager_1 = require("../../Modules/GMManager");
var UDManager_1 = require("../../Modules/UDManager");
/**
 * 动作表态 枚举
 * @export
 * @enum {number} 不要= -1 等待表态 = 0  已表态 = 1
 */
var ZJH_BT_State;
(function (ZJH_BT_State) {
    //不要
    ZJH_BT_State[ZJH_BT_State["ACT_STATE_DROP"] = -1] = "ACT_STATE_DROP";
    //等待表态
    ZJH_BT_State[ZJH_BT_State["ACT_STATE_WAIT"] = 0] = "ACT_STATE_WAIT";
    //已表态
    ZJH_BT_State[ZJH_BT_State["ACT_STATE_BT"] = 1] = "ACT_STATE_BT";
})(ZJH_BT_State = exports.ZJH_BT_State || (exports.ZJH_BT_State = {}));
/**
 *金花游戏状态定义
 * @export
 * @enum {number}
 */
var ZJH_Game_State;
(function (ZJH_Game_State) {
    /**
     * 空闲
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_IDLE"] = 0] = "STATE_TABLE_IDLE";
    /**
     * 准备
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_READY"] = 1] = "STATE_TABLE_ZJH_READY";
    /**
     * 下底注
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_BASESCORE"] = 2] = "STATE_TABLE_ZJH_BASESCORE";
    /**
     * 发牌
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_FAPAI"] = 3] = "STATE_TABLE_ZJH_FAPAI";
    /**
     * 下注表态
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_BET"] = 4] = "STATE_TABLE_ZJH_BET";
    /**
     * 比牌
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_COMPARE"] = 5] = "STATE_TABLE_ZJH_COMPARE";
    /**
     * 结算
     */
    ZJH_Game_State[ZJH_Game_State["STATE_TABLE_ZJH_OVER"] = 6] = "STATE_TABLE_ZJH_OVER";
})(ZJH_Game_State = exports.ZJH_Game_State || (exports.ZJH_Game_State = {}));
/**
 * 定义表态状态值
 *
 * @export
 * @enum {number}
 */
var ZJH_Act_State;
(function (ZJH_Act_State) {
    /**
     * 弃牌
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_DROP"] = 0] = "BT_VAL_DROP";
    /**
     * 看牌
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_LOOCK"] = 1] = "BT_VAL_LOOCK";
    /**
     * 比牌
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_COMPARAE"] = 2] = "BT_VAL_COMPARAE";
    /**
     * 全下
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_BETALL"] = 3] = "BT_VAL_BETALL";
    /**
     * 跟注
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_BETSAME"] = 4] = "BT_VAL_BETSAME";
    /**
     * 加注
     */
    ZJH_Act_State[ZJH_Act_State["BT_VAL_BETADD"] = 5] = "BT_VAL_BETADD";
})(ZJH_Act_State = exports.ZJH_Act_State || (exports.ZJH_Act_State = {}));
/**
 * 对座位列表进行排序,让自己的座位始终在最下方
 *
 * @param {any} seatList
 * @returns
 */
function sortSeatList(seats) {
    if (!GMManager_1.default.getInstance().zjhGameData)
        return null;
    var mySeat = getSeatById(UDManager_1.default.getInstance().mineData.accountId);
    if (mySeat) {
        var tempList = [];
        for (var i = 0; i < seats.length; i++) {
            var seatInfo = seats[i];
            if (seatInfo) {
                var index = 0;
                if (mySeat.seatIndex > seatInfo.seatIndex) {
                    index = seats.length - (mySeat.seatIndex - seatInfo.seatIndex);
                }
                else {
                    index = Math.abs(mySeat.seatIndex - seatInfo.seatIndex);
                }
                tempList[index] = seatInfo;
            }
        }
        return tempList;
    }
    return null;
}
exports.sortSeatList = sortSeatList;
;
/**
 * 根据玩家accountId获取座位号
 *
 * @param {string} accountId
 * @returns {SeatVo}
 */
function getSeatById(accountId) {
    if (!GMManager_1.default.getInstance().zjhGameData || !GMManager_1.default.getInstance().zjhGameData.seats)
        return null;
    for (var i = 0; i < GMManager_1.default.getInstance().zjhGameData.seats.length; i++) {
        var seatInfo = GMManager_1.default.getInstance().zjhGameData.seats[i];
        if (seatInfo.accountId === accountId) {
            return seatInfo;
        }
    }
    return null;
}
exports.getSeatById = getSeatById;
/**
 * 根据玩家SeatId获取座位号
 *
 * @param {string} seatById
 * @returns {SeatVo}
 */
function getSeatBySeatId(seatById) {
    if (!GMManager_1.default.getInstance().zjhGameData || !GMManager_1.default.getInstance().zjhGameData.seats)
        return null;
    for (var i = 0; i < GMManager_1.default.getInstance().zjhGameData.seats.length; i++) {
        var seatInfo = GMManager_1.default.getInstance().zjhGameData.seats[i];
        if (seatInfo.seatIndex === seatById) {
            return seatInfo;
        }
    }
    return null;
}
exports.getSeatBySeatId = getSeatBySeatId;
/**
 * 根据座位id获取位置索引
 *
 * @export
 * @param {number} seatId   seatId位-1的时候，根据accountId返回
 * @param {string} [accountId='']
 * @returns
 */
function getIndexBySeatId(seatId, accountId) {
    if (accountId === void 0) { accountId = ''; }
    if (GMManager_1.default.getInstance().zjhGameData && GMManager_1.default.getInstance().zjhGameData.seats) {
        var seats = GMManager_1.default.getInstance().zjhGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            var seat = seats[i];
            if (seatId === -1) {
                if (seat.accountId !== '0' && seat.accountId === accountId) {
                    return i;
                }
            }
            else {
                if (seat.seatIndex === seatId) {
                    return i;
                }
            }
        }
    }
    return -1;
}
exports.getIndexBySeatId = getIndexBySeatId;
function getNowPlayer() {
    var seatList = [];
    if (GMManager_1.default.getInstance().zjhGameData && GMManager_1.default.getInstance().zjhGameData.seats) {
        var seats = GMManager_1.default.getInstance().zjhGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            var seat = seats[i];
            if (seat.accountId !== '' && seat.accountId !== '0'
                && seat.bGamed === 1 && seat.btState !== ZJH_BT_State.ACT_STATE_DROP) {
                seatList.push(seat);
            }
        }
    }
    return seatList;
}
exports.getNowPlayer = getNowPlayer;
/**
 * 根据数字获取每个区间的 数量
 * @export
 * @param {any} num
 * @returns
 */
function getEveryIntervalNum(num) {
    num = Number(num);
    var level = [100, 50, 20, 10, 5, 2, 1];
    var ChipList = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 7; i++) {
        ChipList[i] = Math.floor(num / level[i]);
        if (num % level[i] === 0)
            break;
        num = num % level[i];
    }
    return ChipList;
}
exports.getEveryIntervalNum = getEveryIntervalNum;
/**
 * 根据数据获取指定筹码区域的个数,其他区域为0个
 * @export
 * @param {number} num
 * @param {number} speNum
 * @returns
 */
function getOneIntervalNum(num, speNum) {
    num = Number(num);
    var ChipList = [];
    var b5 = speNum === 100 ? Math.floor(num / 100) : 0; //100
    ChipList.push(b5);
    var b4 = speNum === 50 ? Math.floor(num / 50) : 0; //50
    ChipList.push(b4);
    var b2 = speNum === 20 ? Math.floor(num / 20) : 0; //20
    ChipList.push(b2);
    var b1 = speNum === 10 ? Math.floor(num / 10) : 0; //10
    ChipList.push(b1);
    var n4 = speNum === 5 ? Math.floor(num / 5) : 0; //5
    ChipList.push(n4);
    var n2 = speNum === 2 ? Math.floor(num / 2) : 0; //2
    ChipList.push(n2);
    var n1 = speNum === 1 ? Math.floor(num / 1) : 0; //1
    ChipList.push(n1);
    return ChipList;
}
exports.getOneIntervalNum = getOneIntervalNum;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ZJH_Help.js.map
        