"use strict";
cc._RF.push(module, 'a2cbb1x4oZKRbR9C0OGtBk2', 'Game_DealScript');
// Script/SceneScript/ZJH/Game_DealScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card_sf = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
    };
    NewClass.prototype.createNode = function (pos) {
        var node = new cc.Node('card_back');
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.card_sf;
        node.parent = this.node;
        node.setPosition(pos);
        node.scale = 0;
        return node;
    };
    /**
     * 间隔调用动画
     * @param {cc.Vec2[]} posList 终点坐标点列表
     * @param {any} cb            每次动作结束的回调
     * @param {number} [repeat=1]  重复次数
     * @param {number} [interval=0.4] 以秒为单位的时间间隔
     * @param {number} [delay=0] 开始延时
     * @memberof NewClass
     */
    NewClass.prototype.showDeal = function (posList, cb, repeat, interval, delay) {
        if (repeat === void 0) { repeat = 1; }
        if (interval === void 0) { interval = 0.4; }
        if (delay === void 0) { delay = 0; }
        // 重复次数
        repeat = posList.length * repeat - 1;
        var i = 0;
        this.schedule(function () {
            var index = i % posList.length;
            if (cb) {
                var data = null;
                cb(index);
            }
            i++;
        }, interval, repeat, delay);
    };
    /**
     * 发牌动画
     *
     * @param {cc.Vec2} startP 起始的坐标点
     * @param {cc.Vec2[]} posList 终点坐标点列表
     * @param {any} eachCB 每一个动作结束的回调
     * @param {any} endCB  所有动作结束的回调
     * @param {number} [repeat=1] 重复次数
     * @param {number} [interval=0.2] 以秒为单位的时间间隔
     * @param {number} [delay=0] 开始延时
     * @memberof NewClass
     */
    NewClass.prototype.showDealFP = function (startP, posList, eachCB, endCB, repeat, interval, delay) {
        var _this = this;
        if (repeat === void 0) { repeat = 1; }
        if (interval === void 0) { interval = 0.2; }
        if (delay === void 0) { delay = 0; }
        if (posList === null || posList === undefined)
            return;
        //计算一轮的长度
        var rCount = posList.length;
        //计算需要重复多少次(循环是从0开始，所以要减1)
        repeat = posList.length * repeat - 1;
        var count = 0;
        this.schedule(function () {
            if (dd.mp_manager)
                dd.mp_manager.playFaPai();
            var cNode = _this.createNode(startP);
            //计算第几个位置
            var index = count % posList.length;
            if (posList[index]) {
                var finished = cc.callFunc(function (target, opt) {
                    if (eachCB) {
                        //计算第几轮
                        var round = Math.floor(opt.count / rCount);
                        eachCB(opt.index, round);
                    }
                    if (opt.count === repeat) {
                        if (endCB) {
                            endCB();
                        }
                    }
                    cNode.destroy();
                }, _this, { 'index': index, "count": count });
                cNode.opacity = 100;
                var spawn = cc.spawn(cc.scaleTo(0.5, 0.8, 0.8), cc.rotateBy(0.5, 540), cc.moveTo(0.5, posList[index]), cc.fadeIn(0.5));
                var myAction = cc.sequence(spawn, finished);
                cNode.runAction(myAction);
                count++;
            }
        }, interval, repeat, delay);
    };
    /**
     * 弃牌动作
     * @param {cc.Vec2} startP 起始坐标
     * @param {any} endCB  结束回调
     * @param {cc.Vec2} endP   终点坐标
     */
    NewClass.prototype.showDealDiscard = function (startP, endCB, endP) {
        if (endP === void 0) { endP = cc.v2(0, 0); }
        dd.mp_manager.playFaPai();
        var cNode = this.createNode(startP);
        cNode.scale = 0.8;
        var finished = cc.callFunc(function () {
            if (endCB) {
                endCB();
            }
            //动画执行完毕，显示遮罩
            cNode.destroy();
        }, this);
        var spawn = cc.spawn(cc.scaleTo(0.5, 0), cc.rotateBy(0.5, 540), cc.moveTo(0.5, endP));
        var myAction = cc.sequence(spawn, finished);
        cNode.runAction(myAction);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "card_sf", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();