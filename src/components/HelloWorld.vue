<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2" v-for="item in shoppingItems" :key="item.name">
        <v-card class="pa-2" max-width="160" hover outlined @click="nextaja(item.url)">
          <img
            max-width="80"
            :src="require('@/assets/main-screen/FO-Reception.svg')"
            class="mb-3 ml-auto mr-auto hover"
            width="80"
            height="60"
            contain
          />
          <p class="text-no-wrap mx-auto">{{ item.name }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
// import ky from "ky";
// var f_o_r = require("../assets/main-screen/FO-Reception.svg");
// var f_o_c = require("../assets/main-screen/FO-Cashier.svg");
// var t_o = require("../assets/main-screen/TO.svg");
// var hk = require("../assets/main-screen/HK.svg");
// var sm = require("../assets/main-screen/SM.svg");
// var pos = require("../assets/main-screen/POS.svg");
// var banquet = require("../assets/main-screen/Banquet.svg");
// var outlet = require("../assets/main-screen/Outlet.svg");
// var ar = require("../assets/main-screen/AR.svg");
// var pu = require("../assets/main-screen/Purchasing.svg");
// var inv = require("../assets/main-screen/Inventory.svg");
// var ap = require("../assets/main-screen/AP.svg");
// var gc = require("../assets/main-screen/GC.svg");
// var gl = require("../assets/main-screen/GL.svg");
// var fa = require("../assets/main-screen/FixAssets.svg");
// var eg = require("../assets/main-screen/Engineering.svg");
// var st = require("../assets/main-screen/SettingTools.svg);
// var set = require("../assets/main-screen/Setting.svg);
// var na = require("../assets/main-screen/NightAudit.svg);
// var ia = require("../assets/main-screen/IncomeAudit.svg);

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    kosong: "",
    shoppingItems: [
      {
        name: "Front Office Reception",
        photo: "FO-Reception.svg",
        url: "front-office-reception"
      },
      {
        name: "Front Office Cashier",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Telephone Operator",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Housekeeping",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Sales Marketing",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Point Of Sales",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Banquet",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Outlet",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Accounts Receivable",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Purchasing",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Inventory",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Accounts Payable",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "General Cashier",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "General Ledger",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Fixed Assets",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Engineering",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "System Tools",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Setting",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Night Audit",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      },
      {
        name: "Income Audit",
        photo: "FO-Cashier.svg",
        url: "front-office-reception"
      }
    ]
  }),

  methods: {
    submit() {
      localStorage.clear();
      this.$router.push("/");
    },
    nextaja(e) {
      console.log(e);

      this.$router.push("/" + e);
    }
  }
});
</script>

<style scoped>
p {
  font-size: 14px;
}
</style>
