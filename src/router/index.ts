/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Purchasebook from "../views/Purchasebook.vue";
import Recipe from "../views/Recipe.vue";
import Inventory from "../vhp-modules/inventory/inventory.vue";
import SlowMovingStockOnHand from "../vhp-modules/inventory/reports/slow-moving-stock-on-hand/Slow-Moving-Stock-On-Hand.vue";
import Incoming from "../vhp-modules/inventory/modules/incoming/Incoming.vue";
import TableTest from "../vhp-modules/inventory/reports/table-test/tablecomponent.vue";
// import IssusingData from "../views/issuing";
import IssusingData from "../vhp-modules/inventory/modules/issuing/issuing.vue";
import Outlet from "../vhp-modules/outlet/outlet.vue";
// import TesReport from "../vhp-modules/outlet/reports/tes-report/Tes-Report.vue";
import storeSequisition from "../vhp-modules/inventory/modules/store-requisition/Store-Requisition.vue";
import MinStockOnHand from "../vhp-modules/inventory/reports/min-stock-on-hand/min-stock-on-hand.vue";
import MaxStockOnHand from "../vhp-modules/inventory/reports/max-stock-on-hand/max-stock-on-hand.vue";
import DrugstoreReport from "../vhp-modules/outlet/reports/drugstore-report/Drugstore-Report.vue"
import FrontOfficeCashier from "../vhp-modules/FOC/front-office-cashier.vue"
import Erland from "../vhp-modules/FOC/erland/Index.vue"
import AdjustmentResult from "../vhp-modules/inventory/reports/adjustment-result/Adjustment-Result.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpac,kChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/purchase-book",
    name: "Purchasebook",
    component: Purchasebook
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: Recipe
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory
  },
  {
    path: "/slow-moving-stock-on-hand",
    name: "SlowMovingStockOnHand",
    component: SlowMovingStockOnHand
  },
  {
    path: "/table-component",
    name: "TableTest",
    component: TableTest
  },
  {
    path: "/issusing",
    name: "issusing",
    component: IssusingData
  },
  {
    path: "/store-requisition",
    name: "store-requisition",
    component: storeSequisition
  },
  {
    path: "/incoming",
    name: "Incoming",
    component: Incoming
  },
  {
    path: "/outlet",
    name: "Outlet",
    component: Outlet
  },
  {
    path: "/drugstore-report",
    name: "DrugstoreReport",
    component: DrugstoreReport
  },
  {
    path: "/min-stock-on-hand",
    name: "MinStockOnHand",
    component: MinStockOnHand
  },
  {
    path: "/max-stock-on-hand",
    name: "MaxStockOnHand",
    component: MaxStockOnHand
  },
  {
    path: "/front-office-cashier",
    name: "FrontOfficeCashier",
    component: FrontOfficeCashier
  },
  {
    path: "/erland",
    name: "Erland",
    component: Erland
  },
  {
    path: "/adjustment-result",
    name: "AdjustmentResult",
    component: AdjustmentResult
  }


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//tesst
export default router;
