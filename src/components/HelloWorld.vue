<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2" v-for="item in shoppingItems" :key="item.name">
        <v-card class="pa-2" max-width="160" hover outlined @click="nextaja(item.url)">
          <img
            max-width="80"
            :src="item.photo"
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
import ky from "ky";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    kosong: "",
    shoppingItems: [
      {
        name: "Front Office Reception",
        photo: "/img/FO-Reception.decbb0fe.svg",
        url: "front-office-reception"
      },
      {
        name: "Front Office Cashier",
        photo: "/img/FO-Cashier.a45529cd.svg",
        url: "front-office-reception"
      },
      {
        name: "Telephone Operator",
        photo: "/img/TO.d041c629.svg",
        url: "front-office-reception"
      },
      {
        name: "Housekeeping",
        photo: "/img/HK.b144ef07.svg",
        url: "front-office-reception"
      },
      {
        name: "Sales Marketing",
        photo: "/img/SM.78c0ab2a.svg",
        url: "front-office-reception"
      },
      {
        name: "Point Of Sales",
        photo: "/img/POS.fed6bcc7.svg",
        url: "front-office-reception"
      },
      {
        name: "Banquet",
        photo: "/img/Banquet.c062a36d.svg",
        url: "front-office-reception"
      },
      {
        name: "Outlet",
        photo: "/img/Outlet.63135982.svg",
        url: "front-office-reception"
      },
      {
        name: "Accounts Receivable",
        photo: "/img/AR.1dfac63c.svg",
        url: "front-office-reception"
      },
      {
        name: "Purchasing",
        photo: "/img/Purchasing.a608f6ca.svg",
        url: "front-office-reception"
      },
      {
        name: "Inventory",
        photo: "/img/Inventory.bb7a940f.svg",
        url: "front-office-reception"
      },
      {
        name: "Accounts Payable",
        photo: "/img/AP.00e0f68b.svg",
        url: "front-office-reception"
      },
      {
        name: "General Cashier",
        photo: "/img/GC.aaf98a6a.svg",
        url: "front-office-reception"
      },
      {
        name: "General Ledger",
        photo: "/img/GL.32fb2240.svg",
        url: "front-office-reception"
      },
      {
        name: "Fixed Assets",
        photo: "/img/FixAssets.ec26a420.svg",
        url: "front-office-reception"
      },
      {
        name: "Engineering",
        photo: "/img/Engineering.376abbe6.svg",
        url: "front-office-reception"
      },
      {
        name: "System Tools",
        photo: "/img/SettingTools.8219d6aa.svg",
        url: "front-office-reception"
      },
      {
        name: "Setting",
        photo: "/img/Setting.78b44b3a.svg",
        url: "front-office-reception"
      },
      {
        name: "Night Audit",
        photo: "/img/NightAudit.44eebb2a.svg",
        url: "front-office-reception"
      },
      {
        name: "Income Audit",
        photo: "/img/IncomeAudit.72b6c250.svg",
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
