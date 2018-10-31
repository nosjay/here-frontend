// import InstallGuide from '../../views/installer/InstallGuide.vue';

// install guide pages
export default [{
  name: 'installer',
  path: '/install-guide',
  // component: InstallGuide,
  component: () => import('../../views/installer/InstallGuide.vue'),
}];
