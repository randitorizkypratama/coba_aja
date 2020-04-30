<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <v-date-picker mode="range" v-model="date" :columns="2" :popover="{ visibility: 'click' }">
        <SInput
          label-text="Date"
          slot-scope="{ inputProps }"
          placeholder="From - Until"
          readonly
          v-bind="inputProps"
          clearable
          @clear="date = null"
        />
      </v-date-picker>

      <SSelect label-text="From Main Group" :options="searches.departments" v-model="fromMain" />

      <SSelect label-text="To Main Group" :options="searches.departments" v-model="toMain" />

      <SSelect label-text="Store Number" :options="searches.store" v-model="store" />

      <q-checkbox v-model="all" label="Display All Supplier" />

      <div id="radio">
        <q-radio size="xs" v-model="shape" val="1" label="By Supplier" />
        <q-radio size="xs" v-model="shape" val="2" label="By Document" />
        <q-radio size="xs" v-model="shape" val="3" label="By Sub Group" />
      </div>
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
import { setupCalendar, DatePicker } from 'v-calendar';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },

  setup(_, { emit }) {
    const state = reactive({
      date: null,
      store: ref(null),
      fromMain: ref(null),
      toMain: ref(null),
      shape: ref('1'),
      all: ref(false),
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
