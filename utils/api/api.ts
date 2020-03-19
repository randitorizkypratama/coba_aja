/** @format */
import ky from "ky";
export const API_URL = "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/";
export const API_LOGIN =
  "http://54.251.169.160:8080/logserver/rest/loginServer/";

export const api = (): any => {
  // console.log("tes", api);

  async function ambilData() {
    const data: any[] = await ky
      .post(API_URL + api, {
        json: {
          request: {
            inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
            inputUsername: "sindata",
            LnLProg: "stock-outlist.lst"
          }
        }
      })
      .json();

    return data;
  }
  return ambilData();
};

export default { API_URL, API_LOGIN };
