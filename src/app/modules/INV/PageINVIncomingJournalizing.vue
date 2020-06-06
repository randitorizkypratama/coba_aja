<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchIncoming :searches="searches" :dialogTransfer="dialogTransfer" @onSearch="onSearch" />
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
import { tableHeaders } from './tables/IncomingJournalizing';
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

    const getData = async () => {
      const GET_DATA = await Promise.all([
        $api.inventory.glLinkstockBtnGo({
          pvILanguage: 0,
          linkOut: true,
          linkIn: true,
          fromGrp: 0,
          fromDate: '01/02/19',
          toDate: '01/02/19',
          userInit: 0,
        }),
      ]);

      state.data = GET_DATA[0].tGList['t-g-list'];
      if (GET_DATA[0].outputOkFlag == 'true') {
        state.trueAndFalse = true;
      }
    };

    const onSearch = (val) => {
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
    searchIncoming: () => import('./components/SearchIncomingJournalizing.vue'),
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
