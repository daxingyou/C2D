(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/UI/Alert.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e217wA2r9EXJaWWdSt/R3f', 'Alert', __filename);
// Script/UI/Alert.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 警示框文本
         *
         * @type {cc.RichText}
         * @memberof Alert
         */
        _this.lbl_msg = null;
        /**
         * 警示框标题
         *
         * @type {cc.Label}
         * @memberof Alert
         */
        _this.lbl_title = null;
        /**
         * 同意按钮
         *
         * @type {cc.Node}
         * @memberof Alert
         */
        _this.btn_yes = null;
        /**
         * 拒绝按钮
         *
         * @type {cc.Node}
         * @memberof Alert
         */
        _this.btn_no = null;
        /**
         * 确定需要显示的文本
         *
         * @type {cc.Label}
         * @memberof Alert
         */
        _this.lbl_yes = null;
        /**
         * 否定需要显示的文本
         *
         * @type {cc.Label}
         * @memberof Alert
         */
        _this.lbl_no = null;
        /**
         * 点击同意按钮事件回调
         *
         * @type {Function}
         * @memberof Alert
         */
        _this.cb_y = null;
        /**
         * 点击拒绝按钮事件回调
         *
         * @type {Function}
         * @memberof Alert
         */
        _this.cb_n = null;
        return _this;
    }
    /**
     * 显示警示框
     *
     * @param {string} msg 具体信息内容
     * @param {string} title 标题
     * @param {Function} [cb_yes] 点击同意按钮事件回调
     * @param {Function} [cb_no] 点击拒绝按钮事件回调
     * @param {number} [ha=0] 文字对齐方式 0=左对齐 1=居中 2=右对齐
     * @memberof Alert
     */
    Alert.prototype.showAlert = function (msg, title, obj_y, obj_n, ha) {
        if (ha === void 0) { ha = 0; }
        this.lbl_title.string = title;
        this.lbl_msg.string = msg;
        if (obj_y) {
            this.cb_y = obj_y.callback;
            this.lbl_yes.string = obj_y.lbl_name;
        }
        else {
            this.lbl_yes.string = '确定';
        }
        if (obj_n) {
            this.btn_no.active = true;
            this.cb_n = obj_n.callback;
            this.lbl_no.string = obj_n.lbl_name;
        }
        else {
            this.btn_no.active = false;
        }
        switch (ha) {
            case 0:
                this.lbl_msg.horizontalAlign = cc.TextAlignment.LEFT;
                break;
            case 1:
                this.lbl_msg.horizontalAlign = cc.TextAlignment.CENTER;
                break;
            case 2:
                this.lbl_msg.horizontalAlign = cc.TextAlignment.RIGHT;
                break;
            default:
                break;
        }
    };
    /**
     * 按钮点击事件
     *
     * @param {cc.Event.EventTouch} event
     * @param {string} msg
     * @memberof Alert
     */
    Alert.prototype.click = function (event, msg) {
        ModuleManager_1.mp_manager.playButton();
        if (msg === 'yes') {
            if (this.cb_y) {
                this.cb_y(event);
            }
        }
        else {
            if (this.cb_n) {
                this.cb_n(event);
            }
        }
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.RichText)
    ], Alert.prototype, "lbl_msg", void 0);
    __decorate([
        property(cc.Label)
    ], Alert.prototype, "lbl_title", void 0);
    __decorate([
        property(cc.Node)
    ], Alert.prototype, "btn_yes", void 0);
    __decorate([
        property(cc.Node)
    ], Alert.prototype, "btn_no", void 0);
    __decorate([
        property(cc.Label)
    ], Alert.prototype, "lbl_yes", void 0);
    __decorate([
        property(cc.Label)
    ], Alert.prototype, "lbl_no", void 0);
    Alert = __decorate([
        ccclass
    ], Alert);
    return Alert;
}(cc.Component));
exports.default = Alert;

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
        //# sourceMappingURL=Alert.js.map
        