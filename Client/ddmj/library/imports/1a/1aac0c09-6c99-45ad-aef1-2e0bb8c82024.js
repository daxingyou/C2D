"use strict";
cc._RF.push(module, '1aac0wJbJlFra7xLgu4yCAk', 'Help');
// Script/SceneScript/Home/Help.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 显示列表
         *
         * @type {cc.ScrollView}
         * @memberof Help
         */
        _this.svNode = null;
        /**
         * 血战麻将的规则图片列表
         *
         * @type {cc.SpriteFrame[]}
         * @memberof Help
         */
        _this.xzmj_list = [];
        return _this;
    }
    Help.prototype.onLoad = function () {
        var _this = this;
        this.node.on('touchend', function (event) {
            ModuleManager_1.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        this.showHelpInfo();
    };
    /**
     * 显示帮助信息
     *
     * @memberof Help
     */
    Help.prototype.showHelpInfo = function () {
        this.svNode.content.removeAllChildren();
        for (var i = 0; i < this.xzmj_list.length; i++) {
            var itemNode = new cc.Node();
            var sp = itemNode.addComponent(cc.Sprite);
            sp.spriteFrame = this.xzmj_list[i];
            sp.sizeMode = cc.Sprite.SizeMode.RAW;
            sp.trim = false;
            var lw = itemNode.addComponent(cc.Widget);
            lw.isAlignLeft = true;
            // lw.isAlignRight = true;
            lw.left = 0;
            // lw.right = 0;
            this.svNode.content.addChild(itemNode);
        }
    };
    /**
     * 退出
     *
     * @memberof Help
     */
    Help.prototype.click_btn_out = function () {
        ModuleManager_1.mp_manager.playButton();
        ModuleManager_1.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.ScrollView)
    ], Help.prototype, "svNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Help.prototype, "xzmj_list", void 0);
    Help = __decorate([
        ccclass
    ], Help);
    return Help;
}(cc.Component));
exports.default = Help;

cc._RF.pop();