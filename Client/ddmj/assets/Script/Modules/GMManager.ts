/**
 * 游戏管理类
 * 
 * @export
 * @class GMManager
 */
export default class GMManager {
    private static _instance: GMManager = null;
    private constructor() { }
    /**
     * 获取GMManager单例对象
     * 
     * @static
     * @returns {GMManager} 
     * @memberof GMManager
     */
    static getInstance(): GMManager {
        if (GMManager._instance === null) {
            GMManager._instance = new GMManager();
        }
        return GMManager._instance;
    }

    /**
     * 麻将游戏数据
     * 
     * @type {MJGameData}
     * @memberof GMManager
     */
    mjGameData: MJGameData = null;

    /**
     * 是否是重播麻将记录 0否 1是
     * 
     * @type {number}
     * @memberof GMManager
     */
    replayMJ: number = 0;

    /**
     * 牌的点击触摸id(不是牌的id)
     * @type {cc.Touch}
     * @memberof GMManager
     */
    touchTarget: cc.Touch = null;

    /**
     * 麻将记录数据列表
     * 
     * @type {MJGameData[]}
     * @memberof GMManager
     */
    replayDataList: ReplayData[] = [];

    /**
     * 是否重播暂停
     * 
     * @type {boolean}
     * @memberof GMManager
     */
    isReplayPause: boolean = false;
    /**
     * 清空单例对象
     * 
     * @memberof GMManager
     */
    destroySelf(): void {
        this.mjGameData = null;
        this.replayMJ = 0;
        this.replayDataList.length = 0;
        this.isReplayPause = false;
        this.touchTarget = null;
    }
}
