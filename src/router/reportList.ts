interface ReportList {
  [key: string]: {
    title: string;
    reports: {
      path: string;
      name: string;
      keyword: string;
    }[];
  };
}

export const reportList: ReportList = {
  GL: {
    title: 'General Ledger',
    reports: [
      {
        path: '/gl/trial-balance',
        name: 'Trial Balance',
        keyword: 'General-Ledger',
      },
    ],
  },
  HK: {
    title: 'Housekeeping',
    reports: [],
  },
  INV: {
    title: 'Inventory',
    reports: [
      {
        path: '/inv/report/meal-coupon',
        name: 'Meal Coupon',
        keyword: 'Inventory',
      },
    ],
  },
  OU: {
    title: 'Outlet',
    reports: [
      {
        path: '/gl/chart-of-accounts',
        name: 'Order Taker',
        keyword: 'Outlet',
      },
    ],
  },
};
