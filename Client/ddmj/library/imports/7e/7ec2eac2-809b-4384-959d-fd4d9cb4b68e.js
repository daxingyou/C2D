"use strict";
cc._RF.push(module, '7ec2erCgJtDhJWd/U2ctLaO', 'Game_Over_Item');
// Script/SceneScript/Game/Game_Over_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var MJ_Help = require("./MJ_Help");
var Game_Over_Item = /** @class */ (function (_super) {
    __extends(Game_Over_Item, _super);
    function Game_Over_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node_light = null;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof Game_Over_Item
         */
        _this.imgHead = null;
        /**
         * 名字
         *
         * @type {cc.Label}
         * @memberof Game_Over_Item
         */
        _this.lblName = null;
        /**
         * 玩家打牌过程中的一些操作描述
         *
         * @type {cc.Label}
         * @memberof Game_Over_Item
         */
        _this.lblDes = null;
        /**
         * 加减分数
         *
         * @type {cc.Label}
         * @memberof Game_Over_Item
         */
        _this.lblScore = null;
        /**
         * 番数
         *
         * @type {cc.Label}
         * @memberof Game_Over_Item
         */
        _this.lblFan = null;
        /**
         * hu次数
         *
         * @type {cc.Label}
         * @memberof Game_Over_Item
         */
        _this.lblHu = null;
        /**
         * 庄家节点
         *
         * @type {cc.Node}
         * @memberof Game_Over_Item
         */
        _this.node_banker = null;
        /**
         * 碰、杠牌的父节点
         *
         * @type {cc.Node}
         * @memberof Game_Over_Item
         */
        _this.node_group = null;
        /**
         * 手牌牌的父节点
         *
         * @type {cc.Node}
         * @memberof Game_Over_Item
         */
        _this.node_hand = null;
        /**
         * 胡牌的父节点
         *
         * @type {cc.Node}
         * @memberof Game_Over_Item
         */
        _this.node_hu = null;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        return _this;
    }
    Game_Over_Item.prototype.onLoad = function () {
    };
    /**
     * 刷新item信息
     *
     * @memberof Game_Over_Item
     */
    Game_Over_Item.prototype.updateItem = function (index, data) {
        return __awaiter(this, void 0, void 0, function () {
            var minGang, i, i, i, handCards, i, i, headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
                        this.lblName.string = data.nick;
                        this.lblScore.string = data.score + '';
                        this.lblDes.string = data.huPaiDesc;
                        this.lblFan.string = data.rate + '番';
                        if (data.huPaiIndex > 0) {
                            this.lblHu.node.active = true;
                            this.lblHu.string = data.huPaiIndex + '胡';
                        }
                        else {
                            this.lblHu.node.active = false;
                        }
                        this.node_light.active = index % 2 === 0 ? true : false;
                        this.node_banker.active = data.banker === 0 ? false : true;
                        this.node_group.removeAllChildren();
                        this.node_hand.removeAllChildren();
                        this.node_hu.removeAllChildren();
                        minGang = [];
                        if (data.baGangCards) {
                            minGang = data.baGangCards;
                        }
                        if (data.dianGangCards) {
                            minGang = minGang.concat(data.dianGangCards);
                        }
                        if (minGang) {
                            for (i = 0; i < minGang.length; i++) {
                                this._canvasTarget.showGroupCard(1, minGang[i], 0, this.node_group);
                            }
                        }
                        if (data.anGangCards) {
                            for (i = 0; i < data.anGangCards.length; i++) {
                                this._canvasTarget.showGroupCard(2, data.anGangCards[i], 0, this.node_group);
                            }
                        }
                        if (data.pengCards) {
                            for (i = 0; i < data.pengCards.length; i++) {
                                this._canvasTarget.showGroupCard(0, data.pengCards[i], 0, this.node_group);
                            }
                        }
                        //如果没有杠牌和碰牌
                        if (this.node_group.childrenCount === 0) {
                            this.node_group.active = false;
                        }
                        if (data.handCards) {
                            handCards = MJ_Help.getSortCardByCardIds(data.handCards);
                            for (i = 0; i < handCards.length; i++) {
                                this._canvasTarget.showMineCard(handCards[handCards.length - 1 - i], this.node_hand, false, function (cardNode) {
                                    cardNode.scale = 0.8;
                                    var mcm = cardNode.getComponent('MJ_Card');
                                    mcm.showMask(false);
                                });
                            }
                        }
                        if (data.huCards) {
                            for (i = 0; i < data.huCards.length; i++) {
                                this._canvasTarget.showMineCard(data.huCards[i], this.node_hu, false, function (cardNode) {
                                    cardNode.scale = 0.8;
                                    var mcm = cardNode.getComponent('MJ_Card');
                                    mcm.showMask(false);
                                });
                            }
                        }
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(data.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.imgHead.spriteFrame = headSF;
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], Game_Over_Item.prototype, "node_light", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Over_Item.prototype, "imgHead", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over_Item.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over_Item.prototype, "lblDes", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over_Item.prototype, "lblScore", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over_Item.prototype, "lblFan", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Over_Item.prototype, "lblHu", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Over_Item.prototype, "node_banker", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Over_Item.prototype, "node_group", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Over_Item.prototype, "node_hand", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Over_Item.prototype, "node_hu", void 0);
    Game_Over_Item = __decorate([
        ccclass
    ], Game_Over_Item);
    return Game_Over_Item;
}(cc.Component));
exports.default = Game_Over_Item;

cc._RF.pop();