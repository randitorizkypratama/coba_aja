<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchFBReconciliation :searches="searches" @onSearch="onSearch" />
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
      toDate: ' ',
      searches: {
        departments: [],
      },
    });

    onMounted(async () => {
      const [resPrepare, resMain] = await Promise.all([
        $api.inventory.getFBReconciliationprepare(),
        $api.inventory.getFBReconciliationMainGroup(),
      ]);

      state.food = resPrepare.food;
      state.bev = resPrepare.bev;
      state.toDate = resPrepare.toDate;

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
            caseType: ' 0',
            fromDate: '01/01/19',
            toDate: '15/01/19',
            fromGrp: '0',
            miOpt: false,
            date1: '01/01/19',
            date2: '15/01/19',
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
