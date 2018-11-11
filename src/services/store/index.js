import Vue from 'vue';
import Vuex from 'vuex';
import { DEFAULT_VUEX_CONFIG, GLOBAL_VARIABLES } from '../../configs';
import modules from './modules';


Vue.use(Vuex);

// noinspection JSValidateTypes
const store = new Vuex.Store({
  ...DEFAULT_VUEX_CONFIG,
  modules,
});

GLOBAL_VARIABLES.$Store = store;
export default store;
