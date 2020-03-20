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
            item-valsue="value"
            item-text="label"
            label="Select Main Group"
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
            item-key="docu-nr"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
            rows-per-page-items="[15, 30, 50, 100]"
            pagination.sync="pagination"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import ky from "ky";

export default {
  components: {
    NavBar
  },
  mounted() {
    const tUkey = JSON.parse(localStorage.getItem("login"));
    this.ukey = tUkey.response.userKey;
    this.uname = "sindata";
    //this.uname = localStorage.getItem("user");
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
      this.showPrice = this.respons.response.showPrice;
      this.loadStorage();
      this.loadMainGroup();
    })();
  },
  data: () => {
    return {
      headers: [
        {
          text: "Date",
          align: "start",
          value: "bestelldatum"
        },
        { text: "Supplier Name", value: "firma" },
        { text: "Document Number", value: "docu-nr" },
        { text: "Delivery Unit", value: "traubensort" },
        { text: "Content", value: "lief-einheit" },
        { text: "Discount", value: "betriebsnr" },
        { text: "Quantity", value: "anzahl" },
        { text: "Unit Price", value: "einzelpreis" },
        { text: "Value", value: "warenwert" },
        { text: "Remark", value: "remark" }
      ],
      respons: "",
      datas: [],
      storage: [],
      fromStorage: "",
      toStorage: "",
      mainGroup: [],
      fromMainGroup: "",
      showPrice: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },
  methods: {
    search() {
      /*(async () => {
        const parsed = await ky
          .post("http://182.253.140.35/VHPWebBased/rest/vhpINV/purchaseBook", {
            json: {
              request: {
                inputUserkey: this.ukey,
                inputUsername: this.uname,
                sArtnr: this.artnr
              }
            }
          })
          .json();
        const pbookList = parsed.response.pchaseList["pchase-list"];
        this.datas = pbookList;
      })();*/
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
    }
  }
};
</script>
<style>
p.dashed {
  border-style: dashed;
}
</style>
