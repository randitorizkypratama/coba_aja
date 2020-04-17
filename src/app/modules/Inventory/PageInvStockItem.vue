<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchChart
        :searches="searches"
        :selected="selectedAccount"
        @onSearch="onSearch"
      />
    </q-drawer>
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Add.svg')" height="30" />
        </q-btn>
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>
      <q-table
        dense
        :data="data"
        :columns="tableHeaders"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import searchChart from './components/SearchChartStockItem.vue';
export default defineComponent({
  components: {
    searchChart,
  },

  setup(_, { root: { $api } }) {
    let charts;
    const state = reactive({
      data: [],
    });
    onMounted(async () => {
      const resArtcl = await Promise.all([$api.stockItem.getInvArticleList()]);
      charts = resArtcl || [];
      state.data = charts[0];
    });
    const onSearch = ({ shape, articleNumber }) => {
      console.log('asuku', shape);
      console.log('asuku', articleNumber);
    };
    const tableHeaders = [
      {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: true,
      },
      {
        label: 'Unit',
        field: 'masseinheit',
        name: 'masseinheit',
        sortable: true,
      },
      {
        label: 'Content',
        field: 'inhalt',
        name: 'inhalt',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Unit',
        field: 'traubensorte',
        name: 'traubensorte',
        sortable: true,
      },
      {
        label: 'Content',
        field: 'lief-einheit',
        name: 'lief-einheit',
        sortable: true,
      },
      {
        label: 'Minumum Stock (Mess)',
        field: 'min-bestand',
        name: 'min-bestand',
        sortable: true,
      },
      {
        label: 'Actual',
        field: 'ek-aktuell',
        name: 'ek-aktuell',
        sortable: true,
      },
      {
        label: 'Last',
        field: 'ek-letzter',
        name: 'ek-letzter',
        sortable: true,
      },
      {
        label: 'Average',
        field: 'vk-preis',
        name: 'vk-preis',
        sortable: true,
      },
      {
        label: 'Purchase Frequency',
        field: 'fibukonto',
        name: 'fibukonto',
        sortable: true,
      },
      { name: 'Actions', field: 'actions' },
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
});
</script>
