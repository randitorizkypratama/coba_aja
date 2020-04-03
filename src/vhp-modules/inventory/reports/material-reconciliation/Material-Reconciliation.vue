<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-model="Store"
            :items="storeselect"
            item-text="label"
            item-value="value"
            label="Store"
            outlined
            dense
          ></v-autocomplete>

          <v-autocomplete
            v-model="fromMainGroup"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="From Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="toMainGroup"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="To Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-radio-group v-model="radios" :mandatory="false">
            Order By
            <v-radio label="By Inventory Account" value="1"></v-radio>
            <v-radio label="By Description" value="2"></v-radio>
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
              <template v-slot:item.datum="{ item }">
                {{
                formatDate(item.datum)
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
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import RightMenu from "@/components/RightMenu.vue";
import ky from "ky";
import moment from "moment";

export default {
  components: {
    NavBar,
    RightMenu
  },
  data: () => ({
    height: 550,
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    toMainGroup: "",
    fromMainGroup: "",
    Store: "",
    mainGroup: [],
    storeselect: [],
    radios: "",
    datas: [],
    headers: [
      {
        text: "Inventory Account",
        align: "start",
        value: "inv-acct",
        divider: true
      },
      { text: "Description", value: "bezeich", divider: true },
      { text: "Opening Value", value: "prevval", divider: true },
      { text: "Incoming Value", value: "inval", divider: true },
      { text: "Consumed Value", value: "outval", divider: true },
      { text: "Ending Value", value: "actval", divider: true },
      {
        text: "Initial On Hand Adjustment",
        value: "adjust",
        divider: true
      }
    ]
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD-MM-YYYY") : "";
    }
  },
  beforeCreate() {
    (async () => {
      const data = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/matReconsilePrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata"
              }
            }
          }
        )
        .json();

      const tempMainGroup = data.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
      }

      const tempStore = data.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStore.length; i++) {
        const element = tempStore[i];
        this.storeselect.push({
          value: element["lager-nr"],
          label: element["bezeich"]
        });
      }
    })();
  },
  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/matReconsileList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  pvILanguage: "1",
                  toDate: moment(this.date).format("YYYY/MM/DD"),
                  lagerNo: this.Store == undefined ? 0 : this.Store,
                  fromMain: this.fromMainGroup,
                  toMain: this.toMainGroup,
                  sortType: this.radios
                }
              }
            }
          )
          .json();

        const pbookList = parsed.response.artBestand["art-bestand"];

        this.datas = pbookList;
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
