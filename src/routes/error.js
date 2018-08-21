// error pages
export default [{
  name: 'error',
  path: '*',
  component: () => import('../views/Error.vue'),
}];
