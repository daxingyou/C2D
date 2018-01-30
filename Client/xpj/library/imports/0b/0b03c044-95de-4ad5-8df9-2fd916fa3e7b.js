"use strict";
cc._RF.push(module, '0b03cBEld5K1Y35L9kW+j57', 'NNRoomCanvas');
// Script/SceneScript/NN/NNRoomCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var NNRoomCanvas = /** @class */ (function (_super) {
    __extends(NNRoomCanvas, _super);
    function NNRoomCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家名称
         *
         * @type {cc.Label}
         * @memberof
         */
        _this.lblName = null;
        /**
         * 玩家金币
         *
         * @type {cc.Label}
         * @memberof
         */
        _this.lblGold = null;
        /**
         * 玩家ID
         *
         * @type {cc.Label}
         * @memberof
         */
        _this.lblStarNo = null;
        /**
         * 玩家头像
         *
         * @type {cc.Sprite}
         * @memberof
         */
        _this.headImg = null;
        /**
         * 房间类型
         *
         * @type {cc.Node[]}
         * @memberof NNRoomCanvas
         */
        _this.typeNodes = [];
        /**
         * 房间等级
         *
         * @type {cc.Sprite}
         * @memberof NNRoomCanvas
         */
        _this.roomTitle = null;
        /**
         * 房间等级图集
         *
         * @type {cc.SpriteFrame[]}
         * @memberof NNRoomCanvas
         */
        _this.roomSpriteFrame = [];
        /**
         * 桌子图片(空,1,2)
         *
         * @type {cc.SpriteFrame[]}
         * @memberof NNRoomCanvas
         */
        _this.tableSpriteFrame = [];
        /**
         * 桌子预制节点
         *
         * @type {cc.Prefab}
         * @memberof NNRoomCanvas
         */
        _this.tablePrefab = null;
        /**
         * 桌子列表层
         *
         * @type {cc.Node}
         * @memberof NNRoomCanvas
         */
        _this.tableLayer = null;
        /**
         * 是否需要等待,停止响应后续的点击事件
         *
         * @type {boolean}
         * @memberof NNRoomCanvas
         */
        _this.needWait = false;
        /**
         * 当前展示的桌子等级
         *
         * @type {number}
         * @memberof NNRoomCanvas
         */
        _this.showType = null;
        /**
         * 点击桌子响应的方法
         *
         * @memberof NNRoomCanvas
         */
        _this.joinTable = function (event) {
            if (_this.needWait)
                return;
            if (dd.ui_manager.showLoading()) {
                _this.needWait = true;
                dd.mp_manager.playButton();
                var obj = { 'tableId': event.getCurrentTarget().tag, 'type': 0 };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.ZJH_JION_TABLEID, msg, function (flag, content) {
                    _this.needWait = false;
                    if (flag === 0) {
                        dd.gm_manager.nnGameData = content;
                        cc.director.loadScene('NNScene');
                    }
                    else if (flag === -1) {
                        dd.ui_manager.showTip('加入房间消息超时,请重试!');
                    }
                    else {
                        dd.ui_manager.showTip(content);
                        _this.getTables(_this.showType);
                    }
                });
            }
        };
        return _this;
    }
    NNRoomCanvas.prototype.onLoad = function () {
        this.tableLayer.active = false;
        dd.ui_manager.getRootNode().active = true;
    };
    NNRoomCanvas.prototype.init = function (items) {
        for (var i = 0; i < items.length; i++) {
            if (i > this.typeNodes.length - 1) {
                break;
            }
            var node = this.typeNodes[i];
            var item = items[i];
            node.tag = item.cfgId;
            cc.find('layout/limit', node).getComponent(cc.Label).string = item.joinLimit + '';
        }
        for (var i = items.length; i < this.typeNodes.length; i++) {
            this.typeNodes[i].active = false;
        }
    };
    /**
     * 界面刷新
     *
     * @param {number} dt
     * @memberof
     */
    NNRoomCanvas.prototype.update = function (dt) {
        //刷新玩家信息
        if (dd.ud_manager && dd.ud_manager.mineData) {
            this.lblName.string = dd.ud_manager.mineData.nick;
            this.lblGold.string = dd.utils.getShowNumberString(dd.ud_manager.mineData.roomCard);
            this.lblStarNo.string = '  (ID:' + dd.ud_manager.mineData.starNO + ')';
            this.headImg.spriteFrame = dd.img_manager.getHeadById(Number(dd.ud_manager.mineData.headImg));
        }
    };
    /**
     * 点击房间,进入桌子列表
     *
     * @param {cc.Button} sender
     * @param {string} type
     * @returns
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.clickRoom = function (event) {
        if (this.needWait)
            return;
        if (dd.ui_manager.showLoading()) {
            this.needWait = true;
            dd.mp_manager.playButton();
            this.getTables(event.getCurrentTarget().tag);
        }
    };
    /**
     * 根据类型iD获取桌子集合
     *
     * @param {number} cfgId
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.getTables = function (cfgId) {
        var _this = this;
        var obj = { 'cfgId': cfgId };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_GET_TABLE_LIST, msg, function (flag, content) {
            _this.needWait = false;
            if (flag === 0) {
                _this.showType = obj.cfgId;
                _this.openTable(content.items);
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间列表失败,请重试!');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 展现桌子列表
     *
     * @param {TableCfgItem[]} tables
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.openTable = function (tables) {
        var _this = this;
        this.tableLayer.active = true;
        dd.ui_manager.getRootNode().active = false;
        this.roomTitle.spriteFrame = this.roomSpriteFrame[this.showType - 1];
        var content = cc.find('sv', this.tableLayer).getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        tables.sort(function (a, b) {
            return a.tableId - b.tableId;
        });
        tables.forEach(function (table, index) {
            var node = cc.instantiate(_this.tablePrefab);
            cc.find('img', node).getComponent(cc.Sprite).spriteFrame = _this.tableSpriteFrame[table.playerNum];
            cc.find('id', node).getComponent(cc.Label).string = '- ' + (index + 1) + ' -';
            node.tag = table.tableId;
            node.parent = content;
            node.on(cc.Node.EventType.TOUCH_END, _this.joinTable, _this);
        }, this);
        dd.ui_manager.hideLoading();
    };
    /**
     * 关闭桌子列表
     *
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.closeTable = function () {
        if (this.needWait)
            return;
        dd.mp_manager.playButton();
        this.showType = null;
        var sv = cc.find('sv', this.tableLayer).getComponent(cc.ScrollView);
        sv.stopAutoScroll();
        sv.scrollToTop();
        sv.content.removeAllChildren();
        this.tableLayer.active = false;
        dd.ui_manager.getRootNode().active = true;
    };
    /**
     * 点击返回按钮,返回大厅
     *
     * @returns
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.clickBack = function () {
        if (this.needWait)
            return;
        if (dd.ui_manager.showLoading()) {
            this.needWait = true;
            dd.mp_manager.playButton();
            cc.director.loadScene('HomeScene');
        }
    };
    /**
     * 快速匹配
     *
     * @returns
     * @memberof NNRoomCanvas
     */
    NNRoomCanvas.prototype.quickJoin = function () {
        var _this = this;
        if (this.needWait || !this.showType)
            return;
        if (dd.ui_manager.showLoading()) {
            this.needWait = true;
            dd.mp_manager.playButton();
            var obj = { 'cfgId': this.showType };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_QUICK_JOIN, msg, function (flag, content) {
                _this.needWait = false;
                if (flag === 0) {
                    dd.gm_manager.nnGameData = content;
                    cc.director.loadScene('NNScene');
                }
                else if (flag === -1) {
                    dd.ui_manager.showTip('快速匹配消息超时,请重试!');
                }
                else {
                    dd.ui_manager.showTip(content);
                    _this.getTables(_this.showType);
                }
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], NNRoomCanvas.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], NNRoomCanvas.prototype, "lblGold", void 0);
    __decorate([
        property(cc.Label)
    ], NNRoomCanvas.prototype, "lblStarNo", void 0);
    __decorate([
        property(cc.Sprite)
    ], NNRoomCanvas.prototype, "headImg", void 0);
    __decorate([
        property([cc.Node])
    ], NNRoomCanvas.prototype, "typeNodes", void 0);
    __decorate([
        property(cc.Sprite)
    ], NNRoomCanvas.prototype, "roomTitle", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NNRoomCanvas.prototype, "roomSpriteFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NNRoomCanvas.prototype, "tableSpriteFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], NNRoomCanvas.prototype, "tablePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NNRoomCanvas.prototype, "tableLayer", void 0);
    NNRoomCanvas = __decorate([
        ccclass
    ], NNRoomCanvas);
    return NNRoomCanvas;
}(cc.Component));
exports.default = NNRoomCanvas;

cc._RF.pop();