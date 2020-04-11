<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title>Actual Quantity</v-card-title>
        <v-card-text style="height: 100px;">
          <v-radio-group v-model="dialogm1" column>
            <v-radio label="Transfer to orther storage" value="orther-storage"></v-radio>
            <v-radio label="Out going / Cunsumed" value="Cunsumed"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" text @click="next">Select</v-btn>
        </v-card-actions>
        <ModalNew ref="child" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="../utils/modal-add.ts">
</script>