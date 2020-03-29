/** @format */

import Vue from "vue";
export default Vue.extend({
  methods: {
    category() {
      this.$emit("Category");
    }
  }
});
