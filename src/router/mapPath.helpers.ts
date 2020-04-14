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
