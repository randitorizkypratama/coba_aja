<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchInterKitchenTransfer :searches="searches" @onSearch="onSearch" />
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
import { mapInterkitchen } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      fromDate: '',
      toDate: '',
      fromDept: '',
      toDept: '',
      depname1: '',
      depname2: '',
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([
        $api.inventory.getInterKitchenTransferprepare(),
      ]);
      // console.log(resDepart);

      state.fromDate = resDepart.fromDate;
      state.toDate = resDepart.toDate;
      state.fromDept = resDepart.fromDept;
      state.toDept = resDepart.toDept;
      state.depname1 = resDepart.depname1;
      state.depname2 = resDepart.depname1;
      state.searches.departments = mapInterkitchen(
        resDepart.tHoteldpt['t-hoteldpt'],
        'num'
      );

      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: 'Date',
        field: 'datum',
        name: 'datum',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Transfer From',
        field: 'dept1',
        name: 'dept1',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Transfer To',
        field: 'dept2',
        name: 'dept2',
        sortable: false,
      },
      {
        label: 'From Storage',
        field: '',
        name: '',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Food-Cost',
        field: 'f-cost',
        name: 'f-cost',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Beverage-Cost',
        field: 'b-cost',
        name: 'b-cost',
        align: 'right',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
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

        charts = response[0] || [];

        state.data = charts;
      }
      asyncCall();
    };

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
    SearchInterKitchenTransfer: () =>
      import('./components/SearchInterKitchenTransfer.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
