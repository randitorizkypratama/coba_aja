<template>
  <section class="mt-7">
    <div class="q-pa-md" style="max-width: 800px">
      <div class="row">
        <div class="col">
          <v-date-picker v-model="date" :columns="2" :popover="{ visibility: 'click' }">
            <SInput
              label-text="Posting Date"
              slot-scope="{ inputProps }"
              placeholder="Date"
              readonly
              v-bind="inputProps"
              clearable
              @clear="date = null"
            />
          </v-date-picker>
        </div>
        <div class="col">
          <SSelect label-text="From Store" :options="searches.store" v-model="fromstore" />
        </div>
        <div class="col">
          <SInput label-text="Transaction Code" v-model="trcode" unmasked-value />
        </div>
        <div class="col">
          <SSelect label-text="To Store" :options="searches.store" v-model="departments" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <SSelect label-text="Article Number" :options="searches.store" v-model="fromstore" />
        </div>
        <div class="col">
          <SInput label-text="Stock OnHand" v-model="articleNumber" unmasked-value />
        </div>
        <div class="col">
          <SInput label-text="Quantity" v-model="qty" unmasked-value />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <SInput label-text="Price" v-model="price" unmasked-value />
        </div>
        <div class="col">
          <SInput label-text="Price x Quantity" v-model="subamount" unmasked-value />
        </div>
        <div class="col">
          <q-btn
            dense
            label-text=" "
            color="primary"
            icon="search"
            label="Input"
            class="q-mt-md full-width"
            @click="onSearch"
          />
        </div>
        <div class="col">
          <SInput label-text="Total Amount" v-model="totalamount" unmasked-value />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api';
import { DatePicker } from 'v-calendar';

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },

  setup(_, { emit }) {
    const state = reactive({
      date: ref(null),
      fromstore: ref(null),
      tostore: ref(null),
      departments: ref(null),
      trcode: ref(null),
      qty: ref(null),
      price: ref(null),
      subamount: ref(null),
      totalamount: ref(null),
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
