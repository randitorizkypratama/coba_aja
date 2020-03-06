<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
        <!-- <v-img :src="kosong" class="my-3" contain height="200" /> -->
      </v-col>
    </v-row>
    <!-- {{kosong}} -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ky from "ky";
export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    kosong: "",
    language: []
  }),

  methods: {
    submit() {
      localStorage.clear();
      this.$router.push("/");
    },
    reformData(tempDate) {
      for (let i = 0; i < tempDate.length; i++) {
        const element = tempDate[i];
        language.push({
          value: element["country-id"],
          label: element["country-name"]
        });
      }

      return language;
    }
  },
  // beforeCreate() {
  //   (async () => {
  //     const parsed = await ky.get("http://localhost:3000/gambar").json();
  //     // console.log(parsed[0].gambar);
  //     this.kosong = parsed[0].gambar;
  //   })();
  // },
  beforeCreate() {
    (async () => {
      const language = await ky
        .post(
          "http://54.251.169.160:8080/logserver/rest/loginServer/loadLanguages",
          {
            json: {
              request: {
                iCase: "0"
              }
            }
          }
        )
        .json();

      // console.log(language.response.tLanguages["t-languages"], "language");
      tempData = reformData(
        dataReport.data.tLanguages
          ? dataReport.data.tLanguages["t-languages"]
          : []
      );
      //=> `{data: '🦄'}`
    })();
  }
});
</script>
