<template>
  <v-app>
    <NavBar />

    <v-container>
      <v-col cols="3" v-for="item in reportList" :key="item.url">
        <v-card class="pa-1 mx-auto" max-width="600" hover outlined @click="nextTo(item.url)">
          <v-card-title class="text-no-wrap" v-text="item.url"></v-card-title>
        </v-card>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  },
  data: () => ({
    reportList: [
      {
        url: `drugstore-report`
      },
      { 
        url: `order-taker-report`
      },
      {
        url: `outlet-sales-and-costs`
      },
      {
        url: `outlet-user-transaction`
      },
      {
        url: `meal-coupon`
      },
      {
        url: `join-to-guest-folio`
      },
      {
        url : `cancellation-journal`
      },
      {
        url : `outlet-actual-and-recipe-cost`
      },
      {
        url : `outlet-turnover`
      },
      {
        url : `outlet-bill-transaction`
      }
    ]
  }),
  methods: {
    nextTo(e) {
      this.$router.push("/" + e);
    }
  }
};
</script>
