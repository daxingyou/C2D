"use strict";
cc._RF.push(module, '42ef93CXq5H+r5M9ptyDEsm', 'Mine');
// Script/SceneScript/Home/Mine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Mine = /** @class */ (function (_super) {
    __extends(Mine, _super);
    function Mine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 滚动节点
         *
         * @type {cc.Node}
         * @memberof Mine
         */
        _this.svNode = null;
        /**
         * 我的牌局对象数据集
         *
         * @type {JoinedTableItem[]}
         * @memberof Mine
         */
        _this.dataList = [];
        return _this;
    }
    Mine.prototype.init = function (datas) {
        this.dataList = datas;
    };
    Mine.prototype.onLoad = function () {
        if (this.dataList && this.dataList.length > 0) {
            this.svNode.getComponent('SVScript').init(this.dataList, function (data) {
                dd.ui_manager.showLoading('正在进入房间');
                dd.mp_manager.playButton();
                var obj = { tableId: data.tableId };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_JOIN, msg, function (flag, content) {
                    if (flag === 0) {
                        dd.gm_manager.setTableData(content, 1);
                        cc.director.loadScene('GameScene', function () {
                            dd.ui_manager.showTip('加入房间成功');
                        });
                    }
                    else if (flag === -1) {
                        dd.ui_manager.showTip('加入房间消息发送超时');
                    }
                    else {
                        dd.ui_manager.showTip(content);
                    }
                });
            });
            dd.ui_manager.hideLoading();
        }
        else {
            dd.ui_manager.showTip('当前没有您可以继续的牌局!');
        }
    };
    /**
     * 点击关闭按钮
     *
     * @memberof Mine
     */
    Mine.prototype.click_out = function () {
        dd.mp_manager.playButton();
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Mine.prototype, "svNode", void 0);
    Mine = __decorate([
        ccclass
    ], Mine);
    return Mine;
}(cc.Component));
exports.default = Mine;

cc._RF.pop();