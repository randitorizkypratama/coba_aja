<!-- @format -->

<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="300">
            <template v-slot:activator="{ on }">
              <v-text-field
                class="select"
                :value="dateRangeText"
                clearable
                label="Date"
                v-on="on"
                @click:clear="date = null"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>
          <!-- <v-card width="190" height="49" outlined> -->
          <h5>From Dapertemen</h5>
          <v-select
            class="select"
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            dense
            outlined
          ></v-select>

          <!-- </v-card> -->
          <h5>To Dapertemen</h5>
          <v-select
            class="select"
            v-model="artnr"
            :items="items"
            item-value="value"
            item-text="label"
            dense
            outlined
          ></v-select>
          <h5>Group</h5>
          <v-select
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            class="select"
            dense
            outlined
          ></v-select>
          <v-btn class="button" color="primary" @click="search">
            <v-icon right dark class="mr-1">mdi-magnify</v-icon>Search
          </v-btn>
          <v-spacer></v-spacer>
        </v-col>

        <v-col cols="2" md="9">
          <div class="my-2">
            <v-btn @click="open" class="add" depressed small color="primary">Add</v-btn>
          </div>
          <modalAdd ref="child" />
          <v-data-table
            id="label123"
            :headers="headers"
            :items="CostAlloc"
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
import utilsIssuing from "@/../utils/api/useFetchData";
import modalAdd from "./components/modal-add";

export default {
  components: {
    NavBar,
    modalAdd
  },

  methods: {
    open() {
      this.$refs.child.someFunction();
    }
  },

  data: () => {
    return {
      CostAlloc: [],
      items: [],
      picker: new Date().toISOString().substr(0, 10),
      ranges: [],
      headers: [],
      artnr: "",
      pagination: {
        rowsPerPage: 30
      },
      uname: "",
      ukey: ""
    };
  },

  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  },

  created() {
    const header = this.$store.state.headers;
    for (const i in header) {
      this.headers.push(header[i]);
    }
  },
  beforeCreate() {
    utilsIssuing("storeReqPrepare").then(res => {
      const data = res.response.tLLager["t-l-lager"];
      for (const i in data) {
        this.items.push({
          label: data[i].bezeich,
          value: data[i]["lager-nr"]
        });
      }
    });
    utilsIssuing("stockOutlistList", {
      transCode: "R190102010",
      fromGrp: 3,
      miAlloc: "no",
      miArticle: "yes",
      miDocu: "no",
      miDate: "no",
      mattype: 4,
      fromLager: 1,
      toLager: 99,
      fromDate: "01/01/19",
      toDate: "31/01/19",
      fromArt: 9999999,
      toArt: 9999999,
      showPrice: "yes",
      costAcct: "01026220",
      deptNo: 0
    }).then(res => {
      const dataTable = res.response.stockOutlist["stock-outlist"];
      for (const i in dataTable) {
        this.CostAlloc.push(dataTable[i]);
      }
    });
  }
};
</script>
<style>
p.dashed {
  border-style: dashed;
}

.select {
  width: 250px;
  margin-top: -20px;
}
.button {
  width: 250px !important;
}
#label123 {
  height: 400px;
  margin-right: 40px;
  margin-left: -50px;
}
.add {
  margin-left: -50px;
  margin-top: -20px;
}
</style>
