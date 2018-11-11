import { GLOBAL_VARIABLES } from '../configs';


// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  GLOBAL_VARIABLES.$Bus.$emit('page.loading');

  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) { // eslint-disable-line
  // route completed
  GLOBAL_VARIABLES.$Bus.$emit('page.ready');
}
