"use strict";
cc._RF.push(module, '237cd91IyVFcZCsUGrYbyuQ', 'DetailItem');
// Script/SceneScript/Home/DetailItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var DetailItem = /** @class */ (function (_super) {
    __extends(DetailItem, _super);
    function DetailItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 房主头像
         *
         * @type {cc.Sprite}
         * @memberof MineItem
         */
        _this.head = null;
        /**
         * 索引
         *
         * @type {cc.Label}
         * @memberof DetailItem
         */
        _this.index = null;
        /**
         * 玩家昵称
         *
         * @type {cc.Label}
         * @memberof DetailItem
         */
        _this.nick = null;
        /**
         * 玩家输赢值
         *
         * @type {cc.Label}
         * @memberof DetailItem
         */
        _this.gold = null;
        /**
         * 游戏局数
         *
         * @type {cc.Label}
         * @memberof DetailItem
         */
        _this.num = null;
        return _this;
    }
    DetailItem.prototype.updateItem = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        item = data.item;
                        this.index.string = data.index + 1;
                        this.nick.string = dd.utils.getStringBySize(item.nick, 12);
                        this.gold.string = item.winMoney;
                        this.num.string = item.gameNum;
                        _a = this.head;
                        return [4 /*yield*/, dd.img_manager.loadURLImage(item.headImg)];
                    case 1:
                        _a.spriteFrame = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Sprite)
    ], DetailItem.prototype, "head", void 0);
    __decorate([
        property(cc.Label)
    ], DetailItem.prototype, "index", void 0);
    __decorate([
        property(cc.Label)
    ], DetailItem.prototype, "nick", void 0);
    __decorate([
        property(cc.Label)
    ], DetailItem.prototype, "gold", void 0);
    __decorate([
        property(cc.Label)
    ], DetailItem.prototype, "num", void 0);
    DetailItem = __decorate([
        ccclass
    ], DetailItem);
    return DetailItem;
}(cc.Component));
exports.default = DetailItem;

cc._RF.pop();