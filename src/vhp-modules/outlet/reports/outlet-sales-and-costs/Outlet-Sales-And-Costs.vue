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
  name: "Outlet-Sales-And-Costs",
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
        const salecostlist = dataMainTable.outputList["fb-cost-report"];

        for(let i = 0; i<salecostlist.length; i++) {
          const dataRow = {};
          const dataItem = salecostlist[i];

          dataRow["department"] = dataItem["departement"];
          dataRow["qty"] = dataItem["departement"] == "" ? "" : dataItem["qty"];
          dataRow["sales"] = dataItem["sales"];
          dataRow["qty2"] = dataItem["departement"] == "" ? "" : dataItem["qty2"];
          dataRow["cost"] = dataItem["cost"];
          dataRow["comp"] = dataItem["compliment"];
          dataRow["tcost"] = dataItem["t-cost"];
          dataRow["ratio"] = dataItem["ratio"];
          dataRow["mqty"] = dataItem["departement"] == "" ? "" : dataItem["m-qty"];
          dataRow["msales"] = dataItem["m-sales"];
          dataRow["mcost"] = dataItem["m-cost"];
          dataRow["mqty2"] = dataItem["departement"] == "" ? "" : dataItem["m-qty2"];
          dataRow["comp2"] = dataItem["compliment2"];
          dataRow["tcost2"] = dataItem["t-cost2"];
          dataRow["ratio2"] = dataItem["ratio2"];

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
