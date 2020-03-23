/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Purchasebook from "../views/Purchasebook.vue";
import Recipe from "../views/Recipe.vue";
import Inventory from "../vhp-modules/inventory/inventory.vue";
import SlowMovingStockOnHand from "../vhp-modules/inventory/reports/slow-moving-stock-on-hand/Slow-Moving-Stock-On-Hand.vue";
import Incoming from "../vhp-modules/inventory/modules/incoming/Incoming";
import TableTest from "../vhp-modules/inventory/reports/table-test/tablecomponent";
// import IssusingData from "../views/issuing";
import IssusingData from "../vhp-modules/inventory/modules/issuing/issuing";
import Outlet from "../vhp-modules/outlet/outlet.vue";
import TesReport from "../vhp-modules/outlet/reports/tes-report/Tes-Report.vue";
<<<<<<< HEAD
import storeSequisition from "@/vhp-modules/inventory/modules/store-requisition/Store-Requisition";
=======
import MinMaxStockOnHand from "../vhp-modules/inventory/reports/min-max-stock-on-hand/min-max-stock-on-hand.vue";
>>>>>>> b7225bf0e3f7fda883c8b09e4c2482b678000798

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
<<<<<<< HEAD
    path: "/store-requisition",
    name: "store-requisition",
    component: storeSequisition
=======
    path: "/incoming",
    name: "Incoming",
    component: Incoming
>>>>>>> b7225bf0e3f7fda883c8b09e4c2482b678000798
  },
  {
    path: "/outlet",
    name: "Outlet",
    component: Outlet
  },
  {
    path: "/tes-report",
    name: "TesReport",
    component: TesReport
  },
  {
    path: "/min-max-stock-on-hand",
    name: "MinMaxStockOnHand",
    component: MinMaxStockOnHand
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//tesst
export default router;
