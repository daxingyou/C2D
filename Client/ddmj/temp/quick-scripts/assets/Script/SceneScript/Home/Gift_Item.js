(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Gift_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '02f5bAHpLhJDJAICDU8W1tI', 'Gift_Item', __filename);
// Script/SceneScript/Home/Gift_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ModuleManager_1 = require("../../Modules/ModuleManager");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 赠送时间
         *
         * @type {cc.Label}
         * @memberof NewClass
         */
        _this.lblTime = null;
        /**
         * 索引
         *
         * @type {cc.Label}
         * @memberof NewClass
         */
        _this.lblIndex = null;
        /**
         * 赠送内容
         *
         * @type {cc.Label}
         * @memberof NewClass
         */
        _this.lblContent = null;
        _this.node_choose = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
    };
    /**
     * 显示item信息
     *
     * @param {number} index
     * @param {WalletGiveInner} data
     * @memberof NewClass
     */
    NewClass.prototype.updateItem = function (index, data) {
        this.node_choose.active = index % 2 === 0 ? false : true;
        this.lblIndex.string = (index + 1) + '';
        this.lblTime.string = ModuleManager_1.utils.getDateStringByTimestamp(data.giveTime, 3);
        this.lblContent.string = data.content;
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblTime", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblIndex", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblContent", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "node_choose", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Gift_Item.js.map
        