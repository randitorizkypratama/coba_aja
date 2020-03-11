<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-select v-model="select" :items="items" item-value="value" label="Language" outlined></v-select>
          <v-btn color="primary" block depressed large>
            <v-icon right dark>mdi-magnify</v-icon>Rounded Button
          </v-btn>

          <v-spacer></v-spacer>

          <div>
            <p class="dashed">A dashed border.</p>
          </div>
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
    kosong: ""
  })
};
</script>