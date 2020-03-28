/** @format */
import Vue from "vue";
export default Vue.extend({
  data: () => {
    return {
      dialog: false
    };
  },

  methods: {
    open(e: string) {
      this.dialog = true;
      console.log("hidaa" + e);
    }
  }
});
