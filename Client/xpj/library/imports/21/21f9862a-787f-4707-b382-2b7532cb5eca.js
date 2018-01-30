"use strict";
cc._RF.push(module, '21f98YqeH9HB7OCK3Uyy17K', 'NNBattleCanvas');
// Script/SceneScript/NN/NNBattleCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var NNBattleCanvas = /** @class */ (function (_super) {
    __extends(NNBattleCanvas, _super);
    function NNBattleCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 桌子ID
         *
         * @type {cc.Label}
         * @memberof NNBattleCanvas
         */
        _this.lbl_tableId = null;
        /**
         * 桌子中间显示的(下注额度显示)
         *
         * @type {cc.Label}
         * @memberof NNBattleCanvas
         */
        _this.lbl_mid = null;
        /**
         * 上方玩家节点
         *
         * @type {cc.Node}
         * @memberof NNBattleCanvas
         */
        _this.player_up = null;
        /**
         * 下方自己的节点
         *
         * @type {cc.Node}
         * @memberof NNBattleCanvas
         */
        _this.player_down = null;
        /**
         * 结算面板
         *
         * @type {cc.Node}
         * @memberof NNBattleCanvas
         */
        _this.result = null;
        /**
         * 胜利节点
         *
         * @type {cc.Node}
         * @memberof NNBattleCanvas
         */
        _this.winNode = null;
        /**
         * 失败节点
         *
         * @type {cc.Node}
         * @memberof NNBattleCanvas
         */
        _this.loseNode = null;
        _this.fpNode = null;
        _this.fpPrefab = null;
        _this.niuSFs = [];
        _this.isRunAction = false;
        _this.isKick = false;
        /**
         * 倒计时,不为0就做倒计时
         *
         * @type {number}
         * @memberof NNBattleCanvas
         */
        _this.diffTime = 0;
        _this.needWait = false;
        _this.gamePush = function (event) {
            dd.gm_manager.nnGameData = event.detail;
            _this.changeDiffTime();
            if (dd.gm_manager.nnGameData.gameState === 1) {
                dd.mp_manager.playNN('go');
            }
            if (dd.gm_manager.nnGameData.gameState === 2) {
                dd.mp_manager.playNN('ding');
            }
            if (dd.gm_manager.nnGameData.gameState === 3) {
                dd.mp_manager.playNN('startBet');
            }
            if (dd.gm_manager.nnGameData.gameState === 4) {
                _this.isRunAction = true;
                if (dd.gm_manager.nnGameData.bankerId === dd.ud_manager.mineData.accountId) {
                    _this.fp(_this.player_up, _this.player_down);
                }
                else {
                    _this.fp(_this.player_down, _this.player_up);
                }
            }
        };
        _this.seatPush = function (event) {
            if (_this.isRunAction) {
                var data_1 = event.detail;
                var id_1 = setInterval(function () {
                    if (!_this.isRunAction) {
                        clearInterval(id_1);
                        dd.gm_manager.nnGameData = data_1;
                        _this.updateUp(true);
                    }
                }, 100);
            }
            else {
                dd.gm_manager.nnGameData = event.detail;
                _this.updateUp(true);
            }
        };
        _this.betPush = function (event) {
            var data = event.detail;
            dd.gm_manager.nnGameData = data.tableVo;
            _this.changeDiffTime();
            dd.mp_manager.playCoinMove();
        };
        _this.kickPush = function (event) {
            dd.ud_manager.mineData.tableId = 0;
            if (event.detail === 1) {
                cc.log('钱不够了!');
                _this.isKick = true;
            }
            else {
                _this.getRoomInfo();
            }
        };
        _this.callBanker = function (event) {
            dd.gm_manager.nnGameData = event.detail;
            _this.changeDiffTime();
        };
        _this.walletPush = function (event) {
            var data = event.detail;
            var wallet = data;
            var nnGameData = dd.gm_manager.nnGameData;
            if (nnGameData) {
                for (var i = 0; i < nnGameData.seats.length; i++) {
                    if (dd.ud_manager.mineData.accountId === nnGameData.seats[i].accountId) {
                        dd.gm_manager.nnGameData.seats[i].money = wallet.roomCard;
                        break;
                    }
                }
            }
        };
        _this.readyPush = function (event) {
            if (_this.isRunAction) {
                var data_2 = event.detail;
                var id_2 = setInterval(function () {
                    if (!_this.isRunAction) {
                        clearInterval(id_2);
                        dd.gm_manager.nnGameData = data_2;
                        _this.changeDiffTime();
                        dd.mp_manager.playNN('ding');
                    }
                }, 100);
            }
            else {
                dd.gm_manager.nnGameData = event.detail;
                _this.changeDiffTime();
                dd.mp_manager.playNN('ding');
            }
        };
        return _this;
    }
    NNBattleCanvas.prototype.updateUp = function (needUpdate) {
        if (needUpdate === void 0) { needUpdate = false; }
        if (dd.gm_manager.nnGameData.seats[0].accountId !== '0' && dd.gm_manager.nnGameData.seats[1].accountId !== '0') {
            var playerData = this.getSeatData(false);
            if (!this.player_up.active || needUpdate) {
                this.changePlayerInfo(playerData, this.player_up);
            }
            this.updatePlayer(playerData, this.player_up);
            this.player_up.active = true;
        }
        else {
            this.player_up.active = false;
        }
    };
    NNBattleCanvas.prototype.updateMid = function () {
        if (dd.gm_manager.nnGameData.totalBetMoney > 0 && dd.gm_manager.nnGameData.gameState > 1) {
            this.lbl_mid.string = '已下注: ' + dd.gm_manager.nnGameData.totalBetMoney;
        }
        else {
            this.lbl_mid.string = '';
        }
    };
    NNBattleCanvas.prototype.updateDown = function () {
        var playerData = this.getSeatData(true);
        this.updatePlayer(playerData, this.player_down);
    };
    NNBattleCanvas.prototype.changePlayerInfo = function (playerData, seatNode) {
        var playerNode = seatNode.getChildByName('player_board');
        playerNode.getChildByName('name').getComponent(cc.Label).string = playerData.nick;
        cc.find('layout/money', playerNode).getComponent(cc.Label).string = dd.utils.getShowNumberString(playerData.money);
        playerNode.getChildByName('head').getComponent(cc.Sprite).spriteFrame = dd.img_manager.getHeadById(Number(playerData.headImg));
    };
    NNBattleCanvas.prototype.updatePlayer = function (playerData, seatNode) {
        var playerNode = seatNode.getChildByName('player_board');
        if (dd.gm_manager.nnGameData.bankerId === playerData.accountId) {
            if (dd.gm_manager.nnGameData.gameState > 2) {
                playerNode.getChildByName('zhuang').active = true;
            }
            else {
                playerNode.getChildByName('zhuang').active = false;
            }
        }
        else {
            playerNode.getChildByName('zhuang').active = false;
        }
        var timeNode = cc.find('player_board/time', seatNode);
        var niuNode = seatNode.getChildByName('niu');
        var infoNode = seatNode.getChildByName('lbl_info');
        var cardLayout = seatNode.getChildByName('cardLayout');
        //down才有的节点
        var btnLayout = seatNode.getChildByName('btnLayout');
        var jzLayout = seatNode.getChildByName('jzLayout');
        var btnReady = seatNode.getChildByName('btn_ready');
        switch (dd.gm_manager.nnGameData.gameState) {
            case 0://空闲
                if (this.isRunAction)
                    return;
                timeNode.active = false;
                niuNode.active = false;
                cardLayout.active = false;
                this.cleanCardLayout(cardLayout);
                if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                    btnLayout.active = false;
                    jzLayout.active = false;
                    if (playerData.btState === 0) {
                        btnReady.active = true;
                        infoNode.active = false;
                    }
                    else {
                        btnReady.active = false;
                        infoNode.active = true;
                        infoNode.getComponent(cc.Label).string = '已准备';
                    }
                }
                else {
                    infoNode.active = true;
                    if (playerData.btState === 0) {
                        infoNode.getComponent(cc.Label).string = '未准备';
                    }
                    else {
                        infoNode.getComponent(cc.Label).string = '已准备';
                    }
                }
                break;
            case 1://游戏开始
                break;
            case 2://叫庄
                niuNode.active = false;
                cardLayout.active = false;
                this.cleanCardLayout(cardLayout);
                if (playerData.seatIndex === dd.gm_manager.nnGameData.btIndex) {
                    timeNode.active = true;
                    timeNode.getChildByName('lbl_time').getComponent(cc.Label).string = Math.floor(this.diffTime / 1000).toString();
                    if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                        btnReady.active = false;
                        btnLayout.active = false;
                        if (playerData.btState === 0) {
                            jzLayout.active = true;
                            infoNode.active = false;
                        }
                        else {
                            jzLayout.active = false;
                            infoNode.active = true;
                            infoNode.getComponent(cc.Label).string = playerData.btState === 1 ? '叫庄' : '不叫';
                        }
                    }
                    else {
                        infoNode.active = true;
                        if (playerData.btState === 0) {
                            infoNode.getComponent(cc.Label).string = '叫庄思考中...';
                        }
                        else {
                            infoNode.getComponent(cc.Label).string = playerData.btState === 1 ? '叫庄' : '不叫';
                        }
                    }
                }
                else {
                    timeNode.active = false;
                    if (playerData.btState === 0) {
                        infoNode.active = false;
                    }
                    else {
                        infoNode.getComponent(cc.Label).string = playerData.btState === 1 ? '叫庄' : '不叫';
                    }
                    if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                        btnReady.active = false;
                        btnLayout.active = false;
                        jzLayout.active = false;
                    }
                }
                break;
            case 3://押注
                niuNode.active = false;
                cardLayout.active = false;
                this.cleanCardLayout(cardLayout);
                if (playerData.seatIndex === dd.gm_manager.nnGameData.btIndex) {
                    timeNode.active = true;
                    timeNode.getChildByName('lbl_time').getComponent(cc.Label).string = Math.floor(this.diffTime / 1000).toString();
                    if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                        btnReady.active = false;
                        jzLayout.active = false;
                        infoNode.active = false;
                        if (playerData.btState === 0) {
                            btnLayout.active = true;
                            var minMoney = dd.gm_manager.nnGameData.seats[0].money < dd.gm_manager.nnGameData.seats[1].money ? dd.gm_manager.nnGameData.seats[0].money : dd.gm_manager.nnGameData.seats[1].money;
                            var btn1 = btnLayout.getChildByName('btn1');
                            btn1.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 1).toString();
                            var btn2 = btnLayout.getChildByName('btn2');
                            btn2.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 2).toString();
                            var btn3 = btnLayout.getChildByName('btn3');
                            btn3.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 3).toString();
                            var btn4 = btnLayout.getChildByName('btn4');
                            btn4.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 4).toString();
                            var btn5 = btnLayout.getChildByName('btn5');
                            btn5.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 5).toString();
                            var btn6 = btnLayout.getChildByName('btn6');
                            btn6.getChildByName('money').getComponent(cc.Label).string = Math.floor(minMoney / 36 * 6).toString();
                        }
                        else {
                            btnLayout.active = false;
                        }
                    }
                    else {
                        if (playerData.btState === 0) {
                            infoNode.active = true;
                            infoNode.getComponent(cc.Label).string = '押注思考中...';
                        }
                        else {
                            infoNode.active = false;
                        }
                    }
                }
                else {
                    timeNode.active = false;
                    infoNode.active = false;
                    if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                        btnReady.active = false;
                        btnLayout.active = false;
                        jzLayout.active = false;
                    }
                }
                break;
            case 4://发牌
                // niuNode.active = true;
                cardLayout.active = true;
                timeNode.active = false;
                infoNode.active = false;
                if (playerData.accountId === dd.ud_manager.mineData.accountId) {
                    btnReady.active = false;
                    btnLayout.active = false;
                    jzLayout.active = false;
                }
                break;
            default: break;
        }
    };
    NNBattleCanvas.prototype.cleanCardLayout = function (layout) {
        for (var j = 1; j < 6; j++) {
            var cardNode = layout.getChildByName('card' + j);
            cardNode.removeAllChildren();
        }
    };
    NNBattleCanvas.prototype.clickBack = function () {
        var _this = this;
        if (this.needWait || this.isRunAction)
            return;
        dd.mp_manager.playButton();
        if (dd.gm_manager.nnGameData.gameState > 0 && dd.gm_manager.nnGameData.gameState < 4) {
            dd.ui_manager.showAlert('这把游戏还没结算不能逃跑哦!!!', '温馨提示');
        }
        else {
            if (dd.ui_manager.showLoading('正在加载,请稍后')) {
                this.needWait = true;
                if (this.isKick) {
                    this.getRoomInfo();
                }
                else {
                    var obj = { 'tableId': dd.gm_manager.nnGameData.tableId };
                    var msg = JSON.stringify(obj);
                    dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_LEAVE, msg, function (flag, content) {
                        if (flag === 0) {
                        }
                        else if (flag === -1) {
                            dd.ui_manager.showTip('退出消息发送超时,请重试!');
                            _this.needWait = false;
                        }
                        else {
                            dd.ui_manager.showTip(content);
                            _this.needWait = false;
                        }
                    });
                }
            }
        }
    };
    NNBattleCanvas.prototype.clickJZ = function (event, type) {
        var _this = this;
        if (this.needWait)
            return;
        dd.mp_manager.playButton();
        this.needWait = true;
        var jzLayout = this.player_down.getChildByName('jzLayout');
        var timeNode = cc.find('player_board/time', this.player_down);
        jzLayout.active = false;
        timeNode.active = false;
        var num = Number(type);
        var obj = {
            'tableId': dd.gm_manager.nnGameData.tableId,
            'bt': num
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_CALL_BANKER, msg, function (flag, content) {
            _this.needWait = false;
            if (flag === 0) {
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('叫庄消息发送超时,请重试!');
                jzLayout.active = true;
                timeNode.active = true;
            }
            else {
                dd.ui_manager.showTip(content);
                jzLayout.active = true;
                timeNode.active = true;
            }
        });
    };
    NNBattleCanvas.prototype.clickReady = function () {
        var _this = this;
        if (this.needWait)
            return;
        dd.mp_manager.playButton();
        this.needWait = true;
        this.result.active = false;
        var btnReady = this.player_down.getChildByName('btn_ready');
        btnReady.active = false;
        var obj = { 'tableId': dd.gm_manager.nnGameData.tableId };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_NN_GAME_READY, msg, function (flag, content) {
            _this.needWait = false;
            if (flag === 0) {
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('准备消息发送超时,请重试!');
                btnReady.active = true;
            }
            else {
                dd.ui_manager.showTip(content);
                btnReady.active = true;
            }
        });
    };
    NNBattleCanvas.prototype.clickBet = function (event, index) {
        var _this = this;
        if (this.needWait)
            return;
        dd.mp_manager.playButton();
        this.needWait = true;
        var btnLayout = this.player_down.getChildByName('btnLayout');
        var timeNode = cc.find('player_board/time', this.player_down);
        btnLayout.active = false;
        timeNode.active = false;
        var num = Number(index);
        var mineSeat = dd.gm_manager.nnGameData.seats[0].accountId === dd.ud_manager.mineData.accountId ? dd.gm_manager.nnGameData.seats[0] : dd.gm_manager.nnGameData.seats[1];
        var minMoney = dd.gm_manager.nnGameData.seats[0].money < dd.gm_manager.nnGameData.seats[1].money ? dd.gm_manager.nnGameData.seats[0].money : dd.gm_manager.nnGameData.seats[1].money;
        var obj = {
            'tableId': dd.gm_manager.nnGameData.tableId,
            'seatIndex': mineSeat.seatIndex,
            'bt': 1,
            'btVal': Math.floor(minMoney / 36 * num)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_TABLE_BET, msg, function (flag, content) {
            _this.needWait = false;
            if (flag === 0) {
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('押注消息发送超时,请重试!');
                btnLayout.active = true;
                timeNode.active = true;
            }
            else {
                dd.ui_manager.showTip(content);
                btnLayout.active = true;
                timeNode.active = true;
            }
        });
    };
    NNBattleCanvas.prototype.changeDiffTime = function () {
        this.diffTime = Number(dd.gm_manager.nnGameData.actTime) - Number(dd.gm_manager.nnGameData.svrTime);
        if (this.diffTime < 0) {
            this.diffTime = 0;
        }
    };
    NNBattleCanvas.prototype.update = function (dt) {
        if (dd.gm_manager && dd.gm_manager.nnGameData) {
            if (this.diffTime > 0) {
                this.diffTime -= dt * 1000;
                if (this.diffTime < 0) {
                    this.diffTime = 0;
                }
            }
            this.updateUp();
            this.updateMid();
            this.updateDown();
        }
    };
    NNBattleCanvas.prototype.getSeatData = function (isMine) {
        if (isMine) {
            return dd.gm_manager.nnGameData.seats[0].accountId === dd.ud_manager.mineData.accountId ? dd.gm_manager.nnGameData.seats[0] : dd.gm_manager.nnGameData.seats[1];
        }
        else {
            return dd.gm_manager.nnGameData.seats[0].accountId === dd.ud_manager.mineData.accountId ? dd.gm_manager.nnGameData.seats[1] : dd.gm_manager.nnGameData.seats[0];
        }
    };
    NNBattleCanvas.prototype.fp = function (player1, player2) {
        var _this = this;
        var isMine = (player1 === this.player_down);
        var niu = null;
        var index = 0;
        this.playFP(player1, function () {
            _this.playFP(player2, function () {
                _this.runFP(player1, _this.getSeatData(isMine).handCards, function () {
                    niu = player1.getChildByName('niu');
                    index = dd.card_manager.getNiuTypeByIds(_this.getSeatData(isMine).handCards);
                    niu.getComponent(cc.Sprite).spriteFrame = _this.niuSFs[index];
                    niu.active = true;
                    dd.mp_manager.playNN('bull' + index);
                    niu.runAction(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1), cc.delayTime(1), cc.callFunc(function () {
                        _this.runFP(player2, _this.getSeatData(!isMine).handCards, function () {
                            niu = player2.getChildByName('niu');
                            index = dd.card_manager.getNiuTypeByIds(_this.getSeatData(!isMine).handCards);
                            niu.getComponent(cc.Sprite).spriteFrame = _this.niuSFs[index];
                            niu.active = true;
                            dd.mp_manager.playNN('bull' + index);
                            niu.runAction(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1), cc.delayTime(1), cc.callFunc(function () {
                                if (dd.gm_manager.nnGameData.NNOverItems[0].score > 0) {
                                    dd.mp_manager.playNN('nn_zwin');
                                }
                                else {
                                    dd.mp_manager.playNN('nn_xwin');
                                }
                                setTimeout(function () {
                                    _this.showResult();
                                }, 1000);
                            }, _this)));
                        });
                    }, _this)));
                });
            });
        });
    };
    NNBattleCanvas.prototype.showResult = function () {
        var datas = dd.gm_manager.nnGameData.NNOverItems;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var line = cc.find('board/table/line' + (i + 1), this.result);
            if (data.accountId === dd.ud_manager.mineData.accountId) {
                line.getChildByName('line_bg').active = true;
                var win = cc.find('board/win', this.result);
                var lose = cc.find('board/lose', this.result);
                if (data.score > 0) {
                    win.active = true;
                    lose.active = false;
                    dd.mp_manager.playWin();
                }
                else {
                    win.active = false;
                    lose.active = true;
                    dd.mp_manager.playLose();
                }
            }
            else {
                line.getChildByName('line_bg').active = false;
            }
            if (data.banker === 1) {
                line.getChildByName('zhuang').active = true;
            }
            else {
                line.getChildByName('zhuang').active = false;
            }
            line.getChildByName('lbl_name').getComponent(cc.Label).string = data.nick;
            line.getChildByName('lbl_point').getComponent(cc.Label).string = data.nnDesc;
            line.getChildByName('lbl_gold').getComponent(cc.Label).string = data.score.toString();
        }
        if (this.isKick) {
            cc.find('board/btnLayout/goon', this.result).active = false;
        }
        this.result.active = true;
        this.isRunAction = false;
        this.changePlayerInfo(this.getSeatData(true), this.player_down);
        this.changePlayerInfo(this.getSeatData(false), this.player_up);
    };
    NNBattleCanvas.prototype.getRoomInfo = function () {
        var _this = this;
        var obj = { 'gameType': 1 };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ZJH_GET_ROOM_LIST, msg, function (flag, content) {
            if (flag === 0) {
                var items_1 = content.items;
                cc.director.loadScene('NNRoomScene', function () {
                    dd.gm_manager.nnGameData = null;
                    dd.ui_manager.getCanvasNode().getComponent('NNRoomCanvas').init(items_1);
                });
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间列表失败,请重试!');
                _this.needWait = false;
            }
            else {
                dd.ui_manager.showTip(content);
                _this.needWait = false;
            }
        });
    };
    NNBattleCanvas.prototype.playFP = function (seatNode, callback) {
        var points = [];
        var cardList = [];
        var layout = seatNode.getChildByName('cardLayout');
        for (var j = 1; j < 6; j++) {
            var cardNode = layout.getChildByName('card' + j);
            cardList.push(cardNode);
            var worldPoint = cardNode.parent.convertToWorldSpaceAR(cardNode.getPosition());
            points.push(this.fpNode.convertToNodeSpaceAR(worldPoint));
        }
        var fp = this.fpNode.getComponent('Game_DealScript');
        fp.showDealFP(cc.v2(0, 0), points, function (index, round) {
            var parent = cardList[index];
            var node = new cc.Node();
            node.addComponent(cc.Sprite).spriteFrame = dd.img_manager.getCardSpriteFrameById(1);
            node.width = parent.width;
            node.height = parent.height;
            node.setPosition(0, 0);
            node.parent = parent;
        }, function () {
            callback();
        });
    };
    NNBattleCanvas.prototype.runFP = function (seatNode, cards, callback) {
        var layout = seatNode.getChildByName('cardLayout');
        var objs = [];
        for (var j = 1; j < 6; j++) {
            var cardNode = layout.getChildByName('card' + j);
            var obj = { 'node': cardNode, 'cardId': cards[j - 1] };
            objs.push(obj);
        }
        this.runAction(objs, callback);
    };
    NNBattleCanvas.prototype.runAction = function (objs, callback) {
        var _this = this;
        dd.mp_manager.playFaPai();
        var obj = objs.shift();
        obj.node.removeAllChildren();
        var actionNode = cc.instantiate(this.fpPrefab);
        actionNode.parent = obj.node;
        var sf = dd.img_manager.getCardSpriteFrameById(obj.cardId);
        actionNode.getComponent('Game_ActionFP').initData(obj.cardId, sf, function () {
            if (objs.length > 0) {
                _this.runAction(objs, callback);
            }
            else {
                callback();
            }
        });
    };
    NNBattleCanvas.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = dd.gm_manager.nnGameData.tableId % 50;
                this.lbl_tableId.string = '桌号: ' + (index === 0 ? 50 : index);
                //推送消息(游戏状态变化)
                cc.systemEvent.on('GamePush', this.gamePush);
                //推送消息(座位数据变化)
                cc.systemEvent.on('SeatPush', this.seatPush);
                //推送消息(下注数据变化)
                cc.systemEvent.on('BetPush', this.betPush);
                //推送消息(玩家被踢出座位)
                cc.systemEvent.on('KickPush', this.kickPush);
                //推送消息(叫庄)
                cc.systemEvent.on('CallBanker', this.callBanker);
                //推送消息(玩家房卡数据变化)
                cc.systemEvent.on('WalletPush', this.walletPush);
                //准备
                cc.systemEvent.on('Ready', this.readyPush);
                this.player_up.active = false;
                this.isRunAction = false;
                this.changePlayerInfo(this.getSeatData(true), this.player_down);
                return [2 /*return*/];
            });
        });
    };
    NNBattleCanvas.prototype.onDestroy = function () {
        //推送消息(游戏状态变化)
        cc.systemEvent.off('GamePush', this.gamePush);
        //推送消息(座位数据变化)
        cc.systemEvent.off('SeatPush', this.seatPush);
        //推送消息(下注数据变化)
        cc.systemEvent.off('BetPush', this.betPush);
        //推送消息(玩家被踢出座位)
        cc.systemEvent.off('KickPush', this.kickPush);
        //推送消息(玩家看牌数据)
        cc.systemEvent.off('CallBanker', this.callBanker);
        //推送消息(玩家房卡数据变化)
        cc.systemEvent.off('WalletPush', this.walletPush);
        //准备
        cc.systemEvent.off('Ready', this.readyPush);
    };
    __decorate([
        property(cc.Label)
    ], NNBattleCanvas.prototype, "lbl_tableId", void 0);
    __decorate([
        property(cc.Label)
    ], NNBattleCanvas.prototype, "lbl_mid", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "player_up", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "player_down", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "result", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "winNode", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "loseNode", void 0);
    __decorate([
        property(cc.Node)
    ], NNBattleCanvas.prototype, "fpNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], NNBattleCanvas.prototype, "fpPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NNBattleCanvas.prototype, "niuSFs", void 0);
    NNBattleCanvas = __decorate([
        ccclass
    ], NNBattleCanvas);
    return NNBattleCanvas;
}(cc.Component));
exports.default = NNBattleCanvas;

cc._RF.pop();