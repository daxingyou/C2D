"use strict";
cc._RF.push(module, '621de6tbhlMiagOthp3YoZh', 'HomeCanvas');
// Script/SceneScript/Home/HomeCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var HomeCanvas = /** @class */ (function (_super) {
    __extends(HomeCanvas, _super);
    function HomeCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 玩家名称
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblName = null;
        /**
         * 房卡数量
         *
         * @type {cc.Label}
         * @memberof HomeCanvas
         */
        _this.lblGems = null;
        /**
         * 微信公众号
         *
         * @type {cc.RichText}
         * @memberof HomeCanvas
         */
        _this.lblwxgzh = null;
        /**
         * 玩家头像
         *
         * @type {cc.Sprite}
         * @memberof HomeCanvas
         */
        _this.headImg = null;
        /**
         * 公告父节点
         *
         * @type {cc.Node}
         * @memberof HomeCanvas
         */
        _this.noticeNode = null;
        /**
         * 公告界面
         * @type {cc.Node}
         * @memberof HomeCanvas
         */
        _this.noticeLayer = null;
        /**
         * 公告内容
         * @type {cc.Node}
         * @memberof HomeCanvas
         */
        _this.lblNoticeCT = null;
        /**
         * 跑马灯节点
         *
         * @type {cc.Node}
         * @memberof HomeCanvas
         */
        _this.msgLayout = null;
        /**
         * 角色信息预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.role_prefab = null;
        /**
         * 设置界面预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.setting_prefab = null;
        /**
         * 认证界面预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.auth_prefab = null;
        /**
         * 手机绑定界面预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.auth_phone_prefab = null;
        /**
         * 战绩界面预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.record_prefab = null;
        /**
         * 创建房间的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.room_create_prefab = null;
        /**
         * 加入普通房间的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.room_join_normal_prefab = null;
        /**
         * 商城的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.store_prefab = null;
        /**
         * 帮助的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.help_prefab = null;
        /**
         * 邮件消息的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.email_prefab = null;
        /**
         * 赠送房卡的预设
         *
         * @type {cc.Prefab}
         * @memberof HomeCanvas
         */
        _this.gift_prefab = null;
        /**
         * 提示列表
         *
         * @type {cc.Node[]}
         * @memberof HomeCanvas
         */
        _this.hotTipList = [];
        /**
         * 实名认证和手机绑定
         *
         * @type {cc.Sprite[]}
         * @memberof HomeCanvas
         */
        _this.imgAuthList = [];
        /**
         * 认证和已认证图片
         *
         * @type {cc.SpriteFrame[]}
         * @memberof HomeCanvas
         */
        _this.auth_on_off = [];
        /**
         * 是否在跑公告
         *
         * @type {boolean}
         * @memberof HomeCanvas
         */
        _this._isRunNotice = false;
        /**
         *
         * 弹框节点
         * @type {cc.Node}
         * @memberof HomeCanvas
         */
        _this._role = null;
        _this._room_create = null;
        _this._room_join = null;
        _this._email = null;
        _this._help = null;
        _this._setting = null;
        _this._auth = null;
        _this._auth_phone = null;
        _this._record = null;
        _this._gift = null;
        /**
         * 获取ios内购列表的回调
         *
         * @memberof HomeCanvas
         */
        _this.cb_getProducts = function (event) {
            if (event.detail) {
                var products = JSON.parse(event.detail);
                _this.showStore(products);
            }
            else {
                dd.ui_manager.showAlert('获取商品信息失败', '错误提示', null, null, 1);
            }
        };
        return _this;
    }
    HomeCanvas.prototype.onLoad = function () {
        dd.ui_manager.fixIPoneX(this.node);
        dd.ui_manager.hideLoading();
        this.showInfo();
        this.showHead();
        cc.systemEvent.on('cb_getProducts', this.cb_getProducts, this);
        cc.systemEvent.on('qyiap', this.qyiap, this);
    };
    HomeCanvas.prototype.qyiap = function () {
        this.showStore();
    };
    HomeCanvas.prototype.onDestroy = function () {
        cc.systemEvent.off('cb_getProducts', this.cb_getProducts, this);
        cc.systemEvent.off('qyiap', this.qyiap, this);
    };
    HomeCanvas.prototype.start = function () {
        //拉回桌子
        if (dd.ud_manager && dd.ud_manager.mineData && dd.ud_manager.mineData.tableId !== 0) {
            if (dd.ui_manager.showLoading('正在重新进入未完成的游戏')) {
                var obj = { 'tableId': dd.ud_manager.mineData.tableId };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.MAJIANG_ROOM_JOIN, msg, function (flag, content) {
                    if (flag === 0) {
                        dd.gm_manager.mjGameData = content;
                        dd.gm_manager.replayMJ = 0;
                        cc.director.loadScene('MJScene');
                    }
                    else if (flag === -1) {
                        dd.ui_manager.hideLoading();
                    }
                    else {
                        dd.ui_manager.showAlert(content, '温馨提示');
                        dd.ui_manager.hideLoading();
                    }
                    cc.log(content);
                });
            }
        }
    };
    /**
     * 界面刷新
     *
     * @param {number} dt
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.update = function (dt) {
        this.checkPos();
        this.showInfo();
    };
    /**
     * 显示基本信息
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.showInfo = function () {
        //刷新玩家信息
        if (dd.ud_manager && dd.ud_manager.mineData) {
            this.lblName.string = dd.ud_manager.mineData.nick;
            this.lblGems.string = dd.ud_manager.mineData.roomCard + '';
            // this.lblwxgzh.string = '微信公众号：<u> 888888 </u>';
            this.lblwxgzh.node.active = false;
            //显示手机和实名认证的状态
            if (dd.ud_manager.mineData.authenticationFlag && dd.ud_manager.mineData.authenticationFlag === 1) {
                this.imgAuthList[0].node.active = true;
                this.imgAuthList[0].spriteFrame = this.auth_on_off[0];
            }
            else {
                this.imgAuthList[0].node.active = false;
            }
            if (dd.ud_manager.mineData.phone && dd.ud_manager.mineData.phone !== '') {
                this.imgAuthList[1].node.active = true;
                this.imgAuthList[1].spriteFrame = this.auth_on_off[1];
            }
            else {
                this.imgAuthList[1].node.active = false;
            }
        }
        //如果存在红点提示
        for (var i = 0; i < this.hotTipList.length; i++) {
            if (dd.ud_manager && dd.ud_manager.hotTip && dd.ud_manager.hotTip[i] && dd.ud_manager.hotTip[i].hotVal === 1) {
                this.hotTipList[i].active = true;
            }
            else {
                this.hotTipList[i].active = false;
            }
        }
    };
    HomeCanvas.prototype.showHead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dd.ud_manager && dd.ud_manager.mineData)) return [3 /*break*/, 5];
                        this.lblName.string = dd.ud_manager.mineData.nick;
                        this.lblGems.string = dd.ud_manager.mineData.roomCard + '';
                        headSF = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dd.img_manager.loadURLImage(dd.ud_manager.mineData.headImg)];
                    case 2:
                        headSF = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        cc.log('获取头像错误');
                        return [3 /*break*/, 4];
                    case 4:
                        this.headImg.spriteFrame = headSF;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新公告显示位置（跑灯效果）
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.checkPos = function () {
        if (this._isRunNotice) {
            var widget = this.msgLayout.getComponent(cc.Widget);
            if (widget.left < 0 && Math.abs(widget.left) >= this.msgLayout.width) {
                this.msgLayout.removeAllChildren();
                widget.left = this.noticeNode.width;
                this._isRunNotice = false;
                this.noticeNode.active = false;
            }
            else {
                widget.left -= 1;
            }
        }
        else {
            if (dd.ud_manager && dd.ud_manager.noticeList && dd.ud_manager.noticeList.length > 0) {
                this.createNotice(dd.ud_manager.noticeList.shift());
            }
            else {
                var np = {
                    content: '抵制不良游戏, 拒绝盗版游戏。 注意自我保护, 谨防受骗上当。 适度游戏益脑, 沉迷游戏伤身。 合理安排时间, 享受健康生活！',
                    type: 2,
                    color: [255, 255, 255]
                };
                var notice = {
                    msgId: '0',
                    contents: [np],
                };
                this.createNotice(notice);
            }
        }
    };
    /**
     * 创建公告消息
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.createNotice = function (data) {
        this.msgLayout.removeAllChildren();
        for (var i = 0; i < data.contents.length; i++) {
            var msgData = data.contents[i];
            var tNode = new cc.Node('notice');
            tNode.color = new cc.Color(msgData.color[0], msgData.color[1], msgData.color[2]);
            var lbl = tNode.addComponent(cc.Label);
            lbl.fontSize = 30;
            lbl.lineHeight = 30;
            lbl.overflow = cc.Label.Overflow.NONE;
            lbl.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            lbl.verticalAlign = cc.Label.VerticalAlign.CENTER;
            lbl.string = msgData.content;
            // lbl.string = '大王叫我来巡山，我来牌馆转一转。胡着我的牌，数着赢的钱，生活充满节奏感。';
            this.msgLayout.addChild(tNode);
        }
        this._isRunNotice = true;
        this.noticeNode.active = true;
    };
    /**
     * 点击头像，获取玩家信息
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_head = function () {
        var _this = this;
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                dd.mp_manager.playAlert();
                var obj = { 'accountId': dd.ud_manager.mineData.accountId };
                var msg = JSON.stringify(obj);
                dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_ROLE_ACCOUNTID, msg, function (flag, content) {
                    if (flag === 0) {
                        var roleInfo = content;
                        if (!_this._role || !_this._role.isValid) {
                            dd.ui_manager.isShowPopup = false;
                            _this._role = cc.instantiate(_this.role_prefab);
                            var roleScript = _this._role.getComponent('Role');
                            roleScript.showInfo(roleInfo);
                            _this._role.parent = _this.node;
                        }
                    }
                    else if (flag === -1) {
                    }
                    else {
                        cc.log(content);
                    }
                    dd.ui_manager.hideLoading();
                });
            }
        }
    };
    /**
     * 点击公告
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_notice = function () {
        this.noticeLayer.active = !this.noticeLayer.active;
        if (this.noticeLayer.active) {
            dd.mp_manager.playAlert();
            var ntNode = this.msgLayout.getChildByName('notice');
            if (ntNode) {
                this.lblNoticeCT.string = ntNode.getComponent(cc.Label).string;
            }
            else {
                this.lblNoticeCT.string = '抵制不良游戏, 拒绝盗版游戏。 注意自我保护, 谨防受骗上当。 适度游戏益脑, 沉迷游戏伤身。 合理安排时间, 享受健康生活！';
            }
        }
    };
    /**
     * 点击购买
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_buy = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                    dd.js_call_native.getProducts(dd.config.productids);
                }
                else {
                    this.showStore();
                }
            }
        }
    };
    /**
     * 显示商城
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.showStore = function (products) {
        var _this = this;
        var store = cc.instantiate(this.store_prefab);
        dd.ws_manager.sendMsg(dd.protocol.MALL_ITEMLIST, '', function (flag, content) {
            dd.ui_manager.hideLoading();
            if (flag === 0) {
                var data = content;
                store.getComponent('Store').init(data.proxyItems, products);
                store.parent = _this.node;
            }
            else if (flag === -1) {
            }
            else {
                dd.ui_manager.showTip(content);
            }
        });
    };
    /**
     * 点击创建房间
     *
     * @param {any} event
     * @param {string} type
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_creatRoom = function (event, type) {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (!this._room_create || !this._room_create.isValid) {
                dd.ui_manager.isShowPopup = false;
                dd.mp_manager.playAlert();
                this._room_create = cc.instantiate(this.room_create_prefab);
                this._room_create.parent = this.node;
                dd.ui_manager.hideLoading();
                var room_create_script = this._room_create.getComponent('Room_Create');
                room_create_script.showCreateMode();
            }
        }
    };
    /**
     * 点击加入房间
     *
     * @param {any} event
     * @param {string} type
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_joinRoom = function (event, type) {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (!this._room_join || !this._room_join.isValid) {
                dd.ui_manager.isShowPopup = false;
                dd.mp_manager.playAlert();
                this._room_join = cc.instantiate(this.room_join_normal_prefab);
                this._room_join.parent = this.node;
            }
        }
    };
    /**
     * 获取俱乐部列表
     *
     * @memberof Room_Join_Club
     */
    HomeCanvas.prototype.sendGetClubs = function (cb) {
        dd.ws_manager.sendMsg(dd.protocol.CORPS_GET_CORPS_LIST, '', function (flag, content) {
            if (flag === 0) {
                var clubsList = content.items;
                if (clubsList && clubsList.length > 0) {
                    if (cb)
                        cb(clubsList);
                }
                else {
                    dd.ui_manager.showAlert('您还没有加入俱乐部,是否前往创建俱乐部？', '温馨提示', {
                        lbl_name: '确定',
                        callback: function () {
                            if (dd.ui_manager.showLoading()) {
                                cc.director.loadScene('ClubScene');
                            }
                        }
                    }, {
                        lbl_name: '取消',
                        callback: function () {
                        }
                    }, 1);
                    dd.ui_manager.hideLoading();
                }
            }
            else if (flag === -1) {
            }
            else {
                dd.ui_manager.showAlert(content, '温馨提示');
                dd.ui_manager.hideLoading();
            }
        });
    };
    /**
     * 点击俱乐部
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_club = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.showLoading()) {
            cc.director.loadScene('ClubScene');
        }
    };
    /**
     * 点击信息
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_email = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._email || !this._email.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._email = cc.instantiate(this.email_prefab);
                    this._email.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击帮助
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_help = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._help || !this._help.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._help = cc.instantiate(this.help_prefab);
                    this._help.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击设置
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_setting = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._setting || !this._setting.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._setting = cc.instantiate(this.setting_prefab);
                    var sets = this._setting.getComponent('Setting');
                    sets.initData(-1);
                    this._setting.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击实名认证
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_realAuth = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._auth || !this._auth.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._auth = cc.instantiate(this.auth_prefab);
                    this._auth.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击手机绑定
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_phoneBind = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._auth_phone || !this._auth_phone.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._auth_phone = cc.instantiate(this.auth_phone_prefab);
                    this._auth_phone.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击战绩
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_record = function () {
        dd.mp_manager.playButton();
        this.showRecord('0');
    };
    /**
     * 显示战绩界面
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.showRecord = function (tableId) {
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._record || !this._record.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._record = cc.instantiate(this.record_prefab);
                    this._record.parent = this.node;
                    if (tableId !== '0') {
                        dd.ui_manager.hideLoading();
                        var recordScript = this._record.getComponent('Record');
                        recordScript.sendGetRecordDetailed(tableId);
                    }
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 赠送房卡
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_gift_room_card = function () {
        dd.mp_manager.playButton();
        if (dd.ui_manager.isShowPopup) {
            if (dd.ui_manager.showLoading()) {
                if (!this._gift || !this._gift.isValid) {
                    dd.ui_manager.isShowPopup = false;
                    dd.mp_manager.playAlert();
                    this._gift = cc.instantiate(this.gift_prefab);
                    this._gift.parent = this.node;
                    dd.ui_manager.hideLoading();
                }
            }
        }
    };
    /**
     * 点击分享按钮
     *
     * @memberof HomeCanvas
     */
    HomeCanvas.prototype.click_btn_share = function () {
        dd.mp_manager.playButton();
        dd.utils.captureScreen(this.node, 'jt.png', function (filePath) {
            if (filePath) {
                dd.ui_manager.showTip('截图成功,开始分享');
                dd.js_call_native.wxShareRecord(filePath);
            }
            else {
                dd.ui_manager.showTip('截图失败!');
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblGems", void 0);
    __decorate([
        property(cc.RichText)
    ], HomeCanvas.prototype, "lblwxgzh", void 0);
    __decorate([
        property(cc.Sprite)
    ], HomeCanvas.prototype, "headImg", void 0);
    __decorate([
        property(cc.Node)
    ], HomeCanvas.prototype, "noticeNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeCanvas.prototype, "noticeLayer", void 0);
    __decorate([
        property(cc.Label)
    ], HomeCanvas.prototype, "lblNoticeCT", void 0);
    __decorate([
        property(cc.Node)
    ], HomeCanvas.prototype, "msgLayout", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "role_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "setting_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "auth_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "auth_phone_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "record_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "room_create_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "room_join_normal_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "store_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "help_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "email_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeCanvas.prototype, "gift_prefab", void 0);
    __decorate([
        property([cc.Node])
    ], HomeCanvas.prototype, "hotTipList", void 0);
    __decorate([
        property([cc.Sprite])
    ], HomeCanvas.prototype, "imgAuthList", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], HomeCanvas.prototype, "auth_on_off", void 0);
    HomeCanvas = __decorate([
        ccclass
    ], HomeCanvas);
    return HomeCanvas;
}(cc.Component));
exports.default = HomeCanvas;

cc._RF.pop();