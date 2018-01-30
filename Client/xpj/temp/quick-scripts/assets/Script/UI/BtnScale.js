(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/BtnScale.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3d656CcqR5EeoLQ7fTRq0cF', 'BtnScale', __filename);
// Script/UI/BtnScale.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnScale = /** @class */ (function (_super) {
    __extends(BtnScale, _super);
    function BtnScale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTouchStart = function (event) {
            _this.playAction(1.1);
            event.stopPropagation();
        };
        _this.onTouchMove = function (event) {
            event.stopPropagation();
        };
        _this.onTouchEnd = function (event) {
            _this.playAction(1);
            event.stopPropagation();
        };
        _this.onTouchCancel = function (event) {
            _this.playAction(1);
            event.stopPropagation();
        };
        return _this;
    }
    BtnScale.prototype.onLoad = function () {
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchmove", this.onTouchMove, this);
        this.node.on("touchend", this.onTouchEnd, this);
        this.node.on("touchcancel", this.onTouchCancel, this);
    };
    /**
     * 播放动画
     *
     * @memberof BtnScale
     */
    BtnScale.prototype.playAction = function (scale) {
        var btn = this.node.getComponent(cc.Button);
        if (btn) {
            if (btn.interactable) {
                this.node.stopAllActions();
                var action = cc.scaleTo(0.08, scale);
                this.node.runAction(action);
            }
        }
    };
    BtnScale.prototype.onDestroy = function () {
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchmove", this.onTouchMove, this);
        this.node.off("touchend", this.onTouchEnd, this);
        this.node.off("touchcancel", this.onTouchCancel, this);
    };
    BtnScale = __decorate([
        ccclass
    ], BtnScale);
    return BtnScale;
}(cc.Component));
exports.default = BtnScale;

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
        //# sourceMappingURL=BtnScale.js.map
        