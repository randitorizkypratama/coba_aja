<template>
  <v-form cols="1" md="3" ref="form" lazy-validation>
    <v-menu 
        :v-model="menu" 
        :close-on-content-click="false" 
        max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormat"
                label="Select Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dataForm.date" @change="menu = false" range></v-date-picker>
    </v-menu>

    <v-btn-toggle
        v-model="dataForm.category"
        mandatory>
        <v-btn small width="100">
            Food
        </v-btn>

        <v-btn small width="100">
            Beverage
        </v-btn>
    </v-btn-toggle>
      
    <v-checkbox
        v-model="dataForm.sortByDescription"
        :label="`Sort By Description`" >
    </v-checkbox>

    <v-checkbox
        v-model="dataForm.includeFB"
        :label="dataForm.category == 0 ? `Incl. Beverage To Food` : `Incl. Food to Beverage`" >
    </v-checkbox>

    <v-spacer></v-spacer>

    <v-btn color="primary" @click="onClickSearch" block depressed small :disabled="dataMainTableID.isLoading">
        <v-icon right dark>mdi-magnify</v-icon>Search
    </v-btn>
  </v-form>
</template>

<script>
import ProgramProperties from "@/vhp-modules/outlet/outlet-utils/OutletProgramProperties.vue";
import moment from "moment";
import ky from "ky";


export default {
  name: "LeftAction",
  props: {
    dataMainTableID: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      programProperties: [],
      menu: false,
      dataPrepare:[],
      dataForm: {
        date: [new Date().toISOString().substr(0, 10) , new Date().toISOString().substr(0, 10)],
        category: 0,
        sortByDescription: false,
        includeFB: false,
      }
    };
  },
  methods: {
    onClickSearch() {
      console.log(this.dataForm, "Data Form");
      this.getDataTable();
    },
    getDataPrepare() {
      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/fbCostAnalPrepare", {
          method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata"
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/fbCostAnalPrepare", "URL End Point ");

        if (!response.ok) {
          this.dataPrepare["isSuccess"] = false;
          this.dataPrepare["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataPrepare["data"] = parsed.response;
          this.dataPrepare["isSuccess"] = true;
          this.dataPrepare["isLoading"] = false;

          this.dataForm.date = [];
          this.dataForm.date[0] = this.dataPrepare.data.fromDate;
          this.dataForm.date[1] = this.dataPrepare.data.toDate
          
          console.log(this.dataPrepare, "Response /fbCostAnalPrepare ");
        }
      })();
    },
    getDataTable() {
      this.dataMainTableID = {};

      this.dataMainTableID["isLoading"] = true;
      this.dataMainTableID["isSuccess"] = true;

      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/fbCostAnalList", {
          method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              sorttype: this.dataForm.category == 0 ? "1" : "2",
              inclBf: this.dataForm.category == 0  && this.dataForm.includeFB ? true : false,
              inclFb: this.dataForm.category == 1 && this.dataForm.includeFB ? true : false,
              fromDate: moment(this.dataForm.date[0]).format(this.programProperties.formateDateRequest),
              toDate: moment(this.dataForm.date[1]).format(this.programProperties.formateDateRequest),
              fEknr: this.dataPrepare.data.fEknr,
              bEknr: this.dataPrepare.data.bEknr,
              flEknr: this.dataPrepare.data.fLEknr,
              blEknr: this.dataPrepare.data.bLEknr,
              preisTyp: this.dataPrepare.data.bevFood,
              foodBev: this.dataPrepare.data.foodBev,
              bevFood: this.dataPrepare.data.priceType
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/fbCostAnalList", "URL End Point ");

        if (!response.ok) {
          this.dataMainTableID["isSuccess"] = false;
          this.dataMainTableID["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataMainTableID = parsed.response;
          this.dataMainTableID["isSuccess"] = true;
          this.dataMainTableID["isLoading"] = false;

          console.log(this.dataMainTableID, "Response /fbCostAnalList ");
        }
      })();
    }
  },
  computed: {
    computedDateFormat() { 
      const dataDate = [];     
      dataDate[0] = moment(this.dataForm.date[0]).format(this.programProperties.formatDateRead);
      dataDate[1] = moment(this.dataForm.date[1]).format(this.programProperties.formatDateRead);
      
      return dataDate.join(" - ");
    }
  },
  mounted() {
    this.programProperties = ProgramProperties.data();
    this.getDataPrepare();
  },
  watch: {
    dataMainTableID: function() {
      if (!this.dataMainTableID.isLoading ) {
          this.$emit('readDataMainTable', this.dataMainTableID);
      }
    }
  }
}
</script>