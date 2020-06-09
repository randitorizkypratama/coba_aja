<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchOutletSoldMenu :searches="searches" @onSearch="onSearch" />
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
        :class="{mystickyvirtscrolltable : trueandfalse}"
        :data="build"
        :columns="tableHeaders"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
      />
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
import { mapOU } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let responsePrepare;
    let charts;

    const state = reactive({
      isFetching: true,
      build: [],
      searches: {
        fromDept: [],
        toDept: [],
        sorting: [],
      },
    });

    onMounted(async () => {
      const [data] = await Promise.all([
        $api.outlet.getOUPrepareOutletSoldMenu('fbSalesCostsAnalPrepare', {
          fromDate: '1',
          toDate: '99',
        }),
      ]);

      responsePrepare = data || [];
      console.log('test', responsePrepare);
      // state.searches.fromDept = mapOU(responsePrepare, 'fromDept');
      // state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const dataOutletSoldMenuList = await Promise.all([
          $api.outlet.getOUSummaryRestaurantReport('fbSalesCostsAnalList', {
            subgrList: {
              'subgr-list': [
                {
                  selected: true,
                  subnr: responsePrepare.subnr,
                  bezeich: responsePrepare.bezeich,
                },
              ],
            },
            sorttype: '1',
            fromDept: '1',
            toDept: '1',
            dstore: '0',
            ldryDept: '20',
            allSub: true,
            fromDate: date.formatDate(state2.date.start, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.date.end, 'YYYY-MM-DD'),
            fact1: '1',
            exchgRate: '1',
            vatIncluded: false,
            miSubgrp: false,
            detailed: false,
            currSort: '1',
            shortFlag: 'yes',
          }),
        ]);

        charts = dataOutletSoldMenuList[0] || [];
        state.build = charts;

        console.log(state2.date, 'date1');
      }
      asyncCall();
    };

    const tableHeaders = [
      {
        label: 'Article Number',
        field: 'depart',
        name: 'depart',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'depname1',
        name: 'depname1',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Quantity',
        field: 'food',
        name: 'food',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Percentage',
        field: 'beverage',
        name: 'beverage',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Unit Price',
        field: 'cigarette',
        name: 'cigarette',
        sortable: false,
      },
      {
        label: 'Unit Cost',
        field: 'discount',
        name: 'discount',
        sortable: false,
      },
      {
        label: 'Ratio',
        field: 't-service',
        name: 't-service',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Sales',
        field: 't-tax',
        name: 't-tax',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Cost',
        field: 't-debit',
        name: 't-debit',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Ratio',
        field: 'p-cash1',
        name: 'p-cash1',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Percentage',
        field: 'p-cash',
        name: 'p-cash',
        align: 'right',
        sortable: false,
      },
    ];

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
    searchOutletSoldMenu: () => import('./components/SearchOutletSoldMenu.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
.mystickyvirtscrolltable {
  height: 410px;
}
</style>
