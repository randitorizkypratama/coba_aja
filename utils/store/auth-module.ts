/** @format */

import { LOGIN } from "./actions";
import { API_URL } from "../api/config";
import ky from "ky";

const state = {
  author: "state management",
  data: [
    {
      id: 1,
      jenis: "string"
    },
    {
      id: 2,
      jenis: "bolean"
    }
  ]
};

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
    console.log("dataSatu", credentials);
    localStorage.setItem("login", JSON.stringify(credentials));
    localStorage.setItem(
      "token",
      JSON.stringify(credentials.response.userToken)
    );
  }
};

const getters = {
  mencariId: state => id => {
    return state.data.find(obj => {
      return obj.id === id;
    });
  }
};
export default {
  state,
  actions,
  mutations,
  getters
};
