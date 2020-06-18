import { DoRequest } from '../config/repository';

const AP_URL = 'vhpAP';

export interface AccountsPayableEndpoints {
  getSupplierList: any;
  getCountry: any;
  getSegment: any;
}

export default (doFetch: DoRequest): AccountsPayableEndpoints => ({
  getSupplierList: () =>
    doFetch({ url: `${AP_URL}/getSupplierList` }).then(
      ([, res]) => res?.supplyList?.['supply-list']
    ),
  getCountry: () =>
    doFetch({ url: 'Common/getGCFNation', body: { inpNatcode: 0 } }).then(
      ([, res]) => res?.nationList?.['nation-list']
    ),
  getSegment: () =>
    doFetch({ url: 'Common/getLSegment' }).then(
      ([, res]) => res?.tLSegment?.['t-l-segment']
    ),
});
