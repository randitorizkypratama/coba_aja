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
          @clear="date = null"
        />
      </v-date-picker>

      <SSelect label-text="From Outlet" :options="searches.fromDept" v-model="fromDept" />

      <SSelect label-text="To Outlet" :options="searches.toDept" v-model="toDept" />
      <SSelect v-model="model" :options="options" label-text="Sorting By" />
      <q-btn-toggle
        label-text="Display"
        v-model="food"
        spread
        toggle-color="primary"
        :options="[
        {label: 'Food', value: 'food'},
        {label: 'Beverange', value: 'beverange'}
      ]"
      ></q-btn-toggle>

      <q-checkbox v-model="teal" label="By Factor 1000" />
      <q-checkbox v-model="orange" label="Including Not Sold Items" />
      <q-checkbox v-model="subgroup" class="disabled" label="All Sub Group" />
      <q-list dense bordered padding class="rounded-borders disabled">
        <q-item clickable v-ripple>
          <q-item-section>Item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>Item</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>Item</q-item-section>
        </q-item>
      </q-list>

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
import { watch } from 'fs';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  data() {
    return {
      food: 'food',
      teal: false,
      orange: true,
      subgroup: false,
      model: null,
      options: [
        { label: 'By Description', value: 'byDesc' },
        { label: 'By Sold Quantity', value: 'bySoldQuantity' },
        { label: 'By Sold Quantity', value: 'bySoldAmount' },
      ],
    };
  },
  props: {
    searches: { type: Object, required: true },
  },

  setup(_, { emit }) {
    const state = reactive({
      // userID: ref(null),
      date: ref(null),
      fromDept: ref(null),
      toDept: ref(null),
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
