<template>
  <div id="FocLeft" class="foc-main">
    <v-menu v-model="menu1" :close-on-content-click="false" max-width="300">
      <template v-slot:activator="{ on }">
        <h5>Date</h5>
        <v-text-field
          class="select"
          :value="dateRangeText"
          append-icon="mdi-calendar"
          clearable
          v-on="on"
          @click:clear="date = null"
          dense
          outlined
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="ranges" @change="menu1 = false" range>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="menu = false" text>Cancel</v-btn>
        <v-btn color="primary" @click="$refs.menu.save(date)" text>OK</v-btn>
      </v-date-picker>
    </v-menu>
    <h5>From Departemen</h5>
    <v-select
      class="select"
      v-model="fromDepartement"
      :items="fromDept"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h5>To Departemen</h5>
    <v-select
      class="select"
      v-model="toDepartemen"
      :items="toDept"
      item-value="value"
      item-text="label"
      dense
      outlined
    ></v-select>
    <h5>Request No</h5>
    <v-text-field
      v-model="requesNo"
      :items="mainGroup"
      item-text="label"
      item-value="value"
      class="select"
      dense
      outlined
    ></v-text-field>
    <v-btn color="primary" block @click="search">
      <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
    </v-btn>
  </div>
</template>

<script>
import utilsIssuing from "@/../utils/api/useFetchData";
import moment from "moment";

export default {
  methods: {
    open() {
      this.$refs.child.someFunction(this.fromDept, this.dataStore, this.ranges);
    },
    search() {
      this.$emit(
        "clicked",
        this.ranges,
        this.fromDepartement,
        this.toDepartemen,
        this.requesNo,
        this.fromDept
      );
    }
  },

  data: () => {
    return {
      requesNo: " ",
      fromDepartement: [],
      toDepartemen: [],
      fromDept: [],
      toDept: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: [],
      headers: []
    };
  },

  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },

  created() {
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.headers.push(header[i]);
    }
  },
  beforeCreate() {
    utilsIssuing("storeReqPrepare").then(res => {
      this.ranges.push(res.response.fromDate);
      this.ranges.push(res.response.toDate);
      const data = res.response.tLUntergrup["t-l-untergrup"];
      for (const i in data) {
        this.fromDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
        this.toDept.push({
          label: data[i].bezeich,
          value: data[i].zwkum
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.foc-main__article__toggle {
  width: 100%;
}

.foc-main__article__toggle-btn {
  width: 50%;
}
</style>
