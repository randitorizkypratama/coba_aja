<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchSlowMovingStockOnHand :searches="searches" @onSearch="onSearch" />
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
      showPrice: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([
        $api.inventory.getSlowMovingprepare(),
      ]);
      state.showPrice = resDepart.showPrice;

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
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Name',
        field: 'name',
        name: 'name',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Minimum On Hand',
        field: 'min-oh',
        name: 'min-oh',
        sortable: false,
      },
      {
        label: 'Current On Hand',
        field: 'curr-oh',
        name: 'curr-oh',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Average Price',
        field: 'avrgprice',
        name: 'avrgprice',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Actual Price',
        field: 'ek-aktuell',
        name: 'ek-aktuell',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Last Purchase Date',
        field: 'datum',
        name: 'datum',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getSlowMovingtable({
            storeNo: state2.store.value,
            mainGrp: state2.departments.value,
            tage: state2.day != '' ? state2.day : 0,
            showPrice: state.showPrice,
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
    SearchSlowMovingStockOnHand: () =>
      import('./components/SearchSlowMovingStockOnHand.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
