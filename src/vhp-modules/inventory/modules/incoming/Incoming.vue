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
            <template v-slot:item.datum="{ item }">{{ formatDate(item.datum) }}</template>
          </v-data-table>
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
    height: 450,
    mainGroup: [],
    storeselect: [],
    supplierselect: [],
    ranges: [],
    datas: [],
    showPrice: "",
    fromMainGroup: "",
    toMainGroup: "",
    storeNumber: "",
    supplier: "",
    day: "",
    checkbox1: false,
    radios: "",
    headers: [
      {
        text: "Date",
        align: "start",
        value: "DATE"
      },
      { text: "Storage Number", value: "st" },
      { text: "Supplier", value: "supplier" },
      { text: "Article Number", value: "artnr" },
      { text: "Description", value: "DESCRIPTION" },
      { text: "Delivery Unit", value: "d-unit" },
      { text: "Price", value: "price" },
      { text: "Incoming Quantity", value: "inc-qty" },
      { text: "Amount", value: "amount" },
      { text: "Document Number", value: "docu-no" },
      { text: "ID", value: "ID" },
      { text: "Delivery Note", value: "deliv-note" },
      { text: "Invoice Number", value: "invoice-nr" }
    ]
  }),
  beforeCreate() {
    (async () => {
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
      console.log(
        moment(this.ranges[0]).format("DD-MM-YYYY") +
          "-" +
          moment(this.ranges[1]).format("DD-MM-YYYY"),
        "cari"
      );
      console.log(this.fromMainGroup, "cari2");
      console.log(this.toMainGroup, "cari3");
      console.log(this.storeNumber, "cari4");
      console.log(this.supplier, "cari5");
      console.log(this.checkbox1, "cari6");
      console.log(this.radios, "cari7");

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
                  lieferantRecid: "1890603",
                  lKreditRecid: "0",
                  longDigit: true,
                  showPrice: true,
                  store: "1",
                  allSupp: false,
                  sorttype: "1",
                  fromGrp: "1",
                  toGrp: "2",
                  fromDate: "01/01/19",
                  toDate: "14/01/19",
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
      console.log("tes", value);

      return moment(value).format("DD-MM-YYYY");
    }
  }
};
</script>

<style lang="sass" scoped>
.v-input--selection-controls
  margin-top: 0px
  padding-top: 0px
</style>
