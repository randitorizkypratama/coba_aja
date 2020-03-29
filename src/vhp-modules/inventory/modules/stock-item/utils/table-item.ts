/** @format */

import Vue from "vue";
import { tableItem } from "../header/header-table-item";
export default Vue.extend({
  name: "FocTablesFocRooms",
  data: () => ({
    headers: [],
    dataHotel: [],
    editedIndex: -1
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
    const header = tableItem;
    for (const i in header) {
      this.$data.headers.push(header[i]);
    }
  },
  methods: {
    getData(data: any, arrtcNumber: any) {
      const dataTable = data.response.tLArtikel["t-l-artikel"];
      const hasilFilter = dataTable.filter((hasil: any) => {
        return hasil.artnr.toString().includes(arrtcNumber.toString());
      });
      this.$data.dataHotel = arrtcNumber == "" ? dataTable : hasilFilter;
    },

    editItem(item: any) {
      this.editedIndex = this.$data.dataHotel.indexOf(item);
      this.$data.editedItem = Object.assign({}, item);
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
        this.$data.editedItem = Object.assign({}, this.$data.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataHotel[this.editedIndex], this.$data.editedItem);
      } else {
        this.$data.dataHotel.push(this.$data.editedItem);
      }
      this.close();
    }
  }
});
