// rules for homepage
export default [{
  name: 'index',
  path: '/',
  component: () => import('../views/Home.vue'),
  // children: [{}],
}];
