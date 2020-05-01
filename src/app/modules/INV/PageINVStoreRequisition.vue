<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchIncoming :searches="searches" @onSearch="onSearch" />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn @click="dialog = true" flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Add.svg')" height="30" />
        </q-btn>
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <q-table
        class="my-sticky-virtscroll-table"
        :columns="tableHeaders"
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :virtual-scroll-sticky-size-start="48"
        :pagination.sync="pagination"
        hide-bottom
        @row-click="onRowClick"
      />
      <dialogTypeStoreRequisition />
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

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      searches: {
        departments: [],
        store: [],
      },
    });

    const tableHeaders = [
      {
        label: 'Date',
        field: 'DATE',
        name: 'DATE',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Delivery Number',
        field: 'st',
        name: 'st',
        align: 'left',
        sortable: false,
      },
      {
        label: 'From Storage',
        field: 'supplier',
        name: 'supplier',
        sortable: false,
      },
      {
        label: 'To Storage',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Articel',
        field: 'DESCRIPTION',
        name: 'DESCRIPTION',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'd-unit',
        name: 'd-unit',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Unit',
        field: 'price',
        name: 'price',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Content',
        field: 'inc-qty',
        name: 'inc-qty',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Average Price',
        field: 'amount',
        name: 'amount',
        sortable: false,
      },
      {
        label: 'Quantity',
        field: 'docu-no',
        name: 'docu-no',
        sortable: false,
      },
      {
        label: 'Outgoing Quantity',
        field: 'ID',
        name: 'ID',
        sortable: false,
      },
      {
        label: 'Account Number',
        field: 'deliv-note',
        name: 'deliv-note',
        sortable: false,
      },
      {
        label: 'ID',
        field: 'invoice-nr',
        name: 'invoice-nr',
        sortable: false,
      },
      {
        label: 'Approved',
        field: 'invoice-nr',
        name: 'invoice-nr',
        sortable: false,
      },
    ];
    const onSearch = () => {
      state;
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
    searchIncoming: () => import('./components/SearchStoreRequisition.vue'),
    dialogTypeStoreRequisition: () =>
      import('./components/DialogTypeStoreRequisition.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
