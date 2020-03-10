<template>
  <v-app-bar app color="#232f3e" dense flat dark>
    <v-avatar tile>
      <img src="../assets/logoVHP.svg" @click="homie" />
    </v-avatar>

    <v-spacer></v-spacer>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-title @click="submit">Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-title>
            <router-link to="/home">Home</router-link>
           </v-list-item-title>
          <v-list-item-title>
            <router-link to="/purchase-book">Purchase Book</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
    beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("login")) {
      next({ path: "/" });
    }
    next();
  },
  data: () => ({
    // drawer: false
  }),

  methods: {
    submit() {
      localStorage.removeItem("login");
      this.$router.push("/");
    },
    homie() {
      this.$router.push("/home");
    }
  }
});
</script>