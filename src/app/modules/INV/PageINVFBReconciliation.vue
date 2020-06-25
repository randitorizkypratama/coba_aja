<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchFBReconciliation :searches="searches" :range="range" @onSearch="onSearch" />
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
import { mapWithadjustmain } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';
import { tableHeaders } from './tables/fbReconciliation.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      food: '',
      bev: ' ',
      date1: '',
      date2: ' ',
      searches: {
        departments: [],
      },
      range: {
        start: new Date(),
        end: new Date(),
      },
    });

    onMounted(async () => {
      const [resPrepare, resMain] = await Promise.all([
        $api.inventory.getFBReconciliationprepare(),
        $api.inventory.getFBReconciliationMainGroup(),
      ]);

      state.food = resPrepare.food;
      state.bev = resPrepare.bev;
      state.date2 = date.formatDate(resPrepare.toDate, 'DD/MM/YY');
      state.range.end = new Date(
        date.formatDate(resPrepare.toDate, 'DD/MM/YYYY')
      );
      const dd = '01';
      const mmyy = date.formatDate(resPrepare.toDate, 'MM/YY');
      const mmyyyy = date.formatDate(resPrepare.toDate, 'MM/YYYY');
      state.date1 = dd + '/' + mmyy;
      state.range.start = new Date(dd + '/' + mmyyyy);
      const coba = resMain.tLHauptgrp['t-l-hauptgrp'];
      coba.push({ endkum: 0, bezeich: 'ALL' });
      state.searches.departments = mapWithadjustmain(coba, 'endkum');

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getFBReconciliationtable({
            pvILanguage: '1',
            caseType:
              state2.main.value == 1
                ? state.food
                : state2.main.value == 2
                ? state.bev
                : 0,
            fromDate: state.date1,
            toDate: state.date2,
            fromGrp: state2.main.value,
            miOpt: state2.summary,
            date1: date.formatDate(state2.range.start, 'DD/MM/YY'),
            date2: date.formatDate(state2.range.end, 'DD/MM/YY'),
          }),
        ]);

        charts = response[0] || [];
        console.log(charts);

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
    SearchFBReconciliation: () =>
      import('./components/SearchFBReconciliation.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
