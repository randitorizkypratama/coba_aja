<template>
  <v-app>
    <!-- <div id="nav">
        <router-link to="/home">Home</router-link>|
        <router-link to="/">About</router-link>
      </div> -->

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
    (async () => {
      const parsed = await ky.get("http://localhost:3000/gambar").json();
    })();
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
