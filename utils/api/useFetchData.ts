/** @format */
/** @format */

import { LOGIN } from "../context/actions";
import { API_URL } from "../api/api";
import ky from "ky";

const state = {};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(e => {
      (async () => {
        const parsed = await ky
          .post(API_URL, {
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
  }
};

const mutations = {
  confirm: (state, credentials) => {
    localStorage.setItem("login", JSON.stringify(credentials));
    localStorage.setItem(
      "token",
      JSON.stringify(credentials.response.userToken)
    );
  }
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
