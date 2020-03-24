<template>
  <div id="FocLeft" class="foc-main">
    <v-menu
      ref="menu"
      v-model="menu"
      transition="scale-transition"
      min-width="290px"
      :close-on-content-click="false"
      :return-value.sync="date"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="Bill Date"
          append-icon="mdi-calendar"
          v-on="on"
          outlined
          dense
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="menu = false" text>Cancel</v-btn>
        <v-btn color="primary" @click="$refs.menu.save(date)" text>OK</v-btn>
      </v-date-picker>
    </v-menu>

    <div class="foc-main__article">
      <p class="mb-1">Article</p>
      <v-btn-toggle v-model="icon" class="foc-main__article__toggle mb-3" dense>
        <v-btn class="foc-main__article__toggle-btn" value="left">
          <span class="hidden-sm-and-down">Sales</span>
        </v-btn>

        <v-btn class="foc-main__article__toggle-btn" value="right">
          <span class="hidden-sm-and-down">Payment</span>
        </v-btn>
      </v-btn-toggle>
      <v-autocomplete
        v-model="value"
        label="Please Select"
        :items="items"
        outlined
        dense
        single-line
      ></v-autocomplete>
    </div>

    <div>
      <p class="mb-1">Voucher Number</p>
      <v-text-field single-line outlined dense></v-text-field>
    </div>
    <div>
      <p class="mb-1">Description</p>
      <v-text-field single-line outlined dense></v-text-field>
    </div>
    <div>
      <p class="mb-1">Unit Price</p>
      <v-text-field single-line outlined dense></v-text-field>
    </div>
    <v-btn color="primary" block>Add</v-btn>
  </div>
</template>

<script>
export default {
  name: 'FocMiddleFocLeftt',
  data: () => ({
    icon: 'left',
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    // date: new Date().toISOString().substr(0, 10),
    date: null,
    menu: false,
    value: null,
  }),
};
</script>

<style lang="scss" scoped>
.foc-main__article__toggle {
  width: 100%;
}

.foc-main__article__toggle-btn {
  width: 50%;
}
</style>
