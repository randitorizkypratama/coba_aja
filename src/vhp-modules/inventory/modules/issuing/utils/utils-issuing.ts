/** @format */
import ApiService from "@/../utils/api/useFetchData";

class UtilsUsing extends ApiService {
  constructor(api: string, additionalParameters: object) {
    super(api, additionalParameters);
  }
}

import { API_LOGIN } from "@/../utils/api/api";
import ky from "ky";
export default function name(api: string, params: object) {
  console.log("tes", api);

  async function ambilData() {
    const data = await ky
      .post(API_LOGIN + api, {
        json: {
          request: params
        }
      })
      .json();
    return data;
  }
  return ambilData();
}
