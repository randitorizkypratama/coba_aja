<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="3">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
          <v-btn small color="primary" block depressed>
            <v-icon right dark class="pr-3">mdi-magnify</v-icon>Search
          </v-btn>
        </v-col>

        <v-col cols="12" md="9">
          <v-data-table
            :headers="headers"
            :items="desserts"
            item-key="name"
            class="elevation-1"
            dense="true"
            hide-default-footer="true"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar
  },
  data: () => {
    return {
      items: ["coba", "iya", "heeh"],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name"
        },
        { text: "Category", value: "category" },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "Calories", value: "cool" },
        { text: "Fat (g)", value: "hot" },
        { text: "Carbs (g)", value: "non" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        },
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        },
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        },
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        },
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        },
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          calories: "Ice cream",
          fat: "Ice cream",
          carbs: "Ice cream",
          protein: "Ice cream",
          iron: "Ice cream",
          cool: "Ice cream",
          hot: "Ice cream",
          non: "Ice cream"
        }
      ]
    };
  }
};
</script>

<style>
p.dashed {
  border-style: dashed;
}
</style>