/* eslint-disable no-unused-vars */
import { GLOBAL_VARIABLES } from '../configs';
import { provider } from '../services/axios';


GLOBAL_VARIABLES.$Provider = provider;

export default {
  /**
   * @param {object} Vue
   * @param {object} options
   */
  install: (Vue, options) => {
    Vue.prototype.$Provider = provider;
  },
};
