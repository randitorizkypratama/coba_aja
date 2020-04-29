import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';
const Common_URL = 'Common';

const defaultBodies = {
    zugriff: {
        userInit: '01',
        arrayNr: '41',
        expectedNr: '1',
    },
};
export interface InventoryEndpoints {
    //meal coupon
    getMealCoupontable: any;
    getMealCouponprepare: any;
    getMealCouponzugriff: any;
    getInvArticleList: any;
    //adjustment result

    getAdjustmentResultprepare: any;
    getAdjustmentResulttable: any;

}

export default (doFetch: DoRequest): InventoryEndpoints => ({
    getMealCouponzugriff: (body = defaultBodies.zugriff) =>
        doFetch({ url: `${Common_URL}/checkPermission`, body }).then(
            ([, res]) => res
        ),
    getMealCoupontable: (body) =>
        doFetch({ url: `${INV_URL}/mealCouponList`, body }).then(
            ([, res]) => res?.cList?.['c-list']
        ),
    getMealCouponprepare: () =>
        doFetch({ url: `${INV_URL}/mealCouponPrepare` }).then(
            ([, res]) => res
        ),
    getInvArticleList: (api, body) =>
        doFetch({ url: `${INV_URL}/${api}`, body }).then(
            ([, res]) => res?.tLArtikel?.['t-l-artikel']
        ),
    getAdjustmentResultprepare: () =>
        doFetch({ url: `${INV_URL}/invAdjustlistPrepare` }).then(
            ([, res]) => res
        ),
        getAdjustmentResulttable: (body) =>
        doFetch({ url: `${INV_URL}/invAdjustlistList`, body }).then(
            ([, res]) => res
        ),
});
