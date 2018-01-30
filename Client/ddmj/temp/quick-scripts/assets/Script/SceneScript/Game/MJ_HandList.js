(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJ_HandList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e0d0xG1rVMO4soweFeiv/k', 'MJ_HandList', __filename);
// Script/SceneScript/Game/MJ_HandList.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Help = require("./MJ_Help");
var MJ_HandList = /** @class */ (function (_super) {
    __extends(MJ_HandList, _super);
    function MJ_HandList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 手牌节点
         *
         * @type {cc.Node}
         * @memberof MJ_HandList
         */
        _this.node_hand = null;
        /**
         * 开始点击的位置
         *
         * @type {cc.Vec2}
         * @memberof MJ_HandList
         */
        _this._firstPos = cc.p(0, 0);
        /**
         * 结束点击的位置
         *
         * @type {cc.Vec2}
         * @memberof MJ_HandList
         */
        _this._endPos = cc.p(0, 0);
        /**
         * canvas脚本
         *
         * @type {MJCanvas}
         * @memberof MJ_HandList
         */
        _this._canvasTarget = null;
        /**
         * 自己的脚本
         *
         * @memberof MJ_HandList
         */
        _this._mineScript = null;
        /**
        * 手牌节点列表
        *
        * @type {cc.Node[]}
        * @memberof MJ_Play
        */
        _this._hand_card_list = [];
        /**
         * 座位信息
         *
         * @type {SeatVo}
         * @memberof MJ_HandList
         */
        _this._seatInfo = null;
        /**
         *
         * 点击选中的牌
         * @type {cc.Node}
         * @memberof MJ_Play
         */
        _this._selectCard = null;
        _this._selectCardPos = cc.v2(0, 0);
        _this._selectCardZIndex = 0;
        /**
         * 移动偏移量
         * @type {number}
         * @memberof MJ_HandList
         */
        _this._moveDelta = 0;
        /**
         *
         * 显示换三张的牌的状态 0未显示 1已显示
         * @type {number}
         * @memberof MJ_HandList
         */
        _this._swapState = 0;
        /**
         * 出牌可以听牌的列表
         *
         * @memberof MJ_HandList
         */
        _this._tingsList = [];
        /**
         * _tingsList 的对应列表，打出对应的那张牌，可以胡的牌的列表
         *
         * @memberof MJ_HandList
         */
        _this._huList = [];
        _this.wans = [];
        _this.tongs = [];
        _this.tiaos = [];
        _this._moPaiCardId = -1;
        /**
         * 自己是否能出牌
         * @type {boolean}
         * @memberof MJ_HandList
         */
        _this._isCanPlay = false;
        /**
         * 点击开始
         *
         * @memberof MJ_HandList
         */
        _this.touchBegan = function (event) {
            event.stopPropagation();
            if (event.getTouches().length > 1)
                return;
            if (dd.gm_manager.touchTarget || !_this._isCanPlay) {
                dd.gm_manager.touchTarget = null;
                if (_this._selectCard) {
                    _this._selectCard.setPosition(_this._selectCardPos);
                    _this._selectCard.zIndex = _this._selectCardZIndex;
                    _this._selectCard = null;
                }
                return;
            }
            dd.gm_manager.touchTarget = event.touch;
            var touches = event.getTouches();
            _this._firstPos = touches[0].getLocation();
            var cardNode = _this.getCardNodeByTouch(_this._firstPos);
            if (cardNode) {
                _this._selectCardPos = cardNode.getPosition();
                var hcs = cardNode.getComponent('MJ_Card');
                if (!hcs._isShowMask) {
                    _this._selectCard = cardNode;
                    _this._selectCard.color = cc.Color.GRAY;
                    //设置层级数据
                    _this._selectCardZIndex = _this._selectCard.zIndex;
                    _this._selectCard.zIndex = 99;
                }
                else {
                    _this._selectCard = null;
                }
            }
        };
        /**
         * 点击移动
         *
         * @memberof MJ_HandList
         */
        _this.touchMoved = function (event) {
            event.stopPropagation();
            if (event.getTouches().length > 1)
                return;
            if (dd.gm_manager.touchTarget === event.touch) {
                if (_this.node.isValid) {
                    if (_this._selectCard) {
                        if (_this._isCanPlay) {
                            var touches = event.getTouches();
                            _this._endPos = touches[0].getLocation();
                            var delta = touches[0].getDelta();
                            var cPos = _this._selectCard.getPosition();
                            var pos = cc.pAdd(delta, cPos);
                            _this._selectCard.setPosition(pos);
                            var dx = Math.abs(delta.x);
                            var dy = Math.abs(delta.y);
                            _this._moveDelta += Math.sqrt(dx * dx + dy * dy);
                        }
                    }
                }
            }
        };
        /**
         * 点击结束
         *
         * @memberof MJ_HandList
         */
        _this.touchEnd = function (event) {
            event.stopPropagation();
            if (event.getTouches().length > 1)
                return;
            if (dd.gm_manager.touchTarget === event.touch) {
                if (_this._selectCard) {
                    //重置这张牌的位置和层级
                    _this._selectCard.setPosition(_this._selectCardPos);
                    _this._selectCard.zIndex = _this._selectCardZIndex;
                    //如果自己能出牌
                    if (_this._isCanPlay) {
                        var touches = event.getTouches();
                        _this._endPos = touches[0].getLocation();
                        _this.setSelectCard(_this._selectCard);
                        _this._moveDelta = 0;
                    }
                    _this._selectCard = null;
                }
                dd.gm_manager.touchTarget = null;
            }
        };
        return _this;
    }
    /**
     * 触摸选中这张牌
     *
     * @returns
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.setSelectCard = function (cardNode) {
        this._canvasTarget.showTingPai(false);
        if (cardNode && cardNode.isValid) {
            cardNode.color = cc.Color.WHITE;
            var hcs = cardNode.getComponent('MJ_Card');
            //如果是换牌阶段
            if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD) {
                if (hcs._isSelect) {
                    hcs.showSelectCard(false);
                    //从数组中减去
                    this._mineScript.selectSwapCard(hcs._cardId, -1);
                }
                else {
                    var isSelect = this._mineScript.selectSwapCard(hcs._cardId, 1);
                    hcs.showSelectCard(isSelect);
                }
            }
            else {
                //如果这张牌不能打
                if (hcs._isShowMask) {
                    cc.log('不能打这张牌');
                    hcs.showSelectCard(false);
                }
                else {
                    if (hcs._isSelect) {
                        //如果拖动牌，移动距离大于80,但是距离小于150，就不打出这张牌
                        if (this._moveDelta > 80) {
                            var d = cc.pDistance(this._firstPos, this._endPos);
                            var dy = this._endPos.y - this._firstPos.y;
                            if (d > 150 && dy > 80) {
                                cc.log('打出这张牌,拖动距离：' + d + ';拖动高度：' + dy);
                                if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                                    this._canvasTarget.sendOutCard(hcs._cardId);
                                    //移除节点
                                    this.deleteCardByNode(cardNode);
                                }
                            }
                            else {
                                cc.log('选中这张牌');
                                this.selectCardByCardId(hcs._cardId);
                                this._canvasTarget.showTSCard(hcs._cardId);
                            }
                        }
                        else {
                            cc.log('打出这张牌');
                            if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                                this._canvasTarget.sendOutCard(hcs._cardId);
                                //移除节点
                                this.deleteCardByNode(cardNode);
                            }
                            else {
                                hcs.showSelectCard(false);
                            }
                        }
                    }
                    else {
                        //如果当前牌没有选中
                        var d = cc.pDistance(this._firstPos, this._endPos);
                        var dy = this._endPos.y - this._firstPos.y;
                        if (d > 200 && dy > 80) {
                            cc.log('打出这张牌,拖动距离：' + d + ';拖动高度：' + dy);
                            if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                                this._canvasTarget.sendOutCard(hcs._cardId);
                                //移除节点
                                this.deleteCardByNode(cardNode);
                            }
                        }
                        else {
                            cc.log('选中这张牌');
                            this.selectCardByCardId(hcs._cardId);
                            this._canvasTarget.showTSCard(hcs._cardId);
                        }
                    }
                }
            }
        }
    };
    /**
     * 添加节点点击事件
     *
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.onTouchEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
    };
    MJ_HandList.prototype.onLoad = function () {
        for (var i = 1; i < 4; i++) {
            for (var j = 1; j < 10; j++) {
                var card = {
                    cardId: 0,
                    suit: i,
                    point: j
                };
                switch (i) {
                    case 1:
                        this.wans.push(card);
                        break;
                    case 2:
                        this.tongs.push(card);
                        break;
                    case 3:
                        this.tiaos.push(card);
                        break;
                    default: break;
                }
            }
        }
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent("MJCanvas");
        this.onTouchEvent();
    };
    MJ_HandList.prototype.initData = function () {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        this._hand_card_list.length = 0;
        this.node_hand.removeAllChildren();
    };
    /**
     * 获取是否可以出牌
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getIsCP = function () {
        var isCP = false;
        switch (dd.gm_manager.mjGameData.tableBaseVo.gameState) {
            case MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD:
                if (this._seatInfo.swapCards) {
                    isCP = false;
                }
                else {
                    isCP = true;
                }
                break;
            case MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD:
                //如果表态人是自己
                if (this._seatInfo.btState === MJ_Help.MJ_Act_State.ACT_STATE_WAIT &&
                    this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.btIndex) {
                    isCP = true;
                }
                else {
                    isCP = false;
                }
                break;
            default:
                break;
        }
        return isCP;
    };
    /**
     * 刷新手牌列表
     *
     * @param {SeatVo} seatInfo
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.updateHandList = function (seatInfo, target) {
        if (!this._canvasTarget) {
            this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        }
        //如果在准备阶段，就初始化数据
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState <= MJ_Help.MJ_GameState.STATE_TABLE_READY) {
            this.initData();
        }
        this._mineScript = target;
        this._seatInfo = seatInfo;
        this._isCanPlay = this.getIsCP();
        var isUnSuit = this.getIsUnSuit();
        //移动其他手牌
        var handCards = [];
        if (this._seatInfo.handCards) {
            handCards = this._seatInfo.handCards;
        }
        //如果摸牌存在，合并到手牌数组中
        if (this._seatInfo.moPaiCard > 0) {
            handCards = handCards.concat(this._seatInfo.moPaiCard);
            this._moPaiCardId = this._seatInfo.moPaiCard;
        }
        //如果不是出牌阶段,移除
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState !== MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD) {
            this._canvasTarget.showTingPai(false);
        }
        this.showHandCard(handCards, this._moPaiCardId, isUnSuit);
        this.deleteNotCard(handCards);
        this.showTingCard(handCards);
        this.showSwapCards();
    };
    /**
     * 显示换三张的牌
     *
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.showSwapCards = function () {
        //如果在定缺阶段,有换三张的牌,
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            if (this._swapState === 0) {
                this._swapState = 1;
                if (this._seatInfo.swapCards && this._seatInfo.swapCards.length > 0 && this._seatInfo.unSuit < 1) {
                    for (var i = 0; i < this._seatInfo.swapCards.length; i++) {
                        for (var j = 0; j < this._hand_card_list.length; j++) {
                            var cardNode = this._hand_card_list[j];
                            if (cardNode.tag === this._seatInfo.swapCards[i]) {
                                var hcs = cardNode.getComponent('MJ_Card');
                                hcs.showSelectCard(true);
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            this._swapState = 0;
        }
    };
    /**
     * 显示听牌
     * @param {number[]} handCards 手牌列表
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.showTingCard = function (handCards) {
        this._tingsList.length = 0;
        this._huList.length = 0;
        var isShow = false;
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD) {
            //只有在 （自己表态）、（游戏出牌）的条件下，才会显示听牌
            if (dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex
                && this._seatInfo.btState === MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                isShow = true;
            }
        }
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var hcn = this._hand_card_list[i];
            var hcs = hcn.getComponent('MJ_Card');
            if (isShow) {
                var tings = this.getTingsByCardId(handCards, hcn.tag);
                //如果有听牌的话
                if (tings && tings.length > 0) {
                    this._tingsList.push(hcn.tag);
                    this._huList.push(tings);
                    hcs.showBS(true, 1, -1);
                }
            }
            else {
                hcs.showBS(false, 1, -1);
            }
        }
    };
    /**
     * 显示手牌
     *
     * @param {number[]} handCards 手牌列表
     * @param {number} [moPaiCard]   摸牌
     * @param {boolean} isUnSuit 是否打完定缺
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.showHandCard = function (handCards, moPaiCard, isUnSuit) {
        var _this = this;
        var isMyBreakState = false;
        var isAllSwap = false;
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD) {
            isMyBreakState = this.getIsMyBreakState();
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD) {
            //在换三张阶段，获取是否是自己确定换三张
            isAllSwap = this.getIsAllSwap();
        }
        else { }
        var _loop_1 = function () {
            var index = i;
            var cardId = handCards[i];
            var hnc = this_1.getCardNodeByCardId(cardId, i);
            if (cardId !== moPaiCard) {
                if (hnc) {
                    //如果拍存在，修正牌的数据
                    this_1.fixCardNode(hnc, index, isMyBreakState, isAllSwap, isUnSuit);
                }
                else {
                    this_1._canvasTarget.showMineCard(cardId, this_1.node_hand, false, function (cardNode) {
                        var ePos = cc.p((index * (-cardNode.width) - cardNode.width / 2), 0);
                        cardNode.setPosition(ePos);
                        _this._hand_card_list.push(cardNode);
                        _this.showUnSuit(cardNode, isUnSuit);
                    });
                }
            }
            else {
                this_1.showMPCard(index, cardId, hnc, isUnSuit);
            }
        };
        var this_1 = this;
        for (var i = 0; i < handCards.length; i++) {
            _loop_1();
        }
    };
    /**
     * 修正牌节数据
     *
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.fixCardNode = function (hnc, index, isMyBreakState, isAllSwap, isUnSuit) {
        //如果自己出牌
        if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD) {
            //只有在 （自己表态）、（自己已经表态）、（游戏出牌）的条件下，才会做动作
            if (dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex
                && this._seatInfo.btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                //移动牌的位置
                this.moveCardAct(index, hnc);
            }
            else {
                //如果是重播
                if (dd.gm_manager.replayMJ === 1) {
                    //移动牌的位置
                    this.moveCardAct(index, hnc);
                }
            }
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD) {
            //在杠碰胡阶段，如果自己有杠碰胡，说明牌面有变化，需要移动牌的位置
            if (isMyBreakState) {
                //移动牌的位置
                this.moveCardAct(index, hnc);
            }
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_SWAPCARD) {
            //如果所有人都换牌了
            if (isAllSwap) {
                //重置牌的位置
                this.moveCardAct(index, hnc, false);
            }
            else {
                //如果自己换牌了，就移动下位置
                if (this._seatInfo.swapCards) {
                    //移动牌的位置
                    this.moveCardAct(index, hnc);
                }
                //如果自己还没有换牌，就不需要移动位置
            }
        }
        else if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            //如果定缺了
            if (this._seatInfo.unSuit && this._seatInfo.unSuit > 0) {
                //重置牌的位置
                this.moveCardAct(index, hnc, false);
            }
            else {
                //如果刚进入定缺阶段
                if (this._swapState === 0) {
                    //重置牌的位置
                    this.moveCardAct(index, hnc, false);
                }
            }
        }
        else {
            //如果是重播
            if (dd.gm_manager.replayMJ === 1) {
                //移动牌的位置
                this.moveCardAct(index, hnc);
            }
        }
        this.showUnSuit(hnc, isUnSuit);
    };
    /**
     * 获取自己是否有碰杠胡的状态
     *
     * @returns {boolean}
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getIsMyBreakState = function () {
        var breakSeats = dd.gm_manager.mjGameData.breakSeats;
        if (breakSeats) {
            for (var i = 0; i < breakSeats.length; i++) {
                if (breakSeats[i] === this._seatInfo.seatIndex) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获取是否所有人都换牌表态了
     *
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getIsAllSwap = function () {
        var seats = dd.gm_manager.mjGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            if (seats[i] && seats[i].accountId !== '0' && seats[i].btState === MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                return false;
            }
        }
        return true;
    };
    /**
     * 显示位置
     *
     * @param {number} index 插入位置
     * @param {number} cardId 牌的唯一Id
     * @param {cc.Node} mpCard 摸牌节点
     * @param {boolean} isUnSuit 是否打完定缺
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.showMPCard = function (index, cardId, mpCard, isUnSuit) {
        var _this = this;
        //如果是自己表态
        if (dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex) {
            //如果自己的表态状态在（等待表态），并且有（摸牌），显示摸牌
            if (this._seatInfo.btState === MJ_Help.MJ_Act_State.ACT_STATE_WAIT && this._seatInfo.moPaiCard > 0) {
                if (!mpCard) {
                    this._canvasTarget.showMineCard(this._seatInfo.moPaiCard, this.node_hand, false, function (cardNode) {
                        cardNode.setPosition(cardNode.width, 0);
                        _this._hand_card_list.push(cardNode);
                        _this.showUnSuit(cardNode, isUnSuit);
                    });
                }
                else {
                    mpCard.setPosition(mpCard.width, 0);
                }
            }
            else {
                if (mpCard) {
                    //只有在 （自己表态）、（自己已经表态）、（游戏出牌）的条件下，才会做动作
                    if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_OUTCARD
                        || dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_BREAKCARD) {
                        this.showUnSuit(mpCard, isUnSuit);
                        if (this._seatInfo.btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                            cc.log('-----移动摸牌---' + this._seatInfo);
                            //计算最终的位置进行插牌
                            var ePos = cc.p((index * (-mpCard.width) - mpCard.width / 2), 0);
                            mpCard.setPosition(ePos);
                            mpCard.scale = 0;
                            mpCard.runAction(cc.scaleTo(0.2, 1));
                            this._moPaiCardId = -1;
                        }
                    }
                    else {
                        this.deleteCardNodeByCardId(cardId);
                        //移除节点
                        this.deleteCardByNode(mpCard);
                    }
                }
            }
        }
    };
    /**
     * 移动牌到目标位置
     *
     * @param {number} index 目标索引位置
     * @param {cc.Node} cardNode 牌节点
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.moveCardAct = function (index, cardNode, isAct) {
        if (isAct === void 0) { isAct = true; }
        var ePos = cc.p((index * (-cardNode.width) - cardNode.width / 2), 0);
        var nPos = cardNode.getPosition();
        if (ePos.x !== nPos.x || ePos.y !== nPos.y) {
            if (isAct) {
                var d = cc.pDistance(nPos, ePos);
                cardNode.runAction(cc.moveTo(d / 1000, ePos));
            }
            else {
                cardNode.setPosition(ePos);
            }
        }
    };
    /**
     * 插牌动作
     *
     * @param {number} index 插入位置
     * @param {cc.Node} cardNode 牌节点
     * @param {cc.Vec2} sPos 起始位置
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.insertCardAct = function (index, cardNode, sPos) {
        var ePos = cc.p((index * (-cardNode.width) - cardNode.width / 2), 0);
        var d = cc.pDistance(sPos, ePos);
        var mTime = d / 1500;
        var action = null;
        if (index > 0) {
            var dTime = 0.3;
            var addH = 0;
            var action1 = cc.spawn(cc.rotateTo(dTime, 20), cc.moveTo(dTime, cc.p(sPos.x, sPos.y + cardNode.height + addH)));
            var move = cc.moveTo(mTime, cc.p(ePos.x, ePos.y + cardNode.height + addH));
            action = cc.sequence(action1, move, cc.rotateTo(0.12, 0), cc.moveTo(dTime, ePos));
        }
        else {
            action = cc.moveTo(mTime, cc.p(ePos.x, ePos.y));
        }
        cardNode.runAction(action);
    };
    /**
     * 删除不要的牌节点
     *
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.deleteNotCard = function (handCards) {
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var cardNode = this._hand_card_list[i];
            var index = this.getIndexByCardId(cardNode.tag);
            if (index === -1) {
                cc.log('---删除---' + cardNode.tag);
                this._hand_card_list.splice(i, 1);
                //移除节点
                cardNode.removeFromParent(true);
                cardNode.destroy();
                //因为数组减1,所以下标不变
                i -= 1;
            }
        }
    };
    /**
     * 根据节点删除该节点,并从数组中移除
     * @param {cc.Node} cardNode
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.deleteCardByNode = function (tagetNode) {
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var cardNode = this._hand_card_list[i];
            if (tagetNode === cardNode) {
                this._hand_card_list.splice(i, 1);
                //移除节点
                cardNode.removeFromParent(true);
                cardNode.destroy();
                break;
            }
        }
    };
    /**
     * 根据cardId删除牌节点
     *
     * @param {number} cardId
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.deleteCardNodeByCardId = function (cardId) {
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var hnc = this._hand_card_list[i];
            if (hnc.tag === cardId) {
                //移除节点
                hnc.removeFromParent(true);
                hnc.destroy();
                this._hand_card_list.splice(i, 1);
                break;
            }
        }
    };
    /**
     * 显示定缺
     *
     * @param {boolean} isUnSuit
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.showUnSuit = function (cardNode, isUnSuit) {
        if (cardNode) {
            var hcs = cardNode.getComponent('MJ_Card');
            //如果没有定缺的牌了
            if (isUnSuit) {
                hcs.showMask(false);
            }
            else {
                //如果还有定缺的牌，就先打定缺的牌
                var card = MJ_Help.getCardById(hcs._cardId);
                if (card.suit === this._seatInfo.unSuit) {
                    hcs.showMask(false);
                }
                else {
                    hcs.showMask(true);
                }
            }
        }
    };
    /**
     * 根据cardId获取牌节点
     *
     * @returns {cc.Node}
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getCardNodeByCardId = function (cardId, index) {
        if (index === void 0) { index = 0; }
        var cNode = null;
        if (cardId > 0) {
            for (var i = 0; i < this._hand_card_list.length; i++) {
                var hnc = this._hand_card_list[i];
                if (hnc.tag === cardId) {
                    cNode = hnc;
                    break;
                }
            }
        }
        return cNode;
    };
    /**
     * 根据cardId获取手牌位置
     *
     * @param {any} cardId
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getIndexByCardId = function (cardId) {
        if (cardId === this._seatInfo.moPaiCard) {
            return this._seatInfo.handCards.length;
        }
        for (var i = 0; i < this._seatInfo.handCards.length; i++) {
            if (this._seatInfo.handCards[i] === cardId) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 根据触摸点获取牌节点
     *
     * @param {cc.Vec2} touch
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getCardNodeByTouch = function (touch) {
        var cNode = null;
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var cardNode = this._hand_card_list[i];
            if (cardNode.isValid) {
                var box = cardNode.getBoundingBoxToWorld();
                if (cc.rectContainsPoint(box, touch)) {
                    cNode = cardNode;
                    break;
                }
            }
        }
        return cNode;
    };
    /**
     * 根据cardId选中牌
     *
     * @param {number} cardId
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.selectCardByCardId = function (cardId) {
        for (var i = 0; i < this._hand_card_list.length; i++) {
            var hnc = this._hand_card_list[i];
            var hcs = hnc.getComponent('MJ_Card');
            if (hcs._cardId === cardId) {
                hcs.showSelectCard(true);
                //查找听牌的下标，如果下标不为-1，表示打出这张牌，可以听牌
                var index = this._tingsList.indexOf(cardId);
                if (index !== -1) {
                    //显示听牌的界面
                    cc.log('显示胡牌');
                    this._canvasTarget.showTingPai(true, this._huList[index]);
                }
            }
            else {
                hcs.showSelectCard(false);
            }
        }
    };
    /**
    * 获取自己是否打完了定缺的牌
    *
    * @returns {boolean}
    * @memberof MJ_Play
    */
    MJ_HandList.prototype.getIsUnSuit = function () {
        var list = this._seatInfo.handCards;
        //如果(摸牌)存在，并且是(自己摸牌)，就要把摸得牌算进去
        if (this._seatInfo.moPaiCard && dd.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex) {
            list = list.concat(this._seatInfo.moPaiCard);
        }
        //是否打完打缺
        var isUnSuit = true;
        for (var i = 0; i < list.length; i++) {
            var card = MJ_Help.getCardById(list[i]);
            if (card.suit === this._seatInfo.unSuit) {
                isUnSuit = false;
                break;
            }
        }
        return isUnSuit;
    };
    /**
     * 判断是否可以胡牌
     *
     * @param {MJCard[]} cards
     * @returns {boolean}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.canHuPai = function (cards) {
        if (cards.length % 3 !== 2)
            return false;
        if (this.getSuits(cards).length > 2)
            return false;
        if (cards.length === 2) {
            if (cards[0].point === cards[1].point && cards[0].suit === cards[1].suit)
                return true;
            else
                return false;
        }
        else {
            var nums = cards.map(function (card) {
                return card.suit * 10 + card.point;
            }, this);
            nums.sort();
            if (this.checkQiDui(nums))
                return true;
            var dups = this.getDuplicate(nums);
            for (var i = 0; i < dups.length; i++) {
                var num = dups[i];
                var temps = nums.slice(0);
                for (var i_1 = 0; i_1 < 2; i_1++) {
                    var index = temps.indexOf(num);
                    temps.splice(index, 1);
                }
                if (this.checkRemaining(temps))
                    return true;
            }
            return false;
        }
    };
    /**
     * 检查花色
     *
     * @param {MJCard[]} cards
     * @returns {number}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.getSuits = function (cards) {
        var suits = [];
        cards.forEach(function (card) {
            if (suits.indexOf(card.suit) === -1) {
                suits.push(card.suit);
            }
        }, this);
        return suits;
    };
    /**
     * 判断移除将牌后剩余的牌是否满足顺子和克子，通过递归移除法验证，当剩余牌为0是返回能胡牌，反之则不能胡牌
     * 余牌数量不为0是必定是3的倍数，余牌是排序过的从小到大
     *
     * @param {number[]} nums
     * @returns {boolean}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.checkRemaining = function (nums) {
        if (nums.length === 0)
            return true;
        if (nums[0] === nums[1] && nums[1] === nums[2]) {
            var temps = nums.slice(3);
            return this.checkRemaining(temps);
        }
        else {
            if (nums.indexOf(nums[0] + 1) !== -1 && nums.indexOf(nums[0] + 2) !== -1) {
                var temps = nums.slice(0);
                var remove = 0, index = 0;
                for (var i = 0; i < 3; i++) {
                    remove = temps.splice(index, 1)[0];
                    index = temps.indexOf(remove + 1);
                }
                return this.checkRemaining(temps);
            }
            return false;
        }
    };
    /**
     * 找出可以当将牌的重复项
     *
     * @param {number[]} nums
     * @returns {number[]}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.getDuplicate = function (nums) {
        var result = [];
        nums.forEach(function (num) {
            if (nums.indexOf(num) !== nums.lastIndexOf(num) && result.indexOf(num) === -1)
                result.push(num);
        });
        return result;
    };
    /**
     * 判断7对
     *
     * @param {number[]} nums
     * @returns {boolean}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.checkQiDui = function (nums) {
        if (nums.length !== 14)
            return false;
        for (var i = 0; i < 13; i += 2) {
            if (nums[i] !== nums[i + 1]) {
                return false;
            }
        }
        return true;
    };
    /**
     * 获取可以胡的牌，即听牌
     *
     * @param {MJCard[]} cards
     * @returns {MJCard[]}
     * @memberof ChildClass
     */
    MJ_HandList.prototype.getTingPai = function (cards) {
        var _this = this;
        var results = [];
        var checkList = [];
        var suits = this.getSuits(cards);
        if (suits.length > 2 || suits.indexOf(this._seatInfo.unSuit) > -1)
            return [];
        suits.forEach(function (suit) {
            switch (suit) {
                case 1:
                    checkList = checkList.concat(_this.wans);
                    break;
                case 2:
                    checkList = checkList.concat(_this.tongs);
                    break;
                case 3:
                    checkList = checkList.concat(_this.tiaos);
                    break;
                default: break;
            }
        }, this);
        checkList.forEach(function (card) {
            var temps = cards.slice(0);
            temps.push(card);
            if (_this.canHuPai(temps)) {
                results.push(card);
            }
        }, this);
        return results;
    };
    /**
     * 根据cardId计算，打出这张牌是否可以听牌（胡牌）
     *
     * @param {number[]} cardIds 手牌列表 = 手牌 + 摸牌(如果存在)
     * @param {number} cardId
     * @returns
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.getTingsByCardId = function (cardIds, cardId) {
        var hands = cardIds.slice(0);
        var index = hands.indexOf(cardId);
        hands.splice(index, 1);
        var cards = hands.map(function (cardId) {
            return MJ_Help.getCardById(cardId);
        }, this);
        var tings = this.getTingPai(cards);
        if (tings.length > 0) {
            return tings;
        }
        return null;
    };
    /**
     * 播放插牌的动作
     *
     * @param {cc.Vec2} ePos
     * @memberof MJ_HandList
     */
    MJ_HandList.prototype.playCardAct = function (cardNode, ePos) {
        var sPos = cardNode.parent.convertToWorldSpaceAR(cardNode.getPosition());
        sPos = this.node_hand.convertToNodeSpaceAR(sPos);
        cardNode.setPosition(sPos);
        cardNode.parent = this.node_hand;
        ePos.x = Math.floor(ePos.x / cardNode.width) * (cardNode.width) + cardNode.width / 2;
        var dTime = 0.3;
        var d = cc.pDistance(sPos, ePos);
        var mTime = d / 1500;
        var addH = 0;
        var action1 = cc.spawn(cc.rotateTo(dTime, 20), cc.moveTo(dTime, cc.p(sPos.x, sPos.y + cardNode.height + addH)));
        var move = cc.moveTo(mTime, cc.p(ePos.x, ePos.y + cardNode.height + addH));
        var seq = cc.sequence(action1, move, cc.rotateTo(0.12, 0), cc.moveTo(dTime, ePos), cc.callFunc(function (target, data) {
            target.removeFromParent(true);
            target.destroy();
        }, this));
        cardNode.runAction(seq);
    };
    __decorate([
        property(cc.Node)
    ], MJ_HandList.prototype, "node_hand", void 0);
    MJ_HandList = __decorate([
        ccclass
    ], MJ_HandList);
    return MJ_HandList;
}(cc.Component));
exports.default = MJ_HandList;

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
        //# sourceMappingURL=MJ_HandList.js.map
        