(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/Club_Add_Member.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5efcfOPraFEPLSEMj8LwO1j', 'Club_Add_Member', __filename);
// Script/SceneScript/Club/Club_Add_Member.ts

Object.defineProperty(exports, "__esModule", { value: true });
var dd = require("./../../Modules/ModuleManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Club_Add_Member = /** @class */ (function (_super) {
    __extends(Club_Add_Member, _super);
    function Club_Add_Member() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 输入框
         *
         * @type {cc.EditBox}
         * @memberof Club_Add_Member
         */
        _this.edit_starNo = null;
        /**
         * 信息提示
         *
         * @type {cc.Label}
         * @memberof Club_Add_Member
         */
        _this.lblMsg = null;
        _this.node_player = null;
        _this.headImg = null;
        _this.lblName = null;
        _this.lblId = null;
        _this.lblIP = null;
        _this.lblBtnName1 = null;
        _this.lblBtnName2 = null;
        /**
         * 俱乐部信息
         *
         * @type {CorpsVoInner}
         * @memberof Club_Add_Member
         */
        _this._clubInfo = null;
        /**
         * 脚本
         *
         * @memberof Club_Add_Member
         */
        _this._canvasTarget = null;
        _this._roleInfo = null;
        return _this;
    }
    Club_Add_Member.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            _this.node.active = false;
            event.stopPropagation();
        }, this);
        this.lblMsg.string = '';
        this.edit_starNo.string = '';
    };
    Club_Add_Member.prototype.initData = function (clubInfo, target) {
        this._canvasTarget = target;
        this._clubInfo = clubInfo;
        this.showAddLayer(0);
    };
    Club_Add_Member.prototype.showAddLayer = function (type) {
        if (type === void 0) { type = 0; }
        this.edit_starNo.string = '';
        this.lblMsg.string = '';
        if (type === 0) {
            this.edit_starNo.node.active = true;
            this.node_player.active = false;
            this.lblBtnName1.string = '搜索好友';
            this.lblBtnName2.string = '取消搜索';
        }
        else {
            this.edit_starNo.node.active = false;
            this.node_player.active = true;
            this.lblBtnName1.string = '邀请好友';
            this.lblBtnName2.string = '取消邀请';
        }
    };
    /**
     * 显示提示信息
     *
     * @param {number} type
     * @param {string} msg
     * @memberof Club_Add_Member
     */
    Club_Add_Member.prototype.showMsg = function (type, msg) {
        this.lblMsg.node.color = type === 0 ? cc.Color.RED : cc.Color.GREEN;
        this.lblMsg.string = msg;
    };
    /**
     * 添加成员到俱乐部
     *
     * @param {string} starNO
     * @memberof Club
     */
    Club_Add_Member.prototype.sendAddMember = function (starNO) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': this._clubInfo.corpsId, 'starNO': starNO };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_ADD_MEMBER, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this._canvasTarget.showClub(2);
                    _this.showMsg(1, '添加成功，可以添加继续添加下一位');
                }
                else if (flag === -1) {
                }
                else {
                    _this.showMsg(0, content);
                }
            });
        }
    };
    /**
     * 获取玩家信息
     * @param {string} starNode
     * @memberof Club_Add_Member
     */
    Club_Add_Member.prototype.sendGetRoleInfo = function (starNode) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            dd.mp_manager.playAlert();
            var obj = { 'starNO': starNode };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_ROLE_STARNO, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.showAddLayer(1);
                    var roleInfo = content;
                    _this.showHead(roleInfo);
                }
                else if (flag === -1) {
                }
                else {
                    _this.showMsg(0, content);
                }
            });
        }
    };
    Club_Add_Member.prototype.showHead = function (roleInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._roleInfo = roleInfo;
                        this.lblId.string = 'ID:' + roleInfo.starNO;
                        this.lblIP.string = 'IP: ' + roleInfo.clientIP;
                        this.lblName.string = roleInfo.nick;
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(roleInfo.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.headImg.spriteFrame = headSF;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 添加成员
     *
     * @returns
     * @memberof Club_Add_Member
     */
    Club_Add_Member.prototype.click_btn_add = function () {
        dd.mp_manager.playButton();
        if (this.edit_starNo.node.active) {
            var starNO = this.edit_starNo.string.trim();
            if (starNO === '' || starNO.length === 0) {
                this.showMsg(0, '*玩家ID不能为空,请重新输入！');
                return;
            }
            this.sendGetRoleInfo(starNO);
        }
        else {
            if (this._roleInfo) {
                var starNO = this._roleInfo.starNO;
                this.sendAddMember(starNO);
            }
        }
    };
    /**
     * 退出
     *
     * @memberof Club_Add_Member
     */
    Club_Add_Member.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        if (this.edit_starNo.node.active) {
            this.node.active = false;
        }
        else {
            this.showAddLayer(0);
        }
    };
    __decorate([
        property(cc.EditBox)
    ], Club_Add_Member.prototype, "edit_starNo", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblMsg", void 0);
    __decorate([
        property(cc.Node)
    ], Club_Add_Member.prototype, "node_player", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club_Add_Member.prototype, "headImg", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblId", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblIP", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblBtnName1", void 0);
    __decorate([
        property(cc.Label)
    ], Club_Add_Member.prototype, "lblBtnName2", void 0);
    Club_Add_Member = __decorate([
        ccclass
    ], Club_Add_Member);
    return Club_Add_Member;
}(cc.Component));
exports.default = Club_Add_Member;

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
        //# sourceMappingURL=Club_Add_Member.js.map
        