"use strict";
cc._RF.push(module, '2cd39F44dVKG4GjpLKmoh4F', 'Game_Card');
// Script/SceneScript/ZJH/Game_Card.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_Card = /** @class */ (function (_super) {
    __extends(Game_Card, _super);
    function Game_Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌
         * @type {cc.Sprite}
         * @memberof Game_Card
         */
        _this.card_img = null;
        /**
         * 牌背
         * @type {cc.Node}
         * @memberof Game_Card
         */
        _this.backNode = null;
        /**
         * 牌ID
         * @type {number}
         * @memberof Game_Card
         */
        _this._cardId = 0;
        return _this;
    }
    Game_Card.prototype.onLoad = function () {
    };
    /**
     * 初始化牌数据
     *
     * @param {number} cardId  牌数据
     * @param {cc.SpriteFrame} cardSF 牌图片
     * @param {boolean} isShow 是否显示
     * @memberof Game_Card
     */
    Game_Card.prototype.initData = function (cardId, cardSF, isShow) {
        this._cardId = cardId;
        this.card_img.spriteFrame = cardSF;
        if (this._cardId > 1) {
            this.backNode.active = !isShow;
        }
        else {
            this.backNode.active = false;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Game_Card.prototype, "card_img", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Card.prototype, "backNode", void 0);
    Game_Card = __decorate([
        ccclass
    ], Game_Card);
    return Game_Card;
}(cc.Component));
exports.default = Game_Card;

cc._RF.pop();