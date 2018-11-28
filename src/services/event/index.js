// event bus for global/common components
import Vue from 'vue';
import { GLOBAL_VARIABLES } from '../../configs';


// global event bus
GLOBAL_VARIABLES.$Bus = new Vue();

// page start loading event
GLOBAL_VARIABLES.$Bus.$on('page.loading', () => {
  GLOBAL_VARIABLES.$Loading.start();
});

// page ready event
GLOBAL_VARIABLES.$Bus.$on('page.ready', () => {
  GLOBAL_VARIABLES.$Loading.finish();
});

// global dialog
GLOBAL_VARIABLES.$Bus.$on('global.dialog', ({ type, message }) => {
  GLOBAL_VARIABLES.$Message.message(type, message);
});
