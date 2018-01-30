(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/ZJH/ZJH_PlayerUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b9281Tys8NCIqfST09JPz9q', 'ZJH_PlayerUI', __filename);
// Script/SceneScript/ZJH/ZJH_PlayerUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var ZJH_Help = require("./ZJH_Help");
var ZJH_PlayerUI = /** @class */ (function (_super) {
    __extends(ZJH_PlayerUI, _super);
    function ZJH_PlayerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *  玩家名字Label
         * @type {cc.Label}
         * @memberof ZJH_PlayerUI
         */
        _this.lblName = null;
        /**
         *玩家携带金币Label
         * @type {cc.Label}
         * @memberof ZJH_PlayerUI
         */
        _this.lblMoney = null;
        /**
         * 玩家下注金币Label
         * @type {cc.Label}
         * @memberof ZJH_PlayerUI
         */
        _this.lblBetGold = null;
        /**
         * 自己的牌型
         * @type {cc.Label}
         * @memberof ZJH_PlayerUI
         */
        _this.lblCardType = null;
        /**
         * 玩家头像sprite
         * @type {cc.Sprite}
         * @memberof ZJH_PlayerUI
         */
        _this.headImg = null;
        /**
         * 坐庄的图片
         * @type {cc.Node}
         * @memberof ZJH_PlayerUI
         */
        _this.node_dealer = null;
        /**
         * 状态节点
         * @type {cc.Node}
         * @memberof ZJH_PlayerUI
         */
        _this.node_state = null;
        /**
         * 准备节点
         * @type {cc.Node}
         * @memberof ZJH_PlayerUI
         */
        _this.node_ready = null;
        /**
         * 牌父节点
         * @type {cc.Node}
         * @memberof ZJH_PlayerUI
         */
        _this.card_board = null;
        /**
         * 牌父节点列表
         *
         * @type {cc.Node[]}
         * @memberof ZJH_PlayerUI
         */
        _this.pokerList = [];
        /**
         * canvas脚本
         *
         * @memberof ZJH_PlayerUI
         */
        _this._canvasScript = null;
        /**
         * 座位数据
         *
         * @memberof ZJH_PlayerUI
         */
        _this._seatInfo = null;
        /**
         * 是否进度条
         * @type {boolean}
         * @memberof ZJH_PlayerUI
         */
        _this._isPro = false;
        /**
         * 是否看牌 -1:正在播放翻牌动作 0:未翻牌
         * @type {number}
         * @memberof ZJH_PlayerUI
         */
        _this._isLook = 0;
        return _this;
    }
    /**
     * 初始化
     *
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.init = function () {
        this._canvasScript = dd.ui_manager.getCanvasNode().getComponent('ZJHCanvas');
        if (this.lblName)
            this.lblName.string = "玩家名称";
        this.lblMoney.string = "0";
        this.lblBetGold.string = "0";
        this.lblCardType.string = "";
        this.lblBetGold.node.parent.active = false;
        this.lblCardType.node.parent.active = false;
        this.node_dealer.active = false;
        this.releasePokers();
        if (this.node_state) {
            this.node_state.active = false;
        }
        this.node_ready.active = false;
        this._isLook = 0;
        this._isPro = false;
    };
    ZJH_PlayerUI.prototype.onLoad = function () {
        // this.node.on("touchend", (event: cc.Event.EventTouch) => {
        //     event.stopPropagation();
        // }, this);
        this.init();
    };
    ZJH_PlayerUI.prototype.releasePokers = function () {
        for (var i = 0; i < this.pokerList.length; i++) {
            this.pokerList[i].removeAllChildren(true);
        }
    };
    /**
     * 重置座位信息
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.resetSeat = function () {
        this.lblBetGold.string = "0";
        this.lblCardType.string = "";
        this.lblBetGold.node.parent.active = false;
        this.lblCardType.node.parent.active = false;
        this.node_dealer.active = false;
        this.releasePokers();
        if (this.node_state) {
            this.node_state.active = false;
        }
        this.node_ready.active = false;
        this._isLook = 0;
        this._isPro = false;
    };
    /**
     * 初始化座位数据
     * @param {any} seatInfo
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.initData = function (seatInfo) {
        this._seatInfo = seatInfo;
        if (this._seatInfo.handCards) {
            var card1 = dd.card_manager.getCardObjById(this._seatInfo.handCards[0]);
            var card2 = dd.card_manager.getCardObjById(this._seatInfo.handCards[1]);
            var card3 = dd.card_manager.getCardObjById(this._seatInfo.handCards[2]);
            var cards = [card1, card2, card3].sort(function (a, b) { return a.point - b.point; });
            if (cards[0].point === 2 && cards[1].point === 3 && cards[2].point === 14) {
                this._seatInfo.handCards[0] = cards[2].cardId;
                this._seatInfo.handCards[1] = cards[0].cardId;
                this._seatInfo.handCards[2] = cards[1].cardId;
            }
            else {
                for (var i = 0; i < cards.length; i++) {
                    this._seatInfo.handCards[i] = cards[i].cardId;
                }
            }
        }
        this.showPlayerBascInfo();
    };
    /**
     * 显示玩家的基本信息
     * @returns
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showPlayerBascInfo = function () {
        if (!this._seatInfo) {
            return;
        }
        this.headImg.spriteFrame = dd.img_manager.getHeadById(Number(this._seatInfo.headImg));
        if (this.lblName)
            this.lblName.string = this._seatInfo.nick;
        this.lblMoney.string = dd.utils.getShowNumberString(this._seatInfo.money);
        //游戏阶段
        var action = dd.gm_manager.zjhGameData.gameState;
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY || action === ZJH_Help.ZJH_Game_State.STATE_TABLE_IDLE) {
            //在空闲状态，重置
            this.resetSeat();
            //如果状态不为等待状态，就表示这个玩家已经准备了
            if (this._seatInfo.btState === ZJH_Help.ZJH_BT_State.ACT_STATE_BT) {
                this.node_ready.active = true;
            }
        }
        //开始游戏就有庄家的显示
        if (action > ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY) {
            this.node_ready.active = false;
            if (this._seatInfo.accountId === dd.gm_manager.zjhGameData.bankerId) {
                this.node_dealer.active = true;
            }
            else {
                this.node_dealer.active = false;
            }
        }
        //显示玩家下注
        this.showBetGold();
        //显示状态
        this.showState();
        //牌的显示
        this.showSeatPoker();
        //如果这个座位是自己
        if (this._seatInfo.accountId === dd.ud_manager.mineData.accountId) {
            dd.ud_manager.mineData.roomCard = this._seatInfo.money;
        }
    };
    //显示玩家下注
    ZJH_PlayerUI.prototype.showBetGold = function () {
        //游戏阶段
        var action = dd.gm_manager.zjhGameData.gameState;
        //在玩家下底注的时候
        if (action >= ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_BASESCORE && this._seatInfo.bGamed === 1) {
            var betMoney = Number(this._seatInfo.betMoney);
            //当前下注总金额
            this.lblBetGold.node.parent.active = true;
            this.lblBetGold.string = dd.utils.getShowNumberString(betMoney);
        }
        else {
            this.lblBetGold.node.parent.active = false;
        }
    };
    // 显示玩家状态
    ZJH_PlayerUI.prototype.showState = function () {
        //游戏阶段
        var action = dd.gm_manager.zjhGameData.gameState;
        //在大于发手牌的时候
        if (action > ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI) {
            var btState = this._seatInfo.btState;
            if (action < ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE) {
                //当前表态人
                var curStateAId = dd.gm_manager.zjhGameData.btIndex;
                //如果当前表态人是这个玩家
                if (curStateAId === this._seatInfo.seatIndex) {
                    //显示进度条
                    this.showPro(true);
                }
                else {
                    this.showPro(false);
                }
            }
            else {
                this.showPro(false);
            }
        }
    };
    /**
     * 显示表态进度
     * @param {boolean} isShow
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showPro = function (isShow) {
        //游戏阶段
        var action = dd.gm_manager.zjhGameData.gameState;
        if (isShow && action < ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE) {
            if (!this._isPro) {
                this.node_state.active = true;
                var dTime = (Number(dd.gm_manager.zjhGameData.actTime) - Number(dd.gm_manager.zjhGameData.svrTime)) / 1000;
                //剩余时间大于0
                if (dTime > 0) {
                    var cTime = Number(dd.gm_manager.zjhGameData.actTotalTime) / 1000;
                    this._isPro = true;
                    //如果这个座位的人是自己，有一个倒计时声音
                    var isPlayEfc = false;
                    var type = 1;
                    if (this._seatInfo.accountId === dd.ud_manager.mineData.accountId) {
                        isPlayEfc = true;
                        type = 0;
                    }
                    var tdSize = cc.size(this.node.width, this.node.height);
                    this._canvasScript.showSJDAction(type, cTime - dTime, cTime, isPlayEfc, this.node_state);
                }
                else {
                    this._isPro = false;
                    this.node_state.removeAllChildren(true);
                }
            }
        }
        else {
            this._isPro = false;
            this.node_state.active = false;
            this.node_state.removeAllChildren(true);
        }
    };
    //显示手牌 
    ZJH_PlayerUI.prototype.showSeatPoker = function () {
        //游戏阶段
        var action = dd.gm_manager.zjhGameData.gameState;
        //如果这个座位、座位玩家、座位玩家的手牌不存在、玩家未参与游戏，就返回
        if (!this._seatInfo || !this._seatInfo.handCards || action < ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI) {
            //不显示牌
            this.releasePokers();
            //不显示牌型
            this.lblCardType.node.parent.active = false;
            this._isLook = 0;
            return;
        }
        if (this._isLook === -1) {
            return;
        }
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI || action >= ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE)
            return;
        this.lblCardType.node.parent.active = true;
        var btState = this._seatInfo.btState;
        //如果状态为为---弃牌
        if (btState === ZJH_Help.ZJH_BT_State.ACT_STATE_DROP) {
            this.lblCardType.string = '已弃牌';
            //如果是自己
            if (this._seatInfo.accountId === dd.ud_manager.mineData.accountId) {
                //显示牌正面
                this.showPokers();
            }
            else {
                //如果是别人，就显示牌的灰色背面
                this.showPokers(0, false);
            }
        }
        else {
            //是否看牌(1==看牌,0==未看牌)
            if (this._seatInfo.looked === 1) {
                //如果是自己
                if (this._seatInfo.accountId === dd.ud_manager.mineData.accountId) {
                    //显示牌
                    this.showPokers();
                    //显示牌型
                    this.lblCardType.string = dd.card_manager.getCardTypeByIds(this._seatInfo.handCards);
                }
                else {
                    //显示牌背面
                    this.showPokers(-1, false);
                    this.lblCardType.string = '已看牌';
                }
            }
            else {
                this._isLook = 0;
                //显示牌背面
                this.showPokers(-1, false);
                this.lblCardType.string = '未看牌';
            }
        }
    };
    /**
     *根据牌pokerId，显示牌
     * @param {number} pokerId 牌索引
     * @param {number} type 0=牌信息 1=翻牌动画
     * @returns
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showPokerById = function (pokerId, type, isShow) {
        var _this = this;
        if (type === void 0) { type = 0; }
        if (isShow === void 0) { isShow = true; }
        if (pokerId > this.pokerList.length - 1)
            return;
        if (this._seatInfo.handCards) {
            var poker = this.pokerList[pokerId];
            if (poker) {
                if (type === 0) {
                    this._canvasScript.showCard(this._seatInfo.handCards[pokerId], this.pokerList[pokerId], isShow);
                }
                else {
                    this._canvasScript.showFanPai(this._seatInfo.handCards[pokerId], this.pokerList[pokerId], function () {
                        _this.showPokerById(pokerId);
                    });
                }
            }
        }
    };
    /**
     * 显示牌 -1=正常的牌 0=灰色的牌 1=背面的牌
     * @param {number} type -1=正常的牌 0=灰色的牌 1=背面的牌
     * @param {boolean} [isShow=true]
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showPokers = function (type, isShow) {
        if (type === void 0) { type = -1; }
        if (isShow === void 0) { isShow = true; }
        for (var i = 0; i < this.pokerList.length; i++) {
            var pokerId = type === -1 ? this._seatInfo.handCards[i] : type;
            this._canvasScript.showCard(pokerId, this.pokerList[i], isShow);
        }
    };
    /**
     * 获取牌父节点节点的坐标点
     *
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.getCardBoardPos = function () {
        return this.card_board.getPosition();
    };
    /**
     * 显示翻牌动画
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showSeatFPAction = function () {
        //如果翻牌动画是自己,并且没有看牌，就翻开
        if (this._seatInfo.accountId === dd.ud_manager.mineData.accountId) {
            if (this._isLook === 0) {
                this.createFPAction(this.showFPCallBack.bind(this));
                this._isLook = -1;
            }
        }
        else {
            this.createFPAction(this.showFPCallBack.bind(this));
            this._isLook = -1;
        }
    };
    /**
     * 显示座位翻牌动画
     * @param {any} cb
     * @returns
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.createFPAction = function (cb) {
        if (this._isLook === -1) {
            return;
        }
        if (this._seatInfo.handCards) {
            for (var i = 0; i < this.pokerList.length; i++) {
                this.pokerList[i].removeAllChildren(true);
                if (i === 0) {
                    //显示翻牌动画
                    this._canvasScript.showFanPai(this._seatInfo.handCards[i], this.pokerList[i], cb);
                }
                else {
                    //显示翻牌动画
                    this._canvasScript.showFanPai(this._seatInfo.handCards[i], this.pokerList[i], null);
                }
            }
        }
    };
    /**
     * 翻牌回调
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.showFPCallBack = function () {
        this._isLook = 1;
        //如果自己看牌了，要显示自己的牌型
        this.showPokers();
        this.lblCardType.node.parent.active = true;
        //如果状态不为---弃牌
        if (this._seatInfo.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_DROP) {
            //显示牌型
            this.lblCardType.string = dd.card_manager.getCardTypeByIds(this._seatInfo.handCards);
        }
        else {
            this.lblCardType.string = '已弃牌';
        }
        this.changeIsSeeBrand();
    };
    /**
     * 把本地数据跟改为看牌状态
     * @memberof ZJH_PlayerUI
     */
    ZJH_PlayerUI.prototype.changeIsSeeBrand = function () {
        var zjhGameData = dd.gm_manager.zjhGameData;
        if (zjhGameData) {
            for (var i = 0; i < zjhGameData.seats.length; i++) {
                if (this._seatInfo.accountId === zjhGameData.seats[i].accountId) {
                    dd.gm_manager.zjhGameData.seats[i].looked = 1;
                }
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], ZJH_PlayerUI.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_PlayerUI.prototype, "lblMoney", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_PlayerUI.prototype, "lblBetGold", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_PlayerUI.prototype, "lblCardType", void 0);
    __decorate([
        property(cc.Sprite)
    ], ZJH_PlayerUI.prototype, "headImg", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_PlayerUI.prototype, "node_dealer", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_PlayerUI.prototype, "node_state", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_PlayerUI.prototype, "node_ready", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_PlayerUI.prototype, "card_board", void 0);
    __decorate([
        property([cc.Node])
    ], ZJH_PlayerUI.prototype, "pokerList", void 0);
    ZJH_PlayerUI = __decorate([
        ccclass
    ], ZJH_PlayerUI);
    return ZJH_PlayerUI;
}(cc.Component));
exports.default = ZJH_PlayerUI;

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
        //# sourceMappingURL=ZJH_PlayerUI.js.map
        