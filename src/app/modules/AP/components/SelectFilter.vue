<template>
  <SSelect
    emit-value
    map-options
    :options-sanitize="true"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :label-text="labelText"
    :options="state.options"
    :option-value="optionValue"
    :option-label="optionLabel"
    @filter="filter"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </SSelect>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api';

export default defineComponent({
  props: {
    labelText: { type: String, default: null },
    options: { required: true, type: Array },
    optionValue: { required: true, type: String },
    optionLabel: { required: true, type: String },
  },
  setup(props) {
    const optionData = computed(() => props.options); // Store all of options data here to process later with state

    const state = reactive({
      options: optionData.value,
    });

    function filter(val: string, update: Function) {
      update(() => {
        const keyword = val.toLowerCase();
        state.options = optionData.value.filter((v: any) =>
          v[props.optionLabel].toLowerCase().includes(keyword)
        );
      });
    }

    return {
      state,
      filter,
    };
  },
});
</script>
