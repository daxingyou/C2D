require = function e(t, a, n) {
function o(r, c) {
if (!a[r]) {
if (!t[r]) {
var s = "function" == typeof require && require;
if (!c && s) return s(r, !0);
if (i) return i(r, !0);
var l = new Error("Cannot find module '" + r + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var _ = a[r] = {
exports: {}
};
t[r][0].call(_.exports, function(e) {
var a = t[r][1][e];
return o(a || e);
}, _, _.exports, e, t, a, n);
}
return a[r].exports;
}
for (var i = "function" == typeof require && require, r = 0; r < n.length; r++) o(n[r]);
return o;
}({
Action: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "066ccgP8pFA8K8R80ujOAYM", "Action");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = (n.property, function(e) {
function t() {
return null !== e && e.apply(this, arguments) || this;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.actionEnd = function() {
this.node.removeFromParent(!0);
this.node.destroy();
};
return t = __decorate([ o ], t);
}(cc.Component));
a.default = i;
cc._RF.pop();
}, {} ],
Alert: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0e217wA2r9EXJaWWdSt/R3f", "Alert");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./../Modules/ModuleManager"), o = cc._decorator, i = o.ccclass, r = o.property, c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_msg = null;
t.lbl_title = null;
t.btn_yes = null;
t.btn_no = null;
t.lbl_yes = null;
t.lbl_no = null;
t.cb_y = null;
t.cb_n = null;
return t;
}
__extends(t, e);
t.prototype.showAlert = function(e, t, a, n, o) {
void 0 === o && (o = 0);
this.lbl_title.string = t;
this.lbl_msg.string = e;
if (a) {
this.cb_y = a.callback;
this.lbl_yes.string = a.lbl_name;
} else this.lbl_yes.string = "确定";
if (n) {
this.btn_no.active = !0;
this.cb_n = n.callback;
this.lbl_no.string = n.lbl_name;
} else this.btn_no.active = !1;
switch (o) {
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
n.mp_manager.playButton();
"yes" === t ? this.cb_y && this.cb_y(e) : this.cb_n && this.cb_n(e);
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ r(cc.RichText) ], t.prototype, "lbl_msg", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_title", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_yes", void 0);
__decorate([ r(cc.Node) ], t.prototype, "btn_no", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_yes", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lbl_no", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../Modules/ModuleManager": "ModuleManager"
} ],
BtnScale: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3d656CcqR5EeoLQ7fTRq0cF", "BtnScale");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = (n.property, function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.onTouchStart = function(e) {
t.playAction(1.1);
e.stopPropagation();
};
t.onTouchMove = function(e) {
e.stopPropagation();
};
t.onTouchEnd = function(e) {
t.playAction(1);
e.stopPropagation();
};
t.onTouchCancel = function(e) {
t.playAction(1);
e.stopPropagation();
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchstart", this.onTouchStart, this);
this.node.on("touchmove", this.onTouchMove, this);
this.node.on("touchend", this.onTouchEnd, this);
this.node.on("touchcancel", this.onTouchCancel, this);
};
t.prototype.playAction = function(e) {
var t = this.node.getComponent(cc.Button);
if (t && t.interactable) {
this.node.stopAllActions();
var a = cc.scaleTo(.08, e);
this.node.runAction(a);
}
};
t.prototype.onDestroy = function() {
this.node.off("touchstart", this.onTouchStart, this);
this.node.off("touchmove", this.onTouchMove, this);
this.node.off("touchend", this.onTouchEnd, this);
this.node.off("touchcancel", this.onTouchCancel, this);
};
return t = __decorate([ o ], t);
}(cc.Component));
a.default = i;
cc._RF.pop();
}, {} ],
CardManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "e1db5UmhQpGr5ClM4svbut8", "CardManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.getCardObjById = function(e) {
return e >= 2 && e < 15 ? {
suit: 1,
point: e,
cardId: e
} : e >= 15 && e < 28 ? {
suit: 2,
point: e - 13,
cardId: e
} : e >= 28 && e < 41 ? {
suit: 3,
point: e - 26,
cardId: e
} : e >= 41 && e < 54 ? {
suit: 4,
point: e - 39,
cardId: e
} : null;
};
e.prototype.getCardTypeByIds = function(e) {
if (3 !== e.length) return null;
var t = this.getCardObjById(e[0]), a = this.getCardObjById(e[1]), n = this.getCardObjById(e[2]);
if (t && a && n) {
if (t.point === a.point && a.point === n.point) return "豹子";
var o = [ t.point, a.point, n.point ].sort(function(e, t) {
return e - t;
});
return 1 === Math.abs(o[0] - o[1]) && 1 === Math.abs(o[1] - o[2]) || 2 === o[0] && 3 === o[1] && 14 === o[2] ? t.suit === a.suit && a.suit === n.suit ? "顺金" : "顺子" : t.suit === a.suit && a.suit === n.suit ? "金花" : t.point !== a.point && a.point !== n.point && t.point !== n.point ? "单牌" : "对子";
}
return null;
};
e.prototype.getNiuTypeByIds = function(e) {
var t = this;
if (!e || 5 !== e.length) return 0;
var a = e.map(function(e) {
return t.getPointById(e);
}, this), n = 0;
a.forEach(function(e) {
n += e;
}, this);
if (50 === n) return e.every(function(e) {
return t.getCardObjById(e).point > 10;
}, this) ? 11 : 10;
for (var o = this.arrayCombine(a, 3), i = [], r = 0; r < o.length; r++) {
var c = o[r];
n = 0;
c.forEach(function(e) {
n += e;
}, this);
if (n % 10 == 0) {
i = c;
break;
}
}
if (0 === i.length) return 0;
cc.js.array.removeArray(a, i);
n = 0;
a.forEach(function(e) {
n += e;
}, this);
var s = n % 10;
return 0 === s ? 10 : s;
};
e.prototype.getPointById = function(e) {
return e >= 2 && e < 15 ? 14 === e ? 1 : e > 10 && e < 14 ? 10 : e : e >= 15 && e < 28 ? e - 13 == 14 ? 1 : e - 13 > 10 && e - 13 < 14 ? 10 : e - 13 : e >= 28 && e < 41 ? e - 26 == 14 ? 1 : e - 26 > 10 && e - 26 < 14 ? 10 : e - 26 : e >= 41 && e < 54 ? e - 39 == 14 ? 1 : e - 39 > 10 && e - 39 < 14 ? 10 : e - 39 : null;
};
e.prototype.arrayCombine = function(e, t) {
if (!e || !e.length || t < 1 || t > e.length) return [];
for (var a = e.length, n = [], o = this.getFlagArrs(a, t); o.length; ) {
for (var i = o.shift(), r = [], c = 0; c < a; c++) i[c] && r.push(e[c]);
n.push(r);
}
return n;
};
e.prototype.getFlagArrs = function(e, t) {
if (!t || t < 1) return [];
var a, n, o, i = [], r = [], c = !1;
for (a = 0; a < e; a++) r[a] = a < t ? 1 : 0;
i.push(r.concat());
for (;!c; ) {
o = 0;
for (a = 0; a < e - 1; a++) {
if (1 == r[a] && 0 == r[a + 1]) {
for (n = 0; n < a; n++) r[n] = n < o ? 1 : 0;
r[a] = 0;
r[a + 1] = 1;
var s = r.concat();
i.push(s);
-1 == s.slice(-t).join("").indexOf("0") && (c = !0);
break;
}
1 == r[a] && o++;
}
}
return i;
};
e.prototype.destroySelf = function() {
e._instance = null;
};
e._instance = null;
return e;
}();
a.default = n;
cc._RF.pop();
}, {} ],
Config: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "412fdxUBotE+77s8BLjRTsP", "Config");
Object.defineProperty(a, "__esModule", {
value: !0
});
a.wsUrl = "ws://118.31.66.39:30000";
cc._RF.pop();
}, {} ],
DDLabel: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3bed5gzdJJOp4bcF1JmtgdK", "DDLabel");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = (n.property, function(e) {
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
return t = __decorate([ o ], t);
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
var n = function() {
function e() {}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.RotateLeft = function(e, t) {
return e << t | e >>> 32 - t;
};
e.prototype.AddUnsigned = function(e, t) {
var a, n, o, i, r;
o = 2147483648 & e;
i = 2147483648 & t;
r = (1073741823 & e) + (1073741823 & t);
return (a = 1073741824 & e) & (n = 1073741824 & t) ? 2147483648 ^ r ^ o ^ i : a | n ? 1073741824 & r ? 3221225472 ^ r ^ o ^ i : 1073741824 ^ r ^ o ^ i : r ^ o ^ i;
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
e.prototype.FF = function(e, t, a, n, o, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.F(t, a, n), o), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.GG = function(e, t, a, n, o, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.G(t, a, n), o), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.HH = function(e, t, a, n, o, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.H(t, a, n), o), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.II = function(e, t, a, n, o, i, r) {
e = this.AddUnsigned(e, this.AddUnsigned(this.AddUnsigned(this.I(t, a, n), o), r));
return this.AddUnsigned(this.RotateLeft(e, i), t);
};
e.prototype.ConvertToWordArray = function(e) {
for (var t, a = e.length, n = a + 8, o = 16 * ((n - n % 64) / 64 + 1), i = Array(o - 1), r = 0, c = 0; c < a; ) {
r = c % 4 * 8;
i[t = (c - c % 4) / 4] = i[t] | e.charCodeAt(c) << r;
c++;
}
r = c % 4 * 8;
i[t = (c - c % 4) / 4] = i[t] | 128 << r;
i[o - 2] = a << 3;
i[o - 1] = a >>> 29;
return i;
};
e.prototype.WordToHex = function(e) {
var t, a = "", n = "";
for (t = 0; t <= 3; t++) a += (n = "0" + (e >>> 8 * t & 255).toString(16)).substr(n.length - 2, 2);
return a;
};
e.prototype.Utf8Encode = function(e) {
e = e.replace(/\r\n/g, "\n");
for (var t = "", a = 0; a < e.length; a++) {
var n = e.charCodeAt(a);
if (n < 128) t += String.fromCharCode(n); else if (n > 127 && n < 2048) {
t += String.fromCharCode(n >> 6 | 192);
t += String.fromCharCode(63 & n | 128);
} else {
t += String.fromCharCode(n >> 12 | 224);
t += String.fromCharCode(n >> 6 & 63 | 128);
t += String.fromCharCode(63 & n | 128);
}
}
return t;
};
e.prototype.Utf8Decode = function(e) {
for (var t = "", a = 0, n = 0, o = 0, i = 0; a < e.length; ) if ((n = e.charCodeAt(a)) < 128) {
t += String.fromCharCode(n);
a++;
} else if (n > 191 && n < 224) {
o = e.charCodeAt(a + 1);
t += String.fromCharCode((31 & n) << 6 | 63 & o);
a += 2;
} else {
o = e.charCodeAt(a + 1);
i = e.charCodeAt(a + 2);
t += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & i);
a += 3;
}
return t;
};
e.prototype.base64Encode = function(e) {
var t, a, n, o, i, r, c, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", l = "", _ = 0;
e = this.Utf8Encode(e);
for (;_ < e.length; ) {
o = (t = e.charCodeAt(_++)) >> 2;
i = (3 & t) << 4 | (a = e.charCodeAt(_++)) >> 4;
r = (15 & a) << 2 | (n = e.charCodeAt(_++)) >> 6;
c = 63 & n;
isNaN(a) ? r = c = 64 : isNaN(n) && (c = 64);
l = l + s.charAt(o) + s.charAt(i) + s.charAt(r) + s.charAt(c);
}
return l;
};
e.prototype.base64Decode = function(e) {
var t, a, n, o, i, r, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = "", l = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;l < e.length; ) {
t = c.indexOf(e.charAt(l++)) << 2 | (o = c.indexOf(e.charAt(l++))) >> 4;
a = (15 & o) << 4 | (i = c.indexOf(e.charAt(l++))) >> 2;
n = (3 & i) << 6 | (r = c.indexOf(e.charAt(l++)));
s += String.fromCharCode(t);
64 != i && (s += String.fromCharCode(a));
64 != r && (s += String.fromCharCode(n));
}
return s = this.Utf8Decode(s);
};
e.prototype.MD5 = function(e) {
var t, a, n, o, i, r, c, s, l, _ = Array();
e = this.Utf8Encode(e);
_ = this.ConvertToWordArray(e);
r = 1732584193;
c = 4023233417;
s = 2562383102;
l = 271733878;
for (t = 0; t < _.length; t += 16) {
a = r;
n = c;
o = s;
i = l;
r = this.FF(r, c, s, l, _[t + 0], 7, 3614090360);
l = this.FF(l, r, c, s, _[t + 1], 12, 3905402710);
s = this.FF(s, l, r, c, _[t + 2], 17, 606105819);
c = this.FF(c, s, l, r, _[t + 3], 22, 3250441966);
r = this.FF(r, c, s, l, _[t + 4], 7, 4118548399);
l = this.FF(l, r, c, s, _[t + 5], 12, 1200080426);
s = this.FF(s, l, r, c, _[t + 6], 17, 2821735955);
c = this.FF(c, s, l, r, _[t + 7], 22, 4249261313);
r = this.FF(r, c, s, l, _[t + 8], 7, 1770035416);
l = this.FF(l, r, c, s, _[t + 9], 12, 2336552879);
s = this.FF(s, l, r, c, _[t + 10], 17, 4294925233);
c = this.FF(c, s, l, r, _[t + 11], 22, 2304563134);
r = this.FF(r, c, s, l, _[t + 12], 7, 1804603682);
l = this.FF(l, r, c, s, _[t + 13], 12, 4254626195);
s = this.FF(s, l, r, c, _[t + 14], 17, 2792965006);
c = this.FF(c, s, l, r, _[t + 15], 22, 1236535329);
r = this.GG(r, c, s, l, _[t + 1], 5, 4129170786);
l = this.GG(l, r, c, s, _[t + 6], 9, 3225465664);
s = this.GG(s, l, r, c, _[t + 11], 14, 643717713);
c = this.GG(c, s, l, r, _[t + 0], 20, 3921069994);
r = this.GG(r, c, s, l, _[t + 5], 5, 3593408605);
l = this.GG(l, r, c, s, _[t + 10], 9, 38016083);
s = this.GG(s, l, r, c, _[t + 15], 14, 3634488961);
c = this.GG(c, s, l, r, _[t + 4], 20, 3889429448);
r = this.GG(r, c, s, l, _[t + 9], 5, 568446438);
l = this.GG(l, r, c, s, _[t + 14], 9, 3275163606);
s = this.GG(s, l, r, c, _[t + 3], 14, 4107603335);
c = this.GG(c, s, l, r, _[t + 8], 20, 1163531501);
r = this.GG(r, c, s, l, _[t + 13], 5, 2850285829);
l = this.GG(l, r, c, s, _[t + 2], 9, 4243563512);
s = this.GG(s, l, r, c, _[t + 7], 14, 1735328473);
c = this.GG(c, s, l, r, _[t + 12], 20, 2368359562);
r = this.HH(r, c, s, l, _[t + 5], 4, 4294588738);
l = this.HH(l, r, c, s, _[t + 8], 11, 2272392833);
s = this.HH(s, l, r, c, _[t + 11], 16, 1839030562);
c = this.HH(c, s, l, r, _[t + 14], 23, 4259657740);
r = this.HH(r, c, s, l, _[t + 1], 4, 2763975236);
l = this.HH(l, r, c, s, _[t + 4], 11, 1272893353);
s = this.HH(s, l, r, c, _[t + 7], 16, 4139469664);
c = this.HH(c, s, l, r, _[t + 10], 23, 3200236656);
r = this.HH(r, c, s, l, _[t + 13], 4, 681279174);
l = this.HH(l, r, c, s, _[t + 0], 11, 3936430074);
s = this.HH(s, l, r, c, _[t + 3], 16, 3572445317);
c = this.HH(c, s, l, r, _[t + 6], 23, 76029189);
r = this.HH(r, c, s, l, _[t + 9], 4, 3654602809);
l = this.HH(l, r, c, s, _[t + 12], 11, 3873151461);
s = this.HH(s, l, r, c, _[t + 15], 16, 530742520);
c = this.HH(c, s, l, r, _[t + 2], 23, 3299628645);
r = this.II(r, c, s, l, _[t + 0], 6, 4096336452);
l = this.II(l, r, c, s, _[t + 7], 10, 1126891415);
s = this.II(s, l, r, c, _[t + 14], 15, 2878612391);
c = this.II(c, s, l, r, _[t + 5], 21, 4237533241);
r = this.II(r, c, s, l, _[t + 12], 6, 1700485571);
l = this.II(l, r, c, s, _[t + 3], 10, 2399980690);
s = this.II(s, l, r, c, _[t + 10], 15, 4293915773);
c = this.II(c, s, l, r, _[t + 1], 21, 2240044497);
r = this.II(r, c, s, l, _[t + 8], 6, 1873313359);
l = this.II(l, r, c, s, _[t + 15], 10, 4264355552);
s = this.II(s, l, r, c, _[t + 6], 15, 2734768916);
c = this.II(c, s, l, r, _[t + 13], 21, 1309151649);
r = this.II(r, c, s, l, _[t + 4], 6, 4149444226);
l = this.II(l, r, c, s, _[t + 11], 10, 3174756917);
s = this.II(s, l, r, c, _[t + 2], 15, 718787259);
c = this.II(c, s, l, r, _[t + 9], 21, 3951481745);
r = this.AddUnsigned(r, a);
c = this.AddUnsigned(c, n);
s = this.AddUnsigned(s, o);
l = this.AddUnsigned(l, i);
}
return (this.WordToHex(r) + this.WordToHex(c) + this.WordToHex(s) + this.WordToHex(l)).toLowerCase();
};
e.prototype.destroySelf = function() {
e._instance = null;
};
e._instance = null;
return e;
}();
a.default = n;
cc._RF.pop();
}, {} ],
Exchange: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "9e1617L8N1AUKe9HiSOgY7I", "Exchange");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./../../Modules/ModuleManager"), o = cc._decorator, i = o.ccclass, r = o.property, c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_input = null;
t.node_order = null;
t.lblOrder = null;
t.edit_dh = null;
t.lblRatio = null;
t._ratio = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
n.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
}, this);
this.node_order.active = !1;
this.node_input.active = !1;
n.ui_manager.hideLoading();
this.getOrderInfo();
};
t.prototype.initData = function(e) {
this._ratio = e.goldMoney2Rmb;
this.lblRatio.string = "兑换比例" + e.goldMoney2Rmb + "金币 = 1礼券";
};
t.prototype.showExchange = function(e) {
if (e) {
this.node_order.active = !0;
this.node_input.active = !1;
for (var t = "", a = 0; a < e.length; a++) a > 1 ? t += "<br/>订单号" + (a + 1) + ":<b>" + e[a] + "<b/>" : e.length > 1 ? t += "订单号" + (a + 1) + ":<b>" + e[a] + "<b/>" : t += "<b>" + e[a] + "<b/>";
this.lblOrder.string = t;
} else {
this.node_order.active = !1;
this.node_input.active = !0;
}
};
t.prototype.getOrderInfo = function() {
var e = this;
n.ui_manager.showLoading() && n.ws_manager.sendMsg(n.protocol.ORDER_CHARGE_GOLDMONEY2RMB_QUERY, "", function(t, a) {
n.ui_manager.hideLoading();
0 === t ? e.showExchange(a) : -1 === t ? n.ui_manager.showTip("消息超时!") : n.ui_manager.showTip(a);
});
};
t.prototype.getExchange = function(e) {
var t = this;
if (n.ui_manager.showLoading()) {
var a = {
goldMoney: e
}, o = JSON.stringify(a);
n.ws_manager.sendMsg(n.protocol.ORDER_CHARGE_GOLDMONEY2RMB, o, function(e, a) {
n.ui_manager.hideLoading();
0 === e ? t.showExchange(a) : -1 === e ? n.ui_manager.showTip("消息超时!") : n.ui_manager.showTip(a);
});
}
};
t.prototype.edit_change = function(e, t) {
if (isNaN(Number(e))) if (e.length > 1) {
e = e.substring(0, e.length - 1);
t.string = e;
} else t.string = ""; else {
var a = Number(e);
t.string = a + "";
}
};
t.prototype.click_btn_exchange = function() {
n.mp_manager.playButton();
var e = this.edit_dh.string.trim();
if ("" !== e && null !== e) {
var t = Number(e);
if (isNaN(t)) {
this.edit_dh.string = "";
n.ui_manager.showTip("请输入有效的兑换金额");
} else if (Math.floor(t) === t) t % this._ratio == 0 ? this.getExchange(t) : n.ui_manager.showTip("请输入兑换比例的整数倍金币"); else {
this.edit_dh.string = "";
n.ui_manager.showTip("请输入整数的兑换金额");
}
} else n.ui_manager.showTip("兑换金额不为空");
};
__decorate([ r(cc.Node) ], t.prototype, "node_input", void 0);
__decorate([ r(cc.Node) ], t.prototype, "node_order", void 0);
__decorate([ r(cc.RichText) ], t.prototype, "lblOrder", void 0);
__decorate([ r(cc.EditBox) ], t.prototype, "edit_dh", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblRatio", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
GMManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "41db4+tdAtIK5q4TJjeppQl", "GMManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = function() {
function e() {
this.zjhGameData = null;
this.nnGameData = null;
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.destroySelf = function() {
this.zjhGameData = null;
};
e._instance = null;
return e;
}();
a.default = n;
cc._RF.pop();
}, {} ],
Game_ActionFP: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "77c9cmH9+NIRbM2u/USEufQ", "Game_ActionFP");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.cardNode = null;
t.cardImg = null;
t._cb = null;
t._data = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.initData = function(e, t, a, n) {
e > -1 && t && (this.cardImg.spriteFrame = t);
a && (this._cb = a);
null === n && void 0 === n || (this._data = n);
};
t.prototype.fpActionEnd = function() {
this._cb && (null !== this._data || void 0 !== this._data ? this._cb(this._data) : this._cb());
};
__decorate([ i(cc.Node) ], t.prototype, "cardNode", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "cardImg", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Game_Card: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "2cd39F44dVKG4GjpLKmoh4F", "Game_Card");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.card_img = null;
t.backNode = null;
t._cardId = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.initData = function(e, t, a) {
this._cardId = e;
this.card_img.spriteFrame = t;
this._cardId > 1 ? this.backNode.active = !a : this.backNode.active = !1;
};
__decorate([ i(cc.Sprite) ], t.prototype, "card_img", void 0);
__decorate([ i(cc.Node) ], t.prototype, "backNode", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = r;
cc._RF.pop();
}, {} ],
Game_DealScript: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "a2cbb1x4oZKRbR9C0OGtBk2", "Game_DealScript");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.card_sf = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.createNode = function(e) {
var t = new cc.Node("card_back");
t.addComponent(cc.Sprite).spriteFrame = this.card_sf;
t.parent = this.node;
t.setPosition(e);
t.scale = 0;
return t;
};
t.prototype.showDeal = function(e, t, a, n, o) {
void 0 === a && (a = 1);
void 0 === n && (n = .4);
void 0 === o && (o = 0);
a = e.length * a - 1;
var i = 0;
this.schedule(function() {
var a = i % e.length;
if (t) {
t(a);
}
i++;
}, n, a, o);
};
t.prototype.showDealFP = function(e, t, a, n, o, i, c) {
var s = this;
void 0 === o && (o = 1);
void 0 === i && (i = .2);
void 0 === c && (c = 0);
if (null !== t && void 0 !== t) {
var l = t.length;
o = t.length * o - 1;
var _ = 0;
this.schedule(function() {
r.mp_manager && r.mp_manager.playFaPai();
var i = s.createNode(e), c = _ % t.length;
if (t[c]) {
var d = cc.callFunc(function(e, t) {
if (a) {
var r = Math.floor(t.count / l);
a(t.index, r);
}
t.count === o && n && n();
i.destroy();
}, s, {
index: c,
count: _
});
i.opacity = 100;
var u = cc.spawn(cc.scaleTo(.5, .8, .8), cc.rotateBy(.5, 540), cc.moveTo(.5, t[c]), cc.fadeIn(.5)), h = cc.sequence(u, d);
i.runAction(h);
_++;
}
}, i, o, c);
}
};
t.prototype.showDealDiscard = function(e, t, a) {
void 0 === a && (a = cc.v2(0, 0));
r.mp_manager.playFaPai();
var n = this.createNode(e);
n.scale = .8;
var o = cc.callFunc(function() {
t && t();
n.destroy();
}, this), i = cc.spawn(cc.scaleTo(.5, 0), cc.rotateBy(.5, 540), cc.moveTo(.5, a)), c = cc.sequence(i, o);
n.runAction(c);
};
__decorate([ i(cc.SpriteFrame) ], t.prototype, "card_sf", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Game_GoldBase: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "6eb00OSWddAr7JPueGKfWjq", "Game_GoldBase");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./../../Modules/ModuleManager"), o = cc._decorator, i = o.ccclass, r = o.property, c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.enemyPrefab = null;
t.goldImgList = [];
t._enemyPool = new cc.NodePool("Game_Gold");
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.removeAllEnemyNode = function(e, t, a, n, o) {
void 0 === a && (a = !0);
void 0 === n && (n = null);
void 0 === o && (o = !1);
for (;e.childrenCount > 0; ) {
var i = e.getChildByName("Game_Gold");
a ? this._enemyPool.put(i) : i.parent = n;
if (e.childrenCount <= 0) {
t && t();
o && e.destroy();
}
}
};
t.prototype.createAcNode = function(e, t, a, n) {
var o = new cc.Node("AcNode");
o.setPosition(e);
o.width = a.x;
o.height = a.y;
o.parent = t;
n && n(o);
};
t.prototype.createEnemyNode = function(e, t, a) {
var n = null;
(n = this._enemyPool.size() > 0 ? this._enemyPool.get() : cc.instantiate(this.enemyPrefab)).getComponent("Game_Gold").initData(this.goldImgList[e], t);
a && a(n);
};
t.prototype.createChip = function(e, t) {
this.createEnemyNode(e, t, function(e) {
var a = Math.floor(100 * Math.random() + 100) % 2, n = Math.floor(Math.random() * (t.width - e.width) * .5);
0 === a && (n = 0 - n);
var o = Math.floor(Math.random() * (t.height - e.height) * .5);
0 === (a = Math.floor(100 * Math.random() + 100) % 2) && (o = 0 - o);
e.setPosition(cc.p(n, o));
});
};
t.prototype.createMoreGold = function(e, t) {
for (var a = 0; a < e.length; a++) for (var n = e[a], o = this.goldImgList.length - 1 - a, i = 0; i < n; i++) this.createChip(o, t);
};
t.prototype.deleteSpilth = function(e, t) {
void 0 === t && (t = 150);
if (e.childrenCount > t) for (var a = 0, n = e.childrenCount - t; e.childrenCount > 0; ) {
var o = e.getChildByName("Game_Gold");
this._enemyPool.put(o);
if (++a >= n) break;
}
};
t.prototype.playGoldMoveToPool = function(e, t, a, o, i, r) {
var c = this;
this.deleteSpilth(i);
this.createAcNode(e, o, a, function(e) {
n.mp_manager.playCoinMove();
for (var a = 0; a < t.length; a++) for (var o = t[a], s = c.goldImgList.length - 1 - a, l = 0; l < o; l++) c.createChip(s, e);
e.scale = .1;
var _ = c.getWorldPos(i.parent, i.getPosition()), d = cc.moveTo(.6, _).easing(cc.easeExponentialOut()), u = cc.spawn(cc.scaleTo(.1, 1), d), h = cc.callFunc(function() {
c.removeAllEnemyNode(e, r, !1, i, !1);
}, c), p = cc.sequence(u, h);
e.runAction(p);
});
};
t.prototype.getWorldPos = function(e, t) {
var a = e.convertToWorldSpaceAR(t);
a.x = a.x - this.node.width / 2;
a.y = a.y - this.node.height / 2;
return a;
};
t.prototype.playAllGoldMoveToPlayer = function(e, t, a, o) {
var i = this;
if (e) {
n.mp_manager.playZJH("coins");
var r = cc.instantiate(a), c = this.getWorldPos(a.parent, a.getPosition());
r.setPosition(c);
r.parent = o;
var s = cc.callFunc(function() {
i.removeAllEnemyNode(r, null, !0, null, !0);
}, this), l = cc.moveTo(.6, t).easing(cc.easeExponentialIn()), _ = cc.spawn(cc.scaleTo(.6, .5), l), d = cc.sequence(_, s);
r.runAction(d);
this.removeAllEnemyNode(a);
} else this.removeAllEnemyNode(a);
};
t.prototype.playGoldPosToPos = function(e, t, a, n, o, i) {
var r = this;
this.createAcNode(e, o, n, function(e) {
for (var n = 0; n < a.length; n++) for (var o = a[n], c = r.goldImgList.length - 1 - n, s = 0; s < o; s++) r.createChip(c, e);
var l = cc.callFunc(function() {
r.removeAllEnemyNode(e, i, !0);
}, r), _ = cc.moveTo(.6, t), d = cc.spawn(cc.scaleTo(.6, .5), _), u = cc.sequence(d, l);
e.runAction(u);
});
};
t.prototype.playGoldMoveToPlayer = function(e, t, a, n, o, i) {
var r = this;
void 0 === o && (o = !1);
void 0 === i && (i = cc.v2(60, 60));
if (o) for (var c = t.children, s = cc.callFunc(function() {
r.playFlyAllGoldAction(e, t, a, n);
}, this), l = 0; l < c.length; l++) {
var _ = c[l], d = null;
l !== c.length - 1 ? (Math.abs(_.x) > i.x || Math.abs(_.y) > i.y) && (d = cc.moveTo(.5, cc.p(Math.random() * i.x, Math.random() * i.y))) : d = cc.sequence(cc.moveTo(.5, cc.p(Math.random() * i.x, Math.random() * i.y)), s);
d && _.runAction(d);
} else this.playFlyAllGoldAction(e, t, a, n);
};
t.prototype.playFlyAllGoldAction = function(e, t, a, n) {
var o = this, i = t.childrenCount, r = Math.round(i / 10);
r < 1 && (r = 1);
for (var c = !0, s = t.children, l = cc.callFunc(function(e) {
o._enemyPool.put(e);
if (c) {
a && a();
c = !1;
cc.log("开始回调" + c);
}
if (t.childrenCount <= 0) {
n && n();
cc.log("结束回调");
}
}, this), _ = 0; _ < s.length; _++) {
var d = s[_], u = cc.moveTo(.12 * (_ / r + 1), e), h = cc.sequence(u, l);
d.runAction(h);
}
};
__decorate([ r({
type: cc.Prefab,
tooltip: "对象预设"
}) ], t.prototype, "enemyPrefab", void 0);
__decorate([ r({
type: [ cc.SpriteFrame ],
tooltip: "对象图片列表"
}) ], t.prototype, "goldImgList", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Game_Gold: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "b05f9aXsmdFmrT4SrGrAk6i", "Game_Gold");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = (n.property, function(e) {
function t() {
return null !== e && e.apply(this, arguments) || this;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.unuse = function() {
this.node.stopAllActions();
this.node.getComponent(cc.Sprite).spriteFrame = null;
this.node.x = 0;
this.node.y = 0;
this.node.rotation = 0;
};
t.prototype.initData = function(e, t) {
this.node.getComponent(cc.Sprite).spriteFrame = e;
this.node.parent = t;
};
return t = __decorate([ o ], t);
}(cc.Component));
a.default = i;
cc._RF.pop();
}, {} ],
Game_TimeDown: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "7d80dWxyUpKMo/bq6c1BAqU", "Game_TimeDown");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./../../Modules/ModuleManager"), o = cc._decorator, i = o.ccclass, r = o.property, c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.img_td = null;
t._timeCount = 0;
t._curTime = 0;
t._isPlayEfc = !1;
t._cb = null;
t._playTime = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.initData = function(e, t, a, n, o) {
this._timeCount = t;
this._curTime = e;
this._isPlayEfc = a;
this.node.parent = n;
this.img_td.fillRange = 1;
this._cb = o;
};
t.prototype.initDataWithAnim = function(e, t) {
this.node.parent = t;
this.node.getComponent(cc.Animation).play("game_djsAction", e);
};
t.prototype.update = function(e) {
if (this._curTime <= this._timeCount) {
this._curTime += e;
var t = this._curTime / this._timeCount;
t = t < 0 ? 0 : t > 1 ? 1 : t;
this.img_td.fillRange = 1 - t;
this.img_td.node.color = t < .33 ? new cc.Color(31, 255, 0) : t > .33 && t < .66 ? new cc.Color(50, 160, 255) : new cc.Color(255, 43, 43);
if (this._isPlayEfc && t >= .5) {
this._playTime -= e;
if (this._playTime <= 0) {
this._playTime = .8;
n.mp_manager.playTime();
}
}
} else {
this.img_td.fillRange = 0;
if (this._cb) {
this._cb();
this._cb = null;
}
}
};
__decorate([ r(cc.Sprite) ], t.prototype, "img_td", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblGold = null;
t.lblStarNo = null;
t.headImg = null;
t.setting_prefab = null;
t.service_prefab = null;
t.recharge_prefab = null;
t.exchange_prefab = null;
t._setting = null;
t._service = null;
t._recharge = null;
t._exchange = null;
t.needWait = !1;
return t;
}
__extends(t, e);
t.prototype.start = function() {
if (r.ud_manager && r.ud_manager.mineData && 0 !== r.ud_manager.mineData.tableId && r.ui_manager.showLoading("正在重新进入未完成的游戏")) {
var e = {
tableId: r.ud_manager.mineData.tableId,
type: 0
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ZJH_JION_TABLEID, t, function(e, t) {
if (0 === e) switch (t.gameType) {
case 1:
r.gm_manager.nnGameData = t;
cc.director.loadScene("NNScene");
break;

case 2:
r.gm_manager.zjhGameData = t;
cc.director.loadScene("ZJHScene");
} else -1 === e ? r.ui_manager.showTip("获取桌子信息超时!") : r.ui_manager.showTip(t);
});
}
};
t.prototype.update = function(e) {
if (r.ud_manager && r.ud_manager.mineData) {
this.lblName.string = r.ud_manager.mineData.nick;
this.lblGold.string = r.utils.getShowNumberString(r.ud_manager.mineData.roomCard);
this.lblStarNo.string = "  (ID:" + r.ud_manager.mineData.starNO + ")";
this.headImg.spriteFrame = r.img_manager.getHeadById(Number(r.ud_manager.mineData.headImg));
}
};
t.prototype.click_btn_game = function(e, t) {
if (!this.needWait) {
r.mp_manager.playButton();
if (r.ui_manager.showLoading("正在获取房间列表,请稍后")) {
this.needWait = !0;
var a = {
gameType: "0" === t ? 1 : 2
}, n = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.ZJH_GET_ROOM_LIST, n, function(e, a) {
if (0 === e) {
var n = a.items;
"0" === t ? cc.director.loadScene("NNRoomScene", function() {
r.ui_manager.getCanvasNode().getComponent("NNRoomCanvas").init(n);
}) : cc.director.loadScene("ZJHRoomScene", function() {
r.ui_manager.getCanvasNode().getComponent("ZJH_RoomCanvas").init(n);
});
} else -1 === e ? r.ui_manager.showTip("获取房间列表失败,请重试!") : r.ui_manager.showTip(a);
});
}
}
};
t.prototype.click_btn_setting = function() {
r.mp_manager.playButton();
if (r.ui_manager.isShowPopup && r.ui_manager.showLoading() && (!this._setting || !this._setting.isValid)) {
r.ui_manager.isShowPopup = !1;
this._setting = cc.instantiate(this.setting_prefab);
this._setting.parent = this.node;
r.ui_manager.hideLoading();
}
};
t.prototype.click_btn_recharge = function() {
var e = this;
r.mp_manager.playButton();
r.ui_manager.showLoading() && r.ws_manager.sendMsg(r.protocol.ORDER_GET_EXCHANAGE_PERCENT, "", function(t, a) {
if (0 === t) {
if (!e._recharge || !e._recharge.isValid) {
r.ui_manager.isShowPopup = !1;
e._recharge = cc.instantiate(e.recharge_prefab);
e._recharge.parent = e.node;
e._recharge.getComponent("Recharge").initData(a);
r.ui_manager.hideLoading();
}
} else r.ui_manager.hideLoading();
});
};
t.prototype.click_btn_exchange = function() {
var e = this;
r.mp_manager.playButton();
r.ui_manager.showLoading() && r.ws_manager.sendMsg(r.protocol.ORDER_GET_EXCHANAGE_PERCENT, "", function(t, a) {
if (0 === t) {
if (!e._exchange || !e._exchange.isValid) {
r.ui_manager.isShowPopup = !1;
e._exchange = cc.instantiate(e.exchange_prefab);
e._exchange.parent = e.node;
e._exchange.getComponent("Exchange").initData(a);
r.ui_manager.hideLoading();
}
} else r.ui_manager.hideLoading();
});
};
t.prototype.click_btn_service = function() {
var e = this;
r.mp_manager.playButton();
r.ui_manager.showLoading() && r.ws_manager.sendMsg(r.protocol.ACCOUNT_CUSTOMER_SERVICE, "", function(t, a) {
r.ui_manager.hideLoading();
if (0 === t && r.ui_manager.isShowPopup && (!e._service || !e._service.isValid)) {
r.ui_manager.isShowPopup = !1;
e._service = cc.instantiate(e.service_prefab);
e._service.getComponent("Service").initData(a);
e._service.parent = e.node;
}
});
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblGold", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblStarNo", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "setting_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "service_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "recharge_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "exchange_prefab", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
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
var n = function() {
function e() {
this.headList = [];
this.pokerList = [];
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.initIMG = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
for (e = 0; e < 5; e++) this.pokerList.push(new Array(13));
return [ 4, this.initSystemHead() ];

case 1:
t.sent();
return [ 4, this.initPoker() ];

case 2:
t.sent();
return [ 2 ];
}
});
});
};
e.prototype.initSystemHead = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Atlas/head", cc.SpriteAtlas, function(n, o) {
if (n) a(n.message); else {
o.getSpriteFrames().forEach(function(t) {
var a = parseInt(t.name) - 1;
e.headList[a] = t;
}, e);
t();
}
});
});
};
e.prototype.initPoker = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Atlas/poker", cc.SpriteAtlas, function(n, o) {
if (n) a(n.message); else {
o.getSpriteFrames().forEach(function(t) {
var a = parseInt(t.name);
a < 2 ? e.pokerList[0][a] = t : a >= 2 && a < 15 ? e.pokerList[1][a - 2] = t : a >= 15 && a < 28 ? e.pokerList[2][a - 15] = t : a >= 28 && a < 41 ? e.pokerList[3][a - 28] = t : a >= 41 && a < 54 ? e.pokerList[4][a - 41] = t : cc.error("poker index error");
}, e);
t();
}
});
});
};
e.prototype.getHeadById = function(e) {
return this.headList.length > e ? this.headList[e] : null;
};
e.prototype.getCardSpriteFrameById = function(e) {
return e < 2 ? this.pokerList[0][e] : e >= 2 && e < 15 ? this.pokerList[1][e - 2] : e >= 15 && e < 28 ? this.pokerList[2][e - 15] : e >= 28 && e < 41 ? this.pokerList[3][e - 28] : e >= 41 && e < 54 ? this.pokerList[4][e - 41] : null;
};
e.prototype.destroySelf = function() {
for (;this.headList.length > 0; ) this.release(this.headList.pop());
for (;this.pokerList.length > 0; ) for (var t = this.pokerList.pop(); t.length > 0; ) this.release(t.pop());
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
}, {} ],
LoadCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "18b3daTnbtCWqqYj6Y5VaOE", "LoadCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
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
t.prototype.onLoad = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
window.dd = r;
r.init();
t.label = 1;

case 1:
t.trys.push([ 1, 5, , 6 ]);
return [ 4, r.ui_manager.initUI() ];

case 2:
t.sent();
r.ui_manager.showLoading("正在加载,请稍后");
return [ 4, r.mp_manager.initMP() ];

case 3:
t.sent();
return [ 4, r.img_manager.initIMG() ];

case 4:
t.sent();
cc.sys.isNative && cc.sys.isMobile ? this.checkResVersion() : this.jumpScene();
return [ 3, 6 ];

case 5:
e = t.sent();
r.ui_manager.showAlert("资源初始化异常，请确认您的网络是否通畅，重启游戏！", "错误提示", this.exit);
return [ 3, 6 ];

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
} else r.ui_manager.showAlert("获取本地资源配置失败，请卸载重装", "错误提示", this.exit);
};
t.prototype.checkCb = function(e) {
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
cc.log("没有发现本地的资源配置文件，热更新失败！");
r.ui_manager.showAlert("没有发现本地的资源配置文件，请卸载重装", "错误提示", this.exit);
cc.eventManager.removeListener(this._checkListener);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
cc.log("下载服务端资源配置文件失败，热更新失败！");
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
r.ui_manager.setLoading("发现新版本资源，开始准备更新！");
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
var n = .5 + .5 * e.getPercentByFile();
cc.log("正在更新，下载进度：(" + (100 * n).toFixed(2) + "%)");
r.ui_manager.setLoading("正在更新，下载进度：(" + (100 * n).toFixed(2) + "%)");
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
r.ui_manager.showAlert("更新资源失败，请确认您的网络通畅后，重启游戏！", "错误提示", this.exit);
}
if (t) {
cc.eventManager.removeListener(this._updateListener);
var o = jsb.fileUtils.getSearchPaths(), i = this._am.getLocalManifest().getSearchPaths();
Array.prototype.unshift(o, i);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(o));
jsb.fileUtils.setSearchPaths(o);
setTimeout(function() {
r.destroy();
cc.sys.garbageCollect();
cc.game.restart();
}, 1e3);
}
};
t.prototype.jumpScene = function() {
setTimeout(function() {
cc.director.loadScene("LoginScene");
}, 1e3);
};
t.prototype.onDestroy = function() {
this._am && this._am.release();
};
__decorate([ i({
url: cc.RawAsset
}) ], t.prototype, "manifestUrl", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = function(e) {
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
return t = __decorate([ o ], t);
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_login = null;
t.node_reg = null;
t.edit_phone = null;
t.edit_verfi = null;
t.btn_login = null;
t.btn_verfi = null;
t.lbl_verfi = null;
t.edit_reg_phone = null;
t.edit_reg_pwd = null;
t.edit_reg_pwd2 = null;
t._isDownTime = !1;
t._downTime = 0;
t._cd = 1;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
return r.ui_manager.showLoading("正在连接服务器，请稍后") ? [ 4, this.connectWS() ] : [ 3, 2 ];

case 1:
e = t.sent();
t.label = 2;

case 2:
this.showLogin(0);
return [ 2 ];
}
});
});
};
t.prototype.showLogin = function(e) {
this.node_login.active = 0 === e;
this.node_reg.active = 1 === e;
if (0 === e) {
cc.sys.localStorage.getItem("phone") && (this.edit_phone.string = cc.sys.localStorage.getItem("phone"));
cc.sys.localStorage.getItem("password") && (this.edit_verfi.string = cc.sys.localStorage.getItem("password"));
} else {
this.edit_reg_phone.string = "";
this.edit_reg_pwd.string = "";
this.edit_reg_pwd2.string = "";
}
};
t.prototype.connectWS = function() {
return __awaiter(this, void 0, void 0, function() {
var e, t, a = this;
return __generator(this, function(n) {
switch (n.label) {
case 0:
n.trys.push([ 0, 2, , 3 ]);
return [ 4, r.ws_manager.connect(r.config.wsUrl) ];

case 1:
n.sent();
r.ui_manager.hideLoading();
return [ 2, !0 ];

case 2:
e = n.sent();
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
t.prototype.sendVaildCode = function(e) {
this.btn_verfi.interactable = !1;
this._isDownTime = !0;
this._downTime = 60;
this._cd = 1;
this.lbl_verfi.string = this._downTime + "s";
if (r.ui_manager.showLoading()) {
var t = {
phone: e
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_GET_SMS_CODE, a, function(e, t) {
0 === e ? cc.log(t) : -1 === e || r.ui_manager.showTip(t);
});
r.ui_manager.hideLoading();
}
};
t.prototype.sendLogin = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var n = {
phone: e,
code: t
}, o = JSON.stringify(n);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_LOGIN_PHONE, o, function(n, o) {
r.ui_manager.hideLoading();
if (0 === n) {
cc.sys.localStorage.setItem("phone", e);
cc.sys.localStorage.setItem("password", t);
r.ud_manager.mineData = o;
r.ws_manager.setLoginState(!0);
a.turnToHome();
} else r.ui_manager.showTip(o);
});
}
};
t.prototype.sendRegister = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var n = {
phone: e,
code: t
}, o = JSON.stringify(n);
r.ws_manager.sendMsg(r.protocol.ACCOUNT_REGISTER, o, function(n, o) {
r.ui_manager.hideLoading();
if (0 === n) {
cc.sys.localStorage.setItem("phone", e);
cc.sys.localStorage.setItem("password", t);
r.ud_manager.mineData = o;
r.ws_manager.setLoginState(!0);
a.turnToHome();
} else r.ui_manager.showTip(o);
});
}
};
t.prototype.checkMobile = function(e) {
if (!/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(e)) {
r.ui_manager.showTip("*请输入有效的手机号");
return !1;
}
return !0;
};
t.prototype.click_btn_login = function() {
if (this.btn_login.interactable) {
r.mp_manager.playButton();
var e = this.edit_phone.string.trim(), t = this.edit_verfi.string.trim();
"" !== e && 0 !== e.length ? "" !== t && 6 === t.length ? this.sendLogin(e, t) : r.ui_manager.showTip("*请输入6位密码") : r.ui_manager.showTip("*请输入有效的手机号");
}
};
t.prototype.turnToHome = function() {
r.ui_manager.showLoading() && cc.director.loadScene("HomeScene");
};
t.prototype.update = function(e) {
if (this._isDownTime) {
this._cd -= e;
if (this._cd <= 0) {
this._cd = 1;
this._downTime--;
this.lbl_verfi.string = this._downTime + "s";
if (this._downTime < 0) {
this.btn_verfi.interactable = !0;
this.lbl_verfi.string = "获取验证码";
}
}
} else {
this.btn_verfi.interactable = !0;
this.lbl_verfi.string = "获取验证码";
}
};
t.prototype.click_btn_verfi = function() {
r.mp_manager.playButton();
if (this.btn_verfi.interactable) {
var e = this.edit_phone.string.trim();
"" !== e && 0 !== e.length ? this.checkMobile(e) && this.sendVaildCode(e) : r.ui_manager.showTip("*请输入有效的手机号");
}
};
t.prototype.click_btn_return = function() {
r.mp_manager.playButton();
this.showLogin(0);
};
t.prototype.click_btn_turnToReg = function() {
r.mp_manager.playButton();
this.showLogin(1);
};
t.prototype.click_btn_reg = function() {
var e = this.edit_reg_phone.string.trim();
if ("" !== e && 0 !== e.length) {
var t = this.edit_reg_pwd.string.trim();
"" !== t && 6 === t.length ? this.edit_reg_pwd2.string.trim() === t ? this.checkMobile(e) && this.sendRegister(e, t) : r.ui_manager.showTip("*两次密码输入不一致") : r.ui_manager.showTip("*请输入6位密码");
} else r.ui_manager.showTip("*请输入有效的手机号");
};
__decorate([ i(cc.Node) ], t.prototype, "node_login", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_reg", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_phone", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_verfi", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_login", void 0);
__decorate([ i(cc.Button) ], t.prototype, "btn_verfi", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_verfi", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_reg_phone", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_reg_pwd", void 0);
__decorate([ i(cc.EditBox) ], t.prototype, "edit_reg_pwd2", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
MPManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "d306bA81eVCnofPbuB+rhFQ", "MPManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = function() {
function e() {
this.audioSetting = null;
this.backgroundID = null;
this.effectID = null;
}
e.getInstance = function() {
null === e._instance && (e._instance = new e());
return e._instance;
};
e.prototype.initMP = function() {
this.initSetting();
this.playBackGround();
};
e.prototype.loadFile = function(e) {
return new Promise(function(t, a) {
cc.loader.loadRes(e, function(e, n) {
if (e) {
cc.error(e.message || e);
a(e.message || e);
}
t(n);
});
});
};
e.prototype.initSetting = function() {
var e = cc.sys.localStorage, t = e.getItem("audioSetting");
if (t) this.audioSetting = JSON.parse(t); else {
this.audioSetting = {
isMusic: !0,
isEffect: !0
};
e.setItem("audioSetting", JSON.stringify(this.audioSetting));
}
};
e.prototype.saveMPSetting = function() {
cc.sys.localStorage.setItem("audioSetting", JSON.stringify(this.audioSetting));
};
e.prototype.playBackGround = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
return null === this.backgroundID && this.audioSetting.isMusic ? [ 4, this.loadFile("Audio/music") ] : [ 2 ];

case 1:
e = t.sent();
this.backgroundID = cc.audioEngine.play(e, !0, 1);
return [ 2 ];
}
});
});
};
e.prototype.stopBackGround = function() {
if (null !== this.backgroundID) {
cc.audioEngine.stop(this.backgroundID);
this.backgroundID = null;
}
};
e.prototype.stopEffect = function() {
if (this.effectID) {
cc.audioEngine.stop(this.effectID);
this.effectID = null;
}
};
e.prototype.finish = function(e) {
var t = this;
cc.audioEngine.setFinishCallback(this.effectID, function() {
t.effectID = null;
e && e();
});
};
e.prototype.playButton = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/click") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playFaPai = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/fapai") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playCoinMove = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/coinmove") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playWin = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/win") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playLose = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/lose") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playStart = function(e) {
return __awaiter(this, void 0, void 0, function() {
var t;
return __generator(this, function(a) {
switch (a.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/start") ];

case 1:
t = a.sent();
this.effectID = cc.audioEngine.play(t, !1, 1);
this.finish(e);
a.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playTime = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
switch (t.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/time") ];

case 1:
e = t.sent();
this.effectID = cc.audioEngine.play(e, !1, 1);
this.finish();
t.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playZJH = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a;
return __generator(this, function(n) {
switch (n.label) {
case 0:
return this.audioSetting.isEffect ? [ 4, this.loadFile("Audio/zjh/" + e) ] : [ 3, 2 ];

case 1:
a = n.sent();
this.effectID = cc.audioEngine.play(a, !1, 1);
this.finish(t);
n.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.playNN = function(e, t) {
return __awaiter(this, void 0, void 0, function() {
var a;
return __generator(this, function(n) {
switch (n.label) {
case 0:
if (!this.audioSetting.isEffect) return [ 3, 2 ];
this.stopEffect();
return [ 4, this.loadFile("Audio/nn/" + e) ];

case 1:
a = n.sent();
this.effectID = cc.audioEngine.play(a, !1, 1);
this.finish(t);
n.label = 2;

case 2:
return [ 2 ];
}
});
});
};
e.prototype.destroySelf = function() {
cc.audioEngine.uncacheAll();
this.effectID = null;
this.backgroundID = null;
this.audioSetting = null;
};
e._instance = null;
return e;
}();
a.default = n;
cc._RF.pop();
}, {} ],
ModuleManager: [ function(e, t, a) {
"use strict";
function n() {
a.img_manager.destroySelf();
a.ud_manager.destroySelf();
a.ws_manager.destroySelf();
a.ui_manager.destroySelf();
a.ud_manager.destroySelf();
a.gm_manager.destroySelf();
a.mp_manager.destroySelf();
a.card_manager.destroySelf();
a.img_manager = null;
a.ud_manager = null;
a.ws_manager = null;
a.ui_manager = null;
a.ud_manager = null;
a.gm_manager = null;
a.mp_manager = null;
a.card_manager = null;
cc.systemEvent.off("cb_diconnect", a.cb_diconnect);
}
cc._RF.push(t, "e8c4eYc5vVLk5+ugMygqMs/", "ModuleManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o = e("./Utils"), i = e("./Config"), r = e("./WSManager"), c = e("./IMGManager"), s = e("./UDManager"), l = e("./GMManager"), _ = e("./UIManager"), d = e("./ENCManager"), u = e("./MPManager"), h = e("./CardManager"), p = e("./Protocol");
a.utils = o;
a.config = i;
a.protocol = p.Protocol;
a.ws_manager = null;
a.img_manager = null;
a.ud_manager = null;
a.gm_manager = null;
a.ui_manager = null;
a.enc_manager = null;
a.mp_manager = null;
a.card_manager = null;
a.cb_diconnect = function(e) {
var t = {
lbl_name: "确定",
callback: function() {
n();
cc.sys.garbageCollect();
cc.game.restart();
}
};
a.ui_manager.showAlert("连接断开，请确认您的网络后点击确定按钮重新连接！", "错误提示", t);
};
a.init = function() {
a.ws_manager = r.default.getInstance();
a.img_manager = c.default.getInstance();
a.ud_manager = s.default.getInstance();
a.ui_manager = _.default.getInstance();
a.enc_manager = d.default.getInstance();
a.gm_manager = l.default.getInstance();
a.mp_manager = u.default.getInstance();
a.card_manager = h.default.getInstance();
cc.systemEvent.on("cb_diconnect", a.cb_diconnect);
};
a.destroy = n;
cc._RF.pop();
}, {
"./CardManager": "CardManager",
"./Config": "Config",
"./ENCManager": "ENCManager",
"./GMManager": "GMManager",
"./IMGManager": "IMGManager",
"./MPManager": "MPManager",
"./Protocol": "Protocol",
"./UDManager": "UDManager",
"./UIManager": "UIManager",
"./Utils": "Utils",
"./WSManager": "WSManager"
} ],
NNBattleCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "21f98YqeH9HB7OCK3Uyy17K", "NNBattleCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_tableId = null;
t.lbl_mid = null;
t.player_up = null;
t.player_down = null;
t.result = null;
t.winNode = null;
t.loseNode = null;
t.fpNode = null;
t.fpPrefab = null;
t.niuSFs = [];
t.isRunAction = !1;
t.isKick = !1;
t.diffTime = 0;
t.needWait = !1;
t.gamePush = function(e) {
r.gm_manager.nnGameData = e.detail;
t.changeDiffTime();
1 === r.gm_manager.nnGameData.gameState && r.mp_manager.playNN("go");
2 === r.gm_manager.nnGameData.gameState && r.mp_manager.playNN("ding");
3 === r.gm_manager.nnGameData.gameState && r.mp_manager.playNN("startBet");
if (4 === r.gm_manager.nnGameData.gameState) {
t.isRunAction = !0;
r.gm_manager.nnGameData.bankerId === r.ud_manager.mineData.accountId ? t.fp(t.player_up, t.player_down) : t.fp(t.player_down, t.player_up);
}
};
t.seatPush = function(e) {
if (t.isRunAction) var a = e.detail, n = setInterval(function() {
if (!t.isRunAction) {
clearInterval(n);
r.gm_manager.nnGameData = a;
t.updateUp(!0);
}
}, 100); else {
r.gm_manager.nnGameData = e.detail;
t.updateUp(!0);
}
};
t.betPush = function(e) {
var a = e.detail;
r.gm_manager.nnGameData = a.tableVo;
t.changeDiffTime();
r.mp_manager.playCoinMove();
};
t.kickPush = function(e) {
r.ud_manager.mineData.tableId = 0;
if (1 === e.detail) {
cc.log("钱不够了!");
t.isKick = !0;
} else t.getRoomInfo();
};
t.callBanker = function(e) {
r.gm_manager.nnGameData = e.detail;
t.changeDiffTime();
};
t.walletPush = function(e) {
var t = e.detail, a = r.gm_manager.nnGameData;
if (a) for (var n = 0; n < a.seats.length; n++) if (r.ud_manager.mineData.accountId === a.seats[n].accountId) {
r.gm_manager.nnGameData.seats[n].money = t.roomCard;
break;
}
};
t.readyPush = function(e) {
if (t.isRunAction) var a = e.detail, n = setInterval(function() {
if (!t.isRunAction) {
clearInterval(n);
r.gm_manager.nnGameData = a;
t.changeDiffTime();
r.mp_manager.playNN("ding");
}
}, 100); else {
r.gm_manager.nnGameData = e.detail;
t.changeDiffTime();
r.mp_manager.playNN("ding");
}
};
return t;
}
__extends(t, e);
t.prototype.updateUp = function(e) {
void 0 === e && (e = !1);
if ("0" !== r.gm_manager.nnGameData.seats[0].accountId && "0" !== r.gm_manager.nnGameData.seats[1].accountId) {
var t = this.getSeatData(!1);
this.player_up.active && !e || this.changePlayerInfo(t, this.player_up);
this.updatePlayer(t, this.player_up);
this.player_up.active = !0;
} else this.player_up.active = !1;
};
t.prototype.updateMid = function() {
r.gm_manager.nnGameData.totalBetMoney > 0 && r.gm_manager.nnGameData.gameState > 1 ? this.lbl_mid.string = "已下注: " + r.gm_manager.nnGameData.totalBetMoney : this.lbl_mid.string = "";
};
t.prototype.updateDown = function() {
var e = this.getSeatData(!0);
this.updatePlayer(e, this.player_down);
};
t.prototype.changePlayerInfo = function(e, t) {
var a = t.getChildByName("player_board");
a.getChildByName("name").getComponent(cc.Label).string = e.nick;
cc.find("layout/money", a).getComponent(cc.Label).string = r.utils.getShowNumberString(e.money);
a.getChildByName("head").getComponent(cc.Sprite).spriteFrame = r.img_manager.getHeadById(Number(e.headImg));
};
t.prototype.updatePlayer = function(e, t) {
var a = t.getChildByName("player_board");
r.gm_manager.nnGameData.bankerId === e.accountId && r.gm_manager.nnGameData.gameState > 2 ? a.getChildByName("zhuang").active = !0 : a.getChildByName("zhuang").active = !1;
var n = cc.find("player_board/time", t), o = t.getChildByName("niu"), i = t.getChildByName("lbl_info"), c = t.getChildByName("cardLayout"), s = t.getChildByName("btnLayout"), l = t.getChildByName("jzLayout"), _ = t.getChildByName("btn_ready");
switch (r.gm_manager.nnGameData.gameState) {
case 0:
if (this.isRunAction) return;
n.active = !1;
o.active = !1;
c.active = !1;
this.cleanCardLayout(c);
if (e.accountId === r.ud_manager.mineData.accountId) {
s.active = !1;
l.active = !1;
if (0 === e.btState) {
_.active = !0;
i.active = !1;
} else {
_.active = !1;
i.active = !0;
i.getComponent(cc.Label).string = "已准备";
}
} else {
i.active = !0;
0 === e.btState ? i.getComponent(cc.Label).string = "未准备" : i.getComponent(cc.Label).string = "已准备";
}
break;

case 1:
break;

case 2:
o.active = !1;
c.active = !1;
this.cleanCardLayout(c);
if (e.seatIndex === r.gm_manager.nnGameData.btIndex) {
n.active = !0;
n.getChildByName("lbl_time").getComponent(cc.Label).string = Math.floor(this.diffTime / 1e3).toString();
if (e.accountId === r.ud_manager.mineData.accountId) {
_.active = !1;
s.active = !1;
if (0 === e.btState) {
l.active = !0;
i.active = !1;
} else {
l.active = !1;
i.active = !0;
i.getComponent(cc.Label).string = 1 === e.btState ? "叫庄" : "不叫";
}
} else {
i.active = !0;
0 === e.btState ? i.getComponent(cc.Label).string = "叫庄思考中..." : i.getComponent(cc.Label).string = 1 === e.btState ? "叫庄" : "不叫";
}
} else {
n.active = !1;
0 === e.btState ? i.active = !1 : i.getComponent(cc.Label).string = 1 === e.btState ? "叫庄" : "不叫";
if (e.accountId === r.ud_manager.mineData.accountId) {
_.active = !1;
s.active = !1;
l.active = !1;
}
}
break;

case 3:
o.active = !1;
c.active = !1;
this.cleanCardLayout(c);
if (e.seatIndex === r.gm_manager.nnGameData.btIndex) {
n.active = !0;
n.getChildByName("lbl_time").getComponent(cc.Label).string = Math.floor(this.diffTime / 1e3).toString();
if (e.accountId === r.ud_manager.mineData.accountId) {
_.active = !1;
l.active = !1;
i.active = !1;
if (0 === e.btState) {
s.active = !0;
var d = r.gm_manager.nnGameData.seats[0].money < r.gm_manager.nnGameData.seats[1].money ? r.gm_manager.nnGameData.seats[0].money : r.gm_manager.nnGameData.seats[1].money;
s.getChildByName("btn1").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 1).toString();
s.getChildByName("btn2").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 2).toString();
s.getChildByName("btn3").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 3).toString();
s.getChildByName("btn4").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 4).toString();
s.getChildByName("btn5").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 5).toString();
s.getChildByName("btn6").getChildByName("money").getComponent(cc.Label).string = Math.floor(d / 36 * 6).toString();
} else s.active = !1;
} else if (0 === e.btState) {
i.active = !0;
i.getComponent(cc.Label).string = "押注思考中...";
} else i.active = !1;
} else {
n.active = !1;
i.active = !1;
if (e.accountId === r.ud_manager.mineData.accountId) {
_.active = !1;
s.active = !1;
l.active = !1;
}
}
break;

case 4:
c.active = !0;
n.active = !1;
i.active = !1;
if (e.accountId === r.ud_manager.mineData.accountId) {
_.active = !1;
s.active = !1;
l.active = !1;
}
}
};
t.prototype.cleanCardLayout = function(e) {
for (var t = 1; t < 6; t++) e.getChildByName("card" + t).removeAllChildren();
};
t.prototype.clickBack = function() {
var e = this;
if (!this.needWait && !this.isRunAction) {
r.mp_manager.playButton();
if (r.gm_manager.nnGameData.gameState > 0 && r.gm_manager.nnGameData.gameState < 4) r.ui_manager.showAlert("这把游戏还没结算不能逃跑哦!!!", "温馨提示"); else if (r.ui_manager.showLoading("正在加载,请稍后")) {
this.needWait = !0;
if (this.isKick) this.getRoomInfo(); else {
var t = {
tableId: r.gm_manager.nnGameData.tableId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_LEAVE, a, function(t, a) {
if (0 === t) ; else if (-1 === t) {
r.ui_manager.showTip("退出消息发送超时,请重试!");
e.needWait = !1;
} else {
r.ui_manager.showTip(a);
e.needWait = !1;
}
});
}
}
}
};
t.prototype.clickJZ = function(e, t) {
var a = this;
if (!this.needWait) {
r.mp_manager.playButton();
this.needWait = !0;
var n = this.player_down.getChildByName("jzLayout"), o = cc.find("player_board/time", this.player_down);
n.active = !1;
o.active = !1;
var i = Number(t), c = {
tableId: r.gm_manager.nnGameData.tableId,
bt: i
}, s = JSON.stringify(c);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_CALL_BANKER, s, function(e, t) {
a.needWait = !1;
if (0 === e) ; else if (-1 === e) {
r.ui_manager.showTip("叫庄消息发送超时,请重试!");
n.active = !0;
o.active = !0;
} else {
r.ui_manager.showTip(t);
n.active = !0;
o.active = !0;
}
});
}
};
t.prototype.clickReady = function() {
var e = this;
if (!this.needWait) {
r.mp_manager.playButton();
this.needWait = !0;
this.result.active = !1;
var t = this.player_down.getChildByName("btn_ready");
t.active = !1;
var a = {
tableId: r.gm_manager.nnGameData.tableId
}, n = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_NN_GAME_READY, n, function(a, n) {
e.needWait = !1;
if (0 === a) ; else if (-1 === a) {
r.ui_manager.showTip("准备消息发送超时,请重试!");
t.active = !0;
} else {
r.ui_manager.showTip(n);
t.active = !0;
}
});
}
};
t.prototype.clickBet = function(e, t) {
var a = this;
if (!this.needWait) {
r.mp_manager.playButton();
this.needWait = !0;
var n = this.player_down.getChildByName("btnLayout"), o = cc.find("player_board/time", this.player_down);
n.active = !1;
o.active = !1;
var i = Number(t), c = r.gm_manager.nnGameData.seats[0].accountId === r.ud_manager.mineData.accountId ? r.gm_manager.nnGameData.seats[0] : r.gm_manager.nnGameData.seats[1], s = r.gm_manager.nnGameData.seats[0].money < r.gm_manager.nnGameData.seats[1].money ? r.gm_manager.nnGameData.seats[0].money : r.gm_manager.nnGameData.seats[1].money, l = {
tableId: r.gm_manager.nnGameData.tableId,
seatIndex: c.seatIndex,
bt: 1,
btVal: Math.floor(s / 36 * i)
}, _ = JSON.stringify(l);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_BET, _, function(e, t) {
a.needWait = !1;
if (0 === e) ; else if (-1 === e) {
r.ui_manager.showTip("押注消息发送超时,请重试!");
n.active = !0;
o.active = !0;
} else {
r.ui_manager.showTip(t);
n.active = !0;
o.active = !0;
}
});
}
};
t.prototype.changeDiffTime = function() {
this.diffTime = Number(r.gm_manager.nnGameData.actTime) - Number(r.gm_manager.nnGameData.svrTime);
this.diffTime < 0 && (this.diffTime = 0);
};
t.prototype.update = function(e) {
if (r.gm_manager && r.gm_manager.nnGameData) {
if (this.diffTime > 0) {
this.diffTime -= 1e3 * e;
this.diffTime < 0 && (this.diffTime = 0);
}
this.updateUp();
this.updateMid();
this.updateDown();
}
};
t.prototype.getSeatData = function(e) {
return e ? r.gm_manager.nnGameData.seats[0].accountId === r.ud_manager.mineData.accountId ? r.gm_manager.nnGameData.seats[0] : r.gm_manager.nnGameData.seats[1] : r.gm_manager.nnGameData.seats[0].accountId === r.ud_manager.mineData.accountId ? r.gm_manager.nnGameData.seats[1] : r.gm_manager.nnGameData.seats[0];
};
t.prototype.fp = function(e, t) {
var a = this, n = e === this.player_down, o = null, i = 0;
this.playFP(e, function() {
a.playFP(t, function() {
a.runFP(e, a.getSeatData(n).handCards, function() {
o = e.getChildByName("niu");
i = r.card_manager.getNiuTypeByIds(a.getSeatData(n).handCards);
o.getComponent(cc.Sprite).spriteFrame = a.niuSFs[i];
o.active = !0;
r.mp_manager.playNN("bull" + i);
o.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1), cc.delayTime(1), cc.callFunc(function() {
a.runFP(t, a.getSeatData(!n).handCards, function() {
o = t.getChildByName("niu");
i = r.card_manager.getNiuTypeByIds(a.getSeatData(!n).handCards);
o.getComponent(cc.Sprite).spriteFrame = a.niuSFs[i];
o.active = !0;
r.mp_manager.playNN("bull" + i);
o.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1), cc.delayTime(1), cc.callFunc(function() {
r.gm_manager.nnGameData.NNOverItems[0].score > 0 ? r.mp_manager.playNN("nn_zwin") : r.mp_manager.playNN("nn_xwin");
setTimeout(function() {
a.showResult();
}, 1e3);
}, a)));
});
}, a)));
});
});
});
};
t.prototype.showResult = function() {
for (var e = r.gm_manager.nnGameData.NNOverItems, t = 0; t < e.length; t++) {
var a = e[t], n = cc.find("board/table/line" + (t + 1), this.result);
if (a.accountId === r.ud_manager.mineData.accountId) {
n.getChildByName("line_bg").active = !0;
var o = cc.find("board/win", this.result), i = cc.find("board/lose", this.result);
if (a.score > 0) {
o.active = !0;
i.active = !1;
r.mp_manager.playWin();
} else {
o.active = !1;
i.active = !0;
r.mp_manager.playLose();
}
} else n.getChildByName("line_bg").active = !1;
1 === a.banker ? n.getChildByName("zhuang").active = !0 : n.getChildByName("zhuang").active = !1;
n.getChildByName("lbl_name").getComponent(cc.Label).string = a.nick;
n.getChildByName("lbl_point").getComponent(cc.Label).string = a.nnDesc;
n.getChildByName("lbl_gold").getComponent(cc.Label).string = a.score.toString();
}
this.isKick && (cc.find("board/btnLayout/goon", this.result).active = !1);
this.result.active = !0;
this.isRunAction = !1;
this.changePlayerInfo(this.getSeatData(!0), this.player_down);
this.changePlayerInfo(this.getSeatData(!1), this.player_up);
};
t.prototype.getRoomInfo = function() {
var e = this, t = {
gameType: 1
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ZJH_GET_ROOM_LIST, a, function(t, a) {
if (0 === t) {
var n = a.items;
cc.director.loadScene("NNRoomScene", function() {
r.gm_manager.nnGameData = null;
r.ui_manager.getCanvasNode().getComponent("NNRoomCanvas").init(n);
});
} else if (-1 === t) {
r.ui_manager.showTip("获取房间列表失败,请重试!");
e.needWait = !1;
} else {
r.ui_manager.showTip(a);
e.needWait = !1;
}
});
};
t.prototype.playFP = function(e, t) {
for (var a = [], n = [], o = e.getChildByName("cardLayout"), i = 1; i < 6; i++) {
var c = o.getChildByName("card" + i);
n.push(c);
var s = c.parent.convertToWorldSpaceAR(c.getPosition());
a.push(this.fpNode.convertToNodeSpaceAR(s));
}
this.fpNode.getComponent("Game_DealScript").showDealFP(cc.v2(0, 0), a, function(e, t) {
var a = n[e], o = new cc.Node();
o.addComponent(cc.Sprite).spriteFrame = r.img_manager.getCardSpriteFrameById(1);
o.width = a.width;
o.height = a.height;
o.setPosition(0, 0);
o.parent = a;
}, function() {
t();
});
};
t.prototype.runFP = function(e, t, a) {
for (var n = e.getChildByName("cardLayout"), o = [], i = 1; i < 6; i++) {
var r = {
node: n.getChildByName("card" + i),
cardId: t[i - 1]
};
o.push(r);
}
this.runAction(o, a);
};
t.prototype.runAction = function(e, t) {
var a = this;
r.mp_manager.playFaPai();
var n = e.shift();
n.node.removeAllChildren();
var o = cc.instantiate(this.fpPrefab);
o.parent = n.node;
var i = r.img_manager.getCardSpriteFrameById(n.cardId);
o.getComponent("Game_ActionFP").initData(n.cardId, i, function() {
e.length > 0 ? a.runAction(e, t) : t();
});
};
t.prototype.onLoad = function() {
return __awaiter(this, void 0, void 0, function() {
var e;
return __generator(this, function(t) {
e = r.gm_manager.nnGameData.tableId % 50;
this.lbl_tableId.string = "桌号: " + (0 === e ? 50 : e);
cc.systemEvent.on("GamePush", this.gamePush);
cc.systemEvent.on("SeatPush", this.seatPush);
cc.systemEvent.on("BetPush", this.betPush);
cc.systemEvent.on("KickPush", this.kickPush);
cc.systemEvent.on("CallBanker", this.callBanker);
cc.systemEvent.on("WalletPush", this.walletPush);
cc.systemEvent.on("Ready", this.readyPush);
this.player_up.active = !1;
this.isRunAction = !1;
this.changePlayerInfo(this.getSeatData(!0), this.player_down);
return [ 2 ];
});
});
};
t.prototype.onDestroy = function() {
cc.systemEvent.off("GamePush", this.gamePush);
cc.systemEvent.off("SeatPush", this.seatPush);
cc.systemEvent.off("BetPush", this.betPush);
cc.systemEvent.off("KickPush", this.kickPush);
cc.systemEvent.off("CallBanker", this.callBanker);
cc.systemEvent.off("WalletPush", this.walletPush);
cc.systemEvent.off("Ready", this.readyPush);
};
__decorate([ i(cc.Label) ], t.prototype, "lbl_tableId", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lbl_mid", void 0);
__decorate([ i(cc.Node) ], t.prototype, "player_up", void 0);
__decorate([ i(cc.Node) ], t.prototype, "player_down", void 0);
__decorate([ i(cc.Node) ], t.prototype, "result", void 0);
__decorate([ i(cc.Node) ], t.prototype, "winNode", void 0);
__decorate([ i(cc.Node) ], t.prototype, "loseNode", void 0);
__decorate([ i(cc.Node) ], t.prototype, "fpNode", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "fpPrefab", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "niuSFs", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
NNRoomCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "0b03cBEld5K1Y35L9kW+j57", "NNRoomCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblGold = null;
t.lblStarNo = null;
t.headImg = null;
t.typeNodes = [];
t.roomTitle = null;
t.roomSpriteFrame = [];
t.tableSpriteFrame = [];
t.tablePrefab = null;
t.tableLayer = null;
t.needWait = !1;
t.showType = null;
t.joinTable = function(e) {
if (!t.needWait && r.ui_manager.showLoading()) {
t.needWait = !0;
r.mp_manager.playButton();
var a = {
tableId: e.getCurrentTarget().tag,
type: 0
}, n = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.ZJH_JION_TABLEID, n, function(e, a) {
t.needWait = !1;
if (0 === e) {
r.gm_manager.nnGameData = a;
cc.director.loadScene("NNScene");
} else if (-1 === e) r.ui_manager.showTip("加入房间消息超时,请重试!"); else {
r.ui_manager.showTip(a);
t.getTables(t.showType);
}
});
}
};
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.tableLayer.active = !1;
r.ui_manager.getRootNode().active = !0;
};
t.prototype.init = function(e) {
for (n = 0; n < e.length && !(n > this.typeNodes.length - 1); n++) {
var t = this.typeNodes[n], a = e[n];
t.tag = a.cfgId;
cc.find("layout/limit", t).getComponent(cc.Label).string = a.joinLimit + "";
}
for (var n = e.length; n < this.typeNodes.length; n++) this.typeNodes[n].active = !1;
};
t.prototype.update = function(e) {
if (r.ud_manager && r.ud_manager.mineData) {
this.lblName.string = r.ud_manager.mineData.nick;
this.lblGold.string = r.utils.getShowNumberString(r.ud_manager.mineData.roomCard);
this.lblStarNo.string = "  (ID:" + r.ud_manager.mineData.starNO + ")";
this.headImg.spriteFrame = r.img_manager.getHeadById(Number(r.ud_manager.mineData.headImg));
}
};
t.prototype.clickRoom = function(e) {
if (!this.needWait && r.ui_manager.showLoading()) {
this.needWait = !0;
r.mp_manager.playButton();
this.getTables(e.getCurrentTarget().tag);
}
};
t.prototype.getTables = function(e) {
var t = this, a = {
cfgId: e
}, n = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.ZJH_GET_TABLE_LIST, n, function(e, n) {
t.needWait = !1;
if (0 === e) {
t.showType = a.cfgId;
t.openTable(n.items);
} else -1 === e ? r.ui_manager.showTip("获取房间列表失败,请重试!") : r.ui_manager.showTip(n);
});
};
t.prototype.openTable = function(e) {
var t = this;
this.tableLayer.active = !0;
r.ui_manager.getRootNode().active = !1;
this.roomTitle.spriteFrame = this.roomSpriteFrame[this.showType - 1];
var a = cc.find("sv", this.tableLayer).getComponent(cc.ScrollView).content;
a.removeAllChildren();
e.sort(function(e, t) {
return e.tableId - t.tableId;
});
e.forEach(function(e, n) {
var o = cc.instantiate(t.tablePrefab);
cc.find("img", o).getComponent(cc.Sprite).spriteFrame = t.tableSpriteFrame[e.playerNum];
cc.find("id", o).getComponent(cc.Label).string = "- " + (n + 1) + " -";
o.tag = e.tableId;
o.parent = a;
o.on(cc.Node.EventType.TOUCH_END, t.joinTable, t);
}, this);
r.ui_manager.hideLoading();
};
t.prototype.closeTable = function() {
if (!this.needWait) {
r.mp_manager.playButton();
this.showType = null;
var e = cc.find("sv", this.tableLayer).getComponent(cc.ScrollView);
e.stopAutoScroll();
e.scrollToTop();
e.content.removeAllChildren();
this.tableLayer.active = !1;
r.ui_manager.getRootNode().active = !0;
}
};
t.prototype.clickBack = function() {
if (!this.needWait && r.ui_manager.showLoading()) {
this.needWait = !0;
r.mp_manager.playButton();
cc.director.loadScene("HomeScene");
}
};
t.prototype.quickJoin = function() {
var e = this;
if (!this.needWait && this.showType && r.ui_manager.showLoading()) {
this.needWait = !0;
r.mp_manager.playButton();
var t = {
cfgId: this.showType
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ZJH_QUICK_JOIN, a, function(t, a) {
e.needWait = !1;
if (0 === t) {
r.gm_manager.nnGameData = a;
cc.director.loadScene("NNScene");
} else if (-1 === t) r.ui_manager.showTip("快速匹配消息超时,请重试!"); else {
r.ui_manager.showTip(a);
e.getTables(e.showType);
}
});
}
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblGold", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblStarNo", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "typeNodes", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "roomTitle", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "roomSpriteFrame", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "tableSpriteFrame", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "tablePrefab", void 0);
__decorate([ i(cc.Node) ], t.prototype, "tableLayer", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
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
e[e.ACCOUNT_LOGIN_PHONE = 108] = "ACCOUNT_LOGIN_PHONE";
e[e.ACCOUNT_GET_SMS_CODE = 109] = "ACCOUNT_GET_SMS_CODE";
e[e.ACCOUNT_REGISTER = 110] = "ACCOUNT_REGISTER";
e[e.ACCOUNT_CUSTOMER_SERVICE = 111] = "ACCOUNT_CUSTOMER_SERVICE";
e[e.MAIL_MAILLIST = 201] = "MAIL_MAILLIST";
e[e.MAIL_MAILVIEW = 202] = "MAIL_MAILVIEW";
e[e.ZJH_GET_ROOM_LIST = 501] = "ZJH_GET_ROOM_LIST";
e[e.ZJH_GET_TABLE_LIST = 502] = "ZJH_GET_TABLE_LIST";
e[e.ZJH_QUICK_JOIN = 503] = "ZJH_QUICK_JOIN";
e[e.ZJH_JION_TABLEID = 504] = "ZJH_JION_TABLEID";
e[e.ZJH_TABLE_CREATE = 505] = "ZJH_TABLE_CREATE";
e[e.ZJH_TABLE_LEAVE = 506] = "ZJH_TABLE_LEAVE";
e[e.ZJH_TABLE_BET = 507] = "ZJH_TABLE_BET";
e[e.ZJH_TABLE_CALL_BANKER = 508] = "ZJH_TABLE_CALL_BANKER";
e[e.ZJH_TABLE_NN_GAME_READY = 509] = "ZJH_TABLE_NN_GAME_READY";
e[e.WALLET_ROOMCARD_GIVE = 801] = "WALLET_ROOMCARD_GIVE";
e[e.WALLET_ROOMCARD_RECORD = 802] = "WALLET_ROOMCARD_RECORD";
e[e.ORDER_GET_EXCHANAGE_PERCENT = 901] = "ORDER_GET_EXCHANAGE_PERCENT";
e[e.ORDER_CHARGE_RMB2GOLDMONEY = 902] = "ORDER_CHARGE_RMB2GOLDMONEY";
e[e.ORDER_CHARGE_GOLDMONEY2RMB = 903] = "ORDER_CHARGE_GOLDMONEY2RMB";
e[e.ORDER_CHARGE_GOLDMONEY2RMB_QUERY = 904] = "ORDER_CHARGE_GOLDMONEY2RMB_QUERY";
e[e.ACCOUNT_NOTIFY_HOT_PROMPT = 10001] = "ACCOUNT_NOTIFY_HOT_PROMPT";
e[e.ACCOUNT_NOTIFY_WALLET = 10002] = "ACCOUNT_NOTIFY_WALLET";
e[e.MESSAGE_NOTICE_NOTIFY = 30001] = "MESSAGE_NOTICE_NOTIFY";
e[e.ZJH_GAMESTATE_CHANAGE_NOTIFY = 50001] = "ZJH_GAMESTATE_CHANAGE_NOTIFY";
e[e.ZJH_SEAT_CHANAGE_NOTIFY = 50002] = "ZJH_SEAT_CHANAGE_NOTIFY";
e[e.ZJH_TABLE_BET_NOTIFY = 50003] = "ZJH_TABLE_BET_NOTIFY";
e[e.ZJH_TABLE_KICK_PLAYER_NOTIFY = 50004] = "ZJH_TABLE_KICK_PLAYER_NOTIFY";
e[e.ZJH_TABLE_LOOKCARD_NOTIFY = 50005] = "ZJH_TABLE_LOOKCARD_NOTIFY";
e[e.ZJH_TABLE_NN_CALLBANKER_NOTIFY = 50006] = "ZJH_TABLE_NN_CALLBANKER_NOTIFY";
e[e.ZJH_TABLE_NN_GAMEREADY_NOTIFY = 50007] = "ZJH_TABLE_NN_GAMEREADY_NOTIFY";
e[e.ORDER_RMB2GOLDMONEY_NOTIFY = 90001] = "ORDER_RMB2GOLDMONEY_NOTIFY";
}(a.Protocol || (a.Protocol = {}));
cc._RF.pop();
}, {} ],
Recharge: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "2eaa0tVPBVBLatXQlvHgJEx", "Recharge");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.edt_buy = null;
t.lblRatio = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
e.outRecharge();
}, this);
};
t.prototype.initData = function(e) {
this.lblRatio.string = "1元=" + e.rmb2goldMoney + "金币";
};
t.prototype.getBuyGold = function(e, t) {
var a = this;
if (r.ui_manager.showLoading()) {
var n = {
rmb: e,
payType: t
}, o = JSON.stringify(n);
r.ws_manager.sendMsg(r.protocol.ORDER_CHARGE_RMB2GOLDMONEY, o, function(e, t) {
r.ui_manager.hideLoading();
if (0 === e) {
a.edt_buy.string = "";
r.utils.openBrowser(t);
a.outRecharge();
} else -1 === e ? r.ui_manager.showTip("消息超时!") : r.ui_manager.showTip(t);
});
}
};
t.prototype.edit_change = function(e, t) {
if (isNaN(Number(e))) if (e.length > 1) {
e = e.substring(0, e.length - 1);
t.string = e;
} else t.string = ""; else {
var a = Number(e);
t.string = a + "";
}
};
t.prototype.click_btn_storeBuy = function(e, t) {
var a = this.edt_buy.string.trim();
if ("" !== a && null !== a) {
var n = Number(a);
if (isNaN(n)) {
this.edt_buy.string = "";
r.ui_manager.showTip("请输入有效的充值金额");
} else if (Math.floor(n) === n) n > 0 && n <= 3e3 ? this.getBuyGold(Number(n), Number(t)) : r.ui_manager.showTip("充值金额范围为1~3000，请重新输入"); else {
this.edt_buy.string = "";
r.ui_manager.showTip("请输入整数的充值金额");
}
} else r.ui_manager.showTip("充值金额不为空");
};
t.prototype.outRecharge = function() {
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.EditBox) ], t.prototype, "edt_buy", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRatio", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager"
} ],
Service: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "2d3faof6aJN/6TYQXPk1vsZ", "Service");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblService = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
}, this);
};
t.prototype.initData = function(e) {
this.lblService.string = e;
};
t.prototype.click_btn_copy = function() {
r.mp_manager.playButton();
r.utils.copyToClipboard(this.lblService.string);
r.ui_manager.showTip("复制成功");
r.ui_manager.isShowPopup = !0;
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i(cc.Label) ], t.prototype, "lblService", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.img_onOff_list = [];
t.effect_img = null;
t.music_img = null;
t.btn_logout = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
r.ui_manager.isShowPopup = !0;
e.node.removeFromParent(!0);
e.node.destroy();
}, this);
this.effect_img.spriteFrame = !0 === r.mp_manager.audioSetting.isEffect ? this.img_onOff_list[0] : this.img_onOff_list[1];
this.music_img.spriteFrame = !0 === r.mp_manager.audioSetting.isMusic ? this.img_onOff_list[0] : this.img_onOff_list[1];
};
t.prototype.click_btn_effect = function() {
r.mp_manager.playButton();
r.mp_manager.audioSetting.isEffect = !r.mp_manager.audioSetting.isEffect;
r.mp_manager.saveMPSetting();
this.effect_img.spriteFrame = !0 === r.mp_manager.audioSetting.isEffect ? this.img_onOff_list[0] : this.img_onOff_list[1];
};
t.prototype.click_btn_music = function() {
r.mp_manager.playButton();
r.mp_manager.audioSetting.isMusic = !r.mp_manager.audioSetting.isMusic;
r.mp_manager.saveMPSetting();
r.mp_manager.audioSetting.isMusic ? r.mp_manager.playBackGround() : r.mp_manager.stopBackGround();
this.music_img.spriteFrame = !0 === r.mp_manager.audioSetting.isMusic ? this.img_onOff_list[0] : this.img_onOff_list[1];
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
cc.sys.garbageCollect();
cc.game.restart();
});
});
}
};
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "img_onOff_list", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "effect_img", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "music_img", void 0);
__decorate([ i(cc.Node) ], t.prototype, "btn_logout", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lbl_msg = null;
return t;
}
__extends(t, e);
t.prototype.showTip = function(e, t, a, n) {
var o = this;
this.lbl_msg.string = e;
var i = Math.floor(cc.director.getVisibleSize().height / 5), r = -i;
this.node.y = r;
this.node.scale = 1.2;
var c = cc.spawn(cc.moveTo(t, this.node.x, 0), cc.scaleTo(t, 1), cc.fadeIn(t)), s = cc.delayTime(a), l = cc.spawn(cc.moveTo(n, this.node.x, i), cc.scaleTo(n, .1), cc.fadeOut(n)), _ = cc.callFunc(function() {
o.node.removeFromParent(!0);
o.node.destroy();
}, this), d = cc.sequence(c, s, l, _);
this.node.runAction(d);
};
__decorate([ i(cc.Label) ], t.prototype, "lbl_msg", void 0);
return t = __decorate([ o ], t);
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
var n = cc._decorator, o = n.ccclass, i = n.property, r = function(e) {
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
return t = __decorate([ o ], t);
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
var n = function() {
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
a.default = n;
cc._RF.pop();
}, {} ],
UIManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "020aaKDESZPU5JLyI9iKKyn", "UIManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./ModuleManager"), o = function() {
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
var a = cc.director.getScene().name;
"ZJHScene" !== a && "NNScene" !== a || n.mp_manager.playBackGround();
};
this.cb_after_scene_loading = function(e) {
var t = cc.director.getScene().name;
"ZJHScene" !== t && "NNScene" !== t || n.mp_manager.stopBackGround();
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
cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.cb_after_scene_loading);
cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update);
cc.game.on(cc.game.EVENT_HIDE, this.cb_app_hide);
cc.game.on(cc.game.EVENT_SHOW, this.cb_app_show);
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
cc.loader.loadRes("Prefab/Loading", cc.Prefab, function(n, o) {
if (n) a(n.message); else {
e.p_loading = o;
t();
}
});
});
};
e.prototype.initAlert = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Prefab/Alert", cc.Prefab, function(n, o) {
if (n) a(n.message); else {
e.p_alert = o;
t();
}
});
});
};
e.prototype.initTip = function() {
var e = this;
return new Promise(function(t, a) {
cc.loader.loadRes("Prefab/Tip", cc.Prefab, function(n, o) {
if (n) a(n.message); else {
e.p_tip = o;
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
t.name = "Loading";
t.zIndex = 99;
t.parent = this.getCanvasNode();
t.getComponent("Loading").setMsg(e);
return !0;
};
e.prototype.setLoading = function(e) {
this.isShowLoading && this.getCanvasNode().getChildByName("Loading").getComponent("Loading").setMsg(e);
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
e.prototype.showAlert = function(e, t, a, n, o) {
void 0 === o && (o = 0);
this.hideLoading();
var i = cc.find("Alert", this.getCanvasNode());
if (i && i.isValid) {
i.removeFromParent(!0);
i.destroy();
}
(i = cc.instantiate(this.p_alert)).parent = this.getCanvasNode();
i.getComponent("Alert").showAlert(e, t, a, n, o);
};
e.prototype.showTip = function(e, t, a, n) {
void 0 === t && (t = 1);
void 0 === a && (a = 2);
void 0 === n && (n = 1);
this.hideLoading();
var o = cc.instantiate(this.p_tip);
o.zIndex = 99;
o.parent = this.getCanvasNode();
o.getComponent("Tip").showTip(e, t, a, n);
};
e.prototype.destroySelf = function() {
cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading);
cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update);
cc.game.off(cc.game.EVENT_HIDE, this.cb_app_hide);
cc.game.off(cc.game.EVENT_SHOW, this.cb_app_show);
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
e._instance = null;
return e;
}();
a.default = o;
cc._RF.pop();
}, {
"./ModuleManager": "ModuleManager"
} ],
Utils: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "3550cBmAB5Pip6W07VMW445", "Utils");
Object.defineProperty(a, "__esModule", {
value: !0
});
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
for (var t = e.split("."), a = [], n = 0; n < t.length; n++) a.push(Number(t[n]));
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
var n = new Date();
n.setTime(a);
var o = this.getDateStringByDate(n), i = this.getTimeStringByDate(n);
return 1 === t ? o : 2 === t ? i : o + " " + i;
};
a.getDateStringByDate = function(e, t) {
if (e instanceof Date) {
t || (t = "-");
var a = e.getFullYear() + "", n = e.getMonth() + 1, o = n + "";
n < 10 && (o = "0" + n);
var i = e.getDate(), r = i + "";
i < 10 && (r = "0" + i);
return a + t + o + t + r;
}
return "";
};
a.getTimeStringByDate = function(e, t) {
if (e instanceof Date) {
t || (t = ":");
var a = e.getHours(), n = a + "";
a < 10 && (n = "0" + a);
var o = e.getMinutes(), i = o + "";
o < 10 && (i = "0" + o);
return n + t + i;
}
return "";
};
a.getCountDownString = function(e, t) {
var a = this.getCountDownObj(e);
if (null === a) return "";
var n = "";
1 === t ? a.minute += 60 * a.hour : a.hour > 9 ? n += a.hour + ":" : n += "0" + a.hour + ":";
a.minute > 9 ? n += a.minute + ":" : n += "0" + a.minute + ":";
a.second > 9 ? n += a.second : n += "0" + a.second;
return n;
};
a.getEffectiveNumbers = function(e, t) {
var a = Math.floor(e), n = e.toString();
return e === a ? n.length < t + 1 ? e : Number(n.slice(0, t)) : n.length < t + 2 ? e : Number(n.slice(0, t + 1));
};
a.getShowNumberString = function(e, t) {
void 0 === t && (t = !0);
if (e >= 1e4) {
var a = this.getEffectiveNumbers(e / 1e4, 4);
return a += "万";
}
return e + "";
};
a.copyToClipboard = function(e) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyToClipboard", "(Ljava/lang/String;)V", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("AppController", "copyToClipboard:", e) : cc.log("该方法只支持原生平台");
};
a.openBrowser = function(e) {
cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openBrowser", "(Ljava/lang/String;)V", e) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("AppController", "openBrowser:", e) : cc.log("该方法只支持原生平台");
};
cc._RF.pop();
}, {} ],
WSManager: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "14e2emcHSBBALc9XuPglA/5", "WSManager");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./ModuleManager"), o = e("./Protocol"), i = e("./ENCManager"), r = e("./UDManager"), c = function() {
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
return new Promise(function(a, n) {
if (t.ws || e.length < 1 || t.readyState) {
t.destroySelf();
n("参数错误");
}
t.readyState = WebSocket.CONNECTING;
t.ws = new WebSocket(e);
t.ws.binaryType = "arraybuffer";
t.ws.onopen = function(n) {
t.readyState = WebSocket.OPEN;
t.url = e;
t.checkTimeOut();
a();
};
t.ws.onclose = function(e) {
switch (t.readyState) {
case WebSocket.CONNECTING:
n("连接失败");
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
var a = t.getMessageId(e.data, 12), n = t.getMessageBody(e.data, 32), i = JSON.parse(n);
if (a > 1e4) 0 === i.code ? t.doPush(a, i.content) : cc.log("推送了错误消息过来"); else {
var r = t.getSendData(a);
if (r) {
var c = t.delayTime;
t.delayTime = Date.now() - r.sendTime;
c !== t.delayTime && cc.systemEvent.emit("msDelay", t.delayTime);
r.callback(i.code, i.content);
cc.js.array.remove(t.sendDataArray, r);
} else a !== o.Protocol.ACCOUNT_PING && cc.log("onmessage:协议号" + a + "超时或未知");
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
e.checkHeartbeat(t);
var a = [];
e.sendDataArray.forEach(function(t) {
if (Date.now() - t.sendTime >= e.timeoutTime) {
n.ui_manager.showTip("消息超时");
n.ui_manager.hideLoading();
t.callback(-1);
a.push(t);
}
});
cc.js.array.removeArray(e.sendDataArray, a);
}
}, 1e3);
};
e.prototype.stopCheck = function() {
if (this.timeID) {
clearInterval(this.timeID);
this.timeID = null;
}
};
e.prototype.checkHeartbeat = function(e) {
var t = this;
if (0 === this.intervalTime) {
this.heartbeatStart = e;
this.sendMsg(o.Protocol.ACCOUNT_HEART, "", function(e, a) {
if (0 === e) {
if (t.isLogin) {
t.heartbeatEnd = Date.now();
var n = {
ping: t.delayTime
};
t.sendMsg(o.Protocol.ACCOUNT_PING, JSON.stringify(n), null);
}
} else cc.log("心跳返回错误了！");
});
}
this.intervalTime += 1e3;
this.intervalTime >= this.heartbeatInterval && (this.intervalTime = 0);
if (this.heartbeatStart - this.heartbeatEnd >= this.timeoutMax) {
this.readyState = WebSocket.CLOSED;
this.ws.close();
}
};
e.prototype.doPush = function(e, t) {
switch (e) {
case o.Protocol.ACCOUNT_NOTIFY_HOT_PROMPT:
r.default.getInstance().hotTip = t;
break;

case o.Protocol.MESSAGE_NOTICE_NOTIFY:
for (var a = !0, i = t, c = 0; c < r.default.getInstance().noticeList.length; c++) if (r.default.getInstance().noticeList[c].msgId === i.msgId) {
a = !1;
break;
}
a && r.default.getInstance().noticeList.push(i);
break;

case o.Protocol.ACCOUNT_NOTIFY_WALLET:
var s = t;
r.default.getInstance().mineData.roomCard = s.roomCard;
cc.systemEvent.emit("WalletPush", t);
break;

case o.Protocol.ORDER_RMB2GOLDMONEY_NOTIFY:
n.ui_manager.showAlert("您充值的" + t + "金币已到账！", "充值通知", null, null, 1);
break;

case o.Protocol.ZJH_GAMESTATE_CHANAGE_NOTIFY:
cc.systemEvent.emit("GamePush", t);
break;

case o.Protocol.ZJH_SEAT_CHANAGE_NOTIFY:
cc.systemEvent.emit("SeatPush", t);
break;

case o.Protocol.ZJH_TABLE_BET_NOTIFY:
cc.systemEvent.emit("BetPush", t);
break;

case o.Protocol.ZJH_TABLE_KICK_PLAYER_NOTIFY:
cc.systemEvent.emit("KickPush", t);
break;

case o.Protocol.ZJH_TABLE_NN_CALLBANKER_NOTIFY:
cc.systemEvent.emit("CallBanker", t);
break;

case o.Protocol.ZJH_TABLE_LOOKCARD_NOTIFY:
cc.systemEvent.emit("LookPush", t);
break;

case o.Protocol.ZJH_TABLE_NN_GAMEREADY_NOTIFY:
cc.systemEvent.emit("Ready", t);
}
};
e.prototype.getSendData = function(e) {
for (var t = 0, a = this.sendDataArray.length; t < a; t++) {
var n = this.sendDataArray[t];
if (n.msgId === e) return n;
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
var n = this.getSendData(e);
n && cc.js.array.remove(this.sendDataArray, n);
n = {
msgId: e,
sendTime: Date.now(),
callback: a
};
this.sendDataArray.push(n);
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
var a = this.getArrayNumberFromString(t), n = a.length, o = {
hcheck: 0,
code: 0,
flag: 0,
id: 0,
timestamp: 0,
bcheck: 0,
blen: 0,
alen: 0
};
o.id = e;
o.timestamp = Date.now() / 1e3;
o.blen = n;
o.bcheck = this.checkSum(a, 0, n);
var i = this.getHeaderToArrayNumber(o);
o.hcheck = this.checkSum(i, 4, 28);
var r = (i = this.getHeaderToArrayNumber(o)).concat(a);
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
for (var n = 0, o = t; o < t + a; o++) n = n << 7 ^ e[o];
return n;
};
e.prototype.ArrayBufferToString = function(e) {
var t = String.fromCharCode.apply(null, new Uint8Array(e));
return t = i.default.getInstance().Utf8Decode(t);
};
e.prototype.StringToArrayBuffer = function(e) {
e = i.default.getInstance().Utf8Encode(e);
for (var t = new ArrayBuffer(e.length), a = new Uint8Array(t), n = 0, o = e.length; n < o; n++) a[n] = e.charCodeAt(n);
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
a.default = c;
cc._RF.pop();
}, {
"./ENCManager": "ENCManager",
"./ModuleManager": "ModuleManager",
"./Protocol": "Protocol",
"./UDManager": "UDManager"
} ],
ZJHCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "d005dQ65H5PvpPadFI9HVW0", "ZJHCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = e("./ZJH_Help"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_action = null;
t.node_player = null;
t.node_table = null;
t.node_mask = null;
t.card_prefab = null;
t.fanpai_prefab = null;
t.bpPrefab = null;
t.bpsbPrefab = null;
t.spPrefab = null;
t.timeDown_prefab_list = [];
t._dealScript = null;
t._playerScript = null;
t._tableScript = null;
t._isShowResult = !1;
t._isFPAction = !1;
t.ZJH_GamePush = function(e) {
var a = e.detail;
r.gm_manager.zjhGameData = a;
t.showZJHInfo();
};
t.ZJH_SeatPush = function(e) {
var a = e.detail;
r.gm_manager.zjhGameData = a;
t.showZJHInfo();
};
t.ZJH_BetPush = function(e) {
var a = e.detail;
cc.log("下注push");
cc.log(a);
r.gm_manager.zjhGameData = a.tableVo;
t.showZJHInfo();
var n = c.getSeatBySeatId(a.btIndex);
if (n && n.btState !== c.ZJH_BT_State.ACT_STATE_WAIT && 1 === n.bGamed) {
var o = c.getIndexBySeatId(n.seatIndex);
switch (n.btVal) {
case c.ZJH_Act_State.BT_VAL_DROP:
r.mp_manager.playZJH("state_qp");
t.showQPAction(n.seatIndex);
break;

case c.ZJH_Act_State.BT_VAL_LOOCK:
r.mp_manager.playZJH("state_kp");
break;

case c.ZJH_Act_State.BT_VAL_COMPARAE:
break;

case c.ZJH_Act_State.BT_VAL_BETALL:
r.mp_manager.playZJH("state_allin");
t._tableScript.playGoldAction(t._playerScript.getPosByIndex(o), a.betMoney);
break;

case c.ZJH_Act_State.BT_VAL_BETSAME:
r.mp_manager.playZJH("state_gz");
t._tableScript.playGoldAction(t._playerScript.getPosByIndex(o), a.betMoney);
break;

case c.ZJH_Act_State.BT_VAL_BETADD:
r.mp_manager.playZJH("state_jz");
t._tableScript.playGoldAction(t._playerScript.getPosByIndex(o), a.betMoney);
}
}
};
t.ZJH_KickPush = function(e) {
var t = e.detail, a = "";
1 === t ? a = "您的金币不足,被踢出房间！" : 3 === t && (a = "您长时间未准备，已被踢出房间！");
if (r.ui_manager.showLoading()) {
r.ud_manager.mineData.tableId = 0;
cc.director.loadScene("HomeScene", function() {
r.ui_manager.showTip(a);
r.gm_manager.destroySelf();
});
}
};
t.ZJH_LookPush = function(e) {
var a = e.detail;
cc.log("玩家看牌push");
cc.log(a);
var n = c.getSeatBySeatId(a.btIndex);
r.mp_manager.playZJH("state_kp");
n.accountId === r.ud_manager.mineData.accountId && t._playerScript.showFPActionBySeatId(a.btIndex);
r.gm_manager.zjhGameData = a.tableVo;
t.showZJHInfo();
};
t.WalletPush = function(e) {
var a = e.detail, n = r.gm_manager.zjhGameData;
if (n) {
for (var o = 0; o < n.seats.length; o++) if (r.ud_manager.mineData.accountId === n.seats[o].accountId) {
r.gm_manager.zjhGameData.seats[o].money = a.roomCard;
break;
}
t._playerScript.showPlayerInfo();
}
};
t.readyPush = function(e) {
var a = e.detail;
r.gm_manager.zjhGameData = a;
t.showZJHInfo();
};
t.onTouchMaskUp = function(e) {
t.showMask(!1);
e.stopPropagation();
};
return t;
}
__extends(t, e);
t.prototype.bindOnPush = function() {
cc.systemEvent.on("GamePush", this.ZJH_GamePush);
cc.systemEvent.on("SeatPush", this.ZJH_SeatPush);
cc.systemEvent.on("BetPush", this.ZJH_BetPush);
cc.systemEvent.on("KickPush", this.ZJH_KickPush);
cc.systemEvent.on("LookPush", this.ZJH_LookPush);
cc.systemEvent.on("WalletPush", this.WalletPush);
cc.systemEvent.on("Ready", this.readyPush);
};
t.prototype.bindOffPush = function() {
cc.systemEvent.off("GamePush", this.ZJH_GamePush);
cc.systemEvent.off("SeatPush", this.ZJH_SeatPush);
cc.systemEvent.off("BetPush", this.ZJH_BetPush);
cc.systemEvent.off("KickPush", this.ZJH_KickPush);
cc.systemEvent.off("LookPush", this.ZJH_LookPush);
cc.systemEvent.off("WalletPush", this.WalletPush);
cc.systemEvent.off("Ready", this.readyPush);
};
t.prototype.onLoad = function() {
var e = this;
this._dealScript = this.node_action.getComponent("Game_DealScript");
this._playerScript = this.node_player.getComponent("ZJH_Player");
this._tableScript = this.node_table.getComponent("ZJH_Table");
this.node.on("touchend", function(t) {
e._tableScript.showAddReturnToState();
t.stopPropagation();
}, this);
this.bindOnPush();
};
t.prototype.onDestroy = function() {
this.bindOffPush();
};
t.prototype.start = function() {
var e = this;
if (r.ui_manager.showLoading("正在加载桌子信息")) {
var t = {
tableId: r.gm_manager.zjhGameData.tableId,
type: 0
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ZJH_JION_TABLEID, a, function(t, a) {
r.ui_manager.hideLoading();
if (0 === t) {
r.gm_manager.zjhGameData = a;
e.showZJHInfo();
} else -1 === t || r.ui_manager.showAlert(a, "温馨提示", {
lbl_name: "确定",
callback: function() {
if (r.ui_manager.showLoading()) {
r.ud_manager.mineData.tableId = 0;
cc.director.loadScene("HomeScene", function() {
r.gm_manager.destroySelf();
});
}
}
});
cc.log(a);
});
}
};
t.prototype.sendBetInfo = function(e, t) {
var a = c.getSeatById(r.ud_manager.mineData.accountId);
if (a) {
var n = {
tableId: r.gm_manager.zjhGameData.tableId,
seatIndex: a.seatIndex,
bt: e,
btVal: t
};
if (e === c.ZJH_Act_State.BT_VAL_BETSAME || e === c.ZJH_Act_State.BT_VAL_BETADD) {
n.btVal > r.gm_manager.zjhGameData.onceMax && (n.btVal = r.gm_manager.zjhGameData.onceMax);
n.btVal > a.money && (n.btVal = a.money);
a.money <= n.btVal && (n.bt = c.ZJH_Act_State.BT_VAL_BETALL);
n.btVal = n.btVal + a.betMoney;
}
var o = JSON.stringify(n);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_BET, o, function(e, t) {
0 === e ? cc.log("下注成功") : -1 === e ? cc.log(t) : r.ui_manager.showTip(t);
});
}
};
t.prototype.sendReadyGame = function() {
var e = {
tableId: r.gm_manager.zjhGameData.tableId
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_NN_GAME_READY, t, function(e, t) {
r.ui_manager.hideLoading();
0 === e || (-1 === e ? r.ui_manager.showTip("准备消息发送超时,请重试!") : r.ui_manager.showTip(t));
});
};
t.prototype.sendOutGame = function() {
var e = this;
if (r.ui_manager.showLoading()) {
var t = {
tableId: r.gm_manager.zjhGameData.tableId
}, a = JSON.stringify(t);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_LEAVE, a, function(t, a) {
r.ui_manager.hideLoading();
0 === t ? e.sendGetRoomInfo() : -1 === t ? cc.log(a) : r.ui_manager.showAlert(a, "错误提示", {
lbl_name: "确定",
callback: function() {
e.sendGetRoomInfo();
}
});
});
}
};
t.prototype.sendGetRoomInfo = function() {
if (r.ui_manager.showLoading("正在获取房间列表,请稍后")) {
var e = {
gameType: 2
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ZJH_GET_ROOM_LIST, t, function(e, t) {
r.ui_manager.hideLoading();
if (0 === e) {
var a = t.items;
r.ud_manager.mineData.tableId = 0;
cc.director.loadScene("ZJHRoomScene", function() {
r.gm_manager.destroySelf();
r.ui_manager.getCanvasNode().getComponent("ZJH_RoomCanvas").init(a);
});
} else if (-1 === e) {
if (r.ui_manager.showLoading()) {
r.ud_manager.mineData.tableId = 0;
cc.director.loadScene("HomeScene", function() {
r.gm_manager.destroySelf();
});
}
} else if (r.ui_manager.showLoading()) {
r.ud_manager.mineData.tableId = 0;
cc.director.loadScene("HomeScene", function() {
r.gm_manager.destroySelf();
});
}
});
}
};
t.prototype.showZJHInfo = function() {
var e = this;
cc.log("------游戏状态----" + r.gm_manager.zjhGameData.gameState);
cc.log(r.gm_manager.zjhGameData);
r.gm_manager.zjhGameData.seats = c.sortSeatList(r.gm_manager.zjhGameData.seats);
this._playerScript.showPlayerInfo();
this._tableScript.showTableInfo();
this.showMask();
var t = r.gm_manager.zjhGameData.gameState;
t !== c.ZJH_Game_State.STATE_TABLE_ZJH_OVER && (this._isShowResult = !1);
t !== c.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI && (this._isFPAction = !1);
switch (t) {
case c.ZJH_Game_State.STATE_TABLE_ZJH_READY:
break;

case c.ZJH_Game_State.STATE_TABLE_ZJH_BASESCORE:
r.mp_manager.playStart(function() {
var t = e._playerScript.getFPPosList();
e._dealScript.showDeal(t.posList, function(t) {
e._tableScript.playGoldAction(e._playerScript.getPosByIndex(t), r.gm_manager.zjhGameData.baseScore);
});
});
break;

case c.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI:
(a = (Number(r.gm_manager.zjhGameData.actTime) - Number(r.gm_manager.zjhGameData.svrTime)) / 1e3) > 3 && r.mp_manager.playZJH("fapai", function() {
e.showFaPai();
});
break;

case c.ZJH_Game_State.STATE_TABLE_ZJH_BET:
break;

case c.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE:
var a = (Number(r.gm_manager.zjhGameData.actTime) - Number(r.gm_manager.zjhGameData.svrTime)) / 1e3;
if (a > 3) {
r.mp_manager.playZJH("state_bp");
this.showBPAction();
}
break;

case c.ZJH_Game_State.STATE_TABLE_ZJH_OVER:
if (!this._isShowResult) {
this._isShowResult = !0;
this._playerScript.showAllFPAction();
this.showWinAction();
}
}
};
t.prototype.showFaPai = function() {
var e = this;
if (!this._isFPAction) {
this._isFPAction = !0;
var t = this._playerScript.getFPPosList();
this._dealScript.showDealFP(cc.v2(0, 240), t.posList, function(a, n) {
e._playerScript.showPokerByIndex(t.playerIndexList[a], n, 0, !1);
}, null, 3);
}
};
t.prototype.showFanPai = function(e, t, a) {
var n = cc.instantiate(this.fanpai_prefab);
n.getComponent("Game_ActionFP").initData(e, r.img_manager.getCardSpriteFrameById(e), a);
n.parent = t;
};
t.prototype.showCard = function(e, t, a) {
void 0 === a && (a = !0);
var n = cc.instantiate(this.card_prefab), o = n.getComponent("Game_Card");
if (e > -1) {
var i = r.img_manager.getCardSpriteFrameById(e);
o.initData(e, i, a);
}
n.parent = t;
};
t.prototype.showSJDAction = function(e, t, a, n, o) {
(0 === e ? cc.instantiate(this.timeDown_prefab_list[0]) : cc.instantiate(this.timeDown_prefab_list[1])).getComponent("Game_TimeDown").initData(t, a, n, o);
};
t.prototype.showBPAction = function() {
cc.instantiate(this.bpPrefab).parent = r.ui_manager.getRootNode();
r.mp_manager.playZJH("bp");
};
t.prototype.showBPSBAction = function(e, t) {
r.mp_manager.playZJH("kd");
var a = cc.instantiate(this.bpsbPrefab);
a.setPosition(e);
a.parent = t;
};
t.prototype.showQPAction = function(e, t) {
void 0 === t && (t = null);
if (e < 0 || e > 5) cc.log("弃牌索引错误"); else {
var a = c.getIndexBySeatId(e), n = this._playerScript.getPosByIndex(a);
this._dealScript.showDealDiscard(n, t);
var o = c.getSeatById(r.ud_manager.mineData.accountId);
o && o.seatIndex === e && this._playerScript.showFPActionBySeatId(e);
}
};
t.prototype.showShakeAction = function(e, t) {
var a = cc.instantiate(this.spPrefab);
a.setPosition(t);
a.getComponent("ZJH_PokerShake").initData(e, this);
a.parent = this.node_mask;
a.getComponent(cc.Animation).play();
};
t.prototype.showMask = function(e) {
void 0 === e && (e = !1);
this.node_mask.active = e;
if (e) this.node.on("touchend", this.onTouchMaskUp, this); else {
this.node_mask.removeAllChildren(!0);
this.node_mask.off("touchend", this.onTouchMaskUp, this);
}
};
t.prototype.showChooseBPAction = function() {
this.showMask(!0);
this._playerScript.showPokerShakeAction();
};
t.prototype.showWinAction = function() {
var e = this;
if (r.gm_manager.zjhGameData.ZJHOverItems) {
for (var t = r.gm_manager.zjhGameData.ZJHOverItems, a = 0, n = 0, o = 0; o < t.length; o++) {
var i = t[o].score;
if (i > n) {
n = i;
a = t[o].seatIndex;
}
}
var s = c.getIndexBySeatId(a), l = this._playerScript.getPosByIndex(s);
this._tableScript.playWinGoldAction(l, function() {
for (var a = 0; a < t.length; a++) {
var n = t[a].score, o = c.getIndexBySeatId(t[a].seatIndex), i = e._playerScript.getPosByIndex(o), s = n > 0 ? cc.Color.RED : cc.Color.GREEN, l = r.utils.getShowNumberString(n);
n > 0 && (l = "+" + l);
e.craeteLalelAction(l, i, s);
}
});
}
};
t.prototype.craeteLalelAction = function(e, t, a) {
var n = new cc.Node();
n.color = a;
n.setPosition(t);
var o = n.addComponent(cc.Label);
o.fontSize = 50;
o.lineHeight = 50;
o.string = e;
n.parent = r.ui_manager.getRootNode();
var i = cc.sequence(cc.moveTo(2, cc.v2(t.x, t.y + 80)), cc.callFunc(function() {
n.removeFromParent(!0);
n.destroy();
}));
n.runAction(i);
};
__decorate([ i(cc.Node) ], t.prototype, "node_action", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_player", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_table", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_mask", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "card_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "fanpai_prefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "bpPrefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "bpsbPrefab", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "spPrefab", void 0);
__decorate([ i([ cc.Prefab ]) ], t.prototype, "timeDown_prefab_list", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./ZJH_Help": "ZJH_Help"
} ],
ZJH_ActionPK: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "9c653jyfiVMIquQ9gz84ZbG", "ZJH_ActionPK");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = e("./ZJH_Help"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.headImgList = [];
t.lblMoneyList = [];
t.lblNameList = [];
t.dImgList = [];
t._canvansScript = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this.node.on("touchend", function(e) {
e.stopPropagation();
}, this);
this._canvansScript = r.ui_manager.getCanvasNode().getComponent("ZJHCanvas");
this.initData();
};
t.prototype.initData = function() {
var e = [], t = c.getSeatBySeatId(r.gm_manager.zjhGameData.compareSrcIndex), a = c.getSeatBySeatId(r.gm_manager.zjhGameData.compareDstIndex);
e.push(t);
e.push(a);
for (var n = 0; n < e.length; n++) {
var o = e[n];
if (o) {
this.headImgList[n].spriteFrame = r.img_manager.getHeadById(Number(o.headImg));
this.dImgList[n].active = o.accountId === r.gm_manager.zjhGameData.bankerId;
this.lblMoneyList[n].string = r.utils.getShowNumberString(o.money);
this.lblNameList[n].string = o.nick;
}
}
};
t.prototype.bpResult = function() {
var e = null;
(e = 1 === r.gm_manager.zjhGameData.compareResult ? this.dImgList[1].parent : this.dImgList[0].parent) && this._canvansScript.showBPSBAction(cc.p(0, 0), e);
};
t.prototype.showBPStart = function() {
this.dImgList[0].parent.runAction(cc.fadeIn(.5));
this.dImgList[1].parent.runAction(cc.fadeIn(.5));
};
t.prototype.showBPSB = function() {
var e = cc.fadeOut(.5);
1 === r.gm_manager.zjhGameData.compareResult ? this.dImgList[1].parent.runAction(e) : this.dImgList[0].parent.runAction(e);
var t = c.getSeatById(r.ud_manager.mineData.accountId);
if (t) {
t.seatIndex === r.gm_manager.zjhGameData.compareSrcIndex && (1 === r.gm_manager.zjhGameData.compareResult ? r.mp_manager.playZJH("bp_win") : r.mp_manager.playZJH("bp_lose"));
t.seatIndex === r.gm_manager.zjhGameData.compareSrcIndex && (1 === r.gm_manager.zjhGameData.compareResult ? r.mp_manager.playZJH("bp_lose") : r.mp_manager.playZJH("bp_win"));
}
};
t.prototype.showBPWin = function() {
var e = cc.fadeOut(.5);
(1 === r.gm_manager.zjhGameData.compareResult ? this.dImgList[0].parent : this.dImgList[1].parent).runAction(e);
};
t.prototype.actionEnd = function() {
var e = r.gm_manager.zjhGameData.compareSrcIndex;
1 === r.gm_manager.zjhGameData.compareResult && (e = r.gm_manager.zjhGameData.compareDstIndex);
this._canvansScript.showQPAction(e);
this.node.removeFromParent(!0);
this.node.destroy();
};
__decorate([ i([ cc.Sprite ]) ], t.prototype, "headImgList", void 0);
__decorate([ i([ cc.Label ]) ], t.prototype, "lblMoneyList", void 0);
__decorate([ i([ cc.Label ]) ], t.prototype, "lblNameList", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "dImgList", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./ZJH_Help": "ZJH_Help"
} ],
ZJH_Help: [ function(e, t, a) {
"use strict";
function n(e) {
if (!i.default.getInstance().zjhGameData || !i.default.getInstance().zjhGameData.seats) return null;
for (var t = 0; t < i.default.getInstance().zjhGameData.seats.length; t++) {
var a = i.default.getInstance().zjhGameData.seats[t];
if (a.accountId === e) return a;
}
return null;
}
cc._RF.push(t, "6a937ZeNq1LvpQ+sE/zB5Mh", "ZJH_Help");
Object.defineProperty(a, "__esModule", {
value: !0
});
var o, i = e("../../Modules/GMManager"), r = e("../../Modules/UDManager");
!function(e) {
e[e.ACT_STATE_DROP = -1] = "ACT_STATE_DROP";
e[e.ACT_STATE_WAIT = 0] = "ACT_STATE_WAIT";
e[e.ACT_STATE_BT = 1] = "ACT_STATE_BT";
}(o = a.ZJH_BT_State || (a.ZJH_BT_State = {}));
!function(e) {
e[e.STATE_TABLE_IDLE = 0] = "STATE_TABLE_IDLE";
e[e.STATE_TABLE_ZJH_READY = 1] = "STATE_TABLE_ZJH_READY";
e[e.STATE_TABLE_ZJH_BASESCORE = 2] = "STATE_TABLE_ZJH_BASESCORE";
e[e.STATE_TABLE_ZJH_FAPAI = 3] = "STATE_TABLE_ZJH_FAPAI";
e[e.STATE_TABLE_ZJH_BET = 4] = "STATE_TABLE_ZJH_BET";
e[e.STATE_TABLE_ZJH_COMPARE = 5] = "STATE_TABLE_ZJH_COMPARE";
e[e.STATE_TABLE_ZJH_OVER = 6] = "STATE_TABLE_ZJH_OVER";
}(a.ZJH_Game_State || (a.ZJH_Game_State = {}));
!function(e) {
e[e.BT_VAL_DROP = 0] = "BT_VAL_DROP";
e[e.BT_VAL_LOOCK = 1] = "BT_VAL_LOOCK";
e[e.BT_VAL_COMPARAE = 2] = "BT_VAL_COMPARAE";
e[e.BT_VAL_BETALL = 3] = "BT_VAL_BETALL";
e[e.BT_VAL_BETSAME = 4] = "BT_VAL_BETSAME";
e[e.BT_VAL_BETADD = 5] = "BT_VAL_BETADD";
}(a.ZJH_Act_State || (a.ZJH_Act_State = {}));
a.sortSeatList = function(e) {
if (!i.default.getInstance().zjhGameData) return null;
var t = n(r.default.getInstance().mineData.accountId);
if (t) {
for (var a = [], o = 0; o < e.length; o++) {
var c = e[o];
c && (a[t.seatIndex > c.seatIndex ? e.length - (t.seatIndex - c.seatIndex) : Math.abs(t.seatIndex - c.seatIndex)] = c);
}
return a;
}
return null;
};
a.getSeatById = n;
a.getSeatBySeatId = function(e) {
if (!i.default.getInstance().zjhGameData || !i.default.getInstance().zjhGameData.seats) return null;
for (var t = 0; t < i.default.getInstance().zjhGameData.seats.length; t++) {
var a = i.default.getInstance().zjhGameData.seats[t];
if (a.seatIndex === e) return a;
}
return null;
};
a.getIndexBySeatId = function(e, t) {
void 0 === t && (t = "");
if (i.default.getInstance().zjhGameData && i.default.getInstance().zjhGameData.seats) for (var a = i.default.getInstance().zjhGameData.seats, n = 0; n < a.length; n++) {
var o = a[n];
if (-1 === e) {
if ("0" !== o.accountId && o.accountId === t) return n;
} else if (o.seatIndex === e) return n;
}
return -1;
};
a.getNowPlayer = function() {
var e = [];
if (i.default.getInstance().zjhGameData && i.default.getInstance().zjhGameData.seats) for (var t = i.default.getInstance().zjhGameData.seats, a = 0; a < t.length; a++) {
var n = t[a];
"" !== n.accountId && "0" !== n.accountId && 1 === n.bGamed && n.btState !== o.ACT_STATE_DROP && e.push(n);
}
return e;
};
a.getEveryIntervalNum = function(e) {
e = Number(e);
for (var t = [ 100, 50, 20, 10, 5, 2, 1 ], a = [ 0, 0, 0, 0, 0, 0, 0 ], n = 0; n < 7; n++) {
a[n] = Math.floor(e / t[n]);
if (e % t[n] == 0) break;
e %= t[n];
}
return a;
};
a.getOneIntervalNum = function(e, t) {
e = Number(e);
var a = [], n = 100 === t ? Math.floor(e / 100) : 0;
a.push(n);
var o = 50 === t ? Math.floor(e / 50) : 0;
a.push(o);
var i = 20 === t ? Math.floor(e / 20) : 0;
a.push(i);
var r = 10 === t ? Math.floor(e / 10) : 0;
a.push(r);
var c = 5 === t ? Math.floor(e / 5) : 0;
a.push(c);
var s = 2 === t ? Math.floor(e / 2) : 0;
a.push(s);
var l = 1 === t ? Math.floor(e / 1) : 0;
a.push(l);
return a;
};
cc._RF.pop();
}, {
"../../Modules/GMManager": "GMManager",
"../../Modules/UDManager": "UDManager"
} ],
ZJH_PlayerUI: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "b9281Tys8NCIqfST09JPz9q", "ZJH_PlayerUI");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = e("./ZJH_Help"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblMoney = null;
t.lblBetGold = null;
t.lblCardType = null;
t.headImg = null;
t.node_dealer = null;
t.node_state = null;
t.node_ready = null;
t.card_board = null;
t.pokerList = [];
t._canvasScript = null;
t._seatInfo = null;
t._isPro = !1;
t._isLook = 0;
return t;
}
__extends(t, e);
t.prototype.init = function() {
this._canvasScript = r.ui_manager.getCanvasNode().getComponent("ZJHCanvas");
this.lblName && (this.lblName.string = "玩家名称");
this.lblMoney.string = "0";
this.lblBetGold.string = "0";
this.lblCardType.string = "";
this.lblBetGold.node.parent.active = !1;
this.lblCardType.node.parent.active = !1;
this.node_dealer.active = !1;
this.releasePokers();
this.node_state && (this.node_state.active = !1);
this.node_ready.active = !1;
this._isLook = 0;
this._isPro = !1;
};
t.prototype.onLoad = function() {
this.init();
};
t.prototype.releasePokers = function() {
for (var e = 0; e < this.pokerList.length; e++) this.pokerList[e].removeAllChildren(!0);
};
t.prototype.resetSeat = function() {
this.lblBetGold.string = "0";
this.lblCardType.string = "";
this.lblBetGold.node.parent.active = !1;
this.lblCardType.node.parent.active = !1;
this.node_dealer.active = !1;
this.releasePokers();
this.node_state && (this.node_state.active = !1);
this.node_ready.active = !1;
this._isLook = 0;
this._isPro = !1;
};
t.prototype.initData = function(e) {
this._seatInfo = e;
if (this._seatInfo.handCards) {
var t = [ r.card_manager.getCardObjById(this._seatInfo.handCards[0]), r.card_manager.getCardObjById(this._seatInfo.handCards[1]), r.card_manager.getCardObjById(this._seatInfo.handCards[2]) ].sort(function(e, t) {
return e.point - t.point;
});
if (2 === t[0].point && 3 === t[1].point && 14 === t[2].point) {
this._seatInfo.handCards[0] = t[2].cardId;
this._seatInfo.handCards[1] = t[0].cardId;
this._seatInfo.handCards[2] = t[1].cardId;
} else for (var a = 0; a < t.length; a++) this._seatInfo.handCards[a] = t[a].cardId;
}
this.showPlayerBascInfo();
};
t.prototype.showPlayerBascInfo = function() {
if (this._seatInfo) {
this.headImg.spriteFrame = r.img_manager.getHeadById(Number(this._seatInfo.headImg));
this.lblName && (this.lblName.string = this._seatInfo.nick);
this.lblMoney.string = r.utils.getShowNumberString(this._seatInfo.money);
var e = r.gm_manager.zjhGameData.gameState;
if (e === c.ZJH_Game_State.STATE_TABLE_ZJH_READY || e === c.ZJH_Game_State.STATE_TABLE_IDLE) {
this.resetSeat();
this._seatInfo.btState === c.ZJH_BT_State.ACT_STATE_BT && (this.node_ready.active = !0);
}
if (e > c.ZJH_Game_State.STATE_TABLE_ZJH_READY) {
this.node_ready.active = !1;
this._seatInfo.accountId === r.gm_manager.zjhGameData.bankerId ? this.node_dealer.active = !0 : this.node_dealer.active = !1;
}
this.showBetGold();
this.showState();
this.showSeatPoker();
this._seatInfo.accountId === r.ud_manager.mineData.accountId && (r.ud_manager.mineData.roomCard = this._seatInfo.money);
}
};
t.prototype.showBetGold = function() {
if (r.gm_manager.zjhGameData.gameState >= c.ZJH_Game_State.STATE_TABLE_ZJH_BASESCORE && 1 === this._seatInfo.bGamed) {
var e = Number(this._seatInfo.betMoney);
this.lblBetGold.node.parent.active = !0;
this.lblBetGold.string = r.utils.getShowNumberString(e);
} else this.lblBetGold.node.parent.active = !1;
};
t.prototype.showState = function() {
var e = r.gm_manager.zjhGameData.gameState;
if (e > c.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI) {
this._seatInfo.btState;
e < c.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE && r.gm_manager.zjhGameData.btIndex === this._seatInfo.seatIndex ? this.showPro(!0) : this.showPro(!1);
}
};
t.prototype.showPro = function(e) {
var t = r.gm_manager.zjhGameData.gameState;
if (e && t < c.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE) {
if (!this._isPro) {
this.node_state.active = !0;
var a = (Number(r.gm_manager.zjhGameData.actTime) - Number(r.gm_manager.zjhGameData.svrTime)) / 1e3;
if (a > 0) {
var n = Number(r.gm_manager.zjhGameData.actTotalTime) / 1e3;
this._isPro = !0;
var o = !1, i = 1;
if (this._seatInfo.accountId === r.ud_manager.mineData.accountId) {
o = !0;
i = 0;
}
cc.size(this.node.width, this.node.height);
this._canvasScript.showSJDAction(i, n - a, n, o, this.node_state);
} else {
this._isPro = !1;
this.node_state.removeAllChildren(!0);
}
}
} else {
this._isPro = !1;
this.node_state.active = !1;
this.node_state.removeAllChildren(!0);
}
};
t.prototype.showSeatPoker = function() {
var e = r.gm_manager.zjhGameData.gameState;
if (!this._seatInfo || !this._seatInfo.handCards || e < c.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI) {
this.releasePokers();
this.lblCardType.node.parent.active = !1;
this._isLook = 0;
} else if (-1 !== this._isLook && !(e === c.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI || e >= c.ZJH_Game_State.STATE_TABLE_ZJH_COMPARE)) {
this.lblCardType.node.parent.active = !0;
if (this._seatInfo.btState === c.ZJH_BT_State.ACT_STATE_DROP) {
this.lblCardType.string = "已弃牌";
this._seatInfo.accountId === r.ud_manager.mineData.accountId ? this.showPokers() : this.showPokers(0, !1);
} else if (1 === this._seatInfo.looked) if (this._seatInfo.accountId === r.ud_manager.mineData.accountId) {
this.showPokers();
this.lblCardType.string = r.card_manager.getCardTypeByIds(this._seatInfo.handCards);
} else {
this.showPokers(-1, !1);
this.lblCardType.string = "已看牌";
} else {
this._isLook = 0;
this.showPokers(-1, !1);
this.lblCardType.string = "未看牌";
}
}
};
t.prototype.showPokerById = function(e, t, a) {
var n = this;
void 0 === t && (t = 0);
void 0 === a && (a = !0);
e > this.pokerList.length - 1 || this._seatInfo.handCards && this.pokerList[e] && (0 === t ? this._canvasScript.showCard(this._seatInfo.handCards[e], this.pokerList[e], a) : this._canvasScript.showFanPai(this._seatInfo.handCards[e], this.pokerList[e], function() {
n.showPokerById(e);
}));
};
t.prototype.showPokers = function(e, t) {
void 0 === e && (e = -1);
void 0 === t && (t = !0);
for (var a = 0; a < this.pokerList.length; a++) {
var n = -1 === e ? this._seatInfo.handCards[a] : e;
this._canvasScript.showCard(n, this.pokerList[a], t);
}
};
t.prototype.getCardBoardPos = function() {
return this.card_board.getPosition();
};
t.prototype.showSeatFPAction = function() {
if (this._seatInfo.accountId === r.ud_manager.mineData.accountId) {
if (0 === this._isLook) {
this.createFPAction(this.showFPCallBack.bind(this));
this._isLook = -1;
}
} else {
this.createFPAction(this.showFPCallBack.bind(this));
this._isLook = -1;
}
};
t.prototype.createFPAction = function(e) {
if (-1 !== this._isLook && this._seatInfo.handCards) for (var t = 0; t < this.pokerList.length; t++) {
this.pokerList[t].removeAllChildren(!0);
0 === t ? this._canvasScript.showFanPai(this._seatInfo.handCards[t], this.pokerList[t], e) : this._canvasScript.showFanPai(this._seatInfo.handCards[t], this.pokerList[t], null);
}
};
t.prototype.showFPCallBack = function() {
this._isLook = 1;
this.showPokers();
this.lblCardType.node.parent.active = !0;
this._seatInfo.btState !== c.ZJH_BT_State.ACT_STATE_DROP ? this.lblCardType.string = r.card_manager.getCardTypeByIds(this._seatInfo.handCards) : this.lblCardType.string = "已弃牌";
this.changeIsSeeBrand();
};
t.prototype.changeIsSeeBrand = function() {
var e = r.gm_manager.zjhGameData;
if (e) for (var t = 0; t < e.seats.length; t++) this._seatInfo.accountId === e.seats[t].accountId && (r.gm_manager.zjhGameData.seats[t].looked = 1);
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblMoney", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblBetGold", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblCardType", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_dealer", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_state", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_ready", void 0);
__decorate([ i(cc.Node) ], t.prototype, "card_board", void 0);
__decorate([ i([ cc.Node ]) ], t.prototype, "pokerList", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./ZJH_Help": "ZJH_Help"
} ],
ZJH_Player: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "c515fy3FFpEy7ia0XjbXAh2", "ZJH_Player");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = e("./ZJH_Help"), s = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.node_player_list = [];
t._canvansScript = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvansScript = r.ui_manager.getCanvasNode().getComponent("ZJHCanvas");
};
t.prototype.resetPlayerInfo = function() {
for (var e = 0; e < this.node_player_list.length; e++) {
var t = this.node_player_list[e];
t && t.getComponent("ZJH_PlayerUI").resetSeat();
}
};
t.prototype.showPlayerInfo = function() {
var e = r.gm_manager.zjhGameData.seats;
if (e && e.length) for (var t = 0; t < e.length; t++) {
var a = e[t], n = this.node_player_list[t];
if (n) if (a && "" !== a.accountId && "0" !== a.accountId) {
n.active = !0;
n.getComponent("ZJH_PlayerUI").initData(a);
} else n.active = !1;
}
};
t.prototype.getFPPosList = function() {
for (var e = {
posList: [],
playerIndexList: []
}, t = 0; t < r.gm_manager.zjhGameData.seats.length; t++) {
var a = r.gm_manager.zjhGameData.seats[t];
if (a && "" !== a.accountId && "0" !== a.accountId && 1 === a.bGamed && a.btState !== c.ZJH_BT_State.ACT_STATE_DROP) {
var n = this.node_player_list[t];
if (n) {
var o = n.getComponent("ZJH_PlayerUI").getCardBoardPos(), i = this.getWorldPos(n, o);
e.posList.push(i);
e.playerIndexList.push(t);
}
}
}
return e;
};
t.prototype.showPokerByIndex = function(e, t, a, n) {
void 0 === a && (a = 0);
void 0 === n && (n = !0);
var o = this.node_player_list[e];
o && o.getComponent("ZJH_PlayerUI").showPokerById(t, a, n);
};
t.prototype.getWorldPos = function(e, t) {
var a = e.convertToWorldSpaceAR(t);
a.x = a.x - this.node.width / 2;
a.y = a.y - this.node.height / 2;
return a;
};
t.prototype.getPosByIndex = function(e) {
if (e < 0 || e >= this.node_player_list.length) {
cc.log("索引错误");
return cc.p(0, 0);
}
var t = this.node_player_list[e];
return t ? this.getWorldPos(this.node, t.getPosition()) : cc.p(0, 0);
};
t.prototype.showAllFPAction = function() {
for (var e = 0; e < r.gm_manager.zjhGameData.seats.length; e++) {
var t = r.gm_manager.zjhGameData.seats[e];
t && "" !== t.accountId && "0" !== t.accountId && 1 === t.bGamed && this.showFPActionBySeatId(t.seatIndex);
}
};
t.prototype.showFPActionBySeatId = function(e) {
var t = c.getIndexBySeatId(e), a = this.node_player_list[t];
a && a.getComponent("ZJH_PlayerUI").showSeatFPAction();
};
t.prototype.getSeatIndexBySeatId = function(e, t) {
return e > t ? 5 - (e - t) : Math.abs(e - t);
};
t.prototype.showPokerShakeAction = function() {
var e = c.getSeatBySeatId(r.gm_manager.zjhGameData.prevSeatIndex);
if (e && e.btVal === c.ZJH_Act_State.BT_VAL_BETALL) this.showShakeBySeat(e); else {
var t = c.getSeatById(r.ud_manager.mineData.accountId), a = 1 === t.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney;
if (t.money <= a) {
var n = this.getNextBtSeat(r.gm_manager.zjhGameData.btIndex);
n && this.showShakeBySeat(n);
} else for (var o = 0; o < r.gm_manager.zjhGameData.seats.length; o++) {
var i = r.gm_manager.zjhGameData.seats[o];
i && "" !== i.accountId && "0" !== i.accountId && 1 === i.bGamed && i.accountId !== r.ud_manager.mineData.accountId && i.btVal !== c.ZJH_Act_State.BT_VAL_DROP && i.btState !== c.ZJH_BT_State.ACT_STATE_DROP && this.showShakeBySeat(i);
}
}
};
t.prototype.showShakeBySeat = function(e) {
var t = c.getIndexBySeatId(e.seatIndex), a = this.node_player_list[t];
if (a) {
var n = a.getComponent("ZJH_PlayerUI").getCardBoardPos(), o = this.getWorldPos(a, n);
this._canvansScript.showShakeAction(e.seatIndex, o);
}
};
t.prototype.getNextBtSeat = function(e) {
for (var t = 0, a = null, n = e + 1; t < this.node_player_list.length; ) {
n %= this.node_player_list.length;
var o = c.getSeatBySeatId(n);
if ("" !== o.accountId && "0" !== o.accountId && 1 === o.bGamed && o.btState !== c.ZJH_BT_State.ACT_STATE_DROP) {
a = o;
break;
}
n++;
t++;
}
return a;
};
__decorate([ i(cc.Node) ], t.prototype, "node_player_list", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = s;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./ZJH_Help": "ZJH_Help"
} ],
ZJH_PokerShake: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "c2123LU0UVCiplp+9LyBkkW", "ZJH_PokerShake");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./ZJH_Help"), o = cc._decorator, i = o.ccclass, r = (o.property, function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._seatId = 0;
t._canvansScript = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
var e = this;
this.node.on("touchend", function(t) {
t.stopPropagation();
e._canvansScript.sendBetInfo(n.ZJH_Act_State.BT_VAL_COMPARAE, e._seatId);
}, this);
};
t.prototype.initData = function(e, t) {
this._seatId = e;
this._canvansScript = t;
};
return t = __decorate([ i ], t);
}(cc.Component));
a.default = r;
cc._RF.pop();
}, {
"./ZJH_Help": "ZJH_Help"
} ],
ZJH_RoomCanvas: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "8ad3eYX16NF3oG5KDy5SGth", "ZJH_RoomCanvas");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../../Modules/ModuleManager"), c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblName = null;
t.lblGold = null;
t.lblStarNo = null;
t.headImg = null;
t.svNode = null;
t.room_item_prefab = null;
t.board_img_list = [];
t.imgTitle = null;
t.title_img_list = [];
t.node_board1 = null;
t.node_board2 = null;
t.layer1 = null;
t.layer2 = null;
t.lblInputList = [];
t._curIndex = 0;
t._cfgData = null;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {};
t.prototype.initInput = function() {
this._curIndex = 0;
for (var e = 0; e < this.lblInputList.length; e++) this.lblInputList[e].string = "";
};
t.prototype.showRoomBoard = function(e, t, a) {
void 0 === t && (t = 0);
this.node_board1.active = 0 === e;
this.node_board2.active = 1 === e;
if (0 === e) ; else {
this.layer1.active = !0;
this.layer2.active = !1;
this.initInput();
this._cfgData = a;
this.imgTitle.spriteFrame = this.title_img_list[t];
}
};
t.prototype.sendJoinRoom = function(e, t) {
var a = {
tableId: e,
type: t
}, n = JSON.stringify(a);
r.ws_manager.sendMsg(r.protocol.ZJH_JION_TABLEID, n, function(e, t) {
if (0 === e) {
r.gm_manager.zjhGameData = t;
cc.director.loadScene("ZJHScene");
} else if (-1 === e) r.ui_manager.hideLoading(); else {
r.ui_manager.showTip(t);
r.ui_manager.hideLoading();
}
cc.log(t);
});
};
t.prototype.sendQuickRoom = function() {
if (r.ui_manager.showLoading()) {
var e = {
cfgId: this._cfgData.cfgId
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ZJH_QUICK_JOIN, t, function(e, t) {
if (0 === e) {
r.gm_manager.zjhGameData = t;
cc.director.loadScene("ZJHScene");
} else if (-1 === e) r.ui_manager.hideLoading(); else {
r.ui_manager.showTip(t);
r.ui_manager.hideLoading();
}
cc.log(t);
});
}
};
t.prototype.sendCreateRoom = function() {
if (r.ui_manager.showLoading()) {
var e = {
cfgId: this._cfgData.cfgId
}, t = JSON.stringify(e);
r.ws_manager.sendMsg(r.protocol.ZJH_TABLE_CREATE, t, function(e, t) {
if (0 === e) {
r.gm_manager.zjhGameData = t;
cc.director.loadScene("ZJHScene");
} else if (-1 === e) r.ui_manager.hideLoading(); else {
r.ui_manager.showTip(t);
r.ui_manager.hideLoading();
}
});
}
};
t.prototype.returnToGame = function() {
r.ud_manager && r.ud_manager.mineData && 0 !== r.ud_manager.mineData.tableId ? r.ui_manager.showLoading("正在重新进入未完成的游戏") && this.sendJoinRoom(r.ud_manager.mineData.tableId + "", 0) : this.showRoomBoard(0);
};
t.prototype.update = function(e) {
if (r.ud_manager && r.ud_manager.mineData) {
this.lblName.string = r.ud_manager.mineData.nick;
this.lblGold.string = r.utils.getShowNumberString(r.ud_manager.mineData.roomCard);
this.lblStarNo.string = "  (ID:" + r.ud_manager.mineData.starNO + ")";
this.headImg.spriteFrame = r.img_manager.getHeadById(Number(r.ud_manager.mineData.headImg));
}
};
t.prototype.init = function(e) {
var t = this;
this.svNode.content.removeAllChildren();
e || (e = []);
for (var a = this, n = 0; n < e.length; n++) !function() {
var o = n, i = cc.instantiate(a.room_item_prefab);
i.getComponent("ZJH_Room_Item").updateItem(e[n], n, a, function(e) {
t.showRoomBoard(1, o, e);
});
i.parent = a.svNode.content;
}();
this.returnToGame();
};
t.prototype.click_btn_grade = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "0":
this.layer1.active = !1;
this.layer2.active = !0;
break;

case "1":
this.sendCreateRoom();
break;

case "2":
this.sendQuickRoom();
}
};
t.prototype.click_btn_input = function(e, t) {
r.mp_manager.playButton();
switch (t) {
case "10":
this.deleteLastInput();
break;

case "11":
this.joinRoom();
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
t.prototype.joinRoom = function() {
if (this._curIndex === this.lblInputList.length) {
cc.log("输入完毕");
for (var e = "", t = 0; t < this.lblInputList.length; t++) e += this.lblInputList[t].string;
r.ui_manager.showLoading() && this.sendJoinRoom(e, 1);
} else r.ui_manager.showTip("请输入6位房间号");
};
t.prototype.showInputNum = function(e) {
r.mp_manager.playButton();
if (this._curIndex < this.lblInputList.length) {
this.lblInputList[this._curIndex].string = e;
this._curIndex < this.lblInputList.length && this._curIndex++;
}
};
t.prototype.click_btn_out = function() {
r.mp_manager.playButton();
if (this.node_board1.active) r.ui_manager.showLoading() && cc.director.loadScene("HomeScene"); else if (this.layer1.active) this.showRoomBoard(0); else {
this.initInput();
this.layer1.active = !0;
this.layer2.active = !1;
}
};
__decorate([ i(cc.Label) ], t.prototype, "lblName", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblGold", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblStarNo", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "headImg", void 0);
__decorate([ i(cc.ScrollView) ], t.prototype, "svNode", void 0);
__decorate([ i(cc.Prefab) ], t.prototype, "room_item_prefab", void 0);
__decorate([ i(cc.SpriteFrame) ], t.prototype, "board_img_list", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "imgTitle", void 0);
__decorate([ i([ cc.SpriteFrame ]) ], t.prototype, "title_img_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_board1", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_board2", void 0);
__decorate([ i(cc.Node) ], t.prototype, "layer1", void 0);
__decorate([ i(cc.Node) ], t.prototype, "layer2", void 0);
__decorate([ i([ cc.Label ]) ], t.prototype, "lblInputList", void 0);
return t = __decorate([ o ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../../Modules/ModuleManager": "ModuleManager"
} ],
ZJH_Room_Item: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "cb4dfaKHPhLhLDDyZzNAhor", "ZJH_Room_Item");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = e("./../../../Modules/ModuleManager"), o = cc._decorator, i = o.ccclass, r = o.property, c = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lblGrade = null;
t.lblLimit = null;
t.lblBase = null;
t.lblMax = null;
t.img_board = null;
t._itemData = null;
t._cb = null;
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
this._cb = o;
if (e) {
this.img_board.spriteFrame = a.board_img_list[t];
this.lblGrade.string = n.utils.getShowNumberString(e.joinLimit);
this.lblBase.string = n.utils.getShowNumberString(e.joinLimit) + "金币准入";
this.lblLimit.string = "底注" + n.utils.getShowNumberString(e.baseScore) + "金币";
this.lblMax.string = "单注封顶" + n.utils.getShowNumberString(e.onceMax) + "金币";
}
};
__decorate([ r(cc.Label) ], t.prototype, "lblGrade", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblLimit", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblBase", void 0);
__decorate([ r(cc.Label) ], t.prototype, "lblMax", void 0);
__decorate([ r(cc.Sprite) ], t.prototype, "img_board", void 0);
return t = __decorate([ i ], t);
}(cc.Component);
a.default = c;
cc._RF.pop();
}, {
"./../../../Modules/ModuleManager": "ModuleManager"
} ],
ZJH_Table: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "8780bzgXOZKnaOJ/l/8FY7s", "ZJH_Table");
Object.defineProperty(a, "__esModule", {
value: !0
});
var n = cc._decorator, o = n.ccclass, i = n.property, r = e("./../../Modules/ModuleManager"), c = e("./Game_GoldBase"), s = e("./ZJH_Help"), l = function(e) {
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.toggle_gz = null;
t.lblRoomId = null;
t.lblOnceMax = null;
t.lblScore = null;
t.lblBetCount = null;
t.lblRound = null;
t.lblClockTime = null;
t.node_clock = null;
t.clock_pro = null;
t.btn_state_list = [];
t.node_btnLayer = null;
t.betLayer = null;
t.node_addLayer = null;
t.node_mySeat = null;
t.node_ready = null;
t.lblAddBetList = [];
t.btn_addBet_list = [];
t._canvansScript = null;
t._clockTime = 0;
t._cd = 0;
t._clock_countTime = 0;
t._clock_pro_curTime = 0;
return t;
}
__extends(t, e);
t.prototype.onLoad = function() {
this._canvansScript = r.ui_manager.getCanvasNode().getComponent("ZJHCanvas");
};
t.prototype.initBetBtn = function() {
for (var e = 0; e < this.btn_state_list.length; e++) this.btn_state_list[e].interactable = !1;
};
t.prototype.update = function(e) {
if (this._clockTime > 0) {
this._cd -= e;
if (this._cd <= 0) {
this._cd = 1;
this.lblClockTime.string = this._clockTime + "";
--this._clockTime <= 5 && r.mp_manager.playTime();
}
}
if (this._clock_pro_curTime <= this._clock_countTime) {
this._clock_pro_curTime += e;
var t = this._clock_pro_curTime / this._clock_countTime;
t = t < 0 ? 0 : t > 1 ? 1 : t;
this.clock_pro.fillRange = 1 - t;
} else this.clock_pro.fillRange = 0;
};
t.prototype.showTableBase = function() {
this.lblRoomId.string = "房间号 " + r.gm_manager.zjhGameData.tableId;
this.lblBetCount.string = "押注池 " + r.utils.getShowNumberString(r.gm_manager.zjhGameData.totalBetMoney);
this.lblScore.string = "底分 " + r.utils.getShowNumberString(r.gm_manager.zjhGameData.baseScore);
this.lblRound.string = "轮数 " + r.gm_manager.zjhGameData.roundNum;
this.lblOnceMax.string = r.utils.getShowNumberString(r.gm_manager.zjhGameData.onceMax);
};
t.prototype.showTableInfo = function() {
this.showTableBase();
var e = s.getSeatById(r.ud_manager.mineData.accountId), t = r.gm_manager.zjhGameData.gameState;
if (t === s.ZJH_Game_State.STATE_TABLE_ZJH_READY || t === s.ZJH_Game_State.STATE_TABLE_IDLE) {
this.removeAllEnemyNode(this.betLayer);
e.btState === s.ZJH_BT_State.ACT_STATE_WAIT ? this.node_ready.active = !0 : this.node_ready.active = !1;
if (t === s.ZJH_Game_State.STATE_TABLE_ZJH_READY) {
this._clockTime = (Number(r.gm_manager.zjhGameData.actTime) - Number(r.gm_manager.zjhGameData.svrTime)) / 1e3 - 1;
this._clock_countTime = Number(r.gm_manager.zjhGameData.actTotalTime) / 1e3;
this._clock_pro_curTime = this._clock_countTime - this._clockTime;
this.lblClockTime.string = this._clockTime + "";
this._cd = 1;
this.node_clock.active = !0;
} else this.node_clock.active = !1;
} else {
this.node_ready.active = !1;
this.node_clock.active = !1;
}
this.showBtmInfo(0);
if (t > s.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI && t < s.ZJH_Game_State.STATE_TABLE_ZJH_OVER && 0 === this.betLayer.childrenCount && r.gm_manager.zjhGameData.totalBetMoney > 0) {
var a = s.getEveryIntervalNum(r.gm_manager.zjhGameData.totalBetMoney);
this.createMoreGold(a, this.betLayer);
}
t === s.ZJH_Game_State.STATE_TABLE_ZJH_OVER && (this.toggle_gz.isChecked = !1);
};
t.prototype.showAddReturnToState = function() {
this.node_addLayer.active && this.showBtmInfo(0);
};
t.prototype.showBtmInfo = function(e) {
var t = r.gm_manager.zjhGameData.gameState;
t !== s.ZJH_Game_State.STATE_TABLE_ZJH_READY && t !== s.ZJH_Game_State.STATE_TABLE_IDLE || this.removeAllEnemyNode(this.betLayer);
var a = s.getSeatById(r.ud_manager.mineData.accountId);
if (t === s.ZJH_Game_State.STATE_TABLE_ZJH_BET) if (a && a.btState === s.ZJH_BT_State.ACT_STATE_WAIT && a.seatIndex === r.gm_manager.zjhGameData.btIndex) this.showBtmLayer(e); else {
this.node_addLayer.active = !1;
this.node_btnLayer.active = !0;
this.node_mySeat.active = !0;
this.initBetBtn();
} else {
this.node_addLayer.active = !1;
this.node_btnLayer.active = !0;
this.node_mySeat.active = !0;
this.initBetBtn();
}
if (t > s.ZJH_Game_State.STATE_TABLE_ZJH_FAPAI && t < s.ZJH_Game_State.STATE_TABLE_ZJH_OVER && a && a.bGamed && a.btState !== s.ZJH_BT_State.ACT_STATE_DROP && a.btVal !== s.ZJH_Act_State.BT_VAL_DROP && a.btVal !== s.ZJH_Act_State.BT_VAL_COMPARAE) {
this.btn_state_list[1].interactable = 1 !== a.looked;
this.btn_state_list[0].interactable = a.btState !== s.ZJH_BT_State.ACT_STATE_DROP;
}
};
t.prototype.showBtmLayer = function(e) {
var t = s.getSeatById(r.ud_manager.mineData.accountId);
0 === e ? this.showStateLayer(t) : this.showAddBetLayer(t);
this.node_addLayer.active = 1 === e;
this.node_btnLayer.active = 0 === e;
this.node_mySeat.active = 0 === e;
};
t.prototype.showStateLayer = function(e) {
if (e.btState === s.ZJH_BT_State.ACT_STATE_DROP || e.btVal === s.ZJH_Act_State.BT_VAL_DROP || e.btVal === s.ZJH_Act_State.BT_VAL_COMPARAE) this.initBetBtn(); else {
var t = 1 === e.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney, a = s.getSeatBySeatId(r.gm_manager.zjhGameData.prevSeatIndex);
if (a && a.btVal === s.ZJH_Act_State.BT_VAL_BETALL || e.money <= t) {
this.btn_state_list[2].interactable = !0;
this.btn_state_list[3].interactable = !1;
this.btn_state_list[4].interactable = !1;
this.btn_state_list[5].interactable = !1;
this.toggle_gz.isChecked = !1;
} else {
if (this.toggle_gz.isChecked) {
var n = 1 === e.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney;
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_BETSAME, n);
}
t > r.gm_manager.zjhGameData.onceMax && (t = r.gm_manager.zjhGameData.onceMax);
if (e.money >= t) {
if (t >= r.gm_manager.zjhGameData.onceMax) {
this.btn_state_list[4].interactable = !0;
this.btn_state_list[5].interactable = !1;
} else {
this.btn_state_list[4].interactable = !0;
this.btn_state_list[5].interactable = !0;
}
r.gm_manager.zjhGameData.roundNum > 2 ? this.btn_state_list[2].interactable = !0 : this.btn_state_list[2].interactable = !1;
} else {
this.toggle_gz.isChecked = !1;
this.btn_state_list[2].interactable = !1;
this.btn_state_list[4].interactable = !1;
this.btn_state_list[5].interactable = !1;
}
2 === s.getNowPlayer().length && r.gm_manager.zjhGameData.roundNum > 1 ? this.btn_state_list[3].interactable = !0 : this.btn_state_list[3].interactable = !1;
}
}
};
t.prototype.showAddBetLayer = function(e) {
r.gm_manager.zjhGameData.baseScore;
var t = r.gm_manager.zjhGameData.onceMax, a = 1 === e.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney;
a > r.gm_manager.zjhGameData.onceMax && (a = r.gm_manager.zjhGameData.onceMax);
var n = t - a;
if (n < this.lblAddBetList.length) for (c = 0; c < this.lblAddBetList.length; c++) if (c < n) {
this.lblAddBetList[c].node.parent.active = !0;
this.lblAddBetList[c].string = c + 1 + "";
var o = cc.find("line", this.lblAddBetList[c].node.parent);
o && (o.active = c !== n - 1);
} else this.lblAddBetList[c].node.parent.active = !1; else {
this.lblAddBetList[this.lblAddBetList.length - 1].node.parent.active = !0;
this.lblAddBetList[this.lblAddBetList.length - 1].string = r.utils.getShowNumberString(n);
for (var i = n / this.lblAddBetList.length, c = 0; c < this.lblAddBetList.length - 1; c++) {
this.lblAddBetList[c].node.parent.active = !0;
this.lblAddBetList[c].string = Math.round(r.utils.getShowNumberString(i * (c + 1))) + "";
}
}
for (c = 0; c < this.lblAddBetList.length; c++) Number(this.lblAddBetList[c].string) > e.money ? this.btn_addBet_list[c].interactable = !1 : this.btn_addBet_list[c].interactable = !0;
};
t.prototype.click_btn_state = function(e, t) {
r.mp_manager.playButton();
cc.log("click_btn_state--+" + t);
if (this.btn_state_list[Number(t)].interactable) {
var a = s.getSeatById(r.ud_manager.mineData.accountId);
if (a) switch (t) {
case "0":
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_DROP, 0);
break;

case "1":
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_LOOCK, a.seatIndex);
break;

case "2":
this._canvansScript.showChooseBPAction();
break;

case "3":
for (var n = s.getNowPlayer(), o = [], i = 0; i < n.length; i++) {
var c = n[i].money + n[i].betMoney;
o.push(c);
}
o.sort(function(e, t) {
return e - t;
});
var l = o[0];
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_BETALL, l);
break;

case "4":
var _ = 1 === a.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney;
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_BETSAME, _);
break;

case "5":
this.showBtmLayer(1);
}
}
};
t.prototype.click_btn_addBet = function(e, t) {
r.mp_manager.playButton();
var a = Number(t);
if (this.btn_addBet_list[a].interactable) {
var n = Number(this.lblAddBetList[a].string), o = s.getSeatById(r.ud_manager.mineData.accountId);
if (o) {
var i = n + (1 === o.looked ? r.gm_manager.zjhGameData.lookBetMoney : r.gm_manager.zjhGameData.unLookBetMoney);
cc.log("---加注---+" + n);
this._canvansScript.sendBetInfo(s.ZJH_Act_State.BT_VAL_BETADD, i);
this.showBtmLayer(0);
}
}
};
t.prototype.click_btn_out = function() {
var e = this;
r.mp_manager.playButton();
r.ui_manager.showAlert("您确定退出游戏吗？", "温馨提示", {
lbl_name: "确定",
callback: function() {
e._canvansScript.sendOutGame();
}
}, {
lbl_name: "取消",
callback: function() {}
}, 1);
};
t.prototype.click_btn_ready = function() {
r.mp_manager.playButton();
this._canvansScript.sendReadyGame();
};
t.prototype.playGoldAction = function(e, t) {
var a = s.getEveryIntervalNum(t), n = cc.v2(this.betLayer.width, this.betLayer.height);
this.playGoldMoveToPool(e, a, n, r.ui_manager.getRootNode(), this.betLayer);
};
t.prototype.playWinGoldAction = function(e, t, a) {
void 0 === t && (t = null);
void 0 === a && (a = null);
r.mp_manager.playZJH("coins");
this.playGoldMoveToPlayer(e, this.betLayer, t, a, !0, cc.v2(60, 60));
};
__decorate([ i(cc.Toggle) ], t.prototype, "toggle_gz", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRoomId", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblOnceMax", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblScore", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblBetCount", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblRound", void 0);
__decorate([ i(cc.Label) ], t.prototype, "lblClockTime", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_clock", void 0);
__decorate([ i(cc.Sprite) ], t.prototype, "clock_pro", void 0);
__decorate([ i({
type: [ cc.Button ],
tooltip: "0=弃牌\n1=看牌\n2=比牌\n3=全押\n4=跟注\n5=加注"
}) ], t.prototype, "btn_state_list", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_btnLayer", void 0);
__decorate([ i(cc.Node) ], t.prototype, "betLayer", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_addLayer", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_mySeat", void 0);
__decorate([ i(cc.Node) ], t.prototype, "node_ready", void 0);
__decorate([ i([ cc.Label ]) ], t.prototype, "lblAddBetList", void 0);
__decorate([ i([ cc.Button ]) ], t.prototype, "btn_addBet_list", void 0);
return t = __decorate([ o ], t);
}(c.default);
a.default = l;
cc._RF.pop();
}, {
"./../../Modules/ModuleManager": "ModuleManager",
"./Game_GoldBase": "Game_GoldBase",
"./ZJH_Help": "ZJH_Help"
} ]
}, {}, [ "CardManager", "Config", "ENCManager", "GMManager", "IMGManager", "MPManager", "ModuleManager", "Protocol", "UDManager", "UIManager", "Utils", "WSManager", "Action", "Exchange", "HomeCanvas", "Recharge", "Service", "Setting", "LoadCanvas", "LoginCanvas", "NNBattleCanvas", "NNRoomCanvas", "Game_ActionFP", "Game_Card", "Game_DealScript", "Game_Gold", "Game_GoldBase", "Game_TimeDown", "ZJH_RoomCanvas", "ZJH_Room_Item", "ZJHCanvas", "ZJH_ActionPK", "ZJH_Help", "ZJH_Player", "ZJH_PlayerUI", "ZJH_PokerShake", "ZJH_Table", "Alert", "BtnScale", "DDLabel", "Loading", "Tip", "Toggle_AddLabel" ]);