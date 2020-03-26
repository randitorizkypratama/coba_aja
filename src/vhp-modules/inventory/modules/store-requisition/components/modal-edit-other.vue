<template>
  <v-row justify="center">
    <!-- <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-alert color="indigo" dark></v-alert>
        <v-container>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Dessert name" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Calories" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Fat (g)" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Carbs (g)" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Protein (g)" dense outlined></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn depressed small @click="save" color="primary">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-row>
</template>




<script>
export default {
  // data() {
  //   return {
  //     dialog: false,
  //     editedIndex: -1,
  //     editedItem: {
  //       name: "",
  //       calories: 0,
  //       fat: 0,
  //       carbs: 0,
  //       protein: 0
  //     },
  //     defaultItem: {
  //       name: "",
  //       calories: 0,
  //       fat: 0,
  //       carbs: 0,
  //       protein: 0
  //     }
  //   };
  // },
  // methods: {
  //   fungsiAdd(item) {
  //     this.dialog = true;
  //   },
  //   save() {
  //     console.log("tes", "save");
  //     this.dialog = false;
  //   }
  // }
};
</script>

