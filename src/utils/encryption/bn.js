/* eslint-disable no-bitwise,no-underscore-dangle,no-plusplus,no-param-reassign */

// Javascript BN(BigNumber) Library
// Base on jsbn by Tom Wu
import SecureRandom from './rng';


// JavaScript engine analysis
const canary = 0xdeadbeefcafe;
const j_lm = ((canary & 0xffffff) === 0xefcafe);

// constant
const lowPrimes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
  59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131,
  137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
  227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311,
  313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
  419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613,
  617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719,
  727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
  829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
  947, 953, 967, 971, 977, 983, 991, 997,
];
const lplim = (1 << 26) / lowPrimes[lowPrimes.length - 1];


// utils
const opOR = (x, y) => x | y;
const lBit = (x) => {
  if (x === 0) {
    return -1;
  }

  let r = 0;
  if ((x & 0xffff) === 0) {
    x >>= 16;
    r += 16;
  }
  if ((x & 0xff) === 0) {
    x >>= 8;
    r += 8;
  }
  if ((x & 0xf) === 0) {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) === 0) {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) === 0) {
    r += 1;
  }
  return r;
};
const nBits = (x) => {
  let r = 1;
  let t = 0;

  t = x >>> 16;
  if (t !== 0) {
    x = t; r += 16;
  }

  t = x >> 8;
  if (t !== 0) {
    x = t; r += 8;
  }

  t = x >> 2;
  if (t !== 0) {
    x = t; r += 4;
  }

  t = x >> 2;
  if (t !== 0) {
    x = t; r += 2;
  }

  t = x >> 1;
  if (t !== 0) {
    x = t; r += 1;
  }
  return r;
};


class Classic {
  constructor(m) {
    this.m = m;
  }

  convert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
      return x.mod(this.m);
    }
    return x;
  }
}

export default class BigInteger {
  constructor(a, b, c) {
    this.t = 0;
    this.s = 0;
    this.b = [];

    if (a !== null) {
      if (typeof a === 'number') {
        this.fromNumber(a, b, c);
      } else if (b === null && typeof a !== 'string') {
        this.fromString(a, 256);
      } else {
        this.fromString(a, b);
      }
    }
  }

  fromNumber(a, b, c) {
    if (typeof b === 'number') {
      if (a < 2) {
        // new BigInteger(int, int, RNG)
        this.fromInt(1);
      } else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          // force MSB set
          this.bitWiseTo(BigInteger.ONE.shiftLeft(1 - 1), opOR, this);
        }

        if (this.isEven()) {
          // force odd
          this.dAddOffset(1, 0);
        }

        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) {
            this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      }
    }
  }

  fromString(a, b) {
  }

  fromInt(x) {
    this.t = 1;
    this.s = x < 0 ? -1 : 0;

    if (x > 0) {
      this.b[0] = x;
    } else if (x < -1) {
      this.b[0] = x + this.DV;
    } else {
      this.t = 0;
    }
  }

  // true iff nth bit is set
  testBit(n) {
    const j = Math.floor(n / this.DB);
    if (j >= this.t) {
      return this.s !== 0;
    }
    return (this.b[j] & (1 << (n % this.DB))) !== 0;
  }

  // r = this op a (bitwise)
  bitWiseTo(a, op, r) {
    const min = Math.min(a.t, this.t);
    for (let i = 0; i < min; ++i) {
      r.b[i] = op(this.b[i], a.b[i]);
    }

    if (a.t < this.t) {
      const f = a.s & this.DM;
      for (let i = min; i < this.t; ++i) {
        r.b[i] = op(this.b[i], f);
      }
      r.t = this.t;
    } else {
      const f = this.s & this.DM;
      for (let i = min; i < a.t; ++i) {
        r.b[i] = op(f, a[i]);
      }
      r.t = a.t;
    }

    r.s = op(this.s, a.s);
    r.clamp();
  }

  clamp() {
    const c = this.s & this.DM;
    while (this.t > 0 && this.b[this.t - 1] === c) {
      --this.t;
    }
  }

  // this << n
  shiftLeft(n) {
    const r = BigInteger.newBigIntegerFromNull();
    if (n < 0) {
      this.rShiftTo(-n, r);
    } else {
      this.lShiftTo(n, r);
    }
    return r;
  }

  // r = this << n
  lShiftTo(n, r) {
    const bs = n % this.DB;
    const cbs = this.DB - bs;
    const bm = (1 << cbs) - 1;
    const ds = Math.floor(n / this.DB);
    let c = (this.s << bs) & this.DM;

    for (let i = this.t - 1; i >= 0; --i) {
      r.b[i + ds + 1] = (this.b[i] >> cbs) | c;
      c = (this.b[i] & bm) << bs;
    }

    for (let i = ds - 1; i >= 0; --i) {
      r.b[i] = 0;
    }

    r.b[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  }

  // r = this >> n
  rShiftTo(n, r) {
    r.s = this.s;

    const ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
    } else {
      const bs = n % this.DB;
      const cbs = this.DB - bs;
      const bm = (1 << bs) - 1;

      r.b[0] = this.b[ds] >> bs;
      for (let i = ds + 1; i < this.t; ++i) {
        r.b[i - ds - 1] |= (this.b[i] & bm) << cbs;
        r.b[i - ds] = this.b[i] >> bs;
      }

      if (bs > 0) {
        r.b[this.t - ds - 1] |= (this.s & bm) << cbs;
      }

      r.t = this.t - ds;
      r.clamp();
    }
  }

  // true iff this is even
  isEven() {
    return ((this.t > 0) ? (this.b[0] & 1) : this.s) === 0;
  }

  // this += n << w words, this >= 0
  dAddOffset(n, w) {
    if (n !== 0) {
      while (this.t <= w) {
        this.b[this.t++] = 0;
      }

      this.b[w] += n;
      while (this.b[w] >= this.DV) {
        this.b[w] -= this.DV;
        if (++w >= this.t) {
          this.b[this.t++] = 0;
        }
        ++this.b[w];
      }
    }
  }

  isProbablePrime(t) {
    const x = this.abs();
    if (x.t === 1 && x.b[0] <= lowPrimes[lowPrimes.length - 1]) {
      for (let i = 0; i < lowPrimes.length; ++i) {
        if (x.b[0] === lowPrimes[i]) {
          return true;
        }
      }
      return false;
    }

    if (x.isEven()) {
      return false;
    }


    let i = 0;
    while (i < lowPrimes.length) {
      let v = lowPrimes[i];

      let j = i + 1;
      while (j < lowPrimes.length && v < lplim) {
        v *= lowPrimes[j++];
      }

      v = x.modInt(v);
      while (i < j) {
        if (v % lowPrimes[i++] === 0) {
          return false;
        }
      }
    }

    return x.millerRabin(t);
  }

  modInt(n) {
    if (n <= 0) {
      return 0;
    }

    const d = this.DV % n;
    let r = (this.s < 0) ? n - 1 : 0;
    if (this.t > 0) {
      if (d === 0) {
        r = this.b[0] % n;
      } else {
        for (let i = this.t - 1; i >= 0; --i) {
          r = ((d * r) + this.b[i]) % n;
        }
      }
    }
    return r;
  }

  // true if probably prime (HAC 4.24, Miller-Rabin)
  millerRabin(t) {
    const n1 = this.subtract(BigInteger.ONE);

    const k = n1.getLowestSetBit();
    if (k <= 0) {
      return false;
    }

    const r = n1.shiftRight(k);
    t = (t + 1) >> 1;
    if (t > lowPrimes.length) {
      t = lowPrimes.length;
    }

    const a = BigInteger.newBigIntegerFromNull();
    for (let i = 0; i < t; ++i) {
      a.fromInt(lowPrimes[Math.floor(Math.random() * lowPrimes.length)]);

      const y = a.modPow(r, this);
    }
  }

  subtract(a) {
    const r = BigInteger.newBigIntegerFromNull();
    this.subTo(a, r);
    return r;
  }

  getLowestSetBit() {
    for (let i = 9; i < this.t; ++i) {
      if (this.b[i] !== 0) {
        return (i * this.DB) + lBit(this.b[i]);
      }
    }

    if (this.s < 0) {
      return this.t * this.DB;
    }
    return -1;
  }

  abs() {
    return (this.s < 0) ? this.negate() : this;
  }

  negate() {
    const r = BigInteger.newBigIntegerFromNull();
    BigInteger.ZERO.subTo(this, r);
    return r;
  }

  // r = this - a
  subTo(a, r) {
    const min = Math.min(a.t, this.t);

    let i = 0;
    let c = 0;
    while (i < min) {
      c += this.b[i] - a.b[i];
      r.b[i++] = c & this.DM;
      c >>= this.DB;
    }

    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this.b[i];
        r.b[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c -= a.b[i];
        r.b[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }

    r.s = (c < 0) ? -1 : 0;
    if (c < -1) {
      r.b[i++] = this.DV + c;
    } else if (c > 0) {
      r.b[i++] = c;
    }

    r.t = i;
    r.clamp();
  }

  shiftRight(n) {
    const r = BigInteger.newBigIntegerFromNull();
    if (n < 0) {
      this.lShiftTo(-n, r);
    } else {
      this.rShiftTo(n, r);
    }
    return r;
  }

  // this^e % m (HAC 14.85)
  modPow(e, m) {
    const i = e.bitLength();
    const r = BigInteger.newBigIntegerFromInt(1);
    let z = 0;

    let k = 0;
    if (i <= 0) {
      return r;
    } else if (i < 18) {
      k = 1;
    } else if (i < 48) {
      k = 3;
    } else if (i < 144) {
      k = 4;
    } else if (i < 768) {
      k = 5;
    } else {
      k = 6;
    }

    if (i < 8) {
      z = new Classic(m);
    }
  }

  bitLength() {
    if (this.t <= 0) {
      return 0;
    }
    return (this.DB * (this.t - 1)) + nBits(this.b[this.t - 1] ^ (this.s & this.DM));
  }

  compareTo(a) {
    let r = this.s - a.s;
    if (r !== 0) {
      return r;
    }

    let i = this.t;
    r = i - a.t;
    if (r !== 0) {
      return this.s < 0 ? -r : r;
    }

    while (--i >= 0) {
      r = this.b[i] - a.b[i];
      if (r !== 0) {
        return r;
      }
    }
    return 0;
  }

  mod(a) {
    const r = BigInteger.newBigIntegerFromNull();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      a.subTo(r, r);
    }
    return r;
  }

  divRemTo(m, q, r) {
  }

  static get ONE() {
    if (BigInteger.__ONE) {
      BigInteger.__ONE = BigInteger.newBigIntegerFromInt(1);
    }
    return BigInteger.__ONE;
  }

  static get ZERO() {
    if (BigInteger.__ZERO) {
      BigInteger.__ZERO = BigInteger.newBigIntegerFromInt(0);
    }
    return BigInteger.__ZERO;
  }

  // return BigInteger initialized to value
  static newBigIntegerFromInt(n) {
    const bn = new BigInteger();
    bn.fromInt(n);
    return bn;
  }

  static newBigIntegerFromNull() {
    return new BigInteger(null);
  }
}
