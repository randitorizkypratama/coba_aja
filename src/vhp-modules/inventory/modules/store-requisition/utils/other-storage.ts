/** @format */

import Vue from "vue";
import actionModal from "../components/action-modal-add.vue";
import modalAddStore from "../components/modal-add-store.vue";
import Header from "../components/Header.vue";
import TableItem from "../components/Item.vue";
export default Vue.extend({
  components: {
    // modelStorage,
    actionModal,
    modalAddStore,
    Header,
    TableItem
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    dateRangeText() {
      return this.$data.ranges.join(" - ");
    }
  },
  methods: {
    someFunction() {
      this.dialog = true;
    },
    bukaHeader() {
      (this.$refs.header as Vue & { openTable: () => void }).openTable(),
        (this.$refs.item as Vue & { closeTable: () => void }).closeTable();
    },
    bukaItem() {
      (this.$refs.item as Vue & { openTable: () => void }).openTable(),
        (this.$refs.header as Vue & { closeTable: () => void }).closeTable();
    }
  }
});
