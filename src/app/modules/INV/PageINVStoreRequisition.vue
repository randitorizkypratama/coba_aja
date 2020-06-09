<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
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

      <q-table
        dense
        :class="{mystickyvirtscrolltable : trueAndFalse}"
        :columns="tableHeaders"
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :virtual-scroll-sticky-size-start="48"
        :pagination.sync="pagination"
        hide-bottom
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
            <q-icon name="more_vert" size="16px">
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
      </q-table>
      <dialogTypeStoreRequisition
        :dialogTransfer="dialogTransfer"
        :disableToStore="disableToStore"
        :disableAccount="disableAccount"
        :dialog="dialog"
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
  mapWithadjustmain,
  mapWithadjuststore,
} from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/storeRequisition';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      disableToStore: true,
      disableAccount: true,
      isFetching: true,
      searches: {
        departments: [],
        store: [],
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
      const data = await Promise.all([$api.inventory.storeReqPrepare()]);
      state.searches.departments = mapGroup(
        data[0].tLUntergrup['t-l-untergrup'],
        'bezeich',
        'zwkum'
      );
    });

    const onSearch = (val) => {
      state.fromDept = val.fromDept.value;
      state.toDept = val.toDept.value;
      async function getData() {
        const GET_DATA = await Promise.all([
          $api.inventory.storeReqCreateList({
            fromDate: '01/14/19',
            toDate: '01/14/19',
            fromDept: val.fromDept.value,
            toDept: val.toDept.value,
            currLschein: val.ReqNumber,
            showPrice: 'yes',
          }),
        ]);
        console.log('sukses1', GET_DATA);

        state.data = GET_DATA[0].tList['t-list'];
        if (GET_DATA[0].itExist == 'true') {
          state.trueAndFalse = true;
        }
      }
      getData();
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

    function deleteData() {
      console.log('sukses2', state.rowClick['s-recid']);
      async function asyncCall() {
        $api.inventory.storeReqDelete({
          tListSrecid: state.rowClick['s-recid'],
          bedienerNr: '01',
          fromDate: '01/14/19',
          toDate: '01/14/19',
          fromDept: state.fromDept,
          toDept: state.toDept,
          currLschein: ' ',
          showPrice: 'yes',
        });
      }
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
        // rowsNumber: state.GET_DATA.length,
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
.mystickyvirtscrolltable {
  height: 410px;
}

.my-sticky-virtscroll-table .q-table__top .q-table__bottom {
}

.my-sticky-virtscroll-table thead tr:first-child th {
  background-color: #fff;
}

.my-sticky-virtscroll-table thead tr th {
  position: sticky;
  // z-index: 1
}
.my-sticky-virtscroll-table thead tr:last-child th {
  top: 48px;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  top: 0;
}
</style>
