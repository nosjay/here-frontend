import axios from 'axios';
import { DEFAULT_AXIOS_CONFIG, GLOBAL_VARIABLES } from '../../configs';
import {
  onRequestSuccess, onRequestFail,
  onResponseSuccess, onResponseFail,
} from '../../interceptors/axios';
import Encryption from '../../utils/encryption';


const instance = axios.create(DEFAULT_AXIOS_CONFIG);

instance.interceptors.request.use(onRequestSuccess, onRequestFail);
instance.interceptors.response.use(onResponseSuccess, onResponseFail);


class ResponseGetter {
  constructor() {
    this.response = null;
    this.error = null;

    this.defaultValue = null;
    this.raiseError = false;
  }

  config(defaultValue = null, raiseError = false) {
    this.defaultValue = defaultValue;
    this.raiseError = raiseError;

    return new Promise((resolve, reject) => {
      if (this.raiseError && this.error && this.response === null) {
        reject(this.error);
      }

      resolve(this);
    });
  }

  get(paths, defaultValue = this.defaultValue) {
    if (this.response === null) {
      return defaultValue;
    }

    let value = this.response;
    paths.split('.').forEach((index) => {
      if (!(index in value)) {
        value = defaultValue;
        return;
      }
      value = value[index];
    });
    return value;
  }

  setResponse(response) {
    this.response = response;
    return this;
  }

  setError(error) {
    this.error = error;
    return this;
  }
}


class ActionProvider {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  init(force = false) {
    let params = {};
    if (force) {
      params = { ...params, force };
    }

    return this.request('get', '/init', {
      params,
    });
  }

  blogger({
    title, description, email, username, password,
  }) {
    const encryption = new Encryption(GLOBAL_VARIABLES.$Store.state.security.publicKey);
    return this.request('put', '/blogger', encryption.encrypt(JSON.stringify({
      title, description, email, username, password,
    })));
  }

  request(method, ...args) {
    return this.axios[method](...args)
      .then(res => (new ResponseGetter()).setResponse(res))
      .catch((error) => {
        // report error
        GLOBAL_VARIABLES.$Bus.$emit('dialog.error', error);
        return (new ResponseGetter()).setError(error);
      });
  }
}

const provider = new ActionProvider(instance);

export default provider;
