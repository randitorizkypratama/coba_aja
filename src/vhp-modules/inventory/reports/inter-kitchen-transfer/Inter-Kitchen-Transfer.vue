<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateRangeText"
                clearable
                label="Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-model="fromdepartment"
            :items="Department"
            item-text="label"
            item-value="value"
            label="From Department"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="todepartment"
            :items="Department"
            item-text="label"
            item-value="value"
            label="To Department"
            outlined
            dense
          ></v-autocomplete>

          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="From Outlet" value="1"></v-radio>
            <v-radio label="To Outlet" value="2"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click="cari" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Search
          </v-btn>
        </v-col>

        <v-col cols="9" class="pr-0 pl-5">
          <div id="FocRooms">
            <v-data-table
              :headers="headers"
              :items="datas"
              item-key="name"
              :height="height"
              class="elevation-1"
              disable-pagination
              disable-sort
              hide-default-footer
              fixed-header
              calculate-widths
              dense
            >
              <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Question</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <span class="headline">{{ formMessage(test) }}</span>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="red darken-1" text @click="deleteItem(test)">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-menu bottom offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    <v-icon small @click="checkpermission(item)">mdi-delete</v-icon>DELETE
                  </v-list>
                </v-menu>
              </template>
              <template
                v-slot:item.datum="{ item }"
              >{{item.datum == null? " " : formatDate(item.datum) }}</template>
              <template v-slot:item.artnr="{ item }">{{ item.artnr == 0 ? " " : item.artnr }}</template>
              <template v-slot:item.bezeich="{ item }">
                {{
                item.bezeich == "T O T A L"
                ? "SubTotal"
                : item.bezeich == "GRAND TOTAL"
                ? "Total"
                : item.bezeich
                }}
              </template>
            </v-data-table>
          </div>
        </v-col>
        <v-col cols="1" class="rightmenu">
          <RightMenu />
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ messStr }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import ky from "ky";
import moment from "moment";
import RightMenu from "@/components/RightMenu.vue";

export default {
  components: {
    NavBar,
    RightMenu
  },
  data: () => ({
    height: 550,
    items: [],
    snackbar: false,
    fdate: "",
    zugriff: "",
    messStr: "",
    Department: [],
    ranges: ["2019-01-13", "2019-01-14"],
    datas: [],
    fromDate: "",
    toDate: "",
    fromdepartment: 1,
    todepartment: 14,
    checkbox1: false,
    menu1: false,
    depname1: "",
    depname2: "",
    fromDept: "",
    toDept: "",
    radios: "",
    dialog: false,
    editedIndex: -1,
    test: "",
    headers: [
      {
        text: "Date",
        align: "start",
        value: "datum",
        width: "110",
        divider: true
      },
      { text: "Transfer From", value: "dept1", width: "70", divider: true },
      { text: "Transfer To", value: "dept2", width: 250, divider: true },
      { text: "From Storage", value: " ", width: 80, divider: true },
      {
        text: "Article Number",
        value: "artnr",
        width: 120,
        divider: true
      },
      { text: "Description", value: "bezeich", width: 70, divider: true },
      { text: "Food-Cost", value: "f-cost", width: 100, divider: true },
      {
        text: "Beverage-Cost ",
        value: "b-cost",
        width: 100,
        divider: true
      },
      { text: " ", value: "actions", sortable: false, width: 30 }
    ]
  }),
  beforeCreate() {
    (async () => {
      const prepare = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/ktransReportPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                minDept: "99",
                maxDept: "0"
              }
            }
          }
        )
        .json();

      this.fromDate = prepare.response.fromDate;
      this.toDate = prepare.response.toDate;
      this.fromDept = prepare.response.fromDept;
      this.toDept = prepare.response.toDept;
      this.depname1 = prepare.response.depname1;
      this.depname2 = prepare.response.depname1;
      const tempDepartment = prepare.response.tHoteldpt["t-hoteldpt"];
      for (let i = 0; i < tempDepartment.length; i++) {
        const element = tempDepartment[i];
        this.Department.push({
          value: element["num"],
          label: element["depart"]
        });
      }

      const permission = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/Common/checkPermission", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              userInit: "01",
              arrayNr: "41",
              expectedNr: "2"
            }
          }
        })
        .json();
      this.zugriff = permission.response.zugriff;
      this.messStr = permission.response.messStr;

      const Param0 = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/Common/getHTParam0", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              casetype: "2",
              inpParam: "1035"
            }
          }
        })
        .json();
      this.fdate = Param0.response.fdate;
    })();
  },
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },
  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/ktransReportList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  sorttype: this.radios,
                  fromDept: this.fromdepartment,
                  toDept: this.todepartment,
                  fromDate: moment(this.ranges[0]).format("YYYY-MM-DD"),
                  toDate: moment(this.ranges[1]).format("YYYY-MM-DD")
                }
              }
            }
          )
          .json();

        const pbookList = parsed.response.cList["c-list"];

        this.datas = pbookList;
      })();
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    formatNumber(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    formMessage(test) {
      return test.datum <= this.fdate
        ? "Inventory transferred to G/L - Cancel no longer possible."
        : "Do you really want to cancel the transfer records ?";
    },
    checkpermission(item) {
      console.log(this.zugriff, "masuk");

      if (this.zugriff == "true") {
        console.log("udah");
        this.test = item;
        console.log(item, "item");
        this.editedIndex = this.datas.indexOf(item);
        this.dialog = true;
      } else {
        this.snackbar = true;
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedIndex = -1;
      }, 300);
    },
    deleteItem(test) {
      console.log(test["s-recid"], "test");

      (async () => {
        const delet = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/ktransReportDelete",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  cListSRecid: "1"
                }
              }
            }
          )
          .json();
        console.log(delet.response.successFlag, "berhasil?");

        this.dialog = false;
        setTimeout(() => {
          this.editedIndex = -1;
        }, 300);
      })();
    }
  }
};
</script>

<style lang="sass" scoped>
.main
  height: 100vh

.leftmenu
  border-right: 1px #2887d2 solid
  box-shadow: 0px 0px 7px 0px #00000038

.rightmenu
  padding: 0
  display: flex
  flex-direction: row
  justify-content: flex-end

.v-text-field
  height: 50px

.v-input--selection-controls
  margin-top: 0px
  padding-top: 0px

#FocRooms .v-data-table td
  height: 30px


#FocRooms .v-data-table th 
  background: linear-gradient(#1488cc, #2b32b2)
  color: #ffffff
  height: 40px


#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon
    color: #ffffff
    margin-left: 5px


#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon
    color: rgba(255, 255, 255, 0.4)
    margin-left: 5px


#FocRooms tbody tr:nth-of-type(even)
  background-color: #c8e0f1a3
</style>
