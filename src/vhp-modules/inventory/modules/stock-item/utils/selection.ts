/** @format */

import Vue from "vue";
export default Vue.extend({
  methods: {
    category() {
      this.$emit("Category");
    },
    unitPrice() {
      this.$emit("unitPrice");
    },
    additionalInfo() {
      this.$emit("additional");
    }
  }
});
