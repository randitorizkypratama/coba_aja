<template>
  <q-dialog v-model="dialogModel">
    <div class="dialog">
      <div class="dialog__header">
        <span class="dialog__title">Select Shift</span>
      </div>
      <q-form @submit="onSubmit">
        <div class="bg-white q-pa-lg">
          <div class="col"></div>
        </div>
        <div class="dialog__footer">
          <q-btn
            label="Cancel"
            color="primary"
            flat
            class="q-mr-sm"
            @click="$emit('onModal', false)"
          />
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  computed,
  onMounted,
} from '@vue/composition-api';
import { date } from 'quasar';

export default defineComponent({
  props: {
    muncul: { type: Boolean, required: true },
  },
  setup(props, { emit, root: { $api } }) {
    const hide = () => emit('hide');

    const dialogModel = computed({
      get: () => props.muncul,
      set: (val) => {
        emit('onModal', val);
      },
    });

    // Start fetch Country data

    // End fetch Country data

    // Start fetch Segment data

    // End fetch Segment data

    // TODO: Form still not working in react version
    // Place all form data here
    const data = reactive({
      isFetching: true,
      supplier: [],
      dataSelected: {},
      dialogPayVisible: false,
    });

    function onSubmit() {
      emit('onModal', false);
    }

    return {
      ...toRefs(data),
      hide,
      dialogModel,
      onSubmit,
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  components: {},
});
</script>
<style lang="scss" scoped>
.dialog {
  max-width: 900px !important;
  width: 100%;

  &__header {
    background: linear-gradient(#1488cc, #2b32b2);
    border-bottom: 1px solid #e8e8e8;
    color: #fff;
    padding: 16px 24px;
  }

  &__title {
    font-size: 16px;
  }

  &__form-top {
    margin-left: 164px;
  }

  &__footer {
    background: #fff;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
    padding: 10px 16px;
    text-align: right;
  }

  .q-tab-panel {
    padding: 0;
  }
}
</style>
