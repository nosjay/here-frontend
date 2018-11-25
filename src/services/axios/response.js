/**
 * ResponseGetter class
 */
export default class ResponseGetter {
  /**
   * @param {object|null} data
   * @param {object|null} extra
   */
  constructor(data = null, extra = null) {
    /**
     * @private
     * @type {Object}
     */
    this.response = data;
    /**
     * @private
     * @type {Object}
     */
    this.extra = extra;
    /**
     * @private
     * @type {*|string}
     */
    this.error = null;
  }

  /**
   * @public
   * @param {string} error
   * @return {ResponseGetter}
   */
  setError(error) {
    this.error = error;
    return this;
  }

  /**
   * @public
   * @return {Promise<ResponseGetter|string>}
   */
  promisify() {
    return new Promise((resolve, reject) => {
      if (this.error) {
        reject(this.error);
      }
      resolve(this);
    });
  }

  /**
   * @param {string} paths
   * @param {*} defaultValue
   * @return {*}
   */
  get(paths, defaultValue = null) {
    return ResponseGetter.getPathsFrom(paths, this.response, defaultValue);
  }

  /**
   * @param {string} paths
   * @param {*} defaultValue
   * @return {*}
   */
  getFromExtra(paths, defaultValue = null) {
    return ResponseGetter.getPathsFrom(paths, this.extra, defaultValue);
  }

  /**
   * @param {string} paths
   * @param {object|null} container
   * @param {*} defaultValue
   */
  static getPathsFrom(paths, container, defaultValue) {
    if (container === null) {
      return defaultValue;
    }

    let value = container;
    paths.split('.').forEach((path) => {
      if (!(path in value)) {
        value = defaultValue;
        return;
      }
      value = value[path];
    });
    return value;
  }
}
