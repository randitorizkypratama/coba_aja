<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchInterStoreTransfer :searches="searches" @onSearch="onSearch" />
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
  mapWithBezeich,
} from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';
import { tableHeaders } from './tables/interstoretransfer.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      showPrice: '',
      availQueasy: '',
      searches: {
        departments: [],
        store: [],
        article: [],
        displayList: [
          {
            label: 'Material & Engineering Articles',
            value: 0,
          },
          {
            label: 'Material Articles Only',
            value: 1,
          },
          {
            label: 'Engineering Articles Only',
            value: 2,
          },
        ],
      },
    });

    onMounted(async () => {
      const [resDepart, resArticle] = await Promise.all([
        $api.inventory.getInterStoreTransferprepare(),
        $api.inventory.getInterStoreTransferarticle({
          currLager: '0',
          recipe: false,
          sorttype: '0',
          sArtnr: '0',
          sBezeich: ' ',
        }),
      ]);

      state.showPrice = resDepart.showPrice;
      state.availQueasy = resDepart.availQueasy;

      state.searches.departments = mapWithadjustmain(
        resDepart.tLHauptgrp['t-l-hauptgrp'],
        'endkum'
      );
      state.searches.store = mapWithadjuststore(
        resDepart.tLLager['t-l-lager'],
        ['lager-nr']
      );
      state.searches.article = mapWithBezeich(resArticle, 'artnr');

      state.isFetching = false;
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getAdjustmentResulttable({
            transCode: state2.transfercode,
            mGrp:
              state2.main.value === undefined || state2.main.value === 0
                ? 0
                : state2.main.value,
            sorttype: state2.shape,
            mStr:
              state2.store.value === undefined || state2.store.value === 0
                ? 0
                : state2.store.value,
            mattype: state2.display,
            fromArt: state2.fromarticle.value,
            toArt: state2.toarticle.value,
            fromDate: date.formatDate(state2.date.start, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.date.end, 'YYYY-MM-DD'),
            showPrice: state.showPrice,
            expenseAmt: state2.use,
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
    searchInterStoreTransfer: () =>
      import('./components/SearchInterStoreTransfer.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
