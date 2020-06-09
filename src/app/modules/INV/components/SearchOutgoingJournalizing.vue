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
      <SInput label-text="Reference Number" :options="searches.store" />
      <SInput label-text="Description" :options="searches.store" />
      <SSelect label-text="Group" :options="searches.group" v-model="ReqNumber" />
      <q-btn
        dense
        color="primary"
        icon="search"
        label="Search"
        class="q-mt-md full-width"
        @click="onSearch"
      />
      <SInput class="q-mt-md" label-text="Total Debit" v-model="searches.hasilCredit" disable />
      <SInput label-text="Total Credit" v-model="searches.hasilCredit" disable />
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { date } from 'quasar';
import { log } from 'util';

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
      ReqNumber: ref(null),
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
