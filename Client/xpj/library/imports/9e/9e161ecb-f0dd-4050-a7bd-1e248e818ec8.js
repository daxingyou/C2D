"use strict";
cc._RF.push(module, '9e1617L8N1AUKe9HiSOgY7I', 'Exchange');
// Script/SceneScript/Home/Exchange.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    function Exchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_input = null;
        _this.node_order = null;
        _this.lblOrder = null;
        _this.edit_dh = null;
        /**
        * 充值比例
        * @type {cc.Label}
        * @memberof Recharge
        */
        _this.lblRatio = null;
        _this._ratio = 0;
        return _this;
    }
    Exchange.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
        }, this);
        this.node_order.active = false;
        this.node_input.active = false;
        dd.ui_manager.hideLoading();
        this.getOrderInfo();
    };
    Exchange.prototype.initData = function (data) {
        this._ratio = data.goldMoney2Rmb;
        this.lblRatio.string = '兑换比例' + data.goldMoney2Rmb + '金币 = 1礼券';
    };
    /**
     * 显示兑换信息
     * @memberof Exchange
     */
    Exchange.prototype.showExchange = function (data) {
        if (data) {
            this.node_order.active = true;
            this.node_input.active = false;
            var orderStr = '';
            for (var i = 0; i < data.length; i++) {
                if (i > 1) {
                    orderStr += '<br/>订单号' + (i + 1) + ':<b>' + data[i] + '<b/>';
                }
                else {
                    if (data.length > 1) {
                        orderStr += '订单号' + (i + 1) + ':<b>' + data[i] + '<b/>';
                    }
                    else {
                        orderStr += '<b>' + data[i] + '<b/>';
                    }
                }
            }
            this.lblOrder.string = orderStr;
        }
        else {
            this.node_order.active = false;
            this.node_input.active = true;
        }
    };
    /**
     * 获取兑换订单号信息
     * @memberof Recharge
     */
    Exchange.prototype.getOrderInfo = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.ORDER_CHARGE_GOLDMONEY2RMB_QUERY, '', function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.showExchange(content);
                }
                else if (flag === -1) {
                    dd.ui_manager.showTip('消息超时!');
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 兑换
     * @param {number} money
     * @memberof Exchange
     */
    Exchange.prototype.getExchange = function (money) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'goldMoney': money };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ORDER_CHARGE_GOLDMONEY2RMB, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.showExchange(content);
                }
                else if (flag === -1) {
                    dd.ui_manager.showTip('消息超时!');
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     *
     * @memberof Recharge
     */
    Exchange.prototype.edit_change = function (inputStr, editBox) {
        //如果是特殊符号
        if (isNaN(Number(inputStr))) {
            if (inputStr.length > 1) {
                inputStr = inputStr.substring(0, inputStr.length - 1);
                editBox.string = inputStr;
            }
            else {
                editBox.string = '';
            }
        }
        else {
            var money = Number(inputStr);
            editBox.string = money + '';
        }
    };
    /**
     * 兑换按钮
     * @memberof Exchange
     */
    Exchange.prototype.click_btn_exchange = function () {
        dd.mp_manager.playButton();
        var moneyStr = this.edit_dh.string.trim();
        if (moneyStr === '' || moneyStr === null) {
            dd.ui_manager.showTip('兑换金额不为空');
            return;
        }
        var money = Number(moneyStr);
        if (isNaN(money)) {
            this.edit_dh.string = '';
            dd.ui_manager.showTip('请输入有效的兑换金额');
            return;
        }
        if (Math.floor(money) !== money) {
            this.edit_dh.string = '';
            dd.ui_manager.showTip('请输入整数的兑换金额');
            return;
        }
        if (money % this._ratio !== 0) {
            dd.ui_manager.showTip('请输入兑换比例的整数倍金币');
            return;
        }
        this.getExchange(money);
    };
    __decorate([
        property(cc.Node)
    ], Exchange.prototype, "node_input", void 0);
    __decorate([
        property(cc.Node)
    ], Exchange.prototype, "node_order", void 0);
    __decorate([
        property(cc.RichText)
    ], Exchange.prototype, "lblOrder", void 0);
    __decorate([
        property(cc.EditBox)
    ], Exchange.prototype, "edit_dh", void 0);
    __decorate([
        property(cc.Label)
    ], Exchange.prototype, "lblRatio", void 0);
    Exchange = __decorate([
        ccclass
    ], Exchange);
    return Exchange;
}(cc.Component));
exports.default = Exchange;

cc._RF.pop();