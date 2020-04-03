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

<script src="../utils/header.ts">
</script>