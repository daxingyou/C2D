"use strict";
cc._RF.push(module, '79d64lupYFIarEc9yEY2CzC', 'Club_Join');
// Script/SceneScript/Club/Club_Join.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.edit_clubId = null;
        _this.node_club_info = null;
        _this.lblClubName = null;
        _this.lblClubNum = null;
        _this.lblErr = null;
        _this.lblBtnName1 = null;
        _this.lblBtnName2 = null;
        _this._clubInfo = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            _this.node.active = false;
            event.stopPropagation();
        }, this);
        this.showLayer(0);
    };
    NewClass.prototype.showLayer = function (type) {
        this.edit_clubId.string = '';
        this.lblErr.string = '';
        this.edit_clubId.node.active = type === 0 ? true : false;
        this.node_club_info.active = type === 1 ? true : false;
        this.lblBtnName1.string = type === 0 ? '搜索俱乐部' : '确认加入';
        this.lblBtnName2.string = type === 0 ? '取消搜索' : '取消加入';
    };
    /**
      * 根据俱乐部id获取俱乐部信息
      *
      * @memberof Room_Join_Club
      */
    NewClass.prototype.sendGetClubByClubId = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_GET_CORPS_DETAILED, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    var data = content;
                    if (data) {
                        _this._clubInfo = data;
                        _this.showLayer(1);
                        _this.showClubInfo(data);
                    }
                }
                else if (flag === -1) {
                }
                else {
                    _this.lblErr.string = '*' + content;
                }
            });
        }
    };
    /**
     * 发送加入俱乐部申请
     * @memberof NewClass
     */
    NewClass.prototype.sendJoinClub = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': this._clubInfo.corpsId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_QUEST_JOIN, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    dd.ui_manager.showTip('已提交您的申请');
                    _this.node.active = false;
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
            });
        }
    };
    /**
     * 显示俱乐部信息
     *
     * @param {CorpsDetailed} data
     * @memberof NewClass
     */
    NewClass.prototype.showClubInfo = function (data) {
        this.lblClubName.string = data.corpsName;
        if (data.members) {
            this.lblClubNum.string = data.members.length + '';
        }
        else {
            this.lblClubNum.string = '0';
        }
    };
    NewClass.prototype.click_btn_ok = function () {
        dd.mp_manager.playButton();
        if (this.node_club_info.active) {
            this.sendJoinClub();
        }
        else {
            var clubId = this.edit_clubId.string.trim();
            if (clubId === '') {
                this.lblErr.string = '*请输入俱乐部ID';
                return;
            }
            this.sendGetClubByClubId(clubId);
        }
    };
    NewClass.prototype.click_btn_cancel = function () {
        dd.mp_manager.playButton();
        if (this.node_club_info.active) {
            this.showLayer(0);
        }
        else {
            this.node.active = false;
        }
    };
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "edit_clubId", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "node_club_info", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblClubName", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblClubNum", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblErr", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblBtnName1", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lblBtnName2", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();