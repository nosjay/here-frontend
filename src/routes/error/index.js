// error pages
export default [{
  name: 'error',
  path: '*',
  component: () => import(/* webpackChunkName: "v-error" */ '../../views/error/ErrorLayout.vue'),
}];
