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
            <v-data-table item-key="bezeich" :headers="headers" :items="dataTable"></v-data-table>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tableModal } from "../../../header/header-table-item";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  data: () => {
    return {
      dialog: false,
      headers: "",
      dataTable: ""
    };
  },

  created() {
    this.$data.headers = tableModal;
  },
  methods: {
    openModal() {
      this.dialog = true;
    }
  },
  beforeCreate() {
    useFetchData("getInvRecipe", {
      caseType: 2,
      int1: "",
      int2: "",
      int3: "",
      char1: "",
      date1: ""
    }).then((res: any) => {
      this.$data.dataTable = res.response.tHRezept["t-h-rezept"];
    });
  }
});
</script>
