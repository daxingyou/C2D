"use strict";
cc._RF.push(module, 'a94fdvc4jtD04LX3feBrk1U', 'Tip');
// Script/UI/Tip.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tip = /** @class */ (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lbl_msg = null;
        return _this;
    }
    /**
     * 显示漂浮框
     *
     * @param {string} msg 提示信息内容
     * @param {number} sTime 前段动画时间
     * @param {number} mTime 悬浮时间
     * @param {number} eTime 后端动画时间
     * @memberof Tip
     */
    Tip.prototype.showTip = function (msg, sTime, mTime, eTime) {
        this.lbl_msg.string = msg;
        var topY = Math.floor(cc.director.getVisibleSize().height / 5);
        var bottomY = -topY;
        this.node.y = bottomY;
        this.node.scale = 1.2;
        var action1 = cc.spawn(cc.moveTo(sTime, this.node.x, 0), cc.scaleTo(sTime, 1), cc.fadeIn(sTime));
        var action2 = cc.delayTime(mTime);
        var action3 = cc.spawn(cc.moveTo(eTime, this.node.x, topY), cc.scaleTo(eTime, 0.1), cc.fadeOut(eTime));
        var action4 = cc.callFunc(function (target, data) {
            target.removeFromParent(true);
            target.destroy();
        }, this);
        var seq = cc.sequence(action1, action2, action3, action4);
        this.node.runAction(seq);
    };
    __decorate([
        property(cc.Label)
    ], Tip.prototype, "lbl_msg", void 0);
    Tip = __decorate([
        ccclass
    ], Tip);
    return Tip;
}(cc.Component));
exports.default = Tip;

cc._RF.pop();