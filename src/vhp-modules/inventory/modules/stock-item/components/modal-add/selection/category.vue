<template>
  <v-col cols="4" md="6" v-show="Header">
    <h3>Main Group</h3>
    <v-select
      v-model="artnr"
      :items="departement"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h3>Sub Group</h3>
    <v-select
      v-model="artnr"
      :items="departement"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h3>Article Number</h3>
    <v-text-field
      v-model="requesNo"
      :items="mainGroup"
      item-text="label"
      item-value="value"
      class="select"
      dense
      outlined
      disabled
    ></v-text-field>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      Header: true
    };
  },
  methods: {
    openHeader() {
      this.Header = true;
    },
    close() {
      this.Header = false;
    }
  }
});
</script>
