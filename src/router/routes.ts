import { RouteConfig } from 'vue-router';
import { SUBMODULE_LIST } from '~/app/constants/submoduleList.constant';

const MODULE_ROUTES = Object.values(SUBMODULE_LIST)
  .flat()
  .map(({ path, pageName, componentName, meta }) => ({
    path,
    name: pageName,
    component: () => import(`../app/modules/${componentName}`),
    meta,
  }));

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('~/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'PageHome',
        component: () => import('~/app/home/PageHome.vue'),
      },
      {
        path: '/inv/incomingstock',
        name: 'incoming',
        component: () => import(`~/app/modules/INV/PageINVIncomingStock.vue`),
      },
      ...MODULE_ROUTES,
    ],
  },
];

console.log('sukses123', SUBMODULE_LIST);

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
