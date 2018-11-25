/* eslint-disable no-unused-vars */
import { GLOBAL_VARIABLES } from '../configs';
import { provider } from '../services/axios';

/**
 * @type {ActionCollection}
 */
GLOBAL_VARIABLES.$Provider = provider;

export default {
  /**
   * @param {object} Vue
   * @param {object} options
   */
  install: (Vue, options) => {
    /**
     * @type {ActionCollection}
     */
    Vue.prototype.$Provider = provider;
    Vue.prototype.$Bus = GLOBAL_VARIABLES.$Bus;
  },
};
