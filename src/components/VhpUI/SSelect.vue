<template>
  <div>
    <label class="inline-block q-mb-xs">
      {{ labelText }}
    </label>
    <q-select
      dense
      outlined
      clearable
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @change="onChange"
      class="q-mb-md"
    >
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

      <template
        v-for="slot in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
      >
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-select>
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
    const onChange = (newVal) => {
      emit('input', newVal);
    };

    return {
      onChange,
    };
  },
});
</script>
