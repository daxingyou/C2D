(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/ZJH/ZJH_PokerShake.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c2123LU0UVCiplp+9LyBkkW', 'ZJH_PokerShake', __filename);
// Script/SceneScript/ZJH/ZJH_PokerShake.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ZJH_Help_1 = require("./ZJH_Help");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZJH_PokerShake = /** @class */ (function (_super) {
    __extends(ZJH_PokerShake, _super);
    function ZJH_PokerShake() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._seatId = 0;
        _this._canvansScript = null;
        return _this;
    }
    ZJH_PokerShake.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            _this._canvansScript.sendBetInfo(ZJH_Help_1.ZJH_Act_State.BT_VAL_COMPARAE, _this._seatId);
        }, this);
    };
    ZJH_PokerShake.prototype.initData = function (seatId, target) {
        this._seatId = seatId;
        this._canvansScript = target;
    };
    ZJH_PokerShake = __decorate([
        ccclass
    ], ZJH_PokerShake);
    return ZJH_PokerShake;
}(cc.Component));
exports.default = ZJH_PokerShake;

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
        //# sourceMappingURL=ZJH_PokerShake.js.map
        