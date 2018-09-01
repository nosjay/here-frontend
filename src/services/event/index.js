// event bus for global/common components
import Vue from 'vue';


// global event bus
GLOBAL.$Bus = new Vue();

// page start loading event
GLOBAL.$Bus.$on('page.loading', () => {
  GLOBAL.$Loading.start();
});

// page ready event
GLOBAL.$Bus.$on('page.ready', () => {
  GLOBAL.$Loading.finish();
});

// page error event
GLOBAL.$Bus.$on('page.error', () => {
  GLOBAL.$Loading.error();
});
