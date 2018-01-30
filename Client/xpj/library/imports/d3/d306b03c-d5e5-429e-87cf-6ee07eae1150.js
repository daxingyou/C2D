"use strict";
cc._RF.push(module, 'd306bA81eVCnofPbuB+rhFQ', 'MPManager');
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
     * @returns
     * @memberof MPManager
     */
    MPManager.prototype.initMP = function () {
        this.initSetting();
        this.playBackGround();
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
                isMusic: true,
                isEffect: true
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
     * 播放背景音乐
     *
     * @returns
     * @memberof MPManager
     */
    MPManager.prototype.playBackGround = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.backgroundID !== null || !this.audioSetting.isMusic)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.loadFile('Audio/music')];
                    case 1:
                        path = _a.sent();
                        this.backgroundID = cc.audioEngine.play(path, true, 1);
                        return [2 /*return*/];
                }
            });
        });
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
    MPManager.prototype.finish = function (callback) {
        var _this = this;
        cc.audioEngine.setFinishCallback(this.effectID, function () {
            _this.effectID = null;
            if (callback) {
                callback();
            }
        });
    };
    /**
     * 播放按钮音
     *
     * @memberof MPManager
     */
    MPManager.prototype.playButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/click')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放发牌音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playFaPai = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/fapai')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放飞金币音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playCoinMove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/coinmove')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放胜利音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playWin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/win')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放失败音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playLose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/lose')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放游戏开始音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playStart = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/start')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish(callback);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放倒计时音效
     *
     * @memberof MPManager
     */
    MPManager.prototype.playTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/time')];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放炸金花的音效
     *
     * @param {string} name
     * @memberof MPManager
     */
    MPManager.prototype.playZJH = function (name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadFile('Audio/zjh/' + name)];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish(callback);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放牛牛的音效
     *
     * @param {string} name
     * @memberof MPManager
     */
    MPManager.prototype.playNN = function (name, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var paht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioSetting.isEffect) return [3 /*break*/, 2];
                        this.stopEffect();
                        return [4 /*yield*/, this.loadFile('Audio/nn/' + name)];
                    case 1:
                        paht = _a.sent();
                        this.effectID = cc.audioEngine.play(paht, false, 1);
                        this.finish(callback);
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
        this.effectID = null;
        this.backgroundID = null;
        this.audioSetting = null;
    };
    MPManager._instance = null;
    return MPManager;
}());
exports.default = MPManager;

cc._RF.pop();