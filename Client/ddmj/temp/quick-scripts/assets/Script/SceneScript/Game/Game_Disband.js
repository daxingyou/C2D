(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Game/Game_Disband.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1894+5iZZCxKQTDI5KRU2S', 'Game_Disband', __filename);
// Script/SceneScript/Game/Game_Disband.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var Game_Disband = /** @class */ (function (_super) {
    __extends(Game_Disband, _super);
    function Game_Disband() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 解散房间的描述
         *
         * @type {cc.Label}
         * @memberof Game_Disband
         */
        _this.lblDes = null;
        /**
         * 解散房间的提示
         *
         * @type {cc.Label}
         * @memberof Game_Disband
         */
        _this.lblTip = null;
        /**
         * 玩家名字列表
         *
         * @type {cc.Label[]}
         * @memberof Game_Disband
         */
        _this.lblNameList = [];
        /**
         * 头像列表
         *
         * @type {cc.Sprite[]}
         * @memberof Game_Disband
         */
        _this.headImgList = [];
        /**
         * 玩家的表态列表
         *
         * @type {[cc.Sprite]}
         * @memberof Game_Disband
         */
        _this.stateList = [];
        /**
         * 玩家的表态图片列表
         *
         * @type {[cc.SpriteFrame]} 0=同意 1=拒绝 2=等待
         * @memberof Game_Disband
         */
        _this.stateImgList = [];
        /**
         * 解散房间倒计时
         *
         * @type {cc.Label}
         * @memberof Game_Disband
         */
        _this.lblTime = null;
        /**
         * 确定按钮
         *
         * @type {cc.Node}
         * @memberof Game_Disband
         */
        _this.btn_ok = null;
        /**
         *
         * 拒绝按钮
         * @type {cc.Node}
         * @memberof Game_Disband
         */
        _this.btn_refuse = null; //拒绝
        /**
         * 倒计时的cd
         *
         * @type {number}
         * @memberof Game_Disband
         */
        _this._cd = 1;
        /**
         * 倒计时
         *
         * @type {number}
         * @memberof Game_Disband
         */
        _this._downTime = 3;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        /**
         * 房间信息获取时间
         *
         * @type {number}
         * @memberof Game_Disband
         */
        _this._rTime = 10;
        return _this;
    }
    Game_Disband.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
    };
    Game_Disband.prototype.initData = function () {
        var creatorSeat = MJ_Help.getSeatById(dd.gm_manager.mjGameData.tableBaseVo.destoryQuestPlayer);
        this.lblDes.string = '玩家【' + creatorSeat.nick + '】申请解散房间，是否同意？';
        this._downTime = MJ_Help.getDiffTime(dd.gm_manager.mjGameData.tableBaseVo.svrTime, dd.gm_manager.mjGameData.tableBaseVo.actTime);
        this.lblTime.string = '倒计时' + this._downTime + 's';
        var btSeats = [];
        var seats = dd.gm_manager.mjGameData.seats;
        for (var i = 0; i < seats.length; i++) {
            if (seats[i] && seats[i].accountId !== '0') {
                //如果这个玩家不是房主
                if (seats[i].accountId !== dd.gm_manager.mjGameData.tableBaseVo.destoryQuestPlayer) {
                    btSeats.push(seats[i]);
                }
                //如果是自己，查看自己是否表态了，要不要显示表态那妞
                if (seats[i].accountId === dd.ud_manager.mineData.accountId) {
                    if (seats[i].btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                        this.btn_ok.active = false;
                        this.btn_refuse.active = false;
                    }
                    else {
                        this.btn_ok.active = true;
                        this.btn_refuse.active = true;
                    }
                }
            }
        }
        for (var i = 0; i < btSeats.length; i++) {
            var state = this.stateList[i];
            state.node.stopAllActions();
            state.node.rotation = 0;
            //如果座位状态已经表态了
            if (btSeats[i].btState !== MJ_Help.MJ_Act_State.ACT_STATE_WAIT) {
                state.spriteFrame = btSeats[i].btState === 1 ? this.stateImgList[0] : this.stateImgList[1];
            }
            else {
                state.spriteFrame = this.stateImgList[2];
                var action = cc.repeatForever(cc.sequence(cc.rotateTo(1, 180), cc.rotateTo(1, 360)));
                state.node.runAction(action);
            }
            this.lblNameList[i].string = btSeats[i].nick;
            this.showHead(i, btSeats[i].headImg);
        }
    };
    Game_Disband.prototype.showHead = function (index, sf) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(sf)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        if (this.headImgList[index]) {
                            this.headImgList[index].spriteFrame = headSF;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击确定
     *
     * @memberof Game_Disband
     */
    Game_Disband.prototype.click_btn_ok = function () {
        dd.mp_manager.playButton();
        this._canvasTarget.sendDisband(2);
    };
    /**
     * 点击拒绝
     *
     * @memberof Game_Disband
     */
    Game_Disband.prototype.click_btn_refuse = function () {
        dd.mp_manager.playButton();
        this._canvasTarget.sendDisband(1);
    };
    /**
     * 获取游戏房间信息，这里用于判断玩家在 房主放出解散房间的请求后，玩家是否已经退出房间，还是数据丢包
     *
     * @memberof Game_Disband
     */
    Game_Disband.prototype.sendGetGameInfo = function () {
        var _this = this;
        var obj = { 'tableId': Number(dd.gm_manager.mjGameData.tableBaseVo.tableId) };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_JOIN, msg, function (flag, content) {
            cc.log('flag=' + flag + ';content=' + content);
            if (flag === 0) {
            }
            else if (flag === -1) {
            }
            else {
                _this._canvasTarget.quitGame();
            }
        });
    };
    /**
     * 界面刷新
     *
     * @param {number} dt
     * @memberof Game_Disband
     */
    Game_Disband.prototype.update = function (dt) {
        if (this._downTime > 0) {
            this._cd -= dt;
            if (this._cd <= 0) {
                this._cd = 1;
                this._downTime--;
                this.lblTime.string = '倒计时' + this._downTime + 's';
                if (this._downTime <= 0) {
                    cc.log('结束倒计时');
                }
            }
        }
        if (!this.btn_ok.active) {
            this._rTime -= dt;
            if (this._rTime < 0) {
                this._rTime = 10;
                this.sendGetGameInfo();
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], Game_Disband.prototype, "lblDes", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Disband.prototype, "lblTip", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Disband.prototype, "lblNameList", void 0);
    __decorate([
        property(cc.Sprite)
    ], Game_Disband.prototype, "headImgList", void 0);
    __decorate([
        property([cc.Sprite])
    ], Game_Disband.prototype, "stateList", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Game_Disband.prototype, "stateImgList", void 0);
    __decorate([
        property(cc.Label)
    ], Game_Disband.prototype, "lblTime", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Disband.prototype, "btn_ok", void 0);
    __decorate([
        property(cc.Node)
    ], Game_Disband.prototype, "btn_refuse", void 0);
    Game_Disband = __decorate([
        ccclass
    ], Game_Disband);
    return Game_Disband;
}(cc.Component));
exports.default = Game_Disband;

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
        //# sourceMappingURL=Game_Disband.js.map
        