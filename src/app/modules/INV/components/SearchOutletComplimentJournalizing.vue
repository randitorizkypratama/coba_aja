<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
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
      <SInput label-text="Refrence Number" v-model="articleNumber" unmasked-value />
      <SInput label-text="Description" v-model="articleNumber" unmasked-value />

      <q-btn
        block
        color="primary"
       max-height="10"
          style="height: 25px"
          icon="mdi-magnify"
        label="Search"
        class="q-mt-md full-width"
        @click="onSearch"
      />

      <q-separator style="border-width: 1px;" class="q-my-md" />

      <SRemarkLeftDrawer label="Total Debit" :value="searches.hasilDebit" />
      <SRemarkLeftDrawer label="Total Credit" :value="searches.hasilCredit" />
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
      fromdepartment: ref(null),
      todepartment: ref(null),
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
