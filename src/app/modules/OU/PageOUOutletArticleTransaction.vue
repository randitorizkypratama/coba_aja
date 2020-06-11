<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchOutletArticleTransaction :searches="searches" @onSearch="onSearch" />
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
        @row-click="onRowClick"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination">
        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon name="more_vert" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="showDialog(props.row)">
                    <q-item-section>Detail</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
    </q-table>
    
    <dialogOutletArticleTransactionDetail :dialog="dialog" @onDialog="onDialog" :data-selected="dataSelected" />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, } from '@vue/composition-api';
import { mapOU } from '~/app/helpers/mapSelectItems.helpers';
import { mapOU3Label } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let responsePrepare;

    // let charts = [] as any;

    const state = reactive({
      isFetching: true,
      build: [],
      dataSelected: {},
      dataPrepare:{},
      searches: {
        date: {start: new Date(), end: new Date()},
        fromDept: [],
        fromDeptVal: {},
        toDept: [],
        toDeptVal: {},
        fromArt: [],
        toArt: [],
        odTaker: [],
      },
      dialog: false,
    });

    const tableHeaders = [
        {
            label: "Date",
            field: "billdate",
            sortable: false,
            align: "left",
        },{
            label: "TbNo", 
            field: "tbno",
            sortable: false,
            align: "right",
        }, {
            label: "Bill-No", 
            field: "rechnr",
            sortable: false,
            align: "right",
        }, {
            label: "ArtNo", 
            field: "artno",
            sortable: false,
            align: "right",
        }, {
            label: "Description", 
            field: "bezeich",
            sortable: false,
            align: "left",
            },{
            label: "Cancel Reason", 
            field: "cancel",
            sortable: false,
            align: "left",
        }, {
            label: "Qty", 
            field: "qty",
            sortable: false,
            align: "right",
        },  {
            label: "Amount", 
            field: "amount",
            sortable: false,
            align: "right",
        }, {
            label: "Department", 
            field: "depart",
            sortable: false,
            align: "left",
        },  {
            label: "Time", 
            field: "zeit",
            sortable: false,
            align: "center",
        }, {
            label: "Name", 
            field: "cname",
            sortable: false,
            align: "left",
        }, { 
            name: 'actions',
            field: 'actions' 
        },
    ];

    const getDataArticle = () => {
      async function asyncCall() {
        const [dataHotel] = await Promise.all([
          $api.outlet.getCommonOutletUserList('loadHArtikel', {
            caseType: 3,
            dept: state.searches.fromDeptVal['value'], 
            artType: " "
          }),
        ]);
        const responseDataArt = dataHotel || [];
        const artList = responseDataArt.tHArtikel['t-h-artikel'];
        // console.log("response article", responseDataArt);

        state.dataPrepare['tHArtikel'] = artList;
        state.searches.fromArt = mapOU3Label(state.dataPrepare['tHArtikel'], 'artnr', 'artnr', 'departement', 'bezeich');
        state.searches.toArt = mapOU3Label(state.dataPrepare['tHArtikel'], 'artnr', 'artnr', 'departement', 'bezeich');

        // console.log("response prepare : ", responsePrepare);
        state.isFetching = false;              
      }
      asyncCall();
    }
    
    onMounted(async () => {
      const [data] = await Promise.all([
        $api.outlet.getOUPrepare('restJournalPrepare', {}),
      ]);
      responsePrepare = data || [];
      state.dataPrepare = responsePrepare;   

      const fdate = new Date(responsePrepare.fromDate);
      const tdate = new Date(responsePrepare.toDate);

      state.searches.date.start = fdate;
      state.searches.date.end = tdate;

      const deptList = responsePrepare.tHoteldpt['t-hoteldpt'];
      const fromDept = [] as any;

      for (let i = 0; i<deptList.length; i++) {
          const datarow = deptList[i];
          const deptnum = deptList[i]['num'];
          const mindept = state.dataPrepare['minDept'];
          const maxdept = state.dataPrepare['maxDept'];

          if (deptnum >= mindept) {
            if (deptnum == maxdept) {
                fromDept.push(datarow);
                break;
            } else {
                fromDept.push(datarow);
            }
          } 
      }      

      state.dataPrepare['tHoteldpt']['t-hoteldpt'] = fromDept;
      state.searches.fromDept = mapOU(state.dataPrepare['tHoteldpt']['t-hoteldpt'], 'num', 'depart');
      state.searches.toDept = mapOU(state.dataPrepare['tHoteldpt']['t-hoteldpt'], 'num', 'depart');

      for (let i = 0; i<state.searches.fromDept.length; i++) {
        const currFromDept = state.dataPrepare['fromDept'];
        if (currFromDept == state.searches.fromDept[i]['value']) {
          state.searches.fromDeptVal = state.searches.fromDept[i];
          break;
        }
      }

      for (let i = 0; i<state.searches.toDept.length; i++) {
        const currToDept = state.dataPrepare['toDept'];
        if (currToDept == state.searches.toDept[i]['value']) {
          state.searches.toDeptVal = state.searches.toDept[i];
          break;
        }
      }

      // console.log("response prepare : ", responsePrepare);
      // console.log("state: ", state.searches);
      
      getDataArticle();
    });  

    const onDialog = (val) => {
      state.dialog = val;
    };

    const onRowClick = (_, dataRow) => {
        state.dataPrepare = dataRow;
    };

    const showDialog = (dataRow) => {
      state.dataSelected = dataRow;
      onDialog(true);
    };

    const onSearch = (state2) => {
        console.log(state2);
        console.log(state.searches);
  
        // state.isFetching = true;
        // state.build = [];
        
        // async function asyncCall() {
        //     const dataResponse = await Promise.all([
        //         $api.outlet.getOUCancelJournalList('cancelJournList', {
        //             fromDate: date.formatDate(state2.date.start, 'MM/DD/YYYY'),
        //             toDate: date.formatDate(state2.date.end, 'MM/DD/YYYY'),
        //             fromDept: state2.fromDept.value,
        //             toDept: state2.toDept.value,          
        //         }),
        //     ]);
        //     charts = dataResponse[0] || [];
        //     for (let i=0; i<charts.length; i++) {
        //         charts[i]["dbilldate"] = charts[i]["billdate"],
        //         charts[i]["billdate"] = date.formatDate(charts[i]["billdate"], 'DD/MM/YYYY');
        //         // charts[i]["amount"] = this.formatterMoney(dataTable[i]["amount"]);
        //     }
        //     state.build = charts;
        //     state.isFetching = false;
        // }
        // asyncCall();
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      onRowClick,
      getDataArticle,
      onDialog,
      showDialog,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    searchOutletArticleTransaction: () => import('./components/SearchOutletArticleTransaction.vue'),
    dialogOutletArticleTransactionDetail: () => import('./components/DialogOutletArticleTransactionDetail.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
