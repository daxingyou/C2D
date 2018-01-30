"use strict";
cc._RF.push(module, '46bbbYQKwJJ0ZnNKE/UTkWn', 'Safe');
// Script/SceneScript/Game/Safe.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Safe = /** @class */ (function (_super) {
    __extends(Safe, _super);
    function Safe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lbl_time = null;
        /**
         * allin玩家的节点列表
         * @type {cc.Node[]}
         * @memberof Safe
         */
        _this.allin_node_list = [];
        /**
         * 公共牌的节点列表
         * @type {cc.Node[]}
         * @memberof Safe
         */
        _this.pCard_node_list = [];
        /**
         * allin玩家的自己颜色
         * @type {cc.Color[]}
         * @memberof Safe
         */
        _this.allin_color_list = [];
        /**
         * 已选择
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_choose = null;
        /**
         * 赔率
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_odds = null;
        /**
         * 主池
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_pool = null;
        /**
         * 投保额
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_tbe = null;
        /**
         * 押注
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_bet = null;
        /**
         * 赔付额
         * @type {cc.Label}
         * @memberof Safe
         */
        _this.lbl_pfe = null;
        /**
         * 进度条
         * @type {cc.ProgressBar}
         * @memberof Safe
         */
        _this.safe_pro = null;
        /**
         * 选择所有
         * @type {cc.Toggle}
         * @memberof Safe
         */
        _this.toggle_choose_all = null;
        /**
         * 反超牌的牌的父节点
         * @type {cc.Node}
         * @memberof Safe
         */
        _this.fcp_svNode = null;
        /**
         * 非自己购买保险
         * @type {cc.RichText}
         * @memberof Safe
         */
        _this.lbl_other = null;
        /**
         * 如果是自己购买保险
         * @type {cc.Node}
         * @memberof Safe
         */
        _this.mineNode = null;
        /**
         * 如果是自己购买保险，反超牌的节点
         * @type {cc.Node}
         * @memberof Safe
         */
        _this.fcp_mineNode = null;
        /**
         * 亮图
         * @type {cc.SpriteFrame}
         * @memberof Safe
         */
        _this.imgLight = null;
        /**
         * 牌节点预设
         * @type {cc.Prefab}
         * @memberof Safe
         */
        _this.safe_card_prefab = null;
        /**
         * allin玩家的预设
         * @type {cc.Prefab}
         * @memberof Safe
         */
        _this.safe_allin_prefab = null;
        /**
         * 选中的牌数量
         * @type {number}
         * @memberof Safe
         */
        _this._chooseCard = 0;
        /**
         * 赔率
         * @type {InsuranceCfgAttrib}
         * @memberof Safe
         */
        _this._rate = 0;
        /**
         * 倒计时
         * @type {number}
         * @memberof Safe
         */
        _this._timeDown = 0;
        return _this;
    }
    Safe.prototype.onLoad = function () {
        this.updateData();
    };
    Safe.prototype.update = function (dt) {
        if (this._timeDown > 0) {
            this._timeDown -= dt;
            this.lbl_time.string = Math.floor(this._timeDown) + 's';
        }
        else {
            this.lbl_time.string = '0s';
            this._timeDown = 0;
        }
    };
    /**
     * 刷新数据
     * @memberof Safe
     */
    Safe.prototype.updateData = function () {
        var _this = this;
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
            this._timeDown = (Number(tableData.actTime) - Number(tableData.svrTime)) / 1000;
            this.lbl_time.string = this._timeDown + 's';
            var allin_list = tableData.insuranceStateAttrib.insuranceSeatList;
            //购买保险的玩家
            var safeSeat = null;
            for (var i = 0; i < allin_list.length; i++) {
                this.showAllInSeat(allin_list[i], tableData.insuranceStateAttrib, this.allin_node_list[i]);
                //如果是购买保险的玩家
                if (tableData.insuranceStateAttrib.accountId === allin_list[i].accountId) {
                    safeSeat = allin_list[i];
                }
            }
            var pCards = tableData.insuranceStateAttrib.tableHandCards;
            for (var i = 0; i < this.pCard_node_list.length; i++) {
                if (i < pCards.length) {
                    this.showSafeCard(pCards[i], this.pCard_node_list[i]);
                }
                else {
                    if (i === pCards.length) {
                        this.showLight(this.pCard_node_list[i]);
                    }
                    this.showSafeCard(0, this.pCard_node_list[i]);
                }
            }
            this.fcp_svNode.content.removeAllChildren();
            var winCardList = tableData.insuranceStateAttrib.winCardList;
            var _loop_1 = function (i) {
                this_1.showSafeCard(winCardList[i], this_1.fcp_svNode.content, false, function (cardNode) {
                    if (tableData.insuranceStateAttrib.accountId === dd.ud_manager.account_mine.accountId) {
                        cardNode.tag = i;
                        cardNode.on(cc.Node.EventType.TOUCH_END, _this.touch_fcp_end, _this);
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < winCardList.length; i++) {
                _loop_1(i);
            }
            if (tableData.insuranceStateAttrib.accountId === dd.ud_manager.account_mine.accountId) {
                this.mineNode.active = true;
                this.fcp_mineNode.active = true;
                this.lbl_other.node.active = false;
            }
            else {
                this.mineNode.active = false;
                this.fcp_mineNode.active = false;
                if (safeSeat) {
                    this.lbl_other.node.active = true;
                    this.lbl_other.string = '请稍等,玩家[ <color=#FFC103>' + safeSeat.nick + '</c> ]正在购买保险';
                }
                else {
                    this.lbl_other.node.active = false;
                }
            }
            this.lbl_bet.string = tableData.insuranceStateAttrib.betMoney;
            var pm = Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum);
            this.lbl_pool.string = pm.toString();
            this.lbl_pfe.string = '0';
            this.lbl_tbe.string = '0';
            this.lbl_choose.string = '0';
            this.lbl_odds.string = '0';
            this.toggle_choose_all.isChecked = false;
            this._chooseCard = 0;
            this._rate = 0;
            this.safe_pro.progress = 0;
            this.safe_pro.node.getComponent(cc.Slider).progress = 0;
        }
    };
    /**
     * 点击反超牌
     * @param {cc.Event.EventTouch} event
     * @memberof Safe
     */
    Safe.prototype.touch_fcp_end = function (event) {
        var cardNode = event.getCurrentTarget();
        cardNode.getChildByName('choose').active = !cardNode.getChildByName('choose').active;
        if (cardNode.getChildByName('choose').active) {
            this._chooseCard++;
        }
        else {
            this._chooseCard--;
        }
        this.showFCPInfo();
    };
    /**
     * 显示一张亮的图片
     * @param {cc.Node} parentNode
     * @memberof Safe
     */
    Safe.prototype.showLight = function (parentNode) {
        var light = new cc.Node();
        var sp = light.addComponent(cc.Sprite);
        sp.spriteFrame = this.imgLight;
        light.parent = parentNode;
    };
    /**
     * 显示反超牌的信息
     * @memberof Safe
     */
    Safe.prototype.showFCPInfo = function () {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
            this.lbl_choose.string = this._chooseCard + '';
            var rateList = tableData.insuranceStateAttrib.insuranceRateList;
            if (this._chooseCard >= rateList.length) {
                this._rate = Number(rateList[rateList.length - 1].rate);
                this.lbl_odds.string = rateList[rateList.length - 1].rate;
            }
            else if (this._chooseCard <= 0) {
                this._rate = 0;
                this.lbl_odds.string = '0';
            }
            else {
                for (var i = 0; i < rateList.length; i++) {
                    if (rateList[i].cardNum === this._chooseCard) {
                        this.lbl_odds.string = rateList[i].rate;
                        this._rate = Number(rateList[i].rate);
                        break;
                    }
                }
            }
        }
        this.showTBInfo(0);
    };
    /**
     * 显示allin座位的玩家
     * @param {InsuranceSeatAttrib} seat
     * @memberof Safe
     */
    Safe.prototype.showAllInSeat = function (seat, safeData, parentNode) {
        var allinNode = cc.instantiate(this.safe_allin_prefab);
        for (var i = 0; i < seat.handCards.length; i++) {
            var card = allinNode.getChildByName('card' + (i + 1));
            this.showSafeCard(seat.handCards[i], card);
        }
        var des = allinNode.getChildByName('des').getComponent(cc.Label);
        if (seat.accountId === safeData.accountId) {
            des.node.color = this.allin_color_list[0];
            des.string = '购买保险';
        }
        else {
            des.node.color = this.allin_color_list[1];
            des.string = seat.cardNum + '个outs';
        }
        allinNode.getChildByName('name').getComponent(cc.Label).string = dd.utils.getStringBySize(seat.nick, 12);
        ;
        allinNode.parent = parentNode;
    };
    /**
     * 显示牌
     * @param {number} cardId  牌id
     * @param {cc.Node} parentNode 父节点
     * @param {boolean} [isShowChoose=false] 是否选中
     * @param {*} [initCB=null] 回调函数
     * @memberof Safe
     */
    Safe.prototype.showSafeCard = function (cardId, parentNode, isShowChoose, initCB) {
        if (isShowChoose === void 0) { isShowChoose = false; }
        if (initCB === void 0) { initCB = null; }
        var safe_card = cc.instantiate(this.safe_card_prefab);
        safe_card.getChildByName('img').getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(cardId);
        safe_card.getChildByName('choose').active = isShowChoose;
        safe_card.parent = parentNode;
        if (initCB) {
            initCB(safe_card);
        }
    };
    /**
     * 选中所有
     * @memberof Safe
     */
    Safe.prototype.click_toggle_chooseAll = function () {
        var _this = this;
        dd.mp_manager.playButton();
        this.fcp_svNode.content.children.forEach(function (cardNode, index) {
            cardNode.getChildByName('choose').active = _this.toggle_choose_all.isChecked;
        });
        this._chooseCard = this.toggle_choose_all.isChecked ? this.fcp_svNode.content.childrenCount : 0;
        this.showFCPInfo();
    };
    /**
     * 进度条的bar
     * @memberof Safe
     */
    Safe.prototype.click_pro_bar = function () {
        var pro = this.safe_pro.node.getComponent(cc.Slider).progress;
        this.showTBInfo(pro);
    };
    /**
     * 显示投保信息
     * @memberof Safe
     */
    Safe.prototype.showTBInfo = function (pro) {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
            if (this._rate !== 0) {
                var maxSafe = (Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum)) / this._rate;
                var curSafe = maxSafe * pro;
                if (curSafe <= 0) {
                    curSafe = 1;
                }
                var tbe = Math.ceil(Math.ceil(curSafe) / tableData.smallBlind) * tableData.smallBlind;
                this.lbl_tbe.string = tbe.toString();
                var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
                if (pfe > Number(tableData.insuranceStateAttrib.poolMoney)) {
                    pfe = Number(tableData.insuranceStateAttrib.poolMoney);
                }
                this.lbl_pfe.string = pfe.toString();
            }
            else {
                this.lbl_pfe.string = '0';
                this.lbl_tbe.string = '0';
            }
            this.safe_pro.progress = pro;
            this.safe_pro.node.getComponent(cc.Slider).progress = pro;
        }
    };
    /**
     * 购买
     * @memberof Safe
     */
    Safe.prototype.click_btn_buy = function () {
        dd.mp_manager.playButton();
        if (this._rate !== 0) {
            this.sendBuySafe(1);
            this.node.removeFromParent();
            this.node.destroy();
        }
        else {
            dd.ui_manager.showTip('请先选择反超牌', 200, 0.3, 0.5, 0.2);
        }
    };
    /**
     * 不买
     * @memberof Safe
     */
    Safe.prototype.click_btn_nobuy = function () {
        dd.mp_manager.playButton();
        this.sendBuySafe(0);
        this.node.removeFromParent();
        this.node.destroy();
    };
    /**
     * 购买保险
     * @param {number} bt
     * @memberof Safe
     */
    Safe.prototype.sendBuySafe = function (bt) {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
            var winCardList_1 = tableData.insuranceStateAttrib.winCardList;
            var buyCards_1 = [];
            this.fcp_svNode.content.children.forEach(function (cardNode, index) {
                var cardId = winCardList_1[cardNode.tag];
                if (cardNode.getChildByName('choose').active) {
                    buyCards_1.push(cardId);
                }
            });
            var obj = {
                tableId: tableData.tableId,
                bt: bt,
                buyCards: buyCards_1,
                buyMoney: Number(this.lbl_tbe.string),
                payMoney: Number(this.lbl_pfe.string),
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_BUY_INSURANCE, msg, function (flag, content) {
                if (flag !== 0) {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 保本
     * @memberof Safe
     */
    Safe.prototype.click_btn_baoben = function () {
        dd.mp_manager.playButton();
        if (this._rate !== 0) {
            var tableData = dd.gm_manager.getTableData();
            if (tableData && tableData.insuranceStateAttrib) {
                var maxSafe = (Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum)) / this._rate;
                var tbe = Math.ceil(Number(tableData.insuranceStateAttrib.betMoney) / this._rate);
                if (tbe > maxSafe) {
                    dd.ui_manager.showTip('可投保额不足以保本');
                    return;
                }
                tbe = Math.ceil(tbe / tableData.smallBlind) * tableData.smallBlind;
                this.lbl_tbe.string = tbe.toString();
                var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
                if (pfe > Number(tableData.insuranceStateAttrib.poolMoney)) {
                    pfe = Number(tableData.insuranceStateAttrib.poolMoney);
                }
                this.lbl_pfe.string = pfe.toString();
                var pro = tbe / (maxSafe - 1);
                this.safe_pro.progress = pro;
                this.safe_pro.node.getComponent(cc.Slider).progress = pro;
            }
        }
        else {
            this.lbl_pfe.string = '0';
            this.lbl_tbe.string = '0';
            this.safe_pro.progress = 0;
            this.safe_pro.node.getComponent(cc.Slider).progress = 0;
            dd.ui_manager.showTip('请先选择反超牌', 200, 0.3, 0.5, 0.2);
        }
    };
    /**
     * 等利
     * @memberof Safe
     */
    Safe.prototype.click_btn_dengli = function () {
        dd.mp_manager.playButton();
        if (this._rate !== 0) {
            var tableData = dd.gm_manager.getTableData();
            if (tableData && tableData.insuranceStateAttrib) {
                var dm = Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum);
                var maxSafe = dm / this._rate;
                var tbe = Math.ceil((Math.ceil(maxSafe) / tableData.smallBlind)) * tableData.smallBlind;
                this.lbl_tbe.string = tbe.toString();
                var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
                if (pfe > Number(tableData.insuranceStateAttrib.poolMoney)) {
                    pfe = Number(tableData.insuranceStateAttrib.poolMoney);
                }
                this.lbl_pfe.string = pfe.toString();
                this.safe_pro.progress = 1;
                this.safe_pro.node.getComponent(cc.Slider).progress = 1;
            }
        }
        else {
            this.lbl_pfe.string = '0';
            this.lbl_tbe.string = '0';
            this.safe_pro.progress = 0;
            this.safe_pro.node.getComponent(cc.Slider).progress = 0;
            dd.ui_manager.showTip('请先选择反超牌', 200, 0.3, 0.5, 0.2);
        }
    };
    /**
     * 退出
     * @memberof Safe
     */
    Safe.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        this.node.removeFromParent();
        this.node.destroy();
    };
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_time", void 0);
    __decorate([
        property([cc.Node])
    ], Safe.prototype, "allin_node_list", void 0);
    __decorate([
        property([cc.Node])
    ], Safe.prototype, "pCard_node_list", void 0);
    __decorate([
        property([cc.Color])
    ], Safe.prototype, "allin_color_list", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_choose", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_odds", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_pool", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_tbe", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_bet", void 0);
    __decorate([
        property(cc.Label)
    ], Safe.prototype, "lbl_pfe", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Safe.prototype, "safe_pro", void 0);
    __decorate([
        property(cc.Toggle)
    ], Safe.prototype, "toggle_choose_all", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Safe.prototype, "fcp_svNode", void 0);
    __decorate([
        property(cc.RichText)
    ], Safe.prototype, "lbl_other", void 0);
    __decorate([
        property(cc.Node)
    ], Safe.prototype, "mineNode", void 0);
    __decorate([
        property(cc.Node)
    ], Safe.prototype, "fcp_mineNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Safe.prototype, "imgLight", void 0);
    __decorate([
        property(cc.Prefab)
    ], Safe.prototype, "safe_card_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Safe.prototype, "safe_allin_prefab", void 0);
    Safe = __decorate([
        ccclass
    ], Safe);
    return Safe;
}(cc.Component));
exports.default = Safe;

cc._RF.pop();