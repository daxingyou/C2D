"use strict";
cc._RF.push(module, 'f1a98gzsohGCIGc3Dad77CE', 'Club_Table_Item.ts');
// Script/SceneScript/Club/Club_Table_Item.ts.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Table_Item = /** @class */ (function (_super) {
    __extends(Club_Table_Item, _super);
    function Club_Table_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 游戏状态
         *
         * @type {cc.Sprite}
         * @memberof Club_Table_Item
         */
        _this.img_state = null;
        /**
         * 头像
         * @type {[cc.Sprite]}
         * @memberof Club_Table_Item
         */
        _this.headImg_list = [];
        _this.lblGameNum = null;
        _this._itemData = null; //俱乐部信息数据
        _this._cb = null; //item点击回调
        _this._target = null;
        return _this;
    }
    Club_Table_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            if (_this._cb) {
                _this._cb(_this._itemData);
            }
            event.stopPropagation();
        }, this);
    };
    Club_Table_Item.prototype.updateItem = function (data, clubInfo, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;
        this.showInfo();
    };
    Club_Table_Item.prototype.showInfo = function () {
        var player = 0;
        for (var i = 0; i < this.headImg_list.length; i++) {
            var seatInfo = this._itemData.seats[i];
            if (seatInfo && seatInfo.accountId && seatInfo.accountId !== '' && seatInfo.accountId !== '0') {
                player++;
                this.showHead(i, seatInfo);
            }
            else {
                this.headImg_list[i].node.active = false;
            }
        }
        if (player >= this.headImg_list.length) {
            this.lblGameNum.string = '8/10局';
            this.img_state.spriteFrame = this._target.table_state_list[0];
        }
        else {
            this.lblGameNum.string = '';
            this.img_state.spriteFrame = this._target.table_state_list[1];
        }
    };
    Club_Table_Item.prototype.showHead = function (index, seatInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(seatInfo.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        if (this.headImg_list[index]) {
                            this.headImg_list[index].node.active = true;
                            this.headImg_list[index].spriteFrame = headSF;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Sprite)
    ], Club_Table_Item.prototype, "img_state", void 0);
    __decorate([
        property([cc.Sprite])
    ], Club_Table_Item.prototype, "headImg_list", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Table_Item.prototype, "lblGameNum", void 0);
    Club_Table_Item = __decorate([
        ccclass
    ], Club_Table_Item);
    return Club_Table_Item;
}(cc.Component));
exports.default = Club_Table_Item;

cc._RF.pop();