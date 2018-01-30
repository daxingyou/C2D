"use strict";
cc._RF.push(module, '12bc6SoQ0tDwI4iyvXKUnPZ', 'MJ_Action');
// Script/SceneScript/Game/MJ_Action.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Action = /** @class */ (function (_super) {
    __extends(MJ_Action, _super);
    function MJ_Action() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        return _this;
    }
    MJ_Action.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
    };
    /**
     * 所有的特效动作结束回调
     *
     * @memberof MJ_Action
     */
    MJ_Action.prototype.actionEnd = function () {
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    MJ_Action = __decorate([
        ccclass
    ], MJ_Action);
    return MJ_Action;
}(cc.Component));
exports.default = MJ_Action;

cc._RF.pop();