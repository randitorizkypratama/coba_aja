import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';
const COMMON_URL = 'Common';

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
  getIncomingsupplier: any;

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
  getFBOutletFlashtable: any;

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

  //Common
  getAllInvArticleList: any;

  //Monthly Incoming
  getMonthlyIncomingList: any;

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
  recipeListDelCheck: any;

  // Outlet Compliment Journalizing
  glLinkcompliPrepare: any;
  glLinkcompli1: any;

  //INVENTORY – RECEIVING TO GL
  glLinkstockBtnGo: any;
  glLinkstockPrepare: any;
  glLinkstock2: any;

  //InterStoreTransfer
  getInterStoreTransferprepare: any;
  getInterStoreTransfertable: any;

}

export default (doFetch: DoRequest): InventoryEndpoints => ({
  getMealCouponzugriff: (body = defaultBodies.zugriff) =>
    doFetch({ url: `${COMMON_URL}/checkPermission`, body }).then(
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
  getIncomingsupplier: () =>
    doFetch({ url: `${COMMON_URL}/getSupplierList` }).then(
      ([, res]) => res?.supplyList?.["supply-list"]
    ),
  getIncomingtable: (body) =>
    doFetch({ url: `${INV_URL}/receivingReportList`, body }).then(
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
  getFBOutletFlashtable: (body) =>
    doFetch({ url: `${INV_URL}/fbFlash1List`, body }).then(
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
  getAllInvArticleList: (body) =>
    doFetch({ url: `${INV_URL}/getHelpInvArticle`, body }).then(
      ([, res]) => res?.sartnrList?.['sartnr-list']
    ),
  getMonthlyIncomingList: (body) =>
    doFetch({ url: `${INV_URL}/stinReportList`, body }).then(
      ([, res]) => res?.tList?.['t-list']
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
    }),
  addRecipeCreateRezlin: (body) =>
    doFetch({ url: `${INV_URL}/addRecipeCreateRezlin`, body }).then((res) => {
    }),
  addRecipeCalCost: (body) =>
    doFetch({ url: `${INV_URL}/addRecipeCalCost`, body }).then((res) => {
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
    }),
  checkTime: (body) =>
    doFetch({ url: `${COMMON_URL}/checkTime`, body }).then((res) => {
    }),
  chgRecipeSave: (body) =>
    doFetch({ url: `${INV_URL}/chgRecipeSave`, body }).then((res) => {
    }),

  recipeListDelCheck: (body) =>
    doFetch({ url: `${INV_URL}/recipeListDelCheck`, body }).then((res) => {
    }),

  // Outlet Compliment Journalizing
  glLinkcompliPrepare: () =>
    doFetch({ url: `${INV_URL}/glLinkcompliPrepare` }).then(([, res]) => res),

  glLinkcompli1: (body) =>
    doFetch({ url: `${INV_URL}/glLinkcompli1`, body }).then(([, res]) => res),

  //INVENTORY – RECEIVING TO GL
  glLinkstockBtnGo: (body) =>
    doFetch({ url: `${INV_URL}/glLinkstockBtnGo`, body }).then(
      ([, res]) => res
    ),
  glLinkstockPrepare: (body) =>
    doFetch({ url: `${INV_URL}/glLinkstockPrepare`, body }).then(
      ([, res]) => res
    ),

  glLinkstock2: (body) =>
    doFetch({ url: `${INV_URL}/glLinkstock2`, body }).then((res) => { }),

  getInterStoreTransferprepare: () =>
    doFetch({ url: `${INV_URL}/transValidationPrepare` }).then(
      ([, res]) => res
    ),
  getInterStoreTransfertable: (body) =>
    doFetch({ url: `${INV_URL}/transValidationList`, body }).then(
      ([, res]) => res?.tList?.['t-list']
    ),

});
