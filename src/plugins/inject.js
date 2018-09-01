import provider from '../services/axios';


GLOBAL.$Provider = provider;

export default {
  // eslint-disable-next-line
  install: (Vue, options) => {
    // eslint-disable-next-line
    Vue.prototype.$Provider = provider;
  },
};
