"use strict";
cc._RF.push(module, '4acb3R4l+xKopn0bW1rJ8sH', 'Game_Over');
// Script/SceneScript/Game/Game_Over.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var Game_Over = /** @class */ (function (_super) {
    __extends(Game_Over, _super);
    function Game_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 标题图片
         *
         * @type {cc.Sprite}
         * @memberof Game_Over
         */
        _this.imgTitle = null;
        /**
         * 标题描述
         *
         * @type {cc.Label}
         * @memberof Game_Over
         */
        _this.lbl_over_des = null;
        /**
         * 按钮名称
         *
         * @type {cc.Label}
         * @memberof Game_Over
         */
        _this.lblBtnName = null;
        /**
         * 单个人结算的预设
         *
         * @type {cc.Prefab}
         * @memberof Game_Over
         */
        _this.game_over_prefab = null;
        /**
         * 预设容器的父节点
         *
         * @type {cc.Node}
         * @memberof Game_Over
         */
        _this.svNode = null;
        /**
         * 标题图片列表
         *
         * @type {cc.SpriteFrame[]}
         * @memberof Game_Over
         */
        _this.img_title_list = [];
        _this._canvasTarget = null;
        return _this;
    }
    Game_Over.prototype.onLoad = function () {
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
    };
    /**
     * 初始化数据
     *
     * @memberof Game_Over
     */
    Game_Over.prototype.initData = function (sov) {
        var _this = this;
        if (!sov)
            return;
        this.svNode.content.removeAllChildren();
        var isLiuJu = true;
        var mySeatInfo = null;
        for (var i = 0; i < sov.length; i++) {
            var goItem = cc.instantiate(this.game_over_prefab);
            var goItemScript = goItem.getComponent('Game_Over_Item');
            goItemScript.updateItem(i, sov[i]);
            goItem.parent = this.svNode.content;
            //如果有一家胡牌了，就不算流局
            if (sov[i].huPaiIndex !== 0) {
                isLiuJu = false;
            }
            if (sov[i].accountId === dd.ud_manager.mineData.accountId) {
                mySeatInfo = sov[i];
            }
        }
        if (isLiuJu) {
            this.imgTitle.spriteFrame = this.img_title_list[2];
        }
        else {
            if (mySeatInfo && mySeatInfo.score >= 0) {
                this.imgTitle.spriteFrame = this.img_title_list[0];
            }
            else {
                this.imgTitle.spriteFrame = this.img_title_list[1];
            }
        }
        this.lblBtnName.string = dd.gm_manager.mjGameData.tableBaseVo.nextGame === 1 ? '下一局' : '查看结算';
        this.lbl_over_des.string = dd.gm_manager.mjGameData.tableBaseVo.ruleShowDesc;
        /********自动进入下一局 */
        var outTime = MJ_Help.getDiffTime(dd.gm_manager.mjGameData.tableBaseVo.svrTime, dd.gm_manager.mjGameData.tableBaseVo.actTime);
        outTime = (outTime - 1) * 1000;
        setTimeout(function () {
            if (_this.node && _this.node.isValid) {
                dd.js_call_native.phoneVibration();
            }
        }, outTime);
    };
    /**
     * 点击下一局游戏按钮
     *
     * @memberof Game_Over
     */
    Game_Over.prototype.click_btn_next = function () {
        dd.mp_manager.playButton();
        this.sendNextGame();
    };
    /**
    * 发送下一局
    *
    * @param {number[]} cardIds
    * @memberof MJCanvas
    */
    Game_Over.prototype.sendNextGame = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_NEXT_GAME, '', function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.hideLoading();
                    dd.gm_manager.mjGameData = content;
                    _this._canvasTarget.showMJInfo();
                    _this.node.removeFromParent(true);
                    _this.node.destroy();
                }
                else if (flag === -1) {
                }
                else {
                    cc.log(content);
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Game_Over.prototype, "imgTitle", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over.prototype, "lbl_over_des", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over.prototype, "lblBtnName", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game_Over.prototype, "game_over_prefab", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Game_Over.prototype, "svNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Game_Over.prototype, "img_title_list", void 0);
    Game_Over = __decorate([
        ccclass
    ], Game_Over);
    return Game_Over;
}(cc.Component));
exports.default = Game_Over;

cc._RF.pop();