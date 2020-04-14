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
            <template v-slot:item.actions="{ item }">
              <div v-if="item.rechnr != 0">
                <v-menu bottom offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(list, i) in itemforlist" :key="i" @click="openDetail(item)">
                      <v-list-item-title>{{ list.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>  

      <v-row justify="center">
        <!-- <v-dialog v-model="dialog" scrollable max-width="1024px"> Bugs ?? -->
        <v-dialog v-model="dialog" scrollable width="1024px">
          <v-card>
          <v-card-title class="header-modal">Restaurant Bill Details #{{dataRowDetail.rechnr}}</v-card-title>
          <v-divider></v-divider>
          <v-col id="FocRooms">
              <v-data-table
                :headers="headersDetailMainTable"
                :items="dataDetailMainTable.data"
                class="elevation-3"
                disable-pagination
                calculate-widths
                fixed-header
                dense
                hide-default-footer>
              </v-data-table>
            </v-col>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row> 
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import LeftAction from "./components/left-action.vue";
import header from "./table-column/table-column-main";
import headerDetail from "./table-column/table-column-detail";
import ProgramProperties from "@/vhp-modules/outlet/outlet-utils/OutletProgramProperties.vue";
import moment from "moment";
import ky from "ky";

export default {
  name: "CancellationJournal",
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
      dataDetailMainTable: [],
      headersMainTable: header(),
      headersDetailMainTable: headerDetail(),
      dataRowDetail: {},
      dialog: false,
      itemforlist: [{title: "Detail"}]
    };
  },
  methods: {
    openDetail(item) {
      this.dataRowDetail = item;
      this.getDataDetail();
    },
    readDataMainTable(dataMainTable) {
      if (dataMainTable != undefined) {
        if (dataMainTable.isSuccess && !dataMainTable.isLoading) {
          this.dataMainTable = [];
        }
        
        const dataTable = dataMainTable.cancelJournal['cancel-journal'];
        for (let i=0; i<dataTable.length; i++) {
            dataTable[i]["dbilldate"] = dataTable[i]["billdate"],
            dataTable[i]["billdate"] = moment(dataTable[i]["billdate"]).format(this.programProperties.formatDateRead);
            dataTable[i]["amount"] = this.formatterMoney(dataTable[i]["amount"]);
        }
        this.dataMainTable = dataMainTable.cancelJournal['cancel-journal'];
           
      }
    },
    getDataDetail() {
      this.dataDetailMainTable = {};

      this.dataDetailMainTable["isLoading"] = true;
      this.dataDetailMainTable["isSuccess"] = true;

      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/cancelJournDispBill", {
          method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              dept: this.dataRowDetail.dept,
              billdate: moment(this.dataRowDetail.dbilldate).format(this.programProperties.formateDateRequest),
              rechNo: this.dataRowDetail.rechnr
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/cancelJournDispBill", "URL End Point ");

        if (!response.ok) {
          this.dataDetailMainTable["isSuccess"] = false;
          this.dataDetailMainTable["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataDetailMainTable = parsed.response;
          this.dataDetailMainTable["isSuccess"] = true;
          this.dataDetailMainTable["isLoading"] = false;

          const dataTableDetail = parsed.response.hjBuff["hj-buff"];
          for (let i=0; i<dataTableDetail.length; i++) {
              dataTableDetail[i]["epreis"] = this.formatterMoney(dataTableDetail[i]["epreis"]);
              dataTableDetail[i]["betrag"] = this.formatterMoney(dataTableDetail[i]["betrag"]);
              dataTableDetail[i]["bill-datum"] = moment(dataTableDetail[i]["bill-datum"]).format(this.programProperties.formatDateRead);
              dataTableDetail[i]["zeit"] = this.displayTime(dataTableDetail[i]["zeit"]);
          } 
          this.dataDetailMainTable["data"] = dataTableDetail;

          this.dialog = true;
          console.log(this.dataDetailMainTable, "Response /cancelJournDispBill ");
        }
      })();
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
