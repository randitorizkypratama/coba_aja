import { DoRequest } from '../config/repository';

const OU_URL = 'vhpOU';
const COMMON = 'Common';

export interface OutletEndpoints {
  getOUPrepareOrderTakerReport: any;
  getOUOrderTakerReport: any;
  getOUMealCoupon: any;
  getOUDrugStorePrepare: any;
  getOUDrugStoreList:any;
  getOUOutletUserPrepare:any;
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
 
});
