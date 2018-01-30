"use strict";
cc._RF.push(module, '7f0faPnyzRIkZKF3vOVP7Iq', 'HomeCanvas');
// Script/SceneScript/Home/HomeCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var HomeCanvas = /** @class */ (function (_super) {
    __extends(HomeCanvas, _super);
    function HomeCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof HomeCanvas
         */
        _this.spr_head = null;
        /**
         * 用户昵称
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lab_name = null;
        /**
         * 玩家id
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lab_id = null;
        /**
         * 设置界面
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.pre_setting = null;
        /**
         * 创建界面
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
        */
        _this.pre_create = null;
        /**
         * 加入房间
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.pre_join = null;
        /**
         * 我的牌局
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.pre_mine = null;
        /**
         * 公告
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.pre_notice = null;
        /**
         * 生涯
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.pre_career = null;
        return _this;
    }
    HomeCanvas.prototype.onLoad = function () {
        cc.log(dd.ud_manager.account_mine);
    };
    HomeCanvas.prototype.update = function (dt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(dd.ud_manager && dd.ud_manager.account_mine)) return [3 /*break*/, 4];
                        if (!dd.ud_manager.account_mine.roleAttribVo) return [3 /*break*/, 4];
                        this.lab_name.string = dd.utils.getStringBySize(dd.ud_manager.account_mine.roleAttribVo.nick, 12);
                        this.lab_id.string = dd.ud_manager.account_mine.roleAttribVo.starNO;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this.spr_head;
                        return [4 /*yield*/, dd.img_manager.loadURLImage(dd.ud_manager.account_mine.roleAttribVo.headImg)];
                    case 2:
                        _a.spriteFrame = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击设置按钮
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_setting = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var setNode = cc.instantiate(this.pre_setting);
        setNode.parent = dd.ui_manager.getRootNode();
    };
    /**
     * 点击公告按钮
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_notice = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var noticeNode = cc.instantiate(this.pre_notice);
        dd.ws_manager.sendMsg(dd.protocol.ACTIVITY_GET_ACTIVITY_LIST, '', function (flag, content) {
            if (flag === 0) {
                var datas = content.items;
                noticeNode.getComponent('Notice').init(datas);
                noticeNode.parent = dd.ui_manager.getRootNode();
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间配置消息发送超时');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 点击生涯按钮
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_career = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var careerNode = cc.instantiate(this.pre_career);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_CAREE_INFO, '', function (flag, content) {
            if (flag === 0) {
                var data = content;
                careerNode.getComponent('Career').init(data);
                careerNode.parent = dd.ui_manager.getRootNode();
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间配置消息发送超时');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 点击商店按钮
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_store = function () {
    };
    /**
     * 点击创建房间
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_create = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var createNode = cc.instantiate(this.pre_create);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_CFG, '', function (flag, content) {
            if (flag === 0) {
                var cfg = content;
                createNode.getComponent('Create').init(cfg);
                createNode.parent = dd.ui_manager.getRootNode();
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间配置消息发送超时');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 点击加入房间
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_join = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var joinNode = cc.instantiate(this.pre_join);
        joinNode.parent = dd.ui_manager.getRootNode();
    };
    /**
     * 点击我的房间
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_mine = function () {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var mineNode = cc.instantiate(this.pre_mine);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_GET_FIGHTED_TABLE_LIST, '', function (flag, content) {
            if (flag === 0) {
                var datas = content.items;
                mineNode.getComponent('Mine').init(datas);
                mineNode.parent = dd.ui_manager.getRootNode();
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取我的牌局消息发送超时');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    __decorate([
        property(cc.Sprite)
    ], HomeCanvas.prototype, "spr_head", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lab_name", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lab_id", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_setting", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_create", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_join", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_mine", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_notice", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "pre_career", void 0);
    HomeCanvas = __decorate([
        ccclass
    ], HomeCanvas);
    return HomeCanvas;
}(cc.Component));
exports.default = HomeCanvas;

cc._RF.pop();