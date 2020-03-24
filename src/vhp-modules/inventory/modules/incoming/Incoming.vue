<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="4" md="3">
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
          <v-autocomplete
            v-model="storeNumber"
            :items="storeselect"
            item-text="label"
            item-value="value"
            label="Store Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="supplier"
            :items="supplierselect"
            item-text="label"
            item-value="value"
            label="Supplier"
            outlined
            dense
          ></v-autocomplete>

          <v-checkbox v-model="checkbox1" :label="`Display All Supplier`" dense></v-checkbox>
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="By Supplier" value="1"></v-radio>
            <v-radio label="By Document" value="2"></v-radio>
            <v-radio label="By Sub Group" value="3"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click="cari" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>
        </v-col>

        <v-col cols="14" md="9">
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
            >
              <template
                v-slot:item.DATE="{ item }"
              >{{ item.DATE != null ? formatDate(item.DATE) : " " }}</template>
              <template v-slot:item.st="{ item }">
                {{
                item.st == 0 ? " " : item.st
                }}
              </template>
              <template v-slot:item.artnr="{ item }">
                {{
                item.artnr == 0 ? " " : item.artnr
                }}
              </template>
              <template v-slot:item.DESCRIPTION="{ item }">
                {{
                item.DESCRIPTION == "T O T A L" ? "SubTotal" : item.DESCRIPTION == "GRAND TOTAL" ? "Total" : item.DESCRIPTION
                }}
              </template>
              <template
                v-slot:item.price="{ item }"
              >{{ item.price == "0" ? "" : formatNumber(item.price.toFixed(2)) }}</template>
              <template
                v-slot:item.amount="{ item }"
              >{{ item.amount == "0" ? "" : formatNumber(item.amount.toFixed(2)) }}</template>
              <template
                v-slot:item.inc-qty="{ item }"
              >{{ item["inc-qty"] == "0" ? "" : item["inc-qty"] }}</template>
            </v-data-table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import ky from "ky";
import moment from "moment";

export default {
  components: {
    NavBar
  },
  data: () => ({
    height: 530,
    mainGroup: [],
    storeselect: [],
    supplierselect: [],
    ranges: [],
    datas: [],
    fromMainGroup: "",
    toMainGroup: "",
    storeNumber: "",
    supplier: "",
    day: "",
    lKreditRecid: "",
    longDigit: "",
    showPriceprepare: "",
    checkbox1: false,
    radios: "",
    headers: [
      {
        text: "Date",
        align: "start",
        value: "DATE",
        width: "110",
        divider: true
      },
      { text: "Storage Number", value: "st", width: "70", divider: true },
      { text: "Supplier", value: "supplier", width: 250, divider: true },
      { text: "Article Number", value: "artnr", width: 80, divider: true },
      { text: "Description", value: "DESCRIPTION", width: 250, divider: true },
      { text: "Delivery Unit", value: "d-unit", width: 70, divider: true },
      { text: "Price", value: "price", width: 100, divider: true },
      {
        text: "Incoming Quantity",
        value: "inc-qty",
        width: 100,
        divider: true
      },
      { text: "Amount", value: "amount", width: 100, divider: true },
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
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/receivingReportPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                userInit: "01",
                apRecid: "0"
              }
            }
          }
        )
        .json();

      const prepareData = prepare.response;
      this.lKreditRecid = prepareData.lKreditRecid;
      this.longDigit = prepareData.longDigit;
      this.showPriceprepare = prepareData.showPrice;

      const data = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/vhpINV/getInvMainGroup", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata"
            }
          }
        })
        .json();

      const tempMainGroup = data.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
      }

      const store = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/vhpINV/getStorage", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata"
            }
          }
        })
        .json();

      const tempStore = store.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStore.length; i++) {
        const element = tempStore[i];
        this.storeselect.push({
          value: element["lager-nr"],
          label: element["bezeich"]
        });
      }
      const suppliers = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/vhpAP/getSupplierList", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata"
            }
          }
        })
        .json();

      const tempSuppliers = suppliers.response.supplyList["supply-list"];
      for (let i = 0; i < tempSuppliers.length; i++) {
        const element = tempSuppliers[i];
        this.supplierselect.push({
          value: element["t-recid"],
          label: element["firma"]
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
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/receivingReportList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  pvILanguage: "1",
                  lastArtnr: "?",
                  lieferantRecid: this.checkbox1 == true ? "0" : this.supplier,
                  lKreditRecid: this.lKreditRecid,
                  longDigit: this.longDigit,
                  showPrice: this.showPriceprepare,
                  store: this.storeNumber,
                  allSupp: this.checkbox1,
                  sorttype: this.radios,
                  fromGrp: this.fromMainGroup,
                  toGrp: this.toMainGroup,
                  fromDate: moment(this.ranges[0]).format("DD/MM/YY"),
                  toDate: moment(this.ranges[1]).format("DD/MM/YY"),
                  userInit: "01",
                  apRecid: "0",
                  taxcodeList: {
                    "taxcode-list": [
                      {
                        taxcode: "",
                        taxamount: "0"
                      }
                    ]
                  }
                }
              }
            }
          )
          .json();

        const pbookList = parsed.response.strList["str-list"];

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
