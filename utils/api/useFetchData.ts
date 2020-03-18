/** @format */

import { LOGIN } from "../context/actions";
import { API_URL, API_LOGIN, ApiService } from "../api/api";
import ky from "ky";

const state = {
  issuingState: ""
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(e => {
      (async () => {
        const parsed = await ky
          .post(API_LOGIN + "loginAuth", {
            json: {
              request: {
                countryId: "ENG",
                userName: credentials.email,
                userPswd: credentials.password
              }
            }
          })
          .json();
        context.commit("confirm", parsed);
      })();
    });
  },
  ["issuing"]({ commit, state }, credentials) {
    commit("KONFIRMASI_AGENDA", credentials);
  }
};

const mutations = {
  confirm: (state, credentials) => {
    localStorage.setItem("login", JSON.stringify(credentials));
    localStorage.setItem(
      "token",
      JSON.stringify(credentials.response.userToken)
    );
  },
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
