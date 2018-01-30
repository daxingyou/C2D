"use strict";
cc._RF.push(module, '65705Qvlo1FOoy61cTG3GjP', 'Career');
// Script/SceneScript/Home/Career.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Career = /** @class */ (function (_super) {
    __extends(Career, _super);
    function Career() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 进度条数组
         *
         * @type {cc.Sprite[]}
         * @memberof Career
         */
        _this.proList = [];
        /**
         * 指针数组
         *
         * @type {cc.Node[]}
         * @memberof Career
         */
        _this.pointList = [];
        /**
         * 百分比数组
         *
         * @type {cc.Label[]}
         * @memberof Career
         */
        _this.perList = [];
        /**
         * 战绩统计
         *
         * @type {cc.Node}
         * @memberof Career
         */
        _this.layer1 = null;
        /**
         * 历史记录
         *
         * @type {cc.Node}
         * @memberof Career
         */
        _this.layer2 = null;
        /**
         * 房间明细界面
         * @type {cc.Node}
         * @memberof Career
         */
        _this.detailLayer = null;
        /**
         * 房间明细的列表
         * @type {cc.Node}
         * @memberof Career
         */
        _this.svNode_detail = null;
        /**
         * 生涯数据
         *
         * @type {CareerData}
         * @memberof Career
         */
        _this.data = null;
        return _this;
    }
    Career.prototype.init = function (data) {
        this.data = data;
    };
    Career.prototype.onLoad = function () {
        var _this = this;
        this.layer1.active = true;
        this.layer2.active = false;
        this.detailLayer.active = false;
        var nums = [
            Number(this.data.winRate),
            Number(this.data.seatDown),
            Number(this.data.showCard),
            Number(this.data.addChip),
            Number(this.data.dropCards),
            Number(this.data.fullBet)
        ];
        nums.forEach(function (num, index) {
            _this.proList[index].fillRange = -(num / 2);
            _this.pointList[index].rotation = -74 + num * 148;
            _this.perList[index].string = Math.round(num * 100) + '%';
        }, this);
        dd.ui_manager.hideLoading();
    };
    /**
     * 点击退出
     *
     * @memberof Career
     */
    Career.prototype.click_out = function () {
        dd.mp_manager.playButton();
        this.node.destroy();
    };
    /**
     * 点击下方按钮切换展示界面
     *
     * @param {cc.Event.EventCustom} event
     * @param {*} [data]
     * @memberof Career
     */
    Career.prototype.click_toggle = function (event, data) {
        var _this = this;
        dd.mp_manager.playButton();
        if (Number(data) === 1) {
            var sv = this.layer2.getComponent(cc.ScrollView);
            sv.scrollToTop();
            sv.content.destroyAllChildren();
            this.layer2.active = false;
            this.layer1.active = true;
            this.detailLayer.active = false;
        }
        else {
            this.layer1.active = false;
            this.layer2.active = true;
            this.detailLayer.active = false;
            if (this.data.historyList && this.data.historyList.length > 0) {
                this.layer2.getComponent('SVScript').init(this.data.historyList, function (data) {
                    _this.getRoomDetailInfo(data.recordId);
                });
            }
            else {
                dd.ui_manager.showTip('您当前没有历史记录!');
            }
        }
    };
    /**
     * 获取房间明细
     * @param {string} recordId
     * @memberof Career
     */
    Career.prototype.getRoomDetailInfo = function (recordId) {
        var _this = this;
        var obj = {
            recordId: recordId,
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_ALL_WIN_SCORE_INFO, msg, function (flag, content) {
            if (flag === 0) {
                var data = content;
                if (data.items && data.items.length > 0) {
                    _this.detailLayer.active = true;
                    var detailList_1 = [];
                    data.items.forEach(function (item, index) {
                        var obj = {
                            index: index,
                            item: item
                        };
                        detailList_1.push(obj);
                    }, _this);
                    _this.svNode_detail.getComponent(cc.ScrollView).content.removeAllChildren();
                    _this.svNode_detail.getComponent('SVScript').init(detailList_1);
                }
            }
            else if (flag === -1) {
                dd.ui_manager.showTip('获取房间明细消息发送超时');
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 退出房间明细
     * @memberof Career
     */
    Career.prototype.click_btn_outDetail = function () {
        dd.mp_manager.playButton();
        this.detailLayer.active = false;
    };
    __decorate([
        property([cc.Sprite])
    ], Career.prototype, "proList", void 0);
    __decorate([
        property([cc.Node])
    ], Career.prototype, "pointList", void 0);
    __decorate([
        property([cc.Label])
    ], Career.prototype, "perList", void 0);
    __decorate([
        property(cc.Node)
    ], Career.prototype, "layer1", void 0);
    __decorate([
        property(cc.Node)
    ], Career.prototype, "layer2", void 0);
    __decorate([
        property(cc.Node)
    ], Career.prototype, "detailLayer", void 0);
    __decorate([
        property(cc.Node)
    ], Career.prototype, "svNode_detail", void 0);
    Career = __decorate([
        ccclass
    ], Career);
    return Career;
}(cc.Component));
exports.default = Career;

cc._RF.pop();