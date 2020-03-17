/** @format */
/** @format */

import { LOGIN } from "../context/actions";
import { API_URL } from "../api/api";
import ky from "ky";

const state = {
  issuing: ""
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(e => {
      (async () => {
        const parsed = await ky
          .post(
            "http://54.251.169.160:8080/logserver/rest/loginServer/loginAuth",
            {
              json: {
                request: {
                  countryId: "ENG",
                  userName: credentials.email,
                  userPswd: credentials.password
                }
              }
            }
          )
          .json();
        context.commit("confirm", parsed);
      })();
    });
  },
  ["issuing"](context, credentials) {
    return new Promise(e => {
      (async () => {
        const parsed = await ky
          .post(API_URL + "stockOutlistPrepare", {
            json: {
              request: credentials
            }
          })
          .json();
        context.commit("issuing", parsed);
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
  },
  issuing: (state, credentials) => {
    state.issuing = credentials;
  }
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
};
