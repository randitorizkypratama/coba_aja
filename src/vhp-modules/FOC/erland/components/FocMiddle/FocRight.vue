<template>
  <div>
    <div class="d-flex">
      <v-text-field class="pr-3" label="Input 1" outlined dense></v-text-field>
      <v-text-field class="pr-3" label="Input 2" outlined dense></v-text-field>
      <v-radio-group v-model="row" class="pr-3 mt-1" row>
        <v-radio label="1" value="1"></v-radio>
        <v-radio label="2" value="2"></v-radio>
        <v-radio label="3" value="3"></v-radio>
      </v-radio-group>
      <v-text-field label="Room Rate" outlined dense></v-text-field>
    </div>
    <FocRooms />
  </div>
</template>

<script>
import FocRooms from "../FocTables/FocRooms.vue";
export default {
  name: "FocMiddleFocRight",

  data: () => ({
    row: "1"
  }),

  components: {
    FocRooms
  }
};
</script>

<style lang="scss" scoped></style>
