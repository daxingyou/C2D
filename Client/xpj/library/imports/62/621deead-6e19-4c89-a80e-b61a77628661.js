"use strict";
cc._RF.push(module, '621de6tbhlMiagOthp3YoZh', 'HomeCanvas');
// Script/SceneScript/Home/HomeCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var HomeCanvas = /** @class */ (function (_super) {
    __extends(HomeCanvas, _super);
    function HomeCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家名称
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblName = null;
        /**
         * 玩家金币
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblGold = null;
        /**
         * 玩家ID
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblStarNo = null;
        /**
         * 玩家头像
         *
         * @type {cc.Sprite}
         * @memberof HomeCanvas
         */
        _this.headImg = null;
        /**
         * 设置界面预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.setting_prefab = null;
        /**
         * 客服预设
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.service_prefab = null;
        /**
         * 充值预设
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.recharge_prefab = null;
        /**
         * 兑换预设
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.exchange_prefab = null;
        _this._setting = null;
        _this._service = null;
        _this._recharge = null;
        _this._exchange = null;
        _this.needWait = false;
        return _this;
    }
    HomeCanvas.prototype.start = function () {
        //拉回桌子
        if (dd.ud_manager && dd.ud_manager.mineData && dd.ud_manager.mineData.tableId !== 0) {
            if (dd.ui_manager.showLoading('正在重新进入未完成的游戏')) {
                var obj = { 'tableId': dd.ud_manager.mineData.tableId, 'type': 0 };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.ZJH_JION_TABLEID, msg, function (flag, content) {
                    if (flag === 0) {
                        switch (content.gameType) {
                            case 1:
                                dd.gm_manager.nnGameData = content;
                                cc.director.loadScene('NNScene');
                                break;
                            case 2:
                                dd.gm_manager.zjhGameData = content;
                                cc.director.loadScene('ZJHScene');
                                break;
                            default: break;
                        }
                    }
                    else if (flag === -1) {
                        dd.ui_manager.showTip('获取桌子信息超时!');
                    }
                    else {
                        dd.ui_manager.showTip(content);
                    }
                });
            }
        }
    };
    /**
     * 界面刷新
     *
     * @param {number} dt
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.update = function (dt) {
        //刷新玩家信息
        if (dd.ud_manager && dd.ud_manager.mineData) {
            this.lblName.string = dd.ud_manager.mineData.nick;
            this.lblGold.string = dd.utils.getShowNumberString(dd.ud_manager.mineData.roomCard);
            this.lblStarNo.string = '  (ID:' + dd.ud_manager.mineData.starNO + ')';
            this.headImg.spriteFrame = dd.img_manager.getHeadById(Number(dd.ud_manager.mineData.headImg));
        }
    };
    /**
     * 进入游戏
     *
     * @param {any} event
     * @param {string} type
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_game = function (event, type) {
        if (this.needWait)
            return;
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading('正在获取房间列表,请稍后')) {
            this.needWait = true;
            var obj = { 'gameType': type === '0' ? 1 : 2 };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ZJH_GET_ROOM_LIST, msg, function (flag, content) {
                if (flag === 0) {
                    var items_1 = content.items;
                    if (type === '0') {
                        cc.director.loadScene('NNRoomScene', function () {
                            dd.ui_manager.getCanvasNode().getComponent('NNRoomCanvas').init(items_1);
                        });
                    }
                    else {
                        cc.director.loadScene('ZJHRoomScene', function () {
                            dd.ui_manager.getCanvasNode().getComponent('ZJH_RoomCanvas').init(items_1);
                        });
                    }
                }
                else if (flag === -1) {
                    dd.ui_manager.showTip('获取房间列表失败,请重试!');
                }
                else {
                    dd.ui_manager.showTip(content);
                }
            });
        }
    };
    /**
     * 点击设置
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_setting = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._setting || !this._setting.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    this._setting = cc.instantiate(this.setting_prefab);
                    this._setting.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击充值
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_recharge = function () {
        var _this = this;
        dd.mp_manager.playButton();
        //获取兑换比例
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.ORDER_GET_EXCHANAGE_PERCENT, '', function (flag, content) {
                if (flag === 0) {
                    if (!_this._recharge || !_this._recharge.isValid) {
                        dd.ui_manager.isShowPopup = false;
                        _this._recharge = cc.instantiate(_this.recharge_prefab);
                        _this._recharge.parent = _this.node;
                        var rechargeScript = _this._recharge.getComponent('Recharge');
                        rechargeScript.initData(content);
                        dd.ui_manager.hideLoading();
                    }
                }
                else if (flag === -1) {
                    dd.ui_manager.hideLoading();
                }
                else {
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 兑换
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_exchange = function () {
        var _this = this;
        dd.mp_manager.playButton();
        //获取兑换比例
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.ORDER_GET_EXCHANAGE_PERCENT, '', function (flag, content) {
                if (flag === 0) {
                    if (!_this._exchange || !_this._exchange.isValid) {
                        dd.ui_manager.isShowPopup = false;
                        _this._exchange = cc.instantiate(_this.exchange_prefab);
                        _this._exchange.parent = _this.node;
                        var exchangeScript = _this._exchange.getComponent('Exchange');
                        exchangeScript.initData(content);
                        dd.ui_manager.hideLoading();
                    }
                }
                else if (flag === -1) {
                    dd.ui_manager.hideLoading();
                }
                else {
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 客服
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_service = function () {
        var _this = this;
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_CUSTOMER_SERVICE, '', function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    if (dd.ui_manager.isShowPopup) {
                        if (!_this._service || !_this._service.isValid) {
                            dd.ui_manager.isShowPopup = false;
                            _this._service = cc.instantiate(_this.service_prefab);
                            var service_script = _this._service.getComponent('Service');
                            service_script.initData(content);
                            _this._service.parent = _this.node;
                        }
                    }
                }
                else if (flag === -1) {
                }
                else {
                }
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblGold", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblStarNo", void 0);
    __decorate([
        property(cc.Sprite)
    ], HomeCanvas.prototype, "headImg", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "setting_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "service_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "recharge_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "exchange_prefab", void 0);
    HomeCanvas = __decorate([
        ccclass
    ], HomeCanvas);
    return HomeCanvas;
}(cc.Component));
exports.default = HomeCanvas;

cc._RF.pop();