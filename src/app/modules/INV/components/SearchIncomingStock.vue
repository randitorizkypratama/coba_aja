<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <SSelect label-text="Store No" :options="searches.departments" v-model="fromDept" />
      <SInput label-text="Delivery Note" :options="searches.store" v-model="ReqNumber" disabled />
      <SRemarkLeftDrawer label="Total" :value="0" />
      <SSelect label-text="Articel No" :options="searches.departments" v-model="toDept" />
      <SSelect label-text="Qty D-Unit" :options="searches.departments" v-model="toDept" />
      <SSelect label-text="Qty S-Unit" :options="searches.departments" v-model="toDept" />
      <SInput label-text="Price" :options="searches.store" v-model="ReqNumber" />
      <SInput label-text="Discount" :options="searches.store" v-model="ReqNumber" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api';
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
      fromDept: ref(null),
      toDept: ref(null),
      ReqNumber: ref(' '),
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

<style lang="scss" scoped>
#input {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#radio {
  margin-left: -9px;
}
</style>
