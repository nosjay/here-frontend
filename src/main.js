import Vue from 'vue';
import { VUE_PRODUCTION_TIPS } from './configs';
import directives from './directives';
import router from './services/router';
import inject from './plugins/inject';
import store from './services/store';
import App from './App.vue';


// event bus for global/common components
GLOBAL.bus = new Vue();

// directives register
Object.keys(directives).forEach((name) => {
  Vue.directive(name, directives[name]);
});

// disable production tips
Vue.config.productionTip = VUE_PRODUCTION_TIPS;
Vue.use(inject);

// create root instance for Vue
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
