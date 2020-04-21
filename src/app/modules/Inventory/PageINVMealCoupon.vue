<template>
  <div>
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
        :data="accounts"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
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
import { mapWithMeal } from '~/app/helpers/mapSelectItems.helpers';

export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: true,
      accounts: [],
      searches: {
        mains: [],
        categories: [],
        departments: [],
      },
      dialog: false,
    });

    onMounted(async () => {
      const [resChart, resDepart] = await Promise.all([
        $api.mealCoupon.getINVtable(),
        $api.mealCoupon.getINVprepare(),
      ]);
      charts = resChart || [];
      console.log($api.mealCoupon.getINVprepare(),"huhu");
      state.accounts = charts;
      state.searches.departments = mapWithMeal(resDepart, 'num');
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

    const onSearch = ({ accountNumber, main, category, department }) => {
      state.accounts = charts.filter((account: any) => {
        if (
          (accountNumber && accountNumber !== account.fibukonto) ||
          (main && main.value !== account['glmain-bezeich']) ||
          (category && category.value !== account['glfstype-bezeich']) ||
          (department && department.value !== account['gldepartment-bezeich'])
        ) {
          return false;
        }

        return true;
      });
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
