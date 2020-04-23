<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 1100px; max-width: 90vw;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">New</q-toolbar-title>
      </q-toolbar>
      <q-card-section style="height: 400px">
        <template>
          <SInput
            style="width: 500px; marginLeft: 210px"
            label-text="Name"
            v-model="articleNumber"
            mask="##-##-####"
            unmasked-value
          />
        </template>
        <q-splitter v-model="splitterModel" style="height: 250px; width: 900px">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical active-color="primary" indicator-color="primary">
              <q-tab name="category" label="Category" />
              <q-tab name="UnitPrice" label="Unit & Price" />
              <q-tab name="Additional" label="Additional Info" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="category">
                <SSelect
                  label-text="Main Group"
                  :options="options"
                  v-model="main"
                  style="width: 200px"
                />
                <SSelect
                  label-text="Sub Group"
                  :options="options"
                  v-model="main"
                  style="width: 200px"
                />
                <div class="articel-number flex q-mt-md">
                  <span>Total Budget</span>
                  <span>{{ totalBudget }}</span>
                </div>
              </q-tab-panel>

              <q-tab-panel name="UnitPrice">
                <div class="text-h4 q-mb-md">Alarms</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>

              <q-tab-panel name="Additional">
                <div class="text-h4 q-mb-md">Movies</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="cencel" v-close-popup />
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from '@vue/composition-api';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';
interface State {
  isLoading: boolean;
  totalBudget: number;
  columns: { month: string; actual: string; budget: string }[];
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
      splitterModel: 20,
      totalBudget: 0,
      columns: [],
      tab: 'mails',
    });
    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    return {
      dialogModel,
      ...toRefs(state),
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

.articel-number {
  border-radius: 4px;
  border: 1px solid $primary;

  span {
    display: inline-block;
    padding: 4px 11px;

    &:first-child {
      border-right: 1px solid $primary;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
