<template>
  <div id="FocLeft" class="foc-main">
    <h5>Search By Article Number</h5>
    <v-text-field
      v-model="requesNo"
      :items="mainGroup"
      item-text="label"
      item-value="value"
      class="select"
      dense
      outlined
    ></v-text-field>
    <v-radio-group v-model="radioButton" column>
      <v-radio label="Article Number" value="1"></v-radio>
      <v-radio label="Description" value="2"></v-radio>
    </v-radio-group>
    <v-btn color="primary" block @click="search">
      <v-icon @click="search" right dark class="mr-1">mdi-magnify</v-icon>Search
    </v-btn>
  </div>
</template>

<script src="../utils/action.ts">
</script>

