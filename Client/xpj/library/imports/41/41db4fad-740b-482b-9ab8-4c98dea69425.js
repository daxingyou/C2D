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
         * 扎金花游戏数据
         *
         * @type {GameData}
         * @memberof GMManager
         */
        this.zjhGameData = null;
        this.nnGameData = null;
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
        this.zjhGameData = null;
    };
    GMManager._instance = null;
    return GMManager;
}());
exports.default = GMManager;

cc._RF.pop();