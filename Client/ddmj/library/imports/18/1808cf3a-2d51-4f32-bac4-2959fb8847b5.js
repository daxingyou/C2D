"use strict";
cc._RF.push(module, '1808c86LVFPMrrEKVn7iEe1', 'Auth_phone');
// Script/SceneScript/Home/Auth_phone.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Auth_phone = /** @class */ (function (_super) {
    __extends(Auth_phone, _super);
    function Auth_phone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 手机绑定的节点
         *
         * @type {cc.Node}
         * @memberof Auth_phone
         */
        _this.node_auth_phone = null;
        /**
         * 已经手机绑定的节点
         *
         * @type {cc.Node}
         * @memberof Auth_phone
         */
        _this.node_bind_phone = null;
        /**
         * 手机输入框
         *
         * @type {cc.EditBox}
         * @memberof Auth_phone
         */
        _this.eb_phone = null;
        /**
         * 验证码输入框
         *
         * @type {cc.EditBox}
         * @memberof Auth_phone
         */
        _this.eb_verfi = null;
        /**
         * 验证码的文本
         *
         * @type {cc.Label}
         * @memberof Auth_phone
         */
        _this.lblVerfi = null;
        /**
         * 提示信息
         * @type {cc.Label}
         * @memberof Auth_phone
         */
        _this.lblMsg = null;
        /**
         * 手机号
         * @type {cc.Label}
         * @memberof Auth_phone
         */
        _this.lblPhone = null;
        /**
         * 获取验证码的按钮
         *
         * @type {cc.Button}
         * @memberof Auth_phone
         */
        _this.btn_verfi = null;
        _this._isDownTime = false;
        _this._downTime = 0;
        _this._cd = 1;
        return _this;
    }
    Auth_phone.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.mp_manager.playButton();
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        //如果已经绑定手机号
        if (dd.ud_manager.mineData.phone && dd.ud_manager.mineData.phone !== '') {
            this.lblPhone.string = dd.ud_manager.mineData.phone;
            this.showAuthPhone(1);
        }
        else {
            this.showAuthPhone(0);
        }
    };
    Auth_phone.prototype.update = function (dt) {
        if (this._isDownTime) {
            this._cd -= dt;
            if (this._cd <= 0) {
                this._cd = 1;
                this._downTime--;
                this.lblVerfi.string = this._downTime + 's';
                if (this._downTime < 0) {
                    this.btn_verfi.interactable = true;
                    this.lblVerfi.string = '获取验证码';
                }
            }
        }
        else {
            this.btn_verfi.interactable = true;
            this.lblVerfi.string = '获取验证码';
        }
    };
    /**
     * 显示手机绑定界面
     * @param {number} type 0未绑定 1已绑定
     * @memberof Auth_phone
     */
    Auth_phone.prototype.showAuthPhone = function (type) {
        this._isDownTime = false;
        this.node_auth_phone.active = type === 0 ? true : false;
        this.node_bind_phone.active = type === 1 ? true : false;
    };
    /**
     * 玩家手机绑定
     *
     * @param {string} phone 手机号
     * @param {string} vaildCode 验证码
     * @memberof Auth_phone
     */
    Auth_phone.prototype.sendBindPhone = function (phone, vaildCode) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'phone': phone, 'vaildCode': vaildCode };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_PHONE_BIND, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ud_manager.mineData.phone = content;
                    _this.lblPhone.string = dd.ud_manager.mineData.phone;
                    _this.showAuthPhone(1);
                }
                else if (flag === -1) {
                }
                else {
                    _this.lblMsg.string = content;
                }
            });
            dd.ui_manager.hideLoading();
        }
    };
    /**
     * 发送验证码
     *
     * @param {string} phone 手机号
     * @memberof Auth_phone
     */
    Auth_phone.prototype.sendVaildCode = function (phone) {
        var _this = this;
        this.btn_verfi.interactable = false;
        this._isDownTime = true;
        this._downTime = 60;
        this._cd = 1;
        this.lblVerfi.string = this._downTime + 's';
        if (dd.ui_manager.showLoading()) {
            var obj = { 'phone': phone };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_PHONE_GET_SMSCODE, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ud_manager.mineData.phone = content;
                }
                else if (flag === -1) {
                }
                else {
                    _this.lblMsg.string = content;
                }
            });
            dd.ui_manager.hideLoading();
        }
    };
    /**
     * 点击获取验证码
     *
     * @returns
     * @memberof Auth_phone
     */
    Auth_phone.prototype.click_btn_verfi = function () {
        dd.mp_manager.playButton();
        if (!this.btn_verfi.interactable) {
            return;
        }
        var phoneStr = this.eb_phone.string.trim();
        if (phoneStr === '' || phoneStr.length === 0) {
            this.showError(0, '*请输入有效的手机号');
            return;
        }
        if (this.checkMobile(phoneStr)) {
            this.sendVaildCode(phoneStr);
        }
    };
    /**
     * 手机号验证
     * @param {string} sMobile
     * @returns
     * @memberof LoginCanvas
     */
    Auth_phone.prototype.checkMobile = function (sMobile) {
        if (!(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(sMobile))) {
            this.showError(0, '*请输入有效的手机号');
            return false;
        }
        return true;
    };
    /**
     * 显示错误
     *
     * @param {number} type
     * @param {string} str
     * @memberof Auth_phone
     */
    Auth_phone.prototype.showError = function (type, str) {
        this.lblMsg.node.opacity = 255;
        this.lblMsg.string = str;
        var pos = type === 0 ? this.eb_phone.node.parent.getPosition() : this.eb_verfi.node.parent.getPosition();
        this.lblMsg.node.setPositionY(pos.y - 50);
        var action = cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function (target, data) {
            target.opacity = 255;
            target.getComponent(cc.Label).string = '';
        }, this));
        this.lblMsg.node.runAction(action);
    };
    /**
     * 绑定手机点击事件
     *
     * @memberof Auth_phone
     */
    Auth_phone.prototype.click_btn_bind = function () {
        dd.mp_manager.playButton();
        var phoneStr = this.eb_phone.string.trim();
        var verfiStr = this.eb_verfi.string.trim();
        if (phoneStr === '' || phoneStr.length === 0) {
            this.showError(0, '*请输入有效的手机号');
            return;
        }
        if (verfiStr === '') {
            this.showError(1, '*请输入验证码');
            return;
        }
        this.sendBindPhone(phoneStr, verfiStr);
    };
    /**
     * 已绑定
     *
     * @memberof Auth_phone
     */
    Auth_phone.prototype.click_btn_alBind = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    /**
     * 退出
     *
     * @memberof Auth_phone
     */
    Auth_phone.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Auth_phone.prototype, "node_auth_phone", void 0);
    __decorate([
        property(cc.Node)
    ], Auth_phone.prototype, "node_bind_phone", void 0);
    __decorate([
        property(cc.EditBox)
    ], Auth_phone.prototype, "eb_phone", void 0);
    __decorate([
        property(cc.EditBox)
    ], Auth_phone.prototype, "eb_verfi", void 0);
    __decorate([
        property(cc.Label)
    ], Auth_phone.prototype, "lblVerfi", void 0);
    __decorate([
        property(cc.Label)
    ], Auth_phone.prototype, "lblMsg", void 0);
    __decorate([
        property(cc.Label)
    ], Auth_phone.prototype, "lblPhone", void 0);
    __decorate([
        property(cc.Button)
    ], Auth_phone.prototype, "btn_verfi", void 0);
    Auth_phone = __decorate([
        ccclass
    ], Auth_phone);
    return Auth_phone;
}(cc.Component));
exports.default = Auth_phone;

cc._RF.pop();