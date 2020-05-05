<template>
  <v-form cols="1" md="3" ref="form" lazy-validation>
    <v-autocomplete
        v-model="dataForm.id"
        :items="dataUser"
        item-text="label"
        item-value="value"
        label="User ID">
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
                    v-on="on">
                </v-text-field>
            </template>
            <v-date-picker v-model="dataForm.date" @change="menu = false" range></v-date-picker>
    </v-menu>

    <v-checkbox
        v-model="dataForm.checkboxShowAsSummaryByArticle"
        :label="`Show as Summary by Article`" >
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
      selectValidationEmpty: ProgramProperties.data().validationSelectEmpty,
      dataUser:[], 
      dataPrepare:[],
      dataForm: {
        id: null,
        date: [new Date().toISOString().substr(0, 10) , new Date().toISOString().substr(0, 10)],
        checkboxShowAsSummaryByArticle: false,
      }
    }
  },
  methods: {
    onClickSearch() {
      console.log(this.dataForm, "Data Form");
      this.getDataTable();
    },
    getDataPrepare() {
        (async () => {
          class HTTPError extends Error {}

        	const response = await fetch(this.programProperties.host + "/vhpOU/restUsrJournalPrepare", {
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
          console.log(this.programProperties.host + "/vhpOU/restUsrJournalPrepare", "URL End Point ");

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
          
            console.log(this.dataPrepare, "Response /restUsrJournalPrepare ");

            this.getUserList();
          }
        })();
    },
    getUserList() {
        (async () => {
          class HTTPError extends Error {}

        	const response = await fetch(this.programProperties.host + "/Common/loadHUser", {
            method: 'POST',
		        body: JSON.stringify({
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                currDept: "01",
                kname: " "
              }
            }),
            headers: {
              'content-type': 'application/json'
            }
          });          
          console.log(this.programProperties.host + "/Common/loadHUser", "URL End Point ");

          if (!response.ok) {
            this.dataUser["isSuccess"] = false;
            this.dataUser["isLoading"] = false;
                
            throw new HTTPError('Fetch error:', response.statusText);
    	    } else {
            const parsed = await response.json();

            const responseDataUser = parsed.response;
            this.dataUser["isSuccess"] = true;
            this.dataUser["isLoading"] = false;
          
            const dataMap = [];
            const data = responseDataUser.tKellner['t-kellner'];
            const dataDept = responseDataUser.tHoteldpt['t-hoteldpt'];

            for(let i = 0; i < data.length; i++) {
              const dataobj = data[i];
              let deptname = "";
              let currdept = "";

              for (let x = 0; x < dataDept.length; x++) {
                if (dataobj.departement == dataDept[x].num) {
                    deptname = dataDept[x].depart;
                    currdept = dataDept[x].num;
                    break;
                }
              }

              dataMap.push({
                value: dataobj["kellner-nr"] + "-" + currdept + "-" + dataobj["kellnername"],
                label: dataobj["departement"] + " - " + deptname + " - " + dataobj["kellner-nr"] + " - " + dataobj["kellnername"]
              });
            }
            this.dataUser = dataMap;

            this.dataForm.id = this.dataUser[1]["value"];

            console.log(responseDataUser, "Response /loadHUser ");
          }
      })();
    },
    getDataTable() {
        this.dataMainTableID = {};

        this.dataMainTableID["isLoading"] = true;
        this.dataMainTableID["isSuccess"] = true;

        const selectValue = this.dataForm.id.split("-")[0];
        const currDept = this.dataForm.id.split("-")[1];

        (async () => {
          class HTTPError extends Error {}

        	const response = await fetch(this.programProperties.host + "/vhpOU/restUsrJournalList", {
            method: 'POST',
		        body: JSON.stringify({
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata",
                sumFlag: this.dataForm.checkboxShowAsSummaryByArticle,
                fromDate: moment(this.dataForm.date[0]).format(this.programProperties.formateDateRequest),
                toDate: moment(this.dataForm.date[1]).format(this.programProperties.formateDateRequest),
                usrInit: selectValue,
                currDept: currDept,
                priceDecimal: this.dataPrepare.priceDecimal
              }
            }),
            headers: {
              'content-type': 'application/json'
            }
          });          
          console.log(this.programProperties.host + "/vhpOU/restUsrJournalList", "URL End Point ");

          if (!response.ok) {
            this.dataMainTableID["isSuccess"] = false;
            this.dataMainTableID["isLoading"] = false;
                
            throw new HTTPError('Fetch error:', response.statusText);
    	    } else {
            const parsed = await response.json();

            this.dataMainTableID = parsed.response;
            this.dataMainTableID["isSuccess"] = true;
            this.dataMainTableID["isLoading"] = false;          
          }
          console.log(this.dataMainTableID, "Response /restUsrJournalList ");
        })();
    }
  },
  watch : {
      dataMainTableID: function() {
      if (!this.dataMainTableID.isLoading ) {
          this.$emit('readDataMainTable', this.dataMainTableID);
      }
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
  }
}
</script>