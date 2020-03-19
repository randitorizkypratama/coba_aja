<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <div>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Dessert",
          align: "start",
          sortable: false,
          value: "vstring"
        }
      ],
      dialog: false,
      desserts: []
    };
  },

  methods: {
    someFunction() {
      this.dialog = true;
    },
    dataAccount(e) {
      for (let i = 0; i < e.length; i++) {
        console.log("kamu", e[i]);

        this.desserts.push(e[i]);
      }
    }
  }
};
</script>