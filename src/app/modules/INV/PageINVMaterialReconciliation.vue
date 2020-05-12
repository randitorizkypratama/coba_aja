<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchMaterialReconciliation :searches="searches" @onSearch="onSearch" />
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
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([
        $api.inventory.getMaterialReconciliationprepare(),
      ]);

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
        label: 'Inventory Account',
        field: 'inv-acct',
        name: 'inv-acct',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Opening Value',
        field: 'prevval',
        name: 'prevval',
        sortable: false,
      },
      {
        label: 'Incoming Value',
        field: 'inval',
        name: 'inval',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Consumed Value',
        field: 'outval',
        name: 'outval',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Ending Value',
        field: 'actval',
        name: 'actval',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Initial On Hand Adjustment',
        field: 'adjust',
        name: 'adjust',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getMaterialReconciliationtable({
            pvILanguage: '1',
            toDate: date.formatDate(state2.date, 'YYYY/MM/DD'),
            lagerNo: state2.store == undefined ? 0 : state2.store,
            fromMain: state2.fromdepartments.value,
            toMain: state2.todepartments.value,
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
    SearchMaterialReconciliation: () =>
      import('./components/SearchMaterialReconciliation.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
