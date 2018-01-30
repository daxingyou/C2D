"use strict";
cc._RF.push(module, 'c1b4dDEoWlBxogBDKmtAvc9', 'EmailItem');
// Script/SceneScript/Game/EmailItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var EmailItem = /** @class */ (function (_super) {
    __extends(EmailItem, _super);
    function EmailItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 用户头像
         *
         * @type {cc.Sprite}
         * @memberof EmailItem
         */
        _this.headImg = null;
        /**
         * 显示申购信息的节点
         *
         * @type {cc.RichText}
         * @memberof EmailItem
         */
        _this.msg = null;
        /**
         * 模版数据
         *
         * @type {string}
         * @memberof EmailItem
         */
        _this.modelMsg = '玩家:<color=#D3AE6C><b><玩家昵称></b></c>,<br/>申购:<color=#D3AE6C><b><积分数量></b></c>积分,<br/>您是否同意?';
        /**
         * 申购条目对象
         *
         * @type {DzpkerOrderItem}
         * @memberof EmailItem
         */
        _this.data = null;
        /**
         * 按钮点击的回调
         *
         * @memberof EmailItem
         */
        _this.callback = null; //1是同意,2是拒绝
        return _this;
    }
    EmailItem.prototype.init = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.data = data;
                        this.callback = callback;
                        _a = this.headImg;
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 1:
                        _a.spriteFrame = _b.sent();
                        this.msg.string = this.modelMsg.replace('<玩家昵称>', dd.utils.getStringBySize(data.nick, 12)).replace('<积分数量>', data.chipNum);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击同意
     *
     * @memberof EmailItem
     */
    EmailItem.prototype.click_yes = function () {
        this.callback(1, this.data.itemId, this.node);
    };
    /**
     * 点击忽略
     *
     * @memberof EmailItem
     */
    EmailItem.prototype.click_no = function () {
        this.callback(2, this.data.itemId, this.node);
    };
    __decorate([
        property(cc.Sprite)
    ], EmailItem.prototype, "headImg", void 0);
    __decorate([
        property(cc.RichText)
    ], EmailItem.prototype, "msg", void 0);
    EmailItem = __decorate([
        ccclass
    ], EmailItem);
    return EmailItem;
}(cc.Component));
exports.default = EmailItem;

cc._RF.pop();