<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
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
      <STable
        :loading="isFetching"
        :columns="tableHeaders"
        :data="data"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        hide-bottom
        class="table-accounting-date"
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
      isFetching: false,
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
        $api.inventory.apiIncomingJournalizing('glLinkstockBtnGo', {
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

      if (charts.length !== 0) {
        state.isFetching = false;
      }
      state.searches.hasilCredit = totalCredit;
      state.searches.hasilDebit = totalDebit;

      if (GET_DATA[0].outputOkFlag == 'true') {
        state.trueAndFalse = true;
      }
    };

    const onSearch = (val) => {
      state.isFetching = true;
      getData();
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    searchIncoming: () => import('./components/SearchIncomingJournalizing.vue'),
  },
});
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 75vh;

  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
}
</style>