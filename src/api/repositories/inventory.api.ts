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
  storeRequestPrepare: any;

  // Recipe
  recipeListPrepare: any;
  addRecipePrepare: any;
  addRecipeSave: any;
  addRecipeCreateRezlin: any;
  addRecipeCalCost: any;
  chgRecipePrepareL: any;
  chgRecipeRetKatnr: any;
  chgRecipeDelete: any;
  checkTime: any;
  chgRecipeSave: any;
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
      console.log('sukses3', res);
    }),

  storeRequestPrepare: (body) =>
    doFetch({ url: `${INV_URL}/storeRequestPrepare`, body }).then(
      ([, res]) => res
    ),

  // Recipe
  recipeListPrepare: () =>
    doFetch({ url: `${INV_URL}/recipeListPrepare` }).then(([, res]) => res),

  addRecipePrepare: () =>
    doFetch({ url: `${INV_URL}/addRecipePrepare` }).then(([, res]) => res),

  addRecipeSave: (body) =>
    doFetch({ url: `${INV_URL}/addRecipeSave`, body }).then((res) => {
      console.log('sukses123', res);
    }),
  addRecipeCreateRezlin: (body) =>
    doFetch({ url: `${INV_URL}/addRecipeCreateRezlin`, body }).then((res) => {
      console.log('sukses123', res);
    }),
  addRecipeCalCost: (body) =>
    doFetch({ url: `${INV_URL}/addRecipeCalCost`, body }).then((res) => {
      console.log('sukses123', res);
    }),
  chgRecipePrepareL: (body) =>
    doFetch({ url: `${INV_URL}/chgRecipePrepare`, body }).then(
      ([, res]) => res
    ),
  chgRecipeRetKatnr: (body) =>
    doFetch({ url: `${INV_URL}/chgRecipeRetKatnr`, body }).then(
      ([, res]) => res
    ),
  chgRecipeDelete: (body) =>
    doFetch({ url: `${INV_URL}/chgRecipeDelete`, body }).then((res) => {
      console.log('sukses12', res);
    }),
  checkTime: (body) =>
    doFetch({ url: `${Common_URL}/checkTime`, body }).then((res) => {
      console.log('sukses123', res);
    }),
  chgRecipeSave: (body) =>
    doFetch({ url: `${INV_URL}/chgRecipeSave`, body }).then((res) => {
      console.log('sukses12', res);
    }),
});
