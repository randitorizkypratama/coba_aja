<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchFBFlash :searches="searches" @onSearch="onSearch" />
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
      date1: '',
      date2: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart, resMain] = await Promise.all([
        $api.inventory.getFBFlashprepare(),
        $api.inventory.getFBFlashMainGroup(),
      ]);

      state.food = resDepart.food;
      state.bev = resDepart.bev;
      state.date1 = resDepart.date1;
      state.date2 = resDepart.date2;
      state.searches.departments = mapWithadjustmain(
        resMain.tLHauptgrp['t-l-hauptgrp'],
        'endkum'
      );

      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: 'Transfer to Storage',
        field: 'trans-to-storage',
        name: 'trans-to-storage',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Cost Allocation',
        field: 'cost-alloc',
        name: 'cost-alloc',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Today Consumed',
        field: 'day-cons',
        name: 'day-cons',
        align: 'right',
        sortable: false,
      },
      {
        label: 'MTD Consumed',
        field: 'mtd-cons',
        name: 'mtd-cons',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getFBFlashtable({
            pvILanguage: '1',
            fromGrp: state2.departments.value,
            food: state.food,
            bev: state.bev,
            date1: date.formatDate(state2.fromdate, 'DD/MM/YY'),
            date2: date.formatDate(state2.todate, 'DD/MM/YY'),
            'incl-initoh': state2.cost,
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
    SearchFBFlash: () => import('./components/SearchFBFlash.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
