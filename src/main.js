import Vue from 'vue';
import { VUE_PRODUCTION_TIPS, USE_I_MISS_YOU } from './configs';
import directives from './directives';
import router from './services/router';
import inject from './plugins/inject';
import store from './services/store';
import App from './App.vue';
import IMissYou from './utils/IMissYou';
import './static/styles/global.scss';

// event bus for global/common components
GLOBAL.bus = new Vue();

// directives register
Object.keys(directives).forEach((name) => {
  Vue.directive(name, directives[name]);
});

// disable production tips
Vue.config.productionTip = VUE_PRODUCTION_TIPS;
Vue.use(inject);

// I miss you
if (USE_I_MISS_YOU) {
  (new IMissYou('I Miss You (´∀｀)♡', true, 'iMissYou.ico'))
    .theGreatestHappinessWasToMeetYou();
}

// create root instance for Vue
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
