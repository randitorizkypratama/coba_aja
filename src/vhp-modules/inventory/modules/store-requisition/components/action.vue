<template>
  <div id="FocLeft" class="foc-main">
    <v-menu v-model="menu1" :close-on-content-click="false" max-width="300">
      <template v-slot:activator="{ on }">
        <h5>Date</h5>
        <v-text-field
          class="select"
          :value="dateRangeText"
          append-icon="mdi-calendar"
          clearable
          v-on="on"
          @click:clear="date = null"
          dense
          outlined
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="ranges" @change="menu1 = false" range>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="menu = false" text>Cancel</v-btn>
        <v-btn color="primary" @click="$refs.menu.save(date)" text>OK</v-btn>
      </v-date-picker>
    </v-menu>
    <h5>From Departemen</h5>
    <v-select
      class="select"
      v-model="fromDepartement"
      :items="fromDept"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h5>To Departemen</h5>
    <v-select
      class="select"
      v-model="toDepartemen"
      :items="toDept"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h5>Request No</h5>
    <v-text-field
      v-model="requesNo"
      :items="mainGroup"
      item-text="label"
      item-value="value"
      class="select"
      dense
      outlined
    ></v-text-field>
    <v-btn color="primary" block @click="search">
      <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
    </v-btn>
  </div>
</template>

<script src="../utils/action.ts">
</script>

<style lang="scss" scoped>
.foc-main__article__toggle {
  width: 100%;
}

.foc-main__article__toggle-btn {
  width: 50%;
}
</style>
