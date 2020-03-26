/** @format */

import fetchData from "@/../utils/api/useFetchData";

export const getData = function name(params: object) {
  console.log("asuku", "sukses");
  fetchData("storeReqPrepare", {}).then(res => {
    console.log("asuku", res);
  });
};
