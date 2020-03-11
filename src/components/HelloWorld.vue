<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2" v-for="item in shoppingItems" :key="item.name">
        <v-card class="pa-1" max-width="150" hover outlined @click="nextaja(item.url)">
          <img
            max-width="80"
            :src="require('@/assets/main-screen/' + item.photo)"
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
// import ky from "ky";X

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
        photo: "TO.svg",
        url: "front-office-reception"
      },
      {
        name: "Housekeeping",
        photo: "HK.svg",
        url: "front-office-reception"
      },
      {
        name: "Sales Marketing",
        photo: "SM.svg",
        url: "front-office-reception"
      },
      {
        name: "Point Of Sales",
        photo: "POS.svg",
        url: "front-office-reception"
      },
      {
        name: "Banquet",
        photo: "Banquet.svg",
        url: "front-office-reception"
      },
      {
        name: "Outlet",
        photo: "Outlet.svg",
        url: "front-office-reception"
      },
      {
        name: "Accounts Receivable",
        photo: "AR.svg",
        url: "front-office-reception"
      },
      {
        name: "Purchasing",
        photo: "Purchasing.svg",
        url: "front-office-reception"
      },
      {
        name: "Inventory",
        photo: "Inventory.svg",
        url: "inventory"
      },
      {
        name: "Accounts Payable",
        photo: "AP.svg",
        url: "front-office-reception"
      },
      {
        name: "General Cashier",
        photo: "GC.svg",
        url: "front-office-reception"
      },
      {
        name: "General Ledger",
        photo: "GL.svg",
        url: "front-office-reception"
      },
      {
        name: "Fixed Assets",
        photo: "FixAssets.svg",
        url: "front-office-reception"
      },
      {
        name: "Engineering",
        photo: "Engineering.svg",
        url: "front-office-reception"
      },
      {
        name: "System Tools",
        photo: "SettingTools.svg",
        url: "front-office-reception"
      },
      {
        name: "Setting",
        photo: "Setting.svg",
        url: "front-office-reception"
      },
      {
        name: "Night Audit",
        photo: "NightAudit.svg",
        url: "front-office-reception"
      },
      {
        name: "Income Audit",
        photo: "IncomeAudit.svg",
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

.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 20px;
}
</style>
