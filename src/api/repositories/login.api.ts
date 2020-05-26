import { DoRequest } from '../config/login';

const LOGIN_URL = 'loginServer';

export interface LoginEndpoints {
  getLoginAuth: any;
  getLanguages: any;
}

const defaultBodies = {
  lang: {
    iCase: '0',
  },
};

export default (doFetch: DoRequest): LoginEndpoints => ({
  getLoginAuth: (body) =>
    doFetch({ url: `${LOGIN_URL}/loginAuth`, body }).then(
      ([, res]) => res
    ),
  getLanguages: (body = defaultBodies.lang) =>
    doFetch({ url: `${LOGIN_URL}/loadLanguages`, body }).then(
      ([, res]) => res?.tLanguages?.['t-languages']
    ),
});
