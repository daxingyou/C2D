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
        /**
         * 用户协议复选框
         *
         * @type {cc.Toggle}
         * @memberof LoginCanvas
         */
        _this.checkToggle = null;
        /**
         * 微信按钮
         *
         * @type {cc.Button}
         * @memberof LoginCanvas
         */
        _this.btn_wx = null;
        /**
         * 游客按钮
         *
         * @type {cc.Button}
         * @memberof LoginCanvas
         */
        _this.btn_yk = null;
        /**
         * 微信登录结果回调
         *
         * @memberof LoginCanvas
         */
        _this.cb_login = function (event) {
            dd.ui_manager.hideLoading();
            var detail = event.detail;
            if (detail.flag === 1) {
                var userInfo = detail.data;
                userInfo.headimgurl = dd.utils.getHeadImgUrl(userInfo.headimgurl);
                _this.wsLogin(dd.protocol.ACCOUNT_LOGIN_WX, userInfo);
            }
            else {
                dd.ui_manager.showTip(detail.data);
            }
        };
        return _this;
    }
    /**
     * ccc组件释放的生命周期回调
     *
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.onDestroy = function () {
        if (cc.sys.isNative && cc.sys.isMobile) {
            cc.systemEvent.off('cb_login', this.cb_login, this);
        }
    };
    LoginCanvas.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dd.ui_manager.fixIPoneX(this.node);
                        if (dd.config.wxState === 0) {
                            this.btn_wx.node.active = true;
                            this.btn_yk.node.active = false;
                        }
                        else {
                            this.btn_wx.node.active = false;
                            this.btn_yk.node.active = true;
                        }
                        if (!dd.ui_manager.showLoading('正在连接服务器，请稍后')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.connectWS()];
                    case 1:
                        connectState = _a.sent();
                        if (!(cc.sys.isNative && cc.sys.isMobile && connectState)) return [3 /*break*/, 3];
                        //注册微信登录回调
                        cc.systemEvent.on('cb_login', this.cb_login, this);
                        //微信自动登录
                        return [4 /*yield*/, this.aotuLogin()];
                    case 2:
                        //微信自动登录
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        dd.mp_manager.playBackGround();
                        return [2 /*return*/];
                }
            });
        });
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
     * 微信自动登录
     *
     * @returns {Promise<void>}
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.aotuLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, data, url_refresh, response_refresh, newToken, url_userInfo, response_userInfo, userInfo, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = cc.sys.localStorage;
                        if (!db.getItem('TokenInfo')) return [3 /*break*/, 11];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        data = JSON.parse(db.getItem('TokenInfo'));
                        url_refresh = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + dd.config.app_id + '&grant_type=refresh_token&refresh_token=' + data.refresh_token;
                        return [4 /*yield*/, fetch(url_refresh)];
                    case 2:
                        response_refresh = _a.sent();
                        if (!response_refresh.ok) return [3 /*break*/, 8];
                        return [4 /*yield*/, response_refresh.json()];
                    case 3:
                        newToken = _a.sent();
                        db.setItem('TokenInfo', JSON.stringify(newToken));
                        url_userInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + newToken.access_token + '&openid=' + newToken.openid;
                        return [4 /*yield*/, fetch(url_userInfo)];
                    case 4:
                        response_userInfo = _a.sent();
                        if (!response_userInfo.ok) return [3 /*break*/, 6];
                        return [4 /*yield*/, response_userInfo.json()];
                    case 5:
                        userInfo = _a.sent();
                        userInfo.headimgurl = dd.utils.getHeadImgUrl(userInfo.headimgurl);
                        this.wsLogin(dd.protocol.ACCOUNT_LOGIN_WX, userInfo);
                        return [3 /*break*/, 7];
                    case 6:
                        dd.ui_manager.showTip('微信用户信息获取失败，请重新授权登录');
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        dd.ui_manager.showTip('微信授权过期，请重新授权登录');
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_2 = _a.sent();
                        cc.log(err_2);
                        dd.ui_manager.showTip('微信请求异常，请重新授权登录');
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 微信登录
     *
     * @returns
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_wx = function () {
        dd.mp_manager.playButton();
        if (!this.btn_wx.interactable)
            return;
        if (dd.ui_manager.showLoading('正在拉取微信授权，请稍后')) {
            setTimeout(function () {
                dd.js_call_native.wxLogin();
            }, 1000);
        }
    };
    /**
     * ws登录请求
     *
     * @param {Protocol} msgId 协议号
     * @param {UserInfo} [info] 微信获取的数据对象
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.wsLogin = function (msgId, info) {
        if (dd.ui_manager.showLoading()) {
            var obj = {};
            if (info) {
                obj.uuid = info.unionid;
                obj.headImg = info.headimgurl;
                obj.nick = info.nickname;
                obj.sex = info.sex;
            }
            else {
                obj.uuid = this.getGuestAccount();
            }
            dd.config.voiceState = dd.js_call_native.initVoice(obj.uuid, dd.config.voice_id, dd.config.voice_key);
            if (dd.config.voiceState !== 0) {
                dd.ui_manager.showTip('语音初始化失败,正在重试');
            }
            dd.ws_manager.sendMsg(msgId, JSON.stringify(obj), function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    dd.ud_manager.mineData = content;
                    dd.ws_manager.setLoginState(true);
                    cc.director.loadScene('HomeScene');
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 游客登录
     *
     * @returns
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_btn_yk = function () {
        dd.mp_manager.playButton();
        if (!this.btn_yk.interactable)
            return;
        this.wsLogin(dd.protocol.ACCOUNT_LOGIN_TOURIST);
    };
    /**
     * 获取uuid，第一次运行创建uuid
     *
     * @returns
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.getGuestAccount = function () {
        var db = cc.sys.localStorage;
        var uuid = db.getItem('uuid');
        if (uuid && uuid.length === 32) {
            return uuid;
        }
        else {
            uuid = this.createUUID(32, 16);
            db.setItem('uuid', uuid);
            return uuid;
        }
    };
    /**
     * 创建UUID
     *
     * @param {number} len UUID长度
     * @param {number} radix 输出的进制（2,8,10,16）
     * @returns {string} 返回对应进制下制定长度的字符串
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.createUUID = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            var r = void 0;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    /**
     * 点击用户协议的复选框事件
     *
     * @memberof LoginCanvas
     */
    LoginCanvas.prototype.click_yhxy_toggle = function () {
        dd.mp_manager.playButton();
        this.btn_wx.interactable = this.checkToggle.isChecked ? true : false;
        this.btn_yk.interactable = this.checkToggle.isChecked ? true : false;
    };
    __decorate([
        property(cc.Toggle)
    ], LoginCanvas.prototype, "checkToggle", void 0);
    __decorate([
        property(cc.Button)
    ], LoginCanvas.prototype, "btn_wx", void 0);
    __decorate([
        property(cc.Button)
    ], LoginCanvas.prototype, "btn_yk", void 0);
    LoginCanvas = __decorate([
        ccclass
    ], LoginCanvas);
    return LoginCanvas;
}(cc.Component));
exports.default = LoginCanvas;

cc._RF.pop();