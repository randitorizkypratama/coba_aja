<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-autocomplete
            v-model="fromdepartment"
            :items="Department"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" label="Date" readonly outlined dense v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <span>Data Type</span>
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Quantity" value="1"></v-radio>
            <v-radio label="Average Price" value="2"></v-radio>
            <v-radio label="Amount" value="3"></v-radio>
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
            ></v-data-table>
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
    Department: [],
    datas: [],
    checkbox1: false,
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    radios: "",
    headers: [
      {
        text: "Article Number",
        align: "start",
        value: "datum",
        width: "110",
        divider: true
      },
      { text: "Description", value: "dept1", width: "70", divider: true },
      { text: "January", value: "dept2", width: 250, divider: true },
      { text: "February", value: " ", width: 80, divider: true },
      {
        text: "March",
        value: "artnr",
        width: 120,
        divider: true
      },
      { text: "April", value: "bezeich", width: 70, divider: true },
      { text: "May", value: "f-cost", width: 100, divider: true },
      {
        text: "June",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "July",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "August",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "September",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "October",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "November",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "December",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "Total",
        value: "b-cost",
        width: 100,
        divider: true
      }
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
