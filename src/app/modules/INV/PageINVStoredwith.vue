<template>
  <div>
    <div style="marginleft: 20px; margintop: 10px;" class="q-mb-md">
      <q-btn flat round class="q-mr-lg">
        <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
      </q-btn>
      <q-btn flat round>
        <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
      </q-btn>
    </div>
    <div style="margintop: -30px;" class="row">
      <div class="col-5">
        <div class="q-pa-lg">
          <div class="row">
            <div style="marginright: 10px;" class="col">
              <SSelect
                label-text="Outlet"
                :options="searches.departments"
                v-model="fromDept"
              />
              <SSelect
                style="margintop: -5px;"
                label-text="Stored"
                :options="searches.departments"
                v-model="fromDept"
              />
              <SInput
                label-text="Order Date"
                :options="searches.store"
                v-model="ReqNumber"
                style="margintop: -5px;"
              />
            </div>
            <div style="marginleft: 10px;" class="col">
              <SSelect
                label-text="Suplier"
                :options="searches.departments"
                v-model="fromDept"
              />
              <SInput
                label-text="Transaction Number"
                :options="searches.store"
                style="margintop: -5px;"
                v-model="ReqNumber"
                disable
              />
            </div>
          </div>

          <STable
            :loading="isFetching"
            :columns="tableHeaders"
            :data="data"
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            hide-bottom
            class="table-accounting-date"
            @row-click="onRowClick"
          >
            <template #header-cell-fibukonto="props">
              <q-th :props="props" class="fixed-col left">{{
                props.col.label
              }}</q-th>
            </template>

            <template #body-cell-fibukonto="props">
              <q-td :props="props" class="fixed-col left">{{
                props.row.fibukonto
              }}</q-td>
            </template>

            <template #header-cell-actions="props">
              <q-th :props="props" class="fixed-col right">{{
                props.col.label
              }}</q-th>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props" class="fixed-col right">
                <q-icon name="mdi-dots-vertical" size="16px">
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
          </STable>
        </div>
      </div>
      <div class="col-7">
        <div class="q-pa-lg">
          <SInput
            label-text="Item Number"
            :options="searches.store"
            v-model="ReqNumber"
            disable
            style="width: 490px;"
          />
          <div>
            <div class="row">
              <SInput
                label-text="Quantity"
                :options="searches.store"
                style="width: 150px; margintop: -5px; marginright: 20px;"
                v-model="ReqNumber"
              />
              <SInput
                label-text="Unit Price"
                :options="searches.store"
                style="width: 150px; margintop: -5px; marginright: 20px;"
                v-model="ReqNumber"
                disable
              />
              <SInput
                label-text="Amount"
                :options="searches.store"
                style="width: 150px; margintop: -5px;"
                v-model="ReqNumber"
                disable
              />
            </div>
            <div class="row">
              <SInput
                label-text="Total Amount"
                :options="searches.store"
                style="width: 150px; margintop: -5px; marginright: 20px;"
                v-model="ReqNumber"
                disable
              />
              <q-btn
                color="primary"
                max-height="10"
                icon="mdi-search"
                label="Receive"
                type="submit"
                style="
                  width: 320px;
                  height: 25px;
                  margintop: 20px;
                  marginright: 20px;
                "
                @click="onSearch"
              />

              <q-btn
                outline
                color="primary"
                label="Cencel"
                style="
                  width: 90px;
                  height: 25px;
                  margintop: 20px;
                  marginright: 17px;
                "
              />

              <q-btn
                color="primary"
                label="Save"
                style="width: 90px; height: 25px; margintop: 20px;"
              />
            </div>
          </div>

          <STable
            :loading="isFetching"
            :columns="tableHeaders2"
            :data="data"
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            hide-bottom
            class="table-accounting-date"
            @row-click="onRowClick"
          >
            <template #header-cell-fibukonto="props">
              <q-th :props="props" class="fixed-col left">{{
                props.col.label
              }}</q-th>
            </template>

            <template #body-cell-fibukonto="props">
              <q-td :props="props" class="fixed-col left">{{
                props.row.fibukonto
              }}</q-td>
            </template>

            <template #header-cell-actions="props">
              <q-th :props="props" class="fixed-col right">{{
                props.col.label
              }}</q-th>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props" class="fixed-col right">
                <q-icon name="mdi-dots-vertical" size="16px">
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
          </STable>
        </div>
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

import {
  tableHeaders,
  tableHeaders2,
  dataTable,
} from './tables/StoredwithDML.table';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: false,
      data: [],
      searches: {
        departments: [],
        store: [],
      },
    });

    onMounted(() => {
      state.data = dataTable;
    });
    const onSearch = (val) => {
      console.log('sukses');
    };

    function onRowClick(e, rowClick) {
      console.log('sukses');
    }

    return {
      ...toRefs(state),
      tableHeaders,
      tableHeaders2,
      onRowClick,
      onSearch,
      close,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 50vh;
  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
  #input {
    width: 20px;
  }
}
</style>
