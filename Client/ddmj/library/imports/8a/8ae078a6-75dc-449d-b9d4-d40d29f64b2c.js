"use strict";
cc._RF.push(module, '8ae07imddxEnbnU1A0p9kss', 'MJ_Ting');
// Script/SceneScript/Game/MJ_Ting.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_Ting = /** @class */ (function (_super) {
    __extends(MJ_Ting, _super);
    function MJ_Ting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌节点
         *
         * @type {cc.Node}
         * @memberof MJ_Ting
         */
        _this.node_card = null;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        /**
         * 牌节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Ting
         */
        _this._node_card_list = [];
        return _this;
    }
    MJ_Ting.prototype.onLoad = function () {
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
    };
    /**
     * 初始化数据
     *
     * @param {CardAttrib[]} cardIds (cardId不能用)
     * @memberof MJ_Ting
     */
    MJ_Ting.prototype.initData = function (cardIds) {
        this._node_card_list.forEach(function (cardNode) {
            cardNode.removeFromParent(true);
            cardNode.destroy();
        });
        this._node_card_list.length = 0;
        if (cardIds && cardIds.length > 0) {
            this.updateCardData(cardIds[0], this.node_card);
            if (cardIds.length > 1) {
                for (var i = 1; i < cardIds.length; i++) {
                    var cardNode = cc.instantiate(this.node_card);
                    this.updateCardData(cardIds[i], cardNode);
                    cardNode.parent = this.node;
                    this._node_card_list.push(cardNode);
                }
            }
        }
    };
    /**
     * 刷新牌数据
     *
     * @param {number} card 牌数据 (cardId不能用)
     * @param {cc.Node} CardNode 牌节点
     * @memberof MJ_Ting
     */
    MJ_Ting.prototype.updateCardData = function (Card, CardNode) {
        var hcs = CardNode.getComponent('MJ_Card');
        var cardId = (Card.suit - 1) * 36 + (Card.point - 1) * 4 + 1;
        var csf = this._canvasTarget.getMJCardSF(cardId);
        hcs.initData(cardId, csf);
        var isShowMask = MJ_Help.getDieTing(Card);
        hcs.showMask(isShowMask);
    };
    __decorate([
        property(cc.Node)
    ], MJ_Ting.prototype, "node_card", void 0);
    MJ_Ting = __decorate([
        ccclass
    ], MJ_Ting);
    return MJ_Ting;
}(cc.Component));
exports.default = MJ_Ting;

cc._RF.pop();