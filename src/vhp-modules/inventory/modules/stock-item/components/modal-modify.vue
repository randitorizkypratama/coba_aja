<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="900">
      <v-card>
        <v-card-title class="headline blue" primary-title>New</v-card-title>
        <v-card-text v-model="dataSave">
          <v-row>
            <v-col cols="3" md="3" class="left-store">
              <Section @Category="clikcategory" @unitPrice="unitPrice" @additional="additional" />
            </v-col>
            <v-col v-model="dataModalNew">
              <v-col>
                <v-col cols="4" md="6">
                  <h3>Name</h3>
                  <v-text-field v-model="nama" class="select" dense outlined></v-text-field>
                </v-col>
              </v-col>
              <v-col>
                <Category @dataCategory="dataCategory" ref="category" />
                <UnitPrice @dataUnit="dataUnit" ref="unitPrice" />
                <Additional @dataAdd="dataAdd" ref="addtional" />
              </v-col>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogClick">Close</v-btn>
            <v-btn color="primary" text @click="dialogClick">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Section from "../components/modal-add/selection/index.vue";
import Category from "../components/modal-add/selection/category.vue";
import UnitPrice from "../components/modal-add/selection/unit-price.vue";
import Additional from "../components/modal-add/selection/additional.vue";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  components: {
    Section,
    Category,
    UnitPrice,
    Additional
  },
  data: () => {
    return {
      dialog: false,
      nama: "",
      dataNew: {
        category: "",
        unitPrice: {
          RecipeUnit: ""
        },
        addtional: ""
      }
    };
  },
  methods: {
    dataCategory(e: any) {
      this.dataNew.category = e;
    },
    dataUnit(e: any) {
      this.dataNew.unitPrice.RecipeUnit = e.recipeUnit;
    },
    dataAdd(e: any) {
      this.dataNew.addtional = e;
    },
    openModal(item: any) {
      this.dialog = true;
      this.nama = item.response.lArt["l-art"][0].bezeich;
      useFetchData("getInvMainGroup", {}).then((res: any) => {
        (this.$refs.category as Vue & {
          getData2: (res: any, item: any) => void;
        }).getData2(res, item);
        (this.$refs.unitPrice as Vue & {
          getData: (item: any) => void;
        }).getData(item);
        (this.$refs.addtional as Vue & {
          getData: (res: any, item: any) => void;
        }).getData(res, item);
      });
    },
    dialogClick() {
      console.log("sukses12345", this.dataNew.unitPrice);
      console.log("sukses12345", this.dataNew.unitPrice.RecipeUnit);
      this.dialog = false;
      useFetchData("chgInvArticleSave", {
        pvILanguage: 1,
        ttArtnr: {
          "tt-artnr": []
        },
        ttContent: {
          "tt-content": []
        },
        sUnit: this.$data.dataNew.unitPrice.RecipeUnit,
        artnr: this.$data.dataNew
      });

      (this.$refs.category as Vue & { saveData: () => void }).saveData();
      (this.$refs.unitPrice as Vue & { saveData: () => void }).saveData();
      (this.$refs.addtional as Vue & { saveData: () => void }).saveData();
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
    }
  }
});
</script>