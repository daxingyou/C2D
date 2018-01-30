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
    LoadCanvas.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //设置全局对象
                        window.dd = dd;
                        dd.init();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, dd.ui_manager.initUI()];
                    case 2:
                        _a.sent();
                        dd.ui_manager.showLoading('正在加载,请稍后');
                        return [4 /*yield*/, dd.mp_manager.initMP()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, dd.img_manager.initIMG()];
                    case 4:
                        _a.sent();
                        if (cc.sys.isNative && cc.sys.isMobile) {
                            this.checkResVersion();
                        }
                        else {
                            this.jumpScene();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        errMsg_1 = _a.sent();
                        dd.ui_manager.showAlert('资源初始化异常，请确认您的网络是否通畅，重启游戏！', '错误提示', this.exit);
                        return [3 /*break*/, 6];
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
                dd.ui_manager.showAlert('没有发现本地的资源配置文件，请卸载重装', '错误提示', this.exit);
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("下载服务端资源配置文件失败，热更新失败！");
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
                dd.ui_manager.setLoading('发现新版本资源，开始准备更新！');
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
                dd.ui_manager.setLoading('正在更新，下载进度：(' + (percent * 100).toFixed(2) + '%)');
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
            dd.ui_manager.showAlert('更新资源失败，请确认您的网络通畅后，重启游戏！', '错误提示', this.exit);
        }
        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            Array.prototype.unshift(searchPaths, newPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
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
        setTimeout(function () {
            cc.director.loadScene('LoginScene');
        }, 1000);
    };
    LoadCanvas.prototype.onDestroy = function () {
        this._am && this._am.release();
    };
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