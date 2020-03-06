<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
        <v-img :src="kosong" class="my-3" contain height="200" />
      </v-col>
    </v-row>
    <<<<<<< HEAD
    <div>
      <img v-bind:src="data" />
    </div>
    =======
    {{ kosong }}
    >>>>>>> 3ff1ac52049d94d84d358d6d845558ad9658c1de
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
  },
  beforeCreate() {
    (async () => {
      const parsed = await ky.get("http://localhost:3000/gambar").json();
      // console.log(parsed[0].gambar);
      this.kosong = parsed[0].gambar;
    })();
  }
});
</script>
