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

// page error event
GLOBAL_VARIABLES.$Bus.$on('page.error', () => {
  GLOBAL_VARIABLES.$Loading.error();
});

// error dialog
GLOBAL_VARIABLES.$Bus.$on('dialog.error', (error) => {
  // eslint-disable-next-line
  console.log(error);
});
