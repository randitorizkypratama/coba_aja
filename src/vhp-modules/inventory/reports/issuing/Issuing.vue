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
            v-model="fromStore"
            :items="fromstoreselect"
            item-text="label"
            item-value="value"
            label="From Store Number"
            outlined
            dense
          ></v-autocomplete>

          <v-autocomplete
            v-model="toStore"
            :items="tostoreselect"
            item-text="label"
            item-value="value"
            label="To Store Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="fromArticle"
            :items="fromarticleselect"
            item-text="label"
            item-value="value"
            label="From Article Number"
            outlined
            dense
          ></v-autocomplete>

          <v-autocomplete
            v-model="toArticle"
            :items="toarticleselect"
            item-text="label"
            item-value="value"
            label="To Article Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="MainGroup"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="CostAllocation"
            :items="costAllocation"
            item-text="label"
            item-value="value"
            label="Cost Allocation"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="TransferCode"
            :items="transferCode"
            item-text="label"
            item-value="value"
            label="Transfer Code"
            outlined
            dense
          ></v-autocomplete>
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
    ranges: [],
    menu1: false,
    tostoreselect: [],
    fromstoreselect: [],
    toarticleselect: [],
    fromarticleselect: [],
    fromArticle: "",
    toArticle: "",
    MainGroup: "",
    mainGroup: [],
    CostAllocation: "",
    costAllocation: [],
    TransferCode: "",
    transferCode: [],
    date: new Date().toISOString().substr(0, 10),
    headers: [
      {
        text: "Date",
        align: "start",
        value: "datum",
        width: "110",
        divider: true
      },
      { text: "Storage", value: "dept1", width: "70", divider: true },
      { text: "Document Number", value: "dept2", width: 250, divider: true },
      { text: "Article", value: " ", width: 80, divider: true },
      {
        text: "Description",
        value: "artnr",
        width: 120,
        divider: true
      },
      { text: "Outgoing Quantity", value: "bezeich", width: 70, divider: true },
      { text: "Average Price", value: "f-cost", width: 100, divider: true },
      {
        text: "Amount",
        value: "b-cost",
        width: 100,
        divider: true
      },
      {
        text: "ID",
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
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/stockOutlistPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                LnLProg: "stock-outlist.lst"
              }
            }
          }
        )
        .json();

      const tempMainGroup = prepare.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
      }
      const tempAlloc = prepare.response.tParameters["t-parameters"];
      for (let i = 0; i < tempAlloc.length; i++) {
        const element = tempAlloc[i];
        this.costAllocation.push({
          value: element["varname"],
          label: element["vstring"]
        });
      }
    })();
  },
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
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
