/** @format */

import Vue from "vue";
import tableAdd from "../table-column/tablle-modal-add.vue";
export default Vue.extend({
  components: {
    tableAdd
  },
  data: () => {
    return {
      items: false
    };
  },
  methods: {
    openTable() {
      this.items = true;
    },
    closeTable() {
      this.items = false;
    }
  }
});
