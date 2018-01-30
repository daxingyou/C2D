"use strict";
cc._RF.push(module, '1fc5cfwCtBOOa9WD7WK4V+h', 'LoginCanvas');
// Script/SceneScript/Login/LoginCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var LoginCanvas = /** @class */ (function (_super) {
    __extends(LoginCanvas, _super);
    function LoginCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_login = null;
        _this.node_reg = null;
        /**
         * 手机号输入框
         *
         * @type {cc.EditBox}
         * @memberof LoginCanvas
         */
        _this.edit_phone = null;
        /**
         * 验证码输入框
         *
         * @type {cc.EditBox}
         * @memberof LoginCanvas
         */
        _this.edit_verfi = null;
        /**
         * 登录按钮
         *
         * @type {cc.Button}
         * @memberof LoginCanvas
         */
        _this.btn_login = null;
        /**
         * 获取验证码按钮
         *
         * @type {cc.Button}
         * @memberof LoginCanvas
         */
        _this.btn_verfi = null;
        /**
         * 获取验证码上的label，获取验证码倒计时
         *
         * @type {cc.Label}
         * @memberof LoginCanvas
         */
        _this.lbl_verfi = null;
        /**
         * 注册手机号
         * @type {cc.EditBox}
         * @memberof LoginCanvas
         */
        _this.edit_reg_phone = null;
        /**
         * 注册密码
         * @type {cc.EditBox}
         * @memberof LoginCanvas
         */
        _this.edit_reg_pwd = null;
        /**
         * 注册确认密码
         * @type {cc.EditBox}
         * @memberof LoginCanvas
         */
        _this.edit_reg_pwd2 = null;
        _this._isDownTime = false;
        _this._downTime = 0;
        _this._cd = 1;
        return _this;
    }
    LoginCanvas.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!dd.ui_manager.showLoading('正在连接服务器，请稍后')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connectWS()];
                    case 1:
                        connectState = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.showLogin(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示登录界面
     * @param {number} type 0=登录 1=注册
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.showLogin = function (type) {
        this.node_login.active = type === 0 ? true : false;
        this.node_reg.active = type === 1 ? true : false;
        if (type === 0) {
            if (cc.sys.localStorage.getItem('phone')) {
                this.edit_phone.string = cc.sys.localStorage.getItem('phone');
            }
            if (cc.sys.localStorage.getItem('password')) {
                this.edit_verfi.string = cc.sys.localStorage.getItem('password');
            }
        }
        else {
            this.edit_reg_phone.string = '';
            this.edit_reg_pwd.string = '';
            this.edit_reg_pwd2.string = '';
        }
    };
    /**
     * 连接游戏服务器
     *
     * @returns {Promise<boolean>}
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.connectWS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var err_1, yes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dd.ws_manager.connect(dd.config.wsUrl)];
                    case 1:
                        _a.sent(); //连接服务器
                        dd.ui_manager.hideLoading();
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        cc.log(err_1);
                        yes = {
                            lbl_name: '确定',
                            callback: function () {
                                _this.onLoad();
                            }
                        };
                        dd.ui_manager.showAlert('连接服务器失败，请确认您的网络后点击确定按钮重新连接！', '错误提示', yes);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * 发送验证码
    *
    * @param {string} phone 手机号
    * @memberof Auth_phone
    */
    LoginCanvas.prototype.sendVaildCode = function (phone) {
        this.btn_verfi.interactable = false;
        this._isDownTime = true;
        this._downTime = 60;
        this._cd = 1;
        this.lbl_verfi.string = this._downTime + 's';
        if (dd.ui_manager.showLoading()) {
            var obj = { 'phone': phone };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_GET_SMS_CODE, msg, function (flag, content) {
                if (flag === 0) {
                    cc.log(content);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
            dd.ui_manager.hideLoading();
        }
    };
    /**
     *登录手机号
     *
     * @param {string} phone 手机号
     * @param {string} code 验证码
     * @memberof Auth_phone
     */
    LoginCanvas.prototype.sendLogin = function (phone, code) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'phone': phone, 'code': code };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_LOGIN_PHONE, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    cc.sys.localStorage.setItem('phone', phone);
                    cc.sys.localStorage.setItem('password', code);
                    dd.ud_manager.mineData = content;
                    dd.ws_manager.setLoginState(true);
                    _this.turnToHome();
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     *登录手机号
     *
     * @param {string} phone 手机号
     * @param {string} code  密码
     * @memberof Auth_phone
     */
    LoginCanvas.prototype.sendRegister = function (phone, code) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'phone': phone, 'code': code };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_REGISTER, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    cc.sys.localStorage.setItem('phone', phone);
                    cc.sys.localStorage.setItem('password', code);
                    dd.ud_manager.mineData = content;
                    dd.ws_manager.setLoginState(true);
                    _this.turnToHome();
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 手机号验证
     * @param {string} sMobile
     * @returns
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.checkMobile = function (sMobile) {
        if (!(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(sMobile))) {
            dd.ui_manager.showTip("*请输入有效的手机号");
            return false;
        }
        return true;
    };
    /**
     * 登录
     *
     * @returns
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_login = function () {
        if (!this.btn_login.interactable)
            return;
        dd.mp_manager.playButton();
        var phoneStr = this.edit_phone.string.trim();
        var verfiStr = this.edit_verfi.string.trim();
        if (phoneStr === '' || phoneStr.length === 0) {
            dd.ui_manager.showTip('*请输入有效的手机号');
            return;
        }
        if (verfiStr === '' || verfiStr.length !== 6) {
            dd.ui_manager.showTip('*请输入6位密码');
            return;
        }
        this.sendLogin(phoneStr, verfiStr);
    };
    /**
     * 登录游戏
     *
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.turnToHome = function () {
        if (dd.ui_manager.showLoading())
            cc.director.loadScene('HomeScene');
    };
    LoginCanvas.prototype.update = function (dt) {
        if (this._isDownTime) {
            this._cd -= dt;
            if (this._cd <= 0) {
                this._cd = 1;
                this._downTime--;
                this.lbl_verfi.string = this._downTime + 's';
                if (this._downTime < 0) {
                    this.btn_verfi.interactable = true;
                    this.lbl_verfi.string = '获取验证码';
                }
            }
        }
        else {
            this.btn_verfi.interactable = true;
            this.lbl_verfi.string = '获取验证码';
        }
    };
    /**
     * 点击获取验证码
     *
     * @returns
     * @memberof Auth_phone
     */
    LoginCanvas.prototype.click_btn_verfi = function () {
        dd.mp_manager.playButton();
        if (!this.btn_verfi.interactable) {
            return;
        }
        var phoneStr = this.edit_phone.string.trim();
        if (phoneStr === '' || phoneStr.length === 0) {
            dd.ui_manager.showTip('*请输入有效的手机号');
            return;
        }
        if (this.checkMobile(phoneStr)) {
            this.sendVaildCode(phoneStr);
        }
    };
    /**
     * 返回到登录界面
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_return = function () {
        dd.mp_manager.playButton();
        this.showLogin(0);
    };
    /**
     * 跳转到注册界面
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_turnToReg = function () {
        dd.mp_manager.playButton();
        this.showLogin(1);
    };
    /**
     * 注册
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_reg = function () {
        var phoneRegStr = this.edit_reg_phone.string.trim();
        if (phoneRegStr === '' || phoneRegStr.length === 0) {
            dd.ui_manager.showTip('*请输入有效的手机号');
            return;
        }
        var pwdRegStr = this.edit_reg_pwd.string.trim();
        if (pwdRegStr === '' || pwdRegStr.length !== 6) {
            dd.ui_manager.showTip('*请输入6位密码');
            return;
        }
        var pwdRegStr2 = this.edit_reg_pwd2.string.trim();
        if (pwdRegStr2 !== pwdRegStr) {
            dd.ui_manager.showTip('*两次密码输入不一致');
            return;
        }
        //正则表达式检验
        if (this.checkMobile(phoneRegStr)) {
            this.sendRegister(phoneRegStr, pwdRegStr);
        }
    };
    __decorate([
        property(cc.Node)
    ], LoginCanvas.prototype, "node_login", void 0);
    __decorate([
        property(cc.Node)
    ], LoginCanvas.prototype, "node_reg", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginCanvas.prototype, "edit_phone", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginCanvas.prototype, "edit_verfi", void 0);
    __decorate([
        property(cc.Button)
    ], LoginCanvas.prototype, "btn_login", void 0);
    __decorate([
        property(cc.Button)
    ], LoginCanvas.prototype, "btn_verfi", void 0);
    __decorate([
        property(cc.Label)
    ], LoginCanvas.prototype, "lbl_verfi", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginCanvas.prototype, "edit_reg_phone", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginCanvas.prototype, "edit_reg_pwd", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginCanvas.prototype, "edit_reg_pwd2", void 0);
    LoginCanvas = __decorate([
        ccclass
    ], LoginCanvas);
    return LoginCanvas;
}(cc.Component));
exports.default = LoginCanvas;

cc._RF.pop();