import ky, { Options } from 'ky';

const API_URL = 'http://ws1.e1-vhp.com/VHPWebBased/rest';

interface FetchArgs {
  url: string;
  body?: any;
  options?: Options;
}

export type DoRequest = (params: FetchArgs) => Promise<any>;

const doFetch = async ({ url, body, options }: FetchArgs) => {
  let data = body || {};
  data = {
    request: {
      inputUserkey: '6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD',
      inputUsername: 'sindata',
      ...data,
    },
  };
  const httpOptions: Options = options || {};
  httpOptions.prefixUrl = API_URL;
  httpOptions.json = data;

  try {
    const response = await ky.post(url, httpOptions);
    const data = await response.json();

    return [null, data.response];
  } catch (error) {
    return [{ errorMessage: error.message }, null];
  }
};

export default doFetch;
