/** @format */

import Vue from "vue";
import { tableItem } from "../header/header-table-item";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  name: "FocTablesFocRooms",
  data: () => ({
    headers: [],
    dataHotel: [],
    editedIndex: -1,
    dataArticle: ""
    // arrtcNumber: ""
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
      this.dataArticle = data;
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
    },

    handleScroll: function() {
      // console.log("sukses1234", this.$data.dataArticle.response.currArt1);
      useFetchData("getInvArticleList", {
        sorttype: 1,
        lastArt: this.$data.dataArticle.response.firstArtnr,
        lastArt1: this.$data.dataArticle.response.currArt1
      }).then((res: any) => {
        console.log("sukses123", res);
      });
    }
  },

  beforeUpdate() {
    window.addEventListener("scroll", this.handleScroll);
  }
});
