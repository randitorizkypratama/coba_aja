/** @format */
import { API_LOGIN } from "@/../utils/api/api";
import ky from "ky";
export default function name(api: string, params: object) {
  async function ambilData() {
    const data = await ky
      .post("http://54.251.169.160:8080/logserver/rest/loginServer/loginAuth", {
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
