<template>
  <div class="py-12 mx-8">
    <div class="module-grid">
      <v-card
        tile
        flat
        :to="moduleItem.path"
        v-for="moduleItem in moduleList"
        :key="moduleItem.path"
        class="module-card"
      >
        <HomeModuleItem :item="moduleItem" />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { moduleList } from '@/models/HomeModule';

export default defineComponent({
  setup() {
    return {
      moduleList,
    };
  },
  components: {
    HomeModuleItem: () => import('@/app/home/components/HomeModuleItem.vue'),
  },
});
</script>

<style lang="scss" scoped>
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  grid-gap: 16px 5%;
  justify-content: space-between;
}

.v-card.module-card {
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  height: 110px;
}
</style>
