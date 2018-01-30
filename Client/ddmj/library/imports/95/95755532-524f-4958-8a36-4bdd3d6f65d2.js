"use strict";
cc._RF.push(module, '95755UyUk9JWIo2S909b2XS', 'Room_Create_Rule');
// Script/SceneScript/Room/Room_Create_Rule.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Room_Create_Rule = /** @class */ (function (_super) {
    __extends(Room_Create_Rule, _super);
    function Room_Create_Rule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *
         *
         * @type {cc.Label}
         * @memberof Room_Create_Rule
         */
        _this.lblRuleName = null;
        /**
         * 配置信息的父节点
         *
         * @type {cc.Node}
         * @memberof Room_Create_Rule
         */
        _this.node_layout = null;
        _this._sy = 0;
        return _this;
    }
    Room_Create_Rule.prototype.onLoad = function () {
        this._sy = this.node_layout.getComponent(cc.Layout).spacingY;
    };
    Room_Create_Rule.prototype.updateItem = function (ruleName) {
        this.lblRuleName.string = ruleName + ':';
    };
    Room_Create_Rule.prototype.lateUpdate = function () {
        if (this.node.height !== this.node_layout.height + this._sy) {
            this.node.height = this.node_layout.height + this._sy;
        }
    };
    __decorate([
        property(cc.Label)
    ], Room_Create_Rule.prototype, "lblRuleName", void 0);
    __decorate([
        property(cc.Node)
    ], Room_Create_Rule.prototype, "node_layout", void 0);
    Room_Create_Rule = __decorate([
        ccclass
    ], Room_Create_Rule);
    return Room_Create_Rule;
}(cc.Component));
exports.default = Room_Create_Rule;

cc._RF.pop();