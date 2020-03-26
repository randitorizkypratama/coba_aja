<template>
  <v-row justify="center">
    <!-- <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card>
        <v-alert color="indigo" dark></v-alert>
        <v-container>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <editAdd ref="child" />
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn depressed small @click="add" color="primary">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-row>
</template>
<script>
import editAdd from "./modal-edit-other";
export default {
  // components: {
  //   editAdd
  // },
  // data() {
  //   return {
  //     dialog: false,
  //     headers: [
  //       {
  //         text: "Dessert (100g serving)",
  //         align: "start",
  //         sortable: false,
  //         value: "name"
  //       },
  //       { text: "Calories", value: "calories" },
  //       { text: "Fat (g)", value: "fat" },
  //       { text: "Carbs (g)", value: "carbs" },
  //       { text: "Protein (g)", value: "protein" },
  //       { text: "Actions", value: "actions", sortable: false }
  //     ],
  //     desserts: [
  //       {
  //         name: "Frozen Yogurt",
  //         calories: 159,
  //         fat: 6.0,
  //         carbs: 24,
  //         protein: 4.0
  //       },
  //       {
  //         name: "Ice cream sandwich",
  //         calories: 237,
  //         fat: 9.0,
  //         carbs: 37,
  //         protein: 4.3
  //       },
  //       {
  //         name: "Eclair",
  //         calories: 262,
  //         fat: 16.0,
  //         carbs: 23,
  //         protein: 6.0
  //       }
  //     ]
  //   };
  // },
  // methods: {
  //   someFunction() {
  //     this.dialog = true;
  //   },
  //   deleteItem(item) {
  //     const index = this.desserts.indexOf(item);
  //     confirm("Are you sure you want to delete this item?") &&
  //       this.desserts.splice(index, 1);
  //   },
  //   editItem(item) {
  //     this.$refs.child.fungsiAdd(item);
  //   },
  //   add() {
  //     this.dialog = false;
  //   }
  // }
};
</script>