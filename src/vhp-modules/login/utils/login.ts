/** @format */
import { API_LOGIN } from "@/../utils/api/api";
import ky from "ky";
export default function name(api: string, params: any) {
  async function ambilData() {
    const data = await ky
      .post(API_LOGIN + api, {
        json: {
          request: {
            countryId: "IDN",
            userName: params.email,
            userPswd: params.password
          }
        }
      })
      .json();
    return data;
  }
  return ambilData();
}
