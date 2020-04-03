<!-- @format -->

<template>
  <v-col v-show="Header">
    <v-row>
      <v-col cols="6" md="3">
        <h5>Delivery Unit</h5>
        <v-text-field
          v-model="tes"
          item-value="Delevery Number"
          item-text="label"
          placeholder="Box"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Mess Unit</h5>
        <v-text-field
          v-model="tes"
          item-value="Delevery Number"
          item-text="label"
          placeholder="Kg"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Recipe Unit</h5>
        <v-text-field
          v-model="tes"
          item-value="Delevery Number"
          item-text="label"
          placeholder="Gram"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Recipe Number</h5>
        <v-text-field v-model="tes" item-value="Delevery Number" item-text="label" dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>Unit Convertion</h4>
        <div>
          <h5>Language.Delivery_unit_conv</h5>
          <v-text-field
            v-model="tes"
            item-value="Delevery Number"
            item-text="label"
            placeholder="30"
            dense
            outlined
          ></v-text-field>
          <h5>Language.Delivery_unit_conv</h5>
          <v-text-field
            v-model="tes"
            item-value="Delevery Number"
            item-text="label"
            placeholder="100"
            dense
            outlined
          ></v-text-field>
        </div>
      </v-col>
      <v-col>
        <h4>Unit Price</h4>
        <div>
          <h5>Actual Purchase Price</h5>
          <v-text-field
            v-model="tes"
            item-value="Delevery Number"
            item-text="label"
            dense
            outlined
            disabled
          ></v-text-field>
          <h5>Last Price</h5>
          <v-text-field
            v-model="tes"
            item-value="Delevery Number"
            item-text="label"
            dense
            outlined
            disabled
          ></v-text-field>
          <h5>Average Purchase Price</h5>
          <v-text-field
            v-model="tes"
            item-value="Delevery Number"
            item-text="label"
            dense
            outlined
            disabled
          ></v-text-field>
        </div>
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
    open() {
      this.Header = true;
    },
    close() {
      this.Header = false;
    }
  }
});
</script>
