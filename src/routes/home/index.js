// rules for homepage
export default [{
  name: 'index',
  path: '/',
  component: () => import('../../views/home/HomeLayout.vue'),
  children: [{
    name: 'index-home',
    path: '',
    component: () => import('../../views/home/Home.vue'),
  }],
}];
