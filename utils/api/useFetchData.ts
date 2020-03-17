/** @format */
/** @format */

import { LOGIN } from "../context/actions";
import { API_URL, API_LOGIN } from "../api/api";
import ky from "ky";
import state from "utils/store";

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
        context.commit("issuing", parsed.response.tLHauptgrp["t-l-hauptgrp"]);
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
    console.log("data1234", credentials);

    state.issuing = credentials;
  }
};

export default {
  actions,
  mutations
};
