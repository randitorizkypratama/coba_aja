<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchInterStoreTransfer :searches="searches" @onSearch="onSearch" />
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
  mapWithBezeich,
} from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';
import { tableHeaders } from './tables/interstoretransfer.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      showPrice: '',
      searches: {
        availQueasy: '',
        departments: [],
        store: [],
        displayList: [
          {
            label: 'Material & Engineering Articles',
            value: 0,
          },
          {
            label: 'Material Articles Only',
            value: 1,
          },
          {
            label: 'Engineering Articles Only',
            value: 2,
          },
        ],
      },
    });

    onMounted(async () => {
      const [resDepart, resArticle] = await Promise.all([
        $api.inventory.getInterStoreTransferprepare(),
      ]);

      state.showPrice = resDepart.showPrice;
      state.searches.availQueasy = resDepart.availQueasy;

      const coba = resDepart.tLHauptgrp['t-l-hauptgrp'];
      coba.push({ endkum: 0, bezeich: 'ALL' });
      const test = resDepart.tLLager['t-l-lager'];
      test.push({
        bezeich: 'ALL',
        'lager-nr': 0,
        betriebsnr: 0,
      });

      state.searches.departments = mapWithadjustmain(coba, 'endkum');
      state.searches.store = mapWithadjuststore(test, ['lager-nr']);

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getInterStoreTransfertable({
            transCode:
              state2.transfercode === undefined || state2.transfercode === null
                ? ' '
                : state2.transfercode,
            mGrp: 1,
            // state2.main.value === undefined || state2.main.value === null
            //   ? 0
            //   : state2.main.value,
            sorttype: state2.shape,
            mStr: 1,
            // state2.store.value === undefined || state2.store.value === null
            //   ? 0
            //   : state2.store.value,
            mattype: state2.display,
            fromArt: '1',
            toArt: '9999999',
            fromDate: date.formatDate(state2.date.start, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.date.end, 'YYYY-MM-DD'),
            showPrice: state.showPrice,
            expenseAmt: state2.use,
          }),
        ]);

        console.log(
          {
            transCode:
              state2.transfercode === undefined || state2.transfercode === null
                ? ' '
                : state2.transfercode,
            mGrp:
              state2.main.value === undefined || state2.main.value === null
                ? 0
                : state2.main.value,
            sorttype: state2.shape,
            mStr:
              state2.store.value === undefined || state2.store.value === null
                ? 0
                : state2.store.value,
            mattype: state2.display,
            fromArt: '1',
            toArt: '9999999',
            fromDate: date.formatDate(state2.date.start, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.date.end, 'YYYY-MM-DD'),
            showPrice: state.showPrice,
            expenseAmt: state2.use,
          },
          'cari'
        );

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
