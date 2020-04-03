<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="From Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fromdate" @change="menu1 = false"></v-date-picker>
          </v-menu>
          <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="To Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="todate" @change="menu2 = false"></v-date-picker>
          </v-menu>

          <v-autocomplete
            v-model="fromMainGroup"
            :items="[]"
            item-text="label"
            item-value="value"
            label="From Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="toMainGroup"
            :items="[]"
            item-text="label"
            item-value="value"
            label="To Main Group"
            outlined
            dense
          ></v-autocomplete>
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
    fromdate: new Date().toISOString().substr(0, 10),
    todate: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    toMainGroup: [],
    fromMainGroup: [],
    headers: [
      {
        text: "Date",
        align: "start",
        value: "artnr",
        divider: true
      },
      { text: "Department", value: "name", divider: true },
      { text: "Bill Number", value: "min-oh", divider: true },
      { text: "Pax", value: "curr-oh", divider: true },
      { text: "Description", value: "avrgprice", divider: true },
      { text: "Food Amount", value: "ek-aktuell", divider: true },
      {
        text: "Food Cost",
        value: "datum",
        divider: true
      },
      {
        text: "Beverage Amount",
        value: "datum",
        divider: true
      },
      {
        text: "Beverage Cost",
        value: "datum",
        divider: true
      },
      {
        text: "Bill Amount",
        value: "datum",
        divider: true
      },
      {
        text: "Cost of Sales",
        value: "datum",
        divider: true
      },
      {
        text: "User ID",
        value: "datum",
        divider: true
      }
    ]
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD-MM-YYYY") : "";
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
