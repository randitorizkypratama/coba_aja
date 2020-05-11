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
        :class="{ mystickyvirtscrolltable: trueandfalse }"
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
    </div>
    <DialogChartOfAccounts :dialog="dialog" @onDialog="onDialog" :selected="prepare" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">
            Are you sure delete the stock article {{ 1101002 }} - Avocado
            ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
  ref,
} from '@vue/composition-api';
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/recipe';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;
    const state = reactive({
      data: [],
      dialog: false,
      confirm: false,
      prepare: '',
      trueandfalse: false,
    });
    const onSearch = ({ shape, articleNumber }) => {
      if (articleNumber == undefined) {
        if (shape == undefined) {
          console.log('error button');
        } else {
          async function asyncCall() {
            const resArtcl = await Promise.all([
              $api.stockItem.getInvArticleList({
                sorttype: shape,
                lastArt: '*',
                lastArt1: '',
              }),
            ]);
            charts = resArtcl[0] || [];
            state.data = charts;
            state.trueandfalse = true;
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

    function deleteData() {
      async function asyncCall() {
        await Promise.all([
          $api.stockItem.delInvArticle({
            pvILanguage: 1,
            artnr: '1101001',
          }),
        ]);
      }
      asyncCall();
    }

    function editItem() {
      state.dialog = true;
      state.prepare = 'tes';
      // console.log('sukses12345', state.prepare);
      async function asyncCall() {
        const editItem = await Promise.all([
          $api.stockItem.chgInvArticlePrepare({
            artnr: 1101001,
            changed: 'no',
          }),
        ]);
        // console.log('sukses12345', editItem);
      }
      asyncCall();
    }
    return {
      ...toRefs(state),
      editItem,
      tableHeaders,
      deleteData,
      onSearch,
      onDialog,
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () => import('./components/SearchRecipe.vue'),
    DialogChartOfAccounts: () => import('./components/DialogRecipe.vue'),
  },
});
</script>

<style lang="scss" scoped>
h1 {
  background: $primary-grad;
}
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
