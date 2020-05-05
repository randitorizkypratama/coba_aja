<!-- @format -->

<template>
  <div id="FocRooms2">
    <v-data-table
      item-key="docu-nr"
      sort-by="calories"
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      attribute
      @update:options="options"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="edit(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <editItem ref="editModal" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tableItem } from "../header/header-table-item";
import useFetchData from "@/../utils/api/useFetchData";
import editItem from "../components/modal-modify.vue";
export default Vue.extend({
  components: {
    editItem
  },

  data: () => ({
    dialog: false,
    headers: [],
    desserts: [],
    editedIndex: -1,
    dataArticle: "",
    radioButton: ""
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  created() {
    this.initialize();
    const header = tableItem;
    for (const i in header) {
      this.$data.headers.push(header[i]);
    }
  },

  methods: {
    initialize() {
      this.desserts = [];
    },
    getData(data: any, arrtcNumber: any, radioButton: any) {
      this.$data.radioButton = radioButton;
      this.dataArticle = data;
      const dataTable = data.response.tLArtikel["t-l-artikel"];
      const hasilFilter = dataTable.filter((hasil: any) => {
        return hasil.artnr.toString().includes(arrtcNumber.toString());
      });
      this.$data.desserts = arrtcNumber == "" ? dataTable : hasilFilter;
    },
    options() {
      useFetchData("getInvArticleList", {
        sorttype: this.$data.radioButton,
        lastArt: this.$data.dataArticle.response.firstArtnr,
        lastArt1: this.$data.dataArticle.response.currArt1
      }).then((res: any) => {
        this.$data.dataArticle = res;
        const dataArtikel = res.response.tLArtikel["t-l-artikel"];
        for (const i in dataArtikel) {
          this.$data.desserts.push(dataArtikel[i]);
        }
      });
    },
    edit(item: any) {
      useFetchData("chgInvArticlePrepare", {
        artnr: item.artnr,
        changed: "no"
      }).then((res: any) => {
        (this.$refs.editModal as Vue & {
          openModal: (res: any) => void;
        }).openModal(res);
      });
    }
  }
});
</script>

<style src="../style/table-item.scss" lang="scss"></style>
