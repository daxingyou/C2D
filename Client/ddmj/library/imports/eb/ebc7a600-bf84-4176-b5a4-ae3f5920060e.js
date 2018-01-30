"use strict";
cc._RF.push(module, 'ebc7aYAv4RBdrWkrj9ZIAYO', 'MJ_Card');
// Script/SceneScript/Game/MJ_Card.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Card = /** @class */ (function (_super) {
    __extends(MJ_Card, _super);
    function MJ_Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 牌图片
         *
         * @type {cc.Sprite}
         * @memberof MJ_Card
         */
        _this.cardImg = null;
        /**
         * 标识
         *
         * @type {cc.Node}
         * @memberof MJ_Card
         */
        _this.bsNode = null;
        /**
         * 牌亮光
         *
         * @type {cc.Node}
         * @memberof MJ_Card
         */
        _this.light = null;
        /**
         * 牌背景
         *
         * @type {cc.Node}
         * @memberof MJ_Card
         */
        _this.cardBack = null;
        /**
         * 牌遮罩(手牌有)
         *
         * @type {cc.Node}
         * @memberof MJ_Card
         */
        _this.maskNode = null;
        /**
         * 是否显示了遮罩
         *
         * @type {boolean}
         * @memberof MJ_Card
         */
        _this._isShowMask = false;
        /**
         * 是否被选中
         *
         * @type {boolean}
         * @memberof MJ_Card
         */
        _this._isSelect = false;
        /**
         * 没有被选中的时候，普通状态的Y坐标
         *
         * @type {number}
         * @memberof MJ_Card
         */
        _this._nomalY = 0;
        /**
         * 选中这个麻将后，选中状态的Y坐标
         *
         * @type {number}
         * @memberof MJ_Card
         */
        _this._chooseY = 0;
        /**
         * 麻将数据唯一id
         *
         * @type {number}
         * @memberof MJ_Card
         */
        _this._cardId = 0;
        return _this;
    }
    MJ_Card.prototype.onLoad = function () {
        this._nomalY = 0;
        this._chooseY = 36;
    };
    MJ_Card.prototype.unuse = function () {
        this.node.active = true;
        this.node.stopAllActions();
        if (this.cardImg) {
            this.cardImg.node.active = false;
            this.cardImg.spriteFrame = null;
        }
        if (this.cardBack) {
            this.cardBack.active = false;
        }
        if (this.bsNode) {
            this.bsNode.active = false;
        }
        if (this.light) {
            this.light.active = false;
        }
        if (this.maskNode) {
            this.maskNode.active = false;
        }
        this.node.x = 0;
        this.node.y = 0;
        this.node.opacity = 255;
        this.node.scaleX = Math.abs(this.node.scaleX);
        this.node.scaleY = Math.abs(this.node.scaleY);
        this.cardImg.node.scaleX = Math.abs(this.cardImg.node.scaleX);
        this.cardImg.node.scaleY = Math.abs(this.cardImg.node.scaleY);
        this._isSelect = false;
        this._isShowMask = false;
        this._cardId = 0;
    };
    /**
     * 初始化麻将数据
     *
     * @param {number} cardId 麻将数据
     * @param {cc.SpriteFrame} [cardSF=null] 麻将图片,默认null
     * @param {boolean} [isShow=false] 麻将是否显示背景图片(如果存在背景),默认false
     * @memberof MJ_Card
     */
    MJ_Card.prototype.initData = function (cardId, cardSF, isShow) {
        if (cardSF === void 0) { cardSF = null; }
        if (isShow === void 0) { isShow = false; }
        this._cardId = cardId;
        this.node.active = true;
        this.node.opacity = 255;
        if (this.cardBack) {
            this.cardBack.active = isShow;
        }
        if (this.cardImg) {
            this.cardImg.node.active = true;
            this.cardImg.spriteFrame = cardSF;
        }
        if (this.maskNode) {
            this.maskNode.active = false;
        }
        if (this.light) {
            this.light.active = isShow;
        }
        if (this.bsNode) {
            this.bsNode.active = false;
        }
    };
    /**
     * 修正card的显示方向
     *
     * @param {cc.Vec2} nodefix  节点的修正
     * @param {cc.Vec2} imgfix   图片的修正
     * @memberof MJ_Card
     */
    MJ_Card.prototype.setFixCard = function (nodefix, imgfix) {
        this.node.scaleX *= nodefix.x;
        this.node.scaleY *= nodefix.y;
        this.cardImg.node.scaleX *= imgfix.x;
        this.cardImg.node.scaleY *= imgfix.y;
    };
    /**
     * 是否显示遮罩
     *
     * @param {boolean} isShowMask
     * @memberof MJ_Card
     */
    MJ_Card.prototype.showMask = function (isShowMask) {
        if (this.maskNode) {
            this._isShowMask = isShowMask;
            this.maskNode.active = isShowMask === true ? true : false;
        }
    };
    /**
     * 显示是否选中这个麻将
     *
     * @param {boolean} isSelect
     * @memberof MJ_Card
     */
    MJ_Card.prototype.showSelectCard = function (isSelect) {
        this._isSelect = isSelect;
        if (isSelect) {
            this.node.y = this._chooseY;
            ModuleManager_1.mp_manager.playSelect();
        }
        else {
            this.node.y = this._nomalY;
        }
    };
    /**
     * 是否显示标识
     *
     * @param {boolean} isShow
     * @param {number} fx 修正x的坐标
     * @param {number} fr 修正node的角度
     * @memberof MJ_Card
     */
    MJ_Card.prototype.showBS = function (isShow, fx, fr) {
        if (fx === void 0) { fx = 1; }
        if (fr === void 0) { fr = 1; }
        if (this.bsNode) {
            this.bsNode.active = isShow;
            if (isShow) {
                this.bsNode.y = Math.abs(this.bsNode.y) * fx;
                this.bsNode.rotation = Math.abs(this.bsNode.rotation) * fr;
            }
        }
    };
    /**
     * 显示牌的光
     *
     * @param {boolean} isShow
     * @memberof MJ_Card
     */
    MJ_Card.prototype.showLight = function (isShow) {
        if (this.light) {
            this.light.active = isShow;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], MJ_Card.prototype, "cardImg", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Card.prototype, "bsNode", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Card.prototype, "light", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Card.prototype, "cardBack", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Card.prototype, "maskNode", void 0);
    MJ_Card = __decorate([
        ccclass
    ], MJ_Card);
    return MJ_Card;
}(cc.Component));
exports.default = MJ_Card;

cc._RF.pop();