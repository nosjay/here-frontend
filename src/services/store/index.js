import Vue from 'vue';
import Vuex from 'vuex';
import { DEFAULT_VUEX_CONFIG } from '../../configs';


Vue.use(Vuex);

export default new Vuex.Store({
  ...DEFAULT_VUEX_CONFIG,
});
