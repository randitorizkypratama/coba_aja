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

      <!-- <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
        <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="dialogm1" column>
            <v-radio label="Bahamas, The" value="bahamas"></v-radio>
            <v-radio label="Bahrain" value="bahrain"></v-radio>
            <v-radio label="Bangladesh" value="bangladesh"></v-radio>
            <v-radio label="Barbados" value="barbados"></v-radio>
            <v-radio label="Belarus" value="belarus"></v-radio>
            <v-radio label="Belgium" value="belgium"></v-radio>
            <v-radio label="Belize" value="belize"></v-radio>
            <v-radio label="Benin" value="benin"></v-radio>
            <v-radio label="Bhutan" value="bhutan"></v-radio>
            <v-radio label="Bolivia" value="bolivia"></v-radio>
            <v-radio label="Bosnia and Herzegovina" value="bosnia"></v-radio>
            <v-radio label="Botswana" value="botswana"></v-radio>
            <v-radio label="Brazil" value="brazil"></v-radio>
            <v-radio label="Brunei" value="brunei"></v-radio>
            <v-radio label="Bulgaria" value="bulgaria"></v-radio>
            <v-radio label="Burkina Faso" value="burkina"></v-radio>
            <v-radio label="Burma" value="burma"></v-radio>
            <v-radio label="Burundi" value="burundi"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import LeftAction from "./components/left-action.vue";
import header from "./table-column/table-column-main";

export default {
  name: "Meal-Coupon",
  components: {
    NavBar,
    LeftAction
  },
  data() {
    return {
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
            dataRow["ankunft"] = dataItem["ankunft"];
            dataRow["abreise"] = dataItem["abreise"];
            dataRow["resnr"] = dataItem["resnr"];
            dataRow["used"] = dataItem["verbrauch"][31];
            

            for (let x = 0; x<32; x++) {
                dataRow['verbrauch' + (x + 1)] = dataItem['verbrauch'][x];
            }
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
