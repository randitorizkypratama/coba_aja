import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';
const Common_URL = 'Common';

const defaultBodies = {
    zugriff: {
        userInit: '01',
        arrayNr: '41',
        expectedNr: '1',
    },
    slowmoving: {
        LnLProg: " "
    },
    interkitchentransfer: {
        minDept: '99',
        maxDept: '0',
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

    //incoming
    getIncomingprepare: any;
    getIncomingmaingroup: any;
    getIncomingstore: any;
    getIncomingtable: any;

    //materialreconciliation
    getMaterialReconciliationprepare: any;
    getMaterialReconciliationtable: any;

    //slowmoving
    getSlowMovingprepare: any;
    getSlowMovingtable: any;

    //InterKitchenTransfer
    getInterKitchenTransferprepare: any;
    getInterKitchenTransfertable: any;

    //FBOutletFlash
    getFBOutletFlashprepare: any;

    //FBReconciliation
    getFBReconciliationprepare: any;
    getFBReconciliationMainGroup: any;
    getFBReconciliationtable: any;

    //FBFlash
    getFBFlashprepare: any;
    getFBFlashMainGroup: any;
    getFBFlashtable: any;

    //IncomingPriceDiscrepancy
    getIncomingPriceDiscrepancyStorage: any;
    getIncomingPriceDiscrepancyArticleList: any;
    getIncomingPriceDiscrepancyTable: any;

    //YearlyIssuing
    getYearlyIssuingprepare: any;
    getYearlyIssuingtable: any;

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
    getIncomingprepare: (body) =>
        doFetch({ url: `${INV_URL}/receivingReportPrepare`, body }).then(
            ([, res]) => res
        ),
    getIncomingmaingroup: () =>
        doFetch({ url: `${INV_URL}/getInvMainGroup` }).then(
            ([, res]) => res?.tLHauptgrp?.['t-l-hauptgrp']
        ),
    getIncomingstore: () =>
        doFetch({ url: `${INV_URL}/getStorage` }).then(
            ([, res]) => res?.tLLager?.["t-l-lager"]
        ),
    getIncomingtable: () =>
        doFetch({ url: `${INV_URL}/receivingReportList` }).then(
            ([, res]) => res?.strList?.["str-list"]
        ),
    getMaterialReconciliationprepare: () =>
        doFetch({ url: `${INV_URL}/matReconsilePrepare` }).then(
            ([, res]) => res
        ),
    getMaterialReconciliationtable: (body) =>
        doFetch({ url: `${INV_URL}/matReconsileList`, body }).then(
            ([, res]) => res?.artBestand?.["art-bestand"]
        ),
    getSlowMovingprepare: (body = defaultBodies.slowmoving) =>
        doFetch({ url: `${INV_URL}/slowMovingPrepare`, body }).then(
            ([, res]) => res
        ),
    getSlowMovingtable: (body) =>
        doFetch({ url: `${INV_URL}/slowMovingList`, body }).then(
            ([, res]) => res?.sList?.["s-list"]
        ),
    getInterKitchenTransferprepare: (body = defaultBodies.interkitchentransfer) =>
        doFetch({ url: `${INV_URL}/ktransReportPrepare`, body }).then(
            ([, res]) => res
        ),
    getInterKitchenTransfertable: (body) =>
        doFetch({ url: `${INV_URL}/ktransReportList`, body }).then(
            ([, res]) => res?.cList?.["c-list"]
        ),
    getFBOutletFlashprepare: () =>
        doFetch({ url: `${INV_URL}/fbFlash1Prepare` }).then(
            ([, res]) => res
        ),
    getFBReconciliationprepare: () =>
        doFetch({ url: `${INV_URL}/fbReconsilePrepare` }).then(
            ([, res]) => res
        ),
    getFBReconciliationMainGroup: () =>
        doFetch({ url: `${INV_URL}/getInvMainGroup` }).then(
            ([, res]) => res
        ),
    getFBReconciliationtable: (body) =>
        doFetch({ url: `${INV_URL}/fbReconsileList`, body }).then(
            ([, res]) => res?.fbreconsileList?.["fbreconsile-list"]
        ),
    getFBFlashprepare: () =>
        doFetch({ url: `${INV_URL}/fbFlashPrepare` }).then(
            ([, res]) => res
        ),
    getFBFlashMainGroup: () =>
        doFetch({ url: `${INV_URL}/getInvMainGroup` }).then(
            ([, res]) => res
        ),
    getFBFlashtable: (body) =>
        doFetch({ url: `${INV_URL}/fbFlashList`, body }).then(
            ([, res]) => res?.fbflashList?.["fbflash-list"]
        ),
    getIncomingPriceDiscrepancyStorage: () =>
        doFetch({ url: `${INV_URL}/getStorage` }).then(
            ([, res]) => res?.tLLager?.["t-l-lager"]
        ),
    getIncomingPriceDiscrepancyArticleList: (body) =>
        doFetch({ url: `${INV_URL}/getInvArticleList`, body }).then(
            ([, res]) => res
        ),
    getIncomingPriceDiscrepancyTable: (body) =>
        doFetch({ url: `${INV_URL}/priceDiscrepancyReportList`, body }).then(
            ([, res]) => res?.discrepancyInlist?.["discrepancy-inlist"]
        ),
    getYearlyIssuingprepare: () =>
        doFetch({ url: `${INV_URL}/stockOutAnnualPrepare` }).then(
            ([, res]) => res
        ),
    getYearlyIssuingtable: (body) =>
        doFetch({ url: `${INV_URL}/stockOutAnnualList`, body }).then(
            ([, res]) => res
        ),
});
