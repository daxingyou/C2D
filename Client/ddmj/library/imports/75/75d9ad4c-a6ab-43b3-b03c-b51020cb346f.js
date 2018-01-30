"use strict";
cc._RF.push(module, '75d9a1MpqtDs7A8tRAgyzRv', 'MJ_Gang');
// Script/SceneScript/Game/MJ_Gang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_Gang = /** @class */ (function (_super) {
    __extends(MJ_Gang, _super);
    function MJ_Gang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌节点
         *
         * @type {cc.Node}
         * @memberof MJ_Gang
         */
        _this.node_card = null;
        /**
         * 牌父节点
         *
         * @type {cc.Node}
         * @memberof MJ_Gang
         */
        _this.nodeLayout = null;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        /**
         * 调用的父节点
         *
         * @type {any}
         * @memberof MJ_Gang
         */
        _this._target = null;
        _this.MJ_Gang_Touch_Start = function (event) {
            var cardNode = event.currentTarget;
            cardNode.color = cc.Color.GRAY;
            event.stopPropagation();
        };
        _this.MJ_Gang_Touch_End = function (event) {
            var cardNode = event.currentTarget;
            cardNode.color = cc.Color.WHITE;
            var hcs = cardNode.getComponent('MJ_Card');
            _this._canvasTarget.sendOtherBreakCard(MJ_Help.MJ_Act_Type.ACT_INDEX_GANG, hcs._cardId, null);
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        };
        return _this;
    }
    MJ_Gang.prototype.onLoad = function () {
        var _this = this;
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on("touchend", function (event) {
            _this._target.node_state.active = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        this.node_card.on("touchstart", this.MJ_Gang_Touch_Start, this);
        this.node_card.on("touchend", this.MJ_Gang_Touch_End, this);
    };
    /**
     * 初始化数据
     *
     * @param {number[]} cardIds
     * @memberof MJ_Gang
     */
    MJ_Gang.prototype.initData = function (cardIds, target) {
        this._target = target;
        if (cardIds && cardIds.length > 0) {
            this.updateCardData(cardIds[0], this.node_card);
            if (cardIds.length > 1) {
                for (var i = 1; i < cardIds.length; i++) {
                    var cardNode = cc.instantiate(this.node_card);
                    this.updateCardData(cardIds[i], cardNode);
                    cardNode.on("touchstart", this.MJ_Gang_Touch_Start, this);
                    cardNode.on("touchend", this.MJ_Gang_Touch_End, this);
                    cardNode.parent = this.nodeLayout;
                }
            }
        }
    };
    /**
     * 刷新牌数据
     *
     * @param {number} card 牌数据
     * @param {cc.Node} CardNode 牌节点
     * @memberof MJ_Gang
     */
    MJ_Gang.prototype.updateCardData = function (Card, CardNode) {
        var hcs = CardNode.getComponent('MJ_Card');
        var csf = this._canvasTarget.getMJCardSF(Card);
        hcs.initData(Card, csf);
    };
    __decorate([
        property(cc.Node)
    ], MJ_Gang.prototype, "node_card", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Gang.prototype, "nodeLayout", void 0);
    MJ_Gang = __decorate([
        ccclass
    ], MJ_Gang);
    return MJ_Gang;
}(cc.Component));
exports.default = MJ_Gang;

cc._RF.pop();