<template>
  <v-row>
    <v-col cols="6" md="3">
      <h5>Delivery Number</h5>
      <v-text-field v-model="tes" item-value="Delevery Number" item-text="label" dense outlined></v-text-field>
    </v-col>
    <v-col cols="6" md="3">
      <h5>From Store</h5>
      <v-select
        dense
        outlined
        v-model="artnr"
        :items="fromStore"
        item-value="value"
        item-text="label"
      ></v-select>
    </v-col>
    <v-col cols="6" md="3">
      <h5>To Store</h5>
      <v-select
        dense
        outlined
        v-model="tes2"
        :items="toStorage"
        item-value="value"
        item-text="label"
      ></v-select>
    </v-col>
    <v-col cols="6" md="3">
      <h5>Accounting</h5>
      <v-select dense outlined v-model="tes1" :items="toStore" item-value="value" item-text="label"></v-select>
    </v-col>
  </v-row>
</template>

<script>
import useFetchData from "@/../utils/api/useFetchData";
export default {
  data: () => {
    return {
      fromStore: [],
      toStorage: []
    };
  },

  beforeCreate() {
    useFetchData("storeReqPrepare").then(res => {
      const data = res.response.tLLager["t-l-lager"];

      for (const i in data) {
        this.fromStore.push({
          label: data[i].bezeich,
          value: data[i]["lager-nr"]
        });
        this.toStorage.push({
          label: data[i].bezeich,
          value: data[i]["lager-nr"]
        });
      }
    });
  }
};
</script>