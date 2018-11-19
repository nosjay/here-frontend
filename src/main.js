import Vue from 'vue';
import { VUE_PRODUCTION_TIPS } from './configs';
import directives from './directives';
import router from './services/router';
import inject from './plugins/inject';
import store from './services/store';
import App from './App.vue';
import Components from './components';
import './styles/style.scss';
import './services/event';


// directives register
Object.keys(directives).forEach((name) => {
  Vue.directive(name, directives[name]);
});

// disable production tips
Vue.config.productionTip = VUE_PRODUCTION_TIPS;

// inject services/components to Vue prototype
Vue.use(inject);
Vue.use(Components);

// create root instance for Vue
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
