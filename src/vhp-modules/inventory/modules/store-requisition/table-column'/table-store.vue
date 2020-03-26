<template>
  <div id="FocRooms">
    <v-data-table
      hide-default-footer
      pagination.sync="pagination"
      :headers="headers"
      :items="dataHotel"
      item-key="docu-nr"
      sort-by="article"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import utilsIssuing from "@/../utils/api/useFetchData";
import moment from "moment";
export default {
  name: "FocTablesFocRooms",
  data: () => ({
    dialog: false,
    headers: [],
    dataHotel: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    CostAlloc: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.headers.push(header[i]);
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.dataHotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dataHotel.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.dataHotel.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataHotel[this.editedIndex], this.editedItem);
      } else {
        this.dataHotel.push(this.editedItem);
      }
      this.close();
    },
    initialize() {
      this.dataHotel = [];
    },
    getData(data) {
      this.dataHotel = data;
    }
  }
};
</script>

<style lang="scss">
// .table-store {
//   margin-right: 10px;
//   margin-left: -20px;
// }
</style>
