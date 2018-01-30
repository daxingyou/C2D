"use strict";
cc._RF.push(module, '8ad3eYX16NF3oG5KDy5SGth', 'ZJH_RoomCanvas');
// Script/SceneScript/ZJH/Room/ZJH_RoomCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../../Modules/ModuleManager");
var ZJH_RoomCanvas = /** @class */ (function (_super) {
    __extends(ZJH_RoomCanvas, _super);
    function ZJH_RoomCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家名称
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblName = null;
        /**
         * 玩家金币
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblGold = null;
        /**
         * 玩家ID
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblStarNo = null;
        /**
         * 玩家头像
         *
         * @type {cc.Sprite}
         * @memberof HomeCanvas
         */
        _this.headImg = null;
        /**
         * item列表容器
         *
         * @type {cc.ScrollView}
         * @memberof ZJH_RoomCanvas
         */
        _this.svNode = null;
        /**
         * 房间item预设
         *
         * @type {cc.Prefab}
         * @memberof ZJH_RoomCanvas
         */
        _this.room_item_prefab = null;
        /**
         * 底板图片列表
         * @type {cc.SpriteFrame[]}
         * @memberof ZJH_RoomCanvas
         */
        _this.board_img_list = [];
        _this.imgTitle = null;
        _this.title_img_list = [];
        _this.node_board1 = null;
        _this.node_board2 = null;
        _this.layer1 = null;
        _this.layer2 = null;
        _this.lblInputList = [];
        /**
         * 当前输入的数字索引
         *
         * @type {number}
         * @memberof Room_Join_Normal
         */
        _this._curIndex = 0;
        /**
         * 等级场数据
         * @type {RoomCfgItem}
         * @memberof ZJH_RoomCanvas
         */
        _this._cfgData = null;
        return _this;
    }
    ZJH_RoomCanvas.prototype.onLoad = function () {
    };
    /**
     * 初始化输入数据
     *
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.initInput = function () {
        this._curIndex = 0;
        for (var i = 0; i < this.lblInputList.length; i++) {
            this.lblInputList[i].string = '';
        }
    };
    /**
     * 显示房间界面
     * @param {number} type 0=列表界面 1=等级场界面
     * @param {any} itemData
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.showRoomBoard = function (type, index, itemData) {
        if (index === void 0) { index = 0; }
        this.node_board1.active = type === 0 ? true : false;
        this.node_board2.active = type === 1 ? true : false;
        if (type === 0) {
        }
        else {
            this.layer1.active = true;
            this.layer2.active = false;
            this.initInput();
            this._cfgData = itemData;
            this.imgTitle.spriteFrame = this.title_img_list[index];
        }
    };
    /**
     * 发送加入房间的数据
     *
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.sendJoinRoom = function (tableId, type) {
        var obj = { 'tableId': tableId, 'type': type };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_JION_TABLEID, msg, function (flag, content) {
            if (flag === 0) {
                dd.gm_manager.zjhGameData = content;
                cc.director.loadScene('ZJHScene');
            }
            else if (flag === -1) {
                dd.ui_manager.hideLoading();
            }
            else {
                dd.ui_manager.showTip(content);
                dd.ui_manager.hideLoading();
            }
            cc.log(content);
        });
    };
    /**
     * 发送匹配房间的数据
     *
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.sendQuickRoom = function () {
        if (dd.ui_manager.showLoading()) {
            var obj = { 'cfgId': this._cfgData.cfgId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_QUICK_JOIN, msg, function (flag, content) {
                if (flag === 0) {
                    dd.gm_manager.zjhGameData = content;
                    cc.director.loadScene('ZJHScene');
                }
                else if (flag === -1) {
                    dd.ui_manager.hideLoading();
                }
                else {
                    dd.ui_manager.showTip(content);
                    dd.ui_manager.hideLoading();
                }
                cc.log(content);
            });
        }
    };
    /**
     * 发送创建房间的数据
     *
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.sendCreateRoom = function () {
        if (dd.ui_manager.showLoading()) {
            var obj = { 'cfgId': this._cfgData.cfgId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_CREATE, msg, function (flag, content) {
                if (flag === 0) {
                    dd.gm_manager.zjhGameData = content;
                    cc.director.loadScene('ZJHScene');
                }
                else if (flag === -1) {
                    dd.ui_manager.hideLoading();
                }
                else {
                    dd.ui_manager.showTip(content);
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 返回游戏
     *
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.returnToGame = function () {
        //拉回桌子
        if (dd.ud_manager && dd.ud_manager.mineData && dd.ud_manager.mineData.tableId !== 0) {
            if (dd.ui_manager.showLoading('正在重新进入未完成的游戏')) {
                this.sendJoinRoom(dd.ud_manager.mineData.tableId + '', 0);
            }
        }
        else {
            this.showRoomBoard(0);
        }
    };
    /**
        * 界面刷新
        *
        * @param {number} dt
        * @memberof HomeCanvas
        */
    ZJH_RoomCanvas.prototype.update = function (dt) {
        //刷新玩家信息
        if (dd.ud_manager && dd.ud_manager.mineData) {
            this.lblName.string = dd.ud_manager.mineData.nick;
            this.lblGold.string = dd.utils.getShowNumberString(dd.ud_manager.mineData.roomCard);
            this.lblStarNo.string = '  (ID:' + dd.ud_manager.mineData.starNO + ')';
            this.headImg.spriteFrame = dd.img_manager.getHeadById(Number(dd.ud_manager.mineData.headImg));
        }
    };
    /**
     * 显示房间列表
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.init = function (data) {
        var _this = this;
        this.svNode.content.removeAllChildren();
        if (!data)
            data = [];
        var _loop_1 = function () {
            var index = i;
            var room_item = cc.instantiate(this_1.room_item_prefab);
            var room_item_script = room_item.getComponent('ZJH_Room_Item');
            room_item_script.updateItem(data[i], i, this_1, function (itemData) {
                _this.showRoomBoard(1, index, itemData);
            });
            room_item.parent = this_1.svNode.content;
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1();
        }
        this.returnToGame();
    };
    /**
     * 房间等级场的按钮点击
     * @param {any} event
     * @param {string} type 0=加入房间 1=创建私人房间 2=随机匹配
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.click_btn_grade = function (event, type) {
        dd.mp_manager.playButton();
        switch (type) {
            case '0'://加入房间
                this.layer1.active = false;
                this.layer2.active = true;
                break;
            case '1'://创建私人房间
                this.sendCreateRoom();
                break;
            case '2'://随机匹配
                this.sendQuickRoom();
                break;
            default:
        }
    };
    /**
     * 输入数字的点击事件
     *
     * @param {cc.Event.EventTouch} event
     * @param {string} num
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.click_btn_input = function (event, num) {
        dd.mp_manager.playButton();
        switch (num) {
            case '10'://删除
                this.deleteLastInput();
                break;
            case '11'://加入
                this.joinRoom();
                break;
            default:
                this.showInputNum(num);
                break;
        }
    };
    /**
     *删除上一个输入的数字
     *
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.deleteLastInput = function () {
        if (this._curIndex <= 0)
            return;
        this.lblInputList[this._curIndex - 1].string = '';
        if (this._curIndex > 0)
            this._curIndex--;
    };
    /**
     * 加入房间
     *
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.joinRoom = function () {
        if (this._curIndex === this.lblInputList.length) {
            cc.log('输入完毕');
            var tableId = '';
            for (var i = 0; i < this.lblInputList.length; i++) {
                tableId += this.lblInputList[i].string;
            }
            if (dd.ui_manager.showLoading()) {
                this.sendJoinRoom(tableId, 1);
            }
        }
        else {
            dd.ui_manager.showTip('请输入6位房间号');
        }
    };
    /**
     * 显示当前输入的数字
     *
     * @param {string} num
     * @memberof Room_Join_Normal
     */
    ZJH_RoomCanvas.prototype.showInputNum = function (num) {
        dd.mp_manager.playButton();
        if (this._curIndex < this.lblInputList.length) {
            this.lblInputList[this._curIndex].string = num;
            if (this._curIndex < this.lblInputList.length) {
                this._curIndex++;
            }
        }
    };
    /**
     * 退出
     *
     * @memberof ZJH_RoomCanvas
     */
    ZJH_RoomCanvas.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        if (this.node_board1.active) {
            if (dd.ui_manager.showLoading())
                cc.director.loadScene('HomeScene');
        }
        else {
            if (this.layer1.active) {
                this.showRoomBoard(0);
            }
            else {
                this.initInput();
                this.layer1.active = true;
                this.layer2.active = false;
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], ZJH_RoomCanvas.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_RoomCanvas.prototype, "lblGold", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_RoomCanvas.prototype, "lblStarNo", void 0);
    __decorate([
        property(cc.Sprite)
    ], ZJH_RoomCanvas.prototype, "headImg", void 0);
    __decorate([
        property(cc.ScrollView)
    ], ZJH_RoomCanvas.prototype, "svNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJH_RoomCanvas.prototype, "room_item_prefab", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ZJH_RoomCanvas.prototype, "board_img_list", void 0);
    __decorate([
        property(cc.Sprite)
    ], ZJH_RoomCanvas.prototype, "imgTitle", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ZJH_RoomCanvas.prototype, "title_img_list", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_RoomCanvas.prototype, "node_board1", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_RoomCanvas.prototype, "node_board2", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_RoomCanvas.prototype, "layer1", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_RoomCanvas.prototype, "layer2", void 0);
    __decorate([
        property([cc.Label])
    ], ZJH_RoomCanvas.prototype, "lblInputList", void 0);
    ZJH_RoomCanvas = __decorate([
        ccclass
    ], ZJH_RoomCanvas);
    return ZJH_RoomCanvas;
}(cc.Component));
exports.default = ZJH_RoomCanvas;

cc._RF.pop();