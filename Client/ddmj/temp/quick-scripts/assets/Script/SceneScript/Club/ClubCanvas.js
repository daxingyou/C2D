(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Club/ClubCanvas.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '68c7dfYjdlAgYXZPkghLvRN', 'ClubCanvas', __filename);
// Script/SceneScript/Club/ClubCanvas.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Club = /** @class */ (function (_super) {
    __extends(Club, _super);
    function Club() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 自己从来没有加入过任何俱乐部
         *
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_empty = null;
        /**
         * 自己加入或创建的俱乐部列表界面
         *
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_club = null;
        /**
         * 俱乐部信息界面(俱乐部桌子界面)
         *
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_table = null;
        /**
         * 添加成员
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_addMember = null;
        /**
         * 战绩查询
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_record = null;
        /**
         * 俱乐部创建
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_create_club = null;
        /**
         * 申请加入俱乐部
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_join_club = null;
        /**
         * 俱乐部角色信息
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_Club_Role = null;
        /**
         * 成员申请列表
         * @type {cc.Node}
         * @memberof Club
         */
        _this.board_Club_Apply = null;
        /**
         * 名称
         *
         * @type {cc.Label}
         * @memberof Club
         */
        _this.lblName = null;
        /**
         * 房卡
         *
         * @type {cc.Label}
         * @memberof Club
         */
        _this.lblRoomCard = null;
        /**
         * 记录提示
         *
         * @type {cc.Label}
         * @memberof Club
         */
        _this.lblRecordTip = null;
        /**
         * 俱乐部详细界面，成员申请的数量
         * @type {cc.Label}
         * @memberof Club
         */
        _this.lblApplyNum = null;
        /**
         * 头像
         *
         * @type {cc.Sprite}
         * @memberof Club
         */
        _this.headImg = null;
        /**
         * 创建俱乐部的输入名称
         * @type {cc.EditBox}
         * @memberof Club
         */
        _this.edit_club_name = null;
        /**
         * 创建俱乐部的错误提示
         * @type {cc.Label}
         * @memberof Club
         */
        _this.lblCCMsg = null;
        /**
         * 俱乐部列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_club = null;
        /**
         * 俱乐部会员列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_club_member = null;
        /**
         * 俱乐部在线桌子列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_club_table = null;
        /**
         * 俱乐部战绩列表
         *
         * @type {cc.ScrollView}
         * @memberof Club
         */
        _this.svNode_club_record = null;
        /**
         * 角色预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.role_prefab = null;
        /**
         * 商城预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.store_prefab = null;
        /**
         * 俱乐部预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.club_item_prefab = null;
        /**
         * 俱乐部会员预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.club_member_item_prefab = null;
        /**
         * 俱乐部房间预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.club_table_item_prefab = null;
        /**
         * 俱乐部记录预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.club_record_item_prefab = null;
        /**
         * 俱乐部创建房间预设
         *
         * @type {cc.Prefab}
         * @memberof Club
         */
        _this.room_create_prefab = null;
        /**
         * 俱乐部房间的解散按钮的说明，如果是群主就是解散房间按钮 如果是成员则是退出俱乐部
         * @type {cc.Button}
         * @memberof Club
         */
        _this.lbl_disband_or_out = null;
        /**
         * 成员申请的按钮
         * @type {cc.Node}
         * @memberof Club
         */
        _this.btn_apply_join = null;
        /**
         * 邀请成员的按钮
         * @type {cc.Node}
         * @memberof Club
         */
        _this.btn_add_member = null;
        /**
         * 俱乐部房卡开关的图片列表(0=房主开 1=房主关 2=非房主开 3非房主关)
         *
         * @type {cc.SpriteFrame[]}
         * @memberof Club
         */
        _this.club_use_on_off_list = [];
        /**
         * 桌子状态图片列表
         * @type {cc.SpriteFrame[]}
         * @memberof Club
         */
        _this.table_state_list = [];
        /**
         * 显示索引
         *
         * @type {number}
         * @memberof Club
         */
        _this._showIndex = 0;
        /**
         * 俱乐部列表
         *
         * @type {CorpsVoInner}
         * @memberof Club
         */
        _this._clubsList = [];
        /**
         * 俱乐部信息
         *
         * @type {CorpsVoInner}
         * @memberof Club
         */
        _this._clubInfo = null;
        _this._role = null;
        _this._room_create = null;
        /**
         * 推送消息(俱乐部成员添加通知)
         *
         * @memberof Club
         */
        _this.Club_Add_Member_Push = function (event) {
            var data = event.detail;
            if (data.createPlayer && data.createPlayer === dd.ud_manager.mineData.accountId) {
                _this.sendGetClubByClubId(_this._clubInfo.corpsId);
            }
            else {
                _this.sendGetClubs();
            }
        };
        /**
         * 推送消息(俱乐部成员移除通知)
         *
         * @memberof Club
         */
        _this.Club_Kik_Member_Push = function (event) {
            var data = event.detail;
            if (data.createPlayer && data.createPlayer === dd.ud_manager.mineData.accountId) {
                _this.sendGetClubByClubId(_this._clubInfo.corpsId);
            }
            else {
                _this.sendGetClubs();
            }
        };
        /**
         * 推送消息(俱乐部解散通知)
         *
         * @memberof Club
         */
        _this.Club_Destory_Push = function (event) {
            var data = event.detail;
            _this.sendGetClubs();
        };
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
    Club.prototype.onLoad = function () {
        dd.ui_manager.fixIPoneX(this.node);
        this.bindOnEvent();
        this.showInfo();
        this.sendGetClubs();
    };
    Club.prototype.onDestroy = function () {
        this.bindOffEvent();
    };
    Club.prototype.bindOnEvent = function () {
        //推送消息(俱乐部成员添加通知)
        cc.systemEvent.on('Club_Add_Member_Push', this.Club_Add_Member_Push, this);
        //  推送消息(俱乐部成员移除通知)
        cc.systemEvent.on('Club_Kik_Member_Push', this.Club_Kik_Member_Push, this);
        // 推送消息(俱乐部解散通知)
        cc.systemEvent.on('Club_Destory_Push', this.Club_Destory_Push, this);
        cc.systemEvent.on('cb_getProducts', this.cb_getProducts, this);
    };
    Club.prototype.bindOffEvent = function () {
        //推送消息(俱乐部成员添加通知)
        cc.systemEvent.off('Club_Add_Member_Push', this.Club_Add_Member_Push, this);
        //  推送消息(俱乐部成员移除通知)
        cc.systemEvent.off('Club_Kik_Member_Push', this.Club_Kik_Member_Push, this);
        // 推送消息(俱乐部解散通知)
        cc.systemEvent.off('Club_Destory_Push', this.Club_Destory_Push, this);
        cc.systemEvent.off('cb_getProducts', this.cb_getProducts, this);
    };
    Club.prototype.update = function (dt) {
        //刷新房卡
        if (dd.ud_manager && dd.ud_manager.mineData) {
            this.lblName.string = dd.ud_manager.mineData.nick;
            this.lblRoomCard.string = dd.ud_manager.mineData.roomCard + '';
        }
        //如果在俱乐部详细界面
        if (this._showIndex === 2) {
            //红点提示，成员申请数量
            if (dd.ud_manager && dd.ud_manager.hotTip && dd.ud_manager.hotTip[1] && dd.ud_manager.hotTip[1].hotVal > 0) {
                this.lblApplyNum.node.parent.active = true;
                this.lblApplyNum.string = dd.ud_manager.hotTip[1].hotVal;
            }
            else {
                this.lblApplyNum.node.parent.active = false;
            }
        }
    };
    /**
        * 显示基本信息
        *
        * @memberof HomeCanvas
        */
    Club.prototype.showInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headSF, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dd.ud_manager && dd.ud_manager.mineData)) return [3 /*break*/, 5];
                        this.lblName.string = dd.ud_manager.mineData.nick;
                        this.lblRoomCard.string = dd.ud_manager.mineData.roomCard + '';
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
     * 获取俱乐部列表
     *
     * @memberof Room_Join_Club
     */
    Club.prototype.sendGetClubs = function () {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            dd.ws_manager.sendMsg(dd.protocol.CORPS_GET_CORPS_LIST, '', function (flag, content) {
                if (flag === 0) {
                    _this._clubsList = content.items;
                    if (_this._clubsList && _this._clubsList.length > 0) {
                        _this.showClub(1);
                    }
                    else {
                        _this.showClub(0);
                    }
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
    * 根据俱乐部id获取俱乐部信息
    *
    * @memberof Room_Join_Club
    */
    Club.prototype.sendGetClubByClubId = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_GET_CORPS_DETAILED, msg, function (flag, content) {
                if (flag === 0) {
                    var data = content;
                    _this.showClub(2, false);
                    _this.showClubMembers(data.members);
                    _this.showClubTables(data.tables);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
     * 获取俱乐部所有成员
     *
     * @memberof Room_Join_Club
     */
    Club.prototype.sendGetClubMember = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_MEMBER_LIST, msg, function (flag, content) {
                if (flag === 0) {
                    _this.showClubMembers(content.members);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    /**
     * 获取俱乐部战绩列表
     *
     * @memberof Room_Join_Club
     */
    Club.prototype.sendGetClubRecord = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'type': 2, 'query': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_QUERY_RECORD, msg, function (flag, content) {
                if (flag === 0) {
                    _this.showClub(3);
                    _this.showClubRecord(content);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
                dd.ui_manager.hideLoading();
                cc.log(content);
            });
        }
    };
    /**
     * 群主删除战绩
     *
     * @memberof Club
     */
    Club.prototype.sendDeleteRecord = function (tableId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'tableId': tableId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.REPLAY_DELETE_RECORD, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.hideLoading();
                    _this.sendGetClubRecord(_this._clubInfo.corpsId);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 发送使用房卡
     *
     * @param {string} clubId 俱乐部id
     * @param {number} state 使用状态 0关1开
     * @memberof Club
     */
    Club.prototype.sendUseRoomCard = function (clubId, state) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId, 'state': state };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_SET_ROOMCARD_STATE, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.hideLoading();
                    _this.sendGetClubs();
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 解散俱乐部
     *
     * @param {string} clubId
     * @memberof Club
     */
    Club.prototype.sendDestoryClub = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_DESTORY, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.hideLoading();
                    _this.showClub(1);
                    _this.sendGetClubs();
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 退出俱乐部
     *
     * @param {string} clubId
     * @memberof Club
     */
    Club.prototype.sendExitClub = function (clubId) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': clubId };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_EXIT, msg, function (flag, content) {
                if (flag === 0) {
                    dd.ui_manager.hideLoading();
                    _this.showClub(1);
                    _this.sendGetClubs();
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                    dd.ui_manager.hideLoading();
                }
            });
        }
    };
    /**
     * 踢出成员
     *
     * @param {string} clubId
     * @param {string} starNO
     * @memberof Club
     */
    Club.prototype.sendKikMember = function (starNO) {
        var _this = this;
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsId': this._clubInfo.corpsId, 'starNO': starNO };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_KICK_MEMBER, msg, function (flag, content) {
                dd.ui_manager.hideLoading();
                if (flag === 0) {
                    _this.board_Club_Role.active = false;
                    dd.ui_manager.showAlert('请离成功！', '温馨提示', null, null, 1);
                    _this.showClub(2);
                }
                else if (flag === -1) {
                }
                else {
                    dd.ui_manager.showAlert(content, '温馨提示');
                }
            });
        }
    };
    /**
     *
     * 显示俱乐部界面 0没有俱乐部 1俱乐部列表 2俱乐部详情(桌子) 3战绩查询
     * @param {number} index 0没有俱乐部 1俱乐部列表 2俱乐部详情(桌子) 3战绩查询
     * @memberof Club
     */
    Club.prototype.showClub = function (index, isGetData) {
        if (isGetData === void 0) { isGetData = true; }
        if (index === null || index === undefined)
            index = 0;
        this._showIndex = index;
        this.board_empty.active = this._showIndex === 0 ? true : false;
        this.board_club.active = this._showIndex === 1 ? true : false;
        this.board_table.active = this._showIndex === 2 ? true : false;
        this.board_record.active = this._showIndex === 3 ? true : false;
        switch (this._showIndex) {
            case 1:
                this.showClubsList();
                break;
            case 2:
                //如果俱乐部是自己创建的
                if (this._clubInfo.createPlayer === dd.ud_manager.mineData.accountId) {
                    this.lbl_disband_or_out.string = '解散俱乐部';
                    this.btn_apply_join.active = true;
                    this.btn_add_member.active = true;
                }
                else {
                    this.lbl_disband_or_out.string = '退出俱乐部';
                    this.btn_apply_join.active = false;
                    this.btn_add_member.active = false;
                }
                if (isGetData) {
                    this.sendGetClubByClubId(this._clubInfo.corpsId);
                }
                break;
            default:
                break;
        }
    };
    /**
     * 显示俱乐部列表
     *
     * @memberof Club
     */
    Club.prototype.showClubsList = function () {
        var _this = this;
        this.svNode_club.content.removeAllChildren();
        for (var i = 0; i < this._clubsList.length; i++) {
            var club_item = cc.instantiate(this.club_item_prefab);
            var club_script = club_item.getComponent('Club_Item');
            club_script.updateItem(i, this._clubsList[i], function (clubData) {
                _this._clubInfo = clubData;
                _this.sendGetClubByClubId(clubData.corpsId);
            }, this);
            club_item.parent = this.svNode_club.content;
        }
    };
    /**
     *  显示俱乐部信息
     *
     * @memberof Club
     */
    Club.prototype.showClubMembers = function (clubmembers) {
        var _this = this;
        this.svNode_club_member.content.removeAllChildren();
        if (!clubmembers)
            return;
        for (var i = 0; i < clubmembers.length; i++) {
            var club_member_item = cc.instantiate(this.club_member_item_prefab);
            var member_script = club_member_item.getComponent('Club_Member_Item');
            member_script.updateItem(clubmembers[i], this._clubInfo, function (memberInfo) {
                _this.sendGetRoleInfo(memberInfo.starNO, 1);
            }, this);
            club_member_item.parent = this.svNode_club_member.content;
        }
    };
    /**
     *  显示俱乐部桌子信息
     *
     * @memberof Club
     */
    Club.prototype.showClubTables = function (clubtables) {
        var _this = this;
        this.svNode_club_table.content.removeAllChildren();
        if (!clubtables)
            return;
        for (var i = 0; i < clubtables.length; i++) {
            var club_table_item = cc.instantiate(this.club_table_item_prefab);
            var table_script = club_table_item.getComponent('Club_Table_Item.ts');
            table_script.updateItem(clubtables[i], this._clubInfo, function (clubTableData) {
                _this.sendJoinRoom(clubTableData.tableId);
            }, this);
            club_table_item.parent = this.svNode_club_table.content;
        }
    };
    /**
     * 加入房间
     * @param {string} tableId
     * @memberof Club
     */
    Club.prototype.sendJoinRoom = function (tableId) {
        if (dd.ui_manager.showLoading()) {
            var obj = { 'tableId': tableId };
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
                    dd.ui_manager.hideLoading();
                    dd.ui_manager.showAlert(content, '温馨提示', null, null, 1);
                }
            });
        }
    };
    /**
    *  显示俱乐部战绩记录信息
    *
    * @memberof Club
    */
    Club.prototype.showClubRecord = function (clubRecords) {
        this.svNode_club_record.content.removeAllChildren();
        if (!clubRecords)
            return;
        if (clubRecords.items) {
            this.lblRecordTip.node.active = false;
            for (var i = 0; i < clubRecords.items.length; i++) {
                var club_record_item = cc.instantiate(this.club_record_item_prefab);
                var record_script = club_record_item.getComponent('Club_Record_Item');
                record_script.updateItem(i + 1, clubRecords.items[i], this._clubInfo.createPlayer, function (clubData) {
                }, this);
                club_record_item.parent = this.svNode_club_record.content;
            }
        }
        else {
            this.lblRecordTip.node.active = true;
        }
    };
    /**
     *创建俱乐部
     *
     * @memberof Club
     */
    Club.prototype.click_btn_creatClub = function () {
        var _this = this;
        dd.mp_manager.playButton();
        var clubName = this.edit_club_name.string.trim();
        if (clubName === '' || clubName === null || clubName === undefined) {
            this.lblCCMsg.string = '*请输入俱乐部名称';
            return;
        }
        if (dd.ui_manager.showLoading()) {
            var obj = { 'corpsName': clubName };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CORPS_CREATE, msg, function (flag, content) {
                if (flag === 0) {
                    _this._clubsList = content.items;
                    _this.board_create_club.active = false;
                    _this.showClub(1);
                    dd.ui_manager.showAlert('俱乐部创建成功!', '温馨提示', null, null, 1);
                }
                else if (flag === -1) {
                }
                else {
                    // dd.ui_manager.showAlert(content, '温馨提示');
                    _this.lblCCMsg.string = '*' + content;
                }
                dd.ui_manager.hideLoading();
            });
        }
    };
    Club.prototype.click_btn_into_create = function () {
        dd.mp_manager.playButton();
        this.edit_club_name.string = '';
        this.lblCCMsg.string = '';
        this.board_create_club.active = true;
    };
    Club.prototype.click_btn_out_create = function () {
        dd.mp_manager.playButton();
        this.edit_club_name.string = '';
        this.lblCCMsg.string = '';
        this.board_create_club.active = false;
    };
    /**
     * 加入俱乐部
     *
     * @memberof Club
     */
    Club.prototype.click_btn_joinClub = function () {
        dd.mp_manager.playButton();
        this.board_join_club.active = true;
        var jc = this.board_join_club.getComponent('Club_Join');
        jc.showLayer(0);
        // dd.ui_manager.showAlert('请找所在微信群的群主申请加入俱乐部', '加入俱乐部');
    };
    /**
     * 俱乐部详细信息的按钮选择
     *
     * @param {any} event
     * @param {string} type 0俱乐部成员列表 1俱乐部战绩查询
     * @memberof Club
     */
    Club.prototype.click_club_check = function (event, type) {
        dd.mp_manager.playButton();
        switch (type) {
            case '0':// 0俱乐部成员列表 
                this.sendGetClubMember(this._clubInfo.corpsId);
                break;
            case '1':// 1俱乐部战绩查询
                this.sendGetClubRecord(this._clubInfo.corpsId);
                break;
            default:
                break;
        }
    };
    /**
     * 创建俱乐部房间
     * @memberof Club
     */
    Club.prototype.click_club_create_room = function () {
        this.showCreateRoom();
    };
    /**
     *  显示创建房间
     * @memberof HomeCanvas
     */
    Club.prototype.showCreateRoom = function () {
        if (dd.ui_manager.isShowPopup) {
            if (!this._room_create || !this._room_create.isValid) {
                dd.ui_manager.isShowPopup = false;
                dd.mp_manager.playAlert();
                this._room_create = cc.instantiate(this.room_create_prefab);
                this._room_create.parent = this.node;
                dd.ui_manager.hideLoading();
                var room_create_script = this._room_create.getComponent('Room_Create');
                room_create_script.showCreateMode(this._clubInfo.corpsId);
            }
        }
    };
    /**
     * 俱乐部的操作按钮点击事件
     *
     * @memberof Club
     */
    Club.prototype.click_club_deale = function (event, type) {
        var _this = this;
        dd.mp_manager.playButton();
        switch (type) {
            case '0'://解散俱乐部
                var des = '';
                var title = '';
                //如果俱乐部是自己创建的
                if (this._clubInfo.createPlayer === dd.ud_manager.mineData.accountId) {
                    title = '解散俱乐部';
                    des = '是否解散俱乐部 <color=#FF0000>' + this._clubInfo.corpsName + '</c>？<br/>解散后将无法恢复！';
                }
                else {
                    title = '退出俱乐部';
                    des = '是否退出俱乐部 <color=#FF0000>' + this._clubInfo.corpsName + '</c>？<br/>退出后将不能再使用此群主房卡进行游戏！';
                }
                dd.ui_manager.showAlert(des, title, {
                    lbl_name: '确定',
                    callback: function () {
                        //如果俱乐部是自己创建的
                        if (_this._clubInfo.createPlayer === dd.ud_manager.mineData.accountId) {
                            _this.sendDestoryClub(_this._clubInfo.corpsId);
                        }
                        else {
                            _this.sendExitClub(_this._clubInfo.corpsId);
                        }
                    }
                }, {
                    lbl_name: '再想想',
                    callback: function () {
                    }
                }, 1);
                break;
            case '1'://申请成员
                //如果俱乐部是自己创建的
                if (this._clubInfo.createPlayer === dd.ud_manager.mineData.accountId) {
                    this.board_Club_Apply.active = true;
                    var apply_script = this.board_Club_Apply.getComponent('Club_Apply_Join');
                    apply_script.initData(this._clubInfo);
                }
                else {
                    dd.ui_manager.showAlert('您不是俱乐部群主，不能查看！', '温馨提示', null, null, 1);
                }
                break;
            case '2'://添加成员
                this.board_addMember.active = true;
                var am = this.board_addMember.getComponent('Club_Add_Member');
                am.initData(this._clubInfo, this);
                break;
            case '3'://退出俱乐部
                dd.ui_manager.showAlert('退出 <color=#FFFF00>俱乐部' + this._clubInfo.corpsId + '</c><br/>将不能再用此群主房卡进行游戏，<br/>确认退出俱乐部？', '退出俱乐部', {
                    lbl_name: '确定',
                    callback: function () {
                        _this.sendExitClub(_this._clubInfo.corpsId);
                    }
                }, {
                    lbl_name: '再想想',
                    callback: function () {
                    }
                });
                break;
            default:
                break;
        }
    };
    /**
     * 退出按钮
     *
     * @memberof Club
     */
    Club.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        switch (this._showIndex) {
            case 0: {
                if (dd.ui_manager.showLoading()) {
                    cc.director.loadScene('HomeScene');
                }
                break;
            }
            case 1: {
                if (dd.ui_manager.showLoading()) {
                    cc.director.loadScene('HomeScene');
                }
                break;
            }
            case 2: {
                this.sendGetClubs();
                break;
            }
            case 3: {
                this.showClub(2, false);
                break;
            }
            default:
        }
    };
    /**
 * 点击头像，获取玩家信息
 *
 * @memberof HomeCanvas
 */
    Club.prototype.click_btn_head = function () {
        dd.mp_manager.playButton();
        this.sendGetRoleInfo(dd.ud_manager.mineData.starNO);
    };
    /**
     * 获取角色信息
     * @memberof Club
     */
    Club.prototype.sendGetRoleInfo = function (starNO, type) {
        var _this = this;
        if (type === void 0) { type = 0; }
        if (dd.ui_manager.showLoading()) {
            dd.mp_manager.playAlert();
            var obj = { 'starNO': starNO };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_ROLE_STARNO, msg, function (flag, content) {
                if (flag === 0) {
                    var roleInfo = content;
                    if (type === 0) {
                        if (!_this._role || !_this._role.isValid) {
                            _this._role = cc.instantiate(_this.role_prefab);
                            var roleScript = _this._role.getComponent('Role');
                            roleScript.showInfo(roleInfo);
                            _this._role.parent = _this.node;
                        }
                    }
                    else {
                        _this.board_Club_Role.active = true;
                        var club_role = _this.board_Club_Role.getComponent('Club_Role');
                        club_role.showInfo(roleInfo, _this._clubInfo, _this);
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
    };
    /**
     * 点击购买
     *
     * @memberof HomeCanvas
     */
    Club.prototype.click_btn_buy = function () {
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
    Club.prototype.showStore = function (products) {
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
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_empty", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_club", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_table", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_addMember", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_record", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_create_club", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_join_club", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_Club_Role", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "board_Club_Apply", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lblRoomCard", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lblRecordTip", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lblApplyNum", void 0);
    __decorate([
        property(cc.Sprite)
    ], Club.prototype, "headImg", void 0);
    __decorate([
        property(cc.EditBox)
    ], Club.prototype, "edit_club_name", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lblCCMsg", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Club.prototype, "svNode_club", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Club.prototype, "svNode_club_member", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Club.prototype, "svNode_club_table", void 0);
    __decorate([
        property(cc.ScrollView)
    ], Club.prototype, "svNode_club_record", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "role_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "store_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "club_item_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "club_member_item_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "club_table_item_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "club_record_item_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Club.prototype, "room_create_prefab", void 0);
    __decorate([
        property(cc.Label)
    ], Club.prototype, "lbl_disband_or_out", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "btn_apply_join", void 0);
    __decorate([
        property(cc.Node)
    ], Club.prototype, "btn_add_member", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Club.prototype, "club_use_on_off_list", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Club.prototype, "table_state_list", void 0);
    Club = __decorate([
        ccclass
    ], Club);
    return Club;
}(cc.Component));
exports.default = Club;

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
        //# sourceMappingURL=ClubCanvas.js.map
        