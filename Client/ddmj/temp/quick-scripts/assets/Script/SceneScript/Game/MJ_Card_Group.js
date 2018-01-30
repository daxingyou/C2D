(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/MJ_Card_Group.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ff53zmgVJDL64Eox1i+tJS', 'MJ_Card_Group', __filename);
// Script/SceneScript/Game/MJ_Card_Group.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_card_list = [];
        _this.imgCardList = [];
        _this.node_back_list = [];
        /**
          * 麻将数据
          *
          * @type {number}
          * @memberof MJ_Card
          */
        _this._cardId = 0;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
    };
    /**
     * 初始化杠/碰 牌数据
     *
     * @param {number} cardId  牌数据
     * @param {cc.SpriteFrame} cardSF 图片
     * @param {number} type  类型 0:碰 1:明杠 2:暗杠
     * @memberof NewClass
     */
    NewClass.prototype.initData = function (type, cardId, cardSF) {
        this._cardId = cardId;
        for (var i = 0; i < this.imgCardList.length; i++) {
            this.imgCardList[i].spriteFrame = cardSF;
        }
        for (var i = 0; i < this.node_back_list.length; i++) {
            if (i < 3) {
                if (type !== 0) {
                    this.node_back_list[i].active = type === 1 ? false : true;
                }
                else {
                    this.node_back_list[i].active = false;
                }
            }
            else {
                if (type !== 0) {
                    this.node_card_list[i].active = true;
                    this.node_back_list[i].active = false;
                }
                else {
                    this.node_card_list[i].active = false;
                }
            }
        }
    };
    __decorate([
        property([cc.Node])
    ], NewClass.prototype, "node_card_list", void 0);
    __decorate([
        property([cc.Sprite])
    ], NewClass.prototype, "imgCardList", void 0);
    __decorate([
        property([cc.Node])
    ], NewClass.prototype, "node_back_list", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=MJ_Card_Group.js.map
        