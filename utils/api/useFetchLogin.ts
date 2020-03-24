/** @format */

import { API_LOGIN } from "./api";
import ky from "ky";
export default function name(api: string, params: any) {
  const users = {
    countryId: params.defaultSelected,
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
          request: language.iCase < 3 ? language : users
        }
      })
      .json();
    return data;
  }
  return ambilData();
}
