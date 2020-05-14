<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchChartOfAccounts @onSearch="onSearch" />
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
        :class="{ mystickyvirtscrolltable : page }"
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
    <DialogChartOfAccounts
      :dialog="dialog"
      @saveData="saveData"
      @cencel="dialog = false"
      :selected="prepare"
    />
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
import { tableHeaders } from './tables/recipe';
import { log } from 'util';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;
    const state = reactive({
      dialog: false,
      confirm: false,
      prepare: '',
      data: [],
      page: false,
    });
    onMounted(async () => {
      const data1 = await Promise.all([$api.inventory.recipeListPrepare()]);
      state.data = data1[0].tHRezept['t-h-rezept'].map((item, i) =>
        Object.assign({}, item, data1[0].costList['cost-list'][i])
      );
      if (state.data !== undefined) {
        state.page = true;
      }
    });
    const saveData = () => {
      state.dialog = false;
    };

    const onSearch = (val, input) => {
      async function asyncCall() {
        const data1 = await Promise.all([$api.inventory.recipeListPrepare()]);
        const data = data1[0].tHRezept['t-h-rezept'].map((item, i) =>
          Object.assign({}, item, data1[0].costList['cost-list'][i])
        );

        // state.data = data2.map((item) => ({
        //   artnrrezept: item.artnrrezept,
        //   betriebsnr: item.betriebsnr,
        //   bezeich1: item.bezeich.substring(0, 25),
        //   bezeich2: item.bezeich.substring(25),
        // }));

        // console.log('sukses123', data);
        // console.log('sukses1234', data2);

        if (val == '1') {
          state.data = data.filter((data: any) => {
            return data.artnrrezept.toString().includes(input.toString());
          });
          if (state.data.length < 14) {
            state.page = false;
          }
          if (state.data.length > 14) {
            state.page = true;
          }
        }
        if (val == '2') {
          state.data = data.filter((data: any) => {
            return data.bezeich.toLowerCase().includes(input.toLowerCase());
          });
          if (state.data.length < 14) {
            state.page = false;
          }
          if (state.data.length > 14) {
            state.page = true;
          }
        }
        if (val == '3') {
          state.data = data.filter((data: any) => {
            return data.kategorie.toString().includes(input.toString())
          })
           if (state.data.length < 14) {
            state.page = false;
          }
          if (state.data.length > 14) {
            state.page = true;
          }
        }
      }
      asyncCall();
    };
    return {
      ...toRefs(state),
      onSearch,
      saveData,
      tableHeaders,
      pagination: {
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
