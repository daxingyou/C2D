"use strict";
cc._RF.push(module, '9b38fDL9tdFJ7GZeKZ7jRQg', 'Record');
// Script/SceneScript/Home/Record.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 房主头像
         *
         * @type {cc.Sprite}
         * @memberof MineItem
         */
        _this.head = null;
        /**
         * 房间名称
         *
         * @type {cc.Label}
         * @memberof Record
         */
        _this.room = null;
        /**
         * 房主昵称
         *
         * @type {cc.Label}
         * @memberof Record
         */
        _this.nick = null;
        /**
         * 玩家输赢值
         *
         * @type {cc.Label}
         * @memberof Record
         */
        _this.gold = null;
        /**
         * 结算时间
         *
         * @type {cc.Label}
         * @memberof Record
         */
        _this.time = null;
        _this._data = null;
        _this._cb = null;
        return _this;
    }
    Record.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (_this._cb) {
                _this._cb(_this._data);
            }
        }, this);
    };
    Record.prototype.updateItem = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        this._data = data;
                        this._cb = callback;
                        this.nick.string = dd.utils.getStringBySize(data.nick, 12);
                        this.time.string = dd.utils.getDateStringByTimestamp(data.recordTime);
                        this.gold.string = data.winMoney;
                        this.room.string = data.tableName;
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
    __decorate([
        property(cc.Sprite)
    ], Record.prototype, "head", void 0);
    __decorate([
        property(cc.Label)
    ], Record.prototype, "room", void 0);
    __decorate([
        property(cc.Label)
    ], Record.prototype, "nick", void 0);
    __decorate([
        property(cc.Label)
    ], Record.prototype, "gold", void 0);
    __decorate([
        property(cc.Label)
    ], Record.prototype, "time", void 0);
    Record = __decorate([
        ccclass
    ], Record);
    return Record;
}(cc.Component));
exports.default = Record;

cc._RF.pop();