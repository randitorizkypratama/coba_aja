<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchAdjustmentResult :searches="searches" @onSearch="onSearch" />
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
        dense
        :columns="tableHeaders"
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
      ></q-table>
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
import {
  mapWithadjuststore,
  mapWithadjustmain,
} from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      matGrp: '',
      p221: '',
      p224: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([
        $api.inventory.getAdjustmentResultprepare(),
      ]);
      console.log(resDepart.matGrp, 'prepare');

      state.matGrp = resDepart.matGrp;
      state.p221 = resDepart.p221;
      state.p224 = resDepart.p224;
      state.searches.departments = mapWithadjustmain(
        resDepart.tLHauptgrp['t-l-hauptgrp'],
        'endkum'
      );
      state.searches.store = mapWithadjuststore(
        resDepart.tLLager['t-l-lager'],
        ['lager-nr']
      );
      console.log(state.searches.store, 'store');

      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Unit',
        field: 'munit',
        name: 'munit',
        sortable: false,
      },
      {
        label: 'Content',
        field: 'inhalt',
        name: 'inhalt',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Current Quantity',
        field: 'qty',
        name: 'qty',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Actual Quantity',
        field: 'qty1',
        name: 'qty1',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Average Amount',
        field: 'avrg-amount',
        name: 'avrg-amount',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Amount',
        field: 'amount',
        name: 'amount',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Account Number',
        field: 'fibukonto',
        name: 'fibukonto',
        sortable: false,
      },
      {
        label: 'Cost Allocation',
        field: 'cost-center',
        name: 'cost-center',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {

      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getAdjustmentResulttable({
            sorttype: state2.departments.value,
            currLager: state2.store.value,
            fromGrp: state2.shape,
            transdate: state.matGrp == state2.shape ? state.p221 : state.p224,
          }),
        ]);

        charts = response[0] || [];

        const pbookList = charts.cList['c-list'];
        const Amount = charts.totAmount;
        const Average = charts.totAvrgAmount;
        const listData = {
          key: Number.MAX_VALUE,
          artnr: '',
          bezeich: 'Total',
          munit: '',
          inhalt: '',
          qty: '',
          qty1: '',
          ['avrg-amount']: Average,
          amount: Amount,
          fibukonto: '',
          ['cost-center']: '',
        };
        state.data = pbookList.concat(listData);
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
    searchAdjustmentResult: () =>
      import('./components/SearchAdjustmentResult.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
