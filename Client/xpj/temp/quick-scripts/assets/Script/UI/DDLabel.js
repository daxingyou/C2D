(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/DDLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3bed5gzdJJOp4bcF1JmtgdK', 'DDLabel', __filename);
// Script/UI/DDLabel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DDLabel = /** @class */ (function (_super) {
    __extends(DDLabel, _super);
    function DDLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lbl = null;
        _this.vaule = null;
        return _this;
    }
    DDLabel.prototype.onLoad = function () {
        this.lbl = this.node.getComponent(cc.Label);
    };
    DDLabel.prototype.update = function (dt) {
        if (this.lbl && this.vaule !== this.lbl.string) {
            var len = 0;
            this.vaule = '';
            for (var i = 0; i < this.lbl.string.length; i++) {
                if (this.lbl.string.charCodeAt(i) > 255) {
                    len += 2;
                }
                else {
                    len += 1;
                }
                if (len > 8) {
                    break;
                }
                else {
                    this.vaule += this.lbl.string.charAt(i);
                }
            }
            this.lbl.string = this.vaule;
        }
    };
    DDLabel = __decorate([
        ccclass
    ], DDLabel);
    return DDLabel;
}(cc.Component));
exports.default = DDLabel;

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
        //# sourceMappingURL=DDLabel.js.map
        