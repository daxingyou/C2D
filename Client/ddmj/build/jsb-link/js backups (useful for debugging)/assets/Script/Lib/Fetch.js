!function(t) {
"use strict";
function e(t) {
"string" != typeof t && (t = String(t));
if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
return t.toLowerCase();
}
function r(t) {
"string" != typeof t && (t = String(t));
return t;
}
function o(t) {
var e = {
next: function() {
var e = t.shift();
return {
done: void 0 === e,
value: e
};
}
};
m.iterable && (e[Symbol.iterator] = function() {
return e;
});
return e;
}
function n(t) {
this.map = {};
t instanceof n ? t.forEach(function(t, e) {
this.append(e, t);
}, this) : Array.isArray(t) ? t.forEach(function(t) {
this.append(t[0], t[1]);
}, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
this.append(e, t[e]);
}, this);
}
function i(t) {
if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
t.bodyUsed = !0;
}
function s(t) {
return new Promise(function(e, r) {
t.onload = function() {
e(t.result);
};
t.onerror = function() {
r(t.error);
};
});
}
function a(t) {
var e = new FileReader(), r = s(e);
e.readAsArrayBuffer(t);
return r;
}
function u(t) {
var e = new FileReader(), r = s(e);
e.readAsText(t);
return r;
}
function h(t) {
for (var e = new Uint8Array(t), r = new Array(e.length), o = 0; o < e.length; o++) r[o] = String.fromCharCode(e[o]);
return r.join("");
}
function f(t) {
if (t.slice) return t.slice(0);
var e = new Uint8Array(t.byteLength);
e.set(new Uint8Array(t));
return e.buffer;
}
function d() {
this.bodyUsed = !1;
this._initBody = function(t) {
this._bodyInit = t;
if (t) if ("string" == typeof t) this._bodyText = t; else if (m.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t; else if (m.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t; else if (m.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString(); else if (m.arrayBuffer && m.blob && v(t)) {
this._bodyArrayBuffer = f(t.buffer);
this._bodyInit = new Blob([ this._bodyArrayBuffer ]);
} else {
if (!m.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !B(t)) throw new Error("unsupported BodyInit type");
this._bodyArrayBuffer = f(t);
} else this._bodyText = "";
this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : m.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
};
if (m.blob) {
this.blob = function() {
var t = i(this);
if (t) return t;
if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
if (this._bodyArrayBuffer) return Promise.resolve(new Blob([ this._bodyArrayBuffer ]));
if (this._bodyFormData) throw new Error("could not read FormData body as blob");
return Promise.resolve(new Blob([ this._bodyText ]));
};
this.arrayBuffer = function() {
return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(a);
};
}
this.text = function() {
var t = i(this);
if (t) return t;
if (this._bodyBlob) return u(this._bodyBlob);
if (this._bodyArrayBuffer) return Promise.resolve(h(this._bodyArrayBuffer));
if (this._bodyFormData) throw new Error("could not read FormData body as text");
return Promise.resolve(this._bodyText);
};
m.formData && (this.formData = function() {
return this.text().then(c);
});
this.json = function() {
return this.text().then(JSON.parse);
};
return this;
}
function y(t) {
var e = t.toUpperCase();
return _.indexOf(e) > -1 ? e : t;
}
function p(t, e) {
var r = (e = e || {}).body;
if (t instanceof p) {
if (t.bodyUsed) throw new TypeError("Already read");
this.url = t.url;
this.credentials = t.credentials;
e.headers || (this.headers = new n(t.headers));
this.method = t.method;
this.mode = t.mode;
if (!r && null != t._bodyInit) {
r = t._bodyInit;
t.bodyUsed = !0;
}
} else this.url = String(t);
this.credentials = e.credentials || this.credentials || "omit";
!e.headers && this.headers || (this.headers = new n(e.headers));
this.method = y(e.method || this.method || "GET");
this.mode = e.mode || this.mode || null;
this.referrer = null;
if (("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
this._initBody(r);
}
function c(t) {
var e = new FormData();
t.trim().split("&").forEach(function(t) {
if (t) {
var r = t.split("="), o = r.shift().replace(/\+/g, " "), n = r.join("=").replace(/\+/g, " ");
e.append(decodeURIComponent(o), decodeURIComponent(n));
}
});
return e;
}
function l(t) {
var e = new n();
t.split(/\r?\n/).forEach(function(t) {
var r = t.split(":"), o = r.shift().trim();
if (o) {
var n = r.join(":").trim();
e.append(o, n);
}
});
return e;
}
function b(t, e) {
e || (e = {});
this.type = "default";
this.status = "status" in e ? e.status : 200;
this.ok = this.status >= 200 && this.status < 300;
this.statusText = "statusText" in e ? e.statusText : "OK";
this.headers = new n(e.headers);
this.url = e.url || "";
this._initBody(t);
}
if (!t.fetch) {
var m = {
searchParams: "URLSearchParams" in t,
iterable: "Symbol" in t && "iterator" in Symbol,
blob: "FileReader" in t && "Blob" in t && function() {
try {
new Blob();
return !0;
} catch (t) {
return !1;
}
}(),
formData: "FormData" in t,
arrayBuffer: "ArrayBuffer" in t
};
if (m.arrayBuffer) var w = [ "[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]" ], v = function(t) {
return t && DataView.prototype.isPrototypeOf(t);
}, B = ArrayBuffer.isView || function(t) {
return t && w.indexOf(Object.prototype.toString.call(t)) > -1;
};
n.prototype.append = function(t, o) {
t = e(t);
o = r(o);
var n = this.map[t];
this.map[t] = n ? n + "," + o : o;
};
n.prototype.delete = function(t) {
delete this.map[e(t)];
};
n.prototype.get = function(t) {
t = e(t);
return this.has(t) ? this.map[t] : null;
};
n.prototype.has = function(t) {
return this.map.hasOwnProperty(e(t));
};
n.prototype.set = function(t, o) {
this.map[e(t)] = r(o);
};
n.prototype.forEach = function(t, e) {
for (var r in this.map) this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
};
n.prototype.keys = function() {
var t = [];
this.forEach(function(e, r) {
t.push(r);
});
return o(t);
};
n.prototype.values = function() {
var t = [];
this.forEach(function(e) {
t.push(e);
});
return o(t);
};
n.prototype.entries = function() {
var t = [];
this.forEach(function(e, r) {
t.push([ r, e ]);
});
return o(t);
};
m.iterable && (n.prototype[Symbol.iterator] = n.prototype.entries);
var _ = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
p.prototype.clone = function() {
return new p(this, {
body: this._bodyInit
});
};
d.call(p.prototype);
d.call(b.prototype);
b.prototype.clone = function() {
return new b(this._bodyInit, {
status: this.status,
statusText: this.statusText,
headers: new n(this.headers),
url: this.url
});
};
b.error = function() {
var t = new b(null, {
status: 0,
statusText: ""
});
t.type = "error";
return t;
};
var A = [ 301, 302, 303, 307, 308 ];
b.redirect = function(t, e) {
if (-1 === A.indexOf(e)) throw new RangeError("Invalid status code");
return new b(null, {
status: e,
headers: {
location: t
}
});
};
t.Headers = n;
t.Request = p;
t.Response = b;
t.fetch = function(t, e) {
return new Promise(function(r, o) {
var n = new p(t, e), i = new XMLHttpRequest();
i.onload = function() {
var t = {
status: i.status,
statusText: i.statusText,
headers: l(i.getAllResponseHeaders() || "")
};
t.url = "responseURL" in i ? i.responseURL : t.headers.get("X-Request-URL");
var e = "response" in i ? i.response : i.responseText;
r(new b(e, t));
};
i.onerror = function() {
o(new TypeError("Network request failed"));
};
i.ontimeout = function() {
o(new TypeError("Network request failed"));
};
i.open(n.method, n.url, !0);
"include" === n.credentials && (i.withCredentials = !0);
"responseType" in i && m.blob && (i.responseType = "blob");
n.headers.forEach(function(t, e) {
i.setRequestHeader(e, t);
});
i.send("undefined" == typeof n._bodyInit ? null : n._bodyInit);
});
};
t.fetch.polyfill = !0;
}
}(window);