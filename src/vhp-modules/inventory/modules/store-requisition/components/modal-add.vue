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

<script>
import ModalNew from "./other-storage";
export default {
  data() {
    return {
      dialog: false,
      Cunsumed: true,
      dialogm1: "",
      datatoDept: [],
      dataStore: [],
      date: []
    };
  },
  components: {
    ModalNew
  },
  methods: {
    someFunction(dept, store, ranges) {
      this.datatoDept = dept;
      this.dataStore = store;
      this.date = ranges;
      this.dialog = true;
    },
    next() {
      if (this.dialogm1 == this.dialogm1) {
        this.$refs.child.someFunction(
          this.datatoDept,
          this.dataStore,
          this.dialogm1,
          this.date
        );
        this.dialog = false;
      } else if (this.dialogm1 == this.dialogm1) {
        this.$refs.child.someFunction(
          this.datatoDept,
          this.dataStore,
          this.dialogm1,
          this.date
        );
        this.dialog = false;
      } else {
        console.log("err");
      }
    },
    dataTable(e) {
      console.log("asuuui", e);
    }
  }
};
</script>