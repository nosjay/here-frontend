// rules for homepage
export default [{
  path: '/',
  component: () => import('../../views/home/HomeLayout.vue'),
  children: [{
    name: 'index-home',
    path: '',
    component: () => import('../../views/home/Home.vue'),
  }],
}];
