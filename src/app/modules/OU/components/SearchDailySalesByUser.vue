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

      <SSelect label-text="Department" :options="searches.departments" v-model="fromMain" />

      <q-checkbox v-model="all" label="Suppress compliments VAT and service" />
      <q-checkbox v-model="all" label="Separate Discount to food Beverage and Other" />
      <q-checkbox v-model="all" label="Exclude Compliment" />

      <q-btn
        dense
        color="primary"
        icon="search"
        label="Search"
        class="q-mt-md full-width"
        @click="showDialog"
      />
    </div>
    <DialogSupplier :show="show" @onDialog="onDialog" />
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
      all: ref(true),
      show: false,
    });

    // const onSearch = () => {
    //   emit('onSearch', { ...state });
    // };

    const onDialog = (val) => {
      state.show = val;
    };

    const showDialog = () => {
      // state.dataSelected = dataRow;
      onDialog(true);
    };
    return {
      ...toRefs(state),
      // onSearch,
      showDialog,
      onDialog,
    };
  },
  components: {
    'v-date-picker': DatePicker,
    DialogSupplier: () => import('./DialogDailySalesByUser.vue'),
  },
});
</script>

<style lang="scss" scoped></style>
