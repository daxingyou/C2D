"use strict";
cc._RF.push(module, 'daa73Z6OapHxrFjJpUTo5zI', 'Game_Chat_Show');
// Script/SceneScript/Game/Game_Chat_Show.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game_Chat_Show = /** @class */ (function (_super) {
    __extends(Game_Chat_Show, _super);
    function Game_Chat_Show() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeChat = null;
        _this.lblChat = null;
        return _this;
    }
    Game_Chat_Show.prototype.onLoad = function () {
        // init logic
    };
    /**
     * 显示聊天信息
     *
     * @param {string} msg
     * @memberof Game_Chat_Show
     */
    Game_Chat_Show.prototype.showChat = function (msg, fx) {
        this.nodeChat.string = msg;
        this.lblChat.string = msg;
        this.lblChat.node.scaleX = fx;
    };
    __decorate([
        property(cc.Label)
    ], Game_Chat_Show.prototype, "nodeChat", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Chat_Show.prototype, "lblChat", void 0);
    Game_Chat_Show = __decorate([
        ccclass
    ], Game_Chat_Show);
    return Game_Chat_Show;
}(cc.Component));
exports.default = Game_Chat_Show;

cc._RF.pop();