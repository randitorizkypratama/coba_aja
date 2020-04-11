<template>
  <v-app>
    <!-- <div id="nav">
        <router-link to="/home">Home</router-link>|
        <router-link to="/">About</router-link>
    </div>-->

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ky from "ky";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  beforeCreate() {
    // (async () => {
    //   const parsed = await ky.get("http://localhost:3000/gambar").json();
    // })();
  }
});
</script>

