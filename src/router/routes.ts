import { RouteConfig } from 'vue-router';
import { generateModulePath, generateModuleINV } from './mapPath.helpers';

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
      generateModulePath('GL', 'chart-of-accounts', 'PageGLChartOfAccounts'),
      generateModulePath('GL', 'general-journal', 'PageGLGeneralJournal'),
      generateModulePath('GL', 'general-ledger', 'PageGLGeneralLedger'),
      generateModulePath('GL', 'posting', 'PageGLPosting'),
      generateModulePath(
        'Inventory',
        'chart-of-accounts',
        'PageGLChartOfAccounts'
      ),
      generateModuleINV('Inventory', 'meal-coupon', 'PageINVMealCoupon'),
    ],
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
