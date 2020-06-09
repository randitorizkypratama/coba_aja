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
        :loading="isFetching"
        dense
        :class="{ mystickyvirtscrolltable: trueandfalse }"
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
import { mapOU, mapGroup } from '~/app/helpers/mapSelectItems.helpers';
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
        getDateItem: [],
      },
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
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Quantity',
        field: 'qty',
        name: 'qty',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Percentage',
        field: 'proz1',
        name: 'proz1',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Unit Price',
        field: 'epreis',
        name: 'epreis',
        sortable: false,
      },
      {
        label: 'Unit Cost',
        field: 'cost',
        name: 'cost',
        sortable: false,
      },
      {
        label: 'Ratio',
        field: 'margin',
        name: 'margin',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Sales',
        field: 't-sales',
        name: 't-sales',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Cost',
        field: 't-cost',
        name: 't-cost',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Ratio',
        field: 't-margin',
        name: 't-margin',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Percentage',
        field: 'proz2',
        name: 'proz2',
        align: 'right',
        sortable: false,
      },
    ];

    onMounted(async () => {
      const [data] = await Promise.all([
        $api.outlet.getOUPrepareOutletSoldMenu('fbSalesCostsAnalPrepare', {
          fromDate: '1',
          toDate: '99',
        }),
      ]);
      responsePrepare = data || [];
      const dataItem = responsePrepare.tWgrpdep['t-wgrpdep'];
      for (const i in dataItem) {
        state.searches.getDateItem.push(dataItem[i].bezeich);
      }
      state.searches.fromDept = mapGroup(
        responsePrepare.tHoteldpt['t-hoteldpt'],
        'depart',
        'num'
      );
      state.searches.toDept = mapGroup(
        responsePrepare.tHoteldpt['t-hoteldpt'],
        'depart',
        'num'
      );
      state.isFetching = false;
    });
    const onSearch = (state2) => {
      async function asyncCall() {
        const dataOutletSoldMenuList = await Promise.all([
          $api.outlet.getOUgetOUOutletSoldMenu({
            subgrList: {
              'subgr-list': [
                {
                  selected: true,
                  subnr: '10',
                  bezeich: 'PACKAGE',
                },
              ],
            },
            sorttype: '1',
            fromDept: state2.fromDept.value,
            toDept: state2.toDept.value,
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
            currSort: '2',
            shortFlag: true,
          }),
        ]);

        charts =
          dataOutletSoldMenuList[0].fbCostAnalyst['fb-cost-analyst'] || [];
        state.build = charts;

        console.log(dataOutletSoldMenuList, 'data1');
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
