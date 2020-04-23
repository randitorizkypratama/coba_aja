<template>
  <q-table dense separator="cell" v-bind="$attrs" v-on="$listeners">
    <template v-slot:no-data>
      <div class="full-width column flex-center text-grey q-pa-lg">
        <q-icon size="2em" name="info" />
        <span>Set the filter value then press search</span>
      </div>
    </template>

    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>

    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope" />
    </template>
  </q-table>
</template>
