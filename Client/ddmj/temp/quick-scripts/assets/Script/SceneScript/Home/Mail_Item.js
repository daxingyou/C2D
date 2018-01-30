(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Mail_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '82c10mn8EhDqYMQpevHbNJ8', 'Mail_Item', __filename);
// Script/SceneScript/Home/Mail_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Mail_Item = /** @class */ (function (_super) {
    __extends(Mail_Item, _super);
    function Mail_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_odd = null;
        /**
         * 邮件标题
         *
         * @type {cc.Label}
         * @memberof Mail_Item
         */
        _this.lblTitle = null;
        /**
         * 邮件内容
         *
         * @type {cc.Label}
         * @memberof Mail_Item
         */
        _this.lblContent = null;
        /**
         * 邮件数据
         *
         * @type {MailVo}
         * @memberof Mail_Item
         */
        _this._mailItem = null;
        /**
         * 点击邮件回调函数
         *
         * @memberof Mail_Item
         */
        _this._cb = null;
        return _this;
    }
    Mail_Item.prototype.onLoad = function () {
        var _this = this;
        this.node.on('touchend', function (event) {
            if (_this._cb) {
                _this._cb(_this._mailItem);
            }
            event.stopPropagation();
        }, this);
    };
    Mail_Item.prototype.updateItem = function (index, data, cb) {
        this._mailItem = data;
        this._cb = cb;
        this.node_odd.active = index % 2 ? false : true;
        this.lblTitle.string = this._mailItem.title;
        this.lblContent.string = this._mailItem.content;
    };
    __decorate([
        property(cc.Node)
    ], Mail_Item.prototype, "node_odd", void 0);
    __decorate([
        property(cc.Label)
    ], Mail_Item.prototype, "lblTitle", void 0);
    __decorate([
        property(cc.Label)
    ], Mail_Item.prototype, "lblContent", void 0);
    Mail_Item = __decorate([
        ccclass
    ], Mail_Item);
    return Mail_Item;
}(cc.Component));
exports.default = Mail_Item;

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
        //# sourceMappingURL=Mail_Item.js.map
        