"use strict";
cc._RF.push(module, '41db4+tdAtIK5q4TJjeppQl', 'GMManager');
// Script/Modules/GMManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏管理类
 *
 * @export
 * @class GMManager
 */
var GMManager = /** @class */ (function () {
    function GMManager() {
        /**
         * 麻将游戏数据
         *
         * @type {MJGameData}
         * @memberof GMManager
         */
        this.mjGameData = null;
        /**
         * 是否是重播麻将记录 0否 1是
         *
         * @type {number}
         * @memberof GMManager
         */
        this.replayMJ = 0;
        /**
         * 牌的点击触摸id(不是牌的id)
         * @type {cc.Touch}
         * @memberof GMManager
         */
        this.touchTarget = null;
        /**
         * 麻将记录数据列表
         *
         * @type {MJGameData[]}
         * @memberof GMManager
         */
        this.replayDataList = [];
        /**
         * 是否重播暂停
         *
         * @type {boolean}
         * @memberof GMManager
         */
        this.isReplayPause = false;
    }
    /**
     * 获取GMManager单例对象
     *
     * @static
     * @returns {GMManager}
     * @memberof GMManager
     */
    GMManager.getInstance = function () {
        if (GMManager._instance === null) {
            GMManager._instance = new GMManager();
        }
        return GMManager._instance;
    };
    /**
     * 清空单例对象
     *
     * @memberof GMManager
     */
    GMManager.prototype.destroySelf = function () {
        this.mjGameData = null;
        this.replayMJ = 0;
        this.replayDataList.length = 0;
        this.isReplayPause = false;
        this.touchTarget = null;
    };
    GMManager._instance = null;
    return GMManager;
}());
exports.default = GMManager;

cc._RF.pop();