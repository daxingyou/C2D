"use strict";
cc._RF.push(module, '3c4bcf5i65OtI9ma7y7KOfB', 'Setting');
// Script/SceneScript/Home/Setting.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Help = require("./../Game/MJ_Help");
var Game_Setting = /** @class */ (function (_super) {
    __extends(Game_Setting, _super);
    function Game_Setting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 报牌音列表
         *
         * @type {cc.Toggle[]}
         * @memberof Game_Setting
         */
        _this.toggle_bp_list = [];
        /**
         * 注销游戏
         *
         * @type {cc.Node}
         * @memberof Game_Setting
         */
        _this.btn_logout = null;
        /**
         * 解散房间
         *
         * @type {cc.Node}
         * @memberof Game_Setting
         */
        _this.btn_disband = null;
        /**
         * 解散房间
         *
         * @type {cc.Node}
         * @memberof Game_Setting
         */
        _this.btn_return = null;
        _this.img_effect = null;
        _this.img_music = null;
        _this.on_off_list = [];
        /**
         * 显示类型
         *
         * @type {number} -1大厅 0聊天房 1普通房
         * @memberof Game_Setting
         */
        _this._showType = 0;
        return _this;
    }
    Game_Setting.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            dd.ui_manager.isShowPopup = true;
            if (_this._showType === -1) {
                _this.node.removeFromParent(true);
                _this.node.destroy();
            }
            else {
                _this.node.active = false;
            }
        }, this);
    };
    Game_Setting.prototype.update = function (dt) {
        if (dd.ud_manager && dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.tableBaseVo) {
            if (dd.gm_manager.mjGameData.tableBaseVo.currGameNum > 1
                || dd.gm_manager.mjGameData.tableBaseVo.gameState > MJ_Help.MJ_GameState.STATE_TABLE_IDLE) {
                this.btn_disband.active = true;
                this.btn_return.active = false;
            }
            else {
                if (dd.ud_manager.mineData.accountId === dd.gm_manager.mjGameData.tableBaseVo.createPlayer) {
                    this.btn_disband.active = true;
                    this.btn_return.active = false;
                }
                else {
                    this.btn_disband.active = false;
                    this.btn_return.active = true;
                }
            }
        }
    };
    /**
     * 初始化显示
     *
     * @param {number} type
     * @memberof Game_Setting
     */
    Game_Setting.prototype.initData = function (type) {
        this._showType = type;
        this.img_effect.spriteFrame = dd.mp_manager.audioSetting.isEffect === true ? this.on_off_list[0] : this.on_off_list[1];
        this.img_music.spriteFrame = dd.mp_manager.audioSetting.isMusic === true ? this.on_off_list[0] : this.on_off_list[1];
        switch (this._showType) {
            case -1:
                this.btn_disband.active = false;
                this.btn_logout.active = true;
                this.btn_return.active = false;
                break;
            case 0:
                this.btn_disband.active = true;
                this.btn_logout.active = false;
                this.btn_return.active = false;
                break;
            case 1:
                this.btn_disband.active = true;
                this.btn_logout.active = false;
                this.btn_return.active = false;
                break;
            default:
                break;
        }
        for (var i = 0; i < this.toggle_bp_list.length; i++) {
            if (dd.mp_manager.audioSetting.language === i) {
                this.toggle_bp_list[i].isChecked = true;
            }
            else {
                this.toggle_bp_list[i].isChecked = false;
            }
        }
    };
    /**
     * 点击音效按钮
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_effect = function () {
        dd.mp_manager.playButton();
        dd.mp_manager.audioSetting.isEffect = !dd.mp_manager.audioSetting.isEffect;
        this.img_effect.spriteFrame = dd.mp_manager.audioSetting.isEffect === true ? this.on_off_list[0] : this.on_off_list[1];
        dd.mp_manager.saveMPSetting();
    };
    /**
     * 点击音乐按钮
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_music = function () {
        dd.mp_manager.playButton();
        dd.mp_manager.audioSetting.isMusic = !dd.mp_manager.audioSetting.isMusic;
        dd.mp_manager.saveMPSetting();
        this.img_music.spriteFrame = dd.mp_manager.audioSetting.isMusic === true ? this.on_off_list[0] : this.on_off_list[1];
        if (!dd.mp_manager.audioSetting.isMusic) {
            dd.mp_manager.stopBackGround();
        }
        else {
            dd.mp_manager.playBackGround();
        }
    };
    /**
     * 点击报牌音
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_toggle_bp = function (event, type) {
        dd.mp_manager.playButton();
        cc.log('---报牌音--' + type);
        dd.mp_manager.audioSetting.language = Number(type);
        dd.mp_manager.saveMPSetting();
    };
    /**
    * 点击退出游戏
    *
    * @memberof PT_Setting
    */
    Game_Setting.prototype.click_btn_logout = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading('正在注销，请稍后')) {
            var obj = { 'accountId': dd.ud_manager.mineData.accountId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_LOGIN_OUT, msg, function (flag, content) {
                dd.ws_manager.disconnect(function () {
                    dd.destroy();
                    var db = cc.sys.localStorage;
                    if (db.getItem('TokenInfo')) {
                        db.removeItem('TokenInfo');
                    }
                    cc.sys.garbageCollect();
                    cc.game.restart();
                });
            });
        }
    };
    /**
     * 点击解散游戏
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_disband = function () {
        var _this = this;
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading()) {
            var obj = {
                'tableId': dd.gm_manager.mjGameData.tableBaseVo.tableId,
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_QUEST_DELETE, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    dd.ui_manager.isShowPopup = true;
                    if (_this._showType === -1) {
                        _this.node.removeFromParent(true);
                        _this.node.destroy();
                    }
                    else {
                        _this.node.active = false;
                    }
                    //如果在空闲等待阶段解散房间
                    if (dd.gm_manager.mjGameData.tableBaseVo.gameState === MJ_Help.MJ_GameState.STATE_TABLE_IDLE) {
                        _this.quitGame();
                    }
                }
                else if (flag === -1) {
                    cc.log(content);
                }
                else {
                    dd.ui_manager.showAlert(content, '错误提示', null, null, 1);
                }
            });
        }
    };
    /**
    * 退出游戏房间，跳转到大厅
    *
    * @memberof MJCanvas
    */
    Game_Setting.prototype.quitGame = function () {
        if (dd.ui_manager.showLoading()) {
            var canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
            if (canvasTarget) {
                canvasTarget._isLoad = true;
            }
            dd.ud_manager.mineData.tableId = 0;
            //如果是语音房间，退出的时候，要退出语音
            if (dd.gm_manager && dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.tableBaseVo
                && dd.gm_manager.mjGameData.tableBaseVo.tableChatType === 1) {
                var b = dd.js_call_native.quitRoom();
                if (b === 0) {
                    // '离开房间成功';
                }
                else {
                    // '离开房间失败';
                }
            }
            if (dd.gm_manager.mjGameData.tableBaseVo.corpsId !== '0') {
                cc.director.loadScene('ClubScene', function () {
                    dd.gm_manager.destroySelf();
                    cc.sys.garbageCollect();
                });
            }
            else {
                cc.director.loadScene('HomeScene', function () {
                    dd.gm_manager.destroySelf();
                    cc.sys.garbageCollect();
                });
            }
        }
    };
    /**
     * 退出游戏
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_outGame = function () {
        var canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        if (canvasTarget) {
            dd.mp_manager.playButton();
            canvasTarget.sendOutGame();
        }
    };
    /**点击退出按钮
     *
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        if (this._showType === -1) {
            this.node.removeFromParent(true);
            this.node.destroy();
        }
        else {
            this.node.active = false;
        }
    };
    __decorate([
        property([cc.Toggle])
    ], Game_Setting.prototype, "toggle_bp_list", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Setting.prototype, "btn_logout", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Setting.prototype, "btn_disband", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Setting.prototype, "btn_return", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Setting.prototype, "img_effect", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Setting.prototype, "img_music", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Game_Setting.prototype, "on_off_list", void 0);
    Game_Setting = __decorate([
        ccclass
    ], Game_Setting);
    return Game_Setting;
}(cc.Component));
exports.default = Game_Setting;

cc._RF.pop();