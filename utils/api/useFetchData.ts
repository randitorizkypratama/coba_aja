/** @format */
import { API_URL } from "./api";
import ky from "ky";

export default function name(api: string, additionalParameters: object) {
  const credentials: object = {
    inputUsername: "sindata",
    inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD"
  };
  const params: object = Object.assign(credentials, additionalParameters);
  async function ambilData() {
    const data = await ky
      .post(API_URL + api, {
        json: {
          request: params
        }
      })
      .json();
    return data;
  }
  return ambilData();
}
