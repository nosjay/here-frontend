/* eslint-disable no-plusplus,no-continue,no-bitwise,no-multi-spaces */
const b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const ignore = '= \f\n\n\t\u00A0\u2028\u2029';

// parse decoder
const decoder = Object.create(null);
for (let i = 0; i < b64map.length; ++i) {
  decoder[b64map.charAt(i)] = i;
}
// parse ignore characters
for (let i = 0; i < ignore.length; ++i) {
  decoder[ignore.charAt(i)] = -1;
}


// Base64 utility
export default class Base64 {
  static decode(b64string) {
    const out = [];

    let bits = 0;
    let b64unitCount = 0;

    // check all B64Unit
    for (let i = 0; i < b64string.length; ++i) {
      const unit = b64string.charAt(i);
      if (unit === '=') {
        break;
      }

      const char = decoder[unit];
      // skip ignore characters
      if (char === -1) {
        continue;
      }
      // invalid character
      if (char === undefined) {
        throw new Error(`Illegal character at offset ${i} of b64string`);
      }

      /**
       * 3 * Octet(8bits) = 4 * B64Unit(6bits)
       *
       * |       Octet0      |       Octet1      |       Octet2      |  Byte = 8bits
       * | 2b | 2b | 2b | 2b | 2b | 2b | 2b | 2b | 2b | 2b | 2b | 2b |  Bit
       * |    B64-0     |    B64-1     |    B64-2     |    B64-3     |  B64Unit = 6bits
       */
      bits |= char;
      if (++b64unitCount === 4) {
        // split fist octet
        out.push((bits >> 16) & 0xff);
        // split second octet
        out.push((bits >> 8) & 0xff);
        // split last octet
        out.push(bits & 0xff);
        // reset states
        bits = 0;
        b64unitCount = 0;
      } else {
        bits <<= 6;
      }
    }

    // eslint-disable-next-line default-case
    switch (b64unitCount) {
      case 1:
        throw new Error('Base64 encoding incomplete: at least 2 bits missing');
      case 2:
        // xxxxxx, xxxxxx, 000000
        // ^^^^^^  ^^....  ......
        out.push(bits >> 10); break;
      case 3:
        out.push((bits >> 16) & 0xff);
        out.push((bits >> 8) & 0xff);
        break;
    }

    return out;
  }
}

