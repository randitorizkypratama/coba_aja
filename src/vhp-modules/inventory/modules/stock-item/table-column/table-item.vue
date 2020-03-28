<template>
  <div id="FocRooms2">
    <v-data-table
      hide-default-footer
      pagination.sync="pagination"
      :headers="headers"
      :items="dataHotel"
      item-key="docu-nr"
      sort-by="article"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import utilsIssuing from "@/../utils/api/useFetchData";
import moment from "moment";
export default {
  name: "FocTablesFocRooms",
  data: () => ({
    headers: [],
    dataHotel: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    const header = this.$store.state.ListRequisition;
    for (const i in header) {
      this.headers.push(header[i]);
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.dataHotel.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dataHotel.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
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
          article: "303",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        },
        {
          article: "300",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        },
        {
          article: "301",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        },
        {
          article: "302",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        },
        {
          article: "303",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        },
        {
          article: "300",
          quantity: "20",
          description: "Additional Room 01",
          price: "207500",
          amount: "900.000.000",
          roomNumber: "0",
          billDate: "17/12/2019",
          time: "10:10:33"
        }
      ];
    },
    getData(data) {
      this.dataHotel = data;
    }
  }
};
</script>

<style lang="scss">
$primary: #1890ff;

#FocRooms2.v-data-table td {
  height: 375px;
}

#FocRooms2 .v-data-table th {
  background: linear-gradient(#1488cc, #2b32b2);
  color: #ffffff;
  //   height: 14px;
}

#FocRooms2
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon {
  color: #ffffff;
  margin-left: 5px;
}

#FocRooms2
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon {
  color: rgba(255, 255, 255, 0.4);
}
.table-add {
  width: 327px;
  margin-left: 0px;
}
#FocRooms2 tbody tr:nth-of-type(even) {
  background-color: #c8e0f1a3;
}
</style>
