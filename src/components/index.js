import Container from './container';
import LoadingBar from './loading-bar';


const components = {
  Container,
  LoadingBar,
};

export default {
  install(Vue, options = {}) { // eslint-disable-line no-unused-vars
    // register all components
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });

    Vue.prototype.$Loading = LoadingBar; // eslint-disable-line no-param-reassign
  },
};
