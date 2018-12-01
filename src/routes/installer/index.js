// import InstallGuide from '../../views/installer/InstallGuide.vue';

// install guide pages
export default [{
  name: 'installer',
  path: '/install-guide',
  // component: InstallGuide,
  component: () => import(/* webpackChunkName: "v-installer" */ '../../views/installer/InstallGuide.vue'),
}];
