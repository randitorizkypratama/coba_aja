<template>
  <div class="foc-main-content">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <!-- <img src="../../../../assets/header/svg/ReportList.svg" class="foc-icon mt-3" v-on="on" /> -->
        <img src="../../../../../assets/header/svg/ReportList.svg" class="foc-icon mt-3" v-on="on" />
      </template>
      <span>Menu 15</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "FOCRight",
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.foc-main-content {
  height: 100%;
  border-left: 1px solid #d9d9d9;
  width: 60px;
  text-align: center;
}
.foc-icon {
  width: 30px;
  height: 30px;
}
</style>