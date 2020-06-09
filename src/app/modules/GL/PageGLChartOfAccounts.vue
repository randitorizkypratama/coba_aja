<template>
  <q-page>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchChartOfAccounts :searches="searches" :selected="selectedAccount" @onSearch="onSearch" />
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
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/chartOfAccounts.table';

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
    });

    const onRowClick = (_, { bemerk }) => {
      state.selectedAccount = bemerk;
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
