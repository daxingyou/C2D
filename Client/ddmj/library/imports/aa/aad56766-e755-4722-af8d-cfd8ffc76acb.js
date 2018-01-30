"use strict";
cc._RF.push(module, 'aad56dm51VHIq+Nz9j/x2rL', 'Room_Join_Normal');
// Script/SceneScript/Room/Room_Join_Normal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Room_Join_Normal = /** @class */ (function (_super) {
    __extends(Room_Join_Normal, _super);
    function Room_Join_Normal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 显示房间号Id的数字列表
         *
         * @type {cc.Label[]}
         * @memberof Room_Join_Normal
         */
        _this.lblInputList = [];
        /**
         * 当前输入的数字索引
         *
         * @type {number}
         * @memberof Room_Join_Normal
         */
        _this._curIndex = 0;
        return _this;
    }
    Room_Join_Normal.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        this.init();
        dd.ui_manager.hideLoading();
    };
    /**
     * 初始化数据
     *
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.init = function () {
        this._curIndex = 0;
        for (var i = 0; i < this.lblInputList.length; i++) {
            this.lblInputList[i].string = '';
        }
    };
    /**
     * 发送加入房间的数据
     *
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.sendJoinRoom = function () {
        var tableId = '';
        for (var i = 0; i < this.lblInputList.length; i++) {
            tableId += this.lblInputList[i].string;
        }
        if (dd.ui_manager.showLoading()) {
            var obj = { 'tableId': Number(tableId) };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_JOIN, msg, function (flag, content) {
                if (flag === 0) {
                    dd.gm_manager.mjGameData = content;
                    dd.gm_manager.replayMJ = 0;
                    cc.director.loadScene('MJScene');
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
                cc.log(content);
            });
        }
    };
    /**
     * 输入数字的点击事件
     *
     * @param {cc.Event.EventTouch} event
     * @param {string} num
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.click_btn_input = function (event, num) {
        dd.mp_manager.playButton();
        switch (num) {
            case '10'://重输
                this.init();
                break;
            case '11'://删除
                this.deleteLastInput();
                break;
            default:
                this.showInputNum(num);
                break;
        }
    };
    /**
     *删除上一个输入的数字
     *
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.deleteLastInput = function () {
        if (this._curIndex <= 0)
            return;
        this.lblInputList[this._curIndex - 1].string = '';
        if (this._curIndex > 0)
            this._curIndex--;
    };
    /**
     * 显示当前输入的数字
     *
     * @param {string} num
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.showInputNum = function (num) {
        if (this._curIndex < this.lblInputList.length) {
            this.lblInputList[this._curIndex].string = num;
            if (this._curIndex < this.lblInputList.length) {
                this._curIndex++;
                if (this._curIndex === this.lblInputList.length) {
                    cc.log('输入完毕');
                    this.sendJoinRoom();
                }
            }
        }
    };
    /**
     * 退出加入房间界面
     *
     * @memberof Room_Join_Normal
     */
    Room_Join_Normal.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property([cc.Label])
    ], Room_Join_Normal.prototype, "lblInputList", void 0);
    Room_Join_Normal = __decorate([
        ccclass
    ], Room_Join_Normal);
    return Room_Join_Normal;
}(cc.Component));
exports.default = Room_Join_Normal;

cc._RF.pop();