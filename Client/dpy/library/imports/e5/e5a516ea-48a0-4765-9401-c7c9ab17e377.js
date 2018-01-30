"use strict";
cc._RF.push(module, 'e5a51bqSKBHZZQBx8mrF+N3', 'Notice');
// Script/SceneScript/Home/Notice.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 存放公告的一级容器
         *
         * @type {cc.ScrollView}
         * @memberof Notice
         */
        _this.sv1 = null;
        /**
         * 公告展示的容器
         *
         * @type {cc.ScrollView}
         * @memberof Notice
         */
        _this.sv2 = null;
        /**
         * 公告数据集
         *
         * @type {ActivityItemAttrib[]}
         * @memberof Notice
         */
        _this.dataList = null;
        return _this;
    }
    Notice.prototype.init = function (datas) {
        this.dataList = datas;
    };
    Notice.prototype.onLoad = function () {
        var _this = this;
        this.sv1.node.active = true;
        this.sv2.node.active = false;
        if (this.dataList && this.dataList.length > 0) {
            this.dataList.forEach(function (data, index) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var sf1, node_out;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dd.img_manager.loadURLImage(data.currUrl)];
                        case 1:
                            sf1 = _a.sent();
                            node_out = new cc.Node();
                            node_out.tag = index;
                            node_out.addComponent(cc.Sprite).spriteFrame = sf1;
                            node_out.on(cc.Node.EventType.TOUCH_END, function (event) { return __awaiter(_this, void 0, void 0, function () {
                                var traget, item, sf2, node_in;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            dd.mp_manager.playButton();
                                            traget = event.getCurrentTarget();
                                            item = this.dataList[traget.tag];
                                            return [4 /*yield*/, dd.img_manager.loadURLImage(item.openUrl)];
                                        case 1:
                                            sf2 = _a.sent();
                                            node_in = new cc.Node();
                                            node_in.addComponent(cc.Sprite).spriteFrame = sf2;
                                            this.sv1.node.active = false;
                                            this.sv2.node.active = true;
                                            this.sv2.content.addChild(node_in);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, this);
                            this.sv1.content.addChild(node_out);
                            return [2 /*return*/];
                    }
                });
            }); }, this);
            dd.ui_manager.hideLoading();
        }
        else {
            dd.ui_manager.showTip('当前没有公告消息');
        }
    };
    /**
     * 点击关闭按钮
     *
     * @memberof Notice
     */
    Notice.prototype.click_out = function () {
        dd.mp_manager.playButton();
        if (this.sv2.node.active) {
            this.sv2.scrollToTop();
            this.sv2.content.removeAllChildren();
            this.sv2.node.active = false;
            this.sv1.node.active = true;
        }
        else {
            this.node.destroy();
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], Notice.prototype, "sv1", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Notice.prototype, "sv2", void 0);
    Notice = __decorate([
        ccclass
    ], Notice);
    return Notice;
}(cc.Component));
exports.default = Notice;

cc._RF.pop();