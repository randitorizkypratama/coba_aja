/** @format */

import Vue from "vue";

export default Vue.extend({
  methods: {
    bukaHeader() {
      this.$emit("Header");
    },
    bukaItem() {
      this.$emit("Item");
    }
  }
});
