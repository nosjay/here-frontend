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

  /**
   * @param {*|null} defaultValue
   * @param {boolean} raiseError
   * @return {Promise<ResponseGetter>}
   */
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

  /**
   * @param {string} paths
   * @param {*|null} defaultValue
   * @return {*|null}
   */
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

  /**
   * @param {object} response
   * @return {ResponseGetter}
   */
  setResponse(response) {
    this.response = response;
    return this;
  }

  /**
   * @param {object} error
   * @return {ResponseGetter}
   */
  setError(error) {
    this.error = error;
    return this;
  }
}


class ActionProvider {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * @return {Promise<ResponseGetter>}
   */
  init() {
    return this.request('get', '/init');
  }

  /**
   * @param {string} title
   * @param {string} description
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @return {Promise<ResponseGetter>}
   */
  blogger({
    title, description, email, username, password,
  }) {
    const encryption = new Encryption(GLOBAL_VARIABLES.$Store.state.security.publicKey);
    return this.request('put', '/blogger', encryption.encryptWithAutoSplit(JSON.stringify({
      title, description, email, username, password,
    })));
  }

  /**
   * @param {string} method
   * @param {*} args
   * @return {Promise<ResponseGetter>}
   */
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

// eslint-disable-next-line import/prefer-default-export
export const provider = new ActionProvider(instance);
