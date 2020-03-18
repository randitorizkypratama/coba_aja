/** @format */
import ky from "ky";

export const API_URL = "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/";
export const API_LOGIN = -"http://54.251.169.160:8080/logserver/rest/loginServer/";

export const API_KY = (async () => {
  const parsed = await ky
    .post(API_URL + "stockOutlistPrepare", {
      json: {
        request: {
          inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
          inputUsername: "sindata",
          LnLProg: "stock-outlist.lst"
        }
      }
    })
    .json();
  // console.log("data1234", parsed);
})();

export const ApiService = async function name(data, params: object) {
  return await ky.post(API_URL + data, params);
};

export default { API_URL, API_LOGIN, API_KY, ApiService };
