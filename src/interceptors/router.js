// vue-router global guards
export function onRouterBeforeEach(to, from, next) {
  next();
}

// vue-router global after hooks, just notification
export function onRouterAfterEach(to, from) {
  // eslint-disable-next-line no-console
  console.group('RouterAfterEach');
  // eslint-disable-next-line no-console
  console.log(to, from);
  // eslint-disable-next-line no-console
  console.groupEnd();
}
