(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Modules/Config.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '412fdxUBotE+77s8BLjRTsP', 'Config', __filename);
// Script/Modules/Config.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 检测app版本号的请求地址
 */
exports.checkUrl = 'http://118.31.66.39:8080/checkVer?ver=';
/**
 * ws连接地址
 */
exports.wsUrl = 'ws://ws.wolfsgame.com:40000';
// export const wsUrl: string = 'ws://192.168.12.156:40000';
/**
 * 战绩录像数据获取的请求地址
 */
exports.replayUrl = 'http://118.31.66.39:8080/file/';
/**
 * 微信id和key
 */
exports.app_id = 'wx19e1237d774e5763';
exports.secret = '57ff16852f286c0e571f375b425269d0';
/**
 * 语音id和key
 */
exports.voice_id = '1126068785';
exports.voice_key = 'd926363c87ed6be99a87b11b41c42c91';
/**
 * 语音初始化状态 0=成功  其他=失败
 */
exports.voiceState = -1;
/**
 * 微信初始化状态 0 = 成功 其它失败
 */
exports.wxState = -1;
/**
 * ios内购，商品id集合，用‘,’隔开
 */
exports.productids = 'p1,p2,p3';
/**
 * node返回的信息
 */
exports.cd = null;

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
        //# sourceMappingURL=Config.js.map
        