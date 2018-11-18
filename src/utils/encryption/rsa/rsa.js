/* eslint-disable no-bitwise,no-plusplus */
import BigInteger from './bn';
import SecureRandom from '../utils/rng';


/**
 * @param {string} text
 * @param {number} length
 * @return {string|BigInteger|null}
 */
const pkcs1pad2 = (text, length) => {
  if (length < text.length + 11) {
    console.error('Message too long for RSA');
    return null;
  }

  let padLength = length;
  const byteArray = [];
  for (let i = text.length - 1; i >= 0 && padLength > 0;) {
    const char = text.charCodeAt(i--);
    if (char < 128) { // encode using utf-8
      byteArray[--padLength] = char;
    } else if (char > 127 && char < 2048) {
      byteArray[--padLength] = (char & 63) | 128;
      byteArray[--padLength] = (char >> 6) | 192;
    } else {
      byteArray[--padLength] = (char & 63) | 128;
      byteArray[--padLength] = ((char >> 6) & 63) | 128;
      byteArray[--padLength] = (char >> 12) | 224;
    }
  }
  byteArray[--padLength] = 0;

  const rng = new SecureRandom();
  while (padLength > 2) { // random non-zero pad
    let randomBytes = rng.nextBytes(1);
    while (randomBytes[0] === 0) {
      randomBytes = rng.nextBytes(1);
    }
    // eslint-disable-next-line prefer-destructuring
    byteArray[--padLength] = randomBytes[0];
  }
  byteArray[--padLength] = 2;
  byteArray[--padLength] = 0;
  return new BigInteger(byteArray);
};

// "empty" RSA key constructor
export default class RSAKey {
  constructor() {
    this.n = null;
    this.e = 0;
  }

  /**
   * @param {string} n
   * @param {string} e
   */
  setPublicKey(n, e) {
    if (n !== null && e !== null && n.length > 0 && e.length > 0) {
      this.n = new BigInteger(n, 16);
      this.e = parseInt(e, 16);
    } else {
      throw new Error('Invalid RSA Public key');
    }
  }

  /**
   * @param {string} text
   * @return {string|null}
   */
  encrypt(text) {
    const padInteger = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
    if (padInteger === null) {
      return null;
    }

    const encrypted = padInteger.modPowInt(this.e, this.n);
    if (encrypted === null) {
      return null;
    }

    const hexString = encrypted.toString(16);
    if ((hexString.length & 1) === 0) {
      return hexString;
    }
    return `0${hexString}`;
  }
}
