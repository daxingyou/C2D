require = function e(t, a, o) {
function n(r, s) {
if (!a[r]) {
if (!t[r]) {
var c = "function" == typeof require && require;
if (!s && c) return c(r, !0);
if (i) return i(r, !0);
var l = new Error("Cannot find module '" + r + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var _ = a[r] = {
exports: {}
};
t[r][0].call(_.exports, function(e) {
var a = t[r][1][e];
return n(a || e);
}, _, _.exports, e, t, a, o);
}
return a[r].exports;
}
for (var i = "function" == typeof require && require, r = 0; r < o.length; r++) n(o[r]);
return n;
}({
Alert: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0e217wA2r9EXJaWWdSt/R3f", "Alert");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_msg = null;
t.btn_yes = null;
t.btn_no = null;
t.lbl_yes = null;
t.lbl_no = null;
t.cb_y = null;
t.cb_n = null;
return t;
}
__extends(t, e);
t.prototype.showAlert = function(e, t, a, o, n) {
void 0 === n && (n = 0);
this.lbl_msg.string = e;
a && (this.cb_y = a.callback);
if (o) {
this.btn_no.active = !0;
this.cb_n = o.callback;
} else this.btn_no.active = !1;
switch (n) {
case 0:
this.lbl_msg.horizontalAlign = cc.TextAlignment.LEFT;
break;

case 1:
this.lbl_msg.horizontalAlign = cc.TextAlignment.CENTER;
break;

case 2:
this.lbl_msg.horizontalAlign = cc.TextAlignment.RIGHT;
}
};
t.prototype.click = function(e, t) {
o.mp_manager.playButton();
"yes" === t ? this.cb_y && this.cb_y(e) : this.cb_n && this.cb_n(e);
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ r(cc.RichText) ], t.prototype, "lbl_msg", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_yes", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_no", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_yes", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_no", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../Modules/ModuleManager": "ModuleManager"
} ],
Auth_phone: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "1808c86LVFPMrrEKVn7iEe1", "Auth_phone");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_auth_phone = null;
t.node_bind_phone = null;
t.eb_phone = null;
t.eb_verfi = null;
t.lblVerfi = null;
t.lblMsg = null;
t.lblPhone = null;
t.btn_verfi = null;
t._isDownTime = !1;
t._downTime = 0;
t._cd = 1;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
if (r.ud_manager.mineData.phone && "" !== r.ud_manager.mineData.phone) {
this.lblPhone.string = r.ud_manager.mineData.phone;
this.showAuthPhone(1);
} else this.showAuthPhone(0);
};
t.prototype.update = function(e) {
if (this._isDownTime) {
this._cd -= e;
if (this._cd <= 0) {
this._cd = 1;
this._downTime--;
this.lblVerfi.string = this._downTime + "s";
if (this._downTime < 0) {
this.btn_verfi.interactable = !0;
this.lblVerfi.string = "获取验证码";
}
}
} else {
this.btn_verfi.interactable = !0;
this.lblVerfi.string = "获取验证码";
}
};
t.prototype.showAuthPhone = function(e) {
this._isDownTime = !1;
this.node_auth_phone.active = 0 === e;
this.node_bind_phone.active = 1 === e;
};
t.prototype.sendBindPhone = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var o = {
phone: e,
vaildCode: t
}, n = JSON.stringify(o);
r.ws_manager.sendMsg(r.protocol.REPLAY_PHONE_BIND, n, function(e, t) {
if (0 === e) {
r.ud_manager.mineData.phone = t;
a.lblPhone.string = r.ud_manager.mineData.phone;
a.showAuthPhone(1);
} else -1 === e || (a.lblMsg.string = t);
});
r.ui_manager.hideLoading();
}
};
t.prototype.sendVaildCode = function(e) {
var t = this;
this.btn_verfi.interactable = !1;
this._isDownTime = !0;
this._downTime = 60;
this._cd = 1;
this.lblVerfi.string = this._downTime + "s";
if (r.ui_manager.showLoading()) {
var a = {
phone: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.REPLAY_PHONE_GET_SMSCODE, o, function(e, a) {
0 === e ? r.ud_manager.mineData.phone = a : -1 === e || (t.lblMsg.string = a);
});
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_verfi = function() {
r.mp_manager.playButton();
if (this.btn_verfi.interactable) {
var e = this.eb_phone.string.trim();
"" !== e && 0 !== e.length ? this.checkMobile(e) && this.sendVaildCode(e) : this.showError(0, "*请输入有效的手机号");
}
};
t.prototype.checkMobile = function(e) {
if (!/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(e)) {
this.showError(0, "*请输入有效的手机号");
return !1;
}
return !0;
};
t.prototype.showError = function(e, t) {
this.lblMsg.node.opacity = 255;
this.lblMsg.string = t;
var a = 0 === e ? this.eb_phone.node.parent.getPosition() : this.eb_verfi.node.parent.getPosition();
this.lblMsg.node.setPositionY(a.y - 50);
var o = cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function(e, t) {
e.opacity = 255;
e.getComponent(cc.Label).string = "";
}, this));
this.lblMsg.node.runAction(o);
};
t.prototype.click_btn_bind = function() {
r.mp_manager.playButton();
var e = this.eb_phone.string.trim(), t = this.eb_verfi.string.trim();
"" !== e && 0 !== e.length ? "" !== t ? this.sendBindPhone(e, t) : this.showError(1, "*请输入验证码") : this.showError(0, "*请输入有效的手机号");
};
t.prototype.click_btn_alBind = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.Node) ], t.prototype, "node_auth_phone", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_bind_phone", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "eb_phone", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "eb_verfi", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblVerfi", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblMsg", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblPhone", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_verfi", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Auth: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "1586dsTyW9Dd4DpvV9XI5wK", "Auth");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblMsg = null;
t.eb_name = null;
t.eb_id = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
this.lblMsg.string = "";
r.ud_manager.mineData.authenticationFlag && 1 === r.ud_manager.mineData.authenticationFlag ? this.showMsg(1, "您已经实名认证过了哦！") : this.showMsg(0, "", 0);
};
t.prototype.sendAuth = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var o = {
name: e,
cardId: t
}, n = JSON.stringify(o);
r.ws_manager.sendMsg(r.protocol.REPLAY_REALNAME_AUTHENTICATION, n, function(e, t) {
if (0 === e) {
r.ud_manager.mineData.authenticationFlag = 1;
a.showMsg(1, "实名认证成功！");
} else -1 === e || cc.log(t);
});
r.ui_manager.hideLoading();
}
};
t.prototype.showMsg = function(e, t, a) {
void 0 === a && (a = 0);
this.lblMsg.node.opacity = 255;
this.lblMsg.node.stopAllActions();
this.eb_name.node.parent.active = 0 === e;
this.eb_id.node.parent.active = 0 === e;
this.lblMsg.string = t;
this.lblMsg.node.color = 0 === e ? cc.Color.RED : cc.Color.WHITE;
this.lblMsg.fontSize = 0 === e ? 30 : 40;
if (0 === e) {
this.lblMsg.node.setAnchorPoint(0, .5);
this.lblMsg.node.setPositionX(-120);
var o = 0 === a ? this.eb_name.node.parent.getPosition() : this.eb_id.node.parent.getPosition();
this.lblMsg.node.setPositionY(o.y - 50);
var n = cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function(e, t) {
e.opacity = 255;
e.getComponent(cc.Label).string = "";
}, this));
this.lblMsg.node.runAction(n);
} else {
this.lblMsg.node.setAnchorPoint(.5, .5);
this.lblMsg.node.setPosition(cc.p(0, 30));
}
};
t.prototype.click_btn_auth = function() {
r.mp_manager.playButton();
if (r.ud_manager.mineData.authenticationFlag && 1 === r.ud_manager.mineData.authenticationFlag) {
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
} else {
var e = this.eb_name.string.trim(), t = this.eb_id.string.trim();
if ("" === e || 0 === e.length) {
this.showMsg(0, "*姓名不能为空,请重新输入！", 0);
return;
}
if ("" === t || 18 !== t.length) {
this.showMsg(0, "*请输入有效的身份证号码！", 1);
return;
}
this.sendAuth(e, t);
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.Label) ], t.prototype, "lblMsg", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "eb_name", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "eb_id", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
ClubCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "68c7dfYjdlAgYXZPkghLvRN", "ClubCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.board_empty = null;
t.board_club = null;
t.board_table = null;
t.board_addMember = null;
t.board_record = null;
t.board_create_club = null;
t.board_join_club = null;
t.board_Club_Role = null;
t.board_Club_Apply = null;
t.lblName = null;
t.lblRoomCard = null;
t.lblRecordTip = null;
t.lblApplyNum = null;
t.headImg = null;
t.edit_club_name = null;
t.lblCCMsg = null;
t.svNode_club = null;
t.svNode_club_member = null;
t.svNode_club_table = null;
t.svNode_club_record = null;
t.role_prefab = null;
t.store_prefab = null;
t.club_item_prefab = null;
t.club_member_item_prefab = null;
t.club_table_item_prefab = null;
t.club_record_item_prefab = null;
t.room_create_prefab = null;
t.lbl_disband_or_out = null;
t.btn_apply_join = null;
t.btn_add_member = null;
t.club_use_on_off_list = [];
t.table_state_list = [];
t._showIndex = 0;
t._clubsList = [];
t._clubInfo = null;
t._role = null;
t._room_create = null;
t.Club_Add_Member_Push = function(e) {
var a = e.detail;
a.createPlayer && a.createPlayer === r.ud_manager.mineData.accountId ? t.sendGetClubByClubId(t._clubInfo.corpsId) : t.sendGetClubs();
};
t.Club_Kik_Member_Push = function(e) {
var a = e.detail;
a.createPlayer && a.createPlayer === r.ud_manager.mineData.accountId ? t.sendGetClubByClubId(t._clubInfo.corpsId) : t.sendGetClubs();
};
t.Club_Destory_Push = function(e) {
e.detail;
t.sendGetClubs();
};
t.cb_getProducts = function(e) {
if (e.detail) {
var a = JSON.parse(e.detail);
t.showStore(a);
} else r.ui_manager.showAlert("获取商品信息失败", "错误提示", null, null, 1);
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
r.ui_manager.fixIPoneX(this.node);
this.bindOnEvent();
this.showInfo();
this.sendGetClubs();
};
t.prototype.onDestroy = function() {
this.bindOffEvent();
};
t.prototype.bindOnEvent = function() {
cc.systemEvent.on("Club_Add_Member_Push", this.Club_Add_Member_Push, this);
cc.systemEvent.on("Club_Kik_Member_Push", this.Club_Kik_Member_Push, this);
cc.systemEvent.on("Club_Destory_Push", this.Club_Destory_Push, this);
cc.systemEvent.on("cb_getProducts", this.cb_getProducts, this);
};
t.prototype.bindOffEvent = function() {
cc.systemEvent.off("Club_Add_Member_Push", this.Club_Add_Member_Push, this);
cc.systemEvent.off("Club_Kik_Member_Push", this.Club_Kik_Member_Push, this);
cc.systemEvent.off("Club_Destory_Push", this.Club_Destory_Push, this);
cc.systemEvent.off("cb_getProducts", this.cb_getProducts, this);
};
t.prototype.update = function(e) {
if (r.ud_manager && r.ud_manager.mineData) {
this.lblName.string = r.ud_manager.mineData.nick;
this.lblRoomCard.string = r.ud_manager.mineData.roomCard + "";
}
if (2 === this._showIndex) if (r.ud_manager && r.ud_manager.hotTip && r.ud_manager.hotTip[1] && r.ud_manager.hotTip[1].hotVal > 0) {
this.lblApplyNum.node.parent.active = !0;
this.lblApplyNum.string = r.ud_manager.hotTip[1].hotVal;
} else this.lblApplyNum.node.parent.active = !1;
};
t.prototype.showInfo = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t;
return __generator(this, function(a) {
switch (a.label) {
case 0:
if (!r.ud_manager || !r.ud_manager.mineData) return [ 3, 5 ];
this.lblName.string = r.ud_manager.mineData.nick;
this.lblRoomCard.string = r.ud_manager.mineData.roomCard + "";
e = null;
a.label = 1;

case 1:
a.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(r.ud_manager.mineData.headImg) ];

case 2:
e = a.sent();
return [ 3, 4 ];

case 3:
t = a.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = e;
a.label = 5;

case 5:
return [ 2 ];
}
});
});
};
t.prototype.sendGetClubs = function() {
var e = this;
r.ui_manager.showLoading() && r.ws_manager.sendMsg(r.protocol.CORPS_GET_CORPS_LIST, "", function(t, a) {
if (0 === t) {
e._clubsList = a.items;
e._clubsList && e._clubsList.length > 0 ? e.showClub(1) : e.showClub(0);
} else -1 === t || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
});
};
t.prototype.sendGetClubByClubId = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_GET_CORPS_DETAILED, o, function(e, a) {
if (0 === e) {
var o = a;
t.showClub(2, !1);
t.showClubMembers(o.members);
t.showClubTables(o.tables);
} else -1 === e || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
});
}
};
t.prototype.sendGetClubMember = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_MEMBER_LIST, o, function(e, a) {
0 === e ? t.showClubMembers(a.members) : -1 === e || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
});
}
};
t.prototype.sendGetClubRecord = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
type: 2,
query: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.REPLAY_QUERY_RECORD, o, function(e, a) {
if (0 === e) {
t.showClub(3);
t.showClubRecord(a);
} else -1 === e || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
cc.log(a);
});
}
};
t.prototype.sendDeleteRecord = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
tableId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.REPLAY_DELETE_RECORD, o, function(e, a) {
if (0 === e) {
r.ui_manager.hideLoading();
t.sendGetClubRecord(t._clubInfo.corpsId);
} else if (-1 === e) ; else {
r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
}
});
}
};
t.prototype.sendUseRoomCard = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var o = {
corpsId: e,
state: t
}, n = JSON.stringify(o);
r.ws_manager.sendMsg(r.protocol.CORPS_SET_ROOMCARD_STATE, n, function(e, t) {
if (0 === e) {
r.ui_manager.hideLoading();
a.sendGetClubs();
} else if (-1 === e) ; else {
r.ui_manager.showAlert(t, "温馨提示");
r.ui_manager.hideLoading();
}
});
}
};
t.prototype.sendDestoryClub = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_DESTORY, o, function(e, a) {
if (0 === e) {
r.ui_manager.hideLoading();
t.showClub(1);
t.sendGetClubs();
} else if (-1 === e) ; else {
r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
}
});
}
};
t.prototype.sendExitClub = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_EXIT, o, function(e, a) {
if (0 === e) {
r.ui_manager.hideLoading();
t.showClub(1);
t.sendGetClubs();
} else if (-1 === e) ; else {
r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
}
});
}
};
t.prototype.sendKikMember = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: this._clubInfo.corpsId,
starNO: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_KICK_MEMBER, o, function(e, a) {
r.ui_manager.hideLoading();
if (0 === e) {
t.board_Club_Role.active = !1;
r.ui_manager.showAlert("请离成功！", "温馨提示", null, null, 1);
t.showClub(2);
} else -1 === e || r.ui_manager.showAlert(a, "温馨提示");
});
}
};
t.prototype.showClub = function(e, t) {
void 0 === t && (t = !0);
null !== e && void 0 !== e || (e = 0);
this._showIndex = e;
this.board_empty.active = 0 === this._showIndex;
this.board_club.active = 1 === this._showIndex;
this.board_table.active = 2 === this._showIndex;
this.board_record.active = 3 === this._showIndex;
switch (this._showIndex) {
case 1:
this.showClubsList();
break;

case 2:
if (this._clubInfo.createPlayer === r.ud_manager.mineData.accountId) {
this.lbl_disband_or_out.string = "解散俱乐部";
this.btn_apply_join.active = !0;
this.btn_add_member.active = !0;
} else {
this.lbl_disband_or_out.string = "退出俱乐部";
this.btn_apply_join.active = !1;
this.btn_add_member.active = !1;
}
t && this.sendGetClubByClubId(this._clubInfo.corpsId);
}
};
t.prototype.showClubsList = function() {
var e = this;
this.svNode_club.content.removeAllChildren();
for (var t = 0; t < this._clubsList.length; t++) {
var a = cc.instantiate(this.club_item_prefab);
a.getComponent("Club_Item").updateItem(t, this._clubsList[t], function(t) {
e._clubInfo = t;
e.sendGetClubByClubId(t.corpsId);
}, this);
a.parent = this.svNode_club.content;
}
};
t.prototype.showClubMembers = function(e) {
var t = this;
this.svNode_club_member.content.removeAllChildren();
if (e) for (var a = 0; a < e.length; a++) {
var o = cc.instantiate(this.club_member_item_prefab);
o.getComponent("Club_Member_Item").updateItem(e[a], this._clubInfo, function(e) {
t.sendGetRoleInfo(e.starNO, 1);
}, this);
o.parent = this.svNode_club_member.content;
}
};
t.prototype.showClubTables = function(e) {
var t = this;
this.svNode_club_table.content.removeAllChildren();
if (e) for (var a = 0; a < e.length; a++) {
var o = cc.instantiate(this.club_table_item_prefab);
o.getComponent("Club_Table_Item.ts").updateItem(e[a], this._clubInfo, function(e) {
t.sendJoinRoom(e.tableId);
}, this);
o.parent = this.svNode_club_table.content;
}
};
t.prototype.sendJoinRoom = function(e) {
if (r.ui_manager.showLoading()) {
var t = {
tableId: e
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.MAJIANG_ROOM_JOIN, a, function(e, t) {
if (0 === e) {
r.gm_manager.mjGameData = t;
r.gm_manager.replayMJ = 0;
cc.director.loadScene("MJScene");
} else if (-1 === e) r.ui_manager.hideLoading(); else {
r.ui_manager.hideLoading();
r.ui_manager.showAlert(t, "温馨提示", null, null, 1);
}
});
}
};
t.prototype.showClubRecord = function(e) {
this.svNode_club_record.content.removeAllChildren();
if (e) if (e.items) {
this.lblRecordTip.node.active = !1;
for (var t = 0; t < e.items.length; t++) {
var a = cc.instantiate(this.club_record_item_prefab);
a.getComponent("Club_Record_Item").updateItem(t + 1, e.items[t], this._clubInfo.createPlayer, function(e) {}, this);
a.parent = this.svNode_club_record.content;
}
} else this.lblRecordTip.node.active = !0;
};
t.prototype.click_btn_creatClub = function() {
var e = this;
r.mp_manager.playButton();
var t = this.edit_club_name.string.trim();
if ("" !== t && null !== t && void 0 !== t) {
if (r.ui_manager.showLoading()) {
var a = {
corpsName: t
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_CREATE, o, function(t, a) {
if (0 === t) {
e._clubsList = a.items;
e.board_create_club.active = !1;
e.showClub(1);
r.ui_manager.showAlert("俱乐部创建成功!", "温馨提示", null, null, 1);
} else -1 === t || (e.lblCCMsg.string = "*" + a);
r.ui_manager.hideLoading();
});
}
} else this.lblCCMsg.string = "*请输入俱乐部名称";
};
t.prototype.click_btn_into_create = function() {
r.mp_manager.playButton();
this.edit_club_name.string = "";
this.lblCCMsg.string = "";
this.board_create_club.active = !0;
};
t.prototype.click_btn_out_create = function() {
r.mp_manager.playButton();
this.edit_club_name.string = "";
this.lblCCMsg.string = "";
this.board_create_club.active = !1;
};
t.prototype.click_btn_joinClub = function() {
r.mp_manager.playButton();
this.board_join_club.active = !0;
this.board_join_club.getComponent("Club_Join").showLayer(0);
};
t.prototype.click_club_check = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "0":
this.sendGetClubMember(this._clubInfo.corpsId);
break;

case "1":
this.sendGetClubRecord(this._clubInfo.corpsId);
}
};
t.prototype.click_club_create_room = function() {
this.showCreateRoom();
};
t.prototype.showCreateRoom = function() {
if (r.ui_manager.isShowPopup && (!this._room_create || !this._room_create.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._room_create = cc.instantiate(this.room_create_prefab);
this._room_create.parent = this.node;
r.ui_manager.hideLoading();
this._room_create.getComponent("Room_Create").showCreateMode(this._clubInfo.corpsId);
}
};
t.prototype.click_club_deale = function(e, t) {
var a = this;
r.mp_manager.playButton();
switch (t) {
case "0":
var o = "", n = "";
if (this._clubInfo.createPlayer === r.ud_manager.mineData.accountId) {
n = "解散俱乐部";
o = "是否解散俱乐部 <color=#FF0000>" + this._clubInfo.corpsName + "</c>？<br/>解散后将无法恢复！";
} else {
n = "退出俱乐部";
o = "是否退出俱乐部 <color=#FF0000>" + this._clubInfo.corpsName + "</c>？<br/>退出后将不能再使用此群主房卡进行游戏！";
}
r.ui_manager.showAlert(o, n, {
lbl_name: "确定",
callback: function() {
a._clubInfo.createPlayer === r.ud_manager.mineData.accountId ? a.sendDestoryClub(a._clubInfo.corpsId) : a.sendExitClub(a._clubInfo.corpsId);
}
}, {
lbl_name: "再想想",
callback: function() {}
}, 1);
break;

case "1":
if (this._clubInfo.createPlayer === r.ud_manager.mineData.accountId) {
this.board_Club_Apply.active = !0;
this.board_Club_Apply.getComponent("Club_Apply_Join").initData(this._clubInfo);
} else r.ui_manager.showAlert("您不是俱乐部群主，不能查看！", "温馨提示", null, null, 1);
break;

case "2":
this.board_addMember.active = !0;
this.board_addMember.getComponent("Club_Add_Member").initData(this._clubInfo, this);
break;

case "3":
r.ui_manager.showAlert("退出 <color=#FFFF00>俱乐部" + this._clubInfo.corpsId + "</c><br/>将不能再用此群主房卡进行游戏，<br/>确认退出俱乐部？", "退出俱乐部", {
lbl_name: "确定",
callback: function() {
a.sendExitClub(a._clubInfo.corpsId);
}
}, {
lbl_name: "再想想",
callback: function() {}
});
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
switch (this._showIndex) {
case 0:
case 1:
r.ui_manager.showLoading() && cc.director.loadScene("HomeScene");
break;

case 2:
this.sendGetClubs();
break;

case 3:
this.showClub(2, !1);
}
};
t.prototype.click_btn_head = function() {
r.mp_manager.playButton();
this.sendGetRoleInfo(r.ud_manager.mineData.starNO);
};
t.prototype.sendGetRoleInfo = function(e, t) {
var a = this;
void 0 === t && (t = 0);
if (r.ui_manager.showLoading()) {
r.mp_manager.playAlert();
var o = {
starNO: e
}, n = JSON.stringify(o);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_ROLE_STARNO, n, function(e, o) {
if (0 === e) {
var n = o;
if (0 === t) {
if (!a._role || !a._role.isValid) {
a._role = cc.instantiate(a.role_prefab);
a._role.getComponent("Role").showInfo(n);
a._role.parent = a.node;
}
} else {
a.board_Club_Role.active = !0;
a.board_Club_Role.getComponent("Club_Role").showInfo(n, a._clubInfo, a);
}
} else -1 === e || cc.log(o);
r.ui_manager.hideLoading();
});
}
};
t.prototype.click_btn_buy = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? r.js_call_native.getProducts(r.config.productids) : this.showStore());
};
t.prototype.showStore = function(e) {
var t = this, a = cc.instantiate(this.store_prefab);
r.ws_manager.sendMsg(r.protocol.MALL_ITEMLIST, "", function(o, n) {
r.ui_manager.hideLoading();
if (0 === o) {
var i = n;
a.getComponent("Store").init(i.proxyItems, e);
a.parent = t.node;
} else -1 === o || r.ui_manager.showTip(n);
});
};
__decorate([ i(cc.Node) ], t.prototype, "board_empty", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_club", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_table", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_addMember", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_record", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_create_club", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_join_club", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_Club_Role", void 0);
__decorate([ i(cc.Node) ], t.prototype, "board_Club_Apply", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRoomCard", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRecordTip", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblApplyNum", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_club_name", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblCCMsg", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_club", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_club_member", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_club_table", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_club_record", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "role_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "store_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "club_item_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "club_member_item_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "club_table_item_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "club_record_item_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_create_prefab", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_disband_or_out", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_apply_join", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_add_member", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "club_use_on_off_list", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "table_state_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Add_Member: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "5efcfOPraFEPLSEMj8LwO1j", "Club_Add_Member");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.edit_starNo = null;
t.lblMsg = null;
t.node_player = null;
t.headImg = null;
t.lblName = null;
t.lblId = null;
t.lblIP = null;
t.lblBtnName1 = null;
t.lblBtnName2 = null;
t._clubInfo = null;
t._canvasTarget = null;
t._roleInfo = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e.node.active = !1;
t.stopPropagation();
}, this);
this.lblMsg.string = "";
this.edit_starNo.string = "";
};
t.prototype.initData = function(e, t) {
this._canvasTarget = t;
this._clubInfo = e;
this.showAddLayer(0);
};
t.prototype.showAddLayer = function(e) {
void 0 === e && (e = 0);
this.edit_starNo.string = "";
this.lblMsg.string = "";
if (0 === e) {
this.edit_starNo.node.active = !0;
this.node_player.active = !1;
this.lblBtnName1.string = "搜索好友";
this.lblBtnName2.string = "取消搜索";
} else {
this.edit_starNo.node.active = !1;
this.node_player.active = !0;
this.lblBtnName1.string = "邀请好友";
this.lblBtnName2.string = "取消邀请";
}
};
t.prototype.showMsg = function(e, t) {
this.lblMsg.node.color = 0 === e ? cc.Color.RED : cc.Color.GREEN;
this.lblMsg.string = t;
};
t.prototype.sendAddMember = function(e) {
var t = this;
if (o.ui_manager.showLoading()) {
var a = {
corpsId: this._clubInfo.corpsId,
starNO: e
}, n = JSON.stringify(a);
o.ws_manager.sendMsg(o.protocol.CORPS_ADD_MEMBER, n, function(e, a) {
o.ui_manager.hideLoading();
if (0 === e) {
t._canvasTarget.showClub(2);
t.showMsg(1, "添加成功，可以添加继续添加下一位");
} else -1 === e || t.showMsg(0, a);
});
}
};
t.prototype.sendGetRoleInfo = function(e) {
var t = this;
if (o.ui_manager.showLoading()) {
o.mp_manager.playAlert();
var a = {
starNO: e
}, n = JSON.stringify(a);
o.ws_manager.sendMsg(o.protocol.ACCOUNT_ROLE_STARNO, n, function(e, a) {
o.ui_manager.hideLoading();
if (0 === e) {
t.showAddLayer(1);
var n = a;
t.showHead(n);
} else -1 === e || t.showMsg(0, a);
});
}
};
t.prototype.showHead = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t, a;
return __generator(this, function(n) {
switch (n.label) {
case 0:
this._roleInfo = e;
this.lblId.string = "ID:" + e.starNO;
this.lblIP.string = "IP: " + e.clientIP;
this.lblName.string = e.nick;
t = null;
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, o.img_manager.loadURLImage(e.headImg) ];

case 2:
t = n.sent();
return [ 3, 4 ];

case 3:
a = n.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = t;
return [ 2 ];
}
});
});
};
t.prototype.click_btn_add = function() {
o.mp_manager.playButton();
if (this.edit_starNo.node.active) {
if ("" === (e = this.edit_starNo.string.trim()) || 0 === e.length) {
this.showMsg(0, "*玩家ID不能为空,请重新输入！");
return;
}
this.sendGetRoleInfo(e);
} else if (this._roleInfo) {
var e = this._roleInfo.starNO;
this.sendAddMember(e);
}
};
t.prototype.click_btn_out = function() {
o.mp_manager.playButton();
this.edit_starNo.node.active ? this.node.active = !1 : this.showAddLayer(0);
};
__decorate([ r(cc.EditBox) ], t.prototype, "edit_starNo", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblMsg", void 0);
__decorate([ r(cc.Node) ], t.prototype, "node_player", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblId", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblIP", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblBtnName1", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblBtnName2", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Apply_Join_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "330daND3iZC5L0J9mwFOTlM", "Club_Apply_Join_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.headImg = null;
t._roleInfo = null;
t._canvasScript = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.updateItem = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, o;
return __generator(this, function(n) {
switch (n.label) {
case 0:
this._roleInfo = e;
this._canvasScript = t;
this.lblName.string = e.nick;
a = null;
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(e.headImg) ];

case 2:
a = n.sent();
return [ 3, 4 ];

case 3:
o = n.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = a;
return [ 2 ];
}
});
});
};
t.prototype.click_btn_refuse = function() {
r.mp_manager.playButton();
this._canvasScript.sendApplyAnwser(this._roleInfo.starNO, 0);
};
t.prototype.click_btn_agree = function() {
r.mp_manager.playButton();
this._canvasScript.sendApplyAnwser(this._roleInfo.starNO, 1);
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Apply_Join: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "2d2cdz/tFpPNrbLof433eqy", "Club_Apply_Join");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblTip = null;
t.svNode_apply = null;
t.apply_prefab = null;
t._clubInfo = null;
t._applyList = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e.node.active = !1;
t.stopPropagation();
}, this);
};
t.prototype.initData = function(e) {
this._clubInfo = e;
this.sendGetApplyInfo();
};
t.prototype.sendGetApplyInfo = function() {
var e = this;
if (r.ui_manager.showLoading()) {
var t = {
corpsId: this._clubInfo.corpsId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.CORPS_GET_QUESTJOIN_LIST, a, function(t, a) {
r.ui_manager.hideLoading();
0 === t ? e.showApplyList(a) : -1 === t || r.ui_manager.showAlert(a, "温馨提示");
});
}
};
t.prototype.sendApplyAnwser = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var o = {
corpsId: this._clubInfo.corpsId,
starNO: e,
bt: t
}, n = JSON.stringify(o);
r.ws_manager.sendMsg(r.protocol.CORPS_QUEST_JOIN_BT, n, function(e, t) {
r.ui_manager.hideLoading();
0 === e ? a.sendGetApplyInfo() : -1 === e || r.ui_manager.showAlert(t, "温馨提示");
});
}
};
t.prototype.showApplyList = function(e) {
this.svNode_apply.content.removeAllChildren();
if (e && e.items) {
this._applyList = e.items;
this.lblTip.node.active = !1;
for (var t = 0; t < e.items.length; t++) {
var a = cc.instantiate(this.apply_prefab);
a.parent = this.svNode_apply.content;
a.getComponent("Club_Apply_Join_Item").updateItem(e.items[t], this);
}
} else this.lblTip.node.active = !0;
};
t.prototype.click_btn_refuseAll = function() {
r.mp_manager.playButton();
0 !== this._applyList.length && this.sendApplyAnwser("0", 0);
};
t.prototype.click_btn_agreeAll = function() {
r.mp_manager.playButton();
0 !== this._applyList.length && this.sendApplyAnwser("0", 1);
};
__decorate([ i(cc.Label) ], t.prototype, "lblTip", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_apply", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "apply_prefab", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "dad2cJkro1M/qyu19BWKI+4", "Club_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_odd = null;
t.lblClubName = null;
t.lblClubId = null;
t.lblClubNum = null;
t.lblClubMoney = null;
t.img_use = null;
t.btn_use = null;
t._itemData = null;
t._cb = null;
t._target = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
o.mp_manager.playButton();
e._cb && e._cb(e._itemData);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a, n) {
this._itemData = t;
this._cb = a;
this._target = n;
this.lblClubName.string = t.corpsName;
this.lblClubId.string = "ID:" + t.corpsId;
this.lblClubNum.string = t.memberNum + "";
this.lblClubMoney.string = t.roomCard + "";
this.node_odd.active = e % 2 == 0;
if (t.createPlayer === o.ud_manager.mineData.accountId) {
this.btn_use.node.active = !0;
this.img_use.spriteFrame = 0 === t.state ? this._target.club_use_on_off_list[1] : this._target.club_use_on_off_list[0];
} else {
this.btn_use.node.active = !1;
this.img_use.spriteFrame = 0 === t.state ? this._target.club_use_on_off_list[3] : this._target.club_use_on_off_list[2];
}
};
t.prototype.click_check_use = function() {
var e = this;
o.mp_manager.playButton();
if (1 === this._itemData.state) o.ui_manager.showAlert("关闭后此群不在消耗房卡，<br/>群成员将不能再创建房间，<br/>是否关闭？", "解散俱乐部", {
lbl_name: "是",
callback: function() {
e._target.sendUseRoomCard(e._itemData.corpsId, 0);
e.img_use.spriteFrame = e._target.club_use_on_off_list[1];
}
}, {
lbl_name: "否",
callback: function() {
e.img_use.spriteFrame = e._target.club_use_on_off_list[0];
}
}, 1); else {
this._target.sendUseRoomCard(this._itemData.corpsId, 1);
this.img_use.spriteFrame = this._target.club_use_on_off_list[0];
}
};
__decorate([ r(cc.Node) ], t.prototype, "node_odd", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblClubName", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblClubId", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblClubNum", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblClubMoney", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "img_use", void 0);
__decorate([ r(cc.Button) ], t.prototype, "btn_use", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Join: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "79d64lupYFIarEc9yEY2CzC", "Club_Join");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.edit_clubId = null;
t.node_club_info = null;
t.lblClubName = null;
t.lblClubNum = null;
t.lblErr = null;
t.lblBtnName1 = null;
t.lblBtnName2 = null;
t._clubInfo = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e.node.active = !1;
t.stopPropagation();
}, this);
this.showLayer(0);
};
t.prototype.showLayer = function(e) {
this.edit_clubId.string = "";
this.lblErr.string = "";
this.edit_clubId.node.active = 0 === e;
this.node_club_info.active = 1 === e;
this.lblBtnName1.string = 0 === e ? "搜索俱乐部" : "确认加入";
this.lblBtnName2.string = 0 === e ? "取消搜索" : "取消加入";
};
t.prototype.sendGetClubByClubId = function(e) {
var t = this;
if (r.ui_manager.showLoading()) {
var a = {
corpsId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.CORPS_GET_CORPS_DETAILED, o, function(e, a) {
r.ui_manager.hideLoading();
if (0 === e) {
var o = a;
if (o) {
t._clubInfo = o;
t.showLayer(1);
t.showClubInfo(o);
}
} else -1 === e || (t.lblErr.string = "*" + a);
});
}
};
t.prototype.sendJoinClub = function() {
var e = this;
if (r.ui_manager.showLoading()) {
var t = {
corpsId: this._clubInfo.corpsId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.CORPS_QUEST_JOIN, a, function(t, a) {
r.ui_manager.hideLoading();
if (0 === t) {
r.ui_manager.showTip("已提交您的申请");
e.node.active = !1;
} else -1 === t || r.ui_manager.showAlert(a, "温馨提示");
});
}
};
t.prototype.showClubInfo = function(e) {
this.lblClubName.string = e.corpsName;
e.members ? this.lblClubNum.string = e.members.length + "" : this.lblClubNum.string = "0";
};
t.prototype.click_btn_ok = function() {
r.mp_manager.playButton();
if (this.node_club_info.active) this.sendJoinClub(); else {
var e = this.edit_clubId.string.trim();
if ("" === e) {
this.lblErr.string = "*请输入俱乐部ID";
return;
}
this.sendGetClubByClubId(e);
}
};
t.prototype.click_btn_cancel = function() {
r.mp_manager.playButton();
this.node_club_info.active ? this.showLayer(0) : this.node.active = !1;
};
__decorate([ i(cc.EditBox) ], t.prototype, "edit_clubId", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_club_info", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblClubName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblClubNum", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblErr", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblBtnName1", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblBtnName2", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Member_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a9cf2AXXYxMJa/e5bHv+FWf", "Club_Member_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblState = null;
t.headImg = null;
t.toggle_online = null;
t._itemData = null;
t._cb = null;
t._target = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e._cb && e._cb(e._itemData);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a, o) {
this._itemData = e;
this._cb = a;
this._target = o;
this.lblName.string = e.nick;
this.showHead();
switch (e.state) {
case 0:
this.lblState.string = "";
this.lblState.node.color = cc.Color.WHITE;
this.toggle_online.isChecked = !1;
break;

case 1:
this.lblState.string = "[空闲]";
this.lblState.node.color = cc.Color.GRAY;
this.toggle_online.isChecked = !0;
break;

case 2:
this.lblState.string = "[落座中]";
this.lblState.node.color = cc.Color.RED;
this.toggle_online.isChecked = !0;
}
};
t.prototype.showHead = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t;
return __generator(this, function(a) {
switch (a.label) {
case 0:
e = null;
a.label = 1;

case 1:
a.trys.push([ 1, 3, , 4 ]);
return [ 4, o.img_manager.loadURLImage(this._itemData.headImg) ];

case 2:
e = a.sent();
return [ 3, 4 ];

case 3:
t = a.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = e;
return [ 2 ];
}
});
});
};
t.prototype.click_btn_delete = function() {
var e = this;
o.mp_manager.playButton();
o.ui_manager.showAlert("确定移除成员 <color=#FFFF00>" + this._itemData.starNO + "</c>？", "移除成员", {
lbl_name: "确定",
callback: function() {
e._target.sendKikMember(e._itemData.starNO);
}
}, {
lbl_name: "再想想",
callback: function() {}
}, 1);
};
__decorate([ r(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblState", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ r(cc.Toggle) ], t.prototype, "toggle_online", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Record_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "55e25clAIZCa6pS4paUyfPV", "Club_Record_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblIndex = null;
t.lblRoomId = null;
t.lblGameTime = null;
t.node_delete = null;
t.node_win_list = [];
t.lblNameList = [];
t.lblScoreList = [];
t._itemData = null;
t._cb = null;
t._target = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e._cb && e._cb(e._itemData);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a, n, i) {
this._itemData = t;
this._cb = n;
this._target = i;
this.lblIndex.string = e + "";
this.lblGameTime.string = "对战时间:  " + o.utils.getDateStringByTimestamp(t.recordTime, 3);
this.lblRoomId.string = "房间号:" + t.tableId;
for (var r = 0, s = t.seats[0].score, c = 0; c < this.lblNameList.length; c++) {
this.node_win_list[c].active = !1;
this.lblScoreList[c].node.color = cc.Color.WHITE;
if (t.seats[c]) {
this.lblNameList[c].node.active = !0;
this.lblNameList[c].string = t.seats[c].nick;
this.lblScoreList[c].string = t.seats[c].score + "";
if (t.seats[c].score > s) {
s = t.seats[c].score;
r = c;
}
t.seats[c].nick === o.ud_manager.mineData.nick && (this.lblScoreList[c].node.color = cc.color(77, 203, 235));
} else this.lblNameList[c].node.active = !1;
}
if (this.node_win_list[r]) {
this.node_win_list[r].active = !0;
this.lblScoreList[r].node.color = cc.color(245, 152, 92);
}
this.node_delete && (a === o.ud_manager.mineData.accountId ? this.node_delete.active = !0 : this.node_delete.active = !1);
};
t.prototype.click_btn_delete = function() {
var e = this;
o.mp_manager.playButton();
o.ui_manager.showAlert("确定删除当前战绩？", "战绩删除", {
lbl_name: "确定",
callback: function() {
e._target.sendDeleteRecord(e._itemData.tableId);
}
}, {
lbl_name: "再想想",
callback: function() {}
}, 1);
};
__decorate([ r(cc.Label) ], t.prototype, "lblIndex", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblRoomId", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblGameTime", void 0);
__decorate([ r(cc.Node) ], t.prototype, "node_delete", void 0);
__decorate([ r([ cc.Node ]) ], t.prototype, "node_win_list", void 0);
__decorate([ r([ cc.Label ]) ], t.prototype, "lblNameList", void 0);
__decorate([ r([ cc.Label ]) ], t.prototype, "lblScoreList", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Club_Role: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3ac55+Jw75NJYdnNb/o250u", "Club_Role");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblIP = null;
t.lblID = null;
t.headImg = null;
t.sexImg = null;
t.btn_kike = null;
t.sex_img = [];
t._roleInfo = null;
t._canvasScript = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e.node.active = !1;
t.stopPropagation();
}, this);
};
t.prototype.showInfo = function(e, t, a) {
return __awaiter(this, void 0, void 0, function() {
var o, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
this._roleInfo = e;
this._canvasScript = a;
this.lblName.string = e.nick;
this.lblIP.string = "IP: " + e.clientIP;
this.lblID.string = "ID: " + e.starNO;
t.createPlayer === r.ud_manager.mineData.accountId ? e.starNO === r.ud_manager.mineData.starNO ? this.btn_kike.node.active = !1 : this.btn_kike.node.active = !0 : this.btn_kike.node.active = !1;
if (e.sex > 0) {
this.sexImg.node.active = !0;
this.sexImg.spriteFrame = this.sex_img[e.sex - 1];
} else this.sexImg.node.active = !1;
o = null;
i.label = 1;

case 1:
i.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(e.headImg) ];

case 2:
o = i.sent();
return [ 3, 4 ];

case 3:
n = i.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = o;
return [ 2 ];
}
});
});
};
t.prototype.click_btn_kike = function() {
r.mp_manager.playButton();
this._canvasScript.sendKikMember(this._roleInfo.starNO);
};
t.prototype.click_btn_cancel = function() {
r.mp_manager.playButton();
this.node.active = !1;
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblIP", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblID", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "sexImg", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_kike", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "sex_img", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
"Club_Table_Item.ts": [ function(e, t, a) {
"use strict";
cc._RF.push(t, "f1a98gzsohGCIGc3Dad77CE", "Club_Table_Item.ts");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.img_state = null;
t.headImg_list = [];
t.lblGameNum = null;
t._itemData = null;
t._cb = null;
t._target = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e._cb && e._cb(e._itemData);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a, o) {
this._itemData = e;
this._cb = a;
this._target = o;
this.showInfo();
};
t.prototype.showInfo = function() {
for (var e = 0, t = 0; t < this.headImg_list.length; t++) {
var a = this._itemData.seats[t];
if (a && a.accountId && "" !== a.accountId && "0" !== a.accountId) {
e++;
this.showHead(t, a);
} else this.headImg_list[t].node.active = !1;
}
if (e >= this.headImg_list.length) {
this.lblGameNum.string = "8/10局";
this.img_state.spriteFrame = this._target.table_state_list[0];
} else {
this.lblGameNum.string = "";
this.img_state.spriteFrame = this._target.table_state_list[1];
}
};
t.prototype.showHead = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
a = null;
i.label = 1;

case 1:
i.trys.push([ 1, 3, , 4 ]);
return [ 4, o.img_manager.loadURLImage(t.headImg) ];

case 2:
a = i.sent();
return [ 3, 4 ];

case 3:
n = i.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
if (this.headImg_list[e]) {
this.headImg_list[e].node.active = !0;
this.headImg_list[e].spriteFrame = a;
}
return [ 2 ];
}
});
});
};
__decorate([ r(cc.Sprite) ], t.prototype, "img_state", void 0);
__decorate([ r([ cc.Sprite ]) ], t.prototype, "headImg_list", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblGameNum", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Config: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "412fdxUBotE+77s8BLjRTsP", "Config");
Object.defineProperty(a, "__esModule", {
value: !0
});
a.checkUrl = "http://118.31.66.39:8080/checkVer?ver=";
a.wsUrl = "ws://ws.wolfsgame.com:40000";
a.replayUrl = "http://118.31.66.39:8080/file/";
a.app_id = "wx19e1237d774e5763";
a.secret = "57ff16852f286c0e571f375b425269d0";
a.voice_id = "1126068785";
a.voice_key = "d926363c87ed6be99a87b11b41c42c91";
a.voiceState = -1;
a.wxState = -1;
a.productids = "p1,p2,p3";
a.cd = null;
cc._RF.pop();
}, {} ],
DDLabel: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3bed5gzdJJOp4bcF1JmtgdK", "DDLabel");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = (o.property, function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl = null;
t.vaule = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.lbl = this.node.getComponent(cc.Label);
};
t.prototype.update = function(e) {
if (this.lbl && this.vaule !== this.lbl.string) {
var t = 0;
this.vaule = "";
for (var a = 0; a < this.lbl.string.length; a++) {
this.lbl.string.charCodeAt(a) > 255 ? t += 2 : t += 1;
if (t > 8) break;
this.vaule += this.lbl.string.charAt(a);
}
this.lbl.string = this.vaule;
}
};
return t = __decorate([ n ], t);
}(cc.Component));
a.default = i;
cc._RF.pop();
}, {} ],
ENCManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "4de7eegGClHGbky1ypxfNWX", "ENCManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.RotateLeft = function(e, t) {
return e << t | e >>> 32 - t;
};
e.prototype.AddUnsigned = function(e, t) {
var a, o, n, i, r;
n = 2147483648 & e;
i = 2147483648 & t;
r = (1073741823 & e) + (1073741823 & t);
return (a = 1073741824 & e) & (o = 1073741824 & t) ? 2147483648 ^ r ^ n ^ i : a | o ? 1073741824 & r ? 3221225472 ^ r ^ n ^ i : 1073741824 ^ r ^ n ^ i : r ^ n ^ i;
};
e.prototype.F = function(e, t, a) {
return e & t | ~e & a;
};
e.prototype.G = function(e, t, a) {
return e & a | t & ~a;
};
e.prototype.H = function(e, t, a) {
return e ^ t ^ a;
};
e.prototype.I = function(e, t, a) {
return t ^ (e | ~a);
};
e.prototype.FF = function(e, t, a, o, n, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.F(t, a, o), n), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.GG = function(e, t, a, o, n, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.G(t, a, o), n), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.HH = function(e, t, a, o, n, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.H(t, a, o), n), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.II = function(e, t, a, o, n, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.I(t, a, o), n), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.ConvertToWordArray = function(e) {
for (var t, a = e.length, o = a + 8, n = 16 * ((o - o % 64) / 64 + 1), i = Array(n - 1), r = 0, s = 0; s < a; ) {
r = s % 4 * 8;
i[t = (s - s % 4) / 4] = i[t] | e.charCodeAt(s) << r;
s++;
}
r = s % 4 * 8;
i[t = (s - s % 4) / 4] = i[t] | 128 << r;
i[n - 2] = a << 3;
i[n - 1] = a >>> 29;
return i;
};
e.prototype.WordToHex = function(e) {
var t, a = "", o = "";
for (t = 0; t <= 3; t++) a += (o = "0" + (e >>> 8 * t & 255).toString(16)).substr(o.length - 2, 2);
return a;
};
e.prototype.Utf8Encode = function(e) {
e = e.replace(/\r\n/g, "\n");
for (var t = "", a = 0; a < e.length; a++) {
var o = e.charCodeAt(a);
if (o < 128) t += String.fromCharCode(o); else if (o > 127 && o < 2048) {
t += String.fromCharCode(o >> 6 | 192);
t += String.fromCharCode(63 & o | 128);
} else {
t += String.fromCharCode(o >> 12 | 224);
t += String.fromCharCode(o >> 6 & 63 | 128);
t += String.fromCharCode(63 & o | 128);
}
}
return t;
};
e.prototype.Utf8Decode = function(e) {
for (var t = "", a = 0, o = 0, n = 0, i = 0; a < e.length; ) if ((o = e.charCodeAt(a)) < 128) {
t += String.fromCharCode(o);
a++;
} else if (o > 191 && o < 224) {
n = e.charCodeAt(a + 1);
t += String.fromCharCode((31 & o) << 6 | 63 & n);
a += 2;
} else {
n = e.charCodeAt(a + 1);
i = e.charCodeAt(a + 2);
t += String.fromCharCode((15 & o) << 12 | (63 & n) << 6 | 63 & i);
a += 3;
}
return t;
};
e.prototype.base64Encode = function(e) {
var t, a, o, n, i, r, s, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = "", _ = 0;
e = this.Utf8Encode(e);
for (;_ < e.length; ) {
n = (t = e.charCodeAt(_++)) >> 2;
i = (3 & t) << 4 | (a = e.charCodeAt(_++)) >> 4;
r = (15 & a) << 2 | (o = e.charCodeAt(_++)) >> 6;
s = 63 & o;
isNaN(a) ? r = s = 64 : isNaN(o) && (s = 64);
l = l + c.charAt(n) + c.charAt(i) + c.charAt(r) + c.charAt(s);
}
return l;
};
e.prototype.base64Decode = function(e) {
var t, a, o, n, i, r, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", l = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;l < e.length; ) {
t = s.indexOf(e.charAt(l++)) << 2 | (n = s.indexOf(e.charAt(l++))) >> 4;
a = (15 & n) << 4 | (i = s.indexOf(e.charAt(l++))) >> 2;
o = (3 & i) << 6 | (r = s.indexOf(e.charAt(l++)));
c += String.fromCharCode(t);
64 != i && (c += String.fromCharCode(a));
64 != r && (c += String.fromCharCode(o));
}
return c = this.Utf8Decode(c);
};
e.prototype.MD5 = function(e) {
var t, a, o, n, i, r, s, c, l, _ = Array();
e = this.Utf8Encode(e);
_ = this.ConvertToWordArray(e);
r = 1732584193;
s = 4023233417;
c = 2562383102;
l = 271733878;
for (t = 0; t < _.length; t += 16) {
a = r;
o = s;
n = c;
i = l;
r = this.FF(r, s, c, l, _[t + 0], 7, 3614090360);
l = this.FF(l, r, s, c, _[t + 1], 12, 3905402710);
c = this.FF(c, l, r, s, _[t + 2], 17, 606105819);
s = this.FF(s, c, l, r, _[t + 3], 22, 3250441966);
r = this.FF(r, s, c, l, _[t + 4], 7, 4118548399);
l = this.FF(l, r, s, c, _[t + 5], 12, 1200080426);
c = this.FF(c, l, r, s, _[t + 6], 17, 2821735955);
s = this.FF(s, c, l, r, _[t + 7], 22, 4249261313);
r = this.FF(r, s, c, l, _[t + 8], 7, 1770035416);
l = this.FF(l, r, s, c, _[t + 9], 12, 2336552879);
c = this.FF(c, l, r, s, _[t + 10], 17, 4294925233);
s = this.FF(s, c, l, r, _[t + 11], 22, 2304563134);
r = this.FF(r, s, c, l, _[t + 12], 7, 1804603682);
l = this.FF(l, r, s, c, _[t + 13], 12, 4254626195);
c = this.FF(c, l, r, s, _[t + 14], 17, 2792965006);
s = this.FF(s, c, l, r, _[t + 15], 22, 1236535329);
r = this.GG(r, s, c, l, _[t + 1], 5, 4129170786);
l = this.GG(l, r, s, c, _[t + 6], 9, 3225465664);
c = this.GG(c, l, r, s, _[t + 11], 14, 643717713);
s = this.GG(s, c, l, r, _[t + 0], 20, 3921069994);
r = this.GG(r, s, c, l, _[t + 5], 5, 3593408605);
l = this.GG(l, r, s, c, _[t + 10], 9, 38016083);
c = this.GG(c, l, r, s, _[t + 15], 14, 3634488961);
s = this.GG(s, c, l, r, _[t + 4], 20, 3889429448);
r = this.GG(r, s, c, l, _[t + 9], 5, 568446438);
l = this.GG(l, r, s, c, _[t + 14], 9, 3275163606);
c = this.GG(c, l, r, s, _[t + 3], 14, 4107603335);
s = this.GG(s, c, l, r, _[t + 8], 20, 1163531501);
r = this.GG(r, s, c, l, _[t + 13], 5, 2850285829);
l = this.GG(l, r, s, c, _[t + 2], 9, 4243563512);
c = this.GG(c, l, r, s, _[t + 7], 14, 1735328473);
s = this.GG(s, c, l, r, _[t + 12], 20, 2368359562);
r = this.HH(r, s, c, l, _[t + 5], 4, 4294588738);
l = this.HH(l, r, s, c, _[t + 8], 11, 2272392833);
c = this.HH(c, l, r, s, _[t + 11], 16, 1839030562);
s = this.HH(s, c, l, r, _[t + 14], 23, 4259657740);
r = this.HH(r, s, c, l, _[t + 1], 4, 2763975236);
l = this.HH(l, r, s, c, _[t + 4], 11, 1272893353);
c = this.HH(c, l, r, s, _[t + 7], 16, 4139469664);
s = this.HH(s, c, l, r, _[t + 10], 23, 3200236656);
r = this.HH(r, s, c, l, _[t + 13], 4, 681279174);
l = this.HH(l, r, s, c, _[t + 0], 11, 3936430074);
c = this.HH(c, l, r, s, _[t + 3], 16, 3572445317);
s = this.HH(s, c, l, r, _[t + 6], 23, 76029189);
r = this.HH(r, s, c, l, _[t + 9], 4, 3654602809);
l = this.HH(l, r, s, c, _[t + 12], 11, 3873151461);
c = this.HH(c, l, r, s, _[t + 15], 16, 530742520);
s = this.HH(s, c, l, r, _[t + 2], 23, 3299628645);
r = this.II(r, s, c, l, _[t + 0], 6, 4096336452);
l = this.II(l, r, s, c, _[t + 7], 10, 1126891415);
c = this.II(c, l, r, s, _[t + 14], 15, 2878612391);
s = this.II(s, c, l, r, _[t + 5], 21, 4237533241);
r = this.II(r, s, c, l, _[t + 12], 6, 1700485571);
l = this.II(l, r, s, c, _[t + 3], 10, 2399980690);
c = this.II(c, l, r, s, _[t + 10], 15, 4293915773);
s = this.II(s, c, l, r, _[t + 1], 21, 2240044497);
r = this.II(r, s, c, l, _[t + 8], 6, 1873313359);
l = this.II(l, r, s, c, _[t + 15], 10, 4264355552);
c = this.II(c, l, r, s, _[t + 6], 15, 2734768916);
s = this.II(s, c, l, r, _[t + 13], 21, 1309151649);
r = this.II(r, s, c, l, _[t + 4], 6, 4149444226);
l = this.II(l, r, s, c, _[t + 11], 10, 3174756917);
c = this.II(c, l, r, s, _[t + 2], 15, 718787259);
s = this.II(s, c, l, r, _[t + 9], 21, 3951481745);
r = this.AddUnsigned(r, a);
s = this.AddUnsigned(s, o);
c = this.AddUnsigned(c, n);
l = this.AddUnsigned(l, i);
}
return (this.WordToHex(r) + this.WordToHex(s) + this.WordToHex(c) + this.WordToHex(l)).toLowerCase();
};
e.prototype.destroySelf = function() {
e._instance = null;
};
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {} ],
GMManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "41db4+tdAtIK5q4TJjeppQl", "GMManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = function() {
function e() {
this.mjGameData = null;
this.replayMJ = 0;
this.touchTarget = null;
this.replayDataList = [];
this.isReplayPause = !1;
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.destroySelf = function() {
this.mjGameData = null;
this.replayMJ = 0;
this.replayDataList.length = 0;
this.isReplayPause = !1;
this.touchTarget = null;
};
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {} ],
Game_Chat_Show: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "daa73Z6OapHxrFjJpUTo5zI", "Game_Chat_Show");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nodeChat = null;
t.lblChat = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.showChat = function(e, t) {
this.nodeChat.string = e;
this.lblChat.string = e;
this.lblChat.node.scaleX = t;
};
__decorate([ i(cc.Label) ], t.prototype, "nodeChat", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblChat", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Game_Chat: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a6d56Q7wY9FiLDwBfzPm7yx", "Game_Chat");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.chat_info = null;
t.svNode = null;
t.bqNode = null;
t.toggle_chat = null;
t.toggle_bq = null;
t._bqList = [];
t._canvasTarget = null;
t.click_quickInfo = function(e) {
o.mp_manager.playButton();
var a = e.currentTarget;
cc.log(a.tag);
t._canvasTarget.sendChatInfo(0, a.tag);
t.exitChat();
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this._canvasTarget = o.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.node.on("touchend", function(t) {
e.exitChat();
t.stopPropagation();
}, this);
this.initData();
this.showChatLayer(0);
this.bindEvent();
};
t.prototype.exitChat = function() {
this.node.active = !1;
};
t.prototype.initData = function() {
for (var e = o.mp_manager.quicklyList, t = 0; t < e.length; t++) {
var a = e[t];
if (0 === t) {
this.chat_info.tag = a.id;
this.chat_info.getComponent(cc.Label).string = a.msg;
this.chat_info.on(cc.Node.EventType.TOUCH_END, this.click_quickInfo, this);
} else {
var n = cc.instantiate(this.chat_info);
n.tag = a.id;
n.getComponent(cc.Label).string = a.msg;
n.parent = this.svNode.content;
n.on(cc.Node.EventType.TOUCH_END, this.click_quickInfo, this);
}
}
};
t.prototype.bindEvent = function() {
for (var e = this, t = this.bqNode.content.childrenCount, a = this, o = 0; o < t; o++) !function() {
var t = "biaoqing_" + (o + 1), n = cc.find(t, a.bqNode.content);
n.tag = o;
n && n.on(cc.Node.EventType.TOUCH_END, function() {
e._canvasTarget.sendChatInfo(1, n.tag);
e.exitChat();
}, a);
}();
};
t.prototype.showChatLayer = function(e) {
this.svNode.node.active = 0 === e;
this.bqNode.node.active = 0 !== e;
this.toggle_chat.isChecked = 0 === e;
this.toggle_bq.isChecked = 0 !== e;
};
t.prototype.click_btn_chat = function(e, t) {
o.mp_manager.playButton();
this.svNode.node.active = "0" === t;
this.bqNode.node.active = "0" !== t;
};
__decorate([ r(cc.Node) ], t.prototype, "chat_info", void 0);
__decorate([ r(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ r(cc.ScrollView) ], t.prototype, "bqNode", void 0);
__decorate([ r(cc.Toggle) ], t.prototype, "toggle_chat", void 0);
__decorate([ r(cc.Toggle) ], t.prototype, "toggle_bq", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Game_Disband: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "e1894+5iZZCxKQTDI5KRU2S", "Game_Disband");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = e("./MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblDes = null;
t.lblTip = null;
t.lblNameList = [];
t.headImgList = [];
t.stateList = [];
t.stateImgList = [];
t.lblTime = null;
t.btn_ok = null;
t.btn_refuse = null;
t._cd = 1;
t._downTime = 3;
t._canvasTarget = null;
t._rTime = 10;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = o.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
};
t.prototype.initData = function() {
var e = s.getSeatById(o.gm_manager.mjGameData.tableBaseVo.destoryQuestPlayer);
this.lblDes.string = "玩家【" + e.nick + "】申请解散房间，是否同意？";
this._downTime = s.getDiffTime(o.gm_manager.mjGameData.tableBaseVo.svrTime, o.gm_manager.mjGameData.tableBaseVo.actTime);
this.lblTime.string = "倒计时" + this._downTime + "s";
for (var t = [], a = o.gm_manager.mjGameData.seats, n = 0; n < a.length; n++) if (a[n] && "0" !== a[n].accountId) {
a[n].accountId !== o.gm_manager.mjGameData.tableBaseVo.destoryQuestPlayer && t.push(a[n]);
if (a[n].accountId === o.ud_manager.mineData.accountId) if (a[n].btState !== s.MJ_Act_State.ACT_STATE_WAIT) {
this.btn_ok.active = !1;
this.btn_refuse.active = !1;
} else {
this.btn_ok.active = !0;
this.btn_refuse.active = !0;
}
}
for (n = 0; n < t.length; n++) {
var i = this.stateList[n];
i.node.stopAllActions();
i.node.rotation = 0;
if (t[n].btState !== s.MJ_Act_State.ACT_STATE_WAIT) i.spriteFrame = 1 === t[n].btState ? this.stateImgList[0] : this.stateImgList[1]; else {
i.spriteFrame = this.stateImgList[2];
var r = cc.repeatForever(cc.sequence(cc.rotateTo(1, 180), cc.rotateTo(1, 360)));
i.node.runAction(r);
}
this.lblNameList[n].string = t[n].nick;
this.showHead(n, t[n].headImg);
}
};
t.prototype.showHead = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
a = null;
i.label = 1;

case 1:
i.trys.push([ 1, 3, , 4 ]);
return [ 4, o.img_manager.loadURLImage(t) ];

case 2:
a = i.sent();
return [ 3, 4 ];

case 3:
n = i.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImgList[e] && (this.headImgList[e].spriteFrame = a);
return [ 2 ];
}
});
});
};
t.prototype.click_btn_ok = function() {
o.mp_manager.playButton();
this._canvasTarget.sendDisband(2);
};
t.prototype.click_btn_refuse = function() {
o.mp_manager.playButton();
this._canvasTarget.sendDisband(1);
};
t.prototype.sendGetGameInfo = function() {
var e = this, t = {
tableId: Number(o.gm_manager.mjGameData.tableBaseVo.tableId)
}, a = JSON.stringify(t);
o.ws_manager.sendMsg(o.protocol.MAJIANG_ROOM_JOIN, a, function(t, a) {
cc.log("flag=" + t + ";content=" + a);
0 === t || -1 === t || e._canvasTarget.quitGame();
});
};
t.prototype.update = function(e) {
if (this._downTime > 0) {
this._cd -= e;
if (this._cd <= 0) {
this._cd = 1;
this._downTime--;
this.lblTime.string = "倒计时" + this._downTime + "s";
this._downTime <= 0 && cc.log("结束倒计时");
}
}
if (!this.btn_ok.active) {
this._rTime -= e;
if (this._rTime < 0) {
this._rTime = 10;
this.sendGetGameInfo();
}
}
};
__decorate([ r(cc.Label) ], t.prototype, "lblDes", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblTip", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblNameList", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "headImgList", void 0);
__decorate([ r([ cc.Sprite ]) ], t.prototype, "stateList", void 0);
__decorate([ r([ cc.SpriteFrame ]) ], t.prototype, "stateImgList", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblTime", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_ok", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_refuse", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
Game_Over_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "7ec2erCgJtDhJWd/U2ctLaO", "Game_Over_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = e("./MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_light = null;
t.imgHead = null;
t.lblName = null;
t.lblDes = null;
t.lblScore = null;
t.lblFan = null;
t.lblHu = null;
t.node_banker = null;
t.node_group = null;
t.node_hand = null;
t.node_hu = null;
t._canvasTarget = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.updateItem = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, o, n, i, c;
return __generator(this, function(l) {
switch (l.label) {
case 0:
this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.lblName.string = t.nick;
this.lblScore.string = t.score + "";
this.lblDes.string = t.huPaiDesc;
this.lblFan.string = t.rate + "番";
if (t.huPaiIndex > 0) {
this.lblHu.node.active = !0;
this.lblHu.string = t.huPaiIndex + "胡";
} else this.lblHu.node.active = !1;
this.node_light.active = e % 2 == 0;
this.node_banker.active = 0 !== t.banker;
this.node_group.removeAllChildren();
this.node_hand.removeAllChildren();
this.node_hu.removeAllChildren();
a = [];
t.baGangCards && (a = t.baGangCards);
t.dianGangCards && (a = a.concat(t.dianGangCards));
if (a) for (n = 0; n < a.length; n++) this._canvasTarget.showGroupCard(1, a[n], 0, this.node_group);
if (t.anGangCards) for (n = 0; n < t.anGangCards.length; n++) this._canvasTarget.showGroupCard(2, t.anGangCards[n], 0, this.node_group);
if (t.pengCards) for (n = 0; n < t.pengCards.length; n++) this._canvasTarget.showGroupCard(0, t.pengCards[n], 0, this.node_group);
0 === this.node_group.childrenCount && (this.node_group.active = !1);
if (t.handCards) {
o = s.getSortCardByCardIds(t.handCards);
for (n = 0; n < o.length; n++) this._canvasTarget.showMineCard(o[o.length - 1 - n], this.node_hand, !1, function(e) {
e.scale = .8;
e.getComponent("MJ_Card").showMask(!1);
});
}
if (t.huCards) for (n = 0; n < t.huCards.length; n++) this._canvasTarget.showMineCard(t.huCards[n], this.node_hu, !1, function(e) {
e.scale = .8;
e.getComponent("MJ_Card").showMask(!1);
});
i = null;
l.label = 1;

case 1:
l.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(t.headImg) ];

case 2:
i = l.sent();
return [ 3, 4 ];

case 3:
c = l.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.imgHead.spriteFrame = i;
return [ 2 ];
}
});
});
};
__decorate([ i(cc.Node) ], t.prototype, "node_light", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "imgHead", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblDes", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblScore", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblFan", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblHu", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_banker", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_group", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_hand", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_hu", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
Game_Over: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "4acb3R4l+xKopn0bW1rJ8sH", "Game_Over");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.imgTitle = null;
t.lbl_over_des = null;
t.lblBtnName = null;
t.game_over_prefab = null;
t.svNode = null;
t.img_title_list = [];
t._canvasTarget = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
};
t.prototype.initData = function(e) {
var t = this;
if (e) {
this.svNode.content.removeAllChildren();
for (var a = !0, o = null, n = 0; n < e.length; n++) {
var i = cc.instantiate(this.game_over_prefab);
i.getComponent("Game_Over_Item").updateItem(n, e[n]);
i.parent = this.svNode.content;
0 !== e[n].huPaiIndex && (a = !1);
e[n].accountId === s.ud_manager.mineData.accountId && (o = e[n]);
}
a ? this.imgTitle.spriteFrame = this.img_title_list[2] : o && o.score >= 0 ? this.imgTitle.spriteFrame = this.img_title_list[0] : this.imgTitle.spriteFrame = this.img_title_list[1];
this.lblBtnName.string = 1 === s.gm_manager.mjGameData.tableBaseVo.nextGame ? "下一局" : "查看结算";
this.lbl_over_des.string = s.gm_manager.mjGameData.tableBaseVo.ruleShowDesc;
var c = r.getDiffTime(s.gm_manager.mjGameData.tableBaseVo.svrTime, s.gm_manager.mjGameData.tableBaseVo.actTime);
c = 1e3 * (c - 1);
setTimeout(function() {
t.node && t.node.isValid && s.js_call_native.phoneVibration();
}, c);
}
};
t.prototype.click_btn_next = function() {
s.mp_manager.playButton();
this.sendNextGame();
};
t.prototype.sendNextGame = function() {
var e = this;
s.ui_manager.showLoading() && s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_NEXT_GAME, "", function(t, a) {
if (0 === t) {
s.ui_manager.hideLoading();
s.gm_manager.mjGameData = a;
e._canvasTarget.showMJInfo();
e.node.removeFromParent(!0);
e.node.destroy();
} else if (-1 === t) ; else {
cc.log(a);
s.ui_manager.hideLoading();
}
});
};
__decorate([ i(cc.Sprite) ], t.prototype, "imgTitle", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_over_des", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblBtnName", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "game_over_prefab", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "img_title_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
Game_Result_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "1625ai5d7dBJIWMfWoD729H", "Game_Result_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_mine = null;
t.imgHead = null;
t.lblName = null;
t.lblID = null;
t.lblScore = null;
t.lblZM = null;
t.lblJP = null;
t.lblDP = null;
t.lblAG = null;
t.lblMG = null;
t.lblCJ = null;
t.node_zjps = null;
t.node_dyj = null;
t.node_total_lable = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a) {
return __awaiter(this, void 0, void 0, function() {
var o, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
this.lblName.string = e.nick;
this.lblID.string = "ID:" + e.starNO;
this.lblZM.string = e.zimo + "";
this.lblAG.string = e.angang + "";
this.lblCJ.string = e.chajiao + "";
this.lblDP.string = e.dianPao + "";
this.lblJP.string = e.otherHuPai + "";
this.lblMG.string = e.mimang + "";
e.accountId === r.ud_manager.mineData.accountId ? this.node_mine.active = !0 : this.node_mine.active = !1;
if (t > 0) {
this.node_dyj.active = e.score === t;
this.node_total_lable.active = e.score !== t;
this.lblScore.node.color = e.score === t ? cc.Color.GREEN : cc.color(255, 248, 61);
} else {
this.node_dyj.active = !1;
this.node_total_lable.active = !0;
this.lblScore.node.color = cc.color(255, 248, 61);
}
e.score > 0 ? this.lblScore.string = "+" + e.score : this.lblScore.string = e.score + "";
this.node_zjps.active = a > 0 && e.dianPao === a;
o = null;
i.label = 1;

case 1:
i.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(e.headImg) ];

case 2:
o = i.sent();
return [ 3, 4 ];

case 3:
n = i.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.imgHead.spriteFrame = o;
return [ 2 ];
}
});
});
};
__decorate([ i(cc.Node) ], t.prototype, "node_mine", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "imgHead", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblID", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblScore", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblZM", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblJP", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblDP", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblAG", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblMG", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblCJ", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_zjps", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_dyj", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_total_lable", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Game_Result: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "cfa46Cu+odINoCesoy47cDK", "Game_Result");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.game_result_prefab = null;
t.listLayout = null;
t.node_wx_share = null;
t._isTouch = !1;
t.wxShareCallBack = function(e) {
0 === e.detail ? r.ui_manager.showTip("战绩分享成功！") : r.ui_manager.showTip("战绩分享失败！");
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
r.ui_manager.fixIPoneX(this.node);
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
0 === r.config.wxState ? this.node_wx_share.active = !0 : this.node_wx_share.active = !1;
this.showGameResult();
cc.systemEvent.on("cb_share", this.wxShareCallBack, this);
};
t.prototype.onDestroy = function() {
cc.systemEvent.off("cb_share", this.wxShareCallBack, this);
};
t.prototype.showGameResult = function() {
if (r.gm_manager && r.gm_manager.mjGameData && r.gm_manager.mjGameData.settlementAll) {
for (var e = r.gm_manager.mjGameData.settlementAll, t = e[0].score, a = e[0].dianPao, o = 1; o < e.length; o++) {
e[o].score > t && (t = e[o].score);
e[o].dianPao > a && (a = e[o].dianPao);
}
this.listLayout.removeAllChildren();
for (o = 0; o < e.length; o++) {
var n = cc.instantiate(this.game_result_prefab);
n.getComponent("Game_Result_Item").updateItem(e[o], t, a);
n.parent = this.listLayout;
}
}
};
t.prototype.click_btn_out = function() {
if (!this._isTouch) {
r.mp_manager.playButton();
if (r.ui_manager.showLoading()) {
r.ud_manager.mineData.tableId = 0;
"0" !== r.gm_manager.mjGameData.tableBaseVo.corpsId ? cc.director.loadScene("ClubScene", function() {
r.gm_manager.destroySelf();
cc.sys.garbageCollect();
}) : cc.director.loadScene("HomeScene", function() {
r.gm_manager.destroySelf();
cc.sys.garbageCollect();
});
}
}
};
t.prototype.click_btn_share = function() {
var e = this;
if (!this._isTouch) {
this._isTouch = !0;
r.mp_manager.playButton();
r.utils.captureScreen(this.node, "jt.png", function(t) {
if (t) {
r.js_call_native.wxShareRecord(t);
e._isTouch = !1;
} else {
r.ui_manager.showTip("截图失败!");
e._isTouch = !1;
}
r.ui_manager.hideLoading();
});
}
};
__decorate([ i(cc.Prefab) ], t.prototype, "game_result_prefab", void 0);
__decorate([ i(cc.Node) ], t.prototype, "listLayout", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_wx_share", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Gift_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "02f5bAHpLhJDJAICDU8W1tI", "Gift_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblTime = null;
t.lblIndex = null;
t.lblContent = null;
t.node_choose = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.updateItem = function(e, t) {
this.node_choose.active = e % 2 != 0;
this.lblIndex.string = e + 1 + "";
this.lblTime.string = r.utils.getDateStringByTimestamp(t.giveTime, 3);
this.lblContent.string = t.content;
};
__decorate([ i(cc.Label) ], t.prototype, "lblTime", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblIndex", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblContent", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_choose", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"../../Modules/ModuleManager": "ModuleManager"
} ],
Gift: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a7ab0qJgtpBkLRQn5vDWEO9", "Gift");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_board1 = null;
t.node_board2 = null;
t.svNode = null;
t.gift_item_prefab = null;
t.edit_giftNum = null;
t.edit_id = null;
t.headImg = null;
t.lblName = null;
t.lblID = null;
t.lblGiftNum = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
o.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
this.showGiftLayer(0);
};
t.prototype.sendGetRecordList = function() {
var e = this;
o.ui_manager.hideLoading();
if (o.ui_manager.showLoading()) {
this.svNode.content.removeAllChildren();
o.ws_manager.sendMsg(o.protocol.WALLET_ROOMCARD_RECORD, "", function(t, a) {
0 === t ? e.showRecordList(a.items) : -1 === t || o.ui_manager.showAlert(a, "温馨提示");
o.ui_manager.hideLoading();
cc.log(a);
});
}
};
t.prototype.sendGiveGift = function(e, t) {
var a = this;
if (o.ui_manager.showLoading()) {
var n = {
givePlayer: e,
giveNum: t
}, i = JSON.stringify(n);
o.ws_manager.sendMsg(o.protocol.WALLET_ROOMCARD_GIVE, i, function(e, t) {
if (0 === e) {
o.ui_manager.showTip("赠送成功");
o.ui_manager.isShowPopup = !0;
a.node.removeFromParent(!0);
a.node.destroy();
} else if (-1 === e) ; else {
a.showGiftLayer(0);
o.ui_manager.showTip(t);
}
o.ui_manager.hideLoading();
cc.log(t);
});
}
};
t.prototype.sendGetRoleInfo = function(e, t) {
var a = this;
if (o.ui_manager.showLoading()) {
o.mp_manager.playAlert();
var n = {
starNO: e
}, i = JSON.stringify(n);
o.ws_manager.sendMsg(o.protocol.ACCOUNT_ROLE_STARNO, i, function(e, n) {
if (0 === e) {
var i = n;
a.showRoleInfo(i, t);
a.showGiftLayer(1);
} else -1 === e || o.ui_manager.showTip(n, .5, 1, .5);
o.ui_manager.hideLoading();
});
}
};
t.prototype.showRoleInfo = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
this.lblName.string = e.nick;
this.lblID.string = e.starNO;
this.lblGiftNum.string = t;
a = null;
i.label = 1;

case 1:
i.trys.push([ 1, 3, , 4 ]);
return [ 4, o.img_manager.loadURLImage(e.headImg) ];

case 2:
a = i.sent();
return [ 3, 4 ];

case 3:
n = i.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = a;
return [ 2 ];
}
});
});
};
t.prototype.showGiftLayer = function(e) {
void 0 === e && (e = 0);
this.node_board1.active = 0 === e;
this.node_board2.active = 1 === e;
0 === e && this.sendGetRecordList();
};
t.prototype.showRecordList = function(e) {
e || (e = []);
this.svNode.content.removeAllChildren();
for (var t = 0; t < e.length; t++) {
var a = cc.instantiate(this.gift_item_prefab);
a.getComponent("Gift_Item").updateItem(t, e[t]);
a.parent = this.svNode.content;
}
};
t.prototype.click_btn_give = function() {
var e = this.edit_id.string.trim();
if ("" !== e) {
var t = this.edit_giftNum.string.trim();
"" !== t ? 0 !== Number(t) ? this.sendGetRoleInfo(e, t) : o.ui_manager.showTip("赠送数量不能为0") : o.ui_manager.showTip("请输入赠送数量");
} else o.ui_manager.showTip("ID不能为空");
};
t.prototype.click_btn_sure = function() {
this.sendGiveGift(this.lblID.string, this.lblGiftNum.string);
};
t.prototype.click_btn_cancel = function() {
this.showGiftLayer(0);
};
t.prototype.click_btn_out = function() {
o.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ r(cc.Node) ], t.prototype, "node_board1", void 0);
__decorate([ r(cc.Node) ], t.prototype, "node_board2", void 0);
__decorate([ r(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ r(cc.Prefab) ], t.prototype, "gift_item_prefab", void 0);
__decorate([ r(cc.EditBox) ], t.prototype, "edit_giftNum", void 0);
__decorate([ r(cc.EditBox) ], t.prototype, "edit_id", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblID", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblGiftNum", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Help: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "1aac0wJbJlFra7xLgu4yCAk", "Help");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.svNode = null;
t.xzmj_list = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
o.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
this.showHelpInfo();
};
t.prototype.showHelpInfo = function() {
this.svNode.content.removeAllChildren();
for (var e = 0; e < this.xzmj_list.length; e++) {
var t = new cc.Node(), a = t.addComponent(cc.Sprite);
a.spriteFrame = this.xzmj_list[e];
a.sizeMode = cc.Sprite.SizeMode.RAW;
a.trim = !1;
var o = t.addComponent(cc.Widget);
o.isAlignLeft = !0;
o.left = 0;
this.svNode.content.addChild(t);
}
};
t.prototype.click_btn_out = function() {
o.mp_manager.playButton();
o.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ r(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ r([ cc.SpriteFrame ]) ], t.prototype, "xzmj_list", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
HomeCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "621de6tbhlMiagOthp3YoZh", "HomeCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblGems = null;
t.lblwxgzh = null;
t.headImg = null;
t.noticeNode = null;
t.noticeLayer = null;
t.lblNoticeCT = null;
t.msgLayout = null;
t.role_prefab = null;
t.setting_prefab = null;
t.auth_prefab = null;
t.auth_phone_prefab = null;
t.record_prefab = null;
t.room_create_prefab = null;
t.room_join_normal_prefab = null;
t.store_prefab = null;
t.help_prefab = null;
t.email_prefab = null;
t.gift_prefab = null;
t.hotTipList = [];
t.imgAuthList = [];
t.auth_on_off = [];
t._isRunNotice = !1;
t._role = null;
t._room_create = null;
t._room_join = null;
t._email = null;
t._help = null;
t._setting = null;
t._auth = null;
t._auth_phone = null;
t._record = null;
t._gift = null;
t.cb_getProducts = function(e) {
if (e.detail) {
var a = JSON.parse(e.detail);
t.showStore(a);
} else r.ui_manager.showAlert("获取商品信息失败", "错误提示", null, null, 1);
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
r.ui_manager.fixIPoneX(this.node);
r.ui_manager.hideLoading();
this.showInfo();
this.showHead();
cc.systemEvent.on("cb_getProducts", this.cb_getProducts, this);
cc.systemEvent.on("qyiap", this.qyiap, this);
};
t.prototype.qyiap = function() {
this.showStore();
};
t.prototype.onDestroy = function() {
cc.systemEvent.off("cb_getProducts", this.cb_getProducts, this);
cc.systemEvent.off("qyiap", this.qyiap, this);
};
t.prototype.start = function() {
if (r.ud_manager && r.ud_manager.mineData && 0 !== r.ud_manager.mineData.tableId && r.ui_manager.showLoading("正在重新进入未完成的游戏")) {
var e = {
tableId: r.ud_manager.mineData.tableId
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.MAJIANG_ROOM_JOIN, t, function(e, t) {
if (0 === e) {
r.gm_manager.mjGameData = t;
r.gm_manager.replayMJ = 0;
cc.director.loadScene("MJScene");
} else if (-1 === e) r.ui_manager.hideLoading(); else {
r.ui_manager.showAlert(t, "温馨提示");
r.ui_manager.hideLoading();
}
cc.log(t);
});
}
};
t.prototype.update = function(e) {
this.checkPos();
this.showInfo();
};
t.prototype.showInfo = function() {
if (r.ud_manager && r.ud_manager.mineData) {
this.lblName.string = r.ud_manager.mineData.nick;
this.lblGems.string = r.ud_manager.mineData.roomCard + "";
this.lblwxgzh.node.active = !1;
if (r.ud_manager.mineData.authenticationFlag && 1 === r.ud_manager.mineData.authenticationFlag) {
this.imgAuthList[0].node.active = !0;
this.imgAuthList[0].spriteFrame = this.auth_on_off[0];
} else this.imgAuthList[0].node.active = !1;
if (r.ud_manager.mineData.phone && "" !== r.ud_manager.mineData.phone) {
this.imgAuthList[1].node.active = !0;
this.imgAuthList[1].spriteFrame = this.auth_on_off[1];
} else this.imgAuthList[1].node.active = !1;
}
for (var e = 0; e < this.hotTipList.length; e++) r.ud_manager && r.ud_manager.hotTip && r.ud_manager.hotTip[e] && 1 === r.ud_manager.hotTip[e].hotVal ? this.hotTipList[e].active = !0 : this.hotTipList[e].active = !1;
};
t.prototype.showHead = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t;
return __generator(this, function(a) {
switch (a.label) {
case 0:
if (!r.ud_manager || !r.ud_manager.mineData) return [ 3, 5 ];
this.lblName.string = r.ud_manager.mineData.nick;
this.lblGems.string = r.ud_manager.mineData.roomCard + "";
e = null;
a.label = 1;

case 1:
a.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(r.ud_manager.mineData.headImg) ];

case 2:
e = a.sent();
return [ 3, 4 ];

case 3:
t = a.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = e;
a.label = 5;

case 5:
return [ 2 ];
}
});
});
};
t.prototype.checkPos = function() {
if (this._isRunNotice) {
var e = this.msgLayout.getComponent(cc.Widget);
if (e.left < 0 && Math.abs(e.left) >= this.msgLayout.width) {
this.msgLayout.removeAllChildren();
e.left = this.noticeNode.width;
this._isRunNotice = !1;
this.noticeNode.active = !1;
} else e.left -= 1;
} else if (r.ud_manager && r.ud_manager.noticeList && r.ud_manager.noticeList.length > 0) this.createNotice(r.ud_manager.noticeList.shift()); else {
var t = {
msgId: "0",
contents: [ {
content: "抵制不良游戏, 拒绝盗版游戏。 注意自我保护, 谨防受骗上当。 适度游戏益脑, 沉迷游戏伤身。 合理安排时间, 享受健康生活！",
type: 2,
color: [ 255, 255, 255 ]
} ]
};
this.createNotice(t);
}
};
t.prototype.createNotice = function(e) {
this.msgLayout.removeAllChildren();
for (var t = 0; t < e.contents.length; t++) {
var a = e.contents[t], o = new cc.Node("notice");
o.color = new cc.Color(a.color[0], a.color[1], a.color[2]);
var n = o.addComponent(cc.Label);
n.fontSize = 30;
n.lineHeight = 30;
n.overflow = cc.Label.Overflow.NONE;
n.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
n.verticalAlign = cc.Label.VerticalAlign.CENTER;
n.string = a.content;
this.msgLayout.addChild(o);
}
this._isRunNotice = !0;
this.noticeNode.active = !0;
};
t.prototype.click_btn_head = function() {
var e = this;
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading()) {
r.mp_manager.playAlert();
var t = {
accountId: r.ud_manager.mineData.accountId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_ROLE_ACCOUNTID, a, function(t, a) {
if (0 === t) {
var o = a;
if (!e._role || !e._role.isValid) {
r.ui_manager.isShowPopup = !1;
e._role = cc.instantiate(e.role_prefab);
e._role.getComponent("Role").showInfo(o);
e._role.parent = e.node;
}
} else -1 === t || cc.log(a);
r.ui_manager.hideLoading();
});
}
};
t.prototype.click_btn_notice = function() {
this.noticeLayer.active = !this.noticeLayer.active;
if (this.noticeLayer.active) {
r.mp_manager.playAlert();
var e = this.msgLayout.getChildByName("notice");
this.lblNoticeCT.string = e ? e.getComponent(cc.Label).string : "抵制不良游戏, 拒绝盗版游戏。 注意自我保护, 谨防受骗上当。 适度游戏益脑, 沉迷游戏伤身。 合理安排时间, 享受健康生活！";
}
};
t.prototype.click_btn_buy = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? r.js_call_native.getProducts(r.config.productids) : this.showStore());
};
t.prototype.showStore = function(e) {
var t = this, a = cc.instantiate(this.store_prefab);
r.ws_manager.sendMsg(r.protocol.MALL_ITEMLIST, "", function(o, n) {
r.ui_manager.hideLoading();
if (0 === o) {
var i = n;
a.getComponent("Store").init(i.proxyItems, e);
a.parent = t.node;
} else -1 === o || r.ui_manager.showTip(n);
});
};
t.prototype.click_btn_creatRoom = function(e, t) {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && (!this._room_create || !this._room_create.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._room_create = cc.instantiate(this.room_create_prefab);
this._room_create.parent = this.node;
r.ui_manager.hideLoading();
this._room_create.getComponent("Room_Create").showCreateMode();
}
};
t.prototype.click_btn_joinRoom = function(e, t) {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && (!this._room_join || !this._room_join.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._room_join = cc.instantiate(this.room_join_normal_prefab);
this._room_join.parent = this.node;
}
};
t.prototype.sendGetClubs = function(e) {
r.ws_manager.sendMsg(r.protocol.CORPS_GET_CORPS_LIST, "", function(t, a) {
if (0 === t) {
var o = a.items;
if (o && o.length > 0) e && e(o); else {
r.ui_manager.showAlert("您还没有加入俱乐部,是否前往创建俱乐部？", "温馨提示", {
lbl_name: "确定",
callback: function() {
r.ui_manager.showLoading() && cc.director.loadScene("ClubScene");
}
}, {
lbl_name: "取消",
callback: function() {}
}, 1);
r.ui_manager.hideLoading();
}
} else if (-1 === t) ; else {
r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
}
});
};
t.prototype.click_btn_club = function() {
r.mp_manager.playButton();
r.ui_manager.showLoading() && cc.director.loadScene("ClubScene");
};
t.prototype.click_btn_email = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._email || !this._email.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._email = cc.instantiate(this.email_prefab);
this._email.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_help = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._help || !this._help.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._help = cc.instantiate(this.help_prefab);
this._help.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_setting = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._setting || !this._setting.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._setting = cc.instantiate(this.setting_prefab);
this._setting.getComponent("Setting").initData(-1);
this._setting.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_realAuth = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._auth || !this._auth.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._auth = cc.instantiate(this.auth_prefab);
this._auth.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_phoneBind = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._auth_phone || !this._auth_phone.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._auth_phone = cc.instantiate(this.auth_phone_prefab);
this._auth_phone.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_record = function() {
r.mp_manager.playButton();
this.showRecord("0");
};
t.prototype.showRecord = function(e) {
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._record || !this._record.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._record = cc.instantiate(this.record_prefab);
this._record.parent = this.node;
if ("0" !== e) {
r.ui_manager.hideLoading();
this._record.getComponent("Record").sendGetRecordDetailed(e);
}
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_gift_room_card = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._gift || !this._gift.isValid)) {
r.ui_manager.isShowPopup = !1;
r.mp_manager.playAlert();
this._gift = cc.instantiate(this.gift_prefab);
this._gift.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_share = function() {
r.mp_manager.playButton();
r.utils.captureScreen(this.node, "jt.png", function(e) {
if (e) {
r.ui_manager.showTip("截图成功,开始分享");
r.js_call_native.wxShareRecord(e);
} else r.ui_manager.showTip("截图失败!");
});
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblGems", void 0);
__decorate([ i(cc.RichText) ], t.prototype, "lblwxgzh", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Node) ], t.prototype, "noticeNode", void 0);
__decorate([ i(cc.Node) ], t.prototype, "noticeLayer", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblNoticeCT", void 0);
__decorate([ i(cc.Node) ], t.prototype, "msgLayout", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "role_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "setting_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "auth_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "auth_phone_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "record_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_create_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_join_normal_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "store_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "help_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "email_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "gift_prefab", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "hotTipList", void 0);
__decorate([ i([ cc.Sprite ]) ], t.prototype, "imgAuthList", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "auth_on_off", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
IMGManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0a809fcccdJIaIHB0fWp0Mz", "IMGManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./ENCManager"), n = function() {
function e() {
this.headSpriteFrame = null;
this.spriteFrames = [];
this.chatSpriteFrames = [];
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.addSpriteFrame = function(e) {
this.spriteFrames.some(function(t) {
return t === e;
}) || this.spriteFrames.push(e);
};
e.prototype.initSystemHead = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Texture/SystemHead/1", cc.SpriteFrame, function(o, n) {
if (o) a(o.message); else {
e.headSpriteFrame = n;
t();
}
});
});
};
e.prototype.initChat = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Texture/Chat/Chat", cc.SpriteAtlas, function(o, n) {
if (o) a(o.message); else {
for (var i = 1; i <= 55; i++) {
var r = n.getSpriteFrame("biaoqing_" + i);
r && e.chatSpriteFrames.push(r);
}
t();
}
});
});
};
e.prototype.getDirPath = function() {
var e = jsb.fileUtils.getWritablePath() + "img/";
jsb.fileUtils.isDirectoryExist(e) || jsb.fileUtils.createDirectory(e);
return e;
};
e.prototype.getFilePath = function(e) {
return this.getDirPath() + o.default.getInstance().MD5(e) + ".jpg";
};
e.prototype.loadLocalImg = function(e) {
var t = this;
return new Promise(function(a, o) {
cc.loader.load(e, function(e, n) {
if (e) o(e); else {
var i = new cc.SpriteFrame(n);
t.addSpriteFrame(i);
a(i);
}
});
});
};
e.prototype.loadURLImage = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t, a, o = this;
return __generator(this, function(n) {
switch (n.label) {
case 0:
if (!(e.length > 0)) return [ 3, 6 ];
if (!cc.sys.isNative) return [ 3, 4 ];
t = this.getFilePath(e);
return jsb.fileUtils.isFileExist(t) ? [ 2, this.loadLocalImg(t) ] : [ 3, 1 ];

case 1:
return [ 4, new Promise(function(t, a) {
var o = new XMLHttpRequest();
o.responseType = "arraybuffer";
o.timeout = 1e4;
o.onload = function() {
200 === o.status ? t(o.response) : a(new TypeError("Network response failed"));
};
o.onerror = function() {
a(new TypeError("Network request error"));
};
o.ontimeout = function() {
a(new TypeError("Network request timeout"));
};
o.open("GET", e, !0);
o.send();
}) ];

case 2:
a = n.sent();
jsb.fileUtils.writeDataToFile(new Uint8Array(a), t);
return [ 2, this.loadLocalImg(t) ];

case 3:
return [ 3, 5 ];

case 4:
return [ 2, new Promise(function(t, a) {
cc.loader.load({
url: e,
type: "jpg"
}, function(e, n) {
if (e) a(e); else {
var i = new cc.SpriteFrame(n);
o.addSpriteFrame(i);
t(i);
}
});
}) ];

case 5:
return [ 3, 7 ];

case 6:
return [ 2, this.headSpriteFrame ];

case 7:
return [ 2 ];
}
});
});
};
e.prototype.destroySelf = function() {
var t = this;
this.spriteFrames.forEach(function(e) {
t.release(e);
});
this.spriteFrames.length = 0;
this.release(this.headSpriteFrame);
e._instance = null;
};
e.prototype.release = function(e) {
var t = cc.loader.getDependsRecursively(e);
cc.loader.release(t);
};
e._instance = null;
return e;
}();
a.default = n;
cc._RF.pop();
}, {
"./ENCManager": "ENCManager"
} ],
JSCallNative: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "275fb5XmutGZIuaRvW0CTU8", "JSCallNative");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./ModuleManager");
a.initWX = function(e, t) {
var a = -1;
if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) a = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "initWX", "(Ljava/lang/String;Ljava/lang/String;)I", e, t); else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) a = jsb.reflection.callStaticMethod("IOSHelper", "initWX:key:", e, t); else {
cc.log("该方法只支持原生平台");
a = -1;
}
return a;
};
a.initVoice = function(e, t, a) {
var o = -1;
if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) o = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "initVoice", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)I", e, t, a); else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) o = jsb.reflection.callStaticMethod("IOSHelper", "initVoice:app_id:app_key:", e, t, a); else {
cc.log("该方法只支持原生平台");
o = 0;
}
return o;
};
a.getAppVersion = function() {
var e = "";
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "getAppVersion", "()Ljava/lang/String;") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? e = jsb.reflection.callStaticMethod("IOSHelper", "getAppVersion") : cc.log("该方法只支持原生平台");
return e;
};
a.openBrowser = function(e) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "openBrowser", "(Ljava/lang/String;)V", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "openBrowser:", e) : cc.log("该方法只支持原生平台");
};
a.getBatteryLevel = function() {
var e = 0;
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "getBatteryLevel", "()I") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? e = jsb.reflection.callStaticMethod("IOSHelper", "getBatteryLevel") : cc.log("该方法只支持原生平台");
return e;
};
a.wxLogin = function() {
if (0 === o.config.wxState) cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "wxLogin", "()V") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxLogin") : cc.log("该方法只支持原生平台"); else {
o.ui_manager.showTip("请先安装微信客户端，使用微信登录!");
o.ui_manager.hideLoading();
}
};
a.wxShare = function(e, t, a) {
if (0 === o.config.wxState) cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "wxShare", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, t, a) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxShare:title:des:", e, t, a) : cc.log("该方法只支持原生平台"); else {
o.ui_manager.showTip("请先安装微信客户端!");
o.ui_manager.hideLoading();
}
};
a.wxShareRecord = function(e) {
if (0 === o.config.wxState) cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "wxShareRecord", "(Ljava/lang/String;)V", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxShareRecord:", e) : cc.log("该方法只支持原生平台"); else {
o.ui_manager.showTip("请先安装微信客户端，使用微信分享!");
o.ui_manager.hideLoading();
}
};
a.copyToClipboard = function(e) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "copyToClipboard", "(Ljava/lang/String;)V", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "copyToClipboard:", e) : cc.log("该方法只支持原生平台");
};
a.phoneVibration = function() {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "phoneVibration", "()V") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "phoneVibration") : cc.log("该方法只支持原生平台");
};
a.joinTeamRoom = function(e) {
var t = -1;
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? t = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "joinTeamRoom", "(Ljava/lang/String;)I", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? t = jsb.reflection.callStaticMethod("IOSHelper", "joinTeamRoom:", e) : cc.log("该方法只支持原生平台");
return t;
};
a.quitRoom = function() {
var e = -1;
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? e = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "quitRoom", "()I") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? e = jsb.reflection.callStaticMethod("IOSHelper", "quitRoom") : cc.log("该方法只支持原生平台");
return e;
};
a.setState = function(e) {
var t = -1;
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? t = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "setState", "(Z)I", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? t = jsb.reflection.callStaticMethod("IOSHelper", "setState:", e) : cc.log("该方法只支持原生平台");
return t;
};
a.getProducts = function(e) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "getProducts:", e) : cc.log("该方法只支持IOS原生平台");
};
a.buyProduct = function(e, t) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "buyProduct:bid:", e, t) : cc.log("该方法只支持IOS原生平台");
};
cc._RF.pop();
}, {
"./ModuleManager": "ModuleManager"
} ],
LoadCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "18b3daTnbtCWqqYj6Y5VaOE", "LoadCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_msg = null;
t.loading_slider = null;
t.loading_pro = null;
t.manifestUrl = null;
t._needUpdate = !1;
t._am = null;
t._checkListener = null;
t._updateListener = null;
t._failCount = 0;
t.exit = {
lbl_name: "确定",
callback: function() {
cc.game.end();
}
};
return t;
}
__extends(t, e);
t.prototype.fixIPoneX = function() {
if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
var e = cc.view.getFrameSize();
if (2436 == e.width && 1125 == e.height || 1125 == e.width && 2436 == e.height) {
var t = this.node.getComponent(cc.Canvas);
t.fitHeight = !0;
t.fitWidth = !0;
}
}
};
t.prototype.onLoad = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t;
return __generator(this, function(a) {
switch (a.label) {
case 0:
this.fixIPoneX();
window.dd = r;
r.init();
r.config.wxState = r.js_call_native.initWX(r.config.app_id, r.config.secret);
this.showLoadingPro(.05, "开始初始化图像资源！");
e = 0;
a.label = 1;

case 1:
a.trys.push([ 1, 7, , 8 ]);
return [ 4, r.img_manager.initSystemHead() ];

case 2:
a.sent();
e++;
return [ 4, r.img_manager.initChat() ];

case 3:
a.sent();
e++;
this.showLoadingPro(.1, "开始初始化UI资源！");
return [ 4, r.ui_manager.initUI() ];

case 4:
a.sent();
e++;
this.showLoadingPro(.2, "开始初始化MP资源！");
return [ 4, r.mp_manager.initMP() ];

case 5:
a.sent();
e++;
this.showLoadingPro(.3, "开始检测APP版本信息！");
return [ 4, this.checkAppVersion() ];

case 6:
a.sent();
return [ 3, 8 ];

case 7:
t = a.sent();
if (e < 4) this.showLoadingPro(1, "资源初始化异常，请重启或卸载重装", !0); else {
this.showLoadingPro(1, "app版本或资源版本检测异常,请确认您的网络是否通畅，重启游戏！", !0);
r.ui_manager.showAlert("app版本或资源版本检测异常,请确认您的网络是否通畅，重启游戏！", "错误提示", this.exit);
}
return [ 3, 8 ];

case 8:
return [ 2 ];
}
});
});
};
t.prototype.showLoadingPro = function(e, t, a) {
void 0 === a && (a = !1);
this.loading_pro.progress = e;
this.loading_slider.progress = e;
this.lbl_msg.string = t;
a && (this.lbl_msg.node.color = cc.Color.RED);
};
t.prototype.checkAppVersion = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t, a, o, n, i = this;
return __generator(this, function(s) {
switch (s.label) {
case 0:
return (e = r.js_call_native.getAppVersion()).length > 0 ? [ 4, fetch(r.config.checkUrl + e) ] : [ 3, 5 ];

case 1:
return (t = s.sent()).ok ? [ 4, t.json() ] : [ 3, 3 ];

case 2:
a = s.sent();
r.config.cd = a;
o = {
lbl_name: "确定下载",
callback: function() {
switch (cc.sys.os) {
case cc.sys.OS_ANDROID:
r.js_call_native.openBrowser(a.apkUrl);
break;

case cc.sys.OS_IOS:
r.js_call_native.openBrowser(a.ipaUrl);
break;

default:
r.js_call_native.openBrowser(a.apkUrl);
}
}
};
n = {
lbl_name: "继续游戏",
callback: function() {
i.checkResVersion();
}
};
if (a.type < 0) {
this.showLoadingPro(1, a.msg, !0);
r.ui_manager.showAlert(a.msg, "错误提示", o);
} else if (1 === a.type) {
this.showLoadingPro(.4, a.msg);
r.ui_manager.showAlert(a.msg, "温馨提示", o, n);
} else {
this.showLoadingPro(.4, "开始检测资源版本信息！");
this.checkResVersion();
}
return [ 3, 4 ];

case 3:
this.showLoadingPro(1, "检测APP版本信息服务器响应失败，请确认您的网络通畅后，重启游戏！", !0);
r.ui_manager.showAlert("检测APP版本信息服务器响应失败，请确认您的网络通畅后，重启游戏！", "错误提示", this.exit);
s.label = 4;

case 4:
return [ 3, 6 ];

case 5:
this.jumpScene();
s.label = 6;

case 6:
return [ 2 ];
}
});
});
};
t.prototype.checkResVersion = function() {
var e = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "platform-remote-asset";
this._am = new jsb.AssetsManager(this.manifestUrl, e);
this._am.retain();
if (this._am.getLocalManifest().isLoaded()) {
this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
cc.eventManager.addListener(this._checkListener, 1);
this._am.checkUpdate();
} else {
this.showLoadingPro(1, "获取本地资源配置失败，请卸载重装", !0);
r.ui_manager.showAlert("获取本地资源配置失败，请卸载重装", "错误提示", this.exit);
}
};
t.prototype.checkCb = function(e) {
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
cc.log("没有发现本地的资源配置文件，热更新失败！");
this.showLoadingPro(1, "没有发现本地的资源配置文件，请卸载重装", !0);
r.ui_manager.showAlert("没有发现本地的资源配置文件，请卸载重装", "错误提示", this.exit);
cc.eventManager.removeListener(this._checkListener);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
cc.log("下载服务端资源配置文件失败，热更新失败！");
this.showLoadingPro(1, "下载服务端资源配置文件失败，请检查网络！", !0);
r.ui_manager.showAlert("下载服务端资源配置文件失败，请检查网络！", "错误提示", this.exit);
cc.eventManager.removeListener(this._checkListener);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
cc.log("当前已经是最新版本，跳过热更新！");
cc.eventManager.removeListener(this._checkListener);
this.jumpScene();
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
cc.log("开始准备热更新！");
this.showLoadingPro(.5, "发现新版本资源，开始准备更新！");
this._needUpdate = !0;
cc.eventManager.removeListener(this._checkListener);
}
};
t.prototype.update = function(e) {
if (this._am && this._needUpdate) {
this._needUpdate = !1;
this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
cc.eventManager.addListener(this._updateListener, 1);
this._failCount = 0;
this._am.update();
}
};
t.prototype.updateCb = function(e) {
var t = !1, a = !1;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
cc.log("没有发现本地的资源配置文件，热更新失败！");
a = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var o = .5 + .5 * e.getPercentByFile();
cc.log("正在更新，下载进度：(" + (100 * o).toFixed(2) + "%)");
this.showLoadingPro(o, "正在更新，下载进度：(" + (100 * o).toFixed(2) + "%)");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
cc.log("下载服务端资源配置文件失败，热更新失败！");
a = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
cc.log("当前已经是最新版本，跳过热更新！");
a = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
cc.log("热更新完毕：" + e.getMessage());
t = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
cc.log("文件下载失败：" + e.getMessage());
if (++this._failCount < 5) this._am.downloadFailedAssets(); else {
cc.log("太多文件下载失败，退出热更新！");
this._failCount = 0;
a = !0;
}
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
cc.log("Asset update error: " + e.getAssetId() + ", " + e.getMessage());
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
cc.log(e.getMessage());
}
if (a) {
cc.eventManager.removeListener(this._updateListener);
this.showLoadingPro(1, "更新资源失败，请确认您的网络通畅后，重启游戏！", !0);
r.ui_manager.showAlert("更新资源失败，请确认您的网络通畅后，重启游戏！", "错误提示", this.exit);
}
if (t) {
cc.eventManager.removeListener(this._updateListener);
var n = jsb.fileUtils.getSearchPaths(), i = this._am.getLocalManifest().getSearchPaths();
Array.prototype.unshift(n, i);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(n));
jsb.fileUtils.setSearchPaths(n);
this.showLoadingPro(1, "资源更新完毕，正在重启游戏！");
setTimeout(function() {
r.destroy();
cc.sys.garbageCollect();
cc.game.restart();
}, 1e3);
}
};
t.prototype.jumpScene = function() {
this.showLoadingPro(1, "初始化完毕，准备登录！");
setTimeout(function() {
cc.director.loadScene("LoginScene");
}, 1e3);
};
t.prototype.onDestroy = function() {
this._am && this._am.release();
};
t.prototype.click_btn_bar = function() {
this.loading_slider.progress = this.loading_pro.progress;
};
__decorate([ i(cc.Label) ], t.prototype, "lbl_msg", void 0);
__decorate([ i(cc.Slider) ], t.prototype, "loading_slider", void 0);
__decorate([ i(cc.ProgressBar) ], t.prototype, "loading_pro", void 0);
__decorate([ i({
url: cc.RawAsset
}) ], t.prototype, "manifestUrl", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Loading: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a04e1V6Dj1Kzop825Pn6Z2+", "Loading");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.sp_circle = null;
t.lbl_msg = null;
t.lbl_dd = null;
return t;
}
__extends(t, e);
t.prototype.setMsg = function(e) {
this.lbl_msg.string = e;
this.lbl_dd.node.x = this.lbl_msg.node.width / 2 + 10;
};
t.prototype.update = function(e) {
var t = Date.now();
this.sp_circle.rotation += 2;
this.sp_circle.rotation >= 360 && (this.sp_circle.rotation = 0);
var a = Math.floor(t / 1e3) % 4;
this.lbl_dd.string = "";
for (;a > 0; ) {
a--;
this.lbl_dd.string += "。";
}
};
__decorate([ i(cc.Node) ], t.prototype, "sp_circle", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_msg", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_dd", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
LoginCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "1fc5cfwCtBOOa9WD7WK4V+h", "LoginCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.checkToggle = null;
t.btn_wx = null;
t.btn_yk = null;
t.cb_login = function(e) {
r.ui_manager.hideLoading();
var a = e.detail;
if (1 === a.flag) {
var o = a.data;
o.headimgurl = r.utils.getHeadImgUrl(o.headimgurl);
t.wsLogin(r.protocol.ACCOUNT_LOGIN_WX, o);
} else r.ui_manager.showTip(a.data);
};
return t;
}
__extends(t, e);
t.prototype.onDestroy = function() {
cc.sys.isNative && cc.sys.isMobile && cc.systemEvent.off("cb_login", this.cb_login, this);
};
t.prototype.onLoad = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
r.ui_manager.fixIPoneX(this.node);
if (0 === r.config.wxState) {
this.btn_wx.node.active = !0;
this.btn_yk.node.active = !1;
} else {
this.btn_wx.node.active = !1;
this.btn_yk.node.active = !0;
}
return r.ui_manager.showLoading("正在连接服务器，请稍后") ? [ 4, this.connectWS() ] : [ 3, 3 ];

case 1:
e = t.sent();
if (!(cc.sys.isNative && cc.sys.isMobile && e)) return [ 3, 3 ];
cc.systemEvent.on("cb_login", this.cb_login, this);
return [ 4, this.aotuLogin() ];

case 2:
t.sent();
t.label = 3;

case 3:
r.mp_manager.playBackGround();
return [ 2 ];
}
});
});
};
t.prototype.connectWS = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t, a = this;
return __generator(this, function(o) {
switch (o.label) {
case 0:
o.trys.push([ 0, 2, , 3 ]);
return [ 4, r.ws_manager.connect(r.config.wsUrl) ];

case 1:
o.sent();
r.ui_manager.hideLoading();
return [ 2, !0 ];

case 2:
e = o.sent();
cc.log(e);
t = {
lbl_name: "确定",
callback: function() {
a.onLoad();
}
};
r.ui_manager.showAlert("连接服务器失败，请确认您的网络后点击确定按钮重新连接！", "错误提示", t);
return [ 2, !1 ];

case 3:
return [ 2 ];
}
});
});
};
t.prototype.aotuLogin = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t, a, o, n, i, s, c, l;
return __generator(this, function(_) {
switch (_.label) {
case 0:
if (!(e = cc.sys.localStorage).getItem("TokenInfo")) return [ 3, 11 ];
_.label = 1;

case 1:
_.trys.push([ 1, 10, , 11 ]);
t = JSON.parse(e.getItem("TokenInfo"));
a = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + r.config.app_id + "&grant_type=refresh_token&refresh_token=" + t.refresh_token;
return [ 4, fetch(a) ];

case 2:
return (o = _.sent()).ok ? [ 4, o.json() ] : [ 3, 8 ];

case 3:
n = _.sent();
e.setItem("TokenInfo", JSON.stringify(n));
i = "https://api.weixin.qq.com/sns/userinfo?access_token=" + n.access_token + "&openid=" + n.openid;
return [ 4, fetch(i) ];

case 4:
return (s = _.sent()).ok ? [ 4, s.json() ] : [ 3, 6 ];

case 5:
(c = _.sent()).headimgurl = r.utils.getHeadImgUrl(c.headimgurl);
this.wsLogin(r.protocol.ACCOUNT_LOGIN_WX, c);
return [ 3, 7 ];

case 6:
r.ui_manager.showTip("微信用户信息获取失败，请重新授权登录");
_.label = 7;

case 7:
return [ 3, 9 ];

case 8:
r.ui_manager.showTip("微信授权过期，请重新授权登录");
_.label = 9;

case 9:
return [ 3, 11 ];

case 10:
l = _.sent();
cc.log(l);
r.ui_manager.showTip("微信请求异常，请重新授权登录");
return [ 3, 11 ];

case 11:
return [ 2 ];
}
});
});
};
t.prototype.click_btn_wx = function() {
r.mp_manager.playButton();
this.btn_wx.interactable && r.ui_manager.showLoading("正在拉取微信授权，请稍后") && setTimeout(function() {
r.js_call_native.wxLogin();
}, 1e3);
};
t.prototype.wsLogin = function(e, t) {
if (r.ui_manager.showLoading()) {
var a = {};
if (t) {
a.uuid = t.unionid;
a.headImg = t.headimgurl;
a.nick = t.nickname;
a.sex = t.sex;
} else a.uuid = this.getGuestAccount();
r.config.voiceState = r.js_call_native.initVoice(a.uuid, r.config.voice_id, r.config.voice_key);
0 !== r.config.voiceState && r.ui_manager.showTip("语音初始化失败,正在重试");
r.ws_manager.sendMsg(e, JSON.stringify(a), function(e, t) {
r.ui_manager.hideLoading();
if (0 === e) {
r.ud_manager.mineData = t;
r.ws_manager.setLoginState(!0);
cc.director.loadScene("HomeScene");
} else r.ui_manager.showTip(t);
});
}
};
t.prototype.click_btn_yk = function() {
r.mp_manager.playButton();
this.btn_yk.interactable && this.wsLogin(r.protocol.ACCOUNT_LOGIN_TOURIST);
};
t.prototype.getGuestAccount = function() {
var e = cc.sys.localStorage, t = e.getItem("uuid");
if (t && 32 === t.length) return t;
t = this.createUUID(32, 16);
e.setItem("uuid", t);
return t;
};
t.prototype.createUUID = function(e, t) {
var a, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), n = [];
t = t || o.length;
if (e) for (a = 0; a < e; a++) n[a] = o[0 | Math.random() * t]; else {
var i = void 0;
n[8] = n[13] = n[18] = n[23] = "-";
n[14] = "4";
for (a = 0; a < 36; a++) if (!n[a]) {
i = 0 | 16 * Math.random();
n[a] = o[19 == a ? 3 & i | 8 : i];
}
}
return n.join("");
};
t.prototype.click_yhxy_toggle = function() {
r.mp_manager.playButton();
this.btn_wx.interactable = !!this.checkToggle.isChecked;
this.btn_yk.interactable = !!this.checkToggle.isChecked;
};
__decorate([ i(cc.Toggle) ], t.prototype, "checkToggle", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_wx", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_yk", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
MJCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "60733JtRPJCXaRHtYVQwuAt", "MJCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_table = null;
t.node_game = null;
t.node_replay = null;
t.role_prefab = null;
t.chat_prefab = null;
t.chat_show_prefab = null;
t.setting_prefab = null;
t.disband_prefab = null;
t.game_over_prefab = null;
t.mj_card_left_prefab = null;
t.mj_card_table_prefab = null;
t.mj_card_mine_prefab = null;
t.mj_card_gang_prefab = null;
t.mj_ting_prefab = null;
t.act_swap_prefab = null;
t.act_gf_prefab = null;
t.act_xy_prefab = null;
t.node_chat = null;
t.node_setting = null;
t.mj_card_group_Prefab = [];
t.unSuit_list = [];
t.mj_text_list = [];
t._act_swap = null;
t._node_disband = null;
t._isLoad = !1;
t.mj_sf_list = [];
t.MJ_GamePush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_SeatPush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_DingQuePush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_SwapCardPush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_OutCardPush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_BreakCardPush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.MJ_ChatPush = function(e) {
var a = e.detail;
t.showChatInfo(a);
};
t.MJ_OutPush = function(e) {
e.detail;
s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_IDLE && s.gm_manager.mjGameData.tableBaseVo.createPlayer !== s.ud_manager.mineData.accountId ? s.ui_manager.showAlert("房主解散了房间！", "温馨提示", {
lbl_name: "确定",
callback: function() {
t.quitGame();
}
}, null, 1) : t.quitGame();
};
t.MJ_DisbandPush = function(e) {
var a = e.detail;
s.gm_manager.mjGameData = a;
t.showMJInfo();
};
t.wxShareCallBack = function(e) {
0 === e.detail ? s.ui_manager.showTip("好友邀请发送成功！") : s.ui_manager.showTip("好友邀请发送失败！");
};
t._mjGame = null;
t._mjTable = null;
t._voiceTimes = 0;
t._role = null;
t._game_over = null;
t._node_gang = null;
t._node_ting = null;
t.cb_voiceInit = function(e) {
if (0 === e.detail) {
t._voiceTimes = 0;
t.openVoice();
}
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
s.ui_manager.fixIPoneX(this.node);
if (s.gm_manager && s.gm_manager.mjGameData) {
1 === s.gm_manager.mjGameData.tableBaseVo.tableChatType && cc.sys.isNative && 0 === s.gm_manager.replayMJ && this.initVoice();
s.gm_manager.mjGameData.seats && (s.gm_manager.mjGameData.seats = r.sortSeatList(s.gm_manager.mjGameData.seats));
}
this.node_chat.active = !1;
this.node_setting.active = !1;
this._mjGame = this.node_game.getComponent("MJ_Game");
this._mjTable = this.node_table.getComponent("MJ_Table");
s.mp_manager.stopBackGround();
this.bindOnPush();
this.node.on("touchend", function(t) {
if (!s.gm_manager.touchTarget) {
var a = e._mjGame.node_player_list[0].getComponent("MJ_Game_Mine");
a.unSelectCard();
e.showTSCard(-1);
e.showTingPai(!1);
if (s.gm_manager.mjGameData && s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_SWAPCARD) {
a._swapCardList.length = 0;
a.btn_swap.interactable = !1;
}
}
}, this);
};
t.prototype.start = function() {
var e = this;
if (0 === s.gm_manager.replayMJ) {
this.node_replay.active = !1;
if (s.ui_manager.showLoading("正在加载桌子信息")) {
var t = {
tableId: Number(s.gm_manager.mjGameData.tableBaseVo.tableId)
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_JOIN, a, function(t, a) {
if (0 === t) {
s.gm_manager.mjGameData = a;
e.showMJInfo();
}
s.ui_manager.hideLoading();
});
}
} else {
this.node_replay.active = !0;
this.showMJInfo();
}
};
t.prototype.onDestroy = function() {
this.bindOffPush();
};
t.prototype.initVoice = function() {
if (0 === s.config.voiceState) {
cc.systemEvent.on("cb_voiceLogin", this.cb_voiceInit, this);
0 === s.js_call_native.joinTeamRoom(s.gm_manager.mjGameData.tableBaseVo.tableId.toString()) || (++this._voiceTimes > 3 ? s.ui_manager.showTip("语音房语音加入失败,正在重试!") : this.initVoice());
} else s.ui_manager.showTip("语音房语音初始化失败,正在重试!");
};
t.prototype.openVoice = function() {
0 === s.js_call_native.setState(!0) || (++this._voiceTimes > 3 ? s.ui_manager.showTip("语音房语音音频开启失败,正在重试!") : this.openVoice());
};
t.prototype.quitGame = function() {
if (!this._isLoad && s.ui_manager.showLoading()) {
this._isLoad = !0;
s.ud_manager.mineData.tableId = 0;
if (1 === s.gm_manager.mjGameData.tableBaseVo.tableChatType) s.js_call_native.quitRoom();
"0" !== s.gm_manager.mjGameData.tableBaseVo.corpsId ? cc.director.loadScene("ClubScene", function() {
s.gm_manager.destroySelf();
cc.sys.garbageCollect();
}) : cc.director.loadScene("HomeScene", function() {
s.gm_manager.destroySelf();
cc.sys.garbageCollect();
});
}
};
t.prototype.bindOnPush = function() {
cc.systemEvent.on("MJ_GamePush", this.MJ_GamePush, this);
cc.systemEvent.on("MJ_SeatPush", this.MJ_SeatPush, this);
cc.systemEvent.on("MJ_DingQuePush", this.MJ_DingQuePush, this);
cc.systemEvent.on("MJ_SwapCardPush", this.MJ_SwapCardPush, this);
cc.systemEvent.on("MJ_OutCardPush", this.MJ_OutCardPush, this);
cc.systemEvent.on("MJ_BreakCardPush", this.MJ_BreakCardPush, this);
cc.systemEvent.on("MJ_ChatPush", this.MJ_ChatPush, this);
cc.systemEvent.on("MJ_OutPush", this.MJ_OutPush, this);
cc.systemEvent.on("MJ_DisbandPush", this.MJ_DisbandPush, this);
cc.systemEvent.on("cb_share", this.wxShareCallBack, this);
this.node.on("diconnect_update", this.showMJInfo, this);
};
t.prototype.bindOffPush = function() {
cc.systemEvent.off("MJ_GamePush", this.MJ_GamePush, this);
cc.systemEvent.off("MJ_SeatPush", this.MJ_SeatPush, this);
cc.systemEvent.off("MJ_DingQuePush", this.MJ_DingQuePush, this);
cc.systemEvent.off("MJ_SwapCardPush", this.MJ_SwapCardPush, this);
cc.systemEvent.off("MJ_OutCardPush", this.MJ_OutCardPush, this);
cc.systemEvent.off("MJ_BreakCardPush", this.MJ_BreakCardPush, this);
cc.systemEvent.off("MJ_ChatPush", this.MJ_ChatPush, this);
cc.systemEvent.off("MJ_OutPush", this.MJ_OutPush, this);
cc.systemEvent.off("MJ_DisbandPush", this.MJ_DisbandPush, this);
cc.systemEvent.off("cb_voiceLogin", this.cb_voiceInit, this);
cc.systemEvent.off("cb_share", this.wxShareCallBack, this);
this.node.off("diconnect_update", this.showMJInfo, this);
};
t.prototype.showMJInfo = function() {
cc.log("------游戏状态----" + s.gm_manager.mjGameData.tableBaseVo.gameState);
cc.log(s.gm_manager.mjGameData);
s.gm_manager.mjGameData.seats = r.sortSeatList(s.gm_manager.mjGameData.seats);
this._mjTable.showTableInfo();
s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_IDLE ? this.node_game.active = !1 : this.node_game.active = !0;
this._mjGame.showGameInfo();
switch (s.gm_manager.mjGameData.tableBaseVo.gameState) {
case r.MJ_GameState.STATE_TABLE_READY:
break;

case r.MJ_GameState.STATE_TABLE_SWAPCARD:
this.showSwapAct();
break;

case r.MJ_GameState.STATE_TABLE_BREAKCARD:
this._mjGame.showBreakStates();
break;

case r.MJ_GameState.STATE_TABLE_OVER_ONCE:
this.showGameOver();
break;

case r.MJ_GameState.STATE_TABLE_OVER_ALL:
s.ui_manager.showLoading() && cc.director.loadScene("GameResult", function() {
if (s.gm_manager && s.gm_manager.mjGameData && s.gm_manager.mjGameData.tableBaseVo && 1 === s.gm_manager.mjGameData.tableBaseVo.tableChatType) s.js_call_native.quitRoom();
});
break;

case r.MJ_GameState.STATE_TABLE_DESTORY:
this.showDisband();
}
this.showDisband();
this.showSwapAct();
};
t.prototype.sendSwap = function(e) {
var t = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
cardIds: JSON.stringify(e)
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_SWAP_CARD, a, function(e, t) {
if (0 === e) ; else if (-1 === e) ; else {
cc.log(t);
s.ui_manager.showTip(t);
}
});
};
t.prototype.sendDinQue = function(e) {
var t = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
bt: e
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_DINQUE, a, function(e, t) {
0 === e || -1 === e || cc.log(t);
});
};
t.prototype.sendOutCard = function(e) {
var t = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
cardId: JSON.stringify(e)
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_OUT_CARD, a, null);
};
t.prototype.sendOtherBreakCard = function(e, t, a) {
var o = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
bt: e,
cardId: JSON.stringify(t)
}, n = JSON.stringify(o);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_OTHERBREAK_CARD, n, function(e, t) {
a && a.isValid && (a.active = 0 !== e);
});
};
t.prototype.sendChatInfo = function(e, t) {
var a = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
type: e,
content: t
}, o = JSON.stringify(a);
s.ws_manager.sendMsg(s.protocol.CHAT_SEND, o, function(e, t) {
0 === e || -1 === e && cc.log(t);
});
};
t.prototype.sendOutGame = function() {
var e = this;
if (s.ui_manager.showLoading()) {
var t = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_LEAV, a, function(t, a) {
s.ui_manager.hideLoading();
0 === t ? e.quitGame() : -1 === t ? cc.log(a) : s.ui_manager.showAlert(a, "错误提示");
});
}
};
t.prototype.sendDisband = function(e) {
if (s.ui_manager.showLoading()) {
var t = {
tableId: s.gm_manager.mjGameData.tableBaseVo.tableId,
bt: e
}, a = JSON.stringify(t);
s.ws_manager.sendMsg(s.protocol.MAJIANG_ROOM_DELETE_BT, a, function(e, t) {
0 === e || -1 === e || s.ui_manager.showAlert(t, "错误提示", null, null, 1);
s.ui_manager.hideLoading();
});
}
};
t.prototype.getMJCardSF = function(e) {
var t = Math.floor((e - 1) / 4), a = null;
t >= 0 && t < this.mj_sf_list.length ? a = this.mj_sf_list[t] : cc.log("索引错误");
return a;
};
t.prototype.showPlayOutCard = function(e, t, a, o) {
void 0 === o && (o = null);
0 === e || 2 === e ? this.showTableCard(e, t, a, o) : this.showLeftCard(e, t, a, o);
};
t.prototype.showLeftCard = function(e, t, a, o) {
void 0 === o && (o = null);
var n = cc.instantiate(this.mj_card_left_prefab);
n.tag = t;
var i = n.getComponent("MJ_Card");
if (t > 0) {
var r = this.getMJCardSF(t);
i.initData(t, r);
}
var s = 1 === e ? cc.p(-1, 1) : cc.p(1, 1), c = 1 === e ? cc.p(-1, 1) : cc.p(1, 1);
i.setFixCard(s, c);
n.parent = a;
o && o(n);
};
t.prototype.showTableCard = function(e, t, a, o) {
void 0 === o && (o = null);
var n = cc.instantiate(this.mj_card_table_prefab);
n.tag = t;
var i = n.getComponent("MJ_Card");
if (t > 0) {
var r = this.getMJCardSF(t);
i.initData(t, r);
}
var s = cc.p(1, 1), c = 0 === e ? cc.p(1, 1) : cc.p(-1, -1);
i.setFixCard(s, c);
n.parent = a;
o && o(n);
};
t.prototype.showGroupCard = function(e, t, a, o, n) {
void 0 === n && (n = null);
var i = cc.instantiate(this.mj_card_group_Prefab[a]), r = i.getComponent("MJ_Card_Group"), s = this.getMJCardSF(t);
r.initData(e, t, s);
i.parent = o;
n && n(i);
};
t.prototype.showMineCard = function(e, t, a, o) {
void 0 === a && (a = !1);
void 0 === o && (o = null);
var n = cc.instantiate(this.mj_card_mine_prefab);
n.tag = e;
var i = n.getComponent("MJ_Card");
if (e > 0) {
var r = this.getMJCardSF(e);
i.initData(e, r, a);
}
n.parent = t;
o && o(n);
};
t.prototype.showOutActMJ = function(e, t, a) {
var o = cc.instantiate(this.mj_card_mine_prefab);
o.tag = e;
var n = o.getComponent("MJ_Card");
if (e) {
var i = this.getMJCardSF(e);
n.initData(e, i);
}
n.showLight(!0);
o.parent = t;
o.scale = .1;
o.opacity = 0;
var c = cc.spawn(cc.scaleTo(.1, 1), cc.fadeIn(.1)), l = cc.spawn(cc.scaleTo(.1, .1), cc.fadeOut(.1)), _ = cc.sequence(c, cc.delayTime(1), l, cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this));
o.runAction(_);
var d = r.getCardById(e);
s.mp_manager.playPokerSound(s.mp_manager.audioSetting.language, d.suit, a.sex, d.point);
};
t.prototype.showMoreGang = function(e, t) {
this._node_gang = cc.instantiate(this.mj_card_gang_prefab);
this._node_gang.parent = s.ui_manager.getRootNode();
this._node_gang.getComponent("MJ_Gang").initData(e, t);
};
t.prototype.showTingPai = function(e, t) {
var a = s.ui_manager.getRootNode();
if (e) {
if (!this._node_ting || !this._node_ting.isValid) {
this._node_ting = cc.instantiate(this.mj_ting_prefab);
this._node_ting.parent = a;
}
this._node_ting.getComponent("MJ_Ting").initData(t);
} else if (this._node_ting && this._node_ting.isValid) {
this._node_ting.removeFromParent(!0);
this._node_ting.destroy();
this._node_ting = null;
}
};
t.prototype.showSwapAct = function() {
if (s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_SWAPCARD) {
if (!this._act_swap || !this._act_swap.isValid) {
this._act_swap = cc.instantiate(this.act_swap_prefab);
this._act_swap.setPosition(cc.p(0, 12));
this._act_swap.parent = s.ui_manager.getRootNode();
}
this._act_swap.getComponent("MJ_ActionSwap").showSwapCard(s.gm_manager.mjGameData);
} else if (this._act_swap && this._act_swap.isValid && s.gm_manager.mjGameData.tableBaseVo.gameState !== r.MJ_GameState.STATE_TABLE_DINGQUE) {
this._act_swap.removeFromParent(!0);
this._act_swap.destroy();
this._act_swap = null;
}
};
t.prototype.showTxtAct = function(e, t) {
var a = new cc.Node("mjTxtAct");
a.addComponent(cc.Sprite).spriteFrame = e;
a.scale = 2;
a.opacity = 0;
a.setPosition(cc.p(0, 26));
a.parent = s.ui_manager.getRootNode();
var o = cc.spawn(cc.fadeIn(.3), cc.scaleTo(.5, 1)), n = cc.sequence(o, cc.delayTime(.5), cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this));
a.runAction(n);
};
t.prototype.showGFAct = function(e) {
cc.instantiate(this.act_gf_prefab).parent = e;
};
t.prototype.showXYAct = function(e) {
cc.instantiate(this.act_xy_prefab).parent = e;
};
t.prototype.showChat = function() {
s.mp_manager.playAlert();
this.node_chat.active = !0;
this.node_chat.getComponent("Game_Chat").showChatLayer(0);
};
t.prototype.showChatInfo = function(e) {
if (e) {
var t = this._mjTable.getPlayPosById(e.accountId);
if (0 === e.type) {
var a = r.getSeatById(e.accountId);
s.mp_manager.playQuicklySound(a.sex, e.content);
var o = s.mp_manager.quicklyList, n = cc.instantiate(this.chat_show_prefab), i = 1;
t.x > 0 && (i = -1);
n.scaleX = .1 * i;
n.scaleY = .1;
t.y += 80;
n.setPosition(t);
n.getComponent("Game_Chat_Show").showChat(o[e.content - 1].msg, i);
n.parent = s.ui_manager.getRootNode();
var c = cc.sequence(cc.scaleTo(.1, 1 * i, 1), cc.delayTime(1), cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this));
n.runAction(c);
} else {
var l = new cc.Node("bqNode"), _ = l.addComponent(cc.Sprite), d = s.img_manager.chatSpriteFrames[e.content];
_.spriteFrame = d;
l.scale = 0;
t.x = t.x > 0 ? t.x - 80 : t.x + 80;
l.setPosition(cc.p(t.x, t.y + 50));
l.parent = s.ui_manager.getRootNode();
(c = cc.scaleTo(.5, 1)).easing(cc.easeElasticOut(.4));
var u = cc.sequence(c, cc.delayTime(.5), cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this));
l.runAction(u);
}
}
};
t.prototype.showSetting = function() {
s.mp_manager.playAlert();
this.node_setting.active = !0;
this.node_setting.getComponent("Setting").initData(s.gm_manager.mjGameData.tableBaseVo.tableChatType);
};
t.prototype.showDisband = function() {
if (s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_DESTORY) {
if (!this._node_disband || !this._node_disband.isValid) {
this._node_disband = cc.instantiate(this.disband_prefab);
this._node_disband.zIndex = 9;
this._node_disband.parent = s.ui_manager.getRootNode();
}
this._node_disband.getComponent("Game_Disband").initData();
this.unShowPopup();
} else if (this._node_disband && this._node_disband.isValid) {
this._node_disband.removeFromParent(!0);
this._node_disband.destroy();
this._node_disband = null;
}
};
t.prototype.unShowPopup = function() {
this.node_setting.active = !1;
this.node_chat.active = !1;
};
t.prototype.showGameOver = function() {
if (s.gm_manager && s.gm_manager.mjGameData && s.gm_manager.mjGameData.settlementOnce && (!this._game_over || !this._game_over.isValid)) {
this._game_over = cc.instantiate(this.game_over_prefab);
this._game_over.getComponent("Game_Over").initData(s.gm_manager.mjGameData.settlementOnce);
this._game_over.parent = s.ui_manager.getRootNode();
}
};
t.prototype.showRoleInfo = function(e) {
var t = this;
if (s.ui_manager.isShowPopup && s.ui_manager.showLoading()) {
s.mp_manager.playAlert();
var a = {
accountId: e
}, o = JSON.stringify(a);
s.ws_manager.sendMsg(s.protocol.ACCOUNT_ROLE_ACCOUNTID, o, function(e, a) {
if (0 === e) {
var o = a;
if (!t._role || !t._role.isValid) {
s.ui_manager.isShowPopup = !1;
t._role = cc.instantiate(t.role_prefab);
t._role.getComponent("Role").showInfo(o);
t._role.parent = s.ui_manager.getRootNode();
}
} else -1 === e || cc.log(a);
s.ui_manager.hideLoading();
});
}
};
t.prototype.showTSCard = function(e) {
this._mjGame.showTableSelectCard(e);
};
__decorate([ i(cc.Node) ], t.prototype, "node_table", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_game", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_replay", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "role_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "chat_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "chat_show_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "setting_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "disband_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "game_over_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mj_card_left_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mj_card_table_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mj_card_mine_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mj_card_gang_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mj_ting_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "act_swap_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "act_gf_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "act_xy_prefab", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_chat", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_setting", void 0);
__decorate([ i([ cc.Prefab ]) ], t.prototype, "mj_card_group_Prefab", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "unSuit_list", void 0);
__decorate([ i({
type: [ cc.SpriteFrame ],
tooltip: "0=自摸\n 1=胡\n 2=天胡\n 3=地胡\n 4=杠上花\n 5=杠上炮\n 6=碰\n 7=杠\n 8=抢杠\n 9=点炮\n 10=一炮多响\n 11=海底捞月\n 12=呼叫转移\n13=流局\n 14=游戏结束\n"
}) ], t.prototype, "mj_text_list", void 0);
__decorate([ i({
type: [ cc.SpriteFrame ],
tooltip: " 1~9万\n 10~18筒\n 19~27条"
}) ], t.prototype, "mj_sf_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_ActionSwap: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "b82678pT0dAjLoILhefXep6", "MJ_ActionSwap");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_card_list = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.showSwapCard = function(e) {
for (var t = !0, a = 0; a < e.seats.length; a++) if (e.seats[a].btState !== r.MJ_Act_State.ACT_STATE_WAIT) this.node_card_list[a].active = !0; else {
t = !1;
this.node_card_list[a].active = !1;
}
if (t) {
var o = this.node.getComponent(cc.Animation);
switch (e.tableBaseVo.swapCardType) {
case 0:
o.play("mj_swap_r");
break;

case 1:
o.play("mj_swap_l");
break;

case 2:
o.play("mj_swap_d");
}
}
};
t.prototype.swapActEnd = function() {
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i([ cc.Node ]) ], t.prototype, "node_card_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./MJ_Help": "MJ_Help"
} ],
MJ_Action: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "12bc6SoQ0tDwI4iyvXKUnPZ", "MJ_Action");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = (o.property, e("./../../Modules/ModuleManager")), r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._canvasTarget = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = i.ui_manager.getCanvasNode().getComponent("MJCanvas");
};
t.prototype.actionEnd = function() {
this.node.removeFromParent(!0);
this.node.destroy();
};
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
MJ_Card_Group: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "7ff53zmgVJDL64Eox1i+tJS", "MJ_Card_Group");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_card_list = [];
t.imgCardList = [];
t.node_back_list = [];
t._cardId = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.initData = function(e, t, a) {
this._cardId = t;
for (o = 0; o < this.imgCardList.length; o++) this.imgCardList[o].spriteFrame = a;
for (var o = 0; o < this.node_back_list.length; o++) if (o < 3) this.node_back_list[o].active = 0 !== e && 1 !== e; else if (0 !== e) {
this.node_card_list[o].active = !0;
this.node_back_list[o].active = !1;
} else this.node_card_list[o].active = !1;
};
__decorate([ i([ cc.Node ]) ], t.prototype, "node_card_list", void 0);
__decorate([ i([ cc.Sprite ]) ], t.prototype, "imgCardList", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "node_back_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
MJ_Card: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "ebc7aYAv4RBdrWkrj9ZIAYO", "MJ_Card");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.cardImg = null;
t.bsNode = null;
t.light = null;
t.cardBack = null;
t.maskNode = null;
t._isShowMask = !1;
t._isSelect = !1;
t._nomalY = 0;
t._chooseY = 0;
t._cardId = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._nomalY = 0;
this._chooseY = 36;
};
t.prototype.unuse = function() {
this.node.active = !0;
this.node.stopAllActions();
if (this.cardImg) {
this.cardImg.node.active = !1;
this.cardImg.spriteFrame = null;
}
this.cardBack && (this.cardBack.active = !1);
this.bsNode && (this.bsNode.active = !1);
this.light && (this.light.active = !1);
this.maskNode && (this.maskNode.active = !1);
this.node.x = 0;
this.node.y = 0;
this.node.opacity = 255;
this.node.scaleX = Math.abs(this.node.scaleX);
this.node.scaleY = Math.abs(this.node.scaleY);
this.cardImg.node.scaleX = Math.abs(this.cardImg.node.scaleX);
this.cardImg.node.scaleY = Math.abs(this.cardImg.node.scaleY);
this._isSelect = !1;
this._isShowMask = !1;
this._cardId = 0;
};
t.prototype.initData = function(e, t, a) {
void 0 === t && (t = null);
void 0 === a && (a = !1);
this._cardId = e;
this.node.active = !0;
this.node.opacity = 255;
this.cardBack && (this.cardBack.active = a);
if (this.cardImg) {
this.cardImg.node.active = !0;
this.cardImg.spriteFrame = t;
}
this.maskNode && (this.maskNode.active = !1);
this.light && (this.light.active = a);
this.bsNode && (this.bsNode.active = !1);
};
t.prototype.setFixCard = function(e, t) {
this.node.scaleX *= e.x;
this.node.scaleY *= e.y;
this.cardImg.node.scaleX *= t.x;
this.cardImg.node.scaleY *= t.y;
};
t.prototype.showMask = function(e) {
if (this.maskNode) {
this._isShowMask = e;
this.maskNode.active = !0 === e;
}
};
t.prototype.showSelectCard = function(e) {
this._isSelect = e;
if (e) {
this.node.y = this._chooseY;
o.mp_manager.playSelect();
} else this.node.y = this._nomalY;
};
t.prototype.showBS = function(e, t, a) {
void 0 === t && (t = 1);
void 0 === a && (a = 1);
if (this.bsNode) {
this.bsNode.active = e;
if (e) {
this.bsNode.y = Math.abs(this.bsNode.y) * t;
this.bsNode.rotation = Math.abs(this.bsNode.rotation) * a;
}
}
};
t.prototype.showLight = function(e) {
this.light && (this.light.active = e);
};
__decorate([ r(cc.Sprite) ], t.prototype, "cardImg", void 0);
__decorate([ r(cc.Node) ], t.prototype, "bsNode", void 0);
__decorate([ r(cc.Node) ], t.prototype, "light", void 0);
__decorate([ r(cc.Node) ], t.prototype, "cardBack", void 0);
__decorate([ r(cc.Node) ], t.prototype, "maskNode", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"../../Modules/ModuleManager": "ModuleManager"
} ],
MJ_Game_Mine: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "f5253a2foJNNaX6SxL3oJt2", "MJ_Game_Mine");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = e("./MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_mine_card = null;
t.lblTip = null;
t.btn_swap = null;
t.node_lack = null;
t.node_state = null;
t.img_tj = null;
t.node_dq_list = [];
t.node_state_list = [];
t._canvasTarget = null;
t._sId = 0;
t._seatInfo = null;
t._swapCardList = [];
t._handList = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
this._handList = this.node_mine_card.getComponent("MJ_HandList");
};
t.prototype.initData = function() {
this._swapCardList.length = 0;
this.btn_swap.interactable = !1;
this.lblTip.node.active = !1;
this.btn_swap.node.active = !1;
this.node_state.active = !1;
this.node_lack.active = !1;
};
t.prototype.updatePlay = function(e, t) {
this._canvasTarget || (this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas"));
this._handList || (this._handList = this.node_mine_card.getComponent("MJ_HandList"));
this._sId = e;
this._seatInfo = t;
if (r.gm_manager.mjGameData.tableBaseVo.gameState < s.MJ_GameState.STATE_TABLE_DINGQUE) this._seatInfo.handCards = s.getSortCardByCardIds(this._seatInfo.handCards); else if (r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_DINGQUE) if (this._seatInfo.btState !== s.MJ_Act_State.ACT_STATE_WAIT) {
this._seatInfo.handCards = s.getSortCardByCardIds(this._seatInfo.handCards, this._seatInfo.unSuit);
for (var a = 0; a < this.node_dq_list.length; a++) {
this.node_dq_list[a].scale = 1;
this.node_dq_list[a].removeAllChildren();
this.node_dq_list[a].stopAllActions();
}
} else {
this._seatInfo.handCards = s.getSortCardByCardIds(this._seatInfo.handCards);
this.showDQAction();
} else r.gm_manager.mjGameData.tableBaseVo.gameState > s.MJ_GameState.STATE_TABLE_DINGQUE && (this._seatInfo.handCards = s.getSortCardByCardIds(this._seatInfo.handCards, this._seatInfo.unSuit));
r.gm_manager.mjGameData.tableBaseVo.gameState <= s.MJ_GameState.STATE_TABLE_READY && this.initData();
r.gm_manager.mjGameData.tableBaseVo.gameState <= s.MJ_GameState.STATE_TABLE_DINGQUE && this._seatInfo.swapCards && (this._swapCardList = this._seatInfo.swapCards);
this._handList.updateHandList(this._seatInfo, this);
this.showPlayState();
};
t.prototype.unSelectCard = function() {
this._handList.selectCardByCardId(-1);
};
t.prototype.selectSwapCard = function(e, t) {
if (t < 0) {
var a = this._swapCardList.indexOf(e);
-1 !== a && this._swapCardList.splice(a, 1);
this._swapCardList.length < 3 && (this.btn_swap.interactable = !1);
} else if (this._swapCardList.length < 3) {
this._swapCardList.push(e);
3 === this._swapCardList.length && (this.btn_swap.interactable = !0);
return !0;
}
return !1;
};
t.prototype.showPlayState = function() {
switch (r.gm_manager.mjGameData.tableBaseVo.gameState) {
case s.MJ_GameState.STATE_TABLE_READY:
this.lblTip.node.active = !0;
0 === this._seatInfo.btState ? this.lblTip.string = "等待准备..." : this.lblTip.string = "已准备...";
break;

case s.MJ_GameState.STATE_TABLE_SWAPCARD:
this.node_state.active = !1;
this.node_lack.active = !1;
this.lblTip.node.active = !0;
if (0 === this._seatInfo.btState) {
this.lblTip.string = "请选择花色一样的三张牌交换...";
this.btn_swap.node.active = !0;
3 === this._swapCardList.length ? this.btn_swap.interactable = !0 : this.btn_swap.interactable = !1;
} else {
this.lblTip.string = "已选牌...";
this.btn_swap.node.active = !1;
}
break;

case s.MJ_GameState.STATE_TABLE_DINGQUE:
this.node_state.active = !1;
this.btn_swap.node.active = !1;
this.lblTip.node.active = !0;
if (0 === this._seatInfo.btState) {
this.lblTip.string = "请选择一门花色定缺...";
this.node_lack.active = !0;
} else {
this.lblTip.string = "已定缺...";
this.node_lack.active = !1;
}
break;

case s.MJ_GameState.STATE_TABLE_BREAKCARD:
this.showBreakState();
break;

default:
this.lblTip.node.active = !1;
this.node_state.active = !1;
this.node_lack.active = !1;
}
};
t.prototype.showBreakState = function() {
if (this.getIsBreakCardState()) if (this._seatInfo.btState === s.MJ_Act_State.ACT_STATE_WAIT) {
this.node_state.active = !0;
for (var e = 0; e < this._seatInfo.breakCardState.length; e++) this.node_state_list[e] && (1 === this._seatInfo.breakCardState[e] ? this.node_state_list[e].active = !0 : this.node_state_list[e].active = !1);
} else this.node_state.active = !1; else this.node_state.active = !1;
};
t.prototype.getIsBreakCardState = function() {
for (var e = !1, t = 0; t < this._seatInfo.breakCardState.length; t++) if (1 === this._seatInfo.breakCardState[t]) {
e = !0;
break;
}
return e;
};
t.prototype.click_btn_lack = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "0":
cc.log("万");
this._canvasTarget.sendDinQue(s.MJ_Suit.SUIT_TYPE_WAN);
break;

case "1":
cc.log("筒");
this._canvasTarget.sendDinQue(s.MJ_Suit.SUIT_TYPE_TONG);
break;

case "2":
cc.log("条");
this._canvasTarget.sendDinQue(s.MJ_Suit.SUIT_TYPE_TIAO);
}
this.unSelectCard();
};
t.prototype.click_btn_swap = function() {
r.mp_manager.playButton();
if (3 === this._swapCardList.length) {
var e = s.getCardById(this._swapCardList[0]), t = s.getCardById(this._swapCardList[1]), a = s.getCardById(this._swapCardList[2]);
e.suit === t.suit && t.suit === a.suit ? this._canvasTarget.sendSwap(this._swapCardList) : r.ui_manager.showTip("请选择花色一样的三张牌交换");
} else r.ui_manager.showTip("请选择花色一样的三张牌交换");
};
t.prototype.click_btn_state = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "0":
this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_HU, this._seatInfo.breakCard, this.node_state);
break;

case "1":
if (this._seatInfo.seatIndex === r.gm_manager.mjGameData.tableBaseVo.btIndex) {
var a = this._seatInfo.handCards;
this._seatInfo.moPaiCard && r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex && (a = a.concat(this._seatInfo.moPaiCard));
var o = [];
o = s.getSplitList(a).gangList;
if (this._seatInfo.pengCards && this._seatInfo.pengCards.length > 0) {
var n = s.getCardIdsByCardId(this._seatInfo.pengCards, a);
o = o.concat(n);
}
if (o.length > 0) if (o.length > 1) {
this._canvasTarget.showMoreGang(o, this);
this.node_state.active = !1;
} else this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_GANG, o[0], this.node_state); else this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_GANG, this._seatInfo.breakCard, this.node_state);
} else this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_GANG, this._seatInfo.breakCard, this.node_state);
break;

case "2":
this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_PENG, this._seatInfo.breakCard, this.node_state);
break;

case "3":
this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_CHI, this._seatInfo.breakCard, this.node_state);
break;

case "4":
this._canvasTarget.sendOtherBreakCard(s.MJ_Act_Type.ACT_INDEX_DROP, this._seatInfo.breakCard, this.node_state);
}
};
t.prototype.showDQAction = function() {
var e = s.getDingQueSuit(this._seatInfo.handCards);
if (-1 !== e) {
var t = this.node_dq_list[e];
t.stopAllActions();
var a = cc.sequence(cc.scaleTo(.4, .8), cc.scaleTo(.4, 1).easing(cc.easeElasticOut(.4))), o = cc.repeatForever(a);
t.runAction(o);
var n = new cc.Node("tj");
n.addComponent(cc.Sprite).spriteFrame = this.img_tj;
n.setPosition(cc.p(40, 40));
n.parent = t;
}
};
__decorate([ i(cc.Node) ], t.prototype, "node_mine_card", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblTip", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_swap", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_lack", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_state", void 0);
__decorate([ i(cc.SpriteFrame) ], t.prototype, "img_tj", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "node_dq_list", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "node_state_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Game_Others: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "c678faIGcpLU7VqV4xH9xUn", "MJ_Game_Others");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = e("./MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_hand = null;
t.lblTip = null;
t.hand_card_list = [];
t._canvasTarget = null;
t._seatInfo = null;
t._sId = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
};
t.prototype.updatePlay = function(e, t) {
this._canvasTarget || (this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas"));
this._sId = e;
this._seatInfo = t;
this.showPlayState();
this.showHandCard();
this.showMPCard();
};
t.prototype.showHandCard = function() {
if (this._seatInfo.handCardsLen > 0) {
this.node_hand.active = !0;
for (var e = 1; e < this.hand_card_list.length; e++) e > this._seatInfo.handCardsLen ? this.hand_card_list[e].active = !1 : this.hand_card_list[e].active = !0;
} else this.node_hand.active = !1;
};
t.prototype.showMPCard = function() {
r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex && this._seatInfo.moPaiCard ? this.hand_card_list[0].active = !0 : this.hand_card_list[0].active = !1;
};
t.prototype.showPlayState = function() {
switch (r.gm_manager.mjGameData.tableBaseVo.gameState) {
case s.MJ_GameState.STATE_TABLE_IDLE:
this.hand_card_list[0].active = !1;
this.node_hand.active = !1;
break;

case s.MJ_GameState.STATE_TABLE_READY:
this.hand_card_list[0].active = !1;
this.node_hand.active = !1;
this.lblTip.node.active = !0;
0 === this._seatInfo.btState ? this.lblTip.string = "等待准备..." : this.lblTip.string = "已准备...";
break;

case s.MJ_GameState.STATE_TABLE_SWAPCARD:
this.lblTip.node.active = !0;
0 === this._seatInfo.btState ? this.lblTip.string = "正在选牌..." : this.lblTip.string = "已选牌...";
break;

case s.MJ_GameState.STATE_TABLE_DINGQUE:
this.lblTip.node.active = !0;
0 === this._seatInfo.btState ? this.lblTip.string = "定缺中..." : this.lblTip.string = "已定缺...";
break;

default:
this.lblTip.node.active = !1;
}
};
__decorate([ i(cc.Node) ], t.prototype, "node_hand", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblTip", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "hand_card_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Game: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "dd7c2KANLZA3p3QfIDFntZv", "MJ_Game");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblTime = null;
t.lblGameInfo = null;
t.node_state_list = [];
t.node_player_list = [];
t.node_group_list = [];
t.node_playOut_list = [];
t.node_act_list = [];
t.node_hu_list = [];
t.node_img_hu_list = [];
t._nowTime = 0;
t._cdTime = 0;
t._canvasTarget = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
};
t.prototype.initData = function() {
for (e = 0; e < this.node_img_hu_list.length; e++) this.node_img_hu_list[e].active = !1;
for (e = 0; e < this.node_group_list.length; e++) this.node_group_list[e].removeAllChildren();
for (e = 0; e < this.node_act_list.length; e++) this.node_act_list[e].removeAllChildren();
for (e = 0; e < this.node_playOut_list.length; e++) this.node_playOut_list[e].removeAllChildren();
for (var e = 0; e < this.node_hu_list.length; e++) this.node_hu_list[e].removeAllChildren();
};
t.prototype.showTableState = function() {
this._nowTime = r.getDiffTime(s.gm_manager.mjGameData.tableBaseVo.svrTime, s.gm_manager.mjGameData.tableBaseVo.actTime);
this.lblTime.string = this._nowTime + "";
this.lblGameInfo.string = "<color=#4ecab1>剩余 </c><color=#ffc600>" + s.gm_manager.mjGameData.tableBaseVo.tableCardNum + "</c><color=#4ecab1> 张</c><color=#4ecab1>   第 </c><color=#ffc600>" + s.gm_manager.mjGameData.tableBaseVo.currGameNum + "/" + s.gm_manager.mjGameData.tableBaseVo.maxGameNum + "</c><color=#4ecab1> 局</c>";
for (var e = r.getIndexBySeatId(s.gm_manager.mjGameData.tableBaseVo.btIndex), t = 0; t < this.node_state_list.length; t++) this.node_state_list[t].active = e === t;
};
t.prototype.update = function(e) {
if (s.gm_manager && !s.gm_manager.isReplayPause && this._nowTime > 0) {
this._cdTime -= e;
if (this._cdTime < 0) {
this._cdTime = 1;
this._nowTime--;
this.lblTime.string = this._nowTime + "";
this._nowTime <= 2 && this.showPhoneVibration();
}
}
};
t.prototype.showPhoneVibration = function() {
if (r.MJ_GameState.STATE_TABLE_OVER_ALL !== s.gm_manager.mjGameData.tableBaseVo.gameState && r.MJ_GameState.STATE_TABLE_OVER_ONCE !== s.gm_manager.mjGameData.tableBaseVo.gameState && r.MJ_GameState.STATE_TABLE_DESTORY !== s.gm_manager.mjGameData.tableBaseVo.gameState && r.MJ_GameState.STATE_TABLE_READY !== s.gm_manager.mjGameData.tableBaseVo.gameState) {
var e = r.getSeatById(s.ud_manager.mineData.accountId);
if (e) if (r.MJ_GameState.STATE_TABLE_FAPAI === s.gm_manager.mjGameData.tableBaseVo.gameState) s.js_call_native.phoneVibration(); else if (r.MJ_GameState.STATE_TABLE_BREAKCARD === s.gm_manager.mjGameData.tableBaseVo.gameState) {
for (var t = !1, a = 0; a < e.breakCardState.length; a++) if (1 === e.breakCardState[a]) {
t = !0;
break;
}
t && s.js_call_native.phoneVibration();
} else e.seatIndex === s.gm_manager.mjGameData.tableBaseVo.btIndex && s.js_call_native.phoneVibration();
}
};
t.prototype.showGameInfo = function() {
this._canvasTarget || (this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas"));
s.gm_manager.mjGameData.tableBaseVo.gameState <= r.MJ_GameState.STATE_TABLE_READY && this.initData();
this.showTableState();
this.showPlayCard();
};
t.prototype.showPlayCard = function() {
for (var e = 0; e < this.node_player_list.length; e++) {
var t = s.gm_manager.mjGameData.seats[e];
if (t && t.accountId && "" !== t.accountId && "0" !== t.accountId) {
0 === e ? this.node_player_list[e].getComponent("MJ_Game_Mine").updatePlay(e, t) : this.node_player_list[e].getComponent("MJ_Game_Others").updatePlay(e, t);
this.showGroupCard(e, t);
this.showSeatPlayOutCard(e, t);
this.showPlayOutAct(e, t);
this.showHuPai(e, t);
}
}
};
t.prototype.showTableSelectCard = function(e) {
for (var t = r.getCardById(e), a = [], o = 0; o < this.node_playOut_list.length; o++) {
var n = this.node_playOut_list[o];
n && (a = a.concat(n.children));
}
for (var i = 0; i < a.length; i++) {
var s = a[i], c = r.getCardById(s.tag), l = s.getComponent("MJ_Card");
c.suit === t.suit && c.point === t.point ? l.showLight(!0) : l.showLight(!1);
}
};
t.prototype.showGroupCard = function(e, t) {
var a = this.node_group_list[e];
if (a && t && t.accountId && "" !== t.accountId && "0" !== t.accountId) {
a.removeAllChildren();
if (t.pengCards) for (o = 0; o < t.pengCards.length; o++) this._canvasTarget.showGroupCard(0, t.pengCards[o], e, a);
if (t.baGangCards) for (o = 0; o < t.baGangCards.length; o++) this._canvasTarget.showGroupCard(1, t.baGangCards[o], e, a);
if (t.anGangCards) for (var o = 0; o < t.anGangCards.length; o++) this._canvasTarget.showGroupCard(2, t.anGangCards[o], e, a);
}
};
t.prototype.createOutCard = function(e, t, a, o) {
this._canvasTarget.showPlayOutCard(a, o.outUnUseCards[e], t, function(t) {
if (0 === a) {
var n = e % 10 * t.width + t.width / 2, i = Math.floor(e / 10) * (t.height - 10) + t.height / 2;
t.setPosition(cc.p(n, i));
t.zIndex = 99 - e;
} else if (1 === a) {
var n = -Math.floor(e / 10) * t.width - t.width / 2, i = e % 10 * (t.height - 12) + t.height / 2;
t.setPosition(cc.p(n, i));
t.zIndex = 99 - e;
}
if (o.outCard && e === o.outUnUseCards.length - 1 && o.seatIndex === s.gm_manager.mjGameData.tableBaseVo.prevBtIndex) {
var r = t.getComponent("MJ_Card");
switch (a) {
case 0:
r.showBS(!0, 1, -1);
break;

case 1:
r.showBS(!0);
break;

case 2:
r.showBS(!0, -1, 1);
break;

case 3:
r.showBS(!0);
}
}
});
};
t.prototype.showSeatPlayOutCard = function(e, t) {
var a = this.node_playOut_list[e];
if (a && t && t.accountId && "" !== t.accountId && "0" !== t.accountId) {
a.removeAllChildren();
if (t.outUnUseCards) for (var o = 0; o < t.outUnUseCards.length; o++) this.createOutCard(o, a, e, t);
}
};
t.prototype.showPlayOutAct = function(e, t) {
var a = this.node_act_list[e];
if (a && t && t.accountId && "" !== t.accountId && "0" !== t.accountId && s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_OUTCARD && t.seatIndex === s.gm_manager.mjGameData.tableBaseVo.btIndex && t.btState === r.MJ_Act_State.ACT_STATE_BT && t.outCard) {
this._canvasTarget.showOutActMJ(t.outCard, a, t);
s.mp_manager.playOut();
}
};
t.prototype.showHuPai = function(e, t) {
var a = this.node_hu_list[e], o = this.node_img_hu_list[e];
if (a) {
a.removeAllChildren();
if (0 !== t.huPaiType && t.huCards) {
for (var n = 0; n < t.huCards.length; n++) this._canvasTarget.showPlayOutCard(e, t.huCards[n], a, function(e) {
e.getComponent("MJ_Card").showLight(!0);
});
if (o) {
o.active = !0;
o.getComponent(cc.Sprite).spriteFrame = 1 === t.huPaiType ? this._canvasTarget.mj_text_list[0] : this._canvasTarget.mj_text_list[1];
}
} else o.active = !1;
}
};
t.prototype.showBreakStates = function() {
if (s.gm_manager.mjGameData && s.gm_manager.mjGameData.breakSeats) for (var e = s.gm_manager.mjGameData.breakSeats, t = 0, a = 0; a < e.length; a++) {
var o = r.getIndexBySeatId(e[a]);
if (-1 !== o && this.node_player_list[o]) {
var n = s.gm_manager.mjGameData.seats[o];
if (n && n.accountId && "" !== n.accountId && "0" !== n.accountId) {
this.showBreakStateAct(s.gm_manager.mjGameData.breakState, o, n, t);
t++;
}
}
}
};
t.prototype.showBreakStateAct = function(e, t, a, o) {
var n = this.node_act_list[t];
if (n) {
var i = null;
switch (e) {
case r.MJ_Act_Type.ACT_INDEX_HU:
i = this.getHuPaiSF(a);
0 === o && (1 === a.huPaiType ? s.mp_manager.playPokerSound(s.mp_manager.audioSetting.language, 4, a.sex, 4) : s.mp_manager.playPokerSound(s.mp_manager.audioSetting.language, 4, a.sex, 1));
break;

case r.MJ_Act_Type.ACT_INDEX_GANG:
i = this._canvasTarget.mj_text_list[7];
0 === o && s.mp_manager.playPokerSound(s.mp_manager.audioSetting.language, 4, a.sex, 2);
switch (a.gangType) {
case 1:
this._canvasTarget.showGFAct(n);
break;

case 2:
case 3:
this._canvasTarget.showXYAct(n);
}
break;

case r.MJ_Act_Type.ACT_INDEX_PENG:
i = this._canvasTarget.mj_text_list[6];
0 === o && s.mp_manager.playPokerSound(s.mp_manager.audioSetting.language, 4, a.sex, 3);
}
this._canvasTarget.showTxtAct(i, n);
}
};
t.prototype.getHuPaiSF = function(e) {
var t = null;
if (s.gm_manager.mjGameData.breakSeats.length > 1) t = t = this._canvasTarget.mj_text_list[10]; else switch (e.huPaiType) {
case 0:
t = null;
break;

case 1:
t = this._canvasTarget.mj_text_list[0];
break;

case 2:
t = this._canvasTarget.mj_text_list[9];
break;

case 3:
t = this._canvasTarget.mj_text_list[8];
break;

case 4:
case 5:
t = this._canvasTarget.mj_text_list[4];
break;

case 6:
t = this._canvasTarget.mj_text_list[5];
}
return t;
};
__decorate([ i(cc.Label) ], t.prototype, "lblTime", void 0);
__decorate([ i(cc.RichText) ], t.prototype, "lblGameInfo", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "node_state_list", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "node_player_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_group_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_playOut_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_act_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_hu_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_img_hu_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Gang: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "75d9a1MpqtDs7A8tRAgyzRv", "MJ_Gang");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_card = null;
t.nodeLayout = null;
t._canvasTarget = null;
t._target = null;
t.MJ_Gang_Touch_Start = function(e) {
e.currentTarget.color = cc.Color.GRAY;
e.stopPropagation();
};
t.MJ_Gang_Touch_End = function(e) {
var a = e.currentTarget;
a.color = cc.Color.WHITE;
var o = a.getComponent("MJ_Card");
t._canvasTarget.sendOtherBreakCard(r.MJ_Act_Type.ACT_INDEX_GANG, o._cardId, null);
t.node.removeFromParent(!0);
t.node.destroy();
e.stopPropagation();
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.node.on("touchend", function(t) {
e._target.node_state.active = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
this.node_card.on("touchstart", this.MJ_Gang_Touch_Start, this);
this.node_card.on("touchend", this.MJ_Gang_Touch_End, this);
};
t.prototype.initData = function(e, t) {
this._target = t;
if (e && e.length > 0) {
this.updateCardData(e[0], this.node_card);
if (e.length > 1) for (var a = 1; a < e.length; a++) {
var o = cc.instantiate(this.node_card);
this.updateCardData(e[a], o);
o.on("touchstart", this.MJ_Gang_Touch_Start, this);
o.on("touchend", this.MJ_Gang_Touch_End, this);
o.parent = this.nodeLayout;
}
}
};
t.prototype.updateCardData = function(e, t) {
var a = t.getComponent("MJ_Card"), o = this._canvasTarget.getMJCardSF(e);
a.initData(e, o);
};
__decorate([ i(cc.Node) ], t.prototype, "node_card", void 0);
__decorate([ i(cc.Node) ], t.prototype, "nodeLayout", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_HandList: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "5e0d0xG1rVMO4soweFeiv/k", "MJ_HandList");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = e("./MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_hand = null;
t._firstPos = cc.p(0, 0);
t._endPos = cc.p(0, 0);
t._canvasTarget = null;
t._mineScript = null;
t._hand_card_list = [];
t._seatInfo = null;
t._selectCard = null;
t._selectCardPos = cc.v2(0, 0);
t._selectCardZIndex = 0;
t._moveDelta = 0;
t._swapState = 0;
t._tingsList = [];
t._huList = [];
t.wans = [];
t.tongs = [];
t.tiaos = [];
t._moPaiCardId = -1;
t._isCanPlay = !1;
t.touchBegan = function(e) {
e.stopPropagation();
if (!(e.getTouches().length > 1)) if (!r.gm_manager.touchTarget && t._isCanPlay) {
r.gm_manager.touchTarget = e.touch;
var a = e.getTouches();
t._firstPos = a[0].getLocation();
var o = t.getCardNodeByTouch(t._firstPos);
if (o) {
t._selectCardPos = o.getPosition();
if (o.getComponent("MJ_Card")._isShowMask) t._selectCard = null; else {
t._selectCard = o;
t._selectCard.color = cc.Color.GRAY;
t._selectCardZIndex = t._selectCard.zIndex;
t._selectCard.zIndex = 99;
}
}
} else {
r.gm_manager.touchTarget = null;
if (t._selectCard) {
t._selectCard.setPosition(t._selectCardPos);
t._selectCard.zIndex = t._selectCardZIndex;
t._selectCard = null;
}
}
};
t.touchMoved = function(e) {
e.stopPropagation();
if (!(e.getTouches().length > 1) && r.gm_manager.touchTarget === e.touch && t.node.isValid && t._selectCard && t._isCanPlay) {
var a = e.getTouches();
t._endPos = a[0].getLocation();
var o = a[0].getDelta(), n = t._selectCard.getPosition(), i = cc.pAdd(o, n);
t._selectCard.setPosition(i);
var s = Math.abs(o.x), c = Math.abs(o.y);
t._moveDelta += Math.sqrt(s * s + c * c);
}
};
t.touchEnd = function(e) {
e.stopPropagation();
if (!(e.getTouches().length > 1) && r.gm_manager.touchTarget === e.touch) {
if (t._selectCard) {
t._selectCard.setPosition(t._selectCardPos);
t._selectCard.zIndex = t._selectCardZIndex;
if (t._isCanPlay) {
var a = e.getTouches();
t._endPos = a[0].getLocation();
t.setSelectCard(t._selectCard);
t._moveDelta = 0;
}
t._selectCard = null;
}
r.gm_manager.touchTarget = null;
}
};
return t;
}
__extends(t, e);
t.prototype.setSelectCard = function(e) {
this._canvasTarget.showTingPai(!1);
if (e && e.isValid) {
e.color = cc.Color.WHITE;
var t = e.getComponent("MJ_Card");
if (r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_SWAPCARD) if (t._isSelect) {
t.showSelectCard(!1);
this._mineScript.selectSwapCard(t._cardId, -1);
} else {
var a = this._mineScript.selectSwapCard(t._cardId, 1);
t.showSelectCard(a);
} else if (t._isShowMask) {
cc.log("不能打这张牌");
t.showSelectCard(!1);
} else if (t._isSelect) if (this._moveDelta > 80) {
var o = cc.pDistance(this._firstPos, this._endPos), n = this._endPos.y - this._firstPos.y;
if (o > 150 && n > 80) {
cc.log("打出这张牌,拖动距离：" + o + ";拖动高度：" + n);
if (this._seatInfo.seatIndex === r.gm_manager.mjGameData.tableBaseVo.btIndex) {
this._canvasTarget.sendOutCard(t._cardId);
this.deleteCardByNode(e);
}
} else {
cc.log("选中这张牌");
this.selectCardByCardId(t._cardId);
this._canvasTarget.showTSCard(t._cardId);
}
} else {
cc.log("打出这张牌");
if (this._seatInfo.seatIndex === r.gm_manager.mjGameData.tableBaseVo.btIndex) {
this._canvasTarget.sendOutCard(t._cardId);
this.deleteCardByNode(e);
} else t.showSelectCard(!1);
} else {
var o = cc.pDistance(this._firstPos, this._endPos), n = this._endPos.y - this._firstPos.y;
if (o > 200 && n > 80) {
cc.log("打出这张牌,拖动距离：" + o + ";拖动高度：" + n);
if (this._seatInfo.seatIndex === r.gm_manager.mjGameData.tableBaseVo.btIndex) {
this._canvasTarget.sendOutCard(t._cardId);
this.deleteCardByNode(e);
}
} else {
cc.log("选中这张牌");
this.selectCardByCardId(t._cardId);
this._canvasTarget.showTSCard(t._cardId);
}
}
}
};
t.prototype.onTouchEvent = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.touchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoved, this);
};
t.prototype.onLoad = function() {
for (var e = 1; e < 4; e++) for (var t = 1; t < 10; t++) {
var a = {
cardId: 0,
suit: e,
point: t
};
switch (e) {
case 1:
this.wans.push(a);
break;

case 2:
this.tongs.push(a);
break;

case 3:
this.tiaos.push(a);
}
}
this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.onTouchEvent();
};
t.prototype.initData = function() {
this._canvasTarget || (this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas"));
this._hand_card_list.length = 0;
this.node_hand.removeAllChildren();
};
t.prototype.getIsCP = function() {
var e = !1;
switch (r.gm_manager.mjGameData.tableBaseVo.gameState) {
case s.MJ_GameState.STATE_TABLE_SWAPCARD:
e = !this._seatInfo.swapCards;
break;

case s.MJ_GameState.STATE_TABLE_OUTCARD:
e = this._seatInfo.btState === s.MJ_Act_State.ACT_STATE_WAIT && this._seatInfo.seatIndex === r.gm_manager.mjGameData.tableBaseVo.btIndex;
}
return e;
};
t.prototype.updateHandList = function(e, t) {
this._canvasTarget || (this._canvasTarget = r.ui_manager.getCanvasNode().getComponent("MJCanvas"));
r.gm_manager.mjGameData.tableBaseVo.gameState <= s.MJ_GameState.STATE_TABLE_READY && this.initData();
this._mineScript = t;
this._seatInfo = e;
this._isCanPlay = this.getIsCP();
var a = this.getIsUnSuit(), o = [];
this._seatInfo.handCards && (o = this._seatInfo.handCards);
if (this._seatInfo.moPaiCard > 0) {
o = o.concat(this._seatInfo.moPaiCard);
this._moPaiCardId = this._seatInfo.moPaiCard;
}
r.gm_manager.mjGameData.tableBaseVo.gameState !== s.MJ_GameState.STATE_TABLE_OUTCARD && this._canvasTarget.showTingPai(!1);
this.showHandCard(o, this._moPaiCardId, a);
this.deleteNotCard(o);
this.showTingCard(o);
this.showSwapCards();
};
t.prototype.showSwapCards = function() {
if (r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_DINGQUE) {
if (0 === this._swapState) {
this._swapState = 1;
if (this._seatInfo.swapCards && this._seatInfo.swapCards.length > 0 && this._seatInfo.unSuit < 1) for (var e = 0; e < this._seatInfo.swapCards.length; e++) for (var t = 0; t < this._hand_card_list.length; t++) {
var a = this._hand_card_list[t];
if (a.tag === this._seatInfo.swapCards[e]) {
a.getComponent("MJ_Card").showSelectCard(!0);
break;
}
}
}
} else this._swapState = 0;
};
t.prototype.showTingCard = function(e) {
this._tingsList.length = 0;
this._huList.length = 0;
var t = !1;
r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_OUTCARD && r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex && this._seatInfo.btState === s.MJ_Act_State.ACT_STATE_WAIT && (t = !0);
for (var a = 0; a < this._hand_card_list.length; a++) {
var o = this._hand_card_list[a], n = o.getComponent("MJ_Card");
if (t) {
var i = this.getTingsByCardId(e, o.tag);
if (i && i.length > 0) {
this._tingsList.push(o.tag);
this._huList.push(i);
n.showBS(!0, 1, -1);
}
} else n.showBS(!1, 1, -1);
}
};
t.prototype.showHandCard = function(e, t, a) {
var o = this, n = !1, i = !1;
r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_BREAKCARD ? n = this.getIsMyBreakState() : r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_SWAPCARD && (i = this.getIsAllSwap());
for (var c = this, l = 0; l < e.length; l++) !function() {
var r = l, s = e[l], _ = c.getCardNodeByCardId(s, l);
s !== t ? _ ? c.fixCardNode(_, r, n, i, a) : c._canvasTarget.showMineCard(s, c.node_hand, !1, function(e) {
var t = cc.p(r * -e.width - e.width / 2, 0);
e.setPosition(t);
o._hand_card_list.push(e);
o.showUnSuit(e, a);
}) : c.showMPCard(r, s, _, a);
}();
};
t.prototype.fixCardNode = function(e, t, a, o, n) {
r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_OUTCARD ? r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex && this._seatInfo.btState !== s.MJ_Act_State.ACT_STATE_WAIT ? this.moveCardAct(t, e) : 1 === r.gm_manager.replayMJ && this.moveCardAct(t, e) : r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_BREAKCARD ? a && this.moveCardAct(t, e) : r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_SWAPCARD ? o ? this.moveCardAct(t, e, !1) : this._seatInfo.swapCards && this.moveCardAct(t, e) : r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_DINGQUE ? this._seatInfo.unSuit && this._seatInfo.unSuit > 0 ? this.moveCardAct(t, e, !1) : 0 === this._swapState && this.moveCardAct(t, e, !1) : 1 === r.gm_manager.replayMJ && this.moveCardAct(t, e);
this.showUnSuit(e, n);
};
t.prototype.getIsMyBreakState = function() {
var e = r.gm_manager.mjGameData.breakSeats;
if (e) for (var t = 0; t < e.length; t++) if (e[t] === this._seatInfo.seatIndex) return !0;
return !1;
};
t.prototype.getIsAllSwap = function() {
for (var e = r.gm_manager.mjGameData.seats, t = 0; t < e.length; t++) if (e[t] && "0" !== e[t].accountId && e[t].btState === s.MJ_Act_State.ACT_STATE_WAIT) return !1;
return !0;
};
t.prototype.showMPCard = function(e, t, a, o) {
var n = this;
if (r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex) if (this._seatInfo.btState === s.MJ_Act_State.ACT_STATE_WAIT && this._seatInfo.moPaiCard > 0) a ? a.setPosition(a.width, 0) : this._canvasTarget.showMineCard(this._seatInfo.moPaiCard, this.node_hand, !1, function(e) {
e.setPosition(e.width, 0);
n._hand_card_list.push(e);
n.showUnSuit(e, o);
}); else if (a) if (r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_OUTCARD || r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_BREAKCARD) {
this.showUnSuit(a, o);
if (this._seatInfo.btState !== s.MJ_Act_State.ACT_STATE_WAIT) {
cc.log("-----移动摸牌---" + this._seatInfo);
var i = cc.p(e * -a.width - a.width / 2, 0);
a.setPosition(i);
a.scale = 0;
a.runAction(cc.scaleTo(.2, 1));
this._moPaiCardId = -1;
}
} else {
this.deleteCardNodeByCardId(t);
this.deleteCardByNode(a);
}
};
t.prototype.moveCardAct = function(e, t, a) {
void 0 === a && (a = !0);
var o = cc.p(e * -t.width - t.width / 2, 0), n = t.getPosition();
if (o.x !== n.x || o.y !== n.y) if (a) {
var i = cc.pDistance(n, o);
t.runAction(cc.moveTo(i / 1e3, o));
} else t.setPosition(o);
};
t.prototype.insertCardAct = function(e, t, a) {
var o = cc.p(e * -t.width - t.width / 2, 0), n = cc.pDistance(a, o) / 1500, i = null;
if (e > 0) {
var r = cc.spawn(cc.rotateTo(.3, 20), cc.moveTo(.3, cc.p(a.x, a.y + t.height + 0))), s = cc.moveTo(n, cc.p(o.x, o.y + t.height + 0));
i = cc.sequence(r, s, cc.rotateTo(.12, 0), cc.moveTo(.3, o));
} else i = cc.moveTo(n, cc.p(o.x, o.y));
t.runAction(i);
};
t.prototype.deleteNotCard = function(e) {
for (var t = 0; t < this._hand_card_list.length; t++) {
var a = this._hand_card_list[t];
if (-1 === this.getIndexByCardId(a.tag)) {
cc.log("---删除---" + a.tag);
this._hand_card_list.splice(t, 1);
a.removeFromParent(!0);
a.destroy();
t -= 1;
}
}
};
t.prototype.deleteCardByNode = function(e) {
for (var t = 0; t < this._hand_card_list.length; t++) {
var a = this._hand_card_list[t];
if (e === a) {
this._hand_card_list.splice(t, 1);
a.removeFromParent(!0);
a.destroy();
break;
}
}
};
t.prototype.deleteCardNodeByCardId = function(e) {
for (var t = 0; t < this._hand_card_list.length; t++) {
var a = this._hand_card_list[t];
if (a.tag === e) {
a.removeFromParent(!0);
a.destroy();
this._hand_card_list.splice(t, 1);
break;
}
}
};
t.prototype.showUnSuit = function(e, t) {
if (e) {
var a = e.getComponent("MJ_Card");
t ? a.showMask(!1) : s.getCardById(a._cardId).suit === this._seatInfo.unSuit ? a.showMask(!1) : a.showMask(!0);
}
};
t.prototype.getCardNodeByCardId = function(e, t) {
void 0 === t && (t = 0);
var a = null;
if (e > 0) for (var o = 0; o < this._hand_card_list.length; o++) {
var n = this._hand_card_list[o];
if (n.tag === e) {
a = n;
break;
}
}
return a;
};
t.prototype.getIndexByCardId = function(e) {
if (e === this._seatInfo.moPaiCard) return this._seatInfo.handCards.length;
for (var t = 0; t < this._seatInfo.handCards.length; t++) if (this._seatInfo.handCards[t] === e) return t;
return -1;
};
t.prototype.getCardNodeByTouch = function(e) {
for (var t = null, a = 0; a < this._hand_card_list.length; a++) {
var o = this._hand_card_list[a];
if (o.isValid) {
var n = o.getBoundingBoxToWorld();
if (cc.rectContainsPoint(n, e)) {
t = o;
break;
}
}
}
return t;
};
t.prototype.selectCardByCardId = function(e) {
for (var t = 0; t < this._hand_card_list.length; t++) {
var a = this._hand_card_list[t].getComponent("MJ_Card");
if (a._cardId === e) {
a.showSelectCard(!0);
var o = this._tingsList.indexOf(e);
if (-1 !== o) {
cc.log("显示胡牌");
this._canvasTarget.showTingPai(!0, this._huList[o]);
}
} else a.showSelectCard(!1);
}
};
t.prototype.getIsUnSuit = function() {
var e = this._seatInfo.handCards;
this._seatInfo.moPaiCard && r.gm_manager.mjGameData.tableBaseVo.btIndex === this._seatInfo.seatIndex && (e = e.concat(this._seatInfo.moPaiCard));
for (var t = !0, a = 0; a < e.length; a++) if (s.getCardById(e[a]).suit === this._seatInfo.unSuit) {
t = !1;
break;
}
return t;
};
t.prototype.canHuPai = function(e) {
if (e.length % 3 != 2) return !1;
if (this.getSuits(e).length > 2) return !1;
if (2 === e.length) return e[0].point === e[1].point && e[0].suit === e[1].suit;
var t = e.map(function(e) {
return 10 * e.suit + e.point;
}, this);
t.sort();
if (this.checkQiDui(t)) return !0;
for (var a = this.getDuplicate(t), o = 0; o < a.length; o++) {
for (var n = a[o], i = t.slice(0), r = 0; r < 2; r++) {
var s = i.indexOf(n);
i.splice(s, 1);
}
if (this.checkRemaining(i)) return !0;
}
return !1;
};
t.prototype.getSuits = function(e) {
var t = [];
e.forEach(function(e) {
-1 === t.indexOf(e.suit) && t.push(e.suit);
}, this);
return t;
};
t.prototype.checkRemaining = function(e) {
if (0 === e.length) return !0;
if (e[0] === e[1] && e[1] === e[2]) {
t = e.slice(3);
return this.checkRemaining(t);
}
if (-1 !== e.indexOf(e[0] + 1) && -1 !== e.indexOf(e[0] + 2)) {
for (var t = e.slice(0), a = 0, o = 0, n = 0; n < 3; n++) {
a = t.splice(o, 1)[0];
o = t.indexOf(a + 1);
}
return this.checkRemaining(t);
}
return !1;
};
t.prototype.getDuplicate = function(e) {
var t = [];
e.forEach(function(a) {
e.indexOf(a) !== e.lastIndexOf(a) && -1 === t.indexOf(a) && t.push(a);
});
return t;
};
t.prototype.checkQiDui = function(e) {
if (14 !== e.length) return !1;
for (var t = 0; t < 13; t += 2) if (e[t] !== e[t + 1]) return !1;
return !0;
};
t.prototype.getTingPai = function(e) {
var t = this, a = [], o = [], n = this.getSuits(e);
if (n.length > 2 || n.indexOf(this._seatInfo.unSuit) > -1) return [];
n.forEach(function(e) {
switch (e) {
case 1:
o = o.concat(t.wans);
break;

case 2:
o = o.concat(t.tongs);
break;

case 3:
o = o.concat(t.tiaos);
}
}, this);
o.forEach(function(o) {
var n = e.slice(0);
n.push(o);
t.canHuPai(n) && a.push(o);
}, this);
return a;
};
t.prototype.getTingsByCardId = function(e, t) {
var a = e.slice(0), o = a.indexOf(t);
a.splice(o, 1);
var n = a.map(function(e) {
return s.getCardById(e);
}, this), i = this.getTingPai(n);
return i.length > 0 ? i : null;
};
t.prototype.playCardAct = function(e, t) {
var a = e.parent.convertToWorldSpaceAR(e.getPosition());
a = this.node_hand.convertToNodeSpaceAR(a);
e.setPosition(a);
e.parent = this.node_hand;
t.x = Math.floor(t.x / e.width) * e.width + e.width / 2;
var o = cc.pDistance(a, t) / 1500, n = cc.spawn(cc.rotateTo(.3, 20), cc.moveTo(.3, cc.p(a.x, a.y + e.height + 0))), i = cc.moveTo(o, cc.p(t.x, t.y + e.height + 0)), r = cc.sequence(n, i, cc.rotateTo(.12, 0), cc.moveTo(.3, t), cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this));
e.runAction(r);
};
__decorate([ i(cc.Node) ], t.prototype, "node_hand", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Help: [ function(e, t, a) {
"use strict";
function o(e) {
return {
cardId: e,
suit: Math.floor((e - 1) / 36) + 1,
point: Math.floor((e - 1) % 36 / 4) + 1
};
}
function n(e, t, a, o) {
void 0 === o && (o = s.SUIT_TYPE_NAN);
var n = [];
switch (o) {
case s.SUIT_TYPE_NAN:
n = [ a, t, e ];
break;

case s.SUIT_TYPE_WAN:
n = [ e, a, t ];
break;

case s.SUIT_TYPE_TONG:
n = [ t, a, e ];
break;

case s.SUIT_TYPE_TIAO:
n = [ a, t, e ];
}
return n;
}
function i(e) {
return e instanceof Object || e instanceof Array ? JSON.parse(JSON.stringify(e)) : e;
}
function r(e) {
if (!c.default.getInstance().mjGameData || !c.default.getInstance().mjGameData.seats) return null;
for (var t = 0; t < c.default.getInstance().mjGameData.seats.length; t++) {
var a = c.default.getInstance().mjGameData.seats[t];
if (a.accountId === e) return a;
}
return null;
}
cc._RF.push(t, "fbb42I1P3FEoK756ak8qGNt", "MJ_Help");
Object.defineProperty(a, "__esModule", {
value: !0
});
var s, c = e("../../Modules/GMManager"), l = e("../../Modules/UDManager");
!function(e) {
e[e.SUIT_TYPE_NAN = 0] = "SUIT_TYPE_NAN";
e[e.SUIT_TYPE_WAN = 1] = "SUIT_TYPE_WAN";
e[e.SUIT_TYPE_TONG = 2] = "SUIT_TYPE_TONG";
e[e.SUIT_TYPE_TIAO = 3] = "SUIT_TYPE_TIAO";
}(s = a.MJ_Suit || (a.MJ_Suit = {}));
!function(e) {
e[e.ACT_STATE_DROP = -1] = "ACT_STATE_DROP";
e[e.ACT_STATE_WAIT = 0] = "ACT_STATE_WAIT";
e[e.ACT_STATE_BT = 1] = "ACT_STATE_BT";
}(a.MJ_Act_State || (a.MJ_Act_State = {}));
!function(e) {
e[e.ACT_INDEX_HU = 0] = "ACT_INDEX_HU";
e[e.ACT_INDEX_GANG = 1] = "ACT_INDEX_GANG";
e[e.ACT_INDEX_PENG = 2] = "ACT_INDEX_PENG";
e[e.ACT_INDEX_CHI = 3] = "ACT_INDEX_CHI";
e[e.ACT_INDEX_DROP = 4] = "ACT_INDEX_DROP";
}(a.MJ_Act_Type || (a.MJ_Act_Type = {}));
!function(e) {
e[e.HUPAI_TYPE_NONE = 0] = "HUPAI_TYPE_NONE";
e[e.HUPAI_TYPE_ZIMO = 1] = "HUPAI_TYPE_ZIMO";
e[e.HUPAI_TYPE_DIANPAO = 2] = "HUPAI_TYPE_DIANPAO";
e[e.HUPAI_TYPE_QIANGGANG = 3] = "HUPAI_TYPE_QIANGGANG";
e[e.HUPAI_TYPE_GANGFLOW = 4] = "HUPAI_TYPE_GANGFLOW";
e[e.HUPAI_TYPE_DIANGANGFLOW = 5] = "HUPAI_TYPE_DIANGANGFLOW";
e[e.HUPAI_TYPE_DIANGANGPAO = 6] = "HUPAI_TYPE_DIANGANGPAO";
e[e.HUPAI_TYPE_CHAJIAO = 7] = "HUPAI_TYPE_CHAJIAO";
}(a.MJ_HuPai || (a.MJ_HuPai = {}));
!function(e) {
e[e.STATE_TABLE_IDLE = 0] = "STATE_TABLE_IDLE";
e[e.STATE_TABLE_READY = 1] = "STATE_TABLE_READY";
e[e.STATE_TABLE_FAPAI = 2] = "STATE_TABLE_FAPAI";
e[e.STATE_TABLE_SWAPCARD = 3] = "STATE_TABLE_SWAPCARD";
e[e.STATE_TABLE_DINGQUE = 4] = "STATE_TABLE_DINGQUE";
e[e.STATE_TABLE_ZHUAPAI = 5] = "STATE_TABLE_ZHUAPAI";
e[e.STATE_TABLE_OUTCARD = 6] = "STATE_TABLE_OUTCARD";
e[e.STATE_TABLE_BREAKCARD = 7] = "STATE_TABLE_BREAKCARD";
e[e.STATE_TABLE_OVER_ONCE = 8] = "STATE_TABLE_OVER_ONCE";
e[e.STATE_TABLE_OVER_ALL = 9] = "STATE_TABLE_OVER_ALL";
e[e.STATE_TABLE_DESTORY = 10] = "STATE_TABLE_DESTORY";
}(a.MJ_GameState || (a.MJ_GameState = {}));
a.getDiffTime = function(e, t) {
var a = Number(e), o = Number(t), n = Math.floor((o - a) / 1e3);
n < 0 && (n = 0);
return n;
};
a.getCardById = o;
a.getSortCardByCardIds = function(e, t) {
void 0 === t && (t = s.SUIT_TYPE_NAN);
if (!e) return [];
if (!(e instanceof Array)) return [];
var a = [], o = [], i = [];
e.forEach(function(e) {
e > 0 && e <= 36 ? a.push(e) : e > 36 && e <= 72 ? o.push(e) : e > 72 && e <= 108 ? i.push(e) : cc.log("牌唯一Id错误");
});
a.sort(function(e, t) {
return t - e;
});
o.sort(function(e, t) {
return t - e;
});
i.sort(function(e, t) {
return t - e;
});
var r = n(a, o, i, t);
return r[0].concat(r[1], r[2]);
};
a.sortCardByUnSuit = n;
a.getDingQueSuit = function(e, t) {
void 0 === t && (t = 0);
Array;
var a = [], o = [], n = [];
e.forEach(function(e) {
e > 0 && e <= 36 ? a.push(e) : e > 36 && e <= 72 ? o.push(e) : e > 72 && e <= 108 ? n.push(e) : cc.log("牌唯一Id错误");
});
if (0 === a.length) return 0;
if (0 === o.length) return 1;
if (0 === n.length) return 2;
var i = [ n, o, a ];
i.sort(function(e, a) {
return 0 === t ? e.length - a.length : a.length - e.length;
});
var r = i[0][0];
if (r > 0 && r <= 36) return 0;
if (r > 36 && r <= 72) return 1;
if (r > 72 && r <= 108) return 2;
cc.log("牌唯一Id错误");
return -1;
};
a.getSplitList = function(e) {
var t = {
gangList: [],
pengList: [],
duiList: []
};
if (!e) return t;
if (!(e instanceof Array)) return t;
var a = i(e);
a.sort(function(e, t) {
return e - t;
});
for (var n = 0; n < a.length; n++) if (a[n + 1]) {
var r = o(a[n]), s = o(a[n + 1]);
if (r.suit === s.suit && r.point === s.point) if (a[n + 2]) {
var c = o(a[n + 2]);
if (s.suit === c.suit && c.point === s.point) if (a[n + 3] && a[n + 2] + 1 === a[n + 3]) {
var l = o(a[n + 3]);
if (c.suit === l.suit && c.point === l.point) {
t.gangList.unshift(a[n]);
n += 3;
} else {
t.pengList.unshift(a[n]);
n += 2;
}
} else {
t.pengList.unshift(a[n]);
n += 2;
} else {
t.duiList.unshift(a[n]);
n += 1;
}
} else {
t.duiList.unshift(a[n]);
n += 1;
}
}
return t;
};
a.sortSeatList = function(e) {
if (!c.default.getInstance().mjGameData) return null;
var t = r(l.default.getInstance().mineData.accountId);
if (t) {
for (var a = [], o = 0; o < e.length; o++) {
var n = e[o];
n && (a[t.seatIndex > n.seatIndex ? e.length - (t.seatIndex - n.seatIndex) : Math.abs(t.seatIndex - n.seatIndex)] = n);
}
return a;
}
return null;
};
a.getCardIdsByCardId = function(e, t) {
for (var a = [], n = 0; n < e.length; n++) for (var i = o(e[n]), r = 0; r < t.length; r++) {
var s = o(t[r]);
if (i.suit === s.suit && i.point === s.point) {
a.push(t[r]);
break;
}
}
return a;
};
a.getSeatById = r;
a.getIndexBySeatId = function(e, t) {
void 0 === t && (t = "");
if (c.default.getInstance().mjGameData && c.default.getInstance().mjGameData.seats) for (var a = c.default.getInstance().mjGameData.seats, o = 0; o < a.length; o++) {
var n = a[o];
if (-1 === e) {
if ("0" !== n.accountId && n.accountId === t) return o;
} else if (n.seatIndex === e) return o;
}
return -1;
};
a.getDieTing = function(e) {
var t = [];
if (c.default.getInstance().mjGameData && c.default.getInstance().mjGameData.seats) for (var a = c.default.getInstance().mjGameData.seats, n = 0; n < a.length; n++) {
var i = a[n];
i.outCard && (t = t.concat(i.outCard));
if (i.accountId === l.default.getInstance().mineData.accountId) {
i.handCards && (t = t.concat(i.handCards));
i.moPaiCard && t.push(i.moPaiCard);
}
}
for (var r = 0, n = 0; n < t.length; n++) {
var s = o(t[n]);
e.suit === s.suit && e.point === s.point && r++;
}
return r >= 4;
};
cc._RF.pop();
}, {
"../../Modules/GMManager": "GMManager",
"../../Modules/UDManager": "UDManager"
} ],
MJ_PlayerUI: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "991cdu2jD5LRLijPYILjns7", "MJ_PlayerUI");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.headImg = null;
t.lblName = null;
t.lblScore = null;
t.node_d = null;
t.node_offLine = null;
t.unSuit = null;
t._seatInfo = null;
t._canvasTarget = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.node.on(cc.Node.EventType.TOUCH_END, function(t) {
if (!s.gm_manager.touchTarget) {
e._canvasTarget.showRoleInfo(e._seatInfo.accountId);
t.stopPropagation();
}
}, this);
};
t.prototype.showInfo = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t, a;
return __generator(this, function(o) {
switch (o.label) {
case 0:
this._seatInfo = e;
this._seatInfo.nick.length > 4 ? this.lblName.horizontalAlign = cc.Label.HorizontalAlign.LEFT : this.lblName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
this.lblName.string = this._seatInfo.nick;
this.lblScore.string = this._seatInfo.score + "";
t = null;
o.label = 1;

case 1:
o.trys.push([ 1, 3, , 4 ]);
return [ 4, s.img_manager.loadURLImage(this._seatInfo.headImg) ];

case 2:
t = o.sent();
return [ 3, 4 ];

case 3:
a = o.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = t;
this._seatInfo.seatIndex === s.gm_manager.mjGameData.tableBaseVo.bankerIndex ? this.node_d.active = !0 : this.node_d.active = !1;
0 === this._seatInfo.onLine ? this.node_offLine.active = !0 : this.node_offLine.active = !1;
if (this._seatInfo.unSuit > 0 && s.gm_manager.mjGameData.tableBaseVo.gameState > r.MJ_GameState.STATE_TABLE_DINGQUE) {
this.unSuit.node.active = !0;
this.unSuit.spriteFrame = this._canvasTarget.unSuit_list[this._seatInfo.unSuit - 1];
} else this.unSuit.node.active = !1;
return [ 2 ];
}
});
});
};
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblScore", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_d", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_offLine", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "unSuit", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Replay: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "105d2RoN3NOAZzB5165VoSc", "MJ_Replay");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.btn_pause = null;
t.btn_play = null;
t._canvasTarget = null;
t._frameTime = 0;
t._replayIndex = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
if (1 === s.gm_manager.replayMJ) {
s.gm_manager.isReplayPause = !0;
this.btn_pause.active = !1;
this.btn_play.active = !0;
this._replayIndex = 0;
this.showReplayInfo();
} else s.gm_manager.isReplayPause = !1;
};
t.prototype.update = function(e) {
if (!s.gm_manager.isReplayPause && this._frameTime >= 0) {
this._frameTime -= e;
if (this._frameTime <= 0) {
this._replayIndex++;
this.showReplayInfo();
}
}
};
t.prototype.showReplayInfo = function() {
var e = this;
if (this._replayIndex > s.gm_manager.replayDataList.length - 1) {
s.gm_manager.isReplayPause = !0;
this.btn_pause.active = !1;
this.btn_play.active = !0;
this._replayIndex = s.gm_manager.replayDataList.length;
s.ui_manager.showAlert("游戏记录播放完毕,是否重新播放？", "温馨提示", {
lbl_name: "确定",
callback: function() {
if (e._canvasTarget._game_over && e._canvasTarget._game_over.isValid) {
e._canvasTarget._game_over.removeFromParent(!0);
e._canvasTarget._game_over.destroy();
}
e._replayIndex = 0;
e.showReplayInfo();
}
}, {
lbl_name: "退出",
callback: function() {
s.ui_manager.showLoading() && cc.director.loadScene("HomeScene", function() {
var e = s.ui_manager.getCanvasNode().getComponent("HomeCanvas");
e && e.showRecord(s.gm_manager.mjGameData.tableBaseVo.tableId);
s.gm_manager.destroySelf();
});
}
}, 1);
} else {
var t = s.gm_manager.replayDataList[this._replayIndex];
s.gm_manager.mjGameData = t.frameData;
if (this._replayIndex + 1 < s.gm_manager.replayDataList.length) {
var a = s.gm_manager.replayDataList[this._replayIndex + 1];
r.getDiffTime(t.startTime, a.startTime);
this._frameTime = (Number(a.startTime) - Number(t.startTime)) / 1e3;
}
this._canvasTarget.showMJInfo();
}
};
t.prototype.click_btn_replay = function(e, t) {
s.mp_manager.playButton();
switch (t) {
case "0":
s.ui_manager.showAlert("您确定退出播放战绩吗？", "温馨提示", {
lbl_name: "确定",
callback: function() {
s.ui_manager.showLoading() && cc.director.loadScene("HomeScene", function() {
var e = s.ui_manager.getCanvasNode().getComponent("HomeCanvas");
e && e.showRecord(s.gm_manager.mjGameData.tableBaseVo.tableId);
s.gm_manager.destroySelf();
});
}
}, {
lbl_name: "取消",
callback: function() {}
}, 1);
break;

case "1":
s.gm_manager.isReplayPause = !1;
this.btn_pause.active = !0;
this.btn_play.active = !1;
break;

case "2":
s.gm_manager.isReplayPause = !0;
this.btn_pause.active = !1;
this.btn_play.active = !0;
break;

case "3":
this._replayIndex++;
this.showReplayInfo();
s.gm_manager.isReplayPause = !0;
this.btn_pause.active = !1;
this.btn_play.active = !0;
break;

case "4":
this._replayIndex > 0 && this._replayIndex--;
this.showReplayInfo();
s.gm_manager.isReplayPause = !0;
this.btn_pause.active = !1;
this.btn_play.active = !0;
}
};
__decorate([ i(cc.Node) ], t.prototype, "btn_pause", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_play", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Table: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "69753Zib3VHUIeRhBrIBb92", "MJ_Table");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblTitle = null;
t.lblRoomId = null;
t.lblSysTime = null;
t.lblDelay = null;
t.imgWifi = null;
t.pro_Power = null;
t.table_wait = null;
t.node_out = null;
t.node_wx_invit = null;
t.node_disband = null;
t.playerList = [];
t._canvasTarget = null;
t._nowTime = 0;
t._cdTime = 0;
t._powerTime = 30;
t._msTime = 1;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
0 === s.config.wxState ? this.node_wx_invit.active = !0 : this.node_wx_invit.active = !1;
};
t.prototype.update = function(e) {
if (s.gm_manager && s.gm_manager.mjGameData && !s.gm_manager.isReplayPause) {
this._cdTime -= e;
if (this._cdTime < 0) {
this._cdTime = 1;
s.gm_manager.mjGameData.tableBaseVo.svrTime = Number(s.gm_manager.mjGameData.tableBaseVo.svrTime) + 1e3 + "";
this.lblSysTime.string = s.utils.getDateStringByTimestamp(s.gm_manager.mjGameData.tableBaseVo.svrTime, 2);
}
}
this._powerTime -= e;
if (this._powerTime < 0) {
this._powerTime = 30;
this.pro_Power.progress = s.js_call_native.getBatteryLevel() / 100;
}
this._msTime -= e;
if (this._msTime <= 0) {
this._msTime = 1;
this.lblDelay.string = s.ws_manager.getDelayTime() + "ms";
}
};
t.prototype.showTableInfo = function() {
this._canvasTarget || (this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas"));
this._cdTime = 1;
this.lblTitle.string = s.gm_manager.mjGameData.tableBaseVo.ruleShowDesc;
this.lblRoomId.string = "房间号:" + s.gm_manager.mjGameData.tableBaseVo.tableId;
this.lblSysTime.string = s.utils.getDateStringByTimestamp(s.gm_manager.mjGameData.tableBaseVo.svrTime, 2);
this.pro_Power.progress = s.js_call_native.getBatteryLevel() / 100;
this.lblDelay.string = s.ws_manager.getDelayTime() + "ms";
if (s.gm_manager.mjGameData.tableBaseVo.gameState === r.MJ_GameState.STATE_TABLE_IDLE) {
this.table_wait.active = !0;
if (s.ud_manager.mineData.accountId === s.gm_manager.mjGameData.tableBaseVo.createPlayer) {
this.node_disband.active = !0;
this.node_out.active = !1;
} else {
this.node_disband.active = !1;
this.node_out.active = !0;
}
} else {
this.table_wait.active = !1;
this.node_disband.active = !1;
this.node_out.active = !1;
}
this.showPlayerInfo();
};
t.prototype.showPlayerInfo = function() {
for (var e = 0; e < s.gm_manager.mjGameData.seats.length; e++) {
var t = s.gm_manager.mjGameData.seats[e], a = this.playerList[e];
if (t && null !== t.accountId && "0" !== t.accountId) {
a.active = !0;
a.getComponent("MJ_PlayerUI").showInfo(t);
} else a.active = !1;
}
};
t.prototype.getPlayPosById = function(e) {
var t = r.getIndexBySeatId(-1, e);
return this.playerList[t].getPosition();
};
t.prototype.showWifiMS = function() {
var e = s.ws_manager.getDelayTime();
if (e < 60) {
0;
this.lblDelay.node.color = cc.Color.GREEN;
this.imgWifi.node.color = cc.Color.GREEN;
} else if (e >= 60 && e < 90) {
1;
this.lblDelay.node.color = cc.Color.YELLOW;
this.imgWifi.node.color = cc.Color.YELLOW;
} else {
2;
this.lblDelay.node.color = cc.Color.RED;
this.imgWifi.node.color = cc.Color.RED;
}
this.lblDelay.string = e + "ms";
};
t.prototype.click_btn_return = function() {
s.mp_manager.playButton();
this._canvasTarget.sendOutGame();
};
t.prototype.click_btn_disband = function() {
var e = this;
s.mp_manager.playButton();
s.ui_manager.showAlert("您确定解散房间吗？", "温馨提示", {
lbl_name: "确定",
callback: function() {
e._canvasTarget.sendOutGame();
}
}, {
lbl_name: "取消",
callback: function() {}
}, 1);
};
t.prototype.click_btn_invite = function() {
s.mp_manager.playButton();
s.js_call_native.wxShare(s.config.cd.ddUrl, "豆豆麻将", "我在豆豆麻将" + s.gm_manager.mjGameData.tableBaseVo.tableId + "号桌子，快来一起游戏吧！");
};
t.prototype.click_btn_copy = function() {
s.mp_manager.playButton();
s.js_call_native.copyToClipboard(s.gm_manager.mjGameData.tableBaseVo.tableId.toString());
s.ui_manager.showTip("复制成功！");
};
t.prototype.click_btn_ready = function() {
s.mp_manager.playButton();
};
t.prototype.click_btn_chat = function() {
if (!s.gm_manager.touchTarget) {
s.mp_manager.playButton();
this._canvasTarget.showChat();
}
};
t.prototype.click_btn_setting = function() {
if (!s.gm_manager.touchTarget) {
s.mp_manager.playButton();
this._canvasTarget.showSetting();
}
};
t.prototype.click_btn_voice = function() {
s.mp_manager.playButton();
};
__decorate([ i(cc.Label) ], t.prototype, "lblTitle", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRoomId", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblSysTime", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblDelay", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "imgWifi", void 0);
__decorate([ i(cc.ProgressBar) ], t.prototype, "pro_Power", void 0);
__decorate([ i(cc.Node) ], t.prototype, "table_wait", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_out", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_wx_invit", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_disband", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "playerList", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MJ_Ting: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "8ae07imddxEnbnU1A0p9kss", "MJ_Ting");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./MJ_Help"), s = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_card = null;
t._canvasTarget = null;
t._node_card_list = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
this._canvasTarget = s.ui_manager.getCanvasNode().getComponent("MJCanvas");
};
t.prototype.initData = function(e) {
this._node_card_list.forEach(function(e) {
e.removeFromParent(!0);
e.destroy();
});
this._node_card_list.length = 0;
if (e && e.length > 0) {
this.updateCardData(e[0], this.node_card);
if (e.length > 1) for (var t = 1; t < e.length; t++) {
var a = cc.instantiate(this.node_card);
this.updateCardData(e[t], a);
a.parent = this.node;
this._node_card_list.push(a);
}
}
};
t.prototype.updateCardData = function(e, t) {
var a = t.getComponent("MJ_Card"), o = 36 * (e.suit - 1) + 4 * (e.point - 1) + 1, n = this._canvasTarget.getMJCardSF(o);
a.initData(o, n);
var i = r.getDieTing(e);
a.showMask(i);
};
__decorate([ i(cc.Node) ], t.prototype, "node_card", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./MJ_Help": "MJ_Help"
} ],
MPManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "d306bA81eVCnofPbuB+rhFQ", "MPManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = function() {
function e() {
this.audioSetting = null;
this.quicklyList = [];
this.backgroundPath = null;
this.buttonPath = null;
this.warnPath = null;
this.alertPath = null;
this.selectPath = null;
this.outPath = null;
this.overPath = null;
this.backgroundID = null;
this.effectID = null;
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.initMP = function() {
return __awaiter(this, void 0, void 0, function() {
return __generator(this, function(e) {
switch (e.label) {
case 0:
this.initSetting();
this.initQuickly();
return [ 4, this.initBackGround() ];

case 1:
e.sent();
return [ 2 ];
}
});
});
};
e.prototype.initBackGround = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t, a, o, n, i, r;
return __generator(this, function(s) {
switch (s.label) {
case 0:
e = this;
return [ 4, this.loadFile("Audio/background") ];

case 1:
e.backgroundPath = s.sent();
t = this;
return [ 4, this.loadFile("Audio/button") ];

case 2:
t.buttonPath = s.sent();
a = this;
return [ 4, this.loadFile("Audio/warn") ];

case 3:
a.warnPath = s.sent();
o = this;
return [ 4, this.loadFile("Audio/alert") ];

case 4:
o.alertPath = s.sent();
n = this;
return [ 4, this.loadFile("Audio/select") ];

case 5:
n.selectPath = s.sent();
i = this;
return [ 4, this.loadFile("Audio/out") ];

case 6:
i.outPath = s.sent();
r = this;
return [ 4, this.loadFile("Audio/over") ];

case 7:
r.overPath = s.sent();
this.playBackGround();
return [ 2 ];
}
});
});
};
e.prototype.loadFile = function(e) {
return new Promise(function(t, a) {
cc.loader.loadRes(e, function(e, o) {
if (e) {
cc.error(e.message || e);
a(e.message || e);
}
t(o);
});
});
};
e.prototype.initSetting = function() {
var e = cc.sys.localStorage, t = e.getItem("audioSetting");
if (t) this.audioSetting = JSON.parse(t); else {
this.audioSetting = {
language: 1,
isMusic: !0,
isEffect: !0,
isSound: !0
};
e.setItem("audioSetting", JSON.stringify(this.audioSetting));
}
};
e.prototype.saveMPSetting = function() {
cc.sys.localStorage.setItem("audioSetting", JSON.stringify(this.audioSetting));
};
e.prototype.initQuickly = function() {
var e = {
id: 1,
msg: "不好意思，我要离开一会"
}, t = {
id: 2,
msg: "不要走，决战到天亮"
}, a = {
id: 3,
msg: "打一个来碰噻"
}, o = {
id: 4,
msg: "大家好很高兴见到各位"
}, n = {
id: 5,
msg: "哈哈，上碰下自摸"
}, i = {
id: 6,
msg: "呵呵"
}, r = {
id: 7,
msg: "和你合作真是太愉快了"
}, s = {
id: 8,
msg: "快点吧，我等到花儿都谢了"
}, c = {
id: 9,
msg: "你的牌打得太好了"
}, l = {
id: 10,
msg: "下次再玩吧，我要走了"
}, _ = {
id: 11,
msg: "又断线了，网络怎么这么差啊"
};
this.quicklyList = [ e, t, a, o, n, i, r, s, c, l, _ ];
};
e.prototype.playBackGround = function() {
null === this.backgroundID && null !== this.backgroundPath && this.audioSetting.isMusic && (this.backgroundID = cc.audioEngine.play(this.backgroundPath, !0, .5));
};
e.prototype.stopBackGround = function() {
if (null !== this.backgroundID) {
cc.audioEngine.stop(this.backgroundID);
this.backgroundID = null;
}
};
e.prototype.playPokerSound = function(e, t, a, o) {
return __awaiter(this, void 0, void 0, function() {
var n, i, r;
return __generator(this, function(s) {
switch (s.label) {
case 0:
if (e < 1 || e > 2) return [ 2 ];
if (a < 0 || a > 2) return [ 2 ];
if (o < 1 || o > 9) return [ 2 ];
if (t < 1 || t > 4) return [ 2 ];
if (4 === t && o > 4) return [ 2 ];
if (!(this.audioSetting.language > 0)) return [ 3, 2 ];
n = "Audio/" + e + "/" + t + "/" + (0 === a ? 2 : a) + "/" + o;
return [ 4, this.loadFile(n) ];

case 1:
i = s.sent();
r = cc.audioEngine.play(i, !1, 1);
cc.audioEngine.setFinishCallback(r, function() {
cc.audioEngine.uncache(i);
});
s.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.stopEffect = function() {
if (this.effectID) {
cc.audioEngine.stop(this.effectID);
this.effectID = null;
}
};
e.prototype.finish = function() {
var e = this;
cc.audioEngine.setFinishCallback(this.effectID, function() {
e.effectID = null;
});
};
e.prototype.playButton = function() {
if (this.audioSetting.isEffect && this.buttonPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.buttonPath, !1, 1);
this.finish();
}
};
e.prototype.playWarn = function() {
if (this.audioSetting.isEffect && this.warnPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.warnPath, !1, 1);
this.finish();
}
};
e.prototype.playAlert = function() {
if (this.audioSetting.isEffect && this.alertPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.alertPath, !1, 1);
this.finish();
}
};
e.prototype.playOut = function() {
if (this.audioSetting.isEffect && this.outPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.outPath, !1, 1);
this.finish();
}
};
e.prototype.playSelect = function() {
if (this.audioSetting.isEffect && this.selectPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.selectPath, !1, 1);
this.finish();
}
};
e.prototype.playOver = function() {
if (this.audioSetting.isEffect && this.overPath) {
this.stopEffect();
this.effectID = cc.audioEngine.play(this.overPath, !1, 1);
this.finish();
}
};
e.prototype.playQuicklySound = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a, o, n;
return __generator(this, function(i) {
switch (i.label) {
case 0:
if (e < 0 || e > 2) return [ 2 ];
if (t < 0 || t > 11) return [ 2 ];
if (!(this.audioSetting.language > 0)) return [ 3, 2 ];
a = "Audio/3/" + (0 === e ? 2 : e) + "/" + t;
return [ 4, this.loadFile(a) ];

case 1:
o = i.sent();
n = cc.audioEngine.play(o, !1, 1);
cc.audioEngine.setFinishCallback(n, function() {
cc.audioEngine.uncache(o);
});
i.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.destroySelf = function() {
cc.audioEngine.uncacheAll();
this.backgroundPath = null;
this.buttonPath = null;
this.warnPath = null;
this.alertPath = null;
this.outPath = null;
this.selectPath = null;
this.overPath = null;
this.effectID = null;
this.backgroundID = null;
this.audioSetting = null;
this.quicklyList.length = 0;
};
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {} ],
Mail_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "82c10mn8EhDqYMQpevHbNJ8", "Mail_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_odd = null;
t.lblTitle = null;
t.lblContent = null;
t._mailItem = null;
t._cb = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e._cb && e._cb(e._mailItem);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a) {
this._mailItem = t;
this._cb = a;
this.node_odd.active = !(e % 2);
this.lblTitle.string = this._mailItem.title;
this.lblContent.string = this._mailItem.content;
};
__decorate([ i(cc.Node) ], t.prototype, "node_odd", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblTitle", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblContent", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Mail: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "17f7eR0+e9Nh4vPw87BdQvo", "Mail");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.svNode = null;
t.lblNoMail = null;
t.mail_item_prefab = null;
t._mailList = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
r.ws_manager.sendMsg(r.protocol.MAIL_MAILLIST, "", function(t, a) {
if (0 === t) {
e._mailList = a;
e.showMailInfo();
} else -1 === t || cc.log(a);
});
};
t.prototype.readMail = function(e) {
var t = this, a = {
mailId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.MAIL_MAILVIEW, o, function(e, a) {
0 === e ? t._mailList = a : -1 === e || cc.log(a);
});
};
t.prototype.showMailInfo = function() {
if (this._mailList) {
this.svNode.node.active = !0;
this.lblNoMail.active = !1;
this.svNode.content.removeAllChildren();
for (var e = 0; e < this._mailList.length; e++) this.createMailItem(e, this._mailList[e]);
} else {
this.svNode.node.active = !1;
this.lblNoMail.active = !0;
}
};
t.prototype.createMailItem = function(e, t) {
var a = this, o = cc.instantiate(this.mail_item_prefab);
o.getComponent("Mail_Item").updateItem(e, t, function(e) {
a.readMail(e.mailId);
var t = "   " + e.content + "<br/>    " + r.utils.getDateStringByTimestamp(e.recvTime, 3);
r.ui_manager.showAlert(t, e.title, {
lbl_name: "确定",
callback: function() {
a.showMailInfo();
}
}, null, 0);
});
o.parent = this.svNode.content;
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ i(cc.Node) ], t.prototype, "lblNoMail", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "mail_item_prefab", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
ModuleManager: [ function(e, t, a) {
"use strict";
function o() {
var e = {
lbl_name: "确定",
callback: function() {
cc.game.end();
}
};
a.ui_manager.showAlert("连接服务器失败，请重新启动游戏！", "错误提示", e);
a.gm_manager.destroySelf();
a.ud_manager.destroySelf();
a.ws_manager.destroySelf();
a.gm_manager = null;
a.ud_manager = null;
a.ws_manager = null;
}
cc._RF.push(t, "e8c4eYc5vVLk5+ugMygqMs/", "ModuleManager");
var n = this;
Object.defineProperty(a, "__esModule", {
value: !0
});
var i = e("./JSCallNative"), r = e("./NativeCallJS"), s = e("./Utils"), c = e("./Config"), l = e("./WSManager"), _ = e("./IMGManager"), d = e("./UDManager"), u = e("./GMManager"), h = e("./UIManager"), p = e("./ENCManager"), g = e("./MPManager"), m = e("./Protocol");
a.js_call_native = i;
a.native_call_js = r;
a.utils = s;
a.config = c;
a.protocol = m.Protocol;
a.ws_manager = null;
a.img_manager = null;
a.ud_manager = null;
a.gm_manager = null;
a.ui_manager = null;
a.enc_manager = null;
a.mp_manager = null;
a.cb_diconnect = function(e) {
var t = null;
a.ud_manager && a.ud_manager.mineData && (t = a.ud_manager.mineData.accountId);
a.gm_manager.destroySelf();
a.ud_manager.destroySelf();
a.gm_manager = null;
a.ud_manager = null;
a.ui_manager.hideLoading();
a.ui_manager.showLoading("正在重连,请稍后");
setTimeout(function() {
return __awaiter(n, void 0, void 0, function() {
var e, n, i;
return __generator(this, function(r) {
switch (r.label) {
case 0:
a.ws_manager = l.default.getInstance();
a.gm_manager = u.default.getInstance();
a.ud_manager = d.default.getInstance();
r.label = 1;

case 1:
r.trys.push([ 1, 3, , 4 ]);
e = cc.director.getScene().name;
return [ 4, a.ws_manager.connect(a.config.wsUrl) ];

case 2:
r.sent();
if ("LoginScene" !== e && t) {
(n = {}).accountId = t;
a.ws_manager.sendMsg(a.protocol.ACCOUNT_LOGIN_ACCOUNTID, JSON.stringify(n), function(t, n) {
if (0 === t) {
a.ud_manager.mineData = n;
a.ws_manager.setLoginState(!0);
if (a.ud_manager && a.ud_manager.mineData && 0 !== a.ud_manager.mineData.tableId) {
var i = {
tableId: a.ud_manager.mineData.tableId
}, r = JSON.stringify(i);
a.ws_manager.sendMsg(a.protocol.MAJIANG_ROOM_JOIN, r, function(t, n) {
if (0 === t) {
a.gm_manager.mjGameData = n;
a.gm_manager.replayMJ = 0;
if ("MJScene" !== e) cc.director.loadScene("MJScene"); else {
a.ui_manager.getCanvasNode().emit("diconnect_update");
a.ui_manager.hideLoading();
}
} else -1 === t ? o() : "HomeScene" !== e ? cc.director.loadScene("HomeScene", function() {
a.ui_manager.showTip("桌子已解散!");
}) : a.ui_manager.hideLoading();
});
} else "MJScene" === cc.director.getScene().name ? cc.director.loadScene("HomeScene", function() {
a.ui_manager.showTip("桌子已解散!");
}) : a.ui_manager.hideLoading();
} else o();
});
} else a.ui_manager.hideLoading();
return [ 3, 4 ];

case 3:
i = r.sent();
o();
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
}, 100);
};
a.errAlert = o;
a.init = function() {
a.ws_manager = l.default.getInstance();
a.img_manager = _.default.getInstance();
a.ud_manager = d.default.getInstance();
a.ui_manager = h.default.getInstance();
a.enc_manager = p.default.getInstance();
a.gm_manager = u.default.getInstance();
a.mp_manager = g.default.getInstance();
cc.systemEvent.on("cb_diconnect", a.cb_diconnect, this);
};
a.destroy = function() {
a.img_manager.destroySelf();
a.ws_manager.destroySelf();
a.ui_manager.destroySelf();
a.ud_manager.destroySelf();
a.gm_manager.destroySelf();
a.mp_manager.destroySelf();
a.img_manager = null;
a.ws_manager = null;
a.ui_manager = null;
a.ud_manager = null;
a.gm_manager = null;
a.mp_manager = null;
cc.systemEvent.off("cb_diconnect", a.cb_diconnect, this);
};
cc._RF.pop();
}, {
"./Config": "Config",
"./ENCManager": "ENCManager",
"./GMManager": "GMManager",
"./IMGManager": "IMGManager",
"./JSCallNative": "JSCallNative",
"./MPManager": "MPManager",
"./NativeCallJS": "NativeCallJS",
"./Protocol": "Protocol",
"./UDManager": "UDManager",
"./UIManager": "UIManager",
"./Utils": "Utils",
"./WSManager": "WSManager"
} ],
NativeCallJS: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "5ac27gyp1lB9aG2YecI9JJS", "NativeCallJS");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./Config");
a.getAccessToken = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t, a, n, i, r, s, c, l;
return __generator(this, function(_) {
switch (_.label) {
case 0:
_.trys.push([ 0, 11, , 12 ]);
t = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + o.app_id + "&secret=" + o.secret + "&code=" + e + "&grant_type=authorization_code";
return [ 4, fetch(t) ];

case 1:
return (a = _.sent()).ok ? [ 4, a.json() ] : [ 3, 9 ];

case 2:
if (!(n = _.sent()).access_token) return [ 3, 7 ];
(i = cc.sys.localStorage).setItem("TokenInfo", JSON.stringify(n));
r = "https://api.weixin.qq.com/sns/userinfo?access_token=" + n.access_token + "&openid=" + n.openid;
return [ 4, fetch(r) ];

case 3:
return (s = _.sent()).ok ? [ 4, s.json() ] : [ 3, 5 ];

case 4:
c = _.sent();
cc.systemEvent.emit("cb_login", {
flag: 1,
data: c
});
return [ 3, 6 ];

case 5:
cc.systemEvent.emit("cb_login", {
flag: 0,
data: "获取用户信息失败"
});
_.label = 6;

case 6:
return [ 3, 8 ];

case 7:
cc.systemEvent.emit("cb_login", {
flag: 0,
data: "获取token失败"
});
_.label = 8;

case 8:
return [ 3, 10 ];

case 9:
cc.systemEvent.emit("cb_login", {
flag: 0,
data: "请求token失败"
});
_.label = 10;

case 10:
return [ 3, 12 ];

case 11:
l = _.sent();
cc.systemEvent.emit("cb_login", {
flag: 0,
data: "http请求异常"
});
return [ 3, 12 ];

case 12:
return [ 2 ];
}
});
});
};
a.loginError = function() {
cc.systemEvent.emit("cb_login", {
flag: 0,
data: "授权失败"
});
};
a.shareCallback = function(e) {
cc.systemEvent.emit("cb_share", e);
};
a.voiceLoginCallback = function(e) {
cc.systemEvent.emit("cb_voiceLogin", e);
};
a.voiceQuitCallback = function(e) {
cc.systemEvent.emit("cb_voiceQuit", e);
};
a.getProducts = function(e) {
cc.systemEvent.emit("cb_getProducts", e);
};
a.iapBack = function(e) {
cc.systemEvent.emit("cb_iapBack", e);
};
a.qyiap = function() {
cc.systemEvent.emit("qyiap");
};
cc._RF.pop();
}, {
"./Config": "Config"
} ],
Protocol: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "30767L6Y/BP2qjVUS4+rafT", "Protocol");
Object.defineProperty(a, "__esModule", {
value: !0
});
!function(e) {
e[e.ACCOUNT_HEART = 101] = "ACCOUNT_HEART";
e[e.ACCOUNT_LOGIN_TOURIST = 102] = "ACCOUNT_LOGIN_TOURIST";
e[e.ACCOUNT_LOGIN_WX = 103] = "ACCOUNT_LOGIN_WX";
e[e.ACCOUNT_LOGIN_OUT = 104] = "ACCOUNT_LOGIN_OUT";
e[e.ACCOUNT_ROLE_ACCOUNTID = 105] = "ACCOUNT_ROLE_ACCOUNTID";
e[e.ACCOUNT_ROLE_STARNO = 106] = "ACCOUNT_ROLE_STARNO";
e[e.ACCOUNT_PING = 107] = "ACCOUNT_PING";
e[e.ACCOUNT_LOGIN_ACCOUNTID = 108] = "ACCOUNT_LOGIN_ACCOUNTID";
e[e.MAIL_MAILLIST = 201] = "MAIL_MAILLIST";
e[e.MAIL_MAILVIEW = 202] = "MAIL_MAILVIEW";
e[e.CORPS_GET_CORPS_LIST = 401] = "CORPS_GET_CORPS_LIST";
e[e.CORPS_CREATE = 402] = "CORPS_CREATE";
e[e.CORPS_TABLE_LIST = 403] = "CORPS_TABLE_LIST";
e[e.CORPS_MEMBER_LIST = 404] = "CORPS_MEMBER_LIST";
e[e.CORPS_SET_ROOMCARD_STATE = 405] = "CORPS_SET_ROOMCARD_STATE";
e[e.CORPS_DESTORY = 406] = "CORPS_DESTORY";
e[e.CORPS_EXIT = 407] = "CORPS_EXIT";
e[e.CORPS_ADD_MEMBER = 408] = "CORPS_ADD_MEMBER";
e[e.CORPS_KICK_MEMBER = 409] = "CORPS_KICK_MEMBER";
e[e.CORPS_QUEST_JOIN = 410] = "CORPS_QUEST_JOIN";
e[e.CORPS_QUEST_JOIN_BT = 411] = "CORPS_QUEST_JOIN_BT";
e[e.CORPS_GET_QUESTJOIN_LIST = 412] = "CORPS_GET_QUESTJOIN_LIST";
e[e.CORPS_GET_CORPS_DETAILED = 413] = "CORPS_GET_CORPS_DETAILED";
e[e.MAJIANG_GET_RULECFG = 501] = "MAJIANG_GET_RULECFG";
e[e.MAJIANG_ROOM_CREATE = 502] = "MAJIANG_ROOM_CREATE";
e[e.MAJIANG_ROOM_JOIN = 503] = "MAJIANG_ROOM_JOIN";
e[e.MAJIANG_ROOM_LEAV = 504] = "MAJIANG_ROOM_LEAV";
e[e.MAJIANG_ROOM_GET_ROOMINFO = 505] = "MAJIANG_ROOM_GET_ROOMINFO";
e[e.MAJIANG_ROOM_SWAP_CARD = 506] = "MAJIANG_ROOM_SWAP_CARD";
e[e.MAJIANG_ROOM_DINQUE = 507] = "MAJIANG_ROOM_DINQUE";
e[e.MAJIANG_ROOM_OUT_CARD = 508] = "MAJIANG_ROOM_OUT_CARD";
e[e.MAJIANG_ROOM_OTHERBREAK_CARD = 509] = "MAJIANG_ROOM_OTHERBREAK_CARD";
e[e.MAJIANG_ROOM_QUEST_DELETE = 510] = "MAJIANG_ROOM_QUEST_DELETE";
e[e.MAJIANG_ROOM_DELETE_BT = 511] = "MAJIANG_ROOM_DELETE_BT";
e[e.MAJIANG_ROOM_NEXT_GAME = 512] = "MAJIANG_ROOM_NEXT_GAME";
e[e.CHAT_SEND = 601] = "CHAT_SEND";
e[e.REPLAY_QUERY_RECORD = 701] = "REPLAY_QUERY_RECORD";
e[e.REPLAY_QUERY_DETAILED_RECORD = 702] = "REPLAY_QUERY_DETAILED_RECORD";
e[e.REPLAY_DELETE_RECORD = 703] = "REPLAY_DELETE_RECORD";
e[e.REPLAY_REALNAME_AUTHENTICATION = 704] = "REPLAY_REALNAME_AUTHENTICATION";
e[e.REPLAY_PHONE_GET_SMSCODE = 705] = "REPLAY_PHONE_GET_SMSCODE";
e[e.REPLAY_PHONE_BIND = 706] = "REPLAY_PHONE_BIND";
e[e.WALLET_ROOMCARD_GIVE = 801] = "WALLET_ROOMCARD_GIVE";
e[e.WALLET_ROOMCARD_RECORD = 802] = "WALLET_ROOMCARD_RECORD";
e[e.MALL_ITEMLIST = 901] = "MALL_ITEMLIST";
e[e.MALL_ITEM_BUY = 902] = "MALL_ITEM_BUY";
e[e.MALL_ITEM_BUY_OK = 903] = "MALL_ITEM_BUY_OK";
e[e.ACCOUNT_NOTIFY_HOT_PROMPT = 10001] = "ACCOUNT_NOTIFY_HOT_PROMPT";
e[e.ACCOUNT_NOTIFY_WALLET = 10002] = "ACCOUNT_NOTIFY_WALLET";
e[e.ACCOUNT_NOTIFY_KICK_ACCOUNT = 10003] = "ACCOUNT_NOTIFY_KICK_ACCOUNT";
e[e.MESSAGE_NOTICE_NOTIFY = 30001] = "MESSAGE_NOTICE_NOTIFY";
e[e.CORPS_DESTORY_NOTIFY = 40001] = "CORPS_DESTORY_NOTIFY";
e[e.CORPS_ADD_MEMBER_NOTIFY = 40002] = "CORPS_ADD_MEMBER_NOTIFY";
e[e.CORPS_KIC_KMEMBER_NOTIFY = 40003] = "CORPS_KIC_KMEMBER_NOTIFY";
e[e.MAJIANG_ROOM_GAMESTATE_NOTIFY = 50001] = "MAJIANG_ROOM_GAMESTATE_NOTIFY";
e[e.MAJIANG_ROOM_SEAT_NOTIFY = 50002] = "MAJIANG_ROOM_SEAT_NOTIFY";
e[e.MAJIANG_ROOM_DINQUE_NOTIFY = 50003] = "MAJIANG_ROOM_DINQUE_NOTIFY";
e[e.MAJIANG_ROOM_SWAPCARD_NOTIFY = 50004] = "MAJIANG_ROOM_SWAPCARD_NOTIFY";
e[e.MAJIANG_ROOM_OUTCARD_NOTIFY = 50005] = "MAJIANG_ROOM_OUTCARD_NOTIFY";
e[e.MAJIANG_ROOM_BREAKCARD_NOTIFY = 50006] = "MAJIANG_ROOM_BREAKCARD_NOTIFY";
e[e.MAJIANG_ROOM_DESTORY_NOTIFY = 50007] = "MAJIANG_ROOM_DESTORY_NOTIFY";
e[e.MAJIANG_ROOM_DESTORY_BT_NOTIFY = 50008] = "MAJIANG_ROOM_DESTORY_BT_NOTIFY";
e[e.CHAT_SEND_NOTIFY = 60001] = "CHAT_SEND_NOTIFY";
}(a.Protocol || (a.Protocol = {}));
cc._RF.pop();
}, {} ],
Record_Detail: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "380d2eaAjVKWYeOqsmqIjPg", "Record_Detail");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_choose = null;
t.lblIndex = null;
t.lblGameTime = null;
t.lblScoreList = [];
t._itemData = null;
t._cb = null;
t._target = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
e._cb && e._cb(e._itemData);
t.stopPropagation();
}, this);
};
t.prototype.updateItem = function(e, t, a) {
this._itemData = e;
this._cb = t;
this._target = a;
this.node_choose.active = e.gameNum % 2 != 0;
this.lblIndex.string = e.gameNum + "";
this.lblGameTime.string = o.utils.getDateStringByTimestamp(e.recordTime, 3);
for (var n = 0, i = e.scores[0], r = 0; r < this.lblScoreList.length; r++) {
this.lblScoreList[n].node.color = cc.Color.WHITE;
this.lblScoreList[r].string = e.scores[r] + "";
if (e.scores[r] > i) {
n = r;
i = e.scores[r];
}
}
this.lblScoreList[n] && (this.lblScoreList[n].node.color = cc.color(245, 152, 92));
};
t.prototype.click_btn_look = function() {
o.mp_manager.playButton();
this._target.sendGetVedio(this._itemData.recordFile);
};
__decorate([ r(cc.Node) ], t.prototype, "node_choose", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblIndex", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblGameTime", void 0);
__decorate([ r([ cc.Label ]) ], t.prototype, "lblScoreList", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Record: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0af274h12FMV7tBpHQOlGaA", "Record");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblNoRecord = null;
t.node_record = null;
t.node_record_detail = null;
t.lblRoomId = null;
t.lblNameList = [];
t.svNode_record = null;
t.svNode_record_detail = null;
t.club_record_item_prefab = null;
t.record_detail_item_prefab = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
r.ui_manager.hideLoading();
this.lblNoRecord.active = !0;
this.sendGetRecord();
};
t.prototype.sendGetRecord = function() {
var e = this;
this.node_record.active = !0;
this.node_record_detail.active = !1;
if (r.ui_manager.showLoading()) {
var t = {
type: 1,
query: r.ud_manager.mineData.accountId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.REPLAY_QUERY_RECORD, a, function(t, a) {
0 === t ? e.showRecordInfo(a) : -1 === t || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
cc.log(a);
});
}
};
t.prototype.sendGetRecordDetailed = function(e) {
var t = this;
this.node_record.active = !1;
this.node_record_detail.active = !0;
if (r.ui_manager.showLoading()) {
var a = {
tableId: e
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.REPLAY_QUERY_DETAILED_RECORD, o, function(e, a) {
0 === e ? t.showRecordDetailed(a) : -1 === e || r.ui_manager.showAlert(a, "温馨提示");
r.ui_manager.hideLoading();
cc.log(a);
});
}
};
t.prototype.showRecordInfo = function(e) {
var t = this;
this.svNode_record.content.removeAllChildren();
if (e && e.items) {
this.lblNoRecord.active = !1;
for (var a = 0; a < e.items.length; a++) {
var o = cc.instantiate(this.club_record_item_prefab);
o.getComponent("Club_Record_Item").updateItem(a + 1, e.items[a], "0", function(e) {
t.sendGetRecordDetailed(e.tableId);
}, this);
o.parent = this.svNode_record.content;
}
}
};
t.prototype.showRecordDetailed = function(e) {
var t = this;
this.svNode_record_detail.content.removeAllChildren();
if (e) {
this.lblRoomId.string = "房间号:" + e.tableId;
for (a = 0; a < e.nicks.length; a++) this.lblNameList[a].string = e.nicks[a];
if (e.items) for (var a = 0; a < e.items.length; a++) {
var o = cc.instantiate(this.record_detail_item_prefab);
o.getComponent("Record_Detail").updateItem(e.items[a], function(e) {
t.sendGetVedio(e.recordFile);
}, this);
o.parent = this.svNode_record_detail.content;
}
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
if (this.node_record.active) {
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
}
this.node_record_detail.active && this.sendGetRecord();
};
t.prototype.sendGetVedio = function(e) {
if (r.ui_manager.showLoading()) {
var t = r.config.replayUrl + e;
cc.log(t);
fetch(t, {}).then(function(e) {
if (e.ok) e.json().then(function(e) {
cc.log(JSON.stringify(e).length);
r.gm_manager.replayMJ = 1;
r.gm_manager.replayDataList = e.datas;
r.gm_manager.mjGameData = r.gm_manager.replayDataList[0].frameData;
cc.director.loadScene("MJScene");
}); else {
r.ui_manager.showTip("获取录像失败");
r.ui_manager.hideLoading();
}
}).catch(function(e) {
cc.log(e);
r.ui_manager.showAlert("服务器响应失败，请确认您的网络通畅后，重试！", "温馨提示");
r.ui_manager.hideLoading();
});
}
};
__decorate([ i(cc.Node) ], t.prototype, "lblNoRecord", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_record", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_record_detail", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRoomId", void 0);
__decorate([ i([ cc.Label ]) ], t.prototype, "lblNameList", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_record", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode_record_detail", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "club_record_item_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "record_detail_item_prefab", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Role: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "11b14gRDmFMJ6PrTExKBiJh", "Role");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblIP = null;
t.lblID = null;
t.headImg = null;
t.sexImg = null;
t.sex_img = [];
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
};
t.prototype.showInfo = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t, a;
return __generator(this, function(o) {
switch (o.label) {
case 0:
this.lblName.string = e.nick;
this.lblIP.string = "IP: " + e.clientIP;
this.lblID.string = "ID: " + e.starNO;
if (e.sex > 0) {
this.sexImg.node.active = !0;
this.sexImg.spriteFrame = this.sex_img[e.sex - 1];
} else this.sexImg.node.active = !1;
t = null;
o.label = 1;

case 1:
o.trys.push([ 1, 3, , 4 ]);
return [ 4, r.img_manager.loadURLImage(e.headImg) ];

case 2:
t = o.sent();
return [ 3, 4 ];

case 3:
a = o.sent();
cc.log("获取头像错误");
return [ 3, 4 ];

case 4:
this.headImg.spriteFrame = t;
return [ 2 ];
}
});
});
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblIP", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblID", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "sexImg", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "sex_img", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Room_Create_Rule: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "95755UyUk9JWIo2S909b2XS", "Room_Create_Rule");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblRuleName = null;
t.node_layout = null;
t._sy = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._sy = this.node_layout.getComponent(cc.Layout).spacingY;
};
t.prototype.updateItem = function(e) {
this.lblRuleName.string = e + ":";
};
t.prototype.lateUpdate = function() {
this.node.height !== this.node_layout.height + this._sy && (this.node.height = this.node_layout.height + this._sy);
};
__decorate([ i(cc.Label) ], t.prototype, "lblRuleName", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_layout", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Room_Create: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "7382cj/x/REkYhGQk5LjZd2", "Room_Create");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_config = null;
t.node_game = null;
t.room_item_game_prefab = null;
t.room_item_cf_prefab = null;
t.room_item_toggleGroup_prefab = null;
t.room_item_toggle_prefab = null;
t.room_item_toggle_prefab2 = null;
t._roomMode = "0";
t._roomGame = "0";
t._toggleList = [];
t._ruleCfgVo = [];
t._sendRuleCfg = {
corpsId: "0",
roomItemId: 0,
rules: []
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
this.node_config.removeAllChildren();
};
t.prototype.showCreateMode = function(e) {
void 0 === e && (e = "0");
this._sendRuleCfg.corpsId = e;
this.getRoomConfig();
};
t.prototype.getRoomConfig = function() {
var e = this;
if (r.ui_manager.showLoading("正在获取配置，请稍后")) {
var t = {};
JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.MAJIANG_GET_RULECFG, "", function(t, a) {
if (0 === t) {
e._ruleCfgVo = a;
e.showConfigInfo();
} else -1 === t || cc.log(a);
r.ui_manager.hideLoading();
});
}
};
t.prototype.sendCreatRoom = function(e) {
if (r.ui_manager.showLoading()) {
var t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.MAJIANG_ROOM_CREATE, t, function(e, t) {
if (0 === e) {
r.gm_manager.mjGameData = t;
r.gm_manager.replayMJ = 0;
r.gm_manager.isReplayPause = !1;
cc.director.loadScene("MJScene");
} else if (-1 === e) ; else {
r.ui_manager.showAlert(t, "温馨提示");
r.ui_manager.hideLoading();
}
cc.log(t);
});
}
};
t.prototype.click_toggle_mode = function(e, t) {
r.mp_manager.playButton();
this._roomMode = t;
};
t.prototype.click_toggle_game = function(e, t) {
r.mp_manager.playButton();
this._roomGame = t;
};
t.prototype.showConfigInfo = function() {
var e = this;
this._sendRuleCfg.roomItemId = this._ruleCfgVo[0].itemId;
this.showGameRuleInfo(this._ruleCfgVo[0]);
setTimeout(function() {
e.node_config.opacity = 255;
}, 100);
};
t.prototype.showGameRuleInfo = function(e) {
var t = this;
this.node_config.opacity = 0;
this.node_config.removeAllChildren();
this._toggleList.length = 0;
for (var a = 0; a < e.ruleContents.length; a++) this.create_rule_item(e.ruleContents[a]);
this.createTipNode(this.node_config);
setTimeout(function() {
t.node_config.opacity = 255;
}, 100);
};
t.prototype.createTipNode = function(e, t) {
void 0 === t && (t = "注：房卡在游戏开始时扣除");
var a = new cc.Node("tip");
a.height = 30;
a.color = new cc.Color(200, 200, 200);
a.parent = e;
var o = a.addComponent(cc.Label);
o.fontSize = 30;
o.lineHeight = 30;
o.string = t;
var n = a.addComponent(cc.Widget);
n.isAlignLeft = !0;
n.left = 80;
};
t.prototype.create_game_item = function(e) {
var t = this, a = cc.instantiate(this.room_item_game_prefab);
a.getComponent("Toggle_AddLabel").updateItem(e.itemName);
var o = a.getComponent(cc.Toggle);
if (this._ruleCfgVo.length > 1) {
o.interactable = !0;
o.toggleGroup = this.node_game.getComponent(cc.ToggleGroup);
a.on("touchend", function() {
cc.log(e.itemId);
r.mp_manager.playButton();
t._sendRuleCfg.roomItemId = e.itemId;
var a = t.getGameRule(e.itemId);
t.showGameRuleInfo(a);
}, this);
} else o.interactable = !1;
a.parent = this.node_game;
};
t.prototype.getGameRule = function(e) {
for (var t = null, a = 0; a < this._ruleCfgVo.length; a++) if (this._ruleCfgVo[a].itemId === e) {
t = this._ruleCfgVo[a];
break;
}
return t;
};
t.prototype.create_rule_item = function(e) {
var t = cc.instantiate(this.room_item_cf_prefab);
t.parent = this.node_config;
cc.find("lblCFName", t).getComponent(cc.Label).string = e.ruleName;
var a = t.getComponent("Room_Create_Rule");
a.updateItem(e.ruleName);
for (var o = a.node_layout, n = 0; n < e.ruleContentItems.length; n++) {
var i = this.create_item_toggleGroup(o);
e.ruleContentItems[n];
this.create_item_toggle(e.ruleContentItems[n], i);
}
};
t.prototype.create_item_toggleGroup = function(e) {
var t = cc.instantiate(this.room_item_toggleGroup_prefab);
t.parent = e;
return t;
};
t.prototype.create_item_toggle = function(e, t) {
for (var a = 0; a < e.ruleContentItemAttribs.length; a++) {
var o = e.ruleContentItemAttribs[a], n = null, i = (n = 1 === e.ridio ? cc.instantiate(this.room_item_toggle_prefab2) : cc.instantiate(this.room_item_toggle_prefab)).getComponent(cc.Toggle);
1 === e.ridio ? i.toggleGroup = null : i.toggleGroup = t.getComponent(cc.ToggleGroup);
i.isChecked = 0 !== o.state;
var r = {
toggle: i,
ruleContentItemAttrib: e.ruleContentItemAttribs[a]
};
this._toggleList.push(r);
n.parent = t;
n.getComponent("Toggle_AddLabel").updateItem(e.ruleContentItemAttribs[a].ruleName);
}
};
t.prototype.click_btn_create = function() {
r.mp_manager.playButton();
this._sendRuleCfg.rules.length = 0;
for (var e = 0; e < this._toggleList.length; e++) !0 === this._toggleList[e].toggle.isChecked && this._sendRuleCfg.rules.push(this._toggleList[e].ruleContentItemAttrib.ruleId);
cc.log(this._sendRuleCfg);
this.sendCreatRoom(this._sendRuleCfg);
};
t.prototype.click_btn_create_club = function() {
r.mp_manager.playButton();
r.ui_manager.showLoading() && r.ws_manager.sendMsg(r.protocol.CORPS_CREATE, "", function(e, t) {
if (0 === e) cc.director.loadScene("ClubScene"); else if (-1 === e) ; else {
r.ui_manager.showAlert(t, "温馨提示");
r.ui_manager.hideLoading();
}
});
};
t.prototype.click_btn_create_join = function() {
r.mp_manager.playButton();
r.ui_manager.showAlert("请找所在微信群的群主申请加入俱乐部", "加入俱乐部");
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.Node) ], t.prototype, "node_config", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_game", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_game_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_cf_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_toggleGroup_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_toggle_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_toggle_prefab2", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Room_Join_Normal: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "aad56dm51VHIq+Nz9j/x2rL", "Room_Join_Normal");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblInputList = [];
t._curIndex = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
this.init();
r.ui_manager.hideLoading();
};
t.prototype.init = function() {
this._curIndex = 0;
for (var e = 0; e < this.lblInputList.length; e++) this.lblInputList[e].string = "";
};
t.prototype.sendJoinRoom = function() {
for (var e = "", t = 0; t < this.lblInputList.length; t++) e += this.lblInputList[t].string;
if (r.ui_manager.showLoading()) {
var a = {
tableId: Number(e)
}, o = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.MAJIANG_ROOM_JOIN, o, function(e, t) {
if (0 === e) {
r.gm_manager.mjGameData = t;
r.gm_manager.replayMJ = 0;
cc.director.loadScene("MJScene");
} else if (-1 === e) ; else {
r.ui_manager.showAlert(t, "温馨提示");
r.ui_manager.hideLoading();
}
cc.log(t);
});
}
};
t.prototype.click_btn_input = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "10":
this.init();
break;

case "11":
this.deleteLastInput();
break;

default:
this.showInputNum(t);
}
};
t.prototype.deleteLastInput = function() {
if (!(this._curIndex <= 0)) {
this.lblInputList[this._curIndex - 1].string = "";
this._curIndex > 0 && this._curIndex--;
}
};
t.prototype.showInputNum = function(e) {
if (this._curIndex < this.lblInputList.length) {
this.lblInputList[this._curIndex].string = e;
if (this._curIndex < this.lblInputList.length && ++this._curIndex === this.lblInputList.length) {
cc.log("输入完毕");
this.sendJoinRoom();
}
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i([ cc.Label ]) ], t.prototype, "lblInputList", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Setting: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3c4bcf5i65OtI9ma7y7KOfB", "Setting");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = e("./../../Modules/ModuleManager"), s = e("./../Game/MJ_Help"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.toggle_bp_list = [];
t.btn_logout = null;
t.btn_disband = null;
t.btn_return = null;
t.img_effect = null;
t.img_music = null;
t.on_off_list = [];
t._showType = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
r.ui_manager.isShowPopup = !0;
if (-1 === e._showType) {
e.node.removeFromParent(!0);
e.node.destroy();
} else e.node.active = !1;
}, this);
};
t.prototype.update = function(e) {
if (r.ud_manager && r.gm_manager.mjGameData && r.gm_manager.mjGameData.tableBaseVo) if (r.gm_manager.mjGameData.tableBaseVo.currGameNum > 1 || r.gm_manager.mjGameData.tableBaseVo.gameState > s.MJ_GameState.STATE_TABLE_IDLE) {
this.btn_disband.active = !0;
this.btn_return.active = !1;
} else if (r.ud_manager.mineData.accountId === r.gm_manager.mjGameData.tableBaseVo.createPlayer) {
this.btn_disband.active = !0;
this.btn_return.active = !1;
} else {
this.btn_disband.active = !1;
this.btn_return.active = !0;
}
};
t.prototype.initData = function(e) {
this._showType = e;
this.img_effect.spriteFrame = !0 === r.mp_manager.audioSetting.isEffect ? this.on_off_list[0] : this.on_off_list[1];
this.img_music.spriteFrame = !0 === r.mp_manager.audioSetting.isMusic ? this.on_off_list[0] : this.on_off_list[1];
switch (this._showType) {
case -1:
this.btn_disband.active = !1;
this.btn_logout.active = !0;
this.btn_return.active = !1;
break;

case 0:
case 1:
this.btn_disband.active = !0;
this.btn_logout.active = !1;
this.btn_return.active = !1;
}
for (var t = 0; t < this.toggle_bp_list.length; t++) r.mp_manager.audioSetting.language === t ? this.toggle_bp_list[t].isChecked = !0 : this.toggle_bp_list[t].isChecked = !1;
};
t.prototype.click_btn_effect = function() {
r.mp_manager.playButton();
r.mp_manager.audioSetting.isEffect = !r.mp_manager.audioSetting.isEffect;
this.img_effect.spriteFrame = !0 === r.mp_manager.audioSetting.isEffect ? this.on_off_list[0] : this.on_off_list[1];
r.mp_manager.saveMPSetting();
};
t.prototype.click_btn_music = function() {
r.mp_manager.playButton();
r.mp_manager.audioSetting.isMusic = !r.mp_manager.audioSetting.isMusic;
r.mp_manager.saveMPSetting();
this.img_music.spriteFrame = !0 === r.mp_manager.audioSetting.isMusic ? this.on_off_list[0] : this.on_off_list[1];
r.mp_manager.audioSetting.isMusic ? r.mp_manager.playBackGround() : r.mp_manager.stopBackGround();
};
t.prototype.click_toggle_bp = function(e, t) {
r.mp_manager.playButton();
cc.log("---报牌音--" + t);
r.mp_manager.audioSetting.language = Number(t);
r.mp_manager.saveMPSetting();
};
t.prototype.click_btn_logout = function() {
r.mp_manager.playButton();
if (r.ui_manager.showLoading("正在注销，请稍后")) {
var e = {
accountId: r.ud_manager.mineData.accountId
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_LOGIN_OUT, t, function(e, t) {
r.ws_manager.disconnect(function() {
r.destroy();
var e = cc.sys.localStorage;
e.getItem("TokenInfo") && e.removeItem("TokenInfo");
cc.sys.garbageCollect();
cc.game.restart();
});
});
}
};
t.prototype.click_btn_disband = function() {
var e = this;
r.mp_manager.playButton();
if (r.ui_manager.showLoading()) {
var t = {
tableId: r.gm_manager.mjGameData.tableBaseVo.tableId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.MAJIANG_ROOM_QUEST_DELETE, a, function(t, a) {
r.ui_manager.hideLoading();
if (0 === t) {
r.ui_manager.isShowPopup = !0;
if (-1 === e._showType) {
e.node.removeFromParent(!0);
e.node.destroy();
} else e.node.active = !1;
r.gm_manager.mjGameData.tableBaseVo.gameState === s.MJ_GameState.STATE_TABLE_IDLE && e.quitGame();
} else -1 === t ? cc.log(a) : r.ui_manager.showAlert(a, "错误提示", null, null, 1);
});
}
};
t.prototype.quitGame = function() {
if (r.ui_manager.showLoading()) {
var e = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
e && (e._isLoad = !0);
r.ud_manager.mineData.tableId = 0;
if (r.gm_manager && r.gm_manager.mjGameData && r.gm_manager.mjGameData.tableBaseVo && 1 === r.gm_manager.mjGameData.tableBaseVo.tableChatType) r.js_call_native.quitRoom();
"0" !== r.gm_manager.mjGameData.tableBaseVo.corpsId ? cc.director.loadScene("ClubScene", function() {
r.gm_manager.destroySelf();
cc.sys.garbageCollect();
}) : cc.director.loadScene("HomeScene", function() {
r.gm_manager.destroySelf();
cc.sys.garbageCollect();
});
}
};
t.prototype.click_btn_outGame = function() {
var e = r.ui_manager.getCanvasNode().getComponent("MJCanvas");
if (e) {
r.mp_manager.playButton();
e.sendOutGame();
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
r.ui_manager.isShowPopup = !0;
if (-1 === this._showType) {
this.node.removeFromParent(!0);
this.node.destroy();
} else this.node.active = !1;
};
__decorate([ i([ cc.Toggle ]) ], t.prototype, "toggle_bp_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_logout", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_disband", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_return", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "img_effect", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "img_music", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "on_off_list", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./../Game/MJ_Help": "MJ_Help"
} ],
Store: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0e7fcq18ttOSJsaEFxtDhal", "Store");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./../../Modules/ModuleManager"), n = cc._decorator, i = n.ccclass, r = n.property, s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_ios = null;
t.node_android = null;
t.lbl_ios_desName = null;
t.lbl_ios_desContent = null;
t.lbl_android_desName = [];
t.lbl_android_desContent = [];
t.itemBoard = null;
t.items = [];
t.selectProduct = null;
t.store_item_prefab = null;
t.imgGoodsList = [];
t.products = null;
t.proxys = null;
t._node_goods_list = [];
t.cb_iapBack = function(e) {
switch (e.detail) {
case 0:
var a = {
num: parseInt(t.selectProduct.title)
}, n = JSON.stringify(a);
o.ws_manager.sendMsg(o.protocol.MALL_ITEM_BUY_OK, n, function(e, t) {
0 === e ? o.ui_manager.showAlert("购买成功!", "温馨提示", null, null, 1) : -1 === e || o.ui_manager.showTip(t);
});
break;

case -2:
o.ui_manager.showAlert("支付失败!", "温馨提示", null, null, 1);
break;

case -4:
o.ui_manager.showAlert("支付成功，校验失败!", "温馨提示", null, null, 1);
}
t.node.removeFromParent(!0);
t.node.destroy();
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
cc.systemEvent.on("cb_iapBack", this.cb_iapBack, this);
this.node.on("touchend", function(t) {
o.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
t.stopPropagation();
}, this);
if (this.products) {
this.node_android.active = !1;
this.node_ios.active = !0;
this.showGoodsList();
this.showIosPoxy();
} else {
this.node_android.active = !0;
this.node_ios.active = !1;
this.showAndroidPoxy();
}
};
t.prototype.onDestroy = function() {
cc.systemEvent.off("cb_iapBack", this.cb_iapBack, this);
};
t.prototype.init = function(e, t) {
this.proxys = e;
this.products = t;
};
t.prototype.showAndroidPoxy = function() {
for (var e = 0; e < this.lbl_android_desContent.length; e++) if (this.proxys && this.proxys[e]) {
this.lbl_android_desContent[e].node.parent.active = !0;
this.lbl_android_desName[e].string = this.proxys[e].proxyType;
this.lbl_android_desContent[e].string = this.proxys[e].wxNO + "   [" + this.proxys[e].proxyDesc + "]";
} else this.lbl_android_desContent[e].node.parent.active = !1;
};
t.prototype.showIosPoxy = function() {
if (this.proxys && this.proxys[0]) {
this.lbl_ios_desContent.node.parent.active = !0;
this.lbl_ios_desName.string = this.proxys[0].proxyType;
this.lbl_ios_desContent.string = this.proxys[0].wxNO + "   [" + this.proxys[0].proxyDesc + "]";
} else this.lbl_ios_desContent.node.parent.active = !1;
};
t.prototype.showGoodsList = function() {
var e = this;
this.itemBoard.removeAllChildren();
this.items = [];
if (this.products) for (var t = 0; t < this.products.length; t++) {
var a = cc.instantiate(this.store_item_prefab);
a.tag = t;
cc.find("img", a).getComponent(cc.Sprite).spriteFrame = this.imgGoodsList[t];
cc.find("priceLayout/price", a).getComponent(cc.Label).string = parseInt(this.products[t].price).toString();
cc.find("countLayout/count", a).getComponent(cc.Label).string = this.products[t].title;
var n = cc.find("select", a);
if (0 === t) {
n.active = !0;
this.selectProduct = this.products[0];
} else n.active = !1;
a.on("touchend", function(t) {
o.mp_manager.playButton();
e.items.forEach(function(a) {
var o = cc.find("select", a);
if (a === t.currentTarget) {
o.active = !0;
e.selectProduct = e.products[a.tag];
} else o.active = !1;
}, e);
}, this);
a.parent = this.itemBoard;
this.items.push(a);
}
};
t.prototype.click_btn_buy = function() {
o.mp_manager.playButton();
if (this.selectProduct) {
o.ui_manager.showLoading("正在向苹果请求交易，请稍后");
o.js_call_native.buyProduct(this.selectProduct.productid, o.ud_manager.mineData.accountId + Date.now);
}
};
t.prototype.click_btn_copy_ios = function() {
o.mp_manager.playButton();
if (this.proxys && this.proxys[0]) {
var e = this.proxys[0].wxNO;
o.js_call_native.copyToClipboard(e);
o.ui_manager.showTip("复制成功!");
}
};
t.prototype.click_btn_copy_android = function(e, t) {
o.mp_manager.playButton();
if (this.proxys && this.proxys[Number(t)]) {
var a = this.proxys[Number(t)].wxNO;
o.js_call_native.copyToClipboard(a);
o.ui_manager.showTip("复制成功!");
}
};
t.prototype.click_btn_out = function() {
o.mp_manager.playButton();
o.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ r(cc.Node) ], t.prototype, "node_ios", void 0);
__decorate([ r(cc.Node) ], t.prototype, "node_android", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_ios_desName", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_ios_desContent", void 0);
__decorate([ r([ cc.Label ]) ], t.prototype, "lbl_android_desName", void 0);
__decorate([ r([ cc.Label ]) ], t.prototype, "lbl_android_desContent", void 0);
__decorate([ r(cc.Node) ], t.prototype, "itemBoard", void 0);
__decorate([ r(cc.Prefab) ], t.prototype, "store_item_prefab", void 0);
__decorate([ r([ cc.SpriteFrame ]) ], t.prototype, "imgGoodsList", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Tip: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a94fdvc4jtD04LX3feBrk1U", "Tip");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_msg = null;
return t;
}
__extends(t, e);
t.prototype.showTip = function(e, t, a, o) {
this.lbl_msg.string = e;
var n = Math.floor(cc.director.getVisibleSize().height / 5), i = -n;
this.node.y = i;
this.node.scale = 1.2;
var r = cc.spawn(cc.moveTo(t, this.node.x, 0), cc.scaleTo(t, 1), cc.fadeIn(t)), s = cc.delayTime(a), c = cc.spawn(cc.moveTo(o, this.node.x, n), cc.scaleTo(o, .1), cc.fadeOut(o)), l = cc.callFunc(function(e, t) {
e.removeFromParent(!0);
e.destroy();
}, this), _ = cc.sequence(r, s, c, l);
this.node.runAction(_);
};
__decorate([ i(cc.Label) ], t.prototype, "lbl_msg", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Toggle_AddLabel: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "97162+ta8JF6Z5NPgBwnkKi", "Toggle_AddLabel");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = cc._decorator, n = o.ccclass, i = o.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblDes = null;
t.lblOL = null;
t.toggle = null;
t.check_color = [];
t.color_type = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.updateItem = function(e) {
this.lblName.string = e;
};
t.prototype.update = function(e) {
var t = this.toggle.isChecked;
this.checkChangeState(t);
};
t.prototype.checkChangeState = function(e) {
switch (this.color_type) {
case 0:
this.lblDes.color = !0 === e ? this.check_color[0] : this.check_color[1];
break;

case 1:
this.lblOL && (this.lblOL.color = !0 === e ? this.check_color[0] : this.check_color[1]);
break;

case 2:
this.lblDes.color = !0 === e ? this.check_color[0] : this.check_color[1];
this.lblOL && (this.lblOL.color = !0 === e ? this.check_color[0] : this.check_color[1]);
}
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Node) ], t.prototype, "lblDes", void 0);
__decorate([ i({
type: cc.LabelOutline,
tooltip: "文字label的描边,可以不存在"
}) ], t.prototype, "lblOL", void 0);
__decorate([ i(cc.Toggle) ], t.prototype, "toggle", void 0);
__decorate([ i({
type: [ cc.Color ],
tooltip: "选中和未选中这个选项的时候，lable的颜色\n 0:选中\n 1:未选中"
}) ], t.prototype, "check_color", void 0);
__decorate([ i({
type: cc.Integer,
tooltip: "label节点颜色改变的类型\n 0:只改变node颜色\n 1:只改变node的labelOutline组件(如果存在的话)颜色\n 2:前两个都改变"
}) ], t.prototype, "color_type", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
UDManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "05e906SGI1JnLqQqiP0GJIX", "UDManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = function() {
function e() {
this.mineData = null;
this.hotTip = null;
this.noticeList = [];
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.destroySelf = function() {
this.mineData = null;
this.hotTip = null;
this.noticeList.length = 0;
e._instance = null;
};
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {} ],
UIManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "020aaKDESZPU5JLyI9iKKyn", "UIManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = function() {
function e() {
var e = this;
this.p_loading = null;
this.isShowLoading = !1;
this.p_alert = null;
this.p_tip = null;
this.isShowPopup = !0;
this.cb_before_scene_loading = function(t) {
e.isShowLoading = !1;
e.isShowPopup = !0;
};
this.cb_befor_update = function(e) {};
this.cb_app_hide = function(e) {
cc.game.isPaused() || cc.game.pause();
};
this.cb_app_show = function(e) {
cc.game.isPaused() && cc.game.resume();
};
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.initUI = function() {
return __awaiter(this, void 0, void 0, function() {
return __generator(this, function(e) {
switch (e.label) {
case 0:
cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
cc.game.on(cc.game.EVENT_HIDE, this.cb_app_hide, this);
cc.game.on(cc.game.EVENT_SHOW, this.cb_app_show, this);
return [ 4, this.initLoading() ];

case 1:
e.sent();
return [ 4, this.initAlert() ];

case 2:
e.sent();
return [ 4, this.initTip() ];

case 3:
e.sent();
return [ 2 ];
}
});
});
};
e.prototype.initLoading = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Prefab/Loading", cc.Prefab, function(o, n) {
if (o) a(o.message); else {
e.p_loading = n;
t();
}
});
});
};
e.prototype.initAlert = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Prefab/Alert", cc.Prefab, function(o, n) {
if (o) a(o.message); else {
e.p_alert = n;
t();
}
});
});
};
e.prototype.initTip = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Prefab/Tip", cc.Prefab, function(o, n) {
if (o) a(o.message); else {
e.p_tip = n;
t();
}
});
});
};
e.prototype.getCanvasNode = function() {
return cc.director.getScene().getChildByName("Canvas");
};
e.prototype.getRootNode = function() {
return cc.find("RootNode", this.getCanvasNode());
};
e.prototype.showLoading = function(e) {
void 0 === e && (e = "正在加载，请稍后");
if (this.isShowLoading) return !1;
this.isShowLoading = !0;
var t = cc.instantiate(this.p_loading);
t.zIndex = 99;
t.parent = this.getCanvasNode();
t.getComponent("Loading").setMsg(e);
return !0;
};
e.prototype.hideLoading = function() {
if (this.isShowLoading) {
this.isShowLoading = !1;
var e = cc.find("Loading", this.getCanvasNode());
if (e && e.isValid) {
e.removeFromParent(!0);
e.destroy();
}
}
};
e.prototype.showAlert = function(e, t, a, o, n) {
void 0 === n && (n = 1);
this.hideLoading();
var i = cc.find("Alert", this.getCanvasNode());
if (i && i.isValid) {
i.removeFromParent(!0);
i.destroy();
}
(i = cc.instantiate(this.p_alert)).parent = this.getCanvasNode();
i.getComponent("Alert").showAlert(e, t, a, o, n);
};
e.prototype.showTip = function(e, t, a, o) {
void 0 === t && (t = 1);
void 0 === a && (a = 2);
void 0 === o && (o = 1);
var n = cc.instantiate(this.p_tip);
n.zIndex = 99;
n.parent = this.getCanvasNode();
n.getComponent("Tip").showTip(e, t, a, o);
};
e.prototype.destroySelf = function() {
cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
cc.game.off(cc.game.EVENT_HIDE, this.cb_app_hide, this);
cc.game.off(cc.game.EVENT_SHOW, this.cb_app_show, this);
this.isShowLoading = !1;
this.release(this.p_loading);
this.release(this.p_alert);
this.release(this.p_tip);
e._instance = null;
};
e.prototype.release = function(e) {
var t = cc.loader.getDependsRecursively(e);
cc.loader.release(t);
};
e.prototype.fixIPoneX = function(e) {
if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) {
var t = cc.view.getFrameSize();
if (2436 == t.width && 1125 == t.height || 1125 == t.width && 2436 == t.height) {
var a = e.getComponent(cc.Canvas);
a.fitHeight = !0;
a.fitWidth = !0;
}
}
};
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {} ],
Utils: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3550cBmAB5Pip6W07VMW445", "Utils");
Object.defineProperty(a, "__esModule", {
value: !0
});
a.getHeadImgUrl = function(e) {
if ("" === e || "/0" === e) return "";
var t = e.split("/");
t.pop();
return t.join("/") + "/96";
};
a.captureScreen = function(e, t, a) {
if (cc.sys.isNative && cc.sys.isMobile) {
var o = cc.RenderTexture.create(e.width, e.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
e.parent._sgNode.addChild(o);
o.setVisible(!1);
o.begin();
e._sgNode.visit();
o.end();
o.saveToFile(t, cc.ImageFormat.PNG, !0, function(e, t) {
o.removeFromParent(!0);
var n = 0, i = setInterval(function() {
if (n > 1e4) {
n = null;
clearInterval(i);
a();
}
if (jsb.fileUtils.isFileExist(t)) {
n = null;
clearInterval(i);
a(t);
}
n += 100;
}, 100);
});
} else a();
};
a.getThousandString = function(e) {
isNaN(e) && (e = 0);
for (var t = e.toString(), a = ""; t.length > 3; ) {
a = "," + t.slice(-3) + a;
t = t.slice(0, t.length - 3);
}
t && (a = t + a);
return a;
};
a.getBackNumString = function(e) {
var t = e.split(",");
e = "";
for (var a = 0; a < t.length; a++) e += t[a];
return e;
};
a.getPointNumString = function(e) {
for (var t = e.split("."), a = [], o = 0; o < t.length; o++) a.push(Number(t[o]));
return a;
};
a.getNumberList = function(e) {
return e.toString().split("").map(function(e) {
return Number(e);
});
};
a.getDateStringByTimestamp = function(e, t) {
var a = Number(e);
if (isNaN(a)) return "";
var o = new Date();
o.setTime(a);
var n = this.getDateStringByDate(o), i = this.getTimeStringByDate(o);
return 1 === t ? n : 2 === t ? i : n + " " + i;
};
a.getDateStringByDate = function(e, t) {
if (e instanceof Date) {
t || (t = "-");
var a = e.getFullYear() + "", o = e.getMonth() + 1, n = o + "";
o < 10 && (n = "0" + o);
var i = e.getDate(), r = i + "";
i < 10 && (r = "0" + i);
return a + t + n + t + r;
}
return "";
};
a.getTimeStringByDate = function(e, t) {
if (e instanceof Date) {
t || (t = ":");
var a = e.getHours(), o = a + "";
a < 10 && (o = "0" + a);
var n = e.getMinutes(), i = n + "";
n < 10 && (i = "0" + n);
return o + t + i;
}
return "";
};
a.getCountDownString = function(e, t) {
var a = this.getCountDownObj(e);
if (null === a) return "";
var o = "";
1 === t ? a.minute += 60 * a.hour : a.hour > 9 ? o += a.hour + ":" : o += "0" + a.hour + ":";
a.minute > 9 ? o += a.minute + ":" : o += "0" + a.minute + ":";
a.second > 9 ? o += a.second : o += "0" + a.second;
return o;
};
cc._RF.pop();
}, {} ],
WSManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "14e2emcHSBBALc9XuPglA/5", "WSManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./ModuleManager"), n = e("./Protocol"), i = e("./ENCManager"), r = e("./UDManager"), s = function() {
function e() {
this.heartbeatInterval = 5e3;
this.intervalTime = 0;
this.timeoutTime = 1e4;
this.timeoutMax = 3e4;
this.heartbeatStart = 0;
this.heartbeatEnd = 0;
this.timeID = null;
this.url = null;
this.ws = null;
this.readyState = null;
this.delayTime = 0;
this.sendDataArray = [];
this.cb_close = null;
this.isLogin = !1;
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.setLoginState = function(e) {
this.isLogin = e;
};
e.prototype.connect = function(e) {
var t = this;
return new Promise(function(a, o) {
if (t.ws || e.length < 1 || t.readyState) {
t.destroySelf();
o("参数错误");
}
t.readyState = WebSocket.CONNECTING;
t.ws = new WebSocket(e);
t.ws.binaryType = "arraybuffer";
t.ws.onopen = function(o) {
t.readyState = WebSocket.OPEN;
t.url = e;
t.checkTimeOut();
a();
};
t.ws.onclose = function(e) {
switch (t.readyState) {
case WebSocket.CONNECTING:
o("连接失败");
break;

case WebSocket.OPEN:
cc.log("意外断开连接");
cc.systemEvent.emit("cb_diconnect");
break;

case WebSocket.CLOSING:
cc.log("客户端主动断开连接");
t.cb_close && t.cb_close();
break;

case WebSocket.CLOSED:
cc.log("心跳超时");
cc.systemEvent.emit("cb_diconnect");
break;

default:
cc.log("onclose：未知状态！");
cc.systemEvent.emit("cb_diconnect");
}
t.destroySelf();
};
t.ws.onmessage = function(e) {
var a = t.getMessageId(e.data, 12), o = t.getMessageBody(e.data, 32), i = JSON.parse(o);
if (a > 1e4) 0 === i.code ? t.doPush(a, i.content) : cc.log("推送了错误消息过来"); else {
var r = t.getSendData(a);
if (r) {
t.delayTime = Date.now() - r.sendTime;
r.callback(i.code, i.content);
cc.js.array.remove(t.sendDataArray, r);
} else a !== n.Protocol.ACCOUNT_PING && cc.log("onmessage:协议号" + a + "超时或未知");
}
};
});
};
e.prototype.checkTimeOut = function() {
var e = this, t = Date.now();
this.heartbeatStart = t;
this.heartbeatEnd = t;
this.intervalTime = 0;
this.sendDataArray.length = 0;
this.timeID = setInterval(function() {
if (e.readyState === WebSocket.OPEN) {
e.checkHeartbeat();
var t = [];
e.sendDataArray.forEach(function(a) {
if (Date.now() - a.sendTime >= e.timeoutTime) {
o.ui_manager.showTip("消息超时");
o.ui_manager.hideLoading();
a.callback(-1);
t.push(a);
}
});
cc.js.array.removeArray(e.sendDataArray, t);
}
}, 1e3);
};
e.prototype.stopCheck = function() {
if (this.timeID) {
clearInterval(this.timeID);
this.timeID = null;
}
};
e.prototype.checkHeartbeat = function() {
var e = this;
if (0 === this.intervalTime) {
this.heartbeatStart = Date.now();
this.sendMsg(n.Protocol.ACCOUNT_HEART, "", function(t, a) {
if (0 === t) {
e.heartbeatEnd = Date.now();
e.delayTime = e.heartbeatEnd - e.heartbeatStart;
if (e.isLogin) {
var o = {
ping: e.delayTime
};
e.sendMsg(n.Protocol.ACCOUNT_PING, JSON.stringify(o), null);
}
} else cc.log("心跳返回错误了！");
});
}
this.intervalTime += 1e3;
this.intervalTime >= this.heartbeatInterval && (this.intervalTime = 0);
if (this.delayTime >= this.timeoutMax) {
this.readyState = WebSocket.CLOSED;
this.ws.close();
}
};
e.prototype.doPush = function(e, t) {
switch (e) {
case n.Protocol.ACCOUNT_NOTIFY_HOT_PROMPT:
r.default.getInstance().hotTip = t;
break;

case n.Protocol.MESSAGE_NOTICE_NOTIFY:
for (var a = !0, i = t, s = 0; s < r.default.getInstance().noticeList.length; s++) if (r.default.getInstance().noticeList[s].msgId === i.msgId) {
a = !1;
break;
}
a && r.default.getInstance().noticeList.push(i);
break;

case n.Protocol.ACCOUNT_NOTIFY_KICK_ACCOUNT:
this.disconnect(function() {
cc.director.loadScene("LoginScene", function() {
o.ui_manager.showAlert("当前账号已在其他设备登录！", "温馨提示", null, null, 1);
});
});
break;

case n.Protocol.ACCOUNT_NOTIFY_WALLET:
var c = t;
r.default.getInstance().mineData.roomCard = c.roomCard;
break;

case n.Protocol.MAJIANG_ROOM_GAMESTATE_NOTIFY:
cc.systemEvent.emit("MJ_GamePush", t);
break;

case n.Protocol.MAJIANG_ROOM_SEAT_NOTIFY:
cc.systemEvent.emit("MJ_SeatPush", t);
break;

case n.Protocol.MAJIANG_ROOM_DINQUE_NOTIFY:
cc.systemEvent.emit("MJ_DingQuePush", t);
break;

case n.Protocol.MAJIANG_ROOM_SWAPCARD_NOTIFY:
cc.systemEvent.emit("MJ_SwapCardPush", t);
break;

case n.Protocol.MAJIANG_ROOM_OUTCARD_NOTIFY:
cc.systemEvent.emit("MJ_OutCardPush", t);
break;

case n.Protocol.CHAT_SEND_NOTIFY:
cc.systemEvent.emit("MJ_ChatPush", t);
break;

case n.Protocol.MAJIANG_ROOM_BREAKCARD_NOTIFY:
cc.systemEvent.emit("MJ_BreakCardPush", t);
break;

case n.Protocol.MAJIANG_ROOM_DESTORY_NOTIFY:
cc.systemEvent.emit("MJ_OutPush", t);
break;

case n.Protocol.MAJIANG_ROOM_DESTORY_BT_NOTIFY:
cc.systemEvent.emit("MJ_DisbandPush", t);
break;

case n.Protocol.CORPS_ADD_MEMBER_NOTIFY:
o.ui_manager.showAlert(t.content, "俱乐部", null, null, 1);
cc.systemEvent.emit("Club_Add_Member_Push", t);
break;

case n.Protocol.CORPS_KIC_KMEMBER_NOTIFY:
o.ui_manager.showAlert(t.content, "俱乐部", null, null, 1);
cc.systemEvent.emit("Club_Kik_Member_Push", t);
break;

case n.Protocol.CORPS_DESTORY_NOTIFY:
o.ui_manager.showAlert(t.content, "俱乐部", null, null, 1);
cc.systemEvent.emit("Club_Destory_Push", t);
}
};
e.prototype.getSendData = function(e) {
for (var t = 0, a = this.sendDataArray.length; t < a; t++) {
var o = this.sendDataArray[t];
if (o.msgId === e) return o;
}
return null;
};
e.prototype.disconnect = function(e) {
if (this.ws && this.ws.readyState === WebSocket.OPEN && this.readyState === WebSocket.OPEN) {
this.readyState = WebSocket.CLOSING;
this.cb_close = e;
this.ws.close();
}
};
e.prototype.sendMsg = function(e, t, a) {
if (this.ws && this.ws.readyState === WebSocket.OPEN) {
if (a) {
var o = this.getSendData(e);
o && cc.js.array.remove(this.sendDataArray, o);
o = {
msgId: e,
sendTime: Date.now(),
callback: a
};
this.sendDataArray.push(o);
}
this.ws.send(this.createMessage(e, t));
return !0;
}
return !1;
};
e.prototype.getMessageId = function(e, t) {
var a = Array.apply([], new Uint8Array(e));
return (255 & a[t]) << 24 | (255 & a[t + 1]) << 16 | (255 & a[t + 2]) << 8 | 255 & a[t + 3];
};
e.prototype.getMessageBody = function(e, t) {
var a = e.slice(t);
return this.ArrayBufferToString(a);
};
e.prototype.createMessage = function(e, t) {
var a = this.getArrayNumberFromString(t), o = a.length, n = {
hcheck: 0,
code: 0,
flag: 0,
id: 0,
timestamp: 0,
bcheck: 0,
blen: 0,
alen: 0
};
n.id = e;
n.timestamp = Date.now() / 1e3;
n.blen = o;
n.bcheck = this.checkSum(a, 0, o);
var i = this.getHeaderToArrayNumber(n);
n.hcheck = this.checkSum(i, 4, 28);
var r = (i = this.getHeaderToArrayNumber(n)).concat(a);
return new Uint8Array(r).buffer;
};
e.prototype.getHeaderToArrayNumber = function(e) {
var t = this.numberToArrayNumber(e.hcheck);
return t = (t = (t = (t = (t = (t = (t = t.concat(this.numberToArrayNumber(e.code))).concat(this.numberToArrayNumber(e.flag))).concat(this.numberToArrayNumber(e.id))).concat(this.numberToArrayNumber(e.timestamp))).concat(this.numberToArrayNumber(e.bcheck))).concat(this.numberToArrayNumber(e.blen))).concat(this.numberToArrayNumber(e.alen));
};
e.prototype.numberToArrayNumber = function(e) {
var t = [];
t[0] = e >> 24 & 255;
t[1] = e >> 16 & 255;
t[2] = e >> 8 & 255;
t[3] = 255 & e;
return t;
};
e.prototype.getArrayNumberFromString = function(e) {
return Array.apply([], this.StringToArrayBuffer(e));
};
e.prototype.checkSum = function(e, t, a) {
for (var o = 0, n = t; n < t + a; n++) o = o << 7 ^ e[n];
return o;
};
e.prototype.ArrayBufferToString = function(e) {
var t = String.fromCharCode.apply(null, new Uint8Array(e));
return t = i.default.getInstance().Utf8Decode(t);
};
e.prototype.StringToArrayBuffer = function(e) {
e = i.default.getInstance().Utf8Encode(e);
for (var t = new ArrayBuffer(e.length), a = new Uint8Array(t), o = 0, n = e.length; o < n; o++) a[o] = e.charCodeAt(o);
return a;
};
e.prototype.getDelayTime = function() {
return this.delayTime;
};
e.prototype.destroySelf = function() {
this.stopCheck();
this.url = null;
this.readyState = null;
this.ws = null;
this.sendDataArray.length = 0;
this.heartbeatEnd = 0;
this.heartbeatStart = 0;
this.intervalTime = 0;
this.delayTime = 0;
this.cb_close = null;
this.isLogin = !1;
e._instance = null;
};
e._instance = null;
return e;
}();
a.default = s;
cc._RF.pop();
}, {
"./ENCManager": "ENCManager",
"./ModuleManager": "ModuleManager",
"./Protocol": "Protocol",
"./UDManager": "UDManager"
} ]
}, {}, [ "Config", "ENCManager", "GMManager", "IMGManager", "JSCallNative", "MPManager", "ModuleManager", "NativeCallJS", "Protocol", "UDManager", "UIManager", "Utils", "WSManager", "ClubCanvas", "Club_Add_Member", "Club_Apply_Join", "Club_Apply_Join_Item", "Club_Item", "Club_Join", "Club_Member_Item", "Club_Record_Item", "Club_Role", "Club_Table_Item.ts", "Game_Chat", "Game_Chat_Show", "Game_Disband", "Game_Over", "Game_Over_Item", "Game_Result", "Game_Result_Item", "MJCanvas", "MJ_Action", "MJ_ActionSwap", "MJ_Card", "MJ_Card_Group", "MJ_Game", "MJ_Game_Mine", "MJ_Game_Others", "MJ_Gang", "MJ_HandList", "MJ_Help", "MJ_PlayerUI", "MJ_Replay", "MJ_Table", "MJ_Ting", "Auth", "Auth_phone", "Gift", "Gift_Item", "Help", "HomeCanvas", "Mail", "Mail_Item", "Record", "Record_Detail", "Role", "Setting", "Store", "LoadCanvas", "LoginCanvas", "Room_Create", "Room_Create_Rule", "Room_Join_Normal", "Alert", "DDLabel", "Loading", "Tip", "Toggle_AddLabel" ]);