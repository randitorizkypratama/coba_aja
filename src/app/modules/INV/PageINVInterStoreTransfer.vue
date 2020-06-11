<template>
  <div id="app">
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <searchInterStoreTransfer :searches="searches" @onSearch="onSearch" />

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
import { tableHeaders } from './tables/interstoretransfer.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      food: '',
      bev: '',
      date2: '',
      date1: '',
      billDate: '',
      doubleCurrency: '',
      foreignNr: '',
      exchgRate: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([
        $api.inventory.getFBOutletFlashprepare(),
      ]);

      state.food = resDepart.food;
      state.bev = resDepart.bev;
      state.date2 = resDepart.date2;
      state.date1 = resDepart.date1;
      state.billDate = resDepart.billDate;
      state.doubleCurrency = resDepart.doubleCurrency;
      state.foreignNr = resDepart.foreignNr;
      state.exchgRate = resDepart.exchgRate;

      state.searches.departments = mapWithadjustmain(
        resDepart.tLHauptgrp['t-l-hauptgrp'],
        'endkum'
      );
      state.searches.store = mapWithadjuststore(
        resDepart.tLLager['t-l-lager'],
        ['lager-nr']
      );

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getAdjustmentResulttable({}),
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
    searchInterStoreTransfer: () =>
      import('./components/SearchInterStoreTransfer.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
