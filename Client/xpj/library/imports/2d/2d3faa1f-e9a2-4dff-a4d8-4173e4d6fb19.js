"use strict";
cc._RF.push(module, '2d3faof6aJN/6TYQXPk1vsZ', 'Service');
// Script/SceneScript/Home/Service.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblService = null;
        return _this;
    }
    Service.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            event.stopPropagation();
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
        }, this);
    };
    Service.prototype.initData = function (data) {
        this.lblService.string = data;
    };
    /**
     * 复制
     * @memberof Service
     */
    Service.prototype.click_btn_copy = function () {
        dd.mp_manager.playButton();
        dd.utils.copyToClipboard(this.lblService.string);
        dd.ui_manager.showTip('复制成功');
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.Label)
    ], Service.prototype, "lblService", void 0);
    Service = __decorate([
        ccclass
    ], Service);
    return Service;
}(cc.Component));
exports.default = Service;

cc._RF.pop();