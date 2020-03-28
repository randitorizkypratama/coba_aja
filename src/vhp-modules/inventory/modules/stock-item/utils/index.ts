/** @format */
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Actions from "../components/Actions.vue";
import tableItem from "../table-column/table-item.vue";
import addnew from "../components/modal-new.vue";
export default Vue.extend({
  data() {
    return {
      data: "hello"
    };
  },

  components: {
    Navbar,
    Actions,
    tableItem,
    addnew
  },

  methods: {
    open1(): any {
      (this.$refs.addNew as Vue & { open: (data: string) => void }).open(
        this.data
      );
    }
  }
});
