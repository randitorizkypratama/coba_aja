<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
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
import { tableHeaders } from './tables/outletCompilementJournalizing';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      matGrp: '',
      p221: '',
      p224: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [glLinkcompliPrepare] = await Promise.all([
        $api.inventory.glLinkcompliPrepare(),
      ]);
    });
    const asyncCall = async (val) => {
      const response = await Promise.all([
        $api.inventory.glLinkcompli1({
          pvILanguage: 0,
          fromDate: date.formatDate(val.date.end, 'DD/MM/YY'),
          toDate: date.formatDate(val.date.start, 'DD/MM/YY'),
          doubleCurrency: 'no',
          foreignNr: 0,
          exchgRate: 1,
          userInit: 0,
        }),
      ]);
      state.data = response[0].tGList['t-g-list'] || [];
    };

    const onSearch = (val) => {
      asyncCall(val);
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
    searchAdjustmentResult: () =>
      import('./components/SearchOutletComplimentJournalizing.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
