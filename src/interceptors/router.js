import Logger from '../utils/logging';


// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  GLOBAL.$Bus.$emit('page.loading');

  Logger.group('RouteBefore')
    .info(`From: name=${from.name}, path=${from.path}, hash=${from.hash}`)
    .info(`To: name=${to.name}, path=${to.path}, hash=${to.hash}`)
    .end();

  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) {
  Logger.group('RouteAfter')
    .info(`From: name=${from.name}, path=${from.path}, hash=${from.hash}`)
    .info(`To: name=${to.name}, path=${to.path}, hash=${to.hash}`)
    .end();


  // route completed
  GLOBAL.$Bus.$emit('page.ready');
}
