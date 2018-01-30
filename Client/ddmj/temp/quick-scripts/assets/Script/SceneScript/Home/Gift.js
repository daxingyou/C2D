(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Gift.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a7ab0qJgtpBkLRQn5vDWEO9', 'Gift', __filename);
// Script/SceneScript/Home/Gift.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Gift = /** @class */ (function (_super) {
    __extends(Gift, _super);
    function Gift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_board1 = null;
        _this.node_board2 = null;
        _this.svNode = null;
        _this.gift_item_prefab = null;
        /**
         * 输入数量
         *
         * @type {cc.EditBox}
         * @memberof Gift
         */
        _this.edit_giftNum = null;
        /**
         * 输入id
         *
         * @type {cc.EditBox}
         * @memberof Gift
         */
        _this.edit_id = null;
        /**
         * 赠送玩家头像
         *
         * @type {cc.Sprite}
         * @memberof Gift
         */
        _this.headImg = null;
        /**
         * 赠送玩家昵称
         *
         * @type {cc.Label}
         * @memberof Gift
         */
        _this.lblName = null;
        /**
         * 赠送玩家id
         *
         * @type {cc.Label}
         * @memberof Gift
         */
        _this.lblID = null;
        /**
         * 赠送玩家数量
         *
         * @type {cc.Label}
         * @memberof Gift
         */
        _this.lblGiftNum = null;
        return _this;
    }
    Gift.prototype.onLoad = function () {
        var _this = this;
        this.node.on('touchend', function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        this.showGiftLayer(0);
    };
    /**
     * 获取赠送记录
     *
     * @memberof Gift
     */
    Gift.prototype.sendGetRecordList = function () {
        var _this = this;
        dd.ui_manager.hideLoading();
        if (dd.ui_manager.showLoading()) {
            this.svNode.content.removeAllChildren();
            // let obj = {  };
            // let msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.WALLET_ROOMCARD_RECORD, '', function (flag, content) {
                if (flag === 0) {
                    _this.showRecordList(content.items);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
                dd.ui_manager.hideLoading();
                cc.log(content);
            });
        }
    };
    /**
     * 赠送房卡
     *
     * @memberof Gift
     */
    Gift.prototype.sendGiveGift = function (givePlayer, giveNum) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'givePlayer': givePlayer, 'giveNum': giveNum };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.WALLET_ROOMCARD_GIVE, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.showTip('赠送成功');
                    dd.ui_manager.isShowPopup = true;
                    _this.node.removeFromParent(true);
                    _this.node.destroy();
                }
                else if (flag === -1) {
                }
                else {
                    _this.showGiftLayer(0);
                    dd.ui_manager.showTip(content);
                }
                dd.ui_manager.hideLoading();
                cc.log(content);
            });
        }
    };
    /**
     * 获取玩家信息
     *
     * @param {string} starNO
     * @memberof Gift
     */
    Gift.prototype.sendGetRoleInfo = function (starNO, giftNum) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            dd.mp_manager.playAlert();
            var obj = { 'starNO': starNO };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_ROLE_STARNO, msg, function (flag, content) {
                if (flag === 0) {
                    var roleInfo = content;
                    _this.showRoleInfo(roleInfo, giftNum);
                    _this.showGiftLayer(1);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showTip(content, 0.5, 1, 0.5);
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
     * 显示玩家信息
     *
     * @param {UserData} data
     * @memberof Gift
     */
    Gift.prototype.showRoleInfo = function (data, giftNum) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lblName.string = data.nick;
                        this.lblID.string = data.starNO;
                        this.lblGiftNum.string = giftNum;
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.headImg.spriteFrame = headSF;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示赠送界面 0=输入界面 1=确定赠送界面
     *
     * @param {number} [type=0]
     * @memberof Gift
     */
    Gift.prototype.showGiftLayer = function (type) {
        if (type === void 0) { type = 0; }
        this.node_board1.active = type === 0 ? true : false;
        this.node_board2.active = type === 1 ? true : false;
        if (type === 0) {
            this.sendGetRecordList();
        }
    };
    /**
     * 显示赠送列表
     *
     * @param {WalletGiveInner[]} data
     * @memberof Gift
     */
    Gift.prototype.showRecordList = function (data) {
        if (!data)
            data = [];
        this.svNode.content.removeAllChildren();
        for (var i = 0; i < data.length; i++) {
            var gift_item = cc.instantiate(this.gift_item_prefab);
            var gift_item_script = gift_item.getComponent('Gift_Item');
            gift_item_script.updateItem(i, data[i]);
            gift_item.parent = this.svNode.content;
        }
    };
    /**
     * 赠送按钮
     *
     * @memberof Gift
     */
    Gift.prototype.click_btn_give = function () {
        var idStr = this.edit_id.string.trim();
        if (idStr === '') {
            dd.ui_manager.showTip('ID不能为空');
            return;
        }
        var numStr = this.edit_giftNum.string.trim();
        if (numStr === '') {
            dd.ui_manager.showTip('请输入赠送数量');
            return;
        }
        if (Number(numStr) === 0) {
            dd.ui_manager.showTip('赠送数量不能为0');
            return;
        }
        this.sendGetRoleInfo(idStr, numStr);
    };
    /**
     * 确定赠送
     *
     * @memberof Gift
     */
    Gift.prototype.click_btn_sure = function () {
        this.sendGiveGift(this.lblID.string, this.lblGiftNum.string);
    };
    /**
     * 取消赠送
     *
     * @memberof Gift
     */
    Gift.prototype.click_btn_cancel = function () {
        this.showGiftLayer(0);
    };
    /**
     * 退出
     *
     * @memberof Gift
     */
    Gift.prototype.click_btn_out = function () {
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Gift.prototype, "node_board1", void 0);
    __decorate([
        property(cc.Node)
    ], Gift.prototype, "node_board2", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Gift.prototype, "svNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], Gift.prototype, "gift_item_prefab", void 0);
    __decorate([
        property(cc.EditBox)
    ], Gift.prototype, "edit_giftNum", void 0);
    __decorate([
        property(cc.EditBox)
    ], Gift.prototype, "edit_id", void 0);
    __decorate([
        property(cc.Sprite)
    ], Gift.prototype, "headImg", void 0);
    __decorate([
        property(cc.Label)
    ], Gift.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Gift.prototype, "lblID", void 0);
    __decorate([
        property(cc.Label)
    ], Gift.prototype, "lblGiftNum", void 0);
    Gift = __decorate([
        ccclass
    ], Gift);
    return Gift;
}(cc.Component));
exports.default = Gift;

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
        //# sourceMappingURL=Gift.js.map
        