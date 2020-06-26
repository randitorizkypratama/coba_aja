<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <v-date-picker
        mode="range"
        v-model="searches.date"
        :columns="2"
        :popover="{ visibility: 'click' }"
      >
        <SInput
          label-text="Date"
          slot-scope="{ inputProps }"
          placeholder="From - Until"
          readonly
          v-bind="inputProps"
          clearable
          @clear="searches.date = null"
        />
      </v-date-picker>

      <SSelect
        label-text="Main Group"
        :options="searches.departments"
        v-model="searches.fromDeptVal"
        @input="onChange($options, true)"
      />

      <q-checkbox v-model="searches.summary" label="Summary Expenses by Main Acct" />

      <q-btn
        dense
        color="primary"
        icon="search"
        label="Search"
        class="q-mt-md full-width"
        @click="onSearch"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api';
import { DatePicker } from 'v-calendar';
import { date } from 'quasar';

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },

  setup(props, { emit }) {
    // const state = reactive({
    //   searchesdate: null,
    //   main: ref(null),
    //   summary: false,
    // });

    const onSearch = () => {
      emit('onSearch', { ...props.searches });
    };

    const onChange = (input) => {
      const searchesValue = input.propsData.searches;
      console.log(input.propsData.searches, 'input');
      const main = searchesValue.fromDeptVal.value;
      const summary = searchesValue.summary;
    };

    return {
      ...toRefs,
      onSearch,
      onChange,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>

<style lang="scss" scoped></style>
