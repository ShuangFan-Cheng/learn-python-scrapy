/*
* start: 2026/2/1 16:29
* end: 2026/2/1 16:29
* title: 
*/


!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.JSEncrypt = {})
}(this, function(t) {
    "use strict";
    var e = "0123456789abcdefghijklmnopqrstuvwxyz";
    function a(t) {
        return e.charAt(t)
    }
    function i(t, e) {
        return t & e
    }
    function u(t, e) {
        return t | e
    }
    function r(t, e) {
        return t ^ e
    }
    function n(t, e) {
        return t & ~e
    }
    function s(t) {
        if (0 == t)
            return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
        e += 16),
        0 == (255 & t) && (t >>= 8,
        e += 8),
        0 == (15 & t) && (t >>= 4,
        e += 4),
        0 == (3 & t) && (t >>= 2,
        e += 2),
        0 == (1 & t) && ++e,
        e
    }
    function o(t) {
        for (var e = 0; 0 != t; )
            t &= t - 1,
            ++e;
        return e
    }
    var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function c(t) {
        var e, i, r = "";
        for (e = 0; e + 3 <= t.length; e += 3)
            i = parseInt(t.substring(e, e + 3), 16),
            r += h.charAt(i >> 6) + h.charAt(63 & i);
        for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16),
        r += h.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16),
        r += h.charAt(i >> 2) + h.charAt((3 & i) << 4)); 0 < (3 & r.length); )
            r += "=";
        return r
    }
    function f(t) {
        var e, i = "", r = 0, n = 0;
        for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
            var s = h.indexOf(t.charAt(e));
            s < 0 || (0 == r ? (i += a(s >> 2),
            n = 3 & s,
            r = 1) : 1 == r ? (i += a(n << 2 | s >> 4),
            n = 15 & s,
            r = 2) : 2 == r ? (i += a(n),
            i += a(s >> 2),
            n = 3 & s,
            r = 3) : (i += a(n << 2 | s >> 4),
            i += a(15 & s),
            r = 0))
        }
        return 1 == r && (i += a(n << 2)),
        i
    }
    var l, p = function(t, e) {
        return (p = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    };
    var g, d = function(t) {
        var e;
        if (void 0 === l) {
            var i = "0123456789ABCDEF"
              , r = " \f\n\r\t聽\u2028\u2029";
            for (l = {},
            e = 0; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (i = i.toLowerCase(),
            e = 10; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (e = 0; e < r.length; ++e)
                l[r.charAt(e)] = -1
        }
        var n = []
          , s = 0
          , o = 0;
        for (e = 0; e < t.length; ++e) {
            var h = t.charAt(e);
            if ("=" == h)
                break;
            if (-1 != (h = l[h])) {
                if (void 0 === h)
                    throw new Error("Illegal character at offset " + e);
                s |= h,
                2 <= ++o ? (n[n.length] = s,
                o = s = 0) : s <<= 4
            }
        }
        if (o)
            throw new Error("Hex encoding incomplete: 4 bits missing");
        return n
    }, v = {
        decode: function(t) {
            var e;
            if (void 0 === g) {
                var i = "= \f\n\r\t聽\u2028\u2029";
                for (g = Object.create(null),
                e = 0; e < 64; ++e)
                    g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                for (e = 0; e < i.length; ++e)
                    g[i.charAt(e)] = -1
            }
            var r = []
              , n = 0
              , s = 0;
            for (e = 0; e < t.length; ++e) {
                var o = t.charAt(e);
                if ("=" == o)
                    break;
                if (-1 != (o = g[o])) {
                    if (void 0 === o)
                        throw new Error("Illegal character at offset " + e);
                    n |= o,
                    4 <= ++s ? (r[r.length] = n >> 16,
                    r[r.length] = n >> 8 & 255,
                    r[r.length] = 255 & n,
                    s = n = 0) : n <<= 6
                }
            }
            switch (s) {
            case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
                r[r.length] = n >> 10;
                break;
            case 3:
                r[r.length] = n >> 16,
                r[r.length] = n >> 8 & 255
            }
            return r
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function(t) {
            var e = v.re.exec(t);
            if (e)
                if (e[1])
                    t = e[1];
                else {
                    if (!e[2])
                        throw new Error("RegExp out of sync");
                    t = e[2]
                }
            return v.decode(t)
        }
    }, m = 1e13, y = function() {
        function t(t) {
            this.buf = [+t || 0]
        }
        return t.prototype.mulAdd = function(t, e) {
            var i, r, n = this.buf, s = n.length;
            for (i = 0; i < s; ++i)
                (r = n[i] * t + e) < m ? e = 0 : r -= (e = 0 | r / m) * m,
                n[i] = r;
            0 < e && (n[i] = e)
        }
        ,
        t.prototype.sub = function(t) {
            var e, i, r = this.buf, n = r.length;
            for (e = 0; e < n; ++e)
                (i = r[e] - t) < 0 ? (i += m,
                t = 1) : t = 0,
                r[e] = i;
            for (; 0 === r[r.length - 1]; )
                r.pop()
        }
        ,
        t.prototype.toString = function(t) {
            if (10 != (t || 10))
                throw new Error("only base 10 is supported");
            for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r)
                i += (m + e[r]).toString().substring(1);
            return i
        }
        ,
        t.prototype.valueOf = function() {
            for (var t = this.buf, e = 0, i = t.length - 1; 0 <= i; --i)
                e = e * m + t[i];
            return e
        }
        ,
        t.prototype.simplify = function() {
            var t = this.buf;
            return 1 == t.length ? t[0] : this
        }
        ,
        t
    }(), b = "鈥�", T = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, S = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function E(t, e) {
        return t.length > e && (t = t.substring(0, e) + b),
        t
    }
    var w, D = function() {
        function i(t, e) {
            this.hexDigits = "0123456789ABCDEF",
            t instanceof i ? (this.enc = t.enc,
            this.pos = t.pos) : (this.enc = t,
            this.pos = e)
        }
        return i.prototype.get = function(t) {
            if (void 0 === t && (t = this.pos++),
            t >= this.enc.length)
                throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
            return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
        }
        ,
        i.prototype.hexByte = function(t) {
            return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
        }
        ,
        i.prototype.hexDump = function(t, e, i) {
            for (var r = "", n = t; n < e; ++n)
                if (r += this.hexByte(this.get(n)),
                !0 !== i)
                    switch (15 & n) {
                    case 7:
                        r += "  ";
                        break;
                    case 15:
                        r += "\n";
                        break;
                    default:
                        r += " "
                    }
            return r
        }
        ,
        i.prototype.isASCII = function(t, e) {
            for (var i = t; i < e; ++i) {
                var r = this.get(i);
                if (r < 32 || 176 < r)
                    return !1
            }
            return !0
        }
        ,
        i.prototype.parseStringISO = function(t, e) {
            for (var i = "", r = t; r < e; ++r)
                i += String.fromCharCode(this.get(r));
            return i
        }
        ,
        i.prototype.parseStringUTF = function(t, e) {
            for (var i = "", r = t; r < e; ) {
                var n = this.get(r++);
                i += n < 128 ? String.fromCharCode(n) : 191 < n && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
            }
            return i
        }
        ,
        i.prototype.parseStringBMP = function(t, e) {
            for (var i, r, n = "", s = t; s < e; )
                i = this.get(s++),
                r = this.get(s++),
                n += String.fromCharCode(i << 8 | r);
            return n
        }
        ,
        i.prototype.parseTime = function(t, e, i) {
            var r = this.parseStringISO(t, e)
              , n = (i ? T : S).exec(r);
            return n ? (i && (n[1] = +n[1],
            n[1] += +n[1] < 70 ? 2e3 : 1900),
            r = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4],
            n[5] && (r += ":" + n[5],
            n[6] && (r += ":" + n[6],
            n[7] && (r += "." + n[7]))),
            n[8] && (r += " UTC",
            "Z" != n[8] && (r += n[8],
            n[9] && (r += ":" + n[9]))),
            r) : "Unrecognized time: " + r
        }
        ,
        i.prototype.parseInteger = function(t, e) {
            for (var i, r = this.get(t), n = 127 < r, s = n ? 255 : 0, o = ""; r == s && ++t < e; )
                r = this.get(t);
            if (0 === (i = e - t))
                return n ? -1 : 0;
            if (4 < i) {
                for (o = r,
                i <<= 3; 0 == (128 & (+o ^ s)); )
                    o = +o << 1,
                    --i;
                o = "(" + i + " bit)\n"
            }
            n && (r -= 256);
            for (var h = new y(r), a = t + 1; a < e; ++a)
                h.mulAdd(256, this.get(a));
            return o + h.toString()
        }
        ,
        i.prototype.parseBitString = function(t, e, i) {
            for (var r = this.get(t), n = "(" + ((e - t - 1 << 3) - r) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
                for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; a <= u; --u)
                    s += h >> u & 1 ? "1" : "0";
                if (s.length > i)
                    return n + E(s, i)
            }
            return n + s
        }
        ,
        i.prototype.parseOctetString = function(t, e, i) {
            if (this.isASCII(t, e))
                return E(this.parseStringISO(t, e), i);
            var r = e - t
              , n = "(" + r + " byte)\n";
            (i /= 2) < r && (e = t + i);
            for (var s = t; s < e; ++s)
                n += this.hexByte(this.get(s));
            return i < r && (n += b),
            n
        }
        ,
        i.prototype.parseOID = function(t, e, i) {
            for (var r = "", n = new y, s = 0, o = t; o < e; ++o) {
                var h = this.get(o);
                if (n.mulAdd(128, 127 & h),
                s += 7,
                !(128 & h)) {
                    if ("" === r)
                        if ((n = n.simplify())instanceof y)
                            n.sub(80),
                            r = "2." + n.toString();
                        else {
                            var a = n < 80 ? n < 40 ? 0 : 1 : 2;
                            r = a + "." + (n - 40 * a)
                        }
                    else
                        r += "." + n.toString();
                    if (r.length > i)
                        return E(r, i);
                    n = new y,
                    s = 0
                }
            }
            return 0 < s && (r += ".incomplete"),
            r
        }
        ,
        i
    }(), x = function() {
        function c(t, e, i, r, n) {
            if (!(r instanceof R))
                throw new Error("Invalid tag value.");
            this.stream = t,
            this.header = e,
            this.length = i,
            this.tag = r,
            this.sub = n
        }
        return c.prototype.typeName = function() {
            switch (this.tag.tagClass) {
            case 0:
                switch (this.tag.tagNumber) {
                case 0:
                    return "EOC";
                case 1:
                    return "BOOLEAN";
                case 2:
                    return "INTEGER";
                case 3:
                    return "BIT_STRING";
                case 4:
                    return "OCTET_STRING";
                case 5:
                    return "NULL";
                case 6:
                    return "OBJECT_IDENTIFIER";
                case 7:
                    return "ObjectDescriptor";
                case 8:
                    return "EXTERNAL";
                case 9:
                    return "REAL";
                case 10:
                    return "ENUMERATED";
                case 11:
                    return "EMBEDDED_PDV";
                case 12:
                    return "UTF8String";
                case 16:
                    return "SEQUENCE";
                case 17:
                    return "SET";
                case 18:
                    return "NumericString";
                case 19:
                    return "PrintableString";
                case 20:
                    return "TeletexString";
                case 21:
                    return "VideotexString";
                case 22:
                    return "IA5String";
                case 23:
                    return "UTCTime";
                case 24:
                    return "GeneralizedTime";
                case 25:
                    return "GraphicString";
                case 26:
                    return "VisibleString";
                case 27:
                    return "GeneralString";
                case 28:
                    return "UniversalString";
                case 30:
                    return "BMPString"
                }
                return "Universal_" + this.tag.tagNumber.toString();
            case 1:
                return "Application_" + this.tag.tagNumber.toString();
            case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
                return "Private_" + this.tag.tagNumber.toString()
            }
        }
        ,
        c.prototype.content = function(t) {
            if (void 0 === this.tag)
                return null;
            void 0 === t && (t = 1 / 0);
            var e = this.posContent()
              , i = Math.abs(this.length);
            if (!this.tag.isUniversal())
                return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            switch (this.tag.tagNumber) {
            case 1:
                return 0 === this.stream.get(e) ? "false" : "true";
            case 2:
                return this.stream.parseInteger(e, e + i);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            case 6:
                return this.stream.parseOID(e, e + i, t);
            case 16:
            case 17:
                return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
            case 12:
                return E(this.stream.parseStringUTF(e, e + i), t);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return E(this.stream.parseStringISO(e, e + i), t);
            case 30:
                return E(this.stream.parseStringBMP(e, e + i), t);
            case 23:
            case 24:
                return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber)
            }
            return null
        }
        ,
        c.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
        }
        ,
        c.prototype.toPrettyString = function(t) {
            void 0 === t && (t = "");
            var e = t + this.typeName() + " @" + this.stream.pos;
            if (0 <= this.length && (e += "+"),
            e += this.length,
            this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
            e += "\n",
            null !== this.sub) {
                t += "  ";
                for (var i = 0, r = this.sub.length; i < r; ++i)
                    e += this.sub[i].toPrettyString(t)
            }
            return e
        }
        ,
        c.prototype.posStart = function() {
            return this.stream.pos
        }
        ,
        c.prototype.posContent = function() {
            return this.stream.pos + this.header
        }
        ,
        c.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        }
        ,
        c.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        }
        ,
        c.decodeLength = function(t) {
            var e = t.get()
              , i = 127 & e;
            if (i == e)
                return i;
            if (6 < i)
                throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
            if (0 === i)
                return null;
            for (var r = e = 0; r < i; ++r)
                e = 256 * e + t.get();
            return e
        }
        ,
        c.prototype.getHexStringValue = function() {
            var t = this.toHexString()
              , e = 2 * this.header
              , i = 2 * this.length;
            return t.substr(e, i)
        }
        ,
        c.decode = function(t) {
            var r;
            r = t instanceof D ? t : new D(t,0);
            var e = new D(r)
              , i = new R(r)
              , n = c.decodeLength(r)
              , s = r.pos
              , o = s - e.pos
              , h = null
              , a = function() {
                var t = [];
                if (null !== n) {
                    for (var e = s + n; r.pos < e; )
                        t[t.length] = c.decode(r);
                    if (r.pos != e)
                        throw new Error("Content size is not correct for container starting at offset " + s)
                } else
                    try {
                        for (; ; ) {
                            var i = c.decode(r);
                            if (i.tag.isEOC())
                                break;
                            t[t.length] = i
                        }
                        n = s - r.pos
                    } catch (t) {
                        throw new Error("Exception while decoding undefined length content: " + t)
                    }
                return t
            };
            if (i.tagConstructed)
                h = a();
            else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                try {
                    if (3 == i.tagNumber && 0 != r.get())
                        throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                    h = a();
                    for (var u = 0; u < h.length; ++u)
                        if (h[u].tag.isEOC())
                            throw new Error("EOC is not supposed to be actual content.")
                } catch (t) {
                    h = null
                }
            if (null === h) {
                if (null === n)
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                r.pos = s + Math.abs(n)
            }
            return new c(e,o,n,i,h)
        }
        ,
        c
    }(), R = function() {
        function t(t) {
            var e = t.get();
            if (this.tagClass = e >> 6,
            this.tagConstructed = 0 != (32 & e),
            this.tagNumber = 31 & e,
            31 == this.tagNumber) {
                for (var i = new y; e = t.get(),
                i.mulAdd(128, 127 & e),
                128 & e; )
                    ;
                this.tagNumber = i.simplify()
            }
        }
        return t.prototype.isUniversal = function() {
            return 0 === this.tagClass
        }
        ,
        t.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber
        }
        ,
        t
    }(), B = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], A = (1 << 26) / B[B.length - 1], O = function() {
        function b(t, e, i) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }
        return b.prototype.toString = function(t) {
            if (this.s < 0)
                return "-" + this.negate().toString(t);
            var e;
            if (16 == t)
                e = 4;
            else if (8 == t)
                e = 3;
            else if (2 == t)
                e = 1;
            else if (32 == t)
                e = 5;
            else {
                if (4 != t)
                    return this.toRadix(t);
                e = 2
            }
            var i, r = (1 << e) - 1, n = !1, s = "", o = this.t, h = this.DB - o * this.DB % e;
            if (0 < o--)
                for (h < this.DB && 0 < (i = this[o] >> h) && (n = !0,
                s = a(i)); 0 <= o; )
                    h < e ? (i = (this[o] & (1 << h) - 1) << e - h,
                    i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r,
                    h <= 0 && (h += this.DB,
                    --o)),
                    0 < i && (n = !0),
                    n && (s += a(i));
            return n ? s : "0"
        }
        ,
        b.prototype.negate = function() {
            var t = M();
            return b.ZERO.subTo(this, t),
            t
        }
        ,
        b.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }
        ,
        b.prototype.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e)
                return e;
            var i = this.t;
            if (0 != (e = i - t.t))
                return this.s < 0 ? -e : e;
            for (; 0 <= --i; )
                if (0 != (e = this[i] - t[i]))
                    return e;
            return 0
        }
        ,
        b.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
        }
        ,
        b.prototype.mod = function(t) {
            var e = M();
            return this.abs().divRemTo(t, null, e),
            this.s < 0 && 0 < e.compareTo(b.ZERO) && t.subTo(e, e),
            e
        }
        ,
        b.prototype.modPowInt = function(t, e) {
            var i;
            return i = t < 256 || e.isEven() ? new I(e) : new N(e),
            this.exp(t, i)
        }
        ,
        b.prototype.clone = function() {
            var t = M();
            return this.copyTo(t),
            t
        }
        ,
        b.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this[0];
                if (0 == this.t)
                    return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }
        ,
        b.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }
        ,
        b.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }
        ,
        b.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }
        ,
        b.prototype.toByteArray = function() {
            var t = this.t
              , e = [];
            e[0] = this.s;
            var i, r = this.DB - t * this.DB % 8, n = 0;
            if (0 < t--)
                for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); 0 <= t; )
                    r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r,
                    i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255,
                    r <= 0 && (r += this.DB,
                    --t)),
                    0 != (128 & i) && (i |= -256),
                    0 == n && (128 & this.s) != (128 & i) && ++n,
                    (0 < n || i != this.s) && (e[n++] = i);
            return e
        }
        ,
        b.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
        }
        ,
        b.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
        }
        ,
        b.prototype.max = function(t) {
            return 0 < this.compareTo(t) ? this : t
        }
        ,
        b.prototype.and = function(t) {
            var e = M();
            return this.bitwiseTo(t, i, e),
            e
        }
        ,
        b.prototype.or = function(t) {
            var e = M();
            return this.bitwiseTo(t, u, e),
            e
        }
        ,
        b.prototype.xor = function(t) {
            var e = M();
            return this.bitwiseTo(t, r, e),
            e
        }
        ,
        b.prototype.andNot = function(t) {
            var e = M();
            return this.bitwiseTo(t, n, e),
            e
        }
        ,
        b.prototype.not = function() {
            for (var t = M(), e = 0; e < this.t; ++e)
                t[e] = this.DM & ~this[e];
            return t.t = this.t,
            t.s = ~this.s,
            t
        }
        ,
        b.prototype.shiftLeft = function(t) {
            var e = M();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
            e
        }
        ,
        b.prototype.shiftRight = function(t) {
            var e = M();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
            e
        }
        ,
        b.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t])
                    return t * this.DB + s(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        ,
        b.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
                t += o(this[i] ^ e);
            return t
        }
        ,
        b.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
        }
        ,
        b.prototype.setBit = function(t) {
            return this.changeBit(t, u)
        }
        ,
        b.prototype.clearBit = function(t) {
            return this.changeBit(t, n)
        }
        ,
        b.prototype.flipBit = function(t) {
            return this.changeBit(t, r)
        }
        ,
        b.prototype.add = function(t) {
            var e = M();
            return this.addTo(t, e),
            e
        }
        ,
        b.prototype.subtract = function(t) {
            var e = M();
            return this.subTo(t, e),
            e
        }
        ,
        b.prototype.multiply = function(t) {
            var e = M();
            return this.multiplyTo(t, e),
            e
        }
        ,
        b.prototype.divide = function(t) {
            var e = M();
            return this.divRemTo(t, e, null),
            e
        }
        ,
        b.prototype.remainder = function(t) {
            var e = M();
            return this.divRemTo(t, null, e),
            e
        }
        ,
        b.prototype.divideAndRemainder = function(t) {
            var e = M()
              , i = M();
            return this.divRemTo(t, e, i),
            [e, i]
        }
        ,
        b.prototype.modPow = function(t, e) {
            var i, r, n = t.bitLength(), s = F(1);
            if (n <= 0)
                return s;
            i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
            r = n < 8 ? new I(e) : e.isEven() ? new P(e) : new N(e);
            var o = []
              , h = 3
              , a = i - 1
              , u = (1 << i) - 1;
            if (o[1] = r.convert(this),
            1 < i) {
                var c = M();
                for (r.sqrTo(o[1], c); h <= u; )
                    o[h] = M(),
                    r.mulTo(c, o[h - 2], o[h]),
                    h += 2
            }
            var f, l, p = t.t - 1, g = !0, d = M();
            for (n = U(t[p]) - 1; 0 <= p; ) {
                for (a <= n ? f = t[p] >> n - a & u : (f = (t[p] & (1 << n + 1) - 1) << a - n,
                0 < p && (f |= t[p - 1] >> this.DB + n - a)),
                h = i; 0 == (1 & f); )
                    f >>= 1,
                    --h;
                if ((n -= h) < 0 && (n += this.DB,
                --p),
                g)
                    o[f].copyTo(s),
                    g = !1;
                else {
                    for (; 1 < h; )
                        r.sqrTo(s, d),
                        r.sqrTo(d, s),
                        h -= 2;
                    0 < h ? r.sqrTo(s, d) : (l = s,
                    s = d,
                    d = l),
                    r.mulTo(d, o[f], s)
                }
                for (; 0 <= p && 0 == (t[p] & 1 << n); )
                    r.sqrTo(s, d),
                    l = s,
                    s = d,
                    d = l,
                    --n < 0 && (n = this.DB - 1,
                    --p)
            }
            return r.revert(s)
        }
        ,
        b.prototype.modInverse = function(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum())
                return b.ZERO;
            for (var i = t.clone(), r = this.clone(), n = F(1), s = F(0), o = F(0), h = F(1); 0 != i.signum(); ) {
                for (; i.isEven(); )
                    i.rShiftTo(1, i),
                    e ? (n.isEven() && s.isEven() || (n.addTo(this, n),
                    s.subTo(t, s)),
                    n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s),
                    s.rShiftTo(1, s);
                for (; r.isEven(); )
                    r.rShiftTo(1, r),
                    e ? (o.isEven() && h.isEven() || (o.addTo(this, o),
                    h.subTo(t, h)),
                    o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h),
                    h.rShiftTo(1, h);
                0 <= i.compareTo(r) ? (i.subTo(r, i),
                e && n.subTo(o, n),
                s.subTo(h, s)) : (r.subTo(i, r),
                e && o.subTo(n, o),
                h.subTo(s, h))
            }
            return 0 != r.compareTo(b.ONE) ? b.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h),
            h.signum() < 0 ? h.add(t) : h) : h
        }
        ,
        b.prototype.pow = function(t) {
            return this.exp(t, new V)
        }
        ,
        b.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone()
              , i = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(i) < 0) {
                var r = e;
                e = i,
                i = r
            }
            var n = e.getLowestSetBit()
              , s = i.getLowestSetBit();
            if (s < 0)
                return e;
            for (n < s && (s = n),
            0 < s && (e.rShiftTo(s, e),
            i.rShiftTo(s, i)); 0 < e.signum(); )
                0 < (n = e.getLowestSetBit()) && e.rShiftTo(n, e),
                0 < (n = i.getLowestSetBit()) && i.rShiftTo(n, i),
                0 <= e.compareTo(i) ? (e.subTo(i, e),
                e.rShiftTo(1, e)) : (i.subTo(e, i),
                i.rShiftTo(1, i));
            return 0 < s && i.lShiftTo(s, i),
            i
        }
        ,
        b.prototype.isProbablePrime = function(t) {
            var e, i = this.abs();
            if (1 == i.t && i[0] <= B[B.length - 1]) {
                for (e = 0; e < B.length; ++e)
                    if (i[0] == B[e])
                        return !0;
                return !1
            }
            if (i.isEven())
                return !1;
            for (e = 1; e < B.length; ) {
                for (var r = B[e], n = e + 1; n < B.length && r < A; )
                    r *= B[n++];
                for (r = i.modInt(r); e < n; )
                    if (r % B[e++] == 0)
                        return !1
            }
            return i.millerRabin(t)
        }
        ,
        b.prototype.copyTo = function(t) {
            for (var e = this.t - 1; 0 <= e; --e)
                t[e] = this[e];
            t.t = this.t,
            t.s = this.s
        }
        ,
        b.prototype.fromInt = function(t) {
            this.t = 1,
            this.s = t < 0 ? -1 : 0,
            0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
        }
        ,
        b.prototype.fromString = function(t, e) {
            var i;
            if (16 == e)
                i = 4;
            else if (8 == e)
                i = 3;
            else if (256 == e)
                i = 8;
            else if (2 == e)
                i = 1;
            else if (32 == e)
                i = 5;
            else {
                if (4 != e)
                    return void this.fromRadix(t, e);
                i = 2
            }
            this.t = 0,
            this.s = 0;
            for (var r = t.length, n = !1, s = 0; 0 <= --r; ) {
                var o = 8 == i ? 255 & +t[r] : C(t, r);
                o < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1,
                0 == s ? this[this.t++] = o : s + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s,
                this[this.t++] = o >> this.DB - s) : this[this.t - 1] |= o << s,
                (s += i) >= this.DB && (s -= this.DB))
            }
            8 == i && 0 != (128 & +t[0]) && (this.s = -1,
            0 < s && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
            this.clamp(),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.clamp = function() {
            for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; )
                --this.t
        }
        ,
        b.prototype.dlShiftTo = function(t, e) {
            var i;
            for (i = this.t - 1; 0 <= i; --i)
                e[i + t] = this[i];
            for (i = t - 1; 0 <= i; --i)
                e[i] = 0;
            e.t = this.t + t,
            e.s = this.s
        }
        ,
        b.prototype.drShiftTo = function(t, e) {
            for (var i = t; i < this.t; ++i)
                e[i - t] = this[i];
            e.t = Math.max(this.t - t, 0),
            e.s = this.s
        }
        ,
        b.prototype.lShiftTo = function(t, e) {
            for (var i = t % this.DB, r = this.DB - i, n = (1 << r) - 1, s = Math.floor(t / this.DB), o = this.s << i & this.DM, h = this.t - 1; 0 <= h; --h)
                e[h + s + 1] = this[h] >> r | o,
                o = (this[h] & n) << i;
            for (h = s - 1; 0 <= h; --h)
                e[h] = 0;
            e[s] = o,
            e.t = this.t + s + 1,
            e.s = this.s,
            e.clamp()
        }
        ,
        b.prototype.rShiftTo = function(t, e) {
            e.s = this.s;
            var i = Math.floor(t / this.DB);
            if (i >= this.t)
                e.t = 0;
            else {
                var r = t % this.DB
                  , n = this.DB - r
                  , s = (1 << r) - 1;
                e[0] = this[i] >> r;
                for (var o = i + 1; o < this.t; ++o)
                    e[o - i - 1] |= (this[o] & s) << n,
                    e[o - i] = this[o] >> r;
                0 < r && (e[this.t - i - 1] |= (this.s & s) << n),
                e.t = this.t - i,
                e.clamp()
            }
        }
        ,
        b.prototype.subTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] - t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r -= t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r -= t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r -= t.s
            }
            e.s = r < 0 ? -1 : 0,
            r < -1 ? e[i++] = this.DV + r : 0 < r && (e[i++] = r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.multiplyTo = function(t, e) {
            var i = this.abs()
              , r = t.abs()
              , n = i.t;
            for (e.t = n + r.t; 0 <= --n; )
                e[n] = 0;
            for (n = 0; n < r.t; ++n)
                e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
            e.s = 0,
            e.clamp(),
            this.s != t.s && b.ZERO.subTo(e, e)
        }
        ,
        b.prototype.squareTo = function(t) {
            for (var e = this.abs(), i = t.t = 2 * e.t; 0 <= --i; )
                t[i] = 0;
            for (i = 0; i < e.t - 1; ++i) {
                var r = e.am(i, e[i], t, 2 * i, 0, 1);
                (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
                t[i + e.t + 1] = 1)
            }
            0 < t.t && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
            t.s = 0,
            t.clamp()
        }
        ,
        b.prototype.divRemTo = function(t, e, i) {
            var r = t.abs();
            if (!(r.t <= 0)) {
                var n = this.abs();
                if (n.t < r.t)
                    return null != e && e.fromInt(0),
                    void (null != i && this.copyTo(i));
                null == i && (i = M());
                var s = M()
                  , o = this.s
                  , h = t.s
                  , a = this.DB - U(r[r.t - 1]);
                0 < a ? (r.lShiftTo(a, s),
                n.lShiftTo(a, i)) : (r.copyTo(s),
                n.copyTo(i));
                var u = s.t
                  , c = s[u - 1];
                if (0 != c) {
                    var f = c * (1 << this.F1) + (1 < u ? s[u - 2] >> this.F2 : 0)
                      , l = this.FV / f
                      , p = (1 << this.F1) / f
                      , g = 1 << this.F2
                      , d = i.t
                      , v = d - u
                      , m = null == e ? M() : e;
                    for (s.dlShiftTo(v, m),
                    0 <= i.compareTo(m) && (i[i.t++] = 1,
                    i.subTo(m, i)),
                    b.ONE.dlShiftTo(u, m),
                    m.subTo(s, s); s.t < u; )
                        s[s.t++] = 0;
                    for (; 0 <= --v; ) {
                        var y = i[--d] == c ? this.DM : Math.floor(i[d] * l + (i[d - 1] + g) * p);
                        if ((i[d] += s.am(0, y, i, v, 0, u)) < y)
                            for (s.dlShiftTo(v, m),
                            i.subTo(m, i); i[d] < --y; )
                                i.subTo(m, i)
                    }
                    null != e && (i.drShiftTo(u, e),
                    o != h && b.ZERO.subTo(e, e)),
                    i.t = u,
                    i.clamp(),
                    0 < a && i.rShiftTo(a, i),
                    o < 0 && b.ZERO.subTo(i, i)
                }
            }
        }
        ,
        b.prototype.invDigit = function() {
            if (this.t < 1)
                return 0;
            var t = this[0];
            if (0 == (1 & t))
                return 0;
            var e = 3 & t;
            return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
        }
        ,
        b.prototype.isEven = function() {
            return 0 == (0 < this.t ? 1 & this[0] : this.s)
        }
        ,
        b.prototype.exp = function(t, e) {
            if (4294967295 < t || t < 1)
                return b.ONE;
            var i = M()
              , r = M()
              , n = e.convert(this)
              , s = U(t) - 1;
            for (n.copyTo(i); 0 <= --s; )
                if (e.sqrTo(i, r),
                0 < (t & 1 << s))
                    e.mulTo(r, n, i);
                else {
                    var o = i;
                    i = r,
                    r = o
                }
            return e.revert(i)
        }
        ,
        b.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }
        ,
        b.prototype.toRadix = function(t) {
            if (null == t && (t = 10),
            0 == this.signum() || t < 2 || 36 < t)
                return "0";
            var e = this.chunkSize(t)
              , i = Math.pow(t, e)
              , r = F(i)
              , n = M()
              , s = M()
              , o = "";
            for (this.divRemTo(r, n, s); 0 < n.signum(); )
                o = (i + s.intValue()).toString(t).substr(1) + o,
                n.divRemTo(r, n, s);
            return s.intValue().toString(t) + o
        }
        ,
        b.prototype.fromRadix = function(t, e) {
            this.fromInt(0),
            null == e && (e = 10);
            for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
                var a = C(t, h);
                a < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (n = !0) : (o = e * o + a,
                ++s >= i && (this.dMultiply(r),
                this.dAddOffset(o, 0),
                o = s = 0))
            }
            0 < s && (this.dMultiply(Math.pow(e, s)),
            this.dAddOffset(o, 0)),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.fromNumber = function(t, e, i) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else
                    for (this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
                        this.dAddOffset(2, 0),
                        this.bitLength() > t && this.subTo(b.ONE.shiftLeft(t - 1), this);
            else {
                var r = []
                  , n = 7 & t;
                r.length = 1 + (t >> 3),
                e.nextBytes(r),
                0 < n ? r[0] &= (1 << n) - 1 : r[0] = 0,
                this.fromString(r, 256)
            }
        }
        ,
        b.prototype.bitwiseTo = function(t, e, i) {
            var r, n, s = Math.min(t.t, this.t);
            for (r = 0; r < s; ++r)
                i[r] = e(this[r], t[r]);
            if (t.t < this.t) {
                for (n = t.s & this.DM,
                r = s; r < this.t; ++r)
                    i[r] = e(this[r], n);
                i.t = this.t
            } else {
                for (n = this.s & this.DM,
                r = s; r < t.t; ++r)
                    i[r] = e(n, t[r]);
                i.t = t.t
            }
            i.s = e(this.s, t.s),
            i.clamp()
        }
        ,
        b.prototype.changeBit = function(t, e) {
            var i = b.ONE.shiftLeft(t);
            return this.bitwiseTo(i, e, i),
            i
        }
        ,
        b.prototype.addTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] + t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r += t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r += t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += t.s
            }
            e.s = r < 0 ? -1 : 0,
            0 < r ? e[i++] = r : r < -1 && (e[i++] = this.DV + r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
            ++this.t,
            this.clamp()
        }
        ,
        b.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
                for (; this.t <= e; )
                    this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV; )
                    this[e] -= this.DV,
                    ++e >= this.t && (this[this.t++] = 0),
                    ++this[e]
            }
        }
        ,
        b.prototype.multiplyLowerTo = function(t, e, i) {
            var r = Math.min(this.t + t.t, e);
            for (i.s = 0,
            i.t = r; 0 < r; )
                i[--r] = 0;
            for (var n = i.t - this.t; r < n; ++r)
                i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
            for (n = Math.min(t.t, e); r < n; ++r)
                this.am(0, t[r], i, r, 0, e - r);
            i.clamp()
        }
        ,
        b.prototype.multiplyUpperTo = function(t, e, i) {
            --e;
            var r = i.t = this.t + t.t - e;
            for (i.s = 0; 0 <= --r; )
                i[r] = 0;
            for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
            i.clamp(),
            i.drShiftTo(1, i)
        }
        ,
        b.prototype.modInt = function(t) {
            if (t <= 0)
                return 0;
            var e = this.DV % t
              , i = this.s < 0 ? t - 1 : 0;
            if (0 < this.t)
                if (0 == e)
                    i = this[0] % t;
                else
                    for (var r = this.t - 1; 0 <= r; --r)
                        i = (e * i + this[r]) % t;
            return i
        }
        ,
        b.prototype.millerRabin = function(t) {
            var e = this.subtract(b.ONE)
              , i = e.getLowestSetBit();
            if (i <= 0)
                return !1;
            var r = e.shiftRight(i);
            B.length < (t = t + 1 >> 1) && (t = B.length);
            for (var n = M(), s = 0; s < t; ++s) {
                n.fromInt(B[Math.floor(Math.random() * B.length)]);
                var o = n.modPow(r, this);
                if (0 != o.compareTo(b.ONE) && 0 != o.compareTo(e)) {
                    for (var h = 1; h++ < i && 0 != o.compareTo(e); )
                        if (0 == (o = o.modPowInt(2, this)).compareTo(b.ONE))
                            return !1;
                    if (0 != o.compareTo(e))
                        return !1
                }
            }
            return !0
        }
        ,
        b.prototype.square = function() {
            var t = M();
            return this.squareTo(t),
            t
        }
        ,
        b.prototype.gcda = function(t, e) {
            var i = this.s < 0 ? this.negate() : this.clone()
              , r = t.s < 0 ? t.negate() : t.clone();
            if (i.compareTo(r) < 0) {
                var n = i;
                i = r,
                r = n
            }
            var s = i.getLowestSetBit()
              , o = r.getLowestSetBit();
            if (o < 0)
                e(i);
            else {
                s < o && (o = s),
                0 < o && (i.rShiftTo(o, i),
                r.rShiftTo(o, r));
                var h = function() {
                    0 < (s = i.getLowestSetBit()) && i.rShiftTo(s, i),
                    0 < (s = r.getLowestSetBit()) && r.rShiftTo(s, r),
                    0 <= i.compareTo(r) ? (i.subTo(r, i),
                    i.rShiftTo(1, i)) : (r.subTo(i, r),
                    r.rShiftTo(1, r)),
                    0 < i.signum() ? setTimeout(h, 0) : (0 < o && r.lShiftTo(o, r),
                    setTimeout(function() {
                        e(r)
                    }, 0))
                };
                setTimeout(h, 10)
            }
        }
        ,
        b.prototype.fromNumberAsync = function(t, e, i, r) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else {
                    this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0);
                    var n = this
                      , s = function() {
                        n.dAddOffset(2, 0),
                        n.bitLength() > t && n.subTo(b.ONE.shiftLeft(t - 1), n),
                        n.isProbablePrime(e) ? setTimeout(function() {
                            r()
                        }, 0) : setTimeout(s, 0)
                    };
                    setTimeout(s, 0)
                }
            else {
                var o = []
                  , h = 7 & t;
                o.length = 1 + (t >> 3),
                e.nextBytes(o),
                0 < h ? o[0] &= (1 << h) - 1 : o[0] = 0,
                this.fromString(o, 256)
            }
        }
        ,
        b
    }(), V = function() {
        function t() {}
        return t.prototype.convert = function(t) {
            return t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
        }
        ,
        t
    }(), I = function() {
        function t(t) {
            this.m = t
        }
        return t.prototype.convert = function(t) {
            return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), N = function() {
        function t(t) {
            this.m = t,
            this.mp = t.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << t.DB - 15) - 1,
            this.mt2 = 2 * t.t
        }
        return t.prototype.convert = function(t) {
            var e = M();
            return t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && 0 < e.compareTo(O.ZERO) && this.m.subTo(e, e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.reduce = function(t) {
            for (; t.t <= this.mt2; )
                t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var i = 32767 & t[e]
                  , r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; )
                    t[i] -= t.DV,
                    t[++i]++
            }
            t.clamp(),
            t.drShiftTo(this.m.t, t),
            0 <= t.compareTo(this.m) && t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), P = function() {
        function t(t) {
            this.m = t,
            this.r2 = M(),
            this.q3 = M(),
            O.ONE.dlShiftTo(2 * t.t, this.r2),
            this.mu = this.r2.divide(t)
        }
        return t.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t)
                return t.mod(this.m);
            if (t.compareTo(this.m) < 0)
                return t;
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && (t.t = this.m.t + 1,
            t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m); )
                t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }();
    function M() {
        return new O(null)
    }
    function q(t, e) {
        return new O(t,e)
    }
    "Microsoft Internet Explorer" == navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 32767 & e, h = e >> 15; 0 <= --s; ) {
            var a = 32767 & this[t]
              , u = this[t++] >> 15
              , c = h * a + u * o;
            n = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + h * u + (n >>> 30),
            i[r++] = 1073741823 & a
        }
        return n
    }
    ,
    w = 30) : "Netscape" != navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (; 0 <= --s; ) {
            var o = e * this[t++] + i[r] + n;
            n = Math.floor(o / 67108864),
            i[r++] = 67108863 & o
        }
        return n
    }
    ,
    w = 26) : (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 16383 & e, h = e >> 14; 0 <= --s; ) {
            var a = 16383 & this[t]
              , u = this[t++] >> 14
              , c = h * a + u * o;
            n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u,
            i[r++] = 268435455 & a
        }
        return n
    }
    ,
    w = 28),
    O.prototype.DB = w,
    O.prototype.DM = (1 << w) - 1,
    O.prototype.DV = 1 << w;
    O.prototype.FV = Math.pow(2, 52),
    O.prototype.F1 = 52 - w,
    O.prototype.F2 = 2 * w - 52;
    var j, L, H = [];
    for (j = "0".charCodeAt(0),
    L = 0; L <= 9; ++L)
        H[j++] = L;
    for (j = "a".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    for (j = "A".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    function C(t, e) {
        var i = H[t.charCodeAt(e)];
        return null == i ? -1 : i
    }
    function F(t) {
        var e = M();
        return e.fromInt(t),
        e
    }
    function U(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e,
        i += 16),
        0 != (e = t >> 8) && (t = e,
        i += 8),
        0 != (e = t >> 4) && (t = e,
        i += 4),
        0 != (e = t >> 2) && (t = e,
        i += 2),
        0 != (e = t >> 1) && (t = e,
        i += 1),
        i
    }
    O.ZERO = F(0),
    O.ONE = F(1);
    var K = function() {
        function t() {
            this.i = 0,
            this.j = 0,
            this.S = []
        }
        return t.prototype.init = function(t) {
            var e, i, r;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (e = i = 0; e < 256; ++e)
                i = i + this.S[e] + t[e % t.length] & 255,
                r = this.S[e],
                this.S[e] = this.S[i],
                this.S[i] = r;
            this.i = 0,
            this.j = 0
        }
        ,
        t.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255,
            this.j = this.j + this.S[this.i] & 255,
            t = this.S[this.i],
            this.S[this.i] = this.S[this.j],
            this.S[this.j] = t,
            this.S[t + this.S[this.i] & 255]
        }
        ,
        t
    }();
    var k, _, z = 256, Z = null;
    if (null == Z) {
        Z = [];
        var G = void (_ = 0);
        if (window.crypto && window.crypto.getRandomValues) {
            var $ = new Uint32Array(256);
            for (window.crypto.getRandomValues($),
            G = 0; G < $.length; ++G)
                Z[_++] = 255 & $[G]
        }
        var Y = function(t) {
            if (this.count = this.count || 0,
            256 <= this.count || z <= _)
                window.removeEventListener ? window.removeEventListener("mousemove", Y, !1) : window.detachEvent && window.detachEvent("onmousemove", Y);
            else
                try {
                    var e = t.x + t.y;
                    Z[_++] = 255 & e,
                    this.count += 1
                } catch (t) {}
        };
        window.addEventListener ? window.addEventListener("mousemove", Y, !1) : window.attachEvent && window.attachEvent("onmousemove", Y)
    }
    function J() {
        if (null == k) {
            for (k = new K; _ < z; ) {
                var t = Math.floor(65536 * Math.random());
                Z[_++] = 255 & t
            }
            for (k.init(Z),
            _ = 0; _ < Z.length; ++_)
                Z[_] = 0;
            _ = 0
        }
        return k.next()
    }
    var X = function() {
        function t() {}
        return t.prototype.nextBytes = function(t) {
            for (var e = 0; e < t.length; ++e)
                t[e] = J()
        }
        ,
        t
    }();
    var Q = function() {
        function t() {
            this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
        }
        return t.prototype.doPublic = function(t) {
            return t.modPowInt(this.e, this.n)
        }
        ,
        t.prototype.doPrivate = function(t) {
            if (null == this.p || null == this.q)
                return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0; )
                e = e.add(this.p);
            return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
        }
        ,
        t.prototype.setPublic = function(t, e) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
        }
        ,
        t.prototype.encrypt = function(t) {
            var e = function(t, e) {
                if (e < t.length + 11)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = [], r = t.length - 1; 0 <= r && 0 < e; ) {
                    var n = t.charCodeAt(r--);
                    n < 128 ? i[--e] = n : 127 < n && n < 2048 ? (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 & 63 | 128,
                    i[--e] = n >> 12 | 224)
                }
                i[--e] = 0;
                for (var s = new X, o = []; 2 < e; ) {
                    for (o[0] = 0; 0 == o[0]; )
                        s.nextBytes(o);
                    i[--e] = o[0]
                }
                return i[--e] = 2,
                i[--e] = 0,
                new O(i)
            }(t, this.n.bitLength() + 7 >> 3);
            if (null == e)
                return null;
            var i = this.doPublic(e);
            if (null == i)
                return null;
            var r = i.toString(16);
            return 0 == (1 & r.length) ? r : "0" + r
        }
        ,
        t.prototype.setPrivate = function(t, e, i) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.setPrivateEx = function(t, e, i, r, n, s, o, h) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16),
            this.p = q(r, 16),
            this.q = q(n, 16),
            this.dmp1 = q(s, 16),
            this.dmq1 = q(o, 16),
            this.coeff = q(h, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.generate = function(t, e) {
            var i = new X
              , r = t >> 1;
            this.e = parseInt(e, 16);
            for (var n = new O(e,16); ; ) {
                for (; this.p = new O(t - r,1,i),
                0 != this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.p.isProbablePrime(10); )
                    ;
                for (; this.q = new O(r,1,i),
                0 != this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.q.isProbablePrime(10); )
                    ;
                if (this.p.compareTo(this.q) <= 0) {
                    var s = this.p;
                    this.p = this.q,
                    this.q = s
                }
                var o = this.p.subtract(O.ONE)
                  , h = this.q.subtract(O.ONE)
                  , a = o.multiply(h);
                if (0 == a.gcd(n).compareTo(O.ONE)) {
                    this.n = this.p.multiply(this.q),
                    this.d = n.modInverse(a),
                    this.dmp1 = this.d.mod(o),
                    this.dmq1 = this.d.mod(h),
                    this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        ,
        t.prototype.decrypt = function(t) {
            var e = q(t, 16)
              , i = this.doPrivate(e);
            return null == i ? null : function(t, e) {
                var i = t.toByteArray()
                  , r = 0;
                for (; r < i.length && 0 == i[r]; )
                    ++r;
                if (i.length - r != e - 1 || 2 != i[r])
                    return null;
                ++r;
                for (; 0 != i[r]; )
                    if (++r >= i.length)
                        return null;
                var n = "";
                for (; ++r < i.length; ) {
                    var s = 255 & i[r];
                    s < 128 ? n += String.fromCharCode(s) : 191 < s && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]),
                    ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]),
                    r += 2)
                }
                return n
            }(i, this.n.bitLength() + 7 >> 3)
        }
        ,
        t.prototype.generateAsync = function(t, e, n) {
            var s = new X
              , o = t >> 1;
            this.e = parseInt(e, 16);
            var h = new O(e,16)
              , a = this
              , u = function() {
                var e = function() {
                    if (a.p.compareTo(a.q) <= 0) {
                        var t = a.p;
                        a.p = a.q,
                        a.q = t
                    }
                    var e = a.p.subtract(O.ONE)
                      , i = a.q.subtract(O.ONE)
                      , r = e.multiply(i);
                    0 == r.gcd(h).compareTo(O.ONE) ? (a.n = a.p.multiply(a.q),
                    a.d = h.modInverse(r),
                    a.dmp1 = a.d.mod(e),
                    a.dmq1 = a.d.mod(i),
                    a.coeff = a.q.modInverse(a.p),
                    setTimeout(function() {
                        n()
                    }, 0)) : setTimeout(u, 0)
                }
                  , i = function() {
                    a.q = M(),
                    a.q.fromNumberAsync(o, 1, s, function() {
                        a.q.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(i, 0)
                        })
                    })
                }
                  , r = function() {
                    a.p = M(),
                    a.p.fromNumberAsync(t - o, 1, s, function() {
                        a.p.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(r, 0)
                        })
                    })
                };
                setTimeout(r, 0)
            };
            setTimeout(u, 0)
        }
        ,
        t.prototype.sign = function(t, e, i) {
            var r = function(t, e) {
                if (e < t.length + 22)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = e - t.length - 6, r = "", n = 0; n < i; n += 2)
                    r += "ff";
                return q("0001" + r + "00" + t, 16)
            }((W[i] || "") + e(t).toString(), this.n.bitLength() / 4);
            if (null == r)
                return null;
            var n = this.doPrivate(r);
            if (null == n)
                return null;
            var s = n.toString(16);
            return 0 == (1 & s.length) ? s : "0" + s
        }
        ,
        t.prototype.verify = function(t, e, i) {
            var r = q(e, 16)
              , n = this.doPublic(r);
            return null == n ? null : function(t) {
                for (var e in W)
                    if (W.hasOwnProperty(e)) {
                        var i = W[e]
                          , r = i.length;
                        if (t.substr(0, r) == i)
                            return t.substr(r)
                    }
                return t
            }(n.toString(16).replace(/^1f+00/, "")) == i(t).toString()
        }
        ,
        t
    }();
    var W = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    };
    var tt = {};
    tt.lang = {
        extend: function(t, e, i) {
            if (!e || !t)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var r = function() {};
            if (r.prototype = e.prototype,
            t.prototype = new r,
            (t.prototype.constructor = t).superclass = e.prototype,
            e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
            i) {
                var n;
                for (n in i)
                    t.prototype[n] = i[n];
                var s = function() {}
                  , o = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (s = function(t, e) {
                        for (n = 0; n < o.length; n += 1) {
                            var i = o[n]
                              , r = e[i];
                            "function" == typeof r && r != Object.prototype[i] && (t[i] = r)
                        }
                    }
                    )
                } catch (t) {}
                s(t.prototype, i)
            }
        }
    };
    var et = {};
    void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
    et.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e),
            e
        }
        ,
        this.bigIntToMinTwosComplementsHex = function(t) {
            var e = t.toString(16);
            if ("-" != e.substr(0, 1))
                e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
            else {
                var i = e.substr(1).length;
                i % 2 == 1 ? i += 1 : e.match(/^[0-7]/) || (i += 2);
                for (var r = "", n = 0; n < i; n++)
                    r += "f";
                e = new O(r,16).xor(t).add(O.ONE).toString(16).replace(/^-/, "")
            }
            return e
        }
        ,
        this.getPEMStringFromHex = function(t, e) {
            return hextopem(t, e)
        }
        ,
        this.newObject = function(t) {
            var e = et.asn1
              , i = e.DERBoolean
              , r = e.DERInteger
              , n = e.DERBitString
              , s = e.DEROctetString
              , o = e.DERNull
              , h = e.DERObjectIdentifier
              , a = e.DEREnumerated
              , u = e.DERUTF8String
              , c = e.DERNumericString
              , f = e.DERPrintableString
              , l = e.DERTeletexString
              , p = e.DERIA5String
              , g = e.DERUTCTime
              , d = e.DERGeneralizedTime
              , v = e.DERSequence
              , m = e.DERSet
              , y = e.DERTaggedObject
              , b = e.ASN1Util.newObject
              , T = Object.keys(t);
            if (1 != T.length)
                throw "key of param shall be only one.";
            var S = T[0];
            if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":"))
                throw "undefined key: " + S;
            if ("bool" == S)
                return new i(t[S]);
            if ("int" == S)
                return new r(t[S]);
            if ("bitstr" == S)
                return new n(t[S]);
            if ("octstr" == S)
                return new s(t[S]);
            if ("null" == S)
                return new o(t[S]);
            if ("oid" == S)
                return new h(t[S]);
            if ("enum" == S)
                return new a(t[S]);
            if ("utf8str" == S)
                return new u(t[S]);
            if ("numstr" == S)
                return new c(t[S]);
            if ("prnstr" == S)
                return new f(t[S]);
            if ("telstr" == S)
                return new l(t[S]);
            if ("ia5str" == S)
                return new p(t[S]);
            if ("utctime" == S)
                return new g(t[S]);
            if ("gentime" == S)
                return new d(t[S]);
            if ("seq" == S) {
                for (var E = t[S], w = [], D = 0; D < E.length; D++) {
                    var x = b(E[D]);
                    w.push(x)
                }
                return new v({
                    array: w
                })
            }
            if ("set" == S) {
                for (E = t[S],
                w = [],
                D = 0; D < E.length; D++) {
                    x = b(E[D]);
                    w.push(x)
                }
                return new m({
                    array: w
                })
            }
            if ("tag" == S) {
                var R = t[S];
                if ("[object Array]" === Object.prototype.toString.call(R) && 3 == R.length) {
                    var B = b(R[2]);
                    return new y({
                        tag: R[0],
                        explicit: R[1],
                        obj: B
                    })
                }
                var A = {};
                if (void 0 !== R.explicit && (A.explicit = R.explicit),
                void 0 !== R.tag && (A.tag = R.tag),
                void 0 === R.obj)
                    throw "obj shall be specified for 'tag'.";
                return A.obj = b(R.obj),
                new y(A)
            }
        }
        ,
        this.jsonToASN1HEX = function(t) {
            return this.newObject(t).getEncodedHex()
        }
    }
    ,
    et.asn1.ASN1Util.oidHexToInt = function(t) {
        for (var e = "", i = parseInt(t.substr(0, 2), 16), r = (e = Math.floor(i / 40) + "." + i % 40,
        ""), n = 2; n < t.length; n += 2) {
            var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
            if (r += s.substr(1, 7),
            "0" == s.substr(0, 1))
                e = e + "." + new O(r,2).toString(10),
                r = ""
        }
        return e
    }
    ,
    et.asn1.ASN1Util.oidIntToHex = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , e = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        if (!t.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t;
        var i = ""
          , r = t.split(".")
          , n = 40 * parseInt(r[0]) + parseInt(r[1]);
        i += h(n),
        r.splice(0, 2);
        for (var s = 0; s < r.length; s++)
            i += e(r[s]);
        return i
    }
    ,
    et.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
            if (void 0 === this.hV || null == this.hV)
                throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
                throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
            var t = this.hV.length / 2
              , e = t.toString(16);
            if (e.length % 2 == 1 && (e = "0" + e),
            t < 128)
                return e;
            var i = e.length / 2;
            if (15 < i)
                throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
            return (128 + i).toString(16) + e
        }
        ,
        this.getEncodedHex = function() {
            return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
            this.hL = this.getLengthHexFromValue(),
            this.hTLV = this.hT + this.hL + this.hV,
            this.isModified = !1),
            this.hTLV
        }
        ,
        this.getValueHex = function() {
            return this.getEncodedHex(),
            this.hV
        }
        ,
        this.getFreshValueHex = function() {
            return ""
        }
    }
    ,
    et.asn1.DERAbstractString = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(this.s)
        }
        ,
        this.setStringHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
    et.asn1.DERAbstractTime = function(t) {
        et.asn1.DERAbstractTime.superclass.constructor.call(this),
        this.localDateToUTC = function(t) {
            return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
            new Date(utc)
        }
        ,
        this.formatDate = function(t, e, i) {
            var r = this.zeroPadding
              , n = this.localDateToUTC(t)
              , s = String(n.getFullYear());
            "utc" == e && (s = s.substr(2, 2));
            var o = s + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
            if (!0 === i) {
                var h = n.getMilliseconds();
                if (0 != h) {
                    var a = r(String(h), 3);
                    o = o + "." + (a = a.replace(/[0]+$/, ""))
                }
            }
            return o + "Z"
        }
        ,
        this.zeroPadding = function(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }
        ,
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(t)
        }
        ,
        this.setByDateValue = function(t, e, i, r, n, s) {
            var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
            this.setByDate(o)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
    et.asn1.DERAbstractStructured = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.setByASN1ObjectArray = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array = t
        }
        ,
        this.appendASN1Object = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array.push(t)
        }
        ,
        this.asn1Array = new Array,
        void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
    et.asn1.DERBoolean = function() {
        et.asn1.DERBoolean.superclass.constructor.call(this),
        this.hT = "01",
        this.hTLV = "0101ff"
    }
    ,
    tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
    et.asn1.DERInteger = function(t) {
        et.asn1.DERInteger.superclass.constructor.call(this),
        this.hT = "02",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
    et.asn1.DERBitString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = "00" + e.getEncodedHex()
        }
        et.asn1.DERBitString.superclass.constructor.call(this),
        this.hT = "03",
        this.setHexValueIncludingUnusedBits = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = t
        }
        ,
        this.setUnusedBitsAndHexValue = function(t, e) {
            if (t < 0 || 7 < t)
                throw "unused bits shall be from 0 to 7: u = " + t;
            var i = "0" + t;
            this.hTLV = null,
            this.isModified = !0,
            this.hV = i + e
        }
        ,
        this.setByBinaryString = function(t) {
            var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
            8 == e && (e = 0);
            for (var i = 0; i <= e; i++)
                t += "0";
            var r = "";
            for (i = 0; i < t.length - 1; i += 8) {
                var n = t.substr(i, 8)
                  , s = parseInt(n, 2).toString(16);
                1 == s.length && (s = "0" + s),
                r += s
            }
            this.hTLV = null,
            this.isModified = !0,
            this.hV = "0" + e + r
        }
        ,
        this.setByBooleanArray = function(t) {
            for (var e = "", i = 0; i < t.length; i++)
                1 == t[i] ? e += "1" : e += "0";
            this.setByBinaryString(e)
        }
        ,
        this.newFalseArray = function(t) {
            for (var e = new Array(t), i = 0; i < t; i++)
                e[i] = !1;
            return e
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
    }
    ,
    tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
    et.asn1.DEROctetString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = e.getEncodedHex()
        }
        et.asn1.DEROctetString.superclass.constructor.call(this, t),
        this.hT = "04"
    }
    ,
    tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
    et.asn1.DERNull = function() {
        et.asn1.DERNull.superclass.constructor.call(this),
        this.hT = "05",
        this.hTLV = "0500"
    }
    ,
    tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
    et.asn1.DERObjectIdentifier = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , s = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
        this.hT = "06",
        this.setValueHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.setValueOidString = function(t) {
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var e = ""
              , i = t.split(".")
              , r = 40 * parseInt(i[0]) + parseInt(i[1]);
            e += h(r),
            i.splice(0, 2);
            for (var n = 0; n < i.length; n++)
                e += s(i[n]);
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = e
        }
        ,
        this.setValueName = function(t) {
            var e = et.asn1.x509.OID.name2oid(t);
            if ("" === e)
                throw "DERObjectIdentifier oidName undefined: " + t;
            this.setValueOidString(e)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
    }
    ,
    tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
    et.asn1.DEREnumerated = function(t) {
        et.asn1.DEREnumerated.superclass.constructor.call(this),
        this.hT = "0a",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
    et.asn1.DERUTF8String = function(t) {
        et.asn1.DERUTF8String.superclass.constructor.call(this, t),
        this.hT = "0c"
    }
    ,
    tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
    et.asn1.DERNumericString = function(t) {
        et.asn1.DERNumericString.superclass.constructor.call(this, t),
        this.hT = "12"
    }
    ,
    tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
    et.asn1.DERPrintableString = function(t) {
        et.asn1.DERPrintableString.superclass.constructor.call(this, t),
        this.hT = "13"
    }
    ,
    tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
    et.asn1.DERTeletexString = function(t) {
        et.asn1.DERTeletexString.superclass.constructor.call(this, t),
        this.hT = "14"
    }
    ,
    tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
    et.asn1.DERIA5String = function(t) {
        et.asn1.DERIA5String.superclass.constructor.call(this, t),
        this.hT = "16"
    }
    ,
    tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
    et.asn1.DERUTCTime = function(t) {
        et.asn1.DERUTCTime.superclass.constructor.call(this, t),
        this.hT = "17",
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    }
    ,
    tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
    et.asn1.DERGeneralizedTime = function(t) {
        et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
        this.hT = "18",
        this.withMillis = !1,
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
        !0 === t.millis && (this.withMillis = !0))
    }
    ,
    tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
    et.asn1.DERSequence = function(t) {
        et.asn1.DERSequence.superclass.constructor.call(this, t),
        this.hT = "30",
        this.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                t += this.asn1Array[e].getEncodedHex()
            }
            return this.hV = t,
            this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
    et.asn1.DERSet = function(t) {
        et.asn1.DERSet.superclass.constructor.call(this, t),
        this.hT = "31",
        this.sortFlag = !0,
        this.getFreshValueHex = function() {
            for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                var i = this.asn1Array[e];
                t.push(i.getEncodedHex())
            }
            return 1 == this.sortFlag && t.sort(),
            this.hV = t.join(""),
            this.hV
        }
        ,
        void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
    }
    ,
    tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
    et.asn1.DERTaggedObject = function(t) {
        et.asn1.DERTaggedObject.superclass.constructor.call(this),
        this.hT = "a0",
        this.hV = "",
        this.isExplicit = !0,
        this.asn1Object = null,
        this.setASN1Object = function(t, e, i) {
            this.hT = e,
            this.isExplicit = t,
            this.asn1Object = i,
            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
            this.hTLV = null,
            this.isModified = !0) : (this.hV = null,
            this.hTLV = i.getEncodedHex(),
            this.hTLV = this.hTLV.replace(/^../, e),
            this.isModified = !1)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj && (this.asn1Object = t.obj,
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    }
    ,
    tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
    var it = function(i) {
        function r(t) {
            var e = i.call(this) || this;
            return t && ("string" == typeof t ? e.parseKey(t) : (r.hasPrivateKeyProperty(t) || r.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)),
            e
        }
        return function(t, e) {
            function i() {
                this.constructor = t
            }
            p(t, e),
            t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
        }(r, i),
        r.prototype.parseKey = function(t) {
            try {
                var e = 0
                  , i = 0
                  , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? d(t) : v.unarmor(t)
                  , n = x.decode(r);
                if (3 === n.sub.length && (n = n.sub[2].sub[0]),
                9 === n.sub.length) {
                    e = n.sub[1].getHexStringValue(),
                    this.n = q(e, 16),
                    i = n.sub[2].getHexStringValue(),
                    this.e = parseInt(i, 16);
                    var s = n.sub[3].getHexStringValue();
                    this.d = q(s, 16);
                    var o = n.sub[4].getHexStringValue();
                    this.p = q(o, 16);
                    var h = n.sub[5].getHexStringValue();
                    this.q = q(h, 16);
                    var a = n.sub[6].getHexStringValue();
                    this.dmp1 = q(a, 16);
                    var u = n.sub[7].getHexStringValue();
                    this.dmq1 = q(u, 16);
                    var c = n.sub[8].getHexStringValue();
                    this.coeff = q(c, 16)
                } else {
                    if (2 !== n.sub.length)
                        return !1;
                    var f = n.sub[1].sub[0];
                    e = f.sub[0].getHexStringValue(),
                    this.n = q(e, 16),
                    i = f.sub[1].getHexStringValue(),
                    this.e = parseInt(i, 16)
                }
                return !0
            } catch (t) {
                return !1
            }
        }
        ,
        r.prototype.getPrivateBaseKey = function() {
            var t = {
                array: [new et.asn1.DERInteger({
                    int: 0
                }), new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                }), new et.asn1.DERInteger({
                    bigint: this.d
                }), new et.asn1.DERInteger({
                    bigint: this.p
                }), new et.asn1.DERInteger({
                    bigint: this.q
                }), new et.asn1.DERInteger({
                    bigint: this.dmp1
                }), new et.asn1.DERInteger({
                    bigint: this.dmq1
                }), new et.asn1.DERInteger({
                    bigint: this.coeff
                })]
            };
            return new et.asn1.DERSequence(t).getEncodedHex()
        }
        ,
        r.prototype.getPrivateBaseKeyB64 = function() {
            return c(this.getPrivateBaseKey())
        }
        ,
        r.prototype.getPublicBaseKey = function() {
            var t = new et.asn1.DERSequence({
                array: [new et.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new et.asn1.DERNull]
            })
              , e = new et.asn1.DERSequence({
                array: [new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                })]
            })
              , i = new et.asn1.DERBitString({
                hex: "00" + e.getEncodedHex()
            });
            return new et.asn1.DERSequence({
                array: [t, i]
            }).getEncodedHex()
        }
        ,
        r.prototype.getPublicBaseKeyB64 = function() {
            return c(this.getPublicBaseKey())
        }
        ,
        r.wordwrap = function(t, e) {
            if (!t)
                return t;
            var i = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
            return t.match(RegExp(i, "g")).join("\n")
        }
        ,
        r.prototype.getPrivateKey = function() {
            var t = "-----BEGIN RSA PRIVATE KEY-----\n";
            return t += r.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
            t += "-----END RSA PRIVATE KEY-----"
        }
        ,
        r.prototype.getPublicKey = function() {
            var t = "-----BEGIN PUBLIC KEY-----\n";
            return t += r.wordwrap(this.getPublicBaseKeyB64()) + "\n",
            t += "-----END PUBLIC KEY-----"
        }
        ,
        r.hasPublicKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
        }
        ,
        r.hasPrivateKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
        }
        ,
        r.prototype.parsePropertiesFrom = function(t) {
            this.n = t.n,
            this.e = t.e,
            t.hasOwnProperty("d") && (this.d = t.d,
            this.p = t.p,
            this.q = t.q,
            this.dmp1 = t.dmp1,
            this.dmq1 = t.dmq1,
            this.coeff = t.coeff)
        }
        ,
        r
    }(Q)
      , rt = function() {
        function t(t) {
            t = t || {},
            this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
            this.default_public_exponent = t.default_public_exponent || "010001",
            this.log = t.log || !1,
            this.key = null
        }
        return t.prototype.setKey = function(t) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
            this.key = new it(t)
        }
        ,
        t.prototype.setPrivateKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.setPublicKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.decrypt = function(t) {
            try {
                return this.getKey().decrypt(f(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.encrypt = function(t) {
            try {
                return c(this.getKey().encrypt(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.sign = function(t, e, i) {
            try {
                return c(this.getKey().sign(t, e, i))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.verify = function(t, e, i) {
            try {
                return this.getKey().verify(t, f(e), i)
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.getKey = function(t) {
            if (!this.key) {
                if (this.key = new it,
                t && "[object Function]" === {}.toString.call(t))
                    return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
        }
        ,
        t.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
        }
        ,
        t.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
        }
        ,
        t.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
        }
        ,
        t.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
        }
        ,
        t.version = "3.0.0-rc.1",
        t
    }();
    window.JSEncrypt = rt,
    t.JSEncrypt = rt,
    t.default = rt,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
});

if (YAHOO === undefined) {
    var YAHOO = {}
}
YAHOO.lang = {
    extend: function(g, h, f) {
        if (!h || !g) {
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.")
        }
        var d = function() {};
        d.prototype = h.prototype;
        g.prototype = new d();
        g.prototype.constructor = g;
        g.superclass = h.prototype;
        if (h.prototype.constructor == Object.prototype.constructor) {
            h.prototype.constructor = h
        }
        if (f) {
            var b;
            for (b in f) {
                g.prototype[b] = f[b]
            }
            var e = function() {}
              , c = ["toString", "valueOf"];
            try {
                if (/MSIE/.test(navigator.userAgent)) {
                    e = function(j, i) {
                        for (b = 0; b < c.length; b = b + 1) {
                            var l = c[b]
                              , k = i[l];
                            if (typeof k === "function" && k != Object.prototype[l]) {
                                j[l] = k
                            }
                        }
                    }
                }
            } catch (a) {}
            e(g.prototype, f)
        }
    }
};

var CryptoJS = CryptoJS || (function(e, g) {
    var a = {};
    var b = a.lib = {};
    var j = b.Base = (function() {
        function n() {}
        return {
            extend: function(p) {
                n.prototype = this;
                var o = new n();
                if (p) {
                    o.mixIn(p)
                }
                if (!o.hasOwnProperty("init")) {
                    o.init = function() {
                        o.$super.init.apply(this, arguments)
                    }
                }
                o.init.prototype = o;
                o.$super = this;
                return o
            },
            create: function() {
                var o = this.extend();
                o.init.apply(o, arguments);
                return o
            },
            init: function() {},
            mixIn: function(p) {
                for (var o in p) {
                    if (p.hasOwnProperty(o)) {
                        this[o] = p[o]
                    }
                }
                if (p.hasOwnProperty("toString")) {
                    this.toString = p.toString
                }
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
    }());
    var l = b.WordArray = j.extend({
        init: function(o, n) {
            o = this.words = o || [];
            if (n != g) {
                this.sigBytes = n
            } else {
                this.sigBytes = o.length * 4
            }
        },
        toString: function(n) {
            return (n || h).stringify(this)
        },
        concat: function(t) {
            var q = this.words;
            var p = t.words;
            var n = this.sigBytes;
            var s = t.sigBytes;
            this.clamp();
            if (n % 4) {
                for (var r = 0; r < s; r++) {
                    var o = (p[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                    q[(n + r) >>> 2] |= o << (24 - ((n + r) % 4) * 8)
                }
            } else {
                for (var r = 0; r < s; r += 4) {
                    q[(n + r) >>> 2] = p[r >>> 2]
                }
            }
            this.sigBytes += s;
            return this
        },
        clamp: function() {
            var o = this.words;
            var n = this.sigBytes;
            o[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8);
            o.length = e.ceil(n / 4)
        },
        clone: function() {
            var n = j.clone.call(this);
            n.words = this.words.slice(0);
            return n
        },
        random: function(p) {
            var o = [];
            for (var n = 0; n < p; n += 4) {
                o.push((e.random() * 4294967296) | 0)
            }
            return new l.init(o,p)
        }
    });
    var m = a.enc = {};
    var h = m.Hex = {
        stringify: function(p) {
            var r = p.words;
            var o = p.sigBytes;
            var q = [];
            for (var n = 0; n < o; n++) {
                var s = (r[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                q.push((s >>> 4).toString(16));
                q.push((s & 15).toString(16))
            }
            return q.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o += 2) {
                q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << (24 - (o % 8) * 4)
            }
            return new l.init(q,n / 2)
        }
    };
    var d = m.Latin1 = {
        stringify: function(q) {
            var r = q.words;
            var p = q.sigBytes;
            var n = [];
            for (var o = 0; o < p; o++) {
                var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                n.push(String.fromCharCode(s))
            }
            return n.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o++) {
                q[o >>> 2] |= (p.charCodeAt(o) & 255) << (24 - (o % 4) * 8)
            }
            return new l.init(q,n)
        }
    };
    var c = m.Utf8 = {
        stringify: function(n) {
            try {
                return decodeURIComponent(escape(d.stringify(n)))
            } catch (o) {
                throw new Error("Malformed UTF-8 data")
            }
        },
        parse: function(n) {
            return d.parse(unescape(encodeURIComponent(n)))
        }
    };
    var i = b.BufferedBlockAlgorithm = j.extend({
        reset: function() {
            this._data = new l.init();
            this._nDataBytes = 0
        },
        _append: function(n) {
            if (typeof n == "string") {
                n = c.parse(n)
            }
            this._data.concat(n);
            this._nDataBytes += n.sigBytes
        },
        _process: function(w) {
            var q = this._data;
            var x = q.words;
            var n = q.sigBytes;
            var t = this.blockSize;
            var v = t * 4;
            var u = n / v;
            if (w) {
                u = e.ceil(u)
            } else {
                u = e.max((u | 0) - this._minBufferSize, 0)
            }
            var s = u * t;
            var r = e.min(s * 4, n);
            if (s) {
                for (var p = 0; p < s; p += t) {
                    this._doProcessBlock(x, p)
                }
                var o = x.splice(0, s);
                q.sigBytes -= r
            }
            return new l.init(o,r)
        },
        clone: function() {
            var n = j.clone.call(this);
            n._data = this._data.clone();
            return n
        },
        _minBufferSize: 0
    });
    var f = b.Hasher = i.extend({
        cfg: j.extend(),
        init: function(n) {
            this.cfg = this.cfg.extend(n);
            this.reset()
        },
        reset: function() {
            i.reset.call(this);
            this._doReset()
        },
        update: function(n) {
            this._append(n);
            this._process();
            return this
        },
        finalize: function(n) {
            if (n) {
                this._append(n)
            }
            var o = this._doFinalize();
            return o
        },
        blockSize: 512 / 32,
        _createHelper: function(n) {
            return function(p, o) {
                return new n.init(o).finalize(p)
            }
        },
        _createHmacHelper: function(n) {
            return function(p, o) {
                return new k.HMAC.init(n,o).finalize(p)
            }
        }
    });
    var k = a.algo = {};
    return a
}(Math));
(function(g) {
    var a = CryptoJS
      , f = a.lib
      , e = f.Base
      , h = f.WordArray
      , a = a.x64 = {};
    a.Word = e.extend({
        init: function(b, c) {
            this.high = b;
            this.low = c
        }
    });
    a.WordArray = e.extend({
        init: function(b, c) {
            b = this.words = b || [];
            this.sigBytes = c != g ? c : 8 * b.length
        },
        toX32: function() {
            for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) {
                var e = b[d];
                a.push(e.high);
                a.push(e.low)
            }
            return h.create(a, this.sigBytes)
        },
        clone: function() {
            for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++)
                c[d] = c[d].clone();
            return b
        }
    })
}
)();

CryptoJS.lib.Cipher || function(u) {
    var g = CryptoJS
      , f = g.lib
      , k = f.Base
      , l = f.WordArray
      , q = f.BufferedBlockAlgorithm
      , r = g.enc.Base64
      , v = g.algo.EvpKDF
      , n = f.Cipher = q.extend({
        cfg: k.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b)
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b)
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c);
            this._xformMode = a;
            this._key = b;
            this.reset()
        },
        reset: function() {
            q.reset.call(this);
            this._doReset()
        },
        process: function(a) {
            this._append(a);
            return this._process()
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? s : j).encrypt(a, b, c, d)
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? s : j).decrypt(a, b, c, d)
                }
            }
        }
    });
    f.StreamCipher = n.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var m = g.mode = {}
      , t = function(a, b, c) {
        var d = this._iv;
        d ? this._iv = u : d = this._prevBlock;
        for (var e = 0; e < c; e++)
            a[b + e] ^= d[e]
    }
      , h = (f.BlockCipherMode = k.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b)
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b)
        },
        init: function(a, b) {
            this._cipher = a;
            this._iv = b
        }
    })).extend();
    h.Encryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher
              , d = c.blockSize;
            t.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + d)
        }
    });
    h.Decryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher
              , d = c.blockSize
              , e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            t.call(this, a, b, d);
            this._prevBlock = e
        }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4)
                e.push(d);
            c = l.create(e, c);
            a.concat(c)
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    f.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: m,
            padding: h
        }),
        reset: function() {
            n.reset.call(this);
            var a = this.cfg
              , b = a.iv
              , a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
                var c = a.createEncryptor;
            else
                c = a.createDecryptor,
                this._minBufferSize = 1;
            this._mode = c.call(a, this, b && b.words)
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b)
        },
        _doFinalize: function() {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else
                b = this._process(!0),
                a.unpad(b);
            return b
        },
        blockSize: 4
    });
    var p = f.CipherParams = k.extend({
        init: function(a) {
            this.mixIn(a)
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this)
        }
    })
      , m = (g.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
        },
        parse: function(a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = l.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16
            }
            return p.create({
                ciphertext: a,
                salt: c
            })
        }
    }
      , j = f.SerializableCipher = k.extend({
        cfg: k.extend({
            format: m
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var e = a.createEncryptor(c, d);
            b = e.finalize(b);
            e = e.cfg;
            return p.create({
                ciphertext: b,
                key: c,
                iv: e.iv,
                algorithm: a,
                mode: e.mode,
                padding: e.padding,
                blockSize: a.blockSize,
                formatter: d.format
            })
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext)
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a
        }
    })
      , g = (g.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            d || (d = l.random(8));
            a = v.create({
                keySize: b + c
            }).compute(a, d);
            c = l.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return p.create({
                key: a,
                iv: c,
                salt: d
            })
        }
    }
      , s = f.PasswordBasedCipher = j.extend({
        cfg: j.cfg.extend({
            kdf: g
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            c = d.kdf.execute(c, a.keySize, a.ivSize);
            d.iv = c.iv;
            a = j.encrypt.call(this, a, b, c.key, d);
            a.mixIn(c);
            return a
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            d.iv = c.iv;
            return j.decrypt.call(this, a, b, c.key, d)
        }
    })
}();

(function() {
    for (var q = CryptoJS, x = q.lib.BlockCipher, r = q.algo, j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++)
        g[k] = 128 > k ? k << 1 : k << 1 ^ 283;
    for (var n = 0, l = 0, k = 0; 256 > k; k++) {
        var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4
          , f = f >>> 8 ^ f & 255 ^ 99;
        j[n] = f;
        y[f] = n;
        var t = g[n]
          , D = g[t]
          , E = g[D]
          , b = 257 * g[f] ^ 16843008 * f;
        z[n] = b << 24 | b >>> 8;
        A[n] = b << 16 | b >>> 16;
        B[n] = b << 8 | b >>> 24;
        C[n] = b;
        b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
        s[f] = b << 24 | b >>> 8;
        u[f] = b << 16 | b >>> 16;
        v[f] = b << 8 | b >>> 24;
        w[f] = b;
        n ? (n = t ^ g[g[g[E ^ t]]],
        l ^= g[g[l]]) : n = l = 1
    }
    var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
      , r = r.AES = x.extend({
        _doReset: function() {
            for (var c = this._key, e = c.words, a = c.sigBytes / 4, c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++)
                if (h < a)
                    b[h] = e[h];
                else {
                    var d = b[h - 1];
                    h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24,
                    d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255],
                    d ^= F[h / a | 0] << 24);
                    b[h] = b[h - a] ^ d
                }
            e = this._invKeySchedule = [];
            for (a = 0; a < c; a++)
                h = c - a,
                d = a % 4 ? b[h] : b[h - 4],
                e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]]
        },
        encryptBlock: function(c, e) {
            this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j)
        },
        decryptBlock: function(c, e) {
            var a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a;
            this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
            a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a
        },
        _doCryptBlock: function(c, e, a, b, h, d, j, m) {
            for (var n = this._nRounds, f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++)
                var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++]
                  , r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++]
                  , s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++]
                  , p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++]
                  , f = q
                  , g = r
                  , k = s;
            q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
            r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
            s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
            p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
            c[e] = q;
            c[e + 1] = r;
            c[e + 2] = s;
            c[e + 3] = p
        },
        keySize: 8
    });
    q.AES = x._createHelper(r)
}
)();

(function() {
    var h = CryptoJS
      , j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words
              , f = b.sigBytes
              , c = this._map;
            b.clamp();
            b = [];
            for (var a = 0; a < f; a += 3)
                for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++)
                    b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64))
                for (; b.length % 4; )
                    b.push(e);
            return b.join("")
        },
        parse: function(b) {
            var e = b.length
              , f = this._map
              , c = f.charAt(64);
            c && (c = b.indexOf(c),
            -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d < e; d++)
                if (d % 4) {
                    var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4)
                      , h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                    c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                    a++
                }
            return j.create(c, a)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}
)();

(function() {
    var k = CryptoJS
      , b = k.lib
      , m = b.WordArray
      , l = b.Hasher
      , d = []
      , b = k.algo.SHA1 = l.extend({
        _doReset: function() {
            this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(n, p) {
            for (var a = this._hash.words, e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
                if (16 > c)
                    d[c] = n[p + c] | 0;
                else {
                    var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];
                    d[c] = g << 1 | g >>> 31
                }
                g = (e << 5 | e >>> 27) + b + d[c];
                g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^ j) - 899497514);
                b = j;
                j = h;
                h = f << 30 | f >>> 2;
                f = e;
                e = g
            }
            a[0] = a[0] + e | 0;
            a[1] = a[1] + f | 0;
            a[2] = a[2] + h | 0;
            a[3] = a[3] + j | 0;
            a[4] = a[4] + b | 0
        },
        _doFinalize: function() {
            var b = this._data
              , d = b.words
              , a = 8 * this._nDataBytes
              , e = 8 * b.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);
            d[(e + 64 >>> 9 << 4) + 15] = a;
            b.sigBytes = 4 * d.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var b = l.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    k.SHA1 = l._createHelper(b);
    k.HmacSHA1 = l._createHmacHelper(b)
}
)();

(function() {
    var b = CryptoJS
      , a = b.lib
      , d = a.Base
      , m = a.WordArray
      , a = b.algo
      , q = a.HMAC
      , l = a.PBKDF2 = d.extend({
        cfg: d.extend({
            keySize: 4,
            hasher: a.SHA1,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a)
        },
        compute: function(a, b) {
            for (var c = this.cfg, f = q.create(c.hasher, a), g = m.create(), d = m.create([1]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n; ) {
                var h = f.update(b).finalize(d);
                f.reset();
                for (var j = h.words, s = j.length, k = h, p = 1; p < c; p++) {
                    k = f.finalize(k);
                    f.reset();
                    for (var t = k.words, e = 0; e < s; e++)
                        j[e] ^= t[e]
                }
                g.concat(h);
                r[0]++
            }
            g.sigBytes = 4 * n;
            return g
        }
    });
    b.PBKDF2 = function(a, b, c) {
        return l.create(c).compute(a, b)
    }
}
)();
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d) {
    var b;
    var e;
    var a = "";
    for (b = 0; b + 3 <= d.length; b += 3) {
        e = parseInt(d.substring(b, b + 3), 16);
        a += b64map.charAt(e >> 6) + b64map.charAt(e & 63)
    }
    if (b + 1 == d.length) {
        e = parseInt(d.substring(b, b + 1), 16);
        a += b64map.charAt(e << 2)
    } else {
        if (b + 2 == d.length) {
            e = parseInt(d.substring(b, b + 2), 16);
            a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4)
        }
    }
    if (b64pad) {
        while ((a.length & 3) > 0) {
            a += b64pad
        }
    }
    return a
}
function b64tohex(f) {
    var d = "";
    var e;
    var b = 0;
    var c;
    var a;
    for (e = 0; e < f.length; ++e) {
        if (f.charAt(e) == b64pad) {
            break
        }
        a = b64map.indexOf(f.charAt(e));
        if (a < 0) {
            continue
        }
        if (b == 0) {
            d += int2char(a >> 2);
            c = a & 3;
            b = 1
        } else {
            if (b == 1) {
                d += int2char((c << 2) | (a >> 4));
                c = a & 15;
                b = 2
            } else {
                if (b == 2) {
                    d += int2char(c);
                    d += int2char(a >> 2);
                    c = a & 3;
                    b = 3
                } else {
                    d += int2char((c << 2) | (a >> 4));
                    d += int2char(a & 15);
                    b = 0
                }
            }
        }
    }
    if (b == 1) {
        d += int2char(c << 2)
    }
    return d
}
function b64toBA(e) {
    var d = b64tohex(e);
    var c;
    var b = new Array();
    for (c = 0; 2 * c < d.length; ++c) {
        b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16)
    }
    return b
}
;var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);
function BigInteger(e, d, f) {
    if (e != null) {
        if ("number" == typeof e) {
            this.fromNumber(e, d, f)
        } else {
            if (d == null && "string" != typeof e) {
                this.fromString(e, 256)
            } else {
                this.fromString(e, d)
            }
        }
    }
}
function nbi() {
    return new BigInteger(null)
}
function am1(f, a, b, e, h, g) {
    while (--g >= 0) {
        var d = a * this[f++] + b[e] + h;
        h = Math.floor(d / 67108864);
        b[e++] = d & 67108863
    }
    return h
}
function am2(f, q, r, e, o, a) {
    var k = q & 32767
      , p = q >> 15;
    while (--a >= 0) {
        var d = this[f] & 32767;
        var g = this[f++] >> 15;
        var b = p * d + g * k;
        d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
        o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
        r[e++] = d & 1073741823
    }
    return o
}
function am3(f, q, r, e, o, a) {
    var k = q & 16383
      , p = q >> 14;
    while (--a >= 0) {
        var d = this[f] & 16383;
        var g = this[f++] >> 14;
        var b = p * d + g * k;
        d = k * d + ((b & 16383) << 14) + r[e] + o;
        o = (d >> 28) + (b >> 14) + p * g;
        r[e++] = d & 268435455
    }
    return o
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else {
    if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
function int2char(a) {
    return BI_RM.charAt(a)
}
function intAt(b, a) {
    var d = BI_RC[b.charCodeAt(a)];
    return (d == null) ? -1 : d
}
function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) {
        b[a] = this[a]
    }
    b.t = this.t;
    b.s = this.s
}
function bnpFromInt(a) {
    this.t = 1;
    this.s = (a < 0) ? -1 : 0;
    if (a > 0) {
        this[0] = a
    } else {
        if (a < -1) {
            this[0] = a + this.DV
        } else {
            this.t = 0
        }
    }
}
function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b
}
function bnpFromString(h, c) {
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 256) {
                e = 8
            } else {
                if (c == 2) {
                    e = 1
                } else {
                    if (c == 32) {
                        e = 5
                    } else {
                        if (c == 4) {
                            e = 2
                        } else {
                            this.fromRadix(h, c);
                            return
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var g = h.length
      , d = false
      , f = 0;
    while (--g >= 0) {
        var a = (e == 8) ? h[g] & 255 : intAt(h, g);
        if (a < 0) {
            if (h.charAt(g) == "-") {
                d = true
            }
            continue
        }
        d = false;
        if (f == 0) {
            this[this.t++] = a
        } else {
            if (f + e > this.DB) {
                this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f;
                this[this.t++] = (a >> (this.DB - f))
            } else {
                this[this.t - 1] |= a << f
            }
        }
        f += e;
        if (f >= this.DB) {
            f -= this.DB
        }
    }
    if (e == 8 && (h[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f
        }
    }
    this.clamp();
    if (d) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {
        --this.t
    }
}
function bnToString(c) {
    if (this.s < 0) {
        return "-" + this.negate().toString(c)
    }
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 2) {
                e = 1
            } else {
                if (c == 32) {
                    e = 5
                } else {
                    if (c == 4) {
                        e = 2
                    } else {
                        return this.toRadix(c)
                    }
                }
            }
        }
    }
    var g = (1 << e) - 1, l, a = false, h = "", f = this.t;
    var j = this.DB - (f * this.DB) % e;
    if (f-- > 0) {
        if (j < this.DB && (l = this[f] >> j) > 0) {
            a = true;
            h = int2char(l)
        }
        while (f >= 0) {
            if (j < e) {
                l = (this[f] & ((1 << j) - 1)) << (e - j);
                l |= this[--f] >> (j += this.DB - e)
            } else {
                l = (this[f] >> (j -= e)) & g;
                if (j <= 0) {
                    j += this.DB;
                    --f
                }
            }
            if (l > 0) {
                a = true
            }
            if (a) {
                h += int2char(l)
            }
        }
    }
    return a ? h : "0"
}
function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}
function bnAbs() {
    return (this.s < 0) ? this.negate() : this
}
function bnCompareTo(b) {
    var d = this.s - b.s;
    if (d != 0) {
        return d
    }
    var c = this.t;
    d = c - b.t;
    if (d != 0) {
        return (this.s < 0) ? -d : d
    }
    while (--c >= 0) {
        if ((d = this[c] - b[c]) != 0) {
            return d
        }
    }
    return 0
}
function nbits(a) {
    var c = 1, b;
    if ((b = a >>> 16) != 0) {
        a = b;
        c += 16
    }
    if ((b = a >> 8) != 0) {
        a = b;
        c += 8
    }
    if ((b = a >> 4) != 0) {
        a = b;
        c += 4
    }
    if ((b = a >> 2) != 0) {
        a = b;
        c += 2
    }
    if ((b = a >> 1) != 0) {
        a = b;
        c += 1
    }
    return c
}
function bnBitLength() {
    if (this.t <= 0) {
        return 0
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}
function bnpDLShiftTo(c, b) {
    var a;
    for (a = this.t - 1; a >= 0; --a) {
        b[a + c] = this[a]
    }
    for (a = c - 1; a >= 0; --a) {
        b[a] = 0
    }
    b.t = this.t + c;
    b.s = this.s
}
function bnpDRShiftTo(c, b) {
    for (var a = c; a < this.t; ++a) {
        b[a - c] = this[a]
    }
    b.t = Math.max(this.t - c, 0);
    b.s = this.s
}
function bnpLShiftTo(j, e) {
    var b = j % this.DB;
    var a = this.DB - b;
    var g = (1 << a) - 1;
    var f = Math.floor(j / this.DB), h = (this.s << b) & this.DM, d;
    for (d = this.t - 1; d >= 0; --d) {
        e[d + f + 1] = (this[d] >> a) | h;
        h = (this[d] & g) << b
    }
    for (d = f - 1; d >= 0; --d) {
        e[d] = 0
    }
    e[f] = h;
    e.t = this.t + f + 1;
    e.s = this.s;
    e.clamp()
}
function bnpRShiftTo(g, d) {
    d.s = this.s;
    var e = Math.floor(g / this.DB);
    if (e >= this.t) {
        d.t = 0;
        return
    }
    var b = g % this.DB;
    var a = this.DB - b;
    var f = (1 << b) - 1;
    d[0] = this[e] >> b;
    for (var c = e + 1; c < this.t; ++c) {
        d[c - e - 1] |= (this[c] & f) << a;
        d[c - e] = this[c] >> b
    }
    if (b > 0) {
        d[this.t - e - 1] |= (this.s & f) << a
    }
    d.t = this.t - e;
    d.clamp()
}
function bnpSubTo(d, f) {
    var e = 0
      , g = 0
      , b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] - d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g -= d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g -= d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g -= d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g < -1) {
        f[e++] = this.DV + g
    } else {
        if (g > 0) {
            f[e++] = g
        }
    }
    f.t = e;
    f.clamp()
}
function bnpMultiplyTo(c, e) {
    var b = this.abs()
      , f = c.abs();
    var d = b.t;
    e.t = d + f.t;
    while (--d >= 0) {
        e[d] = 0
    }
    for (d = 0; d < f.t; ++d) {
        e[d + b.t] = b.am(0, f[d], e, d, 0, b.t)
    }
    e.s = 0;
    e.clamp();
    if (this.s != c.s) {
        BigInteger.ZERO.subTo(e, e)
    }
}
function bnpSquareTo(d) {
    var a = this.abs();
    var b = d.t = 2 * a.t;
    while (--b >= 0) {
        d[b] = 0
    }
    for (b = 0; b < a.t - 1; ++b) {
        var e = a.am(b, a[b], d, 2 * b, 0, 1);
        if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
            d[b + a.t] -= a.DV;
            d[b + a.t + 1] = 1
        }
    }
    if (d.t > 0) {
        d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1)
    }
    d.s = 0;
    d.clamp()
}
function bnpDivRemTo(n, h, g) {
    var w = n.abs();
    if (w.t <= 0) {
        return
    }
    var k = this.abs();
    if (k.t < w.t) {
        if (h != null) {
            h.fromInt(0)
        }
        if (g != null) {
            this.copyTo(g)
        }
        return
    }
    if (g == null) {
        g = nbi()
    }
    var d = nbi()
      , a = this.s
      , l = n.s;
    var v = this.DB - nbits(w[w.t - 1]);
    if (v > 0) {
        w.lShiftTo(v, d);
        k.lShiftTo(v, g)
    } else {
        w.copyTo(d);
        k.copyTo(g)
    }
    var p = d.t;
    var b = d[p - 1];
    if (b == 0) {
        return
    }
    var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0);
    var A = this.FV / o
      , z = (1 << this.F1) / o
      , x = 1 << this.F2;
    var u = g.t
      , s = u - p
      , f = (h == null) ? nbi() : h;
    d.dlShiftTo(s, f);
    if (g.compareTo(f) >= 0) {
        g[g.t++] = 1;
        g.subTo(f, g)
    }
    BigInteger.ONE.dlShiftTo(p, f);
    f.subTo(d, d);
    while (d.t < p) {
        d[d.t++] = 0
    }
    while (--s >= 0) {
        var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);
        if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
            d.dlShiftTo(s, f);
            g.subTo(f, g);
            while (g[u] < --c) {
                g.subTo(f, g)
            }
        }
    }
    if (h != null) {
        g.drShiftTo(p, h);
        if (a != l) {
            BigInteger.ZERO.subTo(h, h)
        }
    }
    g.t = p;
    g.clamp();
    if (v > 0) {
        g.rShiftTo(v, g)
    }
    if (a < 0) {
        BigInteger.ZERO.subTo(g, g)
    }
}
function bnMod(b) {
    var c = nbi();
    this.abs().divRemTo(b, null, c);
    if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
        b.subTo(c, c)
    }
    return c
}
function Classic(a) {
    this.m = a
}
function cConvert(a) {
    if (a.s < 0 || a.compareTo(this.m) >= 0) {
        return a.mod(this.m)
    } else {
        return a
    }
}
function cRevert(a) {
    return a
}
function cReduce(a) {
    a.divRemTo(this.m, null, a)
}
function cMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (this.t < 1) {
        return 0
    }
    var a = this[0];
    if ((a & 1) == 0) {
        return 0
    }
    var b = a & 3;
    b = (b * (2 - (a & 15) * b)) & 15;
    b = (b * (2 - (a & 255) * b)) & 255;
    b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
    b = (b * (2 - a * b % this.DV)) % this.DV;
    return (b > 0) ? this.DV - b : -b
}
function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (a.DB - 15)) - 1;
    this.mt2 = 2 * a.t
}
function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(b, b)
    }
    return b
}
function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}
function montReduce(a) {
    while (a.t <= this.mt2) {
        a[a.t++] = 0
    }
    for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767;
        var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM;
        b = c + this.m.t;
        a[b] += this.m.am(0, d, a, c, 0, this.m.t);
        while (a[b] >= a.DV) {
            a[b] -= a.DV;
            a[++b]++
        }
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    if (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function montMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}
function bnpExp(h, j) {
    if (h > 4294967295 || h < 1) {
        return BigInteger.ONE
    }
    var f = nbi()
      , a = nbi()
      , d = j.convert(this)
      , c = nbits(h) - 1;
    d.copyTo(f);
    while (--c >= 0) {
        j.sqrTo(f, a);
        if ((h & (1 << c)) > 0) {
            j.mulTo(a, d, f)
        } else {
            var b = f;
            f = a;
            a = b
        }
    }
    return j.revert(f)
}
function bnModPowInt(b, a) {
    var c;
    if (b < 256 || a.isEven()) {
        c = new Classic(a)
    } else {
        c = new Montgomery(a)
    }
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function bnClone() {
    var a = nbi();
    this.copyTo(a);
    return a
}
function bnIntValue() {
    if (this.s < 0) {
        if (this.t == 1) {
            return this[0] - this.DV
        } else {
            if (this.t == 0) {
                return -1
            }
        }
    } else {
        if (this.t == 1) {
            return this[0]
        } else {
            if (this.t == 0) {
                return 0
            }
        }
    }
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
}
function bnByteValue() {
    return (this.t == 0) ? this.s : (this[0] << 24) >> 24
}
function bnShortValue() {
    return (this.t == 0) ? this.s : (this[0] << 16) >> 16
}
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}
function bnSigNum() {
    if (this.s < 0) {
        return -1
    } else {
        if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
            return 0
        } else {
            return 1
        }
    }
}
function bnpToRadix(c) {
    if (c == null) {
        c = 10
    }
    if (this.signum() == 0 || c < 2 || c > 36) {
        return "0"
    }
    var f = this.chunkSize(c);
    var e = Math.pow(c, f);
    var i = nbv(e)
      , j = nbi()
      , h = nbi()
      , g = "";
    this.divRemTo(i, j, h);
    while (j.signum() > 0) {
        g = (e + h.intValue()).toString(c).substr(1) + g;
        j.divRemTo(i, j, h)
    }
    return h.intValue().toString(c) + g
}
function bnpFromRadix(m, h) {
    this.fromInt(0);
    if (h == null) {
        h = 10
    }
    var f = this.chunkSize(h);
    var g = Math.pow(h, f)
      , e = false
      , a = 0
      , l = 0;
    for (var c = 0; c < m.length; ++c) {
        var k = intAt(m, c);
        if (k < 0) {
            if (m.charAt(c) == "-" && this.signum() == 0) {
                e = true
            }
            continue
        }
        l = h * l + k;
        if (++a >= f) {
            this.dMultiply(g);
            this.dAddOffset(l, 0);
            a = 0;
            l = 0
        }
    }
    if (a > 0) {
        this.dMultiply(Math.pow(h, a));
        this.dAddOffset(l, 0)
    }
    if (e) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpFromNumber(f, e, h) {
    if ("number" == typeof e) {
        if (f < 2) {
            this.fromInt(1)
        } else {
            this.fromNumber(f, h);
            if (!this.testBit(f - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this)
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0)
            }
            while (!this.isProbablePrime(e)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > f) {
                    this.subTo(BigInteger.ONE.shiftLeft(f - 1), this)
                }
            }
        }
    } else {
        var d = new Array()
          , g = f & 7;
        d.length = (f >> 3) + 1;
        e.nextBytes(d);
        if (g > 0) {
            d[0] &= ((1 << g) - 1)
        } else {
            d[0] = 0
        }
        this.fromString(d, 256)
    }
}
function bnToByteArray() {
    var b = this.t
      , c = new Array();
    c[0] = this.s;
    var e = this.DB - (b * this.DB) % 8, f, a = 0;
    if (b-- > 0) {
        if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {
            c[a++] = f | (this.s << (this.DB - e))
        }
        while (b >= 0) {
            if (e < 8) {
                f = (this[b] & ((1 << e) - 1)) << (8 - e);
                f |= this[--b] >> (e += this.DB - 8)
            } else {
                f = (this[b] >> (e -= 8)) & 255;
                if (e <= 0) {
                    e += this.DB;
                    --b
                }
            }
            if ((f & 128) != 0) {
                f |= -256
            }
            if (a == 0 && (this.s & 128) != (f & 128)) {
                ++a
            }
            if (a > 0 || f != this.s) {
                c[a++] = f
            }
        }
    }
    return c
}
function bnEquals(b) {
    return (this.compareTo(b) == 0)
}
function bnMin(b) {
    return (this.compareTo(b) < 0) ? this : b
}
function bnMax(b) {
    return (this.compareTo(b) > 0) ? this : b
}
function bnpBitwiseTo(c, h, e) {
    var d, g, b = Math.min(c.t, this.t);
    for (d = 0; d < b; ++d) {
        e[d] = h(this[d], c[d])
    }
    if (c.t < this.t) {
        g = c.s & this.DM;
        for (d = b; d < this.t; ++d) {
            e[d] = h(this[d], g)
        }
        e.t = this.t
    } else {
        g = this.s & this.DM;
        for (d = b; d < c.t; ++d) {
            e[d] = h(g, c[d])
        }
        e.t = c.t
    }
    e.s = h(this.s, c.s);
    e.clamp()
}
function op_and(a, b) {
    return a & b
}
function bnAnd(b) {
    var c = nbi();
    this.bitwiseTo(b, op_and, c);
    return c
}
function op_or(a, b) {
    return a | b
}
function bnOr(b) {
    var c = nbi();
    this.bitwiseTo(b, op_or, c);
    return c
}
function op_xor(a, b) {
    return a ^ b
}
function bnXor(b) {
    var c = nbi();
    this.bitwiseTo(b, op_xor, c);
    return c
}
function op_andnot(a, b) {
    return a & ~b
}
function bnAndNot(b) {
    var c = nbi();
    this.bitwiseTo(b, op_andnot, c);
    return c
}
function bnNot() {
    var b = nbi();
    for (var a = 0; a < this.t; ++a) {
        b[a] = this.DM & ~this[a]
    }
    b.t = this.t;
    b.s = ~this.s;
    return b
}
function bnShiftLeft(b) {
    var a = nbi();
    if (b < 0) {
        this.rShiftTo(-b, a)
    } else {
        this.lShiftTo(b, a)
    }
    return a
}
function bnShiftRight(b) {
    var a = nbi();
    if (b < 0) {
        this.lShiftTo(-b, a)
    } else {
        this.rShiftTo(b, a)
    }
    return a
}
function lbit(a) {
    if (a == 0) {
        return -1
    }
    var b = 0;
    if ((a & 65535) == 0) {
        a >>= 16;
        b += 16
    }
    if ((a & 255) == 0) {
        a >>= 8;
        b += 8
    }
    if ((a & 15) == 0) {
        a >>= 4;
        b += 4
    }
    if ((a & 3) == 0) {
        a >>= 2;
        b += 2
    }
    if ((a & 1) == 0) {
        ++b
    }
    return b
}
function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a) {
        if (this[a] != 0) {
            return a * this.DB + lbit(this[a])
        }
    }
    if (this.s < 0) {
        return this.t * this.DB
    }
    return -1
}
function cbit(a) {
    var b = 0;
    while (a != 0) {
        a &= a - 1;
        ++b
    }
    return b
}
function bnBitCount() {
    var c = 0
      , a = this.s & this.DM;
    for (var b = 0; b < this.t; ++b) {
        c += cbit(this[b] ^ a)
    }
    return c
}
function bnTestBit(b) {
    var a = Math.floor(b / this.DB);
    if (a >= this.t) {
        return (this.s != 0)
    }
    return ((this[a] & (1 << (b % this.DB))) != 0)
}
function bnpChangeBit(c, b) {
    var a = BigInteger.ONE.shiftLeft(c);
    this.bitwiseTo(a, b, a);
    return a
}
function bnSetBit(a) {
    return this.changeBit(a, op_or)
}
function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}
function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}
function bnpAddTo(d, f) {
    var e = 0
      , g = 0
      , b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] + d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g += d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g += d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g > 0) {
        f[e++] = g
    } else {
        if (g < -1) {
            f[e++] = this.DV + g
        }
    }
    f.t = e;
    f.clamp()
}
function bnAdd(b) {
    var c = nbi();
    this.addTo(b, c);
    return c
}
function bnSubtract(b) {
    var c = nbi();
    this.subTo(b, c);
    return c
}
function bnMultiply(b) {
    var c = nbi();
    this.multiplyTo(b, c);
    return c
}
function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a
}
function bnDivide(b) {
    var c = nbi();
    this.divRemTo(b, c, null);
    return c
}
function bnRemainder(b) {
    var c = nbi();
    this.divRemTo(b, null, c);
    return c
}
function bnDivideAndRemainder(b) {
    var d = nbi()
      , c = nbi();
    this.divRemTo(b, d, c);
    return new Array(d,c)
}
function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}
function bnpDAddOffset(b, a) {
    if (b == 0) {
        return
    }
    while (this.t <= a) {
        this[this.t++] = 0
    }
    this[a] += b;
    while (this[a] >= this.DV) {
        this[a] -= this.DV;
        if (++a >= this.t) {
            this[this.t++] = 0
        }
        ++this[a]
    }
}
function NullExp() {}
function nNop(a) {
    return a
}
function nMulTo(a, c, b) {
    a.multiplyTo(c, b)
}
function nSqrTo(a, b) {
    a.squareTo(b)
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(a) {
    return this.exp(a, new NullExp())
}
function bnpMultiplyLowerTo(b, f, e) {
    var d = Math.min(this.t + b.t, f);
    e.s = 0;
    e.t = d;
    while (d > 0) {
        e[--d] = 0
    }
    var c;
    for (c = e.t - this.t; d < c; ++d) {
        e[d + this.t] = this.am(0, b[d], e, d, 0, this.t)
    }
    for (c = Math.min(b.t, f); d < c; ++d) {
        this.am(0, b[d], e, d, 0, f - d)
    }
    e.clamp()
}
function bnpMultiplyUpperTo(b, e, d) {
    --e;
    var c = d.t = this.t + b.t - e;
    d.s = 0;
    while (--c >= 0) {
        d[c] = 0
    }
    for (c = Math.max(e - this.t, 0); c < b.t; ++c) {
        d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e)
    }
    d.clamp();
    d.drShiftTo(1, d)
}
function Barrett(a) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
    this.mu = this.r2.divide(a);
    this.m = a
}
function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t) {
        return a.mod(this.m)
    } else {
        if (a.compareTo(this.m) < 0) {
            return a
        } else {
            var b = nbi();
            a.copyTo(b);
            this.reduce(b);
            return b
        }
    }
}
function barrettRevert(a) {
    return a
}
function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2);
    if (a.t > this.m.t + 1) {
        a.t = this.m.t + 1;
        a.clamp()
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (a.compareTo(this.r2) < 0) {
        a.dAddOffset(1, this.m.t + 1)
    }
    a.subTo(this.r2, a);
    while (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function barrettSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function barrettMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(q, f) {
    var o = q.bitLength(), h, b = nbv(1), v;
    if (o <= 0) {
        return b
    } else {
        if (o < 18) {
            h = 1
        } else {
            if (o < 48) {
                h = 3
            } else {
                if (o < 144) {
                    h = 4
                } else {
                    if (o < 768) {
                        h = 5
                    } else {
                        h = 6
                    }
                }
            }
        }
    }
    if (o < 8) {
        v = new Classic(f)
    } else {
        if (f.isEven()) {
            v = new Barrett(f)
        } else {
            v = new Montgomery(f)
        }
    }
    var p = new Array()
      , d = 3
      , s = h - 1
      , a = (1 << h) - 1;
    p[1] = v.convert(this);
    if (h > 1) {
        var A = nbi();
        v.sqrTo(p[1], A);
        while (d <= a) {
            p[d] = nbi();
            v.mulTo(A, p[d - 2], p[d]);
            d += 2
        }
    }
    var l = q.t - 1, x, u = true, c = nbi(), y;
    o = nbits(q[l]) - 1;
    while (l >= 0) {
        if (o >= s) {
            x = (q[l] >> (o - s)) & a
        } else {
            x = (q[l] & ((1 << (o + 1)) - 1)) << (s - o);
            if (l > 0) {
                x |= q[l - 1] >> (this.DB + o - s)
            }
        }
        d = h;
        while ((x & 1) == 0) {
            x >>= 1;
            --d
        }
        if ((o -= d) < 0) {
            o += this.DB;
            --l
        }
        if (u) {
            p[x].copyTo(b);
            u = false
        } else {
            while (d > 1) {
                v.sqrTo(b, c);
                v.sqrTo(c, b);
                d -= 2
            }
            if (d > 0) {
                v.sqrTo(b, c)
            } else {
                y = b;
                b = c;
                c = y
            }
            v.mulTo(c, p[x], b)
        }
        while (l >= 0 && (q[l] & (1 << o)) == 0) {
            v.sqrTo(b, c);
            y = b;
            b = c;
            c = y;
            if (--o < 0) {
                o = this.DB - 1;
                --l
            }
        }
    }
    return v.revert(b)
}
function bnGCD(c) {
    var b = (this.s < 0) ? this.negate() : this.clone();
    var h = (c.s < 0) ? c.negate() : c.clone();
    if (b.compareTo(h) < 0) {
        var e = b;
        b = h;
        h = e
    }
    var d = b.getLowestSetBit()
      , f = h.getLowestSetBit();
    if (f < 0) {
        return b
    }
    if (d < f) {
        f = d
    }
    if (f > 0) {
        b.rShiftTo(f, b);
        h.rShiftTo(f, h)
    }
    while (b.signum() > 0) {
        if ((d = b.getLowestSetBit()) > 0) {
            b.rShiftTo(d, b)
        }
        if ((d = h.getLowestSetBit()) > 0) {
            h.rShiftTo(d, h)
        }
        if (b.compareTo(h) >= 0) {
            b.subTo(h, b);
            b.rShiftTo(1, b)
        } else {
            h.subTo(b, h);
            h.rShiftTo(1, h)
        }
    }
    if (f > 0) {
        h.lShiftTo(f, h)
    }
    return h
}
function bnpModInt(e) {
    if (e <= 0) {
        return 0
    }
    var c = this.DV % e
      , b = (this.s < 0) ? e - 1 : 0;
    if (this.t > 0) {
        if (c == 0) {
            b = this[0] % e
        } else {
            for (var a = this.t - 1; a >= 0; --a) {
                b = (c * b + this[a]) % e
            }
        }
    }
    return b
}
function bnModInverse(f) {
    var j = f.isEven();
    if ((this.isEven() && j) || f.signum() == 0) {
        return BigInteger.ZERO
    }
    var i = f.clone()
      , h = this.clone();
    var g = nbv(1)
      , e = nbv(0)
      , l = nbv(0)
      , k = nbv(1);
    while (i.signum() != 0) {
        while (i.isEven()) {
            i.rShiftTo(1, i);
            if (j) {
                if (!g.isEven() || !e.isEven()) {
                    g.addTo(this, g);
                    e.subTo(f, e)
                }
                g.rShiftTo(1, g)
            } else {
                if (!e.isEven()) {
                    e.subTo(f, e)
                }
            }
            e.rShiftTo(1, e)
        }
        while (h.isEven()) {
            h.rShiftTo(1, h);
            if (j) {
                if (!l.isEven() || !k.isEven()) {
                    l.addTo(this, l);
                    k.subTo(f, k)
                }
                l.rShiftTo(1, l)
            } else {
                if (!k.isEven()) {
                    k.subTo(f, k)
                }
            }
            k.rShiftTo(1, k)
        }
        if (i.compareTo(h) >= 0) {
            i.subTo(h, i);
            if (j) {
                g.subTo(l, g)
            }
            e.subTo(k, e)
        } else {
            h.subTo(i, h);
            if (j) {
                l.subTo(g, l)
            }
            k.subTo(e, k)
        }
    }
    if (h.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO
    }
    if (k.compareTo(f) >= 0) {
        return k.subtract(f)
    }
    if (k.signum() < 0) {
        k.addTo(f, k)
    } else {
        return k
    }
    if (k.signum() < 0) {
        return k.add(f)
    } else {
        return k
    }
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var d, b = this.abs();
    if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {
        for (d = 0; d < lowprimes.length; ++d) {
            if (b[0] == lowprimes[d]) {
                return true
            }
        }
        return false
    }
    if (b.isEven()) {
        return false
    }
    d = 1;
    while (d < lowprimes.length) {
        var a = lowprimes[d]
          , c = d + 1;
        while (c < lowprimes.length && a < lplim) {
            a *= lowprimes[c++]
        }
        a = b.modInt(a);
        while (d < c) {
            if (a % lowprimes[d++] == 0) {
                return false
            }
        }
    }
    return b.millerRabin(e)
}
function bnpMillerRabin(f) {
    var g = this.subtract(BigInteger.ONE);
    var c = g.getLowestSetBit();
    if (c <= 0) {
        return false
    }
    var h = g.shiftRight(c);
    f = (f + 1) >> 1;
    if (f > lowprimes.length) {
        f = lowprimes.length
    }
    var b = nbi();
    for (var e = 0; e < f; ++e) {
        b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var l = b.modPow(h, this);
        if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {
            var d = 1;
            while (d++ < c && l.compareTo(g) != 0) {
                l = l.modPowInt(2, this);
                if (l.compareTo(BigInteger.ONE) == 0) {
                    return false
                }
            }
            if (l.compareTo(g) != 0) {
                return false
            }
        }
    }
    return true
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array()
}
function ARC4init(d) {
    var c, a, b;
    for (c = 0; c < 256; ++c) {
        this.S[c] = c
    }
    a = 0;
    for (c = 0; c < 256; ++c) {
        a = (a + this.S[c] + d[c % d.length]) & 255;
        b = this.S[c];
        this.S[c] = this.S[a];
        this.S[a] = b
    }
    this.i = 0;
    this.j = 0
}
function ARC4next() {
    var a;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    a = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = a;
    return this.S[(a + this.S[this.i]) & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
    return new Arcfour()
}
var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255;
    rng_pool[rng_pptr++] ^= (a >> 8) & 255;
    rng_pool[rng_pptr++] ^= (a >> 16) & 255;
    rng_pool[rng_pptr++] ^= (a >> 24) & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize
    }
}
function rng_seed_time() {
    rng_seed_int(new Date().getTime())
}
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (window !== undefined && (window.crypto !== undefined || window.msCrypto !== undefined)) {
        var crypto = window.crypto || window.msCrypto;
        if (crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            crypto.getRandomValues(ua);
            for (t = 0; t < 32; ++t) {
                rng_pool[rng_pptr++] = ua[t]
            }
        } else {
            if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t) {
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
                }
            }
        }
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255
    }
    rng_pptr = 0;
    rng_seed_time()
}
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0
        }
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a) {
        b[a] = rng_get_byte()
    }
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(b, a) {
    return new BigInteger(b,a)
}
function linebrk(c, d) {
    var a = "";
    var b = 0;
    while (b + d < c.length) {
        a += c.substring(b, b + d) + "\n";
        b += d
    }
    return a + c.substring(b, c.length)
}
function byte2Hex(a) {
    if (a < 16) {
        return "0" + a.toString(16)
    } else {
        return a.toString(16)
    }
}
function pkcs1pad2(e, h) {
    if (h < e.length + 11) {
        throw "Message too long for RSA";
        return null
    }
    var g = new Array();
    var d = e.length - 1;
    while (d >= 0 && h > 0) {
        var f = e.charCodeAt(d--);
        if (f < 128) {
            g[--h] = f
        } else {
            if ((f > 127) && (f < 2048)) {
                g[--h] = (f & 63) | 128;
                g[--h] = (f >> 6) | 192
            } else {
                g[--h] = (f & 63) | 128;
                g[--h] = ((f >> 6) & 63) | 128;
                g[--h] = (f >> 12) | 224
            }
        }
    }
    g[--h] = 0;
    var b = new SecureRandom();
    var a = new Array();
    while (h > 2) {
        a[0] = 0;
        while (a[0] == 0) {
            b.nextBytes(a)
        }
        g[--h] = a[0]
    }
    g[--h] = 2;
    g[--h] = 0;
    return new BigInteger(g)
}
function oaep_mgf1_arr(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += e(String.fromCharCode.apply(String, c.concat([(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255])));
        d += 1
    }
    return b
}
function oaep_pad(q, a, f, l) {
    var c = KJUR.crypto.MessageDigest;
    var o = KJUR.crypto.Util;
    var b = null;
    if (!f) {
        f = "sha1"
    }
    if (typeof f === "string") {
        b = c.getCanonicalAlgName(f);
        l = c.getHashLength(b);
        f = function(i) {
            return hextorstr(o.hashHex(rstrtohex(i), b))
        }
    }
    if (q.length + 2 * l + 2 > a) {
        throw "Message too long for RSA"
    }
    var k = "", e;
    for (e = 0; e < a - q.length - 2 * l - 2; e += 1) {
        k += "\x00"
    }
    var h = f("") + k + "\x01" + q;
    var g = new Array(l);
    new SecureRandom().nextBytes(g);
    var j = oaep_mgf1_arr(g, h.length, f);
    var p = [];
    for (e = 0; e < h.length; e += 1) {
        p[e] = h.charCodeAt(e) ^ j.charCodeAt(e)
    }
    var m = oaep_mgf1_arr(p, g.length, f);
    var d = [0];
    for (e = 0; e < g.length; e += 1) {
        d[e + 1] = g[e] ^ m.charCodeAt(e)
    }
    return new BigInteger(d.concat(p))
}
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null
}
function RSASetPublic(b, a) {
    this.isPublic = true;
    this.isPrivate = false;
    if (typeof b !== "string") {
        this.n = b;
        this.e = a
    } else {
        if (b != null && a != null && b.length > 0 && a.length > 0) {
            this.n = parseBigInt(b, 16);
            this.e = parseInt(a, 16)
        } else {
            throw "Invalid RSA public key"
        }
    }
}
function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n)
}
function RSAEncrypt(d) {
    var a = pkcs1pad2(d, (this.n.bitLength() + 7) >> 3);
    if (a == null) {
        return null
    }
    var e = this.doPublic(a);
    if (e == null) {
        return null
    }
    var b = e.toString(16);
    if ((b.length & 1) == 0) {
        return b
    } else {
        return "0" + b
    }
}
function RSAEncryptOAEP(f, e, b) {
    var a = oaep_pad(f, (this.n.bitLength() + 7) >> 3, e, b);
    if (a == null) {
        return null
    }
    var g = this.doPublic(a);
    if (g == null) {
        return null
    }
    var d = g.toString(16);
    if ((d.length & 1) == 0) {
        return d
    } else {
        return "0" + d
    }
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;
RSAKey.prototype.type = "RSA";
function pkcs1unpad2(g, j) {
    var a = g.toByteArray();
    var f = 0;
    while (f < a.length && a[f] == 0) {
        ++f
    }
    if (a.length - f != j - 1 || a[f] != 2) {
        return null
    }
    ++f;
    while (a[f] != 0) {
        if (++f >= a.length) {
            return null
        }
    }
    var e = "";
    while (++f < a.length) {
        var h = a[f] & 255;
        if (h < 128) {
            e += String.fromCharCode(h)
        } else {
            if ((h > 191) && (h < 224)) {
                e += String.fromCharCode(((h & 31) << 6) | (a[f + 1] & 63));
                ++f
            } else {
                e += String.fromCharCode(((h & 15) << 12) | ((a[f + 1] & 63) << 6) | (a[f + 2] & 63));
                f += 2
            }
        }
    }
    return e
}
function oaep_mgf1_str(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += e(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]));
        d += 1
    }
    return b
}
function oaep_unpad(o, b, g, p) {
    var e = KJUR.crypto.MessageDigest;
    var r = KJUR.crypto.Util;
    var c = null;
    if (!g) {
        g = "sha1"
    }
    if (typeof g === "string") {
        c = e.getCanonicalAlgName(g);
        p = e.getHashLength(c);
        g = function(d) {
            return hextorstr(r.hashHex(rstrtohex(d), c))
        }
    }
    o = o.toByteArray();
    var h;
    for (h = 0; h < o.length; h += 1) {
        o[h] &= 255
    }
    while (o.length < b) {
        o.unshift(0)
    }
    o = String.fromCharCode.apply(String, o);
    if (o.length < 2 * p + 2) {
        throw "Cipher too short"
    }
    var f = o.substr(1, p);
    var s = o.substr(p + 1);
    var q = oaep_mgf1_str(s, p, g);
    var k = [], h;
    for (h = 0; h < f.length; h += 1) {
        k[h] = f.charCodeAt(h) ^ q.charCodeAt(h)
    }
    var l = oaep_mgf1_str(String.fromCharCode.apply(String, k), o.length - p, g);
    var j = [];
    for (h = 0; h < s.length; h += 1) {
        j[h] = s.charCodeAt(h) ^ l.charCodeAt(h)
    }
    j = String.fromCharCode.apply(String, j);
    if (j.substr(0, p) !== g("")) {
        throw "Hash mismatch"
    }
    j = j.substr(p);
    var a = j.indexOf("\x01");
    var m = (a != -1) ? j.substr(0, a).lastIndexOf("\x00") : -1;
    if (m + 1 != a) {
        throw "Malformed data"
    }
    return j.substr(a + 1)
}
function RSASetPrivate(c, a, b) {
    this.isPrivate = true;
    if (typeof c !== "string") {
        this.n = c;
        this.e = a;
        this.d = b
    } else {
        if (c != null && a != null && c.length > 0 && a.length > 0) {
            this.n = parseBigInt(c, 16);
            this.e = parseInt(a, 16);
            this.d = parseBigInt(b, 16)
        } else {
            throw "Invalid RSA private key"
        }
    }
}
function RSASetPrivateEx(g, d, e, c, b, a, h, f) {
    this.isPrivate = true;
    this.isPublic = false;
    if (g == null) {
        throw "RSASetPrivateEx N == null"
    }
    if (d == null) {
        throw "RSASetPrivateEx E == null"
    }
    if (g.length == 0) {
        throw "RSASetPrivateEx N.length == 0"
    }
    if (d.length == 0) {
        throw "RSASetPrivateEx E.length == 0"
    }
    if (g != null && d != null && g.length > 0 && d.length > 0) {
        this.n = parseBigInt(g, 16);
        this.e = parseInt(d, 16);
        this.d = parseBigInt(e, 16);
        this.p = parseBigInt(c, 16);
        this.q = parseBigInt(b, 16);
        this.dmp1 = parseBigInt(a, 16);
        this.dmq1 = parseBigInt(h, 16);
        this.coeff = parseBigInt(f, 16)
    } else {
        throw "Invalid RSA private key in RSASetPrivateEx"
    }
}
function RSAGenerate(b, i) {
    var a = new SecureRandom();
    var f = b >> 1;
    this.e = parseInt(i, 16);
    var c = new BigInteger(i,16);
    for (; ; ) {
        for (; ; ) {
            this.p = new BigInteger(b - f,1,a);
            if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break
            }
        }
        for (; ; ) {
            this.q = new BigInteger(f,1,a);
            if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var h = this.p;
            this.p = this.q;
            this.q = h
        }
        var g = this.p.subtract(BigInteger.ONE);
        var d = this.q.subtract(BigInteger.ONE);
        var e = g.multiply(d);
        if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = c.modInverse(e);
            this.dmp1 = this.d.mod(g);
            this.dmq1 = this.d.mod(d);
            this.coeff = this.q.modInverse(this.p);
            break
        }
    }
    this.isPrivate = true
}
function RSADoPrivate(a) {
    if (this.p == null || this.q == null) {
        return a.modPow(this.d, this.n)
    }
    var c = a.mod(this.p).modPow(this.dmp1, this.p);
    var b = a.mod(this.q).modPow(this.dmq1, this.q);
    while (c.compareTo(b) < 0) {
        c = c.add(this.p)
    }
    return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)
}
function RSADecrypt(b) {
    var d = parseBigInt(b, 16);
    var a = this.doPrivate(d);
    if (a == null) {
        return null
    }
    return pkcs1unpad2(a, (this.n.bitLength() + 7) >> 3)
}
function RSADecryptOAEP(e, d, b) {
    var f = parseBigInt(e, 16);
    var a = this.doPrivate(f);
    if (a == null) {
        return null
    }
    return oaep_unpad(a, (this.n.bitLength() + 7) >> 3, d, b)
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
var ASN1HEX = new function() {}
;
ASN1HEX.getLblen = function(c, a) {
    if (c.substr(a + 2, 1) != "8") {
        return 1
    }
    var b = parseInt(c.substr(a + 3, 1));
    if (b == 0) {
        return -1
    }
    if (0 < b && b < 10) {
        return b + 1
    }
    return -2
}
;
ASN1HEX.getL = function(c, b) {
    var a = ASN1HEX.getLblen(c, b);
    if (a < 1) {
        return ""
    }
    return c.substr(b + 2, a * 2)
}
;
ASN1HEX.getVblen = function(d, a) {
    var c, b;
    c = ASN1HEX.getL(d, a);
    if (c == "") {
        return -1
    }
    if (c.substr(0, 1) === "8") {
        b = new BigInteger(c.substr(2),16)
    } else {
        b = new BigInteger(c,16)
    }
    return b.intValue()
}
;
ASN1HEX.getVidx = function(c, b) {
    var a = ASN1HEX.getLblen(c, b);
    if (a < 0) {
        return a
    }
    return b + (a + 1) * 2
}
;
ASN1HEX.getV = function(d, a) {
    var c = ASN1HEX.getVidx(d, a);
    var b = ASN1HEX.getVblen(d, a);
    return d.substr(c, b * 2)
}
;
ASN1HEX.getTLV = function(b, a) {
    return b.substr(a, 2) + ASN1HEX.getL(b, a) + ASN1HEX.getV(b, a)
}
;
ASN1HEX.getNextSiblingIdx = function(d, a) {
    var c = ASN1HEX.getVidx(d, a);
    var b = ASN1HEX.getVblen(d, a);
    return c + b * 2
}
;
ASN1HEX.getChildIdx = function(e, f) {
    var j = ASN1HEX;
    var g = new Array();
    var i = j.getVidx(e, f);
    if (e.substr(f, 2) == "03") {
        g.push(i + 2)
    } else {
        g.push(i)
    }
    var l = j.getVblen(e, f);
    var c = i;
    var d = 0;
    while (1) {
        var b = j.getNextSiblingIdx(e, c);
        if (b == null || (b - i >= (l * 2))) {
            break
        }
        if (d >= 200) {
            break
        }
        g.push(b);
        c = b;
        d++
    }
    return g
}
;
ASN1HEX.getNthChildIdx = function(d, b, e) {
    var c = ASN1HEX.getChildIdx(d, b);
    return c[e]
}
;
ASN1HEX.getIdxbyList = function(e, d, c, i) {
    var g = ASN1HEX;
    var f, b;
    if (c.length == 0) {
        if (i !== undefined) {
            if (e.substr(d, 2) !== i) {
                throw "checking tag doesn't match: " + e.substr(d, 2) + "!=" + i
            }
        }
        return d
    }
    f = c.shift();
    b = g.getChildIdx(e, d);
    return g.getIdxbyList(e, b[f], c, i)
}
;
ASN1HEX.getTLVbyList = function(d, c, b, f) {
    var e = ASN1HEX;
    var a = e.getIdxbyList(d, c, b);
    if (a === undefined) {
        throw "can't find nthList object"
    }
    if (f !== undefined) {
        if (d.substr(a, 2) != f) {
            throw "checking tag doesn't match: " + d.substr(a, 2) + "!=" + f
        }
    }
    return e.getTLV(d, a)
}
;
ASN1HEX.getVbyList = function(e, c, b, g, i) {
    var f = ASN1HEX;
    var a, d;
    a = f.getIdxbyList(e, c, b, g);
    if (a === undefined) {
        throw "can't find nthList object"
    }
    d = f.getV(e, a);
    if (i === true) {
        d = d.substr(2)
    }
    return d
}
;
ASN1HEX.hextooidstr = function(e) {
    var h = function(b, a) {
        if (b.length >= a) {
            return b
        }
        return new Array(a - b.length + 1).join("0") + b
    };
    var l = [];
    var o = e.substr(0, 2);
    var f = parseInt(o, 16);
    l[0] = new String(Math.floor(f / 40));
    l[1] = new String(f % 40);
    var m = e.substr(2);
    var k = [];
    for (var g = 0; g < m.length / 2; g++) {
        k.push(parseInt(m.substr(g * 2, 2), 16))
    }
    var j = [];
    var d = "";
    for (var g = 0; g < k.length; g++) {
        if (k[g] & 128) {
            d = d + h((k[g] & 127).toString(2), 7)
        } else {
            d = d + h((k[g] & 127).toString(2), 7);
            j.push(new String(parseInt(d, 2)));
            d = ""
        }
    }
    var n = l.join(".");
    if (j.length > 0) {
        n = n + "." + j.join(".")
    }
    return n
}
;
ASN1HEX.dump = function(t, c, l, g) {
    var p = ASN1HEX;
    var j = p.getV;
    var y = p.dump;
    var w = p.getChildIdx;
    var e = t;
    if (t instanceof KJUR.asn1.ASN1Object) {
        e = t.getEncodedHex()
    }
    var q = function(A, i) {
        if (A.length <= i * 2) {
            return A
        } else {
            var v = A.substr(0, i) + "..(total " + A.length / 2 + "bytes).." + A.substr(A.length - i, i);
            return v
        }
    };
    if (c === undefined) {
        c = {
            ommit_long_octet: 32
        }
    }
    if (l === undefined) {
        l = 0
    }
    if (g === undefined) {
        g = ""
    }
    var x = c.ommit_long_octet;
    if (e.substr(l, 2) == "01") {
        var h = j(e, l);
        if (h == "00") {
            return g + "BOOLEAN FALSE\n"
        } else {
            return g + "BOOLEAN TRUE\n"
        }
    }
    if (e.substr(l, 2) == "02") {
        var h = j(e, l);
        return g + "INTEGER " + q(h, x) + "\n"
    }
    if (e.substr(l, 2) == "03") {
        var h = j(e, l);
        return g + "BITSTRING " + q(h, x) + "\n"
    }
    if (e.substr(l, 2) == "04") {
        var h = j(e, l);
        if (p.isASN1HEX(h)) {
            var k = g + "OCTETSTRING, encapsulates\n";
            k = k + y(h, c, 0, g + "  ");
            return k
        } else {
            return g + "OCTETSTRING " + q(h, x) + "\n"
        }
    }
    if (e.substr(l, 2) == "05") {
        return g + "NULL\n"
    }
    if (e.substr(l, 2) == "06") {
        var m = j(e, l);
        var a = KJUR.asn1.ASN1Util.oidHexToInt(m);
        var o = KJUR.asn1.x509.OID.oid2name(a);
        var b = a.replace(/\./g, " ");
        if (o != "") {
            return g + "ObjectIdentifier " + o + " (" + b + ")\n"
        } else {
            return g + "ObjectIdentifier (" + b + ")\n"
        }
    }
    if (e.substr(l, 2) == "0c") {
        return g + "UTF8String '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "13") {
        return g + "PrintableString '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "14") {
        return g + "TeletexString '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "16") {
        return g + "IA5String '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "17") {
        return g + "UTCTime " + hextoutf8(j(e, l)) + "\n"
    }
    if (e.substr(l, 2) == "18") {
        return g + "GeneralizedTime " + hextoutf8(j(e, l)) + "\n"
    }
    if (e.substr(l, 2) == "30") {
        if (e.substr(l, 4) == "3000") {
            return g + "SEQUENCE {}\n"
        }
        var k = g + "SEQUENCE\n";
        var d = w(e, l);
        var f = c;
        if ((d.length == 2 || d.length == 3) && e.substr(d[0], 2) == "06" && e.substr(d[d.length - 1], 2) == "04") {
            var o = p.oidname(j(e, d[0]));
            var r = JSON.parse(JSON.stringify(c));
            r.x509ExtName = o;
            f = r
        }
        for (var u = 0; u < d.length; u++) {
            k = k + y(e, f, d[u], g + "  ")
        }
        return k
    }
    if (e.substr(l, 2) == "31") {
        var k = g + "SET\n";
        var d = w(e, l);
        for (var u = 0; u < d.length; u++) {
            k = k + y(e, c, d[u], g + "  ")
        }
        return k
    }
    var z = parseInt(e.substr(l, 2), 16);
    if ((z & 128) != 0) {
        var n = z & 31;
        if ((z & 32) != 0) {
            var k = g + "[" + n + "]\n";
            var d = w(e, l);
            for (var u = 0; u < d.length; u++) {
                k = k + y(e, c, d[u], g + "  ")
            }
            return k
        } else {
            var h = j(e, l);
            if (h.substr(0, 8) == "68747470") {
                h = hextoutf8(h)
            }
            if (c.x509ExtName === "subjectAltName" && n == 2) {
                h = hextoutf8(h)
            }
            var k = g + "[" + n + "] " + h + "\n";
            return k
        }
    }
    return g + "UNKNOWN(" + e.substr(l, 2) + ") " + j(e, l) + "\n"
}
;
ASN1HEX.isASN1HEX = function(e) {
    var d = ASN1HEX;
    if (e.length % 2 == 1) {
        return false
    }
    var c = d.getVblen(e, 0);
    var b = e.substr(0, 2);
    var f = d.getL(e, 0);
    var a = e.length - b.length - f.length;
    if (a == c * 2) {
        return true
    }
    return false
}
;
ASN1HEX.oidname = function(a) {
    var c = KJUR.asn1;
    if (KJUR.lang.String.isHex(a)) {
        a = c.ASN1Util.oidHexToInt(a)
    }
    var b = c.x509.OID.oid2name(a);
    if (b === "") {
        b = a
    }
    return b
}
;
var KJUR;
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.lang == "undefined" || !KJUR.lang) {
    KJUR.lang = {}
}
KJUR.lang.String = function() {}
;
function Base64x() {}
function stoBA(d) {
    var b = new Array();
    for (var c = 0; c < d.length; c++) {
        b[c] = d.charCodeAt(c)
    }
    return b
}
function BAtos(b) {
    var d = "";
    for (var c = 0; c < b.length; c++) {
        d = d + String.fromCharCode(b[c])
    }
    return d
}
function BAtohex(b) {
    var e = "";
    for (var d = 0; d < b.length; d++) {
        var c = b[d].toString(16);
        if (c.length == 1) {
            c = "0" + c
        }
        e = e + c
    }
    return e
}
function stohex(a) {
    return BAtohex(stoBA(a))
}
function stob64(a) {
    return hex2b64(stohex(a))
}
function stob64u(a) {
    return b64tob64u(hex2b64(stohex(a)))
}
function b64utos(a) {
    return BAtos(b64toBA(b64utob64(a)))
}
function b64tob64u(a) {
    a = a.replace(/\=/g, "");
    a = a.replace(/\+/g, "-");
    a = a.replace(/\//g, "_");
    return a
}
function b64utob64(a) {
    if (a.length % 4 == 2) {
        a = a + "=="
    } else {
        if (a.length % 4 == 3) {
            a = a + "="
        }
    }
    a = a.replace(/-/g, "+");
    a = a.replace(/_/g, "/");
    return a
}
function hextob64u(a) {
    if (a.length % 2 == 1) {
        a = "0" + a
    }
    return b64tob64u(hex2b64(a))
}
function b64utohex(a) {
    return b64tohex(b64utob64(a))
}
var utf8tob64u, b64utoutf8;
if (typeof Buffer === "function") {
    utf8tob64u = function(a) {
        return b64tob64u(new Buffer(a,"utf8").toString("base64"))
    }
    ;
    b64utoutf8 = function(a) {
        return new Buffer(b64utob64(a),"base64").toString("utf8")
    }
} else {
    utf8tob64u = function(a) {
        return hextob64u(uricmptohex(encodeURIComponentAll(a)))
    }
    ;
    b64utoutf8 = function(a) {
        return decodeURIComponent(hextouricmp(b64utohex(a)))
    }
}
function utf8tob64(a) {
    return hex2b64(uricmptohex(encodeURIComponentAll(a)))
}
function b64toutf8(a) {
    return decodeURIComponent(hextouricmp(b64tohex(a)))
}
function utf8tohex(a) {
    return uricmptohex(encodeURIComponentAll(a))
}
function hextoutf8(a) {
    return decodeURIComponent(hextouricmp(a))
}
function hextorstr(c) {
    var b = "";
    for (var a = 0; a < c.length - 1; a += 2) {
        b += String.fromCharCode(parseInt(c.substr(a, 2), 16))
    }
    return b
}
function rstrtohex(c) {
    var a = "";
    for (var b = 0; b < c.length; b++) {
        a += ("0" + c.charCodeAt(b).toString(16)).slice(-2)
    }
    return a
}
function hextob64(a) {
    return hex2b64(a)
}
function hextob64nl(b) {
    var a = hextob64(b);
    var c = a.replace(/(.{64})/g, "$1\r\n");
    c = c.replace(/\r\n$/, "");
    return c
}
function b64nltohex(b) {
    var a = b.replace(/[^0-9A-Za-z\/+=]*/g, "");
    var c = b64tohex(a);
    return c
}
function hextopem(a, b) {
    var c = hextob64nl(a);
    return "-----BEGIN " + b + "-----\r\n" + c + "\r\n-----END " + b + "-----\r\n"
}
function pemtohex(a, b) {
    if (a.indexOf("-----BEGIN ") == -1) {
        throw "can't find PEM header: " + b
    }
    if (b !== undefined) {
        a = a.replace("-----BEGIN " + b + "-----", "");
        a = a.replace("-----END " + b + "-----", "")
    } else {
        a = a.replace(/-----BEGIN [^-]+-----/, "");
        a = a.replace(/-----END [^-]+-----/, "")
    }
    return b64nltohex(a)
}
function hextoArrayBuffer(d) {
    if (d.length % 2 != 0) {
        throw "input is not even length"
    }
    if (d.match(/^[0-9A-Fa-f]+$/) == null) {
        throw "input is not hexadecimal"
    }
    var b = new ArrayBuffer(d.length / 2);
    var a = new DataView(b);
    for (var c = 0; c < d.length / 2; c++) {
        a.setUint8(c, parseInt(d.substr(c * 2, 2), 16))
    }
    return b
}
function ArrayBuffertohex(b) {
    var d = "";
    var a = new DataView(b);
    for (var c = 0; c < b.byteLength; c++) {
        d += ("00" + a.getUint8(c).toString(16)).slice(-2)
    }
    return d
}
function zulutomsec(n) {
    var l, j, m, e, f, i, b, k;
    var a, h, g, c;
    c = n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);
    if (c) {
        a = c[1];
        l = parseInt(a);
        if (a.length === 2) {
            if (50 <= l && l < 100) {
                l = 1900 + l
            } else {
                if (0 <= l && l < 50) {
                    l = 2000 + l
                }
            }
        }
        j = parseInt(c[2]) - 1;
        m = parseInt(c[3]);
        e = parseInt(c[4]);
        f = parseInt(c[5]);
        i = parseInt(c[6]);
        b = 0;
        h = c[7];
        if (h !== "") {
            g = (h.substr(1) + "00").substr(0, 3);
            b = parseInt(g)
        }
        return Date.UTC(l, j, m, e, f, i, b)
    }
    throw "unsupported zulu format: " + n
}
function zulutosec(a) {
    var b = zulutomsec(a);
    return ~~(b / 1000)
}
function zulutodate(a) {
    return new Date(zulutomsec(a))
}
function datetozulu(g, e, f) {
    var b;
    var a = g.getUTCFullYear();
    if (e) {
        if (a < 1950 || 2049 < a) {
            throw "not proper year for UTCTime: " + a
        }
        b = ("" + a).slice(-2)
    } else {
        b = ("000" + a).slice(-4)
    }
    b += ("0" + (g.getUTCMonth() + 1)).slice(-2);
    b += ("0" + g.getUTCDate()).slice(-2);
    b += ("0" + g.getUTCHours()).slice(-2);
    b += ("0" + g.getUTCMinutes()).slice(-2);
    b += ("0" + g.getUTCSeconds()).slice(-2);
    if (f) {
        var c = g.getUTCMilliseconds();
        if (c !== 0) {
            c = ("00" + c).slice(-3);
            c = c.replace(/0+$/g, "");
            b += "." + c
        }
    }
    b += "Z";
    return b
}
function uricmptohex(a) {
    return a.replace(/%/g, "")
}
function hextouricmp(a) {
    return a.replace(/(..)/g, "%$1")
}
function ipv6tohex(g) {
    var b = "malformed IPv6 address";
    if (!g.match(/^[0-9A-Fa-f:]+$/)) {
        throw b
    }
    g = g.toLowerCase();
    var d = g.split(":").length - 1;
    if (d < 2) {
        throw b
    }
    var e = ":".repeat(7 - d + 2);
    g = g.replace("::", e);
    var c = g.split(":");
    if (c.length != 8) {
        throw b
    }
    for (var f = 0; f < 8; f++) {
        c[f] = ("0000" + c[f]).slice(-4)
    }
    return c.join("")
}
function hextoipv6(e) {
    if (!e.match(/^[0-9A-Fa-f]{32}$/)) {
        throw "malformed IPv6 address octet"
    }
    e = e.toLowerCase();
    var b = e.match(/.{1,4}/g);
    for (var d = 0; d < 8; d++) {
        b[d] = b[d].replace(/^0+/, "");
        if (b[d] == "") {
            b[d] = "0"
        }
    }
    e = ":" + b.join(":") + ":";
    var c = e.match(/:(0:){2,}/g);
    if (c === null) {
        return e.slice(1, -1)
    }
    var f = "";
    for (var d = 0; d < c.length; d++) {
        if (c[d].length > f.length) {
            f = c[d]
        }
    }
    e = e.replace(f, "::");
    return e.slice(1, -1)
}
function hextoip(b) {
    var d = "malformed hex value";
    if (!b.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) {
        throw d
    }
    if (b.length == 8) {
        var c;
        try {
            c = parseInt(b.substr(0, 2), 16) + "." + parseInt(b.substr(2, 2), 16) + "." + parseInt(b.substr(4, 2), 16) + "." + parseInt(b.substr(6, 2), 16);
            return c
        } catch (a) {
            throw d
        }
    } else {
        if (b.length == 32) {
            return hextoipv6(b)
        } else {
            return b
        }
    }
}
function iptohex(f) {
    var j = "malformed IP address";
    f = f.toLowerCase(f);
    if (f.match(/^[0-9.]+$/)) {
        var b = f.split(".");
        if (b.length !== 4) {
            throw j
        }
        var g = "";
        try {
            for (var e = 0; e < 4; e++) {
                var h = parseInt(b[e]);
                g += ("0" + h.toString(16)).slice(-2)
            }
            return g
        } catch (c) {
            throw j
        }
    } else {
        if (f.match(/^[0-9a-f:]+$/) && f.indexOf(":") !== -1) {
            return ipv6tohex(f)
        } else {
            throw j
        }
    }
}
function encodeURIComponentAll(a) {
    var d = encodeURIComponent(a);
    var b = "";
    for (var c = 0; c < d.length; c++) {
        if (d[c] == "%") {
            b = b + d.substr(c, 3);
            c = c + 2
        } else {
            b = b + "%" + stohex(d[c])
        }
    }
    return b
}
function newline_toUnix(a) {
    a = a.replace(/\r\n/mg, "\n");
    return a
}
function newline_toDos(a) {
    a = a.replace(/\r\n/mg, "\n");
    a = a.replace(/\n/mg, "\r\n");
    return a
}
KJUR.lang.String.isInteger = function(a) {
    if (a.match(/^[0-9]+$/)) {
        return true
    } else {
        if (a.match(/^-[0-9]+$/)) {
            return true
        } else {
            return false
        }
    }
}
;
KJUR.lang.String.isHex = function(a) {
    if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) {
        return true
    } else {
        return false
    }
}
;
KJUR.lang.String.isBase64 = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) {
        return true
    } else {
        return false
    }
}
;
KJUR.lang.String.isBase64URL = function(a) {
    if (a.match(/[+/=]/)) {
        return false
    }
    a = b64utob64(a);
    return KJUR.lang.String.isBase64(a)
}
;
KJUR.lang.String.isIntegerArray = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^\[[0-9,]+\]$/)) {
        return true
    } else {
        return false
    }
}
;
function hextoposhex(a) {
    if (a.length % 2 == 1) {
        return "0" + a
    }
    if (a.substr(0, 1) > "7") {
        return "00" + a
    }
    return a
}
function intarystrtohex(b) {
    b = b.replace(/^\s*\[\s*/, "");
    b = b.replace(/\s*\]\s*$/, "");
    b = b.replace(/\s*/g, "");
    try {
        var c = b.split(/,/).map(function(g, e, h) {
            var f = parseInt(g);
            if (f < 0 || 255 < f) {
                throw "integer not in range 0-255"
            }
            var d = ("00" + f.toString(16)).slice(-2);
            return d
        }).join("");
        return c
    } catch (a) {
        throw "malformed integer array string: " + a
    }
}
var strdiffidx = function(c, a) {
    var d = c.length;
    if (c.length > a.length) {
        d = a.length
    }
    for (var b = 0; b < d; b++) {
        if (c.charCodeAt(b) != a.charCodeAt(b)) {
            return b
        }
    }
    if (c.length != a.length) {
        return d
    }
    return -1
};
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.Util = new function() {
    this.DIGESTINFOHEAD = {
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        ripemd160: "3021300906052b2403020105000414",
    };
    this.DEFAULTPROVIDER = {
        md5: "cryptojs",
        sha1: "cryptojs",
        sha224: "cryptojs",
        sha256: "cryptojs",
        sha384: "cryptojs",
        sha512: "cryptojs",
        ripemd160: "cryptojs",
        hmacmd5: "cryptojs",
        hmacsha1: "cryptojs",
        hmacsha224: "cryptojs",
        hmacsha256: "cryptojs",
        hmacsha384: "cryptojs",
        hmacsha512: "cryptojs",
        hmacripemd160: "cryptojs",
        MD5withRSA: "cryptojs/jsrsa",
        SHA1withRSA: "cryptojs/jsrsa",
        SHA224withRSA: "cryptojs/jsrsa",
        SHA256withRSA: "cryptojs/jsrsa",
        SHA384withRSA: "cryptojs/jsrsa",
        SHA512withRSA: "cryptojs/jsrsa",
        RIPEMD160withRSA: "cryptojs/jsrsa",
        MD5withECDSA: "cryptojs/jsrsa",
        SHA1withECDSA: "cryptojs/jsrsa",
        SHA224withECDSA: "cryptojs/jsrsa",
        SHA256withECDSA: "cryptojs/jsrsa",
        SHA384withECDSA: "cryptojs/jsrsa",
        SHA512withECDSA: "cryptojs/jsrsa",
        RIPEMD160withECDSA: "cryptojs/jsrsa",
        SHA1withDSA: "cryptojs/jsrsa",
        SHA224withDSA: "cryptojs/jsrsa",
        SHA256withDSA: "cryptojs/jsrsa",
        MD5withRSAandMGF1: "cryptojs/jsrsa",
        SHA1withRSAandMGF1: "cryptojs/jsrsa",
        SHA224withRSAandMGF1: "cryptojs/jsrsa",
        SHA256withRSAandMGF1: "cryptojs/jsrsa",
        SHA384withRSAandMGF1: "cryptojs/jsrsa",
        SHA512withRSAandMGF1: "cryptojs/jsrsa",
        RIPEMD160withRSAandMGF1: "cryptojs/jsrsa",
    };
    this.CRYPTOJSMESSAGEDIGESTNAME = {
        md5: CryptoJS.algo.MD5,
        sha1: CryptoJS.algo.SHA1,
        sha224: CryptoJS.algo.SHA224,
        sha256: CryptoJS.algo.SHA256,
        sha384: CryptoJS.algo.SHA384,
        sha512: CryptoJS.algo.SHA512,
        ripemd160: CryptoJS.algo.RIPEMD160
    };
    this.getDigestInfoHex = function(a, b) {
        if (typeof this.DIGESTINFOHEAD[b] == "undefined") {
            throw "alg not supported in Util.DIGESTINFOHEAD: " + b
        }
        return this.DIGESTINFOHEAD[b] + a
    }
    ;
    this.getPaddedDigestInfoHex = function(h, a, j) {
        var c = this.getDigestInfoHex(h, a);
        var d = j / 4;
        if (c.length + 22 > d) {
            throw "key is too short for SigAlg: keylen=" + j + "," + a
        }
        var b = "0001";
        var k = "00" + c;
        var g = "";
        var l = d - b.length - k.length;
        for (var f = 0; f < l; f += 2) {
            g += "ff"
        }
        var e = b + g + k;
        return e
    }
    ;
    this.hashString = function(a, c) {
        var b = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return b.digestString(a)
    }
    ;
    this.hashHex = function(b, c) {
        var a = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return a.digestHex(b)
    }
    ;
    this.sha1 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha1",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha256 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha256Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    }
    ;
    this.sha512 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha512Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    }
}
;
KJUR.crypto.Util.md5 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "md5",
        prov: "cryptojs"
    });
    return b.digestString(a)
}
;
KJUR.crypto.Util.ripemd160 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "ripemd160",
        prov: "cryptojs"
    });
    return b.digestString(a)
}
;
KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();
KJUR.crypto.Util.getRandomHexOfNbytes = function(b) {
    var a = new Array(b);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);
    return BAtohex(a)
}
;
KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a),16)
}
;
KJUR.crypto.Util.getRandomHexOfNbits = function(d) {
    var c = d % 8;
    var a = (d - c) / 8;
    var b = new Array(a + 1);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);
    b[0] = (((255 << c) & 255) ^ 255) & b[0];
    return BAtohex(b)
}
;
KJUR.crypto.Util.getRandomBigIntegerOfNbits = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a),16)
}
;
KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function(b) {
    var a = b.bitLength();
    while (1) {
        var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);
        if (b.compareTo(c) != -1) {
            return c
        }
    }
}
;
KJUR.crypto.Util.getRandomBigIntegerMinToMax = function(e, b) {
    var c = e.compareTo(b);
    if (c == 1) {
        throw "biMin is greater than biMax"
    }
    if (c == 0) {
        return e
    }
    var a = b.subtract(e);
    var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);
    return d.add(e)
}
;
KJUR.crypto.MessageDigest = function(c) {
    var b = null;
    var a = null;
    var d = null;
    this.setAlgAndProvider = function(g, f) {
        g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g);
        if (g !== null && f === undefined) {
            f = KJUR.crypto.Util.DEFAULTPROVIDER[g]
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") {
            try {
                this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create()
            } catch (e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            }
            ;
            this.updateHex = function(h) {
                var i = CryptoJS.enc.Hex.parse(h);
                this.md.update(i)
            }
            ;
            this.digest = function() {
                var h = this.md.finalize();
                return h.toString(CryptoJS.enc.Hex)
            }
            ;
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            }
            ;
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
        if (":sha256:".indexOf(g) != -1 && f == "sjcl") {
            try {
                this.md = new sjcl.hash.sha256()
            } catch (e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            }
            ;
            this.updateHex = function(i) {
                var h = sjcl.codec.hex.toBits(i);
                this.md.update(h)
            }
            ;
            this.digest = function() {
                var h = this.md.finalize();
                return sjcl.codec.hex.fromBits(h)
            }
            ;
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            }
            ;
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
    }
    ;
    this.updateString = function(e) {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.updateHex = function(e) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digestString = function(e) {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digestHex = function(e) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    if (c !== undefined) {
        if (c.alg !== undefined) {
            this.algName = c.alg;
            if (c.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
}
;
KJUR.crypto.MessageDigest.getCanonicalAlgName = function(a) {
    if (typeof a === "string") {
        a = a.toLowerCase();
        a = a.replace(/-/, "")
    }
    return a
}
;
KJUR.crypto.MessageDigest.getHashLength = function(c) {
    var b = KJUR.crypto.MessageDigest;
    var a = b.getCanonicalAlgName(c);
    if (b.HASHLENGTH[a] === undefined) {
        throw "not supported algorithm: " + c
    }
    return b.HASHLENGTH[a]
}
;
KJUR.crypto.MessageDigest.HASHLENGTH = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    ripemd160: 20
};
KJUR.crypto.Mac = function(d) {
    var f = null;
    var c = null;
    var a = null;
    var e = null;
    var b = null;
    this.setAlgAndProvider = function(k, i) {
        k = k.toLowerCase();
        if (k == null) {
            k = "hmacsha1"
        }
        k = k.toLowerCase();
        if (k.substr(0, 4) != "hmac") {
            throw "setAlgAndProvider unsupported HMAC alg: " + k
        }
        if (i === undefined) {
            i = KJUR.crypto.Util.DEFAULTPROVIDER[k]
        }
        this.algProv = k + "/" + i;
        var g = k.substr(4);
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") {
            try {
                var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];
                this.mac = CryptoJS.algo.HMAC.create(j, this.pass)
            } catch (h) {
                throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h
            }
            this.updateString = function(l) {
                this.mac.update(l)
            }
            ;
            this.updateHex = function(l) {
                var m = CryptoJS.enc.Hex.parse(l);
                this.mac.update(m)
            }
            ;
            this.doFinal = function() {
                var l = this.mac.finalize();
                return l.toString(CryptoJS.enc.Hex)
            }
            ;
            this.doFinalString = function(l) {
                this.updateString(l);
                return this.doFinal()
            }
            ;
            this.doFinalHex = function(l) {
                this.updateHex(l);
                return this.doFinal()
            }
        }
    }
    ;
    this.updateString = function(g) {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.updateHex = function(g) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinalString = function(g) {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinalHex = function(g) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.setPassword = function(h) {
        if (typeof h == "string") {
            var g = h;
            if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) {
                g = rstrtohex(h)
            }
            this.pass = CryptoJS.enc.Hex.parse(g);
            return
        }
        if (typeof h != "object") {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        var g = null;
        if (h.hex !== undefined) {
            if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) {
                throw "Mac: wrong hex password: " + h.hex
            }
            g = h.hex
        }
        if (h.utf8 !== undefined) {
            g = utf8tohex(h.utf8)
        }
        if (h.rstr !== undefined) {
            g = rstrtohex(h.rstr)
        }
        if (h.b64 !== undefined) {
            g = b64tohex(h.b64)
        }
        if (h.b64u !== undefined) {
            g = b64utohex(h.b64u)
        }
        if (g == null) {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        this.pass = CryptoJS.enc.Hex.parse(g)
    }
    ;
    if (d !== undefined) {
        if (d.pass !== undefined) {
            this.setPassword(d.pass)
        }
        if (d.alg !== undefined) {
            this.algName = d.alg;
            if (d.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
}
;
KJUR.crypto.Signature = function(o) {
    var q = null;
    var n = null;
    var r = null;
    var c = null;
    var l = null;
    var d = null;
    var k = null;
    var h = null;
    var p = null;
    var e = null;
    var b = -1;
    var g = null;
    var j = null;
    var a = null;
    var i = null;
    var f = null;
    this._setAlgNames = function() {
        var s = this.algName.match(/^(.+)with(.+)$/);
        if (s) {
            this.mdAlgName = s[1].toLowerCase();
            this.pubkeyAlgName = s[2].toLowerCase()
        }
    }
    ;
    this._zeroPaddingOfSignature = function(x, w) {
        var v = "";
        var t = w / 4 - x.length;
        for (var u = 0; u < t; u++) {
            v = v + "0"
        }
        return v + x
    }
    ;
    this.setAlgAndProvider = function(u, t) {
        this._setAlgNames();
        if (t != "cryptojs/jsrsa") {
            throw "provider not supported: " + t
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
            try {
                this.md = new KJUR.crypto.MessageDigest({
                    alg: this.mdAlgName
                })
            } catch (s) {
                throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s
            }
            this.init = function(w, x) {
                var y = null;
                try {
                    if (x === undefined) {
                        y = KEYUTIL.getKey(w)
                    } else {
                        y = KEYUTIL.getKey(w, x)
                    }
                } catch (v) {
                    throw "init failed:" + v
                }
                if (y.isPrivate === true) {
                    this.prvKey = y;
                    this.state = "SIGN"
                } else {
                    if (y.isPublic === true) {
                        this.pubKey = y;
                        this.state = "VERIFY"
                    } else {
                        throw "init failed.:" + y
                    }
                }
            }
            ;
            this.updateString = function(v) {
                this.md.updateString(v)
            }
            ;
            this.updateHex = function(v) {
                this.md.updateHex(v)
            }
            ;
            this.sign = function() {
                this.sHashHex = this.md.digest();
                if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var v = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    this.hSign = v.signHex(this.sHashHex, this.ecprvhex)
                } else {
                    if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
                        this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
                            this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName)
                        } else {
                            if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                            } else {
                                if (this.prvKey instanceof KJUR.crypto.DSA) {
                                    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                                } else {
                                    throw "Signature: unsupported private key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
                return this.hSign
            }
            ;
            this.signString = function(v) {
                this.updateString(v);
                return this.sign()
            }
            ;
            this.signHex = function(v) {
                this.updateHex(v);
                return this.sign()
            }
            ;
            this.verify = function(v) {
                this.sHashHex = this.md.digest();
                if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var w = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    return w.verifyHex(this.sHashHex, v, this.ecpubhex)
                } else {
                    if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
                            return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                        } else {
                            if (KJUR.crypto.ECDSA !== undefined && this.pubKey instanceof KJUR.crypto.ECDSA) {
                                return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                            } else {
                                if (KJUR.crypto.DSA !== undefined && this.pubKey instanceof KJUR.crypto.DSA) {
                                    return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                                } else {
                                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    this.init = function(s, t) {
        throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.updateString = function(s) {
        throw "updateString(str) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.updateHex = function(s) {
        throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.sign = function() {
        throw "sign() not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.signString = function(s) {
        throw "digestString(str) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.signHex = function(s) {
        throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.verify = function(s) {
        throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.initParams = o;
    if (o !== undefined) {
        if (o.alg !== undefined) {
            this.algName = o.alg;
            if (o.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            } else {
                this.provName = o.prov
            }
            this.algProvName = this.algName + ":" + this.provName;
            this.setAlgAndProvider(this.algName, this.provName);
            this._setAlgNames()
        }
        if (o.psssaltlen !== undefined) {
            this.pssSaltLen = o.psssaltlen
        }
        if (o.prvkeypem !== undefined) {
            if (o.prvkeypas !== undefined) {
                throw "both prvkeypem and prvkeypas parameters not supported"
            } else {
                try {
                    var q = KEYUTIL.getKey(o.prvkeypem);
                    this.init(q)
                } catch (m) {
                    throw "fatal error to load pem private key: " + m
                }
            }
        }
    }
}
;
KJUR.crypto.Cipher = function(a) {}
;
KJUR.crypto.Cipher.encrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPublic) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.encrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.encryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.encryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.encrypt: unsupported key or algorithm"
    }
}
;
KJUR.crypto.Cipher.decrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPrivate) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.decrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.decryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.decryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.decrypt: unsupported key or algorithm"
    }
}
;
KJUR.crypto.Cipher.getAlgByKeyAndName = function(b, a) {
    if (b instanceof RSAKey) {
        if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) {
            return a
        }
        if (a === null || a === undefined) {
            return "RSA"
        }
        throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a
    }
    throw "getAlgByKeyAndName: not supported algorithm name: " + a
}
;
KJUR.crypto.OID = new function() {
    this.oidhex2name = {
        "2a864886f70d010101": "rsaEncryption",
        "2a8648ce3d0201": "ecPublicKey",
        "2a8648ce380401": "dsa",
        "2a8648ce3d030107": "secp256r1",
        "2b8104001f": "secp192k1",
        "2b81040021": "secp224r1",
        "2b8104000a": "secp256k1",
        "2b81040023": "secp521r1",
        "2b81040022": "secp384r1",
        "2a8648ce380403": "SHA1withDSA",
        "608648016503040301": "SHA224withDSA",
        "608648016503040302": "SHA256withDSA",
    }
}
;
var KEYUTIL = function() {
    var d = function(p, r, q) {
        return k(CryptoJS.AES, p, r, q)
    };
    var e = function(p, r, q) {
        return k(CryptoJS.TripleDES, p, r, q)
    };
    var a = function(p, r, q) {
        return k(CryptoJS.DES, p, r, q)
    };
    var k = function(s, x, u, q) {
        var r = CryptoJS.enc.Hex.parse(x);
        var w = CryptoJS.enc.Hex.parse(u);
        var p = CryptoJS.enc.Hex.parse(q);
        var t = {};
        t.key = w;
        t.iv = p;
        t.ciphertext = r;
        var v = s.decrypt(t, w, {
            iv: p
        });
        return CryptoJS.enc.Hex.stringify(v)
    };
    var l = function(p, r, q) {
        return g(CryptoJS.AES, p, r, q)
    };
    var o = function(p, r, q) {
        return g(CryptoJS.TripleDES, p, r, q)
    };
    var f = function(p, r, q) {
        return g(CryptoJS.DES, p, r, q)
    };
    var g = function(t, y, v, q) {
        var s = CryptoJS.enc.Hex.parse(y);
        var x = CryptoJS.enc.Hex.parse(v);
        var p = CryptoJS.enc.Hex.parse(q);
        var w = t.encrypt(s, x, {
            iv: p
        });
        var r = CryptoJS.enc.Hex.parse(w.toString());
        var u = CryptoJS.enc.Base64.stringify(r);
        return u
    };
    var i = {
        "AES-256-CBC": {
            proc: d,
            eproc: l,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: d,
            eproc: l,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: d,
            eproc: l,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: e,
            eproc: o,
            keylen: 24,
            ivlen: 8
        },
        "DES-CBC": {
            proc: a,
            eproc: f,
            keylen: 8,
            ivlen: 8
        }
    };
    var c = function(p) {
        return i[p]["proc"]
    };
    var m = function(p) {
        var r = CryptoJS.lib.WordArray.random(p);
        var q = CryptoJS.enc.Hex.stringify(r);
        return q
    };
    var n = function(v) {
        var w = {};
        var q = v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));
        if (q) {
            w.cipher = q[1];
            w.ivsalt = q[2]
        }
        var p = v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
        if (p) {
            w.type = p[1]
        }
        var u = -1;
        var x = 0;
        if (v.indexOf("\r\n\r\n") != -1) {
            u = v.indexOf("\r\n\r\n");
            x = 2
        }
        if (v.indexOf("\n\n") != -1) {
            u = v.indexOf("\n\n");
            x = 1
        }
        var t = v.indexOf("-----END");
        if (u != -1 && t != -1) {
            var r = v.substring(u + x * 2, t - x);
            r = r.replace(/\s+/g, "");
            w.data = r
        }
        return w
    };
    var j = function(q, y, p) {
        var v = p.substring(0, 16);
        var t = CryptoJS.enc.Hex.parse(v);
        var r = CryptoJS.enc.Utf8.parse(y);
        var u = i[q]["keylen"] + i[q]["ivlen"];
        var x = "";
        var w = null;
        for (; ; ) {
            var s = CryptoJS.algo.MD5.create();
            if (w != null) {
                s.update(w)
            }
            s.update(r);
            s.update(t);
            w = s.finalize();
            x = x + CryptoJS.enc.Hex.stringify(w);
            if (x.length >= u * 2) {
                break
            }
        }
        var z = {};
        z.keyhex = x.substr(0, i[q]["keylen"] * 2);
        z.ivhex = x.substr(i[q]["keylen"] * 2, i[q]["ivlen"] * 2);
        return z
    };
    var b = function(p, v, r, w) {
        var s = CryptoJS.enc.Base64.parse(p);
        var q = CryptoJS.enc.Hex.stringify(s);
        var u = i[v]["proc"];
        var t = u(q, r, w);
        return t
    };
    var h = function(p, s, q, u) {
        var r = i[s]["eproc"];
        var t = r(p, q, u);
        return t
    };
    return {
        version: "1.0.0",
        parsePKCS5PEM: function(p) {
            return n(p)
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(q, p, r) {
            return j(q, p, r)
        },
        decryptKeyB64: function(p, r, q, s) {
            return b(p, r, q, s)
        },
        getDecryptedKeyHex: function(y, x) {
            var q = n(y);
            var t = q.type;
            var r = q.cipher;
            var p = q.ivsalt;
            var s = q.data;
            var w = j(r, x, p);
            var v = w.keyhex;
            var u = b(s, r, v, p);
            return u
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(x, s, A, t, r) {
            var p = "";
            if (typeof t == "undefined" || t == null) {
                t = "AES-256-CBC"
            }
            if (typeof i[t] == "undefined") {
                throw "KEYUTIL unsupported algorithm: " + t
            }
            if (typeof r == "undefined" || r == null) {
                var v = i[t]["ivlen"];
                var u = m(v);
                r = u.toUpperCase()
            }
            var z = j(t, A, r);
            var y = z.keyhex;
            var w = h(s, t, y, r);
            var q = w.replace(/(.{64})/g, "$1\r\n");
            var p = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";
            p += "Proc-Type: 4,ENCRYPTED\r\n";
            p += "DEK-Info: " + t + "," + r + "\r\n";
            p += "\r\n";
            p += q;
            p += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";
            return p
        },
        parseHexOfEncryptedPKCS8: function(y) {
            var B = ASN1HEX;
            var z = B.getChildIdx;
            var w = B.getV;
            var t = {};
            var r = z(y, 0);
            if (r.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + r.length
            }
            t.ciphertext = w(y, r[1]);
            var A = z(y, r[0]);
            if (A.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + A.length
            }
            if (w(y, A[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2"
            }
            var p = z(y, A[1]);
            if (A.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + p.length
            }
            var q = z(y, p[1]);
            if (q.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + q.length
            }
            if (w(y, q[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES"
            }
            t.encryptionSchemeAlg = "TripleDES";
            t.encryptionSchemeIV = w(y, q[1]);
            var s = z(y, p[0]);
            if (s.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + s.length
            }
            if (w(y, s[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2"
            }
            var x = z(y, s[1]);
            if (x.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length
            }
            t.pbkdf2Salt = w(y, x[0]);
            var u = w(y, x[1]);
            try {
                t.pbkdf2Iter = parseInt(u, 16)
            } catch (v) {
                throw "malformed format pbkdf2Iter: " + u
            }
            return t
        },
        getPBKDF2KeyHexFromParam: function(u, p) {
            var t = CryptoJS.enc.Hex.parse(u.pbkdf2Salt);
            var q = u.pbkdf2Iter;
            var s = CryptoJS.PBKDF2(p, t, {
                keySize: 192 / 32,
                iterations: q
            });
            var r = CryptoJS.enc.Hex.stringify(s);
            return r
        },
        _getPlainPKCS8HexFromEncryptedPKCS8PEM: function(x, y) {
            var r = pemtohex(x, "ENCRYPTED PRIVATE KEY");
            var p = this.parseHexOfEncryptedPKCS8(r);
            var u = KEYUTIL.getPBKDF2KeyHexFromParam(p, y);
            var v = {};
            v.ciphertext = CryptoJS.enc.Hex.parse(p.ciphertext);
            var t = CryptoJS.enc.Hex.parse(u);
            var s = CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);
            var w = CryptoJS.TripleDES.decrypt(v, t, {
                iv: s
            });
            var q = CryptoJS.enc.Hex.stringify(w);
            return q
        },
        getKeyFromEncryptedPKCS8PEM: function(s, q) {
            var p = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(s, q);
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        parsePlainPrivatePKCS8Hex: function(s) {
            var v = ASN1HEX;
            var u = v.getChildIdx;
            var t = v.getV;
            var q = {};
            q.algparam = null;
            if (s.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)"
            }
            var r = u(s, 0);
            if (r.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)"
            }
            if (s.substr(r[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)"
            }
            var p = u(s, r[1]);
            if (p.length != 2) {
                throw "malformed PKCS8 private key(code:004)"
            }
            if (s.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)"
            }
            q.algoid = t(s, p[0]);
            if (s.substr(p[1], 2) == "06") {
                q.algparam = t(s, p[1])
            }
            if (s.substr(r[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)"
            }
            q.keyidx = v.getVidx(s, r[2]);
            return q
        },
        getKeyFromPlainPrivatePKCS8PEM: function(q) {
            var p = pemtohex(q, "PRIVATE KEY");
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        getKeyFromPlainPrivatePKCS8Hex: function(p) {
            var q = this.parsePlainPrivatePKCS8Hex(p);
            var r;
            if (q.algoid == "2a864886f70d010101") {
                r = new RSAKey()
            } else {
                if (q.algoid == "2a8648ce380401") {
                    r = new KJUR.crypto.DSA()
                } else {
                    if (q.algoid == "2a8648ce3d0201") {
                        r = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported private key algorithm"
                    }
                }
            }
            r.readPKCS8PrvKeyHex(p);
            return r
        },
        _getKeyFromPublicPKCS8Hex: function(q) {
            var p;
            var r = ASN1HEX.getVbyList(q, 0, [0, 0], "06");
            if (r === "2a864886f70d010101") {
                p = new RSAKey()
            } else {
                if (r === "2a8648ce380401") {
                    p = new KJUR.crypto.DSA()
                } else {
                    if (r === "2a8648ce3d0201") {
                        p = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported PKCS#8 public key hex"
                    }
                }
            }
            p.readPKCS8PubKeyHex(q);
            return p
        },
        parsePublicRawRSAKeyHex: function(r) {
            var u = ASN1HEX;
            var t = u.getChildIdx;
            var s = u.getV;
            var p = {};
            if (r.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)"
            }
            var q = t(r, 0);
            if (q.length != 2) {
                throw "malformed RSA key(code:002)"
            }
            if (r.substr(q[0], 2) != "02") {
                throw "malformed RSA key(code:003)"
            }
            p.n = s(r, q[0]);
            if (r.substr(q[1], 2) != "02") {
                throw "malformed RSA key(code:004)"
            }
            p.e = s(r, q[1]);
            return p
        },
        parsePublicPKCS8Hex: function(t) {
            var v = ASN1HEX;
            var u = v.getChildIdx;
            var s = v.getV;
            var q = {};
            q.algparam = null;
            var r = u(t, 0);
            if (r.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + r.length
            }
            var w = r[0];
            if (t.substr(w, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)"
            }
            var p = u(t, w);
            if (p.length != 2) {
                throw "malformed PKCS8 public key(code:002)"
            }
            if (t.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)"
            }
            q.algoid = s(t, p[0]);
            if (t.substr(p[1], 2) == "06") {
                q.algparam = s(t, p[1])
            } else {
                if (t.substr(p[1], 2) == "30") {
                    q.algparam = {};
                    q.algparam.p = v.getVbyList(t, p[1], [0], "02");
                    q.algparam.q = v.getVbyList(t, p[1], [1], "02");
                    q.algparam.g = v.getVbyList(t, p[1], [2], "02")
                }
            }
            if (t.substr(r[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)"
            }
            q.key = s(t, r[1]).substr(2);
            return q
        },
    }
}();
KEYUTIL.getKey = function(l, k, n) {
    var G = ASN1HEX
      , L = G.getChildIdx
      , v = G.getV
      , d = G.getVbyList
      , c = KJUR.crypto
      , i = c.ECDSA
      , C = c.DSA
      , w = RSAKey
      , M = pemtohex
      , F = KEYUTIL;
    if (typeof w != "undefined" && l instanceof w) {
        return l
    }
    if (typeof i != "undefined" && l instanceof i) {
        return l
    }
    if (typeof C != "undefined" && l instanceof C) {
        return l
    }
    if (l.curve !== undefined && l.xy !== undefined && l.d === undefined) {
        return new i({
            pub: l.xy,
            curve: l.curve
        })
    }
    if (l.curve !== undefined && l.d !== undefined) {
        return new i({
            prv: l.d,
            curve: l.curve
        })
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d === undefined) {
        var P = new w();
        P.setPublic(l.n, l.e);
        return P
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.co !== undefined && l.qi === undefined) {
        var P = new w();
        P.setPrivateEx(l.n, l.e, l.d, l.p, l.q, l.dp, l.dq, l.co);
        return P
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p === undefined) {
        var P = new w();
        P.setPrivate(l.n, l.e, l.d);
        return P
    }
    if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x === undefined) {
        var P = new C();
        P.setPublic(l.p, l.q, l.g, l.y);
        return P
    }
    if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x !== undefined) {
        var P = new C();
        P.setPrivate(l.p, l.q, l.g, l.y, l.x);
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d === undefined) {
        var P = new w();
        P.setPublic(b64utohex(l.n), b64utohex(l.e));
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.qi !== undefined) {
        var P = new w();
        P.setPrivateEx(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d), b64utohex(l.p), b64utohex(l.q), b64utohex(l.dp), b64utohex(l.dq), b64utohex(l.qi));
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined) {
        var P = new w();
        P.setPrivate(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d));
        return P
    }
    if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d === undefined) {
        var j = new i({
            curve: l.crv
        });
        var t = j.ecparams.keylen / 4;
        var B = ("0000000000" + b64utohex(l.x)).slice(-t);
        var z = ("0000000000" + b64utohex(l.y)).slice(-t);
        var u = "04" + B + z;
        j.setPublicKeyHex(u);
        return j
    }
    if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d !== undefined) {
        var j = new i({
            curve: l.crv
        });
        var t = j.ecparams.keylen / 4;
        var B = ("0000000000" + b64utohex(l.x)).slice(-t);
        var z = ("0000000000" + b64utohex(l.y)).slice(-t);
        var u = "04" + B + z;
        var b = ("0000000000" + b64utohex(l.d)).slice(-t);
        j.setPublicKeyHex(u);
        j.setPrivateKeyHex(b);
        return j
    }
    if (n === "pkcs5prv") {
        var J = l, G = ASN1HEX, N, P;
        N = L(J, 0);
        if (N.length === 9) {
            P = new w();
            P.readPKCS5PrvKeyHex(J)
        } else {
            if (N.length === 6) {
                P = new C();
                P.readPKCS5PrvKeyHex(J)
            } else {
                if (N.length > 2 && J.substr(N[1], 2) === "04") {
                    P = new i();
                    P.readPKCS5PrvKeyHex(J)
                } else {
                    throw "unsupported PKCS#1/5 hexadecimal key"
                }
            }
        }
        return P
    }
    if (n === "pkcs8prv") {
        var P = F.getKeyFromPlainPrivatePKCS8Hex(l);
        return P
    }
    if (n === "pkcs8pub") {
        return F._getKeyFromPublicPKCS8Hex(l)
    }
    if (n === "x509pub") {
        return X509.getPublicKeyFromCertHex(l)
    }
    if (l.indexOf("-END CERTIFICATE-", 0) != -1 || l.indexOf("-END X509 CERTIFICATE-", 0) != -1 || l.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
        return X509.getPublicKeyFromCertPEM(l)
    }
    if (l.indexOf("-END PUBLIC KEY-") != -1) {
        var O = pemtohex(l, "PUBLIC KEY");
        return F._getKeyFromPublicPKCS8Hex(O)
    }
    if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {
        var m = M(l, "RSA PRIVATE KEY");
        return F.getKey(m, null, "pkcs5prv")
    }
    if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {
        var I = M(l, "DSA PRIVATE KEY");
        var E = d(I, 0, [1], "02");
        var D = d(I, 0, [2], "02");
        var K = d(I, 0, [3], "02");
        var r = d(I, 0, [4], "02");
        var s = d(I, 0, [5], "02");
        var P = new C();
        P.setPrivate(new BigInteger(E,16), new BigInteger(D,16), new BigInteger(K,16), new BigInteger(r,16), new BigInteger(s,16));
        return P
    }
    if (l.indexOf("-END PRIVATE KEY-") != -1) {
        return F.getKeyFromPlainPrivatePKCS8PEM(l)
    }
    if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var o = F.getDecryptedKeyHex(l, k);
        var H = new RSAKey();
        H.readPKCS5PrvKeyHex(o);
        return H
    }
    if (l.indexOf("-END EC PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var I = F.getDecryptedKeyHex(l, k);
        var P = d(I, 0, [1], "04");
        var f = d(I, 0, [2, 0], "06");
        var A = d(I, 0, [3, 0], "03").substr(2);
        var e = "";
        if (KJUR.crypto.OID.oidhex2name[f] !== undefined) {
            e = KJUR.crypto.OID.oidhex2name[f]
        } else {
            throw "undefined OID(hex) in KJUR.crypto.OID: " + f
        }
        var j = new i({
            curve: e
        });
        j.setPublicKeyHex(A);
        j.setPrivateKeyHex(P);
        j.isPublic = false;
        return j
    }
    if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var I = F.getDecryptedKeyHex(l, k);
        var E = d(I, 0, [1], "02");
        var D = d(I, 0, [2], "02");
        var K = d(I, 0, [3], "02");
        var r = d(I, 0, [4], "02");
        var s = d(I, 0, [5], "02");
        var P = new C();
        P.setPrivate(new BigInteger(E,16), new BigInteger(D,16), new BigInteger(K,16), new BigInteger(r,16), new BigInteger(s,16));
        return P
    }
    if (l.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
        return F.getKeyFromEncryptedPKCS8PEM(l, k)
    }
    throw "not supported argument"
}
;
KEYUTIL.generateKeypair = function(a, c) {
    if (a == "RSA") {
        var b = c;
        var h = new RSAKey();
        h.generate(b, "10001");
        h.isPrivate = true;
        h.isPublic = true;
        var f = new RSAKey();
        var e = h.n.toString(16);
        var i = h.e.toString(16);
        f.setPublic(e, i);
        f.isPrivate = false;
        f.isPublic = true;
        var k = {};
        k.prvKeyObj = h;
        k.pubKeyObj = f;
        return k
    } else {
        if (a == "EC") {
            var d = c;
            var g = new KJUR.crypto.ECDSA({
                curve: d
            });
            var j = g.generateKeyPairHex();
            var h = new KJUR.crypto.ECDSA({
                curve: d
            });
            h.setPublicKeyHex(j.ecpubhex);
            h.setPrivateKeyHex(j.ecprvhex);
            h.isPrivate = true;
            h.isPublic = false;
            var f = new KJUR.crypto.ECDSA({
                curve: d
            });
            f.setPublicKeyHex(j.ecpubhex);
            f.isPrivate = false;
            f.isPublic = true;
            var k = {};
            k.prvKeyObj = h;
            k.pubKeyObj = f;
            return k
        } else {
            throw "unknown algorithm: " + a
        }
    }
}
;
KEYUTIL.getPEM = function(b, D, y, m, q, j) {
    var F = KJUR
      , k = F.asn1
      , z = k.DERObjectIdentifier
      , f = k.DERInteger
      , l = k.ASN1Util.newObject
      , a = k.x509
      , C = a.SubjectPublicKeyInfo
      , e = F.crypto
      , u = e.DSA
      , r = e.ECDSA
      , n = RSAKey;
    function A(s) {
        var G = l({
            seq: [{
                "int": 0
            }, {
                "int": {
                    bigint: s.n
                }
            }, {
                "int": s.e
            }, {
                "int": {
                    bigint: s.d
                }
            }, {
                "int": {
                    bigint: s.p
                }
            }, {
                "int": {
                    bigint: s.q
                }
            }, {
                "int": {
                    bigint: s.dmp1
                }
            }, {
                "int": {
                    bigint: s.dmq1
                }
            }, {
                "int": {
                    bigint: s.coeff
                }
            }]
        });
        return G
    }
    function B(G) {
        var s = l({
            seq: [{
                "int": 1
            }, {
                octstr: {
                    hex: G.prvKeyHex
                }
            }, {
                tag: ["a0", true, {
                    oid: {
                        name: G.curveName
                    }
                }]
            }, {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + G.pubKeyHex
                    }
                }]
            }]
        });
        return s
    }
    function x(s) {
        var G = l({
            seq: [{
                "int": 0
            }, {
                "int": {
                    bigint: s.p
                }
            }, {
                "int": {
                    bigint: s.q
                }
            }, {
                "int": {
                    bigint: s.g
                }
            }, {
                "int": {
                    bigint: s.y
                }
            }, {
                "int": {
                    bigint: s.x
                }
            }]
        });
        return G
    }
    if (((n !== undefined && b instanceof n) || (u !== undefined && b instanceof u) || (r !== undefined && b instanceof r)) && b.isPublic == true && (D === undefined || D == "PKCS8PUB")) {
        var E = new C(b);
        var w = E.getEncodedHex();
        return hextopem(w, "PUBLIC KEY")
    }
    if (D == "PKCS1PRV" && n !== undefined && b instanceof n && (y === undefined || y == null) && b.isPrivate == true) {
        var E = A(b);
        var w = E.getEncodedHex();
        return hextopem(w, "RSA PRIVATE KEY")
    }
    if (D == "PKCS1PRV" && r !== undefined && b instanceof r && (y === undefined || y == null) && b.isPrivate == true) {
        var i = new z({
            name: b.curveName
        });
        var v = i.getEncodedHex();
        var h = B(b);
        var t = h.getEncodedHex();
        var p = "";
        p += hextopem(v, "EC PARAMETERS");
        p += hextopem(t, "EC PRIVATE KEY");
        return p
    }
    if (D == "PKCS1PRV" && u !== undefined && b instanceof u && (y === undefined || y == null) && b.isPrivate == true) {
        var E = x(b);
        var w = E.getEncodedHex();
        return hextopem(w, "DSA PRIVATE KEY")
    }
    if (D == "PKCS5PRV" && n !== undefined && b instanceof n && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = A(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", w, y, m, j)
    }
    if (D == "PKCS5PRV" && r !== undefined && b instanceof r && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = B(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", w, y, m, j)
    }
    if (D == "PKCS5PRV" && u !== undefined && b instanceof u && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = x(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", w, y, m, j)
    }
    var o = function(G, s) {
        var I = c(G, s);
        var H = new l({
            seq: [{
                seq: [{
                    oid: {
                        name: "pkcs5PBES2"
                    }
                }, {
                    seq: [{
                        seq: [{
                            oid: {
                                name: "pkcs5PBKDF2"
                            }
                        }, {
                            seq: [{
                                octstr: {
                                    hex: I.pbkdf2Salt
                                }
                            }, {
                                "int": I.pbkdf2Iter
                            }]
                        }]
                    }, {
                        seq: [{
                            oid: {
                                name: "des-EDE3-CBC"
                            }
                        }, {
                            octstr: {
                                hex: I.encryptionSchemeIV
                            }
                        }]
                    }]
                }]
            }, {
                octstr: {
                    hex: I.ciphertext
                }
            }]
        });
        return H.getEncodedHex()
    };
    var c = function(N, O) {
        var H = 100;
        var M = CryptoJS.lib.WordArray.random(8);
        var L = "DES-EDE3-CBC";
        var s = CryptoJS.lib.WordArray.random(8);
        var I = CryptoJS.PBKDF2(O, M, {
            keySize: 192 / 32,
            iterations: H
        });
        var J = CryptoJS.enc.Hex.parse(N);
        var K = CryptoJS.TripleDES.encrypt(J, I, {
            iv: s
        }) + "";
        var G = {};
        G.ciphertext = K;
        G.pbkdf2Salt = CryptoJS.enc.Hex.stringify(M);
        G.pbkdf2Iter = H;
        G.encryptionSchemeAlg = L;
        G.encryptionSchemeIV = CryptoJS.enc.Hex.stringify(s);
        return G
    };
    if (D == "PKCS8PRV" && n != undefined && b instanceof n && b.isPrivate == true) {
        var g = A(b);
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "rsaEncryption"
                    }
                }, {
                    "null": true
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (D == "PKCS8PRV" && r !== undefined && b instanceof r && b.isPrivate == true) {
        var g = new l({
            seq: [{
                "int": 1
            }, {
                octstr: {
                    hex: b.prvKeyHex
                }
            }, {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + b.pubKeyHex
                    }
                }]
            }]
        });
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "ecPublicKey"
                    }
                }, {
                    oid: {
                        name: b.curveName
                    }
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (D == "PKCS8PRV" && u !== undefined && b instanceof u && b.isPrivate == true) {
        var g = new f({
            bigint: b.x
        });
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "dsa"
                    }
                }, {
                    seq: [{
                        "int": {
                            bigint: b.p
                        }
                    }, {
                        "int": {
                            bigint: b.q
                        }
                    }, {
                        "int": {
                            bigint: b.g
                        }
                    }]
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    throw "unsupported object nor format"
}
;
KEYUTIL.getKeyFromCSRPEM = function(b) {
    var a = pemtohex(b, "CERTIFICATE REQUEST");
    var c = KEYUTIL.getKeyFromCSRHex(a);
    return c
}
;
KEYUTIL.getKeyFromCSRHex = function(a) {
    var c = KEYUTIL.parseCSRHex(a);
    var b = KEYUTIL.getKey(c.p8pubkeyhex, null, "pkcs8pub");
    return b
}
;
KEYUTIL.parseCSRHex = function(d) {
    var i = ASN1HEX;
    var f = i.getChildIdx;
    var c = i.getTLV;
    var b = {};
    var g = d;
    if (g.substr(0, 2) != "30") {
        throw "malformed CSR(code:001)"
    }
    var e = f(g, 0);
    if (e.length < 1) {
        throw "malformed CSR(code:002)"
    }
    if (g.substr(e[0], 2) != "30") {
        throw "malformed CSR(code:003)"
    }
    var a = f(g, e[0]);
    if (a.length < 3) {
        throw "malformed CSR(code:004)"
    }
    b.p8pubkeyhex = c(g, a[2]);
    return b
}
;
KEYUTIL.getJWKFromKey = function(d) {
    var b = {};
    if (d instanceof RSAKey && d.isPrivate) {
        b.kty = "RSA";
        b.n = hextob64u(d.n.toString(16));
        b.e = hextob64u(d.e.toString(16));
        b.d = hextob64u(d.d.toString(16));
        b.p = hextob64u(d.p.toString(16));
        b.q = hextob64u(d.q.toString(16));
        b.dp = hextob64u(d.dmp1.toString(16));
        b.dq = hextob64u(d.dmq1.toString(16));
        b.qi = hextob64u(d.coeff.toString(16));
        return b
    } else {
        if (d instanceof RSAKey && d.isPublic) {
            b.kty = "RSA";
            b.n = hextob64u(d.n.toString(16));
            b.e = hextob64u(d.e.toString(16));
            return b
        } else {
            if (d instanceof KJUR.crypto.ECDSA && d.isPrivate) {
                var a = d.getShortNISTPCurveName();
                if (a !== "P-256" && a !== "P-384") {
                    throw "unsupported curve name for JWT: " + a
                }
                var c = d.getPublicKeyXYHex();
                b.kty = "EC";
                b.crv = a;
                b.x = hextob64u(c.x);
                b.y = hextob64u(c.y);
                b.d = hextob64u(d.prvKeyHex);
                return b
            } else {
                if (d instanceof KJUR.crypto.ECDSA && d.isPublic) {
                    var a = d.getShortNISTPCurveName();
                    if (a !== "P-256" && a !== "P-384") {
                        throw "unsupported curve name for JWT: " + a
                    }
                    var c = d.getPublicKeyXYHex();
                    b.kty = "EC";
                    b.crv = a;
                    b.x = hextob64u(c.x);
                    b.y = hextob64u(c.y);
                    return b
                }
            }
        }
    }
    throw "not supported key object"
}
;
RSAKey.getPosArrayOfChildrenFromHex = function(a) {
    return ASN1HEX.getChildIdx(a, 0)
}
;
RSAKey.getHexValueArrayOfChildrenFromHex = function(f) {
    var n = ASN1HEX;
    var i = n.getV;
    var k = RSAKey.getPosArrayOfChildrenFromHex(f);
    var e = i(f, k[0]);
    var j = i(f, k[1]);
    var b = i(f, k[2]);
    var c = i(f, k[3]);
    var h = i(f, k[4]);
    var g = i(f, k[5]);
    var m = i(f, k[6]);
    var l = i(f, k[7]);
    var d = i(f, k[8]);
    var k = new Array();
    k.push(e, j, b, c, h, g, m, l, d);
    return k
}
;
RSAKey.prototype.readPrivateKeyFromPEMString = function(d) {
    var c = pemtohex(d);
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
}
;
RSAKey.prototype.readPKCS5PrvKeyHex = function(c) {
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
}
;
RSAKey.prototype.readPKCS8PrvKeyHex = function(e) {
    var c, j, l, b, a, f, d, k;
    var m = ASN1HEX;
    var g = m.getVbyList;
    if (m.isASN1HEX(e) === false) {
        throw "not ASN.1 hex string"
    }
    try {
        c = g(e, 0, [2, 0, 1], "02");
        j = g(e, 0, [2, 0, 2], "02");
        l = g(e, 0, [2, 0, 3], "02");
        b = g(e, 0, [2, 0, 4], "02");
        a = g(e, 0, [2, 0, 5], "02");
        f = g(e, 0, [2, 0, 6], "02");
        d = g(e, 0, [2, 0, 7], "02");
        k = g(e, 0, [2, 0, 8], "02")
    } catch (i) {
        throw "malformed PKCS#8 plain RSA private key"
    }
    this.setPrivateEx(c, j, l, b, a, f, d, k)
}
;
RSAKey.prototype.readPKCS5PubKeyHex = function(c) {
    var e = ASN1HEX;
    var b = e.getV;
    if (e.isASN1HEX(c) === false) {
        throw "keyHex is not ASN.1 hex string"
    }
    var a = e.getChildIdx(c, 0);
    if (a.length !== 2 || c.substr(a[0], 2) !== "02" || c.substr(a[1], 2) !== "02") {
        throw "wrong hex for PKCS#5 public key"
    }
    var f = b(c, a[0]);
    var d = b(c, a[1]);
    this.setPublic(f, d)
}
;
RSAKey.prototype.readPKCS8PubKeyHex = function(b) {
    var c = ASN1HEX;
    if (c.isASN1HEX(b) === false) {
        throw "not ASN.1 hex string"
    }
    if (c.getTLVbyList(b, 0, [0, 0]) !== "06092a864886f70d010101") {
        throw "not PKCS8 RSA public key"
    }
    var a = c.getTLVbyList(b, 0, [1, 0]);
    this.readPKCS5PubKeyHex(a)
}
;
RSAKey.prototype.readCertPubKeyHex = function(b, d) {
    var a, c;
    a = new X509();
    a.readCertHex(b);
    c = a.getPublicKeyHex();
    this.readPKCS8PubKeyHex(c)
}
;
var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");
function _rsasign_getHexPaddedDigestInfoForString(d, e, a) {
    var b = function(f) {
        return KJUR.crypto.Util.hashString(f, a)
    };
    var c = b(d);
    return KJUR.crypto.Util.getPaddedDigestInfoHex(c, a, e)
}
function _zeroPaddingOfSignature(e, d) {
    var c = "";
    var a = d / 4 - e.length;
    for (var b = 0; b < a; b++) {
        c = c + "0"
    }
    return c + e
}
RSAKey.prototype.sign = function(d, a) {
    var b = function(e) {
        return KJUR.crypto.Util.hashString(e, a)
    };
    var c = b(d);
    return this.signWithMessageHash(c, a)
}
;
RSAKey.prototype.signWithMessageHash = function(e, c) {
    var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());
    var b = parseBigInt(f, 16);
    var d = this.doPrivate(b);
    var a = d.toString(16);
    return _zeroPaddingOfSignature(a, this.n.bitLength())
}
;
function pss_mgf1_str(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]))));
        d += 1
    }
    return b
}
RSAKey.prototype.signPSS = function(e, a, d) {
    var c = function(f) {
        return KJUR.crypto.Util.hashHex(f, a)
    };
    var b = c(rstrtohex(e));
    if (d === undefined) {
        d = -1
    }
    return this.signWithMessageHashPSS(b, a, d)
}
;
RSAKey.prototype.signWithMessageHashPSS = function(l, a, k) {
    var b = hextorstr(l);
    var g = b.length;
    var m = this.n.bitLength() - 1;
    var c = Math.ceil(m / 8);
    var d;
    var o = function(i) {
        return KJUR.crypto.Util.hashHex(i, a)
    };
    if (k === -1 || k === undefined) {
        k = g
    } else {
        if (k === -2) {
            k = c - g - 2
        } else {
            if (k < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (c < (g + k + 2)) {
        throw "data too long"
    }
    var f = "";
    if (k > 0) {
        f = new Array(k);
        new SecureRandom().nextBytes(f);
        f = String.fromCharCode.apply(String, f)
    }
    var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));
    var j = [];
    for (d = 0; d < c - k - g - 2; d += 1) {
        j[d] = 0
    }
    var e = String.fromCharCode.apply(String, j) + "\x01" + f;
    var h = pss_mgf1_str(n, e.length, o);
    var q = [];
    for (d = 0; d < e.length; d += 1) {
        q[d] = e.charCodeAt(d) ^ h.charCodeAt(d)
    }
    var p = (65280 >> (8 * c - m)) & 255;
    q[0] &= ~p;
    for (d = 0; d < g; d++) {
        q.push(n.charCodeAt(d))
    }
    q.push(188);
    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength())
}
;
function _rsasign_getDecryptSignatureBI(a, d, c) {
    var b = new RSAKey();
    b.setPublic(d, c);
    var e = b.doPublic(a);
    return e
}
function _rsasign_getHexDigestInfoFromSig(a, c, b) {
    var e = _rsasign_getDecryptSignatureBI(a, c, b);
    var d = e.toString(16).replace(/^1f+00/, "");
    return d
}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {
    for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];
        var b = d.length;
        if (f.substring(0, b) == d) {
            var c = [e, f.substring(b)];
            return c
        }
    }
    return []
}
RSAKey.prototype.verify = function(f, j) {
    j = j.replace(_RE_HEXDECONLY, "");
    j = j.replace(/[ \n]+/g, "");
    var b = parseBigInt(j, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var i = this.doPublic(b);
    var e = i.toString(16).replace(/^1f+00/, "");
    var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (g.length == 0) {
        return false
    }
    var d = g[0];
    var h = g[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d)
    };
    var c = a(f);
    return (h == c)
}
;
RSAKey.prototype.verifyWithMessageHash = function(e, a) {
    a = a.replace(_RE_HEXDECONLY, "");
    a = a.replace(/[ \n]+/g, "");
    var b = parseBigInt(a, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var h = this.doPublic(b);
    var g = h.toString(16).replace(/^1f+00/, "");
    var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);
    if (c.length == 0) {
        return false
    }
    var d = c[0];
    var f = c[1];
    return (f == e)
}
;
RSAKey.prototype.verifyPSS = function(c, b, a, f) {
    var e = function(g) {
        return KJUR.crypto.Util.hashHex(g, a)
    };
    var d = e(rstrtohex(c));
    if (f === undefined) {
        f = -1
    }
    return this.verifyWithMessageHashPSS(d, b, a, f)
}
;
RSAKey.prototype.verifyWithMessageHashPSS = function(f, s, l, c) {
    var k = new BigInteger(s,16);
    if (k.bitLength() > this.n.bitLength()) {
        return false
    }
    var r = function(i) {
        return KJUR.crypto.Util.hashHex(i, l)
    };
    var j = hextorstr(f);
    var h = j.length;
    var g = this.n.bitLength() - 1;
    var m = Math.ceil(g / 8);
    var q;
    if (c === -1 || c === undefined) {
        c = h
    } else {
        if (c === -2) {
            c = m - h - 2
        } else {
            if (c < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (m < (h + c + 2)) {
        throw "data too long"
    }
    var a = this.doPublic(k).toByteArray();
    for (q = 0; q < a.length; q += 1) {
        a[q] &= 255
    }
    while (a.length < m) {
        a.unshift(0)
    }
    if (a[m - 1] !== 188) {
        throw "encoded message does not end in 0xbc"
    }
    a = String.fromCharCode.apply(String, a);
    var d = a.substr(0, m - h - 1);
    var e = a.substr(d.length, h);
    var p = (65280 >> (8 * m - g)) & 255;
    if ((d.charCodeAt(0) & p) !== 0) {
        throw "bits beyond keysize not zero"
    }
    var n = pss_mgf1_str(e, d.length, r);
    var o = [];
    for (q = 0; q < d.length; q += 1) {
        o[q] = d.charCodeAt(q) ^ n.charCodeAt(q)
    }
    o[0] &= ~p;
    var b = m - h - c - 2;
    for (q = 0; q < b; q += 1) {
        if (o[q] !== 0) {
            throw "leftmost octets not zero"
        }
    }
    if (o[b] !== 1) {
        throw "0x01 marker not found"
    }
    return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice(-c)))))
}
;
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;
RSAKey.SALT_LEN_RECOVER = -2;
window.QccJsWebInfo = "read default WebSettings";
window.QccJsWebVer = "2025.12.19.1";
window.QccJsWebPostBaseUrl = "https://newopenapiweb.17qcc.com";
window.QccJsWebDocumentDomain = "17qcc.com";
window.QccJsWebMergeJsUrl = "//j.17qcc.com/combo?";
window._iconfont_svg_string_3039707 = '<svg><symbol id="qcw-xiaohongshu" viewBox="0 0 1024 1024"><path d="M708.923077 0h-393.846154C141.061538 0 0 141.061538 0 315.076923v393.846154c0 174 141.061538 315.076923 315.076923 315.076923h393.846154c174 0 315.076923-141.076923 315.076923-315.076923v-393.846154C1024 141.061538 882.923077 0 708.923077 0z" fill="#E73144" ></path><path d="M703.938462 365.415385h51.307692v18.36923c0 1.461538 0.707692 2.153846 2.123077 2.123077 30.430769-0.907692 61.076923 0.061538 76.784615 31.276923 9.353846 18.507692 7.430769 46.646154 6.907692 68.738462-0.030769 1.307692 0.584615 2.015385 1.83077 2.153846 3.584615 0.323077 7.061538 0.646154 10.461538 1.076923 60.492308 7.261538 48.538462 64.307692 48.738462 109.123077 0.092308 15.630769-1.661538 27.076923-5.215385 34.369231-7.492308 15.123077-20.923077 23.784615-40.261538 25.938461h-37.723077l-19.276923-44.753846c-0.2-0.446154-0.153846-0.953846 0.092307-1.369231 0.246154-0.4 0.692308-0.646154 1.169231-0.646153l40.907692-0.03077c2.276923 0 4.430769-0.969231 6-2.676923a9.056923 9.056923 0 0 0 2.415385-6.292307c-0.2-13.676923-0.292308-27.323077-0.230769-40.984616 0-12.276923-5.8-18.569231-17.492308-18.892307-13.230769-0.323077-38.276923-0.323077-75.184615 0.061538-1.307692 0-1.953846 0.707692-1.953846 2.123077l-0.2 113.461538h-51.246154l-0.169231-113.953846a2.018462 2.018462 0 0 0-1.984615-2.092307H653.846154c-1.230769-0.030769-2.215385-1.046154-2.215385-2.276924l0.061539-49.56923c0-1.661538 0.784615-2.507692 2.353846-2.507693l47.323077 0.092308c0.615385 0 1.2-0.261538 1.630769-0.723077 0.415385-0.461538 0.661538-1.061538 0.646154-1.692308v-42.876923c0.046154-1.553846-1.184615-2.846154-2.738462-2.892307l-29.215384 0.123077c-1.538462 0-2.276923-0.815385-2.276923-2.415385l-0.092308-49.846154c0-1.461538 0.646154-2.184615 2.123077-2.184615h30.261538c1.307692 0 1.953846-0.646154 1.953846-2.046154l0.323077-18.307692h-0.046153z m53.138461 122.907692l31.830769-0.061539c0.523077 0 1.015385-0.230769 1.369231-0.615384 0.369231-0.384615 0.569231-0.892308 0.553846-1.430769l-0.169231-39.846154c0-3.123077-2.276923-5.676923-5.046153-5.676923l-25.538462 0.061538c-1.384615 0.030769-2.692308 0.646154-3.584615 1.692308a6.092308 6.092308 0 0 0-1.461539 4.076923l0.169231 39.846154c-0.015385 1.092308 0.861538 1.953846 1.876923 1.953846z m-329.215385 3.584615c-12.369231 0.230769-34.753846 3.676923-39.646153-12.246154-2.969231-9.507692 3.738462-22.769231 7.815384-32.046153 11.6-26.415385 22.969231-52.938462 34.138462-79.553847 0.461538-1.076923 1.230769-1.630769 2.353846-1.630769h48.953846c0.415385 0 0.784615 0.230769 0.969231 0.584616 0.230769 0.353846 0.276923 0.784615 0.123077 1.16923l-28.338462 66.23077c-0.646154 1.538462-0.492308 3.261538 0.353846 4.692307 0.830769 1.369231 2.307692 2.2 3.907693 2.215385h41.953846c0.523077 0 0.984615 0.261538 1.276923 0.692308a1.538462 1.538462 0 0 1 0.092308 1.461538c-12.123077 28.246154-24.2 56.292308-36.261539 84.138462-1.2 2.769231-1.723077 4.815385-1.523077 6.123077 0.415385 2.846154 2.015385 4.276923 4.753846 4.307692l26.553847 0.153846c1.538462 0.030769 2.015385 0.784615 1.4 2.276923l-17.169231 40.4c-0.492308 1.369231-1.8 2.276923-3.261539 2.246154-26.969231 0.323077-45.830769 0.323077-56.584615-0.169231-17.784615-0.815385-22.153846-16.384615-15.246154-32.446154l24.4-56.938461a1.276923 1.276923 0 0 0-0.092308-1.107693 1.092308 1.092308 0 0 0-0.984615-0.553846h0.061538zM224.430769 658.553846h-19.215384l-18.83077-44.2c-0.2-0.430769-0.153846-0.938462 0.092308-1.338461 0.230769-0.4 0.646154-0.646154 1.107692-0.646154l26.584616-0.061539a6.2 6.2 0 0 0 6.076923-6.353846l0.723077-234.446154c-0.015385-0.615385 0.215385-1.2 0.630769-1.646154 0.415385-0.446154 1-0.692308 1.615385-0.707692h45.738461c2.153846 0 3.230769 1.138462 3.261539 3.384616 0.2 79.384615 0.2 157.4 0 234.076923-0.123077 31.476923-14.723077 52.984615-47.784616 51.938461z m0 0" fill="#FFFFFF" ></path><path d="M653.446154 658.553846H479.953846l23.261539-52.446154c0.476923-1.246154 1.692308-2.046154 3.030769-1.984615l42.476923 0.061538c1.507692 0 2.276923-0.753846 2.276923-2.276923V442.784615c0-1.369231-0.646154-2.046154-1.953846-2.046153l-28.184616-0.03077c-1.276923 0-2.276923-1.107692-2.276923-2.446154v-51.046153c0-0.784615 0.584615-1.430769 1.338462-1.43077h114.861538c1.430769 0 2.123077 0.753846 2.123077 2.246154l0.061539 50.492308c0 1.461538-0.723077 2.215385-2.153846 2.215385h-28.4c-1.307692 0-1.953846 0.692308-1.953847 2.046153v159.03077c0 1.538462 0.738462 2.276923 2.184616 2.276923l45.015384 0.092307c1.230769 0 1.861538 0.646154 1.861539 1.953847l-0.061539 52.446153v-0.030769z m206.630769-267.830769c35.446154-24.369231 60.384615 37.753846 21.569231 48.415385-6.323077 1.753846-16.384615 1.861538-30.169231 0.323076-1.230769-0.123077-1.830769-0.815385-1.830769-2.123076-0.2-14.661538-3.092308-37.323077 10.430769-46.584616v-0.030769zM370.830769 573.369231L347.384615 628c-2.123077 4.892308-4.430769 4.984615-7.015384 0.384615-17.261538-31.2-23.123077-56.676923-26.507693-95.476923a4227.323077 4227.323077 0 0 1-6.815384-90.461538c-0.061538-1.369231 0.553846-2.046154 1.861538-2.046154l47.523077 0.030769c1.338462 0 2.092308 0.723077 2.184616 2.076923 2.446154 35.123077 5.015385 70.138462 7.692307 105.061539 0.692308 9 2.215385 16.446154 4.569231 22.384615 0.446154 1.092308 0.446154 2.338462-0.046154 3.415385z m-249.723077-2.015385v-2.246154c2.230769-3.030769 3.692308-6.569231 4.23077-10.292307 3.523077-38.769231 6.384615-77.492308 8.630769-116.261539 0.107692-1.2 0.676923-1.830769 1.830769-1.830769h48.538462c0.415385 0 0.846154 0.2 1.16923 0.553846 0.292308 0.323077 0.446154 0.784615 0.43077 1.230769-2.553846 35.723077-5.415385 71.4-8.569231 107.076923-2.276923 25.892308-10.553846 60.553846-27.846154 81.569231-1.107692 1.338462-2.046154 1.2-2.769231-0.415384l-25.646154-59.384616z m331.03077 87.2H381.846154l-8.953846-3.553846c-1.276923-0.492308-1.630769-1.369231-1.046154-2.646154l22.061538-50.492308c0.646154-1.461538 1.692308-2.030769 3.184616-1.630769 24.107692 6.538462 52.015385 3.846154 76.676923 3.938462 1.523077 0.030769 1.953846 0.784615 1.307692 2.215384l-22.938461 52.123077v0.046154z m0 0" fill="#FFFFFF" ></path></symbol><symbol id="qcw-chimabiao" viewBox="0 0 1024 1024"><path d="M924.2624 337.1008a449.3824 449.3824 0 1 0 35.2256 174.3872 446.464 446.464 0 0 0-35.2256-174.3872m-141.2608 445.9008a384 384 0 1 1 112.64-271.36 381.4912 381.4912 0 0 1-112.64 271.36m-384-565.1968L217.856 398.848a32 32 0 0 0 0 45.2608l362.0352 361.7792a32 32 0 0 0 45.2608 0l180.736-180.7872a32 32 0 0 0 0-45.2608L443.8528 217.8048a32 32 0 0 0-45.2608 0m203.6224 520.448l-45.2608-45.2608 67.8912-67.8912a32 32 0 0 0-45.2608-45.2608L512 647.7312l-45.2608-45.2608 67.7888-67.9424a32 32 0 0 0-45.2608-45.2608L421.376 557.1584l-45.2608-45.2608 67.8912-67.8912a32 32 0 1 0-45.2608-45.2608L330.8544 466.6368l-45.2608-45.2608L421.376 285.5936l316.7744 316.7744z"  ></path></symbol><symbol id="qcw-tusou" viewBox="0 0 1024 1024"><path d="M832 928H192a96.1024 96.1024 0 0 1-96-96V192A96.1024 96.1024 0 0 1 192 96h640a96.1024 96.1024 0 0 1 96 96v640a96.1024 96.1024 0 0 1-96 96m-640-768a32.0512 32.0512 0 0 0-32 32v640a32.0512 32.0512 0 0 0 32 32h640a32.0512 32.0512 0 0 0 32-32V192a32.0512 32.0512 0 0 0-32-32z"  ></path><path d="M384 544A160 160 0 1 1 544 384 160.2048 160.2048 0 0 1 384 544m0-256A96 96 0 1 0 480 384 96.1024 96.1024 0 0 0 384 288"  ></path><path d="M896 721.9712a186.6752 186.6752 0 0 1-90.368-21.0432 140.9536 140.9536 0 0 0-126.464 0 204.8 204.8 0 0 1-180.7872 0 125.3376 125.3376 0 0 0-63.232-14.9504 32 32 0 0 1 0-64 186.6752 186.6752 0 0 1 90.368 21.0432 140.9536 140.9536 0 0 0 126.4128 0 204.8 204.8 0 0 1 180.7872 0 125.3376 125.3376 0 0 0 63.232 14.9504 32 32 0 0 1 0 64"  ></path><path d="M281.6 721.9712a186.6752 186.6752 0 0 1-90.368-21.0432 125.3376 125.3376 0 0 0-63.232-14.9504 32 32 0 0 1 0-64 186.6752 186.6752 0 0 1 90.368 21.0432 125.3376 125.3376 0 0 0 63.232 14.9504 32 32 0 0 1 0 64"  ></path></symbol><symbol id="qcw-AI" viewBox="0 0 1024 1024"><path d="M896 896h-160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32H896a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32M768 832h96V192H768z"  ></path><path d="M640 896H480a32 32 0 0 1-30.72-22.272l-81.5104-256-81.5104 256a32 32 0 0 1-30.72 22.272H96a32 32 0 0 1-30.72-41.6768L289.28 150.3232a32 32 0 0 1 30.72-22.3232h96a32 32 0 0 1 30.72 22.3232l224 704a32 32 0 0 1-30.72 41.6768m-136.6016-64h93.0816L392.8576 192h-49.2032l-203.6224 640h92.8256l104.9088-329.4208a32 32 0 0 1 60.9792 0z"  ></path></symbol><symbol id="qcw-erkai" viewBox="0 0 1024 1024"><path d="M504.234667 191.061333L416.426667 169.130667A96.128 96.128 0 0 0 512.213333 256a32 32 0 0 1 0 64 160.256 160.256 0 0 1-158.464-137.728L270.72 229.589333a225.066667 225.066667 0 0 0-106.197333 140.16l-30.72 122.922667 90.197333 36.053333v-39.210666a223.616 223.616 0 0 0-11.477333-70.826667l-18.858667-56.576a32 32 0 1 1 60.714667-20.224l18.858666 56.576a287.488 287.488 0 0 1 14.762667 91.093333V831.914667a32.042667 32.042667 0 0 0 32.213333 32.085333h192a32 32 0 0 1 0 64h-192a96.128 96.128 0 0 1-96-96v-234.325333l-139.904-55.936a32 32 0 0 1-19.157333-37.461334l37.504-150.016a288 288 0 0 1 136.533333-180.224l129.152-73.813333a32 32 0 0 1 23.637334-3.242667l128 32a32 32 0 1 1-15.530667 62.08m423.765333 0.938667v581.504a95.36 95.36 0 0 1-28.117333 67.882667l-109.269333 109.269333a32 32 0 0 1-45.269334 0l-109.610666-109.269333a95.36 95.36 0 0 1-28.117334-67.882667V192a96.128 96.128 0 0 1 96.384-96h128a96.128 96.128 0 0 1 96 96m-64 0a32.042667 32.042667 0 0 0-32-32h-128a32.042667 32.042667 0 0 0-32 32v544h96a32 32 0 0 1 0 64h-82.944L768 882.730667l86.613333-86.613334a31.786667 31.786667 0 0 0 9.386667-22.613333z"  ></path></symbol><symbol id="qcw-weixuan2" viewBox="0 0 1024 1024"><path d="M512 73.142857a438.857143 438.857143 0 1 0 438.857143 438.857143 439.369143 439.369143 0 0 0-438.857143-438.857143m0-73.142857a512 512 0 1 1-512 512 512 512 0 0 1 512-512z"  ></path><path d="M512 512m-219.428571 0a219.428571 219.428571 0 1 0 438.857142 0 219.428571 219.428571 0 1 0-438.857142 0Z"  ></path></symbol><symbol id="qcw-weixuan1" viewBox="0 0 1024 1024"><path d="M512 73.142857a438.857143 438.857143 0 1 0 438.857143 438.857143 439.369143 439.369143 0 0 0-438.857143-438.857143m0-73.142857a512 512 0 1 1-512 512 512 512 0 0 1 512-512z"  ></path></symbol><symbol id="qcw-tianjia" viewBox="0 0 1024 1024"><path d="M512.022186 1023.957335a508.607082 508.607082 0 0 1-362.053494-150.009437A508.607082 508.607082 0 0 1 0.044585 511.979734a508.521752 508.521752 0 0 1 150.009437-362.010828A508.777741 508.777741 0 0 1 512.022186 0.002133a508.649747 508.649747 0 0 1 361.968164 149.924108A508.649747 508.649747 0 0 1 1023.999787 511.979734a508.735076 508.735076 0 0 1-149.966773 362.053494A508.479087 508.479087 0 0 1 512.022186 1023.957335z m-170.659201-554.642401a42.6648 42.6648 0 0 0-42.6648 42.6648 42.6648 42.6648 0 0 0 42.6648 42.6648h127.994401v127.994401a42.6648 42.6648 0 0 0 42.6648 42.6648 42.6648 42.6648 0 0 0 42.6648-42.6648v-127.994401h127.9944a42.6648 42.6648 0 0 0 42.6648-42.6648 42.6648 42.6648 0 0 0-42.6648-42.6648h-127.9944V341.320534a42.6648 42.6648 0 0 0-42.6648-42.6648 42.6648 42.6648 0 0 0-42.6648 42.6648v127.9944z"  ></path></symbol><symbol id="qcw-yixuan" viewBox="0 0 1024 1024"><path d="M767.904012 1023.936008h-511.936008a255.968004 255.968004 0 0 1-255.968004-255.968004v-511.936008a255.968004 255.968004 0 0 1 255.968004-255.968004h511.936008a255.968004 255.968004 0 0 1 255.968004 255.968004v511.936008a255.968004 255.968004 0 0 1-255.968004 255.968004z m-479.940008-552.122985a47.354081 47.354081 0 0 0-28.7964 9.598801 47.994001 47.994001 0 0 0-9.662792 67.127609l143.790026 191.976003a47.546057 47.546057 0 0 0 36.795401 19.1976h1.5998a48.121985 48.121985 0 0 0 36.47544-16.829896l307.737533-359.76303a47.674041 47.674041 0 0 0 11.390576-35.003625 47.866017 47.866017 0 0 0-16.701912-32.827896 47.738033 47.738033 0 0 0-31.100112-11.51856 47.994001 47.994001 0 0 0-36.475441 16.829896l-268.766404 314.328709-107.634546-143.91801a47.674041 47.674041 0 0 0-38.651169-19.133609z"  ></path></symbol><symbol id="qcw-weixuan" viewBox="0 0 1024 1024"><path d="M256 64a192 192 0 0 0-192 192v512a192 192 0 0 0 192 192h512a192 192 0 0 0 192-192V256a192 192 0 0 0-192-192H256m0-64h512a256 256 0 0 1 256 256v512a256 256 0 0 1-256 256H256a256 256 0 0 1-256-256V256a256 256 0 0 1 256-256z"  ></path></symbol><symbol id="qcw-yixihuan" viewBox="0 0 1024 1024"><path d="M852.992 205.312a256 256 0 0 0-341.048889-18.887111 256 256 0 0 0-340.992 381.155555l318.976 318.976a32.028444 32.028444 0 0 0 22.755556 9.386667 32.028444 32.028444 0 0 0 22.755555-9.443555l317.724445-318.976a256 256 0 0 0 0-362.040889"  ></path></symbol><symbol id="qcw-shoucang" viewBox="0 0 1024 1024"><path d="M885.28 436.48c-1.53 0-3.08-0.11-4.64-0.34l-221.43-32.17a64.008 64.008 0 0 1-48.19-35.01L512 168.31l-99.03 200.65a64.008 64.008 0 0 1-48.19 35.01l-221.43 32.18c-17.5 2.54-33.73-9.58-36.27-27.07s9.58-33.73 27.07-36.27l221.43-32.18 99.03-200.65c10.86-22.01 32.85-35.68 57.39-35.68s46.53 13.67 57.39 35.68l99.03 200.65 221.43 32.18c17.49 2.54 29.61 18.78 27.07 36.27-2.32 15.92-16 27.4-31.64 27.4zM739.89 933.57c-10.17 0-20.39-2.45-29.84-7.42L512 822.03 313.95 926.15c-21.72 11.42-47.55 9.55-67.4-4.87-19.85-14.42-29.61-38.41-25.46-62.6l37.83-220.53-73.08-71.24c-12.66-12.34-12.91-32.6-0.58-45.25 12.34-12.65 32.6-12.91 45.25-0.58l73.08 71.24A63.99 63.99 0 0 1 322 648.97L284.17 869.5l198.05-104.12c18.65-9.8 40.92-9.8 59.56 0L739.83 869.5l-37.82-220.53a63.99 63.99 0 0 1 18.41-56.65l73.08-71.24c12.66-12.33 32.91-12.08 45.25 0.58 12.34 12.66 12.08 32.92-0.58 45.25l-73.08 71.24 37.83 220.53c4.15 24.19-5.61 48.17-25.46 62.6-11.23 8.15-24.35 12.29-37.57 12.29z"  ></path></symbol><symbol id="qcw-yishoucang" viewBox="0 0 1024 1024"><path d="M729.22 915.63c-10.08-0.01-20-2.48-28.91-7.19l-188.29-98.99-188.29 98.99c-30.3 15.94-67.79 4.3-83.73-26a62.018 62.018 0 0 1-6.23-39.36l35.97-209.66L117.4 484.93c-24.52-23.9-25.02-63.15-1.13-87.67 9.52-9.77 22-16.12 35.5-18.08l210.52-30.59 94.14-190.76c15.15-30.7 52.32-43.31 83.03-28.16a61.937 61.937 0 0 1 28.16 28.16l94.14 190.74 210.52 30.59c33.88 4.92 57.37 36.37 52.45 70.25a61.998 61.998 0 0 1-18.08 35.5L754.3 633.39l35.97 209.66c5.75 33.82-17.01 65.91-50.83 71.65-3.38 0.57-6.8 0.87-10.22 0.88v0.05z"  ></path></symbol><symbol id="qcw-xihuan" viewBox="0 0 1024 1024"><path d="M512.568889 895.715556a31.914667 31.914667 0 0 1-22.755556-9.386667L170.837333 567.352889a256 256 0 0 1 340.992-381.155556 256 256 0 0 1 341.048889 381.155556l-192.853333 193.422222a32.085333 32.085333 0 0 1-45.511111-45.169778l192.853333-193.422222A192 192 0 1 0 535.893333 250.595556l-0.568889 0.625777-0.796444 0.796445a32.028444 32.028444 0 0 1-45.511111 0l-0.796445-0.796445-0.568888-0.568889a192 192 0 1 0-271.530667 271.530667l318.976 318.976a32.028444 32.028444 0 0 1-22.755556 54.613333"  ></path></symbol><symbol id="qcw-shixing" viewBox="0 0 1024 1024"><path d="M747.362462 941.371077a67.190154 67.190154 0 0 1-31.507693-7.876923l-204.091077-107.283692-203.618461 107.362461a67.190154 67.190154 0 0 1-97.516308-70.892308l38.990769-227.24923-165.415384-160.925539a67.190154 67.190154 0 0 1 37.257846-114.609231l228.430769-33.161846 102.4-206.769231a67.190154 67.190154 0 0 1 120.516923 0l102.4 206.690462 228.430769 33.161846a67.190154 67.190154 0 0 1 37.257847 114.609231l-165.415385 160.925538 38.990769 227.249231a67.347692 67.347692 0 0 1-66.166154 78.769231z"  ></path></symbol><symbol id="qcw-kongxing" viewBox="0 0 1024 1024"><path d="M276.637538 941.213538a66.638769 66.638769 0 0 1-59.392-36.155076 63.960615 63.960615 0 0 1-6.695384-42.456616l39.384615-227.485538-165.415384-160.84677a66.717538 66.717538 0 0 1-20.243693-47.261538 67.032615 67.032615 0 0 1 18.983385-47.734154 67.426462 67.426462 0 0 1 38.439385-19.613538l228.036923-33.240616 102.4-206.611692a66.796308 66.796308 0 0 1 60.416-37.494154 66.244923 66.244923 0 0 1 29.696 6.931692 66.008615 66.008615 0 0 1 30.562461 30.562462l102.4 206.611692 228.036923 33.240616a66.796308 66.796308 0 0 1 44.347077 26.230154 67.111385 67.111385 0 0 1 12.524308 50.018461 66.166154 66.166154 0 0 1-19.613539 38.281846L775.561846 635.037538l39.384616 227.485539a66.717538 66.717538 0 0 1-11.500308 50.097231 66.953846 66.953846 0 0 1-43.638154 27.490461 58.683077 58.683077 0 0 1-11.264 1.024 67.977846 67.977846 0 0 1-31.507692-7.876923l-204.169846-107.204923-204.169847 107.204923a66.008615 66.008615 0 0 1-32.059077 7.955692zM512 175.734154L401.723077 398.493538l-245.838769 35.761231 177.782154 173.292308-41.905231 244.814769 220.002461-115.475692 220.002462 115.475692-41.905231-244.814769 177.782154-173.292308-245.838769-35.761231z"  ></path></symbol><symbol id="qcw-yikaitong" viewBox="0 0 1024 1024"><path d="M800 672H224c-88.37 0-160-71.63-160-160s71.63-160 160-160h576c88.37 0 160 71.63 160 160s-71.63 160-160 160z" fill="#5C351C" ></path><path d="M375.5 416h-160l-32 82.29L295.5 608l112-109.71z" fill="#FFC774" ></path><path d="M295.5 619.2L174.13 500.31l35.9-92.31h170.95l35.9 92.31L295.5 619.2zM192.87 496.27L295.5 596.8l102.63-100.54-28.1-72.26H220.97l-28.1 72.27z" fill="#FFE4BC" ></path><path d="M351.5 464h-31.58l-24.42 41.87L271.08 464H239.5l40.21 68.93L295.5 560l15.79-27.07z" fill="#FFFFFF" ></path><path d="M692.5 592v-93.33h93.33c7.36 0 13.33-5.97 13.33-13.33S793.2 472 785.83 472H692.5v-40h93.33c29.46 0 53.33 23.88 53.33 53.33 0 29.46-23.88 53.33-53.33 53.33H732.5V592h-40z m-60 0V432.42h40V592h-40z m-113.33 0l-53.33-159.58h40l33.33 99.73 33.33-99.73h40L559.17 592h-40z" fill="#FFE4BC" ></path></symbol><symbol id="qcw-weikaitong" viewBox="0 0 1024 1024"><path d="M800 672H224c-88.37 0-160-71.63-160-160s71.63-160 160-160h576c88.37 0 160 71.63 160 160s-71.63 160-160 160z" fill="#BCBCBC" ></path><path d="M467.28 436.09h15.79v21.22h55.11v15.13h-55.11v25.5h63.82v15.13h-50.83c10.86 19.19 29.06 36.46 54.61 51.82l-11.02 14.15c-26.43-19.74-45.07-41.73-55.93-65.96h-0.66v73.69h-15.79v-73.69h-0.66c-11.63 26.65-30.82 48.69-57.57 66.13L400 564.56c24.56-13.49 42.66-30.65 54.28-51.49h-50.83v-15.13h63.82v-25.5h-53.95v-15.13h53.95v-21.22zM575.02 444.14h129.62v15.13h-26.32v39.48h34.71v15.13h-34.71v71.23H662.7v-71.23h-44.09c-1.64 16.67-4.88 30.38-9.71 41.12-6.25 13.82-16.72 24.45-31.42 31.91l-8.39-13.16c13.16-7.79 22.15-17.6 26.98-29.44 3.07-8.33 5.26-18.48 6.58-30.43h-36.19v-15.13h37.34l0.16-3.62v-35.86h-28.95v-15.13z m44.75 15.14v37.67l-0.16 1.81h43.1v-39.48h-42.94zM838.71 584.46c-5.59 0-15.41-0.11-29.44-0.33-10.42-0.11-19.19-1.04-26.32-2.8-6.47-1.97-12.23-5.81-17.27-11.52-2.3-2.74-4.39-4.11-6.25-4.11-3.4 0-9.32 7.4-17.77 22.21l-11.51-10.69c8.22-13.38 15.63-21.71 22.21-25v-46.55h-22.04v-14.48H767v62.18c0.88 0.66 1.7 1.48 2.47 2.47 3.84 4.39 7.79 7.68 11.84 9.87 5.15 2.41 12.45 3.78 21.88 4.11 12.5 0.22 23.58 0.33 33.23 0.33 5.37 0 13.54-0.11 24.51-0.33 7.24-0.11 13.6-0.38 19.08-0.82l-3.78 15.46h-37.52z m-94.58-147.39c11.07 8.55 20.45 17.22 28.13 25.99l-11.02 10.86c-6.69-8.33-15.96-17.22-27.8-26.65l10.69-10.2z m66.12 16.29H778.5v-13h90.31v11.02c-9.21 7.89-19.41 14.91-30.6 21.06l0.99 0.82h33.06v73.03c0 9.76-5.37 14.64-16.12 14.64h-12.67l-3.29-13 11.68 0.66c3.73 0 5.59-1.81 5.59-5.43v-8.39h-23.69v26.98h-14.31v-26.98h-23.19v27.3h-14.8v-88.83h37.83c-6.25-4.17-12.34-7.84-18.26-11.02l9.22-8.86z m9.22 44.41v-11.52h-23.19v11.52h23.19z m-23.2 12.83v11.52h23.19V510.6h-23.19z m51.65-57.24h-36.85c7.79 4.93 13.65 8.83 17.6 11.68 6.69-3.29 13.11-7.18 19.25-11.68z m9.54 44.41v-11.52h-23.69v11.52h23.69z m-23.68 12.83v11.52h23.69V510.6h-23.69z" fill="#FFFFFF" ></path><path d="M320 416H160l-32 82.29L240 608l112-109.71z" fill="#AFAFAF" ></path><path d="M240 619.2L118.63 500.31l35.9-92.31h170.95l35.9 92.31L240 619.2zM137.37 496.27L240 596.8l102.63-100.54-28.1-72.26H165.47l-28.1 72.27z" fill="#DFDFDF" ></path><path d="M296 464h-31.58L240 505.87 215.58 464H184l40.21 68.93L240 560l15.79-27.07z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-bianjiexiadan" viewBox="0 0 1024 1024"><path d="M864.028444 256h-32.028444V192a96.085333 96.085333 0 0 0-95.971556-95.971556H288.028444a96.085333 96.085333 0 0 0-95.971555 96.028445v64h-31.971556a96.085333 96.085333 0 0 0-96.085333 95.971555v352.028445a96.085333 96.085333 0 0 0 96.028444 96.028444h32.028445v32.028445a96.085333 96.085333 0 0 0 96.028444 96.028444h448a96.085333 96.085333 0 0 0 96.028445-95.971555v-31.971556h32.028444a96.085333 96.085333 0 0 0 96.028445-95.971555V352.028444a96.085333 96.085333 0 0 0-96.142223-96.028444zM256 192a32.028444 32.028444 0 0 1 32.028444-31.971556h448a32.028444 32.028444 0 0 1 32.028445 32.028445v64h-512z m-95.971556 128h704a32.028444 32.028444 0 0 1 32.028445 32.028444v160.028445h-768V352.028444a32.028444 32.028444 0 0 1 31.971555-32.028444z m704 416.028444h-32.028444v-64a32.028444 32.028444 0 0 0-64 0v160.028445a32.028444 32.028444 0 0 1-31.971556 32.028444H288.028444a32.028444 32.028444 0 0 1-31.971555-31.971555v-159.971556a32.028444 32.028444 0 0 0-64 0v64h-31.971556a32.028444 32.028444 0 0 1-31.971555-31.971555v-128h768v128a32.028444 32.028444 0 0 1-32.085334 31.857777z m-192-320a32.028444 32.028444 0 0 1 32.028445-31.971555h96.028444a32.028444 32.028444 0 0 1 0 64h-96.085333a31.971556 31.971556 0 0 1-31.971556-32.028445z"  ></path></symbol><symbol id="qcw-sousuo" viewBox="0 0 1024 1024"><path d="M701.041778 761.344a312.888889 312.888889 0 1 1 60.302222-60.302222l150.641778 150.584889-60.359111 60.359111zM284.444444 512a227.555556 227.555556 0 1 0 227.555556-227.555556 227.555556 227.555556 0 0 0-227.555556 227.555556z"  ></path></symbol><symbol id="qcw-a-lianhe111" viewBox="0 0 1024 1024"><path d="M512 1023.926868a511.926868 511.926868 0 1 1 511.926868-511.926868 511.926868 511.926868 0 0 1-511.926868 511.926868z m0-73.13241c20.550207 0 56.75075-33.128982 87.758892-105.456935a650.147122 650.147122 0 0 0 35.469218-113.940294H388.552493a644.296529 644.296529 0 0 0 35.396086 113.940294c31.081274 72.327953 67.281817 105.456935 87.758891 105.456935z m-125.129553-18.20997a631.205828 631.205828 0 0 1-73.13241-201.187259H132.223397a440.769033 440.769033 0 0 0 254.64705 201.187259z m250.332238 0a441.061563 441.061563 0 0 0 254.647051-201.187259H710.261963a629.523782 629.523782 0 0 1-73.059278 201.187259zM925.636909 658.191687a439.233252 439.233252 0 0 0 0-292.529639H722.255678a1191.473218 1191.473218 0 0 1 0 292.529639zM648.318812 658.191687a1096.54735 1096.54735 0 0 0 0-292.529639H375.608056a1088.64905 1088.64905 0 0 0 0 292.529639z m-346.647622 0a1182.11227 1182.11227 0 0 1 0-292.529639H98.289959a438.794458 438.794458 0 0 0 0 292.529639z m590.251678-365.662048a440.110841 440.110841 0 0 0-254.720183-201.114127 628.938723 628.938723 0 0 1 73.13241 201.114127zM635.301243 292.529639a649.342665 649.342665 0 0 0-35.469219-113.867162c-31.081274-72.620483-67.281817-105.456935-87.758892-105.456935s-56.823882 32.836452-87.758891 105.456935A643.565205 643.565205 0 0 0 388.918155 292.529639z m-321.782603 0a631.864019 631.864019 0 0 1 73.13241-201.187259A441.061563 441.061563 0 0 0 131.857735 292.529639z"  ></path></symbol><symbol id="qcw-yincang" viewBox="0 0 1024 1024"><path d="M308.416 762.112l453.056-453.056 0.448-0.448 157.184-157.184a32 32 0 0 0-45.248-45.248L733.44 246.592A480.384 480.384 0 0 0 64 501.376l-4.352 11.456L64 524.288a482.56 482.56 0 0 0 171.328 220.48L105.856 874.24a32 32 0 0 0 45.248 45.248L308.16 762.432z m136.192-317.248a96 96 0 0 1 109.248-18.752l-128 128a96 96 0 0 1 18.752-109.504z m-316.224 67.648a416.32 416.32 0 0 1 557.248-218.368l-84.864 84.864a160 160 0 0 0-221.696 221.696l-97.728 97.408a418.624 418.624 0 0 1-152.96-185.6z m836.992 0l-4.352 11.456a480 480 0 0 1-448.448 308.544 485.952 485.952 0 0 1-64-4.288 32 32 0 1 1 8.512-63.424 421.888 421.888 0 0 0 55.744 3.712 416 416 0 0 0 384-256 415.04 415.04 0 0 0-61.76-102.912 32 32 0 1 1 49.6-40.512 478.72 478.72 0 0 1 76.8 131.968z"  ></path></symbol><symbol id="qcw-xianshi" viewBox="0 0 1024 1024"><path d="M512 864a477.056 477.056 0 0 1-275.2-86.656A481.408 481.408 0 0 1 63.488 555.392L59.136 544l4.352-11.456a480 480 0 0 1 896.96 0L964.8 544l-4.352 11.456A480 480 0 0 1 512 864zM128 544a416 416 0 0 0 768 0 416 416 0 0 0-768 0z m384 160a160 160 0 1 1 160-160 160 160 0 0 1-160 160z m0-256a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"  ></path></symbol><symbol id="qcw-duoxuan" viewBox="0 0 1024 1024"><path d="M796.444444 352.711111H455.111111a34.133333 34.133333 0 0 1-34.133333-34.133333A34.133333 34.133333 0 0 1 455.111111 284.444444h341.333333a34.133333 34.133333 0 0 1 34.133334 34.133334 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path><path d="M284.444444 352.711111H227.555556a34.133333 34.133333 0 0 1-34.133334-34.133333A34.133333 34.133333 0 0 1 227.555556 284.444444h56.888888a34.133333 34.133333 0 0 1 34.133334 34.133334 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path><path d="M796.444444 551.822222H455.111111a34.133333 34.133333 0 0 1-34.133333-34.133333 34.133333 34.133333 0 0 1 34.133333-34.133333h341.333333a34.133333 34.133333 0 0 1 34.133334 34.133333 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path><path d="M284.444444 551.822222H227.555556a34.133333 34.133333 0 0 1-34.133334-34.133333 34.133333 34.133333 0 0 1 34.133334-34.133333h56.888888a34.133333 34.133333 0 0 1 34.133334 34.133333 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path><path d="M796.444444 750.933333H455.111111a34.133333 34.133333 0 0 1-34.133333-34.133333 34.133333 34.133333 0 0 1 34.133333-34.133333h341.333333a34.133333 34.133333 0 0 1 34.133334 34.133333 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path><path d="M284.444444 750.933333H227.555556a34.133333 34.133333 0 0 1-34.133334-34.133333 34.133333 34.133333 0 0 1 34.133334-34.133333h56.888888a34.133333 34.133333 0 0 1 34.133334 34.133333 34.133333 34.133333 0 0 1-34.133334 34.133333z"  ></path></symbol><symbol id="qcw-xuanzhong" viewBox="0 0 1024 1024"><path d="M709.578105 906.563368H315.445895a197.308632 197.308632 0 0 1-197.093053-197.093052V315.392a197.308632 197.308632 0 0 1 197.093053-197.039158h394.13221a197.254737 197.254737 0 0 1 196.985263 197.039158v394.132211a197.254737 197.254737 0 0 1-196.985263 197.039157zM322.344421 478.208a39.989895 39.989895 0 0 0-24.198737 8.084211 40.474947 40.474947 0 0 0-8.08421 56.589473l120.993684 161.684211a40.582737 40.582737 0 0 0 30.935579 16.168421h1.347368a40.421053 40.421053 0 0 0 30.773895-14.228211l259.125895-303.104a40.205474 40.205474 0 0 0 9.593263-29.426526 40.151579 40.151579 0 0 0-14.012632-27.540211 40.367158 40.367158 0 0 0-26.246737-9.754947 40.205474 40.205474 0 0 0-30.72 14.228211l-226.357894 264.623157-90.758737-121.209263a40.744421 40.744421 0 0 0-32.390737-16.060631z"  ></path></symbol><symbol id="qcw-bofang2" viewBox="0 0 1024 1024"><path d="M512 94.814815a417.185185 417.185185 0 0 0-294.987852 712.173037 417.185185 417.185185 0 1 0 589.975704-589.975704A414.454519 414.454519 0 0 0 512 94.814815m0-94.814815a512 512 0 1 1-512 512 512 512 0 0 1 512-512z" fill="#FFFFFF" opacity=".7" ></path><path d="M512 512m-417.185185 0a417.185185 417.185185 0 1 0 834.37037 0 417.185185 417.185185 0 1 0-834.37037 0Z" opacity=".7" ></path><path d="M749.852444 495.672889a18.962963 18.962963 0 0 1 0 32.654222l-360.941037 213.276445a18.962963 18.962963 0 0 1-28.615111-16.308149v-426.590814a18.962963 18.962963 0 0 1 28.615111-16.327112z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-bofang1" viewBox="0 0 1024 1024"><path d="M512 94.814815a417.185185 417.185185 0 0 0-294.987852 712.173037 417.185185 417.185185 0 1 0 589.975704-589.975704A414.454519 414.454519 0 0 0 512 94.814815m0-94.814815a512 512 0 1 1-512 512 512 512 0 0 1 512-512z" fill="#FFFFFF" opacity=".7" ></path><path d="M512 512m-417.185185 0a417.185185 417.185185 0 1 0 834.37037 0 417.185185 417.185185 0 1 0-834.37037 0Z" opacity=".4" ></path><path d="M749.852444 495.672889a18.962963 18.962963 0 0 1 0 32.654222l-360.941037 213.276445a18.962963 18.962963 0 0 1-28.615111-16.308149v-426.590814a18.962963 18.962963 0 0 1 28.615111-16.327112z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-factory2" viewBox="0 0 1024 1024"><path d="M896.128 1024h-768a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128z m-768-960a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M851.712 232.64h-535.04v228.672a703.04 703.04 0 0 1-102.08 384l-42.24-37.632a625.088 625.088 0 0 0 88.32-346.176V179.072h591.04z"  ></path></symbol><symbol id="qcw-qijiandian" viewBox="0 0 2688 1024"><path d="M512 0h1664a512 512 0 0 1 512 512 512 512 0 0 1-512 512H0V512a512 512 0 0 1 512-512z" fill="#E1251B" ></path><path d="M853.568 710.08h22.912l8-76.16h-22.848l22.4-213.312h22.848l8-76.224h-22.848l3.2-30.464h-76.16l-3.2 30.464h-121.92l3.2-30.464H620.928l-3.2 30.464h-22.848L586.88 420.608h22.848l-22.4 213.312H564.48l-8 76.16h98.688l-109.824 32.96-8.32 79.424 141.632-42.432 7.296-69.952h60.992l-7.36 69.952 132.672 42.432 8.384-79.424-102.912-32.96zM675.776 517.12h121.92l-2.112 20.288h-121.92z m132.032-96.512l-2.112 20.288h-121.92l2.176-20.288z m-142.144 193.024h121.6l-2.112 20.288h-121.6z m-179.84-391.168H569.6l-8 76.224H424.384l-4.8 45.696h133.248l-49.664 472.384v0.32H396.48l8.064-76.8h30.464l33.6-319.616h-57.024l-12.16 115.648a1070.4 1070.4 0 0 1-41.216 200.896l-24.512 79.616H256l29.12-94.72a982.912 982.912 0 0 0 38.08-185.6l24.96-237.568h-30.4l8.064-76.224H409.6l3.2-30.464h76.224z m212.032 0h237.44l-8 76.224H576.832L631.168 192h82.176z m445.376 0h198.08l-27.2 259.072-8 76.224-27.264 259.008h-76.16l27.2-259.008h-22.848l-14.4 137.088h-76.224l14.4-137.088h-22.848l-27.2 259.008h-76.224l27.264-259.008h-30.464l8-76.224h30.464l17.6-167.616h76.224l-17.664 167.616h22.912l14.4-137.152h76.16l-14.4 137.152h22.848l19.2-182.848h-198.08L1070.208 192h76.224z m263.104 396.224h-76.16l44.8-426.688h76.224z m186.048-320h-121.92l8-76.224h198.08l-41.6 396.224h-76.224z m-37.248 441.6h76.224l-8 76.16h-83.84a60.608 60.608 0 0 1-61.376-68.544l6.4-62.464a324.096 324.096 0 0 1-19.584 29.376l-88 116.864-58.816-42.432 87.232-115.84a226.432 226.432 0 0 0 44.8-111.872l19.648-187.008h76.16l-19.648 187.008a296.96 296.96 0 0 1-17.088 72.064h56.832z m827.776-518.4l-8 76.224h-472.384l8-76.224h144.768l3.2-30.464h76.224l-3.2 30.464z m-283.84 236.032h213.376l8-76.224h-213.376l7.232-68.352h-76.224l-7.168 68.352-8 76.224-7.232 68.736H1893.76l-30.4 289.536h327.616a117.312 117.312 0 0 0 124.672-99.008l20.032-190.528h-243.84z m140.416 259.264a26.112 26.112 0 0 1-25.6 22.848h-266.688l14.4-137.152h289.536z m-435.584-495.296h76.16l-31.04 295.488a686.464 686.464 0 0 1-43.712 178.112l-47.232 120.704h-79.232l55.424-141.632a606.336 606.336 0 0 0 38.4-157.184z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-gold" viewBox="0 0 1024 1024"><path d="M214.707003 391.519996l-30.113-43.300999a912.041991 912.041991 0 0 0 307.687997-215.302998h42.157A759.673993 759.673993 0 0 0 839.959997 346.049997l-29.63 43.300999a862.657992 862.657992 0 0 1-106.899999-53.418999v39.747999H539.5v103.949999h257.097997v48.18h-257.099997v192.718998h80.159999A1120.900989 1120.900989 0 0 0 684.699998 568.881994l47.638 16.622a912.945991 912.945991 0 0 1-60.225 135.023999H821.589997v49.865999H204.047003v-49.865999h149.537999a702.700993 702.700993 0 0 0-57.816-129.241999l46.975-17.345a861.212992 861.212992 0 0 1 61.308999 146.586999h83.109999V527.808995H229.280003v-48.18h257.881997V375.680996H323.230002v-42.156999a1119.395989 1119.395989 0 0 1-108.523999 57.996999z m298.291997-209.399998A913.246991 913.246991 0 0 1 330.940002 328.704997h359.721996A703.965993 703.965993 0 0 1 513 182.119998z"  ></path><path d="M511.915 1023.99999a30.112 30.112 0 0 1-11.202-2.168L124.791004 871.269991a149.838999 149.838999 0 0 1-94.672999-139.839998V150.561999A150.561999 150.561999 0 0 1 180.680003 0h662.469994a150.561999 150.561999 0 0 1 150.562998 150.561999v580.866994A149.838999 149.838999 0 0 1 899.099996 871.269991l-376.042996 150.561999a29.57 29.57 0 0 1-11.142 2.168zM180.680003 60.404999a90.336999 90.336999 0 0 0-90.336999 90.337V731.609993a89.975999 89.975999 0 0 0 56.791 83.952999l364.780996 145.924999 364.780996-145.924999a89.975999 89.975999 0 0 0 56.792-83.952999V150.741999a90.336999 90.336999 0 0 0-90.336999-90.337z"  ></path></symbol><symbol id="qcw-personal" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M536.576 160.832A804.8 804.8 0 0 0 868.16 440.256l-33.024 49.856A819.712 819.712 0 0 1 512 212.224a868.608 868.608 0 0 1-323.136 280.96l-33.024-49.92a856.832 856.832 0 0 0 331.648-282.432z m3.84 226.432v475.904h-56.832V387.264z"  ></path></symbol><symbol id="qcw-zifa" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M769.92 864.704h-56v-47.616H310.144v47.616H254.08V252.992h164.224a374.848 374.848 0 0 0 37.632-93.696l56.064 7.68a354.176 354.176 0 0 1-36.096 86.016H769.92z m-56-444.416V305.984H310.144v114.368z m0 168.128v-117.44H310.144v117.44z m0 175.744V639.04H310.144v125.12z"  ></path></symbol><symbol id="qcw-days15" viewBox="0 0 1024 1024"><path d="M32.00001 672a32.96 32.96 0 0 1-12.288-2.432A32 32 0 0 1 0.00001 640V128A128 128 0 0 1 128.00001 0h768a128 128 0 0 1 128 128 32 32 0 0 1-32 32 32 32 0 0 1-32-32 64 64 0 0 0-64-64H128.00001a64 64 0 0 0-64 64v434.752l73.344-73.408a32 32 0 0 1 45.248 0 32 32 0 0 1 0 45.248l-128 128A32 32 0 0 1 32.00001 672z m992 224V384a32 32 0 0 0-19.776-29.568 32 32 0 0 0-34.88 6.912l-128 128a32 32 0 0 0 0 45.248 32 32 0 0 0 45.248 0L960.00001 461.248V896a64 64 0 0 1-64 64H128.00001a64 64 0 0 1-64-64 32 32 0 0 0-32-32 32 32 0 0 0-32 32 128 128 0 0 0 128 128h768a128 128 0 0 0 128-128z"  ></path><path d="M444.92801 785.408L582.40001 312.32H432.38401v62.976h-69.12V238.592h297.472v78.272L527.87201 785.408z"  ></path></symbol><symbol id="qcw-real" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M210.048 864.64l-30.784-46.784a616.832 616.832 0 0 0 299.392-148.16 282.496 282.496 0 0 0 24.576-34.56H186.24v-52.16h343.872a465.92 465.92 0 0 0 32.96-162.688v-90.624h53.76v90.624a548.864 548.864 0 0 1-28.416 162.688h246.4v52.16h-269.44a616.448 616.448 0 0 1-20.736 34.56A1718.144 1718.144 0 0 1 844.8 820.864l-29.952 47.68a1528.64 1528.64 0 0 0-300.8-158.144 632.576 632.576 0 0 1-304 154.24zM821.76 382.656H768v-96H250.88v96h-53.696v-147.2h291.648a500.864 500.864 0 0 0-31.488-70.4l56.832-9.216c9.984 22.976 19.904 49.856 29.888 79.808h277.888z m-379.904 136.64l-28.48 43.712a663.68 663.68 0 0 0-152.704-86.72l27.584-41.472a840.384 840.384 0 0 1 153.6 84.48z m73.664-106.688l-28.416 43.712a701.312 701.312 0 0 0-158.144-89.6l28.416-41.472A766.912 766.912 0 0 1 515.52 412.48z"  ></path></symbol><symbol id="qcw-daifa" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M177.728 534.592l-17.664-57.6a857.6 857.6 0 0 0 183.424-319.296l51.2 24.512a922.048 922.048 0 0 1-74.432 165.12v518.848h-56.832V433.984a1052.672 1052.672 0 0 1-85.696 100.608z m664.704-137.344l-253.312 32a1080.704 1080.704 0 0 0 18.432 126.592 500.928 500.928 0 0 0 76.8 185.6c29.952 41.408 58.368 62.144 84.48 62.912 20.736-0.768 36.096-49.856 46.784-146.624L864 685.44a450.688 450.688 0 0 1-39.872 140.416 64 64 0 0 1-52.288 34.56 162.816 162.816 0 0 1-116.608-72.96A531.2 531.2 0 0 1 557.76 577.92a905.984 905.984 0 0 1-23.04-142.016l-166.4 21.504-8.512-52.928 170.432-22.336q-8.064-96.576-9.216-223.296h56.768q0 123.136 6.976 216.448l249.6-31.488zM780.288 281.28l-38.4 37.632a752.704 752.704 0 0 0-115.904-119.744l35.328-34.496A961.856 961.856 0 0 1 780.16 281.28z"  ></path></symbol><symbol id="qcw-business" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M533.12 176.576a1099.136 1099.136 0 0 0 336.192 253.312l-29.888 52.928a1058.944 1058.944 0 0 1-326.4-257.088 1072 1072 0 0 1-329.344 257.92l-29.184-52.992a1120 1120 0 0 0 338.496-254.08zM563.072 379.2V552h209.6v52.928h-209.6v188.864h264.832v53.696h-638.4v-53.696h115.904V489.856h54.528v303.936h147.2V379.264z"  ></path></symbol><symbol id="qcw-good" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M747.52 832H352a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32 96 96 0 0 0 96-96v-48a112.128 112.128 0 0 1 112-112 112.128 112.128 0 0 1 112 112v144h113.92a95.616 95.616 0 0 1 74.24 35.136 96 96 0 0 1 19.904 79.744l-38.4 192A96 96 0 0 1 747.52 832zM384 768h363.52a32 32 0 0 0 31.36-25.6l38.4-192a31.616 31.616 0 0 0-6.4-26.56 32 32 0 0 0-24.768-11.712h-145.92a32 32 0 0 1-32-32v-176a48.128 48.128 0 0 0-48-48 48.128 48.128 0 0 0-48 48v48a160 160 0 0 1-128 156.8z m-160 58.688a32 32 0 0 1-32-32v-320a32 32 0 0 1 32-32 32 32 0 0 1 32 32v320a32 32 0 0 1-32 32z"  ></path></symbol><symbol id="qcw-fast" viewBox="0 0 1024 1024"><path d="M896 1024H128A128 128 0 0 1 0 896V128A128 128 0 0 1 128 0h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128zM128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M736 448H554.688L640 192H416L288 576h155.392L352 896z"  ></path></symbol><symbol id="qcw-cross" viewBox="0 0 1024 1024"><path d="M896.128 1024h-768a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128z m-768-960a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z"  ></path><path d="M414.912 196.16v237.824h-71.36v122.88h78.976v50.624h-79.04v143.616c32-10.752 63.68-21.504 93.568-32v52.928a2502.4 2502.4 0 0 1-262.4 79.04l-15.296-51.2a227.52 227.52 0 0 1 31.424-6.848V513.6h49.088v267.136c18.496-4.608 35.328-9.216 52.224-13.824V433.984h-99.008V196.096z m-52.224 50.688h-117.44v137.344h117.44z m228.8 0.704a534.464 534.464 0 0 0 26.048-84.416l49.088 5.376a717.184 717.184 0 0 1-22.208 79.04h190.336v49.92H714.304a347.392 347.392 0 0 0 150.4 148.928l-23.808 48.384a449.408 449.408 0 0 1-107.456-86.016v38.4H549.184V409.6a450.56 450.56 0 0 1-112.064 88.256l-25.6-46.08a411.904 411.904 0 0 0 155.84-154.304H450.624v-49.92z m238.656 274.112v48.256h-243.2l-22.976 76.8h231.808a408.192 408.192 0 0 1-32 185.6 129.6 129.6 0 0 1-96.768 28.416 247.936 247.936 0 0 1-50.624-4.608l-17.664-46.784a410.944 410.944 0 0 0 57.6 4.608c34.496 0 56-6.912 64.448-19.2a300.8 300.8 0 0 0 17.728-99.776H499.328l32-125.184H451.52v-48.256z m-169.6-224H623.68a476.032 476.032 0 0 1-65.984 102.4h167.296a358.4 358.4 0 0 1-64.448-102.592z"  ></path></symbol><symbol id="qcw-style" viewBox="0 0 1024 1024"><path d="M240 0A240.32 240.32 0 0 0 0 240a240.32 240.32 0 0 0 240 240h208a32 32 0 0 0 32-32V240A240.256 240.256 0 0 0 240 0z m336 480h208a240.256 240.256 0 0 0 240-240A240.256 240.256 0 0 0 784 0a240.32 240.32 0 0 0-240 240v208a32 32 0 0 0 32 32z m32-240A176.256 176.256 0 0 1 784 64a176.192 176.192 0 0 1 176 176 176.128 176.128 0 0 1-176 176H608z m176 304H576a32 32 0 0 0-32 32v208a240.32 240.32 0 0 0 240 240 240.256 240.256 0 0 0 240-240 240.256 240.256 0 0 0-240-240z m-336 0H240A240.32 240.32 0 0 0 0 784a240.32 240.32 0 0 0 240 240 240.256 240.256 0 0 0 240-240V576a32 32 0 0 0-32-32z"  ></path></symbol><symbol id="qcw-qijiandian3" viewBox="0 0 1024 1024"><path d="M784 688H64V336h720c97.2 0 176 78.8 176 176s-78.8 176-176 176z" fill="#E1251B" ></path><path d="M359.19 577.12h7.51l2.62-24.98h-7.49l7.35-69.97h7.49l2.62-25h-7.49l1.05-9.99h-24.98l-1.05 9.99h-39.99l1.05-9.99h-25l-1.05 9.99h-7.49l-2.62 25h7.49l-7.35 69.97h-7.49l-2.62 24.98h32.37l-36.02 10.81-2.73 26.05 46.45-13.92 2.39-22.94h20l-2.41 22.94 43.52 13.92 2.75-26.05-33.75-10.81h24.87z m-58.31-63.29h39.99l-0.69 6.65h-39.99l0.69-6.65z m43.3-31.66l-0.69 6.65H303.5l0.71-6.65h39.97z m-46.62 63.31h39.88l-0.69 6.65h-39.88l0.69-6.65z m-58.99-128.3h27.48l-2.62 25h-45.01l-1.57 14.99h43.71l-16.29 154.94v0.11h-34.99l2.64-25.19h9.99l11.02-104.83h-18.71l-3.99 37.93a350.816 350.816 0 0 1-13.52 65.89l-8.04 26.11h-25.49l9.55-31.07a322.39 322.39 0 0 0 12.49-60.88l8.18-77.92h-9.97l2.64-25h27.48l1.05-9.99h25l-1.03 9.91z m69.55 0H386l-2.62 25H268.42l17.82-34.99h26.95l-5.07 9.99z m146.08 0h64.97l-8.92 84.97-2.62 25-8.94 84.95H473.7l8.92-84.95h-7.49l-4.73 44.96h-25l4.73-44.96h-7.49l-8.92 84.95h-25l8.94-84.95h-9.99l2.62-25h9.99l5.77-54.98h25l-5.79 54.98h7.51l4.73-44.98h24.98l-4.73 44.98h7.49l6.3-59.97h-64.97l3.67-34.99h25l-1.04 9.99z m86.3 129.96h-24.98l14.69-139.95h25L540.5 547.14z m61.02-104.96h-39.99l2.62-25h64.97l-13.64 129.96h-25l11.04-104.96zM589.3 587.02h25L611.68 612h-27.5c-10.98 0.23-20.06-8.47-20.3-19.45-0.02-1.01 0.04-2.03 0.17-3.03l2.1-20.49c-1.96 3.33-4.11 6.54-6.42 9.63L530.86 617l-19.29-13.92 28.61-38a74.26 74.26 0 0 0 14.69-36.69l6.44-61.34h24.98l-6.44 61.34a97.649 97.649 0 0 1-5.61 23.64h18.64l-3.58 34.99z m271.51-170.03l-2.62 25H703.25l2.62-25h47.48l1.05-9.99h25l-1.05 9.99h82.46z m-93.1 77.42h69.99l2.62-25h-69.99l2.37-22.42h-25l-2.35 22.42-2.62 25-2.37 22.54h-39.99l-9.97 94.97h107.45c20.01 1.5 37.82-12.64 40.89-32.47l6.57-62.49h-79.98l2.38-22.55z m46.06 85.04c-0.53 4.24-4.12 7.44-8.39 7.5H717.9l4.73-44.98h94.97l-3.83 37.48zM670.9 416.99h24.98l-10.18 96.92a225.428 225.428 0 0 1-14.34 58.42l-15.49 39.59h-25.99l18.18-46.46a199.238 199.238 0 0 0 12.6-51.56l10.24-96.91z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-erweima" viewBox="0 0 1024 1024"><path d="M320 416H192c-52.93 0-96-43.07-96-96V192c0-52.93 43.07-96 96-96h128c52.93 0 96 43.07 96 96v128c0 52.93-43.07 96-96 96zM192 160c-17.64 0-32 14.36-32 32v128c0 17.64 14.36 32 32 32h128c17.64 0 32-14.36 32-32V192c0-17.64-14.36-32-32-32H192zM320 928H192c-52.93 0-96-43.07-96-96V704c0-52.93 43.07-96 96-96h128c52.93 0 96 43.07 96 96v128c0 52.93-43.07 96-96 96zM192 672c-17.64 0-32 14.36-32 32v128c0 17.64 14.36 32 32 32h128c17.64 0 32-14.36 32-32V704c0-17.64-14.36-32-32-32H192zM832 416H704c-52.93 0-96-43.07-96-96V192c0-52.93 43.07-96 96-96h128c52.93 0 96 43.07 96 96v128c0 52.93-43.07 96-96 96zM704 160c-17.64 0-32 14.36-32 32v128c0 17.64 14.36 32 32 32h128c17.64 0 32-14.36 32-32V192c0-17.64-14.36-32-32-32H704zM512 384c-17.67 0-32-14.33-32-32V160c0-17.67 14.33-32 32-32s32 14.33 32 32v192c0 17.67-14.33 32-32 32zM352 544H160c-17.67 0-32-14.33-32-32s14.33-32 32-32h192c17.67 0 32 14.33 32 32s-14.33 32-32 32zM896 608c-17.67 0-32-14.33-32-32 0-17.64-14.36-32-32-32H576c-17.64 0-32 14.36-32 32 0 17.67-14.33 32-32 32s-32-14.33-32-32c0-52.93 43.07-96 96-96h256c52.93 0 96 43.07 96 96 0 17.67-14.33 32-32 32zM832 928H576c-52.93 0-96-43.07-96-96 0-17.67 14.33-32 32-32s32 14.33 32 32c0 17.64 14.36 32 32 32h256c17.64 0 32-14.36 32-32 0-17.67 14.33-32 32-32s32 14.33 32 32c0 52.93-43.07 96-96 96zM896 736H512c-17.67 0-32-14.33-32-32s14.33-32 32-32h384c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-qijiandian1" viewBox="0 0 1024 1024"><path d="M784 688H64V336h720c97.2 0 176 78.8 176 176s-78.8 176-176 176z" fill="#FFD1A6" ></path><path d="M359.19 577.12h7.51l2.62-24.98h-7.49l7.35-69.97h7.49l2.62-25h-7.49l1.05-9.99h-24.98l-1.05 9.99h-39.99l1.05-9.99h-25l-1.05 9.99h-7.49l-2.62 25h7.49l-7.35 69.97h-7.49l-2.62 24.98h32.37l-36.02 10.81-2.73 26.05 46.45-13.92 2.39-22.94h20l-2.41 22.94 43.52 13.92 2.75-26.05-33.75-10.81h24.87z m-58.31-63.29h39.99l-0.69 6.65h-39.99l0.69-6.65z m43.3-31.66l-0.69 6.65H303.5l0.71-6.65h39.97z m-46.62 63.31h39.88l-0.69 6.65h-39.88l0.69-6.65z m-58.99-128.3h27.48l-2.62 25h-45.01l-1.57 14.99h43.71l-16.29 154.94v0.11h-34.99l2.64-25.19h9.99l11.02-104.83h-18.71l-3.99 37.93a350.816 350.816 0 0 1-13.52 65.89l-8.04 26.11h-25.49l9.55-31.07a322.39 322.39 0 0 0 12.49-60.88l8.18-77.92h-9.97l2.64-25h27.48l1.05-9.99h25l-1.03 9.91z m69.55 0H386l-2.62 25H268.42l17.82-34.99h26.95l-5.07 9.99z m146.08 0h64.97l-8.92 84.97-2.62 25-8.94 84.95H473.7l8.92-84.95h-7.49l-4.73 44.96h-25l4.73-44.96h-7.49l-8.92 84.95h-25l8.94-84.95h-9.99l2.62-25h9.99l5.77-54.98h25l-5.79 54.98h7.51l4.73-44.98h24.98l-4.73 44.98h7.49l6.3-59.97h-64.97l3.67-34.99h25l-1.04 9.99z m86.3 129.96h-24.98l14.69-139.95h25L540.5 547.14z m61.02-104.96h-39.99l2.62-25h64.97l-13.64 129.96h-25l11.04-104.96zM589.3 587.02h25L611.68 612h-27.5c-10.98 0.23-20.06-8.47-20.3-19.45-0.02-1.01 0.04-2.03 0.17-3.03l2.1-20.49c-1.96 3.33-4.11 6.54-6.42 9.63L530.86 617l-19.29-13.92 28.61-38a74.26 74.26 0 0 0 14.69-36.69l6.44-61.34h24.98l-6.44 61.34a97.649 97.649 0 0 1-5.61 23.64h18.64l-3.58 34.99z m271.51-170.03l-2.62 25H703.25l2.62-25h47.48l1.05-9.99h25l-1.05 9.99h82.46z m-93.1 77.42h69.99l2.62-25h-69.99l2.37-22.42h-25l-2.35 22.42-2.62 25-2.37 22.54h-39.99l-9.97 94.97h107.45c20.01 1.5 37.82-12.64 40.89-32.47l6.57-62.49h-79.98l2.38-22.55z m46.06 85.04c-0.53 4.24-4.12 7.44-8.39 7.5H717.9l4.73-44.98h94.97l-3.83 37.48zM670.9 416.99h24.98l-10.18 96.92a225.428 225.428 0 0 1-14.34 58.42l-15.49 39.59h-25.99l18.18-46.46a199.238 199.238 0 0 0 12.6-51.56l10.24-96.91z" fill="#47291C" ></path></symbol><symbol id="qcw-qijiandian2" viewBox="0 0 1024 1024"><path d="M784 688H240c-97.2 0-176-78.8-176-176s78.8-176 176-176h544c97.2 0 176 78.8 176 176s-78.8 176-176 176z" fill="#FFD1A6" ></path><path d="M359.19 577.12h7.51l2.62-24.98h-7.49l7.35-69.97h7.49l2.62-25h-7.49l1.05-9.99h-24.98l-1.05 9.99h-39.99l1.05-9.99h-25l-1.05 9.99h-7.49l-2.62 25h7.49l-7.35 69.97h-7.49l-2.62 24.98h32.37l-36.02 10.81-2.73 26.05 46.45-13.92 2.39-22.94h20l-2.41 22.94 43.52 13.92 2.75-26.05-33.75-10.81h24.87z m-58.31-63.29h39.99l-0.69 6.65h-39.99l0.69-6.65z m43.3-31.66l-0.69 6.65H303.5l0.71-6.65h39.97z m-46.62 63.31h39.88l-0.69 6.65h-39.88l0.69-6.65z m-58.99-128.3h27.48l-2.62 25h-45.01l-1.57 14.99h43.71l-16.29 154.94v0.11h-34.99l2.64-25.19h9.99l11.02-104.83h-18.71l-3.99 37.93a350.816 350.816 0 0 1-13.52 65.89l-8.04 26.11h-25.49l9.55-31.07a322.39 322.39 0 0 0 12.49-60.88l8.18-77.92h-9.97l2.64-25h27.48l1.05-9.99h25l-1.03 9.91z m69.55 0H386l-2.62 25H268.42l17.82-34.99h26.95l-5.07 9.99z m146.08 0h64.97l-8.92 84.97-2.62 25-8.94 84.95H473.7l8.92-84.95h-7.49l-4.73 44.96h-25l4.73-44.96h-7.49l-8.92 84.95h-25l8.94-84.95h-9.99l2.62-25h9.99l5.77-54.98h25l-5.79 54.98h7.51l4.73-44.98h24.98l-4.73 44.98h7.49l6.3-59.97h-64.97l3.67-34.99h25l-1.04 9.99z m86.3 129.96h-24.98l14.69-139.95h25L540.5 547.14z m61.02-104.96h-39.99l2.62-25h64.97l-13.64 129.96h-25l11.04-104.96zM589.3 587.02h25L611.68 612h-27.5c-10.98 0.23-20.06-8.47-20.3-19.45-0.02-1.01 0.04-2.03 0.17-3.03l2.1-20.49c-1.96 3.33-4.11 6.54-6.42 9.63L530.86 617l-19.29-13.92 28.61-38a74.26 74.26 0 0 0 14.69-36.69l6.44-61.34h24.98l-6.44 61.34a97.649 97.649 0 0 1-5.61 23.64h18.64l-3.58 34.99z m271.51-170.03l-2.62 25H703.25l2.62-25h47.48l1.05-9.99h25l-1.05 9.99h82.46z m-93.1 77.42h69.99l2.62-25h-69.99l2.37-22.42h-25l-2.35 22.42-2.62 25-2.37 22.54h-39.99l-9.97 94.97h107.45c20.01 1.5 37.82-12.64 40.89-32.47l6.57-62.49h-79.98l2.38-22.55z m46.06 85.04c-0.53 4.24-4.12 7.44-8.39 7.5H717.9l4.73-44.98h94.97l-3.83 37.48zM670.9 416.99h24.98l-10.18 96.92a225.428 225.428 0 0 1-14.34 58.42l-15.49 39.59h-25.99l18.18-46.46a199.238 199.238 0 0 0 12.6-51.56l10.24-96.91z" fill="#47291C" ></path></symbol><symbol id="qcw-QCW-02-77" viewBox="0 0 1024 1024"><path d="M784 688H64V512c0-97.2 78.8-176 176-176h544c97.2 0 176 78.8 176 176s-78.8 176-176 176z" fill="#E1251B" ></path><path d="M359.19 577.12h7.51l2.62-24.98h-7.49l7.35-69.97h7.49l2.62-25h-7.49l1.05-9.99h-24.98l-1.05 9.99h-39.99l1.05-9.99h-25l-1.05 9.99h-7.49l-2.62 25h7.49l-7.35 69.97h-7.49l-2.62 24.98h32.37l-36.02 10.81-2.73 26.05 46.45-13.92 2.39-22.94h20l-2.41 22.94 43.52 13.92 2.75-26.05-33.75-10.81h24.87z m-58.31-63.29h39.99l-0.69 6.65h-39.99l0.69-6.65z m43.3-31.66l-0.69 6.65H303.5l0.71-6.65h39.97z m-46.62 63.31h39.88l-0.69 6.65h-39.88l0.69-6.65z m-58.99-128.3h27.48l-2.62 25h-45.01l-1.57 14.99h43.71l-16.29 154.94v0.11h-34.99l2.64-25.19h9.99l11.02-104.83h-18.71l-3.99 37.93a350.816 350.816 0 0 1-13.52 65.89l-8.04 26.11h-25.49l9.55-31.07a322.39 322.39 0 0 0 12.49-60.88l8.18-77.92h-9.97l2.64-25h27.48l1.05-9.99h25l-1.03 9.91z m69.55 0H386l-2.62 25H268.42l17.82-34.99h26.95l-5.07 9.99z m146.08 0h64.97l-8.92 84.97-2.62 25-8.94 84.95H473.7l8.92-84.95h-7.49l-4.73 44.96h-25l4.73-44.96h-7.49l-8.92 84.95h-25l8.94-84.95h-9.99l2.62-25h9.99l5.77-54.98h25l-5.79 54.98h7.51l4.73-44.98h24.98l-4.73 44.98h7.49l6.3-59.97h-64.97l3.67-34.99h25l-1.04 9.99z m86.3 129.96h-24.98l14.69-139.95h25L540.5 547.14z m61.02-104.96h-39.99l2.62-25h64.97l-13.64 129.96h-25l11.04-104.96zM589.3 587.02h25L611.68 612h-27.5c-10.98 0.23-20.06-8.47-20.3-19.45-0.02-1.01 0.04-2.03 0.17-3.03l2.1-20.49c-1.96 3.33-4.11 6.54-6.42 9.63L530.86 617l-19.29-13.92 28.61-38a74.26 74.26 0 0 0 14.69-36.69l6.44-61.34h24.98l-6.44 61.34a97.649 97.649 0 0 1-5.61 23.64h18.64l-3.58 34.99z m271.51-170.03l-2.62 25H703.25l2.62-25h47.48l1.05-9.99h25l-1.05 9.99h82.46z m-93.1 77.42h69.99l2.62-25h-69.99l2.37-22.42h-25l-2.35 22.42-2.62 25-2.37 22.54h-39.99l-9.97 94.97h107.45c20.01 1.5 37.82-12.64 40.89-32.47l6.57-62.49h-79.98l2.38-22.55z m46.06 85.04c-0.53 4.24-4.12 7.44-8.39 7.5H717.9l4.73-44.98h94.97l-3.83 37.48zM670.9 416.99h24.98l-10.18 96.92a225.428 225.428 0 0 1-14.34 58.42l-15.49 39.59h-25.99l18.18-46.46a199.238 199.238 0 0 0 12.6-51.56l10.24-96.91z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-QCW-02-59" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512s11.85-119.14 35.22-174.39c22.57-53.35 54.86-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.53 64 512 64s119.14 11.85 174.39 35.22c53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512s-11.85 119.14-35.22 174.39c-22.57 53.35-54.86 101.26-96 142.39-41.13 41.13-89.04 73.43-142.39 96C631.14 948.15 572.47 960 512 960z m0-832c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512s39.94 199 112.47 271.53C313 856.06 409.43 896 512 896s199-39.94 271.53-112.47C856.06 711 896 614.57 896 512s-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128z"  ></path><path d="M512 608c-17.67 0-32-14.33-32-32 0-43.64 23.67-83.24 61.79-103.33 21.44-11.3 34.55-33.37 34.21-57.59-0.48-34.3-28.77-62.59-63.07-63.07-17.31-0.27-33.57 6.3-45.86 18.42C454.77 382.55 448 398.74 448 416c0 17.67-14.33 32-32 32s-32-14.33-32-32c0-34.53 13.54-66.9 38.13-91.14 24.58-24.24 57.14-37.32 91.69-36.85 33.39 0.46 64.86 13.8 88.61 37.56 23.76 23.76 37.1 55.23 37.56 88.61 0.67 48.41-25.52 92.51-68.35 115.09-17.05 9-27.64 26.9-27.64 46.73 0 17.67-14.33 32-32 32zM464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"  ></path></symbol><symbol id="qcw-dengdai" viewBox="0 0 1024 1024"><path d="M768.0512 672h31.9488a128 128 0 0 0 128-128v-128A32 32 0 0 0 896 384h-64a96.1024 96.1024 0 0 0-96-96H448a32 32 0 0 0-32 32 32 32 0 0 0 32 32h288A32.0512 32.0512 0 0 1 768 384v96a254.3616 254.3616 0 0 1-74.9568 181.0432A254.3616 254.3616 0 0 1 512 736a254.3616 254.3616 0 0 1-181.0432-74.9568A254.3104 254.3104 0 0 1 256 480V384a32.0512 32.0512 0 0 1 32-32h32a32 32 0 0 0 32-32 32 32 0 0 0-32-32h-32A96.1024 96.1024 0 0 0 192 384v96a317.9008 317.9008 0 0 0 93.696 226.2528 325.0176 325.0176 0 0 0 34.2016 29.7472H127.9488a32 32 0 0 0-32 32 160.2048 160.2048 0 0 0 160 160h512A160.2048 160.2048 0 0 0 927.9488 768a32 32 0 0 0-32-32H704a323.2256 323.2256 0 0 0 34.2016-29.7472 325.1712 325.1712 0 0 0 29.8496-34.2528z m90.4704 128A96.1536 96.1536 0 0 1 768 864H256a96.1536 96.1536 0 0 1-90.5216-64z m5.4784-352v96a64.1024 64.1024 0 0 1-58.4192 63.744 319.2832 319.2832 0 0 0 26.4192-127.744V448zM320 224V128a32 32 0 0 1 32-32 32 32 0 0 1 32 32v96A32 32 0 0 1 352 256a32 32 0 0 1-32-32z m320 0V128a32 32 0 0 1 32-32 32 32 0 0 1 32 32v96a32 32 0 0 1-32 32 32 32 0 0 1-32-32zM480 192V96A32 32 0 0 1 512 64a32 32 0 0 1 32 32V192a32 32 0 0 1-32 32 32 32 0 0 1-32-32z"  ></path></symbol><symbol id="qcw-shibai" viewBox="0 0 1024 1024"><path d="M512 960a448 448 0 1 1 0-896 448.227556 448.227556 0 0 1 413.866667 619.491556 32 32 0 0 1-59.107556-24.519112 384.227556 384.227556 0 1 0-121.799111 158.236445 96.113778 96.113778 0 0 1 125.952 8.533333l47.616 47.616a32 32 0 1 1-45.255111 45.255111l-47.616-47.616a31.914667 31.914667 0 0 0-41.813333-2.844444A446.179556 446.179556 0 0 1 512 960z m154.339556-237.767111a32 32 0 0 0-8.021334-44.544 256.796444 256.796444 0 0 0-292.522666 0 32 32 0 1 0 36.522666 52.565333 192.796444 192.796444 0 0 1 219.477334 0 32 32 0 0 0 44.544-8.021333z"  ></path></symbol><symbol id="qcw-guanbi" viewBox="0 0 1024 1024"><path d="M566.528 514.474667l138.026667-138.026667a32.170667 32.170667 0 0 0-45.482667-45.482667l-138.026667 138.026667-138.026666-138.026667a32.170667 32.170667 0 1 0-45.482667 45.482667l138.026667 138.026667-138.026667 138.026666a32.170667 32.170667 0 0 0 45.482667 45.482667l138.026666-138.026667 138.026667 138.026667a32.170667 32.170667 0 0 0 45.482667-45.482667z"  ></path></symbol><symbol id="qcw-xiangxixinxi" viewBox="0 0 1024 1024"><path d="M512 960a446.72 446.72 0 1 1 174.421333-35.242667A445.184 445.184 0 0 1 512 960zM512 128a384 384 0 1 0 271.530667 112.469333A381.525333 381.525333 0 0 0 512 128z"  ></path><path d="M512.085333 688.042667m-48.042666 0a48.042667 48.042667 0 1 0 96.085333 0 48.042667 48.042667 0 1 0-96.085333 0Z"  ></path><path d="M512 608a33.621333 33.621333 0 0 1-33.621333-32l-12.032-240.128a45.653333 45.653333 0 0 1 45.568-47.957333 45.653333 45.653333 0 0 1 45.568 47.957333L545.450667 576A33.621333 33.621333 0 0 1 512 608z"  ></path></symbol><symbol id="qcw-yijianpuhuo" viewBox="0 0 1024 1024"><path d="M704 800h-512a96.128 96.128 0 0 1-96-96v-160a32 32 0 0 1 64 0v160a32.042667 32.042667 0 0 0 32 32h512a32.042667 32.042667 0 0 0 32-32v-512a32.042667 32.042667 0 0 0-32-32h-160a32 32 0 0 1 0-64h160a96.128 96.128 0 0 1 96 96v512a96.128 96.128 0 0 1-96 96zM896 224a32 32 0 0 0-32 32v448a160.170667 160.170667 0 0 1-160 160H256a32 32 0 0 0 0 64h448a224 224 0 0 0 224-224V256a32 32 0 0 0-32-32zM128 320h128v128a32 32 0 0 0 64 0v-128h128a32 32 0 0 0 0-64h-128V128A32 32 0 0 0 256 128v128H128a32 32 0 0 0 0 64z"  ></path></symbol><symbol id="qcw-xiaoxi" viewBox="0 0 1024 1024"><path d="M768 613.504V352a256 256 0 0 0-256-256 256 256 0 0 0-256 256v261.504a64 64 0 0 1-18.730667 45.269333l-54.613333 54.613334a32 32 0 0 0 22.613333 54.613333H818.773333a32 32 0 0 0 22.613334-54.613333l-54.613334-54.613334a64 64 0 0 1-18.773333-45.269333z"  ></path><path d="M640 800a128 128 0 0 1-128 128 128 128 0 0 1-128-128"  ></path></symbol><symbol id="qcw-a-zu6106" viewBox="0 0 1024 1024"><path d="M64 448V128a32 32 0 0 1 32-32H320a32 32 0 0 1 0 64H128V256h160a32 32 0 0 1 0 64H128v96h192a32 32 0 0 1 0 64H96A32 32 0 0 1 64 448z m558.464 442.112l-140.8-88.064a32 32 0 0 0-33.92 54.272l63.552 39.744a384.384 384.384 0 0 1-378.688-324.992 32 32 0 0 0-63.232 9.92 447.552 447.552 0 0 0 543.424 367.424 32 32 0 0 0 9.728-58.304zM401.536 133.76l140.8 88.064a32 32 0 0 0 33.92-54.272l-63.552-39.744a384.384 384.384 0 0 1 378.688 325.12 32 32 0 0 0 63.232-9.856 447.68 447.68 0 0 0-543.424-367.616 32 32 0 0 0-9.728 58.304zM960 607.04V768a32 32 0 0 1-32 32h-128V896a32 32 0 0 1-64 0v-96h-128A32 32 0 0 1 576 768V607.04a32 32 0 0 1 32-32h128V512a32 32 0 0 1 64 0v62.976h128a32 32 0 0 1 32 32.064zM736 736V639.04H640V736zM896 639.04h-96V736H896z"  ></path></symbol><symbol id="qcw-a-zu41" viewBox="0 0 1024 1024"><path d="M416.4352 960.0256a32 32 0 0 1-31.4368-37.888l52.8896-282.112h-207.36a64 64 0 0 1-48.1536-106.1376L583.936 74.9568a32 32 0 0 1 55.5264 26.9568l-52.9152 282.112h207.36a64 64 0 0 1 48.1536 106.1376l-205.568 234.9312a32 32 0 1 1-48.1536-42.1376l205.5936-234.9312h-245.9392a32 32 0 0 1-31.4624-37.888l38.4-204.8-324.4288 370.688h245.9392a32 32 0 0 1 31.4624 37.888l-38.4 204.8 34.8928-39.8592a32 32 0 0 1 48.1536 42.1376l-112 128a32 32 0 0 1-24.1152 11.0336zM230.272 576.2304z m563.7376-128.4096z"  ></path></symbol><symbol id="qcw-a-zu47" viewBox="0 0 1024 1024"><path d="M544 544v64h128a32 32 0 0 1 0 64h-128v64a32 32 0 0 1-64 0v-64h-128a32 32 0 0 1 0-64h128v-64h-128a32 32 0 0 1 0-64h320a32 32 0 0 1 0 64z m327.0144 281.7792a96.128 96.128 0 0 0-125.952-8.5504 383.2064 383.2064 0 1 1 121.8048-158.2336 32 32 0 0 0 59.1104 24.5248A447.872 447.872 0 0 0 512 64a448 448 0 1 0 271.9488 804.0448 31.9232 31.9232 0 0 1 41.8304 2.9696l47.616 47.616a32 32 0 1 0 45.2608-45.2608zM512 452.48a95.3856 95.3856 0 0 0 67.8912-28.16l82.7392-82.7392a32 32 0 1 0-45.2608-45.2608l-82.7392 82.7392a32 32 0 0 1-45.2608 0l-82.7392-82.7392a32 32 0 0 0-45.2608 45.2608l82.7392 82.7392a95.3856 95.3856 0 0 0 67.8912 28.16z"  ></path></symbol><symbol id="qcw-a-zu46" viewBox="0 0 1024 1024"><path d="M441.088 954.5472a445.44 445.44 0 0 1-166.5536-62.5408 32.0256 32.0256 0 0 1-10.24-44.1088 32 32 0 0 1 44.1088-10.24 381.44 381.44 0 0 0 289.8432 48.512 381.44 381.44 0 0 0 239.2832-170.6752A381.44 381.44 0 0 0 896 512.7424l-39.7056 63.5648a32.0256 32.0256 0 0 1-44.1088 10.24 32.0512 32.0512 0 0 1-10.24-44.1088l88.064-140.8a32.0256 32.0256 0 0 1 32.4352-14.6176 32.0256 32.0256 0 0 1 25.9072 24.3456 446.208 446.208 0 0 1 5.9392 171.52 444.2368 444.2368 0 0 1-62.5408 166.5536 444.7232 444.7232 0 0 1-122.24 129.2288 446.6432 446.6432 0 0 1-156.9024 69.9136 449.1264 449.1264 0 0 1-100.992 11.5712 446.8736 446.8736 0 0 1-70.528-5.6064z m-339.6608-317.44a31.9744 31.9744 0 0 1-25.9072-24.3456 446.208 446.208 0 0 1-5.9648-171.52A445.0816 445.0816 0 0 1 132.096 274.688a444.7744 444.7744 0 0 1 122.2656-129.2288 446.4384 446.4384 0 0 1 156.8512-69.9136 447.2576 447.2576 0 0 1 171.52-5.9392 445.1328 445.1328 0 0 1 166.528 62.5408 31.9744 31.9744 0 0 1 10.24 44.1088 31.9744 31.9744 0 0 1-44.0832 10.24 381.5936 381.5936 0 0 0-289.8944-48.4864 381.44 381.44 0 0 0-239.2832 170.6752 381.44 381.44 0 0 0-58.4704 202.752l39.7312-63.5648a31.9744 31.9744 0 0 1 44.0832-10.24 31.9488 31.9488 0 0 1 10.24 44.0832l-88.0384 140.8a32.0256 32.0256 0 0 1-27.136 15.0528 31.4624 31.4624 0 0 1-5.1968-0.4864z"  ></path></symbol><symbol id="qcw-star" viewBox="0 0 1024 1024"><path d="M747.392 941.376a67.2 67.2 0 0 1-31.36-7.808L512 826.304l-204.032 107.328a67.2 67.2 0 0 1-97.536-70.848l38.976-227.264-165.12-160.896a67.2 67.2 0 0 1 37.248-114.624l228.16-33.152 102.016-206.72a67.2 67.2 0 0 1 120.512 0l102.016 206.72 228.16 33.152a67.2 67.2 0 0 1 37.248 114.624L774.4 635.52l38.976 227.264a67.328 67.328 0 0 1-66.176 78.592z" fill="#FF5500" ></path></symbol><symbol id="qcw-QCW-02-60" viewBox="0 0 1024 1024"><path d="M832 737H192c-52.93 0-96-43.07-96-96V192c0-52.93 43.07-96 96-96h640c52.93 0 96 43.07 96 96v449c0 52.93-43.07 96-96 96zM192 160c-17.64 0-32 14.36-32 32v449c0 17.64 14.36 32 32 32h640c17.64 0 32-14.36 32-32V192c0-17.64-14.36-32-32-32H192zM736 928H288c-10.29 0-19.95-4.94-25.96-13.29s-7.65-19.07-4.4-28.83l32-96c5.59-16.77 23.71-25.83 40.48-20.24 16.77 5.59 25.83 23.71 20.24 40.48L332.4 864h359.2l-17.96-53.88c-5.59-16.77 3.47-34.89 20.24-40.48 16.76-5.59 34.89 3.47 40.48 20.24l32 96c3.25 9.76 1.62 20.49-4.4 28.83S746.29 928 736 928z"  ></path><path d="M448 544c-8.19 0-16.38-3.12-22.63-9.37L320 429.25l-41.37 41.37c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25l64-64c12.5-12.5 32.76-12.5 45.25 0L448 466.75l201.37-201.37c12.5-12.5 32.76-12.5 45.25 0l96 96c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0L672 333.25 470.63 534.63c-6.25 6.25-14.44 9.37-22.63 9.37z"  ></path></symbol><symbol id="qcw-QCW-02-561" viewBox="0 0 1024 1024"><path d="M832 928H192c-52.93 0-96-43.07-96-96V192c0-52.93 43.07-96 96-96h480c52.93 0 96 43.07 96 96h64c52.93 0 96 43.07 96 96v544c0 52.93-43.07 96-96 96zM192 160c-17.64 0-32 14.36-32 32v640c0 17.64 14.36 32 32 32h640c17.64 0 32-14.36 32-32V288c0-17.64-14.36-32-32-32h-64v512c0 17.67-14.33 32-32 32s-32-14.33-32-32V192c0-17.64-14.36-32-32-32H192z"  ></path><path d="M608 448H256c-17.67 0-32-14.33-32-32V288c0-17.67 14.33-32 32-32h352c17.67 0 32 14.33 32 32v128c0 17.67-14.33 32-32 32z m-320-64h288v-64H288v64zM608 608H256c-17.67 0-32-14.33-32-32s14.33-32 32-32h352c17.67 0 32 14.33 32 32s-14.33 32-32 32zM608 768H256c-17.67 0-32-14.33-32-32s14.33-32 32-32h352c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-95" viewBox="0 0 1024 1024"><path d="M512 942.42c-26.23 0-52.45-6.49-76.36-19.48l-255-138.48A159.874 159.874 0 0 1 97 643.86V380.14c0-58.71 32.05-112.58 83.64-140.6l255-138.49c47.81-25.97 104.9-25.97 152.72 0l255 138.48A159.874 159.874 0 0 1 927 380.13v263.71c0 58.71-32.05 112.58-83.64 140.6l-255 138.49c-23.9 13-50.14 19.49-76.36 19.49z m0-796.81c-15.74 0-31.47 3.89-45.82 11.68l-255 138.49A95.933 95.933 0 0 0 161 380.14v263.71c0 35.23 19.23 67.55 50.18 84.36l255 138.49c28.69 15.58 62.94 15.58 91.63 0l255-138.49a95.914 95.914 0 0 0 50.18-84.36V380.14c0-35.23-19.23-67.55-50.18-84.36l-255-138.49c-14.34-7.78-30.07-11.68-45.81-11.68z"  ></path><path d="M512 544c-5.25 0-10.51-1.29-15.27-3.88l-224-121.65c-15.53-8.43-21.28-27.86-12.85-43.39 8.43-15.53 27.86-21.28 43.39-12.85L512 475.59l208.73-113.36c15.53-8.44 34.96-2.68 43.39 12.85s2.68 34.96-12.85 43.39l-224 121.65A31.942 31.942 0 0 1 512 544z"  ></path><path d="M512 768c-17.67 0-32-14.33-32-32V512c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-24" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.86-101.26 96-142.39s89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.33-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.92-29.01 92.07-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.99-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M352.06 704.06c-8.38 0-16.55-3.3-22.63-9.37a32.012 32.012 0 0 1-8.42-30.39l54.69-218.75c8.62-34.47 35.38-61.23 69.85-69.85l218.75-54.69c10.91-2.73 22.44 0.47 30.39 8.42s11.14 19.48 8.42 30.39l-54.69 218.75c-8.62 34.47-35.38 61.23-69.85 69.85L359.82 703.1c-2.57 0.65-5.17 0.96-7.76 0.96z m276.02-308.02l-167.01 41.75a31.924 31.924 0 0 0-23.28 23.28l-41.75 167.01 167-41.75a31.924 31.924 0 0 0 23.28-23.28l41.76-167.01z"  ></path></symbol><symbol id="qcw-QCW-02-94" viewBox="0 0 1024 1024"><path d="M713.29 928.01c-25.17 0-50.27-4.33-74.27-12.92C532.66 877 419.73 801.66 321.03 702.97c-98.7-98.7-174.03-211.63-212.12-317.99-14.07-39.28-16.71-81.54-7.63-122.21 9.09-40.73 29.49-77.85 58.98-107.34L192 123.68C209.85 105.83 233.59 96 258.83 96c25.25 0 48.98 9.83 66.83 27.68l110.51 110.51c36.85 36.85 36.85 96.81 0 133.66l-25.56 25.55c-11.67 11.67-18.09 27.18-18.09 43.68s6.43 32.01 18.09 43.68l132.95 132.95c23.96 23.96 63.05 24.06 87.13 0.22l26.25-25.98c36.85-36.48 96.66-36.33 133.32 0.34L900.3 698.33c17.85 17.85 27.68 41.58 27.68 66.83s-9.83 48.98-27.68 66.83l-31.74 31.74c-29.49 29.49-66.61 49.89-107.34 58.98-15.81 3.54-31.89 5.3-47.93 5.3z m-454.46-768c-7.81 0-15.63 2.97-21.58 8.92l-31.74 31.74c-20.89 20.89-35.33 47.18-41.77 76.03-6.44 28.84-4.56 58.82 5.42 86.69 34.97 97.64 104.97 202.17 197.12 294.32s196.67 162.15 294.31 197.12c27.87 9.98 57.85 11.85 86.69 5.42 28.85-6.44 55.14-20.88 76.03-41.77l31.74-31.74c5.76-5.76 8.94-13.43 8.94-21.58s-3.17-15.81-8.94-21.58L745.02 633.54c-11.84-11.84-31.15-11.88-43.04-0.11l-26.25 25.98c-23.71 23.47-55.12 36.39-88.47 36.39h-0.33c-33.47-0.08-64.94-13.17-88.61-36.84L365.37 526.02c-23.75-23.75-36.84-55.34-36.84-88.93s13.08-65.18 36.84-88.93l25.56-25.56c11.9-11.9 11.9-31.25 0-43.15L280.41 168.94c-5.95-5.95-13.76-8.93-21.58-8.93z"  ></path></symbol><symbol id="qcw-QCW-02-02a" viewBox="0 0 1024 1024"><path d="M720 160c38.46 0 74.63 14.98 101.82 42.18C849.02 229.37 864 265.54 864 304v416c0 38.46-14.98 74.63-42.18 101.82C794.63 849.02 758.46 864 720 864H304c-38.46 0-74.63-14.98-101.82-42.18C174.98 794.63 160 758.46 160 720V304c0-38.46 14.98-74.63 42.18-101.82C229.37 174.98 265.54 160 304 160h416m0-64H304C189.12 96 96 189.12 96 304v416c0 114.88 93.12 208 208 208h416c114.88 0 208-93.12 208-208V304c0-114.88-93.12-208-208-208z"  ></path><path d="M608 672H416c-35.35 0-64-28.65-64-64V416c0-35.35 28.65-64 64-64h192c35.35 0 64 28.65 64 64v192c0 35.35-28.65 64-64 64z"  ></path></symbol><symbol id="qcw-QCW-02-01a" viewBox="0 0 1024 1024"><path d="M720 160c38.46 0 74.63 14.98 101.82 42.18C849.02 229.37 864 265.54 864 304v416c0 38.46-14.98 74.63-42.18 101.82C794.63 849.02 758.46 864 720 864H304c-38.46 0-74.63-14.98-101.82-42.18C174.98 794.63 160 758.46 160 720V304c0-38.46 14.98-74.63 42.18-101.82C229.37 174.98 265.54 160 304 160h416m0-64H304C189.12 96 96 189.12 96 304v416c0 114.88 93.12 208 208 208h416c114.88 0 208-93.12 208-208V304c0-114.88-93.12-208-208-208z"  ></path></symbol><symbol id="qcw-QCW-01-48" viewBox="0 0 1024 1024"><path d="M710.72 960H313.28c-48.99 0-90-36.71-95.41-85.4L160.2 355.53c-1.95-17.56 10.71-33.39 28.27-35.34 17.59-1.95 33.39 10.71 35.34 28.27l57.67 519.07c1.8 16.23 15.48 28.47 31.8 28.47h397.43c16.33 0 30-12.24 31.8-28.47l57.67-519.07c1.95-17.56 17.75-30.23 35.34-28.27 17.56 1.95 30.22 17.77 28.27 35.34L806.13 874.6c-5.41 48.69-46.43 85.4-95.41 85.4zM896 256H736c-52.93 0-96-43.07-96-96 0-17.65-14.36-32-32-32H416c-17.64 0-32 14.35-32 32 0 52.93-43.07 96-96 96H128c-17.67 0-32-14.33-32-32s14.33-32 32-32h160c17.64 0 32-14.35 32-32 0-52.93 43.07-96 96-96h192c52.93 0 96 43.07 96 96 0 17.65 14.36 32 32 32h160c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M416 768c-17.67 0-32-14.33-32-32V448c0-17.67 14.33-32 32-32s32 14.33 32 32v288c0 17.67-14.33 32-32 32zM608 768c-17.67 0-32-14.33-32-32V448c0-17.67 14.33-32 32-32s32 14.33 32 32v288c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-66" viewBox="0 0 1024 1024"><path d="M768 960H256c-52.93 0-96-43.07-96-96V544c0-17.67 14.33-32 32-32s32 14.33 32 32v320c0 17.64 14.36 32 32 32h512c17.64 0 32-14.36 32-32V544c0-17.67 14.33-32 32-32s32 14.33 32 32v320c0 52.93-43.07 96-96 96z"  ></path><path d="M927.53 512.47c-8.19 0-16.38-3.12-22.63-9.37L534.63 132.83c-6.04-6.04-14.08-9.37-22.63-9.37s-16.58 3.33-22.63 9.37L119.1 503.1c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25L444.12 87.57c18.13-18.13 42.24-28.12 67.88-28.12s49.75 9.99 67.88 28.12l370.27 370.27c12.5 12.5 12.5 32.76 0 45.25-6.24 6.26-14.43 9.38-22.62 9.38zM672 597.33H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM672 714.67H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M608 832H416c-52.93 0-96-43.07-96-96V511.02c0-42.74 16.64-82.92 46.86-113.14l90.51-90.51c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L439.25 416H608c52.93 0 96 43.07 96 96v224c0 52.93-43.07 96-96 96zM384 512v224c0 17.64 14.36 32 32 32h192c17.64 0 32-14.36 32-32V512c0-17.64-14.36-32-32-32H416c-17.64 0-32 14.36-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-12" viewBox="0 0 1024 1024"><path d="M920.05 801.05L568.08 161.1c-24.31-44.21-87.85-44.21-112.16 0L103.95 801.05c-23.59 42.89 8.14 94.89 57.89 94.89h700.32c49.75 0 81.48-52 57.89-94.89zM544 768c0 17.67-14.33 32-32 32s-32-14.33-32-32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64z m0-192c0 17.67-14.33 32-32 32s-32-14.33-32-32V352c0-17.67 14.33-32 32-32s32 14.33 32 32v224z"  ></path></symbol><symbol id="qcw-QCW-01-99" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.87-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96s73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.32-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.93-29.01 92.07-25.33 125.96 8.55l47.61 47.61c12.5 12.5 12.5 32.76 0 45.26s-32.76 12.5-45.26 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.97-38.23 29.24-80.59 51.98-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M640.03 736.06c-6.32 0-12.7-1.87-18.28-5.76-32.27-22.51-70.2-34.41-109.69-34.41s-77.42 11.9-109.69 34.41c-14.5 10.11-34.44 6.56-44.55-7.94s-6.56-34.44 7.94-44.55c43.07-30.04 93.66-45.92 146.31-45.92s103.24 15.88 146.31 45.92c14.49 10.11 18.05 30.06 7.94 44.55-6.24 8.92-16.18 13.7-26.29 13.7z"  ></path></symbol><symbol id="qcw-QCW-01-06" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.87-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.32-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.93-29.01 92.07-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.98-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M736 544H289c-17.67 0-32-14.33-32-32s14.33-32 32-32h447c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M512 768c-17.67 0-32-14.33-32-32V289c0-17.67 14.33-32 32-32s32 14.33 32 32v447c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-04" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.86-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.32-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53S614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.92-29.01 92.07-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.99-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M512 768c-17.67 0-32-14.33-32-32V480c0-17.67 14.33-32 32-32s32 14.33 32 32v256c0 17.67-14.33 32-32 32zM512 384c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-27" viewBox="0 0 1024 1024"><path d="M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64zM361.53 296.94c12.5-12.5 32.76-12.5 45.26 0l82.74 82.75c6.04 6.04 14.08 9.37 22.63 9.37 8.55 0 16.58-3.33 22.63-9.37l82.74-82.75c12.5-12.5 32.76-12.5 45.26 0s12.5 32.76 0 45.25l-82.75 82.75c-18.13 18.13-42.24 28.12-67.88 28.12-25.64 0-49.75-9.99-67.88-28.12l-82.75-82.75c-12.5-12.49-12.5-32.75 0-45.25z m310.63 311.63c17.67 0 32 14.33 32 32s-14.33 32-32 32h-128v64c0 17.67-14.33 32-32 32s-32-14.33-32-32v-64h-128c-17.67 0-32-14.33-32-32s14.33-32 32-32h128v-64h-128c-17.67 0-32-14.33-32-32s14.33-32 32-32h320c17.67 0 32 14.33 32 32s-14.33 32-32 32h-128v64h128z"  ></path></symbol><symbol id="qcw-QCW-04-08" viewBox="0 0 1024 1024"><path d="M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z m224.63 402.66a132.98 132.98 0 0 1-76.43 57.52 72.515 72.515 0 0 1-21.41 3.58c-14.05-0.08-25.38-11.54-25.3-25.6 0.08-13.94 11.36-25.21 25.3-25.3 1.94 0.04 3.86-0.32 5.64-1.08a79.993 79.993 0 0 0 48.92-35.84 65.961 65.961 0 0 0 9.68-34.67c0-40.23-37.18-73.38-82.52-73.38a92.01 92.01 0 0 0-44.8 11.74 71.666 71.666 0 0 0-38.26 61.65v213.7c-0.45 44.08-24.82 84.44-63.62 105.37a139.696 139.696 0 0 1-69.8 17.92c-73.83 0-134.4-55.55-134.4-124.28 0.13-21.56 6.11-42.68 17.29-61.11a132.98 132.98 0 0 1 76.43-57.52 75.269 75.269 0 0 1 21.41-3.58c14.05-0.08 25.51 11.25 25.59 25.3 0.08 14.05-11.25 25.51-25.3 25.59h-0.29c-1.94-0.04-3.86 0.32-5.64 1.08a83.96 83.96 0 0 0-48.92 35.84 65.961 65.961 0 0 0-9.68 34.67c0 40.23 37.18 73.38 83.06 73.38a92.01 92.01 0 0 0 44.8-11.74c22.94-12.12 37.54-35.7 38.17-61.65V405.56c0.5-44.12 24.89-84.49 63.71-105.46a132.421 132.421 0 0 1 69.26-18.82c73.83 0 134.4 55.55 134.4 124.28a119.21 119.21 0 0 1-17.29 61.1z"  ></path></symbol><symbol id="qcw-a-15-15" viewBox="0 0 1024 1024"><path d="M736 96H288C181.96 96 96 181.96 96 288v448c0 7.37 0.43 14.64 1.24 21.8l378.83-378.82H284.95L466.28 252h153.7L515 325.51h220.53L554.2 452.48h38.66l-7.66 43.44h120.29l-9.43 53.46H575.77l-7.66 43.44H688.4l-18.95 107.45c-6.76 38.35-40.08 66.3-79.02 66.3H330.31l30.64-173.75h93.56L433.3 713.11h140.34l11.78-66.83H465.13l26.44-149.94L99.21 771.07C115.69 860.36 193.94 928 288 928h448c106.04 0 192-85.96 192-192V288c0-106.04-85.96-192-192-192z"  ></path></symbol><symbol id="qcw-qcw-a-3-1-06" viewBox="0 0 1024 1024"><path d="M692.52 647.76l-22.63 22.63c-87.48 87.48-229.31 87.48-316.78 0a228.145 228.145 0 0 1-15.35-16.98C213.13 514.18 198.63 311.2 294.24 157.13c-27.36 16.78-53.21 37.01-76.9 60.71-162.46 162.46-162.46 425.86 0 588.31 139.09 139.09 352.18 159.09 512.55 60.01l75.76 75.76c24.99 24.99 65.52 24.99 90.51 0l90.51-90.51-203.64-203.65c-24.99-24.99-65.52-24.99-90.51 0z" fill="#2DA751" ></path><path d="M294.24 157.13c-95.62 154.07-81.11 357.05 43.52 496.28-71.79-87.98-66.67-217.78 15.35-299.8 87.48-87.48 229.31-87.48 316.78 0 57.4 57.4 77.14 138.21 59.2 211.71 2.88-0.19 5.77-0.3 8.68-0.3 16.59 0 32.79 3.16 48.13 9.38 15.92 6.46 30.18 15.91 42.38 28.11l67.96 67.96c61.97-150.63 31.78-330.26-90.59-452.63-138.76-138.77-351.16-159-511.41-60.71z" fill="#FFCC22" ></path></symbol><symbol id="qcw-a-QCW-04_huaban1" viewBox="0 0 1024 1024"><path d="M429.52 862.4s-201 31-198 77 311 0 311 0l-113-77z" fill="#F9AE0A" ></path><path d="M594.48 862.4s201 31 198 77-311 0-311 0l113-77z" fill="#F9AE0A" ></path><path d="M791.12 430.73c0.04-99.82-23.74-366.58-279.12-366.58S232.84 330.91 232.88 430.73c-41.29 96.55-140.03 341.69-91.99 372.11 11.68 7.4 43.2-33.53 79.13-89.64 19.42 94.29 83.1 246.64 291.99 246.64S784.57 807.5 803.99 713.21c35.93 56.1 67.45 97.03 79.13 89.64 48.03-30.43-50.71-275.56-92-372.12z" fill="#111111" ></path><path d="M389.630785 248.684124a71.47 48.4 88.379 1 0 96.761262-2.73828 71.47 48.4 88.379 1 0-96.761262 2.73828Z" fill="#FFFFFF" ></path><path d="M583.987862 318.776253a48.4 71.47 1.633 1 0 4.073413-142.881948 48.4 71.47 1.633 1 0-4.073413 142.881948Z" fill="#FFFFFF" ></path><path d="M433.042766 255.195233a27 19.5 86.066 1 0 38.908106-2.675685 27 19.5 86.066 1 0-38.908106 2.675685Z" fill="#111111" ></path><path d="M552.96 250.14c0.46-0.42 0.67-0.58 0.97-0.83 0.29-0.25 0.54-0.43 0.8-0.64 0.53-0.42 1.05-0.79 1.56-1.16 0.52-0.38 1.04-0.73 1.56-1.06 0.52-0.33 1.05-0.7 1.58-0.99 1.06-0.61 2.13-1.25 3.22-1.77l1.64-0.82 1.67-0.73c4.45-1.93 9.11-3.31 13.83-4.23 2.37-0.34 4.75-0.8 7.13-0.92 1.19-0.08 2.39-0.21 3.58-0.24l3.57-0.01c0.6 0 1.2-0.01 1.79 0.01l1.77 0.12 3.55 0.26c2.35 0.25 4.66 0.64 7.01 0.97 5.48 0.78 9.29 5.85 8.51 11.32-0.78 5.48-5.85 9.29-11.32 8.51-0.28-0.04-0.55-0.09-0.82-0.15l-0.77-0.18c-1.78-0.41-3.56-0.9-5.34-1.27l-2.69-0.45-1.35-0.23c-0.45-0.06-0.9-0.08-1.35-0.13l-2.7-0.26c-0.9-0.07-1.79-0.05-2.69-0.08-1.81-0.11-3.57 0.09-5.37 0.15-3.55 0.35-7.05 1.02-10.41 2.1l-1.26 0.41-1.22 0.48c-0.83 0.3-1.6 0.67-2.4 1.02-0.76 0.37-1.55 0.75-2.25 1.16-0.36 0.2-0.72 0.41-1.03 0.61-0.15 0.1-0.35 0.21-0.46 0.29-0.11 0.07-0.32 0.22-0.26 0.15-3.15 2.78-7.96 2.48-10.75-0.67-2.75-3.15-2.45-7.96 0.7-10.74z" fill="#111111" ></path><path d="M511.98 343.35c-63.3 0-121.16 9.64-165.48 25.57-4.64 1.67-5.76 7.67-2.11 10.99 33.84 30.79 96.22 51.44 167.59 51.44 71.44 0 133.88-20.7 167.7-51.54 3.6-3.28 2.36-9.24-2.22-10.89-44.31-15.93-102.17-25.57-165.48-25.57z" fill="#F9AE0A" ></path><path d="M510.5 933.35c-262 0-218-379-218-379l218-62 218 62s44 379-218 379z" fill="#FFFFFF" ></path><path d="M834.62 538.25c-15.02-39.51-29.99-75.79-41.29-102.34-25.03 7.65-51.57 14.28-79.52 19.84-63.79 12.68-131.69 19.1-201.81 19.1s-138.02-6.43-201.81-19.1c-27.95-5.55-54.49-12.19-79.52-19.84-11.3 26.56-26.28 62.83-41.29 102.34 95.09 30.3 206.47 46.6 322.62 46.6s227.53-16.3 322.62-46.6z" fill="#E81F1E" ></path><path d="M334 699.44c17.56 2.22 35.99 3.41 55 3.41s37.44-1.19 55-3.41V541.85H334v157.59z" fill="#E81F1E" ></path></symbol><symbol id="qcw-QCW-02-04" viewBox="0 0 1024 1024"><path d="M720 96H304C189.12 96 96 189.12 96 304v416c0 114.88 93.12 208 208 208h416c114.88 0 208-93.12 208-208V304c0-114.88-93.12-208-208-208z m39.01 309.91L548.26 616.66c-18.13 18.13-42.24 28.12-67.88 28.12s-49.75-9.99-67.88-28.12L297.75 501.91c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0L457.75 571.4c6.04 6.04 14.08 9.37 22.63 9.37s16.58-3.33 22.63-9.37l210.75-210.75c12.5-12.5 32.76-12.5 45.25 0 12.49 12.5 12.49 32.76 0 45.26z"  ></path></symbol><symbol id="qcw-QCW-01-45" viewBox="0 0 1024 1024"><path d="M864 320c-17.67 0-32-14.33-32-32V160c0-17.65-14.35-32-32-32H678.28c-16.54 28.63-40.37 52.67-68.88 69.48C579.99 214.83 546.31 224 512 224s-67.99-9.17-97.4-26.52c-28.51-16.82-52.34-40.85-68.91-69.52L224 128c-17.65 0-32 14.35-32 32v128c0 17.67-14.33 32-32 32s-32-14.33-32-32V160c0-52.93 43.07-96 96-96h121.72c22.77 0 43.99 12.24 55.38 31.94C423.94 135.45 466.43 160 512 160s88.06-24.55 110.9-64.06C634.29 76.24 655.51 64 678.28 64H800c52.93 0 96 43.07 96 96v128c0 17.67-14.33 32-32 32zM800 960H678.28c-22.77 0-43.99-12.24-55.38-31.94C600.06 888.55 557.57 864 512 864s-88.06 24.55-110.9 64.06c-11.39 19.7-32.61 31.94-55.38 31.94H224c-52.93 0-96-43.07-96-96V544c0-17.67 14.33-32 32-32s32 14.33 32 32v320c0 17.65 14.35 32 32 32h121.72c16.54-28.63 40.37-52.67 68.88-69.48C444.01 809.17 477.69 800 512 800s67.99 9.17 97.4 26.52c28.51 16.82 52.34 40.85 68.91 69.52L800 896c17.65 0 32-14.35 32-32V544c0-17.67 14.33-32 32-32s32 14.33 32 32v320c0 52.93-43.07 96-96 96zM864 448H160c-17.67 0-32-14.33-32-32s14.33-32 32-32h704c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-02" viewBox="0 0 1024 1024"><path d="M720 160c38.46 0 74.63 14.98 101.82 42.18C849.02 229.37 864 265.54 864 304v416c0 38.46-14.98 74.63-42.18 101.82C794.63 849.02 758.46 864 720 864H304c-38.46 0-74.63-14.98-101.82-42.18C174.98 794.63 160 758.46 160 720V304c0-38.46 14.98-74.63 42.18-101.82C229.37 174.98 265.54 160 304 160h416m0-64H304C189.12 96 96 189.12 96 304v416c0 114.88 93.12 208 208 208h416c114.88 0 208-93.12 208-208V304c0-114.88-93.12-208-208-208z"  ></path></symbol><symbol id="qcw-QCW-01-55" viewBox="0 0 1024 1024"><path d="M832 928H192c-52.93 0-96-43.07-96-96v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64c0 17.64 14.35 32 32 32h640c17.65 0 32-14.36 32-32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64c0 52.93-43.07 96-96 96zM511 708.88c-25.64 0-49.75-9.99-67.88-28.12L265.68 503.32c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l177.44 177.44c6.04 6.04 14.08 9.37 22.63 9.37s16.58-3.33 22.63-9.37l179.44-179.44c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L578.88 680.76c-18.13 18.14-42.24 28.12-67.88 28.12z"  ></path><path d="M513 572c-17.67 0-32-14.33-32-32V160c0-17.67 14.33-32 32-32s32 14.33 32 32v380c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-93" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.86-101.26 96-142.39s89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96s73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.33-25.49 24.07-41.82 17.3-16.32-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.68-27.24 233.06-78.79 37.92-29.01 92.07-25.33 125.96 8.55l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.97-38.23 29.24-80.59 51.99-125.91 67.61C611.15 951.81 562.02 960 512 960z"  ></path><path d="M320.8 709c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l146.94-146.94c37.43-37.43 98.33-37.43 135.76 0l144.94 144.94c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0L535.63 552.69c-12.48-12.48-32.78-12.48-45.25 0L343.43 699.63c-6.25 6.25-14.44 9.37-22.63 9.37zM704 416H320c-17.67 0-32-14.33-32-32s14.33-32 32-32h384c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-54" viewBox="0 0 1024 1024"><path d="M384 544c-59.83 0-116.08-23.3-158.39-65.61C183.3 436.08 160 379.83 160 320s23.3-116.08 65.61-158.39C267.92 119.3 324.17 96 384 96s116.08 23.3 158.39 65.61C584.7 203.92 608 260.17 608 320s-23.3 116.08-65.61 158.39C500.08 520.7 443.83 544 384 544z m0-384c-88.22 0-160 71.78-160 160s71.78 160 160 160 160-71.78 160-160-71.78-160-160-160z"  ></path><path d="M320 416c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l45.25-45.25c6.04-6.04 9.37-14.08 9.37-22.63V224c0-17.67 14.33-32 32-32s32 14.33 32 32v69.49c0 25.64-9.99 49.75-28.12 67.88l-45.25 45.25c-6.24 6.26-14.43 9.38-22.62 9.38zM632.52 672H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h536.52c21.89 0 43.33-7.58 60.35-21.34 17.03-13.76 28.93-33.13 33.52-54.54l63.48-296.23c4.59-21.41 16.49-40.78 33.52-54.54 17.03-13.76 38.46-21.34 60.35-21.34H928c17.67 0 32 14.33 32 32s-14.33 32-32 32h-44.26c-14.99 0-28.15 10.64-31.29 25.29l-63.48 296.23c-7.65 35.68-27.48 67.96-55.86 90.9-28.38 22.94-64.1 35.57-100.59 35.57zM208 928c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-160c-26.47 0-48 21.53-48 48s21.53 48 48 48 48-21.53 48-48-21.53-48-48-48zM720 928c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-160c-26.47 0-48 21.53-48 48s21.53 48 48 48 48-21.53 48-48-21.53-48-48-48z"  ></path></symbol><symbol id="qcw-QCW-01-80" viewBox="0 0 1024 1024"><path d="M522.65 960.88c-79.77 0-154.77-31.07-211.18-87.47C255.07 817 224 742 224 662.23c0-52.9 14.04-104.9 40.59-150.38 0.45-0.77 0.93-1.52 1.44-2.25 44.72-63.71 104.92-163.09 137.79-274.73 19.27-65.44 20.13-105.14 20.16-106.93-0.07-12.56 7.21-23.88 18.62-29.13 11.43-5.26 24.88-3.21 34.38 5.05 2.06 1.79 50.93 44.77 92.89 123.22 24.56 45.93 41.87 94.8 51.43 145.28 6.88 36.32 9.74 73.47 8.57 111.13 24.05-25.67 49.32-59.67 62.41-98.94a32 32 0 0 1 27.28-21.73 32 32 0 0 1 30.94 16.1c1.23 2.18 30.41 54.21 51.16 127.91 12.29 43.64 19.1 86.02 20.27 125.96 1.49 51.06-6.3 98.3-23.14 140.41-6.56 16.41-25.19 24.39-41.6 17.83-16.41-6.56-24.39-25.19-17.83-41.6 13.48-33.69 19.74-72.03 18.62-113.95-0.92-34.51-6.82-71.47-17.52-109.87-5.79-20.78-12.39-39.77-18.73-56.06-45.61 71.77-111.16 116.07-114.66 118.4a32.01 32.01 0 0 1-35.37 0.09 31.981 31.981 0 0 1-13.84-32.55c10.73-57.85 11.02-114.9 0.88-169.57-8.13-43.81-22.96-86.33-44.07-126.35a455.96 455.96 0 0 0-36.35-57.89c-15.43 73.18-55.43 195.53-159.09 343.56-20.43 35.43-31.22 75.86-31.22 117 0 62.68 24.41 121.6 68.73 165.92s103.25 68.73 165.93 68.73c51.99 0 101.24-16.65 142.41-48.14 28.87-22.08 70.07-19.29 95.84 6.48l30.52 30.52c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-30.51-30.52c-3.18-3.18-8.22-3.57-11.71-0.9-52.45 40.1-115.14 61.3-181.32 61.3z"  ></path></symbol><symbol id="qcw-QCW-03-171" viewBox="0 0 1024 1024"><path d="M674.94 639.98h-320c-70.69 0-128-57.31-128-128s57.31-128 128-128h320c70.69 0 128 57.31 128 128s-57.31 128-128 128z" fill="#222222" ></path><path d="M509.516 441.574v19.35h-47.35v8.63h38.07v65.12h-37.44v49.28h-18.71v-49.27h-38.71v-65.12h36.95v-8.63h-49.75v44.8c0.06 13.79-0.61 27.57-2 41.29a257.247 257.247 0 0 1-6.66 36.96h-21.61a233.05 233.05 0 0 0 7.83-37.04c1.58-13.67 2.33-27.43 2.22-41.2v-64.16l137.16-0.01z m-101.59 98.38h18.56a147.77 147.77 0 0 1-6.07 42.62h-19.98c4.8-13.66 7.34-28.02 7.5-42.5v-0.12z m72.15-45.29v-8.32h-54.61v8.32h54.61z m0 23.31v-8.31h-54.61v8.31h54.61z m18.88 21.93c0.16 14.5 2.69 28.88 7.51 42.56h-19.98a147.728 147.728 0 0 1-6.09-42.56h18.56zM533.836 491.534c-3.85 2.34-6.94 4.12-9.32 5.33v-23.31a51.81 51.81 0 0 0 16.8-13.92 85.572 85.572 0 0 0 11.04-19.51h31.83a85.572 85.572 0 0 0 11.04 19.51 51.706 51.706 0 0 0 16.8 13.92v23.31c-3.46-1.79-6.83-3.76-10.08-5.91v58.39h-33.11v-19.69h14.43v-22.87h-28.48v55.06h54.24v20.63h-75.19v-90.94z m61.59-5.32a88.71 88.71 0 0 1-22.08-25.44h-10.07a88.864 88.864 0 0 1-22.08 25.44h54.23z m21.93-37.45h18.71v101.58h-18.71v-101.58z m13.59 115.98h16.65v-124.77h19.98v143.99h-36.62l-0.01-19.22z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-QCW-03-161" viewBox="0 0 1024 1024"><path d="M704 640H192V384h512c70.69 0 128 57.31 128 128s-57.31 128-128 128z" fill="#5A4D4D" ></path><path d="M365.602 440v81.74c0 9.48-0.94 18.94-2.8 28.24l-6.8 34.02h19.2l6.8-34.02c1.86-9.3 2.8-18.76 2.8-28.24V459.2h48v9.6h-38.4v64.8h38.4v33.6h-9.6V584h28.8v-50.4h38.4v-64.8h-38.4v-9.6h43.2V440h-129.6z m48 76.8v-7.2h57.6v7.2h-57.6z m57.6-24h-57.6v-7.2h57.6v7.2z" fill="#FFFFFF" ></path><path d="M390.562 584h19.2l8.64-43.2h-19.2l-8.64 43.2zM466.402 540.8l8.64 43.2h19.2l-8.64-43.2h-19.2zM620.002 471.2h19.2v81.6h-19.2zM572.002 526.4v19.2h28.8V488h-67.2v96h76.8v-19.2h-57.6v-57.6h28.8v19.2h-9.6z" fill="#FFFFFF" ></path><path d="M582.872 440h-31.33a62.72 62.72 0 0 1-27.6 34.72v21.5a82.063 82.063 0 0 0 40.19-37.02h6a82.105 82.105 0 0 0 40.19 37.02v-21.5a62.752 62.752 0 0 1-27.45-34.72zM648.802 440v127.2h-9.6V584h28.8V440h-19.2z" fill="#FFFFFF" ></path><path d="M192 384l48-48v48z" fill="#100F0F" ></path></symbol><symbol id="qcw-QCW-03-231" viewBox="0 0 1024 1024"><path d="M160 640h704c17.67 0 32-14.33 32-32V416c0-17.67-14.33-32-32-32H160c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32z" fill="#8232FF" ></path><path d="M218.71 568.99h23.43l16.64-94.35h-23.43zM802.39 458.88l2.9-16.44-50.51 8.14 2.48-14.05h-23.43l-3.16 17.93-9.48 1.53-2.9 16.43 9.48-1.52-3.49 19.81h72.5l2.9-16.44H750.6l1.28-7.26zM283.37 458.88h56l-15.29 86.7H301.3l40.63 31.63 23.76-134.77h-79.42zM500.26 535.22l15.26-86.53H464.9l2.14-12.16h-23.43l-2.14 12.16h-50.62l-15.26 86.53h50.62l-7.4 41.99 72.61-31.63h-43.6l1.83-10.36h50.61zM462 465.12h27.19l-3.28 18.61h-27.19l3.28-18.61z m-6.18 35.05h27.19l-3.28 18.61h-27.19l3.28-18.61z m-20.53-16.44h-16.8l-2.9 16.44h16.8l-3.28 18.61h-27.19l9.46-53.66h27.19l-3.28 18.61zM253.78 436.53c-7.8 0-15.25 6.33-16.62 14.13-1.38 7.81 3.84 14.13 11.64 14.13 7.81 0 15.25-6.33 16.62-14.13 1.38-7.8-3.83-14.13-11.64-14.13zM776.11 541.49c-9.11 0-17.79 7.38-19.4 16.49-1.61 9.11 4.47 16.49 13.58 16.49s17.79-7.38 19.4-16.49c1.61-9.11-4.47-16.49-13.58-16.49zM678.68 534.09h23.43l3.55-20.18h63.6l-3.56 20.18h23.43l6.45-36.61H685.14zM686.33 490.71h23.43l9.55-54.18-51.78 31.63h22.78zM632.14 441.1l0.26 12.16h-44.23l7.58-16.73h-23.43l-7.57 16.73h-5.99l4.55-12.16h-23.43l-10.69 28.6h28.11l-48.69 107.51 32.87-20.85 39.25-86.66h75.44l-0.61-28.6z" fill="#FFFFFF" ></path><path d="M575.61 494.72h43.83l-18.08 19.59-6.27-11.01h-23.43l15.22 26.7-37.09 40.2h23.43l22.61-24.5 13.96 24.5h23.43L610.31 530l32.55-35.28 2.9-16.44h-62.71zM728.62 520.68l-54.29 49.52h30.23l54.3-49.52z" fill="#FFFFFF" ></path><path d="M341.13 502.18h-39.59l42.04-64.8h-42.89l-55.32 85.29h39.58l-42.03 64.8z" fill="#FFC222" ></path></symbol><symbol id="qcw-QCW-01-70" viewBox="0 0 1024 1024"><path d="M592.47 832.88c-49.73 0-97.99-9.75-143.43-28.97-43.88-18.56-83.28-45.12-117.11-78.95-33.83-33.83-60.39-73.23-78.95-117.11C233.75 562.4 224 514.14 224 464.41c0-49.73 9.75-97.99 28.97-143.43 18.56-43.88 45.12-83.28 78.96-117.11 33.83-33.83 73.23-60.39 117.11-78.95 45.45-19.22 93.71-28.97 143.43-28.97 49.73 0 97.99 9.75 143.43 28.97 43.88 18.56 83.28 45.12 117.11 78.95 33.83 33.83 60.39 73.23 78.95 117.11 19.22 45.45 28.97 93.71 28.97 143.44 0 48.82-9.41 96.28-27.98 141.05-6.77 16.33-25.49 24.07-41.82 17.3s-24.07-25.49-17.3-41.82c15.33-36.96 23.1-76.17 23.1-116.54 0-81.33-31.67-157.79-89.18-215.29s-133.97-89.18-215.29-89.18c-81.33 0-157.78 31.67-215.29 89.18C319.67 306.63 288 383.09 288 464.41c0 81.33 31.67 157.79 89.18 215.29s133.97 89.18 215.29 89.18c67.46 0 131.36-21.6 184.79-62.47 33.1-25.32 80.35-22.11 109.92 7.45l38.5 38.51c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-38.5-38.51c-6.98-6.97-18.06-7.78-25.78-1.87-31.44 24.05-66.29 42.76-103.57 55.61-38.56 13.29-78.97 20.03-120.11 20.03z"  ></path><path d="M399.94 928.06c-74.46 0-145-23.85-204-68.98-5.76-4.4-14.03-3.79-19.25 1.42l-34.79 34.8c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25l34.8-34.79c27.81-27.81 72.25-30.82 103.38-7 47.74 36.51 104.84 55.82 165.12 55.82 38.57 0 75.83-7.9 110.74-23.49 33.74-15.06 63.65-36.51 88.88-63.76 12.01-12.96 32.26-13.74 45.22-1.73s13.74 32.26 1.73 45.22c-31.14 33.62-68.07 60.1-109.74 78.71-43.18 19.26-89.22 29.03-136.84 29.03zM118.97 740.4c-12.55 0-24.46-7.43-29.57-19.75C72.47 679.81 63.88 636.53 63.88 592c0-70.18 21.42-137.42 61.94-194.45 39.62-55.75 94.36-97.63 158.31-121.11 16.59-6.09 34.98 2.42 41.07 19.01 6.09 16.59-2.42 34.98-19.01 41.07-51.77 19-96.1 52.93-128.2 98.1-32.78 46.14-50.11 100.56-50.11 157.38 0 36.07 6.94 71.11 20.64 104.13 6.77 16.33-0.98 35.05-17.3 41.82a31.955 31.955 0 0 1-12.25 2.45zM736 416H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h288c17.67 0 32 14.33 32 32s-14.33 32-32 32zM576 576H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-43" viewBox="0 0 1024 1024"><path d="M928 960H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h832c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M160 960c-17.67 0-32-14.33-32-32V160c0-52.93 43.07-96 96-96h352c52.93 0 96 43.07 96 96v576c0 17.67-14.33 32-32 32s-32-14.33-32-32V160c0-17.65-14.35-32-32-32H224c-17.65 0-32 14.35-32 32v768c0 17.67-14.33 32-32 32z"  ></path><path d="M864 960c-17.67 0-32-14.33-32-32V404.4c0-38.45-22.84-73.09-58.18-88.24L627.4 253.41c-16.24-6.96-23.77-25.77-16.81-42.02 6.96-16.24 25.77-23.77 42.02-16.81l146.42 62.75A159.84 159.84 0 0 1 896 404.4V928c0 17.67-14.33 32-32 32zM512 352H288c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM512 576H288c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-97" viewBox="0 0 1024 1024"><path d="M512 928H320c-52.93 0-96-43.07-96-96V489.54c0-24.12-3.87-47.95-11.49-70.83l-18.86-56.59c-5.59-16.77 3.47-34.89 20.24-40.48 16.76-5.59 34.89 3.47 40.48 20.24l18.86 56.59a287.373 287.373 0 0 1 14.78 91.07V832c0 17.64 14.36 32 32 32h192c17.67 0 32 14.33 32 32s-14.34 32-32.01 32z"  ></path><path d="M255.99 608.01c-3.96 0-7.98-0.74-11.88-2.3l-160-64c-14.86-5.94-23.04-21.95-19.16-37.47l37.5-150.02c9.48-37.9 26.24-72.91 49.84-104.06 23.59-31.14 52.75-56.76 86.68-76.15l129.15-73.8a32.024 32.024 0 0 1 23.64-3.26l128 32c17.15 4.29 27.57 21.66 23.28 38.81-4.29 17.15-21.66 27.58-38.81 23.28L388.7 162.16l-117.99 67.42c-52.74 30.14-91.44 81.22-106.18 140.16L133.8 492.66l134.07 53.63c16.41 6.56 24.39 25.19 17.83 41.6-4.99 12.51-17.01 20.12-29.71 20.12z"  ></path><path d="M512 320c-88.22 0-160-71.78-160-160 0-17.67 14.33-32 32-32s32 14.33 32 32c0 52.93 43.07 96 96 96 17.67 0 32 14.33 32 32s-14.33 32-32 32zM768 960c-8.19 0-16.38-3.12-22.63-9.37L636.12 841.37C617.99 823.24 608 799.13 608 773.49V192c0-52.93 43.07-96 96-96h128c52.93 0 96 43.07 96 96v581.49c0 25.64-9.99 49.75-28.12 67.88L790.63 950.63c-6.25 6.25-14.44 9.37-22.63 9.37z m-64-800c-17.64 0-32 14.36-32 32v581.49c0 8.55 3.33 16.58 9.37 22.63L768 882.75l86.63-86.63c6.04-6.04 9.37-14.08 9.37-22.63V192c0-17.64-14.36-32-32-32H704z"  ></path><path d="M768 800H640c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-57" viewBox="0 0 1024 1024"><path d="M384 160C207.27 160 64 274.62 64 416c0 81.98 48.17 154.95 123.1 201.8L128 736l154.38-77.19C314.31 667.36 348.47 672 384 672c3.18 0 6.34-0.05 9.5-0.12-6.31-20.72-9.5-42.09-9.5-63.88 0-35.37 8.38-69.63 24.91-101.81 15.7-30.58 38.05-57.92 66.41-81.28 27.91-22.98 60.3-40.99 96.27-53.52C608.52 358.52 647.69 352 688 352c1.98 0 3.96 0.03 5.94 0.06C658.44 241.62 533.13 160 384 160zM272 280c22.09 0 40 17.91 40 40s-17.91 40-40 40-40-17.91-40-40 17.91-40 40-40z m224 80c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40z"  ></path><path d="M960 608c0-123.71-121.78-224-272-224S416 484.29 416 608s121.78 224 272 224c36.47 0 71.25-5.93 103.03-16.65L864 864l-23.5-70.5C912.61 753.22 960 685.17 960 608z m-368-32c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z m160-32c0-17.67 14.33-32 32-32s32 14.33 32 32-14.33 32-32 32-32-14.33-32-32z"  ></path></symbol><symbol id="qcw-QCW-02-56" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512s11.85-119.14 35.22-174.39c22.57-53.35 54.86-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.53 64 512 64s119.14 11.85 174.39 35.22c53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512s-11.85 119.14-35.22 174.39c-22.57 53.35-54.86 101.26-96 142.39-41.13 41.13-89.04 73.43-142.39 96C631.14 948.15 572.47 960 512 960z m0-832c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512s39.94 199 112.47 271.53C313 856.06 409.43 896 512 896s199-39.94 271.53-112.47C856.06 711 896 614.57 896 512s-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128z"  ></path><path d="M400 768c-79.4 0-144-64.6-144-144s64.6-144 144-144h224c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80c0 17.67-14.33 32-32 32s-32-14.33-32-32c0-79.4 64.6-144 144-144s144 64.6 144 144-64.6 144-144 144H400c-44.11 0-80 35.89-80 80s35.89 80 80 80 80-35.89 80-80c0-17.67 14.33-32 32-32s32 14.33 32 32c0 79.4-64.6 144-144 144z"  ></path></symbol><symbol id="qcw-QCW-02-431" viewBox="0 0 1024 1024"><path d="M767.5 927.5h-511c-52.93 0-96-43.07-96-96v-223c0-17.67 14.33-32 32-32s32 14.33 32 32v223c0 17.65 14.35 32 32 32h511c17.65 0 32-14.35 32-32v-223c0-17.67 14.33-32 32-32s32 14.33 32 32v223c0 52.93-43.07 96-96 96zM832 512H192c-52.93 0-96-43.07-96-96v-64c0-52.93 43.07-96 96-96h640c52.93 0 96 43.07 96 96v64c0 52.93-43.07 96-96 96zM192 320c-17.65 0-32 14.35-32 32v64c0 17.65 14.35 32 32 32h640c17.65 0 32-14.35 32-32v-64c0-17.65-14.35-32-32-32H192z"  ></path><path d="M666.51 320c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l50.75-50.75c12.48-12.48 12.48-32.78 0-45.25-6.04-6.04-14.08-9.37-22.63-9.37s-16.58 3.33-22.63 9.37l-69.49 69.49c-37.43 37.43-98.33 37.43-135.76 0l-69.49-69.49c-6.04-6.04-14.08-9.37-22.63-9.37s-16.58 3.33-22.63 9.37c-12.48 12.48-12.48 32.78 0 45.26l50.75 50.74c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-50.75-50.75c-37.43-37.43-37.43-98.33 0-135.76 37.43-37.43 98.33-37.43 135.76 0l69.49 69.49c12.48 12.48 32.78 12.48 45.25 0l69.49-69.49c37.43-37.43 98.33-37.43 135.76 0 37.43 37.43 37.43 98.33 0 135.76l-50.75 50.75c-6.23 6.25-14.42 9.37-22.61 9.37z"  ></path><path d="M512 928c-17.67 0-32-14.33-32-32V288c0-17.67 14.33-32 32-32s32 14.33 32 32v608c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-87" viewBox="0 0 1024 1024"><path d="M480 933.49c-25.64 0-49.75-9.99-67.88-28.12L118.63 611.88C100.5 593.75 90.51 569.64 90.51 544s9.99-49.75 28.12-67.88l333.25-333.26C482.1 112.64 522.28 96 565.02 96H832c52.93 0 96 43.07 96 96v266.98c0 42.74-16.64 82.92-46.86 113.14L547.88 905.37c-18.13 18.13-42.24 28.12-67.88 28.12zM565.02 160c-25.64 0-49.75 9.99-67.88 28.12L163.88 521.37c-6.04 6.04-9.37 14.08-9.37 22.63s3.33 16.58 9.37 22.63l293.49 293.49c6.04 6.04 14.08 9.37 22.63 9.37s16.58-3.33 22.63-9.37l333.25-333.26c18.13-18.13 28.12-42.24 28.12-67.88V192c0-17.64-14.36-32-32-32H565.02z"  ></path><path d="M672 448c-52.93 0-96-43.07-96-96s43.07-96 96-96 96 43.07 96 96-43.07 96-96 96z m0-128c-17.64 0-32 14.36-32 32s14.36 32 32 32 32-14.36 32-32-14.36-32-32-32z"  ></path></symbol><symbol id="qcw-QCW-01-95" viewBox="0 0 1024 1024"><path d="M672 576c-88.22 0-160-71.78-160-160s71.78-160 160-160 160 71.78 160 160-71.78 160-160 160z m0-256c-52.93 0-96 43.07-96 96s43.07 96 96 96 96-43.07 96-96-43.07-96-96-96zM864 928H480c-52.93 0-96-43.07-96-96v-52.21C384 685.06 461.06 608 555.79 608c17.67 0 32 14.33 32 32s-14.33 32-32 32C496.35 672 448 720.35 448 779.79V832c0 17.64 14.35 32 32 32h384c17.65 0 32-14.36 32-32v-52.21C896 720.35 847.65 672 788.21 672h-85.89v107.64c0 17.67-14.33 32-32 32s-32-14.33-32-32V672c0-35.29 28.71-64 64-64h85.89C882.94 608 960 685.06 960 779.79V832c0 52.93-43.07 96-96 96zM352 416c-88.22 0-160-71.78-160-160S263.78 96 352 96s160 71.78 160 160-71.78 160-160 160z m0-256c-52.93 0-96 43.07-96 96s43.07 96 96 96 96-43.07 96-96-43.07-96-96-96zM350.32 651.64c-17.67 0-32-14.33-32-32V512c0-35.29 28.71-64 64-64 17.67 0 32 14.33 32 32s-14.33 32-32 32h-0.04l0.04 107.63c0 17.68-14.33 32.01-32 32.01zM288 768H160c-52.93 0-96-43.07-96-96v-52.21C64 525.06 141.06 448 235.79 448c17.67 0 32 14.33 32 32s-14.33 32-32 32C176.35 512 128 560.35 128 619.79V672c0 17.64 14.35 32 32 32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-20" viewBox="0 0 1024 1024"><path d="M448 677.49c-25.64 0-49.75-9.99-67.88-28.12L265.37 534.63c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.26 0l114.74 114.75c6.04 6.04 14.08 9.37 22.63 9.37s16.58-3.33 22.63-9.37l210.75-210.75c12.5-12.5 32.76-12.5 45.26 0s12.5 32.76 0 45.25L515.88 649.37c-18.13 18.13-42.24 28.12-67.88 28.12z"  ></path></symbol><symbol id="qcw-QCW-01-63" viewBox="0 0 1024 1024"><path d="M128 352c-17.67 0-32-14.33-32-32V192c0-52.93 43.07-96 96-96h128c17.67 0 32 14.33 32 32s-14.33 32-32 32H192c-17.65 0-32 14.36-32 32v128c0 17.67-14.33 32-32 32zM896 352c-17.67 0-32-14.33-32-32V192c0-17.64-14.35-32-32-32H704c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c52.93 0 96 43.07 96 96v128c0 17.67-14.33 32-32 32zM832 928H704c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c17.65 0 32-14.36 32-32V704c0-17.67 14.33-32 32-32s32 14.33 32 32v128c0 52.93-43.07 96-96 96zM320 928H192c-52.93 0-96-43.07-96-96V704c0-17.67 14.33-32 32-32s32 14.33 32 32v128c0 17.64 14.35 32 32 32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32zM928 544H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h832c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-02-58" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512s11.85-119.14 35.22-174.39c22.57-53.35 54.86-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.53 64 512 64c17.67 0 32 14.33 32 32s-14.33 32-32 32c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512s39.94 199 112.47 271.53C313 856.06 409.43 896 512 896s199-39.94 271.53-112.47C856.06 711 896 614.57 896 512s-39.94-199-112.47-271.53c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512s-11.85 119.14-35.22 174.39c-22.57 53.35-54.86 101.26-96 142.39-41.13 41.13-89.04 73.43-142.39 96C631.14 948.15 572.47 960 512 960z"  ></path><path d="M800.02 416c-0.4 0-0.8-0.01-1.21-0.02-17.66-0.66-31.45-15.5-30.79-33.16l6.16-166.16c0.36-9.63 5.03-18.58 12.73-24.38 7.7-5.8 17.6-7.81 26.95-5.49l153.84 38.16c17.15 4.25 27.61 21.61 23.36 38.76s-21.61 27.61-38.76 23.36l-115.62-28.68-4.7 126.8c-0.64 17.25-14.83 30.81-31.96 30.81z"  ></path></symbol><symbol id="qcw-QCW-03-17" viewBox="0 0 1024 1024"><path d="M192 640h640c17.67 0 32-14.33 32-32V416c0-17.67-14.33-32-32-32H192c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32z" fill="#2D2D2D" ></path><path d="M416 384v128c0 70.69-57.31 128-128 128h-96c-17.67 0-32-14.33-32-32V416c0-17.67 14.33-32 32-32h224z" fill="#FF6B3E" ></path><path d="M242.76 459.05l15.56-8.89C260.36 464.73 272.87 476 288 476c3.31 0 6-2.69 6-6s-2.69-6-6-6c-9.35 0-17.05-7.17-17.91-16.29l16.46 4.11c3.22 0.8 6.47-1.15 7.28-4.37a6.01 6.01 0 0 0-4.37-7.28l-24-6c-1.5-0.37-3.09-0.16-4.43 0.61l-24.22 13.84a53.598 53.598 0 0 0-16.25 14.28 53.623 53.623 0 0 0-9.34 19.51l-7.03 28.13a6.01 6.01 0 0 0 3.59 7.03L234 528.06V572c0 9.93 8.07 18 18 18h36c3.31 0 6-2.69 6-6s-2.69-6-6-6h-36c-3.31 0-6-2.69-6-6v-48.11-16.1c0-5.81-0.93-11.56-2.77-17.08l-3.54-10.61a6.002 6.002 0 0 0-7.59-3.79 6.015 6.015 0 0 0-3.8 7.59l3.54 10.61c1.43 4.29 2.15 8.76 2.15 13.28v7.35l-16.91-6.76 5.76-23.05c2.78-11.05 10.03-20.63 19.92-26.28zM348 434h-24c-9.93 0-18 8.07-18 18v109.03c0 4.81 1.87 9.33 5.27 12.73l20.49 20.49a5.991 5.991 0 0 0 8.48 0l20.49-20.49c3.4-3.4 5.27-7.92 5.27-12.73V452c0-9.93-8.07-18-18-18z m6 127.03c0 1.6-0.62 3.11-1.76 4.24L336 581.51 320.49 566H336c3.31 0 6-2.69 6-6s-2.69-6-6-6h-18V452c0-3.31 2.69-6 6-6h24c3.31 0 6 2.69 6 6v109.03z" fill="#FFFFFF" ></path><path d="M634.48 437.71V458h-49.64v9.06h39.92v68.26h-39.25v51.66h-19.62v-51.66H525.3v-68.26h38.74V458h-52.16v46.96c0 15.66-0.7 30.08-2.1 43.27-1.4 13.19-3.72 26.11-6.96 38.74h-22.64c3.91-13.31 6.65-26.25 8.22-38.83 1.56-12.58 2.35-26.97 2.35-43.19V437.7h143.73z m-106.5 103.14h19.45c0 15.54-2.13 30.41-6.37 44.61H520.1c5.26-15.54 7.88-30.41 7.88-44.61z m75.64-47.46v-8.72h-57.19v8.72h57.19z m0 24.48v-8.72h-57.19v8.72h57.19z m19.79 22.98c0 14.2 2.63 29.07 7.88 44.61h-20.96c-4.25-14.2-6.37-29.07-6.37-44.61h19.45zM659.98 490.03c-4.03 2.46-7.27 4.31-9.73 5.53v-24.49c7.27-3.91 13.14-8.78 17.61-14.59 4.47-5.81 8.33-12.63 11.57-20.46h33.37c3.24 7.83 7.1 14.65 11.57 20.46 4.47 5.81 10.34 10.68 17.61 14.59v24.49c-2.91-1.45-6.43-3.52-10.57-6.21v61.22h-34.72v-20.63h15.09v-23.98h-29.85v57.69h56.86v21.63h-78.83v-95.25z m64.57-5.53c-9.39-7.38-17.11-16.27-23.14-26.67h-10.57c-6.04 10.4-13.75 19.29-23.14 26.67h56.85z m22.97-39.25h19.62v106.5h-19.62v-106.5z m14.26 121.6h17.44V436.03h20.96v150.94h-38.41v-20.12z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-QCW-03-211" viewBox="0 0 1024 1024"><path d="M288 640h448c17.67 0 32-14.33 32-32V416c0-17.67-14.33-32-32-32H288c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32z" fill="#FF5500" ></path><path d="M378.07 608h-9.48V484.74c0-15.71 12.74-28.44 28.44-28.44h9.48v123.26c0.01 15.71-12.73 28.44-28.44 28.44zM626.96 608h-9.48v-85.33c0-15.71 12.73-28.44 28.44-28.44h9.48v85.33c0.01 15.71-12.73 28.44-28.44 28.44zM439.7 608h-9.48v-85.33c0-15.71 12.74-28.44 28.44-28.44h9.48v85.33c0.01 15.71-12.73 28.44-28.44 28.44zM565.33 608h-9.48V444.44c0-15.71 12.73-28.44 28.44-28.44h9.48v163.56c0.01 15.71-12.73 28.44-28.44 28.44z" fill="#FFFFFF" ></path><path d="M513.19 589.04m-18.96 0a18.96 18.96 0 1 0 37.92 0 18.96 18.96 0 1 0-37.92 0Z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-QCW-02-24" viewBox="0 0 1024 1024"><path d="M192 576h640L512 896z" fill="#FF5500" ></path><path d="M192 448l320-320 320 320z" fill="#C6C6C6" ></path></symbol><symbol id="qcw-QCW-02-25" viewBox="0 0 1024 1024"><path d="M192 576h640L512 896z" fill="#C6C6C6" ></path><path d="M192 448l320-320 320 320z" fill="#FF5500" ></path></symbol><symbol id="qcw-QCW-02-23" viewBox="0 0 1024 1024"><path d="M832 448H192l320-320zM832 576L512 896 192 576z" fill="#C6C6C6" ></path></symbol><symbol id="qcw-QCW-01-19" viewBox="0 0 1024 1024"><path d="M352 704c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l320-320c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25l-320 320c-6.24 6.25-14.43 9.37-22.62 9.37z"  ></path><path d="M672 704c-8.19 0-16.38-3.12-22.63-9.37l-320-320c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l320 320c12.5 12.5 12.5 32.76 0 45.25-6.24 6.25-14.43 9.37-22.62 9.37z"  ></path></symbol><symbol id="qcw-QCW-03-16" viewBox="0 0 1024 1024"><path d="M864 384H256v256h544c35.35 0 64-28.65 64-64V384z" fill="#2D2D2D" ></path><path d="M416 384v128c0 70.69-57.31 128-128 128H160V384h256z" fill="#FF6B3E" ></path><path d="M242.76 459.05l15.56-8.89C260.36 464.73 272.87 476 288 476c3.31 0 6-2.69 6-6s-2.69-6-6-6c-9.35 0-17.05-7.17-17.91-16.29l16.46 4.11c3.22 0.8 6.47-1.15 7.28-4.37a6.01 6.01 0 0 0-4.37-7.28l-24-6c-1.5-0.37-3.09-0.16-4.43 0.61l-24.22 13.84a53.598 53.598 0 0 0-16.25 14.28 53.623 53.623 0 0 0-9.34 19.51l-7.03 28.13a6.01 6.01 0 0 0 3.59 7.03L234 528.06V572c0 9.93 8.07 18 18 18h36c3.31 0 6-2.69 6-6s-2.69-6-6-6h-36c-3.31 0-6-2.69-6-6v-48.11-16.1c0-5.81-0.93-11.56-2.77-17.08l-3.54-10.61a6.002 6.002 0 0 0-7.59-3.79 6.015 6.015 0 0 0-3.8 7.59l3.54 10.61c1.43 4.29 2.15 8.76 2.15 13.28v7.35l-16.91-6.76 5.76-23.05c2.78-11.05 10.03-20.63 19.92-26.28zM348 434h-24c-9.93 0-18 8.07-18 18v109.03c0 4.81 1.87 9.33 5.27 12.73l20.49 20.49a5.991 5.991 0 0 0 8.48 0l20.49-20.49c3.4-3.4 5.27-7.92 5.27-12.73V452c0-9.93-8.07-18-18-18z m6 127.03c0 1.6-0.62 3.11-1.76 4.24L336 581.51 320.49 566H336c3.31 0 6-2.69 6-6s-2.69-6-6-6h-18V452c0-3.31 2.69-6 6-6h24c3.31 0 6 2.69 6 6v109.03z" fill="#FFFFFF" ></path><path d="M634.48 437.71V458h-49.64v9.06h39.92v68.26h-39.25v51.66h-19.62v-51.66H525.3v-68.26h38.74V458h-52.16v46.96c0 15.66-0.7 30.08-2.1 43.27-1.4 13.19-3.72 26.11-6.96 38.74h-22.64c3.91-13.31 6.65-26.25 8.22-38.83 1.56-12.58 2.35-26.97 2.35-43.19V437.7h143.73z m-106.5 103.14h19.45c0 15.54-2.13 30.41-6.37 44.61H520.1c5.26-15.54 7.88-30.41 7.88-44.61z m75.64-47.46v-8.72h-57.19v8.72h57.19z m0 24.48v-8.72h-57.19v8.72h57.19z m19.79 22.98c0 14.2 2.63 29.07 7.88 44.61h-20.96c-4.25-14.2-6.37-29.07-6.37-44.61h19.45zM659.98 490.03c-4.03 2.46-7.27 4.31-9.73 5.53v-24.49c7.27-3.91 13.14-8.78 17.61-14.59 4.47-5.81 8.33-12.63 11.57-20.46h33.37c3.24 7.83 7.1 14.65 11.57 20.46 4.47 5.81 10.34 10.68 17.61 14.59v24.49c-2.91-1.45-6.43-3.52-10.57-6.21v61.22h-34.72v-20.63h15.09v-23.98h-29.85v57.69h56.86v21.63h-78.83v-95.25z m64.57-5.53c-9.39-7.38-17.11-16.27-23.14-26.67h-10.57c-6.04 10.4-13.75 19.29-23.14 26.67h56.85z m22.97-39.25h19.62v106.5h-19.62v-106.5z m14.26 121.6h17.44V436.03h20.96v150.94h-38.41v-20.12z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-QCW-01-17" viewBox="0 0 1024 1024"><path d="M580.59 736.05c-8.19 0-16.38-3.12-22.63-9.37L411.22 579.93c-37.43-37.43-37.43-98.33 0-135.76l146.75-146.75c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L456.47 489.42c-12.48 12.48-12.48 32.78 0 45.25l146.74 146.75c12.5 12.5 12.5 32.76 0 45.25-6.24 6.25-14.43 9.38-22.62 9.38z"  ></path></symbol><symbol id="qcw-QCW-01-18" viewBox="0 0 1024 1024"><path d="M443.1 736.05c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l146.74-146.75c6.04-6.04 9.37-14.08 9.37-22.63s-3.33-16.58-9.37-22.63L420.47 342.67c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l146.75 146.75c18.13 18.13 28.12 42.24 28.12 67.88s-9.99 49.75-28.12 67.88L465.73 726.67a31.909 31.909 0 0 1-22.63 9.38z"  ></path></symbol><symbol id="qcw-QCW-02-54" viewBox="0 0 1024 1024"><path d="M960 512c0-2.01-0.19-3.97-0.55-5.88-0.8-58.21-12.62-114.71-35.17-168.02-22.57-53.35-54.86-101.26-96-142.39-41.13-41.13-89.04-73.43-142.39-96-53.31-22.55-109.8-34.37-168.02-35.17-1.9-0.35-3.86-0.54-5.87-0.54-1.98 0-3.91 0.19-5.79 0.53-58.6 0.67-115.46 12.5-169.1 35.19-53.35 22.57-101.26 54.86-142.39 96-12.5 12.5-12.5 32.76 0 45.25 12.5 12.5 32.76 12.5 45.25 0 65.05-65.05 149.34-103.88 240.03-111.2V192c0 17.67 14.33 32 32 32s32-14.33 32-32v-62.15c90.31 7.52 174.22 46.31 239.03 111.12S886.63 389.69 894.15 480H832c-17.67 0-32 14.33-32 32s14.33 32 32 32h62.23c-7.32 90.69-46.15 174.98-111.2 240.03-64.81 64.81-148.72 103.6-239.03 111.12V832c0-17.67-14.33-32-32-32s-32 14.33-32 32v63.23c-90.69-7.32-174.98-46.15-240.03-111.2-65.01-65.01-103.84-149.22-111.19-239.84H192c17.67 0 32-14.33 32-32s-14.33-32-32-32H95.5c-17.64 0-31.94 14.27-32 31.89v0.42c0 60.47 11.85 119.14 35.22 174.39 22.57 53.35 54.86 101.26 96 142.39 41.13 41.13 89.04 73.43 142.39 96 55.25 23.37 113.93 35.22 174.39 35.22s119.14-11.85 174.39-35.22c53.35-22.57 101.26-54.86 142.39-96 41.13-41.13 73.43-89.04 96-142.39 22.69-53.64 34.52-110.5 35.19-169.1 0.34-1.88 0.53-3.81 0.53-5.79z"  ></path><path d="M528 592c0 61.86 50.14 112 112 112s112-50.14 112-112c0-41.78-22.88-78.21-56.79-97.46C719.88 477.17 736 448.47 736 416c0-53.02-42.98-96-96-96s-96 42.98-96 96c0 32.47 16.12 61.17 40.79 78.54C550.88 513.79 528 550.22 528 592z m112 48c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48z m0-256c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.33-32-32 14.33-32 32-32zM349.9 336l-93.53 304H384v64h64v-64h32v-64h-32v-96h-64v96h-40.98l73.84-240z"  ></path></symbol><symbol id="qcw-QCW-01-73" viewBox="0 0 1024 1024"><path d="M768 960H256c-52.93 0-96-43.07-96-96V640c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 17.64 14.35 32 32 32h512c17.65 0 32-14.36 32-32V640c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 52.93-43.07 96-96 96zM800 544c-34.88 0-68.52-11.42-96-32.02-27.48 20.6-61.12 32.02-96 32.02s-68.52-11.42-96-32.02c-27.48 20.6-61.12 32.02-96 32.02s-68.52-11.42-96-32.02c-27.48 20.6-61.12 32.02-96 32.02-1.23 0-2.45-0.01-3.67-0.04-49.28-1.11-93.92-25-122.46-65.55-13.72-19.49-22.95-42.17-26.69-65.59-3.98-24.92-1.91-49.82 6.15-74l69.73-209.17A95.86 95.86 0 0 1 238.13 64h547.74c41.39 0 77.99 26.38 91.07 65.64l69.73 209.17c8.06 24.18 10.13 49.08 6.15 74-3.74 23.42-12.97 46.1-26.69 65.59-28.54 40.55-73.18 64.44-122.47 65.55-1.21 0.04-2.43 0.05-3.66 0.05z m-96-123.71l23.99 27.19C746.23 468.15 772.48 480 800 480c0.74 0 1.47-0.01 2.2-0.02 28.78-0.65 54.87-14.65 71.59-38.4 17.11-24.31 21.54-54.38 12.16-82.52l-69.73-209.17a31.951 31.951 0 0 0-30.36-21.88H238.13c-13.8 0-26 8.79-30.36 21.88l-69.73 209.17c-9.38 28.13-4.95 58.21 12.16 82.52 16.72 23.76 42.81 37.76 71.58 38.4 0.75 0.02 1.48 0.03 2.22 0.03 27.52 0 53.77-11.85 72.01-32.52l23.99-27.2 23.99 27.19C362.23 468.15 388.48 480 416 480s53.77-11.85 72.01-32.52L512 420.29l23.99 27.19C554.23 468.15 580.48 480 608 480s53.77-11.85 72.01-32.52L704 420.29z"  ></path></symbol><symbol id="qcw-QCW-01-72" viewBox="0 0 1024 1024"><path d="M512 512c-59.83 0-116.08-23.3-158.39-65.61C311.3 404.08 288 347.83 288 288s23.3-116.08 65.61-158.39C395.92 87.3 452.17 64 512 64s116.08 23.3 158.39 65.61C712.7 171.92 736 228.17 736 288s-23.3 116.08-65.61 158.39C628.08 488.7 571.83 512 512 512z m0-384c-88.22 0-160 71.78-160 160s71.78 160 160 160 160-71.78 160-160-71.78-160-160-160zM832 960h-31c-17.67 0-32-14.33-32-32s14.33-32 32-32h31c17.65 0 32-14.36 32-32v-32c0-59.83-23.3-116.08-65.61-158.39C756.08 631.3 699.83 608 640 608H384c-59.83 0-116.08 23.3-158.39 65.61C183.3 715.92 160 772.17 160 832v32c0 17.64 14.35 32 32 32h32c17.67 0 32 14.33 32 32s-14.33 32-32 32h-32c-52.93 0-96-43.07-96-96v-32c0-76.93 29.96-149.25 84.35-203.65C234.75 573.96 307.07 544 384 544h256c76.93 0 149.25 29.96 203.65 84.35C898.04 682.75 928 755.07 928 832v32c0 52.93-43.07 96-96 96z"  ></path><path d="M667.34 960H356.66C318.8 960 288 929.2 288 891.34V740.66c0-37.86 30.8-68.66 68.66-68.66h310.68c37.86 0 68.66 30.8 68.66 68.66v150.68c0 37.86-30.8 68.66-68.66 68.66zM356.66 736c-2.57 0-4.66 2.09-4.66 4.66v150.68c0 2.57 2.09 4.66 4.66 4.66h310.68c2.57 0 4.66-2.09 4.66-4.66V740.66c0-2.57-2.09-4.66-4.66-4.66H356.66z"  ></path></symbol><symbol id="qcw-QCW-02-21" viewBox="0 0 1024 1024"><path d="M416 480v384h192V480h224L512 160 192 480h224z"  ></path></symbol><symbol id="qcw-QCW-02-22" viewBox="0 0 1024 1024"><path d="M608 544V160H416v384H192l320 320 320-320H608z"  ></path></symbol><symbol id="qcw-QCW-02-51" viewBox="0 0 1024 1024"><path d="M942.18 468.98L846.6 373.4V238.23c0-33.6-27.24-60.84-60.84-60.84H650.6l-95.58-95.58c-23.76-23.76-62.28-23.76-86.04 0L373.4 177.4H238.23c-33.6 0-60.84 27.24-60.84 60.84V373.4l-95.58 95.58c-23.76 23.76-23.76 62.28 0 86.04l95.58 95.58v135.17c0 33.6 27.24 60.84 60.84 60.84H373.4l95.58 95.58c23.76 23.76 62.28 23.76 86.04 0l95.58-95.58h135.17c33.6 0 60.84-27.24 60.84-60.84V650.6l95.58-95.58c23.75-23.76 23.75-62.28-0.01-86.04zM420.74 694.51h-91.26l30.42-365.02h91.26l-30.42 365.02z m243.35 0h-91.26L466.37 512l11.41-136.88 106.46 182.51 19.01-228.14h91.26l-30.42 365.02z"  ></path></symbol><symbol id="qcw-QCW-02-53" viewBox="0 0 1024 1024"><path d="M288 96L96 384h352zM512 384L672 96H352zM736 96L576 384h352zM96 448l384 480V448zM928 448L544 928V448z"  ></path></symbol><symbol id="qcw-QCW-02-52" viewBox="0 0 1024 1024"><path d="M902.45 359.96L674.29 326.8 572.25 120.08a67.219 67.219 0 0 0-30.52-30.52c-33.28-16.42-73.57-2.76-89.99 30.52L349.71 326.83l-228.16 33.16a67.165 67.165 0 0 0-38.47 19.6c-25.9 26.57-25.35 69.11 1.22 95.01l165.11 160.93-38.98 227.24a67.19 67.19 0 0 0 6.76 42.66c17.28 32.84 57.91 45.46 90.75 28.18L512 826.32 716.07 933.6c9.66 5.1 20.41 7.78 31.33 7.79v-0.05c3.71-0.01 7.42-0.33 11.08-0.95 36.66-6.23 61.33-41 55.09-77.66L774.59 635.5 939.7 474.58a67.165 67.165 0 0 0 19.6-38.47c5.32-36.73-20.13-70.82-56.85-76.15zM666.96 551.98C648.77 622.64 585.05 672 512 672s-136.77-49.36-154.96-120.02c-4.41-17.12 5.9-34.56 23.01-38.97 17.12-4.4 34.56 5.9 38.97 23.01C429.93 578.4 468.16 608 512 608s82.07-29.6 92.98-71.98c4.4-17.12 21.85-27.42 38.97-23.01 17.11 4.41 27.41 21.85 23.01 38.97z"  ></path></symbol><symbol id="qcw-QCW-02-46" viewBox="0 0 1024 1024"><path d="M303.75 934.42c-8.88 0-17.81-1.29-26.56-3.92-23.57-7.06-42.97-22.88-54.64-44.54-11.67-21.66-14.21-46.57-7.14-70.13l64.03-211.45c0.06-0.2 0.12-0.4 0.19-0.6l79.77-245.81c0.07-0.21 0.14-0.41 0.21-0.62l72.46-208.74c9.27-26.83 30.01-47.57 56.88-56.86 23.23-8.03 48.19-6.53 70.29 4.21 22.1 10.75 38.7 29.46 46.73 52.68l65.17 187.65 197.1 3.98c0.41-0.01 0.81-0.01 1.22 0 28.55 0.42 54.79 13.73 71.99 36.52 14.79 19.59 21.06 43.76 17.66 68.07-3.4 24.31-16.05 45.83-35.64 60.62L747.6 638.83c-0.17 0.13-0.34 0.25-0.51 0.38l-209 152.07-0.54 0.39-181.44 126.3c-15.69 10.85-33.89 16.45-52.36 16.45z m36.85-311.18l-63.92 211.05c-2.13 7.11-1.36 14.71 2.21 21.32 3.56 6.61 9.48 11.44 16.67 13.59 8.22 2.47 17 1.08 24.06-3.81L500.7 739.32l208.48-151.69 175.68-133.2c6-4.53 9.84-11.06 10.87-18.43 1.03-7.38-0.87-14.71-5.36-20.65-5.01-6.64-12.55-10.63-20.82-11.05h-1.07l-220.9-4.46a31.992 31.992 0 0 1-29.58-21.5L545.5 169.6c-2.46-7.11-7.51-12.81-14.24-16.08-6.73-3.27-14.33-3.73-21.4-1.28-8.18 2.83-14.49 9.14-17.32 17.32l-72.37 208.47-79.57 245.21z"  ></path><path d="M756.38 937.32c-17.41 0-34.37-5.3-48.93-15.48l-97.05-67.58c-14.5-10.1-18.07-30.04-7.97-44.55s30.04-18.07 44.55-7.98l97.09 67.61c4.8 3.36 10.57 4.63 16.3 3.62 5.72-1.01 10.7-4.2 14.03-8.96 3.86-5.53 4.94-12.4 2.96-18.85-0.08-0.28-0.17-0.56-0.24-0.84l-34-112.62c-5.11-16.92 4.47-34.77 21.39-39.88 16.92-5.1 34.78 4.47 39.88 21.39l34.19 113.28c0.07 0.23 0.14 0.47 0.2 0.7 7.47 25.18 3.14 51.92-11.92 73.48-13.12 18.78-32.77 31.32-55.32 35.32-5.07 0.9-10.14 1.34-15.16 1.34zM209.49 582.93c-6.73 0-13.52-2.12-19.3-6.5l-92.4-70.01a0.555 0.555 0 0 1-0.08-0.06c-20.91-15.95-33.19-40.18-33.7-66.48-0.44-22.88 8.06-44.57 23.93-61.06 15.87-16.49 37.21-25.82 60.09-26.26l115.6-2.46c17.7-0.37 32.3 13.64 32.67 31.31 0.38 17.67-13.64 32.3-31.31 32.67l-115.67 2.46c-5.86 0.11-11.26 2.47-15.27 6.65a21.476 21.476 0 0 0-6.05 15.45c0.13 6.64 3.22 12.76 8.5 16.8l92.34 69.97c14.09 10.67 16.85 30.74 6.18 44.83-6.29 8.32-15.85 12.69-25.53 12.69z"  ></path></symbol><symbol id="qcw-QCW-02-40" viewBox="0 0 1024 1024"><path d="M704 427.49V416c0-25.88-10.14-50.14-28.56-68.32-18.42-18.18-42.78-27.99-68.7-27.67-52.24 0.68-94.74 44.17-94.74 96.94V448h64v-31.05c0-17.94 14.16-32.73 31.57-32.95 8.65-0.1 16.78 3.16 22.91 9.22 6.14 6.06 9.52 14.15 9.52 22.78v11.49c0 6.71-2.06 13.14-5.96 18.6L512 616.95V704h192v-64H574.18l111.94-156.71c11.7-16.38 17.88-35.67 17.88-55.8zM448 339h-58.25L339 389.75v90.5l45-45V704h64z"  ></path><path d="M511.5 960.5c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.35 631.64 63.5 572.97 63.5 512.5v-0.42c0.06-17.63 14.36-31.9 32-31.9H192c17.67 0 32 14.33 32 32s-14.33 32-32 32h-63.22c7.35 90.62 46.18 174.84 111.19 239.84C312.5 856.56 408.93 896.5 511.5 896.5s199-39.94 271.53-112.47C855.56 711.5 895.5 615.07 895.5 512.5s-39.94-199-112.47-271.53C710.5 168.44 614.07 128.5 511.5 128.5c-102.57 0-199 39.94-271.53 112.47-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25 41.13-41.13 89.04-73.43 142.39-96C392.36 76.35 451.03 64.5 511.5 64.5s119.14 11.85 174.39 35.22c53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39 23.37 55.25 35.22 113.93 35.22 174.39s-11.85 119.14-35.22 174.39c-22.57 53.35-54.86 101.26-96 142.39-41.13 41.13-89.04 73.43-142.39 96-55.25 23.37-113.92 35.22-174.39 35.22z"  ></path><path d="M512 224c-17.67 0-32-14.33-32-32V96c0-17.67 14.33-32 32-32s32 14.33 32 32v96c0 17.67-14.33 32-32 32zM512 960c-17.67 0-32-14.33-32-32v-96c0-17.67 14.33-32 32-32s32 14.33 32 32v96c0 17.67-14.33 32-32 32zM928 544h-96c-17.67 0-32-14.33-32-32s14.33-32 32-32h96c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-03-19" viewBox="0 0 1024 1024"><path d="M896 640H320V384h640v192c0 35.35-28.65 64-64 64z" fill="#F1D09A" ></path><path d="M352 640H64V384h416v128c0 70.69-57.31 128-128 128z" fill="#5B2F1A" ></path><path d="M249.53 576h28l22.57-128h-28zM422.17 494c4.48-25.4-12.48-46-37.89-46h-64l-4.94 28-6.34 36-4.94 28-6.35 36h28l6.35-36h36c25.41 0 49.63-20.6 54.11-46zM373 512h-36l6.35-36h36c9.94 0 16.58 8.06 14.83 18-1.76 9.94-11.24 18-21.18 18zM175.72 541.97L158.08 448h-29.8l24.02 128h34.83l69.15-128h-29.79z" fill="#F6DCB5" ></path><path d="M607.26 486.9c0 8.25-3.48 19.45-10.43 33.59l-26.7 54.45H545.2l26.17-51.98c-2.59 1.06-5.72 1.59-9.37 1.59-8.96 0-16.74-3.42-23.34-10.25-6.6-6.83-9.9-15.85-9.9-27.05 0-12.14 3.68-21.72 11.05-28.73 7.36-7.01 16.77-10.52 28.2-10.52s20.83 3.45 28.2 10.34c7.36 6.9 11.05 16.42 11.05 28.56z m-27.5 13.61c3.01-3.3 4.51-7.78 4.51-13.44 0-5.66-1.5-10.14-4.51-13.44-3.01-3.3-6.93-4.95-11.76-4.95s-8.75 1.65-11.76 4.95c-3.01 3.3-4.51 7.78-4.51 13.44 0 5.54 1.5 9.99 4.51 13.35s6.92 5.04 11.76 5.04 8.76-1.65 11.76-4.95zM654.11 574.94h-26.34v-26.17h26.34v26.17zM754.52 538.34c0 11.79-3.8 21.01-11.4 27.67-7.6 6.66-17.24 9.99-28.91 9.99s-21.3-3.33-28.91-9.99c-7.6-6.66-11.4-15.88-11.4-27.67 0-11.9 5.24-21.33 15.74-28.29-9.43-6.6-14.14-15.32-14.14-26.17 0-10.84 3.74-19.54 11.23-26.08 7.48-6.54 16.65-9.81 27.49-9.81s19.98 3.27 27.4 9.81c7.43 6.54 11.14 15.23 11.14 26.08 0 10.85-4.72 19.57-14.14 26.17 10.6 7.08 15.9 16.51 15.9 28.29z m-28.02 11.94c3.36-3.36 5.04-7.45 5.04-12.29 0-4.83-1.68-8.96-5.04-12.38-3.36-3.42-7.46-5.13-12.29-5.13-4.83 0-8.93 1.71-12.29 5.13-3.36 3.42-5.04 7.54-5.04 12.38 0 4.83 1.68 8.93 5.04 12.29 3.36 3.36 7.45 5.04 12.29 5.04 4.84-0.01 8.93-1.68 12.29-5.04z m3.27-65.68c0-4.48-1.47-8.25-4.42-11.31-2.95-3.06-6.66-4.6-11.14-4.6s-8.22 1.53-11.23 4.6c-3.01 3.07-4.51 6.84-4.51 11.31 0 4.6 1.5 8.4 4.51 11.4 3.01 3.01 6.75 4.51 11.23 4.51s8.19-1.5 11.14-4.51c2.95-3.01 4.42-6.81 4.42-11.4z" fill="#5B2F1A" ></path><path d="M793 573.94l-3.3-13.61c4.03 0.55 7.84 0.82 11.41 0.82 3.21 0 4.81-1.69 4.81-5.09v-27.77c-6.14 2.02-11.82 3.8-17.05 5.36l-3.57-14.57c6.6-1.28 13.47-3.02 20.62-5.22v-28.05h-17.87v-13.89h17.87v-23.51h14.16v23.51h15.4v13.89h-15.4v22.96c5.13-2.11 10.45-4.54 15.95-7.29v14.57c-3.48 1.65-8.8 3.94-15.95 6.87v36.71c0 9.53-4.63 14.3-13.89 14.3H793z m115.22-113.02c-15.49 5.04-32.95 8.11-52.38 9.21v21.04h55.41v13.89h-19.39V576h-14.44v-70.94h-21.59v3.3c-0.82 27.77-7.61 50.09-20.35 66.96l-10.31-10.86c10.26-13.38 15.81-32.08 16.64-56.09v-50.18c22.46-0.55 42.21-3.94 59.26-10.17l7.15 12.9z" fill="#5B2F1A" ></path></symbol><symbol id="qcw-QCW-03-20" viewBox="0 0 1024 1024"><path d="M608 640H288V384h448v128c0 70.69-57.31 128-128 128z" fill="#5B2F1A" ></path><path d="M485.94 576h28l22.57-128h-28zM658.59 494c4.48-25.4-12.48-46-37.89-46h-64l-4.94 28-6.35 36-4.94 28-6.35 36h28l6.35-36h36c25.41 0 49.64-20.6 54.12-46z m-49.18 18h-36l6.35-36h36c9.94 0 16.58 8.06 14.83 18-1.76 9.94-11.24 18-21.18 18zM412.13 541.97L394.49 448H364.7l24.02 128h34.82l69.16-128h-29.8z" fill="#F6DCB5" ></path></symbol><symbol id="qcw-QCW-01-59" viewBox="0 0 1024 1024"><path d="M704 800H192c-52.93 0-96-43.07-96-96V544c0-17.67 14.33-32 32-32s32 14.33 32 32v160c0 17.64 14.36 32 32 32h512c17.64 0 32-14.36 32-32V192c0-17.64-14.36-32-32-32H544c-17.67 0-32-14.33-32-32s14.33-32 32-32h160c52.93 0 96 43.07 96 96v512c0 52.93-43.07 96-96 96z"  ></path><path d="M704 928H256c-17.67 0-32-14.33-32-32s14.33-32 32-32h448c88.22 0 160-71.78 160-160V256c0-17.67 14.33-32 32-32s32 14.33 32 32v448c0 59.83-23.3 116.08-65.61 158.39C820.08 904.7 763.83 928 704 928zM448 320H128c-17.67 0-32-14.33-32-32s14.33-32 32-32h320c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M288 480c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32s32 14.33 32 32v320c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-40" viewBox="0 0 1024 1024"><path d="M960 992c-8.19 0-16.38-3.12-22.63-9.37L770.92 816.17c-11.18-11.18-29.1-12.5-41.68-3.08C656.87 867.33 570.68 896 480 896c-56.17 0-110.67-10.99-161.97-32.68-49.55-20.94-94.03-50.92-132.22-89.1-38.19-38.18-68.17-82.66-89.12-132.21C75 590.7 64 536.21 64 480.04c-0.01-109.51 42.18-212.9 118.8-291.12 76.5-78.1 178.76-122.43 287.94-124.81 56.83-1.25 112.12 8.72 164.32 29.62 50.42 20.18 95.8 49.65 134.89 87.57 39.05 37.89 69.84 82.31 91.51 132.03 22.44 51.49 34.06 106.38 34.53 163.17 0.47 56.35-10.15 111.11-31.57 162.76-6.77 16.32-25.49 24.07-41.82 17.3-16.32-6.77-24.07-25.49-17.3-41.82 18.11-43.66 27.09-90 26.69-137.71-0.79-95.14-38.65-183.85-106.61-249.79-68.04-66.03-157.99-101.24-253.24-99.15-92.36 2.02-178.88 39.53-243.62 105.62C163.69 299.89 127.99 387.37 128 480.03c0.01 94.08 36.61 182.48 103.06 248.93S385.92 832 480 832c76.73 0 149.65-24.25 210.86-70.12a95.734 95.734 0 0 1 64.38-18.85 96.058 96.058 0 0 1 60.93 27.89l166.45 166.45c12.5 12.5 12.5 32.76 0 45.25-6.24 6.26-14.43 9.38-22.62 9.38z"  ></path></symbol><symbol id="qcw-QCW-02-35" viewBox="0 0 1024 1024"><path d="M729.22 915.63c-10.08-0.01-20-2.48-28.91-7.19l-188.29-98.99-188.29 98.99c-30.3 15.94-67.79 4.3-83.73-26a62.018 62.018 0 0 1-6.23-39.36l35.97-209.66L117.4 484.93c-24.52-23.9-25.02-63.15-1.13-87.67 9.52-9.77 22-16.12 35.5-18.08l210.52-30.59 94.14-190.76c15.15-30.7 52.32-43.31 83.03-28.16a61.937 61.937 0 0 1 28.16 28.16l94.14 190.74 210.52 30.59c33.88 4.92 57.37 36.37 52.45 70.25a61.998 61.998 0 0 1-18.08 35.5L754.3 633.39l35.97 209.66c5.75 33.82-17.01 65.91-50.83 71.65-3.38 0.57-6.8 0.87-10.22 0.88v0.05z"  ></path></symbol><symbol id="qcw-QCW-02-39" viewBox="0 0 1024 1024"><path d="M480 427.49V416c0-25.88-10.14-50.14-28.56-68.32-18.42-18.18-42.78-27.99-68.7-27.67-52.24 0.68-94.74 44.17-94.74 96.94V448h64v-31.05c0-17.94 14.16-32.73 31.57-32.95 8.65-0.1 16.78 3.16 22.91 9.22 6.14 6.06 9.52 14.15 9.52 22.78v11.49c0 6.71-2.06 13.14-5.96 18.6L288 616.95V704h192v-64H350.18l111.94-156.71c11.7-16.38 17.88-35.67 17.88-55.8zM736 576h-32v-96h-64v96h-40.98l78.77-256h-66.96l-98.46 320H640v64h64v-64h32z"  ></path><path d="M511.5 960.5c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.35 631.64 63.5 572.97 63.5 512.5v-0.42c0.06-17.63 14.36-31.9 32-31.9H192c17.67 0 32 14.33 32 32s-14.33 32-32 32h-63.22c7.35 90.62 46.18 174.84 111.19 239.84C312.5 856.56 408.93 896.5 511.5 896.5s199-39.94 271.53-112.47C855.56 711.5 895.5 615.07 895.5 512.5s-39.94-199-112.47-271.53C710.5 168.44 614.07 128.5 511.5 128.5c-102.57 0-199 39.94-271.53 112.47-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25 41.13-41.13 89.04-73.43 142.39-96C392.36 76.35 451.03 64.5 511.5 64.5s119.14 11.85 174.39 35.22c53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39 23.37 55.25 35.22 113.93 35.22 174.39s-11.85 119.14-35.22 174.39c-22.57 53.35-54.86 101.26-96 142.39-41.13 41.13-89.04 73.43-142.39 96-55.25 23.37-113.92 35.22-174.39 35.22z"  ></path><path d="M512 224c-17.67 0-32-14.33-32-32V96c0-17.67 14.33-32 32-32s32 14.33 32 32v96c0 17.67-14.33 32-32 32zM512 960c-17.67 0-32-14.33-32-32v-96c0-17.67 14.33-32 32-32s32 14.33 32 32v96c0 17.67-14.33 32-32 32zM928 544h-96c-17.67 0-32-14.33-32-32s14.33-32 32-32h96c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-QCW-01-57" viewBox="0 0 1024 1024"><path d="M885.28 436.48c-1.53 0-3.08-0.11-4.64-0.34l-221.43-32.17a64.008 64.008 0 0 1-48.19-35.01L512 168.31l-99.03 200.65a64.008 64.008 0 0 1-48.19 35.01l-221.43 32.18c-17.5 2.54-33.73-9.58-36.27-27.07s9.58-33.73 27.07-36.27l221.43-32.18 99.03-200.65c10.86-22.01 32.85-35.68 57.39-35.68s46.53 13.67 57.39 35.68l99.03 200.65 221.43 32.18c17.49 2.54 29.61 18.78 27.07 36.27-2.32 15.92-16 27.4-31.64 27.4zM739.89 933.57c-10.17 0-20.39-2.45-29.84-7.42L512 822.03 313.95 926.15c-21.72 11.42-47.55 9.55-67.4-4.87-19.85-14.42-29.61-38.41-25.46-62.6l37.83-220.53-73.08-71.24c-12.66-12.34-12.91-32.6-0.58-45.25 12.34-12.65 32.6-12.91 45.25-0.58l73.08 71.24A63.99 63.99 0 0 1 322 648.97L284.17 869.5l198.05-104.12c18.65-9.8 40.92-9.8 59.56 0L739.83 869.5l-37.82-220.53a63.99 63.99 0 0 1 18.41-56.65l73.08-71.24c12.66-12.33 32.91-12.08 45.25 0.58 12.34 12.66 12.08 32.92-0.58 45.25l-73.08 71.24 37.83 220.53c4.15 24.19-5.61 48.17-25.46 62.6-11.23 8.15-24.35 12.29-37.57 12.29z"  ></path></symbol><symbol id="qcw-QCW-03-21" viewBox="0 0 1024 1024"><path d="M672 96H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.38-114.62-256-256-256zM323.85 297.76c28.53 0 51.64 20.79 51.64 46.67 0 25.65-23.11 46.44-51.64 46.44-28.75 0-51.64-20.9-51.75-46.44 0-25.77 23-46.67 51.75-46.67z m43.02 280.64c-13.6 42.68-9.95 26.87-64.36 145.52L224 674.61s87.69-80.39 105.49-117.1c19.24-38.81-20.9-59.49-20.9-59.49l-60.38-37.6 32.73-50.53c45.33 33.95 48.76 36.82 79.28 67.67 23.79 24.21 20.69 57.5 6.65 100.84z m427.27 55.52c-15.26 144.86-202.25 90.9-202.25 90.9l10.06-41.47 43.35 9.4c80.06 4.98 72.32-65.35 72.32-65.35V422.38c0.55-77.85-72.76-86.03-204.35-38.48l30.74 8.41c-2.65 8.95-12.5 23.22-25.21 38.81h175.82v35.83h-98.86v44.9h98.53v35.94h-98.53v75.08c14.71-4.98 28.53-11.61 40.25-20.68l-8.62-32.62 46.44-14.71 38.82 95.54-57.28 24.22-10.17-38.26c-25.65 19.79-78.95 48.54-171.84 46-99.41 2.54-73.75-112.79-73.75-112.79l2.54-1.44h69.77c-0.33 14.93-6.41 38.92 1.77 52.19 6.85 10.84 24.11 12.72 35.27 13.27l3.87 0.11v-85.92H411.76v-35.83h101.07v-44.9h-25.88c-22.67 24.22-43.57 44.45-43.57 44.45l-30.52-26.98c21.67-23 43.24-59.49 56.73-83.82-10.84 4.42-22 9.18-33.61 14.38-11.06 14.37-24.11 29.19-38.59 43.79 0.55 0.88-50.09-28.53-50.09-28.53 52.19-44.78 81.49-140.99 81.49-140.99l72.43 20.57s-5.86 14.05-18.36 35.83c290.27-82.71 307.41 50.87 307.41 50.87s19.02 92.44 3.87 237.3z"  ></path></symbol><symbol id="qcw-QCW-03-24" viewBox="0 0 1024 1024"><path d="M672 96H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.38-114.62-256-256-256z m48 373l-0.59 0.05c-40.95 0-80.78-13.31-113.54-37.93v171.75c0 87.71-67.57 158.74-150.94 158.74s-150.94-71.03-150.94-158.74c0-87.7 67.57-158.74 150.94-158.74 8.34 0 16.43 0.73 24.33 2.1v90.97a64.6 64.6 0 0 0-23.7-4.48c-37.2 0-67.37 31.69-67.37 70.84 0 39.1 30.18 70.84 67.37 70.84 37.15 0 67.33-31.74 67.33-70.84V262.39h84.19c0 65.57 50.56 118.71 112.91 118.71V469h0.01z"  ></path></symbol><symbol id="qcw-QCW-03-22" viewBox="0 0 1024 1024"><path d="M586.89 655.96c0.43-13.75 6.28-28.95 17.83-45.41 10.27-16.04 24.95-32.08 39.64-49.49 22.75-26.31 78.85-87.34 97.95-125.2 3.56-7.13 5.86-13.83 6.71-19.61 2.21-33.87-41-47.19-105.08-65.02l-12.48 7.55 24.19 19.52c-108.14 19.1-173.15 39.22-252.01 66.8l11.12 28.09L375.11 512c6.62 1.35 75.71 24.53 146.93-25.38l1.27-1.27c-2.21-3.56-6.71-7.56-12.9-12.48 21.39 1.36 34.29 20.03 32.08 39.22h-9.34c0.43-6.71-1.35-12.9-3.14-17.83-55.26 41-119.85 46.35-174.6 27.16v48.13c-27.16 9.34-73.5 38.71-73.5 66.8 1.78 13.75 8.4 18.68 15.11 22.24 60.61 34.29 224.42-12.48 224-12.48-58.74 30.31-117.05 54.32-203.46 57.89-114.42-2.21-130.88-78.43-77.92-157.71 51.18-80.21 131.82-151.51 260.5-196.92 37.35-13.33 92.18-28.01 145.15-29.37 76.14 0 150.06 22.75 145.14 96.25-3.57 56.61-82.76 134.11-125.54 191.15-18.76 24.53-21.81 41.42 9.76 39.22 90.09-5.75 174.39-32.06 253.34-63.29V352c0-141.38-114.62-256-256-256H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256v-79.72c-115.42 60.67-339.29 155.75-341.11 63.68z"  ></path></symbol><symbol id="qcw-QCW-03-25" viewBox="0 0 1024 1024"><path d="M453.91 443.23c37.97 0 68.86-30.89 68.86-68.86s-30.89-68.87-68.86-68.87-68.87 30.89-68.87 68.87 30.9 68.86 68.87 68.86zM634.09 443.35c28.1 0 50.96-22.86 50.96-50.96s-22.86-50.96-50.96-50.96-50.96 22.86-50.96 50.96 22.86 50.96 50.96 50.96zM337.65 700.46l82.73-47.76v-24.26l-82.72-47.76zM641.45 563.11H514.78c-24.76 0-44.9 20.14-44.9 44.9v65.59c0 24.76 20.14 44.9 44.9 44.9h126.67c24.76 0 44.9-20.14 44.9-44.9v-65.59c0-24.76-20.15-44.9-44.9-44.9z"  ></path><path d="M672 96H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.38-114.62-256-256-256zM453.91 256c47.14 0 87.93 27.71 106.95 67.69 18.34-19.54 44.38-31.76 73.23-31.76 55.39 0 100.46 45.07 100.46 100.46s-45.06 100.46-100.46 100.46c-36.03 0-67.68-19.07-85.42-47.64-21.61 28.83-56.04 47.52-94.76 47.52-65.27 0-118.36-53.1-118.36-118.36S388.64 256 453.91 256z m281.93 417.6c0 52.05-42.35 94.4-94.4 94.4H514.78c-40.51 0-75.13-25.65-88.5-61.55l-65.07 37.57c-7.62 4.4-15.99 6.6-24.35 6.6-8.36 0-16.72-2.2-24.35-6.6-15.25-8.8-24.35-24.57-24.35-42.17V579.3c0-17.6 9.1-33.37 24.35-42.17s33.45-8.8 48.7 0l65.22 37.65c13.47-35.7 47.99-61.17 88.35-61.17h126.67c52.05 0 94.4 42.35 94.4 94.4v65.59h-0.01z"  ></path></symbol><symbol id="qcw-QCW-03-23" viewBox="0 0 1024 1024"><path d="M672 96H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.38-114.62-256-256-256z m-56.6 637.42c-4.33 0-8.5 0.28-12.54-0.11-1.13-0.11-2.65-2.02-2.98-3.43-3.04-11.81-5.57-23.85-8.89-35.61-1.24-4.61-3.6-9.06-6.3-13.05-4.05-6.13-10.91-6.92-15.47-1.18-4.44 5.51-8.38 11.76-11.14 18.34-3.99 9.56-6.92 19.63-9.73 29.7-1.18 4.16-2.65 6.3-7.2 5.57-2.59-0.4-5.34-0.06-8.55-0.06 0.68-17.21 1.24-33.87 1.91-52.09-4.05 2.02-7.14 3.04-9.51 4.84-5.46 4.39-10.86 8.94-15.75 13.9-8.94 9.11-17.61 18.56-26.27 28.01-5.46 5.91-7.37 6.52-16.76 4.33 11.08-18.85 22.11-37.52 33.47-56.59-10.91-3.15-20.42-7.48-24.47-18.68-2.59-6.97-2.19-13.84 0.67-21.04 0.68 2.42 1.18 4.95 1.91 7.37 3.66 12.54 14.68 19.07 27.11 15.3 3.21-1.01 6.75-3.66 8.55-6.52 10.91-17.61 21.43-35.44 31.78-53.33 1.91-3.26 3.83-3.88 7.37-3.26 17.1 2.7 34.2 5.23 51.42 0.73 3.77-1.01 7.37-2.59 11.36-3.99l0.01 140.85z m183.22-350.53c-2.31 21.1-10.91 40.5-19.29 59.69-2.25 5.06-8.1 9.11-13.11 12.09-12.83 7.48-27.12 11.36-41.63 14.12-40.9 7.82-81.06 4.33-120.16-9.73-23.23-8.33-41.97-23.52-59.01-40.9-1.8-1.8-3.21-4.22-5.4-5.23-2.31-1.12-5.96-2.02-7.6-0.9-1.69 1.18-2.7 5.06-2.25 7.37 0.62 2.76 2.7 5.51 4.72 7.7 24.75 26.78 54.9 44.72 90.4 52.94 42.42 9.79 84.67 9.28 126.29-4.56 2.36-0.79 4.72-1.69 7.03-2.76 2.25-1.01 4.44-2.25 7.54-2.76-4.61 6.69-8.94 13.5-13.73 20.03-32.29 43.32-73.75 73.81-126.01 89.05-33.36 9.73-66.72 8.32-99.91 0.28-55.41-13.5-106.32-36.79-150.2-73.92-13.67-11.53-26.55-24.02-35.55-39.71-3.49-6.02-6.41-12.6-8.1-19.24-1.29-5.46-3.49-8.89-8.04-10.29 0.9 11.87 2.25 23.85 2.7 35.78 0.84 22.22-7.93 39.88-25.99 52.82-13.9 9.96-29.14 17.21-45.79 21.15-19.46 4.56-35.66-11.42-30.6-30.77 2.87-11.03 6.58-22.28 12.32-32.01 14.29-24.08 23.06-50.18 30.21-76.95 1.29-5.01 3.09-9.96 5.35-14.63 3.88-8.1 12.71-12.26 21.21-9.73 6.13 1.86 12.09 4.44 17.77 7.48 9.06 4.72 17.89 10.12 26.78 15.24 5.45-5.85 10.69-12.04 16.37-17.66 19.91-19.74 44.44-32.29 69.47-43.88 39.21-18.12 79.54-33.47 121.96-42.3 19.63-4.05 39.72-6.69 59.74-8.21 23.91-1.8 47.93-2.7 71.84-2.08 31.05 0.73 61.65 4.84 90.01 19.13 15.3 7.71 28.13 18.34 30.88 35.78 1.91 12.21 1.18 25.14-0.22 37.57z"  ></path><path d="M763.35 310.49c-11.08-5.18-23.06-6.64-35.27-6.69-6.41 0.62-12.94 0.84-19.29 1.86-9.84 1.57-19.24 4.78-27.06 11.25-6.92 5.63-6.13 13.78 1.57 18.12 3.1 1.69 6.58 2.98 9.96 3.88 15.58 4.27 31.45 3.15 47.2 1.41 8.1-0.9 16.09-3.49 23.68-6.41 5.23-2.02 9.17-6.53 8.94-12.94-0.28-6.14-5.23-8.34-9.73-10.48zM543 345.88c-9.39 0.06-16.43 6.53-16.48 14.96 0 8.27 7.26 14.79 16.6 14.85 9.34 0 16.6-6.58 16.6-14.85-0.07-8.21-7.72-15.02-16.72-14.96z"  ></path></symbol><symbol id="qcw-QCW-03-26" viewBox="0 0 1024 1024"><path d="M432.35 539.08a16.747 16.747 0 0 0-8.5-6.75l-18.56 0.05c-3.38 1.74-3.38 5.12-6.75 6.75-4.55-0.28-9.17 0.34-13.55 1.74-1.74 0-3.38 3.38-3.38 5.12v38.93c0 3.37 5.12 3.37 6.75 3.37h55.85c3.38 0 3.38-3.37 3.38-6.75v-39.1a25.575 25.575 0 0 0-15.24-3.36zM327.39 325.62c-1.74-1.74-1.74-6.75-1.74-10.13h-3.37c-1.41 4.39-4.44 8.05-8.5 10.13-4.39-1.41-8.05-4.44-10.12-8.5 0-1.74-1.74-1.74-3.38-1.74v0.06c0 5.12-1.74 8.49-1.74 13.56-1.74 5.12 5.12 11.87 0 16.93-3.38 8.5-6.75 15.24-10.12 22.05a7.172 7.172 0 0 0 0 8.5c1.74 3.38 6.75 1.74 10.12 1.74 3.38 1.74 5.12 3.37 8.49 3.37 3.38 0 5.12-1.74 8.5-1.74s6.75 1.74 8.49 0c1.74 0 3.38-1.74 6.75-3.38h8.44c3.38-1.74 3.38-6.75 1.74-10.13-5.46-5.45-10.01-11.76-13.56-18.67-5.12-6.76 3.37-15.25 0-22.05zM461.15 628.86l-3.38 3.38h6.75c-1.74-1.75-1.74-3.38-3.37-3.38zM313.89 589.93c6.75-1.74 8.5-8.49 10.12-13.55 0.73-6.47 3.71-12.49 8.5-16.93 1.74-1.74 3.38 1.74 3.38 3.38v28.8h3.32c0-10.13-1.74-22.05 3.38-32.18 2.87-5.12 4.05-11.08 3.38-16.93-1.91-5.01-5.51-9.17-10.13-11.87-3.38 5.12-8.49 8.5-10.12 13.56-5.12 8.5-6.75 18.67-13.56 27.06-10.12 3.38-23.68 3.38-32.17 13.56 9.88 6.85 22.42 8.7 33.9 5.1zM476.51 640.73c-13.61-9.84-32.57-6.81-42.41 6.75-4.39 6.25-7.82 13.05-10.13 20.31 1.74 0 5.12-1.74 6.75-1.74 5.12 0 10.12 1.74 13.56 0 3.77-1.69 8.1-1.69 11.87 0 0.28 9.11-0.28 18.22-1.74 27.22 0 3.38-5.12 3.38-6.75 3.38l-5.12-10.13c-1.74 1.74-3.38 1.74-3.38 3.38-0.73 5.96 2.81 11.59 8.49 13.56 6.36 1.97 13.17-1.63 15.13-7.99l0.17-0.51v-28.8c5.12-1.13 10.52-0.51 15.24 1.74a35.01 35.01 0 0 1 18.67 0 38.153 38.153 0 0 0-8.49-18.68c-3.2-3.77-7.31-6.69-11.86-8.49zM544.17 694.95h38.92c1.41-4.95 1.97-10.12 1.74-15.24v-25.43c0-1.74-3.38-1.74-5.12-1.74-12.99-0.34-25.99 0.22-38.93 1.74v35.55c0.02 1.75 0.02 5.12 3.39 5.12zM495.01 445.88c-3.38-3.38-3.38-6.75-5.12-10.12-6.75 5.12-6.75 15.24-8.5 25.43h16.99l-5.12 10.12 15.24-5.12c-1.74-5.12-1.74-11.87-3.38-16.93-3.36-1.75-6.73-1.75-10.11-3.38zM701.79 322.24h10.09c0-0.01 0.01-0.02 0.02-0.03-1.73-3.38-1.74-8.46-5.1-10.09-5.06-5.18-11.87-3.43-16.88-3.43 1.46 6.24 5.91 11.3 11.87 13.55z"  ></path><path d="M711.88 322.24c-0.01 0.02-0.02 0.04-0.03 0.05 3.38 0 8.5 0 10.12-1.74 2.08-2.59 3.83-5.46 5.12-8.5-3.43-0.28-6.92 0.34-10.12 1.74-2.06 2.56-3.73 5.4-5.08 8.4 0 0.01 0.01 0.02 0.01 0.03h-0.02v0.02zM298.48 444.25c-3.49-2.08-6.92-4.33-10.13-6.75-1.57-5.8-6.08-10.35-11.87-11.87-4.95 0.11-9.68 1.91-13.56 5.06-1.29 3.04-3.04 5.91-5.12 8.5a8.834 8.834 0 0 1-6.75 3.38c-4.56 3.71-7.09 9.34-6.75 15.19a28.9 28.9 0 0 0 0 16.93c0.51 5.12 5.01 8.89 10.13 8.49h38.93c3.15-0.05 6.19-1.24 8.49-3.38 3.38-3.37 1.74-10.12 1.74-15.24a70.162 70.162 0 0 0-5.11-20.31z m-35.56-5.07c3.38-3.38 5.12-6.75 8.5-8.5h-0.06c5.12-1.74 10.13 3.38 11.87 8.5h-20.31zM706.85 325.67C691.16 328.2 680.47 343 683 358.69c0.06 0.28 0.11 0.62 0.17 0.9 2.31 14.68 15.64 25.03 30.43 23.68 7.76-0.9 14.91-4.5 20.31-10.13 6.69-8.66 8.61-20.13 5.12-30.54-6.19-11.81-19.02-18.56-32.18-16.93zM393.43 339.17v40.67a206.87 206.87 0 0 0 45.73 0 328.5 328.5 0 0 0 0-40.67c1.74 0 3.38 1.74 5.12 1.74 3.77-3.82 6.69-8.44 8.49-13.55-8.49-1.74-16.93-6.75-25.42-8.5-1.8 5.06-6.52 8.44-11.87 8.5-5.12 0-8.5-5.12-10.12-8.5-8.33 2.36-16.26 5.74-23.68 10.13l-0.11 0.05c1.86 4.16 4.16 8.16 6.75 11.87 1.73 0 3.36-1.74 5.11-1.74zM544.12 445.88c-4.61-0.22-9.17 0.34-13.56 1.74-1.74 6.75-1.74 13.56-3.38 20.31 6.75-1.74 11.87-1.74 18.68-3.38 0-6.75-1.74-13.55-1.74-18.67zM600.14 586.56c1.74 3.37 1.74 8.49 3.38 11.87h18.67c1.35-3.88 2.47-7.87 3.38-11.87-6.81 5.12-16.93 3.43-25.43 0zM547.55 647.65h37.29c-3.38-5.12-8.49-6.75-11.87-10.13-5.12-3.37-8.5-6.75-11.87-8.49l0.06-0.11c-1.75 1.74-1.75 5.12-5.12 5.12-5.12 3.37-10.12 8.49-15.24 11.87 1.97 1.34 4.39 1.96 6.75 1.74zM740.77 481.54c4.84 3.77 9.9 7.14 15.24 10.13 1.41-4.39 1.97-8.95 1.74-13.56 5.91-3.54 11.59-7.54 16.93-11.87 5.12 1.74 8.5 6.75 11.87 8.49 1.74 0 5.12 0 5.12-1.74-0.34-4.16-1.46-8.15-3.38-11.87 2.14-3.6 3.26-7.71 3.38-11.87 0-3.38-3.38-5.12-6.75-3.38-3.6 1.91-6.58 4.89-8.5 8.5-6.75-3.38-11.87-8.5-18.67-11.87v-13.55c-8.5 0-13.56 6.75-18.68 10.12l-0.06 0.05c-11.14 1.41-20.7 8.5-25.42 18.68-1.74 6.75 5.12 10.12 8.49 15.24 5.3 4.51 11.77 7.43 18.69 8.5zM689.92 594.94h38.92c3.38 0 6.75 1.74 8.49-1.74 1.41-3.2 1.97-6.69 1.74-10.12 3.38-1.74 5.12-1.74 8.5-3.38 5.34-3.88 6.81-11.25 3.38-16.93-3.38-4.33-8.16-7.37-13.56-8.49v-11.81H684.8v49.11c0 1.73 3.38 3.36 5.12 3.36zM733.96 534.08c1.74-3.38 0-6.75 0-10.13h-5.12c-1.74 3.38 0 6.75 0 10.13 0 1.74 5.12 1.74 5.12 0zM689.92 524.01v11.81c1.74 0 3.38 1.74 5.12 1.74-1.75-5.11 3.37-13.55-5.12-13.55zM708.54 535.76h5.06c1.74-3.38 0-5.12 0-8.49 3.38-5.12-3.38-3.38-5.12-5.12l0.06 0.05v13.56zM608.47 361.22c3.38 3.37 1.74 8.49 1.74 11.87a51.028 51.028 0 0 0-13.56 6.75h30.54c-5.12-1.74-8.5-5.12-13.56-6.75 0-3.38-1.74-10.12 1.74-11.87a49.872 49.872 0 0 0 16.93-20.31c3.38-8.49 0-16.93-1.74-25.43h-39.04a43.55 43.55 0 0 0 0 25.43c3.39 8.5 11.89 13.56 16.95 20.31z"  ></path><path d="M672 96H352C210.62 96 96 210.62 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.38-114.62-256-256-256z m-7.56 160.2h0.06l35.55 25.43c28.8 20.31 55.86 38.93 84.66 59.35l15.24 10.12c-45.73 32.18-89.78 64.35-135.51 98.27V256.2z m-243.96 35.55l86.4 60.97c-3.15 1.8-6.02 4.11-8.5 6.75-42.36 28.8-84.66 59.34-128.75 88.14C368 384.9 368 320.55 368 256.2c16.93 11.87 33.92 23.68 52.48 35.55z m118.58 133.82c1.74 0 1.74-1.74 3.38-3.38 4.67-9.9 8.66-20.08 11.87-30.54 8.49 5.12 15.24 11.87 23.68 16.93l-5.12 5.12c-5.12 5.12-11.87 8.5-16.93 13.56h22.05c1.74 5.12 3.37 11.87 5.12 16.93h-13.44c-1.74 6.75-3.38 13.55-5.12 22.05 6.41 0.9 12.66 2.64 18.67 5.12 3.26 5.18 5.57 10.92 6.75 16.93-6.75 1.74-15.24 1.74-22.05 3.38l-5.12 35.55a52.405 52.405 0 0 1-11.87 8.5c-3.38-15.24-5.12-30.55-8.5-45.73-5.17 0.28-10.29-0.34-15.24-1.74-3.38 11.87-5.12 25.43-8.49 37.3-3.38 5.12-8.5 5.12-13.56 8.49 0.28-14.68-0.28-29.42-1.74-44.04-3.49 0.22-6.97-0.34-10.12-1.74-1.74-5.12-3.38-8.49-5.12-13.55-6.75 6.75-5.12 16.93-6.75 25.43-1.74 11.87-3.37 23.68-5.12 33.92a279.187 279.187 0 0 1-27.06-20.31c5.12-1.74 11.87-3.38 16.93-5.12-1.74-8.49-1.74-16.93-3.37-25.43-3.38 1.74-6.75 5.12-10.13 6.75-3.38-8.5-5.12-18.67-8.49-27.06 6.36-0.17 12.66-1.29 18.67-3.38 0-6.75-1.74-11.87-1.74-18.67-1.74 0-3.38-1.74-5.12-1.74-3.77-5.4-7.14-11.08-10.13-16.93 4.72-0.11 9.34-1.29 13.56-3.37l0.05 0.05c6.75-8.49 8.5-18.67 13.56-27.06 4.67 8.16 8.6 16.65 11.87 25.42 3.38 0 6.75 1.74 11.87 1.74V429c5.12-1.74 10.12-1.74 16.93-3.38-3.38-11.87-8.49-23.68-11.87-33.92 11.87 5.12 22.05 8.49 32.17 13.55-3.38 6.75-5.12 15.25-8.49 23.68 5.12-1.73 10.12-1.73 13.56-3.36zM224 364.59c44.04 32.18 86.4 62.72 130.44 94.89 1.74 0 0 1.74 0 1.74-44.04 30.43-86.4 62.66-130.44 93.09V364.59z m133.87 296.5c-27.05-18.68-52.48-38.93-79.65-59.35-18.68-13.5-37.3-25.37-54.23-38.93 44.04-30.54 88.14-62.72 133.87-93.15v191.43h0.01z m0-211.84c-28.8-20.31-55.85-42.36-84.66-62.72-16.93-11.87-32.18-23.68-49.11-35.55 38.92-27.06 76.28-54.22 115.2-81.28h-0.11c5.79-5.06 12.04-9.56 18.67-13.56l0.01 193.11zM368 469.67c27.06 18.67 52.48 37.29 77.91 57.6 16.93 13.55 35.55 25.43 52.48 38.92-43.99 32.17-88.03 64.4-130.39 96.58v-193.1z m140.63 296.38c-32.18-22.05-62.72-45.73-94.89-67.73-13.56-10.12-28.8-20.31-40.67-28.8h0.05c45.73-32.18 89.78-64.35 135.51-94.89v101.64c1.74 30.55 0 60.98 0 89.78z m10.12 1.8c-1.69-66.09-1.69-130.45-1.69-193.05l0.05-0.11c45.73 32.18 89.78 62.72 135.51 94.89-44.04 32.18-89.77 66.1-133.87 98.27zM656 662.78l-40.67-30.54c-30.52-22.03-60.93-45.69-91.45-66.05l-0.01 0.01-0.06-0.06c0.02 0.02 0.05 0.03 0.07 0.05L656 469.67v193.11z m0-215.1c-45.73-30.6-93.15-62.77-138.88-93.2h-0.05c45.79-33.92 93.26-66.09 138.94-98.27v191.47H656z m72.84 165.99c-20.31 15.24-42.36 30.55-62.72 45.73-1.69-62.72-1.69-127.13-1.69-191.48l0.06 0.06c45.73 32.12 89.78 62.66 135.51 94.84l-71.16 50.85zM800 554.38c-44.04-32.23-86.4-62.78-130.44-94.95 0 0-1.74-1.74 0-1.74v0.11c44.04-32.18 86.4-62.72 130.44-94.89v191.47z"  ></path><path d="M601.78 581.5a20.861 20.861 0 0 0 25.42-3.37c8.49-7.14 9.62-19.8 2.47-28.3-2.03-2.47-4.67-4.39-7.59-5.62-5.12-3.38-10.12-1.74-15.24-1.74l0.06 0.06a23.872 23.872 0 0 0-15.24 13.55c-2.71 9.78 1.45 20.19 10.12 25.42zM627.2 539.14c-1.74-3.38-1.74-8.5-3.38-11.87h-20.31c-1.74 3.37-1.74 8.49-3.38 11.87 3.38-1.74 6.75-1.74 10.12-3.38 5.87-1.34 12.06-0.11 16.95 3.38z"  ></path></symbol><symbol id="qcw-QCW-03-27" viewBox="0 0 1024 1024"><path d="M513.49 272.04c-48.45 0.05-87.72 39.31-87.77 87.77h175.53c-0.04-48.45-39.3-87.72-87.76-87.77zM585.35 578.86a56.028 56.028 0 0 0-19.75-19.84c-10.67-6.26-22.15-11-34.13-14.08l-30.16-8.53a67.818 67.818 0 0 1-27.52-12.8c-4.41-4.11-6.9-9.88-6.87-15.91 0.18-9.9 5.99-18.83 14.98-23a81.843 81.843 0 0 1 40.7-8.53c17.02 0.18 33.89 3.06 50 8.53l7.08-26.54a212.63 212.63 0 0 0-56.7-8.53c-22.24-1.07-44.3 4.5-63.36 16a49.66 49.66 0 0 0-23.89 43.35 49.237 49.237 0 0 0 5.16 22.7 49.275 49.275 0 0 0 15.1 17.41c6.47 4.8 13.68 8.53 21.33 11.05 7.71 2.47 19.73 6.21 36.05 11.22a99.233 99.233 0 0 1 38.4 17.92c5.23 5.16 8.17 12.2 8.19 19.54a29.444 29.444 0 0 1-16.51 26.03 82.873 82.873 0 0 1-42.67 9.81c-19.66 0.13-39.1-4.16-56.88-12.54l-6.06 27.35a152.806 152.806 0 0 0 64 11.73c22.76 0.92 45.24-5.2 64.38-17.54a55.042 55.042 0 0 0 25.69-47.74 54.08 54.08 0 0 0-6.56-27.06z"  ></path><path d="M672 96H352C210.62 96 96 210.61 96 352v320c0 141.38 114.62 256 256 256h320c141.38 0 256-114.62 256-256V352c0-141.39-114.62-256-256-256z m69.12 617.94c-1.69 26.4-23.6 46.94-50.05 46.93H336.34c-26.45 0.01-48.36-20.54-50.05-46.93l-22.14-354.13h136.53c0.07-62.27 50.54-112.74 112.81-112.81 62.27 0.07 112.74 50.54 112.81 112.81h136.96l-22.14 354.13z"  ></path></symbol><symbol id="qcw-QCW-02-44" viewBox="0 0 1024 1024"><path d="M928 640H96c-17.67 0-32-14.33-32-32V416c0-17.67 14.33-32 32-32h832c17.67 0 32 14.33 32 32v192c0 17.67-14.33 32-32 32z" fill="#F1D09A" ></path><path d="M352 640H96c-17.67 0-32-14.33-32-32V416c0-17.67 14.33-32 32-32h384v128c0 70.69-57.31 128-128 128z" fill="#5B2F1A" ></path><path d="M249.53 576h28l22.57-128h-28zM422.17 494c4.48-25.4-12.48-46-37.89-46h-64l-4.94 28-6.34 36-4.94 28-6.35 36h28l6.35-36h36c25.41 0 49.63-20.6 54.11-46zM373 512h-36l6.35-36h36c9.94 0 16.58 8.06 14.83 18-1.76 9.94-11.24 18-21.18 18zM175.72 541.97L158.08 448h-29.8l24.02 128h34.83l69.15-128h-29.79z" fill="#F6DCB5" ></path><path d="M607.26 486.9c0 8.25-3.48 19.45-10.43 33.59l-26.7 54.45H545.2l26.17-51.98c-2.59 1.06-5.72 1.59-9.37 1.59-8.96 0-16.74-3.42-23.34-10.25-6.6-6.83-9.9-15.85-9.9-27.05 0-12.14 3.68-21.72 11.05-28.73 7.36-7.01 16.77-10.52 28.2-10.52s20.83 3.45 28.2 10.34c7.36 6.9 11.05 16.42 11.05 28.56z m-27.5 13.61c3.01-3.3 4.51-7.78 4.51-13.44 0-5.66-1.5-10.14-4.51-13.44-3.01-3.3-6.93-4.95-11.76-4.95s-8.75 1.65-11.76 4.95c-3.01 3.3-4.51 7.78-4.51 13.44 0 5.54 1.5 9.99 4.51 13.35s6.92 5.04 11.76 5.04 8.76-1.65 11.76-4.95zM654.11 574.94h-26.34v-26.17h26.34v26.17zM754.52 538.34c0 11.79-3.8 21.01-11.4 27.67-7.6 6.66-17.24 9.99-28.91 9.99s-21.3-3.33-28.91-9.99c-7.6-6.66-11.4-15.88-11.4-27.67 0-11.9 5.24-21.33 15.74-28.29-9.43-6.6-14.14-15.32-14.14-26.17 0-10.84 3.74-19.54 11.23-26.08 7.48-6.54 16.65-9.81 27.49-9.81s19.98 3.27 27.4 9.81c7.43 6.54 11.14 15.23 11.14 26.08 0 10.85-4.72 19.57-14.14 26.17 10.6 7.08 15.9 16.51 15.9 28.29z m-28.02 11.94c3.36-3.36 5.04-7.45 5.04-12.29 0-4.83-1.68-8.96-5.04-12.38-3.36-3.42-7.46-5.13-12.29-5.13-4.83 0-8.93 1.71-12.29 5.13-3.36 3.42-5.04 7.54-5.04 12.38 0 4.83 1.68 8.93 5.04 12.29 3.36 3.36 7.45 5.04 12.29 5.04 4.84-0.01 8.93-1.68 12.29-5.04z m3.27-65.68c0-4.48-1.47-8.25-4.42-11.31-2.95-3.06-6.66-4.6-11.14-4.6s-8.22 1.53-11.23 4.6c-3.01 3.07-4.51 6.84-4.51 11.31 0 4.6 1.5 8.4 4.51 11.4 3.01 3.01 6.75 4.51 11.23 4.51s8.19-1.5 11.14-4.51c2.95-3.01 4.42-6.81 4.42-11.4z" fill="#5B2F1A" ></path><path d="M793 573.94l-3.3-13.61c4.03 0.55 7.84 0.82 11.41 0.82 3.21 0 4.81-1.69 4.81-5.09v-27.77c-6.14 2.02-11.82 3.8-17.05 5.36l-3.57-14.57c6.6-1.28 13.47-3.02 20.62-5.22v-28.05h-17.87v-13.89h17.87v-23.51h14.16v23.51h15.4v13.89h-15.4v22.96c5.13-2.11 10.45-4.54 15.95-7.29v14.57c-3.48 1.65-8.8 3.94-15.95 6.87v36.71c0 9.53-4.63 14.3-13.89 14.3H793z m115.22-113.02c-15.49 5.04-32.95 8.11-52.38 9.21v21.04h55.41v13.89h-19.39V576h-14.44v-70.94h-21.59v3.3c-0.82 27.77-7.61 50.09-20.35 66.96l-10.31-10.86c10.26-13.38 15.81-32.08 16.64-56.09v-50.18c22.46-0.55 42.21-3.94 59.26-10.17l7.15 12.9z" fill="#5B2F1A" ></path></symbol><symbol id="qcw-QCW-02-43" viewBox="0 0 1024 1024"><path d="M64 369.45h855.27v162.91c0 67.48-54.7 122.18-122.18 122.18H64V369.45z" fill="#784925" ></path><path d="M214.51 572.19H187.3l-22.23-123.9h25.44l15.72 93.73 51.3-93.73h25.27l-68.29 123.9zM266.91 572.19l25.95-123.9h25.44l-25.86 123.9h-25.53zM341.53 572.19h-25.52l25.95-123.9h50.37c8.96 0 16.04 1.06 21.26 3.17 5.21 2.11 9.34 5.61 12.38 10.48 3.04 4.87 4.56 10.69 4.56 17.45 0 6.25-1.21 12.34-3.63 18.26-2.42 5.92-5.4 10.65-8.92 14.2-3.52 3.55-7.31 6.24-11.37 8.07s-9.52 3.23-16.4 4.18c-4 0.56-11.49 0.85-22.48 0.85h-16.31l-9.89 47.24z m14.12-67.78h7.86c13.47 0 22.45-0.85 26.96-2.54 4.51-1.69 8.06-4.39 10.65-8.11 2.59-3.72 3.89-7.8 3.89-12.25 0-2.99-0.66-5.44-1.99-7.35-1.32-1.91-3.18-3.31-5.58-4.18-2.4-0.87-7.73-1.31-16.02-1.31h-18.26l-7.51 35.74z" fill="#FFE0B6" ></path><path d="M960 410.18h-40.73v-40.73" fill="#33180D" ></path></symbol><symbol id="qcw-QCW-02-42" viewBox="0 0 1024 1024"><path d="M64 261.12h824.32v286.72c0 118.76-96.28 215.04-215.04 215.04H64V261.12z" fill="#784925" ></path><path d="M328.9 617.94H281l-39.12-218.07h44.77l27.67 164.96 90.29-164.96h44.48L328.9 617.94zM421.13 617.94l45.67-218.07h44.77l-45.52 218.07h-44.92zM552.47 617.94h-44.92l45.67-218.07h88.65c15.77 0 28.24 1.86 37.41 5.58 9.17 3.72 16.44 9.87 21.79 18.44 5.35 8.58 8.03 18.82 8.03 30.72 0 11.01-2.13 21.72-6.4 32.13-4.27 10.41-9.5 18.74-15.69 24.99-6.2 6.25-12.87 10.98-20.01 14.21-7.14 3.22-16.76 5.68-28.86 7.36-7.04 0.99-20.23 1.49-39.57 1.49h-28.71l-17.39 83.15z m24.84-119.3h13.83c23.7 0 39.52-1.49 47.45-4.46 7.93-2.98 14.18-7.74 18.74-14.28 4.56-6.54 6.84-13.73 6.84-21.57 0-5.25-1.17-9.57-3.5-12.94-2.33-3.37-5.6-5.82-9.82-7.36-4.22-1.54-13.61-2.31-28.19-2.31h-32.13l-13.22 62.92z" fill="#FFE0B6" ></path><path d="M960 332.8h-71.68v-71.68" fill="#33180D" ></path></symbol><symbol id="qcw-QCW-01-78" viewBox="0 0 1024 1024"><path d="M512 882.75c-17.09 0-33.17-6.66-45.25-18.75L90.44 487.7c-20.1-20.1-24.5-51.49-10.69-76.34l139.13-250.44C230.17 140.61 251.6 128 274.83 128h474.34c23.23 0 44.66 12.61 55.95 32.92l59.13 106.44c13.8 24.85 9.41 56.24-10.69 76.34L512 685.25 265.37 438.63c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0L512 594.75l296.3-296.3L749.17 192H274.83L135.7 442.44 512 818.75l393.37-393.37c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L557.25 864c-12.08 12.09-28.16 18.75-45.25 18.75z"  ></path></symbol><symbol id="qcw-a-1-1-23" viewBox="0 0 1024 1024"><path d="M672 672H352c-17.67 0-32-14.33-32-32s14.33-32 32-32h320c17.67 0 32 14.33 32 32s-14.33 32-32 32zM672 544H352c-17.67 0-32-14.33-32-32s14.33-32 32-32h320c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.86-101.26 96-142.39s89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.33-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.92-29.01 92.07-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.99-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M512 768c-17.67 0-32-14.33-32-32V544c0-17.67 14.33-32 32-32s32 14.33 32 32v192c0 17.67-14.33 32-32 32zM512 452.45c-24.58 0-49.17-9.36-67.88-28.07l-82.75-82.75c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l82.75 82.75c12.48 12.48 32.78 12.48 45.25 0l82.75-82.75c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25l-82.75 82.75c-18.7 18.71-43.29 28.07-67.87 28.07z"  ></path></symbol><symbol id="qcw-a-1-2-01" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.86-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.33-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53S614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53S409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.92-29.01 92.07-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.99-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M512 781.25L308.35 577.61c-30.22-30.22-46.86-70.4-46.86-113.14 0-88.22 71.78-160 160-160 32.79 0 64.07 9.8 90.51 28.01 26.44-18.21 57.72-28.01 90.51-28.01 88.22 0 160 71.78 160 160 0 42.74-16.64 82.92-46.86 113.14L512 781.25z m-90.51-412.78c-52.93 0-96 43.07-96 96 0 25.64 9.99 49.75 28.12 67.88L512 690.75l158.39-158.39c18.13-18.13 28.12-42.24 28.12-67.88 0-52.93-43.07-96-96-96-25.64 0-49.75 9.99-67.88 28.12L512 419.22l-22.63-22.63c-18.13-18.13-42.24-28.12-67.88-28.12z"  ></path></symbol><symbol id="qcw-a-1-1-86" viewBox="0 0 1024 1024"><path d="M512 832c-51.83 0-102.12-10.16-149.48-30.19-45.73-19.34-86.79-47.03-122.05-82.28-35.25-35.26-62.94-76.32-82.28-122.05C138.16 550.12 128 499.83 128 448s10.16-102.12 30.19-149.48c19.34-45.73 47.03-86.79 82.28-122.05 35.26-35.25 76.32-62.94 122.05-82.28C409.88 74.16 460.17 64 512 64s102.12 10.16 149.48 30.19c45.73 19.34 86.79 47.03 122.05 82.28 35.25 35.26 62.94 76.32 82.28 122.05C885.84 345.88 896 396.17 896 448s-10.16 102.12-30.19 149.48c-19.34 45.73-47.03 86.79-82.28 122.05-35.26 35.25-76.32 62.94-122.05 82.28C614.12 821.84 563.83 832 512 832z m0-704c-85.48 0-165.83 33.29-226.27 93.73C225.29 282.17 192 362.52 192 448s33.29 165.83 93.73 226.27C346.17 734.71 426.52 768 512 768s165.83-33.29 226.27-93.73C798.71 613.83 832 533.48 832 448s-33.29-165.83-93.73-226.27C677.83 161.29 597.48 128 512 128z"  ></path><path d="M304.07 959.78a64.1 64.1 0 0 1-24.56-4.9c-24-9.94-39.51-33.15-39.51-59.13V704c0-17.67 14.33-32 32-32s32 14.33 32 32v191.75l121.37-121.37c12.5-12.5 32.76-12.5 45.26 0s12.5 32.76 0 45.25L349.25 941c-12.27 12.27-28.56 18.78-45.18 18.78z m-0.05-63.73z m-0.25-0.1zM719.93 959.78c-16.62 0-32.92-6.5-45.19-18.78L553.37 819.63c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.26 0L720 895.75V704c0-17.67 14.33-32 32-32s32 14.33 32 32v191.75c0 25.98-15.51 49.19-39.51 59.13a64.25 64.25 0 0 1-24.56 4.9z m0.3-63.83zM511.83 639.76h-0.14c-105.69-0.08-191.75-86.12-191.86-191.8-0.05-51.34 19.91-99.62 56.2-135.93 36.27-36.29 84.5-56.27 135.8-56.27h0.1c104.85 0.05 190.93 85.38 191.89 190.21 0.12 13.5-1.17 27.02-3.84 40.16-3.52 17.32-20.42 28.5-37.73 24.99-17.32-3.52-28.51-20.41-24.99-37.73 1.78-8.77 2.64-17.79 2.56-26.83-0.64-69.88-58.03-126.76-127.92-126.8h-0.07c-34.2 0-66.35 13.32-90.53 37.51-24.2 24.21-37.5 56.39-37.47 90.62 0.03 33.96 13.4 66.02 37.64 90.25s56.3 37.59 90.26 37.62h0.09c21.2 0 42.18-5.28 60.69-15.26 18.35-9.91 38.94-13.58 59.52-10.65 20.7 2.95 39.46 12.32 54.23 27.1l8.19 8.19c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.26 0L641 622.2c-10.08-10.08-25.39-12.24-38.1-5.38-27.8 15-59.3 22.93-91.07 22.94z"  ></path></symbol><symbol id="qcw-a-3-1-15" viewBox="0 0 1024 1024"><path d="M384 512h256l32 32h96l-96-96H352l-96 96h96z"  ></path><path d="M896.79 439.57c-34.41-39.35-79.82-67.09-129.91-79.76-5.52-59.25-31.25-114.23-73.86-156.83C644.67 154.63 580.38 128 512 128s-132.67 26.63-181.02 74.98c-42.61 42.61-68.34 97.58-73.86 156.83-50.09 12.68-95.5 40.41-129.91 79.76C86.45 486.19 64 546.01 64 608c0 68.38 26.63 132.67 74.98 181.02C187.33 837.37 251.62 864 320 864v-64c-105.87 0-192-86.13-192-192 0-46.49 16.83-91.35 47.39-126.3 30.29-34.64 71.89-57.27 117.16-63.74l27.76-3.97-0.29-28.04-0.02-1.11c0-0.28-0.01-0.56-0.01-0.84 0-105.87 86.13-192 192-192s192 86.13 192 192c0 0.28-0.01 0.56-0.01 0.84l-0.3 29.15 27.76 3.97c45.27 6.47 86.88 29.11 117.16 63.74C879.17 516.65 896 561.51 896 608c0 105.87-86.13 192-192 192H480c-52.93 0-96-43.07-96-96v-64h256v32H448l64 64h192V576H320v128c0 88.22 71.78 160 160 160h224c68.38 0 132.67-26.63 181.02-74.98C933.37 740.67 960 676.38 960 608c0-61.99-22.45-121.81-63.21-168.43z"  ></path></symbol><symbol id="qcw-a-1-1-100" viewBox="0 0 1024 1024"><path d="M928.97 960h-832c-17.67 0-32-14.33-32-32s14.33-32 32-32h832c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M160.97 960c-17.67 0-32-14.33-32-32V160c0-52.93 43.07-96 96-96h352c52.93 0 96 43.07 96 96v288c0 17.67-14.33 32-32 32s-32-14.33-32-32V160c0-17.64-14.36-32-32-32h-352c-17.64 0-32 14.36-32 32v768c0 17.67-14.33 32-32 32z"  ></path><path d="M864.97 480c-17.67 0-32-14.33-32-32v-43.6c0-38.45-22.84-73.09-58.18-88.24l-146.42-62.75c-16.24-6.96-23.77-25.77-16.81-42.02 6.96-16.24 25.77-23.77 42.02-16.81L800 257.34a159.815 159.815 0 0 1 96.97 147.06V448c0 17.67-14.33 32-32 32zM512.97 256h-224c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM512.97 384h-224c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM929 832H775.63c-19.48 0-36.89-11.63-44.35-29.63-7.46-18-3.37-38.53 10.41-52.31L883.75 608H769c-17.67 0-32-14.33-32-32s14.33-32 32-32h153.37c19.48 0 36.89 11.63 44.35 29.63 7.46 18 3.37 38.53-10.41 52.31L814.25 768H929c17.67 0 32 14.33 32 32s-14.33 32-32 32z m-6.63-224zM480 832c-17.67 0-32-14.33-32-32V576c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 17.67-14.33 32-32 32zM672 832c-17.67 0-32-14.33-32-32V576c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 17.67-14.33 32-32 32z"  ></path><path d="M672 720h-96c-17.67 0-32-14.33-32-32s14.33-32 32-32h96c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-a-2-1-02" viewBox="0 0 1024 1024"><path d="M729.22 915.63c-10.08-0.01-20-2.48-28.91-7.19l-188.29-98.99-188.29 98.99c-30.3 15.94-67.79 4.3-83.73-26a62.018 62.018 0 0 1-6.23-39.36l35.97-209.66L117.4 484.93c-24.52-23.9-25.02-63.15-1.13-87.67 9.52-9.77 22-16.12 35.5-18.08l210.52-30.59 94.14-190.76c15.15-30.7 52.32-43.31 83.03-28.16a61.937 61.937 0 0 1 28.16 28.16l94.14 190.74 210.52 30.59c33.88 4.92 57.37 36.37 52.45 70.25a61.998 61.998 0 0 1-18.08 35.5L754.3 633.39l35.97 209.66c5.75 33.82-17.01 65.91-50.83 71.65-3.38 0.57-6.8 0.87-10.22 0.88v0.05z"  ></path></symbol><symbol id="qcw-a-1-1-61" viewBox="0 0 1024 1024"><path d="M896 928c-8.19 0-16.38-3.12-22.63-9.37l-768-768c-12.5-12.5-12.5-32.76 0-45.26s32.76-12.5 45.25 0l768 768c12.5 12.5 12.5 32.76 0 45.26-6.24 6.25-14.43 9.37-22.62 9.37z"  ></path><path d="M448 928h-46.87c-21.45 0-41.35-10.65-53.25-28.5l-109-163.5H192c-52.93 0-96-43.07-96-96V384c0-52.93 43.07-96 96-96h46.87l16.1-24.15 53.25 35.5-16.1 24.15c-11.9 17.85-31.8 28.5-53.25 28.5H192c-17.65 0-32 14.36-32 32v256c0 17.64 14.35 32 32 32h46.87c21.45 0 41.35 10.65 53.25 28.5l109 163.5h46.87V480h64v384c0.01 35.29-28.7 64-63.99 64zM607.96 862.41c-16.25 0-30.17-12.33-31.8-28.84-1.75-17.59 11.09-33.26 28.68-35.01 52.15-5.18 101.92-24.6 143.94-56.16 14.13-10.61 34.19-7.76 44.8 6.37 10.61 14.13 7.76 34.19-6.37 44.8-51.38 38.59-112.25 62.34-176.05 68.67-1.07 0.12-2.14 0.17-3.2 0.17zM607.97 700.8c-14.91 0-28.25-10.47-31.33-25.64-3.52-17.32 7.67-34.21 24.99-37.73 12.43-2.52 24.4-6.89 35.57-12.99 15.51-8.47 34.95-2.75 43.42 12.76 8.47 15.51 2.75 34.95-12.76 43.42a190.665 190.665 0 0 1-53.5 19.53c-2.14 0.44-4.28 0.65-6.39 0.65zM857.04 697.07c-5.18 0-10.43-1.26-15.3-3.92-15.51-8.47-21.23-27.91-12.76-43.42C851.89 607.75 864 560.12 864 512c0-71.9-26.64-140.75-75.02-193.86-48.06-52.76-113.46-85.69-184.14-92.71-17.59-1.75-30.43-17.42-28.68-35.01 1.75-17.59 17.42-30.42 35.01-28.68 86.45 8.58 166.4 48.82 225.13 113.3C895.43 339.97 928 424.12 928 512c0 58.8-14.82 117.03-42.85 168.39-5.81 10.65-16.79 16.68-28.11 16.68z"  ></path><path d="M733.35 573.32c-1.93 0-3.89-0.18-5.86-0.54-17.38-3.22-28.86-19.91-25.64-37.29 1.43-7.71 2.15-15.61 2.15-23.49 0-60.64-43.05-113.4-102.37-125.44-17.32-3.52-28.51-20.41-24.99-37.73s20.41-28.52 37.73-24.99c42.78 8.68 81.74 32.09 109.69 65.9C752.39 424.03 768 467.45 768 512c0 11.77-1.08 23.59-3.22 35.14-2.85 15.41-16.31 26.18-31.43 26.18zM480 320c-17.67 0-32-14.33-32-32V160h-46.87l-16.1 24.15c-9.8 14.7-29.67 18.68-44.38 8.88-14.7-9.8-18.68-29.67-8.88-44.38l16.1-24.15c11.9-17.84 31.8-28.5 53.25-28.5H448c35.29 0 64 28.71 64 64v128c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-a-1-1-60" viewBox="0 0 1024 1024"><path d="M448 928h-46.87c-21.45 0-41.35-10.65-53.25-28.5l-109-163.5H192c-52.93 0-96-43.07-96-96V384c0-52.93 43.07-96 96-96h46.87l26.63 17.75L238.87 288l109-163.5A63.873 63.873 0 0 1 401.12 96H448c35.29 0 64 28.71 64 64v704c0 35.29-28.71 64-64 64zM192 352c-17.64 0-32 14.36-32 32v256c0 17.64 14.36 32 32 32h46.87c21.45 0 41.35 10.65 53.25 28.5l109 163.5H448V160h-46.87l-109 163.5c-11.9 17.84-31.8 28.5-53.25 28.5H192zM607.96 862.41c-16.25 0-30.17-12.33-31.81-28.84-1.75-17.59 11.09-33.26 28.68-35.01 70.69-7.02 136.08-39.94 184.14-92.71C837.36 652.75 864 583.9 864 512s-26.64-140.75-75.02-193.86c-48.06-52.76-113.46-85.69-184.14-92.71-17.59-1.75-30.43-17.42-28.68-35.01 1.75-17.59 17.42-30.42 35.01-28.68 86.45 8.58 166.4 48.82 225.13 113.3C895.43 339.97 928 424.12 928 512s-32.57 172.03-91.7 236.96c-58.73 64.48-138.68 104.71-225.13 113.3-1.08 0.1-2.15 0.15-3.21 0.15z"  ></path><path d="M607.97 700.8c-14.9 0-28.25-10.47-31.33-25.64-3.52-17.32 7.67-34.21 24.99-37.73C660.95 625.39 704 572.64 704 512s-43.05-113.4-102.37-125.44c-17.32-3.52-28.51-20.41-24.99-37.73 3.52-17.32 20.39-28.51 37.73-24.99 42.78 8.68 81.74 32.09 109.69 65.9C752.39 424.03 768 467.45 768 512s-15.61 87.97-43.95 122.25c-27.95 33.81-66.9 57.22-109.69 65.9-2.14 0.44-4.28 0.65-6.39 0.65z"  ></path></symbol><symbol id="qcw-a-1-1-56" viewBox="0 0 1024 1024"><path d="M512.58 609.1c-88.34 0-160.21-71.87-160.21-160.21s71.87-160.21 160.21-160.21 160.21 71.87 160.21 160.21S600.92 609.1 512.58 609.1z m0-256.42c-53.05 0-96.21 43.16-96.21 96.21s43.16 96.21 96.21 96.21 96.21-43.16 96.21-96.21-43.16-96.21-96.21-96.21z"  ></path><path d="M512.58 979.21c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.26l247.66-247.66c30.76-30.76 54.58-66.8 70.82-107.12 15.7-39 23.63-80.22 23.57-122.51-0.13-86.04-33.32-166.34-93.44-226.1C678.1 161.1 597.84 128 512.58 128c-85.26 0-165.52 33.1-225.98 93.19-60.12 59.76-93.31 140.06-93.44 226.1-0.06 42.29 7.87 83.5 23.57 122.51 16.23 40.32 40.06 76.36 70.82 107.12l125.77 125.77c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0L242.29 722.18c-36.89-36.89-65.46-80.11-84.93-128.47-18.79-46.67-28.28-95.96-28.2-146.51 0.08-50.04 9.53-98.71 28.11-144.66 19.31-47.75 47.64-90.39 84.21-126.74 36.66-36.43 79.36-64.64 126.92-83.85C414.33 73.4 462.84 64 512.58 64c49.74 0 98.25 9.4 144.18 27.95 47.56 19.2 90.26 47.42 126.92 83.85 36.57 36.35 64.91 78.99 84.21 126.74 18.58 45.94 28.04 94.61 28.11 144.66 0.08 50.55-9.41 99.84-28.2 146.51-19.47 48.36-48.04 91.58-84.93 128.47L535.21 969.84c-6.25 6.25-14.44 9.37-22.63 9.37z"  ></path></symbol><symbol id="qcw-a-1-1-92" viewBox="0 0 1024 1024"><path d="M919.91 853.4l-52.94-476.47c-3.61-32.46-30.95-56.93-63.61-56.93H736v-32c0-59.83-23.3-116.08-65.61-158.39C628.08 87.3 571.83 64 512 64s-116.08 23.3-158.39 65.61C311.3 171.92 288 228.17 288 288v32h-67.36c-32.66 0-60 24.48-63.61 56.93L104.09 853.4a96.125 96.125 0 0 0 23.88 74.63C146.16 948.35 172.23 960 199.5 960h625c27.27 0 53.34-11.65 71.53-31.98s26.89-47.52 23.88-74.62z m-71.57 31.94c-6.15 6.87-14.62 10.66-23.84 10.66h-625c-9.22 0-17.69-3.79-23.84-10.66-6.15-6.87-8.98-15.71-7.96-24.88L220.64 384H288v64c0 17.67 14.33 32 32 32s32-14.33 32-32V288c0-88.22 71.78-160 160-160s160 71.78 160 160v32H512c-17.67 0-32 14.33-32 32s14.33 32 32 32h160v64c0 17.67 14.33 32 32 32s32-14.33 32-32v-64h67.36l52.94 476.47c1.02 9.16-1.81 18-7.96 24.87z"  ></path><path d="M672.3 561.58l-93.71-13.61-41.9-84.89a27.462 27.462 0 0 0-24.65-15.38h-0.08c-10.47 0-20.04 5.96-24.65 15.38l-41.9 84.89-93.71 13.61a27.38 27.38 0 0 0-22.29 18.8 27.4 27.4 0 0 0 7.05 28.22l67.79 66.09-16.02 93.32a27.447 27.447 0 0 0 10.97 26.98c4.8 3.52 10.5 5.31 16.22 5.31 4.39 0 8.8-1.05 12.84-3.19l83.8-44.05 83.8 44.05c3.97 2.1 8.39 3.2 12.87 3.21 5.78-0.04 11.39-1.91 16.05-5.33a27.447 27.447 0 0 0 10.97-26.98l-16.02-93.32 67.79-66.09a27.4 27.4 0 0 0 7.05-28.22 27.34 27.34 0 0 0-22.27-18.8z m-97.23 67.28l-24.09 23.49 5.69 33.16 3.52 20.54-18.34-9.64-29.78-15.65-29.78 15.65-18.49 9.72 3.54-20.62 5.69-33.16-24.09-23.49L434 614.29l20.62-3 33.3-4.84 14.89-30.17 9.2-18.63 9.2 18.63 14.89 30.17 33.3 4.84 20.62 3-14.95 14.57z"  ></path></symbol><symbol id="qcw-a-1-1-91" viewBox="0 0 1024 1024"><path d="M942.12 316.71L813.18 136.2C795.2 111.03 766 96 735.06 96H288.94c-30.94 0-60.14 15.03-78.12 40.2L81.88 316.71C70.18 333.09 64 352.38 64 372.51V832c0 52.93 43.07 96 96 96h704c52.93 0 96-43.07 96-96V372.51c0-20.13-6.18-39.42-17.88-55.8zM761.1 173.4L888.67 352H544V160h191.06a32.05 32.05 0 0 1 26.04 13.4z m-498.2 0a32.063 32.063 0 0 1 26.04-13.4H480v192H135.32L262.9 173.4zM864 864H160c-17.65 0-32-14.36-32-32V416h768v416c0 17.64-14.35 32-32 32z"  ></path><path d="M800 480H576c-17.67 0-32 14.33-32 32v256c0 11.09 5.74 21.39 15.18 27.22a31.994 31.994 0 0 0 31.13 1.4L688 747.78l97.69 48.84c4.52 2.26 9.42 3.38 14.31 3.38 5.85 0 11.69-1.6 16.82-4.78A31.988 31.988 0 0 0 832 768V512c0-17.67-14.33-32-32-32z m-32 236.22l-65.69-32.84c-4.5-2.25-9.41-3.38-14.31-3.38s-9.81 1.13-14.31 3.38L608 716.22V544h160v172.22z"  ></path></symbol><symbol id="qcw-a-3-1-11" viewBox="0 0 1024 1024"><path d="M128 64h768v512c0 212.08-171.92 384-384 384S128 788.08 128 576V64z" fill="#FFBD33" ></path><path d="M615.73 224.26L486.86 639.9l-143 32.36 273.15 273.21C782.12 898.5 896 747.66 895.95 576.01v-71.68L615.73 224.26z" fill="#FF9640" ></path><path d="M358.036 592.84h101.99l49.31-279.5a299.397 299.397 0 0 0-40.96 12.03 213.718 213.718 0 0 0-36.91 18.12l-33.43-64.05a417.08 417.08 0 0 1 110.08-43.52c17.94-4.28 36.14-7.41 54.48-9.37 17.76-1.88 35.59-2.82 53.45-2.82l-0.41 0.56-64.72 368.33h97.28l-14.03 79.67h-290.2l14.07-79.45z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-a-3-1-01" viewBox="0 0 1024 1024"><path d="M767.07 663.3c-33.59-33.59-88.04-33.59-121.62 0l-1.77 1.77-0.09-0.1c-1.7 1.82-3.43 3.63-5.21 5.41-87.48 87.48-229.31 87.48-316.78 0s-87.48-229.31 0-316.78 229.31-87.48 316.78 0c59.82 59.82 78.72 145.05 56.73 220.94 3.7-0.27 7.42-0.41 11.15-0.41 19.45 0 38.43 3.7 56.41 10.99 18.65 7.56 35.35 18.65 49.65 32.95l52.4 52.4c61.97-150.63 31.78-330.26-90.59-452.63-162.46-162.46-425.85-162.46-588.31 0s-162.46 425.85 0 588.31c139.1 139.08 352.18 159.08 512.56 60l82.83 82.83c33.59 33.59 88.04 33.59 121.62 0l74.95-74.95L767.07 663.3z" fill="#FFFFFF" ></path><path d="M623.98 239.98m-176 0a176 176 0 1 0 352 0 176 176 0 1 0-352 0Z" fill="#FF5500" ></path><path d="M638.37 670.38c1.78-1.78 3.5-3.58 5.21-5.41l0.09 0.1 1.77-1.77c33.59-33.59 88.04-33.59 121.62 0l104.65 104.65c31.16-0.54 56.26-25.95 56.26-57.23 0-145.11-117.63-262.74-262.74-262.74h-82.52c-131.82 0-240.96 97.08-259.84 223.65 87.59 86.21 228.45 85.8 315.5-1.25z" fill="#FF5500" ></path></symbol><symbol id="qcw-a-3-1-12" viewBox="0 0 1024 1024"><path d="M128 64h768v512c0 212.08-171.92 384-384 384S128 788.08 128 576V64z" fill="#FF8577" ></path><path d="M695.6 263.02L630.27 449.7 298.6 674.97l279.19 279.19C761.76 922.2 896.07 762.53 896.05 575.8V463.16L695.6 263.02z" fill="#EF655B" ></path><path d="M311.912 597.502l177.46-108.59c26.56-16.25 48.5-30.39 65.84-42.44a417.656 417.656 0 0 0 41.32-32.36c8.62-7.46 16.16-16.07 22.42-25.6a69.03 69.03 0 0 0 8.96-22.99c1.62-8.26 1.24-16.8-1.13-24.88a41.719 41.719 0 0 0-13.57-19.92 71.639 71.639 0 0 0-27.39-13.52c-13.95-3.59-28.3-5.31-42.7-5.12-25.24 0.13-50.35 3.58-74.7 10.24a376.872 376.872 0 0 0-80.33 33.03l-29.9-68.91a457.449 457.449 0 0 1 98.66-40.96c34.5-9.86 70.2-14.89 106.09-14.95 27.22-0.64 54.36 3.2 80.33 11.37a133.522 133.522 0 0 1 52.28 30.72 97.292 97.292 0 0 1 26.06 45.41c4.38 17.94 4.91 36.62 1.54 54.78a140.66 140.66 0 0 1-14.95 42.75 181.979 181.979 0 0 1-33.54 42.29c-18.35 17.16-38 32.88-58.78 47-24.06 16.59-54.08 35.56-90.06 56.94l-73.11 43.11h245.76l-14.03 79.92h-386.1l13.57-77.32z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-a-3-1-13" viewBox="0 0 1024 1024"><path d="M128 64h768v512c0 212.08-171.92 384-384 384S128 788.08 128 576V64z" fill="#BDC5CF" ></path><path d="M740.92 219.96L489.68 421.79l191.54 71.68-77.16 130.36-320.97 8.04L600.53 949.3c173.12-41.14 295.3-195.83 295.22-373.76V374.58L740.92 219.96z" fill="#97A4B1" ></path><path d="M337.769 563.566a248.218 248.218 0 0 0 68.56 24.32c24.45 4.98 49.34 7.49 74.29 7.47 19.34 0.3 38.66-1.42 57.65-5.12 14.63-2.98 28.76-8.02 41.98-14.95a81.98 81.98 0 0 0 26.93-21.86 62.113 62.113 0 0 0 12.34-27.34 46.053 46.053 0 0 0-7.47-35.53 65.892 65.892 0 0 0-36.86-23.66 213.829 213.829 0 0 0-68.3-6.24 526.641 526.641 0 0 0-101.63 16.49l12.24-67.38 187.19-109.46h-238.2l14.18-80.12h360.35l-13.82 78.39-164.71 93.9c23.97-0.53 47.87 2.92 70.71 10.24a128.742 128.742 0 0 1 48.79 28.52 96.32 96.32 0 0 1 25.91 42.91c4.83 17.36 5.54 35.61 2.1 53.3a148.539 148.539 0 0 1-25.6 61.13 174.06 174.06 0 0 1-51.2 46.95 262.282 262.282 0 0 1-74.29 29.95 423.243 423.243 0 0 1-193.23-1.03 367.1 367.1 0 0 1-82.33-32.41l54.42-68.47z" fill="#FFFFFF" ></path></symbol><symbol id="qcw-a-3-1-02" viewBox="0 0 1024 1024"><path d="M196.16 320.19h128l-94.61 544h-128l94.61-544z m699.82-160h-416l-32 96h335.3l-83.48 480H575.98l224 160 128-736h-32z m-608.89-32c-44.18 0-86.32 35.82-94.11 80-7.79 44.18 21.71 80 65.89 80s86.32-35.82 94.11-80-21.71-80-65.89-80z" fill="#5A4BCD" ></path><path d="M575.98 128.19l-320 480h224l-256 352 576-480h-224l224-352z" fill="#FFCC22" ></path></symbol><symbol id="qcw-a-1-1-15" viewBox="0 0 1024 1024"><path d="M704 613.49c-8.19 0-16.38-3.12-22.63-9.37L534.63 457.37c-12.48-12.48-32.78-12.48-45.25 0L342.63 604.12c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25l146.75-146.75c37.43-37.43 98.33-37.43 135.76 0l146.75 146.75c12.5 12.5 12.5 32.76 0 45.25-6.26 6.25-14.45 9.37-22.64 9.37z"  ></path></symbol><symbol id="qcw-a-1-1-16" viewBox="0 0 1024 1024"><path d="M512 640.49c-25.64 0-49.75-9.99-67.88-28.12L297.37 465.63c-12.5-12.5-12.5-32.76 0-45.25 12.5-12.5 32.76-12.5 45.25 0l146.75 146.75c6.04 6.04 14.08 9.37 22.63 9.37s16.58-3.33 22.63-9.37l146.75-146.75c12.5-12.5 32.76-12.5 45.25 0 12.5 12.5 12.5 32.76 0 45.25L579.88 612.37c-18.13 18.13-42.24 28.12-67.88 28.12z"  ></path></symbol><symbol id="qcw-a-1-1-77" viewBox="0 0 1024 1024"><path d="M896 448H157.25c-25.98 0-49.19-15.51-59.13-39.51-9.94-24-4.5-51.38 13.87-69.75l185.37-185.37c12.5-12.5 32.76-12.5 45.26 0s12.5 32.76 0 45.26L157.25 384H896c17.67 0 32 14.33 32 32s-14.33 32-32 32z m-738.95-63.77zM704 880c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.26L866.75 640H128c-17.67 0-32-14.33-32-32s14.33-32 32-32h738.75c25.98 0 49.19 15.51 59.13 39.51 9.94 24 4.5 51.38-13.87 69.75L726.63 870.63c-6.25 6.25-14.44 9.37-22.63 9.37z m162.95-240.23z"  ></path></symbol><symbol id="qcw-a-2-1-01" viewBox="0 0 1024 1024"><path d="M704 960h-32c-17.67 0-32-14.33-32-32V736c0-70.58-57.42-128-128-128s-128 57.42-128 128v192c0 17.67-14.33 32-32 32h-32c-88.22 0-160-71.78-160-160V511.93l-64.28-0.14A32.001 32.001 0 0 1 66.21 492a31.994 31.994 0 0 1 6.95-34.84L443.47 86.85c18.13-18.13 42.24-28.12 67.88-28.12 25.64 0 49.75 9.99 67.88 28.12L950.19 457.8a32.001 32.001 0 0 1-22.63 54.63h-0.15l-63.41-0.28V800c0 88.22-71.78 160-160 160z"  ></path></symbol><symbol id="qcw-a-2-1-05" viewBox="0 0 1024 1024"><path d="M511.94 59.26l-384 218.06v362.29h64V314.58l320-181.72 320 181.72V677.1l-320 181.71-160.61-91.2h-129.6l290.21 164.8 384-218.06V277.32z"  ></path><path d="M755.14 319.61l-12.8 64h-384l12.8-64zM351.94 415.61l-51.2 256h-192l-12.8 64h288l64-320z"  ></path></symbol><symbol id="qcw-a-1-1-76" viewBox="0 0 1024 1024"><path d="M627.99 960c-43.19 0-65.45-24.57-81.71-42.51C532.43 902.2 526.24 896 511.99 896s-20.44 6.2-34.29 21.49C461.44 935.43 439.18 960 395.99 960s-65.45-24.57-81.71-42.51c-3.11-3.43-6.04-6.67-8.92-9.53-8.55-8.5-21.47-11.46-32.91-7.54l-65.31 22.39c-20.9 7.17-42.57 7.23-62.67 0.18-18.43-6.46-34.37-18.4-46.1-34.53-11.73-16.13-18.18-34.98-18.65-54.5-0.5-21.06 6.08-41.44 19.05-58.98l237.51-346a32.025 32.025 0 0 0 2.24-32.42l-87.24-174.49c-20.76-41.52-8.87-91.88 28.27-119.73l35.64-26.73c20.06-15.05 44.81-21.59 69.69-18.44 24.88 3.16 47.21 15.68 62.87 35.27l39.27 49.09c6.11 7.63 15.21 12.01 24.99 12.01s18.88-4.38 24.99-12.01l39.27-49.09c15.67-19.58 38-32.11 62.87-35.27 24.87-3.16 49.63 3.39 69.69 18.44l35.64 26.73c37.14 27.85 49.03 78.21 28.27 119.73L685.5 396.56a32.002 32.002 0 0 0 2.24 32.42l237.51 346c12.96 17.54 19.55 37.92 19.05 58.98-0.47 19.52-6.91 38.36-18.64 54.5-11.73 16.13-27.67 28.07-46.1 34.53-20.1 7.04-41.78 6.98-62.67-0.18l-65.33-22.4c-11.44-3.92-24.36-0.96-32.91 7.54-2.88 2.87-5.82 6.1-8.92 9.53-16.29 17.95-38.55 42.52-81.74 42.52z m-116-128c43.19 0 65.45 24.57 81.71 42.51C607.55 889.8 613.74 896 627.99 896s20.44-6.2 34.29-21.49c3.52-3.88 7.15-7.89 11.21-11.93a95.744 95.744 0 0 1 46.18-25.47c17.47-4 35.67-3.05 52.63 2.76l65.33 22.4c4.06 1.39 7.79 1.97 11.2 1.97 14 0 22.44-9.81 25.06-13.42 3.26-4.48 12.88-20.48-0.28-38.02l-0.78-1.09-237.85-346.5c-19.75-28.78-22.33-66.04-6.72-97.26l87.24-174.48c6.92-13.84 2.96-30.63-9.42-39.91l-35.64-26.73c-13.91-10.43-33.32-7.97-44.19 5.61l-39.27 49.09c-18.32 22.9-45.64 36.03-74.96 36.03s-56.65-13.13-74.96-36.03l-39.27-49.09c-10.87-13.58-30.27-16.04-44.19-5.61l-35.64 26.73c-12.38 9.29-16.34 26.07-9.42 39.91l87.24 174.49c15.61 31.22 13.04 68.49-6.72 97.26L150.8 812.26l-0.4 0.54c-13.16 17.54-3.54 33.54-0.28 38.02s15.51 18.56 36.26 11.45l65.31-22.39a95.998 95.998 0 0 1 52.63-2.76 95.744 95.744 0 0 1 46.18 25.47c4.06 4.04 7.69 8.05 11.21 11.93C375.56 889.8 381.75 896 395.99 896s20.44-6.2 34.29-21.49C446.54 856.57 468.8 832 511.99 832z"  ></path><path d="M512 448H384c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-a-1-1-68" viewBox="0 0 1024 1024"><path d="M928.97 960h-832c-17.67 0-32-14.33-32-32s14.33-32 32-32h832c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M160.97 960c-17.67 0-32-14.33-32-32V160c0-52.93 43.07-96 96-96h352c52.93 0 96 43.07 96 96v288c0 17.67-14.33 32-32 32s-32-14.33-32-32V160c0-17.64-14.36-32-32-32h-352c-17.64 0-32 14.36-32 32v768c0 17.67-14.33 32-32 32z"  ></path><path d="M864.97 480c-17.67 0-32-14.33-32-32v-43.6c0-38.45-22.84-73.09-58.18-88.24l-146.42-62.75c-16.24-6.96-23.77-25.77-16.81-42.02 6.96-16.24 25.77-23.77 42.02-16.81L800 257.34a159.815 159.815 0 0 1 96.97 147.06V448c0 17.67-14.33 32-32 32zM512.97 256h-224c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM512.97 384h-224c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM688 848c-8.19 0-16.38-3.12-22.63-9.37l-28.65-28.65c-0.07 0-0.19 0.03-0.36 0.13-22.89 14.34-49.27 21.89-76.37 21.9h-1.25c-37.83-0.32-73.5-15.32-100.43-42.23-26.93-26.91-41.96-62.56-42.31-100.39-0.36-38.29 14.16-74.48 40.88-101.88 26.67-27.35 62.37-42.79 100.53-43.47 0.86-0.01 1.72-0.02 2.58-0.02 36.9 0 71.95 14 98.97 39.6 27.67 26.21 43.63 61.48 44.95 99.31 0.62 17.66-13.21 32.48-30.87 33.09-17.65 0.62-32.48-13.21-33.09-30.87-1.49-42.82-37.24-77.13-79.99-77.13-0.47 0-0.94 0-1.42 0.01-43.72 0.77-78.95 37-78.54 80.76 0.41 43.31 35.97 78.85 79.29 79.22 15.32 0.15 30.21-4.06 43.09-12.13 25.61-16.04 58.31-12.43 79.53 8.79l28.72 28.72c12.5 12.5 12.5 32.76 0 45.25-6.25 6.24-14.44 9.36-22.63 9.36zM929 832H775.63c-19.48 0-36.89-11.63-44.35-29.63-7.46-18-3.37-38.53 10.41-52.31L883.75 608H769c-17.67 0-32-14.33-32-32s14.33-32 32-32h153.37c19.48 0 36.89 11.63 44.35 29.63 7.46 18 3.37 38.53-10.41 52.31L814.25 768H929c17.67 0 32 14.33 32 32s-14.33 32-32 32z m-6.63-224z"  ></path></symbol><symbol id="qcw-a-2-1-03" viewBox="0 0 1024 1024"><path d="M783.53 176.47c-149.96-149.96-393.1-149.96-543.06 0-149.96 149.96-149.96 393.1 0 543.06L466.75 945.8c24.99 24.99 65.52 24.99 90.51 0l226.27-226.27c149.96-149.96 149.96-393.1 0-543.06zM512 608c-88.37 0-160-71.63-160-160s71.63-160 160-160 160 71.63 160 160-71.63 160-160 160z"  ></path></symbol><symbol id="qcw-a-1-1-90" viewBox="0 0 1024 1024"><path d="M448 960H256c-52.93 0-96-43.07-96-96V640c0-17.67 14.33-32 32-32s32 14.33 32 32v224c0 17.64 14.36 32 32 32h192c17.67 0 32 14.33 32 32s-14.33 32-32 32zM800 544c-34.88 0-68.52-11.42-96-32.02-27.48 20.6-61.12 32.02-96 32.02s-68.52-11.42-96-32.02c-27.48 20.6-61.12 32.02-96 32.02s-68.52-11.42-96-32.02c-27.48 20.6-61.12 32.02-96 32.02-1.23 0-2.45-0.01-3.67-0.04-49.28-1.11-93.92-25-122.46-65.55-13.72-19.49-22.95-42.17-26.69-65.59-3.98-24.92-1.91-49.82 6.15-74l69.73-209.17A95.86 95.86 0 0 1 238.13 64h547.74c41.39 0 77.99 26.38 91.07 65.64l69.72 209.17c8.06 24.18 10.13 49.08 6.15 74-3.74 23.42-12.97 46.1-26.69 65.59-28.54 40.55-73.18 64.44-122.47 65.55-1.2 0.04-2.42 0.05-3.65 0.05z m-96-123.71l23.99 27.19C746.23 468.15 772.48 480 800 480c0.74 0 1.47-0.01 2.2-0.02 28.78-0.65 54.87-14.65 71.59-38.4 17.11-24.31 21.54-54.38 12.16-82.52l-69.72-209.17a31.951 31.951 0 0 0-30.36-21.88H238.13c-13.8 0-26 8.79-30.36 21.88l-69.72 209.17c-9.38 28.13-4.95 58.21 12.16 82.52 16.72 23.76 42.81 37.76 71.58 38.4 0.75 0.02 1.48 0.03 2.22 0.03 27.52 0 53.77-11.85 72.01-32.52l23.98-27.2 23.99 27.19C362.23 468.15 388.48 480 416 480s53.77-11.85 72.01-32.52L512 420.29l23.99 27.19C554.23 468.15 580.48 480 608 480s53.77-11.85 72.01-32.52L704 420.29zM711.3 717.34l9.2 18.63 14.89 30.17 33.3 4.84 20.62 3-14.94 14.57-24.09 23.49 5.69 33.16 3.52 20.54-18.34-9.64-29.78-15.65-29.78 15.65-18.5 9.72 3.54-20.62 5.69-33.16-24.09-23.49-14.94-14.57 20.62-3 33.3-4.84 14.89-30.17 9.2-18.63m0.03-109.96h-0.08c-10.47 0-20.04 5.96-24.65 15.38l-41.9 84.89-93.7 13.61a27.38 27.38 0 0 0-22.29 18.8 27.4 27.4 0 0 0 7.05 28.22l67.79 66.09-16.02 93.32a27.447 27.447 0 0 0 10.97 26.98c4.8 3.52 10.5 5.31 16.22 5.31 4.39 0 8.8-1.05 12.84-3.19l83.8-44.05 83.8 44.05c3.97 2.1 8.39 3.2 12.87 3.21 5.78-0.04 11.39-1.91 16.05-5.33a27.447 27.447 0 0 0 10.97-26.98l-16.02-93.32 67.79-66.09a27.4 27.4 0 0 0 7.05-28.22 27.41 27.41 0 0 0-22.29-18.8l-93.71-13.61-41.9-84.89a27.407 27.407 0 0 0-24.64-15.38z"  ></path></symbol><symbol id="qcw-a-1-1-70" viewBox="0 0 1024 1024"><path d="M592.47 832.88c-49.73 0-97.99-9.75-143.43-28.97-43.88-18.56-83.28-45.12-117.11-78.95-33.83-33.83-60.39-73.23-78.95-117.11C233.75 562.4 224 514.14 224 464.41c0-49.73 9.75-97.99 28.97-143.43 18.56-43.88 45.12-83.28 78.96-117.11 33.83-33.83 73.23-60.39 117.11-78.95 45.45-19.22 93.71-28.97 143.43-28.97 49.73 0 97.99 9.75 143.43 28.97 43.88 18.56 83.28 45.12 117.11 78.95 33.83 33.83 60.39 73.23 78.95 117.11 19.22 45.45 28.97 93.71 28.97 143.44 0 48.82-9.41 96.28-27.98 141.05-6.77 16.33-25.49 24.07-41.82 17.3s-24.07-25.49-17.3-41.82c15.33-36.96 23.1-76.17 23.1-116.54 0-81.33-31.67-157.79-89.18-215.29s-133.97-89.18-215.29-89.18c-81.33 0-157.78 31.67-215.29 89.18C319.67 306.63 288 383.09 288 464.41c0 81.33 31.67 157.79 89.18 215.29s133.97 89.18 215.29 89.18c67.46 0 131.36-21.6 184.79-62.47 33.1-25.32 80.35-22.11 109.92 7.45l38.5 38.51c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-38.5-38.51c-6.98-6.97-18.06-7.78-25.78-1.87-31.44 24.05-66.29 42.76-103.57 55.61-38.56 13.29-78.97 20.03-120.11 20.03z"  ></path><path d="M399.94 928.06c-74.46 0-145-23.85-204-68.98-5.76-4.4-14.03-3.79-19.25 1.42l-34.79 34.8c-12.5 12.5-32.76 12.5-45.25 0-12.5-12.5-12.5-32.76 0-45.25l34.8-34.79c27.81-27.81 72.25-30.82 103.38-7 47.74 36.51 104.84 55.82 165.12 55.82 38.57 0 75.83-7.9 110.74-23.49 33.74-15.06 63.65-36.51 88.88-63.76 12.01-12.96 32.26-13.74 45.22-1.73s13.74 32.26 1.73 45.22c-31.14 33.62-68.07 60.1-109.74 78.71-43.18 19.26-89.22 29.03-136.84 29.03zM118.97 740.4c-12.55 0-24.46-7.43-29.57-19.75C72.47 679.81 63.88 636.53 63.88 592c0-70.18 21.42-137.42 61.94-194.45 39.62-55.75 94.36-97.63 158.31-121.11 16.59-6.09 34.98 2.42 41.07 19.01 6.09 16.59-2.42 34.98-19.01 41.07-51.77 19-96.1 52.93-128.2 98.1-32.78 46.14-50.11 100.56-50.11 157.38 0 36.07 6.94 71.11 20.64 104.13 6.77 16.33-0.98 35.05-17.3 41.82a31.955 31.955 0 0 1-12.25 2.45zM736 416H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h288c17.67 0 32 14.33 32 32s-14.33 32-32 32zM576 576H448c-17.67 0-32-14.33-32-32s14.33-32 32-32h128c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-a-2-1-08" viewBox="0 0 1024 1024"><path d="M208.554771 267.174577a73.26 87.36 47.517 1 0 128.852114-118.000895 73.26 87.36 47.517 1 0-128.852114 118.000895Z"  ></path><path d="M895.98 160.19H779.62l20.36-32h-224l-21.33 32h-74.67l-32 96h42.67l-210.2 315.29 43.7-251.29h-128l-94.61 544h128l44.52-256h205.91l-256 352L734.9 534.43l-35.09 201.76H575.98l224 160 128-736h-32z m-320 320l142.55-224h64.76l-38.96 224H575.98z"  ></path></symbol><symbol id="qcw-a-1-1-40" viewBox="0 0 1024 1024"><path d="M960 992c-8.19 0-16.38-3.12-22.63-9.37L770.92 816.17c-11.18-11.18-29.1-12.5-41.68-3.08C656.87 867.33 570.68 896 480 896c-56.17 0-110.67-10.99-161.97-32.68-49.55-20.94-94.03-50.92-132.22-89.1-38.19-38.18-68.17-82.66-89.12-132.21C75 590.7 64 536.21 64 480.04c-0.01-109.51 42.18-212.9 118.8-291.12 76.5-78.1 178.76-122.43 287.94-124.81 56.83-1.25 112.12 8.72 164.32 29.62 50.42 20.18 95.8 49.65 134.89 87.57 39.05 37.89 69.84 82.31 91.51 132.03 22.44 51.49 34.06 106.38 34.53 163.17 0.47 56.35-10.15 111.11-31.57 162.76-6.77 16.32-25.49 24.07-41.82 17.3-16.32-6.77-24.07-25.49-17.3-41.82 18.11-43.66 27.09-90 26.69-137.71-0.79-95.14-38.65-183.85-106.61-249.79-68.04-66.03-157.99-101.24-253.24-99.15-92.36 2.02-178.88 39.53-243.62 105.62C163.69 299.89 127.99 387.37 128 480.03c0.01 94.08 36.61 182.48 103.06 248.93S385.92 832 480 832c76.73 0 149.65-24.25 210.86-70.12a95.734 95.734 0 0 1 64.38-18.85 96.058 96.058 0 0 1 60.93 27.89l166.45 166.45c12.5 12.5 12.5 32.76 0 45.25-6.24 6.26-14.43 9.38-22.62 9.38z"  ></path></symbol><symbol id="qcw-a-1-1-49" viewBox="0 0 1024 1024"><path d="M864 928H160c-52.93 0-96-43.07-96-96V352c0-52.93 43.07-96 96-96h32v-64c0-52.93 43.07-96 96-96h448c52.93 0 96 43.07 96 96v64.04l32-0.04c52.93 0 96 43.07 96 96v480c0 52.93-43.07 96-96 96zM160 320c-17.64 0-32 14.35-32 32v480c0 17.65 14.36 32 32 32h704c17.64 0 32-14.35 32-32V352c0-17.65-14.36-32-32-32h-32c-35.29 0-64-28.71-64-64v-64c0-17.65-14.36-32-32-32H288c-17.64 0-32 14.35-32 32v64c0 35.29-28.71 64-64 64h-32z"  ></path><path d="M511.74 704.42h-0.14c-105.68-0.08-191.75-86.12-191.86-191.8-0.05-51.34 19.91-99.62 56.2-135.93 36.27-36.29 84.5-56.27 135.8-56.27h0.1c104.85 0.06 190.93 85.38 191.89 190.21a193.42 193.42 0 0 1-3.84 40.16c-3.52 17.32-20.41 28.5-37.73 24.99-17.32-3.52-28.51-20.41-24.99-37.73a129.27 129.27 0 0 0 2.56-26.83c-0.64-69.88-58.03-126.76-127.92-126.8h-0.07c-34.2 0-66.35 13.32-90.53 37.51-24.2 24.21-37.5 56.39-37.47 90.62 0.03 33.97 13.4 66.02 37.64 90.25 24.24 24.23 56.3 37.59 90.26 37.62h0.09c21.2 0 42.18-5.28 60.68-15.26 18.35-9.9 38.94-13.59 59.52-10.65 20.7 2.95 39.46 12.32 54.23 27.1l8.19 8.19c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-8.19-8.19c-10.08-10.08-25.39-12.24-38.1-5.38-27.8 15.01-59.29 22.94-91.07 22.94z"  ></path></symbol><symbol id="qcw-a-1-1-52" viewBox="0 0 1024 1024"><path d="M192 672h-64c-52.93 0-96-43.07-96-96V416c0-52.93 43.07-96 96-96h64c35.29 0 64 28.71 64 64v224c0 35.29-28.71 64-64 64z m-64-288c-17.64 0-32 14.36-32 32v160c0 17.64 14.36 32 32 32h64.04L192 384h-64zM896 672h-64c-35.29 0-64-28.71-64-64V384c0-35.29 28.71-64 64-64h64c52.93 0 96 43.07 96 96v160c0 52.93-43.07 96-96 96z m-64-288v224h64c17.65 0 32-14.36 32-32V416c0-17.64-14.35-32-32-32h-64z"  ></path><path d="M896 384c-17.67 0-32-14.33-32-32 0-59.83-23.3-116.08-65.61-158.39C756.08 151.3 699.83 128 640 128H384c-59.83 0-116.08 23.3-158.39 65.61C183.3 235.92 160 292.17 160 352c0 17.67-14.33 32-32 32s-32-14.33-32-32c0-76.93 29.96-149.25 84.35-203.65C234.75 93.96 307.07 64 384 64h256c76.93 0 149.25 29.96 203.65 84.35C898.04 202.75 928 275.07 928 352c0 17.67-14.33 32-32 32zM640 960c-17.67 0-32-14.33-32-32s14.33-32 32-32c59.83 0 116.08-23.3 158.39-65.61C840.7 788.08 864 731.83 864 672v-32c0-17.67 14.33-32 32-32s32 14.33 32 32v32c0 76.93-29.96 149.25-84.35 203.65C789.25 930.04 716.93 960 640 960z"  ></path></symbol><symbol id="qcw-a-1-1-66" viewBox="0 0 1024 1024"><path d="M640 832H160c-52.93 0-96-43.07-96-96V288c0-52.93 43.07-96 96-96h480c52.93 0 96 43.07 96 96v448c0 52.93-43.07 96-96 96zM160 256c-17.64 0-32 14.36-32 32v448c0 17.64 14.36 32 32 32h480c17.64 0 32-14.36 32-32V288c0-17.64-14.36-32-32-32H160zM896.03 746.56c-10.36 0-20.75-2.56-30.31-7.7l-80.86-43.43c-15.57-8.36-21.41-27.76-13.05-43.33 8.36-15.57 27.76-21.41 43.33-13.05L896 682.49V341.51l-80.86 43.43c-15.57 8.36-34.97 2.52-43.33-13.05s-2.52-34.97 13.05-43.33l80.86-43.43c20.02-10.76 43.62-10.21 63.13 1.45 19.51 11.67 31.15 32.2 31.15 54.93v340.97c0 22.73-11.65 43.26-31.15 54.93-10.19 6.1-21.5 9.15-32.82 9.15z m-0.04-63.92z m0-341.28z"  ></path><path d="M320.04 673.41c-9.94 0-19.92-2.33-29.16-7.05-21.51-10.99-34.88-32.83-34.88-56.99V413.73c0-24 13.24-45.77 34.55-56.82s46.73-9.31 66.34 4.52l136.94 96.59c16.85 11.89 26.99 31.3 27.11 51.92 0.12 20.62-9.78 40.15-26.5 52.24L357.5 661.22c-11.16 8.08-24.27 12.19-37.46 12.19z m-0.04-64.04l136.94-99.04L320 413.73v195.64z m137.03-98.98z"  ></path></symbol><symbol id="qcw-a-1-1-57" viewBox="0 0 1024 1024"><path d="M885.28 436.48c-1.53 0-3.08-0.11-4.64-0.34l-221.43-32.17a64.008 64.008 0 0 1-48.19-35.01L512 168.31l-99.03 200.65a64.008 64.008 0 0 1-48.19 35.01l-221.43 32.18c-17.5 2.54-33.73-9.58-36.27-27.07s9.58-33.73 27.07-36.27l221.43-32.18 99.03-200.65c10.86-22.01 32.85-35.68 57.39-35.68s46.53 13.67 57.39 35.68l99.03 200.65 221.43 32.18c17.49 2.54 29.61 18.78 27.07 36.27-2.32 15.92-16 27.4-31.64 27.4zM739.89 933.57c-10.17 0-20.39-2.45-29.84-7.42L512 822.03 313.95 926.15c-21.72 11.42-47.55 9.55-67.4-4.87-19.85-14.42-29.61-38.41-25.46-62.6l37.83-220.53-73.08-71.24c-12.66-12.34-12.91-32.6-0.58-45.25 12.34-12.65 32.6-12.91 45.25-0.58l73.08 71.24A63.99 63.99 0 0 1 322 648.97L284.17 869.5l198.05-104.12c18.65-9.8 40.92-9.8 59.56 0L739.83 869.5l-37.82-220.53a63.99 63.99 0 0 1 18.41-56.65l73.08-71.24c12.66-12.33 32.91-12.08 45.25 0.58 12.34 12.66 12.08 32.92-0.58 45.25l-73.08 71.24 37.83 220.53c4.15 24.19-5.61 48.17-25.46 62.6-11.23 8.15-24.35 12.29-37.57 12.29z"  ></path></symbol><symbol id="qcw-a-1-1-30" viewBox="0 0 1024 1024"><path d="M512 960c-60.47 0-119.14-11.85-174.39-35.22-53.35-22.57-101.26-54.86-142.39-96-41.13-41.13-73.43-89.04-96-142.39C75.85 631.14 64 572.47 64 512c0-60.46 11.85-119.14 35.22-174.39 22.57-53.35 54.87-101.26 96-142.39 41.13-41.13 89.04-73.43 142.39-96C392.86 75.85 451.54 64 512 64c60.47 0 119.14 11.85 174.39 35.22 53.35 22.57 101.26 54.86 142.39 96 41.13 41.13 73.43 89.04 96 142.39C948.15 392.86 960 451.53 960 512c0 59.37-11.44 117.07-34.01 171.49-6.77 16.33-25.49 24.07-41.82 17.3-16.33-6.77-24.07-25.49-17.3-41.82C886.2 612.36 896 562.91 896 512c0-102.57-39.94-199-112.47-271.53C711 167.94 614.57 128 512 128c-102.57 0-199 39.94-271.53 112.47C167.94 313 128 409.43 128 512c0 102.57 39.94 199 112.47 271.53C313 856.06 409.43 896 512 896c85.08 0 165.67-27.24 233.06-78.79 37.93-29.01 92.08-25.33 125.96 8.56l47.61 47.61c12.5 12.5 12.5 32.76 0 45.25-12.5 12.5-32.76 12.5-45.25 0l-47.61-47.61c-11.29-11.29-29.27-12.57-41.82-2.98-38.23 29.24-80.59 51.99-125.91 67.6C611.15 951.81 562.02 960 512 960z"  ></path><path d="M672 704c-8.19 0-16.38-3.12-22.63-9.37l-141.09-141.1c-18.12-18.12-28.1-42.2-28.12-67.82L480 288.03c-0.01-17.67 14.3-32.01 31.97-32.03h0.03c17.66 0 31.98 14.31 32 31.97l0.16 197.69c0 8.55 3.33 16.58 9.37 22.62l141.09 141.09c12.5 12.5 12.5 32.76 0 45.25-6.24 6.26-14.43 9.38-22.62 9.38z"  ></path></symbol><symbol id="qcw-a-1-1-67" viewBox="0 0 1024 1024"><path d="M928 960H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h832c17.67 0 32 14.33 32 32s-14.33 32-32 32z"  ></path><path d="M160 960c-17.67 0-32-14.33-32-32V160c0-52.93 43.07-96 96-96h352c52.93 0 96 43.07 96 96v288c0 17.67-14.33 32-32 32s-32-14.33-32-32V160c0-17.64-14.36-32-32-32H224c-17.64 0-32 14.36-32 32v768c0 17.67-14.33 32-32 32z"  ></path><path d="M864 480c-17.67 0-32-14.33-32-32v-43.6c0-38.45-22.84-73.09-58.18-88.24L627.4 253.41c-16.24-6.96-23.77-25.77-16.81-42.02 6.96-16.24 25.78-23.77 42.02-16.81l146.42 62.75A159.84 159.84 0 0 1 896 404.4V448c0 17.67-14.33 32-32 32zM512 256H288c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM512 384H288c-17.67 0-32-14.33-32-32s14.33-32 32-32h224c17.67 0 32 14.33 32 32s-14.33 32-32 32zM672 832c-8.19 0-16.38-3.12-22.63-9.37l-224-224c-12.5-12.5-12.5-32.76 0-45.26s32.76-12.5 45.26 0l224 224c12.5 12.5 12.5 32.76 0 45.26-6.25 6.25-14.44 9.37-22.63 9.37z"  ></path><path d="M447.53 832c-8.19 0-16.38-3.12-22.63-9.37-12.5-12.5-12.5-32.76 0-45.25l205.25-205.25C648.29 553.99 672.4 544 698.04 544H928c17.67 0 32 14.33 32 32s-14.33 32-32 32H698.04c-8.55 0-16.58 3.33-22.63 9.37L470.16 822.63c-6.25 6.25-14.44 9.37-22.63 9.37z"  ></path><path d="M832 832c-17.67 0-32-14.33-32-32V672c0-17.67 14.33-32 32-32s32 14.33 32 32v128c0 17.67-14.33 32-32 32z"  ></path></symbol><symbol id="qcw-a-1-1-71" viewBox="0 0 1024 1024"><path d="M512 512c-59.83 0-116.08-23.3-158.39-65.61C311.3 404.08 288 347.83 288 288s23.3-116.08 65.61-158.39C395.92 87.3 452.17 64 512 64s116.08 23.3 158.39 65.61C712.7 171.92 736 228.17 736 288s-23.3 116.08-65.61 158.39C628.08 488.7 571.83 512 512 512z m0-384c-88.22 0-160 71.78-160 160s71.78 160 160 160 160-71.78 160-160-71.78-160-160-160zM832 960H192c-52.93 0-96-43.07-96-96v-32c0-76.93 29.96-149.25 84.35-203.65C234.75 573.96 307.07 544 384 544c17.67 0 32 14.33 32 32s-14.33 32-32 32c-59.83 0-116.08 23.3-158.39 65.61C183.3 715.92 160 772.17 160 832v32c0 17.64 14.35 32 32 32h640c17.65 0 32-14.36 32-32v-32c0-59.83-23.3-116.08-65.61-158.39C756.08 631.3 699.83 608 640 608h-96v160c0 17.67-14.33 32-32 32s-32-14.33-32-32V608c0-35.29 28.71-64 64-64h96c76.93 0 149.25 29.96 203.65 84.35C898.04 682.75 928 755.07 928 832v32c0 52.93-43.07 96-96 96z"  ></path></symbol><symbol id="qcw-a-1-1-75" viewBox="0 0 1024 1024"><path d="M888.42 640H864c-17.67 0-32-14.33-32-32s14.33-32 32-32h24.41l-80.04-373.55c-2.36-11.02-10.47-20.09-21.17-23.65l-132.17-44.06c-8.11-2.7-16.78-2.09-24.43 1.74l-75.67 37.83c-26.88 13.44-58.98 13.44-85.86 0l-75.67-37.83c-7.65-3.82-16.32-4.44-24.43-1.74L236.8 178.8c-10.7 3.57-18.81 12.63-21.17 23.65L135.58 576H160c17.67 0 32 14.33 32 32s-14.33 32-32 32h-24.42c-19.42 0-37.56-8.66-49.77-23.76C73.6 601.13 68.94 581.58 73 562.59l80.05-373.55c7.09-33.07 31.42-60.26 63.51-70.96l132.17-44.06c24.33-8.11 50.36-6.26 73.29 5.21l75.67 37.83c8.96 4.48 19.66 4.48 28.62 0l75.67-37.83c22.94-11.47 48.96-13.32 73.29-5.21l132.17 44.06c32.09 10.7 56.42 37.89 63.51 70.96L951 562.59c4.07 18.99-0.6 38.54-12.81 53.65-12.21 15.1-30.35 23.76-49.77 23.76z"  ></path><path d="M512 640c-8.19 0-16.38-3.12-22.63-9.37l-64-64a32.003 32.003 0 0 1-8.61-29.57l64-288C484.02 234.42 497 224 512 224s27.98 10.42 31.24 25.06l64 288a32.003 32.003 0 0 1-8.61 29.57l-64 64c-6.25 6.25-14.44 9.37-22.63 9.37z m-28.95-106.21L512 562.75l28.95-28.95L512 403.51l-28.95 130.28z"  ></path><path d="M704 960H320c-52.93 0-96-43.07-96-96V480c0-17.67 14.33-32 32-32s32 14.33 32 32v384c0 17.64 14.35 32 32 32h384c17.65 0 32-14.36 32-32V480c0-17.67 14.33-32 32-32s32 14.33 32 32v384c0 52.93-43.07 96-96 96z"  ></path></symbol><symbol id="qcw-a-1-1-88" viewBox="0 0 1024 1024"><path d="M707.74 640H320c-17.67 0-32-14.33-32-32s14.33-32 32-32h387.74c41.39 0 77.99-26.38 91.07-65.64L883.6 256H416c-17.67 0-32-14.33-32-32s14.33-32 32-32h467.6c20.51 0 39.92 9.94 51.92 26.58s15.28 38.2 8.79 57.66L859.53 530.6A159.799 159.799 0 0 1 707.74 640z m175.97-384z m-0.08-0.1z"  ></path><path d="M538.81 640c-17.67 0-32-14.33-32-32s14.33-32 32-32c27.59 0 51.99-17.59 60.72-43.76l106.12-318.36c5.59-16.77 23.71-25.83 40.48-20.24 16.77 5.59 25.83 23.71 20.24 40.48L660.24 552.48A127.834 127.834 0 0 1 538.81 640zM336 928c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-160c-26.47 0-48 21.53-48 48s21.53 48 48 48 48-21.53 48-48-21.53-48-48-48zM784 928c-61.76 0-112-50.24-112-112s50.24-112 112-112 112 50.24 112 112-50.24 112-112 112z m0-160c-26.47 0-48 21.53-48 48s21.53 48 48 48 48-21.53 48-48-21.53-48-48-48z"  ></path><path d="M319.97 736.01c-14.67 0-27.89-10.15-31.21-25.07L171.9 185.06C168.62 170.3 155.78 160 140.66 160H96c-17.67 0-32-14.33-32-32s14.33-32 32-32h44.66c21.76 0 43.09 7.5 60.07 21.12 16.97 13.62 28.92 32.82 33.64 54.06l116.86 525.88c3.83 17.25-7.04 34.35-24.3 38.18-2.33 0.52-4.66 0.77-6.96 0.77z"  ></path></symbol></svg>',
(function(l) {
    var c = (h = (h = document.getElementsByTagName("script"))[h.length - 1]).getAttribute("data-injectcss")
      , h = h.getAttribute("data-disable-injectsvg");
    if (!h) {
        var a, t, s, z, v, p = function(c, h) {
            h.parentNode.insertBefore(c, h);
        };
        if (c && !l.__iconfont__svg__cssinject__) {
            l.__iconfont__svg__cssinject__ = !0;
            try {
                document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
            } catch (c) {
                console && console.log(c);
            }
        }
        a = function() {
            var c, h = document.createElement("div");
            h.innerHTML = l._iconfont_svg_string_3039707,
            (h = h.getElementsByTagName("svg")[0]) && (h.setAttribute("aria-hidden", "true"),
            h.style.position = "absolute",
            h.style.width = 0,
            h.style.height = 0,
            h.style.overflow = "hidden",
            h = h,
            (c = document.body).firstChild ? p(h, c.firstChild) : c.appendChild(h));
        }
        ,
        document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(a, 0) : (t = function() {
            document.removeEventListener("DOMContentLoaded", t, !1),
            a();
        }
        ,
        document.addEventListener("DOMContentLoaded", t, !1)) : document.attachEvent && (s = a,
        z = l.document,
        v = !1,
        o(),
        z.onreadystatechange = function() {
            "complete" == z.readyState && (z.onreadystatechange = null,
            m());
        }
        );
    }
    function m() {
        v || (v = !0,
        s());
    }
    function o() {
        try {
            z.documentElement.doScroll("left");
        } catch (c) {
            return void setTimeout(o, 50);
        }
        m();
    }
}
)(window);
var domainConfig = {
    MainDomain: "//test.www.17qcc.com",
    MobileDomain: "//test.m.17qcc.com",
    WorkDomain: "//test.work.17qcc.com",
    ConsignerDomain: "//test.www.17qcc.com",
    PaymentDomain: "//test.www.17qcc.com",
    ImageDomain: "//test.pics.17qcc.com",
    VideoDomain: "//test.v.17qcc.com",
    OpenDomain: "//test.open.17qcc.com",
    ErpDomain: "//test.erp.17qcc.com",
    XieDomain: "//test.xie.17qcc.com",
    LiveDomain: "//test.live.17qcc.com",
    CookieDomain: ".17qcc.com",
    OpenApiWeb: "//test.apiweb.17qcc.com"
};
var isLocalhost = document.domain.indexOf("localhost") == 0 || document.domain.indexOf("192") == 0 || document.domain.indexOf("127") == 0;
var isTest = document.domain.indexOf("test.") == 0;
if (isTest) {
    document.domain = window.QccJsWebDocumentDomain || "17qcc.com";
} else {
    if (isLocalhost) {
        domainConfig.MainDomain = "//localhost:18997";
        domainConfig.CookieDomain = "localhost";
    } else {
        domainConfig = {
            MainDomain: "//www.17qcc.com",
            MobileDomain: "//m.17qcc.com",
            WorkDomain: "//work.17qcc.com",
            ConsignerDomain: "//www.17qcc.com",
            PaymentDomain: "//www.17qcc.com",
            ImageDomain: "//pics.17qcc.com",
            VideoDomain: "//v.17qcc.com",
            OpenDomain: "//open.17qcc.com",
            ErpDomain: "//erp.17qcc.com",
            XieDomain: "//xie.17qcc.com",
            LiveDomain: "//live.17qcc.com",
            CookieDomain: ".17qcc.com",
            OpenApiWeb: "//newopenapiweb.17qcc.com"
        };
        if (window.location.hostname.indexOf("qccqcc.com") > -1) {
            document.domain = "qccqcc.com";
            domainConfig.MainDomain = "//www.qccqcc.com";
        } else {
            document.domain = window.QccJsWebDocumentDomain || "17qcc.com";
        }
    }
}
var jsversion = {
    webconfig: "",
    merge: "1",
    jq: "",
    jqform: "",
    global: "62",
    being: "",
    config: "2",
    ajax: "16",
    cookie: "",
    pager: "5",
    pagerdown: "2",
    template: "6",
    toolbar: "84",
    shopcart: "6",
    encrypt: "",
    rollload: "",
    ajaxmethord: "5",
    layer: "",
    imglazy: "",
    yiqia: "2",
    detect: "",
    qa: "3",
    videoen: "",
    qtcharts: "",
    fly: "",
    qcclayer: "",
    tj: "3",
    font: "32",
    shophomefont: "",
    pluploadfull: "",
    qccer: "1",
    light: "5",
    cloudlight: "6",
    homeindex: "86",
    qcchome: "15",
    selfcang: "11",
    market: "12",
    marketlist: "9",
    newproduct: "10",
    dailynew: "8",
    searchproduct: "36",
    detailproduct: "90",
    magnifier: "",
    videopage: "6",
    plusvip: "5",
    fstyle: "4",
    original: "",
    about: "5",
    giftpage: "",
    cart: "12",
    cartconfirm: "17",
    cartpart: "10",
    cartnow: "11",
    cartagain: "",
    globalconfirm: "",
    cartpick: "1",
    customcart: "",
    productpush: "5",
    flagshipstore: "5",
    printingcustom: "4",
    groupuniform: "6",
    brands: "1",
    brandstop: "1",
    brandsnew: "1",
    brandslist: "1",
    shophome: "5",
    shopnavtop: "7",
    shopallpro: "4",
    shopoffpro: "2",
    shoprecruit: "1",
    shopdownload: "2",
    shopabout: "1",
    shoplicense: "1",
    shopapplication: "2",
    shopcustomt: "",
    shopfactory: "",
    shopcustompage: "",
    shoes: "9",
    shoesnewlist: "4",
    shoesmarket: "4",
    shoeslight: "4",
    shoeslist: "4",
    shoesintrs: "",
    shoestop: "2",
    shoesproductbest: "2",
    shoesproductflash: "2",
    shoesmarketbest: "1",
    shoplist: "5",
    recommend: "32",
    yxindex: "",
    yxproduct: "",
    hpaitop: "5",
    hpaiindex: "5",
    hpainewlist: "3",
    hpailist: "2",
    hpaimarket: "2",
    hpailight: "2",
    hspotgoods: "",
    factoryindex: "5",
    factorycompany: "3",
    factorynewproduct: "4",
    factoryintro: "",
    factoryproduct: "5",
    factop: "2",
    sendepindex: "",
    newinfo: "",
    imgsearchsmilar: "7",
    uploadimgsearch: "10",
    sellertrade: "",
    geetest: "",
    qccgeetest: "2",
    login: "16",
    loginpage: "15",
    loginpage_v2: "1",
    airec: "16",
    datacenter: "7",
    crossindex: "7",
    crosslist: "3",
    crossnew: "3",
    crosstop: "2",
    crosscompany: "1",
    crosswestern: "1",
    crotop: "",
    croindex: "1",
    cronew: "1",
    crolist: "1",
    crocompany: "1",
    croblueocean: "",
    crowestern: "1",
    servicerall: "10",
};
/* jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a, b) {
    function G(a) {
        var b = F[a] = {};
        return p.each(a.split(s), function(a, c) {
            b[c] = !0;
        }),
        b;
    }
    function J(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(I, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : H.test(d) ? p.parseJSON(d) : d;
                } catch (f) {}
                p.data(a, c, d);
            } else {
                d = b;
            }
        }
        return d;
    }
    function K(a) {
        var b;
        for (b in a) {
            if (b === "data" && p.isEmptyObject(a[b])) {
                continue;
            }
            if (b !== "toJSON") {
                return !1;
            }
        }
        return !0;
    }
    function ba() {
        return !1;
    }
    function bb() {
        return !0;
    }
    function bh(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function bi(a, b) {
        do {
            a = a[b];
        } while (a && a.nodeType !== 1);
        return a;
    }
    function bj(a, b, c) {
        b = b || 0;
        if (p.isFunction(b)) {
            return p.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c;
            });
        }
        if (b.nodeType) {
            return p.grep(a, function(a, d) {
                return a === b === c;
            });
        }
        if (typeof b == "string") {
            var d = p.grep(a, function(a) {
                return a.nodeType === 1;
            });
            if (be.test(b)) {
                return p.filter(b, d, !c);
            }
            b = p.filter(b, d);
        }
        return p.grep(a, function(a, d) {
            return p.inArray(a, b) >= 0 === c;
        });
    }
    function bk(a) {
        var b = bl.split("|")
          , c = a.createDocumentFragment();
        if (c.createElement) {
            while (b.length) {
                c.createElement(b.pop());
            }
        }
        return c;
    }
    function bC(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
    }
    function bD(a, b) {
        if (b.nodeType !== 1 || !p.hasData(a)) {
            return;
        }
        var c, d, e, f = p._data(a), g = p._data(b, f), h = f.events;
        if (h) {
            delete g.handle,
            g.events = {};
            for (c in h) {
                for (d = 0,
                e = h[c].length; d < e; d++) {
                    p.event.add(b, c, h[c][d]);
                }
            }
        }
        g.data && (g.data = p.extend({}, g.data));
    }
    function bE(a, b) {
        var c;
        if (b.nodeType !== 1) {
            return;
        }
        b.clearAttributes && b.clearAttributes(),
        b.mergeAttributes && b.mergeAttributes(a),
        c = b.nodeName.toLowerCase(),
        c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML),
        p.support.html5Clone && a.innerHTML && !p.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bv.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
        b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text),
        b.removeAttribute(p.expando);
    }
    function bF(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function bG(a) {
        bv.test(a.type) && (a.defaultChecked = a.checked);
    }
    function bY(a, b) {
        if (b in a) {
            return b;
        }
        var c = b.charAt(0).toUpperCase() + b.slice(1)
          , d = b
          , e = bW.length;
        while (e--) {
            b = bW[e] + c;
            if (b in a) {
                return b;
            }
        }
        return d;
    }
    function bZ(a, b) {
        return a = b || a,
        p.css(a, "display") === "none" || !p.contains(a.ownerDocument, a);
    }
    function b$(a, b) {
        var c, d, e = [], f = 0, g = a.length;
        for (; f < g; f++) {
            c = a[f];
            if (!c.style) {
                continue;
            }
            e[f] = p._data(c, "olddisplay"),
            b ? (!e[f] && c.style.display === "none" && (c.style.display = ""),
            c.style.display === "" && bZ(c) && (e[f] = p._data(c, "olddisplay", cc(c.nodeName)))) : (d = bH(c, "display"),
            !e[f] && d !== "none" && p._data(c, "olddisplay", d));
        }
        for (f = 0; f < g; f++) {
            c = a[f];
            if (!c.style) {
                continue;
            }
            if (!b || c.style.display === "none" || c.style.display === "") {
                c.style.display = b ? e[f] || "" : "none";
            }
        }
        return a;
    }
    function b_(a, b, c) {
        var d = bP.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function ca(a, b, c, d) {
        var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0
          , f = 0;
        for (; e < 4; e += 2) {
            c === "margin" && (f += p.css(a, c + bV[e], !0)),
            d ? (c === "content" && (f -= parseFloat(bH(a, "padding" + bV[e])) || 0),
            c !== "margin" && (f -= parseFloat(bH(a, "border" + bV[e] + "Width")) || 0)) : (f += parseFloat(bH(a, "padding" + bV[e])) || 0,
            c !== "padding" && (f += parseFloat(bH(a, "border" + bV[e] + "Width")) || 0));
        }
        return f;
    }
    function cb(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight
          , e = !0
          , f = p.support.boxSizing && p.css(a, "boxSizing") === "border-box";
        if (d <= 0 || d == null) {
            d = bH(a, b);
            if (d < 0 || d == null) {
                d = a.style[b];
            }
            if (bQ.test(d)) {
                return d;
            }
            e = f && (p.support.boxSizingReliable || d === a.style[b]),
            d = parseFloat(d) || 0;
        }
        return d + ca(a, b, c || (f ? "border" : "content"), e) + "px";
    }
    function cc(a) {
        if (bS[a]) {
            return bS[a];
        }
        var b = p("<" + a + ">").appendTo(e.body)
          , c = b.css("display");
        b.remove();
        if (c === "none" || c === "") {
            bI = e.body.appendChild(bI || p.extend(e.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!bJ || !bI.createElement) {
                bJ = (bI.contentWindow || bI.contentDocument).document,
                bJ.write("<!doctype html><html><body>"),
                bJ.close();
            }
            b = bJ.body.appendChild(bJ.createElement(a)),
            c = bH(b, "display"),
            e.body.removeChild(bI);
        }
        return bS[a] = c,
        c;
    }
    function ci(a, b, c, d) {
        var e;
        if (p.isArray(b)) {
            p.each(b, function(b, e) {
                c || ce.test(a) ? d(a, e) : ci(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d);
            });
        } else {
            if (!c && p.type(b) === "object") {
                for (e in b) {
                    ci(a + "[" + e + "]", b[e], c, d);
                }
            } else {
                d(a, b);
            }
        }
    }
    function cz(a) {
        return function(b, c) {
            typeof b != "string" && (c = b,
            b = "*");
            var d, e, f, g = b.toLowerCase().split(s), h = 0, i = g.length;
            if (p.isFunction(c)) {
                for (; h < i; h++) {
                    d = g[h],
                    f = /^\+/.test(d),
                    f && (d = d.substr(1) || "*"),
                    e = a[d] = a[d] || [],
                    e[f ? "unshift" : "push"](c);
                }
            }
        }
        ;
    }
    function cA(a, c, d, e, f, g) {
        f = f || c.dataTypes[0],
        g = g || {},
        g[f] = !0;
        var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === cv;
        for (; j < k && (l || !h); j++) {
            h = i[j](c, d, e),
            typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h),
            h = cA(a, c, d, e, h, g)));
        }
        return (l || !h) && !g["*"] && (h = cA(a, c, d, e, "*", g)),
        h;
    }
    function cB(a, c) {
        var d, e, f = p.ajaxSettings.flatOptions || {};
        for (d in c) {
            c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        }
        e && p.extend(!0, a, e);
    }
    function cC(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k) {
            f in d && (c[k[f]] = d[f]);
        }
        while (j[0] === "*") {
            j.shift(),
            e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        }
        if (e) {
            for (f in i) {
                if (i[f] && i[f].test(e)) {
                    j.unshift(f);
                    break;
                }
            }
        }
        if (j[0]in d) {
            g = j[0];
        } else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break;
                }
                h || (h = f);
            }
            g = g || h;
        }
        if (g) {
            return g !== j[0] && j.unshift(g),
            d[g];
        }
    }
    function cD(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        a.dataFilter && (b = a.dataFilter(b, a.dataType));
        if (g[1]) {
            for (c in a.converters) {
                i[c.toLowerCase()] = a.converters[c];
            }
        }
        for (; e = g[++j]; ) {
            if (e !== "*") {
                if (h !== "*" && h !== e) {
                    c = i[h + " " + e] || i["* " + e];
                    if (!c) {
                        for (d in i) {
                            f = d.split(" ");
                            if (f[1] === e) {
                                c = i[h + " " + f[0]] || i["* " + f[0]];
                                if (c) {
                                    c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0],
                                    g.splice(j--, 0, e));
                                    break;
                                }
                            }
                        }
                    }
                    if (c !== !0) {
                        if (c && a["throws"]) {
                            b = c(b);
                        } else {
                            try {
                                b = c(b);
                            } catch (k) {
                                return {
                                    state: "parsererror",
                                    error: c ? k : "No conversion from " + h + " to " + e
                                };
                            }
                        }
                    }
                }
                h = e;
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    function cL() {
        try {
            return new a.XMLHttpRequest;
        } catch (b) {}
    }
    function cM() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function cU() {
        return setTimeout(function() {
            cN = b;
        }, 0),
        cN = p.now();
    }
    function cV(a, b) {
        p.each(b, function(b, c) {
            var d = (cT[b] || []).concat(cT["*"])
              , e = 0
              , f = d.length;
            for (; e < f; e++) {
                if (d[e].call(a, b, c)) {
                    return;
                }
            }
        });
    }
    function cW(a, b, c) {
        var d, e = 0, f = 0, g = cS.length, h = p.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            var b = cN || cU()
              , c = Math.max(0, j.startTime + j.duration - b)
              , d = 1 - (c / j.duration || 0)
              , e = 0
              , f = j.tweens.length;
            for (; e < f; e++) {
                j.tweens[e].run(d);
            }
            return h.notifyWith(a, [j, d, c]),
            d < 1 && f ? c : (h.resolveWith(a, [j]),
            !1);
        }, j = h.promise({
            elem: a,
            props: p.extend({}, b),
            opts: p.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: cN || cU(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c, d) {
                var e = p.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(e),
                e;
            },
            stop: function(b) {
                var c = 0
                  , d = b ? j.tweens.length : 0;
                for (; c < d; c++) {
                    j.tweens[c].run(1);
                }
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this;
            }
        }), k = j.props;
        cX(k, j.opts.specialEasing);
        for (; e < g; e++) {
            d = cS[e].call(j, a, k, j.opts);
            if (d) {
                return d;
            }
        }
        return cV(j, k),
        p.isFunction(j.opts.start) && j.opts.start.call(a, j),
        p.fx.timer(p.extend(i, {
            anim: j,
            queue: j.opts.queue,
            elem: a
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function cX(a, b) {
        var c, d, e, f, g;
        for (c in a) {
            d = p.camelCase(c),
            e = b[d],
            f = a[c],
            p.isArray(f) && (e = f[1],
            f = a[c] = f[0]),
            c !== d && (a[d] = f,
            delete a[c]),
            g = p.cssHooks[d];
            if (g && "expand"in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f) {
                    c in a || (a[c] = f[c],
                    b[c] = e);
                }
            } else {
                b[d] = e;
            }
        }
    }
    function cY(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], q = a.nodeType && bZ(a);
        c.queue || (j = p._queueHooks(a, "fx"),
        j.unqueued == null && (j.unqueued = 0,
        k = j.empty.fire,
        j.empty.fire = function() {
            j.unqueued || k();
        }
        ),
        j.unqueued++,
        l.always(function() {
            l.always(function() {
                j.unqueued--,
                p.queue(a, "fx").length || j.empty.fire();
            });
        })),
        a.nodeType === 1 && ("height"in b || "width"in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY],
        p.css(a, "display") === "inline" && p.css(a, "float") === "none" && (!p.support.inlineBlockNeedsLayout || cc(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)),
        c.overflow && (m.overflow = "hidden",
        p.support.shrinkWrapBlocks || l.done(function() {
            m.overflow = c.overflow[0],
            m.overflowX = c.overflow[1],
            m.overflowY = c.overflow[2];
        }));
        for (d in b) {
            f = b[d];
            if (cP.exec(f)) {
                delete b[d];
                if (f === (q ? "hide" : "show")) {
                    continue;
                }
                o.push(d);
            }
        }
        g = o.length;
        if (g) {
            h = p._data(a, "fxshow") || p._data(a, "fxshow", {}),
            q ? p(a).show() : l.done(function() {
                p(a).hide();
            }),
            l.done(function() {
                var b;
                p.removeData(a, "fxshow", !0);
                for (b in n) {
                    p.style(a, b, n[b]);
                }
            });
            for (d = 0; d < g; d++) {
                e = o[d],
                i = l.createTween(e, q ? h[e] : 0),
                n[e] = h[e] || p.style(a, e),
                e in h || (h[e] = i.start,
                q && (i.end = i.start,
                i.start = e === "width" || e === "height" ? 1 : 0));
            }
        }
    }
    function cZ(a, b, c, d, e) {
        return new cZ.prototype.init(a,b,c,d,e);
    }
    function c$(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        b = b ? 1 : 0;
        for (; e < 4; e += 2 - b) {
            c = bV[e],
            d["margin" + c] = d["padding" + c] = a;
        }
        return b && (d.opacity = d.width = a),
        d;
    }
    function da(a) {
        return p.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    var c, d, e = a.document, f = a.location, g = a.navigator, h = a.jQuery, i = a.$, j = Array.prototype.push, k = Array.prototype.slice, l = Array.prototype.indexOf, m = Object.prototype.toString, n = Object.prototype.hasOwnProperty, o = String.prototype.trim, p = function(a, b) {
        return new p.fn.init(a,b,c);
    }, q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, r = /\S/, s = /\s+/, t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^[\],:{}\s]*$/, x = /(?:^|:|,)(?:\s*\[)+/g, y = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, z = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, A = /^-ms-/, B = /-([\da-z])/gi, C = function(a, b) {
        return (b + "").toUpperCase();
    }, D = function() {
        e.addEventListener ? (e.removeEventListener("DOMContentLoaded", D, !1),
        p.ready()) : e.readyState === "complete" && (e.detachEvent("onreadystatechange", D),
        p.ready());
    }, E = {};
    p.fn = p.prototype = {
        constructor: p,
        init: function(a, c, d) {
            var f, g, h, i;
            if (!a) {
                return this;
            }
            if (a.nodeType) {
                return this.context = this[0] = a,
                this.length = 1,
                this;
            }
            if (typeof a == "string") {
                a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = u.exec(a);
                if (f && (f[1] || !c)) {
                    if (f[1]) {
                        return c = c instanceof p ? c[0] : c,
                        i = c && c.nodeType ? c.ownerDocument || c : e,
                        a = p.parseHTML(f[1], i, !0),
                        v.test(f[1]) && p.isPlainObject(c) && this.attr.call(a, c, !0),
                        p.merge(this, a);
                    }
                    g = e.getElementById(f[2]);
                    if (g && g.parentNode) {
                        if (g.id !== f[2]) {
                            return d.find(a);
                        }
                        this.length = 1,
                        this[0] = g;
                    }
                    return this.context = e,
                    this.selector = a,
                    this;
                }
                return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
            }
            return p.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector,
            this.context = a.context),
            p.makeArray(a, this));
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return k.call(this);
        },
        get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
        },
        pushStack: function(a, b, c) {
            var d = p.merge(this.constructor(), a);
            return d.prevObject = this,
            d.context = this.context,
            b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"),
            d;
        },
        each: function(a, b) {
            return p.each(this, a, b);
        },
        ready: function(a) {
            return p.ready.promise().done(a),
            this;
        },
        eq: function(a) {
            return a = +a,
            a === -1 ? this.slice(a) : this.slice(a, a + 1);
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        slice: function() {
            return this.pushStack(k.apply(this, arguments), "slice", k.call(arguments).join(","));
        },
        map: function(a) {
            return this.pushStack(p.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: j,
        sort: [].sort,
        splice: [].splice
    },
    p.fn.init.prototype = p.fn,
    p.extend = p.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        typeof h == "boolean" && (k = h,
        h = arguments[1] || {},
        i = 2),
        typeof h != "object" && !p.isFunction(h) && (h = {}),
        j === i && (h = this,
        --i);
        for (; i < j; i++) {
            if ((a = arguments[i]) != null) {
                for (c in a) {
                    d = h[c],
                    e = a[c];
                    if (h === e) {
                        continue;
                    }
                    k && e && (p.isPlainObject(e) || (f = p.isArray(e))) ? (f ? (f = !1,
                    g = d && p.isArray(d) ? d : []) : g = d && p.isPlainObject(d) ? d : {},
                    h[c] = p.extend(k, g, e)) : e !== b && (h[c] = e);
                }
            }
        }
        return h;
    }
    ,
    p.extend({
        noConflict: function(b) {
            return a.$ === p && (a.$ = i),
            b && a.jQuery === p && (a.jQuery = h),
            p;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? p.readyWait++ : p.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? --p.readyWait : p.isReady) {
                return;
            }
            if (!e.body) {
                return setTimeout(p.ready, 1);
            }
            p.isReady = !0;
            if (a !== !0 && --p.readyWait > 0) {
                return;
            }
            d.resolveWith(e, [p]),
            p.fn.trigger && p(e).trigger("ready").off("ready");
        },
        isFunction: function(a) {
            return p.type(a) === "function";
        },
        isArray: Array.isArray || function(a) {
            return p.type(a) === "array";
        }
        ,
        isWindow: function(a) {
            return a != null && a == a.window;
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a);
        },
        type: function(a) {
            return a == null ? String(a) : E[m.call(a)] || "object";
        },
        isPlainObject: function(a) {
            if (!a || p.type(a) !== "object" || a.nodeType || p.isWindow(a)) {
                return !1;
            }
            try {
                if (a.constructor && !n.call(a, "constructor") && !n.call(a.constructor.prototype, "isPrototypeOf")) {
                    return !1;
                }
            } catch (c) {
                return !1;
            }
            var d;
            for (d in a) {}
            return d === b || n.call(a, d);
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) {
                return !1;
            }
            return !0;
        },
        error: function(a) {
            throw new Error(a);
        },
        parseHTML: function(a, b, c) {
            var d;
            return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b,
            b = 0),
            b = b || e,
            (d = v.exec(a)) ? [b.createElement(d[1])] : (d = p.buildFragment([a], b, c ? null : []),
            p.merge([], (d.cacheable ? p.clone(d.fragment) : d.fragment).childNodes)));
        },
        parseJSON: function(b) {
            if (!b || typeof b != "string") {
                return null;
            }
            b = p.trim(b);
            if (a.JSON && a.JSON.parse) {
                return a.JSON.parse(b);
            }
            if (w.test(b.replace(y, "@").replace(z, "]").replace(x, ""))) {
                return (new Function("return " + b))();
            }
            p.error("Invalid JSON: " + b);
        },
        parseXML: function(c) {
            var d, e;
            if (!c || typeof c != "string") {
                return null;
            }
            try {
                a.DOMParser ? (e = new DOMParser,
                d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                d.async = "false",
                d.loadXML(c));
            } catch (f) {
                d = b;
            }
            return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && p.error("Invalid XML: " + c),
            d;
        },
        noop: function() {},
        globalEval: function(b) {
            b && r.test(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            }
            )(b);
        },
        camelCase: function(a) {
            return a.replace(A, "ms-").replace(B, C);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, c, d) {
            var e, f = 0, g = a.length, h = g === b || p.isFunction(a);
            if (d) {
                if (h) {
                    for (e in a) {
                        if (c.apply(a[e], d) === !1) {
                            break;
                        }
                    }
                } else {
                    for (; f < g; ) {
                        if (c.apply(a[f++], d) === !1) {
                            break;
                        }
                    }
                }
            } else {
                if (h) {
                    for (e in a) {
                        if (c.call(a[e], e, a[e]) === !1) {
                            break;
                        }
                    }
                } else {
                    for (; f < g; ) {
                        if (c.call(a[f], f, a[f++]) === !1) {
                            break;
                        }
                    }
                }
            }
            return a;
        },
        trim: o && !o.call(" ") ? function(a) {
            return a == null ? "" : o.call(a);
        }
        : function(a) {
            return a == null ? "" : (a + "").replace(t, "");
        }
        ,
        makeArray: function(a, b) {
            var c, d = b || [];
            return a != null && (c = p.type(a),
            a.length == null || c === "string" || c === "function" || c === "regexp" || p.isWindow(a) ? j.call(d, a) : p.merge(d, a)),
            d;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (l) {
                    return l.call(b, a, c);
                }
                d = b.length,
                c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (; c < d; c++) {
                    if (c in b && b[c] === a) {
                        return c;
                    }
                }
            }
            return -1;
        },
        merge: function(a, c) {
            var d = c.length
              , e = a.length
              , f = 0;
            if (typeof d == "number") {
                for (; f < d; f++) {
                    a[e++] = c[f];
                }
            } else {
                while (c[f] !== b) {
                    a[e++] = c[f++];
                }
            }
            return a.length = e,
            a;
        },
        grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            c = !!c;
            for (; f < g; f++) {
                d = !!b(a[f], f),
                c !== d && e.push(a[f]);
            }
            return e;
        },
        map: function(a, c, d) {
            var e, f, g = [], h = 0, i = a.length, j = a instanceof p || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || p.isArray(a));
            if (j) {
                for (; h < i; h++) {
                    e = c(a[h], h, d),
                    e != null && (g[g.length] = e);
                }
            } else {
                for (f in a) {
                    e = c(a[f], f, d),
                    e != null && (g[g.length] = e);
                }
            }
            return g.concat.apply([], g);
        },
        guid: 1,
        proxy: function(a, c) {
            var d, e, f;
            return typeof c == "string" && (d = a[c],
            c = a,
            a = d),
            p.isFunction(a) ? (e = k.call(arguments, 2),
            f = function() {
                return a.apply(c, e.concat(k.call(arguments)));
            }
            ,
            f.guid = a.guid = a.guid || p.guid++,
            f) : b;
        },
        access: function(a, c, d, e, f, g, h) {
            var i, j = d == null, k = 0, l = a.length;
            if (d && typeof d == "object") {
                for (k in d) {
                    p.access(a, c, k, d[k], 1, g, e);
                }
                f = 1;
            } else {
                if (e !== b) {
                    i = h === b && p.isFunction(e),
                    j && (i ? (i = c,
                    c = function(a, b, c) {
                        return i.call(p(a), c);
                    }
                    ) : (c.call(a, e),
                    c = null));
                    if (c) {
                        for (; k < l; k++) {
                            c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                        }
                    }
                    f = 1;
                }
            }
            return f ? a : j ? c.call(a) : l ? c(a[0], d) : g;
        },
        now: function() {
            return (new Date).getTime();
        }
    }),
    p.ready.promise = function(b) {
        if (!d) {
            d = p.Deferred();
            if (e.readyState === "complete") {
                setTimeout(p.ready, 1);
            } else {
                if (e.addEventListener) {
                    e.addEventListener("DOMContentLoaded", D, !1),
                    a.addEventListener("load", p.ready, !1);
                } else {
                    e.attachEvent("onreadystatechange", D),
                    a.attachEvent("onload", p.ready);
                    var c = !1;
                    try {
                        c = a.frameElement == null && e.documentElement;
                    } catch (f) {}
                    c && c.doScroll && function g() {
                        if (!p.isReady) {
                            try {
                                c.doScroll("left");
                            } catch (a) {
                                return setTimeout(g, 50);
                            }
                            p.ready();
                        }
                    }();
                }
            }
        }
        return d.promise(b);
    }
    ,
    p.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
        E["[object " + b + "]"] = b.toLowerCase();
    }),
    c = p(e);
    var F = {};
    p.Callbacks = function(a) {
        a = typeof a == "string" ? F[a] || G(a) : p.extend({}, a);
        var c, d, e, f, g, h, i = [], j = !a.once && [], k = function(b) {
            c = a.memory && b,
            d = !0,
            h = f || 0,
            f = 0,
            g = i.length,
            e = !0;
            for (; i && h < g; h++) {
                if (i[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                    c = !1;
                    break;
                }
            }
            e = !1,
            i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable());
        }, l = {
            add: function() {
                if (i) {
                    var b = i.length;
                    (function d(b) {
                        p.each(b, function(b, c) {
                            var e = p.type(c);
                            e === "function" && (!a.unique || !l.has(c)) ? i.push(c) : c && c.length && e !== "string" && d(c);
                        });
                    }
                    )(arguments),
                    e ? g = i.length : c && (f = b,
                    k(c));
                }
                return this;
            },
            remove: function() {
                return i && p.each(arguments, function(a, b) {
                    var c;
                    while ((c = p.inArray(b, i, c)) > -1) {
                        i.splice(c, 1),
                        e && (c <= g && g--,
                        c <= h && h--);
                    }
                }),
                this;
            },
            has: function(a) {
                return p.inArray(a, i) > -1;
            },
            empty: function() {
                return i = [],
                this;
            },
            disable: function() {
                return i = j = c = b,
                this;
            },
            disabled: function() {
                return !i;
            },
            lock: function() {
                return j = b,
                c || l.disable(),
                this;
            },
            locked: function() {
                return !j;
            },
            fireWith: function(a, b) {
                return b = b || [],
                b = [a, b.slice ? b.slice() : b],
                i && (!d || j) && (e ? j.push(b) : k(b)),
                this;
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this;
            },
            fired: function() {
                return !!d;
            }
        };
        return l;
    }
    ,
    p.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", p.Callbacks("once memory"), "resolved"], ["reject", "fail", p.Callbacks("once memory"), "rejected"], ["notify", "progress", p.Callbacks("memory")]]
              , c = "pending"
              , d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this;
                },
                then: function() {
                    var a = arguments;
                    return p.Deferred(function(c) {
                        p.each(b, function(b, d) {
                            var f = d[0]
                              , g = a[b];
                            e[d[1]](p.isFunction(g) ? function() {
                                var a = g.apply(this, arguments);
                                a && p.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a]);
                            }
                            : c[f]);
                        }),
                        a = null;
                    }).promise();
                },
                promise: function(a) {
                    return a != null ? p.extend(a, d) : d;
                }
            }
              , e = {};
            return d.pipe = d.then,
            p.each(b, function(a, f) {
                var g = f[2]
                  , h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h;
                }, b[a ^ 1][2].disable, b[2][2].lock),
                e[f[0]] = g.fire,
                e[f[0] + "With"] = g.fireWith;
            }),
            d.promise(e),
            a && a.call(e, e),
            e;
        },
        when: function(a) {
            var b = 0, c = k.call(arguments), d = c.length, e = d !== 1 || a && p.isFunction(a.promise) ? d : 0, f = e === 1 ? a : p.Deferred(), g = function(a, b, c) {
                return function(d) {
                    b[a] = this,
                    c[a] = arguments.length > 1 ? k.call(arguments) : d,
                    c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c);
                }
                ;
            }, h, i, j;
            if (d > 1) {
                h = new Array(d),
                i = new Array(d),
                j = new Array(d);
                for (; b < d; b++) {
                    c[b] && p.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e;
                }
            }
            return e || f.resolveWith(j, c),
            f.promise();
        }
    }),
    p.support = function() {
        var b, c, d, f, g, h, i, j, k, l, m, n = e.createElement("div");
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        c = n.getElementsByTagName("*"),
        d = n.getElementsByTagName("a")[0],
        d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!c || !c.length) {
            return {};
        }
        f = e.createElement("select"),
        g = f.appendChild(e.createElement("option")),
        h = n.getElementsByTagName("input")[0],
        b = {
            leadingWhitespace: n.firstChild.nodeType === 3,
            tbody: !n.getElementsByTagName("tbody").length,
            htmlSerialize: !!n.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: d.getAttribute("href") === "/a",
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: h.value === "on",
            optSelected: g.selected,
            getSetAttribute: n.className !== "t",
            enctype: !!e.createElement("form").enctype,
            html5Clone: e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: e.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        h.checked = !0,
        b.noCloneChecked = h.cloneNode(!0).checked,
        f.disabled = !0,
        b.optDisabled = !g.disabled;
        try {
            delete n.test;
        } catch (o) {
            b.deleteExpando = !1;
        }
        !n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", m = function() {
            b.noCloneEvent = !1;
        }
        ),
        n.cloneNode(!0).fireEvent("onclick"),
        n.detachEvent("onclick", m)),
        h = e.createElement("input"),
        h.value = "t",
        h.setAttribute("type", "radio"),
        b.radioValue = h.value === "t",
        h.setAttribute("checked", "checked"),
        h.setAttribute("name", "t"),
        n.appendChild(h),
        i = e.createDocumentFragment(),
        i.appendChild(n.lastChild),
        b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.appendChecked = h.checked,
        i.removeChild(h),
        i.appendChild(n);
        if (n.attachEvent) {
            for (k in {
                submit: !0,
                change: !0,
                focusin: !0
            }) {
                j = "on" + k,
                l = j in n,
                l || (n.setAttribute(j, "return;"),
                l = typeof n[j] == "function"),
                b[k + "Bubbles"] = l;
            }
        }
        return p(function() {
            var c, d, f, g, h = "padding:0;margin:0;border:0;display:block;overflow:hidden;", i = e.getElementsByTagName("body")[0];
            if (!i) {
                return;
            }
            c = e.createElement("div"),
            c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            i.insertBefore(c, i.firstChild),
            d = e.createElement("div"),
            c.appendChild(d),
            d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            f = d.getElementsByTagName("td"),
            f[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            l = f[0].offsetHeight === 0,
            f[0].style.display = "",
            f[1].style.display = "none",
            b.reliableHiddenOffsets = l && f[0].offsetHeight === 0,
            d.innerHTML = "",
            d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            b.boxSizing = d.offsetWidth === 4,
            b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1,
            a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%",
            b.boxSizingReliable = (a.getComputedStyle(d, null) || {
                width: "4px"
            }).width === "4px",
            g = e.createElement("div"),
            g.style.cssText = d.style.cssText = h,
            g.style.marginRight = g.style.width = "0",
            d.style.width = "1px",
            d.appendChild(g),
            b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)),
            typeof d.style.zoom != "undefined" && (d.innerHTML = "",
            d.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1",
            b.inlineBlockNeedsLayout = d.offsetWidth === 3,
            d.style.display = "block",
            d.style.overflow = "visible",
            d.innerHTML = "<div></div>",
            d.firstChild.style.width = "5px",
            b.shrinkWrapBlocks = d.offsetWidth !== 3,
            c.style.zoom = 1),
            i.removeChild(c),
            c = d = f = g = null;
        }),
        i.removeChild(n),
        c = d = f = g = h = i = n = null,
        b;
    }();
    var H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , I = /([A-Z])/g;
    p.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (p.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? p.cache[a[p.expando]] : a[p.expando],
            !!a && !K(a);
        },
        data: function(a, c, d, e) {
            if (!p.acceptData(a)) {
                return;
            }
            var f, g, h = p.expando, i = typeof c == "string", j = a.nodeType, k = j ? p.cache : a, l = j ? a[h] : a[h] && h;
            if ((!l || !k[l] || !e && !k[l].data) && i && d === b) {
                return;
            }
            l || (j ? a[h] = l = p.deletedIds.pop() || p.guid++ : l = h),
            k[l] || (k[l] = {},
            j || (k[l].toJSON = p.noop));
            if (typeof c == "object" || typeof c == "function") {
                e ? k[l] = p.extend(k[l], c) : k[l].data = p.extend(k[l].data, c);
            }
            return f = k[l],
            e || (f.data || (f.data = {}),
            f = f.data),
            d !== b && (f[p.camelCase(c)] = d),
            i ? (g = f[c],
            g == null && (g = f[p.camelCase(c)])) : g = f,
            g;
        },
        removeData: function(a, b, c) {
            if (!p.acceptData(a)) {
                return;
            }
            var d, e, f, g = a.nodeType, h = g ? p.cache : a, i = g ? a[p.expando] : p.expando;
            if (!h[i]) {
                return;
            }
            if (b) {
                d = c ? h[i] : h[i].data;
                if (d) {
                    p.isArray(b) || (b in d ? b = [b] : (b = p.camelCase(b),
                    b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0,
                    f = b.length; e < f; e++) {
                        delete d[b[e]];
                    }
                    if (!(c ? K : p.isEmptyObject)(d)) {
                        return;
                    }
                }
            }
            if (!c) {
                delete h[i].data;
                if (!K(h[i])) {
                    return;
                }
            }
            g ? p.cleanData([a], !0) : p.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null;
        },
        _data: function(a, b, c) {
            return p.data(a, b, c, !0);
        },
        acceptData: function(a) {
            var b = a.nodeName && p.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b;
        }
    }),
    p.fn.extend({
        data: function(a, c) {
            var d, e, f, g, h, i = this[0], j = 0, k = null;
            if (a === b) {
                if (this.length) {
                    k = p.data(i);
                    if (i.nodeType === 1 && !p._data(i, "parsedAttrs")) {
                        f = i.attributes;
                        for (h = f.length; j < h; j++) {
                            g = f[j].name,
                            g.indexOf("data-") || (g = p.camelCase(g.substring(5)),
                            J(i, g, k[g]));
                        }
                        p._data(i, "parsedAttrs", !0);
                    }
                }
                return k;
            }
            return typeof a == "object" ? this.each(function() {
                p.data(this, a);
            }) : (d = a.split(".", 2),
            d[1] = d[1] ? "." + d[1] : "",
            e = d[1] + "!",
            p.access(this, function(c) {
                if (c === b) {
                    return k = this.triggerHandler("getData" + e, [d[0]]),
                    k === b && i && (k = p.data(i, a),
                    k = J(i, a, k)),
                    k === b && d[1] ? this.data(d[0]) : k;
                }
                d[1] = c,
                this.each(function() {
                    var b = p(this);
                    b.triggerHandler("setData" + e, d),
                    p.data(this, a, c),
                    b.triggerHandler("changeData" + e, d);
                });
            }, null, c, arguments.length > 1, null, !1));
        },
        removeData: function(a) {
            return this.each(function() {
                p.removeData(this, a);
            });
        }
    }),
    p.extend({
        queue: function(a, b, c) {
            var d;
            if (a) {
                return b = (b || "fx") + "queue",
                d = p._data(a, b),
                c && (!d || p.isArray(c) ? d = p._data(a, b, p.makeArray(c)) : d.push(c)),
                d || [];
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = p.queue(a, b)
              , d = c.length
              , e = c.shift()
              , f = p._queueHooks(a, b)
              , g = function() {
                p.dequeue(a, b);
            };
            e === "inprogress" && (e = c.shift(),
            d--),
            e && (b === "fx" && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
            !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return p._data(a, c) || p._data(a, c, {
                empty: p.Callbacks("once memory").add(function() {
                    p.removeData(a, b + "queue", !0),
                    p.removeData(a, c, !0);
                })
            });
        }
    }),
    p.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return typeof a != "string" && (c = a,
            a = "fx",
            d--),
            arguments.length < d ? p.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = p.queue(this, a, c);
                p._queueHooks(this, a),
                a === "fx" && b[0] !== "inprogress" && p.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                p.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            return a = p.fx ? p.fx.speeds[a] || a : a,
            b = b || "fx",
            this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                }
                ;
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, c) {
            var d, e = 1, f = p.Deferred(), g = this, h = this.length, i = function() {
                --e || f.resolveWith(g, [g]);
            };
            typeof a != "string" && (c = a,
            a = b),
            a = a || "fx";
            while (h--) {
                d = p._data(g[h], a + "queueHooks"),
                d && d.empty && (e++,
                d.empty.add(i));
            }
            return i(),
            f.promise(c);
        }
    });
    var L, M, N, O = /[\t\r\n]/g, P = /\r/g, Q = /^(?:button|input)$/i, R = /^(?:button|input|object|select|textarea)$/i, S = /^a(?:rea|)$/i, T = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, U = p.support.getSetAttribute;
    p.fn.extend({
        attr: function(a, b) {
            return p.access(this, p.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                p.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return p.access(this, p.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = p.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = b,
                    delete this[a];
                } catch (c) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, f, g, h;
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).addClass(a.call(this, b, this.className));
                });
            }
            if (a && typeof a == "string") {
                b = a.split(s);
                for (c = 0,
                d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) {
                        if (!e.className && b.length === 1) {
                            e.className = a;
                        } else {
                            f = " " + e.className + " ";
                            for (g = 0,
                            h = b.length; g < h; g++) {
                                f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
                            }
                            e.className = p.trim(f);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(a) {
            var c, d, e, f, g, h, i;
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).removeClass(a.call(this, b, this.className));
                });
            }
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(s);
                for (h = 0,
                i = this.length; h < i; h++) {
                    e = this[h];
                    if (e.nodeType === 1 && e.className) {
                        d = (" " + e.className + " ").replace(O, " ");
                        for (f = 0,
                        g = c.length; f < g; f++) {
                            while (d.indexOf(" " + c[f] + " ") >= 0) {
                                d = d.replace(" " + c[f] + " ", " ");
                            }
                        }
                        e.className = a ? p.trim(d) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a
              , d = typeof b == "boolean";
            return p.isFunction(a) ? this.each(function(c) {
                p(this).toggleClass(a.call(this, c, this.className, b), b);
            }) : this.each(function() {
                if (c === "string") {
                    var e, f = 0, g = p(this), h = b, i = a.split(s);
                    while (e = i[f++]) {
                        h = d ? h : !g.hasClass(e),
                        g[h ? "addClass" : "removeClass"](e);
                    }
                } else {
                    if (c === "undefined" || c === "boolean") {
                        this.className && p._data(this, "__className__", this.className),
                        this.className = this.className || a === !1 ? "" : p._data(this, "__className__") || "";
                    }
                }
            });
        },
        hasClass: function(a) {
            var b = " " + a + " "
              , c = 0
              , d = this.length;
            for (; c < d; c++) {
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) >= 0) {
                    return !0;
                }
            }
            return !1;
        },
        val: function(a) {
            var c, d, e, f = this[0];
            if (!arguments.length) {
                if (f) {
                    return c = p.valHooks[f.type] || p.valHooks[f.nodeName.toLowerCase()],
                    c && "get"in c && (d = c.get(f, "value")) !== b ? d : (d = f.value,
                    typeof d == "string" ? d.replace(P, "") : d == null ? "" : d);
                }
                return;
            }
            return e = p.isFunction(a),
            this.each(function(d) {
                var f, g = p(this);
                if (this.nodeType !== 1) {
                    return;
                }
                e ? f = a.call(this, d, g.val()) : f = a,
                f == null ? f = "" : typeof f == "number" ? f += "" : p.isArray(f) && (f = p.map(f, function(a) {
                    return a == null ? "" : a + "";
                })),
                c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()];
                if (!c || !("set"in c) || c.set(this, f, "value") === b) {
                    this.value = f;
                }
            });
        }
    }),
    p.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one";
                    if (f < 0) {
                        return null;
                    }
                    c = i ? f : 0,
                    d = i ? f + 1 : h.length;
                    for (; c < d; c++) {
                        e = h[c];
                        if (e.selected && (p.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !p.nodeName(e.parentNode, "optgroup"))) {
                            b = p(e).val();
                            if (i) {
                                return b;
                            }
                            g.push(b);
                        }
                    }
                    return i && !g.length && h.length ? p(h[f]).val() : g;
                },
                set: function(a, b) {
                    var c = p.makeArray(b);
                    return p(a).find("option").each(function() {
                        this.selected = p.inArray(p(this).val(), c) >= 0;
                    }),
                    c.length || (a.selectedIndex = -1),
                    c;
                }
            }
        },
        attrFn: {},
        attr: function(a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) {
                return;
            }
            if (e && p.isFunction(p.fn[c])) {
                return p(a)[c](d);
            }
            if (typeof a.getAttribute == "undefined") {
                return p.prop(a, c, d);
            }
            h = i !== 1 || !p.isXMLDoc(a),
            h && (c = c.toLowerCase(),
            g = p.attrHooks[c] || (T.test(c) ? M : L));
            if (d !== b) {
                if (d === null) {
                    p.removeAttr(a, c);
                    return;
                }
                return g && "set"in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""),
                d);
            }
            return g && "get"in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c),
            f === null ? b : f);
        },
        removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && a.nodeType === 1) {
                d = b.split(s);
                for (; g < d.length; g++) {
                    e = d[g],
                    e && (c = p.propFix[e] || e,
                    f = T.test(e),
                    f || p.attr(a, e, ""),
                    a.removeAttribute(U ? e : c),
                    f && c in a && (a[c] = !1));
                }
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (Q.test(a.nodeName) && a.parentNode) {
                        p.error("type property can't be changed");
                    } else {
                        if (!p.support.radioValue && b === "radio" && p.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b),
                            c && (a.value = c),
                            b;
                        }
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return L && p.nodeName(a, "button") ? L.get(a, b) : b in a ? a.value : null;
                },
                set: function(a, b, c) {
                    if (L && p.nodeName(a, "button")) {
                        return L.set(a, b, c);
                    }
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            if (!a || h === 3 || h === 8 || h === 2) {
                return;
            }
            return g = h !== 1 || !p.isXMLDoc(a),
            g && (c = p.propFix[c] || c,
            f = p.propHooks[c]),
            d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && (e = f.get(a, c)) !== null ? e : a[c];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : R.test(a.nodeName) || S.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }),
    M = {
        get: function(a, c) {
            var d, e = p.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? p.removeAttr(a, c) : (d = p.propFix[c] || c,
            d in a && (a[d] = !0),
            a.setAttribute(c, c.toLowerCase())),
            c;
        }
    },
    U || (N = {
        name: !0,
        id: !0,
        coords: !0
    },
    L = p.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c),
            d && (N[c] ? d.value !== "" : d.specified) ? d.value : b;
        },
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = e.createAttribute(c),
            a.setAttributeNode(d)),
            d.value = b + "";
        }
    },
    p.each(["width", "height"], function(a, b) {
        p.attrHooks[b] = p.extend(p.attrHooks[b], {
            set: function(a, c) {
                if (c === "") {
                    return a.setAttribute(b, "auto"),
                    c;
                }
            }
        });
    }),
    p.attrHooks.contenteditable = {
        get: L.get,
        set: function(a, b, c) {
            b === "" && (b = "false"),
            L.set(a, b, c);
        }
    }),
    p.support.hrefNormalized || p.each(["href", "src", "width", "height"], function(a, c) {
        p.attrHooks[c] = p.extend(p.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d;
            }
        });
    }),
    p.support.style || (p.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    }),
    p.support.optSelected || (p.propHooks.selected = p.extend(p.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex),
            null;
        }
    })),
    p.support.enctype || (p.propFix.enctype = "encoding"),
    p.support.checkOn || p.each(["radio", "checkbox"], function() {
        p.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }),
    p.each(["radio", "checkbox"], function() {
        p.valHooks[this] = p.extend(p.valHooks[this], {
            set: function(a, b) {
                if (p.isArray(b)) {
                    return a.checked = p.inArray(p(a).val(), b) >= 0;
                }
            }
        });
    });
    var V = /^(?:textarea|input|select)$/i
      , W = /^([^\.]*|)(?:\.(.+)|)$/
      , X = /(?:^|\s)hover(\.\S+|)\b/
      , Y = /^key/
      , Z = /^(?:mouse|contextmenu)|click/
      , $ = /^(?:focusinfocus|focusoutblur)$/
      , _ = function(a) {
        return p.event.special.hover ? a : a.replace(X, "mouseenter$1 mouseleave$1");
    };
    p.event = {
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, q, r;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = p._data(a))) {
                return;
            }
            d.handler && (o = d,
            d = o.handler,
            f = o.selector),
            d.guid || (d.guid = p.guid++),
            i = g.events,
            i || (g.events = i = {}),
            h = g.handle,
            h || (g.handle = h = function(a) {
                return typeof p != "undefined" && (!a || p.event.triggered !== a.type) ? p.event.dispatch.apply(h.elem, arguments) : b;
            }
            ,
            h.elem = a),
            c = p.trim(_(c)).split(" ");
            for (j = 0; j < c.length; j++) {
                k = W.exec(c[j]) || [],
                l = k[1],
                m = (k[2] || "").split(".").sort(),
                r = p.event.special[l] || {},
                l = (f ? r.delegateType : r.bindType) || l,
                r = p.event.special[l] || {},
                n = p.extend({
                    type: l,
                    origType: k[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && p.expr.match.needsContext.test(f),
                    namespace: m.join(".")
                }, o),
                q = i[l];
                if (!q) {
                    q = i[l] = [],
                    q.delegateCount = 0;
                    if (!r.setup || r.setup.call(a, e, m, h) === !1) {
                        a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h);
                    }
                }
                r.add && (r.add.call(a, n),
                n.handler.guid || (n.handler.guid = d.guid)),
                f ? q.splice(q.delegateCount++, 0, n) : q.push(n),
                p.event.global[l] = !0;
            }
            a = null;
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, q, r = p.hasData(a) && p._data(a);
            if (!r || !(m = r.events)) {
                return;
            }
            b = p.trim(_(b || "")).split(" ");
            for (f = 0; f < b.length; f++) {
                g = W.exec(b[f]) || [],
                h = i = g[1],
                j = g[2];
                if (!h) {
                    for (h in m) {
                        p.event.remove(a, h + b[f], c, d, !0);
                    }
                    continue;
                }
                n = p.event.special[h] || {},
                h = (d ? n.delegateType : n.bindType) || h,
                o = m[h] || [],
                k = o.length,
                j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (l = 0; l < o.length; l++) {
                    q = o[l],
                    (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (o.splice(l--, 1),
                    q.selector && o.delegateCount--,
                    n.remove && n.remove.call(a, q));
                }
                o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, r.handle) === !1) && p.removeEvent(a, h, r.handle),
                delete m[h]);
            }
            p.isEmptyObject(m) && (delete r.handle,
            p.removeData(a, "events", !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, f, g) {
            if (!f || f.nodeType !== 3 && f.nodeType !== 8) {
                var h, i, j, k, l, m, n, o, q, r, s = c.type || c, t = [];
                if ($.test(s + p.event.triggered)) {
                    return;
                }
                s.indexOf("!") >= 0 && (s = s.slice(0, -1),
                i = !0),
                s.indexOf(".") >= 0 && (t = s.split("."),
                s = t.shift(),
                t.sort());
                if ((!f || p.event.customEvent[s]) && !p.event.global[s]) {
                    return;
                }
                c = typeof c == "object" ? c[p.expando] ? c : new p.Event(s,c) : new p.Event(s),
                c.type = s,
                c.isTrigger = !0,
                c.exclusive = i,
                c.namespace = t.join("."),
                c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                m = s.indexOf(":") < 0 ? "on" + s : "";
                if (!f) {
                    h = p.cache;
                    for (j in h) {
                        h[j].events && h[j].events[s] && p.event.trigger(c, d, h[j].handle.elem, !0);
                    }
                    return;
                }
                c.result = b,
                c.target || (c.target = f),
                d = d != null ? p.makeArray(d) : [],
                d.unshift(c),
                n = p.event.special[s] || {};
                if (n.trigger && n.trigger.apply(f, d) === !1) {
                    return;
                }
                q = [[f, n.bindType || s]];
                if (!g && !n.noBubble && !p.isWindow(f)) {
                    r = n.delegateType || s,
                    k = $.test(r + s) ? f : f.parentNode;
                    for (l = f; k; k = k.parentNode) {
                        q.push([k, r]),
                        l = k;
                    }
                    l === (f.ownerDocument || e) && q.push([l.defaultView || l.parentWindow || a, r]);
                }
                for (j = 0; j < q.length && !c.isPropagationStopped(); j++) {
                    k = q[j][0],
                    c.type = q[j][1],
                    o = (p._data(k, "events") || {})[c.type] && p._data(k, "handle"),
                    o && o.apply(k, d),
                    o = m && k[m],
                    o && p.acceptData(k) && o.apply && o.apply(k, d) === !1 && c.preventDefault();
                }
                return c.type = s,
                !g && !c.isDefaultPrevented() && (!n._default || n._default.apply(f.ownerDocument, d) === !1) && (s !== "click" || !p.nodeName(f, "a")) && p.acceptData(f) && m && f[s] && (s !== "focus" && s !== "blur" || c.target.offsetWidth !== 0) && !p.isWindow(f) && (l = f[m],
                l && (f[m] = null),
                p.event.triggered = s,
                f[s](),
                p.event.triggered = b,
                l && (f[m] = l)),
                c.result;
            }
            return;
        },
        dispatch: function(c) {
            c = p.event.fix(c || a.event);
            var d, e, f, g, h, i, j, l, m, n, o = (p._data(this, "events") || {})[c.type] || [], q = o.delegateCount, r = k.call(arguments), s = !c.exclusive && !c.namespace, t = p.event.special[c.type] || {}, u = [];
            r[0] = c,
            c.delegateTarget = this;
            if (t.preDispatch && t.preDispatch.call(this, c) === !1) {
                return;
            }
            if (q && (!c.button || c.type !== "click")) {
                for (f = c.target; f != this; f = f.parentNode || this) {
                    if (f.disabled !== !0 || c.type !== "click") {
                        h = {},
                        j = [];
                        for (d = 0; d < q; d++) {
                            l = o[d],
                            m = l.selector,
                            h[m] === b && (h[m] = l.needsContext ? p(m, this).index(f) >= 0 : p.find(m, this, null, [f]).length),
                            h[m] && j.push(l);
                        }
                        j.length && u.push({
                            elem: f,
                            matches: j
                        });
                    }
                }
            }
            o.length > q && u.push({
                elem: this,
                matches: o.slice(q)
            });
            for (d = 0; d < u.length && !c.isPropagationStopped(); d++) {
                i = u[d],
                c.currentTarget = i.elem;
                for (e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++) {
                    l = i.matches[e];
                    if (s || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) {
                        c.data = l.data,
                        c.handleObj = l,
                        g = ((p.event.special[l.origType] || {}).handle || l.handler).apply(i.elem, r),
                        g !== b && (c.result = g,
                        g === !1 && (c.preventDefault(),
                        c.stopPropagation()));
                    }
                }
            }
            return t.postDispatch && t.postDispatch.call(this, c),
            c.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode),
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, f, g, h = c.button, i = c.fromElement;
                return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || e,
                f = d.documentElement,
                g = d.body,
                a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0),
                a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
                !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i),
                !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0),
                a;
            }
        },
        fix: function(a) {
            if (a[p.expando]) {
                return a;
            }
            var b, c, d = a, f = p.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
            a = p.Event(d);
            for (b = g.length; b; ) {
                c = g[--b],
                a[c] = d[c];
            }
            return a.target || (a.target = d.srcElement || e),
            a.target.nodeType === 3 && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            f.filter ? f.filter(a, d) : a;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    p.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = p.extend(new p.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? p.event.trigger(e, null, b) : p.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault();
        }
    },
    p.event.handle = p.event.dispatch,
    p.removeEvent = e.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    }
    : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null),
        a.detachEvent(d, c));
    }
    ,
    p.Event = function(a, b) {
        if (this instanceof p.Event) {
            a && a.type ? (this.originalEvent = a,
            this.type = a.type,
            this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? bb : ba) : this.type = a,
            b && p.extend(this, b),
            this.timeStamp = a && a.timeStamp || p.now(),
            this[p.expando] = !0;
        } else {
            return new p.Event(a,b);
        }
    }
    ,
    p.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = bb;
            var a = this.originalEvent;
            if (!a) {
                return;
            }
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        },
        stopPropagation: function() {
            this.isPropagationStopped = bb;
            var a = this.originalEvent;
            if (!a) {
                return;
            }
            a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = bb,
            this.stopPropagation();
        },
        isDefaultPrevented: ba,
        isPropagationStopped: ba,
        isImmediatePropagationStopped: ba
    },
    p.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        p.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector;
                if (!e || e !== d && !p.contains(d, e)) {
                    a.type = f.origType,
                    c = f.handler.apply(this, arguments),
                    a.type = b;
                }
                return c;
            }
        };
    }),
    p.support.submitBubbles || (p.event.special.submit = {
        setup: function() {
            if (p.nodeName(this, "form")) {
                return !1;
            }
            p.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target
                  , d = p.nodeName(c, "input") || p.nodeName(c, "button") ? c.form : b;
                d && !p._data(d, "_submit_attached") && (p.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }),
                p._data(d, "_submit_attached", !0));
            });
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && p.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            if (p.nodeName(this, "form")) {
                return !1;
            }
            p.event.remove(this, "._submit");
        }
    }),
    p.support.changeBubbles || (p.event.special.change = {
        setup: function() {
            if (V.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    p.event.add(this, "propertychange._change", function(a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                    }),
                    p.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1),
                        p.event.simulate("change", this, a, !0);
                    });
                }
                return !1;
            }
            p.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                V.test(b.nodeName) && !p._data(b, "_change_attached") && (p.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && p.event.simulate("change", this.parentNode, a, !0);
                }),
                p._data(b, "_change_attached", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
                return a.handleObj.handler.apply(this, arguments);
            }
        },
        teardown: function() {
            return p.event.remove(this, "._change"),
            !V.test(this.nodeName);
        }
    }),
    p.support.focusinBubbles || p.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0
          , d = function(a) {
            p.event.simulate(b, a.target, p.event.fix(a), !0);
        };
        p.event.special[b] = {
            setup: function() {
                c++ === 0 && e.addEventListener(a, d, !0);
            },
            teardown: function() {
                --c === 0 && e.removeEventListener(a, d, !0);
            }
        };
    }),
    p.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c,
                c = b);
                for (h in a) {
                    this.on(h, c, d, a[h], f);
                }
                return this;
            }
            d == null && e == null ? (e = c,
            d = c = b) : e == null && (typeof c == "string" ? (e = d,
            d = b) : (e = d,
            d = c,
            c = b));
            if (e === !1) {
                e = ba;
            } else {
                if (!e) {
                    return this;
                }
            }
            return f === 1 && (g = e,
            e = function(a) {
                return p().off(a),
                g.apply(this, arguments);
            }
            ,
            e.guid = g.guid || (g.guid = p.guid++)),
            this.each(function() {
                p.event.add(this, a, e, d, c);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) {
                return e = a.handleObj,
                p(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler),
                this;
            }
            if (typeof a == "object") {
                for (f in a) {
                    this.off(f, c, a[f]);
                }
                return this;
            }
            if (c === !1 || typeof c == "function") {
                d = c,
                c = b;
            }
            return d === !1 && (d = ba),
            this.each(function() {
                p.event.remove(this, a, d, c);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        live: function(a, b, c) {
            return p(this.context).on(a, this.selector, b, c),
            this;
        },
        die: function(a, b) {
            return p(this.context).off(a, this.selector || "**", b),
            this;
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                p.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                return p.event.trigger(a, b, this[0], !0);
            }
        },
        toggle: function(a) {
            var b = arguments
              , c = a.guid || p.guid++
              , d = 0
              , e = function(c) {
                var e = (p._data(this, "lastToggle" + a.guid) || 0) % d;
                return p._data(this, "lastToggle" + a.guid, e + 1),
                c.preventDefault(),
                b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) {
                b[d++].guid = c;
            }
            return this.click(e);
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }),
    p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        p.fn[b] = function(a, c) {
            return c == null && (c = a,
            a = null),
            arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }
        ,
        Y.test(b) && (p.event.fixHooks[b] = p.event.keyHooks),
        Z.test(b) && (p.event.fixHooks[b] = p.event.mouseHooks);
    }),
    function(a, b) {
        function bc(a, b, c, d) {
            c = c || [],
            b = b || r;
            var e, f, i, j, k = b.nodeType;
            if (!a || typeof a != "string") {
                return c;
            }
            if (k !== 1 && k !== 9) {
                return [];
            }
            i = g(b);
            if (!i && !d) {
                if (e = P.exec(a)) {
                    if (j = e[1]) {
                        if (k === 9) {
                            f = b.getElementById(j);
                            if (!f || !f.parentNode) {
                                return c;
                            }
                            if (f.id === j) {
                                return c.push(f),
                                c;
                            }
                        } else {
                            if (b.ownerDocument && (f = b.ownerDocument.getElementById(j)) && h(b, f) && f.id === j) {
                                return c.push(f),
                                c;
                            }
                        }
                    } else {
                        if (e[2]) {
                            return w.apply(c, x.call(b.getElementsByTagName(a), 0)),
                            c;
                        }
                        if ((j = e[3]) && _ && b.getElementsByClassName) {
                            return w.apply(c, x.call(b.getElementsByClassName(j), 0)),
                            c;
                        }
                    }
                }
            }
            return bp(a.replace(L, "$1"), b, c, d, i);
        }
        function bd(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return c === "input" && b.type === a;
            }
            ;
        }
        function be(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return (c === "input" || c === "button") && b.type === a;
            }
            ;
        }
        function bf(a) {
            return z(function(b) {
                return b = +b,
                z(function(c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) {
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                    }
                });
            });
        }
        function bg(a, b, c) {
            if (a === b) {
                return c;
            }
            var d = a.nextSibling;
            while (d) {
                if (d === b) {
                    return -1;
                }
                d = d.nextSibling;
            }
            return 1;
        }
        function bh(a, b) {
            var c, d, f, g, h, i, j, k = C[o][a];
            if (k) {
                return b ? 0 : k.slice(0);
            }
            h = a,
            i = [],
            j = e.preFilter;
            while (h) {
                if (!c || (d = M.exec(h))) {
                    d && (h = h.slice(d[0].length)),
                    i.push(f = []);
                }
                c = !1;
                if (d = N.exec(h)) {
                    f.push(c = new q(d.shift())),
                    h = h.slice(c.length),
                    c.type = d[0].replace(L, " ");
                }
                for (g in e.filter) {
                    (d = W[g].exec(h)) && (!j[g] || (d = j[g](d, r, !0))) && (f.push(c = new q(d.shift())),
                    h = h.slice(c.length),
                    c.type = g,
                    c.matches = d);
                }
                if (!c) {
                    break;
                }
            }
            return b ? h.length : h ? bc.error(a) : C(a, i).slice(0);
        }
        function bi(a, b, d) {
            var e = b.dir
              , f = d && b.dir === "parentNode"
              , g = u++;
            return b.first ? function(b, c, d) {
                while (b = b[e]) {
                    if (f || b.nodeType === 1) {
                        return a(b, c, d);
                    }
                }
            }
            : function(b, d, h) {
                if (!h) {
                    var i, j = t + " " + g + " ", k = j + c;
                    while (b = b[e]) {
                        if (f || b.nodeType === 1) {
                            if ((i = b[o]) === k) {
                                return b.sizset;
                            }
                            if (typeof i == "string" && i.indexOf(j) === 0) {
                                if (b.sizset) {
                                    return b;
                                }
                            } else {
                                b[o] = k;
                                if (a(b, d, h)) {
                                    return b.sizset = !0,
                                    b;
                                }
                                b.sizset = !1;
                            }
                        }
                    }
                } else {
                    while (b = b[e]) {
                        if (f || b.nodeType === 1) {
                            if (a(b, d, h)) {
                                return b;
                            }
                        }
                    }
                }
            }
            ;
        }
        function bj(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--) {
                    if (!a[e](b, c, d)) {
                        return !1;
                    }
                }
                return !0;
            }
            : a[0];
        }
        function bk(a, b, c, d, e) {
            var f, g = [], h = 0, i = a.length, j = b != null;
            for (; h < i; h++) {
                if (f = a[h]) {
                    if (!c || c(f, d, e)) {
                        g.push(f),
                        j && b.push(h);
                    }
                }
            }
            return g;
        }
        function bl(a, b, c, d, e, f) {
            return d && !d[o] && (d = bl(d)),
            e && !e[o] && (e = bl(e, f)),
            z(function(f, g, h, i) {
                if (f && e) {
                    return;
                }
                var j, k, l, m = [], n = [], o = g.length, p = f || bo(b || "*", h.nodeType ? [h] : h, [], f), q = a && (f || !b) ? bk(p, m, a, h, i) : p, r = c ? e || (f ? a : o || d) ? [] : g : q;
                c && c(q, r, h, i);
                if (d) {
                    l = bk(r, n),
                    d(l, [], h, i),
                    j = l.length;
                    while (j--) {
                        if (k = l[j]) {
                            r[n[j]] = !(q[n[j]] = k);
                        }
                    }
                }
                if (f) {
                    j = a && r.length;
                    while (j--) {
                        if (k = r[j]) {
                            f[m[j]] = !(g[m[j]] = k);
                        }
                    }
                } else {
                    r = bk(r === g ? r.splice(o, r.length) : r),
                    e ? e(null, g, r, i) : w.apply(g, r);
                }
            });
        }
        function bm(a) {
            var b, c, d, f = a.length, g = e.relative[a[0].type], h = g || e.relative[" "], i = g ? 1 : 0, j = bi(function(a) {
                return a === b;
            }, h, !0), k = bi(function(a) {
                return y.call(b, a) > -1;
            }, h, !0), m = [function(a, c, d) {
                return !g && (d || c !== l) || ((b = c).nodeType ? j(a, c, d) : k(a, c, d));
            }
            ];
            for (; i < f; i++) {
                if (c = e.relative[a[i].type]) {
                    m = [bi(bj(m), c)];
                } else {
                    c = e.filter[a[i].type].apply(null, a[i].matches);
                    if (c[o]) {
                        d = ++i;
                        for (; d < f; d++) {
                            if (e.relative[a[d].type]) {
                                break;
                            }
                        }
                        return bl(i > 1 && bj(m), i > 1 && a.slice(0, i - 1).join("").replace(L, "$1"), c, i < d && bm(a.slice(i, d)), d < f && bm(a = a.slice(d)), d < f && a.join(""));
                    }
                    m.push(c);
                }
            }
            return bj(m);
        }
        function bn(a, b) {
            var d = b.length > 0
              , f = a.length > 0
              , g = function(h, i, j, k, m) {
                var n, o, p, q = [], s = 0, u = "0", x = h && [], y = m != null, z = l, A = h || f && e.find.TAG("*", m && i.parentNode || i), B = t += z == null ? 1 : Math.E;
                y && (l = i !== r && i,
                c = g.el);
                for (; (n = A[u]) != null; u++) {
                    if (f && n) {
                        for (o = 0; p = a[o]; o++) {
                            if (p(n, i, j)) {
                                k.push(n);
                                break;
                            }
                        }
                        y && (t = B,
                        c = ++g.el);
                    }
                    d && ((n = !p && n) && s--,
                    h && x.push(n));
                }
                s += u;
                if (d && u !== s) {
                    for (o = 0; p = b[o]; o++) {
                        p(x, q, i, j);
                    }
                    if (h) {
                        if (s > 0) {
                            while (u--) {
                                !x[u] && !q[u] && (q[u] = v.call(k));
                            }
                        }
                        q = bk(q);
                    }
                    w.apply(k, q),
                    y && !h && q.length > 0 && s + b.length > 1 && bc.uniqueSort(k);
                }
                return y && (t = B,
                l = z),
                x;
            };
            return g.el = 0,
            d ? z(g) : g;
        }
        function bo(a, b, c, d) {
            var e = 0
              , f = b.length;
            for (; e < f; e++) {
                bc(a, b[e], c, d);
            }
            return c;
        }
        function bp(a, b, c, d, f) {
            var g, h, j, k, l, m = bh(a), n = m.length;
            if (!d && m.length === 1) {
                h = m[0] = m[0].slice(0);
                if (h.length > 2 && (j = h[0]).type === "ID" && b.nodeType === 9 && !f && e.relative[h[1].type]) {
                    b = e.find.ID(j.matches[0].replace(V, ""), b, f)[0];
                    if (!b) {
                        return c;
                    }
                    a = a.slice(h.shift().length);
                }
                for (g = W.POS.test(a) ? -1 : h.length - 1; g >= 0; g--) {
                    j = h[g];
                    if (e.relative[k = j.type]) {
                        break;
                    }
                    if (l = e.find[k]) {
                        if (d = l(j.matches[0].replace(V, ""), R.test(h[0].type) && b.parentNode || b, f)) {
                            h.splice(g, 1),
                            a = d.length && h.join("");
                            if (!a) {
                                return w.apply(c, x.call(d, 0)),
                                c;
                            }
                            break;
                        }
                    }
                }
            }
            return i(a, m)(d, b, f, c, R.test(a)),
            c;
        }
        function bq() {}
        var c, d, e, f, g, h, i, j, k, l, m = !0, n = "undefined", o = ("sizcache" + Math.random()).replace(".", ""), q = String, r = a.document, s = r.documentElement, t = 0, u = 0, v = [].pop, w = [].push, x = [].slice, y = [].indexOf || function(a) {
            var b = 0
              , c = this.length;
            for (; b < c; b++) {
                if (this[b] === a) {
                    return b;
                }
            }
            return -1;
        }
        , z = function(a, b) {
            return a[o] = b == null || b,
            a;
        }, A = function() {
            var a = {}
              , b = [];
            return z(function(c, d) {
                return b.push(c) > e.cacheLength && delete a[b.shift()],
                a[c] = d;
            }, a);
        }, B = A(), C = A(), D = A(), E = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", G = F.replace("w", "w#"), H = "([*^$|!~]?=)", I = "\\[" + E + "*(" + F + ")" + E + "*(?:" + H + E + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + G + ")|)|)" + E + "*\\]", J = ":(" + F + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + I + ")|[^:]|\\\\.)*|.*))\\)|)", K = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + E + "*((?:-\\d)?\\d*)" + E + "*\\)|)(?=[^-]|$)", L = new RegExp("^" + E + "+|((?:^|[^\\\\])(?:\\\\.)*)" + E + "+$","g"), M = new RegExp("^" + E + "*," + E + "*"), N = new RegExp("^" + E + "*([\\x20\\t\\r\\n\\f>+~])" + E + "*"), O = new RegExp(J), P = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, Q = /^:not/, R = /[\x20\t\r\n\f]*[+~]/, S = /:not\($/, T = /h\d/i, U = /input|select|textarea|button/i, V = /\\(?!\\)/g, W = {
            ID: new RegExp("^#(" + F + ")"),
            CLASS: new RegExp("^\\.(" + F + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"),
            TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + I),
            PSEUDO: new RegExp("^" + J),
            POS: new RegExp(K,"i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + E + "*(even|odd|(([+-]|)(\\d*)n|)" + E + "*(?:([+-]|)" + E + "*(\\d+)|))" + E + "*\\)|)","i"),
            needsContext: new RegExp("^" + E + "*[>+~]|" + K,"i")
        }, X = function(a) {
            var b = r.createElement("div");
            try {
                return a(b);
            } catch (c) {
                return !1;
            } finally {
                b = null;
            }
        }, Y = X(function(a) {
            return a.appendChild(r.createComment("")),
            !a.getElementsByTagName("*").length;
        }), Z = X(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            a.firstChild && typeof a.firstChild.getAttribute !== n && a.firstChild.getAttribute("href") === "#";
        }), $ = X(function(a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return b !== "boolean" && b !== "string";
        }), _ = X(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            !a.getElementsByClassName || !a.getElementsByClassName("e").length ? !1 : (a.lastChild.className = "e",
            a.getElementsByClassName("e").length === 2);
        }), ba = X(function(a) {
            a.id = o + 0,
            a.innerHTML = "<a name='" + o + "'></a><div name='" + o + "'></div>",
            s.insertBefore(a, s.firstChild);
            var b = r.getElementsByName && r.getElementsByName(o).length === 2 + r.getElementsByName(o + 0).length;
            return d = !r.getElementById(o),
            s.removeChild(a),
            b;
        });
        try {
            x.call(s.childNodes, 0)[0].nodeType;
        } catch (bb) {
            x = function(a) {
                var b, c = [];
                for (; b = this[a]; a++) {
                    c.push(b);
                }
                return c;
            }
            ;
        }
        bc.matches = function(a, b) {
            return bc(a, null, null, b);
        }
        ,
        bc.matchesSelector = function(a, b) {
            return bc(b, null, null, [a]).length > 0;
        }
        ,
        f = bc.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (e === 1 || e === 9 || e === 11) {
                    if (typeof a.textContent == "string") {
                        return a.textContent;
                    }
                    for (a = a.firstChild; a; a = a.nextSibling) {
                        c += f(a);
                    }
                } else {
                    if (e === 3 || e === 4) {
                        return a.nodeValue;
                    }
                }
            } else {
                for (; b = a[d]; d++) {
                    c += f(b);
                }
            }
            return c;
        }
        ,
        g = bc.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        }
        ,
        h = bc.contains = s.contains ? function(a, b) {
            var c = a.nodeType === 9 ? a.documentElement : a
              , d = b && b.parentNode;
            return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d));
        }
        : s.compareDocumentPosition ? function(a, b) {
            return b && !!(a.compareDocumentPosition(b) & 16);
        }
        : function(a, b) {
            while (b = b.parentNode) {
                if (b === a) {
                    return !0;
                }
            }
            return !1;
        }
        ,
        bc.attr = function(a, b) {
            var c, d = g(a);
            return d || (b = b.toLowerCase()),
            (c = e.attrHandle[b]) ? c(a) : d || $ ? a.getAttribute(b) : (c = a.getAttributeNode(b),
            c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null);
        }
        ,
        e = bc.selectors = {
            cacheLength: 50,
            createPseudo: z,
            match: W,
            attrHandle: Z ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2);
                },
                type: function(a) {
                    return a.getAttribute("type");
                }
            },
            find: {
                ID: d ? function(a, b, c) {
                    if (typeof b.getElementById !== n && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [d] : [];
                    }
                }
                : function(a, c, d) {
                    if (typeof c.getElementById !== n && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== n && e.getAttributeNode("id").value === a ? [e] : b : [];
                    }
                }
                ,
                TAG: Y ? function(a, b) {
                    if (typeof b.getElementsByTagName !== n) {
                        return b.getElementsByTagName(a);
                    }
                }
                : function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if (a === "*") {
                        var d, e = [], f = 0;
                        for (; d = c[f]; f++) {
                            d.nodeType === 1 && e.push(d);
                        }
                        return e;
                    }
                    return c;
                }
                ,
                NAME: ba && function(a, b) {
                    if (typeof b.getElementsByName !== n) {
                        return b.getElementsByName(name);
                    }
                }
                ,
                CLASS: _ && function(a, b, c) {
                    if (typeof b.getElementsByClassName !== n && !c) {
                        return b.getElementsByClassName(a);
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(V, ""),
                    a[3] = (a[4] || a[5] || "").replace(V, ""),
                    a[2] === "~=" && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    a[1] === "nth" ? (a[2] || bc.error(a[0]),
                    a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")),
                    a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && bc.error(a[0]),
                    a;
                },
                PSEUDO: function(a) {
                    var b, c;
                    if (W.CHILD.test(a[0])) {
                        return null;
                    }
                    if (a[3]) {
                        a[2] = a[3];
                    } else {
                        if (b = a[4]) {
                            O.test(b) && (c = bh(b, !0)) && (c = b.indexOf(")", b.length - c) - b.length) && (b = b.slice(0, c),
                            a[0] = a[0].slice(0, c)),
                            a[2] = b;
                        }
                    }
                    return a.slice(0, 3);
                }
            },
            filter: {
                ID: d ? function(a) {
                    return a = a.replace(V, ""),
                    function(b) {
                        return b.getAttribute("id") === a;
                    }
                    ;
                }
                : function(a) {
                    return a = a.replace(V, ""),
                    function(b) {
                        var c = typeof b.getAttributeNode !== n && b.getAttributeNode("id");
                        return c && c.value === a;
                    }
                    ;
                }
                ,
                TAG: function(a) {
                    return a === "*" ? function() {
                        return !0;
                    }
                    : (a = a.replace(V, "").toLowerCase(),
                    function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a;
                    }
                    );
                },
                CLASS: function(a) {
                    var b = B[o][a];
                    return b || (b = B(a, new RegExp("(^|" + E + ")" + a + "(" + E + "|$)"))),
                    function(a) {
                        return b.test(a.className || typeof a.getAttribute !== n && a.getAttribute("class") || "");
                    }
                    ;
                },
                ATTR: function(a, b, c) {
                    return function(d, e) {
                        var f = bc.attr(d, a);
                        return f == null ? b === "!=" : b ? (f += "",
                        b === "=" ? f === c : b === "!=" ? f !== c : b === "^=" ? c && f.indexOf(c) === 0 : b === "*=" ? c && f.indexOf(c) > -1 : b === "$=" ? c && f.substr(f.length - c.length) === c : b === "~=" ? (" " + f + " ").indexOf(c) > -1 : b === "|=" ? f === c || f.substr(0, c.length + 1) === c + "-" : !1) : !0;
                    }
                    ;
                },
                CHILD: function(a, b, c, d) {
                    return a === "nth" ? function(a) {
                        var b, e, f = a.parentNode;
                        if (c === 1 && d === 0) {
                            return !0;
                        }
                        if (f) {
                            e = 0;
                            for (b = f.firstChild; b; b = b.nextSibling) {
                                if (b.nodeType === 1) {
                                    e++;
                                    if (a === b) {
                                        break;
                                    }
                                }
                            }
                        }
                        return e -= d,
                        e === c || e % c === 0 && e / c >= 0;
                    }
                    : function(b) {
                        var c = b;
                        switch (a) {
                        case "only":
                        case "first":
                            while (c = c.previousSibling) {
                                if (c.nodeType === 1) {
                                    return !1;
                                }
                            }
                            if (a === "first") {
                                return !0;
                            }
                            c = b;
                        case "last":
                            while (c = c.nextSibling) {
                                if (c.nodeType === 1) {
                                    return !1;
                                }
                            }
                            return !0;
                        }
                    }
                    ;
                },
                PSEUDO: function(a, b) {
                    var c, d = e.pseudos[a] || e.setFilters[a.toLowerCase()] || bc.error("unsupported pseudo: " + a);
                    return d[o] ? d(b) : d.length > 1 ? (c = [a, a, "", b],
                    e.setFilters.hasOwnProperty(a.toLowerCase()) ? z(function(a, c) {
                        var e, f = d(a, b), g = f.length;
                        while (g--) {
                            e = y.call(a, f[g]),
                            a[e] = !(c[e] = f[g]);
                        }
                    }) : function(a) {
                        return d(a, 0, c);
                    }
                    ) : d;
                }
            },
            pseudos: {
                not: z(function(a) {
                    var b = []
                      , c = []
                      , d = i(a.replace(L, "$1"));
                    return d[o] ? z(function(a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) {
                            if (f = g[h]) {
                                a[h] = !(b[h] = f);
                            }
                        }
                    }) : function(a, e, f) {
                        return b[0] = a,
                        d(b, null, f, c),
                        !c.pop();
                    }
                    ;
                }),
                has: z(function(a) {
                    return function(b) {
                        return bc(a, b).length > 0;
                    }
                    ;
                }),
                contains: z(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || f(b)).indexOf(a) > -1;
                    }
                    ;
                }),
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && !!a.checked || b === "option" && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0;
                },
                parent: function(a) {
                    return !e.pseudos.empty(a);
                },
                empty: function(a) {
                    var b;
                    a = a.firstChild;
                    while (a) {
                        if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) {
                            return !1;
                        }
                        a = a.nextSibling;
                    }
                    return !0;
                },
                header: function(a) {
                    return T.test(a.nodeName);
                },
                text: function(a) {
                    var b, c;
                    return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b);
                },
                radio: bd("radio"),
                checkbox: bd("checkbox"),
                file: bd("file"),
                password: bd("password"),
                image: bd("image"),
                submit: be("submit"),
                reset: be("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && a.type === "button" || b === "button";
                },
                input: function(a) {
                    return U.test(a.nodeName);
                },
                focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href);
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement;
                },
                first: bf(function(a, b, c) {
                    return [0];
                }),
                last: bf(function(a, b, c) {
                    return [b - 1];
                }),
                eq: bf(function(a, b, c) {
                    return [c < 0 ? c + b : c];
                }),
                even: bf(function(a, b, c) {
                    for (var d = 0; d < b; d += 2) {
                        a.push(d);
                    }
                    return a;
                }),
                odd: bf(function(a, b, c) {
                    for (var d = 1; d < b; d += 2) {
                        a.push(d);
                    }
                    return a;
                }),
                lt: bf(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0; ) {
                        a.push(d);
                    }
                    return a;
                }),
                gt: bf(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b; ) {
                        a.push(d);
                    }
                    return a;
                })
            }
        },
        j = s.compareDocumentPosition ? function(a, b) {
            return a === b ? (k = !0,
            0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
        }
        : function(a, b) {
            if (a === b) {
                return k = !0,
                0;
            }
            if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex;
            }
            var c, d, e = [], f = [], g = a.parentNode, h = b.parentNode, i = g;
            if (g === h) {
                return bg(a, b);
            }
            if (!g) {
                return -1;
            }
            if (!h) {
                return 1;
            }
            while (i) {
                e.unshift(i),
                i = i.parentNode;
            }
            i = h;
            while (i) {
                f.unshift(i),
                i = i.parentNode;
            }
            c = e.length,
            d = f.length;
            for (var j = 0; j < c && j < d; j++) {
                if (e[j] !== f[j]) {
                    return bg(e[j], f[j]);
                }
            }
            return j === c ? bg(a, f[j], -1) : bg(e[j], b, 1);
        }
        ,
        [0, 0].sort(j),
        m = !k,
        bc.uniqueSort = function(a) {
            var b, c = 1;
            k = m,
            a.sort(j);
            if (k) {
                for (; b = a[c]; c++) {
                    b === a[c - 1] && a.splice(c--, 1);
                }
            }
            return a;
        }
        ,
        bc.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }
        ,
        i = bc.compile = function(a, b) {
            var c, d = [], e = [], f = D[o][a];
            if (!f) {
                b || (b = bh(a)),
                c = b.length;
                while (c--) {
                    f = bm(b[c]),
                    f[o] ? d.push(f) : e.push(f);
                }
                f = D(a, bn(e, d));
            }
            return f;
        }
        ,
        r.querySelectorAll && function() {
            var a, b = bp, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [":focus"], f = [":active", ":focus"], h = s.matchesSelector || s.mozMatchesSelector || s.webkitMatchesSelector || s.oMatchesSelector || s.msMatchesSelector;
            X(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>",
                a.querySelectorAll("[selected]").length || e.push("\\[" + E + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                a.querySelectorAll(":checked").length || e.push(":checked");
            }),
            X(function(a) {
                a.innerHTML = "<p test=''></p>",
                a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + E + "*(?:\"\"|'')"),
                a.innerHTML = "<input type='hidden'/>",
                a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
            }),
            e = new RegExp(e.join("|")),
            bp = function(a, d, f, g, h) {
                if (!g && !h && (!e || !e.test(a))) {
                    var i, j, k = !0, l = o, m = d, n = d.nodeType === 9 && a;
                    if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                        i = bh(a),
                        (k = d.getAttribute("id")) ? l = k.replace(c, "\\$&") : d.setAttribute("id", l),
                        l = "[id='" + l + "'] ",
                        j = i.length;
                        while (j--) {
                            i[j] = l + i[j].join("");
                        }
                        m = R.test(a) && d.parentNode || d,
                        n = i.join(",");
                    }
                    if (n) {
                        try {
                            return w.apply(f, x.call(m.querySelectorAll(n), 0)),
                            f;
                        } catch (p) {} finally {
                            k || d.removeAttribute("id");
                        }
                    }
                }
                return b(a, d, f, g, h);
            }
            ,
            h && (X(function(b) {
                a = h.call(b, "div");
                try {
                    h.call(b, "[test!='']:sizzle"),
                    f.push("!=", J);
                } catch (c) {}
            }),
            f = new RegExp(f.join("|")),
            bc.matchesSelector = function(b, c) {
                c = c.replace(d, "='$1']");
                if (!g(b) && !f.test(c) && (!e || !e.test(c))) {
                    try {
                        var i = h.call(b, c);
                        if (i || a || b.document && b.document.nodeType !== 11) {
                            return i;
                        }
                    } catch (j) {}
                }
                return bc(c, null, null, [b]).length > 0;
            }
            );
        }(),
        e.pseudos.nth = e.pseudos.eq,
        e.filters = bq.prototype = e.pseudos,
        e.setFilters = new bq,
        bc.attr = p.attr,
        p.find = bc,
        p.expr = bc.selectors,
        p.expr[":"] = p.expr.pseudos,
        p.unique = bc.uniqueSort,
        p.text = bc.getText,
        p.isXMLDoc = bc.isXML,
        p.contains = bc.contains;
    }(a);
    var bc = /Until$/
      , bd = /^(?:parents|prev(?:Until|All))/
      , be = /^.[^:#\[\.,]*$/
      , bf = p.expr.match.needsContext
      , bg = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    p.fn.extend({
        find: function(a) {
            var b, c, d, e, f, g, h = this;
            if (typeof a != "string") {
                return p(a).filter(function() {
                    for (b = 0,
                    c = h.length; b < c; b++) {
                        if (p.contains(h[b], this)) {
                            return !0;
                        }
                    }
                });
            }
            g = this.pushStack("", "find", a);
            for (b = 0,
            c = this.length; b < c; b++) {
                d = g.length,
                p.find(a, this[b], g);
                if (b > 0) {
                    for (e = d; e < g.length; e++) {
                        for (f = 0; f < d; f++) {
                            if (g[f] === g[e]) {
                                g.splice(e--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return g;
        },
        has: function(a) {
            var b, c = p(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; b < d; b++) {
                    if (p.contains(this, c[b])) {
                        return !0;
                    }
                }
            });
        },
        not: function(a) {
            return this.pushStack(bj(this, a, !1), "not", a);
        },
        filter: function(a) {
            return this.pushStack(bj(this, a, !0), "filter", a);
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? bf.test(a) ? p(a, this.context).index(this[0]) >= 0 : p.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            var c, d = 0, e = this.length, f = [], g = bf.test(a) || typeof a != "string" ? p(a, b || this.context) : 0;
            for (; d < e; d++) {
                c = this[d];
                while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                    if (g ? g.index(c) > -1 : p.find.matchesSelector(c, a)) {
                        f.push(c);
                        break;
                    }
                    c = c.parentNode;
                }
            }
            return f = f.length > 1 ? p.unique(f) : f,
            this.pushStack(f, "closest", a);
        },
        index: function(a) {
            return a ? typeof a == "string" ? p.inArray(this[0], p(a)) : p.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function(a, b) {
            var c = typeof a == "string" ? p(a, b) : p.makeArray(a && a.nodeType ? [a] : a)
              , d = p.merge(this.get(), c);
            return this.pushStack(bh(c[0]) || bh(d[0]) ? d : p.unique(d));
        },
        addBack: function(a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a));
        }
    }),
    p.fn.andSelf = p.fn.addBack,
    p.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function(a) {
            return p.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return p.dir(a, "parentNode", c);
        },
        next: function(a) {
            return bi(a, "nextSibling");
        },
        prev: function(a) {
            return bi(a, "previousSibling");
        },
        nextAll: function(a) {
            return p.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return p.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return p.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return p.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return p.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return p.sibling(a.firstChild);
        },
        contents: function(a) {
            return p.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : p.merge([], a.childNodes);
        }
    }, function(a, b) {
        p.fn[a] = function(c, d) {
            var e = p.map(this, b, c);
            return bc.test(a) || (d = c),
            d && typeof d == "string" && (e = p.filter(d, e)),
            e = this.length > 1 && !bg[a] ? p.unique(e) : e,
            this.length > 1 && bd.test(a) && (e = e.reverse()),
            this.pushStack(e, a, k.call(arguments).join(","));
        }
        ;
    }),
    p.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"),
            b.length === 1 ? p.find.matchesSelector(b[0], a) ? [b[0]] : [] : p.find.matches(a, b);
        },
        dir: function(a, c, d) {
            var e = []
              , f = a[c];
            while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !p(f).is(d))) {
                f.nodeType === 1 && e.push(f),
                f = f[c];
            }
            return e;
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) {
                a.nodeType === 1 && a !== b && c.push(a);
            }
            return c;
        }
    });
    var bl = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , bm = / jQuery\d+="(?:null|\d+)"/g
      , bn = /^\s+/
      , bo = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , bp = /<([\w:]+)/
      , bq = /<tbody/i
      , br = /<|&#?\w+;/
      , bs = /<(?:script|style|link)/i
      , bt = /<(?:script|object|embed|option|style)/i
      , bu = new RegExp("<(?:" + bl + ")[\\s/>]","i")
      , bv = /^(?:checkbox|radio)$/
      , bw = /checked\s*(?:[^=]|=\s*.checked.)/i
      , bx = /\/(java|ecma)script/i
      , by = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , bz = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , bA = bk(e)
      , bB = bA.appendChild(e.createElement("div"));
    bz.optgroup = bz.option,
    bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead,
    bz.th = bz.td,
    p.support.htmlSerialize || (bz._default = [1, "X<div>", "</div>"]),
    p.fn.extend({
        text: function(a) {
            return p.access(this, function(a) {
                return a === b ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a));
            }, null, a, arguments.length);
        },
        wrapAll: function(a) {
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).wrapAll(a.call(this, b));
                });
            }
            if (this[0]) {
                var b = p(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) {
                        a = a.firstChild;
                    }
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return p.isFunction(a) ? this.each(function(b) {
                p(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = p(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = p.isFunction(a);
            return this.each(function(c) {
                p(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                p.nodeName(this, "body") || p(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            if (!bh(this[0])) {
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this);
                });
            }
            if (arguments.length) {
                var a = p.clean(arguments);
                return this.pushStack(p.merge(a, this), "before", this.selector);
            }
        },
        after: function() {
            if (!bh(this[0])) {
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling);
                });
            }
            if (arguments.length) {
                var a = p.clean(arguments);
                return this.pushStack(p.merge(this, a), "after", this.selector);
            }
        },
        remove: function(a, b) {
            var c, d = 0;
            for (; (c = this[d]) != null; d++) {
                if (!a || p.filter(a, [c]).length) {
                    !b && c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")),
                    p.cleanData([c])),
                    c.parentNode && c.parentNode.removeChild(c);
                }
            }
            return this;
        },
        empty: function() {
            var a, b = 0;
            for (; (a = this[b]) != null; b++) {
                a.nodeType === 1 && p.cleanData(a.getElementsByTagName("*"));
                while (a.firstChild) {
                    a.removeChild(a.firstChild);
                }
            }
            return this;
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a,
            b = b == null ? a : b,
            this.map(function() {
                return p.clone(this, a, b);
            });
        },
        html: function(a) {
            return p.access(this, function(a) {
                var c = this[0] || {}
                  , d = 0
                  , e = this.length;
                if (a === b) {
                    return c.nodeType === 1 ? c.innerHTML.replace(bm, "") : b;
                }
                if (typeof a == "string" && !bs.test(a) && (p.support.htmlSerialize || !bu.test(a)) && (p.support.leadingWhitespace || !bn.test(a)) && !bz[(bp.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(bo, "<$1></$2>");
                    try {
                        for (; d < e; d++) {
                            c = this[d] || {},
                            c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")),
                            c.innerHTML = a);
                        }
                        c = 0;
                    } catch (f) {}
                }
                c && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function(a) {
            return bh(this[0]) ? this.length ? this.pushStack(p(p.isFunction(a) ? a() : a), "replaceWith", a) : this : p.isFunction(a) ? this.each(function(b) {
                var c = p(this)
                  , d = c.html();
                c.replaceWith(a.call(this, b, d));
            }) : (typeof a != "string" && (a = p(a).detach()),
            this.each(function() {
                var b = this.nextSibling
                  , c = this.parentNode;
                p(this).remove(),
                b ? p(b).before(a) : p(c).append(a);
            }));
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, c, d) {
            a = [].concat.apply([], a);
            var e, f, g, h, i = 0, j = a[0], k = [], l = this.length;
            if (!p.support.checkClone && l > 1 && typeof j == "string" && bw.test(j)) {
                return this.each(function() {
                    p(this).domManip(a, c, d);
                });
            }
            if (p.isFunction(j)) {
                return this.each(function(e) {
                    var f = p(this);
                    a[0] = j.call(this, e, c ? f.html() : b),
                    f.domManip(a, c, d);
                });
            }
            if (this[0]) {
                e = p.buildFragment(a, this, k),
                g = e.fragment,
                f = g.firstChild,
                g.childNodes.length === 1 && (g = f);
                if (f) {
                    c = c && p.nodeName(f, "tr");
                    for (h = e.cacheable || l - 1; i < l; i++) {
                        d.call(c && p.nodeName(this[i], "table") ? bC(this[i], "tbody") : this[i], i === h ? g : p.clone(g, !0, !0));
                    }
                }
                g = f = null,
                k.length && p.each(k, function(a, b) {
                    b.src ? p.ajax ? p.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : p.error("no ajax") : p.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "")),
                    b.parentNode && b.parentNode.removeChild(b);
                });
            }
            return this;
        }
    }),
    p.buildFragment = function(a, c, d) {
        var f, g, h, i = a[0];
        return c = c || e,
        c = !c.nodeType && c[0] || c,
        c = c.ownerDocument || c,
        a.length === 1 && typeof i == "string" && i.length < 512 && c === e && i.charAt(0) === "<" && !bt.test(i) && (p.support.checkClone || !bw.test(i)) && (p.support.html5Clone || !bu.test(i)) && (g = !0,
        f = p.fragments[i],
        h = f !== b),
        f || (f = c.createDocumentFragment(),
        p.clean(a, c, f, d),
        g && (p.fragments[i] = h && f)),
        {
            fragment: f,
            cacheable: g
        };
    }
    ,
    p.fragments = {},
    p.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        p.fn[a] = function(c) {
            var d, e = 0, f = [], g = p(c), h = g.length, i = this.length === 1 && this[0].parentNode;
            if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) {
                return g[b](this[0]),
                this;
            }
            for (; e < h; e++) {
                d = (e > 0 ? this.clone(!0) : this).get(),
                p(g[e])[b](d),
                f = f.concat(d);
            }
            return this.pushStack(f, a, g.selector);
        }
        ;
    }),
    p.extend({
        clone: function(a, b, c) {
            var d, e, f, g;
            p.support.html5Clone || p.isXMLDoc(a) || !bu.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bB.innerHTML = a.outerHTML,
            bB.removeChild(g = bB.firstChild));
            if ((!p.support.noCloneEvent || !p.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !p.isXMLDoc(a)) {
                bE(a, g),
                d = bF(a),
                e = bF(g);
                for (f = 0; d[f]; ++f) {
                    e[f] && bE(d[f], e[f]);
                }
            }
            if (b) {
                bD(a, g);
                if (c) {
                    d = bF(a),
                    e = bF(g);
                    for (f = 0; d[f]; ++f) {
                        bD(d[f], e[f]);
                    }
                }
            }
            return d = e = null,
            g;
        },
        clean: function(a, b, c, d) {
            var f, g, h, i, j, k, l, m, n, o, q, r, s = b === e && bA, t = [];
            if (!b || typeof b.createDocumentFragment == "undefined") {
                b = e;
            }
            for (f = 0; (h = a[f]) != null; f++) {
                typeof h == "number" && (h += "");
                if (!h) {
                    continue;
                }
                if (typeof h == "string") {
                    if (!br.test(h)) {
                        h = b.createTextNode(h);
                    } else {
                        s = s || bk(b),
                        l = b.createElement("div"),
                        s.appendChild(l),
                        h = h.replace(bo, "<$1></$2>"),
                        i = (bp.exec(h) || ["", ""])[1].toLowerCase(),
                        j = bz[i] || bz._default,
                        k = j[0],
                        l.innerHTML = j[1] + h + j[2];
                        while (k--) {
                            l = l.lastChild;
                        }
                        if (!p.support.tbody) {
                            m = bq.test(h),
                            n = i === "table" && !m ? l.firstChild && l.firstChild.childNodes : j[1] === "<table>" && !m ? l.childNodes : [];
                            for (g = n.length - 1; g >= 0; --g) {
                                p.nodeName(n[g], "tbody") && !n[g].childNodes.length && n[g].parentNode.removeChild(n[g]);
                            }
                        }
                        !p.support.leadingWhitespace && bn.test(h) && l.insertBefore(b.createTextNode(bn.exec(h)[0]), l.firstChild),
                        h = l.childNodes,
                        l.parentNode.removeChild(l);
                    }
                }
                h.nodeType ? t.push(h) : p.merge(t, h);
            }
            l && (h = l = s = null);
            if (!p.support.appendChecked) {
                for (f = 0; (h = t[f]) != null; f++) {
                    p.nodeName(h, "input") ? bG(h) : typeof h.getElementsByTagName != "undefined" && p.grep(h.getElementsByTagName("input"), bG);
                }
            }
            if (c) {
                q = function(a) {
                    if (!a.type || bx.test(a.type)) {
                        return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a);
                    }
                }
                ;
                for (f = 0; (h = t[f]) != null; f++) {
                    if (!p.nodeName(h, "script") || !q(h)) {
                        c.appendChild(h),
                        typeof h.getElementsByTagName != "undefined" && (r = p.grep(p.merge([], h.getElementsByTagName("script")), q),
                        t.splice.apply(t, [f + 1, 0].concat(r)),
                        f += r.length);
                    }
                }
            }
            return t;
        },
        cleanData: function(a, b) {
            var c, d, e, f, g = 0, h = p.expando, i = p.cache, j = p.support.deleteExpando, k = p.event.special;
            for (; (e = a[g]) != null; g++) {
                if (b || p.acceptData(e)) {
                    d = e[h],
                    c = d && i[d];
                    if (c) {
                        if (c.events) {
                            for (f in c.events) {
                                k[f] ? p.event.remove(e, f) : p.removeEvent(e, f, c.handle);
                            }
                        }
                        i[d] && (delete i[d],
                        j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null,
                        p.deletedIds.push(d));
                    }
                }
            }
        }
    }),
    function() {
        var a, b;
        p.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            };
        }
        ,
        a = p.uaMatch(g.userAgent),
        b = {},
        a.browser && (b[a.browser] = !0,
        b.version = a.version),
        b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0),
        p.browser = b,
        p.sub = function() {
            function a(b, c) {
                return new a.fn.init(b,c);
            }
            p.extend(!0, a, this),
            a.superclass = this,
            a.fn = a.prototype = this(),
            a.fn.constructor = a,
            a.sub = this.sub,
            a.fn.init = function c(c, d) {
                return d && d instanceof p && !(d instanceof a) && (d = a(d)),
                p.fn.init.call(this, c, d, b);
            }
            ,
            a.fn.init.prototype = a.fn;
            var b = a(e);
            return a;
        }
        ;
    }();
    var bH, bI, bJ, bK = /alpha\([^)]*\)/i, bL = /opacity=([^)]*)/, bM = /^(top|right|bottom|left)$/, bN = /^(none|table(?!-c[ea]).+)/, bO = /^margin/, bP = new RegExp("^(" + q + ")(.*)$","i"), bQ = new RegExp("^(" + q + ")(?!px)[a-z%]+$","i"), bR = new RegExp("^([-+])=(" + q + ")","i"), bS = {}, bT = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bU = {
        letterSpacing: 0,
        fontWeight: 400
    }, bV = ["Top", "Right", "Bottom", "Left"], bW = ["Webkit", "O", "Moz", "ms"], bX = p.fn.toggle;
    p.fn.extend({
        css: function(a, c) {
            return p.access(this, function(a, c, d) {
                return d !== b ? p.style(a, c, d) : p.css(a, c);
            }, a, c, arguments.length > 1);
        },
        show: function() {
            return b$(this, !0);
        },
        hide: function() {
            return b$(this);
        },
        toggle: function(a, b) {
            var c = typeof a == "boolean";
            return p.isFunction(a) && p.isFunction(b) ? bX.apply(this, arguments) : this.each(function() {
                (c ? a : bZ(this)) ? p(this).show() : p(this).hide();
            });
        }
    }),
    p.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bH(a, "opacity");
                        return c === "" ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": p.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) {
                return;
            }
            var f, g, h, i = p.camelCase(c), j = a.style;
            c = p.cssProps[i] || (p.cssProps[i] = bY(j, i)),
            h = p.cssHooks[c] || p.cssHooks[i];
            if (d === b) {
                return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
            }
            g = typeof d,
            g === "string" && (f = bR.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(p.css(a, c)),
            g = "number");
            if (d == null || g === "number" && isNaN(d)) {
                return;
            }
            g === "number" && !p.cssNumber[i] && (d += "px");
            if (!h || !("set"in h) || (d = h.set(a, d, e)) !== b) {
                try {
                    j[c] = d;
                } catch (k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = p.camelCase(c);
            return c = p.cssProps[i] || (p.cssProps[i] = bY(a.style, i)),
            h = p.cssHooks[c] || p.cssHooks[i],
            h && "get"in h && (f = h.get(a, !0, e)),
            f === b && (f = bH(a, c)),
            f === "normal" && c in bU && (f = bU[c]),
            d || e !== b ? (g = parseFloat(f),
            d || p.isNumeric(g) ? g || 0 : f) : f;
        },
        swap: function(a, b, c) {
            var d, e, f = {};
            for (e in b) {
                f[e] = a.style[e],
                a.style[e] = b[e];
            }
            d = c.call(a);
            for (e in b) {
                a.style[e] = f[e];
            }
            return d;
        }
    }),
    a.getComputedStyle ? bH = function(b, c) {
        var d, e, f, g, h = a.getComputedStyle(b, null), i = b.style;
        return h && (d = h[c],
        d === "" && !p.contains(b.ownerDocument, b) && (d = p.style(b, c)),
        bQ.test(d) && bO.test(c) && (e = i.width,
        f = i.minWidth,
        g = i.maxWidth,
        i.minWidth = i.maxWidth = i.width = d,
        d = h.width,
        i.width = e,
        i.minWidth = f,
        i.maxWidth = g)),
        d;
    }
    : e.documentElement.currentStyle && (bH = function(a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return e == null && f && f[b] && (e = f[b]),
        bQ.test(e) && !bM.test(b) && (c = f.left,
        d = a.runtimeStyle && a.runtimeStyle.left,
        d && (a.runtimeStyle.left = a.currentStyle.left),
        f.left = b === "fontSize" ? "1em" : e,
        e = f.pixelLeft + "px",
        f.left = c,
        d && (a.runtimeStyle.left = d)),
        e === "" ? "auto" : e;
    }
    ),
    p.each(["height", "width"], function(a, b) {
        p.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) {
                    return a.offsetWidth === 0 && bN.test(bH(a, "display")) ? p.swap(a, bT, function() {
                        return cb(a, b, d);
                    }) : cb(a, b, d);
                }
            },
            set: function(a, c, d) {
                return b_(a, c, d ? ca(a, b, d, p.support.boxSizing && p.css(a, "boxSizing") === "border-box") : 0);
            }
        };
    }),
    p.support.opacity || (p.cssHooks.opacity = {
        get: function(a, b) {
            return bL.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style
              , d = a.currentStyle
              , e = p.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : ""
              , f = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && p.trim(f.replace(bK, "")) === "" && c.removeAttribute) {
                c.removeAttribute("filter");
                if (d && !d.filter) {
                    return;
                }
            }
            c.filter = bK.test(f) ? f.replace(bK, e) : f + " " + e;
        }
    }),
    p(function() {
        p.support.reliableMarginRight || (p.cssHooks.marginRight = {
            get: function(a, b) {
                return p.swap(a, {
                    display: "inline-block"
                }, function() {
                    if (b) {
                        return bH(a, "marginRight");
                    }
                });
            }
        }),
        !p.support.pixelPosition && p.fn.position && p.each(["top", "left"], function(a, b) {
            p.cssHooks[b] = {
                get: function(a, c) {
                    if (c) {
                        var d = bH(a, b);
                        return bQ.test(d) ? p(a).position()[b] + "px" : d;
                    }
                }
            };
        });
    }),
    p.expr && p.expr.filters && (p.expr.filters.hidden = function(a) {
        return a.offsetWidth === 0 && a.offsetHeight === 0 || !p.support.reliableHiddenOffsets && (a.style && a.style.display || bH(a, "display")) === "none";
    }
    ,
    p.expr.filters.visible = function(a) {
        return !p.expr.filters.hidden(a);
    }
    ),
    p.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        p.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++) {
                    f[a + bV[d] + b] = e[d] || e[d - 2] || e[0];
                }
                return f;
            }
        },
        bO.test(a) || (p.cssHooks[a + b].set = b_);
    });
    var cd = /%20/g
      , ce = /\[\]$/
      , cf = /\r?\n/g
      , cg = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , ch = /^(?:select|textarea)/i;
    p.fn.extend({
        serialize: function() {
            return p.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? p.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || ch.test(this.nodeName) || cg.test(this.type));
            }).map(function(a, b) {
                var c = p(this).val();
                return c == null ? null : p.isArray(c) ? p.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(cf, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(cf, "\r\n")
                };
            }).get();
        }
    }),
    p.param = function(a, c) {
        var d, e = [], f = function(a, b) {
            b = p.isFunction(b) ? b() : b == null ? "" : b,
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        c === b && (c = p.ajaxSettings && p.ajaxSettings.traditional);
        if (p.isArray(a) || a.jquery && !p.isPlainObject(a)) {
            p.each(a, function() {
                f(this.name, this.value);
            });
        } else {
            for (d in a) {
                ci(d, a[d], c, f);
            }
        }
        return e.join("&").replace(cd, "+");
    }
    ;
    var cj, ck, cl = /#.*$/, cm = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, cn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, co = /^(?:GET|HEAD)$/, cp = /^\/\//, cq = /\?/, cr = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, cs = /([?&])_=[^&]*/, ct = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, cu = p.fn.load, cv = {}, cw = {}, cx = ["*/"] + ["*"];
    try {
        ck = f.href;
    } catch (cy) {
        ck = e.createElement("a"),
        ck.href = "",
        ck = ck.href;
    }
    cj = ct.exec(ck.toLowerCase()) || [],
    p.fn.load = function(a, c, d) {
        if (typeof a != "string" && cu) {
            return cu.apply(this, arguments);
        }
        if (!this.length) {
            return this;
        }
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length),
        a = a.slice(0, i)),
        p.isFunction(c) ? (d = c,
        c = b) : c && typeof c == "object" && (f = "POST"),
        p.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: c,
            complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a]);
            }
        }).done(function(a) {
            g = arguments,
            h.html(e ? p("<div>").append(a.replace(cr, "")).find(e) : a);
        }),
        this;
    }
    ,
    p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        p.fn[b] = function(a) {
            return this.on(b, a);
        }
        ;
    }),
    p.each(["get", "post"], function(a, c) {
        p[c] = function(a, d, e, f) {
            return p.isFunction(d) && (f = f || e,
            e = d,
            d = b),
            p.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            });
        }
        ;
    }),
    p.extend({
        getScript: function(a, c) {
            return p.get(a, b, c, "script");
        },
        getJSON: function(a, b, c) {
            return p.get(a, b, c, "json");
        },
        ajaxSetup: function(a, b) {
            return b ? cB(a, p.ajaxSettings) : (b = a,
            a = p.ajaxSettings),
            cB(a, b),
            a;
        },
        ajaxSettings: {
            url: ck,
            isLocal: cn.test(cj[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": cx
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": p.parseJSON,
                "text xml": p.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: cz(cv),
        ajaxTransport: cz(cw),
        ajax: function(a, c) {
            function y(a, c, f, i) {
                var k, s, t, u, w, y = c;
                if (v === 2) {
                    return;
                }
                v = 2,
                h && clearTimeout(h),
                g = b,
                e = i || "",
                x.readyState = a > 0 ? 4 : 0,
                f && (u = cC(l, x, f));
                if (a >= 200 && a < 300 || a === 304) {
                    l.ifModified && (w = x.getResponseHeader("Last-Modified"),
                    w && (p.lastModified[d] = w),
                    w = x.getResponseHeader("Etag"),
                    w && (p.etag[d] = w)),
                    a === 304 ? (y = "notmodified",
                    k = !0) : (k = cD(l, u),
                    y = k.state,
                    s = k.data,
                    t = k.error,
                    k = !t);
                } else {
                    t = y;
                    if (!y || a) {
                        y = "error",
                        a < 0 && (a = 0);
                    }
                }
                x.status = a,
                x.statusText = (c || y) + "",
                k ? o.resolveWith(m, [s, y, x]) : o.rejectWith(m, [x, y, t]),
                x.statusCode(r),
                r = b,
                j && n.trigger("ajax" + (k ? "Success" : "Error"), [x, l, k ? s : t]),
                q.fireWith(m, [x, y]),
                j && (n.trigger("ajaxComplete", [x, l]),
                --p.active || p.event.trigger("ajaxStop"));
            }
            typeof a == "object" && (c = a,
            a = b),
            c = c || {};
            var d, e, f, g, h, i, j, k, l = p.ajaxSetup({}, c), m = l.context || l, n = m !== l && (m.nodeType || m instanceof p) ? p(m) : p.event, o = p.Deferred(), q = p.Callbacks("once memory"), r = l.statusCode || {}, t = {}, u = {}, v = 0, w = "canceled", x = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!v) {
                        var c = a.toLowerCase();
                        a = u[c] = u[c] || a,
                        t[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function() {
                    return v === 2 ? e : null;
                },
                getResponseHeader: function(a) {
                    var c;
                    if (v === 2) {
                        if (!f) {
                            f = {};
                            while (c = cm.exec(e)) {
                                f[c[1].toLowerCase()] = c[2];
                            }
                        }
                        c = f[a.toLowerCase()];
                    }
                    return c === b ? null : c;
                },
                overrideMimeType: function(a) {
                    return v || (l.mimeType = a),
                    this;
                },
                abort: function(a) {
                    return a = a || w,
                    g && g.abort(a),
                    y(0, a),
                    this;
                }
            };
            o.promise(x),
            x.success = x.done,
            x.error = x.fail,
            x.complete = q.add,
            x.statusCode = function(a) {
                if (a) {
                    var b;
                    if (v < 2) {
                        for (b in a) {
                            r[b] = [r[b], a[b]];
                        }
                    } else {
                        b = a[x.status],
                        x.always(b);
                    }
                }
                return this;
            }
            ,
            l.url = ((a || l.url) + "").replace(cl, "").replace(cp, cj[1] + "//"),
            l.dataTypes = p.trim(l.dataType || "*").toLowerCase().split(s),
            l.crossDomain == null && (i = ct.exec(l.url.toLowerCase()) || !1,
            l.crossDomain = i && i.join(":") + (i[3] ? "" : i[1] === "http:" ? 80 : 443) !== cj.join(":") + (cj[3] ? "" : cj[1] === "http:" ? 80 : 443)),
            l.data && l.processData && typeof l.data != "string" && (l.data = p.param(l.data, l.traditional)),
            cA(cv, l, c, x);
            if (v === 2) {
                return x;
            }
            j = l.global,
            l.type = l.type.toUpperCase(),
            l.hasContent = !co.test(l.type),
            j && p.active++ === 0 && p.event.trigger("ajaxStart");
            if (!l.hasContent) {
                l.data && (l.url += (cq.test(l.url) ? "&" : "?") + l.data,
                delete l.data),
                d = l.url;
                if (l.cache === !1) {
                    var z = p.now()
                      , A = l.url.replace(cs, "$1_=" + z);
                    l.url = A + (A === l.url ? (cq.test(l.url) ? "&" : "?") + "_=" + z : "");
                }
            }
            (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType),
            l.ifModified && (d = d || l.url,
            p.lastModified[d] && x.setRequestHeader("If-Modified-Since", p.lastModified[d]),
            p.etag[d] && x.setRequestHeader("If-None-Match", p.etag[d])),
            x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cx + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) {
                x.setRequestHeader(k, l.headers[k]);
            }
            if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && v !== 2) {
                w = "abort";
                for (k in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    x[k](l[k]);
                }
                g = cA(cw, l, c, x);
                if (!g) {
                    y(-1, "No Transport");
                } else {
                    x.readyState = 1,
                    j && n.trigger("ajaxSend", [x, l]),
                    l.async && l.timeout > 0 && (h = setTimeout(function() {
                        x.abort("timeout");
                    }, l.timeout));
                    try {
                        v = 1,
                        g.send(t, y);
                    } catch (B) {
                        if (v < 2) {
                            y(-1, B);
                        } else {
                            throw B;
                        }
                    }
                }
                return x;
            }
            return x.abort();
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cE = []
      , cF = /\?/
      , cG = /(=)\?(?=&|$)|\?\?/
      , cH = p.now();
    p.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = cE.pop() || p.expando + "_" + cH++;
            return this[a] = !0,
            a;
        }
    }),
    p.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && cG.test(j), m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cG.test(i);
        if (c.dataTypes[0] === "jsonp" || l || m) {
            return f = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback,
            g = a[f],
            l ? c.url = j.replace(cG, "$1" + f) : m ? c.data = i.replace(cG, "$1" + f) : k && (c.url += (cF.test(j) ? "&" : "?") + c.jsonp + "=" + f),
            c.converters["script json"] = function() {
                return h || p.error(f + " was not called"),
                h[0];
            }
            ,
            c.dataTypes[0] = "json",
            a[f] = function() {
                h = arguments;
            }
            ,
            e.always(function() {
                a[f] = g,
                c[f] && (c.jsonpCallback = d.jsonpCallback,
                cE.push(f)),
                h && p.isFunction(g) && g(h[0]),
                h = g = b;
            }),
            "script";
        }
    }),
    p.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return p.globalEval(a),
                a;
            }
        }
    }),
    p.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1);
    }),
    p.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = e.head || e.getElementsByTagName("head")[0] || e.documentElement;
            return {
                send: function(f, g) {
                    c = e.createElement("script"),
                    c.async = "async",
                    a.scriptCharset && (c.charset = a.scriptCharset),
                    c.src = a.url,
                    c.onload = c.onreadystatechange = function(a, e) {
                        if (e || !c.readyState || /loaded|complete/.test(c.readyState)) {
                            c.onload = c.onreadystatechange = null,
                            d && c.parentNode && d.removeChild(c),
                            c = b,
                            e || g(200, "success");
                        }
                    }
                    ,
                    d.insertBefore(c, d.firstChild);
                },
                abort: function() {
                    c && c.onload(0, 1);
                }
            };
        }
    });
    var cI, cJ = a.ActiveXObject ? function() {
        for (var a in cI) {
            cI[a](0, 1);
        }
    }
    : !1, cK = 0;
    p.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && cL() || cM();
    }
    : cL,
    function(a) {
        p.extend(p.support, {
            ajax: !!a,
            cors: !!a && "withCredentials"in a
        });
    }(p.ajaxSettings.xhr()),
    p.support.ajax && p.ajaxTransport(function(c) {
        if (!c.crossDomain || p.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                    if (c.xhrFields) {
                        for (h in c.xhrFields) {
                            i[h] = c.xhrFields[h];
                        }
                    }
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType),
                    !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e) {
                            i.setRequestHeader(h, e[h]);
                        }
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null),
                    d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || i.readyState === 4)) {
                                d = b,
                                g && (i.onreadystatechange = p.noop,
                                cJ && delete cI[g]);
                                if (e) {
                                    i.readyState !== 4 && i.abort();
                                } else {
                                    h = i.status,
                                    k = i.getAllResponseHeaders(),
                                    l = {},
                                    m = i.responseXML,
                                    m && m.documentElement && (l.xml = m);
                                    try {
                                        l.text = i.responseText;
                                    } catch (a) {}
                                    try {
                                        j = i.statusText;
                                    } catch (n) {
                                        j = "";
                                    }
                                    !h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204);
                                }
                            }
                        } catch (o) {
                            e || f(-1, o);
                        }
                        l && f(h, j, l, k);
                    }
                    ,
                    c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++cK,
                    cJ && (cI || (cI = {},
                    p(a).unload(cJ)),
                    cI[g] = d),
                    i.onreadystatechange = d) : d();
                },
                abort: function() {
                    d && d(0, 1);
                }
            };
        }
    });
    var cN, cO, cP = /^(?:toggle|show|hide)$/, cQ = new RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$","i"), cR = /queueHooks$/, cS = [cY], cT = {
        "*": [function(a, b) {
            var c, d, e = this.createTween(a, b), f = cQ.exec(b), g = e.cur(), h = +g || 0, i = 1, j = 20;
            if (f) {
                c = +f[2],
                d = f[3] || (p.cssNumber[a] ? "" : "px");
                if (d !== "px" && h) {
                    h = p.css(e.elem, a, !0) || c || 1;
                    do {
                        i = i || ".5",
                        h = h / i,
                        p.style(e.elem, a, h + d);
                    } while (i !== (i = e.cur() / g) && i !== 1 && --j);
                }
                e.unit = d,
                e.start = h,
                e.end = f[1] ? h + (f[1] + 1) * c : c;
            }
            return e;
        }
        ]
    };
    p.Animation = p.extend(cW, {
        tweener: function(a, b) {
            p.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            var c, d = 0, e = a.length;
            for (; d < e; d++) {
                c = a[d],
                cT[c] = cT[c] || [],
                cT[c].unshift(b);
            }
        },
        prefilter: function(a, b) {
            b ? cS.unshift(a) : cS.push(a);
        }
    }),
    p.Tween = cZ,
    cZ.prototype = {
        constructor: cZ,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (p.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = cZ.propHooks[this.prop];
            return a && a.get ? a.get(this) : cZ.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = cZ.propHooks[this.prop];
            return this.options.duration ? this.pos = b = p.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : cZ.propHooks._default.set(this),
            this;
        }
    },
    cZ.prototype.init.prototype = cZ.prototype,
    cZ.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = p.css(a.elem, a.prop, !1, ""),
                !b || b === "auto" ? 0 : b) : a.elem[a.prop];
            },
            set: function(a) {
                p.fx.step[a.prop] ? p.fx.step[a.prop](a) : a.elem.style && (a.elem.style[p.cssProps[a.prop]] != null || p.cssHooks[a.prop]) ? p.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    },
    cZ.propHooks.scrollTop = cZ.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    },
    p.each(["toggle", "show", "hide"], function(a, b) {
        var c = p.fn[b];
        p.fn[b] = function(d, e, f) {
            return d == null || typeof d == "boolean" || !a && p.isFunction(d) && p.isFunction(e) ? c.apply(this, arguments) : this.animate(c$(b, !0), d, e, f);
        }
        ;
    }),
    p.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(bZ).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = p.isEmptyObject(a)
              , f = p.speed(b, c, d)
              , g = function() {
                var b = cW(this, p.extend({}, a), f);
                e && b.stop(!0);
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop,
                b(d);
            };
            return typeof a != "string" && (d = c,
            c = a,
            a = b),
            c && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , c = a != null && a + "queueHooks"
                  , f = p.timers
                  , g = p._data(this);
                if (c) {
                    g[c] && g[c].stop && e(g[c]);
                } else {
                    for (c in g) {
                        g[c] && g[c].stop && cR.test(c) && e(g[c]);
                    }
                }
                for (c = f.length; c--; ) {
                    f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d),
                    b = !1,
                    f.splice(c, 1));
                }
                (b || !d) && p.dequeue(this, a);
            });
        }
    }),
    p.each({
        slideDown: c$("show"),
        slideUp: c$("hide"),
        slideToggle: c$("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        p.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        }
        ;
    }),
    p.speed = function(a, b, c) {
        var d = a && typeof a == "object" ? p.extend({}, a) : {
            complete: c || !c && b || p.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !p.isFunction(b) && b
        };
        d.duration = p.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in p.fx.speeds ? p.fx.speeds[d.duration] : p.fx.speeds._default;
        if (d.queue == null || d.queue === !0) {
            d.queue = "fx";
        }
        return d.old = d.complete,
        d.complete = function() {
            p.isFunction(d.old) && d.old.call(this),
            d.queue && p.dequeue(this, d.queue);
        }
        ,
        d;
    }
    ,
    p.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2;
        }
    },
    p.timers = [],
    p.fx = cZ.prototype.init,
    p.fx.tick = function() {
        var a, b = p.timers, c = 0;
        for (; c < b.length; c++) {
            a = b[c],
            !a() && b[c] === a && b.splice(c--, 1);
        }
        b.length || p.fx.stop();
    }
    ,
    p.fx.timer = function(a) {
        a() && p.timers.push(a) && !cO && (cO = setInterval(p.fx.tick, p.fx.interval));
    }
    ,
    p.fx.interval = 13,
    p.fx.stop = function() {
        clearInterval(cO),
        cO = null;
    }
    ,
    p.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    p.fx.step = {},
    p.expr && p.expr.filters && (p.expr.filters.animated = function(a) {
        return p.grep(p.timers, function(b) {
            return a === b.elem;
        }).length;
    }
    );
    var c_ = /^(?:body|html)$/i;
    p.fn.offset = function(a) {
        if (arguments.length) {
            return a === b ? this : this.each(function(b) {
                p.offset.setOffset(this, a, b);
            });
        }
        var c, d, e, f, g, h, i, j = {
            top: 0,
            left: 0
        }, k = this[0], l = k && k.ownerDocument;
        if (!l) {
            return;
        }
        return (d = l.body) === k ? p.offset.bodyOffset(k) : (c = l.documentElement,
        p.contains(c, k) ? (typeof k.getBoundingClientRect != "undefined" && (j = k.getBoundingClientRect()),
        e = da(l),
        f = c.clientTop || d.clientTop || 0,
        g = c.clientLeft || d.clientLeft || 0,
        h = e.pageYOffset || c.scrollTop,
        i = e.pageXOffset || c.scrollLeft,
        {
            top: j.top + h - f,
            left: j.left + i - g
        }) : j);
    }
    ,
    p.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop
              , c = a.offsetLeft;
            return p.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(p.css(a, "marginTop")) || 0,
            c += parseFloat(p.css(a, "marginLeft")) || 0),
            {
                top: b,
                left: c
            };
        },
        setOffset: function(a, b, c) {
            var d = p.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = p(a), f = e.offset(), g = p.css(a, "top"), h = p.css(a, "left"), i = (d === "absolute" || d === "fixed") && p.inArray("auto", [g, h]) > -1, j = {}, k = {}, l, m;
            i ? (k = e.position(),
            l = k.top,
            m = k.left) : (l = parseFloat(g) || 0,
            m = parseFloat(h) || 0),
            p.isFunction(b) && (b = b.call(a, c, f)),
            b.top != null && (j.top = b.top - f.top + l),
            b.left != null && (j.left = b.left - f.left + m),
            "using"in b ? b.using.call(a, j) : e.css(j);
        }
    },
    p.fn.extend({
        position: function() {
            if (!this[0]) {
                return;
            }
            var a = this[0]
              , b = this.offsetParent()
              , c = this.offset()
              , d = c_.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(p.css(a, "marginTop")) || 0,
            c.left -= parseFloat(p.css(a, "marginLeft")) || 0,
            d.top += parseFloat(p.css(b[0], "borderTopWidth")) || 0,
            d.left += parseFloat(p.css(b[0], "borderLeftWidth")) || 0,
            {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || e.body;
                while (a && !c_.test(a.nodeName) && p.css(a, "position") === "static") {
                    a = a.offsetParent;
                }
                return a || e.body;
            });
        }
    }),
    p.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        p.fn[a] = function(e) {
            return p.access(this, function(a, e, f) {
                var g = da(a);
                if (f === b) {
                    return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
                }
                g ? g.scrollTo(d ? p(g).scrollLeft() : f, d ? f : p(g).scrollTop()) : a[e] = f;
            }, a, e, arguments.length, null);
        }
        ;
    }),
    p.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        p.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(d, e) {
            p.fn[e] = function(e, f) {
                var g = arguments.length && (d || typeof e != "boolean")
                  , h = d || (e === !0 || f === !0 ? "margin" : "border");
                return p.access(this, function(c, d, e) {
                    var f;
                    return p.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement,
                    Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? p.css(c, d, e, h) : p.style(c, d, e, h);
                }, c, g ? e : b, g, null);
            }
            ;
        });
    }),
    a.jQuery = a.$ = p,
    typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return p;
    });
}
)(window);
/*
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        if (typeof exports === "object") {
            module.exports = factory(require("jquery"));
        } else {
            factory(jQuery);
        }
    }
}(function($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
        try {
            s = decodeURIComponent(s.replace(pluses, " "));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function(key, value, options) {
        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === "number") {
                var days = options.expires
                  , t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 86400000);
            }
            return (document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""));
        }
        var result = key ? undefined : {}
          , cookies = document.cookie ? document.cookie.split("; ") : []
          , i = 0
          , l = cookies.length;
        for (; i < l; i++) {
            var parts = cookies[i].split("=")
              , name = decode(parts.shift())
              , cookie = parts.join("=");
            if (key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    }
    ;
    config.defaults = {};
    $.removeCookie = function(key, options) {
        $.cookie(key, "", $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key);
    }
    ;
}));
(function($) {
    if (!$) {
        console.error("调用ajaxMethord出错，缺少引用Jquery组件");
        return;
    }
    $.fn.isOnScreen = function() {
        if (this.length == 0) {
            return false;
        }
        var win = $(window);
        var maxView = 1200;
        if ($("body .w1400").length > 0) {
            maxView = 1400;
        }
        if ($("body .w1800").length > 0) {
            maxView = 1800;
        }
        if ($("body .w2000").length > 0) {
            maxView = 2000;
        }
        if ($("body .wFull").length > 0) {
            maxView = $(window).width();
        }
        var delWith = (win.width() - maxView) / 2;
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft() + delWith
        };
        viewport.right = viewport.left + win.width() - 2 * delWith;
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        if ($(this).parents().filter("[style='display: none;']").length > 0) {
            return false;
        }
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    }
    ;
    $.fn.scrollLoadMore = function(obj, func) {
        $(window).scroll(function() {
            if ($(obj).length > 0) {
                var that = $(obj)[0];
                var win = $(window);
                if ((win.scrollTop() + win.height()) >= (that.offsetHeight + that.offsetTop)) {
                    if (func && typeof func == "function") {
                        func();
                    }
                }
            }
        });
    }
    ;
    $.global = {
        baseInit: function() {
            var G = $.cookie("UserName");
            var F = "";
            if (G != undefined) {
                F = '<ul><li>您好，<a href="' + domainConfig.WorkDomain + '/buyer/" class="uname" target="_self">' + G + '</a><i class="arrow"><s>◇</s></i></li></ul><div class="sign_menu"><a href="' + domainConfig.WorkDomain + '/buyer/home/usercenter">账号设置</a><a href="' + domainConfig.MainDomain + '/account/loginout">退出</a></div>';
            } else {
                F = '<ul><li><a href="' + domainConfig.MainDomain + '/login.html" target="_self" rel="nofollow" title="登录">请登录</a></li><li><a href="' + domainConfig.MainDomain + '/register.html" target="_self" rel="nofollow" title="免费注册">免费注册</a></li><li><a href="' + domainConfig.MainDomain + '/wechat/snsapilogin" class="wxlogin" target="_blank" rel="nofollow">微信登录</a></ul>';
            }
            $(".sign_status").html(F);
            this.CartCount = 0;
            var D = this;
            var C = $("#cartCount");
            if (C.length > 0) {
                var E = "CartCount";
                var q = $.cookie(E);
                if (q != undefined) {
                    D.CartCount = parseInt(q);
                    C.html(D.CartCount);
                    $(".cartBox .explaincart").html(D.CartCount);
                } else {
                    setTimeout(function() {
                        if ($.qccAjax) {
                            var guestId = $.cookie("GuestId");
                            $.qccAjax("/api/services/app/Cart/GetCartCount", {
                                GuestId: guestId
                            }, function(data) {
                                if (data.Success) {
                                    D.CartCount = data.Result.Count;
                                    C.html(data.Result.Count);
                                    $(".cartBox .explaincart").html(data.Result.Count);
                                    var c = new Date();
                                    c.setTime(c.getTime() + (2 * 1000));
                                    $.cookie(E, data.Result.Count, {
                                        path: "/",
                                        expires: c
                                    });
                                }
                            });
                        } else {
                            console.log("$.qccAjax 对象未加载");
                        }
                    }, 200);
                }
            }
            var B = $("#noreadmessage");
            if (B.length > 0 && G != undefined) {
                var p = G + "_MessageCount";
                var a = $.cookie(p);
                if (a != undefined) {
                    B.html(parseInt(a));
                } else {
                    setTimeout(function() {
                        if ($.qccAjax) {
                            $.qccAjax("/api/services/app/Message/GetMessageCount", {}, function(data) {
                                if (data.Success) {
                                    B.html(data.Result.Count);
                                    var c = new Date();
                                    c.setTime(c.getTime() + (10 * 1000));
                                    $.cookie(p, data.Result.Count, {
                                        path: "/",
                                        expires: c
                                    });
                                }
                            }, {
                                mustLogin: true
                            });
                        } else {
                            console.log("$.qccAjax 对象未加载");
                        }
                    }, 600);
                }
            }
            var v = $(".wx_scan").length;
            if (v > 0) {
                var A = parseInt($("body").width());
                var z = $(".wx_bg");
                var y = z.find(".wx_scan_mask");
                var x = z.find(".wx_phonea");
                var w = z.find(".wx_scan");
                var u = w.find(".wx_scan_show");
                var t = w.find(".wx_scan_hide");
                if (A > 1583) {
                    u.removeClass("wx_scan_show_f");
                    t.css({
                        left: "-69px"
                    });
                    y.show();
                    z.css({
                        overflow: "visible"
                    });
                } else {
                    y.hide();
                    u.addClass("wx_scan_show_f");
                    t.css({
                        left: "0"
                    });
                    z.css({
                        overflow: "hidden"
                    });
                }
                u.mouseenter(function() {
                    if (A > 1583) {
                        t.animate({
                            left: "26px"
                        }, 300);
                    } else {
                        x.animate({
                            right: "134px"
                        }, 300);
                        t.animate({
                            left: "-96px"
                        }, 300);
                    }
                });
                w.mouseleave(function() {
                    if (A > 1583) {
                        t.animate({
                            left: "-69px"
                        }, 300);
                    } else {
                        t.animate({
                            left: "0"
                        }, 300);
                    }
                    x.animate({
                        right: "38px"
                    }, 300);
                });
            }
            var s = $(".site_tree");
            if (s.length > 0) {
                s.on("click", "li a", function() {
                    var b = $(this).parents("dl").hasClass("site_child");
                    if (!b) {
                        $(this).parents("li").toggleClass("uncur");
                    }
                });
            }
            return this;
        },
        searchTransverse: function() {
            var obj = this;
            var searchBtn = $(".top-serchebtn");
            var keyWordInput = $("#keywords");
            if (searchBtn && keyWordInput) {
                searchBtn.click(function() {
                    var type = $(this).attr("data-value");
                    var keyValue = keyWordInput.val();
                    if (keyValue == "") {
                        keyValue = "男装";
                    }
                    if (type == "product") {
                        location.href = "/list.html?keyword=" + encodeURI(keyValue);
                    } else {
                        if (type == "company") {
                            location.href = "/shoplist.html?keyword=" + encodeURI(keyValue);
                        }
                    }
                });
                keyWordInput.keypress(function(e) {
                    var keyValue = $(this).val();
                    if (keyValue == "") {
                        keyValue = "男装";
                    }
                    if (e.keyCode == 13) {
                        location.href = "/list.html?keyword=" + encodeURI(keyValue);
                    }
                });
            }
            return obj;
        },
        searchTransverseNew: function() {
            var obj = this;
            var searchBtn = $(".top-serchebtn");
            var keyWordInput = $(".searchKeywords");
            if (searchBtn && keyWordInput) {
                searchBtn.click(function() {
                    var eq = $(this).attr("data-eq");
                    var type = $(this).attr("data-value");
                    var keyValue = keyWordInput.eq(eq).val();
                    if (keyValue == "") {
                        keyValue = "男装";
                    }
                    if (type == "product") {
                        location.href = "/list.html?keyword=" + encodeURI(keyValue);
                    } else {
                        if (type == "company") {
                            location.href = "/shoplist.html?keyword=" + encodeURI(keyValue);
                        }
                    }
                });
                keyWordInput.keypress(function(e) {
                    var keyValue = $(this).val();
                    if (keyValue == "") {
                        keyValue = "男装";
                    }
                    if (e.keyCode == 13) {
                        location.href = "/list.html?keyword=" + encodeURI(keyValue);
                    }
                });
            }
            return obj;
        },
        showGoTop: function() {
            var a = $("#top");
            if (a.length > 1) {
                console.error("页面存在多个top节点");
                return;
            }
            if (a.length == 0) {
                $("body").append('<div class="wrap_backtop" id="top"><i><s>◇</s></i></div>');
                a = $("#top");
            }
            a.on("click", function() {
                $("body,html").animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
            $(window).scroll(function() {
                var b = $(this).scrollTop();
                if (b > 200) {
                    $("#top").fadeIn(800);
                } else {
                    $("#top").fadeOut(800);
                }
            });
            if (a.length == 1) {
                var i = parseInt($(".w1200").eq(0).width()) / 2;
                var h = parseInt($(".w1400").eq(0).width()) / 2;
                if (i) {
                    var marLeft = "614px";
                }
                if (h) {
                    var marLeft = "708px";
                }
                $("#top").css("left", "50%");
                $("#top").css("margin-left", marLeft);
            }
            return this;
        },
        showAppScan: function() {
            var obj = this;
            $("body").append('<div class="qcc_downApp"><a href="javascript:; ">&nbsp;</a></div>');
            var b = "downAppco"
              , e = $.cookie(b);
            if (e != undefined) {
                $(".qcc_downApp").hide();
            } else {
                $(".qcc_downApp").show();
            }
            $("body").delegate(".qcc_downApp a", "click", function() {
                $(".qcc_downApp").hide();
                e = 1;
                $.cookie(b, e, {
                    path: "/",
                    expires: 1
                });
            });
            var g = parseInt($("body").width());
            if (g > 1583) {
                var d = "82px";
            } else {
                var d = "37px";
            }
            $(".qcc_downApp").css("right", d);
            return obj;
        },
        lazySilderThum: function(e) {
            var f = $(e.mainNode)
              , parentNode = $(e.parentNode)
              , childNode = $(e.childNode)
              , index = 0
              , width = e.width
              , len = childNode.length
              , picTimer = null
              , preNode = $(e.preNode)
              , nextNode = $(e.nextNode)
              , childNum = $(e.childNum)
              , childNumMove = $(e.childNumMove)
              , childPreNode = $(e.childPreNode)
              , childNextNode = $(e.childNextNode);
            f.css("width", width * len);
            var g = function(a, b) {
                var c = new Image();
                c.src = a;
                if (c.complete) {
                    b.call(c);
                    return;
                }
                c.onload = function() {
                    b.call(c);
                }
                ;
            };
            var h = function(a) {
                var b = parentNode.eq(a)
                  , isLoad = b.attr("data-lazyload");
                var c = -a * width;
                if (!isLoad) {
                    var d = b.attr("data-big");
                    g(d, function() {
                        b.css("background-image", "url(" + d + ")");
                        b.attr("data-lazyload", true);
                    });
                }
                f.stop(true, false).animate({
                    left: c
                }, 200);
                childNode.removeClass("active").eq(a).addClass("active");
                var e = childNum.outerWidth();
                var h = childNode.outerWidth() * (index + 1) + 12 * (index);
                var i = parseInt(h - e);
                return this;
            };
            childNode.mouseover(function() {
                index = childNode.index(this);
                h(index);
                clearInterval(picTimer);
            });
            childNode.mouseleave(function() {
                i();
            });
            preNode.click(function() {
                index -= 1;
                if (index == -1) {
                    index = len - 1;
                }
                h(index);
            });
            preNode.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
            });
            nextNode.click(function() {
                index += 1;
                if (index == len) {
                    index = 0;
                }
                h(index);
            });
            nextNode.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
            });
            childPreNode.click(function() {
                index -= 1;
                if (index == -1) {
                    index = len - 1;
                }
                h(index);
                clearInterval(picTimer);
            });
            childPreNode.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
                i();
            });
            childNextNode.click(function() {
                index += 1;
                if (index == len) {
                    index = 0;
                }
                h(index);
                clearInterval(picTimer);
            });
            childNextNode.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
                i();
            });
            var i = function() {
                clearInterval(picTimer);
                picTimer = setInterval(function() {
                    index++;
                    if (index == len) {
                        index = 0;
                    }
                    h(index);
                }, 4000);
            };
            i();
            h(0);
            return this;
        },
        checkLogin: function(a) {
            var d = this;
            if (typeof (a) != "function") {
                console.log("调用checkLogin失败,参数fn:function");
                return d;
            }
            if ($.qccAjax) {
                var boolStation = true;
                var postUrl = domainConfig.MainDomain + "/exteral/islogin";
                var thisHostMainDomain = window.location.origin.replace("http:", "").replace("https:", "");
                if (domainConfig.MainDomain.toLowerCase() != thisHostMainDomain.toLowerCase()) {
                    boolStation = false;
                    postUrl = "/api/services/app/exteral/checklogin";
                }
                $.qccAjax(postUrl, {}, function(data) {
                    if (data.Success == true) {
                        a(data.Result);
                    }
                }, {
                    thisStation: boolStation
                });
            } else {
                console.log("$.qccAjax 对象未加载");
            }
            return d;
        },
        checkLoginEvalFn: function(cfg) {
            var obj = this;
            var jumpUrl = encodeURIComponent(parent.location.href);
            var typeofFn = function(fnUrl, fnEval) {
                if (typeof (cfg.returnurl) != "undefined") {
                    fnUrl();
                } else {
                    if (typeof (cfg.fn) != "undefined") {
                        fnEval();
                    }
                }
            };
            obj.checkLogin(function(state) {
                if (state == true) {
                    typeofFn(function() {
                        location.href = cfg.returnurl;
                    }, function() {
                        eval(cfg.fn);
                    });
                    return;
                }
                var url;
                typeofFn(function() {
                    url = domainConfig.MainDomain + "/exteral/login.html?qtime=" + new Date().getTime() + "&isredirect=1&returnurl=" + cfg.returnurl;
                }, function() {
                    url = domainConfig.MainDomain + "/exteral/login.html?qtime=" + new Date().getTime() + "&fn=" + cfg.fn + "&returnurl=" + jumpUrl;
                });
                obj.loginlayer = layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 0,
                    shadeClose: true,
                    shade: 0.4,
                    skin: "layui-layer-rim",
                    area: ["350px", "475px"],
                    content: [url, "no"]
                });
            });
        },
        openLoginEvalFn: function(cfg) {
            var obj = this;
            var loherf = parent.location.href;
            if (loherf.indexOf("?") < 0) {
                loherf = loherf + "?itemjump";
            } else {
                loherf = loherf + "&itemjump";
            }
            var jumpUrl = encodeURIComponent(loherf);
            var url;
            url = domainConfig.MainDomain + "/exteral/login.html?qtime=" + new Date().getTime() + "&fn=" + cfg.fn + "&returnurl=" + jumpUrl;
            obj.loginlayer = layer.open({
                type: 2,
                title: false,
                closeBtn: 0,
                shadeClose: true,
                shade: 0.4,
                skin: "layui-layer-rim",
                area: ["350px", "475px"],
                content: [url, "no"],
                end: function(e) {
                    obj.loginlayer = "";
                }
            });
        },
        qccTabNew: function(a, c, e, callback) {
            var h = this;
            var a = $(a), c = $(c), n = false, f = a.length, i, d = 0;
            a.mouseleave(function() {
                if (e == true) {
                    m();
                }
            });
            a.mouseenter(function() {
                if (n == true) {
                    return;
                }
                n = true;
                if (e == true) {
                    clearInterval(i);
                }
                d = a.index(this);
                l(d);
            });
            c.mouseleave(function() {
                if (e == true) {
                    m();
                }
            });
            c.mouseenter(function() {
                if (n == true) {
                    return;
                }
                n = true;
                if (e == true) {
                    clearInterval(i);
                }
                d = c.index(this);
                l(d);
            });
            var l = function(b) {
                a.removeClass("active");
                a.eq(b).addClass("active");
                c.removeClass("active").hide();
                c.eq(b).addClass("active").show();
                n = false;
                h.elScroll = true;
                if ($.qccimgLazy) {
                    $.qccimgLazy.imgScroll = true;
                }
                if (callback) {
                    callback();
                }
            };
            var m = function() {
                i = setInterval(function() {
                    d++;
                    if (d == f) {
                        d = 0;
                    }
                    l(d);
                }, 4000);
            };
            if (e == true) {
                m();
            }
            return this;
        },
        searchTab: function(site) {
            var a = {
                product: {
                    tip: "请输入产品关键词或货号",
                    url: "/list.html?keyword=",
                    type: 0
                },
                seller: {
                    tip: "请输入供应商名称或档口号",
                    url: "/shoplist.html?keyword=",
                    type: 1
                },
                service: {
                    tip: "请输入服务名称,如面料,商标",
                    url: "/servicer/search.html?keyword=",
                    type: 1
                }
            };
            if (typeof (site) != undefined) {
                switch (site) {
                case "factory":
                    a.product.url = "/product/list.html?keyword=";
                    a.seller.url = "/item/list.html?keyword=";
                    break;
                }
            }
            var i = $(".search-triggers li")
              , e = $("#keywords")
              , g = a[$(".search-triggers li.active").attr("data-type")]
              , f = $("#typekey")
              , h = $("#submit_btn")
              , d = $(".search-ft");
            i.click(function() {
                var b = $(this).attr("data-type");
                i.removeClass("active");
                $(this).addClass("active");
                if (typeof (site) != undefined) {
                    switch (site) {
                    case "factory":
                        var selectText = $(this).find("a").text();
                        $(this).parents("ul").siblings(".next-s").find("span").text(selectText);
                        break;
                    }
                }
                g = a[b];
                e.attr("placeholder", g.tip);
                f.val(g.type);
                if ($(".search-ft[data-type=" + b + "]").length > 0) {
                    d.hide();
                    $(".search-ft[data-type=" + b + "]").show();
                }
            });
            e.keypress(function(b) {
                if (b.keyCode == 13) {
                    location.href = g.url + encodeURI(e.val());
                }
            });
            h.click(function() {
                location.href = g.url + encodeURI(e.val());
            });
            return this;
        },
        leftNav: function() {
            var obj = this;
            var floor = $(".floor")
              , winH = $(window).height()
              , winH2 = winH / 2
              , leftbarNode = $("#leftbar")
              , leftbarNode_a = leftbarNode.find("a")
              , lh = leftbarNode.height();
            leftbarNode_a.click(function() {
                if ($(this).hasClass("top")) {
                    $("body,html").animate({
                        scrollTop: 0
                    }, 500);
                    return false;
                }
                var y = $("#" + $(this).attr("data-name")).offset().top;
                $("html,body").animate({
                    scrollTop: y
                }, 300);
            });
            $(window).scroll(function() {
                var scrollTop = $(document).scrollTop()
                  , totalH = scrollTop + winH2
                  , len = floor.length - 1
                  , footNodeTop = $(".footer-main").offset().top;
                if (scrollTop > 100) {
                    $("#leftbar").fadeIn(800);
                } else {
                    $("#leftbar").fadeOut(800);
                }
                while (len > -1) {
                    var nodeTop = floor.eq(len).offset().top;
                    leftbarNode_a.removeClass("active");
                    if (totalH > nodeTop) {
                        leftbarNode_a.eq(len).addClass("active");
                        break;
                    }
                    len--;
                }
            });
        },
        moveLeft: function(u, s, q, o, m) {
            var l = $(u), t = $(s), p = t.length, n = 0, k = $(o), b = $(m), a;
            k.click(function() {
                n -= 1;
                if (n == -1) {
                    n = p - 1;
                }
                j(n);
            });
            k.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.3);
            });
            b.click(function() {
                n += 1;
                if (n == p) {
                    n = 0;
                }
                j(n);
            });
            b.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.3);
            });
            l.css("width", q * p);
            var j = function(d) {
                var c = -d * q;
                l.stop(true, false).animate({
                    left: c
                }, 500, function() {
                    if ($.qccimgLazy) {
                        $.qccimgLazy.imgScroll = true;
                    }
                });
                t.removeClass("active").eq(d).addClass("active");
            };
            t.mouseover(function() {
                n = t.index(this);
                j(n);
            }).eq(0).trigger("mouseover");
            $(u).hover(function() {
                clearInterval(a);
            }, function() {
                a = setInterval(function() {
                    n++;
                    if (n == p) {
                        n = 0;
                    }
                    j(n);
                }, 10000);
            }).trigger("mouseleave");
            return this;
        },
        moveLeftPage: function(c, e, h, n, f, sc, st, time) {
            var i = $(c), d = $(e), l = d.length, m = 0, p = $(n), j = $(f), sc = $(sc), st = $(st), k;
            p.click(function() {
                m -= 1;
                if (m == -1) {
                    m = l - 1;
                }
                o(m);
            });
            p.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.3);
            });
            j.click(function() {
                m += 1;
                if (m == l) {
                    m = 0;
                }
                o(m);
            });
            j.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.3);
            });
            st.text(l);
            i.css("width", h * l);
            var o = function(b) {
                var a = -b * h;
                sc.text(b + 1);
                i.stop(true, false).animate({
                    left: a
                }, 500);
                d.removeClass("active").eq(b).addClass("active");
            };
            d.mouseover(function() {
                m = d.index(this);
                o(m);
            }).eq(0).trigger("mouseover");
            $(c).hover(function() {
                clearInterval(k);
            }, function() {
                k = setInterval(function() {
                    m++;
                    if (m == l) {
                        m = 0;
                    }
                    o(m);
                }, time ? time : "3000");
            }).trigger("mouseleave");
        },
        lazySilderPlay: function(u, t, p, o, m) {
            var l = $(u + " ul"), b = l.find("li"), v = $(t), s = 0, q = b.length, a, n = $(o), d = $(m);
            l.css("width", p * q);
            var c = function(f) {
                var e = b.eq(f)
                  , g = e.attr("data-src");
                var i = -f * p;
                if (g != "true") {
                    var h = e.find("img");
                    h.attr("src", g);
                    e.attr("data-src", true);
                }
                l.stop(true, false).animate({
                    left: i
                }, 200);
                v.removeClass("active").eq(f).addClass("active");
                return this;
            };
            v.mouseover(function() {
                s = v.index(this);
                c(s);
            }).eq(0).trigger("mouseover");
            n.click(function() {
                s -= 1;
                if (s == -1) {
                    s = q - 1;
                }
                c(s);
            });
            n.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
            });
            d.click(function() {
                s += 1;
                if (s == q) {
                    s = 0;
                }
                c(s);
            });
            d.hover(function() {
                $(this).css("opacity", 1);
            }, function() {
                $(this).css("opacity", 0.5);
            });
            $(u).hover(function() {
                clearInterval(a);
                n.show();
                d.show();
            }, function() {
                n.hide();
                d.hide();
                a = setInterval(function() {
                    c(s);
                    s++;
                    if (s == q) {
                        s = 0;
                    }
                }, 4000);
            }).trigger("mouseleave");
            return this;
        },
        uploadClickPro: function() {
            var obj = this;
            $("body").off("click", ".jsUpProduct,.jsUploadProduct").on("click", ".jsUpProduct,.jsUploadProduct", function() {
                var productId = $(this).attr("data-pid");
                if (!productId) {
                    productId = $(this).attr("data-id");
                }
                if (!productId) {
                    productId = $(this).attr("data-productid");
                }
                if (!productId) {
                    console.info("未配置data-pid值");
                    return;
                }
                obj.uploadProTotal(function(data) {
                    var UsableCount = data.Result.UsableCount;
                    var isrealnameauth = data.Result.IsRealNameAuth;
                    if (!isrealnameauth && (UsableCount == 0)) {
                        obj.uploadPublishTotalPrompt();
                        return;
                    }
                    if (UsableCount == 0) {
                        layer.alert("您已达当日最大铺货次数！", {
                            icon: 0
                        });
                        return;
                    }
                    $.global.checkLoginEvalFn({
                        fn: "$.global.uploadProductMax(" + productId + ")"
                    });
                    being_recommend.upImgNew(productId);
                });
            });
            return obj;
        },
        uploadHtml: function() {
            var obj = this;
            var html = [];
            html.push("<dl>");
            html.push('<dd class="uploadproduct" platformid="1"><i class="taobao"></i><em>淘宝</em></dd>');
            html.push('<dd class="uploadproduct" platformid="4"><i class="pdd"></i><em>拼多多</em></dd>');
            html.push('<dd class="uploadproduct" platformid="10"><i class="dy"></i><em>抖音</em></dd>');
            html.push("</dl>");
            obj.uploadStr = html.join("");
        },
        uploadHtmlSvg: function() {
            var obj = this;
            var html = [];
            html.push("<dl>");
            html.push('<dd class="uploadproduct" platformid="1"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"><use xlink:href="#qcw-QCW-03-21"></use></svg><em>淘宝</em></dd>');
            html.push('<dd class="uploadproduct" platformid="4"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"><use xlink:href="#qcw-QCW-03-26"></use></svg><em>拼多多</em></dd>');
            html.push('<dd class="uploadproduct" platformid="10"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"> <use xlink:href="#qcw-QCW-03-24"></use></svg><em>抖音</em></dd>');
            html.push("</dl>");
            obj.uploadStrSvg = html.join("");
        },
        uploadHtmlSvgShop: function() {
            var obj = this;
            var html = [];
            html.push("<dl>");
            html.push('<dd class="uploadproduct" platformid="1"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"><use xlink:href="#qcw-a-2-1-14"></use></svg><em>淘宝</em></dd>');
            html.push('<dd class="uploadproduct" platformid="4"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"><use xlink:href="#qcw-a-2-1-19"></use></svg><em>拼多多</em></dd>');
            html.push('<dd class="uploadproduct" platformid="10"><svg class="b_qccIcons svg-icon upIcon" aria-hidden="true"> <use xlink:href="#qcw-a-2-1-17"></use></svg><em>抖音</em></dd>');
            html.push("</dl>");
            obj.uploadStrSvgShop = html.join("");
        },
        uploadProduct: function(productId, platformId) {
            var obj = this;
            if (typeof (layercross) != "undefined") {
                layer.close(obj.layercross);
            }
            var url = domainConfig.MainDomain + "/product/uploadproduct?productId=" + productId + "&platformId=" + platformId;
            layer.open({
                type: 2,
                title: "请选择要上传的店铺",
                shadeClose: true,
                shade: 0.4,
                area: ["640px", "500px"],
                content: [url, "no"]
            });
        },
        uploadProductMax: function(productId) {
            var obj = this;
            if (typeof (layercross) != "undefined") {
                layer.close(obj.layercross);
            }
            var url = domainConfig.MainDomain + "/productpush/" + productId + ".html";
            layer.open({
                type: 2,
                title: false,
                shadeClose: true,
                closeBtn: false,
                resize: false,
                shade: 0.4,
                area: ["800px", "480px"],
                content: [url, "no"]
            });
        },
        uploadProTotal: function(fn) {
            var obj = this;
            $.qccAjax("/api/services/app/ProductPublish/GetMyTodayPublishStatistics", {}, function(data) {
                if (fn) {
                    fn(data);
                }
            });
        },
        uploadPublishTotalPrompt: function() {
            layer.confirm("为防止恶意滥用平台资源，请您实名认证后获取更高的使用次数", {
                icon: 0,
                skin: "my-custom-class",
                btn: ["去认证", "取消"]
            }, function() {
                window.open(domainConfig.WorkDomain + "/Buyer/Home/UserCenter?form=readName");
                layer.closeAll();
                $(".layui-layer-shade").hide();
            }, function() {});
            setTimeout(function() {
                $(".my-custom-class .layui-layer-ico.layui-layer-ico0").css("top", "24px");
            });
        },
        qccTranslateWeb: function(that) {
            var obj = this;
            $(".topbarWarp .topnav li.trans_li").show();
            $(".topbarWarp .topnav li.trans_li .trans_title").show();
            $(".topbarWarp .topnav li.trans_li .nav_cons").hide();
            $(".topbarWarp").addClass("topbarFany");
            $(".topbarWarp .sign_status li a.uname").attr("title", $(".topbarWarp .sign_status li a.uname").text());
            var cookiTranslateName = "Ttranslate_key2";
            var cookiTranslateValue = $.cookie(cookiTranslateName);
            var domain = window.location.hostname;
            if (domain == "e.qccqcc.com" || window.location.search.includes("?language=en")) {
                translateEn();
                $(".topbarWarp .topnav li .trans_title a span").text("Chinese");
                $(".topbarWarp .topnav li .trans_title a").attr("translatepage", "cn");
                if (domain.indexOf("17qcc") > 0) {
                    $.cookie(cookiTranslateName, "true", {
                        domain: ".17qcc.com",
                        path: "/",
                        expires: 1
                    });
                } else {
                    if (domain.indexOf("qccqcc") > 0) {
                        $.cookie(cookiTranslateName, "true", {
                            domain: ".qccqcc.com",
                            path: "/",
                            expires: 1
                        });
                    } else {
                        $.cookie(cookiTranslateName, "true", {
                            domain: "",
                            path: "/",
                            expires: 1
                        });
                    }
                }
            } else {
                if (cookiTranslateValue == "true") {
                    translateEn();
                    $(".topbarWarp .topnav li .trans_title a span").text("Chinese");
                    $(".topbarWarp .topnav li .trans_title a").attr("translatepage", "cn");
                } else {
                    $(".topbarWarp .topnav li .trans_title a span").text("English");
                    $(".topbarWarp .topnav li .trans_title a").attr("translatepage", "en");
                }
            }
            $("body").on("click", ".topbarWarp .topnav li .trans_title a", function() {
                var theA = $(this);
                var translatepage = theA.attr("translatepage");
                var transText = theA.text();
                if (translatepage == "cn") {
                    if ($("body").hasClass("tranEnglish")) {
                        if (domain.indexOf("17qcc") > 0) {
                            $.cookie(cookiTranslateName, "", {
                                domain: ".17qcc.com",
                                path: "/",
                                expires: 1
                            });
                        } else {
                            if (domain.indexOf("qccqcc") > 0) {
                                $.cookie(cookiTranslateName, "", {
                                    domain: ".qccqcc.com",
                                    path: "/",
                                    expires: 1
                                });
                            } else {
                                $.cookie(cookiTranslateName, "", {
                                    domain: "",
                                    path: "/",
                                    expires: 1
                                });
                            }
                        }
                        $.removeCookie(cookiTranslateName);
                        translateDefault();
                        transLangToDefault();
                    }
                }
                if (translatepage == "en") {
                    if ($("body").hasClass("tranEnglish")) {
                        return false;
                    }
                    if (domain.indexOf("17qcc") > 0) {
                        $.cookie(cookiTranslateName, "true", {
                            domain: ".17qcc.com",
                            path: "/",
                            expires: 1
                        });
                    } else {
                        if (domain.indexOf("qccqcc") > 0) {
                            $.cookie(cookiTranslateName, "true", {
                                domain: ".qccqcc.com",
                                path: "/",
                                expires: 1
                            });
                        } else {
                            $.cookie(cookiTranslateName, "true", {
                                domain: "",
                                path: "/",
                                expires: 1
                            });
                        }
                    }
                    location.reload();
                }
            });
            function translateEn() {
                if (typeof (translate) == "undefined") {
                    $(".topbarWarp .topnav li.trans_li").hide();
                    $(".topbarWarp .topnav li.trans_li .trans_title").hide();
                    return;
                }
                if (that.enterprise) {
                    translate.enterprise.use();
                } else {
                    if (that.free) {} else {
                        translate.service.use("client.edge");
                    }
                }
                translateHtmlCss();
                if (that.callback && typeof (that.callback) == "function") {
                    that.callback();
                }
                if (that.requestDone && typeof (that.requestDone) == "function") {
                    that.requestDone();
                }
            }
            function translateDefault() {
                $("body").removeClass("tranEnglish");
                translate.changeLanguage("chinese_simplified");
            }
            function translateHtmlCss() {
                $(".topbarWarp .qcc_home").text("Home");
                $(".topbarWarp .topnav li.kefbox").find(".nav_title a span").text("About");
                $(".topbarWarp .topnav li.nav_noother").find("a span").text("Help");
                $(".topbarWarp .topnav li.nav_webbar").find(".nav_title  a span").text("Site");
                $(".topbarWarp .topnav li.nav_corebox").find(".nav_title  a span").text("Mobile");
                setTimeout(function() {
                    if ($(".topbarWarp .sign_status li").length > 1) {
                        $(".topbarWarp .topnav").addClass("topnavfany");
                    }
                }, 500);
            }
            function transLangToDefault() {
                if (domain.includes("e.qccqcc") || window.location.search.includes("?language=en")) {
                    window.location.href = window.location.origin;
                }
            }
        },
        qccTranslateSetExecute: function(that) {
            var obj = this;
            var cookiTranslateName = "Ttranslate_key2";
            var cookiTranslateValue = $.cookie(cookiTranslateName);
            if (cookiTranslateValue == "true") {
                var newEles = [];
                var midEles = [];
                var pageNum = 20;
                var pageSize = 0;
                var count = 1;
                var eles = that.eles;
                eles.map(function(list, m) {
                    pageSize = Math.ceil(list.length / pageNum);
                    list.map(function(index, lista) {
                        midEles.push(lista);
                        if (index == list.length - 1) {
                            newEles.push(midEles);
                            midEles = [];
                            count = 1;
                        } else {
                            if (index == ((pageNum * count) - 1)) {
                                newEles.push(midEles);
                                midEles = [];
                                if (count <= pageSize) {
                                    count++;
                                } else {
                                    count = 1;
                                }
                            }
                        }
                    });
                });
                newEles.map(function(node, i) {
                    setTimeout(function() {
                        translate.execute(node);
                        newEles.splice(i, 1);
                    }, 500);
                });
            }
        },
        qccTranslateExecute: function() {
            var obj = this;
            var cookiTranslateName = "Ttranslate_key2";
            var cookiTranslateValue = $.cookie(cookiTranslateName);
            if (cookiTranslateValue == "true") {
                translate.execute();
            }
        },
        qccTranslateImages: function(node, res) {
            setTimeout(function() {
                if ($("body").hasClass("tranEnglish")) {
                    node.find("a").each(function(i, item) {
                        var ensrc = res.Result[i].ViceImgUrl;
                        if (ensrc != "" && ensrc) {
                            $(item).find("img").attr("src", ensrc);
                            $(item).attr("ensrc", true);
                        }
                    });
                }
            }, 300);
        },
        qccPirceLogin: function(pobj) {
            var obj = this;
            if (!$.QccDataIsLogin) {
                var phtml = "";
                phtml += '<div class="pirceLogin">';
                phtml += "<span>登录</span><em>查看进货价</em>";
                phtml += "</div>";
                switch (pobj.caseNum) {
                case 0:
                    pobj.node.find(pobj.pbox).after(phtml);
                    pobj.node.find(pobj.pbox).remove();
                    break;
                case 1:
                    vipPirceBoxRender(pobj.pbox);
                    break;
                case 2:
                    saleCountPirceBoxRender(pobj.pbox);
                default:
                    break;
                }
                function saleCountPirceBoxRender(pbox) {
                    pobj.node.find(pbox).after(phtml);
                    pobj.node.find(pbox).each(function() {
                        if ($(this).find(".viewpay").length > 0) {
                            $(this).siblings(".pirceLogin").append($(this).find(".viewpay")[0].outerHTML);
                        }
                    });
                    pobj.node.find(pbox).remove();
                }
                function vipPirceBoxRender(pbox) {
                    pobj.node.find(pbox).after(phtml);
                    pobj.node.find(pbox).each(function() {
                        if ($(this).find(".vipoffs").length > 0) {
                            $(this).siblings(".pirceLogin").append($(this).find(".vipoffs")[0].outerHTML);
                        }
                    });
                    pobj.node.find(pbox).remove();
                }
                if (pobj.fn) {
                    pobj.fn(phtml);
                }
            }
        },
        CheckStatusByProductDetail: function(id, fn) {
            var productId = id;
            var loading = layer.load(1, {
                shade: [0.001, "#000"]
            });
            $.qccAjax("/api/services/app/DistributorApplyController/CheckStatusByProductDetail", {
                ProductId: productId
            }, function(data) {
                layer.close(loading);
                if (data.Success) {
                    if (fn) {
                        fn(data.Result.NeedApply);
                    }
                } else {
                    layer.msg("请刷新后重试", {
                        icon: 5,
                        shade: 0.5
                    });
                }
            }, {
                mustLogin: true
            });
        },
        CheckStatusByBrandShop: function(id, fn) {
            var productId = id;
            var loading = layer.load(1, {
                shade: [0.001, "#000"]
            });
            $.qccAjax("/api/services/app/DistributorApplyController/CheckStatusByBrandShop", {
                ProductId: productId
            }, function(data) {
                layer.close(loading);
                if (data.Success) {
                    if (fn) {
                        fn(data.Result.NeedApply);
                    }
                } else {
                    layer.msg("请刷新后重试", {
                        icon: 5,
                        shade: 0.5
                    });
                }
            }, {
                mustLogin: true
            });
        },
        filterPostData: function(data) {
            if (typeof data == "object") {
                if (window.cfgPage && window.cfgPage.PlusVipStatus && window.cfgPage.PlusVipStatus == 1) {
                    data = $.extend(true, data, {
                        IsGetVipPrice: window.cfgPage.PlusVipStatus
                    });
                }
            }
            return data;
        },
    };
}
)(jQuery);
$(function() {
    removePlug();
});
function removePlug() {
    $(".niu-sidebar-tool-box").remove();
    var time = null;
    var timer = setInterval(function() {
        $(".niu-sidebar-tool-box").remove();
        var nodes = document.querySelectorAll("[id]");
        var i = nodes.length;
        while (i--) {
            var el = nodes[i];
            if (el.id.indexOf("J_") === 0 && el.id.length >= 28) {
                var txt = el.textContent;
                if (txt && txt.indexOf("采") !== -1 && txt.indexOf("集") !== -1) {
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
        }
        var btns = document.querySelectorAll("button, a");
        i = btns.length;
        while (i--) {
            var b = btns[i];
            var t = b.textContent;
            if (t && t.indexOf("批量采集") !== -1) {
                b.parentNode && b.parentNode.removeChild(b);
            }
        }
    }, 1500);
    $("body").on("mouseover mouseout", "li", function(event) {
        $("body").find("[class]").each(function(index, item) {
            var className = $(item).attr("class");
            if (className.indexOf("J_") >= 0) {
                if ($(item).text().indexOf("采集") >= 0) {
                    $(item).remove();
                }
            }
        });
        var cj = $("body").find("div");
        cj.each(function(index, item) {
            var has = $(item).parents().hasClass("hslist");
            var itemhas = $(item).hasClass("hslist");
            var rulehas = $(item).parents("body").find(".ruleList").length > 0;
            if (has || itemhas || rulehas) {
                return;
            }
            if ($(item).text().indexOf("采集") >= 0) {
                $(item).remove();
            }
        });
        if (event.type == "mouseover") {
            var that = $(this);
            var div = $("body").find("button");
            div.each(function(index, item) {
                var btn = $(item);
                if (btn.length == 0) {
                    return;
                }
                if (btn.text().indexOf("采集") >= 0) {
                    btn.remove();
                }
            });
            time = setInterval(function() {
                var div = $("body").find("button");
                div.each(function(index, item) {
                    var btn = $(item);
                    if (btn.length == 0) {
                        return;
                    }
                    if (btn.text().indexOf("采集") >= 0) {
                        btn.remove();
                    }
                });
            }, 1500);
        } else {
            if (event.type == "mouseout") {
                clearInterval(time);
            }
        }
    });
}
(function($) {
    if (!$) {
        console.error("调用merge出错，缺少引用Jquery组件");
        return;
    }
    var footJs = [];
    var footIsLoadEnd = function() {
        if (document.body) {
            if (footJs.length > 0) {
                $.each(footJs, function(i, item) {
                    mergeJs(item, false);
                });
            }
        } else {
            setTimeout(footIsLoadEnd, 100);
        }
    };
    var mergeJs = function(arr, isFirst) {
        var jsurl = "//test.js.17qcc.com/combo?";
        jsurl = window.QccJsWebMergeJsUrl || jsurl;
        var script = document.createElement("script");
        script.type = "text/javascript";
        var newJs = [];
        $.each(arr, function(i, item) {
            var tempItem = item;
            if (typeof (jsversion) != undefined) {
                var v = jsversion[tempItem];
                if (v && v != undefined) {
                    tempItem += "-" + v;
                }
            }
            newJs.push(tempItem);
        });
        script.src = jsurl + newJs.join("&");
        if (isFirst == true) {
            document.head.appendChild(script);
        } else {
            $(document).ready(function() {
                document.body.appendChild(script);
            });
        }
    };
    var responseScript = function() {
        if (!window.moudles) {
            console.error("页面未配置moudles,moudles=['testa','testb']各页面需要引用的模块");
            return;
        }
        $.each(moudles, function(i, item) {
            var isFirst = i == 0;
            if (Array.isArray(item)) {
                if (isFirst == false) {
                    footJs.push(item);
                } else {
                    mergeJs(item, true);
                }
            } else {
                mergeJs(moudles);
                return false;
            }
        });
    };
    responseScript();
    footIsLoadEnd();
}
)(jQuery);
$(function() {
    var tjfn = {
        cnzz: function() {
            var obj = this;
            setTimeout(function() {
                var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                $("body").append(unescape("%3Cspan async = true style='display:none' id='cnzz_stat_icon_1255843817'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1255843817%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
            }, 100);
            return obj;
        },
        baiduold: function() {
            var obj = this;
            var _hmt = _hmt || [];
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?fef2d8faf03d90e688dfffca6a91905a";
            hm.defer = true;
            hm.async = true;
            var bodyNode = document.getElementsByTagName("body")[0];
            bodyNode.appendChild(hm);
            return obj;
        },
        baidunew: function() {
            var obj = this;
            setTimeout(function() {
                var _hmt = _hmt || [];
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?d5e3bd96db5d51d2dc43ddfcc5fbc827";
                hm.defer = true;
                hm.async = true;
                var bodyNode = document.getElementsByTagName("body")[0];
                bodyNode.appendChild(hm);
            }, 200);
            return obj;
        },
        qcccnzz: function() {
            var _czc = _czc || [];
            (function() {
                var um = document.createElement("script");
                um.src = "https://s4.cnzz.com/z.js?id=1281361833&async=1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(um, s);
            }
            )();
        },
    };
    $(window).load(function() {
        tjfn.cnzz().baidunew();
        tjfn.qcccnzz();
    });
});
var being_recommend = {
    url: "/api/services/app/AiRecFactory/AiRecPushBehavior",
    shipExposeUrl: "/api/services/app/ExposeFactory/ProductExpose",
    ShipStoreUrl: "/api/services/app/ExposeFactory/ShopExpose",
    detail: function() {},
    GetRequest: function() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    productExposes: function() {
        var that = this;
        var scrollTop = 0;
        var iscroll = false;
        var runTime = null;
        var openTime = 0;
        this.getItem(0);
        $(window).scroll(function() {
            var scrollNow = $(document).scrollTop();
            if (iscroll) {
                return;
            }
            if (Math.abs(scrollNow - scrollTop) > 20) {
                scrollTop = scrollNow;
            }
            iscroll = true;
            setTimeout(function() {
                if (openTime >= 3) {
                    that.getItem(openTime);
                }
                openTime = 0;
                iscroll = false;
                setTimeout(function() {
                    clearInterval(runTime);
                    runTime = setInterval(function() {
                        openTime = openTime + 1;
                    }, 1000);
                }, 500);
            }, 500);
        });
    },
    getItem: function(time) {
        var be = this;
        var top = $(document).scrollTop();
        var bottom = top + window.innerHeight;
        var a = $("body").find("a:visible");
        var items = new Array();
        var shipGetRequest = this.GetRequest();
        var domorigin = window.location.origin;
        var domorigin2 = "https://www.17qcc.com";
        domorigin = "http://test.www.17qcc.com";
        a.each(function(index, data) {
            var item = new Object();
            var hrefs = $(data).attr("href");
            if (hrefs) {
                if (hrefs.includes(domorigin + "/item/") || hrefs.includes(domorigin2 + "/item/")) {
                    var data1 = $(data).closest(".dataModule").attr("datamoduletype");
                    if (!data1) {
                        return;
                    }
                    var data2 = $(data).closest(".dataModule").attr("datamoduleid");
                    if (!data2) {
                        return;
                    }
                    hrefs = hrefs.replace(domorigin + "/item/", "");
                    hrefs = hrefs.replace(domorigin2 + "/item/", "");
                    var thisTop = $(data).offset().top;
                    if (thisTop > top && thisTop < bottom) {
                        item.id = hrefs.split(".")[0];
                        item.top = $(data).offset().top;
                        item.time = time;
                        item.Weight = $(data).attr("datasort") ? $(data).attr("datasort") : 0;
                        item.datamoduletype = data1;
                        item.datamoduleid = data2;
                        item.showtype = $(data).attr("showtype") > 0 ? $(data).attr("showtype") : 0;
                        if (shipGetRequest.vipstore == 1) {
                            item.showtype = 99;
                        }
                        if (shipGetRequest.shopmode == 1) {
                            item.showtype = 99;
                        }
                        if (typeof pageParam != "undefined" && pageParam.SupplierShopMode == 1) {
                            if ($(data).closest("ul").attr("id") == "rankProducts") {
                                item.showtype = 100;
                            }
                        }
                        items.push(item);
                    }
                }
            }
        });
        for (var i = 0; i < items.length; i++) {
            for (var j = items.length - 1; j > 0; j--) {
                if (items[i].id == items[j].id && i != j) {
                    items.splice(j, 1);
                }
            }
        }
        var param = {
            SceneId: "-102",
            ProductBehaviors: [],
            IsAiRec: false,
        };
        var ProductBehaviors = new Array();
        items.map(function(res) {
            if (isNaN(parseInt(res.id))) {
                return;
            }
            ProductBehaviors.push({
                ProductId: parseInt(res.id),
                BhvType: 0,
                BhvValue: "",
            });
        });
        param.ProductBehaviors = ProductBehaviors;
        if (param.ProductBehaviors.length < 1) {
            return;
        }
        $.qccAjax(this.url, param, function(res) {});
        var query = be.GetRequest();
        var keyword = "";
        if (query && query.keyword) {
            keyword = query.keyword;
        }
        var shipParam = {
            productExposes: [],
            channelPageId: channelpageId,
            Keyword: keyword,
        };
        var productExposes = new Array();
        items.map(function(res) {
            if (isNaN(parseInt(res.id))) {
                return;
            }
            productExposes.push({
                productId: parseInt(res.id),
                showType: res.datamoduletype == 3 ? 2 : res.datamoduletype == 2 ? 1 : res.datamoduletype == 1 ? 1 : 0,
                Weight: res.Weight ? parseInt(res.Weight) : 0,
                CustomId: res.datamoduleid ? parseInt(res.datamoduleid) : "",
            });
        });
        if (items.length < 1) {
            return;
        }
        shipParam.productExposes = productExposes;
        $.qccAjax(this.shipExposeUrl, shipParam, function(res) {});
    },
    exposeShipStore: function() {
        var that = this;
        var scrollTop = 0;
        var iscroll = false;
        var runTime = null;
        var openTime = 0;
        that.getItemShipStore(openTime);
        $(window).scroll(function() {
            var scrollNow = $(document).scrollTop();
            if (iscroll) {
                return;
            }
            if (Math.abs(scrollNow - scrollTop) > 20) {
                scrollTop = scrollNow;
            }
            iscroll = true;
            setTimeout(function() {
                if (openTime >= 3) {
                    that.getItemShipStore(openTime);
                }
                openTime = 0;
                iscroll = false;
                setTimeout(function() {
                    clearInterval(runTime);
                    runTime = setInterval(function() {
                        openTime = openTime + 1;
                    }, 1000);
                }, 500);
            }, 500);
        });
    },
    getItemShipStore: function(time) {
        var be = this;
        var top = $(document).scrollTop();
        var bottom = top + window.innerHeight;
        var a = $("body").find("a:visible");
        var items = new Array();
        a.each(function(index, data) {
            var hrefs = $(data).attr("href");
            if (!hrefs) {
                return;
            }
            var host;
            try {
                host = new URL(hrefs,location.origin).hostname;
            } catch (e) {
                return null;
            }
            if (!/^shop\d+\.17qcc\.com$/.test(host)) {
                return;
            }
            var data1 = $(data).closest(".dataModule").attr("datamoduletype");
            var data2 = $(data).closest(".dataModule").attr("datamoduleid");
            var item = new Object();
            var thisTop = $(data).offset().top;
            if (thisTop > top && thisTop < bottom) {
                item.top = $(data).offset().top;
                item.time = time;
                item.showtype = data1 == 3 ? 2 : data1 == 2 ? 1 : data1 == 1 ? 1 : 0;
                item.Weight = $(data).attr("datasort");
                item.shopid = be.getShopId(hrefs);
                item.datamoduletype = data1;
                item.datamoduleid = data2;
                items.push(item);
            }
        });
        for (var i = 0; i < items.length; i++) {
            for (var j = items.length - 1; j > 0; j--) {
                if (items[i].shopid == items[j].shopid && i != j) {
                    items.splice(j, 1);
                }
            }
        }
        if (items.length < 1) {
            return;
        }
        var param = {
            shopExposes: [],
            channelPageId: channelpageId,
        };
        var shopExposes = new Array();
        items.map(function(res) {
            if (isNaN(parseInt(res.shopid))) {
                return;
            }
            shopExposes.push({
                shopId: parseInt(res.shopid),
                showType: parseInt(res.showtype),
                Weight: res.Weight ? parseInt(res.Weight) : 0,
                CustomId: res.datamoduleid ? parseInt(res.datamoduleid) : 0,
            });
        });
        param.shopExposes = shopExposes;
        $.qccAjax(this.ShipStoreUrl, param, function(res) {});
    },
    click: function() {
        var be = this;
        if (window.location.href.includes("airec")) {
            return;
        }
        $("body").on("click", "a", function() {
            var that = $(this);
            $.global.checkLogin(function(data) {
                if (!data) {
                    return;
                }
                var hrefs = that.attr("href");
                if (hrefs) {
                    if (hrefs.includes("item")) {
                        hrefs = hrefs.replace("https://www.17qcc.com/item/", "");
                        var id = parseInt(hrefs.split(".")[0]);
                        var param = {
                            SceneId: "-102",
                            ProductBehaviors: [{
                                ProductId: id,
                                TraceInfo: "",
                                BhvType: 1,
                                BhvValue: "1",
                            }, ],
                            IsAiRec: false,
                        };
                        $.qccAjax(be.url, param, function(res) {});
                    }
                }
            });
        });
    },
    click2: function() {
        var be = this;
        $("body").on("click", "a", function() {
            var that = $(this);
            $.global.checkLogin(function(data) {
                if (!data) {
                    return;
                }
                var hrefs = that.attr("href");
                if (hrefs) {
                    if (hrefs.includes("item")) {
                        hrefs = hrefs.replace("https://www.17qcc.com/item/", "");
                        var ProductId = that.attr("data-productid");
                        var TraceInfo = that.attr("data-traceinfo");
                        var param = {
                            SceneId: "qccuserthink",
                            ProductBehaviors: [{
                                ProductId: ProductId,
                                TraceInfo: TraceInfo,
                                BhvType: 1,
                                BhvValue: "1",
                            }, ],
                            IsAiRec: true,
                        };
                        $.qccAjax(be.url, param, function(res) {});
                    }
                }
            });
        });
    },
    expose2: function() {
        var that = this;
        var scrollTop = 0;
        var iscroll = false;
        var runTime = null;
        var openTime = 0;
        that.getItem2(openTime);
        $(window).scroll(function() {
            var scrollNow = $(document).scrollTop();
            if (iscroll) {
                return;
            }
            if (Math.abs(scrollNow - scrollTop) > 20) {
                scrollTop = scrollNow;
            }
            iscroll = true;
            setTimeout(function() {
                if (openTime > 3) {
                    that.getItem2(openTime);
                }
                openTime = 0;
                iscroll = false;
                setTimeout(function() {
                    clearInterval(runTime);
                    runTime = setInterval(function() {
                        openTime = openTime + 1;
                    }, 1000);
                }, 500);
            }, 500);
        });
    },
    likeImg: function() {
        var be = this;
        $("body").on("click", "a", function() {
            var that = $(this);
            $.global.checkLogin(function(data) {
                if (!data) {
                    return;
                }
                return;
                var hrefs = that.attr("href");
                if (hrefs) {
                    if (hrefs.includes("similar.html")) {
                        var id = hrefs.split("=")[1].split("&")[0];
                        var param = {
                            SceneId: "-102",
                            ProductBehaviors: [{
                                ProductId: id,
                                TraceInfo: "",
                                BhvType: 2,
                                BhvValue: "",
                            }, ],
                            IsAiRec: false,
                        };
                        if (window.pageParam) {
                            if (pageParam.TraceInfo) {
                                param.IsAiRec = true;
                                param.ProductBehaviors[0].TraceInfo = pageParam.TraceInfo;
                                param.SceneId = "qccuserthink";
                            }
                        }
                        $.qccAjax(be.url, param, function(res) {});
                    }
                }
            });
            return;
        });
    },
    unlike: function() {
        var param = {
            SceneId: "-102",
            ProductBehaviors: [{
                ProductId: 0,
                TraceInfo: "",
                BhvType: 3,
                BhvValue: "",
            }, ],
            IsAiRec: false,
        };
        $.qccAjax(this.url, param, function(res) {});
    },
    upImgNew: function(productId) {
        var be = this;
        $.global.checkLogin(function(data) {
            if (!data) {
                return;
            }
            var param = {
                SceneId: "-102",
                ProductBehaviors: [{
                    ProductId: productId ? parseInt(productId) : "",
                    TraceInfo: "",
                    BhvType: 2,
                    BhvValue: "",
                }, ],
                IsAiRec: false,
            };
            if (window.pageParam) {
                if (pageParam.TraceInfo) {
                    param.IsAiRec = true;
                    param.ProductBehaviors[0].TraceInfo = pageParam.TraceInfo;
                    param.SceneId = "qccuserthink";
                }
            }
            $.qccAjax(be.url, param, function(res) {});
        });
    },
    upDownImg: function(productId) {
        var be = this;
        $.global.checkLogin(function(data) {
            if (!data) {
                return;
            }
            var param = {
                SceneId: "-102",
                ProductBehaviors: [{
                    ProductId: productId ? parseInt(productId) : "",
                    TraceInfo: "",
                    BhvType: 4,
                    BhvValue: "",
                }, ],
                IsAiRec: false,
            };
            if (window.pageParam) {
                if (pageParam.TraceInfo) {
                    param.IsAiRec = true;
                    param.ProductBehaviors[0].TraceInfo = pageParam.TraceInfo;
                    param.SceneId = "qccuserthink";
                }
            }
            $.qccAjax(be.url, param, function(res) {});
        });
    },
    collect: function(id) {
        var be = this;
        var param = {
            SceneId: "-102",
            ProductBehaviors: [{
                ProductId: id,
                TraceInfo: "",
                BhvType: 5,
                BhvValue: "",
            }, ],
            IsAiRec: false,
        };
        if (window.pageParam) {
            if (pageParam.TraceInfo) {
                param.IsAiRec = true;
                param.ProductBehaviors.map(function(a) {
                    a.TraceInfo = pageParam.TraceInfo;
                });
                param.SceneId = "qccuserthink";
            }
        }
        $.qccAjax(this.url, param, function(res) {});
    },
    stay: function() {
        var param = {
            SceneId: "-102",
            ProductBehaviors: [{
                ProductId: 0,
                TraceInfo: "",
                BhvType: 6,
                BhvValue: "",
            }, ],
            IsAiRec: true,
        };
        $.qccAjax(this.url, param, function(res) {});
    },
    cart: function(data, callback) {
        var be = this;
        if (!data) {
            return;
        }
        var quantityNum = 0;
        var items = JSON.parse(data.specData);
        var ProductBehaviors = new Array();
        items.map(function(a) {
            quantityNum += parseInt(a.Quantity);
        });
        ProductBehaviors.push({
            ProductId: data.ProductId,
            BhvType: 7,
            TraceInfo: "",
            BhvValue: quantityNum + "," + items[0].price,
        });
        var param = {
            SceneId: "-102",
            ProductBehaviors: ProductBehaviors,
            IsAiRec: false,
        };
        if (window.pageParam) {
            if (pageParam.TraceInfo) {
                param.IsAiRec = true;
                param.ProductBehaviors.map(function(a) {
                    a.TraceInfo = pageParam.TraceInfo;
                });
                param.SceneId = "qccuserthink";
            }
        }
        $.qccAjax(this.url, param, function(res) {
            if (callback) {
                callback();
            }
        });
    },
    CreateBehaviorInfo: function(callback) {
        var be = this;
        $("body").on("click", "a", function() {
            var that = $(this);
            var hrefs = that.attr("href");
            if (hrefs) {
                if (hrefs.includes("wpa.qq.com")) {
                    var data1 = that.closest(".dataModule").attr("datamoduletype");
                    var data2 = that.closest(".dataModule").attr("datamoduleid");
                    var param = new Object();
                    param.bhvType = 0;
                    param.bhvValue = be.GetRequestData(hrefs).uin;
                    param.websiteId = websiteId;
                    param.channelPageId = channelpageId;
                    param.dataModule = data1 + "-" + data2;
                    if (pageParam.productId) {
                        param.productId = pageParam.productId;
                    }
                    param.supplierId = pageParam.suppliereId;
                    param.shopId = pageParam.shopId;
                    param.GuestId = pageParam.GuestId;
                    $.qccAjax("/api/services/app/StatisticsFactory/CreateBehaviorInfo", param, function(res) {
                        if (callback) {
                            callback();
                        }
                    });
                }
            }
        });
    },
    getItemId: function(url) {
        var match = url.match(/\/item\/(\d+)\.html/);
        return match ? match[1] : null;
    },
    getShopId: function(url) {
        try {
            var hostname = new URL(url).hostname;
            var match = hostname.match(/shop(\d+)/);
            return match ? match[1] : null;
        } catch (e) {
            return null;
        }
    },
    AdvertClick: function() {
        $("body").on("click", "a", function() {
            var that = $(this);
            var hrefs = that.attr("href");
            var moduletype = that.closest(".dataModule").attr("datamoduletype");
            var datamoduleid = that.closest(".dataModule").attr("datamoduleid");
            var weight = that.attr("datasort");
            if (moduletype != 3) {
                return;
            }
            var param = new Object();
            param.AdvertClicks = [{
                AdUrl: hrefs,
                ZoneId: Number(datamoduleid),
                Weight: Number(weight || 0),
            }, ];
            param.ChannelPageId = channelpageId;
            $.qccAjax("/api/services/app/ClickFactory/AdvertClick", param, function(res) {});
        });
    },
    ProductClick: function() {
        var be = this;
        $("body").on("click", "a", function() {
            var query = be.GetRequest();
            var keyword = "";
            if (query && query.keyword) {
                keyword = query.keyword;
            }
            var that = $(this);
            var hrefs = that.attr("href");
            if (!hrefs) {
                return;
            }
            if (!hrefs.includes("17qcc.com/item/")) {
                return;
            }
            var moduletype = that.closest(".dataModule").attr("datamoduletype");
            var datamoduleid = that.closest(".dataModule").attr("datamoduleid");
            var datasort = that.attr("datasort");
            var id = be.getItemId(hrefs);
            var ShowType = moduletype == 3 ? 2 : moduletype == 2 ? 1 : moduletype == 1 ? 1 : 0;
            var param = {
                ProductClicks: [{
                    ProductId: id,
                    ShowType: ShowType,
                    CustomId: datamoduleid,
                    Weight: datasort || 0,
                }, ],
                ChannelPageId: channelpageId,
                Keyword: keyword,
            };
            $.qccAjax("/api/services/app/ClickFactory/ProductClick", param, function(res) {});
        });
    },
    AdvertExpose: function() {
        var that = this;
        var scrollTop = 0;
        var iscroll = false;
        var runTime = null;
        var openTime = 0;
        that.setAdvertExpose(openTime);
        $(window).scroll(function() {
            var scrollNow = $(document).scrollTop();
            if (iscroll) {
                return;
            }
            if (Math.abs(scrollNow - scrollTop) > 20) {
                scrollTop = scrollNow;
            }
            iscroll = true;
            setTimeout(function() {
                if (openTime >= 3) {
                    that.setAdvertExpose(openTime);
                }
                openTime = 0;
                iscroll = false;
                setTimeout(function() {
                    clearInterval(runTime);
                    runTime = setInterval(function() {
                        openTime = openTime + 1;
                    }, 1000);
                }, 500);
            }, 500);
        });
    },
    setAdvertExpose: function() {
        var be = this;
        var top = $(document).scrollTop();
        var bottom = top + window.innerHeight;
        var a = $(".dataModule").find("a:visible");
        var items = new Array();
        a.each(function(index, data) {
            var hrefs = $(data).attr("href");
            var dw = $(data).closest(".dataModule").width();
            var dl = $(data).closest(".dataModule").offset().left;
            var itemLeft = $(data).offset().left;
            var data1 = $(data).closest(".dataModule").attr("datamoduletype");
            var data2 = $(data).closest(".dataModule").attr("datamoduleid");
            if (data1 != "3") {
                return;
            }
            if (itemLeft >= dl + dw || itemLeft < dl) {
                return;
            }
            if (!hrefs) {
                return;
            }
            var thisTop = $(data).offset().top;
            if (thisTop > top && thisTop < bottom) {
                var data2 = $(data).closest(".dataModule").attr("datamoduleid");
                var weight = $(data).attr("datasort");
                items.push({
                    AdUrl: hrefs,
                    ZoneId: data2,
                    Weight: weight ? weight : 0,
                });
            }
        });
        if (items.length < 1) {
            return;
        }
        var param = {
            AdvertExposes: items,
            ChannelPageId: channelpageId,
        };
        $.qccAjax("/api/services/app/ExposeFactory/AdvertExpose", param, function(res) {});
    },
    slideAdvertExpose: function() {
        var that = this;
        var aList = [];
        var items = new Array();
        var top = $(document).scrollTop();
        $('.dataModule[dataModuleType="3"]').each(function() {
            var module = $(this);
            var matched = false;
            module.find("*").each(function() {
                var style = $(this).attr("style");
                if (!style) {
                    return;
                }
                if (style.indexOf("width") >= 0 && style.indexOf("left") >= 0) {
                    matched = true;
                    return false;
                }
            });
            if (matched) {
                module.find("a").each(function() {
                    aList.push(this);
                });
            }
        });
        for (var i = 0; i < aList.length; i++) {
            var data = aList[i];
            var hrefs = $(data).attr("href");
            var dw = $(data).closest(".dataModule").width();
            var dl = $(data).closest(".dataModule").offset().left;
            var itemLeft = $(data).offset().left;
            if (itemLeft >= dl + dw || itemLeft < dl) {
                continue;
            }
            if (!hrefs) {
                continue;
            }
            var thisTop = $(data).offset().top;
            var bottom = top + window.innerHeight;
            if (thisTop > top && thisTop < bottom) {
                var data2 = $(data).closest(".dataModule").attr("datamoduleid");
                var weight = $(data).attr("datasort");
                items.push({
                    AdUrl: hrefs,
                    ZoneId: data2,
                    Weight: weight ? weight : 0,
                });
            }
        }
        var param = {
            AdvertExposes: items,
            ChannelPageId: channelpageId,
        };
        if (items.length <= 0) {
            setTimeout(function() {
                that.slideAdvertExpose();
            }, 4000);
            return;
        }
        console.log(param);
        $.qccAjax("/api/services/app/ExposeFactory/AdvertExpose", param, function(res) {});
        setTimeout(function() {
            that.slideAdvertExpose();
        }, 4000);
    },
    ShopClick: function() {
        var be = this;
        $("body").on("click", "a", function() {
            var that = $(this);
            var hrefs = that.attr("href");
            if (!hrefs) {
                return;
            }
            if (!hrefs.includes("shop")) {
                return;
            }
            var moduletype = that.closest(".dataModule").attr("datamoduletype");
            var datamoduleid = that.closest(".dataModule").attr("datamoduleid");
            var datasort = that.attr("datasort");
            var id = be.getShopId(hrefs);
            var ShowType = moduletype == 3 ? 2 : moduletype == 2 ? 1 : moduletype == 1 ? 1 : 0;
            var param = {
                ShopClicks: [{
                    ShopId: id,
                    ShowType: ShowType,
                    CustomId: datamoduleid,
                    Weight: datasort || 0,
                }, ],
                ChannelPageId: channelpageId,
            };
            $.qccAjax("/api/services/app/ClickFactory/ShopClick", param, function(res) {});
        });
    },
    exposeTabProduct: function() {
        var be = this;
        var item = $("#pcon1").find('.dataModule[dataModuleType="1"]:visible');
        var aItem = $(item).find("a:visible");
        aItem = aItem.filter(function() {
            var href = $(this).attr("href");
            return href && href.indexOf("/item/") >= 0;
        });
        var hrefObj = {};
        var uniqueAItem = $();
        aItem.each(function() {
            var href = $(this).attr("href");
            if (hrefObj[href]) {
                return;
            }
            hrefObj[href] = true;
            uniqueAItem = uniqueAItem.add(this);
        });
        var items = new Array();
        var shipGetRequest = this.GetRequest();
        var domorigin = window.location.origin;
        var domorigin2 = "https://www.17qcc.com";
        domorigin = "http://test.www.17qcc.com";
        var top = $(document).scrollTop();
        var bottom = top + window.innerHeight;
        uniqueAItem.each(function(index, data) {
            var item = new Object();
            var hrefs = $(data).attr("href");
            if (hrefs) {
                if (hrefs.includes(domorigin + "/item/") || hrefs.includes(domorigin2 + "/item/")) {
                    var data1 = $(data).closest(".dataModule").attr("datamoduletype");
                    if (!data1) {
                        return;
                    }
                    var data2 = $(data).closest(".dataModule").attr("datamoduleid");
                    if (!data2) {
                        return;
                    }
                    hrefs = hrefs.replace(domorigin + "/item/", "");
                    hrefs = hrefs.replace(domorigin2 + "/item/", "");
                    var thisTop = $(data).offset().top;
                    if (thisTop > top && thisTop < bottom) {
                        item.id = hrefs.split(".")[0];
                        item.Weight = $(data).attr("datasort") ? $(data).attr("datasort") : 0;
                        item.datamoduletype = data1;
                        item.datamoduleid = data2;
                        item.showtype = $(data).attr("showtype") > 0 ? $(data).attr("showtype") : 0;
                        if (typeof pageParam != "undefined" && pageParam.SupplierShopMode == 1) {
                            if ($(data).closest("ul").attr("id") == "rankProducts") {
                                item.showtype = 100;
                            }
                        }
                        items.push(item);
                    }
                }
            }
        });
        for (var i = 0; i < items.length; i++) {
            for (var j = items.length - 1; j > 0; j--) {
                if (items[i].id == items[j].id && i != j) {
                    items.splice(j, 1);
                }
            }
        }
        var query = be.GetRequest();
        var keyword = "";
        if (query && query.keyword) {
            keyword = query.keyword;
        }
        var shipParam = {
            productExposes: [],
            channelPageId: channelpageId,
            Keyword: keyword,
        };
        var productExposes = new Array();
        items.map(function(res) {
            if (isNaN(parseInt(res.id))) {
                return;
            }
            productExposes.push({
                productId: parseInt(res.id),
                showType: res.datamoduletype == 3 ? 2 : res.datamoduletype == 2 ? 1 : res.datamoduletype == 1 ? 1 : 0,
                Weight: res.Weight ? parseInt(res.Weight) : 0,
                CustomId: res.datamoduleid ? parseInt(res.datamoduleid) : "",
            });
        });
        if (items.length < 1) {
            return;
        }
        shipParam.productExposes = productExposes;
        $.qccAjax(this.shipExposeUrl, shipParam, function(res) {});
    },
    expose: function() {
        setTimeout(function() {
            being_recommend.productExposes();
            being_recommend.exposeShipStore();
            being_recommend.AdvertExpose();
        }, 2000);
        setTimeout(function() {
            being_recommend.slideAdvertExpose();
        }, 4200);
    },
};
$(function() {
    being_recommend.click();
    being_recommend.CreateBehaviorInfo();
    being_recommend.ProductClick();
    being_recommend.ShopClick();
    being_recommend.AdvertClick();
});
