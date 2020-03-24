<!-- @format -->

<template>
  <v-container cols="1" md="3">
    <v-col cols="1" md="3">
      <v-select
        v-model="select"
        :items="mainGroup"
        item-text="label"
        item-value="value"
        label="ID"
        outlined
        solo-inverted
      ></v-select>

      <!-- <Datepicker cols="1" md="3" placeholder="Date" valuetype="format"></Datepicker> -->

      <v-spacer></v-spacer>

      <v-btn color="primary" block depressed small>
        <v-icon right dark>mdi-magnify</v-icon>Rounded Button
      </v-btn>

      <v-spacer></v-spacer>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Datepicker from "vue2-datepicker";
// import 'vue2-datepicker/index.css';
import ky from "ky";
// import Vue from "vue";

export default {
  name: "LeftAction",
  props: {
    dataPrepareID: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    // Datepicker
  },
  data() {
    return {
      dataPrepare: {}
    };
  },
  methods: {},
  watch: {
    dataPrepare: function() {
      console.log(this.dataPrepareID, "data from parent");

      this.$emit(`readDataPrepare`, this.dataPrepare);

      console.log(this.dataPrepare, "watch data prepare");
      console.log(this.dataPrepareID, "data from parent");
    }
  },
  mounted() {
    console.log(this.dataPrepare, "mounted data prepare");

    (async () => {
      const parsed = await ky
        .post(
          "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpOU/drugstoreDailyPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata"
              }
            }
          }
        )
        .json();
      this.dataPrepare = parsed.response;
      console.log(this.dataPrepare, "after pars data prepare");

      // console.log(
      //   this.$emit("readDataPrepareID", this.dataPrepare),
      //   "after pars data prepare"
      // );
    })();
  }
};
</script>
