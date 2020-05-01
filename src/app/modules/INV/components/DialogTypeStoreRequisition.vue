<template>
  <div>
    <div>
      <q-dialog v-model="dialog">
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
            <q-btn @click="close" label="cencel" />
            <q-btn @click="select" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="dialogTransfer">
        <q-card style="width: 500px;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium"
              >Type Of Store Requisition</q-toolbar-title
            >
          </q-toolbar>
          <q-card-section>
            <h1>Transfer To Other Storage</h1>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="close" label="cencel" />
            <q-btn @click="select1" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
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
  pagination: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dialogTransfer: { type: Boolean, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      group: null,
      options: [
        { label: 'Transfer To Other Storage', value: '1' },
        { label: 'Outgoing / Consumed', value: '2', color: 'bat' },
      ],
      group: '',
      pagination: {
        rowsPerPage: 0,
      },
    });

    function select() {
      emit('select', false, state.group);
    }
    function close() {
      emit('close', false);
    }
    function select1() {
      emit('select1', false);
    }

    return {
      select1,
      select,
      close,
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
