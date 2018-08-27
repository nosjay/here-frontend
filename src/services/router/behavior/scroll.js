// scroll behavior
export default (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }

  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  }

  if (to.matched.some(match => match.meta.scrollToTop)) {
    position.x = 0;
    position.y = 0;
  }

  return position;
};
