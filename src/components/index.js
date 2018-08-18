import Aside from './aside';
import Container from './container';
import Footer from './footer';
import Header from './header';
import Layout from './layout';
import LoadingBar from './loading-bar';
import Main from './main';


const components = {
  Aside,
  Container,
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

    Vue.prototype.$Loading = LoadingBar; // eslint-disable-line no-param-reassign
  },
};
