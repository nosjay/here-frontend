// rules for homepage
export default [{
  path: '/',
  component: () => import(/* webpackChunkName: "v-home" */ '../../views/home/HomeLayout.vue'),
  children: [{
    name: 'index-home',
    path: '',
    component: () => import(/* webpackChunkName: "v-home" */ '../../views/home/Home.vue'),
  }],
}];
