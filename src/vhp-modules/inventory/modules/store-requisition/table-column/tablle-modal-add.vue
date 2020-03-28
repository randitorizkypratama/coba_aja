<template>
  <div id="FocRooms1" class="table-add">
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
export default {
  name: "FocTablesFocRooms",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Article",
        align: "start",
        value: "article",
        width: "92",
        divider: true
      },
      { text: "Quantity", value: "quantity", width: "102", divider: true },
      {
        text: "Description",
        value: "description",
        width: "200",
        divider: true
      },
      { text: "Price", value: "price", width: "85", divider: true },
      { text: "Amount", value: "amount", divider: true },
      { text: "Room Number", value: "roomNumber", width: "134", divider: true },
      { text: "Bill Date", value: "billDate", divider: true },
      { text: "Time", value: "time", divider: true },
      { text: "Actions", value: "action", sortable: false }
    ],
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
    }
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
    }
  }
};
</script>

<style lang="scss">
$primary: #1890ff;

#FocRooms1 .v-data-table td {
  height: 375px;
}

#FocRooms1 .v-data-table th {
  background: linear-gradient(#1488cc, #2b32b2);
  color: #ffffff;
  //   height: 14px;
}

#FocRooms1
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon {
  color: #ffffff;
  margin-left: 5px;
}

#FocRooms1
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon {
  color: rgba(255, 255, 255, 0.4);
}
.table-add {
  width: 327px;
  margin-left: 0px;
}
#FocRooms1 tbody tr:nth-of-type(even) {
  background-color: #c8e0f1a3;
}
</style>