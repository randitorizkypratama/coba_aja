<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <SearchChartOfAccounts :searches="searches" :selected="selectedAccount" @onSearch="onSearch" />
    </q-drawer>
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn @click="dialog = true" flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Add.svg')" height="30" />
        </q-btn>
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>
      <STable
        class="table-rooming-list"
        :columns="roomTableHeaders"
        :data="data"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        hide-bottom
        row-key="zinr"
        :filter="filterRooms"
        :filter-method="filterTable"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
              class="fixed-col left"
              style="z-index: 4; width: 70px;"
            >{{ props.colsMap.articelNumber.label }}</q-th>

            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
              class="fixed-col left"
              style="z-index: 4;"
            >{{ props.colsMap.descriPtion.label }}</q-th>
            <q-th colspan="2">Mess</q-th>
            <q-th colspan="2">Delivery</q-th>
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
              class="fixed-col left"
              style="z-index: 4;"
            >{{ props.colsMap.guestNote.label }}</q-th>
            <q-th colspan="3">Price</q-th>
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
              class="fixed-col right"
              style="z-index: 4;"
            >{{ props.colsMap.purchase.label }}</q-th>
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
              class="fixed-col right"
              style="z-index: 4;"
            >{{ props.colsMap.accountNumber.label }}</q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th
              v-for="col in getDefaultColumns(props.cols)"
              :key="col.name"
              :props="props"
            >{{ col.label }}</q-th>
          </q-tr>
        </template>
      </STable>
    </div>
    <DialogChartOfAccounts
      :dialog="dialog"
      @onDialog="onDialog"
      :selected="prepare"
      :accountId="accountId"
      :getAccountnumber="valueData"
    />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">
            Are you sure delete the stock article {{ 1101002 }} - Avocado
            ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';
// import { tableHeaders } from './tables/stockItem.table';
import { roomTableHeaders } from './tables/stockItem.table';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;
    const state = reactive({
      data: [],
      dialog: false,
      confirm: false,
      prepare: '',
      trueandfalse: false,
      valueData: 0,
      accountId: '',
      getAccountnumber: '',
    });

    const onSearch = ({ shape, articleNumber }) => {
      if (articleNumber == undefined) {
        if (shape == undefined) {
          console.log('error button');
        } else {
          async function asyncCall() {
            const resArtcl = await Promise.all([
              $api.inventory.apiStockItem('getInvArticleList', {
                sorttype: shape,
                lastArt: '*',
                lastArt1: '',
              }),
            ]);

            charts = resArtcl[0].tLArtikel['t-l-artikel'] || [];
            state.data = charts;
            state.trueandfalse = true;
          }
          asyncCall();
        }
      } else {
        state.data = charts.filter((account: any) => {
          if (articleNumber && articleNumber !== account.artnr.toString()) {
            return false;
          }
          return true;
        });
      }
    };

    const onDialog = (val) => {
      state.dialog = val;
    };

    function deleteData() {
      async function asyncCall() {
        const GET_DATA = await Promise.all([
          $api.inventory.apiStockItem('delInvArticle', {
            pvILanguage: 1,
            artnr: state.valueData,
          }),
        ]);
      }
      asyncCall();
    }

    const onRowClick = (p, val) => {
      state.valueData = val.artnr;
    };

    function editItem(accountId) {
      state.dialog = true;
      state.accountId = accountId;
    }

    function getDefaultColumns(cols) {
      return cols.filter(
        (col) =>
          ![
            'descriPtion',
            'articelNumber',
            'guestNote',
            'purchase',
            'accountNumber',
          ].includes(col.name)
      );
    }
    return {
      ...toRefs(state),
      roomTableHeaders,
      getDefaultColumns,
      editItem,
      onRowClick,
      deleteData,
      onSearch,
      onDialog,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () =>
      import('./components/SearchChartStockItem.vue'),
    DialogChartOfAccounts: () => import('./components/ModalNewStockItem.vue'),
    StockItemRoomTable: () => import('./components/INVStockItemRoomTable.vue'),
  },
});
</script>

<style lang="scss" scoped>
.table-rooming-list {
  max-height: 75vh;
  thead tr th {
    position: sticky;
    z-index: 3;
  }

  thead tr:first-child th {
    top: 0;
  }

  thead tr:last-child th {
    top: 28px;
  }

  tr.selected td {
    background-color: #2d00e2 !important;
    color: #fff;
  }
}
</style>
