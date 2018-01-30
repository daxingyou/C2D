"use strict";
cc._RF.push(module, '18b3daTnbtCWqqYj6Y5VaOE', 'LoadCanvas');
// Script/SceneScript/Load/LoadCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var LoadCanvas = /** @class */ (function (_super) {
    __extends(LoadCanvas, _super);
    function LoadCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 加载提示消息
        *
        * @type {cc.Label}
        * @memberof Loading
        */
        _this.lbl_msg = null;
        /**
         * 加载进度的bar
         *
         * @type {cc.Slider}
         * @memberof Loading
         */
        _this.loading_slider = null;
        /**
         * 加载进度
         *
         * @type {cc.ProgressBar}
         * @memberof Loading
         */
        _this.loading_pro = null;
        /**
         * 热更本地资源配置文件
         *
         * @memberof LoadCanvas
         */
        _this.manifestUrl = null;
        /**
         * 是否需要热更新
         *
         * @type {boolean}
         * @memberof LoadCanvas
         */
        _this._needUpdate = false;
        /**
         * 热更新管理器
         *
         * @type {any}
         * @memberof LoadCanvas
         */
        _this._am = null; //
        /**
         * 热更新，检测状态监听
         *
         * @type {any}
         * @memberof LoadCanvas
         */
        _this._checkListener = null;
        /**
         * 热更新，下载状态监听
         *
         * @type {any}
         * @memberof LoadCanvas
         */
        _this._updateListener = null;
        /**
         * 热更新文件下载失败次数
         *
         * @type {number}
         * @memberof LoadCanvas
         */
        _this._failCount = 0;
        _this.exit = {
            lbl_name: '确定',
            callback: function () {
                cc.game.end();
            }
        };
        return _this;
    }
    /**
     * 适配iponex的尺寸
     * @param {cc.Node} canvas
     * @memberof UIManager
     */
    LoadCanvas.prototype.fixIPoneX = function () {
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var size = cc.view.getFrameSize();
            var isIphoneX = (size.width == 2436 && size.height == 1125)
                || (size.width == 1125 && size.height == 2436);
            if (isIphoneX) {
                var cvs = this.node.getComponent(cc.Canvas);
                cvs.fitHeight = true;
                cvs.fitWidth = true;
            }
        }
    };
    LoadCanvas.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, errMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fixIPoneX();
                        //设置全局对象
                        window.dd = dd;
                        dd.init();
                        dd.config.wxState = dd.js_call_native.initWX(dd.config.app_id, dd.config.secret);
                        this.showLoadingPro(0.05, '开始初始化图像资源！');
                        index = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, dd.img_manager.initSystemHead()];
                    case 2:
                        _a.sent();
                        index++;
                        return [4 /*yield*/, dd.img_manager.initChat()];
                    case 3:
                        _a.sent();
                        index++;
                        this.showLoadingPro(0.1, '开始初始化UI资源！');
                        return [4 /*yield*/, dd.ui_manager.initUI()];
                    case 4:
                        _a.sent();
                        index++;
                        this.showLoadingPro(0.2, '开始初始化MP资源！');
                        return [4 /*yield*/, dd.mp_manager.initMP()];
                    case 5:
                        _a.sent();
                        index++;
                        this.showLoadingPro(0.3, '开始检测APP版本信息！');
                        return [4 /*yield*/, this.checkAppVersion()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        errMsg_1 = _a.sent();
                        if (index < 4) {
                            this.showLoadingPro(1, '资源初始化异常，请重启或卸载重装', true);
                        }
                        else {
                            this.showLoadingPro(1, 'app版本或资源版本检测异常,请确认您的网络是否通畅，重启游戏！', true);
                            dd.ui_manager.showAlert('app版本或资源版本检测异常,请确认您的网络是否通畅，重启游戏！', '错误提示', this.exit);
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示加载进度
     *
     * @param {number} pro (0-1之间的数值，表示进度
     * @param {string} msg 需要显示的提示语
     * @param {boolean} [isErr=false] 是否是错误消息
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.showLoadingPro = function (pro, msg, isErr) {
        if (isErr === void 0) { isErr = false; }
        this.loading_pro.progress = pro;
        this.loading_slider.progress = pro;
        this.lbl_msg.string = msg;
        if (isErr) {
            this.lbl_msg.node.color = cc.Color.RED;
        }
    };
    /**
     * 原生平台检测app版本号，web跳过
     *
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.checkAppVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ver, response, json_1, yes, no;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ver = dd.js_call_native.getAppVersion();
                        if (!(ver.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch(dd.config.checkUrl + ver)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json_1 = _a.sent();
                        dd.config.cd = json_1;
                        yes = {
                            lbl_name: '确定下载',
                            callback: function () {
                                switch (cc.sys.os) {
                                    case cc.sys.OS_ANDROID:
                                        dd.js_call_native.openBrowser(json_1.apkUrl);
                                        break;
                                    case cc.sys.OS_IOS:
                                        dd.js_call_native.openBrowser(json_1.ipaUrl);
                                        break;
                                    default:
                                        dd.js_call_native.openBrowser(json_1.apkUrl);
                                        break;
                                }
                            }
                        };
                        no = {
                            lbl_name: '继续游戏',
                            callback: function () {
                                _this.checkResVersion();
                            }
                        };
                        if (json_1.type < 0) {
                            this.showLoadingPro(1, json_1.msg, true);
                            dd.ui_manager.showAlert(json_1.msg, '错误提示', yes);
                        }
                        else if (json_1.type === 1) {
                            this.showLoadingPro(0.4, json_1.msg);
                            dd.ui_manager.showAlert(json_1.msg, '温馨提示', yes, no);
                        }
                        else {
                            this.showLoadingPro(0.4, '开始检测资源版本信息！');
                            this.checkResVersion();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.showLoadingPro(1, '检测APP版本信息服务器响应失败，请确认您的网络通畅后，重启游戏！', true);
                        dd.ui_manager.showAlert('检测APP版本信息服务器响应失败，请确认您的网络通畅后，重启游戏！', '错误提示', this.exit);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.jumpScene();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 资源版本检测，web跳过
     *
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.checkResVersion = function () {
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'platform-remote-asset');
        this._am = new jsb.AssetsManager(this.manifestUrl, storagePath);
        this._am.retain();
        if (this._am.getLocalManifest().isLoaded()) {
            this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
            cc.eventManager.addListener(this._checkListener, 1);
            this._am.checkUpdate();
        }
        else {
            this.showLoadingPro(1, '获取本地资源配置失败，请卸载重装', true);
            dd.ui_manager.showAlert('获取本地资源配置失败，请卸载重装', '错误提示', this.exit);
        }
    };
    /**
     * 资源版本检测的回调方法
     *
     * @param {any} event
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.checkCb = function (event) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log("没有发现本地的资源配置文件，热更新失败！");
                this.showLoadingPro(1, '没有发现本地的资源配置文件，请卸载重装', true);
                dd.ui_manager.showAlert('没有发现本地的资源配置文件，请卸载重装', '错误提示', this.exit);
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("下载服务端资源配置文件失败，热更新失败！");
                this.showLoadingPro(1, '下载服务端资源配置文件失败，请检查网络！', true);
                dd.ui_manager.showAlert('下载服务端资源配置文件失败，请检查网络！', '错误提示', this.exit);
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("当前已经是最新版本，跳过热更新！");
                cc.eventManager.removeListener(this._checkListener);
                this.jumpScene();
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log("开始准备热更新！");
                this.showLoadingPro(0.5, '发现新版本资源，开始准备更新！');
                this._needUpdate = true;
                cc.eventManager.removeListener(this._checkListener);
                break;
            default:
                break;
        }
    };
    LoadCanvas.prototype.update = function (dt) {
        if (this._am && this._needUpdate) {
            this._needUpdate = false;
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);
            this._failCount = 0;
            this._am.update();
        }
    };
    LoadCanvas.prototype.updateCb = function (event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log("没有发现本地的资源配置文件，热更新失败！");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var percent = 0.5 + event.getPercentByFile() * 0.5;
                cc.log('正在更新，下载进度：(' + (percent * 100).toFixed(2) + '%)');
                this.showLoadingPro(percent, '正在更新，下载进度：(' + (percent * 100).toFixed(2) + '%)');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("下载服务端资源配置文件失败，热更新失败！");
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("当前已经是最新版本，跳过热更新！");
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.log('热更新完毕：' + event.getMessage());
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                cc.log('文件下载失败：' + event.getMessage());
                this._failCount++;
                if (this._failCount < 5) {
                    this._am.downloadFailedAssets();
                }
                else {
                    cc.log('太多文件下载失败，退出热更新！');
                    this._failCount = 0;
                    failed = true;
                }
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                cc.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                cc.log(event.getMessage());
                break;
            default:
                break;
        }
        ;
        if (failed) {
            //提示用户热更失败，让用户重新启动尝试或者跳过
            cc.eventManager.removeListener(this._updateListener);
            this.showLoadingPro(1, '更新资源失败，请确认您的网络通畅后，重启游戏！', true);
            dd.ui_manager.showAlert('更新资源失败，请确认您的网络通畅后，重启游戏！', '错误提示', this.exit);
        }
        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            Array.prototype.unshift(searchPaths, newPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            this.showLoadingPro(1, '资源更新完毕，正在重启游戏！');
            setTimeout(function () {
                dd.destroy();
                cc.sys.garbageCollect();
                cc.game.restart();
            }, 1000);
        }
    };
    /**
     * 跳转到登陆场景
     *
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.jumpScene = function () {
        this.showLoadingPro(1, '初始化完毕，准备登录！');
        setTimeout(function () {
            cc.director.loadScene('LoginScene');
        }, 1000);
    };
    LoadCanvas.prototype.onDestroy = function () {
        this._am && this._am.release();
    };
    /**
     * slider的bar事件，使它不能移动
     *
     * @memberof LoadCanvas
     */
    LoadCanvas.prototype.click_btn_bar = function () {
        this.loading_slider.progress = this.loading_pro.progress;
    };
    __decorate([
        property(cc.Label)
    ], LoadCanvas.prototype, "lbl_msg", void 0);
    __decorate([
        property(cc.Slider)
    ], LoadCanvas.prototype, "loading_slider", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], LoadCanvas.prototype, "loading_pro", void 0);
    __decorate([
        property({ url: cc.RawAsset })
    ], LoadCanvas.prototype, "manifestUrl", void 0);
    LoadCanvas = __decorate([
        ccclass
    ], LoadCanvas);
    return LoadCanvas;
}(cc.Component));
exports.default = LoadCanvas;

cc._RF.pop();