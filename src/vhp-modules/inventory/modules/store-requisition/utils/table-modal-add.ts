/** @format */

import Vue from "vue";

export default Vue.extend({
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
      val || this.$data.close();
    }
  },
  created() {
    this.$data.initialize();
  },

  methods: {
    editItem(item: any) {
      this.editedIndex = this.$data.dataHotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item: any) {
      const index = this.$data.dataHotel.indexOf(item);
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
        this.$data.dataHotel.push(this.editedItem);
      }
      this.close();
    },
    initialize() {
      this.dataHotel = [];
    }
  }
});
