import Aside from './Aside';
import Col from './Col';
import Divider from './Divider';
import Footer from './Footer';
import Form from './Form';
import FormItem from './FormItem';
import Header from './Header';
import Input from './Input';
import Layout from './Layout';
import LoadingBar from './LoadingBar';
import Main from './Main';
import Row from './Row';
import Step from './Step';
import Steps from './Steps';


const components = {
  Aside,
  Col,
  Divider,
  Footer,
  Form,
  FormItem,
  Header,
  Input,
  Layout,
  LoadingBar,
  Main,
  Row,
  Step,
  Steps,
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
