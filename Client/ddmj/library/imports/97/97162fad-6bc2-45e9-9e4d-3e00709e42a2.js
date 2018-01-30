"use strict";
cc._RF.push(module, '97162+ta8JF6Z5NPgBwnkKi', 'Toggle_AddLabel');
// Script/UI/Toggle_AddLabel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Toggle_AddLabel = /** @class */ (function (_super) {
    __extends(Toggle_AddLabel, _super);
    function Toggle_AddLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 名称
         *
         * @type {cc.Label}
         * @memberof Toggle_AddLabel
         */
        _this.lblName = null;
        /**
         * 文字label描述的节点，用作选中或未选中当前选项的时候，颜色的变化
         *
         * @type {cc.Label}
         * @memberof Toggle_custom
         */
        _this.lblDes = null;
        /**
         * 文字label的描边
         *
         * @type {cc.LabelOutline}
         * @memberof Toggle_AddLabel
         */
        _this.lblOL = null;
        /**
         * 选项节点
         *
         * @type {cc.Toggle}
         * @memberof Toggle_AddLabel
         */
        _this.toggle = null;
        /**
         * 选中和未选中这个选项的时候，lable的颜色 0选中 1未选中
         *
         * @type {[cc.Color]}
         * @memberof Toggle_custom
         */
        _this.check_color = [];
        /**
         * label节点颜色改变的类型 0只改变node颜色 1只改变node的labelOutline组件(如果存在的话)颜色 2前两个都改变
         *
         * @memberof Toggle_AddLabel
         */
        _this.color_type = 0;
        return _this;
    }
    Toggle_AddLabel.prototype.onLoad = function () {
    };
    Toggle_AddLabel.prototype.updateItem = function (name) {
        this.lblName.string = name;
    };
    Toggle_AddLabel.prototype.update = function (dt) {
        var isCheck = this.toggle.isChecked;
        this.checkChangeState(isCheck);
    };
    /**
     * 选项状态改变的时候
     *
     * @memberof Toggle_AddLabel
     */
    Toggle_AddLabel.prototype.checkChangeState = function (isCheck) {
        switch (this.color_type) {
            case 0:
                this.lblDes.color = isCheck === true ? this.check_color[0] : this.check_color[1];
                break;
            case 1:
                if (this.lblOL) {
                    this.lblOL.color = isCheck === true ? this.check_color[0] : this.check_color[1];
                }
                break;
            case 2:
                this.lblDes.color = isCheck === true ? this.check_color[0] : this.check_color[1];
                if (this.lblOL) {
                    this.lblOL.color = isCheck === true ? this.check_color[0] : this.check_color[1];
                }
                break;
            default:
                break;
        }
    };
    __decorate([
        property(cc.Label)
    ], Toggle_AddLabel.prototype, "lblName", void 0);
    __decorate([
        property(cc.Node)
    ], Toggle_AddLabel.prototype, "lblDes", void 0);
    __decorate([
        property({
            type: cc.LabelOutline,
            tooltip: '文字label的描边,可以不存在'
        })
    ], Toggle_AddLabel.prototype, "lblOL", void 0);
    __decorate([
        property(cc.Toggle)
    ], Toggle_AddLabel.prototype, "toggle", void 0);
    __decorate([
        property({
            // default: [],
            type: [cc.Color],
            tooltip: '选中和未选中这个选项的时候，lable的颜色\n 0:选中\n 1:未选中'
        })
    ], Toggle_AddLabel.prototype, "check_color", void 0);
    __decorate([
        property({
            // default: 0,
            type: cc.Integer,
            tooltip: 'label节点颜色改变的类型\n 0:只改变node颜色\n 1:只改变node的labelOutline组件(如果存在的话)颜色\n 2:前两个都改变'
        })
    ], Toggle_AddLabel.prototype, "color_type", void 0);
    Toggle_AddLabel = __decorate([
        ccclass
    ], Toggle_AddLabel);
    return Toggle_AddLabel;
}(cc.Component));
exports.default = Toggle_AddLabel;

cc._RF.pop();