"use strict";
cc._RF.push(module, '3bed5gzdJJOp4bcF1JmtgdK', 'DDLabel');
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