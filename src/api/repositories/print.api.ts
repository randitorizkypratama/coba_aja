import { DoRequest } from '../config/print';

const LOGIN_URL = 'printTask';

export interface PrintEndpoints {
  doPrintLNL: any;
}

export default (doFetch: DoRequest): PrintEndpoints => ({
  doPrintLNL: (body) =>
    doFetch({ url: `${LOGIN_URL}/printLNL`, body }).then(
      ([, res]) => res
    ),
});
