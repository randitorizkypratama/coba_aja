<template>
  <section class="mt-7">
    <div class="q-pa-md">
        <v-date-picker mode="range" v-model="date" :columns="2" :popover="{ visibility: 'click' }">
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
            v-model="searches.fromDeptVal" />

        <SSelect
            label-text="To Department"
            :options="searches.toDept"
            v-model="searches.toDeptVal"/>

        <SSelect
            label-text="From Article"
            :options="searches.fromArt"
            v-model="fromArt" />

        <SSelect
            label-text="To Article"
            :options="searches.toArt"
            v-model="toArt"/>

        <q-radio v-model="optionSortType" val='0' label="Excl. Transfer" />
        <q-radio v-model="optionSortType" val='1' label="Incl. Transfer" />
        <q-radio v-model="optionSortType" val='2' label="Transfer Only" />        

        <SSelect
            label-text="OD-Taker"
            :options="searches.odTaker"
            disabled="true"
            v-model="odTaker"/>
        <q-btn dense color="primary" icon="search" label="Search" class="q-mt-md full-width" @click="onSearch"/>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { date } from 'quasar';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive({
      fromDept: ref(null),
      toDept: ref(null),
      fromArt: ref(null),
      toArt: ref(null),
      optionSortType: '0',
      odTaker: ref(null),
      date: {start: ref(new Date()), end: ref(new Date())}
    });

    const onSearch = () => {
      emit('onSearch', { ...props.searches });
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
