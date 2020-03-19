/** @format */
import { API_URL, api } from "./api";
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

// interface TypeApiService {
//   api: string;
//   additionalParameters: object;
// }

// class ApiService implements TypeApiService {
//   api: string;
//   additionalParameters: object;

//   constructor(api: string, additionalParameters: object) {
//     this.api = api;
//     this.additionalParameters = additionalParameters;
//   }

//   a(): void {
//     console.log("tes", api());
//   }
// }

// export default ApiService;
