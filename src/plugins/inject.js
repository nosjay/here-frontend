import provider from '../services/axios';


GLOBAL.provider = provider;

export default {
  // eslint-disable-next-line
  install: (Vue, options) => {
    // eslint-disable-next-line
    Vue.prototype.$provider = provider;
  },
};
