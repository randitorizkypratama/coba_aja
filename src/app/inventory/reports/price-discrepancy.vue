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
          <v-autocomplete
            v-model="filterBy"
            :items="itemss"
            item-value="value"
            item-text="label"
            label="Filter by"
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
              <template v-slot:item.datum="{ item }">
                <div align="center" v-if="item.datum != null">{{ formatDate(item.datum) }}</div>
              </template>
              <template v-slot:item.lager="{ item }">
                <div align="center">{{ item.datum == null ? "" : item.lager }}</div>
              </template>
              <template v-slot:item.bezeich="{ item }">
                <div align="left">{{ item.datum == null ? "Total" : item.bezeich }}</div>
              </template>
              <template v-slot:item.in-qty="{ item }">
                <div align="right">{{ formatNumber(item['in-qty'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.amount="{ item }">
                <div align="right">{{ formatNumber(item['amount'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.epreis1="{ item }">
                <div align="right">{{ item.datum == null ? "" : formatNumber(item['epreis1'].toFixed(2)) }}</div>
              </template>
              <template v-slot:item.epreis2="{ item }">
                <div align="right">{{ item.datum == null ? "" : formatNumber(item['epreis2'].toFixed(2)) }}</div>
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
import PriceDiscrepancy from "@/api/inventory/report/price-discrepancy.api";

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
  lastArt: "*",
  lastArt1: "?",
  miRecChk: "",
  miOrdChk: "",
  miAllChk: ""
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
        { divider: true, text: "Date", align: "center", value: "datum" },
        { divider: true, text: "Storage Name", align: "center", value: "lager" },
        { divider: true, text: "Document Number", align: "center", value: "docunr" },
        { divider: true, text: "Description", align: "center", value: "bezeich" },
        { divider: true, text: "Quantity", align: "right", value: "in-qty" },
        { divider: true, text: "Amount", align: "right", value: "amount" },
        { divider: true, text: "Received Price", align: "right", value: "epreis1" },
        { divider: true, text: "Ordered Price", align: "right", value: "epreis2" },
        { divider: true, text: "Supplier", align: "right", value: "lief" },
        { divider: true, text: "Delivery Note", align: "right", value: "dlvnote" }
      ],
      items: [
        { value: 1, label: "By article number" },
        { value: 2, label: "By description" },
        { value: 3, label: "By document number" }
      ],
      itemss: [
        { value: 1, label: "Received Price > Ordered Price" },
        { value: 2, label: "Ordered Price > Received Price" },
        { value: 3, label: "All Price" }
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
      sortBy: 1,
      filterBy: 3
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
      this.assignFilter();
      (async () => {
        const respons = await PriceDiscrepancy.loadData(htlUrl, requestBody);
        const miList = respons.response.discrepancyInlist["discrepancy-inlist"];
        this.datas = miList;
      })();
    },
    loadStorage() {
      (async () => {
        const respons = await PriceDiscrepancy.loadStorage(htlUrl, requestBody);
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
        const respons = await PriceDiscrepancy.loadArticle(htlUrl, requestBody);
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
    },
    assignFilter() {
      if (this.filterBy == 1) {
        requestBody.miRecChk = "yes";
        requestBody.miOrdChk = "no";
        requestBody.miAllChk = "no";
      } else if (this.filterBy == 2) {
        requestBody.miRecChk = "no";
        requestBody.miOrdChk = "yes";
        requestBody.miAllChk = "no";
      } else {
        requestBody.miRecChk = "no";
        requestBody.miOrdChk = "no";
        requestBody.miAllChk = "yes";
      }
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
