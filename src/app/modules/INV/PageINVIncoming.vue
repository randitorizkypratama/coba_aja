<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchIncoming :searches="searches" @onSearch="onSearch" />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn @click="doPrint" flat round>
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
import print from 'print-js';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      lKreditRecid: '',
      longDigit: '',
      showPriceprepare: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resPrepare, resMaingroup, resStore] = await Promise.all([
        $api.inventory.getIncomingprepare({
          userInit: '01',
          apRecid: '0',
        }),
        $api.inventory.getIncomingmaingroup(),
        $api.inventory.getIncomingstore(),
      ]);
      console.log(resPrepare, 'prepare');
      console.log(resMaingroup, 'prepare2');
      console.log(resStore, 'prepare3');

      state.lKreditRecid = resPrepare.lKreditRecid;
      state.longDigit = resPrepare.longDigit;
      state.showPriceprepare = resPrepare.showPrice;
      state.searches.departments = mapWithadjustmain(resMaingroup, 'endkum');
      state.searches.store = mapWithadjuststore(resStore, ['lager-nr']);
      state.isFetching = false;
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
        label: 'Storage Number',
        field: 'st',
        name: 'st',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Supplier',
        field: 'supplier',
        name: 'supplier',
        sortable: false,
      },
      {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'DESCRIPTION',
        name: 'DESCRIPTION',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Delivery Unit',
        field: 'd-unit',
        name: 'd-unit',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Price',
        field: 'price',
        name: 'price',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Incoming Quantity',
        field: 'inc-qty',
        name: 'inc-qty',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Amount',
        field: 'amount',
        name: 'amount',
        sortable: false,
      },
      {
        label: 'Document Number',
        field: 'docu-no',
        name: 'docu-no',
        sortable: false,
      },
      {
        label: 'ID',
        field: 'ID',
        name: 'ID',
        sortable: false,
      },
      {
        label: 'Delivery Note',
        field: 'deliv-note',
        name: 'deliv-note',
        sortable: false,
      },
      {
        label: 'Invoice Number',
        field: 'invoice-nr',
        name: 'invoice-nr',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getIncomingtable({
            // pvILanguage: '1',
            // lastArtnr: '?',
            // lieferantRecid: state2.checkbox1 == true ? '0' : state2.supplier,
            // lKreditRecid: state.lKreditRecid,
            // longDigit: state.longDigit,
            // showPrice: state.showPriceprepare,
            // store: state2.storeNumber,
            // allSupp: state2.checkbox1,
            // sorttype: state2.radios,
            // fromGrp: state2.fromMainGroup,
            // toGrp: state2.toMainGroup,
            // fromDate: date.formatDate(state2.date.start, 'DD/MM/YY'),
            // toDate: date.formatDate(state2.date.end, 'DD/MM/YY'),
            // userInit: '01',
            // apRecid: '0',
            // taxcodeList: {
            //   'taxcode-list': [
            //     {
            //       taxcode: '',
            //       taxamount: '0',
            //     },
            //   ],
            pvILanguage: '1',
            lastArtnr: '?',
            lieferantRecid: '0',
            lKreditRecid: '0',
            apRecid: '0',
            longDigit: true,
            showPrice: true,
            store: '1',
            allSupp: true,
            sorttype: '1',
            fromGrp: '1',
            toGrp: '99',
            fromDate: '01/01/19',
            toDate: '14/01/19',
            userInit: '01',
            taxcodeList: {
              'taxcode-list': [
                {
                  taxcode: '',
                  taxamount: '0',
                },
              ],
            },
          }),
        ]);
        charts = response[0] || [];

        state.data = charts;
      }
      asyncCall();
    };

    function doPrint() {
      print({
        printable: state.data,
        type: 'json',
        properties: [
          { field: 'DATE', displayName: 'Date' },
          { field: 'st', displayName: 'Storage Number' },
          { field: 'supplier', displayName: 'Supplier' },
          { field: 'artnr', displayName: 'Article Number' },
          { field: 'DESCRIPTION', displayName: 'Description' },
          { field: 'd-unit', displayName: 'Delivery Unit' },
          { field: 'price', displayName: 'Price' },
          { field: 'inc-qty', displayName: 'Incoming Quantity' },
          { field: 'amount', displayName: 'Amount' },
          { field: 'docu-no', displayName: 'Document Number' },
          { field: 'ID', displayName: 'ID' },
          { field: 'deliv-note', displayName: 'Delivery Note' },
          { field: 'invoice-nr', displayName: 'Invoice Number' },
        ],
        header:
          '<center><h3 class="custom-h3">Accounting Parameter</h3></center>',
        style: '.custom-h3 { color: black; }',
      });
    }

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      groupHeaders,
      actionHeader,
      pagination: { page: 1, rowsPerPage: 0 },
      doPrint,
    };
  },
  components: {
    searchIncoming: () => import('./components/SearchIncoming.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
