<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="4" md="3">
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
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>

          <v-spacer></v-spacer>
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
            dark
            calculate-widths
            dense
          ></v-data-table>
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
    storeNumber: [],
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
        value: "datum",
        format: "DD-MM-YYYY"
      }
    ]
  }),
  beforeCreate() {
    (async () => {
      const data = await ky
        .post(
          "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/slowMovingPrepare",
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
  methods: {
    cari() {
      console.log(this.day, "day");

      (async () => {
        const parsed = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/slowMovingList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  storeNo: this.selected,
                  mainGrp: this.select,
                  tage: "0",
                  showPrice: this.showPrice
                }
              }
            }
          )
          .json();
        const pbookList = parsed.response.sList["s-list"];
        this.datas = pbookList;
      })();
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.datas.datum != undefined
        ? moment(this.datas.datum).format("dd-mm-yyyy")
        : "";
    }
  }
};
</script>
