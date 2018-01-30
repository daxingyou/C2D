(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/Club_Record_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '55e25clAIZCa6pS4paUyfPV', 'Club_Record_Item', __filename);
// Script/SceneScript/Club/Club_Record_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Record_Item = /** @class */ (function (_super) {
    __extends(Club_Record_Item, _super);
    function Club_Record_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *索引
         *
         * @type {cc.Label}
         * @memberof Club_Record_Item
         */
        _this.lblIndex = null;
        /**
         * 房间id
         *
         * @type {cc.Label}
         * @memberof Club_Record_Item
         */
        _this.lblRoomId = null;
        /**
         * 对战时间
         *
         * @type {cc.Label}
         * @memberof Club_Record_Item
         */
        _this.lblGameTime = null;
        /**
         * 删除按钮
         *
         * @type {cc.Node}
         * @memberof Club_Record_Item
         */
        _this.node_delete = null;
        /**
         * 大赢家
         *
         * @type {cc.Node[]}
         * @memberof Club_Record_Item
         */
        _this.node_win_list = [];
        /**
         * 名字
         *
         * @type {cc.Label[]}
         * @memberof Club_Record_Item
         */
        _this.lblNameList = [];
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
    Club_Record_Item.prototype.updateItem = function (index, data, createPlayer, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;
        this.lblIndex.string = index + '';
        this.lblGameTime.string = '对战时间:  ' + dd.utils.getDateStringByTimestamp(data.recordTime, 3);
        this.lblRoomId.string = '房间号:' + data.tableId;
        var mIndex = 0;
        var maxScore = data.seats[0].score;
        for (var i = 0; i < this.lblNameList.length; i++) {
            this.node_win_list[i].active = false;
            this.lblScoreList[i].node.color = cc.Color.WHITE;
            if (data.seats[i]) {
                this.lblNameList[i].node.active = true;
                this.lblNameList[i].string = data.seats[i].nick;
                this.lblScoreList[i].string = data.seats[i].score + '';
                if (data.seats[i].score > maxScore) {
                    maxScore = data.seats[i].score;
                    mIndex = i;
                }
                //如果是自己的昵称
                if (data.seats[i].nick === dd.ud_manager.mineData.nick) {
                    this.lblScoreList[i].node.color = cc.color(77, 203, 235);
                }
            }
            else {
                this.lblNameList[i].node.active = false;
            }
        }
        if (this.node_win_list[mIndex]) {
            this.node_win_list[mIndex].active = true;
            this.lblScoreList[mIndex].node.color = cc.color(245, 152, 92);
        }
        if (this.node_delete) {
            //如果创建人是自己
            if (createPlayer === dd.ud_manager.mineData.accountId) {
                this.node_delete.active = true;
            }
            else {
                this.node_delete.active = false;
            }
        }
    };
    /**
     * 删除按钮
     *
     * @memberof Club_Member_Item
     */
    Club_Record_Item.prototype.click_btn_delete = function () {
        var _this = this;
        dd.mp_manager.playButton();
        dd.ui_manager.showAlert('确定删除当前战绩？', '战绩删除', {
            lbl_name: '确定',
            callback: function () {
                _this._target.sendDeleteRecord(_this._itemData.tableId);
            }
        }, {
            lbl_name: '再想想',
            callback: function () {
            }
        }, 1);
    };
    __decorate([
        property(cc.Label)
    ], Club_Record_Item.prototype, "lblIndex", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Record_Item.prototype, "lblRoomId", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Record_Item.prototype, "lblGameTime", void 0);
    __decorate([
        property(cc.Node)
    ], Club_Record_Item.prototype, "node_delete", void 0);
    __decorate([
        property([cc.Node])
    ], Club_Record_Item.prototype, "node_win_list", void 0);
    __decorate([
        property([cc.Label])
    ], Club_Record_Item.prototype, "lblNameList", void 0);
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
        //# sourceMappingURL=Club_Record_Item.js.map
        