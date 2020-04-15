<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>Recipe Number</v-card-title>
        <v-card-text>
          <v-row>
            <h3>Search</h3>
            <v-text-field dense outlined></v-text-field>
          </v-row>
          <div id="FocRooms2">
            <v-data-table :headers="headers" :items="data" item-key="name" class="elevation-1"></v-data-table>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tableAccountNumber } from "../../../header/header-table-item";
import useFetchCommon from "@/../utils/api/useFetchCommon";
export default Vue.extend({
  data: () => {
    return {
      dialog: false,
      headers: "",
      data: ""
    };
  },
  created() {
    this.$data.headers = tableAccountNumber;
  },
  methods: {
    openModal() {
      this.dialog = true;
    }
  },
  beforeCreate() {
    useFetchCommon("vhpAR/getPrepareSelectGLAcct", {
      currDept: "0"
    }).then((res: any) => {
      this.$data.data = res.response.glacctList["glacct-list"];
    });
  }
});
</script>