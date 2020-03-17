<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <h4>Date</h4>
          <v-select
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense="true"
            outlined
          ></v-select>
          <v-select
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense="true"
            outlined
          ></v-select>
          <v-select
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            label="Select Article"
            dense="true"
            outlined
          ></v-select>
          <br />
          <v-autocomplete
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Group"
            outlined
            dense
          ></v-autocomplete>

          <v-btn class="mb-3" color="primary" @click="search" block depressed large>
            <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="12" md="9">
          <v-data-table
            :headers="headers"
            :items="datas"
            item-key="docu-nr"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
            rows-per-page-items="[15, 30, 50, 100]"
            pagination.sync="pagination"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  },

  data: () => {
    return {
      mainGroup: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: "Date",
          align: "start",
          value: "bestelldatum"
        },
        { text: "Storage", value: "storage" },
        { text: "Document Number", value: "docu-nr" },
        { text: "Article", value: "article" },
        { text: "Description", value: "description" },
        { text: "Outgoing Quantity", value: "outgoing-quantity" },
        { text: "Average Price", value: "average-price" },
        { text: "Amount", value: "amount" },
        { text: "ID", value: "id" }
      ],
      artnr: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },

  beforeCreate() {
    this.$store.dispatch("issuing", {
      inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
      inputUsername: "sindata",
      LnLProg: "stock-outlist.lst"
    });

    const data = this.$store.state;
    console.log("credentials", data);
  }
};
</script>
<style>
p.dashed {
  border-style: dashed;
}
</style>