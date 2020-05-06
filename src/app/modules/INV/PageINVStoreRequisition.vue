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
        :class="{mystickyvirtscrolltable : trueAndFalse}"
        :columns="tableHeaders"
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :virtual-scroll-sticky-size-start="48"
        :pagination.sync="pagination"
        hide-bottom
        @row-click="onRowClick"
      />
      <dialogTypeStoreRequisition
        :dialogTransfer="dialogTransfer"
        :disableToStore="disableToStore"
        :disableAccount="disableAccount"
        :dialog="dialog"
        @select="select"
        @close="close"
        @select1="select1"
      />
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
      async function getData() {
        const GET_DATA = await Promise.all([
          $api.inventory.storeReqCreateList({
            fromDate: '01/14/19',
            toDate: '01/14/19',
            fromDept: val.fromDept.value,
            toDept: val.toDept.value,
            currLschein: ' ',
            showPrice: 'yes',
          }),
        ]);
        state.data = GET_DATA[0].tList['t-list'];
        if (GET_DATA[0].tList['t-list'] !== undefined) {
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
    return {
      ...toRefs(state),
      tableHeaders,
      select1,
      onSearch,
      close,
      select,
      pagination: {
        rowsPerPage: 10,
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
