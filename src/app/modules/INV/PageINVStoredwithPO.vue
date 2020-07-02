<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <SearchStoredwithPO 
      @onSearch="onSearch" 
      :orderDate="orderDate" />
    </q-drawer>
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
        <q-btn @click="incomingStock" flat round>
          <img :src="require('~/app/icons/INV/Icon-IncomingStock.svg')" height="40" />
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
      >
        <template #header-cell-fibukonto="props">
          <q-th :props="props" class="fixed-col left">{{ props.col.label }}</q-th>
        </template>

        <template #body-cell-fibukonto="props">
          <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto }}</q-td>
        </template>

        <template #header-cell-actions="props">
          <q-th :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon name="mdi-dots-vertical" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="editItem">
                    <q-item-section>edit</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="confirm = true">
                    <q-item-section>delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </STable>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
  ref,
} from '@vue/composition-api';
import { tableHeaders } from './tables/Issuedwithpo.table';
import { log } from 'util';
export default defineComponent({
  setup(_, { root: { $api }, root }) {
    let charts;
    const state = reactive({
      data: [],
      orderDate:""
    });
    onMounted(async () => {
      const GET_DATA = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInPrepare'),
      ]);
      state.orderDate = GET_DATA[0].orderDate
    });

    const incomingStock = () => {
      root.$router.push('/inv/incomingstock');
    };

    const getData = async (val) => {
      const GET_DATA = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInList1', {
          sorttype: val.group,
          ponum: val.poNumber,
          supplier: val.inputan,
          orderDate: val.inputan,
          fDate: '2019-01-14',
          tDate: '2019-01-14',
        }),
      ]);
      state.data = GET_DATA[0].q2List['q2-list'];
      console.log('sukses123', GET_DATA)
    };

    const onSearch = (val) => {
      getData(val);
    };

    const onRowClick = (p, val) => {
      localStorage.setItem('labelStoredwithPO', JSON.stringify(val))
    };
    return {
      ...toRefs(state),
      onSearch,
      onRowClick,
      tableHeaders,
      incomingStock,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    SearchStoredwithPO: () => import('./components/SearchStoredwithPO.vue'),
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
