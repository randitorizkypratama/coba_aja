export const generateModulePath = (
  moduleName: string,
  path: string,
  pageName: string

) => ({
  path: `/${moduleName.toLowerCase()}/${path}`,
  name: pageName,
  component: () => import(`../app/modules/GeneralLedger/${pageName}.vue`),
  meta: { module: moduleName },

});
export const generateModuleINV = (
  moduleName: string,
  path: string,
  pageName: string

) => ({
  path: `/${moduleName.toLowerCase()}/${path}`,
  name: pageName,
  component: () => import(`../app/modules/Inventory/${pageName}.vue`),
  meta: { module: moduleName },

});
export const generateModuleOU = (
  moduleName: string,
  path: string,
  pageName: string

) => ({
  path: `/${moduleName.toLowerCase()}/${path}`,
  name: pageName,
  component: () => import(`../app/modules/Outlet/${pageName}.vue`),
  meta: { module: moduleName },

});