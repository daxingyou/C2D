"use strict";
cc._RF.push(module, '0a809fcccdJIaIHB0fWp0Mz', 'IMGManager');
// Script/Modules/IMGManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ENCManager_1 = require("./ENCManager");
/**
 * 图片动态加载管理类
 *
 * @export
 * @class IMGManager
 */
var IMGManager = /** @class */ (function () {
    function IMGManager() {
        /**
         * 系统头像
         *
         * @private
         * @type {cc.SpriteFrame}
         * @memberof IMGManager
         */
        this.headSpriteFrame = null;
        /**
         * 存放加载过的纹理
         *
         * @private
         * @type {cc.SpriteFrame[]}
         * @memberof IMGManager
         */
        this.spriteFrames = [];
        /**
         * 聊天图片数组
         *
         * @type {cc.SpriteFrame[]}
         * @memberof IMGManager
         */
        this.chatSpriteFrames = [];
    }
    /**
     * 获取IMGManager单例对象
     *
     * @static
     * @returns {IMGManager}
     * @memberof IMGManager
     */
    IMGManager.getInstance = function () {
        if (IMGManager._instance === null) {
            IMGManager._instance = new IMGManager();
        }
        return IMGManager._instance;
    };
    /**
     * 把加载成功的纹理存放到数组，待释放的时候使用
     *
     * @param {cc.SpriteFrame} spriteFrame  添加纹理
     * @memberof IMGManager
     */
    IMGManager.prototype.addSpriteFrame = function (spriteFrame) {
        var bool = this.spriteFrames.some(function (sf) {
            return sf === spriteFrame;
        });
        if (!bool)
            this.spriteFrames.push(spriteFrame);
    };
    /**
     * 初始化，动态加载系统头像
     *
     * @returns {Promise<void>}
     * @memberof IMGManager
     */
    IMGManager.prototype.initSystemHead = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Texture/SystemHead/1", cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    reject(err.message);
                }
                else {
                    _this.headSpriteFrame = spriteFrame;
                    resolve();
                }
            });
        });
    };
    /**
     * 动态加载聊天图片
     *
     * @memberof IMGManager
     */
    IMGManager.prototype.initChat = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Texture/Chat/Chat", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    reject(err.message);
                }
                else {
                    for (var i = 1; i <= 55; i++) {
                        var frame = atlas.getSpriteFrame("biaoqing_" + i);
                        if (frame)
                            _this.chatSpriteFrames.push(frame);
                    }
                    resolve();
                }
            });
        });
    };
    /**
     * 获取图片目录
     *
     * @returns {string}
     * @memberof IMGManager
     */
    IMGManager.prototype.getDirPath = function () {
        //图片保存目录
        var dirpath = jsb.fileUtils.getWritablePath() + 'img/';
        //验证路径是否存在，如果不存在则创建路径
        if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
            jsb.fileUtils.createDirectory(dirpath);
        }
        return dirpath;
    };
    /**
     * 根据url地址获取本地路径
     *
     * @param {string} url
     * @returns {string}
     * @memberof IMGManager
     */
    IMGManager.prototype.getFilePath = function (url) {
        return this.getDirPath() + ENCManager_1.default.getInstance().MD5(url) + '.jpg';
    };
    /**
     * 根据路径加载本地存储的图片
     *
     * @param {string} filePath 图片路径
     * @returns {Promise<cc.SpriteFrame>}
     * @memberof IMGManager
     */
    IMGManager.prototype.loadLocalImg = function (filePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.load(filePath, function (err, tex) {
                if (err) {
                    reject(err);
                }
                else {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    _this.addSpriteFrame(spriteFrame);
                    resolve(spriteFrame);
                }
            });
        });
    };
    /**
     * 根据url加载图片，长度为0取系统头像，大于0取微信头像
     *
     * @param {string} url 头像地址
     * @returns {Promise<cc.SpriteFrame>}
     * @memberof IMGManager
     */
    IMGManager.prototype.loadURLImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var filePath, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(url.length > 0)) return [3 /*break*/, 6];
                        if (!cc.sys.isNative) return [3 /*break*/, 4];
                        filePath = this.getFilePath(url);
                        if (!jsb.fileUtils.isFileExist(filePath)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.loadLocalImg(filePath)];
                    case 1: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = 'arraybuffer';
                            xhr.timeout = 10000;
                            xhr.onload = function () {
                                if (xhr.status === 200) {
                                    resolve(xhr.response);
                                }
                                else {
                                    reject(new TypeError('Network response failed'));
                                }
                            };
                            xhr.onerror = function () {
                                reject(new TypeError('Network request error'));
                            };
                            xhr.ontimeout = function () {
                                reject(new TypeError('Network request timeout'));
                            };
                            xhr.open("GET", url, true);
                            xhr.send();
                        })];
                    case 2:
                        buffer = _a.sent();
                        jsb.fileUtils.writeDataToFile(new Uint8Array(buffer), filePath);
                        return [2 /*return*/, this.loadLocalImg(filePath)];
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, new Promise(function (resolve, reject) {
                            cc.loader.load({ url: url, type: 'jpg' }, function (err, tex) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    var spriteFrame = new cc.SpriteFrame(tex);
                                    _this.addSpriteFrame(spriteFrame);
                                    resolve(spriteFrame);
                                }
                            });
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: //取系统头像
                    return [2 /*return*/, this.headSpriteFrame];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 释放图片管理器的资源
     *
     * @memberof IMGManager
     */
    IMGManager.prototype.destroySelf = function () {
        var _this = this;
        this.spriteFrames.forEach(function (spriteFrame) {
            _this.release(spriteFrame);
        });
        this.spriteFrames.length = 0;
        this.release(this.headSpriteFrame);
        IMGManager._instance = null;
    };
    /**
     * 释放资源及其所有的引用
     *
     * @private
     * @param {(cc.Asset | cc.RawAsset | string)} owner 需要释放的资源
     * @memberof IMGManager
     */
    IMGManager.prototype.release = function (owner) {
        var deps = cc.loader.getDependsRecursively(owner);
        cc.loader.release(deps);
    };
    IMGManager._instance = null;
    return IMGManager;
}());
exports.default = IMGManager;
//http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0 

cc._RF.pop();