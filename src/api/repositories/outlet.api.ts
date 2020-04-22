import { DoRequest } from '../config/repository';

const OU_URL = 'vhpOU';

export interface OutletEndpoints {
  getOUPrepareOrderTakerReport: any;
  getOUOrderTakerReport: any;
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
 
});
