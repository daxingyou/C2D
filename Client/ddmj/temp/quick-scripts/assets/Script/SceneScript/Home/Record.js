(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Record.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0af274h12FMV7tBpHQOlGaA', 'Record', __filename);
// Script/SceneScript/Home/Record.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 没有任何记录
         *
         * @type {cc.Node}
         * @memberof Record
         */
        _this.lblNoRecord = null;
        /**
         *
         * 战绩界面
         * @type {cc.Node}
         * @memberof Record
         */
        _this.node_record = null;
        /**
         *
         * 详细战绩界面
         * @type {cc.Node}
         * @memberof Record
         */
        _this.node_record_detail = null;
        /**
         * 桌子id
         *
         * @type {cc.Label}
         * @memberof Record
         */
        _this.lblRoomId = null;
        /**
         * 玩家列表
         *
         * @type {cc.Label[]}
         * @memberof Record
         */
        _this.lblNameList = [];
        /**
         * 俱乐部战绩列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_record = null;
        /**
         * 俱乐部战绩详细列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_record_detail = null;
        /**
         * 俱乐部记录预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.club_record_item_prefab = null;
        /**
         * 俱乐部详细记录预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.record_detail_item_prefab = null;
        return _this;
    }
    Record.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        dd.ui_manager.hideLoading();
        this.lblNoRecord.active = true;
        this.sendGetRecord();
    };
    /**
     *查询战绩列表
     *
     * @memberof Room_Join_Club
     */
    Record.prototype.sendGetRecord = function () {
        var _this = this;
        this.node_record.active = true;
        this.node_record_detail.active = false;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'type': 1, 'query': dd.ud_manager.mineData.accountId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_QUERY_RECORD, msg, function (flag, content) {
                if (flag === 0) {
                    _this.showRecordInfo(content);
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
     *查询详细战绩数据
     *
     * @memberof Room_Join_Club
     */
    Record.prototype.sendGetRecordDetailed = function (tableId) {
        var _this = this;
        this.node_record.active = false;
        this.node_record_detail.active = true;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'tableId': tableId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_QUERY_DETAILED_RECORD, msg, function (flag, content) {
                if (flag === 0) {
                    _this.showRecordDetailed(content);
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
    *  显示战绩记录信息
    *
    * @memberof Club
    */
    Record.prototype.showRecordInfo = function (Records) {
        var _this = this;
        this.svNode_record.content.removeAllChildren();
        if (!Records)
            return;
        if (Records.items) {
            this.lblNoRecord.active = false;
            for (var i = 0; i < Records.items.length; i++) {
                var club_record_item = cc.instantiate(this.club_record_item_prefab);
                var record_script = club_record_item.getComponent('Club_Record_Item');
                record_script.updateItem(i + 1, Records.items[i], '0', function (recordData) {
                    _this.sendGetRecordDetailed(recordData.tableId);
                }, this);
                club_record_item.parent = this.svNode_record.content;
            }
        }
    };
    /**
     * 显示详细战绩数据
     *
     * @param {RecordDetailedVo} data
     * @memberof Record
     */
    Record.prototype.showRecordDetailed = function (data) {
        var _this = this;
        this.svNode_record_detail.content.removeAllChildren();
        if (!data)
            return;
        this.lblRoomId.string = '房间号:' + data.tableId;
        for (var i = 0; i < data.nicks.length; i++) {
            this.lblNameList[i].string = data.nicks[i];
        }
        if (data.items) {
            for (var i = 0; i < data.items.length; i++) {
                var record_detail_item = cc.instantiate(this.record_detail_item_prefab);
                var record_detail_script = record_detail_item.getComponent('Record_Detail');
                record_detail_script.updateItem(data.items[i], function (recordData) {
                    _this.sendGetVedio(recordData.recordFile);
                }, this);
                record_detail_item.parent = this.svNode_record_detail.content;
            }
        }
    };
    /**
     * 退出
     *
     * @memberof Record
     */
    Record.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        if (this.node_record.active) {
            dd.ui_manager.isShowPopup = true;
            this.node.removeFromParent(true);
            this.node.destroy();
        }
        if (this.node_record_detail.active) {
            this.sendGetRecord();
        }
    };
    /**
     * 战绩录像数据获取接口
     *
     * @param {string} filName
     * @memberof Record
     */
    Record.prototype.sendGetVedio = function (filName) {
        if (dd.ui_manager.showLoading()) {
            var url = dd.config.replayUrl + filName;
            cc.log(url);
            fetch(url, {}).then(function (response) {
                if (response.ok) {
                    response.json().then(function (json) {
                        cc.log(JSON.stringify(json).length);
                        dd.gm_manager.replayMJ = 1;
                        dd.gm_manager.replayDataList = json.datas;
                        dd.gm_manager.mjGameData = dd.gm_manager.replayDataList[0].frameData;
                        cc.director.loadScene('MJScene');
                    });
                }
                else {
                    dd.ui_manager.showTip('获取录像失败');
                    dd.ui_manager.hideLoading();
                }
            }).catch(function (errMsg) {
                cc.log(errMsg);
                dd.ui_manager.showAlert('服务器响应失败，请确认您的网络通畅后，重试！', '温馨提示');
                dd.ui_manager.hideLoading();
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], Record.prototype, "lblNoRecord", void 0);
    __decorate([
        property(cc.Node)
    ], Record.prototype, "node_record", void 0);
    __decorate([
        property(cc.Node)
    ], Record.prototype, "node_record_detail", void 0);
    __decorate([
        property(cc.Label)
    ], Record.prototype, "lblRoomId", void 0);
    __decorate([
        property([cc.Label])
    ], Record.prototype, "lblNameList", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Record.prototype, "svNode_record", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Record.prototype, "svNode_record_detail", void 0);
    __decorate([
        property(cc.Prefab)
    ], Record.prototype, "club_record_item_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Record.prototype, "record_detail_item_prefab", void 0);
    Record = __decorate([
        ccclass
    ], Record);
    return Record;
}(cc.Component));
exports.default = Record;

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
        //# sourceMappingURL=Record.js.map
        