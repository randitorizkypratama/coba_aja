<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
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
            v-model="fromMainGroup"
            :items="mainGroup"
            item-value="value"
            item-text="label"
            label="Select Main Group"
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
          <div>
            <p class="dashed">Remark</p>
          </div>
        </v-col>

        <v-col cols="12" md="9">
          <v-data-table
            :headers="headers"
            :items="datas"
            item-key="artnr"
            class="elevation-1"
            dense
            hide-default-footer
            disable-pagination
          >
            <template v-slot:item.artnr="{ item }">
              <div align="left">{{ item.artnr == 0 ? "" : item.artnr }}</div>
            </template>
            <template v-slot:item.name="{ item }">
              <div align="left">{{ item.name }}</div>
            </template>
            <template v-slot:item.min-oh="{ item }">
              <div align="right">{{ item.artnr == 0 ? "" : formatNumber(item['min-oh'].toFixed(2)) }}</div>
            </template>
            <template v-slot:item.curr-oh="{ item }">
              <div align="right">{{ item.artnr == 0 ? "" : formatNumber(item['curr-oh'].toFixed(2)) }}</div>
            </template>
            <template v-slot:item.avrgprice="{ item }">
              <div align="right">{{ item.artnr == 0 ? "" : formatNumber(item.avrgprice.toFixed(2)) }}</div>
            </template>
            <template v-slot:item.ek-aktuell="{ item }">
              <div align="right">{{ item.artnr == 0 ? "" : formatNumber(item['ek-aktuell'].toFixed(2)) }}</div>
            </template>
            <template v-slot:item.datum="{ item }">
              <div align="left">{{ item.artnr == 0 ? "" : formatDate(item.datum) }}</div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import ky from "ky";
import moment from "moment";

export default {
  components: {
    NavBar
  },
  mounted() {
    const tUkey = JSON.parse(localStorage.getItem("login"));
    this.ukey = tUkey.response.userKey;
    this.uname = localStorage.getItem("user");
    (async () => {
      this.respons = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/vhpINV/minOHPrepare", {
          json: {
            request: {
              inputUserkey: this.ukey,
              inputUsername: this.uname
            }
          }
        })
        .json();
      this.loadStorage();
      this.loadMainGroup();
    })();
  },
  data: () => {
    return {
      headers: [
        { text: "Article Number", align: "center", value: "artnr" },
        { text: "Name", align: "center", value: "name" },
        { text: "Minimum On-Hand", align: "center", value: "min-oh" },
        { text: "Current On-Hand", align: "center", value: "curr-oh" },
        { text: "Average Price", align: "center", value: "avrgprice" },
        { text: "Actual Price", align: "center", value: "ek-aktuell" },
        { text: "Last Purchase Date", align: "center", value: "datum" }
      ],
      items: [
        {value: 1, label: "By article number"},
        {value: 2, label: "By description"}
      ],
      respons: "",
      datas: [],
      storage: [],
      fromStorage: "",
      toStorage: "",
      mainGroup: [],
      fromMainGroup: "",
      sortBy: 1,
      uname: "",
      ukey: ""
    };
  },
  methods: {
    search() {
      (async () => {
        const parsed = await ky
          .post("http://182.253.140.35/VHPWebBased/rest/vhpINV/minOHList", {
            json: {
              request: {
                inputUserkey: this.ukey,
                inputUsername: this.uname,
                sorttype: this.sortBy,
                mainGrp: this.fromMainGroup,
                fromStore3: this.fromStorage,
                toStore3: this.toStorage,
                showPrice: this.respons.response.showPrice
              }
            }
          })
          .json();
        const ohList = parsed.response.minOnhandList["min-onhand-list"];
        this.datas = ohList;
      })();
    },
    loadStorage() {
      const tempStorage = this.respons.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStorage.length; i++) {
        const element = tempStorage[i];
        this.storage.push({
          value: element["lager-nr"],
          label: element["bezeich"]
        });
      }
      return this.storage;
    },
    loadMainGroup() {
      const tempMainGroup = this.respons.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
      }
      return this.mainGroup;
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
<style>
p.dashed {
  border-style: dashed;
}
</style>
