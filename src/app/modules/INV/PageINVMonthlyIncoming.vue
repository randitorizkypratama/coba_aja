<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchMonthlyIncoming :searches="searches" @onSearch="onSearch" />
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
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/monthlyIncoming.table';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let dataLists;

    const state = reactive({
      isFetching: true,
      data: [],
      //fromDate: '',
      //toDate: '',
      date: null,
      fromStore: null,
      toStore: null,
      fromArt: null,
      toArt: null,
      sortBy: 1,
      searches: {
        articles: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resStore, resArt] = await Promise.all([
        $api.inventory.getIncomingstore(),
        $api.inventory.getAllInvArticleList({
          currLager: '0',
          recipe: 'false',
          sorttype: '0',
          sArtnr: '0',
          sBezeich: ' ',
        }),
      ]);
      state.searches.store = mapGroup(resStore, ['bezeich'], ['lager-nr']);
      state.searches.articles = mapGroup(resArt, ['bezeich'], ['artnr']);
      state.isFetching = false;
    });

    const onSearch = async(state2) => {
      const response = await $api.inventory.getMonthlyIncomingList({
        sorttype: state2.sortBy,
        fromLager: state2.fromStore.value,
        toLager: state2.toStore.value,
        fromDate: date.formatDate(state2.date.start, 'DD/MM/YY'),
        toDate: date.formatDate(state2.date.end, 'DD/MM/YY'),
        fromArt: state2.fromArt.value,
        toArt: state2.toArt.value,
        fromGrp: '0',
        toGrp: '999',
      });
      dataLists = response || [];
      state.data = dataLists;
    };

    /*const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getInterKitchenTransfertable({
            sorttype: state2.shape,
            fromDept: state2.fromdepartments.value,
            toDept: state2.todepartments.value,
            fromDate: date.formatDate(state2.date.start, 'YYYY-MM-DD'),
            toDate: date.formatDate(state2.date.end, 'YYYY-MM-DD'),
          }),
        ]);
        lists = response[0] || [];
        state.datas = lists;
      }
      asyncCall();
    };*/

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
    SearchMonthlyIncoming: () =>
      import('./components/SearchMonthlyIncoming.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
