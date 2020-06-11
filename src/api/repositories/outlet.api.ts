import { DoRequest } from '../config/repository';

const OU_URL = 'vhpOU';
const COMMON = 'Common';

export interface OutletEndpoints {
  getOUPrepareOrderTakerReport: any;
  getOUOrderTakerReport: any;
  getOUPrepareSummaryRestaurantReport: any;
  getOUSummaryRestaurantReport: any;
  getOUPrepareOutletSoldMenu: any;
  getOUOutletSoldMenu: any;
  getOUMealCoupon: any;
  getOUDrugStorePrepare: any;
  getOUDrugStoreList: any;
  getOUOutletUserPrepare: any;
  getCommonOutletUserList: any;
  getOutletUserTransactionList: any;
  getOUPrepareOUTurnover: any;
  getOUTurnoverList: any;
  getOUPrepareActualAndRecipeCost: any;
  getOUActualAndRecipeCost: any;
  getOUPrepareOutletBillTransaction: any;
  getOUOutletBillTransactionList: any;
  getOUOccupiedTable: any;
  getOUPrepare: any;
  getOUCancelJournalList: any;
  getOUCancelJournalDetail: any;
  getOUJoinToGuestFolio: any;
  getOUJoinToGuestFolioDetail: any;
  getOUOutletShiftAndCost: any;
  getOUBreakfast: any;
}

export default (doFetch: DoRequest): OutletEndpoints => ({
  getOUPrepareOrderTakerReport: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.queasyList?.['queasy-list']
    ),
  getOUOrderTakerReport: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.odtakerList?.['odtaker-list']
    ),
  getOUPrepareSummaryRestaurantReport: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(([, res]) => res),
  getOUSummaryRestaurantReport: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.turnover?.['turnover']
    ),
  getOUPrepareOutletSoldMenu: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(([, res]) => res),
  getOUOutletSoldMenu: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.tHoteldpt?.['t-hoteldpt']
    ),
  getOUMealCoupon: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.mlist?.['mlist']
    ),
  getOUDrugStorePrepare: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUDrugStoreList: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.sList['s-list']
    ),
  getOUOutletUserPrepare: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getCommonOutletUserList: (api, body) =>
    doFetch({ url: `${COMMON}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOutletUserTransactionList: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.restJourList['rest-jour-list']
    ),
  getOUPrepareOUTurnover: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUTurnoverList: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.turnReportlist['turn-reportlist']
    ),
  getOUPrepareActualAndRecipeCost: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUActualAndRecipeCost: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.sList["s-list"]
    ),
  getOUPrepareOutletBillTransaction: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUOutletBillTransactionList: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.bookingJournbillList['booking-journbill-list']
    ),
  getOUOccupiedTable: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUPrepare: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res
    ),
  getOUCancelJournalList: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.cancelJournal['cancel-journal']
    ),
  getOUCancelJournalDetail: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.hjBuff['hj-buff']
    ),
  getOUJoinToGuestFolio: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.roomtransreportlist['roomtransreportlist']
    ),
  getOUJoinToGuestFolioDetail: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.tHJournal['t-h-journal']
    ),
  getOUOutletShiftAndCost: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.fbSalesbyshift['fb-salesbyshift']
    ),
  getOUBreakfast: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.abfList['abf-list']
    ),
});
