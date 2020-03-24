<template>
  <div id="FocRooms">
    <v-data-table
      :headers="headers"
      :items="dataHotel"
      sort-by="article"
      class="elevation-3"
    >
      <!-- <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template> -->
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'FocTablesFocRooms',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Article',
        align: 'start',
        value: 'article',
        width: '92',
        divider: true,
      },
      { text: 'Quantity', value: 'quantity', width: '102', divider: true },
      {
        text: 'Description',
        value: 'description',
        width: '200',
        divider: true,
      },
      { text: 'Price', value: 'price', width: '85', divider: true },
      { text: 'Amount', value: 'amount', divider: true },
      { text: 'Room Number', value: 'roomNumber', width: '134', divider: true },
      { text: 'Bill Date', value: 'billDate', divider: true },
      { text: 'Time', value: 'time', divider: true },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    dataHotel: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.dataHotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dataHotel.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        this.dataHotel.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataHotel[this.editedIndex], this.editedItem);
      } else {
        this.dataHotel.push(this.editedItem);
      }
      this.close();
    },
    initialize() {
      this.dataHotel = [
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '300',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '301',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '302',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
        {
          article: '303',
          quantity: '20',
          description: 'Additional Room 01',
          price: '207500',
          amount: '900.000.000',
          roomNumber: '0',
          billDate: '17/12/2019',
          time: '10:10:33',
        },
      ];
    },
  },
};
</script>

<style lang="scss"></style>
