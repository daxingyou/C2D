"use strict";
cc._RF.push(module, '3c4bcf5i65OtI9ma7y7KOfB', 'Setting');
// Script/SceneScript/Home/Setting.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Game_Setting = /** @class */ (function (_super) {
    __extends(Game_Setting, _super);
    function Game_Setting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_onOff_list = [];
        _this.effect_img = null;
        _this.music_img = null;
        /**
         * 注销游戏
         *
         * @type {cc.Node}
         * @memberof Game_Setting
         */
        _this.btn_logout = null;
        return _this;
    }
    Game_Setting.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
        }, this);
        this.effect_img.spriteFrame = dd.mp_manager.audioSetting.isEffect === true ? this.img_onOff_list[0] : this.img_onOff_list[1];
        this.music_img.spriteFrame = dd.mp_manager.audioSetting.isMusic === true ? this.img_onOff_list[0] : this.img_onOff_list[1];
    };
    /**
     * 点击音效按钮
     *
     * @memberof Game_Setting
     */
    Game_Setting.prototype.click_btn_effect = function () {
        dd.mp_manager.playButton();
        dd.mp_manager.audioSetting.isEffect = !dd.mp_manager.audioSetting.isEffect;
        dd.mp_manager.saveMPSetting();
        this.effect_img.spriteFrame = dd.mp_manager.audioSetting.isEffect === true ? this.img_onOff_list[0] : this.img_onOff_list[1];
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
        if (!dd.mp_manager.audioSetting.isMusic) {
            dd.mp_manager.stopBackGround();
        }
        else {
            dd.mp_manager.playBackGround();
        }
        this.music_img.spriteFrame = dd.mp_manager.audioSetting.isMusic === true ? this.img_onOff_list[0] : this.img_onOff_list[1];
    };
    /**
    * 点击退出游戏
    *
    * @memberof Setting
    */
    Game_Setting.prototype.click_btn_logout = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading('正在注销，请稍后')) {
            var obj = { 'accountId': dd.ud_manager.mineData.accountId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_LOGIN_OUT, msg, function (flag, content) {
                dd.ws_manager.disconnect(function () {
                    dd.destroy();
                    cc.sys.garbageCollect();
                    cc.game.restart();
                });
            });
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], Game_Setting.prototype, "img_onOff_list", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Setting.prototype, "effect_img", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Setting.prototype, "music_img", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Setting.prototype, "btn_logout", void 0);
    Game_Setting = __decorate([
        ccclass
    ], Game_Setting);
    return Game_Setting;
}(cc.Component));
exports.default = Game_Setting;

cc._RF.pop();