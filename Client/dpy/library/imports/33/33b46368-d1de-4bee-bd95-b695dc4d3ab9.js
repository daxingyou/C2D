"use strict";
cc._RF.push(module, '33b46No0d5L7r2VtpXcTTq5', 'BuyLayer');
// Script/SceneScript/Game/BuyLayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var BuyLayer = /** @class */ (function (_super) {
    __extends(BuyLayer, _super);
    function BuyLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 最小带入
         *
         * @type {cc.Label}
         * @memberof BuyLayer
         */
        _this.lab_min = null;
        /**
         * 最大购入
         *
         * @type {cc.Label}
         * @memberof BuyLayer
         */
        _this.lab_max = null;
        /**
         * 显示当前选择的购买量
         *
         * @type {cc.Label}
         * @memberof BuyLayer
         */
        _this.lab_buy = null;
        /**
         * 加减购买量用的数组下标
         *
         * @type {number}
         * @memberof BuyLayer
         */
        _this.maxIndex = 0;
        /**
         * 记录桌子上的最小带入
         *
         * @type {number}
         * @memberof BuyLayer
         */
        _this.min = 0;
        return _this;
    }
    BuyLayer.prototype.onLoad = function () {
        var tableData = dd.gm_manager.getTableData();
        this.min = tableData.joinChip;
        this.maxIndex = Math.floor(tableData.buyMaxChip / tableData.joinChip);
        this.lab_min.string = tableData.joinChip.toString();
        this.lab_max.string = tableData.buyMaxChip.toString();
        this.lab_buy.string = this.lab_min.string;
        this.lab_buy.node.tag = 0;
    };
    /**
     * 点击面板
     *
     * @memberof BuyLayer
     */
    BuyLayer.prototype.click_board = function () {
        dd.mp_manager.playButton();
        this.node.destroy();
    };
    /**
     * 点击加号
     *
     * @memberof BuyLayer
     */
    BuyLayer.prototype.click_add = function () {
        dd.mp_manager.playButton();
        var index = this.lab_buy.node.tag;
        if (index < this.maxIndex - 1) {
            index++;
            this.lab_buy.string = (this.min * (index + 1)).toString();
            this.lab_buy.node.tag = index;
        }
    };
    /**
     * 点击减号
     *
     * @memberof BuyLayer
     */
    BuyLayer.prototype.click_reduce = function () {
        dd.mp_manager.playButton();
        var index = this.lab_buy.node.tag;
        if (index > 0) {
            index--;
            this.lab_buy.string = (this.min * (index + 1)).toString();
            this.lab_buy.node.tag = index;
        }
    };
    /**
     * 点击发送申请
     *
     * @memberof BuyLayer
     */
    BuyLayer.prototype.click_send = function () {
        var _this = this;
        dd.ui_manager.showLoading('正在发送购买申请');
        dd.mp_manager.playButton();
        var obj = {
            tableId: dd.gm_manager.getTableData().tableId,
            chipNum: Number(this.lab_buy.string)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_BUY_CHIP, msg, function (flag, content) {
            if (flag === 0) {
                if (dd.gm_manager.getTableData().createPlayer === dd.ud_manager.account_mine.accountId) {
                    dd.ui_manager.hideLoading();
                }
                else {
                    dd.ui_manager.showTip('申购消息已经发送给房主,请等候房主处理!');
                }
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('申购消息发送超时!');
            }
            else {
                dd.ui_manager.showTip(content);
            }
            _this.node.destroy();
        });
    };
    __decorate([
        property(cc.Label)
    ], BuyLayer.prototype, "lab_min", void 0);
    __decorate([
        property(cc.Label)
    ], BuyLayer.prototype, "lab_max", void 0);
    __decorate([
        property(cc.Label)
    ], BuyLayer.prototype, "lab_buy", void 0);
    BuyLayer = __decorate([
        ccclass
    ], BuyLayer);
    return BuyLayer;
}(cc.Component));
exports.default = BuyLayer;

cc._RF.pop();