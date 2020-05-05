<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <!-- <v-row style='visibility:visible'>
        <v-card
        
          :height="height"
          :width="weight">
          <v-progress-circular
            indeterminate
            color="primary">
          </v-progress-circular>
        </v-card>
      </v-row> -->

      <v-row style='visibility:visible'>
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

        <v-col id="FocRooms" cols="14" md="9">
          <v-data-table
            :headers="headers"
            :items="dataMainTable"
            class="elevation-3"
            disable-pagination
            :height="height"
            calculate-widths
            fixed-header
            dense
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
import ProgramProperties from "@/vhp-modules/outlet/outlet-utils/OutletProgramProperties.vue";

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
      programProperties: [],
      height: window.innerHeight - 37,
      weight: window.innerWidth,
      isLoading: false,
      dataPrepare: {},
      dataMainTable: [],
      headers: header(),
      dataTest: { key: "data in parent" }
    };
  },
  methods: {
    readDataPrepare(dataPrepareID) {
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
          dataRow["totamount"] = this.formatterMoney(dataItem["tamount"]);
          dataRow["id"] = dataItem["userinit"];
          dataRow["laundry_genttlement"] = this.formatterMoney(dataItem["amount"][0]);
          dataRow["dry_clean_genttlement"] = this.formatterMoney(dataItem["amount"][1]);
          dataRow["pressing_genttlement"] = this.formatterMoney(dataItem["amount"][2]);
          dataRow["laundry_ladies"] = this.formatterMoney(dataItem["amount"][3]);
          dataRow["dry_clean_ladies"] = this.formatterMoney(dataItem["amount"][4]);
          dataRow["pressing_laddies"] = this.formatterMoney(dataItem["amount"][5]);
          
          this.dataMainTable.push(dataRow);
        }
      }
    }
  }, 
  mounted() {
    this.programProperties = ProgramProperties.data();
  }
};
</script>

<style lang="scss">
$primary: #1890ff;

// Override Vuetify styles only in Foc Module
#FocLeft .theme--light.v-input input,
.theme--light.v-input textarea {
  color: $primary;
  line-height: 1rem;
}

#FocRooms .v-data-table td {
  height: 30px;
}

#FocRooms .v-data-table th {
  background: linear-gradient(#1488cc, #2b32b2);
  color: #ffffff;
  height: 40px;
}

#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon {
  color: #ffffff;
  margin-left: 5px;
}

#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon {
  color: rgba(255, 255, 255, 0.4);
  margin-left: 5px;
}

#FocRooms tbody tr:nth-of-type(even) {
  background-color: #c8e0f1a3;
}
</style>
