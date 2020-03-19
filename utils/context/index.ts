/** @format */

import Vue from "vue";
import Vuex from "vuex";
import auth from "../api/useFetchData";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth
  }
});
