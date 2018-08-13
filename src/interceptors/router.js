import Logger from '../utils/logging';


// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) {
  Logger.group('RouterAfterEach')
    .info(to, from)
    .end();
}
