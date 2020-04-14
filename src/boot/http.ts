import API from '../api/config/http';

export default ({ Vue }) => {
  Vue.prototype.$api = API;
};
