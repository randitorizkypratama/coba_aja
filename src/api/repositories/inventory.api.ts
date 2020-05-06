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

  //incoming
  getIncomingprepare: any;
  getIncomingmaingroup: any;
  getIncomingstore: any;
  getIncomingtable: any;

  //Store Requisition
  storeReqPrepare: any;
  storeReqCreateList: any;
  storeReqDelete: any;
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
    doFetch({ url: `${INV_URL}/mealCouponPrepare` }).then(([, res]) => res),
  getInvArticleList: (api, body) =>
    doFetch({ url: `${INV_URL}/${api}`, body }).then(
      ([, res]) => res?.tLArtikel?.['t-l-artikel']
    ),
  getAdjustmentResultprepare: () =>
    doFetch({ url: `${INV_URL}/invAdjustlistPrepare` }).then(([, res]) => res),
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
      ([, res]) => res?.tLLager?.['t-l-lager']
    ),
  getIncomingtable: () =>
    doFetch({ url: `${INV_URL}/receivingReportList` }).then(
      ([, res]) => res?.strList?.['str-list']
    ),

  //Store Requisition
  storeReqPrepare: () =>
    doFetch({ url: `${INV_URL}/storeReqPrepare` }).then(([, res]) => res),
  storeReqCreateList: (body) =>
    doFetch({ url: `${INV_URL}/storeReqCreateList`, body }).then(
      ([, res]) => res
    ),
  storeReqDelete: (body) =>
    doFetch({ url: `${INV_URL}/storeReqDelete`, body }).then((res) => {
      console.log('sukses123', res);
    }),
});
