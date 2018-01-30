"use strict";
cc._RF.push(module, 'ae7d3JXbY1Awor8zsXGO47+', 'BetBTLayer');
// Script/SceneScript/Game/BetBTLayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var BetBTLayer = /** @class */ (function (_super) {
    __extends(BetBTLayer, _super);
    function BetBTLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 加注滑动框
         * @type {cc.Node}
         * @memberof BetBTLayer
         */
        _this.nodeAddBet = null;
        /**
         * 加注大盲倍数的节点
         * @type {cc.Node}
         * @memberof BetBTLayer
         */
        _this.nodeBigBlind = null;
        /**
         * 加注底池倍数的节点
         * @type {cc.Node}
         * @memberof BetBTLayer
         */
        _this.nodeBetPool = null;
        /**
         * 进度条
         * @type {cc.ProgressBar}
         * @memberof BetBTLayer
         */
        _this.addBetPro = null;
        /**
         * 进度按钮
         * @type {cc.Slider}
         * @memberof BetBTLayer
         */
        _this.handle = null;
        /**
         * 最大加注金币
         * @type {cc.Label}
         * @memberof BetBTLayer
         */
        _this.lblAddBet = null;
        /**
          * 表态按钮
          * @type {[cc.Node]}  0=alin  1=跟注 2=过牌 3=加注
          * @memberof BetBTLayer
          */
        _this.bt_node_list = [];
        /**
         * 大盲倍数加倍按钮列表
         * @type {cc.Button[]}
         * @memberof BetBTLayer
         */
        _this.btn_bigBlind_list = [];
        /**
         * 底池倍数加倍按钮列表
         * @type {cc.Button[]}
         * @memberof BetBTLayer
         */
        _this.btn_betPool_list = [];
        /**
         * 最大加注
         * @type {number}
         * @memberof BetBTLayer
         */
        _this._maxAddBet = 0;
        /**
         * 最低加注
         * @type {number}
         * @memberof BetBTLayer
         */
        _this._minAddBet = 0;
        /**
         * 当前加注
         * @type {number}
         * @memberof BetBTLayer
         */
        _this._curAddBet = 0;
        /**
         * 大盲
         * @type {number}
         * @memberof BetBTLayer
         */
        _this._bigBlind = 0;
        _this._firstPos = cc.v2(0, 0);
        _this._endPos = cc.v2(0, 0);
        return _this;
    }
    BetBTLayer.prototype.onLoad = function () {
        var _this = this;
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            _this._firstPos = touches[0].getLocation();
            _this.bt_node_list[3].opacity = 0;
            _this.nodeBetPool.active = false;
            _this.nodeBigBlind.active = false;
            _this.showAddBet();
        }, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            _this._endPos = touches[0].getLocation();
            var d = cc.pDistance(_this._firstPos, _this._endPos);
            if (d <= 2) {
                return;
            }
            var delta = touches[0].getDelta();
            var maxLen = _this.handle.parent.height;
            _this.handle.y += delta.y;
            if (_this.handle.y < -maxLen / 2) {
                _this.handle.y = -maxLen / 2;
            }
            else if (_this.handle.y > maxLen / 2) {
                _this.handle.y = maxLen / 2;
            }
            else { }
            var pro = (_this.handle.y + maxLen / 2) / maxLen;
            _this.addBetPro.progress = pro;
            var curAddBet = Math.floor(_this._maxAddBet * pro);
            if (curAddBet === _this._maxAddBet) {
                _this.lblAddBet.string = 'ALLIN';
            }
            else if (curAddBet < _this._minAddBet) {
                _this.lblAddBet.string = curAddBet.toString();
            }
            else {
                curAddBet = Math.ceil((curAddBet - _this._minAddBet) / _this._bigBlind) * _this._bigBlind + _this._minAddBet;
                _this.lblAddBet.string = curAddBet.toString();
            }
            _this._curAddBet = curAddBet;
        }, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_END, this.touchAddBetEnd, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_CANCEL, this.touchAddBetEnd, this);
    };
    /**
     * 点击加注的end事件
     * @memberof BetBTLayer
     */
    BetBTLayer.prototype.touchAddBetEnd = function () {
        this.nodeAddBet.active = false;
        this.bt_node_list[3].opacity = 255;
        //如果当前加注大于或等于 最低加注 金额,就想服务器发送消息,如果不满足，就不发送
        if (this._curAddBet >= this._minAddBet) {
            this.sendBetBT(4, this._curAddBet);
        }
        var tableData = dd.gm_manager.getTableData();
        if (tableData) {
            //当底池总额大于4倍大盲注的数额时，显示1/2底池、2/3底池 、1倍底池按钮
            if (Number(tableData.poolMoneys) > 4 * tableData.bigBlind) {
                this.nodeBetPool.active = true;
                this.nodeBigBlind.active = false;
            }
            else {
                this.nodeBetPool.active = false;
                this.nodeBigBlind.active = true;
            }
        }
    };
    BetBTLayer.prototype.init = function () {
        this.nodeAddBet.active = false;
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
            this.node.active = true;
            var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat.betMoney);
            //如果自己身上的钱足够下到 应该下注的金币
            if (Number(mineSeat.currMoney) > shouldBet) {
                //如果自己应该加入的金币为0，表示可以过牌 ; 如果大于0，就必须跟注
                this.bt_node_list[1].active = shouldBet > 0 ? true : false; //跟注
                this.bt_node_list[2].active = shouldBet > 0 ? false : true; //过牌
                //如果自己的钱足够加注 （加注的条件是 自己的钱 》 当前下注最大的下注 * 2）,如果不足，就显示alin
                if (Number(mineSeat.currMoney) > dd.gm_manager.poolMoneys * 2) {
                    this.bt_node_list[0].active = false; //alin
                    this.bt_node_list[3].active = true; //加注
                    this.bt_node_list[3].opacity = 255;
                }
                else {
                    this.bt_node_list[0].active = true; //alin
                    this.bt_node_list[3].active = false; //加注
                }
            }
            else {
                //如果自己身上的钱已经不足,只显示allin 和 弃牌
                this.bt_node_list[0].active = true;
                this.bt_node_list[1].active = false;
                this.bt_node_list[2].active = false;
                this.bt_node_list[3].active = false;
            }
        }
        else {
            this.node.active = false;
        }
        this.showSpecialAddBet();
    };
    /**
     * 显示特殊的加注
     * @memberof BetBTLayer
     */
    BetBTLayer.prototype.showSpecialAddBet = function () {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
            //自己应该下注的钱
            var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat.betMoney);
            //自己剩余的钱
            var dMoney = Number(mineSeat.currMoney) - shouldBet;
            //最小的加注金额 = 当前轮桌子筹码总额 * 2
            var minAddBet = dd.gm_manager.poolMoneys * 2;
            //当底池总额大于4倍大盲注的数额时，显示1/2底池、2/3底池 、1倍底池按钮
            if (Number(tableData.poolMoneys) > 4 * tableData.bigBlind) {
                this.nodeBetPool.active = true;
                this.nodeBigBlind.active = false;
                var pm = Number(tableData.poolMoneys);
                var pm1 = Math.ceil(Math.ceil(pm * 0.5) / tableData.bigBlind) * tableData.bigBlind;
                if (dMoney >= pm1 && pm1 >= minAddBet) {
                    this.btn_betPool_list[0].interactable = true;
                }
                else {
                    this.btn_betPool_list[0].interactable = false;
                }
                var pm2 = Math.ceil(Math.ceil(pm * 2 / 3) / tableData.bigBlind) * tableData.bigBlind;
                if (dMoney >= pm2 && pm2 >= minAddBet) {
                    this.btn_betPool_list[1].interactable = true;
                }
                else {
                    this.btn_betPool_list[1].interactable = false;
                }
                var pm3 = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
                if (dMoney >= pm3 && pm3 >= minAddBet) {
                    this.btn_betPool_list[2].interactable = true;
                }
                else {
                    this.btn_betPool_list[2].interactable = false;
                }
            }
            else {
                //当底池总额小于4倍大盲注的数额时，显示3倍大盲、4倍大盲、1倍底池按钮
                this.nodeBetPool.active = false;
                this.nodeBigBlind.active = true;
                var b1 = tableData.bigBlind * 3;
                if (dMoney >= b1 && b1 >= minAddBet) {
                    this.btn_bigBlind_list[0].interactable = true;
                }
                else {
                    this.btn_bigBlind_list[0].interactable = false;
                }
                var b2 = tableData.bigBlind * 4;
                if (dMoney >= b2 && b2 >= minAddBet) {
                    this.btn_bigBlind_list[1].interactable = true;
                }
                else {
                    this.btn_bigBlind_list[1].interactable = false;
                }
                var pm = Number(tableData.poolMoneys);
                var pm3 = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
                if (dMoney >= pm3 && pm3 >= minAddBet) {
                    this.btn_bigBlind_list[2].interactable = true;
                }
                else {
                    this.btn_bigBlind_list[2].interactable = false;
                }
            }
        }
    };
    /**
     * 显示加注界面
     * @memberof BetBTLayer
     */
    BetBTLayer.prototype.showAddBet = function () {
        this.nodeAddBet.active = true;
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
            //当前这轮已下注的人下注最大值
            var r_max = Math.ceil(dd.gm_manager.poolMoneys / tableData.bigBlind) * tableData.bigBlind;
            if (r_max === 0)
                r_max = tableData.bigBlind;
            //自己最低加注的值
            this._minAddBet = r_max * 2 - Number(mineSeat.betMoney);
            //自己最大加注的值
            this._maxAddBet = Number(mineSeat.currMoney);
            this._bigBlind = tableData.bigBlind;
            //自己当前加注的值
            this._curAddBet = this._minAddBet;
            this.lblAddBet.string = this._minAddBet.toString();
            //计算handle的位置
            var pro = this._minAddBet / this._maxAddBet;
            var maxLen = this.handle.parent.height;
            var curY = maxLen * pro - maxLen / 2;
            this.handle.y = curY;
            //重置进度条的进度
            this.addBetPro.progress = pro;
        }
    };
    /**
     * 点击表态按钮
     * @param {any} event
     * @param {string} type 0=弃牌 2=加注 1=跟注
     * @memberof PlayerLayer
     */
    BetBTLayer.prototype.click_btn_state = function (event, type) {
        switch (type) {
            case '1'://弃牌
                this.sendBetBT(1, 0);
                break;
            case '2'://过牌
                this.sendBetBT(2, 0);
                break;
            case '3': {
                var mineSeat_1 = dd.gm_manager.getMineSeat();
                var tableData = dd.gm_manager.getTableData();
                if (mineSeat_1 && tableData) {
                    var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat_1.betMoney);
                    this.sendBetBT(3, shouldBet);
                }
                break;
            }
            case '4'://加注
                this.showAddBet();
                break;
            case '5'://allin
                var mineSeat = dd.gm_manager.getMineSeat();
                this.sendBetBT(5, Number(mineSeat.currMoney));
                break;
            default:
                break;
        }
    };
    /**
     * 发送下注表态
     * @param {number} bt 座位表态结果(1=弃牌,2=过牌,3=跟注,4=加注,5=全下)
     * @param {number} btVal  座位表态金币
     * @memberof PlayerLayer
     */
    BetBTLayer.prototype.sendBetBT = function (bt, btVal) {
        var _this = this;
        var mineSeat = dd.gm_manager.getMineSeat();
        if (mineSeat) {
            //如果为最大加注金币，就allin
            if (btVal >= Number(mineSeat.currMoney)) {
                btVal = Number(mineSeat.currMoney);
            }
            this.node.active = false;
            var obj = {
                tableId: dd.gm_manager.getTableData().tableId,
                bt: bt,
                btVal: btVal
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_BT, msg, function (flag, content) {
                if (flag === 0) {
                }
                else if (flag === -1) {
                    _this.node.active = true;
                    dd.ui_manager.showTip('表态消息发送超时');
                }
                else {
                    _this.node.active = true;
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 点击大盲倍数加注 1=3倍大盲 2=4倍大盲 3=1倍底池
     * @memberof BetBTLayer
     */
    BetBTLayer.prototype.click_btn_bigBlind = function (event, type) {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
            switch (type) {
                case '1'://2倍大盲
                    this.sendBetBT(4, tableData.bigBlind * 3);
                    break;
                case '2'://3倍大盲
                    this.sendBetBT(4, tableData.bigBlind * 4);
                    break;
                case '3'://1倍底池
                    var pm = Number(tableData.poolMoneys);
                    pm = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
                    this.sendBetBT(4, pm);
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * 点击底池倍数加注 1=1/2倍底池 2=2/3倍底池 3=1倍底池
     * @memberof BetBTLayer
     */
    BetBTLayer.prototype.click_btn_betPool = function (event, type) {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
            var pm = Number(tableData.poolMoneys);
            switch (type) {
                case '1'://1/2倍底池
                    pm = Math.ceil(Math.ceil(pm * 0.5) / tableData.bigBlind) * tableData.bigBlind;
                    this.sendBetBT(4, pm);
                    break;
                case '2'://=2/3倍底池
                    pm = Math.ceil(Math.ceil(pm * 2 / 3) / tableData.bigBlind) * tableData.bigBlind;
                    this.sendBetBT(4, pm);
                    break;
                case '3'://1倍底池
                    pm = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
                    this.sendBetBT(4, pm);
                    break;
                default:
                    break;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], BetBTLayer.prototype, "nodeAddBet", void 0);
    __decorate([
        property(cc.Node)
    ], BetBTLayer.prototype, "nodeBigBlind", void 0);
    __decorate([
        property(cc.Node)
    ], BetBTLayer.prototype, "nodeBetPool", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], BetBTLayer.prototype, "addBetPro", void 0);
    __decorate([
        property(cc.Node)
    ], BetBTLayer.prototype, "handle", void 0);
    __decorate([
        property(cc.Label)
    ], BetBTLayer.prototype, "lblAddBet", void 0);
    __decorate([
        property([cc.Node])
    ], BetBTLayer.prototype, "bt_node_list", void 0);
    __decorate([
        property([cc.Button])
    ], BetBTLayer.prototype, "btn_bigBlind_list", void 0);
    __decorate([
        property([cc.Button])
    ], BetBTLayer.prototype, "btn_betPool_list", void 0);
    BetBTLayer = __decorate([
        ccclass
    ], BetBTLayer);
    return BetBTLayer;
}(cc.Component));
exports.default = BetBTLayer;

cc._RF.pop();