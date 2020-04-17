<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <q-form @submit="onSearch">
        <SInput
          label-text="Search By Article Number"
          v-model="articleNumber"
          mask="##-##-####"
          unmasked-value
        />
        <div id="radio">
          <q-radio size="xs" v-model="shape" val="art" label="Article Number" />
          <q-radio size="xs" v-model="shape" val="desc" label="Description" />
        </div>
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
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      shape: 'art',
    };
  },
});
</script>
<style lang="scss" scoped>
#input {
  width: 220px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#radio {
  margin-left: -9px;
}
</style>
