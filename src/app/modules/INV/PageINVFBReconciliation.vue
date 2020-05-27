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
      toDate: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart, resMain] = await Promise.all([
        $api.inventory.getFBReconciliationprepare(),
        $api.inventory.getFBReconciliationMainGroup(),
      ]);

      state.food = resDepart.food;
      state.bev = resDepart.bev;
      state.toDate = resDepart.toDate;
      state.searches.departments = mapWithadjustmain(
        resMain.tLHauptgrp['t-l-hauptgrp'],
        'endkum'
      );

      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: '',
        field: 'col1',
        name: 'col1',
        align: 'left',
        sortable: false,
      },
      {
        label: '',
        field: 'col2',
        name: 'col2',
        align: 'left',
        sortable: false,
      },
      {
        label: '',
        field: 'col3',
        name: 'col3',
        align: 'right',
        sortable: false,
      },
      {
        label: '',
        field: 'col4',
        name: 'col4',
        align: 'right',
        sortable: false,
      },
      {
        label: '',
        field: 'col5',
        name: 'col5',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      console.log(state2, 'search');

      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getFBReconciliationtable({
            pvILanguage: '1',
            caseType:
              state2.departments.value == null
                ? 0
                : state2.departments.value == 1
                ? 1
                : state2.departments.value == 2
                ? 2
                : state2.departments,
            fromDate: date.formatDate(state2.fromdate, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.todate, 'YYYY-MM-DD'),
            fromGrp: state2.departments.value == null ? 0 : state2.departments.value,
            miOpt: state2.summary,
            date1: date.formatDate(state2.fromdate, 'DD/MM/YY'),
            date2: date.formatDate(state2.todate, 'DD/MM/YY'),
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
