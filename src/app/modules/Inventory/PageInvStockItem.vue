<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchChart />
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
      <q-table dense :data="data" :columns="tableHeaders" row-key="name" />
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
    onMounted(async () => {
      const resArtcl = await Promise.all([$api.stockItem.getInvArticleList()]);
      console.log('asuku', resArtcl);
    });
  },
});
</script>
