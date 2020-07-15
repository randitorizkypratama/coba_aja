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
        @row-click="onRowClick"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
      >
        <template v-slot:body-cell-artnr="props">
          <q-td
            :props="props"
            :class="props.row['op-art'] == 2 ? 'text-red' : 'text-black'"
          >{{ props.row.artnr }}</q-td>
        </template>
        <template v-slot:body-cell-bezeich="props">
          <q-td
            :props="props"
            :class="props.row['op-art'] == 2 ? 'text-red' : 'text-black'"
          >{{ props.row.bezeich }}</q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon name="mdi-dots-vertical" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="showDialog(props.row)">
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
        >
      </q-table>

      <DialogStockItemTransfer :dialog="dialog" @onDialog="onDialog" :dataSelected="dataSelected" />
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
import { date, Notify, Cookies } from 'quasar';
import { tableHeaders } from './tables/stockItemTransform.table';
import { stat } from 'fs';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      dataSelected: {},
      zugriff: '',
      messStr: '',
      flogical: '',
      fdate: '',
      fchar: '',
      fint: '',
      fdec: '',
      dialog: false,
    });

    onMounted(async () => {
      const [resPrepare, resParam] = await Promise.all([
        $api.inventory.getStockItemTransformpermission({
          userInit: '01',
          arrayNr: '41',
          expectedNr: '2',
        }),
        $api.inventory.getStockItemTransformgetHTParam0({
          casetype: '2',
          inpParam: '1035',
        }),
      ]);

      state.zugriff = resPrepare.zugriff;
      state.messStr = resPrepare.messStr;
      state.flogical = resParam.flogical;
      state.fdate = date.formatDate(resParam.fdate, 'DD/MM/YYYY');
      state.fchar = resParam.fchar;
      state.fint = resParam.fint;
      state.fdec = resParam.fdec;
      //Sorry, no access right

      state.isFetching = false;
    });

    const onDialog = (val) => {
      state.dialog = val;
    };

    const onRowClick = (_, dataRow) => {
      state.dataSelected = dataRow;
    };

    const showDialog = (dataRow) => {
      if (dataRow.datum <= state.fdate) {
        Notify.create({
          message: 'Inventory transferred to G/L - Cancel no longer possible.',
          color: 'red',
        });
      } else {
        state.dataSelected = dataRow;
        onDialog(true);
      }
    };

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
        state.data = [];

        for (let i = 0; i < charts.length; i++) {
          const dataRow = {};
          const dataItem = charts[i];

          dataRow['datum'] =
            dataItem['datum'] == null || undefined || ''
              ? ' '
              : date.formatDate(dataItem['datum'], 'DD/MM/YYYY');
          dataRow['lscheinnr'] = dataItem['lscheinnr'];
          dataRow['f-bezeich'] = dataItem['f-bezeich'];
          dataRow['t-bezeich'] = dataItem['t-bezeich'];
          dataRow['artnr'] = dataItem['artnr'];
          dataRow['bezeich'] = dataItem['bezeich'];
          dataRow['einheit'] = dataItem['einheit'];
          dataRow['content'] = dataItem['content'];
          dataRow['price'] = dataItem['price'];
          dataRow['qty'] = dataItem['qty'];
          dataRow['val'] = dataItem['val'];
          dataRow['ID'] = dataItem['ID'];

          state.data.push(dataRow);
        }
      }
      asyncCall();
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      onRowClick,
      onDialog,
      showDialog,
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },
  components: {
    SearchStockItemTransform: () =>
      import('./components/SearchStockItemTransform.vue'),
    DialogStockItemTransfer: () =>
      import('./components/DialogStockItemTransfer.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
