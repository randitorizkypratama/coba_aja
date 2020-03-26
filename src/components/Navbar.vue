<!-- @format -->

<template>
  <v-app-bar app color="#232f3e" dense flat dark height="37">
    <v-avatar tile>
      <img src="../assets/logoVHP.svg" @click="homie" />
    </v-avatar>
    <v-spacer></v-spacer>
    <p class="mt-4 font-weight-black">{{ hotelname }} ({{ hoteladdress }})</p>
    <v-spacer></v-spacer>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="pr-6">
          <v-icon>mdi-account-circle</v-icon>
          {{ username }}
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
          <v-list-item-title>
            <router-link to="/issusing">Issuing</router-link>
          </v-list-item-title>
          <v-list-item-title>
            <router-link to="/store-requisition">store-requisition</router-link>
          </v-list-item-title>
          <v-list-item-title>
            <router-link to="/min-stock-on-hand"
              >Minimum Stock On Hand</router-link
            >
          </v-list-item-title>
          <v-list-item-title>
            <router-link to="/max-stock-on-hand"
              >Maximum Stock On Hand</router-link
            >
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { clear } from "@/../utils/local-storage";

export default Vue.extend({
  name: "NavBar",
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("login")) {
      next({ path: "/" });
    }

    next();
  },
  // data: () => ({
  //   // drawer: false
  //   hotelname: "GRAND VISUAL HOTEL",
  //   hoteladdress: "JAKARTA"
  // }),
  data() {
    return {
      hotelname: "",
      hoteladdress: "",
      username: ""
    };
  },

  methods: {
    submit() {
      clear();
      this.$router.push("/");
    },
    homie() {
      this.$router.push("/home");
    }
  },

  mounted() {
    const local = JSON.parse(localStorage.getItem("login") || "{}");
    const user = JSON.parse(localStorage.getItem("username") || "{}");

    this.hotelname = local.response.htlName;
    this.hoteladdress = local.response.htlCity;
    this.username = user.substring(0, user.indexOf("@"));
  }
});
</script>
