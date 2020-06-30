<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchCancelledIncoming :searches="searches" @onSearch="onSearch" />
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
  mapWithadjustmain,
  mapWithadjuststore,
} from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';
import { tableHeaders } from './tables/cancelledIncoming.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      showPrice: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resPrepare] = await Promise.all([
        $api.inventory.getCancelledIncomingrprepare(),
      ]);

      state.showPrice = resPrepare.showPrice;
      const coba = resPrepare.tLLager['t-l-lager'];
      coba.unshift({ ['lager-nr']: 0, bezeich: 'ALL' });
      state.searches.departments = mapWithadjuststore(coba, ['lager-nr']);
      const test = resPrepare.tLHauptgrp['t-l-hauptgrp'];
      test.unshift({ endkum: 0, bezeich: 'ALL' });
      state.searches.store = mapWithadjustmain(test, 'endkum');

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getCancelledIncomingtable({
            pvILanguage: '1',
            allSupp: state2.all,
            sorttype: state2.shape,
            fromGrp: state2.main.value,
            store: state2.store.value,
            fromDate: date.formatDate(state2.date.start, 'D/M/YY'),
            toDate: date.formatDate(state2.date.end, 'D/M/YY'),
            showPrice: state.showPrice,
            fromSupp: state2.all ? ' ' : state2.supplierVal,
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
    SearchCancelledIncoming: () =>
      import('./components/SearchCancelledIncoming.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
