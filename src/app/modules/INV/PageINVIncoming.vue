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
import { tableHeaders } from './tables/incoming.table';
import {
  getHtlName,
  getHtlAdr,
  getHtlTel,
} from '~/app/helpers/getCredentials.helpers';

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

      state.lKreditRecid = resPrepare.lKreditRecid;
      state.longDigit = resPrepare.longDigit;
      state.showPriceprepare = resPrepare.showPrice;
      state.searches.departments = mapWithadjustmain(resMaingroup, 'endkum');
      state.searches.store = mapWithadjuststore(resStore, ['lager-nr']);
      state.isFetching = false;
    });

    const onSearch = (state2) => {

      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getIncomingtable({
            pvILanguage: '1',
            lastArtnr: '?',
            lieferantRecid: state2.all == true ? '0' : state2.supplier,
            lKreditRecid: state.lKreditRecid,
            longDigit: state.longDigit,
            showPrice: state.showPriceprepare,
            store: state2.store.value,
            allSupp: state2.all,
            sorttype: state2.shape,
            fromGrp: state2.fromMain.value,
            toGrp: state2.toMain.value,
            fromDate: date.formatDate(state2.date.start, 'DD/MM/YY'),
            toDate: date.formatDate(state2.date.end, 'DD/MM/YY'),
            userInit: '01',
            apRecid: '0',
            taxcodeList: {
              'taxcode-list': [
                {
                  taxcode: '',
                  taxamount: '0',
                },
              ],
              // pvILanguage: '1',
              // lastArtnr: '?',
              // lieferantRecid: '0',
              // lKreditRecid: '0',
              // apRecid: '0',
              // longDigit: true,
              // showPrice: true,
              // store: '1',
              // allSupp: true,
              // sorttype: '1',
              // fromGrp: '1',
              // toGrp: '99',
              // fromDate: '01/01/19',
              // toDate: '14/01/19',
              // userInit: '01',
              // taxcodeList: {
              //   'taxcode-list': [
              //     {
              //       taxcode: '',
              //       taxamount: '0',
              //     },
              //   ],
            },
          }),
        ]);
        charts = response[0] || [];

        for (let i = 0; i < charts.length; i++) {
          const dataRow = {};
          const dataItem = charts[i];

          dataRow['DATE'] =
            dataItem['DATE'] == null || undefined || ''
              ? ' '
              : date.formatDate(dataItem['DATE'], 'DD/MM/YYYY');
          dataRow['st'] = dataItem['st'] == 0 ? '' : dataItem['st'];
          dataRow['supplier'] = dataItem['supplier'];
          dataRow['artnr'] = dataItem['artnr'] == 0 ? '' : dataItem['artnr'];
          dataRow['DESCRIPTION'] = dataItem['DESCRIPTION'];
          dataRow['d-unit'] = dataItem['d-unit'];
          dataRow['price'] = dataItem['price'] == 0 ? '' : dataItem['price'];
          dataRow['inc-qty'] =
            dataItem['inc-qty'] == 0 ? '' : dataItem['inc-qty'];
          dataRow['amount'] = dataItem['amount'] == 0 ? '' : dataItem['amount'];
          dataRow['docu-no'] = dataItem['docu-no'];
          dataRow['ID'] = dataItem['ID'];
          dataRow['deliv-note'] = dataItem['deliv-note'];
          dataRow['invoice-nr'] = dataItem['invoice-nr'];

          state.data.push(dataRow);
        }
      }
      asyncCall();
    };

    const today = Date.now();
    const formattedToday = date.formatDate(today, 'DD/MM/YYYY');
    const rawHeader =
      `
        <table style=width:100%>
        <tr>
        <td align=left>` +
      getHtlName +
      `</td>
        <td align=right>Date: ` +
      formattedToday +
      `</td>
        </tr>
        <tr>
        <td align=left>` +
      getHtlAdr +
      `</td>
        </tr>
        <tr>
        <td align=left>Tel ` +
      getHtlTel +
      `</td>
        </tr>
        </table>
        <center><h3 class="custom-h3">Incoming (Receiving Report by Suppliers)</h3></center>
    `;

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
        header: rawHeader,
        style: '.custom-h3 { color: black; }',
      });
    }
    const groupHeaders = (cols) => cols.filter((col) => col.name !== 'actions');
    const actionHeader = (cols) => cols.find((col) => col.name === 'actions');
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
