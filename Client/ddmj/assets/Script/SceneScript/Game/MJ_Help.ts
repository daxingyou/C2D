import GMManager from '../../Modules/GMManager';
import UDManager from '../../Modules/UDManager';

/**
 * 麻将枚举
 * 
 * @export
 * @enum {number} 无 = 0 万 = 1 筒 = 2 条 = 3
 */
export enum MJ_Suit {
    /**
     * 无
     */
    SUIT_TYPE_NAN = 0,
    /**
     * 万
     */
    SUIT_TYPE_WAN = 1,
    /**
     *筒 
     */
    SUIT_TYPE_TONG = 2,
    /**
     * 条
     */
    SUIT_TYPE_TIAO = 3,
}
/**
 * 胡杠碰吃过等动作表态 枚举
 * 
 * @export
 * @enum {number} 不要= -1 等待表态 = 0  已表态 = 1
 */
export enum MJ_Act_State {
    //不要
    ACT_STATE_DROP = -1,
    //等待表态
    ACT_STATE_WAIT = 0,
    //已表态
    ACT_STATE_BT = 1,
}

/**
 * 胡杠碰吃过动作类型 枚举
 * 
 * @export
 * @enum {number} 胡 = 0 杠= 1 碰 = 2 吃=3 过=4
 */
export enum MJ_Act_Type {
    //胡
    ACT_INDEX_HU = 0,
    //杠
    ACT_INDEX_GANG = 1,
    //碰
    ACT_INDEX_PENG = 2,
    //吃
    ACT_INDEX_CHI = 3,
    //过
    ACT_INDEX_DROP = 4,
}

/**
 * 胡牌动作 枚举
 * 
 * @export
 * @enum {number} 
 *   未胡牌 = 0, 自摸胡 = 1, 普通点炮胡 = 2, 抢杠胡 = 3, 
 * 自摸杠上花 = 4, 点杠上花胡 = 5, 点杠上炮 = 6, 查叫 = 7,
 */
export enum MJ_HuPai {
    /**
     * 未胡牌
     */
    HUPAI_TYPE_NONE = 0,
    /**
     * 自摸胡
     */
    HUPAI_TYPE_ZIMO = 1,
    /**
     * 普通点炮胡
     */
    HUPAI_TYPE_DIANPAO = 2,
    /**
     * 抢杠胡
     */
    HUPAI_TYPE_QIANGGANG = 3,
    /**
     * 自摸杠上花
     */
    HUPAI_TYPE_GANGFLOW = 4,
    /**
     * 点杠上花胡
     */
    HUPAI_TYPE_DIANGANGFLOW = 5,
    /**
     * 点杠上炮
     */
    HUPAI_TYPE_DIANGANGPAO = 6,
    /**
     * 查叫
     */
    HUPAI_TYPE_CHAJIAO = 7,
}

/**
 * 游戏状态 枚举
 * @export
 * @enum {number} 
 *     空闲等待状态  = 0;游戏准备状态 = 1;发牌状态 = 2;换牌状态 = 3;定缺状态 = 4;
 * 摸牌状态 = 5;出牌状态 = 6;杠碰吃胡牌表态状态 = 7;单局结算状态 = 8;总结算状态 = 9;
 */
export enum MJ_GameState {
	/**
     * 空闲等待状态
     */
    STATE_TABLE_IDLE = 0,
	/**
     * 游戏准备状态
     */
    STATE_TABLE_READY = 1,
	/**
     * 发牌状态
     */
    STATE_TABLE_FAPAI = 2,
	/**
     * 换牌状态
     */
    STATE_TABLE_SWAPCARD = 3,
	/**
     * 定缺状态
     */
    STATE_TABLE_DINGQUE = 4,
	/**
     * 摸牌状态
     */
    STATE_TABLE_ZHUAPAI = 5,
	/**
     * 出牌状态
     */
    STATE_TABLE_OUTCARD = 6,
	/**
     * 杠碰吃胡牌表态状态
     */
    STATE_TABLE_BREAKCARD = 7,
	/**
     * 单局结算状态
     */
    STATE_TABLE_OVER_ONCE = 8,
	/**
     * 总结算状态
     */
    STATE_TABLE_OVER_ALL = 9,
	/**
     * 桌子解散状态
     */
    STATE_TABLE_DESTORY = 10,
}

/**
 * 返回该玩家表态剩余时间(秒)
 * 
 * @export
 * @param {any} sTime 开始时间(毫秒)
 * @param {any} eTime 结束时间(毫秒)
 * @returns 
 */
export function getDiffTime(sTime, eTime) {
    let s = Number(sTime);
    let e = Number(eTime);
    let diff = Math.floor((e - s) / 1000);
    if (diff < 0) diff = 0;
    return diff;
}

/**
 * 根据牌唯一id获取牌数据
 * 
 * @export
 * @param {number} cardId 
 * @returns {CardAttrib} 
 */
export function getCardById(cardId: number): CardAttrib {
    let card: CardAttrib = {
        cardId: cardId,
        suit: Math.floor((cardId - 1) / 36) + 1,
        point: Math.floor(((cardId - 1) % 36) / 4) + 1,
    };
    return card;
}

/**
 * 根据牌唯一Id列表获取排序后的列表
 * 
 * @export
 * @returns {number[]} 
 */
export function getSortCardByCardIds(cardIds: number[], unsuit: MJ_Suit = MJ_Suit.SUIT_TYPE_NAN): number[] {
    if (!cardIds) return [];
    if (!(cardIds instanceof Array)) return [];
    let wanArray: number[] = [];
    let tongArray: number[] = [];
    let tiaoArray: number[] = [];
    cardIds.forEach((cardId: number) => {
        if (cardId > 0 && cardId <= 36) {
            wanArray.push(cardId);
        } else if (cardId > 36 && cardId <= 72) {
            tongArray.push(cardId);
        } else if (cardId > 72 && cardId <= 108) {
            tiaoArray.push(cardId);
        } else {
            cc.log('牌唯一Id错误');
        }
    });
    wanArray.sort((a, b) => {
        return b - a;
    });
    tongArray.sort((a, b) => {
        return b - a;
    });
    tiaoArray.sort((a, b) => {
        return b - a;
    });
    let array = sortCardByUnSuit(wanArray, tongArray, tiaoArray, unsuit);
    return [...array[0], ...array[1], ...array[2]];
}

/**
 * 根据定缺排序
 * 
 * @export
 * @param {number[]} wanArray 万
 * @param {number[]} tongArray 筒
 * @param {number[]} tiaoArray 条
 * @param {MJ_Suit} [unsuit=MJ_Suit.SUIT_TYPE_NAN] 
 */
export function sortCardByUnSuit(wanArray: number[], tongArray: number[], tiaoArray: number[], unsuit: MJ_Suit = MJ_Suit.SUIT_TYPE_NAN) {
    let array = [];
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

/**
 * 获取定缺的花色
 * 
 * @export
 * @param {number} [type=0] 0=最少的花色 1=最多的花色
 * @param {number[]} cardIds 牌id列表
 */
export function getDingQueSuit(cardIds: number[], type: number = 0): number {
    if (!cardIds) -1;
    if (!(cardIds instanceof Array)) -1;
    let wanArray: number[] = [];
    let tongArray: number[] = [];
    let tiaoArray: number[] = [];
    cardIds.forEach((cardId: number) => {
        if (cardId > 0 && cardId <= 36) {
            wanArray.push(cardId);
        } else if (cardId > 36 && cardId <= 72) {
            tongArray.push(cardId);
        } else if (cardId > 72 && cardId <= 108) {
            tiaoArray.push(cardId);
        } else {
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
    let array = [tiaoArray, tongArray, wanArray];
    array.sort((a, b) => {
        if (type === 0) {
            return a.length - b.length;
        } else {
            return b.length - a.length;
        }
    });
    //取出第一个牌，获取目标类型
    let tCardId = array[0][0];
    if (tCardId > 0 && tCardId <= 36) {
        return 0;
    } else if (tCardId > 36 && tCardId <= 72) {
        return 1;
    } else if (tCardId > 72 && tCardId <= 108) {
        return 2;
    } else {
        cc.log('牌唯一Id错误');
        return -1;
    }
}

function deepCopy(obj) {//深度拷贝对象，通过Json转换的过程来实现
    if (obj instanceof Object || obj instanceof Array) {
        return JSON.parse(JSON.stringify(obj));
    } else {
        return obj;
    }
};

/**
 * 根据数组切割手牌
 * @export
 * @param {any} cardIdList 牌列表
 * @returns 
 */
export function getSplitList(cardIdList: number[]): SortCardData {
    let scData: SortCardData = {
        gangList: [],
        pengList: [],
        duiList: []
    };
    if (!cardIdList) return scData;
    if (!(cardIdList instanceof Array)) return scData;

    let list: number[] = deepCopy(cardIdList);
    list.sort((a, b) => {
        return a - b;
    });
    for (var i = 0; i < list.length; i++) {
        //第一张和第二张的的唯一Id相邻
        if (list[i + 1]) {
            let card1: CardAttrib = getCardById(list[i]);
            let card2: CardAttrib = getCardById(list[i + 1]);
            //如果第一张和第二张的(花色和点数都相同)
            if (card1.suit === card2.suit && card1.point === card2.point) {
                //第二张和第三张的唯一Id相邻
                if (list[i + 2]) {
                    let card3: CardAttrib = getCardById(list[i + 2]);
                    //如果第二张和第三张的(花色和点数都相同)
                    if (card2.suit === card3.suit && card3.point === card2.point) {
                        //第四张和第三张的唯一Id相邻
                        if (list[i + 3] && list[i + 2] + 1 === list[i + 3]) {
                            let card4: CardAttrib = getCardById(list[i + 3]);
                            //如果第四张和第三张的(花色和点数都相同)
                            if (card3.suit === card4.suit && card3.point === card4.point) {
                                //四张点数相同
                                scData.gangList.unshift(list[i]);
                                i = i + 3;
                            } else {
                                //三张点数相同
                                scData.pengList.unshift(list[i]);
                                i = i + 2;
                            }
                        } else {
                            //三张点数相同
                            scData.pengList.unshift(list[i]);
                            i = i + 2;
                        }
                    } else {
                        //两张点数相同
                        scData.duiList.unshift(list[i]);
                        i = i + 1;
                    }
                } else {
                    //两张点数相同
                    scData.duiList.unshift(list[i]);
                    i = i + 1;
                }
            }
        } else {
            //单牌
        }
    }
    return scData;
}


/**
 * 对座位列表进行排序,让自己的座位始终在最下方
 * 
 * @param {any} seatList 
 * @returns 
 */
export function sortSeatList(seats) {
    if (!GMManager.getInstance().mjGameData) return null;
    let mySeat: SeatVo = getSeatById(UDManager.getInstance().mineData.accountId);
    if (mySeat) {
        let tempList: SeatVo[] = [];
        for (var i = 0; i < seats.length; i++) {
            let seatInfo: SeatVo = seats[i];
            if (seatInfo) {
                let index = 0;
                if (mySeat.seatIndex > seatInfo.seatIndex) {
                    index = seats.length - (mySeat.seatIndex - seatInfo.seatIndex);
                } else {
                    index = Math.abs(mySeat.seatIndex - seatInfo.seatIndex);
                }
                tempList[index] = seatInfo;
            }
        }
        return tempList;
    }
    return null;
};

/**
 * 根据cardIds1中的cardId查找cardIds2中是否存在
 * 
 * @export
 * @param {number[]} cardIds1 碰牌
 * @param {number[]} cardIds2 手牌
 */
export function getCardIdsByCardId(cardIds1: number[], cardIds2: number[]): number[] {
    let list = [];
    for (var i = 0; i < cardIds1.length; i++) {
        let card1 = getCardById(cardIds1[i]);
        for (var j = 0; j < cardIds2.length; j++) {
            let card2 = getCardById(cardIds2[j]);
            if (card1.suit === card2.suit && card1.point === card2.point) {
                list.push(cardIds2[j]);
                break;
            }
        }
    }
    return list;
}

/**
 * 根据玩家accountId获取座位号
 * 
 * @param {string} accountId 
 * @returns {SeatVo} 
 */
export function getSeatById(accountId: string): SeatVo {
    if (!GMManager.getInstance().mjGameData || !GMManager.getInstance().mjGameData.seats) return null;
    for (var i = 0; i < GMManager.getInstance().mjGameData.seats.length; i++) {
        let seatInfo: SeatVo = GMManager.getInstance().mjGameData.seats[i];
        if (seatInfo.accountId === accountId) {
            return seatInfo;
        }
    }
    return null;
}

/**
 * 根据座位id获取位置索引 
 * 
 * @export
 * @param {number} seatId   seatId位-1的时候，根据accountId返回
 * @param {string} [accountId=''] 
 * @returns 
 */
export function getIndexBySeatId(seatId: number, accountId: string = ''): number {
    if (GMManager.getInstance().mjGameData && GMManager.getInstance().mjGameData.seats) {
        let seats = GMManager.getInstance().mjGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            let seat: SeatVo = seats[i];
            if (seatId === -1) {
                if (seat.accountId !== '0' && seat.accountId === accountId) {
                    return i;
                }
            } else {
                if (seat.seatIndex === seatId) {
                    return i;
                }
            }
        }
    }
    return -1;
}

/**
 * 获取是否是死觉
 * 
 * @export
 * @param {CardAttrib} card 
 */
export function getDieTing(card: CardAttrib) {
    let tempList = [];
    if (GMManager.getInstance().mjGameData && GMManager.getInstance().mjGameData.seats) {
        let seats = GMManager.getInstance().mjGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            let seat = seats[i];
            if (seat.outCard) {
                tempList = tempList.concat(seat.outCard);
            }
            if (seat.accountId === UDManager.getInstance().mineData.accountId) {
                if (seat.handCards) {
                    tempList = tempList.concat(seat.handCards);
                }
                if (seat.moPaiCard) {
                    tempList.push(seat.moPaiCard);
                }
            }
        }
    }
    let num = 0;
    for (var i = 0; i < tempList.length; i++) {
        let tempCard = getCardById(tempList[i]);
        if (card.suit === tempCard.suit && card.point === tempCard.point) {
            num++;
        }
    }

    if (num >= 4) {
        return true;
    } else {
        return false;
    }
}