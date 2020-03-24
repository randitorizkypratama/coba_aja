<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="4" md="3">
          <LeftAction 
          :dataPrepareID="dataPrepare"
          @readDataPrepare="readDataPrepare"
          :dataMainTableID="dataMainTable"
          @readDataMainTable="readDataMainTable" />
        </v-col>

        <!-- <v-col cols="14" md="9">
          <MainTable :dataMainTable="dataMainTable" />
        </v-col> -->

        <v-col cols="14" md="9">
          <v-data-table
            :headers="headers"
            :items="dataMainTable"
            class="elevation-1"
            disable-pagination
            :height="height"
            calculate-widths
            hide-default-footer>
          </v-data-table>
        </v-col>
      </v-row>  
    </v-container>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar.vue";
import LeftAction from "./components/left-action.vue";
import header from "./table-column/table-column-main";
// import MainTable from "./components/main-table.vue";

export default {
  name: "Drugstore-Report",
  components: {
    NavBar,
    LeftAction
    // MainTable
  },
  data() {
    return {
      height: window.innerHeight - 37,
      isLoading: false,
      dataPrepare: {},
      dataMainTable: [],
      headers: header(),
      dataTest: { key: "data in parent" }
    };
  },
  methods: {
    readDataPrepare(dataPrepareID) {
      console.log(dataPrepareID, "read data prepare");

      this.headers[2]["text"] = dataPrepareID.bezeich1;
      this.headers[4]["text"] = dataPrepareID.bezeich2;
      this.headers[6]["text"] = dataPrepareID.bezeich3;
      this.headers[8]["text"] = dataPrepareID.bezeich4;
      this.headers[10]["text"] = dataPrepareID.bezeich5;
      this.headers[12]["text"] = dataPrepareID.bezeich6;
    },
    readDataMainTable(dataMainTable) {
      if (dataMainTable != undefined) {

        if (dataMainTable.isSuccess && !dataMainTable.isLoading) {
          this.dataMainTable = [];
        }
        const sList = dataMainTable.sList["s-list"];

        for(let i = 0; i<sList.length; i++) {
          const dataRow = {};
          const dataItem = sList[i];

          dataRow["zinr"] = dataItem["zinr"];
          dataRow["gname"] = dataItem["gname"];
          dataRow["qty1"] = dataItem["anzahl"][0];
          dataRow["qty2"] = dataItem["anzahl"][1];
          dataRow["qty3"] = dataItem["anzahl"][2];
          dataRow["qty4"] = dataItem["anzahl"][3];
          dataRow["qty5"] = dataItem["anzahl"][4];
          dataRow["qty6"] = dataItem["anzahl"][5];
          dataRow["qty7"] = dataItem["tanz"];
          dataRow["totamount"] = dataItem["tamount"];
          dataRow["id"] = dataItem["userinit"];
          dataRow["laundry_genttlement"] = dataItem["amount"][0];
          dataRow["dry_clean_genttlement"] = dataItem["amount"][1];
          dataRow["pressing_genttlement"] = dataItem["amount"][2];
          dataRow["laundry_ladies"] = dataItem["amount"][3];
          dataRow["dry_clean_ladies"] = dataItem["amount"][4];
          dataRow["pressing_laddies"] = dataItem["amount"][5];
          
          this.dataMainTable.push(dataRow);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
