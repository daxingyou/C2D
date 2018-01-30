(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/Game_Result_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1625ai5d7dBJIWMfWoD729H', 'Game_Result_Item', __filename);
// Script/SceneScript/Game/Game_Result_Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Game_Result_Item = /** @class */ (function (_super) {
    __extends(Game_Result_Item, _super);
    function Game_Result_Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 自己
         *
         * @type {cc.Node}
         * @memberof Game_Result_Item
         */
        _this.node_mine = null;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof Game_Result_Item
         */
        _this.imgHead = null;
        /**
         * 名字
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblName = null;
        /**
         * 玩家id
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblID = null;
        /**
         * 分数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblScore = null;
        /**
         * 自摸次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblZM = null;
        /**
         * 接炮次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblJP = null;
        /**
         * 点炮次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblDP = null;
        /**
         * 暗杠次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblAG = null;
        /**
         * 明杠次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblMG = null;
        /**
         * 查叫次数
         *
         * @type {cc.Label}
         * @memberof Game_Result_Item
         */
        _this.lblCJ = null;
        /**
         * 最佳炮手节点
         *
         * @type {cc.Node}
         * @memberof Game_Result_Item
         */
        _this.node_zjps = null;
        /**
         * 大赢家节点
         *
         * @type {cc.Node}
         * @memberof Game_Result_Item
         */
        _this.node_dyj = null; //大赢家
        _this.node_total_lable = null;
        return _this;
    }
    Game_Result_Item.prototype.onLoad = function () {
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
    };
    /**
     * 刷新item信息
     *
     * @memberof Game_Result_Item
     */
    Game_Result_Item.prototype.updateItem = function (data, maxScore, maxDP) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lblName.string = data.nick;
                        this.lblID.string = 'ID:' + data.starNO;
                        this.lblZM.string = data.zimo + '';
                        this.lblAG.string = data.angang + '';
                        this.lblCJ.string = data.chajiao + '';
                        this.lblDP.string = data.dianPao + '';
                        this.lblJP.string = data.otherHuPai + '';
                        this.lblMG.string = data.mimang + '';
                        if (data.accountId === dd.ud_manager.mineData.accountId) {
                            this.node_mine.active = true;
                        }
                        else {
                            this.node_mine.active = false;
                        }
                        if (maxScore > 0) {
                            this.node_dyj.active = data.score === maxScore ? true : false;
                            this.node_total_lable.active = data.score === maxScore ? false : true;
                            this.lblScore.node.color = data.score === maxScore ? cc.Color.GREEN : cc.color(255, 248, 61);
                        }
                        else {
                            this.node_dyj.active = false;
                            this.node_total_lable.active = true;
                            this.lblScore.node.color = cc.color(255, 248, 61);
                        }
                        if (data.score > 0) {
                            this.lblScore.string = '+' + data.score;
                        }
                        else {
                            this.lblScore.string = data.score + '';
                        }
                        if (maxDP > 0) {
                            this.node_zjps.active = data.dianPao === maxDP ? true : false;
                        }
                        else {
                            this.node_zjps.active = false;
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
    ], Game_Result_Item.prototype, "node_mine", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Result_Item.prototype, "imgHead", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblID", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblScore", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblZM", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblJP", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblDP", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblAG", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblMG", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Result_Item.prototype, "lblCJ", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Result_Item.prototype, "node_zjps", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Result_Item.prototype, "node_dyj", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Result_Item.prototype, "node_total_lable", void 0);
    Game_Result_Item = __decorate([
        ccclass
    ], Game_Result_Item);
    return Game_Result_Item;
}(cc.Component));
exports.default = Game_Result_Item;

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
        //# sourceMappingURL=Game_Result_Item.js.map
        