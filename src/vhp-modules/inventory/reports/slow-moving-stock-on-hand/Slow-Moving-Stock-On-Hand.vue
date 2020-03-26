<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-autocomplete
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="selected"
            :items="storeNumber"
            item-text="label"
            item-value="value"
            label="Store Number"
            outlined
            dense
          ></v-autocomplete>

          <v-text-field v-model="day" label="Days" type="number" outlined dense></v-text-field>
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
    mainGroup: [],
    storeNumber: [],
    ranges: ["2019-09-10", "2019-09-20"],
    datas: [],
    showPrice: "",
    select: "",
    selected: "",
    day: "",
    headers: [
      {
        text: "Article Number",
        align: "start",
        value: "artnr"
      },
      { text: "Name", value: "name" },
      { text: "Minimum On Hand", value: "min-oh" },
      { text: "Current On Hand", value: "curr-oh" },
      { text: "Average Price", value: "avrgprice" },
      { text: "Actual Price", value: "ek-aktuell" },
      {
        text: "Last Purchase Date",
        value: "datum"
      }
    ]
  }),
  beforeCreate() {
    (async () => {
      const data = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/slowMovingPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                LnLProg: " "
              }
            }
          }
        )
        .json();

      this.showPrice = data.response.showPrice;
      const tempMainGroup = data.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }
      const tempStoreNumber = data.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStoreNumber.length; i++) {
        const element = tempStoreNumber[i];
        this.storeNumber.push({
          value: element["lager-nr"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }

      //=> `{data: '🦄'}`
    })();
  },
  computed: {
    // computedDateFormattedMomentjs() {
    //   return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    // }
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },
  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/slowMovingList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  storeNo: this.selected,
                  mainGrp: this.select,
                  tage: this.day != "" ? this.day : 0,
                  showPrice: this.showPrice
                }
              }
            }
          )
          .json();
        const pbookList = parsed.response.sList["s-list"];

        this.datas = pbookList;
      })();
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
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
