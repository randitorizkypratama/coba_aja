/** @format */
import { API_URL } from "../../utils/api/api";
import ky from "ky";
export default function name(api: string, params: object) {
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
