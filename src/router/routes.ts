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
    path: '/home',
    component: () => import('~/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'PageHome',
        component: () => import('~/app/home/PageHome.vue'),
      },
      ...MODULE_ROUTES,
    ],
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('~/app/login/PageLogin.vue'),
  },
  {
    path: '/gl/param-print',
    name: 'PrintGLParam',
    component: () => import('~/app/modules/GL/PrintGLParam.vue'),
  },
  {
    path: '/inv/print-monthly-incoming',
    name: 'PrintINVMonthlyIncoming',
    component: () => import('~/app/modules/INV/components/PrintMonthlyIncoming.vue'),
  },
  {
    path: '/gl/print-rc',
    name: 'PrintRC',
    component: () => import('~/app/modules/GL/PrintRC.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
