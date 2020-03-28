/** @format */

import Vue from "vue";
import utilsIssuing from "@/../utils/api/useFetchData";
import moment from "moment";
export default Vue.extend({
  data: () => {
    return {
      requesNo: " ",
      fromDepartement: [],
      toDepartemen: [],
      fromDept: [],
      toDept: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: [],
      headers: []
    };
  },
  methods: {
    open() {
      (this.$refs.child as Vue & {
        someFunction: () => void;
      }).someFunction();
    },
    search() {
      this.$emit(
        "clicked",
        this.ranges,
        this.fromDepartement,
        this.toDepartemen,
        this.requesNo,
        this.fromDept
      );
    }
  },
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },
  created() {
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.$data.headers.push(header[i]);
    }
  },
  beforeCreate() {
    utilsIssuing("storeReqPrepare", {}).then((res: any) => {
      this.$data.ranges.push(res.response.fromDate);
      this.$data.ranges.push(res.response.toDate);
      const data = res.response.tLUntergrup["t-l-untergrup"];
      for (const i in data) {
        this.$data.fromDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
        this.$data.toDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
      }
    });
  }
});
