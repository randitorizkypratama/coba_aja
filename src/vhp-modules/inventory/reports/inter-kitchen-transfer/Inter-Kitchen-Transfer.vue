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
              class="elevation-3"
              disable-pagination
              disable-sort
              hide-default-footer
              fixed-header
              calculate-widths
              dense
            ></v-data-table>
          </div>
        </v-col>
        <v-col cols="1" class="rightmenu">
          <RightMenu />
        </v-col>
      </v-row>
    </v-container>
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
    Department: [],
    ranges: ["2019-01-13", "2019-01-13"],
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
      { text: "From Storage", value: "artnr", width: 80, divider: true },
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
      { text: "Beverage Cost", value: "amount", width: 100, divider: true },
      { text: "Document Number", value: "docu-no", width: 120, divider: true },
      { text: "ID", value: "ID", divider: true },
      { text: "Delivery Note", value: "deliv-note", width: 100, divider: true },
      { text: "Invoice Number", value: "invoice-nr", divider: true }
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
                  sorttype: "1",
                  fromDept: "1",
                  toDept: "2",
                  fromDate: "2019-01-13",
                  toDate: "2019-01-13"
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
