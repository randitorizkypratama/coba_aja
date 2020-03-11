<template>
  <v-app>
    <NavBar />
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
        photo: "FO-Reception.svg",
        url: "slow-moving-stock-on-hand"
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