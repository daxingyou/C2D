(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/Loading.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a04e1V6Dj1Kzop825Pn6Z2+', 'Loading', __filename);
// Script/UI/Loading.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 动画圆圈
         *
         * @type {cc.Node}
         * @memberof Loading
         */
        _this.sp_circle = null;
        /**
         * 提示信息
         *
         * @type {cc.Label}
         * @memberof Loading
         */
        _this.lbl_msg = null;
        /**
         * 文本最后的小圆点
         *
         * @type {cc.Label}
         * @memberof Loading
         */
        _this.lbl_dd = null;
        return _this;
    }
    /**
     * 设置需要显示的提示信息
     *
     * @param {string} msg
     * @memberof Loading
     */
    Loading.prototype.setMsg = function (msg) {
        this.lbl_msg.string = msg;
        this.lbl_dd.node.x = this.lbl_msg.node.width / 2 + 10;
    };
    /**
     * 界面刷新
     *
     * @param {number} dt
     * @memberof Loading
     */
    Loading.prototype.update = function (dt) {
        var now = Date.now();
        this.sp_circle.rotation += 2;
        if (this.sp_circle.rotation >= 360) {
            this.sp_circle.rotation = 0;
        }
        var count = Math.floor(now / 1000) % 4;
        this.lbl_dd.string = '';
        while (count > 0) {
            count--;
            this.lbl_dd.string += '。';
        }
    };
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "sp_circle", void 0);
    __decorate([
        property(cc.Label)
    ], Loading.prototype, "lbl_msg", void 0);
    __decorate([
        property(cc.Label)
    ], Loading.prototype, "lbl_dd", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

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
        //# sourceMappingURL=Loading.js.map
        