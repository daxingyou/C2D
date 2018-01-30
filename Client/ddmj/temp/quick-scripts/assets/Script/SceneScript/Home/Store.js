(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Store.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e7fcq18ttOSJsaEFxtDhal', 'Store', __filename);
// Script/SceneScript/Home/Store.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * ios的商城界面
         * @type {cc.Node}
         * @memberof Store
         */
        _this.node_ios = null;
        /**
         * android的商城界面
         * @type {cc.Node}
         * @memberof Store
         */
        _this.node_android = null;
        /**
         * ios游戏代理咨询名称
         *
         * @type {cc.Label}
         * @memberof Store
         */
        _this.lbl_ios_desName = null;
        /**
         * ios 游戏代理咨询联系
         * @type {cc.Label}
         * @memberof Store
         */
        _this.lbl_ios_desContent = null;
        /**
         * android游戏代理咨询名称
         *
         * @type {[cc.Label]}
         * @memberof Store
         */
        _this.lbl_android_desName = [];
        /**
         * android游戏代理咨询联系
         * @type {[cc.Label]}
         * @memberof Store
         */
        _this.lbl_android_desContent = [];
        /**
         * 商品列表
         *
         * @type {cc.Node}
         * @memberof Store
         */
        _this.itemBoard = null;
        _this.items = [];
        _this.selectProduct = null;
        /**
         * 商品预设
         *
         * @type {cc.Prefab}
         * @memberof Store
         */
        _this.store_item_prefab = null;
        _this.imgGoodsList = [];
        _this.products = null;
        _this.proxys = null;
        /**
         * 商品节点列表
         *
         * @type {cc.Node[]}
         * @memberof Store
         */
        _this._node_goods_list = [];
        _this.cb_iapBack = function (event) {
            var state = event.detail;
            switch (state) {
                case 0://支付成功，校验成功
                    var obj = { 'num': parseInt(_this.selectProduct.title) };
                    var msg = JSON.stringify(obj);
                    dd.ws_manager.sendMsg(dd.protocol.MALL_ITEM_BUY_OK, msg, function (flag, content) {
                        if (flag === 0) {
                            dd.ui_manager.showAlert('购买成功!', '温馨提示', null, null, 1);
                        }
                        else if (flag === -1) {
                        }
                        else {
                            dd.ui_manager.showTip(content);
                        }
                    });
                    break;
                case -2://支付失败
                    dd.ui_manager.showAlert('支付失败!', '温馨提示', null, null, 1);
                    break;
                case -4://支付成功，校验失败
                    dd.ui_manager.showAlert('支付成功，校验失败!', '温馨提示', null, null, 1);
                    break;
                default:
                    break;
            }
            _this.node.removeFromParent(true);
            _this.node.destroy();
        };
        return _this;
    }
    Store.prototype.onLoad = function () {
        var _this = this;
        cc.systemEvent.on('cb_iapBack', this.cb_iapBack, this);
        this.node.on("touchend", function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        if (this.products) {
            this.node_android.active = false;
            this.node_ios.active = true;
            //显示商品列表
            this.showGoodsList();
            //显示ios游戏代理
            this.showIosPoxy();
        }
        else {
            this.node_android.active = true;
            this.node_ios.active = false;
            //显示android的游戏代理列表
            this.showAndroidPoxy();
        }
    };
    Store.prototype.onDestroy = function () {
        cc.systemEvent.off('cb_iapBack', this.cb_iapBack, this);
    };
    Store.prototype.init = function (proxyItems, products) {
        this.proxys = proxyItems;
        this.products = products;
    };
    /**
     * 显示android的代理商
     * @memberof Store
     */
    Store.prototype.showAndroidPoxy = function () {
        for (var i = 0; i < this.lbl_android_desContent.length; i++) {
            if (this.proxys && this.proxys[i]) {
                this.lbl_android_desContent[i].node.parent.active = true;
                this.lbl_android_desName[i].string = this.proxys[i].proxyType;
                this.lbl_android_desContent[i].string = this.proxys[i].wxNO + '   [' + this.proxys[i].proxyDesc + ']';
            }
            else {
                this.lbl_android_desContent[i].node.parent.active = false;
            }
        }
    };
    /**
     * 显示ios的代理商
     * @memberof Store
     */
    Store.prototype.showIosPoxy = function () {
        if (this.proxys && this.proxys[0]) {
            this.lbl_ios_desContent.node.parent.active = true;
            this.lbl_ios_desName.string = this.proxys[0].proxyType;
            this.lbl_ios_desContent.string = this.proxys[0].wxNO + '   [' + this.proxys[0].proxyDesc + ']';
        }
        else {
            this.lbl_ios_desContent.node.parent.active = false;
        }
    };
    /**
     * 显示商品列表
     *
     * @memberof Store
     */
    Store.prototype.showGoodsList = function () {
        var _this = this;
        this.itemBoard.removeAllChildren();
        this.items = [];
        if (this.products) {
            for (var i = 0; i < this.products.length; i++) {
                var store_item = cc.instantiate(this.store_item_prefab);
                store_item.tag = i;
                cc.find('img', store_item).getComponent(cc.Sprite).spriteFrame = this.imgGoodsList[i];
                cc.find('priceLayout/price', store_item).getComponent(cc.Label).string = parseInt(this.products[i].price).toString();
                cc.find('countLayout/count', store_item).getComponent(cc.Label).string = this.products[i].title;
                var select = cc.find('select', store_item);
                if (i === 0) {
                    select.active = true;
                    this.selectProduct = this.products[0];
                }
                else {
                    select.active = false;
                }
                store_item.on("touchend", function (event) {
                    dd.mp_manager.playButton();
                    _this.items.forEach(function (item) {
                        var select = cc.find('select', item);
                        if (item === event.currentTarget) {
                            select.active = true;
                            _this.selectProduct = _this.products[item.tag];
                        }
                        else {
                            select.active = false;
                        }
                    }, _this);
                }, this);
                store_item.parent = this.itemBoard;
                this.items.push(store_item);
            }
        }
    };
    /**
     * 购买商品
     *
     * @memberof Store
     */
    Store.prototype.click_btn_buy = function () {
        dd.mp_manager.playButton();
        if (this.selectProduct) {
            dd.ui_manager.showLoading('正在向苹果请求交易，请稍后');
            dd.js_call_native.buyProduct(this.selectProduct.productid, dd.ud_manager.mineData.accountId + Date.now);
        }
    };
    /**
     * ios的复制按钮
     * @memberof Store
     */
    Store.prototype.click_btn_copy_ios = function () {
        dd.mp_manager.playButton();
        if (this.proxys && this.proxys[0]) {
            var copyStr = this.proxys[0].wxNO;
            dd.js_call_native.copyToClipboard(copyStr);
            dd.ui_manager.showTip('复制成功!');
        }
    };
    /**
     * android的复制按钮
     * @memberof Store
     */
    Store.prototype.click_btn_copy_android = function (event, type) {
        dd.mp_manager.playButton();
        if (this.proxys && this.proxys[Number(type)]) {
            var copyStr = this.proxys[Number(type)].wxNO;
            dd.js_call_native.copyToClipboard(copyStr);
            dd.ui_manager.showTip('复制成功!');
        }
    };
    /**
     * 退出商城
     *
     * @memberof Store
     */
    Store.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Store.prototype, "node_ios", void 0);
    __decorate([
        property(cc.Node)
    ], Store.prototype, "node_android", void 0);
    __decorate([
        property(cc.Label)
    ], Store.prototype, "lbl_ios_desName", void 0);
    __decorate([
        property(cc.Label)
    ], Store.prototype, "lbl_ios_desContent", void 0);
    __decorate([
        property([cc.Label])
    ], Store.prototype, "lbl_android_desName", void 0);
    __decorate([
        property([cc.Label])
    ], Store.prototype, "lbl_android_desContent", void 0);
    __decorate([
        property(cc.Node)
    ], Store.prototype, "itemBoard", void 0);
    __decorate([
        property(cc.Prefab)
    ], Store.prototype, "store_item_prefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Store.prototype, "imgGoodsList", void 0);
    Store = __decorate([
        ccclass
    ], Store);
    return Store;
}(cc.Component));
exports.default = Store;

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
        //# sourceMappingURL=Store.js.map
        