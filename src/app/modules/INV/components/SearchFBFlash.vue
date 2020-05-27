<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <v-date-picker v-model="fromdate" :columns="2" :popover="{ visibility: 'click' }">
        <SInput
          label-text="From Date"
          slot-scope="{ inputProps }"
          placeholder="Date"
          readonly
          v-bind="inputProps"
          clearable
          @clear="date = null"
        />
      </v-date-picker>

      <v-date-picker v-model="todate" :columns="2" :popover="{ visibility: 'click' }">
        <SInput
          label-text="To Date"
          slot-scope="{ inputProps }"
          placeholder="Date"
          readonly
          v-bind="inputProps"
          clearable
          @clear="date = null"
        />
      </v-date-picker>

      <SSelect label-text="Main Group" :options="searches.departments" v-model="departments" />
      <q-checkbox v-model="cost" label="Cost Incl. Beginning Onhand" />

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
      fromdate: ref(null),
      todate: ref(null),
      departments: ref(null),
      cost: ref(false),
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
