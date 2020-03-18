/** @format */

import { LOGIN } from "../context/actions";
import { API_URL, API_LOGIN, ApiService } from "../api/api";
import ky from "ky";

const state = {
  issuingState: ""
};

const actions = {
  ["issuing"]({ commit, state }, credentials) {
    commit("KONFIRMASI_AGENDA", credentials);
  }
};

const mutations = {
  KONFIRMASI_AGENDA: (state, credentials) => {
    console.log("data1234", credentials);

    state.issuingState = credentials;
  }
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
