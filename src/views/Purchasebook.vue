<template>
  <v-app>    
      <NavBar />
       <v-container fluid>
        <v-row>
            <v-col>
                <v-select
                    v-model="select"
                    :items="items"
                    item-value="value"
                    label="Language"
                    outlined
                  ></v-select>
    <v-btn color="primary" block depressed large>
              <v-icon right dark>mdi-magnify</v-icon>
Rounded Button 
</v-btn>

    <v-spacer></v-spacer>

<div>
        <p class="dashed">A dashed border.</p>

        </div>
            </v-col>
            <v-col>
                 <v-data-table
    :headers="headers"
    :items="desserts"
    item-key="name"
    class="elevation-1"
    dense=true
    hide-default-footer=true
>
    </v-data-table>
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
  data () {
      return {
          items: ["coba","iya","heeh"],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Category', value: 'category' },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
          { text: 'Calories', value: 'cool' },
          { text: 'Fat (g)', value: 'hot' },
          { text: 'Carbs (g)', value: 'non' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          },
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          },
           {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          },
           {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          },
           {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          },
           {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            calories:'Ice cream',
            fat:'Ice cream',
            carbs:'Ice cream',
            protein:'Ice cream',
            iron:'Ice cream',
            cool:'Ice cream',
            hot:'Ice cream',
            non:'Ice cream',
          }
        ],
      }
    },
};
</script>

<style>
p.dashed {border-style: dashed;}

</style>