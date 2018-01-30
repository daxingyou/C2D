"use strict";
cc._RF.push(module, 'c678faIGcpLU7VqV4xH9xUn', 'MJ_Game_Others');
// Script/SceneScript/Game/MJ_Game_Others.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Help = require("./MJ_Help");
var MJ_Play = /** @class */ (function (_super) {
    __extends(MJ_Play, _super);
    function MJ_Play() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 手牌的容器节点
         *
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this.node_hand = null;
        /**
         * 提示的文本
         *
         * @type {cc.Label}
         * @memberof MJ_Play
         */
        _this.lblTip = null;
        /**
         * 手牌节点列表 0摸牌 1~13手牌
         *
         * @type {cc.Node[]}
         * @memberof MJ_Play
         */
        _this.hand_card_list = [];
        /**
         * canvas脚本
         *
         * @type {MJCanvas}
         * @memberof MJ_Play
         */
        _this._canvasTarget = null;
        /**
         * 当前玩家的信息
         *
         * @type {SeatVo}
         * @memberof MJ_Play
         */
        _this._seatInfo = null;
        /**
         * 座位索引
         * @type {number}
         * @memberof MJ_Play
         */
        _this._sId = 0;
        return _this;
    }
    MJ_Play.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
    };
    /**
     * 刷新打牌的信息
     * @param {number} sId 座位索引
     * @param {SeatVo} seatInfo 座位信息
     * @memberof MJ_Play
     */
    MJ_Play.prototype.updatePlay = function (sId, seatInfo) {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        this._sId = sId;
        this._seatInfo = seatInfo;
        this.showPlayState();
        this.showHandCard();
        this.showMPCard();
    };
    /**
    *  显示自己的牌 手牌 + 杠牌 + 碰牌
    *
    * @memberof MJ_Play
    */
    MJ_Play.prototype.showHandCard = function () {
        if (this._seatInfo.handCardsLen > 0) {
            this.node_hand.active = true;
            //显示其他手牌
            for (var i = 1; i < this.hand_card_list.length; i++) {
                //如果这张牌大于了手牌的长度，就不显示了
                if (i > this._seatInfo.handCardsLen) {
                    this.hand_card_list[i].active = false;
                }
                else {
                    this.hand_card_list[i].active = true;
                }
            }
        }
        else {
            this.node_hand.active = false;
        }
    };
    /**
     *  显示摸牌
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.showMPCard = function () {
        //如果是自己表态，并且是摸牌状态，牌也存在，就显示
        if (dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex
            && this._seatInfo.moPaiCard) {
            this.hand_card_list[0].active = true;
        }
        else {
            this.hand_card_list[0].active = false;
        }
    };
    /**
     * 座位状态的显示
     *
     * @memberof MJ_Play
     */
    MJ_Play.prototype.showPlayState = function () {
        switch (dd.gm_manager.mjGameData.tableBaseVo.gameState) {
            //如果在准备阶段，就初始化数据
            case MJ_Help.MJ_GameState.STATE_TABLE_IDLE:
                this.hand_card_list[0].active = false;
                this.node_hand.active = false;
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_READY: {
                this.hand_card_list[0].active = false;
                this.node_hand.active = false;
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
                this.lblTip.node.active = true;
                if (this._seatInfo.btState === 0) {
                    this.lblTip.string = '正在选牌...';
                }
                else {
                    this.lblTip.string = '已选牌...';
                }
                break;
            }
            case MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE: {
                this.lblTip.node.active = true;
                if (this._seatInfo.btState === 0) {
                    this.lblTip.string = '定缺中...';
                }
                else {
                    this.lblTip.string = '已定缺...';
                }
                break;
            }
            default:
                this.lblTip.node.active = false;
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], MJ_Play.prototype, "node_hand", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_Play.prototype, "lblTip", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Play.prototype, "hand_card_list", void 0);
    MJ_Play = __decorate([
        ccclass
    ], MJ_Play);
    return MJ_Play;
}(cc.Component));
exports.default = MJ_Play;

cc._RF.pop();