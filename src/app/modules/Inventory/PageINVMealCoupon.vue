<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <searchMealCoupon :searches="searches" :selected="selectedAccount" @onSearch="onSearch" />
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
        :data="[]"
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
      selectedAccount: 'Select a row',
      accounts: [],
      accountId: null,
      searches: {
        mains: [],
        categories: [],
        departments: [],
      },
      dialog: false,
    });

    onMounted(async () => {
      const [resDepart] = await Promise.all([$api.mealCoupon.getINVprepare()]);
      state.searches.departments = mapWithMeal(resDepart, 'num');
      state.isFetching = false;
    });

    const tableHeaders = [
      {
        label: 'Date',
        field: '',
        name: '',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Department',
        field: '',
        name: '',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Bill Number',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Pax',
        field: '',
        name: '',
        align: 'right',
        sortable: false,
      },
      {
        label: 'Description',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Food Amount',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Food Cost',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Beverage Amount',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Beverage Cost',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Bill Amount',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'Cost of Sales',
        field: '',
        name: '',
        sortable: false,
      },
      {
        label: 'User Id',
        field: '',
        name: '',
        sortable: false,
      },
    ];

    const onChangeSelectedAccount = (selected) => {
      state.selectedAccount = selected;
    };

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

    const onDialog = (val) => {
      state.dialog = val;
    };

    const selectAccount = (accountId) => {
      state.accountId = accountId;
      onDialog(true);
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onChangeSelectedAccount,
      onSearch,
      onDialog,
      selectAccount,
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
