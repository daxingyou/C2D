"use strict";
cc._RF.push(module, 'dd7c2KANLZA3p3QfIDFntZv', 'MJ_Game');
// Script/SceneScript/Game/MJ_Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_Game = /** @class */ (function (_super) {
    __extends(MJ_Game, _super);
    function MJ_Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 表态时间
         *
         * @type {cc.Label}
         * @memberof MJ_Game
         */
        _this.lblTime = null;
        /**
         * 游戏数据
         *
         * @type {cc.RichText}
         * @memberof MJ_Game
         */
        _this.lblGameInfo = null;
        /**
         * 轮到该谁表态的节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Game
         */
        _this.node_state_list = [];
        /**
         * 玩家打牌的节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Game
         */
        _this.node_player_list = [];
        /**
         * 杠、碰的父节点容器
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_group_list = [];
        /**
         * 打出的牌的父节点容器
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_playOut_list = [];
        /**
         * 动作、文字显示的父节点
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_act_list = [];
        /**
         * 胡牌的节点(牌的父节点)
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_hu_list = [];
        /**
         * 胡牌文字图片的父节点容器
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_img_hu_list = [];
        /**
         *
         * 当前时间
         * @type {string}
         * @memberof MJ_Table
         */
        _this._nowTime = 0;
        /**
         * 刷新时间
         *
         * @type {number}
         * @memberof MJ_Table
         */
        _this._cdTime = 0;
        /**
         * canvas脚本
         *
         * @type {MJCanvas}
         * @memberof MJ_Play
         */
        _this._canvasTarget = null;
        return _this;
    }
    MJ_Game.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
    };
    /**
     * 初始化界面
     *
     * @memberof MJ_Play
     */
    MJ_Game.prototype.initData = function () {
        for (var i = 0; i < this.node_img_hu_list.length; i++) {
            this.node_img_hu_list[i].active = false;
        }
        for (var i = 0; i < this.node_group_list.length; i++) {
            this.node_group_list[i].removeAllChildren();
        }
        for (var i = 0; i < this.node_act_list.length; i++) {
            this.node_act_list[i].removeAllChildren();
        }
        for (var i = 0; i < this.node_playOut_list.length; i++) {
            this.node_playOut_list[i].removeAllChildren();
        }
        for (var i = 0; i < this.node_hu_list.length; i++) {
            this.node_hu_list[i].removeAllChildren();
        }
    };
    /**
 * 显示游戏桌子信息
 *
 * @memberof MJ_Game
 */
    MJ_Game.prototype.showTableState = function () {
        this._nowTime = MJ_Help.getDiffTime(dd.gm_manager.mjGameData.tableBaseVo.svrTime, dd.gm_manager.mjGameData.tableBaseVo.actTime);
        this.lblTime.string = this._nowTime + '';
        this.lblGameInfo.string = '<color=#4ecab1>剩余 </c><color=#ffc600>' + dd.gm_manager.mjGameData.tableBaseVo.tableCardNum
            + '</c><color=#4ecab1> 张</c><color=#4ecab1>   第 </c><color=#ffc600>'
            + dd.gm_manager.mjGameData.tableBaseVo.currGameNum + '/' + dd.gm_manager.mjGameData.tableBaseVo.maxGameNum + '</c><color=#4ecab1> 局</c>';
        var pIndex = MJ_Help.getIndexBySeatId(dd.gm_manager.mjGameData.tableBaseVo.btIndex);
        for (var i = 0; i < this.node_state_list.length; i++) {
            if (pIndex === i) {
                this.node_state_list[i].active = true;
            }
            else {
                this.node_state_list[i].active = false;
            }
        }
    };
    MJ_Game.prototype.update = function (dt) {
        if (dd.gm_manager && !dd.gm_manager.isReplayPause) {
            if (this._nowTime > 0) {
                this._cdTime -= dt;
                if (this._cdTime < 0) {
                    this._cdTime = 1;
                    this._nowTime--;
                    this.lblTime.string = this._nowTime + '';
                    //如果小于3s，每一秒都要振动一下
                    if (this._nowTime <= 2) {
                        this.showPhoneVibration();
                    }
                }
            }
        }
    };
    /**
     * 显示手机振动
     *
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showPhoneVibration = function () {
        if (MJ_Help.MJ_GameState.STATE_TABLE_OVER_ALL !== dd.gm_manager.mjGameData.tableBaseVo.gameState
            && MJ_Help.MJ_GameState.STATE_TABLE_OVER_ONCE !== dd.gm_manager.mjGameData.tableBaseVo.gameState
            && MJ_Help.MJ_GameState.STATE_TABLE_DESTORY !== dd.gm_manager.mjGameData.tableBaseVo.gameState
            && MJ_Help.MJ_GameState.STATE_TABLE_READY !== dd.gm_manager.mjGameData.tableBaseVo.gameState) {
            var mySeatInfo = MJ_Help.getSeatById(dd.ud_manager.mineData.accountId);
            if (mySeatInfo) {
                //如果为胡碰杠阶段，就判断是否是自己胡碰杠的表态
                if (MJ_Help.MJ_GameState.STATE_TABLE_FAPAI === dd.gm_manager.mjGameData.tableBaseVo.gameState) {
                    dd.js_call_native.phoneVibration();
                }
                else if (MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD === dd.gm_manager.mjGameData.tableBaseVo.gameState) {
                    var isBreakCS = false;
                    for (var i = 0; i < mySeatInfo.breakCardState.length; i++) {
                        if (mySeatInfo.breakCardState[i] === 1) {
                            isBreakCS = true;
                            break;
                        }
                    }
                    if (isBreakCS) {
                        dd.js_call_native.phoneVibration();
                    }
                }
                else {
                    //如果不为胡碰杠阶段，就判断是否是自己打牌表态
                    if (mySeatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                        dd.js_call_native.phoneVibration();
                    }
                }
            }
        }
    };
    /**
     * 显示游戏信息
     *
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showGameInfo = function () {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        //如果在准备阶段，就初始化数据
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState <= MJ_Help.MJ_GameState.STATE_TABLE_READY) {
            this.initData();
        }
        this.showTableState();
        this.showPlayCard();
    };
    /**
     * 显示打牌信息
     *
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showPlayCard = function () {
        for (var i = 0; i < this.node_player_list.length; i++) {
            var seatInfo = dd.gm_manager.mjGameData.seats[i];
            if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                if (i === 0) {
                    var mjMine = this.node_player_list[i].getComponent('MJ_Game_Mine');
                    mjMine.updatePlay(i, seatInfo);
                }
                else {
                    var mjOthers = this.node_player_list[i].getComponent('MJ_Game_Others');
                    mjOthers.updatePlay(i, seatInfo);
                }
                this.showGroupCard(i, seatInfo);
                this.showSeatPlayOutCard(i, seatInfo);
                this.showPlayOutAct(i, seatInfo);
                this.showHuPai(i, seatInfo);
            }
        }
    };
    /**
     * 显示桌子上已经打出的牌中，是否有选中的这张牌
     *
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showTableSelectCard = function (cardId) {
        var card = MJ_Help.getCardById(cardId);
        var node_out_list = [];
        for (var sId = 0; sId < this.node_playOut_list.length; sId++) {
            var node_playOut = this.node_playOut_list[sId];
            if (node_playOut) {
                node_out_list = node_out_list.concat(node_playOut.children);
            }
        }
        for (var i = 0; i < node_out_list.length; i++) {
            var outCard = node_out_list[i];
            var oCard = MJ_Help.getCardById(outCard.tag);
            var ocs = outCard.getComponent('MJ_Card');
            if (oCard.suit === card.suit && oCard.point === card.point) {
                ocs.showLight(true);
            }
            else {
                ocs.showLight(false);
            }
        }
    };
    /**
     * 显示每个玩家的碰 、 杠牌
     * @param {number} sId 座位索引
     * @param {SeatVo} seatInfo 座位信息
     * @memberof MJ_Play
     */
    MJ_Game.prototype.showGroupCard = function (sId, seatInfo) {
        var node_group = this.node_group_list[sId];
        if (node_group) {
            if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                //显示碰杠牌
                node_group.removeAllChildren();
                if (seatInfo.pengCards) {
                    for (var i = 0; i < seatInfo.pengCards.length; i++) {
                        this._canvasTarget.showGroupCard(0, seatInfo.pengCards[i], sId, node_group);
                    }
                }
                if (seatInfo.baGangCards) {
                    for (var i = 0; i < seatInfo.baGangCards.length; i++) {
                        this._canvasTarget.showGroupCard(1, seatInfo.baGangCards[i], sId, node_group);
                    }
                }
                if (seatInfo.anGangCards) {
                    for (var i = 0; i < seatInfo.anGangCards.length; i++) {
                        this._canvasTarget.showGroupCard(2, seatInfo.anGangCards[i], sId, node_group);
                    }
                }
            }
        }
    };
    /**
     * 创建打出的牌
     * @param {number} index
     * @param {cc.Node} node_playOut
     * @param {number} sId
     * @param {SeatVo} seatInfo
     * @memberof MJ_Game
     */
    MJ_Game.prototype.createOutCard = function (index, node_playOut, sId, seatInfo) {
        this._canvasTarget.showPlayOutCard(sId, seatInfo.outUnUseCards[index], node_playOut, function (cardNode) {
            if (sId === 0) {
                var px = index % 10 * cardNode.width + cardNode.width / 2;
                var py = Math.floor(index / 10) * (cardNode.height - 10) + cardNode.height / 2;
                cardNode.setPosition(cc.p(px, py));
                cardNode.zIndex = 99 - index;
            }
            else if (sId === 1) {
                var px = -Math.floor(index / 10) * cardNode.width - cardNode.width / 2;
                var py = index % 10 * (cardNode.height - 12) + cardNode.height / 2;
                cardNode.setPosition(cc.p(px, py));
                cardNode.zIndex = 99 - index;
            }
            else { }
            //如果刚刚是这个玩家表态，最后一张牌亮(显示刚刚打出的牌亮起来)
            if (seatInfo.outCard && index === seatInfo.outUnUseCards.length - 1
                && seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.prevBtIndex) {
                var ocs = cardNode.getComponent('MJ_Card');
                switch (sId) {
                    case 0:
                        ocs.showBS(true, 1, -1);
                        break;
                    case 1:
                        ocs.showBS(true);
                        break;
                    case 2:
                        ocs.showBS(true, -1, 1);
                        break;
                    case 3:
                        ocs.showBS(true);
                        break;
                    default:
                        break;
                }
            }
        });
    };
    /**
    * 显示打出的牌
    * @param {number} sId 座位索引
    * @param {SeatVo} seatInfo 座位信息
    * @memberof MJ_Play
   */
    MJ_Game.prototype.showSeatPlayOutCard = function (sId, seatInfo) {
        var node_playOut = this.node_playOut_list[sId];
        if (node_playOut) {
            if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                node_playOut.removeAllChildren();
                if (seatInfo.outUnUseCards) {
                    //刷新打出的牌数据
                    for (var i = 0; i < seatInfo.outUnUseCards.length; i++) {
                        this.createOutCard(i, node_playOut, sId, seatInfo);
                    }
                }
            }
        }
    };
    /**
     * 显示刚刚打出的牌的动作
     * @param {number} sId 座位索引
     * @param {SeatVo} seatInfo 座位信息
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showPlayOutAct = function (sId, seatInfo) {
        var node_act = this.node_act_list[sId];
        if (node_act) {
            if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                //轮到这个玩家在（出牌阶段）的（表态）时候，并且 这个玩家（已经表态）以及 存在(刚刚打出的牌)
                if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD) {
                    if (seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex
                        && seatInfo.btState === MJ_Help.MJ_Act_State.ACT_STATE_BT
                        && seatInfo.outCard) {
                        this._canvasTarget.showOutActMJ(seatInfo.outCard, node_act, seatInfo);
                        dd.mp_manager.playOut();
                    }
                }
            }
        }
    };
    /**
     * 显示胡牌
     * @param {number} sId 座位索引
     * @param {SeatVo} seatInfo 座位信息
     * @memberof MJ_Play
     */
    MJ_Game.prototype.showHuPai = function (sId, seatInfo) {
        var node_hu = this.node_hu_list[sId];
        var node_img_hu = this.node_img_hu_list[sId];
        if (node_hu) {
            node_hu.removeAllChildren();
            //如果玩家不在（未胡牌）的状态，表示胡牌了，并且 （胡牌）存在
            if (seatInfo.huPaiType !== 0 && seatInfo.huCards) {
                for (var i = 0; i < seatInfo.huCards.length; i++) {
                    this._canvasTarget.showPlayOutCard(sId, seatInfo.huCards[i], node_hu, function (cardNode) {
                        var cs = cardNode.getComponent('MJ_Card');
                        cs.showLight(true);
                    });
                }
                if (node_img_hu) {
                    //显示文字图片
                    node_img_hu.active = true;
                    node_img_hu.getComponent(cc.Sprite).spriteFrame = seatInfo.huPaiType === 1 ? this._canvasTarget.mj_text_list[0] : this._canvasTarget.mj_text_list[1];
                }
            }
            else {
                //不显示文字图片
                node_img_hu.active = false;
            }
        }
    };
    /**
     * 显示 胡杠碰状态的表态结果
     *
     * @memberof MJ_Game
     */
    MJ_Game.prototype.showBreakStates = function () {
        if (dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.breakSeats) {
            var breakSeats = dd.gm_manager.mjGameData.breakSeats;
            var playIndex = 0;
            //胡杠碰吃打断处理结果状态 breakState (0=胡,1=杠,2=碰,3=吃,4=过)
            for (var i = 0; i < breakSeats.length; i++) {
                //获取座位的索引
                var sId = MJ_Help.getIndexBySeatId(breakSeats[i]);
                if (sId !== -1 && this.node_player_list[sId]) {
                    //根据索引，获取座位信息
                    var seatInfo = dd.gm_manager.mjGameData.seats[sId];
                    if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                        this.showBreakStateAct(dd.gm_manager.mjGameData.breakState, sId, seatInfo, playIndex);
                        playIndex++;
                    }
                }
            }
        }
    };
    /**
     * 显示胡杠碰吃过 状态的动作
     * @param {MJ_Help.MJ_Act_Type} breakState  (0=胡,1=杠,2=碰,3=吃,4=过)
     * @param {number} sId 座位索引
     * @param {SeatVo} seatInfo 座位信息
     * @param {number} playIndex 播放索引，只有等于0 的时候才播放音效，因为在循环中，多次调用回造成 1在播放-释放的时候 2调用播放，但是被1释放了，崩溃
     * @memberof MJ_Play
     */
    MJ_Game.prototype.showBreakStateAct = function (breakState, sId, seatInfo, playIndex) {
        var node_act = this.node_act_list[sId];
        if (node_act) {
            var sf = null;
            switch (breakState) {
                case MJ_Help.MJ_Act_Type.ACT_INDEX_HU:
                    sf = this.getHuPaiSF(seatInfo);
                    if (playIndex === 0) {
                        if (seatInfo.huPaiType === 1) {
                            dd.mp_manager.playPokerSound(dd.mp_manager.audioSetting.language, 4, seatInfo.sex, 4);
                        }
                        else {
                            dd.mp_manager.playPokerSound(dd.mp_manager.audioSetting.language, 4, seatInfo.sex, 1);
                        }
                    }
                    break;
                case MJ_Help.MJ_Act_Type.ACT_INDEX_GANG:
                    sf = this._canvasTarget.mj_text_list[7];
                    if (playIndex === 0) {
                        dd.mp_manager.playPokerSound(dd.mp_manager.audioSetting.language, 4, seatInfo.sex, 2);
                    }
                    switch (seatInfo.gangType) {
                        case 1://自摸巴杠
                            this._canvasTarget.showGFAct(node_act);
                            break;
                        case 2://暗杠
                            this._canvasTarget.showXYAct(node_act);
                            break;
                        case 3://点杠
                            this._canvasTarget.showXYAct(node_act);
                            break;
                        default:
                            break;
                    }
                    break;
                case MJ_Help.MJ_Act_Type.ACT_INDEX_PENG:
                    sf = this._canvasTarget.mj_text_list[6];
                    if (playIndex === 0) {
                        dd.mp_manager.playPokerSound(dd.mp_manager.audioSetting.language, 4, seatInfo.sex, 3);
                    }
                    break;
                default:
                    break;
            }
            this._canvasTarget.showTxtAct(sf, node_act);
        }
    };
    /**
     * 获取胡牌类型的图片
     *
     * @returns
     * @param {SeatVo} seatInfo 座位信息
     * @memberof MJ_Play
     */
    MJ_Game.prototype.getHuPaiSF = function (seatInfo) {
        //'0=自摸\n 1=胡\n 2=天胡\n 3=地胡\n 4=杠上花\n 5=杠上炮\n 6=碰\n 7=杠\n 8=抢杠\n 9=点炮\n 10=一炮多响\n 11=海底捞月\n 12=呼叫转移\n''13=流局\n 14=游戏结束\n'
        //胡牌方式(0=未胡牌,1=自摸 ,2=点炮,3=抢杠胡,4=自摸杠上花,5=点杠上花胡,6=点杠上炮,7=查叫) 
        var huPaiSF = null;
        if (dd.gm_manager.mjGameData.breakSeats.length > 1) {
            huPaiSF = huPaiSF = this._canvasTarget.mj_text_list[10];
        }
        else {
            switch (seatInfo.huPaiType) {
                case 0:
                    huPaiSF = null;
                    break;
                case 1:
                    huPaiSF = this._canvasTarget.mj_text_list[0];
                    break;
                case 2:
                    huPaiSF = this._canvasTarget.mj_text_list[9];
                    break;
                case 3:
                    huPaiSF = this._canvasTarget.mj_text_list[8];
                    break;
                case 4:
                    huPaiSF = this._canvasTarget.mj_text_list[4];
                    break;
                case 5:
                    huPaiSF = this._canvasTarget.mj_text_list[4];
                    break;
                case 6:
                    huPaiSF = this._canvasTarget.mj_text_list[5];
                    break;
                default:
                    break;
            }
        }
        return huPaiSF;
    };
    __decorate([
        property(cc.Label)
    ], MJ_Game.prototype, "lblTime", void 0);
    __decorate([
        property(cc.RichText)
    ], MJ_Game.prototype, "lblGameInfo", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Game.prototype, "node_state_list", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Game.prototype, "node_player_list", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Game.prototype, "node_group_list", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Game.prototype, "node_playOut_list", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Game.prototype, "node_act_list", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Game.prototype, "node_hu_list", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Game.prototype, "node_img_hu_list", void 0);
    MJ_Game = __decorate([
        ccclass
    ], MJ_Game);
    return MJ_Game;
}(cc.Component));
exports.default = MJ_Game;

cc._RF.pop();