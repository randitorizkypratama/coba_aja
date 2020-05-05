<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateRangeText"
                clearable
                label="Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ranges" @change="menu1 = false" range></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-model="fromMainGroup"
            :items="[]"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="toMainGroup"
            :items="[]"
            item-text="label"
            item-value="value"
            label="Store Number"
            outlined
            dense
          ></v-autocomplete>

          <v-text-field v-model="transfer" label="Transfer Code" single-line dense outlined></v-text-field>

          <v-checkbox v-model="checkbox1" label="Display All Supplier"></v-checkbox>

          <v-radio-group v-model="radios" :mandatory="false">
            Order By
            <v-radio label="By Supplier" value="1"></v-radio>
            <v-radio label="By Document" value="2"></v-radio>
            <v-radio label="By Sub Group" value="3"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click="cari" block depressed small>
            <v-icon right dark>mdi-magnify</v-icon>Search
          </v-btn>
        </v-col>

        <v-col cols="9" class="pr-0 pl-5">
          <div id="FocRooms">
            <v-data-table
              :headers="headers"
              :items="datas"
              item-key="name"
              :height="height"
              class="elevation-1"
              disable-pagination
              disable-sort
              hide-default-footer
              fixed-header
              calculate-widths
              dense
            >
              <template v-slot:item.datum="{ item }">
                {{
                formatDate(item.datum)
                }}
              </template>
            </v-data-table>
          </div>
        </v-col>
        <v-col cols="1" class="rightmenu">
          <RightMenu />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import RightMenu from "@/components/RightMenu.vue";
import ky from "ky";
import moment from "moment";

export default {
  components: {
    NavBar,
    RightMenu
  },
  data: () => ({
    height: 550,
    date: new Date().toISOString().substr(0, 10),
    ranges: ["01/01/2019", "14/01/2019"],
    menu1: false,
    radios: "",
    checkbox1: false,
    transfer: "",
    toMainGroup: [],
    fromMainGroup: [],
    headers: [
      {
        text: "Date",
        align: "start",
        value: "artnr",
        divider: true
      },
      { text: "Storage Number", value: "name", divider: true },
      { text: "Supplier", value: "min-oh", divider: true },
      { text: "Article Number", value: "curr-oh", divider: true },
      { text: "Description", value: "avrgprice", divider: true },
      { text: "Delivery Unit", value: "ek-aktuell", divider: true },
      {
        text: "Price",
        value: "datum",
        divider: true
      },
      {
        text: "Incoming Quantity",
        value: "datum",
        divider: true
      },
      {
        text: "Amount",
        value: "datum",
        divider: true
      },
      {
        text: "Document Number",
        value: "datum",
        divider: true
      },
      {
        text: "Deliver Note",
        value: "datum",
        divider: true
      },
      {
        text: "ID/Date/Time",
        value: "datum",
        divider: true
      },
      {
        text: "Reason",
        value: "datum",
        divider: true
      },
      {
        text: "Invoice Number",
        value: "datum",
        divider: true
      }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.ranges.join(" - ");
    }
  }
};
</script>
<style lang="sass" scoped>
.main
  height: 100vh

.leftmenu
  border-right: 1px #2887d2 solid
  box-shadow: 0px 0px 7px 0px #00000038

.rightmenu
  padding: 0
  display: flex
  flex-direction: row
  justify-content: flex-end


.v-input--selection-controls
  margin-top: 0px
  padding-top: 0px

#FocRooms .v-data-table td
  height: 30px


#FocRooms .v-data-table th 
  background: linear-gradient(#1488cc, #2b32b2)
  color: #ffffff
  height: 40px


#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable.active
  .v-data-table-header__icon
    color: #ffffff
    margin-left: 5px


#FocRooms
  .theme--light.v-data-table
  .v-data-table-header
  th.sortable
  .v-data-table-header__icon
    color: rgba(255, 255, 255, 0.4)
    margin-left: 5px


#FocRooms tbody tr:nth-of-type(even)
  background-color: #c8e0f1a3
</style>
