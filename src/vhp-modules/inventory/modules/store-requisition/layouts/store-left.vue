<template>
  <!-- <v-row> -->
  <v-col md="12" cols="10">
    <action @clicked="search" />
  </v-col>
  <!-- </v-row> -->
</template>

<script>
import action from "../components/action";
export default {
  //   methods: {
  //     search(ranges, fromDepartement, toDepartemen, requesNo) {
  //       this.$emit("cliked", ranges, fromDepartement, toDepartemen, requesNo);
  //     }
  //   }
};
</script>