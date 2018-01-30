"use strict";
cc._RF.push(module, '05e906SGI1JnLqQqiP0GJIX', 'UDManager');
// Script/Modules/UDManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户管理类
 *
 * @export
 * @class UDManager
 */
var UDManager = /** @class */ (function () {
    function UDManager() {
        /**
         * 客户端自身基本信息
         *
         * @type {UserData}
         * @memberof UDManager
         */
        this.mineData = null;
        /**
         * 大厅红点提示数据
         *
         * @type {HotTip}
         * @memberof UDManager
         */
        this.hotTip = null;
        /**
         * 公告列表
         *
         * @type {NoticeNotify}
         * @memberof UDManager
         */
        this.noticeList = [];
    }
    /**
     * 获取UDManager单例对象
     *
     * @static
     * @returns {UDManager}
     * @memberof UDManager
     */
    UDManager.getInstance = function () {
        if (UDManager._instance === null) {
            UDManager._instance = new UDManager();
        }
        return UDManager._instance;
    };
    /**
     * 清空单例对象
     *
     * @memberof UDManager
     */
    UDManager.prototype.destroySelf = function () {
        this.mineData = null;
        this.hotTip = null;
        this.noticeList.length = 0;
        UDManager._instance = null;
    };
    UDManager._instance = null;
    return UDManager;
}());
exports.default = UDManager;

cc._RF.pop();