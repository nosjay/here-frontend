import { GLOBAL_VARIABLES } from '../configs';

import Aside from './Aside';
import Button from './Button';
import Col from './Col';
import Divider from './Divider';
import Footer from './Footer';
import Form from './Form';
import FormItem from './FormItem';
import Header from './Header';
import Input from './Input';
import Layout from './Layout';
import Loading from './Loading';
import LoadingBar from './LoadingBar';
import Main from './Main';
import Message from './Message';
import Row from './Row';
import Step from './Step';
import Steps from './Steps';


const components = {
  Aside,
  Button,
  Col,
  Divider,
  Footer,
  Form,
  FormItem,
  Header,
  Input,
  Layout,
  Loading,
  LoadingBar,
  Main,
  Message,
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

    GLOBAL_VARIABLES.$Loading = LoadingBar;
    Vue.prototype.$Loading = LoadingBar; // eslint-disable-line no-param-reassign
    Vue.prototype.$Message = Message;
  },
};
