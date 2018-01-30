"use strict";
cc._RF.push(module, 'c49434OQu1NBbZM9l00wtEt', 'MineItem');
// Script/SceneScript/Home/MineItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MineItem = /** @class */ (function (_super) {
    __extends(MineItem, _super);
    function MineItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 房主头像
         *
         * @type {cc.Sprite}
         * @memberof MineItem
         */
        _this.head = null;
        /**
         * 房主昵称
         *
         * @type {cc.Label}
         * @memberof MineItem
         */
        _this.nick = null;
        /**
         * 大小盲注
         *
         * @type {cc.Label}
         * @memberof MineItem
         */
        _this.blind = null;
        /**
         * 最小买入
         *
         * @type {cc.Label}
         * @memberof MineItem
         */
        _this.min = null;
        /**
         * 剩余时间
         *
         * @type {cc.Label}
         * @memberof MineItem
         */
        _this.time = null;
        /**
         * 现有人数
         *
         * @type {cc.Label}
         * @memberof MineItem
         */
        _this.count = null;
        /**
         * 我的牌局对象
         *
         * @type {JoinedTableItem}
         * @memberof MineItem
         */
        _this.data = null;
        /**
         * 点击节点触发的回调方法
         *
         * @type {Function}
         * @memberof MineItem
         */
        _this.callback = null;
        return _this;
    }
    MineItem.prototype.updateItem = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.data = data;
                        this.callback = callback;
                        if (!this.data) return [3 /*break*/, 2];
                        this.nick.string = dd.utils.getStringBySize(data.nick, 12);
                        this.blind.string = data.small + '/' + data.big;
                        this.min.string = data.minJoin.toString();
                        this.count.string = data.currPlayer + '/' + data.seatNum;
                        _a = this.head;
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 1:
                        _a.spriteFrame = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MineItem.prototype.update = function (dt) {
        if (this.data) {
            var endTime = Number(this.data.vaildTime);
            if (endTime > 0) {
                endTime -= dt * 1000;
                if (endTime < 0) {
                    endTime = 0;
                }
                this.data.vaildTime = endTime.toString();
                this.time.string = dd.utils.getCountDownString(Number(this.data.vaildTime));
            }
            else {
                this.data = null;
                this.node.destroy();
            }
        }
    };
    /**
     * 点击当前节点
     *
     * @memberof MineItem
     */
    MineItem.prototype.click_item = function () {
        if (this.callback) {
            this.callback(this.data);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], MineItem.prototype, "head", void 0);
    __decorate([
        property(cc.Label)
    ], MineItem.prototype, "nick", void 0);
    __decorate([
        property(cc.Label)
    ], MineItem.prototype, "blind", void 0);
    __decorate([
        property(cc.Label)
    ], MineItem.prototype, "min", void 0);
    __decorate([
        property(cc.Label)
    ], MineItem.prototype, "time", void 0);
    __decorate([
        property(cc.Label)
    ], MineItem.prototype, "count", void 0);
    MineItem = __decorate([
        ccclass
    ], MineItem);
    return MineItem;
}(cc.Component));
exports.default = MineItem;

cc._RF.pop();