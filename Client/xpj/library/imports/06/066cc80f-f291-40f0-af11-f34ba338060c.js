"use strict";
cc._RF.push(module, '066ccgP8pFA8K8R80ujOAYM', 'Action');
// Script/SceneScript/Action/Action.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Action = /** @class */ (function (_super) {
    __extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Action.prototype.onLoad = function () {
    };
    /**
     * 动作结束回调
     *
     * @memberof ZJH_ActionPK
     */
    Action.prototype.actionEnd = function () {
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    Action = __decorate([
        ccclass
    ], Action);
    return Action;
}(cc.Component));
exports.default = Action;

cc._RF.pop();