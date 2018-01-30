(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJ_ActionSwap.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b82678pT0dAjLoILhefXep6', 'MJ_ActionSwap', __filename);
// Script/SceneScript/Game/MJ_ActionSwap.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var MJ_ActionSwap = /** @class */ (function (_super) {
    __extends(MJ_ActionSwap, _super);
    function MJ_ActionSwap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_card_list = [];
        return _this;
    }
    MJ_ActionSwap.prototype.onLoad = function () {
    };
    /**
     * 显示换三张牌
     *
     * @memberof MJ_ActionSwap
     */
    MJ_ActionSwap.prototype.showSwapCard = function (data) {
        var isAct = true;
        for (var i = 0; i < data.seats.length; i++) {
            var seat = data.seats[i];
            if (seat.btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                this.node_card_list[i].active = true;
            }
            else {
                isAct = false;
                this.node_card_list[i].active = false;
            }
        }
        if (isAct) {
            var anim = this.node.getComponent(cc.Animation);
            switch (data.tableBaseVo.swapCardType) {
                case 0://逆时针
                    anim.play('mj_swap_r');
                    break;
                case 1://顺时针
                    anim.play('mj_swap_l');
                    break;
                case 2://对面
                    anim.play('mj_swap_d');
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * 打出牌，显示牌的动作结束
     *
     * @memberof MJ_Action
     */
    MJ_ActionSwap.prototype.swapActEnd = function () {
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property([cc.Node])
    ], MJ_ActionSwap.prototype, "node_card_list", void 0);
    MJ_ActionSwap = __decorate([
        ccclass
    ], MJ_ActionSwap);
    return MJ_ActionSwap;
}(cc.Component));
exports.default = MJ_ActionSwap;

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
        //# sourceMappingURL=MJ_ActionSwap.js.map
        