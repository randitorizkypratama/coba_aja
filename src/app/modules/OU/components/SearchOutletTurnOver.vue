<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <v-date-picker v-model="date" :columns="1" :popover="{ visibility: 'click' }">
        <SInput
          label-text="Date"
          slot-scope="{ inputProps }"
          placeholder="Select Date"
          readonly
          v-bind="inputProps"
          @clear="date = null" />
      </v-date-picker>

      <SSelect
        label-text="From Department"
        :options="searches.fromDept"
        v-model="fromDept" />

      <SSelect
        label-text="To Department"
        :options="searches.toDept"
        v-model="toDept"/>

      <q-checkbox v-model="incNotSoldItems" label="Including not sold items" />
      <q-checkbox v-model="incLaundryDrugstore" label="Including Laundry and Drugstore" />

      <q-btn dense color="primary" icon="search" label="Search" class="q-mt-md full-width" @click="onSearch"/>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { watch } from 'fs';
import { date } from 'quasar';

setupCalendar({
  firstDayOfWeek: 2,
});


export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },
  setup(_, { emit }) {
    const state = reactive({
      fromDept: ref(null),
      toDept: ref(null),
      date: ref(new Date()),
      incNotSoldItems: ref(false),
      incLaundryDrugstore : ref(false)
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
  }
});
</script>

<style lang="scss" scoped></style>
