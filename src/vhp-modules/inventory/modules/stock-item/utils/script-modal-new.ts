/** @format */
import Vue from "vue";
import Section from "../components/modal-add/selection/index.vue";
import Category from "../components/modal-add/selection/category.vue";
export default Vue.extend({
  components: {
    Section,
    Category
  },

  data: () => {
    return {
      dialog: false
    };
  },

  methods: {
    open(e: string) {
      this.dialog = true;
      console.log("hidaa" + e);
    },
    clikcategory() {
      (this.$refs.category as Vue & { openHeader: () => void }).openHeader();
    }
  }
});
