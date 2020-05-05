<template>
  <v-col cols="4" md="6" v-show="Header">
    <h3>Main Group</h3>
    <v-select
      v-model="dataNew.requesNo"
      :items="mainGroup"
      item-value="value"
      item-text="label"
      @input="clickMainGrup"
      dense
      outlined
      :disabled="disabled1"
    ></v-select>
    <h3>Sub Group</h3>
    <v-select
      v-model="dataNew.subGroupModel"
      :items="subGroup"
      item-value="value"
      item-text="label"
      dense
      outlined
      :disabled="disabled2"
    ></v-select>
    <h3>Article Number</h3>
    <v-text-field
      v-model="dataNew.articelNumber"
      :items="articelNumber"
      class="select"
      dense
      outlined
      disabled
    ></v-text-field>
    <v-row>
      <v-btn>No</v-btn>
      <v-btn>Yes</v-btn>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import useFetchData from "@/../utils/api/useFetchData";
export default Vue.extend({
  data() {
    return {
      Header: true,
      mainGroup: [],
      subGroup: [],
      dataNew: {
        requesNo: "",
        subGroupModel: "",
        articelNumber: ""
      },
      disabled1: false,
      disabled2: true
    };
  },
  methods: {
    openHeader(tes: any) {
      this.Header = true;
    },
    close() {
      this.Header = false;
    },
    getData(e: any) {
      const data = e.response.tLHauptgrp["t-l-hauptgrp"];

      for (const i in data) {
        this.$data.mainGroup.push({
          label: data[i].bezeich,
          value: data[i].endkum
        });
      }
    },

    getData2(res: any, item: any) {
      if (item !== undefined) {
        this.$data.disabled1 = false;
        this.$data.disabled2 = true;
      }
      const data = res.response.tLHauptgrp["t-l-hauptgrp"];

      for (const i in data) {
        this.$data.mainGroup.push({
          label: data[i].bezeich,
          value: data[i].endkum
        });
      }

      this.dataNew.articelNumber = item.response.lArt["l-art"][0].artnr;
      this.dataNew.requesNo = item.response.lArt["l-art"][0].zwkum;
    },
    clickMainGrup() {
      this.$data.disabled2 = false;
      useFetchData("getInvSubGroup", {
        mainNr: this.$data.dataNew.requesNo
      }).then((res: any) => {
        const data = res.response.szwkumList["szwkum-list"];
        const hasil = data.map((item: any) => ({
          label: item.bezeich,
          value: item.zwkum
        }));
        this.$data.subGroup = hasil;
      });
    },
    saveData() {
      this.$emit("dataCategory", this.dataNew.articelNumber);
    }
  },
  updated() {
    useFetchData("getInvArtNo", {
      pvILanguage: 1,
      caseType: 2,
      inpInt: this.dataNew.requesNo,
      inpInt2: this.dataNew.subGroupModel,
      inpChar: " "
    }).then((res: any) => {
      if (res.response.outInt !== 1)
        this.$data.articelNumber = res.response.outInt;
    });
  }
});
</script>
