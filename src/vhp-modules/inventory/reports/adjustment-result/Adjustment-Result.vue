<template>
  <v-app>
    <NavBar />
    <v-container class="py-0" fluid>
      <v-row class="main">
        <v-col cols="2" class="leftmenu px-5">
          <v-autocomplete
            v-model="selected"
            :items="storeNumber"
            item-text="label"
            item-value="value"
            label="Store Number"
            outlined
            dense
          ></v-autocomplete>
          <v-autocomplete
            v-model="select"
            :items="mainGroup"
            item-text="label"
            item-value="value"
            label="Main Group"
            outlined
            dense
          ></v-autocomplete>
          <span>Data Type</span>
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Article Number" value="1"></v-radio>
            <v-radio label="Description" value="2"></v-radio>
            <v-radio label="Sub Group" value="3"></v-radio>
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
              <template v-slot:item.artnr="{ item }">
                {{
                item.artnr == 0 ? " " : item.artnr
                }}
              </template>
              <template v-slot:item.inhalt="{ item }">
                {{
                item.inhalt == 0 ? " " : item.inhalt
                }}
              </template>
              <template v-slot:item.qty="{ item }">
                {{
                item.qty == 0 ? " " : item.qty
                }}
              </template>
              <template v-slot:item.qty1="{ item }">
                {{
                item.qty1 == 0 ? " " : item.qty1
                }}
              </template>
              <template v-slot:item.avrg-amount="{ item }">
                {{
                item["avrg-amount"] == 0 ? " " : formatterMoney(item["avrg-amount"])
                }}
              </template>
              <template v-slot:item.amount="{ item }">
                {{
                item.amount == 0 ? " " : formatterMoney(item.amount)
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
    mainGroup: [],
    storeNumber: [],
    datas: [],
    matGrp: "",
    p221: "",
    p224: "",
    select: "",
    selected: "",
    radios: "",
    headers: [
      {
        text: "Article Number",
        align: "start",
        value: "artnr"
      },
      { text: "Description", value: "bezeich" },
      { text: "Unit", value: "munit" },
      { text: "Content", value: "inhalt" },
      { text: "Current Quantity", value: "qty" },
      { text: "Actual Quantity", value: "qty1" },
      {
        text: "Average Amount",
        value: "avrg-amount"
      },
      {
        text: "Amount",
        value: "amount"
      },
      {
        text: "Account Number",
        value: "fibukonto"
      },
      {
        text: "Cost Allocation",
        value: "cost-center"
      }
    ]
  }),
  beforeCreate() {
    (async () => {
      const data = await ky
        .post(
          "http://182.253.140.35/VHPWebBased/rest/vhpINV/invAdjustlistPrepare",
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

      this.matGrp = data.response.matGrp;
      this.p221 = data.response.p221;
      this.p224 = data.response.p224;
      const tempMainGroup = data.response.tLHauptgrp["t-l-hauptgrp"];
      for (let i = 0; i < tempMainGroup.length; i++) {
        const element = tempMainGroup[i];
        this.mainGroup.push({
          value: element["endkum"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }
      const tempStoreNumber = data.response.tLLager["t-l-lager"];
      for (let i = 0; i < tempStoreNumber.length; i++) {
        const element = tempStoreNumber[i];
        this.storeNumber.push({
          value: element["lager-nr"],
          label: element["bezeich"]
        });
        // this.items.push(element["country-name"]);
      }

      //=> `{data: '🦄'}`
    })();
  },

  methods: {
    cari() {
      (async () => {
        const parsed = await ky
          .post(
            "http://182.253.140.35/VHPWebBased/rest/vhpINV/invAdjustlistList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  sorttype: this.radios,
                  currLager: this.selected,
                  fromGrp: this.select,
                  transdate: this.matGrp == this.select ? this.p221 : this.p224
                }
              }
            }
          )
          .json();
        const pbookList = parsed.response.cList["c-list"];
        const Amount = parsed.response.totAmount;
        const Average = parsed.response.totAvrgAmount;
        const listData = {
          key: Number.MAX_VALUE,
          artnr: "",
          bezeich: "Total",
          munit: "",
          inhalt: "",
          qty: "",
          qty1: "",
          ["avrg-amount"]: Average,
          amount: Amount,
          fibukonto: "",
          ["cost-center"]: ""
        };
        this.datas = pbookList.concat(listData);
      })();
    },
    formatterMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        const i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        const j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : "")
        );
      } catch (e) {
        console.log(e);
      }
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
