import Aside from './aside';
import Footer from './footer';
import Header from './header';
import Layout from './layout';
import LoadingBar from './loading-bar';
import Main from './main';


const components = {
  Aside,
  Footer,
  Header,
  Layout,
  LoadingBar,
  Main,
};

export default {
  install(Vue, options = {}) { // eslint-disable-line no-unused-vars
    // register all components
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });

    GLOBAL.$Loading = LoadingBar;
    Vue.prototype.$Loading = LoadingBar; // eslint-disable-line no-param-reassign
  },
};
