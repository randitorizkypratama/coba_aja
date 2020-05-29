<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchOutletBillTransaction :searches="searches" @onSearch="onSearch" />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <q-table
        :loading="isFetching"
        dense
        :data="build"
        :columns="tableHeaders"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { mapOU } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let responsePrepare;

    let charts = [];

    const state = reactive({
      isFetching: true,
      build: [],
      dataPrepare:{},
      searches: {
        fromDept: [],
        toDept: []
      },
    });

    const tableHeaders = [
        {
            label: "Date",
            field: "datum",
            sortable: false,
            align: "center",
            width: 120,
            divider: true
        },{
            label: "TbNo", 
            field: "tabelno",
            sortable: false,
            align: "right",
            width: 200,
            divider: true
        }, {
            label: "Bill-No", 
            field: "billno",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            label: "Art-No", 
            field: "artno",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        },{
            label: "Description", 
            field: "dscr",
            sortable: false,
            align: "left",
            width: 150, 
            divider: true
        }, {
            label: "Qty", 
            field: "qty",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        },{
            label: "Sales", 
            field: "sales",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            label: "Payment", 
            field: "payment",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        },  {
            label: "Department", 
            field: "depart",
            sortable: false,
            align: "left",
        },  {
            label: "ID", 
            field: "id",
            sortable: false,
            align: "center",
        },  {
            label: "Time", 
            field: "zeit",
            sortable: false,
            align: "center",
        },  {
            label: "Guest Name", 
            field: "gname",
            sortable: false,
            align: "left",
        }
    ];
    
    onMounted(async () => {
      const [data] = await Promise.all([
        $api.outlet.getOUPrepareOutletBillTransaction('restBillJournalPrepare', {}),
      ]);

      responsePrepare = data || [];
      state.dataPrepare = responsePrepare;   

      const deptList = state.dataPrepare.tHoteldpt['t-hoteldpt'];
      const fromDept = [];

      for (let i = 0; i<deptList.length; i++) {
          const datarow = deptList[i];
          const deptnum = deptList[i]['num'];
          const mindept = state.dataPrepare.fromDept;
          const maxdept = state.dataPrepare.toDept;

          if (deptnum > mindept) {
            if (deptnum == maxdept) {
                fromDept.push(datarow);
                break;
            } else {
                fromDept.push(datarow);
            }
          } 
      }      
      state.dataPrepare.tHoteldpt['t-hoteldpt'] = fromDept;
      state.searches.fromDept = mapOU(state.dataPrepare.tHoteldpt['t-hoteldpt'], 'num', 'depart');
      state.searches.toDept = mapOU(state.dataPrepare.tHoteldpt['t-hoteldpt'], 'num', 'depart');
      state.isFetching = false;
    });

    const onSearch = (state2) => {
        state.isFetching = true;

        console.log("state2 ", state2);

        state.build = [];
        
        async function asyncCall() {
            const dataResponse = await Promise.all([
                $api.outlet.getOUOutletBillTransactionList('restBillJournalList', {
                    fromDate: date.formatDate(state2.date.start, 'MM/DD/YYYY'),
                    toDate: date.formatDate(state2.date.end, 'MM/DD/YYYY'),
                    fromDept: state2.fromDept.value,
                    toDept: state2.toDept.value,
                    fromArt: state.dataPrepare.fromArt,  
                    // toArt: state.dataPrepare.toArt,            
                    priceDecimal: state.dataPrepare.priceDecimal          
                }),
            ]);
            
            console.log(dataResponse[0], 'Response : ');

            charts = dataResponse[0] || [];
            // for (let i=0; i<charts.length; i++) {
            //     charts[i]["artno"] = charts[i]["artno"] == "0" ? "" : charts[i]["artno"]; 
            //     charts[i]["day-gros"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["day-gros"]);
            //     charts[i]["day-net"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["day-net"]);
            //     charts[i]["day-proz"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["day-proz"]);
            //     charts[i]["todate-gros"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["todate-gros"]);
            //     charts[i]["todate-proz"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["todate-proz"]);
            //     charts[i]["todate-net"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : (charts[i]["todate-net"]);
            //     charts[i]["mqty"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : charts[i]["mqty"];

            //     // charts[i]["day-gros"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["day-gros"]);
            //     // charts[i]["day-net"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["day-net"]);
            //     // charts[i]["day-proz"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["day-proz"]);
            //     // charts[i]["todate-gros"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["todate-gros"]);
            //     // charts[i]["todate-proz"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["todate-proz"]);
            //     // charts[i]["todate-net"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : this.formatterMoney(charts[i]["todate-net"]);
            //     // charts[i]["mqty"] = (charts[i]["artno"] == "" && charts[i]["descr"] == "") ? "" : charts[i]["mqty"];
            // }
            state.build = charts;
            state.isFetching = false;
        }
        asyncCall();
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    searchOutletBillTransaction: () => import('./components/SearchOutletBillTransaction.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
