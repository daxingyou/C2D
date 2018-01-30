(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/Club_Member_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a9cf2AXXYxMJa/e5bHv+FWf', 'Club_Member_Item', __filename);
// Script/SceneScript/Club/Club_Member_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Member_Item = /** @class */ (function (_super) {
    __extends(Club_Member_Item, _super);
    function Club_Member_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 名称
         *
         * @type {cc.Label}
         * @memberof Club_Member_Item
         */
        _this.lblName = null;
        /**
         * 游戏状态
         *
         * @type {cc.Label}
         * @memberof Club_Member_Item
         */
        _this.lblState = null;
        /**
         * 头像
         * @type {cc.Sprite}
         * @memberof Club_Member_Item
         */
        _this.headImg = null;
        /**
         * 在线状态
         * @type {cc.Toggle}
         * @memberof Club_Member_Item
         */
        _this.toggle_online = null;
        _this._itemData = null; //俱乐部信息数据
        _this._cb = null; //item点击回调
        _this._target = null;
        return _this;
    }
    Club_Member_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            if (_this._cb) {
                _this._cb(_this._itemData);
            }
            event.stopPropagation();
        }, this);
    };
    Club_Member_Item.prototype.updateItem = function (data, clubInfo, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;
        this.lblName.string = data.nick;
        this.showHead();
        switch (data.state) {
            case 0:
                this.lblState.string = '';
                this.lblState.node.color = cc.Color.WHITE;
                this.toggle_online.isChecked = false;
                break;
            case 1:
                this.lblState.string = '[空闲]';
                this.lblState.node.color = cc.Color.GRAY;
                this.toggle_online.isChecked = true;
                break;
            case 2:
                this.lblState.string = '[落座中]';
                this.lblState.node.color = cc.Color.RED;
                this.toggle_online.isChecked = true;
                break;
            default:
                break;
        }
    };
    Club_Member_Item.prototype.showHead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(this._itemData.headImg)];
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
    /**
     * 删除按钮
     *
     * @memberof Club_Member_Item
     */
    Club_Member_Item.prototype.click_btn_delete = function () {
        var _this = this;
        dd.mp_manager.playButton();
        dd.ui_manager.showAlert('确定移除成员 <color=#FFFF00>' + this._itemData.starNO + '</c>？', '移除成员', {
            lbl_name: '确定',
            callback: function () {
                _this._target.sendKikMember(_this._itemData.starNO);
            }
        }, {
            lbl_name: '再想想',
            callback: function () {
            }
        }, 1);
    };
    __decorate([
        property(cc.Label)
    ], Club_Member_Item.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Member_Item.prototype, "lblState", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Member_Item.prototype, "headImg", void 0);
    __decorate([
        property(cc.Toggle)
    ], Club_Member_Item.prototype, "toggle_online", void 0);
    Club_Member_Item = __decorate([
        ccclass
    ], Club_Member_Item);
    return Club_Member_Item;
}(cc.Component));
exports.default = Club_Member_Item;

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
        //# sourceMappingURL=Club_Member_Item.js.map
        