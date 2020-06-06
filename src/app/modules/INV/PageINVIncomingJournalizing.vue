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
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <q-table
        dense
        :class="{mystickyvirtscrolltable : trueAndFalse}"
        :columns="tableHeaders"
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :virtual-scroll-sticky-size-start="48"
        :pagination.sync="pagination"
        hide-bottom
        @row-click="onRowClick"
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
import { tableHeaders } from './tables/IncomingJournalizing';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      searches: {
        departments: [],
        store: [],
        hasilCredit: 0,
        hasilDebit: 0,
      },
      data: [],
      trueAndFalse: false,
    });

    const getData = async () => {
      const GET_DATA = await Promise.all([
        $api.inventory.glLinkstockBtnGo({
          pvILanguage: 0,
          linkOut: true,
          linkIn: true,
          fromGrp: 0,
          fromDate: '01/02/19',
          toDate: '01/02/19',
          userInit: 0,
        }),
      ]);
      charts = GET_DATA[0].tGList['t-g-list'];
      state.data = charts;

      let totalCredit = 0;
      let totalDebit = 0;
      for (const i in charts) {
        totalCredit += charts[i].credit;
        totalDebit += charts[i].debit;
      }

      state.searches.hasilCredit = totalCredit;
      state.searches.hasilDebit = totalDebit;

      if (GET_DATA[0].outputOkFlag == 'true') {
        state.trueAndFalse = true;
      }
    };

    const onSearch = (val) => {
      getData();
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      pagination: {
        rowsPerPage: 0,
        // rowsNumber: state.GET_DATA.length,
      },
    };
  },
  components: {
    searchIncoming: () => import('./components/SearchIncomingJournalizing.vue'),
  },
});
</script>

<style lang="scss" scoped>
.mystickyvirtscrolltable {
  height: 410px;
}

.my-sticky-virtscroll-table .q-table__top .q-table__bottom {
}

.my-sticky-virtscroll-table thead tr:first-child th {
  background-color: #fff;
}

.my-sticky-virtscroll-table thead tr th {
  position: sticky;
  // z-index: 1
}
.my-sticky-virtscroll-table thead tr:last-child th {
  top: 48px;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  top: 0;
}
</style>
