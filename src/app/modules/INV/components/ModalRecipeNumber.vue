<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 500px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">Title Recipe</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-table
          dense
          class="my-sticky-virtscroll-table"
          :columns="tableHeaders"
          :data="columns"
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
        <q-btn flat label="cencel" v-close-popup />
        <q-btn color="primary" label="OK" @click="$emit('onDialog', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';

interface State {
  columns: { number: number; description: string; category: string }[];
  selected: string;
}

export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    accountId: { type: String, default: null },
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      columns: [],
      selected: '',
    });

    onMounted(async () => {
      const dataRecipe = await Promise.all([
        $api.stockItem.getInvRecipe({
          caseType: 2,
          int1: '',
          int2: '',
          int3: '',
          char1: '',
          date1: '',
        }),
      ]);
      state.columns = dataRecipe[0];
    });
    function onRowClick(a, row) {
      emit('onRowRecipe', row);
    }
    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    const tableHeaders = [
      {
        name: 'index',
        label: '',
        field: 'artnrrezept',
        align: 'left',
      },
      {
        label: 'Description',
        field: 'bezeich',
      },
      {
        label: 'Category',
        field: 'kategorie',
      },
    ];

    return {
      dialogModel,
      onRowClick,
      ...toRefs(state),
      tableHeaders,
      pagination: { page: 1, rowsPerPage: 0 },
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
