!function(e) {
function n() {}
function t(e, n) {
return function() {
e.apply(n, arguments);
};
}
function o(e) {
if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
if ("function" != typeof e) throw new TypeError("not a function");
this._state = 0;
this._handled = !1;
this._value = void 0;
this._deferreds = [];
s(e, this);
}
function i(e, n) {
for (;3 === e._state; ) e = e._value;
if (0 !== e._state) {
e._handled = !0;
o._immediateFn(function() {
var t = 1 === e._state ? n.onFulfilled : n.onRejected;
if (null !== t) {
var o;
try {
o = t(e._value);
} catch (e) {
f(n.promise, e);
return;
}
r(n.promise, o);
} else (1 === e._state ? r : f)(n.promise, e._value);
});
} else e._deferreds.push(n);
}
function r(e, n) {
try {
if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
if (n && ("object" == typeof n || "function" == typeof n)) {
var i = n.then;
if (n instanceof o) {
e._state = 3;
e._value = n;
u(e);
return;
}
if ("function" == typeof i) {
s(t(i, n), e);
return;
}
}
e._state = 1;
e._value = n;
u(e);
} catch (n) {
f(e, n);
}
}
function f(e, n) {
e._state = 2;
e._value = n;
u(e);
}
function u(e) {
2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
e._handled || o._unhandledRejectionFn(e._value);
});
for (var n = 0, t = e._deferreds.length; n < t; n++) i(e, e._deferreds[n]);
e._deferreds = null;
}
function c(e, n, t) {
this.onFulfilled = "function" == typeof e ? e : null;
this.onRejected = "function" == typeof n ? n : null;
this.promise = t;
}
function s(e, n) {
var t = !1;
try {
e(function(e) {
if (!t) {
t = !0;
r(n, e);
}
}, function(e) {
if (!t) {
t = !0;
f(n, e);
}
});
} catch (e) {
if (t) return;
t = !0;
f(n, e);
}
}
var a = setTimeout;
o.prototype.catch = function(e) {
return this.then(null, e);
};
o.prototype.then = function(e, t) {
var o = new this.constructor(n);
i(this, new c(e, t, o));
return o;
};
o.all = function(e) {
var n = Array.prototype.slice.call(e);
return new o(function(e, t) {
function o(r, f) {
try {
if (f && ("object" == typeof f || "function" == typeof f)) {
var u = f.then;
if ("function" == typeof u) {
u.call(f, function(e) {
o(r, e);
}, t);
return;
}
}
n[r] = f;
0 == --i && e(n);
} catch (e) {
t(e);
}
}
if (0 === n.length) return e([]);
for (var i = n.length, r = 0; r < n.length; r++) o(r, n[r]);
});
};
o.resolve = function(e) {
return e && "object" == typeof e && e.constructor === o ? e : new o(function(n) {
n(e);
});
};
o.reject = function(e) {
return new o(function(n, t) {
t(e);
});
};
o.race = function(e) {
return new o(function(n, t) {
for (var o = 0, i = e.length; o < i; o++) e[o].then(n, t);
});
};
o._immediateFn = "function" == typeof setImmediate && function(e) {
setImmediate(e);
} || function(e) {
a(e, 0);
};
o._unhandledRejectionFn = function(e) {
"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
};
o._setImmediateFn = function(e) {
o._immediateFn = e;
};
o._setUnhandledRejectionFn = function(e) {
o._unhandledRejectionFn = e;
};
"undefined" != typeof module && module.exports ? module.exports = o : e.Promise || (e.Promise = o);
}(window);