(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Room/Room_Create.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7382cj/x/REkYhGQk5LjZd2', 'Room_Create', __filename);
// Script/SceneScript/Room/Room_Create.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Room_Create = /** @class */ (function (_super) {
    __extends(Room_Create, _super);
    function Room_Create() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 创建房间的配置父节点
        *
        * @type {cc.Node}
        * @memberof Room_Create
        */
        _this.node_config = null;
        /**
         * 游戏列表的父节点
         *
         * @type {cc.Node}
         * @memberof Room_Create
         */
        _this.node_game = null;
        /**
         * 创建房间游戏列表的item预设
         *
         * @type {cc.Prefab}
         * @memberof Room_Create
         */
        _this.room_item_game_prefab = null;
        /**
         * 创建房间配置参数的item预设
         *
         * @type {cc.Prefab}
         * @memberof Room_Create
         */
        _this.room_item_cf_prefab = null;
        /**
         * 创建房间配置参数的复选框的集合item预设
         *
         * @type {cc.Prefab}
         * @memberof Room_Create
         */
        _this.room_item_toggleGroup_prefab = null;
        /**
         * 创建房间配置参数的单个复选框的item预设
         *
         * @type {cc.Prefab}
         * @memberof Room_Create
         */
        _this.room_item_toggle_prefab = null;
        /**
         * 创建房间配置参数的单个复选框的item预设
         *
         * @type {cc.Prefab}
         * @memberof Room_Create
         */
        _this.room_item_toggle_prefab2 = null;
        /**
         * 房间模式 0:俱乐部模式 1:普通模式
         *
         * @type {string}
         * @memberof Room_Create
         */
        _this._roomMode = '0';
        /**
         * 房间游戏类型 0:血战到底 1:三人血战
         *
         * @type {string}
         * @memberof Room_Create
         */
        _this._roomGame = '0';
        /**
         * 配置参数的复选框列表
         *
         * @type {cc.Toggle[]}
         * @memberof Room_Create
         */
        _this._toggleList = [];
        /**
         * 游戏配置数据列表
         *
         * @type {RuleCfgVo[]}
         * @memberof Room_Create
         */
        _this._ruleCfgVo = [];
        /**
         *  游戏规则配置
         *
         * @type {SendRuleCfg}
         * @memberof Room_Create
         */
        _this._sendRuleCfg = {
            corpsId: '0',
            roomItemId: 0,
            rules: [],
        };
        return _this;
    }
    Room_Create.prototype.onLoad = function () {
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
        this.node_config.removeAllChildren();
    };
    /**
     * 显示创建房间的模式 0=普通 1俱乐部
     *
     * @param {number} type 0=普通 1俱乐部
     * @memberof Room_Create
     */
    /**
     * 显示创建房间的模式 如果corpsId不为0，就是俱乐部房间
     * @param {string} [corpsId='0']  俱乐部id
     * @memberof Room_Create
     */
    Room_Create.prototype.showCreateMode = function (corpsId) {
        if (corpsId === void 0) { corpsId = '0'; }
        this._sendRuleCfg.corpsId = corpsId;
        //获取游戏房间的配置
        this.getRoomConfig();
    };
    /**
     * 获取房间配置
     *
     * @memberof Room_Create
     */
    Room_Create.prototype.getRoomConfig = function () {
        var _this = this;
        if (dd.ui_manager.showLoading('正在获取配置，请稍后')) {
            var obj = {};
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_GET_RULECFG, '', function (flag, content) {
                if (flag === 0) {
                    _this._ruleCfgVo = content;
                    _this.showConfigInfo();
                }
                else if (flag === -1) {
                }
                else {
                    cc.log(content);
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
     * 发送消息创建房间
     *
     * @param {SendRuleCfg} obj 创建房间对象
     * @memberof Room_Create
     */
    Room_Create.prototype.sendCreatRoom = function (obj) {
        if (dd.ui_manager.showLoading()) {
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_CREATE, msg, function (flag, content) {
                if (flag === 0) {
                    dd.gm_manager.mjGameData = content;
                    dd.gm_manager.replayMJ = 0;
                    dd.gm_manager.isReplayPause = false;
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
     * 房间模式选择
     *
     * @param {cc.Toggle} event
     * @param {string} type 0=普通 1=俱乐部
     * @memberof Room_Create
     */
    Room_Create.prototype.click_toggle_mode = function (event, type) {
        dd.mp_manager.playButton();
        this._roomMode = type;
    };
    /**
     * 房间游戏类型选择
     *
     * @param {cc.Toggle} event
     * @param {string} type
     * @memberof Room_Create
     */
    Room_Create.prototype.click_toggle_game = function (event, type) {
        dd.mp_manager.playButton();
        this._roomGame = type;
    };
    /**
     * 显示房间配置信息
     *
     * @memberof Room_Create
     */
    Room_Create.prototype.showConfigInfo = function () {
        // this.node_game.removeAllChildren();
        // this.node_game.opacity = 0;
        var _this = this;
        // for (var i = 0; i < this._ruleCfgVo.length; i++) {
        //     this.create_game_item(this._ruleCfgVo[i]);
        // }
        //创建第一个游戏的配置信息显示
        this._sendRuleCfg.roomItemId = this._ruleCfgVo[0].itemId;
        this.showGameRuleInfo(this._ruleCfgVo[0]);
        //这里做一个延时的刷新，不然会闪一下
        setTimeout(function () {
            // this.node_game.opacity = 255;
            _this.node_config.opacity = 255;
        }, 100);
    };
    /**
     * 显示游戏的配置信息
     *
     * @param {RuleCfgVo} data
     * @memberof Room_Create
     */
    Room_Create.prototype.showGameRuleInfo = function (data) {
        var _this = this;
        this.node_config.opacity = 0;
        this.node_config.removeAllChildren();
        this._toggleList.length = 0;
        for (var i = 0; i < data.ruleContents.length; i++) {
            this.create_rule_item(data.ruleContents[i]);
        }
        this.createTipNode(this.node_config);
        //这里做一个延时的刷新，不然会闪一下
        setTimeout(function () {
            _this.node_config.opacity = 255;
        }, 100);
    };
    /**
     * 创建提示节点
     *
     * @memberof Room_Create
     */
    Room_Create.prototype.createTipNode = function (parentNode, tipStr) {
        if (tipStr === void 0) { tipStr = '注：房卡在游戏开始时扣除'; }
        var tipNode = new cc.Node('tip');
        tipNode.height = 30;
        tipNode.color = new cc.Color(200, 200, 200);
        tipNode.parent = parentNode;
        var lbl = tipNode.addComponent(cc.Label);
        lbl.fontSize = 30;
        lbl.lineHeight = 30;
        lbl.string = tipStr;
        var widget = tipNode.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.left = 80;
    };
    /**
     * 创建游戏列表
     *
     * @param {RuleCfgVo} data
     * @memberof Room_Create
     */
    Room_Create.prototype.create_game_item = function (data) {
        var _this = this;
        var room_item_game = cc.instantiate(this.room_item_game_prefab);
        // let lblGameName = cc.find('lblGameName', room_item_game).getComponent(cc.Label);
        // lblGameName.string = data.itemName;
        var toggle_addLable = room_item_game.getComponent('Toggle_AddLabel');
        toggle_addLable.updateItem(data.itemName);
        var toggle = room_item_game.getComponent(cc.Toggle);
        //如果存在多个游戏，需要单选并且要添加点击事件进行切换游戏
        if (this._ruleCfgVo.length > 1) {
            toggle.interactable = true;
            toggle.toggleGroup = this.node_game.getComponent(cc.ToggleGroup);
            room_item_game.on('touchend', function () {
                cc.log(data.itemId);
                dd.mp_manager.playButton();
                _this._sendRuleCfg.roomItemId = data.itemId;
                var rule = _this.getGameRule(data.itemId);
                _this.showGameRuleInfo(rule);
            }, this);
        }
        else {
            toggle.interactable = false;
        }
        room_item_game.parent = this.node_game;
    };
    /**
     * 获取游戏配置
     *
     * @param {number} ruleId 游戏id
     * @returns {RuleCfgVo}
     * @memberof Room_Create
     */
    Room_Create.prototype.getGameRule = function (ruleId) {
        var rule = null;
        for (var i = 0; i < this._ruleCfgVo.length; i++) {
            if (this._ruleCfgVo[i].itemId === ruleId) {
                rule = this._ruleCfgVo[i];
                break;
            }
        }
        return rule;
    };
    ;
    /**
     * 创建配置参数的item
     *
     * @param {RuleContent} data
     * @memberof Room_Create
     */
    Room_Create.prototype.create_rule_item = function (data) {
        var room_item_cf = cc.instantiate(this.room_item_cf_prefab);
        room_item_cf.parent = this.node_config;
        var lblcfName = cc.find('lblCFName', room_item_cf).getComponent(cc.Label);
        lblcfName.string = data.ruleName;
        var ruleScript = room_item_cf.getComponent('Room_Create_Rule');
        ruleScript.updateItem(data.ruleName);
        var cf_layout = ruleScript.node_layout;
        for (var i = 0; i < data.ruleContentItems.length; i++) {
            var room_tg = this.create_item_toggleGroup(cf_layout);
            var ruleContentItem = data.ruleContentItems[i];
            this.create_item_toggle(data.ruleContentItems[i], room_tg);
        }
    };
    /**
     * 创建复选框集合的item
     *
     * @param {cc.Node} parentNode
     * @returns {cc.Node}
     * @memberof Room_Create
     */
    Room_Create.prototype.create_item_toggleGroup = function (parentNode) {
        var room_item_toggleGroup = cc.instantiate(this.room_item_toggleGroup_prefab);
        room_item_toggleGroup.parent = parentNode;
        return room_item_toggleGroup;
    };
    /**
     * 创建复选框的item
     *
     * @param {RuleContentItem} data 选项数据
     * @param {cc.Node} parentNode 父节点
     * @memberof Room_Create
     */
    Room_Create.prototype.create_item_toggle = function (data, parentNode) {
        for (var i = 0; i < data.ruleContentItemAttribs.length; i++) {
            var rci = data.ruleContentItemAttribs[i];
            var room_item_toggle = null;
            if (data.ridio === 1) {
                room_item_toggle = cc.instantiate(this.room_item_toggle_prefab2);
            }
            else {
                room_item_toggle = cc.instantiate(this.room_item_toggle_prefab);
            }
            var toggle = room_item_toggle.getComponent(cc.Toggle);
            if (data.ridio === 1) {
                toggle.toggleGroup = null;
            }
            else {
                toggle.toggleGroup = parentNode.getComponent(cc.ToggleGroup);
            }
            toggle.isChecked = rci.state === 0 ? false : true;
            var ruleToggle = {
                toggle: toggle,
                ruleContentItemAttrib: data.ruleContentItemAttribs[i]
            };
            this._toggleList.push(ruleToggle);
            room_item_toggle.parent = parentNode;
            var toggle_addLable = room_item_toggle.getComponent('Toggle_AddLabel');
            toggle_addLable.updateItem(data.ruleContentItemAttribs[i].ruleName);
        }
    };
    /**
     * 创建房间的按钮
     *
     * @memberof Room_Create
     */
    Room_Create.prototype.click_btn_create = function () {
        dd.mp_manager.playButton();
        this._sendRuleCfg.rules.length = 0;
        for (var i = 0; i < this._toggleList.length; i++) {
            if (this._toggleList[i].toggle.isChecked === true) {
                this._sendRuleCfg.rules.push(this._toggleList[i].ruleContentItemAttrib.ruleId);
            }
        }
        cc.log(this._sendRuleCfg);
        this.sendCreatRoom(this._sendRuleCfg);
    };
    /**
     * 创建俱乐部
     *
     * @memberof Room_Join_Club
     */
    Room_Create.prototype.click_btn_create_club = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading()) {
            // let obj = { 'tableId': 123456 };
            // let msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_CREATE, '', function (flag, content) {
                if (flag === 0) {
                    cc.director.loadScene('ClubScene');
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 加入俱乐部
     *
     * @memberof Room_Join_Club
     */
    Room_Create.prototype.click_btn_create_join = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.showAlert('请找所在微信群的群主申请加入俱乐部', '加入俱乐部');
    };
    /**
     * 退出
     *
     * @memberof Room_Create
     */
    Room_Create.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Room_Create.prototype, "node_config", void 0);
    __decorate([
        property(cc.Node)
    ], Room_Create.prototype, "node_game", void 0);
    __decorate([
        property(cc.Prefab)
    ], Room_Create.prototype, "room_item_game_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Room_Create.prototype, "room_item_cf_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Room_Create.prototype, "room_item_toggleGroup_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Room_Create.prototype, "room_item_toggle_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Room_Create.prototype, "room_item_toggle_prefab2", void 0);
    Room_Create = __decorate([
        ccclass
    ], Room_Create);
    return Room_Create;
}(cc.Component));
exports.default = Room_Create;

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
        //# sourceMappingURL=Room_Create.js.map
        