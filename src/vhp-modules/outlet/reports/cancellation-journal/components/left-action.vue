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
      
      <v-autocomplete
        v-model="dataForm.fromDepartment"
        :items="computedFromDept"
        item-text="label"
        item-value="value"
        label="From Department">
      </v-autocomplete>

      <v-autocomplete
        v-model="dataForm.toDepartment"
        :items="computedToDept"
        item-text="label"
        item-value="value"
        label="To Department">
      </v-autocomplete>
      
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
      dataHotelDept: [],
      dataForm: {
        date: [new Date().toISOString().substr(0, 10) , new Date().toISOString().substr(0, 10)],
        fromDepartment: null,
        toDepartment: null
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

      	const response = await fetch(this.programProperties.host + "/vhpOU/cancelJournPrepare", {
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
        console.log(this.programProperties.host + "/vhpOU/cancelJournPrepare", "URL End Point ");

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
          this.dataForm.date[1] = this.dataPrepare.toDate

          this.getDataHotel();
          
          console.log(this.dataPrepare, "Response /cancelJournPrepare ");
        }
      })();
    },
    getDataHotel() {
        (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/Common/loadHotelDepartment", {
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
        console.log(this.programProperties.host + "/vhpOU/loadHotelDepartment", "URL End Point ");

        if (!response.ok) {
          this.dataDept["isSuccess"] = false;
          this.dataDept["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataDept = parsed.response;
          this.dataDept["isSuccess"] = true;
          this.dataDept["isLoading"] = false;

          this.dataHotelDept = this.mapDataInArray(this.dataDept.tHoteldpt['t-hoteldpt'], "num", "num", "depart");
          
          this.dataForm.fromDepartment = this.dataHotelDept[0]["value"];
          this.dataForm.toDepartment = this.dataHotelDept[this.dataHotelDept.length - 1]["value"];
          
          console.log(this.dataPrepare, "Response /loadHotelDepartment ");
        }
      })();
    },
    getDataTable() {
      this.dataMainTableID = {};

      this.dataMainTableID["isLoading"] = true;
      this.dataMainTableID["isSuccess"] = true;

      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/cancelJournList", {
          method: 'POST',
		      body: JSON.stringify({
                request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                fromDept: this.dataForm.fromDepartment,
                toDept: this.dataForm.toDepartment,
                fromDate: moment(this.dataForm.date[0]).format(this.programProperties.formateDateRequest),
                toDate: moment(this.dataForm.date[1]).format(this.programProperties.formateDateRequest),
                }
            }),
		      headers: {
                'content-type': 'application/json'
		      }
            });          
        console.log(this.programProperties.host + "/vhpOU/cancelJournList", "URL End Point ");

        if (!response.ok) {
          this.dataMainTableID["isSuccess"] = false;
          this.dataMainTableID["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataMainTableID = parsed.response;
          this.dataMainTableID["isSuccess"] = true;
          this.dataMainTableID["isLoading"] = false;

          console.log(this.dataMainTableID, "Response /cancelJournList ");
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
    },
    computedFromDept() {
      const tempDataFromDept = [];
      const currToDept = this.dataForm.toDepartment;   

      for (let i=0; i<this.dataHotelDept.length; i++) {
        const dept = this.dataHotelDept[i]["value"];

        if (currToDept != dept) {
          tempDataFromDept.push(this.dataHotelDept[i]);
        } else {
          tempDataFromDept.push(this.dataHotelDept[i]);
          break;
        }
      }
      return tempDataFromDept;
    },
    computedToDept() {
      const tempDataToDept = [];
      const currFromDept = this.dataForm.fromDepartment;
      const dataToDept = this.dataHotelDept;

      for(let i=dataToDept.length - 1; i>=0; i--) {
        const dept = dataToDept[i]["value"];

        if (currFromDept != dept) {
          tempDataToDept.push(dataToDept[i]);
        } else {
          tempDataToDept.push(dataToDept[i]);
          break;
        }
      }

      tempDataToDept.sort(function(a,b){
        return parseInt(a.value)  - parseInt(b.value);
      })
      return tempDataToDept;
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