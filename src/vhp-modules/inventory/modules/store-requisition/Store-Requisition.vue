<!-- @format -->

<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <h5>Date</h5>
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="300">
            <template v-slot:activator="{ on }">
              <v-text-field
                class="select"
                :value="dateRangeText"
                clearable
                v-on="on"
                @click:clear="date = null"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>
          <h5>From Departemen</h5>
          <v-select
            class="select"
            v-model="fromDepartement"
            :items="fromDept"
            item-value="value"
            item-text="label"
            dense
            outlined
          ></v-select>
          <h5>To Departemen</h5>
          <v-select
            class="select"
            v-model="toDepartemen"
            :items="toDept"
            item-value="value"
            item-text="label"
            dense
            outlined
          ></v-select>
          <h5>Request No</h5>
          <v-text-field
            v-model="requesNo"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            class="select"
            dense
            outlined
          ></v-text-field>
          <v-btn class="button" color="primary" @click="search">
            <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="2" md="9">
          <div class="my-2">
            <v-btn @click="open" class="add" depressed small color="primary">Add</v-btn>
          </div>
          <modalAdd ref="child" />
          <v-data-table
            id="label123"
            :headers="headers"
            :items="CostAlloc"
            item-key="docu-nr"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
            rows-per-page-items="[15, 30, 50, 100]"
            pagination.sync="pagination"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import utilsIssuing from "@/../utils/api/useFetchData";
import modalAdd from "./components/modal-add";
import moment from "moment";

export default {
  components: {
    NavBar,
    modalAdd
  },

  methods: {
    open() {
      this.$refs.child.someFunction(this.fromDept, this.dataStore, this.ranges);
    },
    search() {
      utilsIssuing("storeReqCreateList", {
        fromDate: moment(this.ranges[0]).format("MM/DD/YY"),
        toDate: moment(this.ranges[1]).format("MM/DD/YY"),
        fromDept: this.fromDepartement,
        toDept: this.toDepartemen,
        currLschein: this.requesNo,
        showPrice: "yes"
      }).then(res => {
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
      fromDepartement: [],
      toDepartemen: [],
      fromDept: [],
      toDept: [],
      dataStore: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: [],
      headers: [],
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
  },

  created() {
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.headers.push(header[i]);
    }
  },
  beforeCreate() {
    utilsIssuing("storeReqPrepare").then(res => {
      this.ranges.push(res.response.fromDate);
      this.ranges.push(res.response.toDate);
      const data = res.response.tLUntergrup["t-l-untergrup"];
      const data2 = res.response.tLLager["t-l-lager"];
      for (const i in data) {
        this.fromDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
        this.toDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
      }
      this.dataStore = data2;
    });
  }
};
</script>
<style>
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
.add {
  margin-left: -50px;
  margin-top: -20px;
}
</style>
