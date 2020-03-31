import ky from 'ky';
import { VueConstructor } from 'vue';

const API_URL = 'http://54.251.169.160:8080/';

class HTTP {
  _defaults;
  _ky;

  constructor(defaults) {
    this._defaults = {
      hooks: {},
      ...defaults,
    };
    this._ky = ky;
  }

  async onSuccess(response) {
    try {
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [{ errorMessage: error.message }, null];
    }
  }
}

for (const method of ['get', 'head', 'delete', 'post', 'put', 'patch']) {
  const hasBody = ['post', 'put', 'patch'].includes(method);

  HTTP.prototype[method] = async function(url, arg1, arg2) {
    let options;

    if (!hasBody) {
      options = arg1;
    } else {
      options = arg2 || {};
      if (arg1 !== undefined) {
        if (arg1.constructor === Object || Array.isArray(arg1)) {
          options.json = arg1;
        } else {
          options.body = arg1;
        }
      }
    }

    const _options = { ...this._defaults, ...options };

    try {
      const response = await this._ky[method](url, _options);
      return this.onSuccess(response);
    } catch (error) {
      console.log('error', error);
    }
  };
}

export const APIPlugin = {
  install(Vue: VueConstructor) {
    const defaults = {
      prefixUrl: API_URL,
    };

    const http = new HTTP(defaults);

    Vue.prototype.$api = http;
  },
};
