<template>
  <v-container class="py-0" fluid>
    <v-row class="foc-main">
      <v-col cols="2" class="foc-main__left px-5">
        <FocLeft />
      </v-col>
      <v-col cols="9" class="pr-0 pl-5">
        <FocMiddle />
      </v-col>
      <v-col cols="1" class="foc-main__right">
        <FocRight />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FocLeft from "../erland/layouts/FocLeft";
import FocMiddle from "../erland/layouts/FocMiddle.vue";
import FocRight from "../erland/layouts/FocRight.vue";

export default {
  name: "FOCHome",
  data: () => ({}),

  components: {
    FocLeft,
    FocMiddle,
    FocRight
  }

  // async mounted() {
  //   console.log('FOC Home');
  // },
};
</script>

<style lang="scss">
$primary: #1890ff;

.foc-main {
  // min-height: 100vh;
  height: 100vh;
}
.foc-main__left {
  border-right: 1px #2887d2 solid;
  box-shadow: 0px 0px 7px 0px #00000038;
}
.foc-main__right {
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

// Override Vuetify styles only in Foc Module
#FocLeft .theme--light.v-input input,
.theme--light.v-input textarea {
  color: $primary;
  line-height: 1rem;
}

#FocRooms .v-data-table td {
  height: 30px;
}

#FocRooms .v-data-table th {
  background: linear-gradient(#1488cc, #2b32b2);
  color: #ffffff;
  height: 40px;
}

#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon {
  color: #ffffff;
  margin-left: 5px;
}

#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon {
  color: rgba(255, 255, 255, 0.4);
  margin-left: 5px;
}

#FocRooms tbody tr:nth-of-type(even) {
  background-color: #c8e0f1a3;
}
</style>
