import { reportList } from '~/router/reportList';

interface Submodule {
  [key: string]: string[];
}

const SUBMODULES: Submodule = {
  GL: [
    'Chart Of Accounts',
    'General Journal',
    'General Ledger',
    'Posting',
    'Profit And Loss Budget',
    'Accounting Date Parameter',
    'Closing',
  ],
  HK: [
    'Overview',
    'Room Status Admin',
    'Out Of Order',
    'Rooming List',
    'Discrepancy',
    'Lost And Found',
    'Guest Preference List',
    'Trace',
  ],
  INV: [
    'Stock Item',
    'Meal Coupon',
    'Adjustment Result',
    'Store Requisition',
    'Incoming',
    'Material Reconciliation',
    'Slow Moving Stock On Hand',
    'Inter Kitchen Transfer',
    'Yearly Issuing',
    'FB Outlet Flash',
    'Monthly Incoming',
    'Recipe',
    'Outlet Compliment Journalizing',
    'Outgoing Journalizing',
    'Incoming Journalizing',
  ],
  OU: ['Order Taker Report', 'Summary Restaurant Report', 'Outlet Sold Menu'],

};

export const generateModulePath = (moduleAbbr: string, name: string) => {
  const pageName = name.replace(/ /g, '');
  const path = name.replace(/\s+/g, '-').toLowerCase();

  return {
    icon: `${moduleAbbr}/Icon-${pageName}`,
    name,
    path: `/${moduleAbbr.toLowerCase()}/${path}`,
    componentName: `${moduleAbbr}/Page${moduleAbbr}${pageName}.vue`,
    meta: { module: moduleAbbr, reportList: reportList[moduleAbbr] },
    pageName,
  };
};

export const SUBMODULE_LIST = {
  ...Object.keys(SUBMODULES).reduce((prev, curr) => {
    prev[curr] = SUBMODULES[curr].map((name) => generateModulePath(curr, name));
    return prev;
  }, {}),
};
