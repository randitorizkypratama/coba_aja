<template>
  <v-col cols="4" md="6" v-show="Header">
    <h5>Departmen</h5>
    <v-select
      v-model="artnr"
      :items="departement"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h5>Date</h5>
    <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="dateRangeText"
          clearable
          append-icon="mdi-calendar"
          v-on="on"
          @click:clear="date = null"
          dense
          outlined
        ></v-text-field>
      </template>
      <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
import useFetchData from "@/../utils/api/useFetchData";
export default {
  data: () => {
    return {
      Header: true,
      departement: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: []
    };
  },
  beforeCreate() {
    useFetchData("storeReqPrepare").then(res => {
      const data = res.response.tLUntergrup["t-l-untergrup"];
      for (const i in data) {
        this.departement.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
      }
    });
  },
  methods: {
    openTable() {
      this.Header = true;
    },
    closeTable() {
      this.Header = false;
    }
  }
};
</script>