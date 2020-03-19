<template>
  <v-app>
    <NavBar />
    <div>
      <LeftAction :dataPrepareID="dataPrepare" @readDataPrepare="readDataPrepare" />
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import LeftAction from "./components/left-action.vue";

export default {
  name: "Tes-Report",
  components: {
    NavBar,
    LeftAction
  },
  data() {
    return {
      dataPrepare: {},
      dataTest: { key: "data in parent" }
    };
  },
  methods: {
    readDataPrepare(dataPrepareID) {
      console.log(dataPrepareID, "read data prepare");
    }
  }
  // ,
  // watch: {
  //   dataPrepare: function() {
  //     // this.$emit("dataPrepare", this.dataPrepare);
  //     console.log(this.dataPrepare, "hiya hiya");
  //   }
  // }
  // ,
  // computed: {
  //   dataPrepare: {
  //     get: function() {
  //       return this.dataPrepare;
  //     }
  //   }
  // }
};
</script>
