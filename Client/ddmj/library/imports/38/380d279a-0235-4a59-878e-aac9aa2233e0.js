"use strict";
cc._RF.push(module, '380d2eaAjVKWYeOqsmqIjPg', 'Record_Detail');
// Script/SceneScript/Home/Record_Detail.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Record_Item = /** @class */ (function (_super) {
    __extends(Club_Record_Item, _super);
    function Club_Record_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_choose = null;
        /**
         *索引
         *
         * @type {cc.Label}
         * @memberof Club_Record_Item
         */
        _this.lblIndex = null;
        /**
         * 对战时间
         *
         * @type {cc.Label}
         * @memberof Club_Record_Item
         */
        _this.lblGameTime = null;
        /**
         * 分数
         *
         * @type {cc.Label[]}
         * @memberof Club_Record_Item
         */
        _this.lblScoreList = [];
        _this._itemData = null; //俱乐部信息数据
        _this._cb = null; //item点击回调
        _this._target = null;
        return _this;
    }
    Club_Record_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            if (_this._cb) {
                _this._cb(_this._itemData);
            }
            event.stopPropagation();
        }, this);
    };
    Club_Record_Item.prototype.updateItem = function (data, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;
        this.node_choose.active = data.gameNum % 2 === 0 ? false : true;
        this.lblIndex.string = data.gameNum + '';
        this.lblGameTime.string = dd.utils.getDateStringByTimestamp(data.recordTime, 3);
        var index = 0;
        var maxScore = data.scores[0];
        for (var i = 0; i < this.lblScoreList.length; i++) {
            this.lblScoreList[index].node.color = cc.Color.WHITE;
            this.lblScoreList[i].string = data.scores[i] + '';
            if (data.scores[i] > maxScore) {
                index = i;
                maxScore = data.scores[i];
            }
        }
        //如果是赢家
        if (this.lblScoreList[index]) {
            this.lblScoreList[index].node.color = cc.color(245, 152, 92);
        }
    };
    /**
     * 查看回放
     *
     * @memberof Club_Record_Item
     */
    Club_Record_Item.prototype.click_btn_look = function () {
        dd.mp_manager.playButton();
        this._target.sendGetVedio(this._itemData.recordFile);
    };
    __decorate([
        property(cc.Node)
    ], Club_Record_Item.prototype, "node_choose", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Record_Item.prototype, "lblIndex", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Record_Item.prototype, "lblGameTime", void 0);
    __decorate([
        property([cc.Label])
    ], Club_Record_Item.prototype, "lblScoreList", void 0);
    Club_Record_Item = __decorate([
        ccclass
    ], Club_Record_Item);
    return Club_Record_Item;
}(cc.Component));
exports.default = Club_Record_Item;

cc._RF.pop();