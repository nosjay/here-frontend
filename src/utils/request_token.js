/* eslint-disable no-bitwise */
import { currentTimestamp } from './time';
import { AXIOS_DEFAULT_TOKEN, AXIOS_REQUEST_MASK_1, AXIOS_REQUEST_MASK_2 } from '../configs';


export default class RequestSignature {
  constructor() {
    this.context = null;
    this.gf_signer = false;
    this.last_sign_time = null;
  }

  sign() {
    if (this.context === null) {
      this.last_sign_time = currentTimestamp();
      return AXIOS_DEFAULT_TOKEN;
    }
    return `h-00-ff-11223344-${this.getSignerMask()}`;
  }

  getSignerMask() {
    const ts = currentTimestamp();

    let mask = 0xffff;
    if (this.gf_signer) {
      mask &= ((ts - this.last_sign_time) & AXIOS_REQUEST_MASK_2) >> 8;
    } else {
      mask &= ((ts - this.last_sign_time) & AXIOS_REQUEST_MASK_1) >> 8;
    }

    this.last_sign_time = ts;
    return mask;
  }
}
