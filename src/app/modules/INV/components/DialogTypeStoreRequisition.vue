<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 500px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium"
          >Type Of Store Requisition</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section>
        <div class="actualQuantity">
          Actual Quantity
        </div>
        <div class="q-pa-md">
          <q-option-group
            size="xs"
            :options="options"
            label="Notifications"
            type="radio"
            v-model="group"
          />
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="cencel" v-close-popup />
        <q-btn color="primary" label="Select" v-close-popup />
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
      group: null,
      options: [
        { label: 'Transfer To Other Storage', value: 'bat' },
        { label: 'Outgoing / Consumed', value: 'friend', color: 'bat' },
      ],
      pagination: {
        rowsPerPage: 0,
      },
      data: [],
      dialogModel: true,
    });

    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    onMounted(async () => {
      const dataAccount = await Promise.all([
        $api.stockItem.getPrepareSelectGLAcct({
          currDept: '0',
        }),
      ]);
      state.data = dataAccount[0];
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
.actualQuantity {
  margin-left: 28px;
}
</style>
