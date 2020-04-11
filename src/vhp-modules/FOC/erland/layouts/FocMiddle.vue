<template>
  <div>
    <FocTop />
    <v-row>
      <v-col cols="3">
        <FocLeft />
      </v-col>
      <v-col cols="9" class="pr-0 pl-8">
        <FocRight />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FocTop from "../components/FocMiddle/FocTop.vue";
import FocLeft from "../components/FocMiddle/FocLeft.vue";
import FocRight from "../components/FocMiddle/FocRight.vue";

export default {
  name: "FocMiddle",
  data: () => ({}),

  components: {
    FocTop,
    FocLeft,
    FocRight
  }
};
</script>

<style lang="scss" scoped></style>
