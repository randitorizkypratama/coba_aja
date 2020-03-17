<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-autocomplete
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense
            outlined
          ></v-autocomplete>
          <v-btn class="mb-3" color="primary" @click="search" block depressed large>
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
    this.uname = localStorage.getItem("user");
    console.log(this.uname);
    (async () => {
      const parsed = await ky
        .post("http://ws1.e1-vhp.com/VHPWebBased/rest/Common/getAllArtikel", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              sorttype: "2",
              lastArt: "*",
              lastArt1: "?"
            }
          }
        })
        .json();
      const tempArt = parsed.response.tLArtikel["t-l-artikel"];
      for (let i = 0; i < tempArt.length; i++) {
        const element = tempArt[i];
        this.items.push({
          value: element["artnr"],
          label: element["bezeich"]
        });
      }
      return this.items;
    })();
  },
  data: () => {
    return {
      items: [],
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
      datas: [],
      artnr: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },
  methods: {
    search() {
      console.log(this.artnr, "kuy");

      (async () => {
        const parsed = await ky
          .post("http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/purchaseBook", {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                sArtnr: this.artnr
              }
            }
          })
          .json();
        const pbookList = parsed.response.pchaseList["pchase-list"];
        this.datas = pbookList;
      })();
    }
  }
};
</script>
<style>
p.dashed {
  border-style: dashed;
}
</style>