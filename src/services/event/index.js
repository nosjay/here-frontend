// event bus for global/common components
import Vue from 'vue';
import { GLOBAL_VARIABLES } from '../../configs';


// global event bus
GLOBAL_VARIABLES.$Bus = new Vue();

// noinspection JSUnusedGlobalSymbols
const callbacks = {
  /**
   * start loadingBar
   */
  pageLoading() {
    GLOBAL_VARIABLES.$Loading.start();
  },
  /**
   * finish loadingBar
   */
  pageReady() {
    GLOBAL_VARIABLES.$Loading.finish();
  },
  /**
   * @param {string} type
   * @param {string} message
   */
  dialog({ type, message }) {
    GLOBAL_VARIABLES.$Message.message(type, message);
  },
};

// register callbacks
Object.keys(callbacks).forEach((name) => {
  GLOBAL_VARIABLES.$Bus.$on(name.replace(/([A-Z])/g, '.$1').toLowerCase(), callbacks[name]);
});
