"use strict";
cc._RF.push(module, '2d2cdz/tFpPNrbLof433eqy', 'Club_Apply_Join');
// Script/SceneScript/Club/Club_Apply_Join.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Club_Apply_Join = /** @class */ (function (_super) {
    __extends(Club_Apply_Join, _super);
    function Club_Apply_Join() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTip = null;
        _this.svNode_apply = null;
        _this.apply_prefab = null;
        /**
         * 俱乐部信息
         *
         * @type {CorpsVoInner}
         * @memberof Club
         */
        _this._clubInfo = null;
        _this._applyList = [];
        return _this;
    }
    Club_Apply_Join.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            _this.node.active = false;
            event.stopPropagation();
        }, this);
    };
    /**
     * 初始化数据
     * @param {CorpsVoInner} clubInfo
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.initData = function (clubInfo) {
        this._clubInfo = clubInfo;
        this.sendGetApplyInfo();
    };
    /**
     * 获取申请列表
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.sendGetApplyInfo = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': this._clubInfo.corpsId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_GET_QUESTJOIN_LIST, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.showApplyList(content);
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
     * 发送申请回复
     * @param {string} starNO 玩家Id,'0'就表示全部
     * @param {number} bt  (0=拒绝,1=同意)
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.sendApplyAnwser = function (starNO, bt) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = {
                'corpsId': this._clubInfo.corpsId,
                'starNO': starNO,
                'bt': bt
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_QUEST_JOIN_BT, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.sendGetApplyInfo();
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
     * 显示申请列表
     * @param {any} data
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.showApplyList = function (data) {
        this.svNode_apply.content.removeAllChildren();
        if (data && data.items) {
            this._applyList = data.items;
            this.lblTip.node.active = false;
            for (var i = 0; i < data.items.length; i++) {
                var apply = cc.instantiate(this.apply_prefab);
                apply.parent = this.svNode_apply.content;
                var apply_script = apply.getComponent('Club_Apply_Join_Item');
                apply_script.updateItem(data.items[i], this);
            }
        }
        else {
            this.lblTip.node.active = true;
        }
    };
    /**
     * 全部拒绝
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.click_btn_refuseAll = function () {
        dd.mp_manager.playButton();
        if (this._applyList.length === 0)
            return;
        this.sendApplyAnwser('0', 0);
    };
    /**
     * 全部通过
     * @memberof Club_Apply_Join
     */
    Club_Apply_Join.prototype.click_btn_agreeAll = function () {
        dd.mp_manager.playButton();
        if (this._applyList.length === 0)
            return;
        this.sendApplyAnwser('0', 1);
    };
    __decorate([
        property(cc.Label)
    ], Club_Apply_Join.prototype, "lblTip", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Club_Apply_Join.prototype, "svNode_apply", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club_Apply_Join.prototype, "apply_prefab", void 0);
    Club_Apply_Join = __decorate([
        ccclass
    ], Club_Apply_Join);
    return Club_Apply_Join;
}(cc.Component));
exports.default = Club_Apply_Join;

cc._RF.pop();