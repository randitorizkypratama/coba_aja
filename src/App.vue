<template>
  <v-app>
    <LayoutAppBar />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
    LayoutAppBar: () => import('@/app/layouts/components/LayoutAppBar.vue'),
  },
});
</script>
