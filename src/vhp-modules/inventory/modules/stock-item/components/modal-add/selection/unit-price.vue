<!-- @format -->

<template>
  <v-col v-show="Header">
    <v-row>
      <v-col cols="6" md="3">
        <h5>Delivery Unit</h5>
        <v-text-field v-model="DATA.deliveryUnit" placeholder="Box" dense outlined></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Mess Unit</h5>
        <v-text-field v-model="DATA.messUnit" placeholder="KG" dense outlined></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Recipe Unit</h5>
        <v-text-field v-model="DATA.recipeUnit" placeholder="Gram" dense outlined></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <h5>Recipe Number</h5>
        <v-text-field @click.prevent="modalRecipe" v-model="DATA.recipeNumber" dense outlined></v-text-field>
        <modalRecipeNumber ref="openModal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>Unit Convertion</h4>
        <div>
          <h5>Language.Delivery_unit_conv</h5>
          <v-row>
            <v-col>
              <v-text-field v-model="this.DATA.deliveryUnit" disabled dense outlined></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="DATA.languageDelvery1" placeholder="30" dense outlined></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="this.DATA.messUnit" disabled dense outlined></v-text-field>
            </v-col>
          </v-row>
          <h5>Language.Delivery_unit_conv</h5>
          <v-row>
            <v-col>
              <v-text-field v-model="this.DATA.messUnit" disabled dense outlined></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="DATA.languageDelvery2" placeholder="100" dense outlined></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="this.DATA.recipeUnit" disabled dense outlined></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col>
        <h4>Unit Price</h4>
        <div>
          <h5>Actual Purchase Price</h5>
          <v-text-field v-model="DATA.actualPurchePrice" dense outlined></v-text-field>
          <h5>Last Price</h5>
          <v-text-field v-model="DATA.lastPrice" dense outlined></v-text-field>
          <h5>Average Purchase Price</h5>
          <v-text-field v-model="DATA.averagePurchase" dense outlined></v-text-field>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import modalRecipeNumber from "../selection/modalRecipeNumber.vue";
export default Vue.extend({
  components: {
    modalRecipeNumber
  },
  data() {
    return {
      Header: false,
      DATA: {
        deliveryUnit: "",
        messUnit: "",
        recipeUnit: "",
        recipeNumber: "",
        languageDelvery1: "",
        languageDelvery2: "",
        actualPurchePrice: "",
        lastPrice: "",
        averagePurchase: ""
      }
    };
  },

  methods: {
    modalRecipe() {
      (this.$refs.openModal as Vue & { openModal: () => void }).openModal();
    },
    open() {
      this.Header = true;
    },
    close() {
      this.Header = false;
    },
    saveData() {
      this.$emit("dataUnit", this.DATA);
    },
    getData(item: any) {
      this.$data.DATA.deliveryUnit =
        item.response.lArt["l-art"][0].traubensorte;
      this.$data.DATA.messUnit = item.response.lArt["l-art"][0].masseinheit;
      this.$data.DATA.languageDelvery1 = item.response.lArt["l-art"][0].inhalt;
      this.$data.DATA.languageDelvery2 =
        item.response.lArt["l-art"][0]["lief-einheit"];
      this.$data.DATA.recipeUnit = item.response.sUnit;
    }
  }
});
</script>
