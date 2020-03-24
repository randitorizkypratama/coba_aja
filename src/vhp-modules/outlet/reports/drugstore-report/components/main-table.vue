<template>
    <v-data-table
            :headers="headers"
            :items="dataMainTables"
            class="elevation-1"
            disable-pagination
            hide-default-footer>
          </v-data-table>
</template>

<script lang="ts">
import TesReport from "../Tes-Report.vue";

export default {
  name: "MainTable",
  props: {
      dataMainTable: {
          type: Array,
          default: () => {
              return [];
          }
      }
  },
  data() {
    return {
      programProperties: [],
      dataMainTables: this.dataMainTable,
      // dataMainTables: [{zinr: 100}],
      headers: [
      {
        text: "RmNo",
        value: "zinr",
        sortable: false,
        align: "right"
        }, {
        text: "Payment / Gname", 
        value: "gname",
        sortable: false,
        align: "left"
        }, {
        text: "Text1", 
        value: "",
        align: "right"
        }, {
        text: "Qty", 
        value: "qty1",
        sortable: false,
        align: "right"
        }, {
        text: "Text2", 
        value: "",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty2",
        sortable: false,
        align: "right"
        },  {
        text: "Text3", 
        value: "",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty3",
        sortable: false,
        align: "right"
        },  {
        text: "Text4", 
        value: "",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty4",
        sortable: false,
        align: "right"
        },  {
        text: "Text5", 
        value: "",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty5",
        sortable: false,
        align: "right"
        }, {
        text: "Text6", 
        value: "",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty6",
        sortable: false,
        align: "right"
        },  {
        text: "Total Amount", 
        value: "totamount",
        sortable: false,
        align: "right"
        }, {
        text: "Qty", 
        value: "qty7",
        sortable: false,
        align: "right"
        }, {
        text: "ID", 
        value: "id",
        sortable: false,
        align: "left"
        } 
    ]
    };
  }, mounted() {
        console.log(this.dataMainTables, "update main");
  }, watch: {
      dataMainTable() {
          console.log(this.dataMainTable, "watch main")
      }
  }
}
</script>