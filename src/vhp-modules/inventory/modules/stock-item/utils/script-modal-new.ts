/** @format */
import Vue from "vue";
import Section from "../components/modal-add/selection/index.vue";
import Category from "../components/modal-add/selection/category.vue";
import UnitPrice from "../components/modal-add/selection/unit-price.vue";
import Additional from "../components/modal-add/selection/additional.vue";
import usePostData from "@/../utils/api/useFetchData";
export default Vue.extend({
  components: {
    Section,
    Category,
    UnitPrice,
    Additional
  },

  data: () => {
    return {
      dialog: false
    };
  },

  methods: {
    open(e: string) {
      this.$data.dialog = true;
      console.log("hidaa" + e);
    },
    clikcategory() {
      (this.$refs.category as Vue & { openHeader: () => void }).openHeader();
      (this.$refs.unitPrice as Vue & { close: () => void }).close();
      (this.$refs.addtional as Vue & { close: () => void }).close();
    },
    unitPrice() {
      (this.$refs.unitPrice as Vue & { open: () => void }).open();
      (this.$refs.category as Vue & { close: () => void }).close();
      (this.$refs.addtional as Vue & { close: () => void }).close();
    },
    additional() {
      (this.$refs.addtional as Vue & { openHeader: () => void }).openHeader();
      (this.$refs.unitPrice as Vue & { close: () => void }).close();
      (this.$refs.category as Vue & { close: () => void }).close();
    },
    dialogClick() {
      this.$data.dialog = false;
      usePostData("addInvArticle", {
        pvILanguage: 1,
        artnr: "1101060",
        dmlArt: "no",
        fibukonto: "00001103",
        bezAend: "no",
        sUnit: "1",
        ttArtnr: {
          "tt-artnr": []
        },
        ttContent: {
          "tt-content": []
        },
        lArt: {
          "l-art": [
            {
              zwkum: 101,
              endkum: 1,
              inhalt: "100",
              bezeich: "hadfinasyahida",
              artnr: "1101060",
              fibukonto: "00001103",
              jahrgang: "0",
              masseinheit: "1",
              betriebsnr: 2,
              traubensorte: "1",
              alkoholgrad: undefined,
              "lief-einheit": "30",
              "min-bestand": "1",
              anzverbrauch: "1",
              "lief-nr1": "?",
              "lief-artnr[1]": "?",
              "lief-nr2": "?",
              "lief-artnr[2]": "?",
              "lief-nr3": "?",
              "lief-artnr[3]": "?",
              "ek-aktuell": "1",
              "ek-letzter": "1",
              "vk-preis": "1",
              "wert-verbrau": "0"
            }
          ]
        }
      }).then((res: any) => {
        console.log("akusukakamu", res);
      });
    }
  }
});
