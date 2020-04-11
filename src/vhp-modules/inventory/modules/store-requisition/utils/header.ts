/** @format */

import Vue from "vue";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  data: () => {
    return {
      Header: true,
      departement: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: []
    };
  },
  beforeCreate() {
    useFetchData("storeReqPrepare", {}).then((res: any) => {
      const data = res.response.tLUntergrup["t-l-untergrup"];
      for (const i in data) {
        this.$data.departement.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
      }
    });
  },
  methods: {
    openTable() {
      this.Header = true;
    },
    closeTable() {
      this.Header = false;
    }
  }
});
