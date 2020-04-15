<template>
  <v-form cols="1" md="3" ref="form" lazy-validation>
    <v-autocomplete
        v-model="dataForm.currDept"
        :items="dataDept"
        item-text="label"
        item-value="value"
        label="Department">
      </v-autocomplete>

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
      selectValidationEmpty: ProgramProperties.data().validationSelectEmpty,
      dataPrepare:[],
      dataDept:[],
      dataForm: {
        date: [new Date().toISOString().substr(0, 10) , new Date().toISOString().substr(0, 10)],
        currDept: null
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

      	const response = await fetch(this.programProperties.host + "/vhpOU/roomTransferReportPrepare", {
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
        console.log(this.programProperties.host + "/vhpOU/roomTransferReportPrepare", "URL End Point ");

        if (!response.ok) {
          this.dataPrepare["isSuccess"] = false;
          this.dataPrepare["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataPrepare = parsed.response;
          this.dataPrepare["isSuccess"] = true;
          this.dataPrepare["isLoading"] = false;

          this.dataForm.date = [];
          this.dataForm.date[0] = this.dataPrepare.fromDate;
          this.dataForm.date[1] = this.dataPrepare.fromDate

          this.dataDept = this.mapDataInArray(this.dataPrepare.tHoteldpt['t-hoteldpt'], "num", "num", "depart");

          this.dataForm.currDept = this.dataDept[0]["value"];

          console.log(this.dataPrepare, "Response /roomTransferReportPrepare ");
        }
      })();
    },
    getDataTable() {
      this.dataMainTableID = {};

      this.dataMainTableID["isLoading"] = true;
      this.dataMainTableID["isSuccess"] = true;

      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/roomTransferReportList", {
          method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              currDept: this.dataForm.currDept,
              fromDate: moment(this.dataForm.date[0]).format(this.programProperties.formateDateRequest),
              toDate: moment(this.dataForm.date[1]).format(this.programProperties.formateDateRequest),
              longDigit: this.dataPrepare.longDigit
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/roomTransferReportList", "URL End Point ");

        if (!response.ok) {
          this.dataMainTableID["isSuccess"] = false;
          this.dataMainTableID["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataMainTableID = parsed.response;
          this.dataMainTableID["isSuccess"] = true;
          this.dataMainTableID["isLoading"] = false;

          console.log(this.dataMainTableID, "Response /roomTransferReportList ");
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