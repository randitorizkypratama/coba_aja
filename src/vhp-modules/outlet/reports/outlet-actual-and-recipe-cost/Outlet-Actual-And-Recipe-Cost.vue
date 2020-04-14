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

export default {
  name: "Outlet-Actual-And-Cost",
  components: {
    NavBar,
    LeftAction
  },
  data() {
    return {
      height: window.innerHeight - 37,
      weight: window.innerWidth,
      dataMainTable: [],
      headers: header()
    };
  },
  methods: {
    readDataMainTable(dataMainTable) {
      if (dataMainTable != undefined) {

        if (dataMainTable.isSuccess && !dataMainTable.isLoading) {
          this.dataMainTable = [];
        }
        const salecostlist = dataMainTable.sList["s-list"];

        for(let i = 0; i<salecostlist.length; i++) {
          const dataRow = {};
          const dataItem = salecostlist[i];

          dataRow["artnr"] = dataItem["artnr"];
          dataRow["bezeich"] = dataItem["bezeich"];
          dataRow["d-qty"] = dataItem["d-qty"];
          dataRow["d-val"] = dataItem["d-val"];
          dataRow["munit"] = dataItem["munit"];
          dataRow["qty1"] = dataItem["qty1"];
          dataRow["qty2"] = dataItem["qty2"];
          dataRow["sQty1"] = dataItem["s-qty1"];
          dataRow["sQty2"] = dataItem["s-qty2"];
          dataRow["sQty3"] = dataItem["s-qty3"];
          dataRow["mcost"] = dataItem["m-cost"];
          dataRow["val1"] = dataItem["val1"];
          dataRow["val2"] = dataItem["val2"];
          
          this.dataMainTable.push(dataRow);
        }
      }
    }
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
</style>
