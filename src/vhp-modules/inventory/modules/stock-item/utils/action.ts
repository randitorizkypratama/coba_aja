/** @format */

import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      data: [],
      radioButton: 0,
      requesNo: ""
    };
  },

  methods: {
    search() {
      this.$emit("clicked", this.radioButton, this.requesNo);
    }
  }
});
