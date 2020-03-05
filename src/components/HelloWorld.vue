<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
    <div class="my-2">
      <v-btn small @click="submit" color="primary">Log-out</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({}),

  methods: {
    submit() {
      localStorage.removeItem("login");
      this.$router.push("/");
    }
  }
});
</script>
