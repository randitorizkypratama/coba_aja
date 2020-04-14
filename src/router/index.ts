import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

import storeModule from '~/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});

// this function is to change the contents of the submodule menu
const changeModule = (to: Route) => {
  const { SET_CURRENT_MODULE } = storeModule('layout').useMutations([
    'SET_CURRENT_MODULE',
  ]);

  if (to.meta.module) {
    SET_CURRENT_MODULE(to.meta.module);
  } else {
    SET_CURRENT_MODULE(null);
  }
};

router.beforeEach((to, _, next) => {
  changeModule(to);
  next();
});

export default router;
