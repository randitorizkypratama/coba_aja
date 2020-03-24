<!-- @format -->

<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <h4>Date</h4>
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateRangeText"
                clearable
                label="Date"
                readonly
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>

          <v-select
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense="true"
            outlined
          ></v-select>
          <v-select
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense="true"
            outlined
          ></v-select>
          <br />
          <v-autocomplete
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Group"
            outlined
            dense
          ></v-autocomplete>
          <v-text-field @click="open" label="Another input"></v-text-field>
          <ModalAcc ref="child" />
          <v-btn class="mb-3" color="primary" @click="search" block depressed large>
            <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="12" md="9">
          <v-data-table
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
import ModalAcc from "./components/modal-alocations";

export default {
  components: {
    NavBar,
    ModalAcc
  },

  methods: {
    open() {
      this.$refs.child.someFunction();
    }
  },

  data: () => {
    return {
      mainGroup: [],
      CostAlloc: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: ["2019-09-10", "2019-09-20"],
      headers: [
        {
          text: "Date",
          align: "start",
          value: "datum"
        },
        { text: "Storage", value: "lager" },
        { text: "Document Number", value: "docu-nr" },
        { text: "Article", value: "art-nr" },
        { text: "Description", value: "art-bez" },
        { text: "Outgoing Quantity", value: "out-qty" },
        { text: "Average Price", value: "avrg-price" },
        { text: "Amount", value: "amount" },
        { text: "ID", value: "id" }
      ],
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

  beforeCreate() {
    utilsIssuing("stockOutlistPrepare", {
      LnLProg: "stock-outlist.lst"
    }).then(res => {
      const dataArry = res.response.tLHauptgrp["t-l-hauptgrp"];
      const element = res.response.tParameters["t-parameters"];
      this.$refs.child.dataAccount(element);

      for (const i in dataArry) {
        this.mainGroup.push({
          value: dataArry[i].endkum,
          label: dataArry[i].bezeich
        });
      }
    });
    utilsIssuing("stockOutlistList", {
      transCode: "R190102010",
      fromGrp: 3,
      miAlloc: "no",
      miArticle: "yes",
      miDocu: "no",
      miDate: "no",
      mattype: 4,
      fromLager: 1,
      toLager: 99,
      fromDate: "01/01/19",
      toDate: "31/01/19",
      fromArt: 9999999,
      toArt: 9999999,
      showPrice: "yes",
      costAcct: "01026220",
      deptNo: 0
    }).then(res => {
      const dataTable = res.response.stockOutlist["stock-outlist"];
      for (const i in dataTable) {
        this.CostAlloc.push(dataTable[i]);
      }
    });
  }
};
</script>
<style>
p.dashed {
  border-style: dashed;
}
</style>
