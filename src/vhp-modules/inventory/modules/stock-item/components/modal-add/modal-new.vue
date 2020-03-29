<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="900">
      <v-card>
        <v-card-title class="headline blue" primary-title>New</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3" md="3" class="left-store">
              <Section @Category="clikcategory" />
            </v-col>
            <v-col>
              <v-col>
                <v-col cols="4" md="6">
                  <h3>Name</h3>
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
              </v-col>
              <v-col>
                <Category ref="category" />
              </v-col>
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


<script src="../../utils/script-modal-new.ts">
</script>