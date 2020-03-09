<template>
  <v-container>
    <!-- <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" /> -->

    <v-row>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/FO-Reception.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            height="60"
            contain
          />
          <p class="text-no-wrap mx-auto">Front Office Reception</p>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/FO-Cashier.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            contain
            height="60"
          />
          <p class="text-no-wrap mx-auto">Front Office Cashier</p>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/TO.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            contain
            height="60"
          />
          <p class="text-no-wrap mx-auto">Telephone Operator</p>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/HK.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            contain
            height="60"
          />
          <p class="text-no-wrap mx-auto">Houskeeping</p>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/SM.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            contain
            height="60"
          />
          <p class="text-no-wrap mx-auto">Sales Marketing</p>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" max-width="160" hover outlined>
          <v-img
            max-width="80"
            :src="require('../assets/main-screen/POS.svg')"
            class="mb-3 ml-auto mr-auto"
            width="80"
            contain
            height="60"
          />
          <p class="text-no-wrap mx-auto">Point Of Sales</p>
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
    kosong: ""
  }),

  methods: {
    submit() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
  // beforeCreate() {
  //   (async () => {
  //     const parsed = await ky.get("http://localhost:3000/gambar").json();
  //     // console.log(parsed[0].gambar);
  //     this.kosong = parsed[0].gambar;
  //   })();
  // },
});
</script>

<style scoped>
p {
  font-size: 14px;
}
</style>
