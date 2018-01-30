"use strict";
cc._RF.push(module, 'fbb42I1P3FEoK756ak8qGNt', 'MJ_Help');
// Script/SceneScript/Game/MJ_Help.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GMManager_1 = require("../../Modules/GMManager");
var UDManager_1 = require("../../Modules/UDManager");
/**
 * 麻将枚举
 *
 * @export
 * @enum {number} 无 = 0 万 = 1 筒 = 2 条 = 3
 */
var MJ_Suit;
(function (MJ_Suit) {
    /**
     * 无
     */
    MJ_Suit[MJ_Suit["SUIT_TYPE_NAN"] = 0] = "SUIT_TYPE_NAN";
    /**
     * 万
     */
    MJ_Suit[MJ_Suit["SUIT_TYPE_WAN"] = 1] = "SUIT_TYPE_WAN";
    /**
     *筒
     */
    MJ_Suit[MJ_Suit["SUIT_TYPE_TONG"] = 2] = "SUIT_TYPE_TONG";
    /**
     * 条
     */
    MJ_Suit[MJ_Suit["SUIT_TYPE_TIAO"] = 3] = "SUIT_TYPE_TIAO";
})(MJ_Suit = exports.MJ_Suit || (exports.MJ_Suit = {}));
/**
 * 胡杠碰吃过等动作表态 枚举
 *
 * @export
 * @enum {number} 不要= -1 等待表态 = 0  已表态 = 1
 */
var MJ_Act_State;
(function (MJ_Act_State) {
    //不要
    MJ_Act_State[MJ_Act_State["ACT_STATE_DROP"] = -1] = "ACT_STATE_DROP";
    //等待表态
    MJ_Act_State[MJ_Act_State["ACT_STATE_WAIT"] = 0] = "ACT_STATE_WAIT";
    //已表态
    MJ_Act_State[MJ_Act_State["ACT_STATE_BT"] = 1] = "ACT_STATE_BT";
})(MJ_Act_State = exports.MJ_Act_State || (exports.MJ_Act_State = {}));
/**
 * 胡杠碰吃过动作类型 枚举
 *
 * @export
 * @enum {number} 胡 = 0 杠= 1 碰 = 2 吃=3 过=4
 */
var MJ_Act_Type;
(function (MJ_Act_Type) {
    //胡
    MJ_Act_Type[MJ_Act_Type["ACT_INDEX_HU"] = 0] = "ACT_INDEX_HU";
    //杠
    MJ_Act_Type[MJ_Act_Type["ACT_INDEX_GANG"] = 1] = "ACT_INDEX_GANG";
    //碰
    MJ_Act_Type[MJ_Act_Type["ACT_INDEX_PENG"] = 2] = "ACT_INDEX_PENG";
    //吃
    MJ_Act_Type[MJ_Act_Type["ACT_INDEX_CHI"] = 3] = "ACT_INDEX_CHI";
    //过
    MJ_Act_Type[MJ_Act_Type["ACT_INDEX_DROP"] = 4] = "ACT_INDEX_DROP";
})(MJ_Act_Type = exports.MJ_Act_Type || (exports.MJ_Act_Type = {}));
/**
 * 胡牌动作 枚举
 *
 * @export
 * @enum {number}
 *   未胡牌 = 0, 自摸胡 = 1, 普通点炮胡 = 2, 抢杠胡 = 3,
 * 自摸杠上花 = 4, 点杠上花胡 = 5, 点杠上炮 = 6, 查叫 = 7,
 */
var MJ_HuPai;
(function (MJ_HuPai) {
    /**
     * 未胡牌
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_NONE"] = 0] = "HUPAI_TYPE_NONE";
    /**
     * 自摸胡
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_ZIMO"] = 1] = "HUPAI_TYPE_ZIMO";
    /**
     * 普通点炮胡
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_DIANPAO"] = 2] = "HUPAI_TYPE_DIANPAO";
    /**
     * 抢杠胡
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_QIANGGANG"] = 3] = "HUPAI_TYPE_QIANGGANG";
    /**
     * 自摸杠上花
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_GANGFLOW"] = 4] = "HUPAI_TYPE_GANGFLOW";
    /**
     * 点杠上花胡
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_DIANGANGFLOW"] = 5] = "HUPAI_TYPE_DIANGANGFLOW";
    /**
     * 点杠上炮
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_DIANGANGPAO"] = 6] = "HUPAI_TYPE_DIANGANGPAO";
    /**
     * 查叫
     */
    MJ_HuPai[MJ_HuPai["HUPAI_TYPE_CHAJIAO"] = 7] = "HUPAI_TYPE_CHAJIAO";
})(MJ_HuPai = exports.MJ_HuPai || (exports.MJ_HuPai = {}));
/**
 * 游戏状态 枚举
 * @export
 * @enum {number}
 *     空闲等待状态  = 0;游戏准备状态 = 1;发牌状态 = 2;换牌状态 = 3;定缺状态 = 4;
 * 摸牌状态 = 5;出牌状态 = 6;杠碰吃胡牌表态状态 = 7;单局结算状态 = 8;总结算状态 = 9;
 */
var MJ_GameState;
(function (MJ_GameState) {
    /**
     * 空闲等待状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_IDLE"] = 0] = "STATE_TABLE_IDLE";
    /**
     * 游戏准备状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_READY"] = 1] = "STATE_TABLE_READY";
    /**
     * 发牌状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_FAPAI"] = 2] = "STATE_TABLE_FAPAI";
    /**
     * 换牌状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_SWAPCARD"] = 3] = "STATE_TABLE_SWAPCARD";
    /**
     * 定缺状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_DINGQUE"] = 4] = "STATE_TABLE_DINGQUE";
    /**
     * 摸牌状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_ZHUAPAI"] = 5] = "STATE_TABLE_ZHUAPAI";
    /**
     * 出牌状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_OUTCARD"] = 6] = "STATE_TABLE_OUTCARD";
    /**
     * 杠碰吃胡牌表态状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_BREAKCARD"] = 7] = "STATE_TABLE_BREAKCARD";
    /**
     * 单局结算状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_OVER_ONCE"] = 8] = "STATE_TABLE_OVER_ONCE";
    /**
     * 总结算状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_OVER_ALL"] = 9] = "STATE_TABLE_OVER_ALL";
    /**
     * 桌子解散状态
     */
    MJ_GameState[MJ_GameState["STATE_TABLE_DESTORY"] = 10] = "STATE_TABLE_DESTORY";
})(MJ_GameState = exports.MJ_GameState || (exports.MJ_GameState = {}));
/**
 * 返回该玩家表态剩余时间(秒)
 *
 * @export
 * @param {any} sTime 开始时间(毫秒)
 * @param {any} eTime 结束时间(毫秒)
 * @returns
 */
function getDiffTime(sTime, eTime) {
    var s = Number(sTime);
    var e = Number(eTime);
    var diff = Math.floor((e - s) / 1000);
    if (diff < 0)
        diff = 0;
    return diff;
}
exports.getDiffTime = getDiffTime;
/**
 * 根据牌唯一id获取牌数据
 *
 * @export
 * @param {number} cardId
 * @returns {CardAttrib}
 */
function getCardById(cardId) {
    var card = {
        cardId: cardId,
        suit: Math.floor((cardId - 1) / 36) + 1,
        point: Math.floor(((cardId - 1) % 36) / 4) + 1,
    };
    return card;
}
exports.getCardById = getCardById;
/**
 * 根据牌唯一Id列表获取排序后的列表
 *
 * @export
 * @returns {number[]}
 */
function getSortCardByCardIds(cardIds, unsuit) {
    if (unsuit === void 0) { unsuit = MJ_Suit.SUIT_TYPE_NAN; }
    if (!cardIds)
        return [];
    if (!(cardIds instanceof Array))
        return [];
    var wanArray = [];
    var tongArray = [];
    var tiaoArray = [];
    cardIds.forEach(function (cardId) {
        if (cardId > 0 && cardId <= 36) {
            wanArray.push(cardId);
        }
        else if (cardId > 36 && cardId <= 72) {
            tongArray.push(cardId);
        }
        else if (cardId > 72 && cardId <= 108) {
            tiaoArray.push(cardId);
        }
        else {
            cc.log('牌唯一Id错误');
        }
    });
    wanArray.sort(function (a, b) {
        return b - a;
    });
    tongArray.sort(function (a, b) {
        return b - a;
    });
    tiaoArray.sort(function (a, b) {
        return b - a;
    });
    var array = sortCardByUnSuit(wanArray, tongArray, tiaoArray, unsuit);
    return array[0].concat(array[1], array[2]);
}
exports.getSortCardByCardIds = getSortCardByCardIds;
/**
 * 根据定缺排序
 *
 * @export
 * @param {number[]} wanArray 万
 * @param {number[]} tongArray 筒
 * @param {number[]} tiaoArray 条
 * @param {MJ_Suit} [unsuit=MJ_Suit.SUIT_TYPE_NAN]
 */
function sortCardByUnSuit(wanArray, tongArray, tiaoArray, unsuit) {
    if (unsuit === void 0) { unsuit = MJ_Suit.SUIT_TYPE_NAN; }
    var array = [];
    switch (unsuit) {
        case MJ_Suit.SUIT_TYPE_NAN:
            array = [tiaoArray, tongArray, wanArray];
            break;
        case MJ_Suit.SUIT_TYPE_WAN:
            array = [wanArray, tiaoArray, tongArray];
            break;
        case MJ_Suit.SUIT_TYPE_TONG:
            array = [tongArray, tiaoArray, wanArray];
            break;
        case MJ_Suit.SUIT_TYPE_TIAO:
            array = [tiaoArray, tongArray, wanArray];
            break;
        default:
            break;
    }
    return array;
}
exports.sortCardByUnSuit = sortCardByUnSuit;
/**
 * 获取定缺的花色
 *
 * @export
 * @param {number} [type=0] 0=最少的花色 1=最多的花色
 * @param {number[]} cardIds 牌id列表
 */
function getDingQueSuit(cardIds, type) {
    if (type === void 0) { type = 0; }
    if (!cardIds)
        -1;
    if (!(cardIds instanceof Array))
        -1;
    var wanArray = [];
    var tongArray = [];
    var tiaoArray = [];
    cardIds.forEach(function (cardId) {
        if (cardId > 0 && cardId <= 36) {
            wanArray.push(cardId);
        }
        else if (cardId > 36 && cardId <= 72) {
            tongArray.push(cardId);
        }
        else if (cardId > 72 && cardId <= 108) {
            tiaoArray.push(cardId);
        }
        else {
            cc.log('牌唯一Id错误');
        }
    });
    if (wanArray.length === 0) {
        return 0;
    }
    if (tongArray.length === 0) {
        return 1;
    }
    if (tiaoArray.length === 0) {
        return 2;
    }
    //排序
    var array = [tiaoArray, tongArray, wanArray];
    array.sort(function (a, b) {
        if (type === 0) {
            return a.length - b.length;
        }
        else {
            return b.length - a.length;
        }
    });
    //取出第一个牌，获取目标类型
    var tCardId = array[0][0];
    if (tCardId > 0 && tCardId <= 36) {
        return 0;
    }
    else if (tCardId > 36 && tCardId <= 72) {
        return 1;
    }
    else if (tCardId > 72 && tCardId <= 108) {
        return 2;
    }
    else {
        cc.log('牌唯一Id错误');
        return -1;
    }
}
exports.getDingQueSuit = getDingQueSuit;
function deepCopy(obj) {
    if (obj instanceof Object || obj instanceof Array) {
        return JSON.parse(JSON.stringify(obj));
    }
    else {
        return obj;
    }
}
;
/**
 * 根据数组切割手牌
 * @export
 * @param {any} cardIdList 牌列表
 * @returns
 */
function getSplitList(cardIdList) {
    var scData = {
        gangList: [],
        pengList: [],
        duiList: []
    };
    if (!cardIdList)
        return scData;
    if (!(cardIdList instanceof Array))
        return scData;
    var list = deepCopy(cardIdList);
    list.sort(function (a, b) {
        return a - b;
    });
    for (var i = 0; i < list.length; i++) {
        //第一张和第二张的的唯一Id相邻
        if (list[i + 1]) {
            var card1 = getCardById(list[i]);
            var card2 = getCardById(list[i + 1]);
            //如果第一张和第二张的(花色和点数都相同)
            if (card1.suit === card2.suit && card1.point === card2.point) {
                //第二张和第三张的唯一Id相邻
                if (list[i + 2]) {
                    var card3 = getCardById(list[i + 2]);
                    //如果第二张和第三张的(花色和点数都相同)
                    if (card2.suit === card3.suit && card3.point === card2.point) {
                        //第四张和第三张的唯一Id相邻
                        if (list[i + 3] && list[i + 2] + 1 === list[i + 3]) {
                            var card4 = getCardById(list[i + 3]);
                            //如果第四张和第三张的(花色和点数都相同)
                            if (card3.suit === card4.suit && card3.point === card4.point) {
                                //四张点数相同
                                scData.gangList.unshift(list[i]);
                                i = i + 3;
                            }
                            else {
                                //三张点数相同
                                scData.pengList.unshift(list[i]);
                                i = i + 2;
                            }
                        }
                        else {
                            //三张点数相同
                            scData.pengList.unshift(list[i]);
                            i = i + 2;
                        }
                    }
                    else {
                        //两张点数相同
                        scData.duiList.unshift(list[i]);
                        i = i + 1;
                    }
                }
                else {
                    //两张点数相同
                    scData.duiList.unshift(list[i]);
                    i = i + 1;
                }
            }
        }
        else {
            //单牌
        }
    }
    return scData;
}
exports.getSplitList = getSplitList;
/**
 * 对座位列表进行排序,让自己的座位始终在最下方
 *
 * @param {any} seatList
 * @returns
 */
function sortSeatList(seats) {
    if (!GMManager_1.default.getInstance().mjGameData)
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
 * 根据cardIds1中的cardId查找cardIds2中是否存在
 *
 * @export
 * @param {number[]} cardIds1 碰牌
 * @param {number[]} cardIds2 手牌
 */
function getCardIdsByCardId(cardIds1, cardIds2) {
    var list = [];
    for (var i = 0; i < cardIds1.length; i++) {
        var card1 = getCardById(cardIds1[i]);
        for (var j = 0; j < cardIds2.length; j++) {
            var card2 = getCardById(cardIds2[j]);
            if (card1.suit === card2.suit && card1.point === card2.point) {
                list.push(cardIds2[j]);
                break;
            }
        }
    }
    return list;
}
exports.getCardIdsByCardId = getCardIdsByCardId;
/**
 * 根据玩家accountId获取座位号
 *
 * @param {string} accountId
 * @returns {SeatVo}
 */
function getSeatById(accountId) {
    if (!GMManager_1.default.getInstance().mjGameData || !GMManager_1.default.getInstance().mjGameData.seats)
        return null;
    for (var i = 0; i < GMManager_1.default.getInstance().mjGameData.seats.length; i++) {
        var seatInfo = GMManager_1.default.getInstance().mjGameData.seats[i];
        if (seatInfo.accountId === accountId) {
            return seatInfo;
        }
    }
    return null;
}
exports.getSeatById = getSeatById;
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
    if (GMManager_1.default.getInstance().mjGameData && GMManager_1.default.getInstance().mjGameData.seats) {
        var seats = GMManager_1.default.getInstance().mjGameData.seats;
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
/**
 * 获取是否是死觉
 *
 * @export
 * @param {CardAttrib} card
 */
function getDieTing(card) {
    var tempList = [];
    if (GMManager_1.default.getInstance().mjGameData && GMManager_1.default.getInstance().mjGameData.seats) {
        var seats = GMManager_1.default.getInstance().mjGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            var seat = seats[i];
            if (seat.outCard) {
                tempList = tempList.concat(seat.outCard);
            }
            if (seat.accountId === UDManager_1.default.getInstance().mineData.accountId) {
                if (seat.handCards) {
                    tempList = tempList.concat(seat.handCards);
                }
                if (seat.moPaiCard) {
                    tempList.push(seat.moPaiCard);
                }
            }
        }
    }
    var num = 0;
    for (var i = 0; i < tempList.length; i++) {
        var tempCard = getCardById(tempList[i]);
        if (card.suit === tempCard.suit && card.point === tempCard.point) {
            num++;
        }
    }
    if (num >= 4) {
        return true;
    }
    else {
        return false;
    }
}
exports.getDieTing = getDieTing;

cc._RF.pop();