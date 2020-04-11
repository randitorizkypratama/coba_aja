<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateRangeText"
                clearable
                label="Date"
                readonly
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-model="fromStorage"
            :items="storage"
            item-value="value"
            item-text="label"
            label="Select Storage"
            dense
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-model="toStorage"
            :items="storage"
            item-value="value"
            item-text="label"
            label="Select Storage"
            dense
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-model="fromArticle"
            :items="article"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-model="toArticle"
            :items="article"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-model="sortBy"
            :items="items"
            item-value="value"
            item-text="label"
            label="Sort by"
            dense
            outlined
          ></v-autocomplete>
          <v-btn
            class="mb-3"
            color="primary"
            @click="search"
            block
            depressed
            large
          >
            <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="12" md="9">
          <div id="FreeStyler">
            <v-data-table
              :headers="headers"
              :items="datas"
              item-key="artnr"
              class="elevation-1"
              disable-pagination
              disable-sort
              hide-default-footer
              fixed-header
              calculate-widths
              dense
            >
              <template v-slot:item.bezeich="{ item }">
                <div align="left">{{ item.bezeich == "TOTAL" ? "Subtotal" : item.bezeich == "GRAND TOTAL" ? "Total" : item.bezeich }}</div>
              </template>
              <template v-slot:item.qty="{ item }">
                <div align="right">{{ formatNumber(item['qty'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.val="{ item }">
                <div align="right">{{ formatNumber(item['val'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.t-qty="{ item }">
                <div align="right">{{ formatNumber(item['t-qty'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.t-val="{ item }">
                <div align="right">{{ formatNumber(item['t-val'].toFixed(2)) }}</div>
              </template>
            </v-data-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import moment from "moment";
import MonthIn from "@/api/inventory/report/monthly-incoming.api";

let htlUrl = "";
const requestBody = {
  inputUserkey: "",
  inputUsername: "",
  sorttype: "2",
  sortBy: "",
  fromArticle: "",
  toArticle: "",
  fromDate: "",
  toDate: "",
  fromStore3: "",
  toStore3: "",
  fromGrp: "0",
  toGrp: "999",
  lastArt: "*",
  lastArt1: "?"
};

export default {
  components: {
    NavBar
  },
  mounted() {
    const tUkey = JSON.parse(localStorage.getItem("login"));
    const ukey = tUkey.response.userKey;
    const tUname = JSON.parse(localStorage.getItem("username"));
    const uname = tUname.substring(0, tUname.indexOf("@"));
    htlUrl = tUkey.response.htlUrl;
    requestBody.inputUserkey = ukey;
    requestBody.inputUsername = uname;
    this.loadStorage();
    this.loadArticle();
  },
  data: () => {
    return {
      headers: [
        { divider: true, text: "Storage", align: "center", value: "f-bezeich" },
        { divider: true, text: "Article Number", align: "center", value: "artnr" },
        { divider: true, text: "Description", align: "center", value: "bezeich" },
        { divider: true, text: "Unit", align: "center", value: "einheit" },
        { divider: true, text: "Quantity", align: "right", value: "qty" },
        { divider: true, text: "Amount", align: "right", value: "val" },
        { divider: true, text: "MTD Quantity", align: "right", value: "t-qty" },
        { divider: true, text: "MTD Amount", align: "right", value: "t-val" }
      ],
      items: [
        { value: 1, label: "By article number" },
        { value: 2, label: "By description" },
        { value: 3, label: "By sub group" }
      ],
      picker: new Date().toISOString().substr(0, 10),
      ranges: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
      datas: [],
      storage: [],
      fromStorage: "",
      toStorage: "",
      article: [],
      fromArticle: "",
      toArticle: "",
      sortBy: 1
    };
  },
  methods: {
    search() {
      requestBody.sortBy = this.sortBy;
      requestBody.fromStore3 = this.fromStorage;
      requestBody.toStore3 = this.toStorage;
      requestBody.fromArticle = this.fromArticle;
      requestBody.toArticle = this.toArticle;
      requestBody.fromDate = moment(this.ranges[0]).format("DD/MM/YY");
      requestBody.toDate = moment(this.ranges[1]).format("DD/MM/YY");
      (async () => {
        const respons = await MonthIn.loadData(htlUrl, requestBody);
        const miList = respons.response.tList["t-list"];
        this.datas = miList;
      })();
    },
    loadStorage() {
      (async () => {
        const respons = await MonthIn.loadStorage(htlUrl, requestBody);
        const tempStorage = respons.response.tLLager["t-l-lager"];
        for (let i = 0; i < tempStorage.length; i++) {
          const element = tempStorage[i];
          this.storage.push({
            value: element["lager-nr"],
            label: element["bezeich"]
          });
        }
      })();
      return this.storage;
    },
    loadArticle() {
      (async () => {
        const respons = await MonthIn.loadArticle(htlUrl, requestBody);
        const tempArticle = respons.response.tLArtikel["t-l-artikel"];
        for (let i = 0; i < tempArticle.length; i++) {
          const element = tempArticle[i];
          this.article.push({
            value: element["artnr"],
            label: element["bezeich"]
          });
        }
      })();
      return this.article;
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    formatNumber(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  computed: {
    dateRangeText() {
      return this.ranges.join(" to ");
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
