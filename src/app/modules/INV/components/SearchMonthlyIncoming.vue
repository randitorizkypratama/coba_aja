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
          dense
        />
      </v-date-picker>

      <SSelect
        label-text="From Store"
        :options="searches.store"
        v-model="fromStore"
        dense
      />
      <SSelect 
        label-text="To Store" 
        :options="searches.store" 
        v-model="toStore" 
        dense 
      />

      <!--<q-select
        filled
        v-model="fromart"
        use-input
        input-debounce="0"
        label="From Article"
        :options="searches.articles"
        @filter="filterFn"
        style="width: 250px"
        behavior="menu"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>-->

      <SSelect
        label-text="From Article"
        :options="searches.articles"
        v-model="fromArt"
        dense
      />
      <SSelect 
        label-text="To Article" 
        :options="searches.articles" 
        v-model="toArt" 
        dense 
      />

      <div id="radio">
        <q-radio size="xs" v-model="sortBy" val="1" label="By Article Number" />
        <q-radio size="xs" v-model="sortBy" val="2" label="By Description" />
        <q-radio size="xs" v-model="sortBy" val="2" label="By Sub Group" />
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
      fromStore: null,
      toStore: null,
      fromArt: null,
      toArt: null,
      sortBy: null,
      date: null,
    });

    const onSearch = () => {
      emit('onSearch', { ...state });
    };

    /*const filterFn = (val, update) => {
      if (val === '') {
        update(() => {
          searches = searches.articles
        })
        return
    };

    update = () => {
      const needle = val.toLowerCase()
      this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    };*/

    return {
      ...toRefs(state),
      onSearch,
      //filterFn,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>

<style lang="scss" scoped></style>
