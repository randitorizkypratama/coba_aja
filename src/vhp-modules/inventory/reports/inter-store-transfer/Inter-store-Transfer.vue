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
            v-model="MainGroup"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>

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
            v-model="fromArticlegroup"
            :items="Articlegroup"
            item-text="label"
            item-value="value"
            label="From Article Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="toArticlegroup"
            :items="Articlegroup"
            item-text="label"
            item-value="value"
            label="To Article Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="display"
            :items="displayList"
            item-text="label"
            item-value="value"
            label="Display"
            outlined
            dense
          ></v-autocomplete>
          <v-text-field v-model="transfer" label="Transfer Code" single-line dense outlined></v-text-field>
          <v-radio-group v-model="radios" :mandatory="false">
            Order By
            <v-radio label="By Date" value="1"></v-radio>
            <v-radio label="By Description" value="2"></v-radio>
          </v-radio-group>
          <v-checkbox v-model="checkbox1" label="User Unit Expenses"></v-checkbox>
          <v-checkbox v-model="checkbox2" label="Print Without Amounts"></v-checkbox>
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
              <template v-slot:item.datum="{ item }">{{ formatDate(item.datum) }}</template>
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
    ranges: [],
    display: "",
    toArticlegroup: "",
    fromArticlegroup: "",
    MainGroup: "",
    Store: "",
    mainGroup: [],
    Articlegroup: [],
    storeselect: [],
    radios: "",
    menu1: false,
    datas: [],
    transfer: "",
    checkbox1: false,
    checkbox2: false,
    showPriceprepare: "",
    displayList: [
      {
        label: "Material & Engineering Articles",
        value: 0
      },
      {
        label: "Material Articles Only",
        value: 1
      },
      {
        label: "Engineering Articles Only",
        value: 2
      }
    ],
    headers: [
      {
        text: "Date",
        align: "start",
        value: "datum",
        divider: true
      },
      { text: "Delivery Number", value: "lscheinnr", divider: true },
      { text: "From Storage", value: "f-bezeich", divider: true },
      { text: "To Storage", value: "t-bezeich", divider: true },
      { text: "Article", value: "artnr", divider: true },
      { text: "Description", value: "bezeich", divider: true },
      { text: "Unit", value: "einheit", divider: true },
      { text: "Content", value: "content", divider: true },
      { text: "Average Price", value: "price", divider: true },
      { text: "Quantity", value: "qty", divider: true },
      { text: "Amount", value: "val", divider: true },
      { text: "ID", value: "id", divider: true }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },
  beforeCreate() {
    (async () => {
      const data = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/transValidationPrepare",
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

      this.showPriceprepare = data.response.showPrice;

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

      const article = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/getHelpInvArticle",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                currLager: 0,
                recipe: false,
                sorttype: 0,
                sArtnr: 0,
                sBezeich: " "
              }
            }
          }
        )
        .json();

      const tempArticle = article.response.sartnrList["sartnr-list"];
      for (let i = 0; i < tempArticle.length; i++) {
        const element = tempArticle[i];
        this.Articlegroup.push({
          value: element["artnr"],
          label: element["bezeich"]
        });
      }
    })();
  },
  methods: {
    cari() {
      console.log(moment(this.ranges[1]).format("YYYY/MM/DD"), "transfer");

      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/transValidationList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  transCode: this.transfer == "" ? " " : this.transfer,
                  mGrp:
                    this.MainGroup == undefined || this.MainGroup.length == 0
                      ? 0
                      : this.MainGroup,
                  sorttype: this.radios,
                  mStr:
                    this.Store === undefined || this.Store.length === 0
                      ? 0
                      : this.Store,
                  mattype: this.display,
                  fromArt: this.fromArticlegroup,
                  toArt: this.toArticlegroup,
                  fromDate: moment(this.ranges[0]).format("YYYY-MM-DD"),
                  toDate: moment(this.ranges[1]).format("YYYY-MM-DD"),
                  showPrice: this.showPriceprepare,
                  expenseAmt: this.checkbox2
                }
              }
            }
          )
          .json();

        const pbookList = parsed.response.tList["t-list"];

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

.v-text-field
  height: 50px

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
