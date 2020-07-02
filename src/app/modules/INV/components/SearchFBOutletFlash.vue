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

      <SSelect
        label-text="From Store Number"
        :options="searches.store"
        v-model="fromstore"
      />

      <SSelect
        label-text="To Store Number"
        :options="searches.store"
        v-model="tostore"
      />

      <SSelect
        label-text="Main Group"
        :options="searches.departments"
        v-model="departments"
      />

      <q-btn
        dense
        color="primary"
        icon="mdi-magnify"
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
      date: ref(null),
      fromstore: ref(null),
      tostore: ref(null),
      departments: ref(null),
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
