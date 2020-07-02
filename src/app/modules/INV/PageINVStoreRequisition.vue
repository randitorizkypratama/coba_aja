<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <searchIncoming :searches="searches" :dialogTransfer="dialogTransfer" @onSearch="onSearch" />
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
      <dialogTypeStoreRequisition
        :dialogTransfer="dialogTransfer"
        :disableToStore="disableToStore"
        :disableAccount="disableAccount"
        :dialog="dialog"
        :searches="searches"
        @select="select"
        @close="close"
        @select1="select1"
      />
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="primary" text-color="white" />
            <span class="q-ml-sm">Are you sure delete the stock article {{1101002}} - Avocado ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
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
  mapArticel,
  mapGroup
} from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/storeRequisition';
import { Notify } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      disableToStore: true,
      disableAccount: true,
      isFetching: false,
      searches: {
        departments: [],
        articelNumber: []
      },
      dialog: false,
      dialogTransfer: false,
      transfer: null,
      data: [],
      trueAndFalse: false,
      confirm: false,
      rowClick: '',
      fromDept: '',
      toDept: '',
    });

    onMounted(async () => {
      const [data, data2] = await Promise.all([
        $api.inventory.apiStoreRequisition('storeRequestPrepare', {
          userInit: '01'
        }),
        $api.inventory.apiStoreRequisition('storeReqPrepare')
      ]);
        state.searches.departments = mapGroup(
          data.tParameters['t-parameters'],
        'vstring',
        'varname'
      );
      state.searches.articelNumber = data.tempLArtikel['temp-l-artikel']
      console.log('hadfina', data)
    });

    const getData = async (val) => {
      const GET_DATA = await Promise.all([
        $api.inventory.apiStoreRequisition('storeReqCreateList', {
          fromDate: '01/14/17',
          toDate: '01/14/19',
          fromDept: val.fromDept.value,
          toDept: val.toDept.value,
          currLschein: val.ReqNumber,
          showPrice: true,
        }),
      ]);
      state.data = GET_DATA[0].tList['t-list'];
      console.log('sukses3', GET_DATA)
      if (GET_DATA[0].itExist == 'true') {
        state.isFetching = false;
      }
    };

    const onSearch = (val) => {
      state.isFetching = true;
      state.fromDept = val.fromDept.value;
      state.toDept = val.toDept.value;
      getData(val);
    };
    const select = (val, group) => {
      if (group == '1') {
        state.dialogTransfer = true;
        state.disableToStore = false;
      }
      if (group == '2') {
        state.dialogTransfer = true;
        state.disableAccount = false;
      }
      state.dialog = val;
    };
    const close = (val) => {
      state.disableAccount = true;
      state.disableToStore = true;
      state.dialogTransfer = val;
      state.dialog = val;
    };

    function select1() {
      state.disableAccount = true;
      state.disableToStore = true;
      state.dialogTransfer = false;
    }

    function onRowClick(e, rowClick) {
      state.rowClick = rowClick;
    }

    const asyncCall = async () => {
      const GET_DATA = await Promise.all([
        $api.inventory.apiStoreRequisition('storeReqDelete', {
          tListSrecid: state.rowClick['s-recid'],
          bedienerNr: '01',
          fromDate: '01/14/19',
          toDate: '01/14/19',
          fromDept: state.fromDept,
          toDept: state.toDept,
          currLschein: ' ',
          showPrice: 'yes',
        }),
      ]);

      console.log('sukses', GET_DATA);
    };
    function deleteData() {
      asyncCall();
    }
    return {
      ...toRefs(state),
      tableHeaders,
      onRowClick,
      deleteData,
      select1,
      onSearch,
      close,
      select,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    searchIncoming: () => import('./components/SearchStoreRequisition.vue'),
    dialogTypeStoreRequisition: () =>
      import('./components/DialogTypeStoreRequisition.vue'),
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
