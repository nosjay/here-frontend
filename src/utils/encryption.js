import { JSEncrypt } from 'jsencrypt';


const wordWrap = (text, size) => {
  const chunks = [];
  text.split('').forEach((char, index) => {
    if (index % size === 0) {
      chunks.push('');
    }
    chunks[chunks.length - 1] += char;
  });
  return chunks;
};


export default class Encryption {
  constructor(key) {
    this.key = `-----BEGIN PUBLIC KEY-----\n${wordWrap(key, 64).join('\n')}\n-----END PUBLIC KEY-----`;

    this.encryption = new JSEncrypt();
    this.encryption.setPublicKey(this.key);
  }

  encrypt(data) {
    return this.encryption.encrypt(data);
  }
}
