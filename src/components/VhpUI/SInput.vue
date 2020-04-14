<template>
  <div>
    <label class="inline-block q-mb-xs">
      {{ labelText }}
    </label>
    <q-input
      dense
      outlined
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @change="onChange"
      class="q-mb-md"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: { required: false },
    labelText: { type: String, default: null },
  },
  setup(_, { emit }) {
    const onChange = (event) => {
      emit('input', event.target.value);
    };

    return {
      onChange,
    };
  },
});
</script>
