<template>
  <v-col cols="2" md="0">
    <div class="my-2">
      <div class="my-2">
        <v-btn text small @click="category" color="primary">Category</v-btn>
      </div>
      <div class="my-2">
        <v-btn text small @click="unit_price" color="primary">Unit & Price</v-btn>
      </div>
      <div class="my-2">
        <v-btn text small @click="additional_info" color="primary">Additional Info</v-btn>
      </div>
    </div>
  </v-col>
</template>

<script src="../../../utils/selection.ts" lang="ts">
</script>