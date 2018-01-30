(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/Game_Result.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cfa46Cu+odINoCesoy47cDK', 'Game_Result', __filename);
// Script/SceneScript/Game/Game_Result.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Game_Result = /** @class */ (function (_super) {
    __extends(Game_Result, _super);
    function Game_Result() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 单个人结算的预设
         *
         * @type {cc.Prefab}
         * @memberof Game_Result
         */
        _this.game_result_prefab = null;
        /**
         * 预设容器的父节点
         *
         * @type {cc.Node}
         * @memberof Game_Result
         */
        _this.listLayout = null;
        /**
         * 微信分享 按钮
         * @type {cc.Node}
         * @memberof MJ_Table
         */
        _this.node_wx_share = null;
        /**
         * 是否点击按钮
         *
         * @type {boolean}
         * @memberof Game_Result
         */
        _this._isTouch = false;
        /**
        * 微信分享回调
        *
        * @memberof MJ_Table
        */
        _this.wxShareCallBack = function (event) {
            var data = event.detail;
            if (data === 0) {
                dd.ui_manager.showTip('战绩分享成功！');
            }
            else {
                dd.ui_manager.showTip('战绩分享失败！');
            }
        };
        return _this;
    }
    Game_Result.prototype.onLoad = function () {
        dd.ui_manager.fixIPoneX(this.node);
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
        if (dd.config.wxState === 0) {
            this.node_wx_share.active = true;
        }
        else {
            this.node_wx_share.active = false;
        }
        this.showGameResult();
        cc.systemEvent.on('cb_share', this.wxShareCallBack, this);
    };
    Game_Result.prototype.onDestroy = function () {
        cc.systemEvent.off('cb_share', this.wxShareCallBack, this);
    };
    /**
     * 初始化数据
     *
     * @memberof Game_Result
     */
    Game_Result.prototype.showGameResult = function () {
        if (dd.gm_manager && dd.gm_manager.mjGameData && dd.gm_manager.mjGameData.settlementAll) {
            var sav = dd.gm_manager.mjGameData.settlementAll;
            var maxScore = sav[0].score;
            var maxDP = sav[0].dianPao;
            for (var i = 1; i < sav.length; i++) {
                if (sav[i].score > maxScore) {
                    maxScore = sav[i].score;
                }
                if (sav[i].dianPao > maxDP) {
                    maxDP = sav[i].dianPao;
                }
            }
            this.listLayout.removeAllChildren();
            for (var i = 0; i < sav.length; i++) {
                var rsItem = cc.instantiate(this.game_result_prefab);
                var rsItemScript = rsItem.getComponent('Game_Result_Item');
                rsItemScript.updateItem(sav[i], maxScore, maxDP);
                rsItem.parent = this.listLayout;
            }
        }
    };
    /**
     * 点击退出按钮
     *
     * @memberof Game_Result
     */
    Game_Result.prototype.click_btn_out = function () {
        if (this._isTouch) {
            return;
        }
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading()) {
            dd.ud_manager.mineData.tableId = 0;
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
     * 点击分享按钮
     *
     * @memberof Game_Result
     */
    Game_Result.prototype.click_btn_share = function () {
        var _this = this;
        if (this._isTouch) {
            return;
        }
        this._isTouch = true;
        dd.mp_manager.playButton();
        dd.utils.captureScreen(this.node, 'jt.png', function (filePath) {
            if (filePath) {
                dd.js_call_native.wxShareRecord(filePath);
                _this._isTouch = false;
            }
            else {
                dd.ui_manager.showTip('截图失败!');
                _this._isTouch = false;
            }
            dd.ui_manager.hideLoading();
        });
    };
    __decorate([
        property(cc.Prefab)
    ], Game_Result.prototype, "game_result_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Result.prototype, "listLayout", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Result.prototype, "node_wx_share", void 0);
    Game_Result = __decorate([
        ccclass
    ], Game_Result);
    return Game_Result;
}(cc.Component));
exports.default = Game_Result;

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
        //# sourceMappingURL=Game_Result.js.map
        