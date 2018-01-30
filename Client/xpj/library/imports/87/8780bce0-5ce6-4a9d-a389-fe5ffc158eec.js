"use strict";
cc._RF.push(module, '8780bzgXOZKnaOJ/l/8FY7s', 'ZJH_Table');
// Script/SceneScript/ZJH/ZJH_Table.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Game_GoldBase_1 = require("./Game_GoldBase");
var ZJH_Help = require("./ZJH_Help");
var ZJH_Table = /** @class */ (function (_super) {
    __extends(ZJH_Table, _super);
    function ZJH_Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggle_gz = null;
        _this.lblRoomId = null;
        _this.lblOnceMax = null;
        _this.lblScore = null;
        _this.lblBetCount = null;
        _this.lblRound = null;
        _this.lblClockTime = null;
        _this.node_clock = null;
        _this.clock_pro = null;
        _this.btn_state_list = [];
        /**
         * 按钮节点(表态按钮的界面)
         * @type {cc.Node}
         * @memberof ZJH_Table
         */
        _this.node_btnLayer = null;
        /**
         *押注池
         * @type {cc.Node}
         * @memberof ZJH_Table
         */
        _this.betLayer = null;
        /**
         * 加注界面
         * @type {cc.Node}
         * @memberof ZJH_Table
         */
        _this.node_addLayer = null;
        /**
         * 自己的座位节点
         * @type {cc.Node}
         * @memberof ZJH_Table
         */
        _this.node_mySeat = null;
        /**
         * 准备按钮
         * @type {cc.Node}
         * @memberof ZJH_Table
         */
        _this.node_ready = null;
        /**
         * 加注label
         * @type {cc.Label[]}
         * @memberof ZJH_Table
         */
        _this.lblAddBetList = [];
        /**
         * 加注按钮
         * @type {cc.Button[]}
         * @memberof ZJH_Table
         */
        _this.btn_addBet_list = [];
        _this._canvansScript = null;
        /**
         * 准备倒计时
         * @type {number}
         * @memberof ZJH_Table
         */
        _this._clockTime = 0;
        _this._cd = 0;
        _this._clock_countTime = 0;
        _this._clock_pro_curTime = 0;
        return _this;
    }
    ZJH_Table.prototype.onLoad = function () {
        this._canvansScript = dd.ui_manager.getCanvasNode().getComponent('ZJHCanvas');
    };
    /**
     * 初始化下注按钮
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.initBetBtn = function () {
        for (var i = 0; i < this.btn_state_list.length; i++) {
            this.btn_state_list[i].interactable = false;
        }
    };
    ZJH_Table.prototype.update = function (dt) {
        if (this._clockTime > 0) {
            this._cd -= dt;
            if (this._cd <= 0) {
                this._cd = 1;
                this.lblClockTime.string = this._clockTime + '';
                this._clockTime--;
                if (this._clockTime <= 5) {
                    dd.mp_manager.playTime();
                }
            }
        }
        if (this._clock_pro_curTime <= this._clock_countTime) {
            this._clock_pro_curTime += dt;
            var pro = this._clock_pro_curTime / this._clock_countTime;
            if (pro < 0) {
                pro = 0;
            }
            else if (pro > 1) {
                pro = 1;
            }
            else {
                pro = pro;
            }
            this.clock_pro.fillRange = 1 - pro;
        }
        else {
            this.clock_pro.fillRange = 0;
        }
    };
    /**
     * 显示桌子基本信息
     *
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showTableBase = function () {
        this.lblRoomId.string = '房间号 ' + dd.gm_manager.zjhGameData.tableId;
        this.lblBetCount.string = '押注池 ' + dd.utils.getShowNumberString(dd.gm_manager.zjhGameData.totalBetMoney);
        this.lblScore.string = '底分 ' + dd.utils.getShowNumberString(dd.gm_manager.zjhGameData.baseScore);
        this.lblRound.string = '轮数 ' + dd.gm_manager.zjhGameData.roundNum;
        this.lblOnceMax.string = dd.utils.getShowNumberString(dd.gm_manager.zjhGameData.onceMax);
    };
    /**
     * 显示桌子信息
     *
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showTableInfo = function () {
        this.showTableBase();
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        //动作
        var action = dd.gm_manager.zjhGameData.gameState;
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY || action === ZJH_Help.ZJH_Game_State.STATE_TABLE_IDLE) {
            this.removeAllEnemyNode(this.betLayer);
            //如果在准备阶段
            if (mySeat.btState === ZJH_Help.ZJH_BT_State.ACT_STATE_WAIT) {
                this.node_ready.active = true;
            }
            else {
                this.node_ready.active = false;
            }
            //只有在准备阶段才会显示倒计时
            if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY) {
                this._clockTime = (Number(dd.gm_manager.zjhGameData.actTime) - Number(dd.gm_manager.zjhGameData.svrTime)) / 1000 - 1;
                this._clock_countTime = Number(dd.gm_manager.zjhGameData.actTotalTime) / 1000;
                this._clock_pro_curTime = this._clock_countTime - this._clockTime;
                this.lblClockTime.string = this._clockTime + '';
                this._cd = 1;
                this.node_clock.active = true;
            }
            else {
                this.node_clock.active = false;
            }
        }
        else {
            this.node_ready.active = false;
            this.node_clock.active = false;
        }
        this.showBtmInfo(0);
        if (action > ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI && action < ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_OVER) {
            //如果押注池中没有金币，并且押注池的金币大于0
            if (this.betLayer.childrenCount === 0 && dd.gm_manager.zjhGameData.totalBetMoney > 0) {
                var numList = ZJH_Help.getEveryIntervalNum(dd.gm_manager.zjhGameData.totalBetMoney);
                this.createMoreGold(numList, this.betLayer);
            }
        }
        //在结算阶段，清空跟到底选择
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_OVER) {
            this.toggle_gz.isChecked = false;
        }
    };
    /**
     * 从加注界面返回到表态界面
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showAddReturnToState = function () {
        if (this.node_addLayer.active) {
            this.showBtmInfo(0);
        }
    };
    /**
     * 显示底部界面信息
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showBtmInfo = function (type) {
        //动作
        var action = dd.gm_manager.zjhGameData.gameState;
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY || action === ZJH_Help.ZJH_Game_State.STATE_TABLE_IDLE) {
            this.removeAllEnemyNode(this.betLayer);
        }
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        //如果在下注阶段
        if (action === ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_BET) {
            //如果自己还未表态 并且 表态座位是自己
            if (mySeat && mySeat.btState === ZJH_Help.ZJH_BT_State.ACT_STATE_WAIT
                && mySeat.seatIndex === dd.gm_manager.zjhGameData.btIndex) {
                this.showBtmLayer(type);
            }
            else {
                this.node_addLayer.active = false;
                this.node_btnLayer.active = true;
                this.node_mySeat.active = true;
                this.initBetBtn();
            }
        }
        else {
            this.node_addLayer.active = false;
            this.node_btnLayer.active = true;
            this.node_mySeat.active = true;
            this.initBetBtn();
        }
        //大于发牌小于结算，就可以看牌
        if (action > ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI && action < ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_OVER) {
            if (mySeat && mySeat.bGamed && mySeat.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_DROP
                && mySeat.btVal !== ZJH_Help.ZJH_Act_State.BT_VAL_DROP
                && mySeat.btVal !== ZJH_Help.ZJH_Act_State.BT_VAL_COMPARAE) {
                //看牌按钮
                this.btn_state_list[1].interactable = mySeat.looked === 1 ? false : true;
                //弃牌按钮
                this.btn_state_list[0].interactable = mySeat.btState === ZJH_Help.ZJH_BT_State.ACT_STATE_DROP ? false : true;
            }
        }
    };
    /**
     *显示底部界面
     * @param {number} type 0=表态按钮 1=加注按钮
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showBtmLayer = function (type) {
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        if (type === 0) {
            this.showStateLayer(mySeat);
        }
        else {
            this.showAddBetLayer(mySeat);
        }
        this.node_addLayer.active = type === 1 ? true : false;
        this.node_btnLayer.active = type === 0 ? true : false;
        this.node_mySeat.active = type === 0 ? true : false;
    };
    /**
     * 显示表态界面信息
     * @param {SeatVo} mySeat
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showStateLayer = function (mySeat) {
        //如果在弃牌、比牌状态
        if (mySeat.btState === ZJH_Help.ZJH_BT_State.ACT_STATE_DROP
            || mySeat.btVal === ZJH_Help.ZJH_Act_State.BT_VAL_DROP
            || mySeat.btVal === ZJH_Help.ZJH_Act_State.BT_VAL_COMPARAE) {
            this.initBetBtn();
        }
        else {
            //自己当前 跟注 时，应该下注的金额
            var showMoney = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
            var prevSeat = ZJH_Help.getSeatBySeatId(dd.gm_manager.zjhGameData.prevSeatIndex);
            if ((prevSeat && prevSeat.btVal === ZJH_Help.ZJH_Act_State.BT_VAL_BETALL) //如果上一家的表态是全下，那么只能 弃牌、比牌上一家
                || (mySeat.money <= showMoney)) {
                this.btn_state_list[2].interactable = true; //比牌
                this.btn_state_list[3].interactable = false; //全押
                this.btn_state_list[4].interactable = false; //跟注
                this.btn_state_list[5].interactable = false; //加注
                //如果上一个人表态全押，这里就不能跟到底了
                this.toggle_gz.isChecked = false;
            }
            else {
                //如果设置了跟到底的选项，就直接发送 跟到底的消息
                if (this.toggle_gz.isChecked) {
                    var showMoney_1 = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
                    this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_BETSAME, showMoney_1);
                }
                //如果应该下注金额大于 单注上限
                if (showMoney > dd.gm_manager.zjhGameData.onceMax)
                    showMoney = dd.gm_manager.zjhGameData.onceMax;
                //如果自己的金额大于应该下注的金额
                if (mySeat.money >= showMoney) {
                    //如果应该下注的金额，大于等于 单注上限
                    if (showMoney >= dd.gm_manager.zjhGameData.onceMax) {
                        //只显示跟注、比牌，不能加注
                        this.btn_state_list[4].interactable = true; //跟注
                        this.btn_state_list[5].interactable = false; //加注
                    }
                    else {
                        //如果应该下注的金额，还在单注上限内，那么可以加注
                        this.btn_state_list[4].interactable = true; //跟注
                        this.btn_state_list[5].interactable = true; //加注
                    }
                    //钱足够上一个人下注金额，就可以比牌
                    //轮数大于2 才能比牌
                    if (dd.gm_manager.zjhGameData.roundNum > 2) {
                        this.btn_state_list[2].interactable = true; //比牌
                    }
                    else {
                        this.btn_state_list[2].interactable = false; //比牌
                    }
                }
                else {
                    //如果自己的钱不足，跟注了之后，就取消跟到底的选项
                    this.toggle_gz.isChecked = false;
                    //如果自己的钱不够，就只能 弃牌 
                    this.btn_state_list[2].interactable = false; //比牌
                    this.btn_state_list[4].interactable = false; //跟注
                    this.btn_state_list[5].interactable = false; //加注
                }
                //当前正在游戏中的玩家列表
                var seatList = ZJH_Help.getNowPlayer();
                //如果玩家数量是2，并且 轮数大于1
                if (seatList.length === 2 && dd.gm_manager.zjhGameData.roundNum > 1) {
                    this.btn_state_list[3].interactable = true; //全押
                }
                else {
                    this.btn_state_list[3].interactable = false; //全押
                }
            }
        }
    };
    /**
     * 显示加注界面信息
     * @param {SeatVo} mySeat
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.showAddBetLayer = function (mySeat) {
        var minScore = dd.gm_manager.zjhGameData.baseScore;
        var maxScore = dd.gm_manager.zjhGameData.onceMax;
        //自己当前 跟注 时，应该下注的金额
        var showMoney = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
        //如果应该下注金额大于 单注上限
        if (showMoney > dd.gm_manager.zjhGameData.onceMax)
            showMoney = dd.gm_manager.zjhGameData.onceMax;
        var maxBet = maxScore - showMoney;
        if (maxBet < this.lblAddBetList.length) {
            for (var i = 0; i < this.lblAddBetList.length; i++) {
                if (i < maxBet) {
                    this.lblAddBetList[i].node.parent.active = true;
                    this.lblAddBetList[i].string = (i + 1) + '';
                    var line = cc.find('line', this.lblAddBetList[i].node.parent);
                    if (line) {
                        if (i === maxBet - 1) {
                            line.active = false;
                        }
                        else {
                            line.active = true;
                        }
                    }
                }
                else {
                    this.lblAddBetList[i].node.parent.active = false;
                }
            }
        }
        else {
            //设置加注按钮的金额
            this.lblAddBetList[this.lblAddBetList.length - 1].node.parent.active = true;
            this.lblAddBetList[this.lblAddBetList.length - 1].string = dd.utils.getShowNumberString(maxBet);
            var one = maxBet / this.lblAddBetList.length;
            for (var i = 0; i < this.lblAddBetList.length - 1; i++) {
                this.lblAddBetList[i].node.parent.active = true;
                this.lblAddBetList[i].string = Math.round(dd.utils.getShowNumberString(one * (i + 1))) + '';
            }
        }
        //设置加注按钮是否可以点击
        for (var i = 0; i < this.lblAddBetList.length; i++) {
            var betMoney = Number(this.lblAddBetList[i].string);
            if (betMoney > mySeat.money) {
                this.btn_addBet_list[i].interactable = false;
            }
            else {
                this.btn_addBet_list[i].interactable = true;
            }
        }
    };
    /**
     * 表态按钮的事件
     *
     * @param {any} event
     * @param {string} type
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.click_btn_state = function (event, type) {
        dd.mp_manager.playButton();
        cc.log('click_btn_state--+' + type);
        if (!this.btn_state_list[Number(type)].interactable)
            return;
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        if (!mySeat)
            return;
        switch (type) {
            case '0'://弃牌
                this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_DROP, 0);
                break;
            case '1'://看牌
                this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_LOOCK, mySeat.seatIndex);
                break;
            case '2'://比牌
                this._canvansScript.showChooseBPAction();
                break;
            case '3'://全押
                //当前正在游戏中的玩家列表
                var seatList = ZJH_Help.getNowPlayer();
                var list = [];
                for (var i = 0; i < seatList.length; i++) {
                    var m = seatList[i].money + seatList[i].betMoney;
                    list.push(m);
                }
                list.sort(function (a, b) {
                    return a - b;
                });
                var allinMoney = list[0];
                this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_BETALL, allinMoney);
                break;
            case '4'://跟注
                //自己当前 跟注 时，应该下注的金额
                var showMoney = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
                this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_BETSAME, showMoney);
                break;
            case '5'://加注
                this.showBtmLayer(1);
                break;
            default:
        }
    };
    /**
     * 加注按钮
     * @param {any} event
     * @param {string} type
     * @returns
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.click_btn_addBet = function (event, type) {
        dd.mp_manager.playButton();
        var index = Number(type);
        if (!this.btn_addBet_list[index].interactable)
            return;
        var addBet = Number(this.lblAddBetList[index].string);
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        if (!mySeat)
            return;
        var showMoney = mySeat.looked === 1 ? dd.gm_manager.zjhGameData.lookBetMoney : dd.gm_manager.zjhGameData.unLookBetMoney;
        var betMoeny = addBet + showMoney;
        cc.log('---加注---+' + addBet);
        this._canvansScript.sendBetInfo(ZJH_Help.ZJH_Act_State.BT_VAL_BETADD, betMoeny);
        this.showBtmLayer(0);
    };
    /**
     * 退出游戏
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.click_btn_out = function () {
        var _this = this;
        dd.mp_manager.playButton();
        dd.ui_manager.showAlert('您确定退出游戏吗？', '温馨提示', {
            lbl_name: '确定',
            callback: function () {
                _this._canvansScript.sendOutGame();
            }
        }, {
            lbl_name: '取消',
            callback: function () {
            }
        }, 1);
    };
    /**
     * 准备游戏
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.click_btn_ready = function () {
        dd.mp_manager.playButton();
        this._canvansScript.sendReadyGame();
    };
    /**
     * 播放下注动作
     * @param {number} pos 坐标点
     * @param {number} num 数字
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.playGoldAction = function (pos, num) {
        var numList = ZJH_Help.getEveryIntervalNum(num);
        var fz = cc.v2(this.betLayer.width, this.betLayer.height);
        this.playGoldMoveToPool(pos, numList, fz, dd.ui_manager.getRootNode(), this.betLayer);
    };
    /**
     * 播放赢金币的动画
     * @param {cc.Vec2} pos 坐标点
     * @param {any} startCB 第一个金币到达的回调
     * @param {any} endCB   动作做完后的回调
     * @memberof ZJH_Table
     */
    ZJH_Table.prototype.playWinGoldAction = function (pos, startCB, endCB) {
        if (startCB === void 0) { startCB = null; }
        if (endCB === void 0) { endCB = null; }
        dd.mp_manager.playZJH('coins');
        this.playGoldMoveToPlayer(pos, this.betLayer, startCB, endCB, true, cc.v2(60, 60));
    };
    __decorate([
        property(cc.Toggle)
    ], ZJH_Table.prototype, "toggle_gz", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblRoomId", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblOnceMax", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblScore", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblBetCount", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblRound", void 0);
    __decorate([
        property(cc.Label)
    ], ZJH_Table.prototype, "lblClockTime", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "node_clock", void 0);
    __decorate([
        property(cc.Sprite)
    ], ZJH_Table.prototype, "clock_pro", void 0);
    __decorate([
        property({
            type: [cc.Button],
            tooltip: '0=弃牌\n1=看牌\n2=比牌\n3=全押\n4=跟注\n5=加注'
        })
    ], ZJH_Table.prototype, "btn_state_list", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "node_btnLayer", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "betLayer", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "node_addLayer", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "node_mySeat", void 0);
    __decorate([
        property(cc.Node)
    ], ZJH_Table.prototype, "node_ready", void 0);
    __decorate([
        property([cc.Label])
    ], ZJH_Table.prototype, "lblAddBetList", void 0);
    __decorate([
        property([cc.Button])
    ], ZJH_Table.prototype, "btn_addBet_list", void 0);
    ZJH_Table = __decorate([
        ccclass
    ], ZJH_Table);
    return ZJH_Table;
}(Game_GoldBase_1.default));
exports.default = ZJH_Table;

cc._RF.pop();