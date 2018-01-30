"use strict";
cc._RF.push(module, 'dad2cJkro1M/qyu19BWKI+4', 'Club_Item');
// Script/SceneScript/Club/Club_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Item = /** @class */ (function (_super) {
    __extends(Club_Item, _super);
    function Club_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_odd = null; //特殊背景
        _this.lblClubName = null; //俱乐部名称
        _this.lblClubId = null; //俱乐部Id
        _this.lblClubNum = null; //俱乐部人数
        _this.lblClubMoney = null; //俱乐部房卡数量
        _this.img_use = null; //房卡使用开关
        _this.btn_use = null;
        _this._itemData = null; //俱乐部信息数据
        _this._cb = null; //item点击回调
        _this._target = null;
        return _this;
    }
    Club_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            ModuleManager_1.mp_manager.playButton();
            if (_this._cb) {
                _this._cb(_this._itemData);
            }
            event.stopPropagation();
        }, this);
    };
    Club_Item.prototype.updateItem = function (index, data, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;
        this.lblClubName.string = data.corpsName;
        this.lblClubId.string = 'ID:' + data.corpsId;
        this.lblClubNum.string = data.memberNum + '';
        this.lblClubMoney.string = data.roomCard + '';
        this.node_odd.active = index % 2 === 0 ? true : false;
        //如果群主是自己
        if (data.createPlayer === ModuleManager_1.ud_manager.mineData.accountId) {
            this.btn_use.node.active = true;
            this.img_use.spriteFrame = data.state === 0 ? this._target.club_use_on_off_list[1] : this._target.club_use_on_off_list[0];
        }
        else {
            this.btn_use.node.active = false;
            this.img_use.spriteFrame = data.state === 0 ? this._target.club_use_on_off_list[3] : this._target.club_use_on_off_list[2];
        }
    };
    Club_Item.prototype.click_check_use = function () {
        var _this = this;
        ModuleManager_1.mp_manager.playButton();
        if (this._itemData.state === 1) {
            ModuleManager_1.ui_manager.showAlert('关闭后此群不在消耗房卡，<br/>群成员将不能再创建房间，<br/>是否关闭？', '解散俱乐部', {
                lbl_name: '是',
                callback: function () {
                    _this._target.sendUseRoomCard(_this._itemData.corpsId, 0);
                    _this.img_use.spriteFrame = _this._target.club_use_on_off_list[1];
                }
            }, {
                lbl_name: '否',
                callback: function () {
                    _this.img_use.spriteFrame = _this._target.club_use_on_off_list[0];
                }
            }, 1);
        }
        else {
            this._target.sendUseRoomCard(this._itemData.corpsId, 1);
            this.img_use.spriteFrame = this._target.club_use_on_off_list[0];
        }
    };
    __decorate([
        property(cc.Node)
    ], Club_Item.prototype, "node_odd", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Item.prototype, "lblClubName", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Item.prototype, "lblClubId", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Item.prototype, "lblClubNum", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Item.prototype, "lblClubMoney", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Item.prototype, "img_use", void 0);
    __decorate([
        property(cc.Button)
    ], Club_Item.prototype, "btn_use", void 0);
    Club_Item = __decorate([
        ccclass
    ], Club_Item);
    return Club_Item;
}(cc.Component));
exports.default = Club_Item;

cc._RF.pop();