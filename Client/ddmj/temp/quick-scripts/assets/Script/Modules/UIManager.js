(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Modules/UIManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '020aaKDESZPU5JLyI9iKKyn', 'UIManager', __filename);
// Script/Modules/UIManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 管理公共UI的类
 *
 * @export
 * @class UIManager
 */
var UIManager = /** @class */ (function () {
    function UIManager() {
        var _this = this;
        /**
         * loading框预制
         *
         * @private
         * @type {cc.Prefab}
         * @memberof UIManager
         */
        this.p_loading = null;
        /**
         * Loading框是否显示
         */
        this.isShowLoading = false;
        /**
         * 警示框预制
         *
         * @private
         * @type {cc.Prefab}
         * @memberof UIManager
         */
        this.p_alert = null;
        /**
         * 漂浮框预制
         *
         * @private
         * @type {cc.Prefab}
         * @memberof UIManager
         */
        this.p_tip = null;
        /**
         * 是否可以显示弹出框 true = 显示  false = 不显示
         *
         * @type {boolean}
         * @memberof UIManager
         */
        this.isShowPopup = true;
        /**
         * 场景切换前的回调
         *
         * @memberof UIManager
         */
        this.cb_before_scene_loading = function (event) {
            _this.isShowLoading = false;
            _this.isShowPopup = true;
        };
        /**
         * 游戏每帧刷新前的回调
         *
         * @memberof UIManager
         */
        this.cb_befor_update = function (event) {
        };
        /**
         * app切换到后台的回调
         *
         * @memberof UIManager
         */
        this.cb_app_hide = function (event) {
            if (!cc.game.isPaused()) {
                cc.game.pause();
            }
        };
        /**
         * app切换到前台的回调
         *
         * @memberof UIManager
         */
        this.cb_app_show = function (event) {
            if (cc.game.isPaused()) {
                cc.game.resume();
            }
        };
    }
    /**
     * 获取WSManager单例对象
     *
     * @static
     * @returns {UIManager}
     * @memberof UIManager
     */
    UIManager.getInstance = function () {
        if (UIManager._instance === null) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    };
    /**
     * 初始化
     *
     * @memberof UIManager
     */
    UIManager.prototype.initUI = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //注册全局事件
                        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
                        cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
                        cc.game.on(cc.game.EVENT_HIDE, this.cb_app_hide, this);
                        cc.game.on(cc.game.EVENT_SHOW, this.cb_app_show, this);
                        return [4 /*yield*/, this.initLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initAlert()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initTip()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载Loading预制
     *
     * @returns {Promise<void>}
     * @memberof UIManager
     */
    UIManager.prototype.initLoading = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Prefab/Loading", cc.Prefab, function (err, prefab) {
                if (err) {
                    reject(err.message);
                    return;
                }
                _this.p_loading = prefab;
                resolve();
            });
        });
    };
    /**
     * 加载Alert预制
     *
     * @returns {Promise<void>}
     * @memberof UIManager
     */
    UIManager.prototype.initAlert = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Prefab/Alert", cc.Prefab, function (err, prefab) {
                if (err) {
                    reject(err.message);
                    return;
                }
                _this.p_alert = prefab;
                resolve();
            });
        });
    };
    /**
     * 加载Tip预制
     *
     * @returns {Promise<void>}
     * @memberof UIManager
     */
    UIManager.prototype.initTip = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Prefab/Tip", cc.Prefab, function (err, prefab) {
                if (err) {
                    reject(err.message);
                    return;
                }
                _this.p_tip = prefab;
                resolve();
            });
        });
    };
    /**
     * 获取当前显示的Canvas节点
     *
     * @returns {cc.Node}
     * @memberof UIManager
     */
    UIManager.prototype.getCanvasNode = function () {
        return cc.director.getScene().getChildByName('Canvas');
    };
    /**
     * 获取当前场景下的RootNode节点
     *
     * @returns {cc.Node}
     * @memberof UIManager
     */
    UIManager.prototype.getRootNode = function () {
        return cc.find('RootNode', this.getCanvasNode());
    };
    /**
     * 显示Loading框
     *
     * @param {string} [msg] 提示信息内容
     * @return {boolean} 是否显示成功
     * @memberof UIManager
     */
    UIManager.prototype.showLoading = function (msg) {
        if (msg === void 0) { msg = '正在加载，请稍后'; }
        if (this.isShowLoading)
            return false;
        this.isShowLoading = true;
        var node = cc.instantiate(this.p_loading);
        node.zIndex = 99;
        node.parent = this.getCanvasNode();
        var loading = node.getComponent('Loading');
        loading.setMsg(msg);
        return true;
    };
    /**
     * 隐藏Loading框
     *
     * @memberof UIManager
     */
    UIManager.prototype.hideLoading = function () {
        if (this.isShowLoading) {
            this.isShowLoading = false;
            var node = cc.find('Loading', this.getCanvasNode());
            if (node && node.isValid) {
                node.removeFromParent(true);
                node.destroy();
            }
        }
    };
    /**
     * 显示警示框
     *
     * @param {string} msg 具体信息内容
     * @param {string} title 标题
     * @param {btn_obj} [obj_yes] 点击同意按钮事件回调
     * @param {btn_obj} [obj_no] 点击拒绝按钮事件回调
     * @param {number} [ha=0] 文字对齐方式 0=左对齐 1=居中 2=右对齐
     * @memberof UIManager
     */
    UIManager.prototype.showAlert = function (msg, title, obj_yes, obj_no, ha) {
        if (ha === void 0) { ha = 1; }
        this.hideLoading();
        var node = cc.find('Alert', this.getCanvasNode());
        if (node && node.isValid) {
            node.removeFromParent(true);
            node.destroy();
        }
        node = cc.instantiate(this.p_alert);
        node.parent = this.getCanvasNode();
        var alert = node.getComponent('Alert');
        alert.showAlert(msg, title, obj_yes, obj_no, ha);
    };
    /**
     * 显示漂浮框
     *
     * @param {string} msg 提示信息内容
     * @param {number} [sTime=1] 前段动画时间
     * @param {number} [mTime=2] 悬浮时间
     * @param {number} [eTime=1] 后端动画时间
     * @memberof UIManager
     */
    UIManager.prototype.showTip = function (msg, sTime, mTime, eTime) {
        if (sTime === void 0) { sTime = 1; }
        if (mTime === void 0) { mTime = 2; }
        if (eTime === void 0) { eTime = 1; }
        var node = cc.instantiate(this.p_tip);
        node.zIndex = 99;
        node.parent = this.getCanvasNode();
        var tip = node.getComponent('Tip');
        tip.showTip(msg, sTime, mTime, eTime);
    };
    /**
     * 清理销毁
     *
     * @memberof WSManager
     */
    UIManager.prototype.destroySelf = function () {
        //注销全局事件
        cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
        cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
        cc.game.off(cc.game.EVENT_HIDE, this.cb_app_hide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.cb_app_show, this);
        this.isShowLoading = false;
        //释放loading预制
        this.release(this.p_loading);
        this.release(this.p_alert);
        this.release(this.p_tip);
        UIManager._instance = null;
    };
    /**
     * 释放资源及其所有的引用
     *
     * @private
     * @param {(cc.Asset | cc.RawAsset | string)} owner 需要释放的资源
     * @memberof IMGManager
     */
    UIManager.prototype.release = function (owner) {
        var deps = cc.loader.getDependsRecursively(owner);
        cc.loader.release(deps);
    };
    /**
     * 适配iponex的尺寸
     * @param {cc.Node} canvas
     * @memberof UIManager
     */
    UIManager.prototype.fixIPoneX = function (canvas) {
        if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
            var size = cc.view.getFrameSize();
            var isIphoneX = (size.width == 2436 && size.height == 1125)
                || (size.width == 1125 && size.height == 2436);
            if (isIphoneX) {
                var cvs = canvas.getComponent(cc.Canvas);
                cvs.fitHeight = true;
                cvs.fitWidth = true;
            }
        }
    };
    UIManager._instance = null;
    return UIManager;
}());
exports.default = UIManager;

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
        //# sourceMappingURL=UIManager.js.map
        