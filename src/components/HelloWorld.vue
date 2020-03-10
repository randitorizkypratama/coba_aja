<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2">
        <v-card
          class="pa-2"
          max-width="160"
          v-for="item in shoppingItems"
          :key="item.name"
          hover
          outlined
        >
          <!-- <v-img
            max-width="80"
            :src="require(item.img)"
            class="mb-3 ml-auto mr-auto hover"
            width="80"
            height="60"
            contain
          /> -->
          {{item.img}}
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
        img: "../assets/main-screen/FO-Reception.svg"
      },
      {
        name: "Front Office Cashier",
        img: "../assets/main-screen/FO-Cashier.svg"
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
