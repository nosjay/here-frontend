/* eslint-disable no-plusplus,no-continue,no-bitwise,no-const-assign */
import RSAKey from './rsa';
import Base64 from './base64';
import ASN1 from './asn1/asn1';


// debugger;
// Base64.decode('YQ==');


export default class Encryption {
  constructor(pem) {
    this.publicKey = new RSAKey();
    this.parsePublicKey(pem);
  }

  parsePublicKey(pem) {
    try {
      const der = Base64.decode(pem);
      const asn1 = ASN1.decode(der);

      const bitString = asn1.sub[1];
      const sequence = bitString.sub[0];

      const modulus = sequence.sub[0].getHexStringValue();
      const publicExponent = sequence.sub[1].getHexStringValue();
      this.publicKey.setPublicKey(modulus, publicExponent);
    } catch (e) {
      console.log(e);
    }
  }

  encrypt(text) {
    return this.publicKey.encrypt(text);
  }
}
