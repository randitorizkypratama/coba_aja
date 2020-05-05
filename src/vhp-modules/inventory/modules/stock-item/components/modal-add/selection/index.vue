<template>
  <v-col cols="2" md="0">
    <div class="my-2">
      <div class="my-2">
        <v-btn text small @click="category" color="primary">Category</v-btn>
      </div>
      <div class="my-2">
        <v-btn text small @click="unitPrice" color="primary">Unit & Price</v-btn>
      </div>
      <div class="my-2">
        <v-btn text small @click="additionalInfo" color="primary">Additional Info</v-btn>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    category() {
      this.$emit("Category");
    },
    unitPrice() {
      this.$emit("unitPrice");
    },
    additionalInfo() {
      this.$emit("additional");
    }
  }
});
</script>