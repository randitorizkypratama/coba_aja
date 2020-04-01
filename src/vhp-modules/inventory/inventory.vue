<template>
  <v-app>
    <NavBar />
    <v-container>
      <v-row>
        <v-col cols="8" md="2" v-for="item in shoppingItems" :key="item.name">
          <v-card class="pa-1" max-width="450" hover outlined @click="nextaja(item.url)">
            <p class="text-no-wrap mx-auto">{{ item.name }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  },
  data: () => ({
    kosong: "",
    shoppingItems: [
      {
        name: "Slow Moving Stock On Hand",
        url: "slow-moving-stock-on-hand"
      },
      {
        name: "Table Component",
        url: "table-component"
      },
      {
        name: "Incoming",
        url: "incoming"
      },
      {
        name: "Adjustment Result",
        url: "adjustment-result"
      },
      {
        name: "Meal Coupon",
        url: "meal-coupon"
      },
      {
        name: "Material Reconciliation",
        url: "material-reconciliation"
      },
      {
        name: "Inter Store Transfer",
        url: "inter-store-transfer"
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
      // <router-link to="/home"></router-link>
    }
  }
};
</script>