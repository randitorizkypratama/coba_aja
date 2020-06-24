<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <v-date-picker v-model="date" :columns="2" :popover="{ visibility: 'click' }">
        <SInput
          label-text="Date"
          slot-scope="{ inputProps }"
          placeholder="Date"
          readonly
          v-bind="inputProps"
          clearable
          @clear="date = null"
        />
      </v-date-picker>

      <SSelect label-text="Main Group" :options="searches.departments" v-model="main" />

      <q-checkbox v-model="summary" label="Summary Expenses by Main Acct" />

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

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },

  setup(_, { emit }) {
    const state = reactive({
      date: null,
      main: ref(null),
      summary: false,
    });

    const onSearch = () => {
      emit('onSearch', { ...state });
    };

    return {
      ...toRefs(state),
      onSearch,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>

<style lang="scss" scoped></style>
