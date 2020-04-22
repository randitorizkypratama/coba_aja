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
        :data="data"
        separator="cell"
        :rows-per-page-options="[10, 13, 16]"
        :pagination.sync="pagination"
        @row-click="onRowClick"
      >
        <template #header-cell-fibukonto="props">
          <q-th :props="props" class="fixed-col left">
            {{
            props.col.label
            }}
          </q-th>
        </template>

        <template #body-cell-fibukonto="props">
          <q-td :props="props" class="fixed-col left">
            {{
            props.row.fibukonto
            }}
          </q-td>
        </template>

        <template #header-cell-actions="props">
          <q-th :props="props" class="fixed-col right">
            {{
            props.col.label
            }}
          </q-th>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon name="more_vert" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="selectAccount(props.row.fibukonto)">
                    <q-item-section>edit</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </q-table>
    </div>
    <DialogChartOfAccounts :dialog="dialog" @onDialog="onDialog" />
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
      data: [],
      dialog: false,
    });
    const tableHeaders = [
      {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: true,
      },
      {
        label: 'Unit',
        field: 'masseinheit',
        name: 'masseinheit',
        sortable: true,
      },
      {
        label: 'Content',
        field: 'inhalt',
        name: 'inhalt',
        align: 'right',
        sortable: true,
      },
      {
        label: 'Unit',
        field: 'traubensorte',
        name: 'traubensorte',
        sortable: true,
      },
      {
        label: 'Content',
        field: 'lief-einheit',
        name: 'lief-einheit',
        sortable: true,
      },
      {
        label: 'Minumum Stock (Mess)',
        field: 'min-bestand',
        name: 'min-bestand',
        sortable: true,
      },
      {
        label: 'Actual',
        field: 'ek-aktuell',
        name: 'ek-aktuell',
        sortable: true,
      },
      {
        label: 'Last',
        field: 'ek-letzter',
        name: 'ek-letzter',
        sortable: true,
      },
      {
        label: 'Average',
        field: 'vk-preis',
        name: 'vk-preis',
        sortable: true,
      },
      {
        label: 'Purchase Frequency',
        field: 'fibukonto',
        name: 'fibukonto',
        sortable: true,
      },
      { name: 'actions', field: 'actions' },
    ];

    const onSearch = ({ shape, articleNumber }) => {
      if (articleNumber == undefined) {
        if (shape == undefined) {
          console.log('error button');
        } else {
          async function asyncCall() {
            const resArtcl = await Promise.all([
              $api.stockItem.getInvArticleList('getInvArticleList', {
                sorttype: shape,
                lastArt: '*',
                lastArt1: '',
              }),
            ]);
            charts = resArtcl[0] || [];
            state.data = charts;
          }
          asyncCall();
        }
      } else {
        state.data = charts.filter((account: any) => {
          if (articleNumber && articleNumber !== account.artnr.toString()) {
            return false;
          }
          return true;
        });
      }
    };

    const onDialog = (val) => {
      state.dialog = val;
    };

    return {
      ...toRefs(state),
      tableHeaders,
      onSearch,
      onDialog,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () =>
      import('./components/SearchChartStockItem.vue'),
    DialogChartOfAccounts: () => import('./components/ModalNewStockItem.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
</style>
