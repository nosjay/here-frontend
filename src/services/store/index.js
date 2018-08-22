import Vue from 'vue';
import Vuex from 'vuex';
import { DEFAULT_VUEX_CONFIG } from '../../configs';
import modules from './modules';


Vue.use(Vuex);

console.log({
  ...DEFAULT_VUEX_CONFIG,
  ...modules,
});

// noinspection JSCheckFunctionSignatures
export default new Vuex.Store({
  ...DEFAULT_VUEX_CONFIG,
  modules,
});
