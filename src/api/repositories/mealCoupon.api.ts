import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';
const Common_URL = 'Common';

const defaultBodies = {
  chart: {
    userInit: '01',
    arrayNr: '41',
    expectedNr: '1',
  },
};
export interface MealCouponEndpoints {
  getINVtable: any;
  getINVprepare: any;
  getINVzugriff: any;
}

export default (doFetch: DoRequest): MealCouponEndpoints => ({
    getINVzugriff: (body = defaultBodies.chart) =>
        doFetch({ url: `${Common_URL}/checkPermission`, body }).then(
            ([, res]) => res
        ),
    getINVtable: (body) =>
        doFetch({ url: `${INV_URL}/mealCouponList`, body }).then(
            ([, res]) => res?.cList?.['c-list']
        ),
    getINVprepare: () =>
        doFetch({ url: `${INV_URL}/mealCouponPrepare` }).then(
            ([, res]) => res
        ),
});
