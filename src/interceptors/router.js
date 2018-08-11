// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) {
  console.group('RouterAfterEach');
  console.log(to, from);
  console.groupEnd();
}
