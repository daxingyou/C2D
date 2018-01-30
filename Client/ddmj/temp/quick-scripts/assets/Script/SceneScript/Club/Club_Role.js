(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/Club_Role.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ac55+Jw75NJYdnNb/o250u', 'Club_Role', __filename);
// Script/SceneScript/Club/Club_Role.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Club_Role = /** @class */ (function (_super) {
    __extends(Club_Role, _super);
    function Club_Role() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblName = null;
        _this.lblIP = null;
        _this.lblID = null;
        _this.headImg = null;
        _this.sexImg = null;
        _this.btn_kike = null;
        _this.sex_img = [];
        _this._roleInfo = null;
        _this._canvasScript = null;
        return _this;
    }
    Club_Role.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            _this.node.active = false;
            event.stopPropagation();
        }, this);
    };
    /**
     * 显示信息
     *
     * @memberof Club_Role
     */
    Club_Role.prototype.showInfo = function (roleInfo, clubInfo, target) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._roleInfo = roleInfo;
                        this._canvasScript = target;
                        this.lblName.string = roleInfo.nick;
                        this.lblIP.string = 'IP: ' + roleInfo.clientIP;
                        this.lblID.string = 'ID: ' + roleInfo.starNO;
                        if (clubInfo.createPlayer === dd.ud_manager.mineData.accountId) {
                            if (roleInfo.starNO === dd.ud_manager.mineData.starNO) {
                                this.btn_kike.node.active = false;
                            }
                            else {
                                this.btn_kike.node.active = true;
                            }
                        }
                        else {
                            this.btn_kike.node.active = false;
                        }
                        if (roleInfo.sex > 0) {
                            this.sexImg.node.active = true;
                            this.sexImg.spriteFrame = this.sex_img[roleInfo.sex - 1];
                        }
                        else {
                            this.sexImg.node.active = false;
                        }
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(roleInfo.headImg)];
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
    Club_Role.prototype.click_btn_kike = function () {
        dd.mp_manager.playButton();
        this._canvasScript.sendKikMember(this._roleInfo.starNO);
    };
    Club_Role.prototype.click_btn_cancel = function () {
        dd.mp_manager.playButton();
        this.node.active = false;
    };
    __decorate([
        property(cc.Label)
    ], Club_Role.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Role.prototype, "lblIP", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Role.prototype, "lblID", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Role.prototype, "headImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Role.prototype, "sexImg", void 0);
    __decorate([
        property(cc.Button)
    ], Club_Role.prototype, "btn_kike", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Club_Role.prototype, "sex_img", void 0);
    Club_Role = __decorate([
        ccclass
    ], Club_Role);
    return Club_Role;
}(cc.Component));
exports.default = Club_Role;

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
        //# sourceMappingURL=Club_Role.js.map
        