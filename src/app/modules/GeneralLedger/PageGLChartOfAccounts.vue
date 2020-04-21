<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
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

      <q-table
        dense
        :loading="isFetching"
        :columns="tableHeaders"
        :data="accounts"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
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
                  <q-item clickable v-ripple @click="selectAccount(props.row.fibukonto)">
                    <q-item-section>Show Account Budget</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </q-table>
    </div>

    <DialogChartOfAccounts :dialog="dialog" @onDialog="onDialog" :account-id="accountId" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';

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
      const [resChart, resMain, resTypes, resDepart] = await Promise.all([
        $api.generalLedger.getChartOfAccount(),
        $api.generalLedger.getGLMainAccount(),
        $api.generalLedger.getGLFSType(),
        $api.generalLedger.getGLDeptAccount(),
      ]);

      charts = resChart || [];
      state.accounts = charts;
      state.searches.mains = mapWithBezeich(resMain, 'code');
      state.searches.categories = mapWithBezeich(resTypes, 'nr');
      state.searches.departments = mapWithBezeich(resDepart, 'nr');
      state.isFetching = false;
      console.log(state.accounts, 'coba');
    });

    const tableHeaders = [
      {
        label: 'Account Number',
        field: 'fibukonto',
        name: 'fibukonto',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Account Name',
        field: 'glacct-bezeich',
        name: 'glacct-bezeich',
        align: 'left',
        sortable: true,
      },
      {
        label: 'Main Account',
        field: 'glmain-bezeich',
        name: 'glmain-bezeich',
        sortable: true,
      },
      {
        label: 'Account Type',
        field: 'acc-type',
        name: 'acc-type',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Account Category',
        field: 'glfstype-bezeich',
        name: 'glfstype-bezeich',
        sortable: true,
      },
      {
        label: 'Operating Dept Account',
        field: 'gldepartment-bezeich',
        name: 'gldepartment-bezeich',
        sortable: true,
      },
      {
        label: 'Last Change By',
        field: 'bemerk',
        name: 'bemerk',
        sortable: true,
      },
      { name: 'actions', field: 'actions' },
    ];

    const onRowClick = (_, { bemerk }) => {
      state.selectedAccount = bemerk;
    };

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
      console.log(state.accounts, 'coba1');
      console.log(onSearch, 'coba2');
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
      onRowClick,
      onDialog,
      selectAccount,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () =>
      import('./components/SearchChartOfAccounts.vue'),
    DialogChartOfAccounts: () =>
      import('./components/DialogChartOfAccounts.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
