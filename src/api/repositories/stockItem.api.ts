import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';

export interface StockItemEndpoints {
  getInvArticleList: any;
}

const defaultBodies = {
  params: {
    sorttype: 1,
    lastArt: '*',
    lastArt1: '',
  },
};

export default (doFetch: DoRequest): StockItemEndpoints => ({
  getInvArticleList: (body = defaultBodies.params) =>
    doFetch({ url: `${INV_URL}/getInvArticleList`, body }).then(
      ([, res]) => res
    ),
});
