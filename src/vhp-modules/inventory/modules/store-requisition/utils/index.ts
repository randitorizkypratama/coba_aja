/** @format */
import vue from "vue";
import NavBar from "@/components/Navbar.vue";
import tableData from "../table-column/table-store.vue";
import action from "../components/action.vue";
import utilsIssuing from "@/../utils/api/useFetchData";
import modalAdd from "../components/modal-add.vue";
import moment from "moment";
import storeRight from "../layouts/store-right.vue";

export default vue.extend({
  components: {
    NavBar,
    modalAdd,
    action,
    tableData,
    storeRight
  },
  data: () => {
    return {
      CostAlloc: [],
      requesNo: "",
      dataStore: [],
      artnr: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },
  methods: {
    open() {
      (this.$refs.child as Vue & { someFunction: () => void }).someFunction();
    },
    search(
      ranges: any,
      fromDepartement: any,
      toDepartemen: any,
      requesNo: any
    ) {
      (this.$refs.tableData as Vue & {
        getData: (CostAlloc: object) => void;
      }).getData(this.CostAlloc);
      utilsIssuing("storeReqCreateList", {
        fromDate: moment(ranges[0]).format("MM/DD/YY"),
        toDate: moment(ranges[1]).format("MM/DD/YY"),
        fromDept: fromDepartement,
        toDept: toDepartemen,
        currLschein: requesNo,
        showPrice: "yes"
      }).then((res: any) => {
        const data: any[] = res.response.tList["t-list"];
        for (const i in data) {
          this.$data.CostAlloc.push(data[i]);
        }
      });
    }
  },

  computed: {
    dateRangeText() {
      return this.$data.ranges.join(" - ");
    }
  }
});
