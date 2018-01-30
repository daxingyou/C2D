"use strict";
cc._RF.push(module, '1586dsTyW9Dd4DpvV9XI5wK', 'Auth');
// Script/SceneScript/Home/Auth.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 实名认证的提示
         *
         * @type {cc.Label}
         * @memberof Auth
         */
        _this.lblMsg = null;
        /**
         * 名称输入框
         *
         * @type {cc.EditBox}
         * @memberof Auth
         */
        _this.eb_name = null;
        /**
         * 身份证输入框
         *
         * @type {cc.EditBox}
         * @memberof Auth
         */
        _this.eb_id = null;
        return _this;
    }
    Auth.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.mp_manager.playButton();
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        this.lblMsg.string = '';
        if (dd.ud_manager.mineData.authenticationFlag && dd.ud_manager.mineData.authenticationFlag === 1) {
            this.showMsg(1, '您已经实名认证过了哦！');
        }
        else {
            this.showMsg(0, '', 0);
        }
    };
    /**
     *  玩家实名认证
     *
     * @param {string} name 姓名
     * @param {string} cardId 身份证
     * @memberof Auth
     */
    Auth.prototype.sendAuth = function (name, cardId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'name': name, 'cardId': cardId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_REALNAME_AUTHENTICATION, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ud_manager.mineData.authenticationFlag = 1;
                    _this.showMsg(1, '实名认证成功！');
                }
                else if (flag === -1) {
                }
                else {
                    cc.log(content);
                }
            });
            dd.ui_manager.hideLoading();
        }
    };
    /**
     * 显示提示信息
     *
     * @param {number} type  0未实名 1已实名
     * @param {number} errType 0名字 1身份证
     * @param {string} msg
     * @memberof Auth
     */
    Auth.prototype.showMsg = function (type, msg, errType) {
        if (errType === void 0) { errType = 0; }
        this.lblMsg.node.opacity = 255;
        this.lblMsg.node.stopAllActions();
        this.eb_name.node.parent.active = type === 0 ? true : false;
        this.eb_id.node.parent.active = type === 0 ? true : false;
        this.lblMsg.string = msg;
        this.lblMsg.node.color = type === 0 ? cc.Color.RED : cc.Color.WHITE;
        this.lblMsg.fontSize = type === 0 ? 30 : 40;
        // let msgWidget = this.lblMsg.node.getComponent(cc.Widget);
        // msgWidget.verticalCenter = type === 0 ? -Math.abs(msgWidget.verticalCenter) : Math.abs(msgWidget.verticalCenter);
        if (type === 0) {
            this.lblMsg.node.setAnchorPoint(0, 0.5);
            this.lblMsg.node.setPositionX(-120);
            var pos = errType === 0 ? this.eb_name.node.parent.getPosition() : this.eb_id.node.parent.getPosition();
            this.lblMsg.node.setPositionY(pos.y - 50);
            var action = cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function (target, data) {
                target.opacity = 255;
                target.getComponent(cc.Label).string = '';
            }, this));
            this.lblMsg.node.runAction(action);
        }
        else {
            this.lblMsg.node.setAnchorPoint(0.5, 0.5);
            this.lblMsg.node.setPosition(cc.p(0, 30));
        }
    };
    /**
     * 认证按钮点击事件
     *
     * @memberof Auth
     */
    Auth.prototype.click_btn_auth = function () {
        dd.mp_manager.playButton();
        //如果实名认证了，就退出
        if (dd.ud_manager.mineData.authenticationFlag && dd.ud_manager.mineData.authenticationFlag === 1) {
            dd.ui_manager.isShowPopup = true;
            this.node.removeFromParent(true);
            this.node.destroy();
        }
        else {
            var nameStr = this.eb_name.string.trim();
            var idStr = this.eb_id.string.trim();
            if (nameStr === '' || nameStr.length === 0) {
                this.showMsg(0, '*姓名不能为空,请重新输入！', 0);
                return;
            }
            if (idStr === '' || idStr.length !== 18) {
                this.showMsg(0, '*请输入有效的身份证号码！', 1);
                return;
            }
            this.sendAuth(nameStr, idStr);
        }
    };
    /**
     * 退出
     *
     * @memberof Auth
     */
    Auth.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Label)
    ], Auth.prototype, "lblMsg", void 0);
    __decorate([
        property(cc.EditBox)
    ], Auth.prototype, "eb_name", void 0);
    __decorate([
        property(cc.EditBox)
    ], Auth.prototype, "eb_id", void 0);
    Auth = __decorate([
        ccclass
    ], Auth);
    return Auth;
}(cc.Component));
exports.default = Auth;

cc._RF.pop();