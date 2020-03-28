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
    <v-radio-group>
      <v-radio :key="n" :label="`Article Number`" :value="n"></v-radio>
      <v-radio :key="n" :label="`Description`" :value="n"></v-radio>
    </v-radio-group>
    <v-btn color="primary" block @click="search">
      <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
    </v-btn>
  </div>
</template>

