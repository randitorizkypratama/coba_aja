import { DoRequest } from '../config/repository';

const INV_URL = 'vhpINV';
const INV_AR = 'vhpAR';

export interface StockItemEndpoints {
  getInvArticleList: any;
  getInvMainGroup: any;
  getInvSubGroup: any;
  getInvArtNo: any;
  getInvRecipe: any;
  getPrepareSelectGLAcct: any;
}

export default (doFetch: DoRequest): StockItemEndpoints => ({
  getInvArticleList: (body: any) =>
    doFetch({ url: `${INV_URL}/getInvArticleList`, body }).then(
      ([, res]) => res?.tLArtikel?.['t-l-artikel']
    ),

  getInvMainGroup: () =>
    doFetch({ url: `${INV_URL}/getInvMainGroup` }).then(
      (res) => res[1].tLHauptgrp['t-l-hauptgrp']
    ),
  getInvSubGroup: (body: any) =>
    doFetch({ url: `${INV_URL}/getInvSubGroup`, body }).then(
      (res) => res[1].szwkumList['szwkum-list']
    ),
  getInvArtNo: (body: any) =>
    doFetch({ url: `${INV_URL}/getInvArtNo`, body }).then(
      (res) => res[1].outInt
    ),

  getInvRecipe: (body) =>
    doFetch({ url: `${INV_URL}/getInvRecipe`, body }).then(
      (res) => res[1].tHRezept['t-h-rezept']
    ),
  getPrepareSelectGLAcct: (body) =>
    doFetch({ url: `${INV_AR}/getPrepareSelectGLAcct`, body }).then(
      (res) => res[1].glacctList['glacct-list']
    ),
});
