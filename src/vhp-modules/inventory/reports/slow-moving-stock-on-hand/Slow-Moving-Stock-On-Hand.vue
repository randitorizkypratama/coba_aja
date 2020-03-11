<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="4" md="3">
          <v-select
            v-model="select"
            :items="mainGroup"
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
          <v-btn color="primary" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>

          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="14" md="9">
          <v-data-table
            :headers="headers"
            :items="desserts"
            item-key="name"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
          ></v-data-table>
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
    headers: [
      {
        text: "Article Number",
        align: "start",
        value: "firma"
      },
      { text: "Name", value: "docu-nr" },
      { text: "Minimum On Hand", value: "traubensort" },
      { text: "Current On Hand", value: "lief-einheit" },
      { text: "Average Price", value: "betriebsnr" },
      { text: "Actual Price", value: "anzahl" },
      { text: "Last Purchase Date", value: "einzelpreis" }
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

      console.log(data.response.tLLager["t-l-lager"], "dataaja");
      console.log(data.response.tLHauptgrp["t-l-hauptgrp"], "dataaja2");
      //   const tempDate = language.response.tLanguages["t-languages"];
      //   for (let i = 0; i < tempDate.length; i++) {
      //     const element = tempDate[i];
      //     this.storeNumber.push({
      //       value: element["country-id"],
      //       label: element["country-name"]
      //     });
      // this.items.push(element["country-name"]);
      //   }

      //   return this.storeNumber;
      //=> `{data: '🦄'}`
    })();
  }
};
</script>