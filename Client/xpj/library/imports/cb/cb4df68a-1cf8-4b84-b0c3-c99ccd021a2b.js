"use strict";
cc._RF.push(module, 'cb4dfaKHPhLhLDDyZzNAhor', 'ZJH_Room_Item');
// Script/SceneScript/ZJH/Room/ZJH_Room_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZJH_Room_Item = /** @class */ (function (_super) {
    __extends(ZJH_Room_Item, _super);
    function ZJH_Room_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 等级场
         * @type {cc.Label}
         * @memberof ZJH_Room_Item
         */
        _this.lblGrade = null;
        /**
         * 进入限制
         * @type {cc.Label}
         * @memberof ZJH_Room_Item
         */
        _this.lblLimit = null;
        /**
         * 底分
         * @type {cc.Label}
         * @memberof ZJH_Room_Item
         */
        _this.lblBase = null;
        /**
         * 封顶上限
         * @type {cc.Label}
         * @memberof ZJH_Room_Item
         */
        _this.lblMax = null;
        /**
         * 底板图片
         * @type {cc.Sprite}
         * @memberof ZJH_Room_Item
         */
        _this.img_board = null;
        /**
         * item数据
         *
         * @memberof ZJH_Room_Item
         */
        _this._itemData = null;
        /**
         * 点击回调函数
         * @memberof ZJH_Room_Item
         */
        _this._cb = null;
        return _this;
    }
    ZJH_Room_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            if (_this._cb) {
                _this._cb(_this._itemData);
            }
            event.stopPropagation();
        }, this);
    };
    /**
     * 刷新数据
     * @param {any} data
     * @param {any} target 父节点场景脚本
     * @param {any} cb
     * @memberof ZJH_Room_Item
     */
    ZJH_Room_Item.prototype.updateItem = function (data, index, target, cb) {
        this._itemData = data;
        this._cb = cb;
        if (data) {
            this.img_board.spriteFrame = target.board_img_list[index];
            this.lblGrade.string = ModuleManager_1.utils.getShowNumberString(data.joinLimit);
            this.lblBase.string = ModuleManager_1.utils.getShowNumberString(data.joinLimit) + '金币准入';
            this.lblLimit.string = '底注' + ModuleManager_1.utils.getShowNumberString(data.baseScore) + '金币';
            this.lblMax.string = '单注封顶' + ModuleManager_1.utils.getShowNumberString(data.onceMax) + '金币';
        }
    };
    __decorate([
        property(cc.Label)
    ], ZJH_Room_Item.prototype, "lblGrade", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Room_Item.prototype, "lblLimit", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Room_Item.prototype, "lblBase", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Room_Item.prototype, "lblMax", void 0);
    __decorate([
        property(cc.Sprite)
    ], ZJH_Room_Item.prototype, "img_board", void 0);
    ZJH_Room_Item = __decorate([
        ccclass
    ], ZJH_Room_Item);
    return ZJH_Room_Item;
}(cc.Component));
exports.default = ZJH_Room_Item;

cc._RF.pop();