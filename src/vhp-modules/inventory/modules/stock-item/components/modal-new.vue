<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title class="headline blue" primary-title>New</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="10" md="12">
              <h5>Name</h5>
              <v-text-field
                v-model="requesNo"
                :items="mainGroup"
                item-text="label"
                item-value="value"
                class="select"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" text @click="dialog = false">Add</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script src="../utils/script-modal-new.ts">
</script>