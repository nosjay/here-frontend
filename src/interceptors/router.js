import Logger from '../utils/logging';


// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  // route progress starting
  GLOBAL.$Loading.start();

  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) {
  Logger.group('RouterAfterEach')
    .info(to, from)
    .end();

  // route completed
  GLOBAL.$Loading.finish();
}
