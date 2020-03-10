<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2" v-for="item in shoppingItems" :key="item.img">
        <v-card class="pa-2" max-width="160" hover outlined>
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
        photo: "/img/FO-Reception.decbb0fe.svg"
      },
      {
        name: "Front Office Cashier",
        photo: "/img/FO-Cashier.a45529cd.svg"
      },
      {
        name: "Telephone Operator",
        photo: "/img/TO.d041c629.svg"
      },
      {
        name: "Housekeeping",
        photo: "/img/HK.b144ef07.svg"
      },
      {
        name: "Sales Marketing",
        photo: "/img/SM.78c0ab2a.svg"
      },
      {
        name: "Point Of Sales",
        photo: "/img/POS.fed6bcc7.svg"
      },
      {
        name: "Banquet",
        photo: "/img/Banquet.c062a36d.svg"
      },
      {
        name: "Outlet",
        photo: "/img/Outlet.63135982.svg"
      },
      {
        name: "Accounts Receivable",
        photo: "/img/AR.1dfac63c.svg"
      },
      {
        name: "Purchasing",
        photo: "/img/Purchasing.a608f6ca.svg"
      },
      {
        name: "Inventory",
        photo: "/img/Inventory.bb7a940f.svg"
      },
      {
        name: "Accounts Payable",
        photo: "/img/AP.00e0f68b.svg"
      },
      {
        name: "General Cashier",
        photo: "/img/GC.aaf98a6a.svg"
      },
      {
        name: "General Ledger",
        photo: "/img/GL.32fb2240.svg"
      },
      {
        name: "Fixed Assets",
        photo: "/img/FixAssets.ec26a420.svg"
      },
      {
        name: "Engineering",
        photo: "/img/Engineering.376abbe6.svg"
      },
      {
        name: "System Tools",
        photo: "/img/SettingTools.8219d6aa.svg"
      },
      {
        name: "Setting",
        photo: "/img/Setting.78b44b3a.svg"
      },
      {
        name: "Night Audit",
        photo: "/img/NightAudit.44eebb2a.svg"
      },
      {
        name: "Income Audit",
        photo: "/img/IncomeAudit.72b6c250.svg"
      }
    ]
  }),

  methods: {
    submit() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
});
</script>

<style scoped>
p {
  font-size: 14px;
}
</style>
