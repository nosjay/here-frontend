import Aside from './Aside';
import Col from './Col';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';
import LoadingBar from './LoadingBar';
import Main from './Main';
import Row from './Row';


const components = {
  Aside,
  Col,
  Footer,
  Header,
  Layout,
  LoadingBar,
  Main,
  Row,
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
