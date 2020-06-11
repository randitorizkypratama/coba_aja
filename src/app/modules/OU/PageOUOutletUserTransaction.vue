<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchOutletUserTransaction :searches="searches" @onSearch="onSearch" />
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
import { mapOU4Label } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';
import SearchOutletUserTransactionVue from './components/SearchOutletUserTransaction.vue';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let responsePrepare;

    let charts = [] as any;

    const state = reactive({
      isFetching: true,
      build: [],
      dataPrepare:{},
      searches: {
        userList: [],
        date: {end: new Date() , start: new Date()},
      },
    });

    const tableHeaders = [
        {
            label: "Date",
            field: "datum",
            sortable: false,
            align: "left"
        },{
            label: "TbNo", 
            field: "tb",
            sortable: false,
            align: "right"
        }, {
            label: "Bill-No", 
            field: "billno",
            sortable: false,
            align: "right"
        }, {
            label: "ArtNo", 
            field: "artno",
            sortable: false,
            align: "right"
        }, {
            label: "Description", 
            field: "descr",
            sortable: false,
            align: "left"
            },{
            label: "Qty", 
            field: "qty",
            sortable: false,
            align: "right"
        }, {
            label: "Amount", 
            field: "amount",
            sortable: false,
            align: "right"
        },  {
            label: "Department", 
            field: "depart",
            sortable: false,
            align: "left"
        }, {
            label: "Time", 
            field: "zeit",
            sortable: false,
            align: "center"
        },  {
            label: "ID", 
            field: "id",
            sortable: false,
            align: "center"
        }, {
            label: "TB", 
            field: "tb",
            sortable: false,
            align: "right"
        } 
    ];
    
    onMounted(async () => {
      const [data] = await Promise.all([
        $api.outlet.getOUOutletUserPrepare('restUsrJournalPrepare', {}),
      ]);

      responsePrepare = data || [];
      state.dataPrepare = responsePrepare;

      state.searches.date.start = new Date(state.dataPrepare['fromDate']);
      state.searches.date.end = new Date(state.dataPrepare['toDate']);          
      
      const [dataUser] = await Promise.all([
        $api.outlet.getCommonOutletUserList('loadHUser', {
            currDept: "01",
            kname: " "
        }),
      ]);

      const responseUser = dataUser || [];
      const dataSearch = [] as any;      

      for (let i=0; i<responseUser.tKellner['t-kellner'].length; i++) {
        const datarowuser = responseUser.tKellner['t-kellner'][i];
        const dept = datarowuser['departement'];

        for (let x=0; x<responseUser.tHoteldpt['t-hoteldpt'].length; x++) {
          const datarowdpt = responseUser.tHoteldpt['t-hoteldpt'][x];
          const deptnum = datarowdpt.num;
          const deptname = datarowdpt.depart;
          
          if (dept == deptnum) {
            datarowuser['deptname'] = deptname;
            break;
          }
        }
        dataSearch.push(datarowuser);
      }
      state.searches.userList = dataSearch;
      state.searches.userList = mapOU4Label(state.searches.userList, 'kellner-nr', 'departement', 'deptname', 'kellner-nr', 'kellnername');
      state.isFetching = false;
    });

    const onSearch = (state2) => {
      state.isFetching = true;

      state.build = [];
      
      async function asyncCall() {
        const dataResponse = await Promise.all([
          $api.outlet.getOutletUserTransactionList('restUsrJournalList', {
            usrInit: state2.userID.value,
            fromDate: date.formatDate(state2.date.start, 'MM/DD/YYYY'),
            toDate: date.formatDate(state2.date.end, 'MM/DD/YYYY'),
            sumFlag: state2.showAllUser,
            currDept: state2.userID.label.split("-")[0].trim(),
            priceDecimal: state2.priceDecimal,
          }),
        ]);

        charts = dataResponse[0] || [];

        for (let i = 0; i<charts.length; i++) {
          charts[i]["datum"] = charts[i]["datum"] == null ? "" : date.formatDate(charts[i]["datum"], "DD/MM/YYYY");
          charts[i]["billno"] = charts[i]["datum"] == "" ? "" : charts[i]["billno"]
          charts[i]["artno"] = charts[i]["datum"] == "" ? "" : charts[i]["artno"]
          // charts[i]["amount"] = this.formatterMoney(charts[i]["amount"]);
          charts[i]["amount"] =(charts[i]["amount"]);
        }
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
    searchOutletUserTransaction: () => import('./components/SearchOutletUserTransaction.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
