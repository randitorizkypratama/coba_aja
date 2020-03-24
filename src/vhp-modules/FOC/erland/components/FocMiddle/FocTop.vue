<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/SelectDepartment.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 1</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/BackDate.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 2</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/NewFolio.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 3</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/PrintFolio.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 4</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/Checkout.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 5</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/transfer.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 6</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/AutoTransferTransaction.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 7</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/transfer_hist.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 8</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/PresetArticlePosting.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 9</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/CardInformation.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 10</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/PrintCallCharge.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 11</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/MasterBill.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 12</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/nonguestfolio.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 13</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img
          src="@/assets/header/svg/ClosedBill.svg"
          class="foc-icon"
          v-on="on"
        />
      </template>
      <span>Menu 14</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "FocMiddleFOCRight",
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.foc-icon {
  width: 30px;
  height: 30px;
  margin-right: 30px;
  cursor: pointer;
}

// .foc-icon:hover {
//   width: 32px;
//   height: 32px;
//   transition: 0.2s;
// }
</style>
