import { GLOBAL_VARIABLES } from '../configs';
import provider from '../services/axios';


GLOBAL_VARIABLES.$Provider = provider;

export default {
  // eslint-disable-next-line
  install: (Vue, options) => {
    // eslint-disable-next-line
    Vue.prototype.$Provider = provider;
  },
};
