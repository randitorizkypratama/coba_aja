<template>
  <div id="app">
    <div v-if="zugriff === 'false'">{{messStr}}</div>
    <div v-else>
      <q-drawer :value="true" side="left" bordered :width="250" persistent>
        <searchMealCoupon :searches="searches" @onSearch="onSearch" />
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { mapWithMeal } from '~/app/helpers/mapSelectItems.helpers';
import { date } from 'quasar';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      data: [],
      billdate: '',
      exchgRate: '',
      foreignNr: '',
      zugriff: '',
      messStr: '',
      doubleCurrency: '',
      searches: {
        departments: [],
      },
    });

    onMounted(async () => {
      const [resZugriff, resDepart] = await Promise.all([
        $api.inventory.getMealCouponzugriff(),
        $api.inventory.getMealCouponprepare(),
      ]);
      // console.log(resZugriff, 'huhu');

      state.zugriff = resZugriff.zugriff;
      state.messStr = resZugriff.messStr;
      state.billdate = resDepart.billdate;
      state.exchgRate = resDepart.exchgRate;
      state.foreignNr = resDepart.foreignNr;
      state.doubleCurrency = resDepart.doubleCurrency;
      state.searches.departments = mapWithMeal(
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
        align: 'right',
        sortable: false,
      },
      {
        label: 'Department',
        field: 'deptname',
        name: 'deptname',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Bill Number',
        field: 'rechnr',
        name: 'rechnr',
        sortable: false,
      },
      {
        label: 'Pax',
        field: 'pax',
        name: 'pax',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        sortable: false,
      },
      {
        label: 'Food Amount',
        field: 'f-betrag',
        name: 'f-betrag',
        sortable: false,
      },
      {
        label: 'Food Cost',
        field: 'f-cost',
        name: 'f-cost',
        sortable: false,
      },
      {
        label: 'Beverage Amount',
        field: 'b-betrag',
        name: 'b-betrag',
        sortable: false,
      },
      {
        label: 'Beverage Cost',
        field: 'b-cost',
        name: 'b-cost',
        sortable: false,
      },
      {
        label: 'Bill Amount',
        field: 'betrag',
        name: 'betrag',
        sortable: false,
      },
      {
        label: 'Cost of Sales',
        field: 't-cost',
        name: 't-cost',
        sortable: false,
      },
      {
        label: 'User Id',
        field: 'usr-id',
        name: 'usr-id',
        sortable: false,
      },
    ];
    const onSearch = (state2) => {
      async function asyncCall() {
        const response = await Promise.all([
          $api.inventory.getMealCoupontable({
            doubleCurrency: state2.doubleCurrency,
            foreignNr: state2.foreignNr,
            exchgRate: state2.exchgRate,
            billdate: state2.billdate,
            fromDept: state2.fromdepartment.value,
            toDept: state2.todepartment.value,
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
    searchMealCoupon: () => import('./components/SearchMealCoupon.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
