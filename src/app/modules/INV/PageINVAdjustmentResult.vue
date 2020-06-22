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
import { tableHeaders } from './tables/adjustmentResult.table';

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

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getAdjustmentResulttable({
            sorttype: state2.shape,
            currLager: state2.store.value,
            fromGrp: state2.departments.value,
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
