<template>
  <q-table
    :dense="true"
    separator="cell"
    row-key="lief-nr"
    :loading="isFetching"
    :columns="tableHeaders"
    :data="supplierList"
    :virtual-scroll="true"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    :virtual-scroll-sticky-size-start="28"
    :class="supplierList.length > 0 && 'supplier-list-table'"
    :selected.sync="selected"
    @row-click="onRowClick"
  >
    <template #header-cell-firma="props">
      <q-th :props="props" class="fixed-col left"> {{ props.col.label }}</q-th>
    </template>

    <template #body-cell-firma="props">
      <q-td :props="props" class="fixed-col left">
        {{ props.row.firma }}
      </q-td>
    </template>

    <template #body-cell-phone-1="props">
      <q-td :props="props" :set="(phone1 = props.row.telefon.substring(0, 22))">
        <div class="ellipsis phone-column">{{ phone1 }}</div>
        <q-tooltip
          anchor="top middle"
          self="center middle"
          v-if="phone1.trim().length > 0"
          >{{ phone1 }}</q-tooltip
        >
      </q-td>
    </template>

    <template #body-cell-phone-2="props">
      <q-td
        :props="props"
        :set="(phone2 = props.row.telefon.substring(23, 75))"
      >
        <div class="ellipsis phone-column">{{ phone2 }}</div>
        <q-tooltip
          anchor="top middle"
          self="center middle"
          v-if="phone2.trim().length > 0"
          >{{ phone2 }}</q-tooltip
        >
      </q-td>
    </template>

    <template #body-cell-address="props">
      <q-td
        :props="props"
        :set="(address = `${props.row.adresse1} ${props.row.adresse2} ${props.row.adresse3}`)"
      >
        <div class="ellipsis address-column">{{ address }}</div>
        <q-tooltip
          anchor="top middle"
          self="center middle"
          v-if="address.trim().length > 0"
          >{{ address }}</q-tooltip
        >
      </q-td>
    </template>

    <template #header-cell-actions="props">
      <q-th :props="props" class="fixed-col right">
        {{ props.col.label }}
      </q-th>
    </template>

    <template #body-cell-actions="props">
      <q-td :props="props" class="fixed-col right">
        <q-icon name="mdi-dots-vertical" size="16px">
          <q-menu auto-close anchor="bottom right" self="top right">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section>Purchase Order</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>Delete</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>Turnover</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { tableHeaders } from '../tables/supplier-list.table';
import { ResSupplierList } from '../models/supplier-list.model';

export default defineComponent({
  props: {
    isFetching: { type: Boolean, required: true },
    supplierList: { type: Array, required: true },
  },
  setup(_, { emit }) {
    const pagination = { rowsPerPage: 0 };
    const selected = ref<ResSupplierList[]>([]);

    function onRowClick(_, row: ResSupplierList) {
      selected.value = [row];
      emit('onRowClick', row.notizen[0]);
    }

    return {
      pagination,
      tableHeaders,
      onRowClick,
      selected,
    };
  },
});
</script>

<style lang="scss">
.supplier-list-table {
  height: 80vh;

  // Start Sticky header
  thead tr th {
    position: sticky;
    z-index: 1;

    &.fixed-col {
      z-index: 3;
    }
  }

  thead tr:last-child th {
    top: 28px;
  }
  thead tr:first-child th {
    top: 0;
  }
  // End Sticky header

  tbody tr.selected td {
    background: #2d00e2 !important;
    color: #fff;
  }

  .phone-column {
    width: 150px;
  }

  .address-column {
    width: 350px;
  }
}
</style>
