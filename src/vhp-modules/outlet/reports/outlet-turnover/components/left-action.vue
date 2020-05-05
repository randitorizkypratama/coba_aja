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

    <v-checkbox
        v-model="dataForm.checkboxIncNotSaleItem"
        :label="`Including not sale items`" >
      </v-checkbox>

      <v-checkbox
        v-model="dataForm.checkboxIncLaundryDrugstore"
        :label="`Including Laundry and Drugstore`" >
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
      dataHotelDept:[],
      dataFromDept:[],
      dataToDept:[],
      dataForm: {
        date: [new Date().toISOString().substr(0, 10) , new Date().toISOString().substr(0, 10)],
        fromDepartment: null,
        toDepartment: null,
        checkboxIncNotSaleItem: false,
        checkboxIncLaundryDrugstore: false,
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

      	const response = await fetch(this.programProperties.host + "/vhpOU/fbSalesCostReportPrepare", {
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
        console.log(this.programProperties.host + "/vhpOU/fbSalesCostReportPrepare", "URL End Point ");

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
          
          console.log(this.dataPrepare, "Response /fbSalesCostReportPrepare ");

          this.getDataHotelDepartment();
        }
      })();
    },
    getDataHotelDepartment() {
      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/turnoverByDeptPrepare", {
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
        console.log(this.programProperties.host + "/vhpOU/turnoverByDeptPrepare", "URL End Point ");

        if (!response.ok) {
          this.dataHotelDept["isSuccess"] = false;
          this.dataHotelDept["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataHotelDept = parsed.response;
          this.dataHotelDept["isSuccess"] = true;
          this.dataHotelDept["isLoading"] = false;
          
          this.dataFromDept = this.mapDataInArray(this.dataHotelDept.tHoteldpt['t-hoteldpt'], "num", "num", "depart");
          this.dataToDept = this.mapDataInArray(this.dataHotelDept.tHoteldpt['t-hoteldpt'], "num", "num", "depart");

          this.dataForm.fromDepartment = this.dataFromDept[0]["value"];
          this.dataForm.toDepartment = this.dataToDept[this.dataToDept.length - 1]["value"];

          console.log(this.dataHotelDept, "Response /turnoverByDeptPrepare ");
        }
      })();
    },
    getDataTable() {
      this.dataMainTableID = {};

      this.dataMainTableID["isLoading"] = true;
      this.dataMainTableID["isSuccess"] = true;

      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/turnoverByDeptList", {
          method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              ldryFlag: this.dataForm.checkboxIncLaundryDrugstore,
              ldry: this.dataPrepare.ldry,
              dstore: this.dataForm.checkboxOutletSalesOnly,
              fromDept: this.dataForm.fromDepartment,
              toDept: this.dataForm.toDepartment,
              fromDate: moment(this.dataForm.date[0]).format(this.programProperties.formateDateRequest),
              toDate: moment(this.dataForm.date[1]).format(this.programProperties.formateDateRequest),
              detailed: this.dataForm.checkboxIncNotSaleItem,
              longDigit: this.dataPrepare.longDigit
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/turnoverByDeptList", "URL End Point ");

        if (!response.ok) {
          this.dataMainTableID["isSuccess"] = false;
          this.dataMainTableID["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataMainTableID = parsed.response;
          this.dataMainTableID["isSuccess"] = true;
          this.dataMainTableID["isLoading"] = false;

          console.log(this.dataMainTableID, "Response /turnoverByDeptList ");
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

      for (let i=0; i<this.dataFromDept.length; i++) {
        const dept = this.dataFromDept[i]["value"];

        if (currToDept != dept) {
          tempDataFromDept.push(this.dataFromDept[i]);
        } else {
          tempDataFromDept.push(this.dataFromDept[i]);
          break;
        }
      }
      return tempDataFromDept;
    },
    computedToDept() {
      const tempDataToDept = [];
      const currFromDept = this.dataForm.fromDepartment;
      const dataToDept = this.dataToDept;

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