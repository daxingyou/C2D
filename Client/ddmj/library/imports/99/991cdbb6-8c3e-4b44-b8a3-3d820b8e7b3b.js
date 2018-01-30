"use strict";
cc._RF.push(module, '991cdu2jD5LRLijPYILjns7', 'MJ_PlayerUI');
// Script/SceneScript/Game/MJ_PlayerUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_PlayerUI = /** @class */ (function (_super) {
    __extends(MJ_PlayerUI, _super);
    function MJ_PlayerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof MJ_PlayerUI
         */
        _this.headImg = null;
        /**
         * 名称
         *
         * @type {cc.Label}
         * @memberof MJ_PlayerUI
         */
        _this.lblName = null;
        /**
         * 分数
         *
         * @type {cc.Label}
         * @memberof MJ_PlayerUI
         */
        _this.lblScore = null;
        /**
         * 庄节点
         *
         * @type {cc.Node}
         * @memberof MJ_PlayerUI
         */
        _this.node_d = null;
        /**
         * 离线节点
         *
         * @type {cc.Node}
         * @memberof MJ_PlayerUI
         */
        _this.node_offLine = null;
        /**
         * 缺花色(1=万,2=筒,3=条)
         *
         * @type {cc.Sprite}
         * @memberof MJ_PlayerUI
         */
        _this.unSuit = null;
        /**
         *玩家信息
         *
         * @type {SeatVo}
         * @memberof MJ_PlayerUI
         */
        _this._seatInfo = null;
        /**
         * canvas脚本
         *
         * @type {MJCanvas}
         * @memberof MJ_PlayerUI
         */
        _this._canvasTarget = null;
        return _this;
    }
    MJ_PlayerUI.prototype.onLoad = function () {
        var _this = this;
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (dd.gm_manager.touchTarget)
                return;
            _this._canvasTarget.showRoleInfo(_this._seatInfo.accountId);
            event.stopPropagation();
        }, this);
    };
    /**
     * 显示信息
     *
     * @memberof MJ_PlayerUI
     */
    MJ_PlayerUI.prototype.showInfo = function (seatInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._seatInfo = seatInfo;
                        if (this._seatInfo.nick.length > 4) {
                            this.lblName.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                        }
                        else {
                            this.lblName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                        }
                        this.lblName.string = this._seatInfo.nick;
                        this.lblScore.string = this._seatInfo.score + '';
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(this._seatInfo.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.headImg.spriteFrame = headSF;
                        //如果座位号是庄家座位号
                        if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.bankerIndex) {
                            this.node_d.active = true;
                        }
                        else {
                            this.node_d.active = false;
                        }
                        //如果玩家的在线状态是 离线
                        if (this._seatInfo.onLine === 0) {
                            this.node_offLine.active = true;
                        }
                        else {
                            this.node_offLine.active = false;
                        }
                        //如果存在打缺 缺花色(1=万,2=筒,3=条)
                        if (this._seatInfo.unSuit > 0 && dd.gm_manager.mjGameData.tableBaseVo.gameState > MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
                            this.unSuit.node.active = true;
                            this.unSuit.spriteFrame = this._canvasTarget.unSuit_list[this._seatInfo.unSuit - 1];
                        }
                        else {
                            this.unSuit.node.active = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Sprite)
    ], MJ_PlayerUI.prototype, "headImg", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_PlayerUI.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], MJ_PlayerUI.prototype, "lblScore", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_PlayerUI.prototype, "node_d", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_PlayerUI.prototype, "node_offLine", void 0);
    __decorate([
        property(cc.Sprite)
    ], MJ_PlayerUI.prototype, "unSuit", void 0);
    MJ_PlayerUI = __decorate([
        ccclass
    ], MJ_PlayerUI);
    return MJ_PlayerUI;
}(cc.Component));
exports.default = MJ_PlayerUI;

cc._RF.pop();