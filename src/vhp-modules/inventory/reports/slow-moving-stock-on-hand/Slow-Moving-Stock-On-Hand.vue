<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-select
            v-model="select"
            :items="mainGroup"
            item-value="value"
            label="Main Group"
            outlined
            solo-inverted
          ></v-select>
          <v-select
            v-model="select"
            :items="storeNumber"
            item-value="value"
            label="Store Number"
            outlined
            solo-inverted
          ></v-select>
          <v-text-field label="Days" solo-inverted outlined></v-text-field>
          <v-btn color="primary" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>

          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="12" md="9">
          <v-data-table
            :headers="headers"
            :items="desserts"
            item-key="name"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  },
  data: () => ({
    mainGroup: [],
    storeNumber: [],
    headers: [
      {
        text: "Article Number",
        align: "start",
        value: "firma"
      },
      { text: "Name", value: "docu-nr" },
      { text: "Minimum On Hand", value: "traubensort" },
      { text: "Current On Hand", value: "lief-einheit" },
      { text: "Average Price", value: "betriebsnr" },
      { text: "Actual Price", value: "anzahl" },
      { text: "Last Purchase Date", value: "einzelpreis" }
    ]
  })
};
</script>