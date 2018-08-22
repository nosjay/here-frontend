// install guide pages
export default [{
  name: 'installer',
  path: '/installer',
  component: () => import('../../views/installer/Layout.vue'),
  children: [{
    name: 'installer-first',
    path: 'first',
    component: () => import('../../views/installer/First.vue'),
  }],
}];
