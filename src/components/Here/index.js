import LoadingBar from './LoadingBar';


const components = {
  LoadingBar,
};

export default {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });

    Vue.prototype.$Loading = LoadingBar;
  },
};
