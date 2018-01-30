(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJCanvas.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60733JtRPJCXaRHtYVQwuAt', 'MJCanvas', __filename);
// Script/SceneScript/Game/MJCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJCanvas = /** @class */ (function (_super) {
    __extends(MJCanvas, _super);
    function MJCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 桌子界面节点
         *
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this.node_table = null;
        /**
         * 游戏界面节点
         *
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this.node_game = null;
        /**
         * 重播游戏界面节点
         *
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this.node_replay = null;
        /**
         * 角色信息预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.role_prefab = null;
        /**
         * 聊天预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.chat_prefab = null;
        /**
         * 聊天气泡预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.chat_show_prefab = null;
        /**
        * 游戏设置的预设
        *
        * @type {cc.Prefab}
        * @memberof MJ_Table
        */
        _this.setting_prefab = null;
        /**
         * 解散房间的预设
         *
         * @type {cc.Prefab}
         * @memberof MJ_Table
         */
        _this.disband_prefab = null;
        /**
         * 每局游戏结束的预设
         *
         * @type {cc.Prefab}
         * @memberof MJ_Table
         */
        _this.game_over_prefab = null;
        /**
         * 左右两边玩家打出的牌预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.mj_card_left_prefab = null;
        /**
         * 上下两边玩家打出的牌预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.mj_card_table_prefab = null;
        /**
         * 玩家自己的手牌预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.mj_card_mine_prefab = null;
        /**
         * 多个杠牌的时候，选中杠牌的预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.mj_card_gang_prefab = null;
        /**
         *显示听牌，可以胡什么牌的预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.mj_ting_prefab = null;
        /**
         * 换三张动作预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.act_swap_prefab = null;
        /**
         * 刮风动作预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.act_gf_prefab = null;
        /**
         * 下雨动作预设
         *
         * @type {cc.Prefab}
         * @memberof MJCanvas
         */
        _this.act_xy_prefab = null;
        /**
         * 聊天
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this.node_chat = null;
        /**
         * 设置
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this.node_setting = null;
        /**
         * 杠/碰牌的预设列表 0下 1左 2上 3右
         *
         * @type {cc.Prefab[]}
         * @memberof MJCanvas
         */
        _this.mj_card_group_Prefab = [];
        /**
         * 打缺的图片列表
         *
         * @type {cc.SpriteFrame[]}
         * @memberof MJCanvas
         */
        _this.unSuit_list = [];
        /**
         * 麻将的文字图片列表
         *
         * @type {cc.SpriteFrame[]}
         * @memberof MJCanvas
         */
        _this.mj_text_list = [];
        /**
         * 换三张动作节点
         *
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this._act_swap = null;
        /**
         * 申请解散房间节点
         *
         * @type {cc.Node}
         * @memberof MJCanvas
         */
        _this._node_disband = null;
        /**
         * 是否跳转加载
         *
         * @type {boolean}
         * @memberof MJCanvas
         */
        _this._isLoad = false;
        /**
         *
         * 麻将的牌图片列表 1~9万 10~18筒 19~27条
         * @type {cc.SpriteFrame[]}
         * @memberof MJCanvas
         */
        _this.mj_sf_list = [];
        /**
         * 游戏状态推送消息函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_GamePush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 推送消息(座位数据变化) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_SeatPush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 推送消息(定缺数据通知) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_DingQuePush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 推送消息(换牌数据通知) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_SwapCardPush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 推送消息(出牌数据通知) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_OutCardPush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 推送消息(胡杠碰吃过表态通知) 回调函数
         *
         * @memberof MJCanvas
         */
        _this.MJ_BreakCardPush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         *
         * 推送消息(聊天信息通知) 回调函数
         * @memberof MJCanvas
         */
        _this.MJ_ChatPush = function (event) {
            var data = event.detail;
            _this.showChatInfo(data);
        };
        /**
         *
         * 推送消息(房间已解散通知) 回调函数
         * @memberof MJCanvas
         */
        _this.MJ_OutPush = function (event) {
            var data = event.detail;
            //如果在空闲等待阶段解散房间
            if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_IDLE
                && dd.gm_manager.mjGameData.tableBaseVo.createPlayer !== dd.ud_manager.mineData.accountId) {
                dd.ui_manager.showAlert('房主解散了房间！', '温馨提示', {
                    lbl_name: '确定',
                    callback: function () {
                        _this.quitGame();
                    }
                }, null, 1);
            }
            else {
                _this.quitGame();
            }
        };
        /**
         *
         * 推送消息(桌子解散表态通知)
         * @memberof MJCanvas
         */
        _this.MJ_DisbandPush = function (event) {
            var data = event.detail;
            dd.gm_manager.mjGameData = data;
            _this.showMJInfo();
        };
        /**
         * 微信分享回调
         *
         * @memberof MJ_Table
         */
        _this.wxShareCallBack = function (event) {
            var data = event.detail;
            if (data === 0) {
                dd.ui_manager.showTip('好友邀请发送成功！');
            }
            else {
                dd.ui_manager.showTip('好友邀请发送失败！');
            }
        };
        /**
         * 游戏界面脚本
         *
         * @type {}
         * @memberof MJCanvas
         */
        _this._mjGame = null;
        /**
         * 桌子界面脚本
         *
         * @type {MJ_Table}
         * @memberof MJCanvas
         */
        _this._mjTable = null;
        /**
         * 语音房语音加载次数
         *
         * @type {number}
         * @memberof MJCanvas
         */
        _this._voiceTimes = 0;
        _this._role = null;
        _this._game_over = null;
        _this._node_gang = null;
        _this._node_ting = null;
        /**
         * 语音房初始化语音回调
         *
         * @memberof MJCanvas
         */
        _this.cb_voiceInit = function (event) {
            if (event.detail === 0) {
                // '进入房间成功';
                _this._voiceTimes = 0;
                _this.openVoice();
            }
            else {
                // '进入房间失败';
            }
        };
        return _this;
    }
    MJCanvas.prototype.onLoad = function () {
        var _this = this;
        dd.ui_manager.fixIPoneX(this.node);
        //如果游戏数据存在
        if (dd.gm_manager && dd.gm_manager.mjGameData) {
            //在语音房和原生平台下
            if (dd.gm_manager.mjGameData.tableBaseVo.tableChatType === 1 && cc.sys.isNative && dd.gm_manager.replayMJ === 0) {
                this.initVoice();
            }
            //对座位列表进行排序
            if (dd.gm_manager.mjGameData.seats) {
                dd.gm_manager.mjGameData.seats = MJ_Help.sortSeatList(dd.gm_manager.mjGameData.seats);
            }
        }
        this.node_chat.active = false;
        this.node_setting.active = false;
        this._mjGame = this.node_game.getComponent('MJ_Game');
        this._mjTable = this.node_table.getComponent('MJ_Table');
        dd.mp_manager.stopBackGround();
        this.bindOnPush();
        //添加一个全局的点击事件
        this.node.on("touchend", function (event) {
            if (dd.gm_manager.touchTarget)
                return;
            //对自己的牌进行选中
            var mjPlay = _this._mjGame.node_player_list[0].getComponent('MJ_Game_Mine');
            mjPlay.unSelectCard();
            _this.showTSCard(-1);
            _this.showTingPai(false);
            if (dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD) {
                mjPlay._swapCardList.length = 0;
                mjPlay.btn_swap.interactable = false;
            }
        }, this);
    };
    MJCanvas.prototype.start = function () {
        var _this = this;
        //是否是重播游戏记录
        if (dd.gm_manager.replayMJ === 0) {
            this.node_replay.active = false;
            if (dd.ui_manager.showLoading('正在加载桌子信息')) {
                var obj = { 'tableId': Number(dd.gm_manager.mjGameData.tableBaseVo.tableId) };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_JOIN, msg, function (flag, content) {
                    if (flag === 0) {
                        dd.gm_manager.mjGameData = content;
                        _this.showMJInfo();
                    }
                    else if (flag === -1) {
                    }
                    else {
                    }
                    dd.ui_manager.hideLoading();
                });
            }
        }
        else {
            this.node_replay.active = true;
            this.showMJInfo();
        }
    };
    MJCanvas.prototype.onDestroy = function () {
        this.bindOffPush();
    };
    /**
     * 初始化语音房的语音
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.initVoice = function () {
        if (dd.config.voiceState === 0) {
            cc.systemEvent.on('cb_voiceLogin', this.cb_voiceInit, this);
            var a = dd.js_call_native.joinTeamRoom(dd.gm_manager.mjGameData.tableBaseVo.tableId.toString());
            if (a === 0) {
                //'进入房间成功';
            }
            else {
                //'进入房间失败';
                this._voiceTimes++;
                if (this._voiceTimes > 3) {
                    dd.ui_manager.showTip('语音房语音加入失败,正在重试!');
                }
                else {
                    this.initVoice();
                }
            }
        }
        else {
            dd.ui_manager.showTip('语音房语音初始化失败,正在重试!');
        }
    };
    /**
     * 开启音频
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.openVoice = function () {
        var b = dd.js_call_native.setState(true);
        if (b === 0) {
            // '开启音频成功';
        }
        else {
            // '开启音频失败';
            this._voiceTimes++;
            if (this._voiceTimes > 3) {
                dd.ui_manager.showTip('语音房语音音频开启失败,正在重试!');
            }
            else {
                this.openVoice();
            }
        }
    };
    /**
     * 退出游戏房间，跳转到大厅
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.quitGame = function () {
        if (!this._isLoad) {
            if (dd.ui_manager.showLoading()) {
                this._isLoad = true;
                dd.ud_manager.mineData.tableId = 0;
                //如果是语音房间，退出的时候，要退出语音
                if (dd.gm_manager.mjGameData.tableBaseVo.tableChatType === 1) {
                    var b = dd.js_call_native.quitRoom();
                    if (b === 0) {
                        // '离开房间成功';
                    }
                    else {
                        // '离开房间失败';
                    }
                }
                if (dd.gm_manager.mjGameData.tableBaseVo.corpsId !== '0') {
                    cc.director.loadScene('ClubScene', function () {
                        dd.gm_manager.destroySelf();
                        cc.sys.garbageCollect();
                    });
                }
                else {
                    cc.director.loadScene('HomeScene', function () {
                        dd.gm_manager.destroySelf();
                        cc.sys.garbageCollect();
                    });
                }
            }
        }
    };
    /**
     * 绑定游戏push
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.bindOnPush = function () {
        //推送消息(游戏状态变化)
        cc.systemEvent.on('MJ_GamePush', this.MJ_GamePush, this);
        //推送消息(座位数据变化)
        cc.systemEvent.on('MJ_SeatPush', this.MJ_SeatPush, this);
        //推送消息(定缺数据通知)
        cc.systemEvent.on('MJ_DingQuePush', this.MJ_DingQuePush, this);
        //推送消息(换牌数据通知)
        cc.systemEvent.on('MJ_SwapCardPush', this.MJ_SwapCardPush, this);
        //推送消息(出牌数据通知)
        cc.systemEvent.on('MJ_OutCardPush', this.MJ_OutCardPush, this);
        //推送消息(胡杠碰吃过表态通知)
        cc.systemEvent.on('MJ_BreakCardPush', this.MJ_BreakCardPush, this);
        //推送消息(聊天信息通知)
        cc.systemEvent.on('MJ_ChatPush', this.MJ_ChatPush, this);
        //推送消息(房间已解散通知)
        cc.systemEvent.on('MJ_OutPush', this.MJ_OutPush, this);
        //推送消息(桌子解散表态通知)
        cc.systemEvent.on('MJ_DisbandPush', this.MJ_DisbandPush, this);
        cc.systemEvent.on('cb_share', this.wxShareCallBack, this);
        this.node.on('diconnect_update', this.showMJInfo, this);
    };
    /**
     * 解除绑定游戏push
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.bindOffPush = function () {
        //推送消息(游戏状态变化)
        cc.systemEvent.off('MJ_GamePush', this.MJ_GamePush, this);
        //推送消息(座位数据变化)
        cc.systemEvent.off('MJ_SeatPush', this.MJ_SeatPush, this);
        //推送消息(定缺数据通知)
        cc.systemEvent.off('MJ_DingQuePush', this.MJ_DingQuePush, this);
        //推送消息(换牌数据通知)
        cc.systemEvent.off('MJ_SwapCardPush', this.MJ_SwapCardPush, this);
        //推送消息(出牌数据通知)
        cc.systemEvent.off('MJ_OutCardPush', this.MJ_OutCardPush, this);
        //推送消息(胡杠碰吃过表态通知)
        cc.systemEvent.off('MJ_BreakCardPush', this.MJ_BreakCardPush, this);
        //推送消息(聊天信息通知)
        cc.systemEvent.off('MJ_ChatPush', this.MJ_ChatPush, this);
        //推送消息(房间已解散通知)
        cc.systemEvent.off('MJ_OutPush', this.MJ_OutPush, this);
        //推送消息(桌子解散表态通知)
        cc.systemEvent.off('MJ_DisbandPush', this.MJ_DisbandPush, this);
        cc.systemEvent.off('cb_voiceLogin', this.cb_voiceInit, this);
        cc.systemEvent.off('cb_share', this.wxShareCallBack, this);
        this.node.off('diconnect_update', this.showMJInfo, this);
    };
    /**
     * 显示麻将信息
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showMJInfo = function () {
        cc.log('------游戏状态----' + dd.gm_manager.mjGameData.tableBaseVo.gameState);
        cc.log(dd.gm_manager.mjGameData);
        //座位排序
        dd.gm_manager.mjGameData.seats = MJ_Help.sortSeatList(dd.gm_manager.mjGameData.seats);
        this._mjTable.showTableInfo();
        //如果在空闲状态，就不显示打游戏界面
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_IDLE) {
            this.node_game.active = false;
        }
        else {
            this.node_game.active = true;
        }
        this._mjGame.showGameInfo();
        //游戏状态
        switch (dd.gm_manager.mjGameData.tableBaseVo.gameState) {
            case MJ_Help.MJ_GameState.STATE_TABLE_READY:
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD:
                this.showSwapAct();
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD:
                //处理胡杠碰吃过表态结果
                //处理播放动作和播放语音
                this._mjGame.showBreakStates();
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_OVER_ONCE:
                this.showGameOver();
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_OVER_ALL:
                if (dd.ui_manager.showLoading()) {
                    cc.director.loadScene('GameResult', function () {
                        //如果是语音房间，退出的时候，要退出语音
                        if (dd.gm_manager && dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.tableBaseVo
                            && dd.gm_manager.mjGameData.tableBaseVo.tableChatType === 1) {
                            var b = dd.js_call_native.quitRoom();
                            if (b === 0) {
                                // '离开房间成功';
                            }
                            else {
                                // '离开房间失败';
                            }
                        }
                    });
                }
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_DESTORY:
                this.showDisband();
                break;
            default:
                break;
        }
        this.showDisband();
        this.showSwapAct();
    };
    /**
     * 换牌表态
     *
     * @param {number[]} cardIds
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendSwap = function (cardIds) {
        var obj = {
            'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            'cardIds': JSON.stringify(cardIds),
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_SWAP_CARD, msg, function (flag, content) {
            if (flag === 0) {
            }
            else if (flag === -1) {
            }
            else {
                cc.log(content);
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 定缺表态
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendDinQue = function (dq) {
        var obj = {
            'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            'bt': dq
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_DINQUE, msg, function (flag, content) {
            if (flag === 0) {
            }
            else if (flag === -1) {
            }
            else {
                cc.log(content);
            }
        });
    };
    /**
     * 出牌表态
     *
     * @param {number} cardId
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendOutCard = function (cardId) {
        var obj = {
            'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            'cardId': JSON.stringify(cardId)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_OUT_CARD, msg, null);
    };
    /**
     * 胡杠碰吃表态
     *
     * @param {MJ_Help.MJ_Act_Type} actType 表态类型
     * @param {number} cardId 表态牌对象
     *  @param {cc.Node} node_state 表态节点
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendOtherBreakCard = function (actType, cardId, node_state) {
        var obj = {
            'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            'bt': actType,
            'cardId': JSON.stringify(cardId)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_OTHERBREAK_CARD, msg, function (flag, content) {
            if (node_state && node_state.isValid) {
                if (flag === 0) {
                    node_state.active = false;
                }
                else {
                    node_state.active = true;
                }
            }
        });
    };
    /**
     * 发送聊天信息
     *
     * @param {number} type 0文字 1表情
     * @param {number} msg 消息
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendChatInfo = function (type, content) {
        var obj = {
            'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            'type': type,
            'content': content,
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.CHAT_SEND, msg, function (flag, content) {
            if (flag === 0) {
            }
            else if (flag === -1) {
                cc.log(content);
            }
            else {
            }
        });
    };
    /**
     * 退出桌子
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendOutGame = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = {
                'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_LEAV, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.quitGame();
                }
                else if (flag === -1) {
                    cc.log(content);
                }
                else {
                    dd.ui_manager.showAlert(content, '错误提示');
                }
            });
        }
    };
    /**
     *  申请解散桌子
     *
     * @param {number} bt 表态
     * @memberof MJCanvas
     */
    MJCanvas.prototype.sendDisband = function (bt) {
        if (dd.ui_manager.showLoading()) {
            var obj = {
                'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
                'bt': bt,
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_DELETE_BT, msg, function (flag, content) {
                if (flag === 0) {
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '错误提示', null, null, 1);
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
     * 获取cardId麻将牌的图片
     *
     * @param {number} cardId
     * @memberof MJCanvas
     */
    MJCanvas.prototype.getMJCardSF = function (cardId) {
        var index = Math.floor((cardId - 1) / 4);
        var sf = null;
        if (index >= 0 && index < this.mj_sf_list.length) {
            sf = this.mj_sf_list[index];
        }
        else {
            cc.log('索引错误');
        }
        return sf;
    };
    /**
     * 创建打出的牌
     *
     * @param {number} type  0下边  1右边  2上边  3左边
     * @param {number} cardId 牌数据
     * @param {cc.Node} parentNode  父节点
     * @param {(mjCardNode: cc.Node) => void} [initCB=null] 创建完成的回调
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showPlayOutCard = function (type, cardId, parentNode, initCB) {
        if (initCB === void 0) { initCB = null; }
        if (type === 0 || type === 2) {
            this.showTableCard(type, cardId, parentNode, initCB);
        }
        else {
            this.showLeftCard(type, cardId, parentNode, initCB);
        }
    };
    /**
     * 根据类型创建左右两边的牌节点
     *
     * @param {number} type  3左边  1右边
     * @param {number} card 牌数据
     * @param {cc.Node} parentNode 父节点
     * @param {(mjCardNode: cc.Node) => void} [initCB=null] 创建完成的回调
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showLeftCard = function (type, cardId, parentNode, initCB) {
        if (initCB === void 0) { initCB = null; }
        var mj_card_left = cc.instantiate(this.mj_card_left_prefab);
        mj_card_left.tag = cardId;
        var mc = mj_card_left.getComponent('MJ_Card');
        if (cardId > 0) {
            var cardSF = this.getMJCardSF(cardId);
            mc.initData(cardId, cardSF);
        }
        var nodeFix = type === 1 ? cc.p(-1, 1) : cc.p(1, 1);
        var imgFix = type === 1 ? cc.p(-1, 1) : cc.p(1, 1);
        mc.setFixCard(nodeFix, imgFix);
        mj_card_left.parent = parentNode;
        if (initCB) {
            initCB(mj_card_left);
        }
    };
    /**
     * 根据类型创建上下两边的牌节点
     *
     * @param {number} type 0下边 2上边
     * @param {number} cardId 牌数据
     * @param {cc.Node} parentNode 父节点
     * @param {(mjCardNode: cc.Node) => void} [initCB=null] 创建完成的回调
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showTableCard = function (type, cardId, parentNode, initCB) {
        if (initCB === void 0) { initCB = null; }
        var mj_card_table = cc.instantiate(this.mj_card_table_prefab);
        mj_card_table.tag = cardId;
        var mc = mj_card_table.getComponent('MJ_Card');
        if (cardId > 0) {
            var cardSF = this.getMJCardSF(cardId);
            mc.initData(cardId, cardSF);
        }
        var nodeFix = type === 0 ? cc.p(1, 1) : cc.p(1, 1);
        var imgFix = type === 0 ? cc.p(1, 1) : cc.p(-1, -1);
        mc.setFixCard(nodeFix, imgFix);
        mj_card_table.parent = parentNode;
        if (initCB) {
            initCB(mj_card_table);
        }
    };
    /**
     *  根据类型创建杠/碰牌的节点
     *
     * @param {number} type 0碰牌 1明杠 2暗杠
     * @param {number} card 牌数据
     * @param {number} seatId 座位号 0自己 3左边 2上边 1右边
     * @param {cc.Node} parentNode 父节点
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showGroupCard = function (type, cardId, seatId, parentNode, initCB) {
        if (initCB === void 0) { initCB = null; }
        var mj_card_group = cc.instantiate(this.mj_card_group_Prefab[seatId]);
        var mcg = mj_card_group.getComponent('MJ_Card_Group');
        var csf = this.getMJCardSF(cardId);
        mcg.initData(type, cardId, csf);
        mj_card_group.parent = parentNode;
        if (initCB) {
            initCB(mj_card_group);
        }
    };
    /**
     * 显示自己的手牌
     *
     * @param {number} cardId 牌数据
     * @param {cc.Node} parentNode 牌父节点
     * @param {boolean} [isShow=false] 是否显示背面
     * @param {(mcgNode: cc.Node) => void} [initCB=null] 回调函数
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showMineCard = function (cardId, parentNode, isShow, initCB) {
        if (isShow === void 0) { isShow = false; }
        if (initCB === void 0) { initCB = null; }
        var mj_card_mine = cc.instantiate(this.mj_card_mine_prefab);
        mj_card_mine.tag = cardId;
        var mcm = mj_card_mine.getComponent('MJ_Card');
        if (cardId > 0) {
            var cardSF = this.getMJCardSF(cardId);
            mcm.initData(cardId, cardSF, isShow);
        }
        mj_card_mine.parent = parentNode;
        if (initCB) {
            initCB(mj_card_mine);
        }
    };
    /**
    * 显示每个人打出的麻将
    *
    * @param {number} cardId 牌数据
    * @param {cc.Node} parentNode 父节点
    * @param {SeatVo} seatInfo 座位信息
    * @memberof MJCanvas
    */
    MJCanvas.prototype.showOutActMJ = function (cardId, parentNode, seatInfo) {
        var mj_card_mine = cc.instantiate(this.mj_card_mine_prefab);
        mj_card_mine.tag = cardId;
        var mcm = mj_card_mine.getComponent('MJ_Card');
        if (cardId) {
            var cardSF = this.getMJCardSF(cardId);
            mcm.initData(cardId, cardSF);
        }
        mcm.showLight(true);
        mj_card_mine.parent = parentNode;
        mj_card_mine.scale = 0.1;
        mj_card_mine.opacity = 0;
        var spwan1 = cc.spawn(cc.scaleTo(0.1, 1), cc.fadeIn(0.1));
        var spwan2 = cc.spawn(cc.scaleTo(0.1, 0.1), cc.fadeOut(0.1));
        var seq = cc.sequence(spwan1, cc.delayTime(1), spwan2, cc.callFunc(function (target, data) {
            target.removeFromParent(true);
            target.destroy();
        }, this));
        mj_card_mine.runAction(seq);
        //播放音效
        var card = MJ_Help.getCardById(cardId);
        dd.mp_manager.playPokerSound(dd.mp_manager.audioSetting.language, card.suit, seatInfo.sex, card.point);
    };
    /**
     * 显示多个可以杠的牌
     *
     * @param {number[]} cards
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showMoreGang = function (cardIds, target) {
        this._node_gang = cc.instantiate(this.mj_card_gang_prefab);
        this._node_gang.parent = dd.ui_manager.getRootNode();
        var mjGang = this._node_gang.getComponent('MJ_Gang');
        mjGang.initData(cardIds, target);
    };
    /**
     * 显示听牌，可以胡什么牌的预设
     *
     * @param {CardAttrib[]} cards (cardId不能用)
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showTingPai = function (isShow, cards) {
        var rootNode = dd.ui_manager.getRootNode();
        if (isShow) {
            if (!this._node_ting || !this._node_ting.isValid) {
                this._node_ting = cc.instantiate(this.mj_ting_prefab);
                this._node_ting.parent = rootNode;
            }
            var mjTing = this._node_ting.getComponent('MJ_Ting');
            mjTing.initData(cards);
        }
        else {
            if (this._node_ting && this._node_ting.isValid) {
                this._node_ting.removeFromParent(true);
                this._node_ting.destroy();
                this._node_ting = null;
            }
        }
    };
    /**
     * 显示麻将的换三张动作
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showSwapAct = function () {
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD) {
            if (!this._act_swap || !this._act_swap.isValid) {
                this._act_swap = cc.instantiate(this.act_swap_prefab);
                this._act_swap.setPosition(cc.p(0, 12));
                this._act_swap.parent = dd.ui_manager.getRootNode();
            }
            var swapAct = this._act_swap.getComponent('MJ_ActionSwap');
            swapAct.showSwapCard(dd.gm_manager.mjGameData);
        }
        else {
            if (this._act_swap && this._act_swap.isValid && dd.gm_manager.mjGameData.tableBaseVo.gameState !== MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
                this._act_swap.removeFromParent(true);
                this._act_swap.destroy();
                this._act_swap = null;
            }
        }
    };
    /**
     * 显示麻将的表态文字动作
     *
     * @param {cc.SpriteFrame} actSf
     * @param {cc.Node} parentNode
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showTxtAct = function (actSf, parentNode) {
        var node = new cc.Node('mjTxtAct');
        var sf = node.addComponent(cc.Sprite);
        sf.spriteFrame = actSf;
        node.scale = 2;
        node.opacity = 0;
        node.setPosition(cc.p(0, 26));
        node.parent = dd.ui_manager.getRootNode();
        var spawn = cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.5, 1));
        var seq = cc.sequence(spawn, cc.delayTime(0.5), cc.callFunc(function (target, data) {
            target.removeFromParent(true);
            target.destroy();
        }, this));
        node.runAction(seq);
    };
    /**
     * 显示刮风动作
     *
     * @param {cc.Node} parentNode
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showGFAct = function (parentNode) {
        var act_gf = cc.instantiate(this.act_gf_prefab);
        act_gf.parent = parentNode;
    };
    /**
     * 显示下雨动作
     *
     * @param {cc.Node} parentNode
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showXYAct = function (parentNode) {
        var act_xy = cc.instantiate(this.act_xy_prefab);
        act_xy.parent = parentNode;
    };
    /**
     * 显示游戏聊天界面
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showChat = function () {
        dd.mp_manager.playAlert();
        this.node_chat.active = true;
        var chatScript = this.node_chat.getComponent('Game_Chat');
        chatScript.showChatLayer(0);
    };
    /**
     * 显示游戏聊天信息
     * @param {any} type
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showChatInfo = function (data) {
        if (!data)
            return;
        var pos = this._mjTable.getPlayPosById(data.accountId);
        if (data.type === 0) {
            var seatInfo = MJ_Help.getSeatById(data.accountId);
            dd.mp_manager.playQuicklySound(seatInfo.sex, data.content);
            var quickList = dd.mp_manager.quicklyList;
            var chat_show = cc.instantiate(this.chat_show_prefab);
            var fx = 1;
            if (pos.x > 0) {
                fx = -1;
            }
            chat_show.scaleX = fx * 0.1;
            chat_show.scaleY = 0.1;
            pos.y += 80;
            chat_show.setPosition(pos);
            var showscript = chat_show.getComponent('Game_Chat_Show');
            showscript.showChat(quickList[data.content - 1].msg, fx);
            chat_show.parent = dd.ui_manager.getRootNode();
            var action = cc.sequence(cc.scaleTo(0.1, 1 * fx, 1), cc.delayTime(1), cc.callFunc(function (target, data) {
                target.removeFromParent(true);
                target.destroy();
            }, this));
            chat_show.runAction(action);
        }
        else {
            var bqNode = new cc.Node('bqNode');
            var sf = bqNode.addComponent(cc.Sprite);
            var bqSF = dd.img_manager.chatSpriteFrames[data.content];
            sf.spriteFrame = bqSF;
            bqNode.scale = 0;
            pos.x = pos.x > 0 ? pos.x - 80 : pos.x + 80;
            bqNode.setPosition(cc.p(pos.x, pos.y + 50));
            bqNode.parent = dd.ui_manager.getRootNode();
            var action = cc.scaleTo(0.5, 1);
            action.easing(cc.easeElasticOut(0.4));
            var seq = cc.sequence(action, cc.delayTime(0.5), cc.callFunc(function (target, data) {
                target.removeFromParent(true);
                target.destroy();
            }, this));
            bqNode.runAction(seq);
        }
    };
    /**
     * 显示游戏设置
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showSetting = function () {
        dd.mp_manager.playAlert();
        this.node_setting.active = true;
        var sets = this.node_setting.getComponent('Setting');
        sets.initData(dd.gm_manager.mjGameData.tableBaseVo.tableChatType);
    };
    /**
     * 显示游戏解散房间界面
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showDisband = function () {
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_DESTORY) {
            if (!this._node_disband || !this._node_disband.isValid) {
                this._node_disband = cc.instantiate(this.disband_prefab);
                this._node_disband.zIndex = 9;
                this._node_disband.parent = dd.ui_manager.getRootNode();
            }
            var script = this._node_disband.getComponent('Game_Disband');
            script.initData();
            this.unShowPopup();
        }
        else {
            if (this._node_disband && this._node_disband.isValid) {
                this._node_disband.removeFromParent(true);
                this._node_disband.destroy();
                this._node_disband = null;
            }
        }
    };
    /**
     * 不显示弹框
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.unShowPopup = function () {
        this.node_setting.active = false;
        this.node_chat.active = false;
    };
    /**
     * 显示每局游戏结束
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showGameOver = function () {
        if (dd.gm_manager && dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.settlementOnce) {
            if (!this._game_over || !this._game_over.isValid) {
                this._game_over = cc.instantiate(this.game_over_prefab);
                var go = this._game_over.getComponent('Game_Over');
                go.initData(dd.gm_manager.mjGameData.settlementOnce);
                this._game_over.parent = dd.ui_manager.getRootNode();
            }
        }
    };
    /**
     * 显示角色信息
     *
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showRoleInfo = function (accountId) {
        var _this = this;
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                dd.mp_manager.playAlert();
                var obj = { 'accountId': accountId };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_ROLE_ACCOUNTID, msg, function (flag, content) {
                    if (flag === 0) {
                        var roleInfo = content;
                        if (!_this._role || !_this._role.isValid) {
                            dd.ui_manager.isShowPopup = false;
                            _this._role = cc.instantiate(_this.role_prefab);
                            var roleScript = _this._role.getComponent('Role');
                            roleScript.showInfo(roleInfo);
                            _this._role.parent = dd.ui_manager.getRootNode();
                        }
                    }
                    else if (flag === -1) {
                    }
                    else {
                        cc.log(content);
                    }
                    dd.ui_manager.hideLoading();
                });
            }
        }
    };
    /**
     * 跳转调用,显示桌子上和选出的牌一样的牌
     *
     * @param {number} cardId
     * @memberof MJCanvas
     */
    MJCanvas.prototype.showTSCard = function (cardId) {
        this._mjGame.showTableSelectCard(cardId);
    };
    __decorate([
        property(cc.Node)
    ], MJCanvas.prototype, "node_table", void 0);
    __decorate([
        property(cc.Node)
    ], MJCanvas.prototype, "node_game", void 0);
    __decorate([
        property(cc.Node)
    ], MJCanvas.prototype, "node_replay", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "role_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "chat_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "chat_show_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "setting_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "disband_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "game_over_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "mj_card_left_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "mj_card_table_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "mj_card_mine_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "mj_card_gang_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "mj_ting_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "act_swap_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "act_gf_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MJCanvas.prototype, "act_xy_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], MJCanvas.prototype, "node_chat", void 0);
    __decorate([
        property(cc.Node)
    ], MJCanvas.prototype, "node_setting", void 0);
    __decorate([
        property([cc.Prefab])
    ], MJCanvas.prototype, "mj_card_group_Prefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], MJCanvas.prototype, "unSuit_list", void 0);
    __decorate([
        property({
            // default: [],
            type: [cc.SpriteFrame],
            tooltip: '0=自摸\n 1=胡\n 2=天胡\n 3=地胡\n 4=杠上花\n 5=杠上炮\n 6=碰\n 7=杠\n 8=抢杠\n 9=点炮\n 10=一炮多响\n 11=海底捞月\n 12=呼叫转移\n'
                + '13=流局\n 14=游戏结束\n'
        })
    ], MJCanvas.prototype, "mj_text_list", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: ' 1~9万\n 10~18筒\n 19~27条'
        })
    ], MJCanvas.prototype, "mj_sf_list", void 0);
    MJCanvas = __decorate([
        ccclass
    ], MJCanvas);
    return MJCanvas;
}(cc.Component));
exports.default = MJCanvas;

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
        //# sourceMappingURL=MJCanvas.js.map
        