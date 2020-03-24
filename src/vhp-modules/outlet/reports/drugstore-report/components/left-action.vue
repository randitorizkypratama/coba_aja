<template>
  <v-form cols="1" md="3">
      <v-select
        v-model="dataForm.id"
        :items="dataUser"
        item-text="label"
        item-value="value"
        :disabled="dataForm.showAllUser"
        label="ID"
      ></v-select>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDateFormat"
            label="Select Date"
            prepend-icon=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dataForm.date" @input="menu = false"></v-date-picker>
      </v-menu>

      <v-checkbox
        v-model="dataForm.showAllUser"
        :label="`Show All User`" >
      </v-checkbox>
      
      <v-spacer></v-spacer>

      <v-btn color="primary" @click="onClickSearch" block depressed small>
        <v-icon right dark>mdi-magnify</v-icon>Search
      </v-btn>

      <v-spacer></v-spacer>
  </v-form>
</template>

<script lang="ts">
import ky from "ky";
import moment from "moment";
import ProgramProperties from "@/vhp-modules/outlet/outlet-utils/OutletProgramProperties.vue";

export default {
  name: "LeftAction",
  props: {
    dataPrepareID: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dataMainTableID: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: { },
  data() {
    return {
      menu: false,
      programProperties: [],
      dataPrepare: {},
      dataUser:[], 
      dataForm: {id : "", date: new Date().toISOString().substr(0, 10), showAllUser: false}
    };
  },
  methods: {
    onClickSearch() {
      this.getDataTable();
    }, getDataPrepare() {
      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/drugstoreDailyPrepare", {
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
        console.log(this.programProperties.host + "/vhpOU/drugstoreDailyPrepare", "URL End Point ");

        if (!response.ok) {
          this.dataPrepare["isSuccess"] = false;
          this.dataPrepare["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataPrepare = parsed.response;
          this.dataPrepare["isSuccess"] = true;
          this.dataPrepare["isLoading"] = true;

          this.dataForm.date = (this.dataPrepare['p110']);
          this.dataUser = this.mapDataInArray(this.dataPrepare.userList['user-list'], "usrnr", "usrname");
          this.dataForm.id = this.dataUser[0]['value'];

          console.log(this.dataPrepare, "Response /drugstoreDailyPrepare ");
        }
      })();
    }, 
    getDataTable() {
      (async () => {
        class HTTPError extends Error {}

      	const response = await fetch(this.programProperties.host + "/vhpOU/drugstoreDailyList", {
		      method: 'POST',
		      body: JSON.stringify({
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              usrcreated: "no",
              dstoreDept: this.dataPrepare.dstoreDept,
              allFlag: this.dataForm.showAllUser ? "yes" : "no",
              ekumnr: this.dataPrepare.ekumnr,
              zknr1: this.dataPrepare.zknr1,
              zknr2: this.dataPrepare.zknr2,
              zknr3: this.dataPrepare.zknr3,
              zknr4: this.dataPrepare.zknr4,
              zknr5: this.dataPrepare.zknr5,
              zknr6: this.dataPrepare.zknr6,
              fromDate: moment(this.dataForm.date).format(this.programProperties.formateDateRequest), 
              toDate: moment(this.dataForm.date).format(this.programProperties.formateDateRequest),
              usrInit: this.dataForm.id
            }
          }),
		      headers: {
            'content-type': 'application/json'
		      }
        });          
        console.log(this.programProperties.host + "/vhpOU/drugstoreDailyList", "URL End Point ");

        if (!response.ok) {
          this.dataMainTableID["isSuccess"] = false;
          this.dataMainTableID["isLoading"] = false;
                
          throw new HTTPError('Fetch error:', response.statusText);
    	  } else {
          const parsed = await response.json();

          this.dataMainTableID = parsed.response;
          this.dataMainTableID["isSuccess"] = true;
          this.dataMainTableID["isLoading"] = true;

          console.log(this.dataMainTableID, "Response /drugstoreDailyList ");
        }
      })();
    }
  },
  watch: {
    dataPrepare: function() {    
      this.$emit(`readDataPrepare`, this.dataPrepare);
    }, 
    dataMainTableID: function() {
      if (this.dataMainTableID.isLoading) {
        this.dataMainTableID.isLoading = !this.dataMainTableID.isLoading;

        if (!this.dataMainTableID.isLoading) {
          this.$emit('readDataMainTable', this.dataMainTableID);
        }
      }
    }
  },
  computed: {
    computedDateFormat() {
      return this.dataForm.date ? moment(this.dataForm.date).format(this.programProperties.formatDateRead) : "";
    }
  },
  mounted() {    
    this.programProperties = ProgramProperties.data();
    this.getDataPrepare();
  }
};
</script>
