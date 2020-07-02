<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 500px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">Title Account</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-table
          dense
          class="my-sticky-virtscroll-table"
          :columns="columns"
          :data="data"
          separator="cell"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          :virtual-scroll-sticky-size-start="48"
          hide-bottom
          @row-click="onRowClick"
          row-key="index"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="primary" label="OK" @click="$emit('onDialog', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  toRefs,
} from '@vue/composition-api';
interface State {
  data: {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    sodium: number;
    calcium: string;
    iron: string;
  }[];
  pagination: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      pagination: {
        rowsPerPage: 0,
      },
      data: [],
    });

    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    onMounted(async () => {
      const dataAccount = await Promise.all([
        $api.inventory.apiStockItemAR('getPrepareSelectGLAcct', {
          currDept: '0',
        }),
      ]);

      state.data = dataAccount[0][1].glacctList['glacct-list'];
    });

    const columns = [
      {
        name: 'index',
        label: 'L.AcctNo',
        field: 'fibukonto',
        align: 'left',
      },
      {
        label: 'L.Desc',
        field: 'bezeich',
      },
      {
        label: 'L.Type',
        field: 'acc-type',
      },
      {
        label: 'L.Dept',
        field: 'deptnr',
      },
      {
        label: 'L.Main',
        field: 'main-nr',
      },
    ];

    const onRowClick = (a, row) => {
      emit('onRowAccount', row);
    };

    return {
      dialogModel,
      onRowClick,
      columns,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

.my-sticky-virtscroll-table {
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