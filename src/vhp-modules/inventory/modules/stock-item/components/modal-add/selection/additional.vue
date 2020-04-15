<template>
  <v-col cols="4" md="6" v-show="Header">
    <h3>Min Stock</h3>
    <v-text-field v-model="DATA.minStock" class="select" dense outlined disabled></v-text-field>
    <h3>Max Stock</h3>
    <v-text-field v-model="DATA.maxStock" class="select" dense outlined disabled></v-text-field>
    <h3>Account Number For Direct Issue Outgoing</h3>
    <v-text-field
      @click.prevent="modalAccountNumber"
      v-model="DATA.accountNumber"
      class="select"
      dense
      outlined
    ></v-text-field>
    <modalAccount ref="accontNumber" />
    <v-row>
      <v-btn>No</v-btn>
      <v-btn>Yes</v-btn>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import modalAccount from "./modalAccountNumber.vue";
export default Vue.extend({
  components: {
    modalAccount
  },
  data() {
    return {
      Header: false,
      DATA: {
        minStock: "",
        maxStock: "",
        accountNumber: ""
      }
    };
  },

  methods: {
    openHeader() {
      this.Header = true;
    },
    close() {
      this.Header = false;
    },
    saveData() {
      this.$emit("dataAdd", this.DATA);
    },
    getData(e: any) {
      console.log("response", e);
    },
    modalAccountNumber() {
      (this.$refs.accontNumber as Vue & { openModal: () => void }).openModal();
    }
  }
});
</script>