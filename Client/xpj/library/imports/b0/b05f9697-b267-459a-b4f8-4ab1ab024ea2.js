"use strict";
cc._RF.push(module, 'b05f9aXsmdFmrT4SrGrAk6i', 'Game_Gold');
// Script/SceneScript/ZJH/Game_Gold.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_Gold = /** @class */ (function (_super) {
    __extends(Game_Gold, _super);
    function Game_Gold() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game_Gold.prototype.onLoad = function () {
    };
    Game_Gold.prototype.unuse = function () {
        this.node.stopAllActions();
        this.node.getComponent(cc.Sprite).spriteFrame = null;
        this.node.x = 0;
        this.node.y = 0;
        this.node.rotation = 0;
    };
    /**
     *
     * @param {cc.SpriteFrame} sf 图片
     * @param {cc.Node} parent 父节点
     * @memberof Game_Gold
     */
    Game_Gold.prototype.initData = function (sf, parent) {
        this.node.getComponent(cc.Sprite).spriteFrame = sf;
        this.node.parent = parent;
    };
    Game_Gold = __decorate([
        ccclass
    ], Game_Gold);
    return Game_Gold;
}(cc.Component));
exports.default = Game_Gold;

cc._RF.pop();