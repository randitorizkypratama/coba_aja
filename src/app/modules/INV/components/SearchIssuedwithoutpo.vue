<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <q-form @submit="onSearch">
        <SInput label-text="Delevery Note" v-model="inputan" unmasked-value />
        <q-btn
          block
          color="primary"
          max-height="10"
          style="height: 25px"
          icon="mdi-magnify"
          label="Search"
          type="submit"
          class="q-mt-md full-width"
        />
      </q-form>
    </div>

    <q-separator style="border-width: 1px;" class="q-my-md" />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from '@vue/composition-api';
export default defineComponent({
  props: {},
  setup(_, { emit }) {
    const state = reactive({
      inputan: ref(null),
    });
    const onSearch = () => {
      emit('onSearch');
    };
    return {
      onSearch,
      ...toRefs(state),
    };
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
