<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <searchAdjustmentResult :searches="searches" @onSearch="onSearch" />
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
    <div>
      <q-dialog v-model="confirm">
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Do you really want to transfer NOW to G/L?”</span>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn @click="ok" flat label="Ok" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
import { tableHeaders } from './tables/outletCompilementJournalizing';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: false,
      confirm: false,
      data: [],
      gListTable: [],
      matGrp: '',
      p221: '',
      p224: '',
      searches: {
        departments: [],
        store: [],
        hasilCredit: 0,
        hasilDebit: 0,
      },
    });

    onMounted(async () => {
      const glLinkcompliPrepare = await Promise.all([
        $api.inventory.apiOutletComplimentJournalizing('glLinkcompliPrepare'),
      ]);
      console.log('sukses01', glLinkcompliPrepare);
    });

    const asyncCall = async (val) => {
      const response = await Promise.all([
        $api.inventory.apiOutletComplimentJournalizing('glLinkcompli1', {
          pvILanguage: 0,
          fromDate: '01/01/19',
          toDate: '05/01/19',
          doubleCurrency: 'no',
          foreignNr: 0,
          exchgRate: 1,
          userInit: 0,
        }),
      ]);

      charts = response[0].tGList['t-g-list'] || [];
      state.data = charts;
      state.gListTable = response[0];

      if (state.data.length !== 0) {
        state.isFetching = false;
        state.confirm = true;
      }

      state.searches.hasilCredit = response[0].credits;
      state.searches.hasilDebit = response[0].debits;
    };

    const ok = async () => {
      const GET_DATA = await Promise.all([
        $api.inventory.tes('glLinkcompli2', {
          pvILanguage: 0,
          remains: state.gListTable.remains,
          debits: state.searches.hasilDebit,
          credits: state.searches.hasilCredit,
          toDate: '04/01/19',
          refno: 'lkeqqk',
          bezeich: 'dis',
          'msg-str': state.gListTable.msgStr,
          tGList: {
            't-g-list': state.data,
          },
        }),
      ]);

      // console.log('sukses', GET_DATA);
    };

    const onSearch = (val) => {
      state.isFetching = true;
      asyncCall(val);
    };

    return {
      ...toRefs(state),
      tableHeaders,
      ok,
      onSearch,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    searchAdjustmentResult: () =>
      import('./components/SearchOutletComplimentJournalizing.vue'),
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
