/** @format */
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Actions from "../components/Actions.vue";
import tableItem from "../table-column/table-item.vue";
import addnew from "../components/modal-add/modal-new.vue";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  data() {
    return {
      data: "hello",
    };
  },

  components: {
    Navbar,
    Actions,
    tableItem,
    addnew,
  },

  methods: {
    open1(): any {
      (this.$refs.addNew as Vue & { open: () => void }).open();
    },
    search(radioButton: number, arrtcNumber: any) {
      if (radioButton == 1) {
        useFetchData("getInvArticleList", {
          sorttype: radioButton,
          lastArt: "*",
          lastArt1: "",
        }).then((res: any) => {
          (this.$refs.dataTable as Vue & {
            getData: (res: any, arrtcNumber: any, radioButton: any) => void;
          }).getData(res, arrtcNumber, radioButton);
        });
      } else if (radioButton == 2) {
        useFetchData("getInvArticleList", {
          sorttype: radioButton,
          lastArt: "*",
          lastArt1: "",
        }).then((res: any) => {
          (this.$refs.dataTable as Vue & {
            getData: (res: any, arrtcNumber: any, radioButton: any) => void;
          }).getData(res, arrtcNumber, radioButton);
        });
      } else {
        console.log("err");
      }
    },
  },
});
