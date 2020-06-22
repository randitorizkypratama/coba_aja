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

      <SSelect label-text="Main Group" :options="searches.departments" v-model="main" />

      <SSelect label-text="Store Number" :options="searches.store" v-model="store" />

      <SSelect label-text="From Article Number" :options="searches.article" v-model="fromarticle" />

      <SSelect label-text="To Article Number" :options="searches.article" v-model="toarticle" />

      <SInput label-text="Transfer Code" v-model="transfercode" placeholder="Transfer Code" />

      <div>
        <label class="inline-block q-mb-xs">Display</label>
        <q-select
          dense
          outlined
          clearable
          v-model="display"
          :options="searches.displayList"
          option-value="value"
          option-label="label"
          option-disable="inactive"
          emit-value
          map-options
          class="q-mb-md"
        />
      </div>

      <div id="radio">
        <q-radio size="xs" v-model="shape" val="1" label="By Date" />
        <q-radio size="xs" v-model="shape" val="2" label="By Description" />
      </div>

      <q-checkbox v-model="use" label="Use Unit Expenses" />
      <q-checkbox v-model="print" label="Print Without Amounts" />

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
      main: ref(null),
      fromarticle: ref(null),
      toarticle: ref(null),
      transfercode: ref(null),
      shape: ref(null),
      use: false,
      print: false,
      display: ref(null),
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
