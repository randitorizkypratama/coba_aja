/** @format */

import Vue from "vue";
import ModalNew from "../components/other-storage.vue";
export default Vue.extend({
  components: {
    ModalNew
  },
  data() {
    return {
      dialog: false,
      Cunsumed: true,
      dialogm1: ""
    };
  },
  methods: {
    someFunction() {
      this.dialog = true;
    },
    next() {
      if (this.dialogm1 == this.dialogm1) {
        (this.$refs.child as Vue & {
          someFunction: (dialogm1: any) => void;
        }).someFunction(this.dialogm1);
        this.dialog = false;
      } else if (this.dialogm1 == this.dialogm1) {
        (this.$refs.child as Vue & {
          someFunction: (dialogm1: any) => void;
        }).someFunction(this.dialogm1);
        this.dialog = false;
      } else {
        console.log("err");
      }
    }
  }
});
