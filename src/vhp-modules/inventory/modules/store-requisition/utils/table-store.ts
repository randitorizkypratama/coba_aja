/** @format */

import Vue from "vue";
import utilsIssuing from "@/../utils/api/useFetchData";
import moment from "moment";
export default Vue.extend({
  name: "FocTablesFocRooms",
  data: () => ({
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
      val || this.$data.close();
    }
  },
  // beforeCreate() {
  //   this.$data.initialize();
  // },
  created() {
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.$data.headers.push(header[i]);
    }
  },
  methods: {
    editItem(item: any) {
      this.editedIndex = this.$data.dataHotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$data.dialog = true;
    },
    deleteItem(item: any) {
      const index = this.$data.dataHotel.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.dataHotel.splice(index, 1);
    },
    close() {
      this.$data.dialog = false;
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
    getData(data: any) {
      this.dataHotel = data;
    }
  }
});
