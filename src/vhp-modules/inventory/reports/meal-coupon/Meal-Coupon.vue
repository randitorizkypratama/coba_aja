<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedfromDateFormattedMomentjs"
                clearable
                label="Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="fromdate = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fromdate" @change="menu1 = false"></v-date-picker>
          </v-menu>
          <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedtoDateFormattedMomentjs"
                clearable
                label="To Date"
                readonly
                outlined
                dense
                v-on="on"
                @click:clear="todate = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="todate" @change="menu2 = false"></v-date-picker>
          </v-menu>

          <v-autocomplete
            v-model="fromdepartment"
            :items="department"
            item-text="label"
            item-value="value"
            label="From Main Group"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="todepartment"
            :items="department"
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
              <template
                v-slot:item.datum="{ item }"
              >{{item.datum == null? " " : formatDate(item.datum) }}</template>
              <template v-slot:item.rechnr="{ item }">{{ item.rechnr == 0 ? " " : item.rechnr }}</template>
              <template v-slot:item.pax="{ item }">{{ item.pax == 0 ? " " : item.pax }}</template>
              <template v-slot:item.bezeich="{ item }">
                {{
                item.bezeich == "T O T A L"
                ? "SubTotal"
                : item.bezeich == "GRAND TOTAL"
                ? "Total"
                : item.bezeich
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
    department: [],
    datas: [],
    billdate: "",
    doubleCurrency: "",
    foreignNr: "",
    exchgRate: "",
    zugriff: "",
    todepartment: [],
    fromdepartment: [],
    headers: [
      {
        text: "Date",
        align: "start",
        value: "datum",
        divider: true,
        width: 120
      },
      { text: "Department", value: "deptname", divider: true },
      { text: "Bill Number", value: "rechnr", divider: true },
      { text: "Pax", value: "pax", divider: true },
      { text: "Description", value: "bezeich", divider: true },
      { text: "Food Amount", value: "f-betrag", divider: true },
      {
        text: "Food Cost",
        value: "f-cost",
        divider: true
      },
      {
        text: "Beverage Amount",
        value: "b-betrag",
        divider: true
      },
      {
        text: "Beverage Cost",
        value: "b-cost",
        divider: true
      },
      {
        text: "Bill Amount",
        value: "betrag",
        divider: true
      },
      {
        text: "Cost of Sales",
        value: "t-cost",
        divider: true
      },
      {
        text: "User ID",
        value: "usr-id",
        divider: true
      }
    ]
  }),
  beforeCreate() {
    (async () => {
      const permission = await ky
        .post("http://182.253.140.35/VHPWebBased/rest/Common/checkPermission", {
          json: {
            request: {
              inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
              inputUsername: "sindata",
              userInit: "01",
              arrayNr: "41",
              expectedNr: "1"
            }
          }
        })
        .json();

      this.zugriff = permission.response.zugriff;

      const prepare = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/mealCouponPrepare",
          {
            json: {
              request: {
                inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                inputUsername: "sindata"
              }
            }
          }
        )
        .json();

      this.billdate = prepare.response.billdate;
      this.doubleCurrency = prepare.response.doubleCurrency;
      this.foreignNr = prepare.response.foreignNr;
      this.exchgRate = prepare.response.exchgRate;

      const tempDepartment = prepare.response.tHoteldpt["t-hoteldpt"];
      for (let i = 0; i < tempDepartment.length; i++) {
        const element = tempDepartment[i];
        this.department.push({
          value: element["num"],
          label: element["depart"]
        });
      }
    })();
  },
  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/mealCouponList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  doubleCurrency: this.doubleCurrency,
                  foreignNr: this.foreignNr,
                  exchgRate: this.exchgRate,
                  billdate: this.billdate,
                  fromDept: this.fromdepartment,
                  toDept: this.todepartment,
                  fromDate: moment(this.fromdate).format("YYYY-MM-DD"),
                  toDate: moment(this.to).format("YYYY-MM-DD")
                }
              }
            }
          )
          .json();

        const pbookList = parsed.response.cList["c-list"];

        this.datas = pbookList;
      })();
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
    }
  },
  computed: {
    computedfromDateFormattedMomentjs() {
      return this.fromdate ? moment(this.fromdate).format("DD-MM-YYYY") : "";
    },
    computedtoDateFormattedMomentjs() {
      return this.todate ? moment(this.todate).format("DD-MM-YYYY") : "";
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
