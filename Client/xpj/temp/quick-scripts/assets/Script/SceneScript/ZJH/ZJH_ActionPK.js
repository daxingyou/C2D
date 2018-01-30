(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/ZJH/ZJH_ActionPK.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9c653jyfiVMIquQ9gz84ZbG', 'ZJH_ActionPK', __filename);
// Script/SceneScript/ZJH/ZJH_ActionPK.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var ZJH_Help = require("./ZJH_Help");
var ZJH_ActionPK = /** @class */ (function (_super) {
    __extends(ZJH_ActionPK, _super);
    function ZJH_ActionPK() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像列表
         *
         * @type {cc.Sprite[]}
         * @memberof ZJH_ActionPK
         */
        _this.headImgList = [];
        /**
         * 金币列表
         *
         * @type {cc.Label[]}
         * @memberof ZJH_ActionPK
         */
        _this.lblMoneyList = [];
        /**
         * 名字列表
         *
         * @type {cc.Label[]}
         * @memberof ZJH_ActionPK
         */
        _this.lblNameList = [];
        /**
         * 庄节点表
         *
         * @type {cc.Node[]}
         * @memberof ZJH_ActionPK
         */
        _this.dImgList = [];
        /**
         * canvas脚本
         *
         * @memberof ZJH_ActionPK
         */
        _this._canvansScript = null;
        return _this;
    }
    ZJH_ActionPK.prototype.onLoad = function () {
        this.node.on('touchend', function (event) {
            event.stopPropagation();
        }, this);
        this._canvansScript = dd.ui_manager.getCanvasNode().getComponent('ZJHCanvas');
        this.initData();
    };
    /**
     * 初始化数据
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.initData = function () {
        var seatList = [];
        //比牌发起座位
        var compareSrcSeat = ZJH_Help.getSeatBySeatId(dd.gm_manager.zjhGameData.compareSrcIndex);
        var compareDstSeat = ZJH_Help.getSeatBySeatId(dd.gm_manager.zjhGameData.compareDstIndex);
        seatList.push(compareSrcSeat);
        seatList.push(compareDstSeat);
        for (var i = 0; i < seatList.length; i++) {
            var seat = seatList[i];
            if (seat) {
                this.headImgList[i].spriteFrame = dd.img_manager.getHeadById(Number(seat.headImg));
                this.dImgList[i].active = seat.accountId === dd.gm_manager.zjhGameData.bankerId ? true : false;
                this.lblMoneyList[i].string = dd.utils.getShowNumberString(seat.money);
                this.lblNameList[i].string = seat.nick;
            }
        }
    };
    /**
     * 比牌结果，显示赢家和比牌失败的特效
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.bpResult = function () {
        var kdNode = null;
        if (dd.gm_manager.zjhGameData.compareResult === 1) {
            kdNode = this.dImgList[1].parent;
        }
        else {
            kdNode = this.dImgList[0].parent;
        }
        if (kdNode) {
            this._canvansScript.showBPSBAction(cc.p(0, 0), kdNode);
        }
    };
    /**
     * 比牌开始
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.showBPStart = function () {
        this.dImgList[0].parent.runAction(cc.fadeIn(0.5));
        this.dImgList[1].parent.runAction(cc.fadeIn(0.5));
    };
    /**
     * 显示比牌失败，失败的一方渐隐
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.showBPSB = function () {
        var action = cc.fadeOut(0.5);
        if (dd.gm_manager.zjhGameData.compareResult === 1) {
            this.dImgList[1].parent.runAction(action);
        }
        else {
            this.dImgList[0].parent.runAction(action);
        }
        var mySeat = ZJH_Help.getSeatById(dd.ud_manager.mineData.accountId);
        if (mySeat) {
            //如果自己是发起比牌的人
            if (mySeat.seatIndex === dd.gm_manager.zjhGameData.compareSrcIndex) {
                if (dd.gm_manager.zjhGameData.compareResult === 1) {
                    dd.mp_manager.playZJH('bp_win');
                }
                else {
                    dd.mp_manager.playZJH('bp_lose');
                }
            }
            //如果自己是目标比牌的人
            if (mySeat.seatIndex === dd.gm_manager.zjhGameData.compareSrcIndex) {
                if (dd.gm_manager.zjhGameData.compareResult === 1) {
                    dd.mp_manager.playZJH('bp_lose');
                }
                else {
                    dd.mp_manager.playZJH('bp_win');
                }
            }
        }
    };
    /**
     * 显示比牌失败的效果
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.showBPWin = function () {
        var action = cc.fadeOut(0.5);
        var kdNode = null;
        if (dd.gm_manager.zjhGameData.compareResult === 1) {
            kdNode = this.dImgList[0].parent;
        }
        else {
            kdNode = this.dImgList[1].parent;
        }
        kdNode.runAction(action);
    };
    /**
     * 比牌动作结束回调
     *
     * @memberof ZJH_ActionPK
     */
    ZJH_ActionPK.prototype.actionEnd = function () {
        var loseSeatId = dd.gm_manager.zjhGameData.compareSrcIndex;
        if (dd.gm_manager.zjhGameData.compareResult === 1) {
            loseSeatId = dd.gm_manager.zjhGameData.compareDstIndex;
        }
        this._canvansScript.showQPAction(loseSeatId);
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property([cc.Sprite])
    ], ZJH_ActionPK.prototype, "headImgList", void 0);
    __decorate([
        property([cc.Label])
    ], ZJH_ActionPK.prototype, "lblMoneyList", void 0);
    __decorate([
        property([cc.Label])
    ], ZJH_ActionPK.prototype, "lblNameList", void 0);
    __decorate([
        property([cc.Node])
    ], ZJH_ActionPK.prototype, "dImgList", void 0);
    ZJH_ActionPK = __decorate([
        ccclass
    ], ZJH_ActionPK);
    return ZJH_ActionPK;
}(cc.Component));
exports.default = ZJH_ActionPK;

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
        //# sourceMappingURL=ZJH_ActionPK.js.map
        