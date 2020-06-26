<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchStockItemTransform @onSearch="onSearch" />
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
        id="printMe"
      ></q-table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  // onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { date } from 'quasar';
import { tableHeaders } from './tables/stockItemTransform.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
    });

    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getStockItemTransformtable({
            fromDate: date.formatDate(state2.date.start, 'DD/MM/YY'),
            toDate: date.formatDate(state2.date.end, 'DD/MM/YY'),
            fromArt: '1',
            toArt: '9999999',
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
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },
  components: {
    SearchStockItemTransform: () =>
      import('./components/SearchStockItemTransform.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
