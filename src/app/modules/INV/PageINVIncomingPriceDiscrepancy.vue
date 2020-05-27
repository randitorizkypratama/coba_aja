<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchIncomingPriceDiscrepancy :searches="searches" @onSearch="onSearch" />
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
      const [resDepart, resMain] = await Promise.all([
        $api.inventory.getIncomingPriceDiscrepancyStorage(),
        $api.inventory.getIncomingPriceDiscrepancyArticleList(),
      ]);

     console.log(resDepart);
     console.log(resMain);
     

      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: 'Date',
        field: 'datum',
        name: 'datum',
        align: 'left',
        sortable: false,
      },
      {
        label: 'St',
        field: 'lager',
        name: 'lager',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Document Number',
        field: 'docunr',
        name: 'docunr',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Article',
        field: 'art',
        name: 'art',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Quantity',
        field: 'in-qty',
        name: 'in-qty',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Amount',
        field: 'amount',
        name: 'amount',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Received-Price',
        field: 'epreis1',
        name: 'epreis1',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Received-Price',
        field: 'epreis1',
        name: 'epreis1',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Ordered-Price',
        field: 'epreis2',
        name: 'epreis2',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Ordered-Price',
        field: 'lief',
        name: 'lief',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Delivery Note',
        field: 'dlvnote',
        name: 'dlvnote',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getIncomingPriceDiscrepancyTable({
            sorttype: '1',
            fromLager: '1',
            toLager: '18',
            fromDate: '01/01/19',
            toDate: '14/01/19',
            fromArt: '0000001',
            toArt: '9999999',
            miRecChk: false,
            miOrdChk: false,
            miAllChk: true,
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
    SearchIncomingPriceDiscrepancy: () =>
      import('./components/SearchIncomingPriceDiscrepancy.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
