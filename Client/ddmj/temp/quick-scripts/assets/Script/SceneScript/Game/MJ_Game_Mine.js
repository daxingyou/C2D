(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJ_Game_Mine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f5253a2foJNNaX6SxL3oJt2', 'MJ_Game_Mine', __filename);
// Script/SceneScript/Game/MJ_Game_Mine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Help = require("./MJ_Help");
var MJ_Play = /** @class */ (function (_super) {
    __extends(MJ_Play, _super);
    function MJ_Play() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌节点
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_mine_card = null;
        /**
         * 提示的文本
         *
         * @type {cc.Label}
         * @memberof MJ_Play
         */
        _this.lblTip = null;
        /**
         * 换三张的按钮
         *
         * @type {cc.Button}
         * @memberof MJ_Play
         */
        _this.btn_swap = null;
        /**
         * 定缺的按钮父节点
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_lack = null;
        /**
         * 碰杠胡按钮表态的父节点
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_state = null;
        /**
         * 推荐文字
         *
         * @type {cc.SpriteFrame}
         * @memberof MJ_Play
         */
        _this.img_tj = null;
        /**
         *定缺节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Play
         */
        _this.node_dq_list = [];
        /**
         * 杠、碰、胡、过的节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Play
         */
        _this.node_state_list = [];
        /**
         * canvas脚本
         *
         * @type {MJCanvas}
         * @memberof MJ_Play
         */
        _this._canvasTarget = null;
        /**
         * 玩家座位号索引
         *
         * @type {number} =
         * @memberof MJ_Play
         */
        _this._sId = 0;
        /**
         * 当前玩家的信息
         *
         * @type {SeatVo}
         * @memberof MJ_Play
         */
        _this._seatInfo = null;
        /**
         * 换牌数组
         *
         * @type {number[]}
         * @memberof MJ_Play
         */
        _this._swapCardList = [];
        /**
         * 手牌列表脚本
         *
         * @type {MJ_HandList}
         * @memberof MJ_Play
         */
        _this._handList = null;
        return _this;
    }
    MJ_Play.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this._handList = this.node_mine_card.getComponent('MJ_HandList');
    };
    /**
     * 初始化界面
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.initData = function () {
        this._swapCardList.length = 0;
        this.btn_swap.interactable = false;
        this.lblTip.node.active = false;
        this.btn_swap.node.active = false;
        this.node_state.active = false;
        this.node_lack.active = false;
    };
    /**
     * 刷新打牌的信息
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.updatePlay = function (sId, seatInfo) {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        if (!this._handList) {
            this._handList = this.node_mine_card.getComponent('MJ_HandList');
        }
        this._sId = sId;
        this._seatInfo = seatInfo;
        //如果在定缺阶段之前，排序就是 万筒条
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState < MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            this._seatInfo.handCards = MJ_Help.getSortCardByCardIds(this._seatInfo.handCards);
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            //如果在定缺阶段，未定缺时排序 万筒条 ，已定缺时排序 打缺的牌在最右边
            if (this._seatInfo.btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                this._seatInfo.handCards = MJ_Help.getSortCardByCardIds(this._seatInfo.handCards, this._seatInfo.unSuit);
                for (var i = 0; i < this.node_dq_list.length; i++) {
                    this.node_dq_list[i].scale = 1;
                    this.node_dq_list[i].removeAllChildren();
                    this.node_dq_list[i].stopAllActions();
                }
            }
            else {
                this._seatInfo.handCards = MJ_Help.getSortCardByCardIds(this._seatInfo.handCards);
                this.showDQAction();
            }
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState > MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            //如果大于了定缺阶段，都需要先打定缺的牌
            this._seatInfo.handCards = MJ_Help.getSortCardByCardIds(this._seatInfo.handCards, this._seatInfo.unSuit);
        }
        else {
        }
        //如果在准备阶段，就初始化数据
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState <= MJ_Help.MJ_GameState.STATE_TABLE_READY) {
            this.initData();
        }
        //如果在小于定缺阶段
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState <= MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            if (this._seatInfo.swapCards) {
                this._swapCardList = this._seatInfo.swapCards;
            }
        }
        //刷新手牌
        this._handList.updateHandList(this._seatInfo, this);
        this.showPlayState();
    };
    /**
     * 取消选中牌
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.unSelectCard = function () {
        this._handList.selectCardByCardId(-1);
    };
    /**
     * 选中换三张的牌
     *
     * @param {number} cardId
     * @param {number} isSelect -1否 1是
     * @returns {boolean}
     * @memberof MJ_Play
     */
    MJ_Play.prototype.selectSwapCard = function (cardId, isSelect) {
        if (isSelect < 0) {
            //从数组中减去
            var sIndex = this._swapCardList.indexOf(cardId);
            if (sIndex !== -1) {
                this._swapCardList.splice(sIndex, 1);
            }
            if (this._swapCardList.length < 3) {
                this.btn_swap.interactable = false;
            }
        }
        else {
            if (this._swapCardList.length < 3) {
                //选出这张牌
                this._swapCardList.push(cardId);
                if (this._swapCardList.length === 3) {
                    this.btn_swap.interactable = true;
                }
                return true;
            }
        }
        return false;
    };
    /**
     * 座位状态的显示
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.showPlayState = function () {
        switch (dd.gm_manager.mjGameData.tableBaseVo.gameState) {
            case MJ_Help.MJ_GameState.STATE_TABLE_READY: {
                this.lblTip.node.active = true;
                if (this._seatInfo.btState === 0) {
                    this.lblTip.string = '等待准备...';
                }
                else {
                    this.lblTip.string = '已准备...';
                }
                break;
            }
            case MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD: {
                this.node_state.active = false;
                this.node_lack.active = false;
                this.lblTip.node.active = true;
                if (this._seatInfo.btState === 0) {
                    this.lblTip.string = '请选择花色一样的三张牌交换...';
                    this.btn_swap.node.active = true;
                    if (this._swapCardList.length === 3) {
                        this.btn_swap.interactable = true;
                    }
                    else {
                        this.btn_swap.interactable = false;
                    }
                }
                else {
                    this.lblTip.string = '已选牌...';
                    this.btn_swap.node.active = false;
                }
                break;
            }
            case MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE: {
                this.node_state.active = false;
                this.btn_swap.node.active = false;
                this.lblTip.node.active = true;
                if (this._seatInfo.btState === 0) {
                    this.lblTip.string = '请选择一门花色定缺...';
                    this.node_lack.active = true;
                }
                else {
                    this.lblTip.string = '已定缺...';
                    this.node_lack.active = false;
                }
                break;
            }
            case MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD: {
                this.showBreakState();
                break;
            }
            default:
                this.lblTip.node.active = false;
                this.node_state.active = false;
                this.node_lack.active = false;
                break;
        }
    };
    /**
     * 显示胡杠碰吃过 状态
     *
     * @param {MJ_Help.MJ_Act_Type} breakState
     * @memberof MJ_Play
     */
    MJ_Play.prototype.showBreakState = function () {
        //如果自己有（胡杠碰吃过的状态）
        var isBreakCS = this.getIsBreakCardState();
        if (isBreakCS) {
            //如果自己在(等待表态)
            if (this._seatInfo.btState === MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                this.node_state.active = true;
                for (var i = 0; i < this._seatInfo.breakCardState.length; i++) {
                    if (this.node_state_list[i]) {
                        if (this._seatInfo.breakCardState[i] === 1) {
                            this.node_state_list[i].active = true;
                        }
                        else {
                            this.node_state_list[i].active = false;
                        }
                    }
                }
            }
            else {
                this.node_state.active = false;
            }
        }
        else {
            this.node_state.active = false;
        }
    };
    /**
     * 获取是否在胡杠碰的状态
     *
     * @returns
     * @memberof MJ_Play
     */
    MJ_Play.prototype.getIsBreakCardState = function () {
        var isBreakCS = false;
        for (var i = 0; i < this._seatInfo.breakCardState.length; i++) {
            if (this._seatInfo.breakCardState[i] === 1) {
                isBreakCS = true;
                break;
            }
        }
        return isBreakCS;
    };
    /**
     * 自己定缺按钮的点击事件
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.click_btn_lack = function (event, type) {
        dd.mp_manager.playButton();
        switch (type) {
            case '0': {
                cc.log('万');
                this._canvasTarget.sendDinQue(MJ_Help.MJ_Suit.SUIT_TYPE_WAN);
                break;
            }
            case '1': {
                cc.log('筒');
                this._canvasTarget.sendDinQue(MJ_Help.MJ_Suit.SUIT_TYPE_TONG);
                break;
            }
            case '2': {
                cc.log('条');
                this._canvasTarget.sendDinQue(MJ_Help.MJ_Suit.SUIT_TYPE_TIAO);
                break;
            }
            default:
                break;
        }
        this.unSelectCard();
    };
    /**
     *
     * 换三张
     * @memberof MJ_Play
     */
    MJ_Play.prototype.click_btn_swap = function () {
        dd.mp_manager.playButton();
        if (this._swapCardList.length !== 3) {
            dd.ui_manager.showTip('请选择花色一样的三张牌交换');
            return;
        }
        var isAllSame = true;
        var card1 = MJ_Help.getCardById(this._swapCardList[0]);
        var card2 = MJ_Help.getCardById(this._swapCardList[1]);
        var card3 = MJ_Help.getCardById(this._swapCardList[2]);
        if (card1.suit === card2.suit && card2.suit === card3.suit) {
            this._canvasTarget.sendSwap(this._swapCardList);
        }
        else {
            dd.ui_manager.showTip('请选择花色一样的三张牌交换');
        }
    };
    /**
     * 胡杠碰过的表态
     *
     * @param {any} event
     * @param {string} type
     * @memberof MJ_Play
     */
    MJ_Play.prototype.click_btn_state = function (event, type) {
        dd.mp_manager.playButton();
        switch (type) {
            case '0': {
                this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_HU, this._seatInfo.breakCard, this.node_state);
                break;
            }
            case '1': {
                //如果表态是自己,就有多杠的情况
                if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                    var list = this._seatInfo.handCards;
                    //如果(摸牌)存在，并且是(自己摸牌)，就要把摸得牌算进去
                    if (this._seatInfo.moPaiCard && dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex) {
                        list = list.concat(this._seatInfo.moPaiCard);
                    }
                    var gList = [];
                    //获取自己的手牌中，是否有杠牌
                    var scData = MJ_Help.getSplitList(list);
                    gList = scData.gangList;
                    //如果自己有碰牌，看看自己的手牌中是否有碰牌的牌，连起来就有4张牌，也可以杠牌
                    if (this._seatInfo.pengCards && this._seatInfo.pengCards.length > 0) {
                        //获取手牌中是否存在 已经碰牌的牌，如果有，可以杠
                        var pList = MJ_Help.getCardIdsByCardId(this._seatInfo.pengCards, list);
                        gList = gList.concat(pList);
                    }
                    if (gList.length > 0) {
                        if (gList.length > 1) {
                            this._canvasTarget.showMoreGang(gList, this);
                            this.node_state.active = false;
                        }
                        else {
                            this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_GANG, gList[0], this.node_state);
                        }
                    }
                    else {
                        this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_GANG, this._seatInfo.breakCard, this.node_state);
                    }
                }
                else {
                    this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_GANG, this._seatInfo.breakCard, this.node_state);
                }
                break;
            }
            case '2': {
                this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_PENG, this._seatInfo.breakCard, this.node_state);
                break;
            }
            case '3': {
                this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_CHI, this._seatInfo.breakCard, this.node_state);
                break;
            }
            case '4': {
                this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_DROP, this._seatInfo.breakCard, this.node_state);
                break;
            }
            default:
                break;
        }
    };
    /**
     * 显示推荐定缺的动作
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.showDQAction = function () {
        var type = MJ_Help.getDingQueSuit(this._seatInfo.handCards);
        if (type !== -1) {
            var node_dq = this.node_dq_list[type];
            node_dq.stopAllActions();
            var seq = cc.sequence(cc.scaleTo(0.4, 0.8), cc.scaleTo(0.4, 1).easing(cc.easeElasticOut(0.4)));
            var action = cc.repeatForever(seq);
            node_dq.runAction(action);
            var node_tj = new cc.Node('tj');
            var sp = node_tj.addComponent(cc.Sprite);
            sp.spriteFrame = this.img_tj;
            node_tj.setPosition(cc.p(40, 40));
            node_tj.parent = node_dq;
        }
    };
    __decorate([
        property(cc.Node)
    ], MJ_Play.prototype, "node_mine_card", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_Play.prototype, "lblTip", void 0);
    __decorate([
        property(cc.Button)
    ], MJ_Play.prototype, "btn_swap", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Play.prototype, "node_lack", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Play.prototype, "node_state", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MJ_Play.prototype, "img_tj", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Play.prototype, "node_dq_list", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Play.prototype, "node_state_list", void 0);
    MJ_Play = __decorate([
        ccclass
    ], MJ_Play);
    return MJ_Play;
}(cc.Component));
exports.default = MJ_Play;

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
        //# sourceMappingURL=MJ_Game_Mine.js.map
        