import { DoRequest } from '../config/repository';

const OU_URL = 'vhpOU';

export interface OutletEndpoints {
  getOUPrepareOrderTakerReport: any;
  getOUOrderTakerReport: any;
  getOUPrepareSummaryRestaurantReport: any;
  getOUSummaryRestaurantReport: any;
  getOUPrepareOutletSoldMenu: any;
  getOUOutletSoldMenu: any;
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
  getOUgetOUOutletSoldMenu: (api, body) =>
    doFetch({ url: `${OU_URL}/${api}`, body }).then(
      ([, res]) => res?.tHoteldpt?.['t-hoteldpt']
    ),
});
