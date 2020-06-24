<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchFBOutletFlash :searches="searches" @onSearch="onSearch" />
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

    const tableHeaders = [
      {
        label: 'Transfer to Storage',
        field: 'descr',
        name: 'descr',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Cost Allocation',
        field: 'cost-alloc',
        name: 'cost-alloc',
        sortable: false,
      },
      {
        label: 'Today Consumed',
        field: 'today-consume',
        name: 'today-consume',
        align: 'right',
        sortable: false,
      },
      {
        label: 'MTD Consumed',
        field: 'mtd-consume',
        name: 'mtd-consume',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getAdjustmentResulttable({
            pvILanguage: '1',
            fromGrp: '1',
            food: '1',
            mainStorage: '1',
            fStore: '1',
            tStore: '18',
            date1: '2019-01-01',
            date2: '2019-01-14',
            foreignNr: '0',
            exchgRate: '1',
            doubleCurrency: false,
          }),
        ]);

        charts = response[0] || [];

        state.data = charts;
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
    searchFBOutletFlash: () => import('./components/SearchFBOutletFlash.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
