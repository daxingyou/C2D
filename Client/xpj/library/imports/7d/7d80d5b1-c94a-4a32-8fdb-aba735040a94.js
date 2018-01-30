"use strict";
cc._RF.push(module, '7d80dWxyUpKMo/bq6c1BAqU', 'Game_TimeDown');
// Script/SceneScript/ZJH/Game_TimeDown.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_TimeDown = /** @class */ (function (_super) {
    __extends(Game_TimeDown, _super);
    function Game_TimeDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 倒计时图片
         * @type {cc.Sprite}
         * @memberof Game_TimeDown
         */
        _this.img_td = null;
        /**
         * 倒计时时间总数
         * @memberof Game_TimeDown
         */
        _this._timeCount = 0;
        /**
         * 当前时间
         * @memberof Game_TimeDown
         */
        _this._curTime = 0;
        /**
         * 是否播放音效
         * @memberof Game_TimeDown
         */
        _this._isPlayEfc = false;
        /**
         * 回调函数
         * @memberof Game_TimeDown
         */
        _this._cb = null;
        /**
         * 播放音效的时间
         * @type {number}
         * @memberof Game_TimeDown
         */
        _this._playTime = 0;
        return _this;
    }
    Game_TimeDown.prototype.onLoad = function () {
    };
    /**
     * 初始化数据
     * @param {number} curTime 当前时间
     * @param {number} timeCount 总共时间
     * @param {boolean} isPlayEfc 是否播放音效
     * @param {cc.Node} parentNode 父节点
     * @param {any} cb            回调函数
     * @memberof Game_TimeDown
     */
    Game_TimeDown.prototype.initData = function (curTime, timeCount, isPlayEfc, parentNode, cb) {
        this._timeCount = timeCount;
        this._curTime = curTime;
        this._isPlayEfc = isPlayEfc;
        this.node.parent = parentNode;
        this.img_td.fillRange = 1;
        this._cb = cb;
    };
    /**
     * 播放anim动画，
     * @param {any} startTime 开始位子
     * @param {any} pos       坐标点
     * @param {any} parentNode 父节点
     * @memberof Game_TimeDown
     */
    Game_TimeDown.prototype.initDataWithAnim = function (startTime, parentNode) {
        this.node.parent = parentNode;
        var anim = this.node.getComponent(cc.Animation);
        anim.play("game_djsAction", startTime);
    };
    Game_TimeDown.prototype.update = function (dt) {
        if (this._curTime <= this._timeCount) {
            this._curTime += dt;
            var pro = this._curTime / this._timeCount;
            if (pro < 0) {
                pro = 0;
            }
            else if (pro > 1) {
                pro = 1;
            }
            else {
                pro = pro;
            }
            this.img_td.fillRange = 1 - pro;
            if (pro < 0.33) {
                this.img_td.node.color = new cc.Color(31, 255, 0);
            }
            else if (pro > 0.33 && pro < 0.66) {
                this.img_td.node.color = new cc.Color(50, 160, 255);
            }
            else {
                this.img_td.node.color = new cc.Color(255, 43, 43);
            }
            if (this._isPlayEfc) {
                if (pro >= 0.5) {
                    this._playTime -= dt;
                    if (this._playTime <= 0) {
                        this._playTime = 0.8;
                        ModuleManager_1.mp_manager.playTime();
                    }
                }
            }
        }
        else {
            this.img_td.fillRange = 0;
            if (this._cb) {
                this._cb();
                //执行一次就清除，防止循环请求
                this._cb = null;
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Game_TimeDown.prototype, "img_td", void 0);
    Game_TimeDown = __decorate([
        ccclass
    ], Game_TimeDown);
    return Game_TimeDown;
}(cc.Component));
exports.default = Game_TimeDown;

cc._RF.pop();