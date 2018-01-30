"use strict";
cc._RF.push(module, '52505E8zDZC2LR6ZZxGnL3n', 'ReviewItem');
// Script/SceneScript/Game/ReviewItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var ReviewItem = /** @class */ (function (_super) {
    __extends(ReviewItem, _super);
    function ReviewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof ReviewItem
         */
        _this.headImg = null;
        /**
         * 手牌1
         *
         * @type {cc.Sprite}
         * @memberof ReviewItem
         */
        _this.card1 = null;
        /**
         * 手牌2
         *
         * @type {cc.Sprite}
         * @memberof ReviewItem
         */
        _this.card2 = null;
        /**
         * 昵称
         *
         * @type {cc.Label}
         * @memberof ReviewItem
         */
        _this.nick = null;
        /**
         * 输赢量
         *
         * @type {cc.Label}
         * @memberof ReviewItem
         */
        _this.gold = null;
        return _this;
    }
    ReviewItem.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.nick.string = dd.utils.getStringBySize(data.nick, 12);
                        this.gold.string = data.score;
                        //如果是自己
                        if (data.starNO === dd.ud_manager.account_mine.roleAttribVo.starNO) {
                            if (data.handCards && data.handCards.length > 0) {
                                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[0]);
                                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[1]);
                            }
                            else {
                                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                            }
                        }
                        else {
                            if (data.handCards && data.handCards.length > 0 && data.showCardState === 1) {
                                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[0]);
                                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[1]);
                            }
                            else {
                                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                            }
                        }
                        _a = this.headImg;
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 1:
                        _a.spriteFrame = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Sprite)
    ], ReviewItem.prototype, "headImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], ReviewItem.prototype, "card1", void 0);
    __decorate([
        property(cc.Sprite)
    ], ReviewItem.prototype, "card2", void 0);
    __decorate([
        property(cc.Label)
    ], ReviewItem.prototype, "nick", void 0);
    __decorate([
        property(cc.Label)
    ], ReviewItem.prototype, "gold", void 0);
    ReviewItem = __decorate([
        ccclass
    ], ReviewItem);
    return ReviewItem;
}(cc.Component));
exports.default = ReviewItem;

cc._RF.pop();