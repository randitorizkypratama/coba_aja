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
            @click:row="dialog = !dialog"
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
import moment from "moment";
import ProgramProperties from "@/vhp-modules/outlet/outlet-utils/OutletProgramProperties.vue";

export default {
  name: "Meal-Coupon",
  components: {
    NavBar,
    LeftAction
  },
  data() {
    return {
      programProperties:[],
      height: window.innerHeight - 37,
      weight: window.innerWidth,
      dataMainTable: [],
      headers: header(),
      dialog: false
    };
  },
  methods: {
    readDataMainTable(dataMainTable) {
      if (dataMainTable != undefined) {
        if (dataMainTable.isSuccess && !dataMainTable.isLoading) {
          this.dataMainTable = [];
        }
        
        const tempDataMainTable = dataMainTable.mlist['mlist'];   
 
        for (let i = 0; i<tempDataMainTable.length; i++) {
            const dataRow = {};
            const dataItem = tempDataMainTable[i];

            dataRow["resnr"] = dataItem["resnr"];
            dataRow["zinr"] = dataItem["zinr"];
            dataRow["name"] = dataItem["name"];
            dataRow["anzahl"] = dataItem["anzahl"];
            dataRow["ankunft"] = moment(dataItem["ankunft"]).format(this.programProperties.formatDateRead);
            dataRow["abreise"] = moment(dataItem["abreise"]).format(this.programProperties.formatDateRead);
            dataRow["resnr"] = dataItem["resnr"];
            dataRow["used"] = dataItem["verbrauch"][31];
            

            for (let x = 0; x<32; x++) {
                dataRow['verbrauch' + (x + 1)] = dataItem['verbrauch'][x];
            }
            this.dataMainTable.push(dataRow);
        }
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
</style>
