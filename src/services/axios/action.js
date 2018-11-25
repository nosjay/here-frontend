import ResponseGetter from './response';
import Encryption from '../../utils/encryption';
import { GLOBAL_VARIABLES } from '../../configs';
import {
  APPLICATION_INIT_METHOD, APPLICATION_INIT_API,
  APPLICATION_AUTHOR_REGISTER_METHOD, APPLICATION_AUTHOR_REGISTER_API,
} from '../../configs/api';


export default class ActionCollection {
  /**
   * @param {AxiosInstance} axios
   */
  constructor(axios) {
    /**
     * @private
     * @type {AxiosInstance}
     */
    this.axios = axios;
    /**
     * @private
     * @type {object}
     */
    this.methods = Object.create(null);
  }

  /**
   * @public
   * @return {Promise<ResponseGetter>}
   */
  init() {
    return this.request(APPLICATION_INIT_METHOD, APPLICATION_INIT_API);
  }

  /**
   * @public
   * @param {object} author
   * @return {Promise<ResponseGetter>}
   */
  author(author) {
    return this.requestWithSecurity(
      APPLICATION_AUTHOR_REGISTER_METHOD,
      APPLICATION_AUTHOR_REGISTER_API, author,
    );
  }

  /**
   * @private
   * @param {string} method
   * @param {*} args
   * @return {Promise<ResponseGetter>}
   */
  request(method, ...args) {
    return this.axios[method](...args)
      .then(({ data, extra }) => (new ResponseGetter(data, extra).promisify()))
      .catch(error => (new ResponseGetter(null, null).setError(error).promisify()));
  }

  /**
   * @private
   * @param {string} method
   * @param {string} api
   * @param {string|object} data
   * @return {Promise<ResponseGetter>}
   */
  requestWithSecurity(method, api, data) {
    let stringParam = data;
    if (typeof data === 'object') {
      stringParam = JSON.stringify(data);
    }

    const encryption = new Encryption(GLOBAL_VARIABLES.$Store.state.security.publicKey);
    return this.request(method, api, encryption.encryptWithAutoSplit(stringParam));
  }
}
