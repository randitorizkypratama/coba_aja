<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <q-form @submit="onSearch">
        <SInput label-text="Description" v-model="inputan" unmasked-value />
        <q-option-group size="xs" v-model="group" :options="options" color="primary" />
        <q-btn
          block
          color="primary"
          max-height="28"
          icon="search"
          label="Search"
          type="submit"
          class="q-mt-md full-width"
        />
      </q-form>
    </div>

    <q-separator style="border-width: 1px;" class="q-my-md" />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from '@vue/composition-api';
export default defineComponent({
  props: {},
  setup(_, { emit }) {
    const state = reactive({
      inputan: ref(null),
      group: '1',
      options: [
        {
          label: 'Recipe Number',
          value: '1',
        },
        {
          label: 'Description',
          value: '2',
        },
        {
          label: 'Category',
          value: '3',
        },
      ],
    });
    const onSearch = () => {
      emit('onSearch', state.group, state.inputan);
    };
    return {
      onSearch,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
#input {
  width: 220px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#radio {
  margin-left: -9px;
}
</style>
