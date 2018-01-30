"use strict";
cc._RF.push(module, '11b14gRDmFMJ6PrTExKBiJh', 'Role');
// Script/SceneScript/Home/Role.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblName = null;
        _this.lblIP = null;
        _this.lblID = null;
        _this.headImg = null;
        _this.sexImg = null;
        _this.sex_img = [];
        return _this;
    }
    Role.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
    };
    /**
     * 显示信息
     *
     * @memberof Role
     */
    Role.prototype.showInfo = function (roleInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lblName.string = roleInfo.nick;
                        this.lblIP.string = 'IP: ' + roleInfo.clientIP;
                        this.lblID.string = 'ID: ' + roleInfo.starNO;
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
    __decorate([
        property(cc.Label)
    ], Role.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Role.prototype, "lblIP", void 0);
    __decorate([
        property(cc.Label)
    ], Role.prototype, "lblID", void 0);
    __decorate([
        property(cc.Sprite)
    ], Role.prototype, "headImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], Role.prototype, "sexImg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Role.prototype, "sex_img", void 0);
    Role = __decorate([
        ccclass
    ], Role);
    return Role;
}(cc.Component));
exports.default = Role;

cc._RF.pop();