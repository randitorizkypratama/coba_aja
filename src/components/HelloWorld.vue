<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ky from "ky";
export default Vue.extend({
  name: "HelloWorld",

  data: () => ({}),

  methods: {
    submit() {
      localStorage.clear();
      this.$router.push("/");
    }
  },
  beforeCreate() {
    (async () => {
      const parsed = await ky.get("http://localhost:3000/gambar").json();
      console.log(parsed);
    })();
  }
});
</script>
