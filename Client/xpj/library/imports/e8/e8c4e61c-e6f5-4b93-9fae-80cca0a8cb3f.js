"use strict";
cc._RF.push(module, 'e8c4eYc5vVLk5+ugMygqMs/', 'ModuleManager');
// Script/Modules/ModuleManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./Utils");
var Config = require("./Config");
var WSManager_1 = require("./WSManager");
var IMGManager_1 = require("./IMGManager");
var UDManager_1 = require("./UDManager");
var GMManager_1 = require("./GMManager");
var UIManager_1 = require("./UIManager");
var ENCManager_1 = require("./ENCManager");
var MPManager_1 = require("./MPManager");
var CardManager_1 = require("./CardManager");
var Protocol_1 = require("./Protocol");
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
 * 扑克牌管理类
 */
exports.card_manager = null;
/**
 * 意外断线通知回调
 */
exports.cb_diconnect = function (event) {
    var yes = {
        lbl_name: '确定',
        callback: function () {
            destroy();
            cc.sys.garbageCollect();
            cc.game.restart();
        }
    };
    exports.ui_manager.showAlert('连接断开，请确认您的网络后点击确定按钮重新连接！', '错误提示', yes);
};
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
    exports.card_manager = CardManager_1.default.getInstance();
    cc.systemEvent.on('cb_diconnect', exports.cb_diconnect);
}
exports.init = init;
/**
 * 释放所有单例对象
 *
 * @export
 */
function destroy() {
    exports.img_manager.destroySelf();
    exports.ud_manager.destroySelf();
    exports.ws_manager.destroySelf();
    exports.ui_manager.destroySelf();
    exports.ud_manager.destroySelf();
    exports.gm_manager.destroySelf();
    exports.mp_manager.destroySelf();
    exports.card_manager.destroySelf();
    exports.img_manager = null;
    exports.ud_manager = null;
    exports.ws_manager = null;
    exports.ui_manager = null;
    exports.ud_manager = null;
    exports.gm_manager = null;
    exports.mp_manager = null;
    exports.card_manager = null;
    cc.systemEvent.off('cb_diconnect', exports.cb_diconnect);
}
exports.destroy = destroy;

cc._RF.pop();