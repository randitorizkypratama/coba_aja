<template>
  <v-app-bar app dark dense flat height="37" color="#232f3e">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 50 50"
      width="44"
      height="44"
    >
      <defs />
      <path fill="none" d="M0 0h50v50H0z" />
      <g fill="#fefefe">
        <path
          d="M35 15v4h7c3 0 3 4 0 4h-7v12h5v-8h5c6-1 6-12-1-12h-9zM6 15l4 14 4-14h6l-7 20H7L0 15zM21 15h5v8h7v5h-7v7h-5z"
        />
      </g>
    </svg>

    <v-spacer />

    <h2>{{ hotelHeader }}</h2>
    <v-spacer />

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="pr-6">
          <v-icon>account_circle</v-icon>
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
          <v-icon>apps</v-icon>
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
            <router-link to="/min-stock-on-hand">Minimum Stock On Hand</router-link>
          </v-list-item-title>
          <v-list-item-title>
            <router-link to="/max-stock-on-hand">Maximum Stock On Hand</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    hotelHeader() {
      return 'GRAND VISUAL HOTEL (Jakarta)';
    },
  },
});
</script>
