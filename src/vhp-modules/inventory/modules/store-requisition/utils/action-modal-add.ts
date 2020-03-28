/** @format */

import vue from "vue";
import useFetchData from "@/../utils/api/useFetchData";

export default vue.extend({
  data: () => {
    return {
      fromStore: [],
      toStorage: []
    };
  },
  beforeCreate() {
    useFetchData("storeReqPrepare", {}).then((res: any) => {
      const data = res.response.tLLager["t-l-lager"];
      for (const i in data) {
        this.$data.fromStore.push({
          label: data[i].bezeich,
          value: data[i]["lager-nr"]
        });
        this.$data.toStorage.push({
          label: data[i].bezeich,
          value: data[i]["lager-nr"]
        });
      }
    });
  }
});
