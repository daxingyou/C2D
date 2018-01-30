"use strict";
cc._RF.push(module, 'c515fy3FFpEy7ia0XjbXAh2', 'ZJH_Player');
// Script/SceneScript/ZJH/ZJH_Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var ZJH_Help = require("./ZJH_Help");
var ZJH_Player = /** @class */ (function (_super) {
    __extends(ZJH_Player, _super);
    function ZJH_Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家节点坐标
         *
         * @type {cc.Node[]}
         * @memberof ZJH_Player
         */
        _this.node_player_list = [];
        _this._canvansScript = null;
        return _this;
    }
    ZJH_Player.prototype.onLoad = function () {
        this._canvansScript = dd.ui_manager.getCanvasNode().getComponent('ZJHCanvas');
    };
    /**
     * 重置玩家信息
     *
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.resetPlayerInfo = function () {
        for (var i = 0; i < this.node_player_list.length; i++) {
            var player = this.node_player_list[i];
            if (player) {
                var playerUI = player.getComponent('ZJH_PlayerUI');
                playerUI.resetSeat();
            }
        }
    };
    /**
     * 显示玩家信息
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.showPlayerInfo = function () {
        var seats = dd.gm_manager.zjhGameData.seats;
        if (seats && seats.length) {
            for (var i = 0; i < seats.length; i++) {
                var seat = seats[i];
                var player = this.node_player_list[i];
                if (player) {
                    if (seat && seat.accountId !== '' && seat.accountId !== '0') {
                        player.active = true;
                        var playerUI = player.getComponent('ZJH_PlayerUI');
                        playerUI.initData(seat);
                    }
                    else {
                        player.active = false;
                    }
                }
            }
        }
    };
    /**
     * 获取发牌的坐标列表 和 索引列表
     *
     * @memberof NewClass
     */
    ZJH_Player.prototype.getFPPosList = function () {
        var obj = {
            'posList': [],
            'playerIndexList': []
        };
        for (var i = 0; i < dd.gm_manager.zjhGameData.seats.length; i++) {
            var seat = dd.gm_manager.zjhGameData.seats[i];
            if (seat && seat.accountId !== '' && seat.accountId !== '0'
                && seat.bGamed === 1
                && seat.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_DROP) {
                var player = this.node_player_list[i];
                if (player) {
                    var playerUI = player.getComponent('ZJH_PlayerUI');
                    var cPos = playerUI.getCardBoardPos();
                    var pos = this.getWorldPos(player, cPos);
                    obj.posList.push(pos);
                    obj.playerIndexList.push(i);
                }
            }
        }
        return obj;
    };
    /**
     * 根据index来显示玩家的牌信息
     * @param {number} index 座位玩家索引
     * @param {number} pokerId 牌索引
     * @param {number} [type=0] 0=显示牌 1=显示翻牌
     * @param {boolean} [isShow=true] 是否显示牌
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.showPokerByIndex = function (index, pokerId, type, isShow) {
        if (type === void 0) { type = 0; }
        if (isShow === void 0) { isShow = true; }
        var player = this.node_player_list[index];
        if (player) {
            var playerUI = player.getComponent('ZJH_PlayerUI');
            playerUI.showPokerById(pokerId, type, isShow);
        }
    };
    /**
     * 获取世界坐标 node:父节点 pos:坐标
     * @param {any} node
     * @param {any} pos
     * @returns
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.getWorldPos = function (node, pos) {
        var targetP = node.convertToWorldSpaceAR(pos);
        //依然是以屏幕左下角为起点,所以要减去一半
        targetP.x = targetP.x - this.node.width / 2;
        targetP.y = targetP.y - this.node.height / 2;
        return targetP;
    };
    /**
     * 根据座位索引，获取座位的坐标点
     *
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.getPosByIndex = function (index) {
        if (index < 0 || index >= this.node_player_list.length) {
            cc.log('索引错误');
            return cc.p(0, 0);
        }
        var player = this.node_player_list[index];
        if (player) {
            return this.getWorldPos(this.node, player.getPosition());
        }
        return cc.p(0, 0);
    };
    /**
     * 显示所有人的牌
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.showAllFPAction = function () {
        for (var i = 0; i < dd.gm_manager.zjhGameData.seats.length; i++) {
            var seat = dd.gm_manager.zjhGameData.seats[i];
            if (seat && seat.accountId !== '' && seat.accountId !== '0' && seat.bGamed === 1) {
                this.showFPActionBySeatId(seat.seatIndex);
            }
        }
    };
    /**
     *  根据座位id显示翻牌动作
     * @param {number} seatId   //需要计算的座位id
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.showFPActionBySeatId = function (seatId) {
        var index = ZJH_Help.getIndexBySeatId(seatId);
        var player = this.node_player_list[index];
        if (player) {
            var script = player.getComponent("ZJH_PlayerUI");
            script.showSeatFPAction();
        }
    };
    /**
     * 根据自己的座位，计算seatId在界面上是第几个位置
     * @param {number} mySeatId //自己的座位id
     * @param {number} seatId   //需要计算的座位id
     * @returns
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.getSeatIndexBySeatId = function (mySeatId, seatId) {
        //获取自己的座位信息
        var index = 0;
        if (mySeatId > seatId) {
            index = 5 - (mySeatId - seatId);
        }
        else {
            index = Math.abs(mySeatId - seatId);
        }
        return index;
    };
    /**
     * 显示牌的抖动动作
     */
    ZJH_Player.prototype.showPokerShakeAction = function () {
        var prevSeat = ZJH_Help.getSeatBySeatId(dd.gm_manager.zjhGameData.prevSeatIndex);
        //如果上一家的表态是全下，那么只能比牌 上一家
        if (prevSeat && prevSeat.btVal === ZJH_Help.ZJH_Act_State.BT_VAL_BETALL) {
            this.showShakeBySeat(prevSeat);
        }
        else {
            var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
            //自己当前 跟注 时，应该下注的金额
            var showMoney = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
            //如果自己身上的钱不足 应该下注的钱，就只能 比牌下一家         
            if (mySeat.money <= showMoney) {
                var nextSeat = this.getNextBtSeat(dd.gm_manager.zjhGameData.btIndex);
                if (nextSeat) {
                    this.showShakeBySeat(nextSeat);
                }
            }
            else {
                for (var i = 0; i < dd.gm_manager.zjhGameData.seats.length; i++) {
                    var seat = dd.gm_manager.zjhGameData.seats[i];
                    if (seat && seat.accountId !== '' && seat.accountId !== '0' && seat.bGamed === 1
                        && seat.accountId !== dd.ud_manager.mineData.accountId
                        && seat.btVal !== ZJH_Help.ZJH_Act_State.BT_VAL_DROP
                        && seat.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_DROP) {
                        this.showShakeBySeat(seat);
                    }
                }
            }
        }
    };
    /**
     * 根据seat显示抖牌
     * @param {SeatVo} seat
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.showShakeBySeat = function (seat) {
        var index = ZJH_Help.getIndexBySeatId(seat.seatIndex);
        var player = this.node_player_list[index];
        if (player) {
            var playerUI = player.getComponent('ZJH_PlayerUI');
            var cPos = playerUI.getCardBoardPos();
            var pos = this.getWorldPos(player, cPos);
            this._canvansScript.showShakeAction(seat.seatIndex, pos);
        }
    };
    /**
     * 获取下一家表态的人
     * @memberof ZJH_Player
     */
    ZJH_Player.prototype.getNextBtSeat = function (btIndex) {
        var loop = 0;
        var nextSeat = null;
        var nextIndex = btIndex + 1;
        while (loop < this.node_player_list.length) {
            nextIndex = nextIndex % this.node_player_list.length;
            var seat = ZJH_Help.getSeatBySeatId(nextIndex);
            if (seat.accountId !== '' && seat.accountId !== '0' &&
                seat.bGamed === 1 && seat.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_DROP) {
                nextSeat = seat;
                break;
            }
            nextIndex++;
            loop++;
        }
        return nextSeat;
    };
    __decorate([
        property(cc.Node)
    ], ZJH_Player.prototype, "node_player_list", void 0);
    ZJH_Player = __decorate([
        ccclass
    ], ZJH_Player);
    return ZJH_Player;
}(cc.Component));
exports.default = ZJH_Player;

cc._RF.pop();