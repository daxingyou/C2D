(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJ_Table.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69753Zib3VHUIeRhBrIBb92', 'MJ_Table', __filename);
// Script/SceneScript/Game/MJ_Table.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_Table = /** @class */ (function (_super) {
    __extends(MJ_Table, _super);
    function MJ_Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 游戏配置描述
         *
         * @type {cc.Label}
         * @memberof MJ_Table
         */
        _this.lblTitle = null;
        /**
         * 游戏房间id
         *
         * @type {cc.Label}
         * @memberof MJ_Table
         */
        _this.lblRoomId = null;
        /**
         * 系统时间
         *
         * @type {cc.Label}
         * @memberof MJ_Table
         */
        _this.lblSysTime = null;
        /**
         * 游戏延时
         *
         * @type {cc.Label}
         * @memberof MJ_Table
         */
        _this.lblDelay = null;
        /**
         * 信号图片
         *
         * @type {cc.Sprite}
         * @memberof MJ_Table
         */
        _this.imgWifi = null;
        /**
         * 电池电量
         *
         * @type {cc.ProgressBar}
         * @memberof MJ_Table
         */
        _this.pro_Power = null;
        /**
         * 游戏等待界面
         *
         * @type {cc.Node}
         * @memberof MJ_Table
         */
        _this.table_wait = null;
        /**
         * 退出按钮的节点
         *
         * @type {cc.Node}
         * @memberof MJ_Table
         */
        _this.node_out = null;
        /**
         * 微信邀请按钮
         * @type {cc.Node}
         * @memberof MJ_Table
         */
        _this.node_wx_invit = null;
        /**
         * 解散房间按钮的节点
         *
         * @type {cc.Node}
         * @memberof MJ_Table
         */
        _this.node_disband = null;
        /**
         * 玩家节点列表
         *
         * @type {cc.Node[]}
         * @memberof MJ_Player
         */
        _this.playerList = [];
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        /**
         *
         * 当前时间
         * @type {string}
         * @memberof MJ_Table
         */
        _this._nowTime = 0;
        /**
         * 刷新时间
         *
         * @type {number}
         * @memberof MJ_Table
         */
        _this._cdTime = 0;
        /**
         * 电量获取的刷新时间
         *
         * @type {number}
         * @memberof MJ_Table
         */
        _this._powerTime = 30;
        _this._msTime = 1;
        return _this;
    }
    MJ_Table.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        if (dd.config.wxState === 0) {
            this.node_wx_invit.active = true;
        }
        else {
            this.node_wx_invit.active = false;
        }
    };
    MJ_Table.prototype.update = function (dt) {
        if (dd.gm_manager && dd.gm_manager.mjGameData && !dd.gm_manager.isReplayPause) {
            this._cdTime -= dt;
            if (this._cdTime < 0) {
                this._cdTime = 1;
                dd.gm_manager.mjGameData.tableBaseVo.svrTime = Number(dd.gm_manager.mjGameData.tableBaseVo.svrTime) + 1000 + '';
                this.lblSysTime.string = dd.utils.getDateStringByTimestamp(dd.gm_manager.mjGameData.tableBaseVo.svrTime, 2);
            }
        }
        //电量获取刷新
        this._powerTime -= dt;
        if (this._powerTime < 0) {
            this._powerTime = 30;
            this.pro_Power.progress = dd.js_call_native.getBatteryLevel() / 100;
        }
        this._msTime -= dt;
        if (this._msTime <= 0) {
            this._msTime = 1;
            // this.showWifiMS();
            this.lblDelay.string = dd.ws_manager.getDelayTime() + 'ms';
        }
    };
    /**
     * 显示桌子信息和界面
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.showTableInfo = function () {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        this._cdTime = 1;
        this.lblTitle.string = dd.gm_manager.mjGameData.tableBaseVo.ruleShowDesc;
        this.lblRoomId.string = '房间号:' + dd.gm_manager.mjGameData.tableBaseVo.tableId;
        this.lblSysTime.string = dd.utils.getDateStringByTimestamp(dd.gm_manager.mjGameData.tableBaseVo.svrTime, 2);
        this.pro_Power.progress = dd.js_call_native.getBatteryLevel() / 100;
        this.lblDelay.string = dd.ws_manager.getDelayTime() + 'ms';
        //如果在空闲状态
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_IDLE) {
            this.table_wait.active = true;
            if (dd.ud_manager.mineData.accountId === dd.gm_manager.mjGameData.tableBaseVo.createPlayer) {
                this.node_disband.active = true;
                this.node_out.active = false;
            }
            else {
                this.node_disband.active = false;
                this.node_out.active = true;
            }
        }
        else {
            this.table_wait.active = false;
            this.node_disband.active = false;
            this.node_out.active = false;
        }
        this.showPlayerInfo();
    };
    /**
     * 显示玩家信息
     *
     * @memberof MJ_Player
     */
    MJ_Table.prototype.showPlayerInfo = function () {
        for (var i = 0; i < dd.gm_manager.mjGameData.seats.length; i++) {
            var seat = dd.gm_manager.mjGameData.seats[i];
            var player = this.playerList[i];
            if (seat && seat.accountId !== null && seat.accountId !== '0') {
                player.active = true;
                var playerScript = player.getComponent('MJ_PlayerUI');
                playerScript.showInfo(seat);
            }
            else {
                player.active = false;
            }
        }
    };
    /**
     * 根据玩家id返回玩家的座位坐标
     *
     * @param {string} accountId
     * @returns
     * @memberof MJ_Player
     */
    MJ_Table.prototype.getPlayPosById = function (accountId) {
        var index = MJ_Help.getIndexBySeatId(-1, accountId);
        var player = this.playerList[index];
        var pos = player.getPosition();
        return pos;
    };
    /**
     * 显示信号延时
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.showWifiMS = function () {
        var ms = dd.ws_manager.getDelayTime();
        var type = 0;
        if (ms < 60) {
            type = 0;
            this.lblDelay.node.color = cc.Color.GREEN;
            this.imgWifi.node.color = cc.Color.GREEN;
        }
        else if (ms >= 60 && ms < 90) {
            type = 1;
            this.lblDelay.node.color = cc.Color.YELLOW;
            this.imgWifi.node.color = cc.Color.YELLOW;
        }
        else {
            type = 2;
            this.lblDelay.node.color = cc.Color.RED;
            this.imgWifi.node.color = cc.Color.RED;
        }
        this.lblDelay.string = ms + 'ms';
    };
    /**
     * 返回大厅
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_return = function () {
        dd.mp_manager.playButton();
        this._canvasTarget.sendOutGame();
    };
    /**
     * 解散
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_disband = function () {
        var _this = this;
        dd.mp_manager.playButton();
        dd.ui_manager.showAlert('您确定解散房间吗？', '温馨提示', {
            lbl_name: '确定',
            callback: function () {
                _this._canvasTarget.sendOutGame();
            }
        }, {
            lbl_name: '取消',
            callback: function () {
            }
        }, 1);
    };
    /**
     * 邀请
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_invite = function () {
        dd.mp_manager.playButton();
        dd.js_call_native.wxShare(dd.config.cd.ddUrl, '豆豆麻将', '我在豆豆麻将' + dd.gm_manager.mjGameData.tableBaseVo.tableId + '号桌子，快来一起游戏吧！');
    };
    /**
     * 复制
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_copy = function () {
        dd.mp_manager.playButton();
        dd.js_call_native.copyToClipboard(dd.gm_manager.mjGameData.tableBaseVo.tableId.toString());
        dd.ui_manager.showTip('复制成功！');
    };
    /**
     * 准备
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_ready = function () {
        dd.mp_manager.playButton();
    };
    /**
     * 聊天
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_chat = function () {
        if (dd.gm_manager.touchTarget)
            return;
        dd.mp_manager.playButton();
        this._canvasTarget.showChat();
    };
    /**
     * 设置
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_setting = function () {
        if (dd.gm_manager.touchTarget)
            return;
        dd.mp_manager.playButton();
        this._canvasTarget.showSetting();
    };
    /**
     * 语音
     *
     * @memberof MJ_Table
     */
    MJ_Table.prototype.click_btn_voice = function () {
        dd.mp_manager.playButton();
    };
    __decorate([
        property(cc.Label)
    ], MJ_Table.prototype, "lblTitle", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_Table.prototype, "lblRoomId", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_Table.prototype, "lblSysTime", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_Table.prototype, "lblDelay", void 0);
    __decorate([
        property(cc.Sprite)
    ], MJ_Table.prototype, "imgWifi", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], MJ_Table.prototype, "pro_Power", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Table.prototype, "table_wait", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Table.prototype, "node_out", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Table.prototype, "node_wx_invit", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Table.prototype, "node_disband", void 0);
    __decorate([
        property([cc.Node])
    ], MJ_Table.prototype, "playerList", void 0);
    MJ_Table = __decorate([
        ccclass
    ], MJ_Table);
    return MJ_Table;
}(cc.Component));
exports.default = MJ_Table;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MJ_Table.js.map
        