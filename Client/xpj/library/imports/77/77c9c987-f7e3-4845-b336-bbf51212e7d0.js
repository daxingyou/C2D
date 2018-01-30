"use strict";
cc._RF.push(module, '77c9cmH9+NIRbM2u/USEufQ', 'Game_ActionFP');
// Script/SceneScript/ZJH/Game_ActionFP.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_ActionFP = /** @class */ (function (_super) {
    __extends(Game_ActionFP, _super);
    function Game_ActionFP() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌节点
         *
         * @type {cc.Node}
         * @memberof Game_ActionFP
         */
        _this.cardNode = null;
        _this.cardImg = null;
        /**
         * 回调函数
         *
         * @memberof Game_ActionFP
         */
        _this._cb = null;
        /**
         * 牌数据
         *
         * @memberof Game_ActionFP
         */
        _this._data = null;
        return _this;
    }
    Game_ActionFP.prototype.onLoad = function () {
    };
    /**
     *初始化翻牌的数据
     * @param {number} cardId 牌数据
     * @param {cc.SpriteFrame} cardImg 牌图片
     * @param {*} [cb] 翻牌的回调函数
     * @param {*} [data] 翻牌的回调数据
     * @memberof Game_ActionFP
     */
    Game_ActionFP.prototype.initData = function (cardId, cardImg, cb, data) {
        if (cardId > -1 && cardImg) {
            this.cardImg.spriteFrame = cardImg;
        }
        if (cb) {
            this._cb = cb;
        }
        if (data !== null || data !== undefined) {
            this._data = data;
        }
    };
    /**
     * 翻牌回调
     *
     * @memberof Game_ActionFP
     */
    Game_ActionFP.prototype.fpActionEnd = function () {
        if (this._cb) {
            if (this._data !== null || this._data !== undefined) {
                this._cb(this._data);
            }
            else {
                this._cb();
            }
        }
        // this.node.removeFromParent(true);
        // this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Game_ActionFP.prototype, "cardNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_ActionFP.prototype, "cardImg", void 0);
    Game_ActionFP = __decorate([
        ccclass
    ], Game_ActionFP);
    return Game_ActionFP;
}(cc.Component));
exports.default = Game_ActionFP;

cc._RF.pop();