import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';

export interface StockItemEndpoints {
  getInvArticleList: any;
}

export default (doFetch: DoRequest): StockItemEndpoints => ({
  getInvArticleList: (api, body) =>
    doFetch({ url: `${INV_URL}/${api}`, body }).then(
      ([, res]) => res?.tLArtikel?.['t-l-artikel']
    ),
});
