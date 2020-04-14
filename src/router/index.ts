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
import Issuing from "../vhp-modules/inventory/reports/issuing/Issuing.vue";
import Outlet from "../vhp-modules/outlet/outlet.vue";
// import TesReport from "../vhp-modules/outlet/reports/tes-report/Tes-Report.vue";
import storeSequisition from "../vhp-modules/inventory/modules/store-requisition/Store-Requisition.vue";
import MinStockOnHand from "../vhp-modules/inventory/reports/min-stock-on-hand/min-stock-on-hand.vue";
import MaxStockOnHand from "../vhp-modules/inventory/reports/max-stock-on-hand/max-stock-on-hand.vue";
import DrugstoreReport from "../vhp-modules/outlet/reports/drugstore-report/Drugstore-Report.vue"
import OutletUserTransaction from "../vhp-modules/outlet/reports/outlet-user-transaction/Outlet-User-Transaction.vue";
import OrderTakerReport from "../vhp-modules/outlet/reports/order-taker-report/Order-Taker-Report.vue";
import OutletSalesAndCosts from "../vhp-modules/outlet/reports/outlet-sales-and-costs/Outlet-Sales-And-Costs.vue";
import MealCoupon from "../vhp-modules/inventory/reports/meal-coupon/Meal-Coupon.vue";
import JoinToGuestFolio from "../vhp-modules/outlet/reports/join-to-guest-folio/Join-To-Guest-Folio.vue";
import FrontOfficeCashier from "../vhp-modules/FOC/front-office-cashier.vue"
import Erland from "../vhp-modules/FOC/erland/Index.vue"
import AdjustmentResult from "../vhp-modules/inventory/reports/adjustment-result/Adjustment-Result.vue";
import stokItem from "../vhp-modules/inventory/modules/stock-item/index.vue";
import MaterialReconciliation from "../vhp-modules/inventory/reports/material-reconciliation/Material-Reconciliation.vue";
import InterStoreTransfer from "../vhp-modules/inventory/reports/inter-store-transfer/Inter-store-Transfer.vue";
import InterKitchenTransfer from "../vhp-modules/inventory/reports/inter-kitchen-transfer/Inter-Kitchen-Transfer.vue";
import CancellationJournal from "../vhp-modules/outlet/reports/cancellation-journal/Cancellation-Journal.vue";
import OutletActualAndRecipeCost from "../vhp-modules/outlet/reports/outlet-actual-and-recipe-cost/Outlet-Actual-And-Recipe-Cost.vue";
import OutletTurnover from "../vhp-modules/outlet/reports/outlet-turnover/Outlet-Turnover.vue";
import OutletBillTransaction from "../vhp-modules/outlet/reports/outlet-bill-transaction/Outlet-Bill-Transaction.vue";
import AnnualIssuing from "../vhp-modules/inventory/reports/annual-issuing/Annual-Issuing.vue";
import CancelledIncoming from "../vhp-modules/inventory/reports/cancelled-incoming/Cancelled-Incoming.vue";

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
  // {
  //   path: "/issusing",
  //   name: "issusing",
  //   component: IssusingData
  // },
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
    path: "/order-taker-report",
    name: "OrderTakerReport",
    component: OrderTakerReport
  },
  {
    path: "/outlet-sales-and-costs",
    name: "OutletSalesAndCosts",
    component: OutletSalesAndCosts
  },
  {
    path: "/outlet-user-transaction",
    name: "OutletUserTransaction",
    component: OutletUserTransaction
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
    path: "/meal-coupon",
    name: "MealCoupon",
    component: MealCoupon
  },
  {
    path: "/join-to-guest-folio",
    name: "JoinToGuestFolio",
    component: JoinToGuestFolio
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
    path: "/stock-item",
    name: "stokItem",
    component: stokItem
  },
  {
    path: "/adjustment-result",
    name: "AdjustmentResult",
    component: AdjustmentResult
  },
  {
    path: "/meal-coupon",
    name: "MealCoupon",
    component: MealCoupon
  },
  {
    path: "/material-reconciliation",
    name: "Material Reconciliation",
    component: MaterialReconciliation
  },
  {
    path: "/inter-store-transfer",
    name: "Inter Store Transfer",
    component: InterStoreTransfer
  },
  {
    path: "/inter-kitchen-transfer",
    name: "Inter Kitchen Transfer",
    component: InterKitchenTransfer
  },
  {
    path: "/cancellation-journal",
    name: "CancellationJournal",
    component: CancellationJournal
  },
  {
    path: "/outlet-actual-and-recipe-cost",
    name: "OutletActualAndRecipeCost",
    component: OutletActualAndRecipeCost
  },
  {
    path: "/outlet-turnover",
    name: "OuletTurnover",
    component: OutletTurnover
  },
  {
    path: "/outlet-bill-transaction",
    name: "OuletBillTransaction",
    component: OutletBillTransaction
  },
  {
    path: "/issuing",
    name: "Issuing",
    component: Issuing
  },
  {
    path: "/annual-issuing",
    name: "Annual Issuing",
    component: AnnualIssuing
  },
  {
    path: "/cancelled-incoming",
    name: "Cancelled Incoming",
    component: CancelledIncoming
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//tesst
export default router;
