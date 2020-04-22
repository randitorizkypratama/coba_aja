import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';

export interface StockItemEndpoints {
  getInvArticleList: any;
}

export default (doFetch: DoRequest): StockItemEndpoints => ({
<<<<<<< HEAD
  getInvArticleList: (body: any) =>
    doFetch({ url: `${INV_URL}/$getInvArticleList`, body }).then(
=======
  getInvArticleList: (api, body) =>
    doFetch({ url: `${INV_URL}/${api}`, body }).then(
>>>>>>> 1575728720fe1af686b720eaeddbeb6b48a94996
      ([, res]) => res?.tLArtikel?.['t-l-artikel']
    ),
});
