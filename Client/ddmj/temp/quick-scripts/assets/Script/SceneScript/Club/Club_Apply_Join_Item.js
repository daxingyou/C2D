(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/Club_Apply_Join_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '330daND3iZC5L0J9mwFOTlM', 'Club_Apply_Join_Item', __filename);
// Script/SceneScript/Club/Club_Apply_Join_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Club_Apply_Join_Item = /** @class */ (function (_super) {
    __extends(Club_Apply_Join_Item, _super);
    function Club_Apply_Join_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblName = null;
        _this.headImg = null;
        _this._roleInfo = null;
        _this._canvasScript = null;
        return _this;
    }
    Club_Apply_Join_Item.prototype.onLoad = function () {
    };
    /**
     * 显示信息
     *
     * @memberof Club_Role
     */
    Club_Apply_Join_Item.prototype.updateItem = function (data, target) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._roleInfo = data;
                        this._canvasScript = target;
                        this.lblName.string = data.nick;
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.headImg.spriteFrame = headSF;
                        return [2 /*return*/];
                }
            });
        });
    };
    Club_Apply_Join_Item.prototype.click_btn_refuse = function () {
        dd.mp_manager.playButton();
        this._canvasScript.sendApplyAnwser(this._roleInfo.starNO, 0);
    };
    Club_Apply_Join_Item.prototype.click_btn_agree = function () {
        dd.mp_manager.playButton();
        this._canvasScript.sendApplyAnwser(this._roleInfo.starNO, 1);
    };
    __decorate([
        property(cc.Label)
    ], Club_Apply_Join_Item.prototype, "lblName", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Apply_Join_Item.prototype, "headImg", void 0);
    Club_Apply_Join_Item = __decorate([
        ccclass
    ], Club_Apply_Join_Item);
    return Club_Apply_Join_Item;
}(cc.Component));
exports.default = Club_Apply_Join_Item;

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
        //# sourceMappingURL=Club_Apply_Join_Item.js.map
        