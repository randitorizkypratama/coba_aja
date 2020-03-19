/** @format */

import { API_LOGIN } from "./api";
import ky from "ky";
export default function name(api: string, params: any) {
  const users = {
    countryId: "IDN",
    userName: params.email,
    userPswd: params.password
  };

  const language = {
    iCase: params.iCase
  };

  async function ambilData() {
    const data = await ky
      .post(API_LOGIN + api, {
        json: {
          request: language.iCase !== 0 ? users : language
        }
      })
      .json();
    return data;
  }
  return ambilData();
}
