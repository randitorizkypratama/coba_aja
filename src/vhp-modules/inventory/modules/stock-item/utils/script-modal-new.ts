/** @format */
import Vue from "vue";
import Section from "../components/modal-add/selection/index.vue";
import Category from "../components/modal-add/selection/category.vue";
import UnitPrice from "../components/modal-add/selection/unit-price.vue";
import Additional from "../components/modal-add/selection/additional.vue";
import usePostData from "@/../utils/api/useFetchData";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  components: {
    Section,
    Category,
    UnitPrice,
    Additional,
  },

  data: () => {
    return {
      dialog: false,
      dataSave: [],
      unitData: [],
      dataNew: {
        averagePurchase: "",
        unitAndPrice: "",
        addInfo: "",
        categoryData: "",
      },
    };
  },

  methods: {
    dataUnit(e: any) {
      this.dataNew.unitAndPrice = e;
    },
    dataAdd(e: any) {
      this.dataNew.addInfo = e;
    },
    dataCategory(e: any) {
      this.$data.dataNew.categoryData = e;
    },
    open(e: string) {
      this.$data.dialog = true;
      useFetchData("getInvMainGroup", {}).then((res: any) => {
        // console.log("hadfinasyahida", res);
        (this.$refs.category as Vue & { getData: (res: any) => void }).getData(
          res
        );
      });
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
      (this.$refs.unitPrice as Vue & { saveData: () => void }).saveData();
      (this.$refs.addtional as Vue & { saveData: () => void }).saveData();
      (this.$refs.category as Vue & { saveData: () => void }).saveData();
      this.$data.dialog = false;
      usePostData("addInvArticle", {
        pvILanguage: 1,
        artnr: this.$data.dataNew.categoryData,
        dmlArt: "no",
        fibukonto: "00001103",
        bezAend: "no",
        sUnit: this.$data.dataNew.unitAndPrice.recipeUnit,
        ttArtnr: {
          "tt-artnr": [],
        },
        ttContent: {
          "tt-content": [],
        },
        lArt: {
          "l-art": [
            {
              zwkum: 101,
              endkum: 1,
              inhalt: this.$data.dataNew.unitAndPrice.languageDelvery2,
              bezeich: this.$data.dataNew.averagePurchase,
              artnr: this.$data.dataNew.categoryData,
              fibukonto: "00001103",
              jahrgang: "0",
              masseinheit: this.$data.dataNew.unitAndPrice.messUnit,
              betriebsnr: 2,
              traubensorte: this.$data.dataNew.unitAndPrice.deliveryUnit,
              alkoholgrad: undefined,
              "lief-einheit": this.$data.dataNew.unitAndPrice.languageDelvery1,
              "min-bestand": this.$data.dataNew.addInfo.minStock,
              anzverbrauch: this.$data.dataNew.addInfo.maxStock,
              "lief-nr1": "?",
              "lief-artnr[1]": "?",
              "lief-nr2": "?",
              "lief-artnr[2]": "?",
              "lief-nr3": "?",
              "lief-artnr[3]": "?",
              "ek-aktuell": this.$data.dataNew.unitAndPrice.actualPurchePrice,
              "ek-letzter": this.$data.dataNew.unitAndPrice.lastPrice,
              "vk-preis": this.$data.dataNew.unitAndPrice.averagePurchase,
              "wert-verbrau": "0",
            },
          ],
        },
      }).then((res: any) => {
        // console.log("akusukakamu", res);
      });
    },
  },
});
