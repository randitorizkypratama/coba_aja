<template>
  <q-table dense separator="cell" v-bind="$attrs" v-on="$listeners">
    <template v-slot:loading>
      <div class="q-mb-xl q-mt-xl q-pt-xl q-pb-xl" style="z-index: 2;">
        <q-inner-loading showing color="primary" />
      </div>
    </template>

    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope" />
    </template>

    <template v-slot:no-data>
      <div class="full-width column flex-center text-grey q-pa-lg">
        <q-icon size="2em" name="mdi-info" />
        <span>Set the filter value then press search</span>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  inheritAttrs: false,
});
</script>
