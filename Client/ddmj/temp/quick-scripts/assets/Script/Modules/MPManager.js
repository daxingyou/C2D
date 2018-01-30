(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Modules/MPManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd306bA81eVCnofPbuB+rhFQ', 'MPManager', __filename);
// Script/Modules/MPManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 音频管理类
 *
 * @export
 * @class MPManager
 */
var MPManager = /** @class */ (function () {
    function MPManager() {
        /**
         * 音频配置对象
         *
         * @type {audioSetting}
         * @memberof MPManager
         */
        this.audioSetting = null;
        /**
         * 快速发言集合
         *
         * @type {quicklySpeak[]}
         * @memberof MPManager
         */
        this.quicklyList = [];
        /**
         * 背景音乐路径
         *
         * @private
         * @type {string}
         * @memberof MPManager
         */
        this.backgroundPath = null;
        /**
         * 按钮音路径
         *
         * @private
         * @type {string}
         * @memberof MPManager
         */
        this.buttonPath = null;
        /**
         * 警告音路径
         *
         * @private
         * @type {string}
         * @memberof MPManager
         */
        this.warnPath = null;
        /**
         * 弹出音路径
         *
         * @private
         * @type {string}
         * @memberof MPManager
         */
        this.alertPath = null;
        this.selectPath = null;
        this.outPath = null;
        this.overPath = null;
        /**
         * 背景音乐播放的id
         *
         * @private
         * @type {number}
         * @memberof MPManager
         */
        this.backgroundID = null;
        /**
         * 播放音效的id(警告,按钮,弹出框)
         *
         * @private
         * @type {number}
         * @memberof MPManager
         */
        this.effectID = null;
    }
    /**
     * 获取WSManager单例对象
     *
     * @static
     * @returns {MPManager}
     * @memberof MPManager
     */
    MPManager.getInstance = function () {
        if (MPManager._instance === null) {
            MPManager._instance = new MPManager();
        }
        return MPManager._instance;
    };
    /**
     * 初始化音频管理
     *
     * @returns {Promise<void>}
     * @memberof MPManager
     */
    MPManager.prototype.initMP = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initSetting();
                        this.initQuickly();
                        return [4 /*yield*/, this.initBackGround()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初始化背景音乐
     *
     * @returns {Promise<void>}
     * @memberof MPManager
     */
    MPManager.prototype.initBackGround = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadFile('Audio/background')];
                    case 1:
                        _a.backgroundPath = _h.sent();
                        _b = this;
                        return [4 /*yield*/, this.loadFile('Audio/button')];
                    case 2:
                        _b.buttonPath = _h.sent();
                        _c = this;
                        return [4 /*yield*/, this.loadFile('Audio/warn')];
                    case 3:
                        _c.warnPath = _h.sent();
                        _d = this;
                        return [4 /*yield*/, this.loadFile('Audio/alert')];
                    case 4:
                        _d.alertPath = _h.sent();
                        _e = this;
                        return [4 /*yield*/, this.loadFile('Audio/select')];
                    case 5:
                        _e.selectPath = _h.sent();
                        _f = this;
                        return [4 /*yield*/, this.loadFile('Audio/out')];
                    case 6:
                        _f.outPath = _h.sent();
                        _g = this;
                        return [4 /*yield*/, this.loadFile('Audio/over')];
                    case 7:
                        _g.overPath = _h.sent();
                        this.playBackGround();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载音频文件
     *
     * @private
     * @param {string} path 音频路径(不带扩展名)
     * @returns {Promise<string>} 返回音频可用播放的路径
     * @memberof MPManager
     */
    MPManager.prototype.loadFile = function (path) {
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes(path, function (error, resource) {
                if (error) {
                    cc.error(error.message || error);
                    reject(error.message || error);
                }
                resolve(resource);
            });
        });
    };
    /**
     * 初始化音频配置
     *
     * @memberof MPManager
     */
    MPManager.prototype.initSetting = function () {
        var db = cc.sys.localStorage;
        var audioStr = db.getItem('audioSetting');
        if (audioStr) {
            this.audioSetting = JSON.parse(audioStr);
        }
        else {
            this.audioSetting = {
                language: 1,
                isMusic: true,
                isEffect: true,
                isSound: true
            };
            db.setItem('audioSetting', JSON.stringify(this.audioSetting));
        }
    };
    /**
     * 保存音频配置
     *
     * @memberof MPManager
     */
    MPManager.prototype.saveMPSetting = function () {
        var db = cc.sys.localStorage;
        db.setItem('audioSetting', JSON.stringify(this.audioSetting));
    };
    /**
     * 初始化快速发言
     *
     * @memberof MPManager
     */
    MPManager.prototype.initQuickly = function () {
        var quickly1 = { id: 1, msg: '不好意思，我要离开一会' };
        var quickly2 = { id: 2, msg: '不要走，决战到天亮' };
        var quickly3 = { id: 3, msg: '打一个来碰噻' };
        var quickly4 = { id: 4, msg: '大家好很高兴见到各位' };
        var quickly5 = { id: 5, msg: '哈哈，上碰下自摸' };
        var quickly6 = { id: 6, msg: '呵呵' };
        var quickly7 = { id: 7, msg: '和你合作真是太愉快了' };
        var quickly8 = { id: 8, msg: '快点吧，我等到花儿都谢了' };
        var quickly9 = { id: 9, msg: '你的牌打得太好了' };
        var quickly10 = { id: 10, msg: '下次再玩吧，我要走了' };
        var quickly11 = { id: 11, msg: '又断线了，网络怎么这么差啊' };
        this.quicklyList = [quickly1, quickly2, quickly3, quickly4, quickly5, quickly6, quickly7, quickly8, quickly9, quickly10, quickly11];
    };
    /**
     * 播放背景音乐
     *
     * @returns
     * @memberof MPManager
     */
    MPManager.prototype.playBackGround = function () {
        if (this.backgroundID !== null || this.backgroundPath === null || !this.audioSetting.isMusic)
            return;
        this.backgroundID = cc.audioEngine.play(this.backgroundPath, true, 0.5);
    };
    /**
     * 停止背景音乐
     *
     * @memberof MPManager
     */
    MPManager.prototype.stopBackGround = function () {
        if (this.backgroundID !== null) {
            cc.audioEngine.stop(this.backgroundID);
            this.backgroundID = null;
        }
    };
    /**
     * 播放报牌音(短音频没有停止)
     *
     * @param {number} type 1是四川话,2是普通话
     * @param {number} suit 1是万,2是筒,3是条,4是表态类型
     * @param {number} sex 1是男,2是女
     * @param {number} point 1-9点数(suit为1-3时)或1-4(suit为4时)1胡2杠3碰4自摸
     * @returns {Promise<void>}
     * @memberof MPManager
     */
    MPManager.prototype.playPokerSound = function (type, suit, sex, point) {
        return __awaiter(this, void 0, void 0, function () {
            var path, filePath_1, pokerSoundID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type < 1 || type > 2)
                            return [2 /*return*/];
                        if (sex < 0 || sex > 2)
                            return [2 /*return*/];
                        if (point < 1 || point > 9)
                            return [2 /*return*/];
                        if (suit < 1 || suit > 4)
                            return [2 /*return*/];
                        if (suit === 4 && point > 4)
                            return [2 /*return*/];
                        if (!(this.audioSetting.language > 0)) return [3 /*break*/, 2];
                        path = 'Audio/' + type + '/' + suit + '/' + (sex === 0 ? 2 : sex) + '/' + point;
                        return [4 /*yield*/, this.loadFile(path)];
                    case 1:
                        filePath_1 = _a.sent();
                        pokerSoundID = cc.audioEngine.play(filePath_1, false, 1);
                        cc.audioEngine.setFinishCallback(pokerSoundID, function () {
                            cc.audioEngine.uncache(filePath_1);
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 停止正在播放的音效
     *
     * @private
     * @memberof MPManager
     */
    MPManager.prototype.stopEffect = function () {
        if (this.effectID) {
            cc.audioEngine.stop(this.effectID);
            this.effectID = null;
        }
    };
    /**
     * 音效播放完毕的回调
     *
     * @private
     * @memberof MPManager
     */
    MPManager.prototype.finish = function () {
        var _this = this;
        cc.audioEngine.setFinishCallback(this.effectID, function () {
            _this.effectID = null;
        });
    };
    /**
     * 播放按钮音
     *
     * @memberof MPManager
     */
    MPManager.prototype.playButton = function () {
        if (this.audioSetting.isEffect && this.buttonPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.buttonPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放警告音
     *
     * @memberof MPManager
     */
    MPManager.prototype.playWarn = function () {
        if (this.audioSetting.isEffect && this.warnPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.warnPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放弹出框音
     *
     * @memberof MPManager
     */
    MPManager.prototype.playAlert = function () {
        if (this.audioSetting.isEffect && this.alertPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.alertPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放出牌音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playOut = function () {
        if (this.audioSetting.isEffect && this.outPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.outPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放选中牌音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playSelect = function () {
        if (this.audioSetting.isEffect && this.selectPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.selectPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放结算音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playOver = function () {
        if (this.audioSetting.isEffect && this.overPath) {
            this.stopEffect();
            this.effectID = cc.audioEngine.play(this.overPath, false, 1);
            this.finish();
        }
    };
    /**
     * 播放快速发言
     *
     * @param {number} sex 1是男,2是女
     * @param {number} id 1-11的数字
     * @returns {Promise<void>}
     * @memberof MPManager
     */
    MPManager.prototype.playQuicklySound = function (sex, id) {
        return __awaiter(this, void 0, void 0, function () {
            var path, filePath_2, pokerSoundID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sex < 0 || sex > 2)
                            return [2 /*return*/];
                        if (id < 0 || id > 11)
                            return [2 /*return*/];
                        if (!(this.audioSetting.language > 0)) return [3 /*break*/, 2];
                        path = 'Audio/' + 3 + '/' + (sex === 0 ? 2 : sex) + '/' + id;
                        return [4 /*yield*/, this.loadFile(path)];
                    case 1:
                        filePath_2 = _a.sent();
                        pokerSoundID = cc.audioEngine.play(filePath_2, false, 1);
                        cc.audioEngine.setFinishCallback(pokerSoundID, function () {
                            cc.audioEngine.uncache(filePath_2);
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 释放销毁
     *
     * @memberof MPManager
     */
    MPManager.prototype.destroySelf = function () {
        cc.audioEngine.uncacheAll();
        this.backgroundPath = null;
        this.buttonPath = null;
        this.warnPath = null;
        this.alertPath = null;
        this.outPath = null;
        this.selectPath = null;
        this.overPath = null;
        this.effectID = null;
        this.backgroundID = null;
        this.audioSetting = null;
        this.quicklyList.length = 0;
    };
    MPManager._instance = null;
    return MPManager;
}());
exports.default = MPManager;

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
        //# sourceMappingURL=MPManager.js.map
        