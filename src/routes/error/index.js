// error pages
export default [{
  name: 'error',
  path: '*',
  component: () => import('../../views/error/ErrorLayout.vue'),
}];
