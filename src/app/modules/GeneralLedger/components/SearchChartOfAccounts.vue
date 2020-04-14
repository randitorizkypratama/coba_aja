<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <q-form @submit="onSearch">
        <SInput
          label-text="Account Number"
          v-model="accountNumber"
          placeholder="99-99-9999"
          mask="##-##-####"
          unmasked-value
        />

        <SSelect
          label-text="Main Account"
          :options="searches.mains"
          v-model="main"
        />

        <SSelect
          label-text="Account Category"
          :options="searches.categories"
          v-model="category"
        />

        <SSelect
          label-text="Account Department"
          :options="searches.departments"
          v-model="department"
        />

        <q-btn
          block
          color="primary"
          max-height="28"
          icon="search"
          label="Search"
          type="submit"
          class="q-mt-md full-width"
        />
      </q-form>
    </div>

    <q-separator style="border-width: 1px;" class="q-my-md" />

    <div class="q-px-md">
      <SRemarkLeftDrawer label="Remark & Last User Changed" :value="selected" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  props: {
    selected: { type: String, required: true },
    searches: { type: Object, required: true },
  },
  setup(_, { emit }) {
    const state = reactive({
      accountNumber: ref(null),
      main: ref(null),
      category: ref(null),
      department: ref(null),
    });

    const onSearch = () => {
      emit('onSearch', { ...state });
    };

    return {
      onSearch,
      ...toRefs(state),
    };
  },
});
</script>
