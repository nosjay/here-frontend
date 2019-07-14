import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  VUE_DEV_TOOLS_DEBUG,
  VUE_DEV_TOOLS_PRODUCTION_TIPS,
} from './configs';
import directives from './directives';
import './configs/variables';


Object.keys(directives).forEach((name) => {
  Vue.directive(name, directives[name]);
});

Vue.config.productionTip = VUE_DEV_TOOLS_PRODUCTION_TIPS;
Vue.config.devtools = VUE_DEV_TOOLS_DEBUG;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
