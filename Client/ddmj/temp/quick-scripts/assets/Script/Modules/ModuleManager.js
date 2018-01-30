(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Modules/ModuleManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e8c4eYc5vVLk5+ugMygqMs/', 'ModuleManager', __filename);
// Script/Modules/ModuleManager.ts

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var JSCallNative = require("./JSCallNative");
var NativeCallJS = require("./NativeCallJS");
var Utils = require("./Utils");
var Config = require("./Config");
var WSManager_1 = require("./WSManager");
var IMGManager_1 = require("./IMGManager");
var UDManager_1 = require("./UDManager");
var GMManager_1 = require("./GMManager");
var UIManager_1 = require("./UIManager");
var ENCManager_1 = require("./ENCManager");
var MPManager_1 = require("./MPManager");
var Protocol_1 = require("./Protocol");
/**
 * js调用native管理对象
 */
exports.js_call_native = JSCallNative;
/**
 * native调用js管理对象
 */
exports.native_call_js = NativeCallJS;
/**
 * 常用方法管理对象
 */
exports.utils = Utils;
/**
 * 配置管理对象
 */
exports.config = Config;
/**
 * 协议号枚举
 */
exports.protocol = Protocol_1.Protocol;
/**
 * ws管理单例
 */
exports.ws_manager = null;
/**
 * 图片管理单例
 */
exports.img_manager = null;
/**
 * 用户管理单例
 */
exports.ud_manager = null;
/**
 * 游戏管理单例
 */
exports.gm_manager = null;
/**
 * UI管理单例
 */
exports.ui_manager = null;
/**
 * 加密管理单例
 */
exports.enc_manager = null;
/**
 * 音频管理类
 */
exports.mp_manager = null;
/**
 * 意外断线通知回调
 */
exports.cb_diconnect = function (event) {
    // //0意外,1心跳超时,2未知
    var accountId = null;
    if (exports.ud_manager && exports.ud_manager.mineData) {
        accountId = exports.ud_manager.mineData.accountId;
    }
    exports.gm_manager.destroySelf();
    exports.ud_manager.destroySelf();
    exports.gm_manager = null;
    exports.ud_manager = null;
    exports.ui_manager.hideLoading();
    exports.ui_manager.showLoading('正在重连,请稍后');
    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var sceneName_1, obj, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.ws_manager = WSManager_1.default.getInstance();
                    exports.gm_manager = GMManager_1.default.getInstance();
                    exports.ud_manager = UDManager_1.default.getInstance();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    sceneName_1 = cc.director.getScene().name;
                    return [4 /*yield*/, exports.ws_manager.connect(exports.config.wsUrl)];
                case 2:
                    _a.sent(); //连接服务器
                    if (sceneName_1 !== 'LoginScene' && accountId) {
                        obj = {};
                        obj.accountId = accountId;
                        exports.ws_manager.sendMsg(exports.protocol.ACCOUNT_LOGIN_ACCOUNTID, JSON.stringify(obj), function (flag, content) {
                            if (flag === 0) {
                                exports.ud_manager.mineData = content;
                                exports.ws_manager.setLoginState(true);
                                //判断是否在战斗中
                                if (exports.ud_manager && exports.ud_manager.mineData && exports.ud_manager.mineData.tableId !== 0) {
                                    var obj_1 = { 'tableId': exports.ud_manager.mineData.tableId };
                                    var msg = JSON.stringify(obj_1);
                                    exports.ws_manager.sendMsg(exports.protocol.MAJIANG_ROOM_JOIN, msg, function (flag, content) {
                                        if (flag === 0) {
                                            exports.gm_manager.mjGameData = content;
                                            exports.gm_manager.replayMJ = 0;
                                            if (sceneName_1 !== 'MJScene') {
                                                cc.director.loadScene('MJScene');
                                            }
                                            else {
                                                exports.ui_manager.getCanvasNode().emit('diconnect_update');
                                                exports.ui_manager.hideLoading();
                                            }
                                        }
                                        else if (flag === -1) {
                                            errAlert();
                                        }
                                        else {
                                            if (sceneName_1 !== 'HomeScene') {
                                                cc.director.loadScene('HomeScene', function () {
                                                    exports.ui_manager.showTip('桌子已解散!');
                                                });
                                            }
                                            else {
                                                exports.ui_manager.hideLoading();
                                            }
                                        }
                                    });
                                }
                                else {
                                    var sceneName_2 = cc.director.getScene().name;
                                    if (sceneName_2 === 'MJScene') {
                                        cc.director.loadScene('HomeScene', function () {
                                            exports.ui_manager.showTip('桌子已解散!');
                                        });
                                    }
                                    else {
                                        exports.ui_manager.hideLoading();
                                    }
                                }
                            }
                            else {
                                errAlert();
                            }
                        });
                    }
                    else {
                        exports.ui_manager.hideLoading();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    errAlert();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 100);
};
function errAlert() {
    var yes = {
        lbl_name: '确定',
        callback: function () {
            cc.game.end();
        }
    };
    exports.ui_manager.showAlert('连接服务器失败，请重新启动游戏！', '错误提示', yes);
    exports.gm_manager.destroySelf();
    exports.ud_manager.destroySelf();
    exports.ws_manager.destroySelf();
    exports.gm_manager = null;
    exports.ud_manager = null;
    exports.ws_manager = null;
}
exports.errAlert = errAlert;
/**
 * 初始化单例对象
 *
 * @export
 */
function init() {
    exports.ws_manager = WSManager_1.default.getInstance();
    exports.img_manager = IMGManager_1.default.getInstance();
    exports.ud_manager = UDManager_1.default.getInstance();
    exports.ui_manager = UIManager_1.default.getInstance();
    exports.enc_manager = ENCManager_1.default.getInstance();
    exports.gm_manager = GMManager_1.default.getInstance();
    exports.mp_manager = MPManager_1.default.getInstance();
    cc.systemEvent.on('cb_diconnect', exports.cb_diconnect, this);
}
exports.init = init;
/**
 * 释放所有单例对象
 *
 * @export
 */
function destroy() {
    exports.img_manager.destroySelf();
    exports.ws_manager.destroySelf();
    exports.ui_manager.destroySelf();
    exports.ud_manager.destroySelf();
    exports.gm_manager.destroySelf();
    exports.mp_manager.destroySelf();
    exports.img_manager = null;
    exports.ws_manager = null;
    exports.ui_manager = null;
    exports.ud_manager = null;
    exports.gm_manager = null;
    exports.mp_manager = null;
    cc.systemEvent.off('cb_diconnect', exports.cb_diconnect, this);
}
exports.destroy = destroy;

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
        //# sourceMappingURL=ModuleManager.js.map
        