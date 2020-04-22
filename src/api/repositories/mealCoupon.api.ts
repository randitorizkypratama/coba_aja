import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';

export interface MealCouponEndpoints {
    getINVtable: any;
    getINVprepare: any;
}

export default (doFetch: DoRequest): MealCouponEndpoints => ({
    getINVtable: (body) =>
        doFetch({ url: `${INV_URL}/mealCouponList`, body }).then(
            ([, res]) => res?.cList?.['c-list']
        ),
    getINVprepare: () =>
        doFetch({ url: `${INV_URL}/mealCouponPrepare` }).then(
            ([, res]) => res?.tHoteldpt?.['t-hoteldpt']
        ),
});
