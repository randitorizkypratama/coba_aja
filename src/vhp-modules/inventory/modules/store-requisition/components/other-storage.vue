<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card>
        <v-alert color="indigo" dark></v-alert>
        <v-container>
          <v-row>
            <v-col cols="6" md="3">
              <h5>Delivery Number</h5>
              <v-text-field
                v-model="tes"
                item-value="Delevery Number"
                item-text="label"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <h5>From Store</h5>
              <v-select
                dense
                outlined
                v-model="artnr"
                :items="fromStore"
                item-value="department"
                item-text="label"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3">
              <h5>To Store</h5>
              <v-select
                dense
                outlined
                v-model="artnr"
                :items="toStorage"
                item-value="value"
                item-text="label"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3">
              <h5>Accounting</h5>
              <v-select
                dense
                outlined
                v-model="artnr"
                :items="toStorage"
                item-value="value"
                item-text="label"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" md="0">
              <div class="my-2">
                <div class="my-2">
                  <v-btn text small @click="bukaHeader" color="primary">Header</v-btn>
                </div>
                <div class="my-2">
                  <v-btn text small @click="bukaItem" color="primary">Item</v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="4" md="6" v-show="Header">
              <h5>Departmen</h5>
              <v-select
                v-model="artnr"
                :items="fromDept"
                item-value="value"
                item-text="label"
                dense
                outlined
              ></v-select>
              <h5>Date</h5>
              <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="dateRangeText"
                    clearable
                    v-on="on"
                    @click:clear="date = null"
                    dense
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="0" md="4" v-show="Itemz">
              <v-row>
                <v-select
                  v-model="input"
                  :items="items"
                  item-value="value"
                  item-text="label"
                  label="Select"
                  dense
                  outlined
                ></v-select>

                <v-text-field
                  v-model="users.email"
                  :items="items"
                  item-value="value"
                  item-text="label"
                  label="Unit And Content Per Unit"
                  disabled="true"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="artnr"
                  :items="items"
                  item-value="value"
                  item-text="label"
                  label="Stock"
                  disabled="true"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="users"
                  :items="items"
                  item-value="value"
                  item-text="label"
                  dense
                  outlined
                  :error-messages="selectErrors"
                  @input="$v.users.$touch()"
                  @blur="$v.users.$touch()"
                  required
                  id="users"
                ></v-text-field>
                <v-text-field
                  v-model="artnr"
                  :items="items"
                  item-value="value"
                  item-text="label"
                  label="Amount"
                  disabled="true"
                  dense
                  outlined
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn depressed small @click="add" color="primary">Add</v-btn>
        </v-card-actions>
        <modelStorage ref="child" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, users } from "vuelidate/lib/validators";
import modelStorage from "./modal-add-other";
export default {
  data() {
    return {
      users: "",
      Header: true,
      Itemz: false,
      fromStore: [],
      toStorage: [],
      dialog: false,
      picker: new Date().toISOString().substr(0, 10),
      ranges: [],
      error: false,
      fromDept: [],
      toDept: []
    };
  },
  mixins: [validationMixin],
  components: {
    modelStorage
  },
  props: {
    source: String
  },
  validations: {
    users: { required, users },
    select: { required }
  },
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.users.required && errors.push("Item is required");
      return errors;
    }
  },
  methods: {
    someFunction(dept, store, dialog, date) {
      for (const i in dept) {
        this.fromDept.push(dept[i]);
        for (const i in store) {
          this.fromStore.push({
            label: store[i].bezeich,
            value: store[i]["lager-nr"]
          });
          this.toStorage.push({
            label: store[i].bezeich,
            value: store[i]["lager-nr"]
          });
        }
      }
      this.dialog = true;
      this.ranges = date;
    },
    bukaHeader() {
      (this.Header = true), (this.Itemz = false);
    },
    bukaItem() {
      (this.Itemz = true), (this.Header = false);
    },
    add() {
      this.$v.$touch();
      console.log("tes", this.users);
      const errors = [];
      if (this.users !== "") {
        this.dialog = false;
        this.$refs.child.someFunction();
      } else {
        console.log("tes", "gagal");
        const errors = [];
        !this.$v.users.required && errors.push("E-mail is required");
        return errors;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.v-select
  margin-top: 2px
  padding-top: 3px

</style>