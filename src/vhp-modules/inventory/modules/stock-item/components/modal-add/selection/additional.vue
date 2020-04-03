<template>
  <v-col cols="4" md="6" v-show="Header">
    <h3>Min Stock</h3>
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
    <h3>Max Stock</h3>
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
    <h3>Account Number For Direct Issue Outgoing</h3>
    <v-text-field
      v-model="requesNo"
      :items="mainGroup"
      item-text="label"
      item-value="value"
      class="select"
      dense
      outlined
    ></v-text-field>
    <v-row>
      <v-col>
        <v-btn>No</v-btn>
      </v-col>
      <v-col>
        <v-btn>Yes</v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      Header: false
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