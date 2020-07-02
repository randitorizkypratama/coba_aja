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

      <SSelect
        label-text="From Department"
        :options="searches.departments"
        v-model="fromdepartments"
      />
      <SSelect label-text="To Department" :options="searches.departments" v-model="todepartments" />

      <div id="radio">
        <q-radio size="xs" v-model="shape" val="1" label="From Outlet" />
        <q-radio size="xs" v-model="shape" val="2" label="To Outlet" />
      </div>
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
      fromdepartments: ref(null),
      todepartments: ref(null),
      shape: ref('1'),
      date: null,
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
