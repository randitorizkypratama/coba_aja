<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row style='visibility:visible'>
        <v-col cols="4" md="3">
          <LeftAction
            :dataMainTableID="dataMainTable"
            @readDataMainTable="readDataMainTable" />
        </v-col>
        
        <v-col id="FocRooms" cols="14" md="9">
          <v-data-table
            :headers="headersMainTable"
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
import moment from "moment";

export default {
  name: "OutletTurnover",
  components: {
    NavBar,
    LeftAction
  },
  data() {
    return {
      programProperties: [],
      height: window.innerHeight - 37,
      weight: window.innerWidth,
      dataMainTable: [],
      headersMainTable: header(),
    };
  },
  methods: {
    readDataMainTable(dataMainTable) {
      if (dataMainTable != undefined) {
        if (dataMainTable.isSuccess && !dataMainTable.isLoading) {
          this.dataMainTable = [];
        }
        
        const dataTable = dataMainTable.turnReportlist['turn-reportlist'];
        for (let i=0; i<dataTable.length; i++) {
            dataTable[i]["artno"] = dataTable[i]["artno"] == "0" ? "" : dataTable[i]["artno"]; 

            dataTable[i]["day-gros"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["day-gros"]);
            dataTable[i]["day-net"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["day-net"]);
            dataTable[i]["day-proz"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["day-proz"]);
            dataTable[i]["todate-gros"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["todate-gros"]);
            dataTable[i]["todate-proz"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["todate-proz"]);
            dataTable[i]["todate-net"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : this.formatterMoney(dataTable[i]["todate-net"]);
            dataTable[i]["mqty"] = (dataTable[i]["artno"] == "" && dataTable[i]["descr"] == "") ? "" : dataTable[i]["mqty"];
        }
        this.dataMainTable = dataTable;
      }
    }
  }, 
  mounted() {
    this.programProperties = ProgramProperties.data();
  }
}
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

.header-modal {
  background : #2b32b2;
  color: #ffffff;
}

>>>.v-table__overflow {
    height:99.9%;
    max-height:99.9%;
    overflow-x: auto !important;
}
</style>
