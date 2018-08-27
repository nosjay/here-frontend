import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../../routes';
import { DEFAULT_ROUTER_CONFIG } from '../../configs';
import { onRouterBeforeEach, onRouterAfterEach } from '../../interceptors/router';
import scrollBehavior from './behavior/scroll';


Vue.use(VueRouter);

const router = new VueRouter({
  ...DEFAULT_ROUTER_CONFIG,
  routes,
  scrollBehavior,
});

// router interceptors
router.beforeEach(onRouterBeforeEach);
router.afterEach(onRouterAfterEach);

// export to global
export default router;
