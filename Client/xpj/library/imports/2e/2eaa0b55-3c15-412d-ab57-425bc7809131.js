"use strict";
cc._RF.push(module, '2eaa0tVPBVBLatXQlvHgJEx', 'Recharge');
// Script/SceneScript/Home/Recharge.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Recharge = /** @class */ (function (_super) {
    __extends(Recharge, _super);
    function Recharge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 充值金额输入框
         * @type {cc.EditBox}
         * @memberof Recharge
         */
        _this.edt_buy = null;
        /**
         * 充值比例
         * @type {cc.Label}
         * @memberof Recharge
         */
        _this.lblRatio = null;
        return _this;
    }
    Recharge.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            _this.outRecharge();
        }, this);
    };
    Recharge.prototype.initData = function (data) {
        this.lblRatio.string = '1元=' + data.rmb2goldMoney + '金币';
    };
    /**
     * 获取充值金币
     * @memberof Recharge
     */
    Recharge.prototype.getBuyGold = function (money, payType) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'rmb': money, 'payType': payType };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ORDER_CHARGE_RMB2GOLDMONEY, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    // dd.ui_manager.showTip('充值请求已发送!');
                    _this.edt_buy.string = '';
                    dd.utils.openBrowser(content);
                    _this.outRecharge();
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
    Recharge.prototype.edit_change = function (inputStr, editBox) {
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
     * 选择充值方式
     * @memberof Recharge
     */
    Recharge.prototype.click_btn_storeBuy = function (event, type) {
        var moneyStr = this.edt_buy.string.trim();
        if (moneyStr === '' || moneyStr === null) {
            dd.ui_manager.showTip('充值金额不为空');
            return;
        }
        var money = Number(moneyStr);
        if (isNaN(money)) {
            this.edt_buy.string = '';
            dd.ui_manager.showTip('请输入有效的充值金额');
            return;
        }
        if (Math.floor(money) !== money) {
            this.edt_buy.string = '';
            dd.ui_manager.showTip('请输入整数的充值金额');
            return;
        }
        if (money > 0 && money <= 3000) {
            this.getBuyGold(Number(money), Number(type));
        }
        else {
            dd.ui_manager.showTip('充值金额范围为1~3000，请重新输入');
        }
    };
    /**
     * 退出充值
     * @memberof Recharge
     */
    Recharge.prototype.outRecharge = function () {
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.EditBox)
    ], Recharge.prototype, "edt_buy", void 0);
    __decorate([
        property(cc.Label)
    ], Recharge.prototype, "lblRatio", void 0);
    Recharge = __decorate([
        ccclass
    ], Recharge);
    return Recharge;
}(cc.Component));
exports.default = Recharge;

cc._RF.pop();