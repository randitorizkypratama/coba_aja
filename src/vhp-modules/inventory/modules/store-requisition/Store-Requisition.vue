<!-- @format -->

<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="2" class="left-store">
          <v-col md="12" cols="10">
            <action @clicked="search" />
          </v-col>
        </v-col>
        <v-col cols="2" md="9">
          <div class="my-2">
            <v-btn @click="open" depressed small color="primary">Add</v-btn>
          </div>
          <modalAdd ref="child" />
          <tableData ref="tableData" />
        </v-col>
        <v-col class="right-store">
          <storeRight />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import tableData from "./table-column'/table-store";
import action from "./components/action";
import utilsIssuing from "@/../utils/api/useFetchData";
import modalAdd from "./components/modal-add";
import moment from "moment";
import storeRight from "./layouts/store-right";

export default {
  components: {
    NavBar,
    modalAdd,
    action,
    tableData,
    storeRight
  },

  methods: {
    open() {
      this.$refs.child.someFunction(this.fromDept, this.dataStore, this.ranges);
    },
    search(ranges, fromDepartement, toDepartemen, requesNo) {
      this.$refs.tableData.getData(this.CostAlloc);
      utilsIssuing("storeReqCreateList", {
        fromDate: moment(ranges[0]).format("MM/DD/YY"),
        toDate: moment(ranges[1]).format("MM/DD/YY"),
        fromDept: fromDepartement,
        toDept: toDepartemen,
        currLschein: requesNo,
        showPrice: "yes"
      }).then(res => {
        console.log("tes", res);

        const data = res.response.tList["t-list"];
        for (const i in data) {
          this.CostAlloc.push(data[i]);
        }
      });
    }
  },

  data: () => {
    return {
      CostAlloc: [],
      requesNo: " ",
      dataStore: [],
      artnr: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },

  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  }
};
</script>
<style lang="scss">
p.dashed {
  border-style: dashed;
}

.select {
  width: 250px;
  margin-top: -20px;
}
.button {
  width: 250px !important;
}
#label123 {
  /* height: 400px; */
  margin-right: 40px;
  margin-left: -50px;
}
.left-store {
  border-right: 1px #2887d2 solid;
}
.right-store {
  margin-left: 25px;
}
</style>
