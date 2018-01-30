"use strict";
cc._RF.push(module, 'a6d56Q7wY9FiLDwBfzPm7yx', 'Game_Chat');
// Script/SceneScript/Game/Game_Chat.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_Chat = /** @class */ (function (_super) {
    __extends(Game_Chat, _super);
    function Game_Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chat_info = null;
        /**
         * 聊天的文字列表容器
         *
         * @type {cc.ScrollView}
         * @memberof Game_Chat
         */
        _this.svNode = null;
        /**
         * 聊天表情的列表容器
         *
         * @type {cc.ScrollView}
         * @memberof Game_Chat
         */
        _this.bqNode = null;
        _this.toggle_chat = null;
        _this.toggle_bq = null;
        /**
         * 表情节点列表
         *
         * @type {cc.Node[]}
         * @memberof Game_Chat
         */
        _this._bqList = [];
        /**
         * canvas脚本
         *
         * @memberof Game_Chat
         */
        _this._canvasTarget = null;
        _this.click_quickInfo = function (event) {
            ModuleManager_1.mp_manager.playButton();
            var chatNode = event.currentTarget;
            cc.log(chatNode.tag);
            _this._canvasTarget.sendChatInfo(0, chatNode.tag);
            _this.exitChat();
        };
        return _this;
    }
    Game_Chat.prototype.onLoad = function () {
        var _this = this;
        this._canvasTarget = ModuleManager_1.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on("touchend", function (event) {
            _this.exitChat();
            event.stopPropagation();
        }, this);
        this.initData();
        this.showChatLayer(0);
        this.bindEvent();
    };
    /**
     * 退出聊天
     *
     * @memberof Game_Chat
     */
    Game_Chat.prototype.exitChat = function () {
        this.node.active = false;
    };
    Game_Chat.prototype.initData = function () {
        var quickList = ModuleManager_1.mp_manager.quicklyList;
        for (var i = 0; i < quickList.length; i++) {
            var quickInfo = quickList[i];
            if (i === 0) {
                this.chat_info.tag = quickInfo.id;
                this.chat_info.getComponent(cc.Label).string = quickInfo.msg;
                this.chat_info.on(cc.Node.EventType.TOUCH_END, this.click_quickInfo, this);
            }
            else {
                var chatNode = cc.instantiate(this.chat_info);
                chatNode.tag = quickInfo.id;
                chatNode.getComponent(cc.Label).string = quickInfo.msg;
                chatNode.parent = this.svNode.content;
                chatNode.on(cc.Node.EventType.TOUCH_END, this.click_quickInfo, this);
            }
        }
    };
    /**
     * 绑定事件
     *
     * @memberof Game_Chat
     */
    Game_Chat.prototype.bindEvent = function () {
        var _this = this;
        var childLen = this.bqNode.content.childrenCount;
        var _loop_1 = function () {
            var bqName = 'biaoqing_' + (i + 1);
            var bqNode = cc.find(bqName, this_1.bqNode.content);
            bqNode.tag = i;
            if (bqNode) {
                bqNode.on(cc.Node.EventType.TOUCH_END, function () {
                    _this._canvasTarget.sendChatInfo(1, bqNode.tag);
                    _this.exitChat();
                }, this_1);
            }
        };
        var this_1 = this;
        for (var i = 0; i < childLen; i++) {
            _loop_1();
        }
    };
    /**
     * 显示聊天界面
     *
     * @param {number} type
     * @memberof Game_Chat
     */
    Game_Chat.prototype.showChatLayer = function (type) {
        this.svNode.node.active = type === 0 ? true : false;
        this.bqNode.node.active = type === 0 ? false : true;
        this.toggle_chat.isChecked = type === 0 ? true : false;
        this.toggle_bq.isChecked = type === 0 ? false : true;
    };
    /**
     * 复选框的点击事件
     *
     * @param {any} event
     * @param {string} type 0=聊天 1=表情
     * @memberof Game_Chat
     */
    Game_Chat.prototype.click_btn_chat = function (event, type) {
        ModuleManager_1.mp_manager.playButton();
        this.svNode.node.active = type === '0' ? true : false;
        this.bqNode.node.active = type === '0' ? false : true;
    };
    __decorate([
        property(cc.Node)
    ], Game_Chat.prototype, "chat_info", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Game_Chat.prototype, "svNode", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Game_Chat.prototype, "bqNode", void 0);
    __decorate([
        property(cc.Toggle)
    ], Game_Chat.prototype, "toggle_chat", void 0);
    __decorate([
        property(cc.Toggle)
    ], Game_Chat.prototype, "toggle_bq", void 0);
    Game_Chat = __decorate([
        ccclass
    ], Game_Chat);
    return Game_Chat;
}(cc.Component));
exports.default = Game_Chat;

cc._RF.pop();