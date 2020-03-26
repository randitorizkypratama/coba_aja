<template>
  <v-col v-show="items">
    <v-row>
      <v-col cols="0" md="4">
        <v-select
          v-model="input"
          :items="items"
          item-value="value"
          item-text="label"
          label="Select"
          dense
          outlined
        ></v-select>
        <h5>Unit And Content Per Unit</h5>
        <v-text-field
          :items="items"
          item-value="value"
          item-text="label"
          disabled="true"
          dense
          outlined
        ></v-text-field>
        <h5>Stock Onhand</h5>
        <v-text-field
          :items="items"
          item-value="value"
          item-text="label"
          disabled="true"
          dense
          outlined
        ></v-text-field>
        <v-text-field :items="items" item-value="value" item-text="label" dense outlined></v-text-field>
        <h5>Price</h5>
        <v-text-field
          :items="items"
          item-value="value"
          item-text="label"
          disabled="true"
          dense
          outlined
        ></v-text-field>
        <h5>Amount</h5>
        <v-text-field
          :items="items"
          item-value="value"
          item-text="label"
          disabled="true"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <tableAdd />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import tableAdd from "../table-column'/tablle-modal-add";
export default {
  data: () => {
    return {
      items: false
    };
  },

  components: {
    tableAdd
  },

  methods: {
    openTable() {
      this.items = true;
    },
    closeTable() {
      this.items = false;
    }
  }
};
</script>