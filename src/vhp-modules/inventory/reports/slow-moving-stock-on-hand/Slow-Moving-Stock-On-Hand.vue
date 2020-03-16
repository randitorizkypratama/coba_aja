<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="4" md="3">
          <v-select
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            solo-inverted
          ></v-select>
          <v-select
            v-model="select"
            :items="storeNumber"
            item-text="label"
            item-value="value"
            label="Store Number"
            outlined
            solo-inverted
          ></v-select>
          <v-text-field label="Days" solo-inverted outlined></v-text-field>
          <v-btn color="primary" @click="cari" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>

          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="14" md="9">
          <v-card>
            <v-card-title>
              Nutrition
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="datas"
              item-key="name"
              :search="search"
              :items-per-page="5"
              class="elevation-1"
              dense="true"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import ky from "ky";

export default {
  components: {
    NavBar
  },
  data: () => ({
    mainGroup: [],
    storeNumber: [],
    datas: [],
    showPrice: "",
    search: "",
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
      { text: "Last Purchase Date", value: "datum" }
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
          value: element["lager-nr"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }
      const tempStoreNumber = data.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStoreNumber.length; i++) {
        const element = tempStoreNumber[i];
        this.storeNumber.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }

      //=> `{data: '🦄'}`
    })();
  },
  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/slowMovingList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  storeNo: "1",
                  mainGrp: "1",
                  tage: "0",
                  showPrice: "true"
                }
              }
            }
          )
          .json();
        const pbookList = parsed.response.sList["s-list"];
        console.log(pbookList, "data");

        this.datas = pbookList;
      })();
    }
  }
};
</script>