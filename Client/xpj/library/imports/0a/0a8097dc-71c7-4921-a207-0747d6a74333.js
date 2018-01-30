"use strict";
cc._RF.push(module, '0a809fcccdJIaIHB0fWp0Mz', 'IMGManager');
// Script/Modules/IMGManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 图片动态加载管理类
 *
 * @export
 * @class IMGManager
 */
var IMGManager = /** @class */ (function () {
    function IMGManager() {
        /**
         * 头像数组集合
         *
         * @type {cc.SpriteFrame[]}
         * @memberof IMGManager
         */
        this.headList = [];
        /**
         * 扑克牌图集
         *
         * @type {cc.SpriteFrame[][]}
         * @memberof IMGManager
         */
        this.pokerList = [];
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
    IMGManager.prototype.initIMG = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i < 5; i++) {
                            this.pokerList.push(new Array(13));
                        }
                        return [4 /*yield*/, this.initSystemHead()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initPoker()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
            cc.loader.loadRes("Atlas/head", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    reject(err.message);
                }
                else {
                    atlas.getSpriteFrames().forEach(function (spriteFrame) {
                        var num = parseInt(spriteFrame.name) - 1;
                        _this.headList[num] = spriteFrame;
                    }, _this);
                    resolve();
                }
            });
        });
    };
    /**
     * 初始化扑克牌
     *
     * @returns {Promise<void>}
     * @memberof IMGManager
     */
    IMGManager.prototype.initPoker = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes("Atlas/poker", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    reject(err.message);
                }
                else {
                    atlas.getSpriteFrames().forEach(function (spriteFrame) {
                        var num = parseInt(spriteFrame.name);
                        if (num < 2) {
                            _this.pokerList[0][num] = spriteFrame;
                        }
                        else if (num >= 2 && num < 15) {
                            _this.pokerList[1][num - 2] = spriteFrame;
                        }
                        else if (num >= 15 && num < 28) {
                            _this.pokerList[2][num - 15] = spriteFrame;
                        }
                        else if (num >= 28 && num < 41) {
                            _this.pokerList[3][num - 28] = spriteFrame;
                        }
                        else if (num >= 41 && num < 54) {
                            _this.pokerList[4][num - 41] = spriteFrame;
                        }
                        else {
                            cc.error('poker index error');
                        }
                    }, _this);
                    resolve();
                }
            });
        });
    };
    /**
     * 根据id取头像图集
     *
     * @param {number} id
     * @returns
     * @memberof IMGManager
     */
    IMGManager.prototype.getHeadById = function (id) {
        if (this.headList.length > id) {
            return this.headList[id];
        }
        else {
            return null;
        }
    };
    /**
     * 根据id获取扑克牌图集
     *
     * @param {number} id
     * @returns
     * @memberof IMGManager
     */
    IMGManager.prototype.getCardSpriteFrameById = function (id) {
        if (id < 2) {
            return this.pokerList[0][id];
        }
        else if (id >= 2 && id < 15) {
            return this.pokerList[1][id - 2];
        }
        else if (id >= 15 && id < 28) {
            return this.pokerList[2][id - 15];
        }
        else if (id >= 28 && id < 41) {
            return this.pokerList[3][id - 28];
        }
        else if (id >= 41 && id < 54) {
            return this.pokerList[4][id - 41];
        }
        else {
            return null;
        }
    };
    /**
     * 释放图片管理器的资源
     *
     * @memberof IMGManager
     */
    IMGManager.prototype.destroySelf = function () {
        while (this.headList.length > 0) {
            this.release(this.headList.pop());
        }
        while (this.pokerList.length > 0) {
            var list = this.pokerList.pop();
            while (list.length > 0) {
                this.release(list.pop());
            }
        }
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

cc._RF.pop();