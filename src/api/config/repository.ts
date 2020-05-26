import ky, { Options } from 'ky';
import { getHtlUrl, getUsername, getUserkey } from '~/app/helpers/getCredentials.helpers';

//const API_URL = 'http://ws1.e1-vhp.com/VHPWebBased/rest';
const API_URL = getHtlUrl;

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
      inputUserkey: getUserkey,
      inputUsername: getUsername.substring(0, getUsername.indexOf("@")),
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
