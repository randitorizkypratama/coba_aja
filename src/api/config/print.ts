import ky, { Options } from 'ky';

const API_URL = 'http://13.251.108.168:8080/VHPPrint/rest';

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
