"use strict";
cc._RF.push(module, 'd005dQ65H5PvpPadFI9HVW0', 'ZJHCanvas');
// Script/SceneScript/ZJH/ZJHCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var ZJH_Help = require("./ZJH_Help");
var ZJHCanvas = /** @class */ (function (_super) {
    __extends(ZJHCanvas, _super);
    function ZJHCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 动作节点
         *
         * @type {cc.Node}
         * @memberof ZJHCanvas
         */
        _this.node_action = null;
        /**
         * 玩家界面节点
         *
         * @type {cc.Node}
         * @memberof ZJHCanvas
         */
        _this.node_player = null;
        /**
         * 桌子界面节点
         *
         * @type {cc.Node}
         * @memberof ZJHCanvas
         */
        _this.node_table = null;
        /**
         * 游戏场景的遮罩层
         * @type {cc.Node}
         * @memberof ZJHCanvas
         */
        _this.node_mask = null;
        /**
         *牌节点
         * @type {cc.Prefab}
         * @memberof ZJHCanvas
         */
        _this.card_prefab = null;
        /**
         * 翻牌动画
         * @type {cc.Prefab}
         * @memberof ZJHCanvas
         */
        _this.fanpai_prefab = null;
        /**
         * 比牌预设
         * @type {cc.Prefab}
         * @memberof ZJHCanvas
         */
        _this.bpPrefab = null;
        /**
         * 比牌失败预设
         * @type {cc.Prefab}
         * @memberof ZJHCanvas
         */
        _this.bpsbPrefab = null;
        /**
         * 牌抖动的预设
         * @type {cc.Prefab}
         * @memberof ZJHCanvas
         */
        _this.spPrefab = null;
        /**
         * 倒计时的预设
         * @type {cc.Prefab[]} 0=自己 1=别人
         * @memberof ZJHCanvas
         */
        _this.timeDown_prefab_list = [];
        /**
         * 动作脚本
         * @memberof ZJHCanvas
         */
        _this._dealScript = null;
        /**
         * 玩家脚本
         * @memberof ZJHCanvas
         */
        _this._playerScript = null;
        /**
         * 桌子脚本
         * @memberof ZJHCanvas
         */
        _this._tableScript = null;
        /**
         * 是否结算
         * @type {boolean}
         * @memberof ZJHCanvas
         */
        _this._isShowResult = false;
        /**
         * 是否发牌
         * @type {boolean}
         * @memberof ZJHCanvas
         */
        _this._isFPAction = false;
        /**
         * 游戏状态推送消息函数
         *
         * @memberof MJCanvas
         */
        _this.ZJH_GamePush = function (event) {
            var data = event.detail;
            dd.gm_manager.zjhGameData = data;
            _this.showZJHInfo();
        };
        /**
         * 推送消息(座位数据变化) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.ZJH_SeatPush = function (event) {
            var data = event.detail;
            dd.gm_manager.zjhGameData = data;
            _this.showZJHInfo();
        };
        /**
         * 推送消息(下注数据变化) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.ZJH_BetPush = function (event) {
            var data = event.detail;
            cc.log('下注push');
            cc.log(data);
            dd.gm_manager.zjhGameData = data.tableVo;
            _this.showZJHInfo();
            var seatInfo = ZJH_Help.getSeatBySeatId(data.btIndex);
            if (seatInfo && seatInfo.btState !== ZJH_Help.ZJH_BT_State.ACT_STATE_WAIT && seatInfo.bGamed === 1) {
                var index = ZJH_Help.getIndexBySeatId(seatInfo.seatIndex);
                switch (seatInfo.btVal) {
                    case ZJH_Help.ZJH_Act_State.BT_VAL_DROP://弃牌
                        dd.mp_manager.playZJH('state_qp');
                        _this.showQPAction(seatInfo.seatIndex);
                        break;
                    case ZJH_Help.ZJH_Act_State.BT_VAL_LOOCK://看牌
                        dd.mp_manager.playZJH('state_kp');
                        break;
                    case ZJH_Help.ZJH_Act_State.BT_VAL_COMPARAE://比牌
                        break;
                    case ZJH_Help.ZJH_Act_State.BT_VAL_BETALL://全下
                        dd.mp_manager.playZJH('state_allin');
                        _this._tableScript.playGoldAction(_this._playerScript.getPosByIndex(index), data.betMoney);
                        break;
                    case ZJH_Help.ZJH_Act_State.BT_VAL_BETSAME://跟注
                        dd.mp_manager.playZJH('state_gz');
                        _this._tableScript.playGoldAction(_this._playerScript.getPosByIndex(index), data.betMoney);
                        break;
                    case ZJH_Help.ZJH_Act_State.BT_VAL_BETADD://加注
                        dd.mp_manager.playZJH('state_jz');
                        _this._tableScript.playGoldAction(_this._playerScript.getPosByIndex(index), data.betMoney);
                        break;
                    default:
                }
            }
        };
        /**
         * 推送消息(玩家被踢出座位) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.ZJH_KickPush = function (event) {
            var data = event.detail;
            var str = '';
            if (data === 1) {
                str = '您的金币不足,被踢出房间！';
            }
            else if (data === 3) {
                str = '您长时间未准备，已被踢出房间！';
            }
            if (dd.ui_manager.showLoading()) {
                dd.ud_manager.mineData.tableId = 0;
                cc.director.loadScene('HomeScene', function () {
                    dd.ui_manager.showTip(str);
                    dd.gm_manager.destroySelf();
                });
            }
        };
        /**
         * 推送消息(玩家看牌数据)
         *
         * @memberof MJCanvas
         */
        _this.ZJH_LookPush = function (event) {
            var data = event.detail;
            cc.log('玩家看牌push');
            cc.log(data);
            var seatInfo = ZJH_Help.getSeatBySeatId(data.btIndex);
            dd.mp_manager.playZJH('state_kp');
            //如果是自己，显示翻牌
            if (seatInfo.accountId === dd.ud_manager.mineData.accountId) {
                _this._playerScript.showFPActionBySeatId(data.btIndex);
            }
            dd.gm_manager.zjhGameData = data.tableVo;
            _this.showZJHInfo();
        };
        /**
         * //推送消息(玩家房卡数据变化)
         * @memberof ZJHCanvas
         */
        _this.WalletPush = function (event) {
            var data = event.detail;
            var wallet = data;
            var zjhGameData = dd.gm_manager.zjhGameData;
            if (zjhGameData) {
                for (var i = 0; i < zjhGameData.seats.length; i++) {
                    if (dd.ud_manager.mineData.accountId === zjhGameData.seats[i].accountId) {
                        dd.gm_manager.zjhGameData.seats[i].money = wallet.roomCard;
                        break;
                    }
                }
                _this._playerScript.showPlayerInfo();
            }
        };
        /**
         * //推送消息(准备)
         * @memberof ZJHCanvas
         */
        _this.readyPush = function (event) {
            var data = event.detail;
            dd.gm_manager.zjhGameData = data;
            _this.showZJHInfo();
        };
        _this.onTouchMaskUp = function (event) {
            _this.showMask(false);
            event.stopPropagation();
        };
        return _this;
    }
    /**
      * 绑定游戏push
      *
      * @memberof MJCanvas
      */
    ZJHCanvas.prototype.bindOnPush = function () {
        //推送消息(游戏状态变化)
        cc.systemEvent.on('GamePush', this.ZJH_GamePush);
        //推送消息(座位数据变化)
        cc.systemEvent.on('SeatPush', this.ZJH_SeatPush);
        //推送消息(下注数据变化)
        cc.systemEvent.on('BetPush', this.ZJH_BetPush);
        //推送消息(玩家被踢出座位)
        cc.systemEvent.on('KickPush', this.ZJH_KickPush);
        //推送消息(玩家看牌数据)
        cc.systemEvent.on('LookPush', this.ZJH_LookPush);
        //推送消息(玩家房卡数据变化)
        cc.systemEvent.on('WalletPush', this.WalletPush);
        //准备
        cc.systemEvent.on('Ready', this.readyPush);
    };
    /**
     * 解除绑定游戏push
     *
     * @memberof MJCanvas
     */
    ZJHCanvas.prototype.bindOffPush = function () {
        //推送消息(游戏状态变化)
        cc.systemEvent.off('GamePush', this.ZJH_GamePush);
        //推送消息(座位数据变化)
        cc.systemEvent.off('SeatPush', this.ZJH_SeatPush);
        //推送消息(下注数据变化)
        cc.systemEvent.off('BetPush', this.ZJH_BetPush);
        //推送消息(玩家被踢出座位)
        cc.systemEvent.off('KickPush', this.ZJH_KickPush);
        //推送消息(玩家看牌数据)
        cc.systemEvent.off('LookPush', this.ZJH_LookPush);
        //推送消息(玩家房卡数据变化)
        cc.systemEvent.off('WalletPush', this.WalletPush);
        //准备
        cc.systemEvent.off('Ready', this.readyPush);
    };
    ZJHCanvas.prototype.onLoad = function () {
        var _this = this;
        this._dealScript = this.node_action.getComponent('Game_DealScript');
        this._playerScript = this.node_player.getComponent('ZJH_Player');
        this._tableScript = this.node_table.getComponent('ZJH_Table');
        this.node.on("touchend", function (event) {
            _this._tableScript.showAddReturnToState();
            event.stopPropagation();
        }, this);
        this.bindOnPush();
    };
    ZJHCanvas.prototype.onDestroy = function () {
        this.bindOffPush();
    };
    ZJHCanvas.prototype.start = function () {
        var _this = this;
        if (dd.ui_manager.showLoading('正在加载桌子信息')) {
            //获取房间信息
            var obj = { 'tableId': dd.gm_manager.zjhGameData.tableId, 'type': 0 };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_JION_TABLEID, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    dd.gm_manager.zjhGameData = content;
                    _this.showZJHInfo();
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示', {
                        lbl_name: '确定',
                        callback: function () {
                            if (dd.ui_manager.showLoading()) {
                                dd.ud_manager.mineData.tableId = 0;
                                cc.director.loadScene('HomeScene', function () {
                                    dd.gm_manager.destroySelf();
                                });
                            }
                        }
                    });
                }
                cc.log(content);
            });
        }
    };
    /**
     *
     *
     * @param {ZJH_Help.ZJH_Act_State} type
     * @param {number} data  //看牌 = 0 比牌=别人的座位号 押注=金额
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.sendBetInfo = function (type, data) {
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        if (mySeat) {
            var obj = {
                'tableId': dd.gm_manager.zjhGameData.tableId,
                'seatIndex': mySeat.seatIndex,
                'bt': type,
                'btVal': data,
            };
            //如果是下注，
            if (type === ZJH_Help.ZJH_Act_State.BT_VAL_BETSAME || type === ZJH_Help.ZJH_Act_State.BT_VAL_BETADD) {
                //如果下注的钱大于单注上限，
                if (obj.btVal > dd.gm_manager.zjhGameData.onceMax) {
                    obj.btVal = dd.gm_manager.zjhGameData.onceMax;
                }
                //如果下注的钱大于自己的钱，那么下注的钱就是自己身上所有的钱
                if (obj.btVal > mySeat.money) {
                    obj.btVal = mySeat.money;
                }
                //如果下注的钱 大于等于 自己身上所有的钱，就是全押
                if (mySeat.money <= obj.btVal) {
                    obj.bt = ZJH_Help.ZJH_Act_State.BT_VAL_BETALL;
                }
                obj.btVal = obj.btVal + mySeat.betMoney;
            }
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_BET, msg, function (flag, content) {
                if (flag === 0) {
                    cc.log('下注成功');
                }
                else if (flag === -1) {
                    cc.log(content);
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
    * 发送准备
    *
    * @memberof MJCanvas
    */
    ZJHCanvas.prototype.sendReadyGame = function () {
        // if (dd.ui_manager.showLoading()) {
        var obj = {
            'tableId': dd.gm_manager.zjhGameData.tableId,
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_NN_GAME_READY, msg, function (flag, content) {
            dd.ui_manager.hideLoading();
            if (flag === 0) {
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('准备消息发送超时,请重试!');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
        // }
    };
    /**
     * 退出桌子
     *
     * @memberof MJCanvas
     */
    ZJHCanvas.prototype.sendOutGame = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = {
                'tableId': dd.gm_manager.zjhGameData.tableId,
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_LEAVE, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.sendGetRoomInfo();
                }
                else if (flag === -1) {
                    cc.log(content);
                }
                else {
                    dd.ui_manager.showAlert(content, '错误提示', {
                        lbl_name: '确定',
                        callback: function () {
                            _this.sendGetRoomInfo();
                        }
                    });
                }
            });
        }
    };
    /**
     * 获取房间列表
     *
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.sendGetRoomInfo = function () {
        if (dd.ui_manager.showLoading('正在获取房间列表,请稍后')) {
            var obj = { 'gameType': 2 };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_GET_ROOM_LIST, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    var items_1 = content.items;
                    dd.ud_manager.mineData.tableId = 0;
                    cc.director.loadScene('ZJHRoomScene', function () {
                        dd.gm_manager.destroySelf();
                        dd.ui_manager.getCanvasNode().getComponent('ZJH_RoomCanvas').init(items_1);
                    });
                }
                else if (flag === -1) {
                    if (dd.ui_manager.showLoading()) {
                        dd.ud_manager.mineData.tableId = 0;
                        cc.director.loadScene('HomeScene', function () {
                            dd.gm_manager.destroySelf();
                        });
                    }
                }
                else {
                    if (dd.ui_manager.showLoading()) {
                        dd.ud_manager.mineData.tableId = 0;
                        cc.director.loadScene('HomeScene', function () {
                            dd.gm_manager.destroySelf();
                        });
                    }
                }
            });
        }
    };
    /**
     * 显示扎金花信息
     *
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showZJHInfo = function () {
        var _this = this;
        cc.log('------游戏状态----' + dd.gm_manager.zjhGameData.gameState);
        cc.log(dd.gm_manager.zjhGameData);
        //座位排序
        dd.gm_manager.zjhGameData.seats = ZJH_Help.sortSeatList(dd.gm_manager.zjhGameData.seats);
        this._playerScript.showPlayerInfo();
        this._tableScript.showTableInfo();
        this.showMask();
        //动作
        var action = dd.gm_manager.zjhGameData.gameState;
        if (action !== ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_OVER) {
            this._isShowResult = false;
        }
        if (action !== ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI) {
            this._isFPAction = false;
        }
        switch (action) {
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_READY: {
                break;
            }
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_BASESCORE: {
                //开始游戏的音效
                dd.mp_manager.playStart(function () {
                    //开始游戏，每个在玩玩家下底注
                    var obj = _this._playerScript.getFPPosList();
                    _this._dealScript.showDeal(obj.posList, function (index) {
                        _this._tableScript.playGoldAction(_this._playerScript.getPosByIndex(index), dd.gm_manager.zjhGameData.baseScore);
                    });
                });
                break;
            }
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI: {
                var dTime = (Number(dd.gm_manager.zjhGameData.actTime) - Number(dd.gm_manager.zjhGameData.svrTime)) / 1000;
                //剩余时间大于0
                if (dTime > 3) {
                    dd.mp_manager.playZJH('fapai', function () {
                        _this.showFaPai();
                    });
                }
                break;
            }
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_BET: {
                break;
            }
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE: {
                var dTime = (Number(dd.gm_manager.zjhGameData.actTime) - Number(dd.gm_manager.zjhGameData.svrTime)) / 1000;
                if (dTime > 3) {
                    dd.mp_manager.playZJH('state_bp');
                    this.showBPAction();
                }
                break;
            }
            case ZJH_Help.ZJH_Game_State.STATE_TABLE_ZJH_OVER: {
                if (!this._isShowResult) {
                    this._isShowResult = true;
                    this._playerScript.showAllFPAction();
                    //显示结算动画
                    this.showWinAction();
                }
                break;
            }
            default:
                break;
        }
    };
    /**
     * 显示发牌动画
     *
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showFaPai = function () {
        var _this = this;
        if (this._isFPAction)
            return;
        this._isFPAction = true;
        var obj = this._playerScript.getFPPosList();
        this._dealScript.showDealFP(cc.v2(0, 240), obj.posList, function (index, roll) {
            _this._playerScript.showPokerByIndex(obj.playerIndexList[index], roll, 0, false);
        }, null, 3);
    };
    /**
     * 显示翻牌牌动画
     * @param {number} cardId 牌数据
     * @param {cc.Node} parentNode 牌父节点
     * @param {*} [cb] 回调函数
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showFanPai = function (cardId, parentNode, cb) {
        var fanpai = cc.instantiate(this.fanpai_prefab);
        var fpScript = fanpai.getComponent('Game_ActionFP');
        fpScript.initData(cardId, dd.img_manager.getCardSpriteFrameById(cardId), cb);
        fanpai.parent = parentNode;
    };
    /**
     *显示牌信息
     * @param {number} cardId 牌数据
     * @param {cc.Node} parentNode 牌父节点
     * @param {boolean} [isShow=true]  是否显示
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showCard = function (cardId, parentNode, isShow) {
        if (isShow === void 0) { isShow = true; }
        var node_card = cc.instantiate(this.card_prefab);
        var card_script = node_card.getComponent('Game_Card');
        if (cardId > -1) {
            var pokerImg = dd.img_manager.getCardSpriteFrameById(cardId);
            card_script.initData(cardId, pokerImg, isShow);
        }
        node_card.parent = parentNode;
    };
    /**
     * 显示倒计时
     * @param {number} type
     * @param {number} sTime
     * @param {number} cTime
     * @param {boolean} isPlayEfc
     * @param {cc.Node} parentNode
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showSJDAction = function (type, sTime, cTime, isPlayEfc, parentNode) {
        var tdNode = null;
        if (type === 0) {
            tdNode = cc.instantiate(this.timeDown_prefab_list[0]);
        }
        else {
            tdNode = cc.instantiate(this.timeDown_prefab_list[1]);
        }
        var tdScript = tdNode.getComponent('Game_TimeDown');
        tdScript.initData(sTime, cTime, isPlayEfc, parentNode);
    };
    /**
     * 显示比牌动作
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showBPAction = function () {
        var bpAction = cc.instantiate(this.bpPrefab);
        bpAction.parent = dd.ui_manager.getRootNode();
        dd.mp_manager.playZJH('bp');
    };
    /**
     * 显示比牌失败动作
     * @param {any} pos
     * @param {any} parentNode
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showBPSBAction = function (pos, parentNode) {
        dd.mp_manager.playZJH('kd');
        var bpsbNode = cc.instantiate(this.bpsbPrefab);
        bpsbNode.setPosition(pos);
        bpsbNode.parent = parentNode;
    };
    /**
     *显示弃牌动作
     * @param {Number} seatId
     * @returns
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showQPAction = function (seatId, cb) {
        if (cb === void 0) { cb = null; }
        if (seatId < 0 || seatId > 5) {
            cc.log('弃牌索引错误');
            return;
        }
        var index = ZJH_Help.getIndexBySeatId(seatId);
        var pos = this._playerScript.getPosByIndex(index);
        this._dealScript.showDealDiscard(pos, cb);
        //获取自己的座位信息
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        //如果是自己
        if (mySeat && mySeat.seatIndex === seatId) {
            this._playerScript.showFPActionBySeatId(seatId);
        }
    };
    /**
     * 创建一个抖动的动作
     * @param {number} seatId
     * @param {cc.Vec2} pos
     * @memberof ZJH_Table
     */
    ZJHCanvas.prototype.showShakeAction = function (seatId, pos) {
        var pokerShake = cc.instantiate(this.spPrefab);
        pokerShake.setPosition(pos);
        var shakeScript = pokerShake.getComponent("ZJH_PokerShake");
        shakeScript.initData(seatId, this);
        pokerShake.parent = this.node_mask;
        var anim = pokerShake.getComponent(cc.Animation);
        anim.play();
    };
    /**
     * 显示游戏场景的遮罩
     * @param {boolean} isShow  是否显示
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showMask = function (isShow) {
        if (isShow === void 0) { isShow = false; }
        this.node_mask.active = isShow;
        if (isShow) {
            this.node.on("touchend", this.onTouchMaskUp, this);
        }
        else {
            this.node_mask.removeAllChildren(true);
            this.node_mask.off('touchend', this.onTouchMaskUp, this);
        }
    };
    /**
     * 显示选择比牌的界面
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showChooseBPAction = function () {
        this.showMask(true);
        this._playerScript.showPokerShakeAction();
    };
    /**
     * 显示赢家动画
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.showWinAction = function () {
        var _this = this;
        if (dd.gm_manager.zjhGameData.ZJHOverItems) {
            var winlist_1 = dd.gm_manager.zjhGameData.ZJHOverItems;
            var winIndex = 0;
            var winGold = 0;
            for (var i = 0; i < winlist_1.length; i++) {
                var gold = winlist_1[i].score;
                if (gold > winGold) {
                    winGold = gold;
                    winIndex = winlist_1[i].seatIndex;
                }
            }
            var index = ZJH_Help.getIndexBySeatId(winIndex);
            var pos = this._playerScript.getPosByIndex(index);
            this._tableScript.playWinGoldAction(pos, function () {
                for (var i = 0; i < winlist_1.length; i++) {
                    var nGold = winlist_1[i].score;
                    var nIndex = ZJH_Help.getIndexBySeatId(winlist_1[i].seatIndex);
                    var ePos = _this._playerScript.getPosByIndex(nIndex);
                    var color = nGold > 0 ? cc.Color.RED : cc.Color.GREEN;
                    var str = dd.utils.getShowNumberString(nGold);
                    if (nGold > 0) {
                        str = '+' + str;
                    }
                    _this.craeteLalelAction(str, ePos, color);
                }
            });
        }
    };
    /**
     * 创建文本动作
     * @param {string} str 文本
     * @param {cc.Vec2} pos 坐标点
     * @param {cc.Color} color 颜色
     * @param {cc.Node} parentNode  父节点
     * @memberof ZJHCanvas
     */
    ZJHCanvas.prototype.craeteLalelAction = function (str, pos, color) {
        var lblNode = new cc.Node();
        lblNode.color = color;
        lblNode.setPosition(pos);
        var lbl = lblNode.addComponent(cc.Label);
        lbl.fontSize = 50;
        lbl.lineHeight = 50;
        lbl.string = str;
        lblNode.parent = dd.ui_manager.getRootNode();
        var seq = cc.sequence(cc.moveTo(2, cc.v2(pos.x, pos.y + 80)), cc.callFunc(function () {
            lblNode.removeFromParent(true);
            lblNode.destroy();
        }));
        lblNode.runAction(seq);
    };
    __decorate([
        property(cc.Node)
    ], ZJHCanvas.prototype, "node_action", void 0);
    __decorate([
        property(cc.Node)
    ], ZJHCanvas.prototype, "node_player", void 0);
    __decorate([
        property(cc.Node)
    ], ZJHCanvas.prototype, "node_table", void 0);
    __decorate([
        property(cc.Node)
    ], ZJHCanvas.prototype, "node_mask", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJHCanvas.prototype, "card_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJHCanvas.prototype, "fanpai_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJHCanvas.prototype, "bpPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJHCanvas.prototype, "bpsbPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ZJHCanvas.prototype, "spPrefab", void 0);
    __decorate([
        property([cc.Prefab])
    ], ZJHCanvas.prototype, "timeDown_prefab_list", void 0);
    ZJHCanvas = __decorate([
        ccclass
    ], ZJHCanvas);
    return ZJHCanvas;
}(cc.Component));
exports.default = ZJHCanvas;

cc._RF.pop();