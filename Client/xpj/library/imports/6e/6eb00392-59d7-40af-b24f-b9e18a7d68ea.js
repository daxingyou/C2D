"use strict";
cc._RF.push(module, '6eb00OSWddAr7JPueGKfWjq', 'Game_GoldBase');
// Script/SceneScript/ZJH/Game_GoldBase.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gatherGoldTime = 0.5; //聚集金币的时间
var flyGoldTimes = 10; //飞金币的次数
var flyBaseTime = 0.12; //飞金币的基本时间
var everyEnemyActionTime = 0.6; //每个对象动作时间
var Game_GoldBase = /** @class */ (function (_super) {
    __extends(Game_GoldBase, _super);
    function Game_GoldBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyPrefab = null;
        _this.goldImgList = [];
        /**
         * 对象池
         * @type {cc.NodePool}
         * @memberof Game_GoldBase
         */
        _this._enemyPool = new cc.NodePool('Game_Gold');
        return _this;
    }
    Game_GoldBase.prototype.onLoad = function () {
    };
    /**
     * 是否释放对象
     * @param {cc.Node} target  目标节点
     * @param {*} [cb]          回调函数
     * @param {boolean} [isRelease=true]  是否释放
     * @param {cc.Node} [parentNode=null] 父节点
     * @param {boolean} [isDestory=true]  是否销毁目标节点
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.removeAllEnemyNode = function (target, cb, isRelease, parentNode, isDestory) {
        if (isRelease === void 0) { isRelease = true; }
        if (parentNode === void 0) { parentNode = null; }
        if (isDestory === void 0) { isDestory = false; }
        while (target.childrenCount > 0) {
            var enemy = target.getChildByName('Game_Gold');
            //放到对象池中
            if (isRelease) {
                this._enemyPool.put(enemy);
            }
            else {
                //更改父节点为父节点
                enemy.parent = parentNode;
            }
            //如果没有了子节点
            if (target.childrenCount <= 0) {
                if (cb) {
                    cb();
                }
                if (isDestory) {
                    target.destroy();
                }
            }
        }
    };
    /**
     * 创建动作节点
     * @param {cc.Vec2} pos   坐标点
     * @param {cc.Node} parentNode 父节点
     * @param {cc.Vec2} acSize   动作节点大小
     * @param {*} [initCB]    创建完成的回调
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.createAcNode = function (pos, parentNode, acSize, initCB) {
        var AcNode = new cc.Node('AcNode');
        AcNode.setPosition(pos);
        AcNode.width = acSize.x;
        AcNode.height = acSize.y;
        AcNode.parent = parentNode;
        //创建完成的回调方法
        if (initCB) {
            initCB(AcNode);
        }
    };
    /**
     * 创建对象
     * @param {number} enemyType 对象类型
     * @param {cc.Node} parentNode 父节点
     * @param {*} [initCB]       回调函数
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.createEnemyNode = function (enemyType, parentNode, initCB) {
        var enemy = null;
        if (this._enemyPool.size() > 0) {
            enemy = this._enemyPool.get();
        }
        else {
            enemy = cc.instantiate(this.enemyPrefab);
        }
        var script = enemy.getComponent('Game_Gold');
        script.initData(this.goldImgList[enemyType], parentNode);
        //对象池的回调方法
        if (initCB) {
            initCB(enemy);
        }
    };
    /**
     *创建对象集
     * @param {number} enemyType 对象类型
     * @param {cc.Node} parentNode 父节点
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.createChip = function (enemyType, parentNode) {
        this.createEnemyNode(enemyType, parentNode, function (enemy) {
            // enemy.rotation = (Math.random() * 10000) % 360;
            var lr = Math.floor(Math.random() * 100 + 100) % 2;
            var betX = Math.floor(Math.random() * (parentNode.width - enemy.width) * 0.5);
            if (lr === 0) {
                betX = 0 - betX;
            }
            var betY = Math.floor(Math.random() * (parentNode.height - enemy.height) * 0.5);
            lr = Math.floor(Math.random() * 100 + 100) % 2;
            if (lr === 0) {
                betY = 0 - betY;
            }
            enemy.setPosition(cc.p(betX, betY));
        });
    };
    /**
     * 创建押注池显示金币
     * @param {number[]} numList  数字列表
     * @param {cc.Node} parentNode 父节点
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.createMoreGold = function (numList, parentNode) {
        for (var i = 0; i < numList.length; i++) {
            var num = numList[i];
            var enemyType = this.goldImgList.length - 1 - i;
            for (var j = 0; j < num; j++) {
                this.createChip(enemyType, parentNode);
            }
        }
    };
    /**
     *  删除多余的
     * @param {cc.Node} target 目标节点
     * @param {number} [max=20] 最多存在
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.deleteSpilth = function (target, max) {
        if (max === void 0) { max = 150; }
        if (target.childrenCount > max) {
            var i = 0;
            var die = target.childrenCount - max;
            while (target.childrenCount > 0) {
                var enemy = target.getChildByName('Game_Gold');
                //放到对象池中
                this._enemyPool.put(enemy);
                i++;
                if (i >= die) {
                    break;
                }
            }
        }
    };
    /**
     * 建金币并飞向下注池
     * @param {cc.Vec2} startP     起始点
     * @param {number[]} numList   数字列表 对应的是 图片列表 ，长度相等
     * @param {cc.Vec2} acSize     动作节点的大小
     * @param {cc.Node} parentNode 动作播放父节点
     * @param {cc.Node} targetNode 动作完成后金币父节点(目标节点)
     * @param {*} [cb]             回调
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.playGoldMoveToPool = function (startP, numList, acSize, parentNode, targetNode, cb) {
        var _this = this;
        this.deleteSpilth(targetNode);
        this.createAcNode(startP, parentNode, acSize, function (AcNode) {
            ModuleManager_1.mp_manager.playCoinMove();
            for (var i = 0; i < numList.length; i++) {
                var num = numList[i];
                var enemyType = _this.goldImgList.length - 1 - i;
                for (var j = 0; j < num; j++) {
                    _this.createChip(enemyType, AcNode);
                }
            }
            AcNode.scale = 0.1;
            var endP = _this.getWorldPos(targetNode.parent, targetNode.getPosition());
            var moveTo = cc.moveTo(everyEnemyActionTime, endP);
            var action = moveTo.easing(cc.easeExponentialOut());
            var spawn = cc.spawn(cc.scaleTo(0.1, 1), action);
            var finished = cc.callFunc(function () {
                _this.removeAllEnemyNode(AcNode, cb, false, targetNode, false);
            }, _this);
            var seq = cc.sequence(spawn, finished);
            AcNode.runAction(seq);
        });
    };
    /**
     * 获取世界坐标
     * @param {cc.Node} node 父节点
     * @param {cc.Vec2} pos  节点坐标
     * @returns
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.getWorldPos = function (node, pos) {
        var targetP = node.convertToWorldSpaceAR(pos);
        //依然是以屏幕左下角为起点,所以要减去一半
        targetP.x = targetP.x - this.node.width / 2;
        targetP.y = targetP.y - this.node.height / 2;
        return targetP;
    };
    /**
     * 玩家赢取所有的金币 （只有一个节点在做动作，同时到达）
     * @param {boolean} isAct      是否先播放动作，再清除对象
     * @param { cc.Vec2} endP      动作结束坐标点
     * @param {cc.Node} targetNode  目标节点
     * @param {cc.Node} parentNode  动作节点
     */
    Game_GoldBase.prototype.playAllGoldMoveToPlayer = function (isAct, endP, targetNode, parentNode) {
        var _this = this;
        if (isAct) {
            ModuleManager_1.mp_manager.playZJH('coins');
            //根据目标节点，复制一个临时节点
            var tempNode_1 = cc.instantiate(targetNode);
            var targetP = this.getWorldPos(targetNode.parent, targetNode.getPosition());
            tempNode_1.setPosition(targetP);
            tempNode_1.parent = parentNode;
            var finished = cc.callFunc(function () {
                _this.removeAllEnemyNode(tempNode_1, null, true, null, true);
            }, this);
            var moveTo = cc.moveTo(everyEnemyActionTime, endP);
            var action = moveTo.easing(cc.easeExponentialIn());
            var spawn = cc.spawn(cc.scaleTo(everyEnemyActionTime, 0.5), action);
            var seq = cc.sequence(spawn, finished);
            tempNode_1.runAction(seq);
            this.removeAllEnemyNode(targetNode);
        }
        else {
            this.removeAllEnemyNode(targetNode);
        }
    };
    /**
     * 创建多个对象，并从起始点动作到目标点
     * @param {cc.Vec2} startP   动作起始点
     * @param {cc.Vec2} endP     动作结束点
     * @param {number[]} numList    数字列表 对应的是 图片列表 ，长度相等
     * @param {cc.Vec2} acSize   动作节点大小
     * @param { cc.Node} parentNode  动作父节点
     * @param {any} cb       动作完成回调
     */
    Game_GoldBase.prototype.playGoldPosToPos = function (startP, endP, numList, acSize, parentNode, cb) {
        var _this = this;
        this.createAcNode(startP, parentNode, acSize, function (AcNode) {
            for (var i = 0; i < numList.length; i++) {
                var num = numList[i];
                var enemyType = _this.goldImgList.length - 1 - i;
                for (var j = 0; j < num; j++) {
                    _this.createChip(enemyType, AcNode);
                }
            }
            var finished = cc.callFunc(function () {
                _this.removeAllEnemyNode(AcNode, cb, true);
            }, _this);
            var action = cc.moveTo(everyEnemyActionTime, endP);
            var spawn = cc.spawn(cc.scaleTo(everyEnemyActionTime, 0.5), action);
            var seq = cc.sequence(spawn, finished);
            AcNode.runAction(seq);
        });
    };
    /**
     *  玩家赢取所有的金币 （每个金币都在做动作，不同时到达）
     * @param {cc.Vec2} endP        结束位置
     * @param {cc.Node} targetNode  目标节点
     * @param {any} startCB         第一个动作结束时的回调
     * @param {any} endCB           最后一个动作结束时的回调
     * @param {boolean} [isTogather=false]  是否聚拢
     * @param {cc.Vec2} [scopeSize=cc.v2(80, 80)] 聚拢的范围
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.playGoldMoveToPlayer = function (endP, targetNode, startCB, endCB, isTogather, scopeSize) {
        var _this = this;
        if (isTogather === void 0) { isTogather = false; }
        if (scopeSize === void 0) { scopeSize = cc.v2(60, 60); }
        if (isTogather) {
            var nodeList = targetNode.children;
            var finished = cc.callFunc(function () {
                _this.playFlyAllGoldAction(endP, targetNode, startCB, endCB);
            }, this);
            for (var i = 0; i < nodeList.length; i++) {
                var enemy = nodeList[i];
                var action = null;
                if (i !== nodeList.length - 1) {
                    if (Math.abs(enemy.x) > scopeSize.x || Math.abs(enemy.y) > scopeSize.y) {
                        action = cc.moveTo(gatherGoldTime, cc.p(Math.random() * scopeSize.x, Math.random() * scopeSize.y));
                    }
                }
                else {
                    action = cc.sequence(cc.moveTo(gatherGoldTime, cc.p(Math.random() * scopeSize.x, Math.random() * scopeSize.y)), finished);
                }
                if (action) {
                    enemy.runAction(action);
                }
            }
        }
        else {
            this.playFlyAllGoldAction(endP, targetNode, startCB, endCB);
        }
    };
    /**
     * 播放从目标节点中取出所有的 对象，飞到目标点，这个动作是异步的(不同时到达目标点)
     *
     * @param {cc.Vec2} endP
     * @param {cc.Node} targetNode
     * @param {any} startCB
     * @param {any} endCB
     * @memberof Game_GoldBase
     */
    Game_GoldBase.prototype.playFlyAllGoldAction = function (endP, targetNode, startCB, endCB) {
        var _this = this;
        var count = targetNode.childrenCount;
        //每次可以做动作的数量
        var num = Math.round(count / flyGoldTimes);
        if (num < 1) {
            num = 1;
        }
        var isStart = true;
        var nodeList = targetNode.children;
        var finished = cc.callFunc(function (enemy) {
            //动作完成,放到对象池中
            _this._enemyPool.put(enemy);
            //如果是开始
            if (isStart) {
                if (startCB) {
                    startCB();
                }
                isStart = false;
                cc.log('开始回调' + isStart);
            }
            //如果是结束
            if (targetNode.childrenCount <= 0) {
                if (endCB) {
                    endCB();
                }
                cc.log('结束回调');
            }
        }, this);
        for (var i = 0; i < nodeList.length; i++) {
            var enemy = nodeList[i];
            var moveTo = cc.moveTo(flyBaseTime * (i / num + 1), endP);
            // let action = moveTo.easing(cc.easeExponentialIn());
            var seq = cc.sequence(moveTo, finished);
            enemy.runAction(seq);
        }
    };
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: '对象预设'
        })
    ], Game_GoldBase.prototype, "enemyPrefab", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: '对象图片列表'
        })
    ], Game_GoldBase.prototype, "goldImgList", void 0);
    Game_GoldBase = __decorate([
        ccclass
    ], Game_GoldBase);
    return Game_GoldBase;
}(cc.Component));
exports.default = Game_GoldBase;

cc._RF.pop();