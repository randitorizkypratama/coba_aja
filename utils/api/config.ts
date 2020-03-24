/** @format */
import { getUsername, users } from "../local-storage";
console.log("modul12", users !== null ? users : "err");

export const modul = {
  USERNAME:
    getUsername !== null
      ? getUsername?.substring(0, getUsername.indexOf("@"))
      : "",
  PASSWORD: users !== null ? users.response.userKey : "",
  APP_TITLE: users !== null ? users.response.htlName : "",
  HTTP:
    users !== null
      ? users.response.htlUrl.substring(
          0,
          users.response.htlUrl.indexOf("//") + 2
        )
      : "",
  WEB_SERVICE:
    users !== null
      ? users.response.htlUrl.substring(
          7,
          users.response.htlUrl.indexOf(".") + 1
        )
      : "",
  URL:
    users !== null
      ? users.response.htlUrl.substring(
          users.response.htlUrl.indexOf(".") + 1,
          users.response.htlUrl.lastIndexOf("/") + 1
        )
      : "",
  // API: "",
  JOURNAL_TYPE: {
    GL: { CODE: 0, ACCESS_NR: 27, J_TYPE: 99, MODULE: "general ledger" },
    IA: { CODE: 1, ACCESS_NR: 38, J_TYPE: 99, MODULE: "income audit" },
    AR: { CODE: 2, ACCESS_NR: 15, J_TYPE: 99, MODULE: "account receiveable" },
    INV: { CODE: 3, ACCESS_NR: 22, J_TYPE: 6, MODULE: "inventory" },
    // RCV, OUT, COMP
    // RCV: { CODE: 6, ACCESS_NR: 22, J_TYPE: 99, MODULE: "receiving" },
    AP: { CODE: 4, ACCESS_NR: 25, J_TYPE: 99, MODULE: "account payable" },
    GC: { CODE: 5, ACCESS_NR: 42, J_TYPE: 99, MODULE: "general cashier" },
    FA: { CODE: 7, ACCESS_NR: 69, J_TYPE: 99, MODULE: "fix assets" },
    PUR: { CODE: 8, ACCESS_NR: 23, J_TYPE: 99, MODULE: "purchasing" }
  },
  LEDGER_TYPE: {
    GL: { CODE: 0, ACCESS_NR: 27, J_TYPE: 99, MODULE: "general ledger" },
    IA: { CODE: 1, ACCESS_NR: 38, J_TYPE: 99, MODULE: "income audit" },
    AR: { CODE: 2, ACCESS_NR: 27, J_TYPE: 99, MODULE: "account receiveable" },
    INV: { CODE: 3, ACCESS_NR: 22, J_TYPE: 6, MODULE: "inventory" },
    // RCV, OUT, COMP
    // RCV: { CODE: 6, ACCESS_NR: 22, J_TYPE: 99, MODULE: "receiving" },
    AP: { CODE: 4, ACCESS_NR: 27, J_TYPE: 99, MODULE: "account payable" },
    GC: { CODE: 5, ACCESS_NR: 42, J_TYPE: 99, MODULE: "general cashier" },
    FA: { CODE: 7, ACCESS_NR: 69, J_TYPE: 99, MODULE: "fix assets" },
    PUR: { CODE: 8, ACCESS_NR: 23, J_TYPE: 99, MODULE: "purchasing" }
  },
  DATE_FORMAT: "DD/MM/YY",
  DATE_FORMAT_BL: "MM/DD/YYYY",
  DATETIME_FORMAT: "DD/MM/YY HH:MM:SS",
  DATETIME_FORMAT_BL: "MM/DD/YYYY HH:MM:SS",
  ACCESS_LEVEL: {
    NO_ACCESS: 0,
    READ: 1,
    WRITE: 2,
    SPECIAL: 3
  },
  PERMISSION: {
    FRONT_OFFICE: 1,
    GUEST_FILES: 2,
    RESERVATION_ACCESS_RIGHT: 3,
    CHECK_IN: 4,
    CHECK_OUT: 5,
    SETTING_FRONT_OFFICE: 6,
    CASHIER_MODULES: 7,
    FO_CASHIER: 8,
    OUTLET_CASHIER: 9,
    DEPOSIT: 10,
    CLOSED_BILLS: 11,
    BILL_TRANSFER: 12,
    SETTING: 13,
    TELEPHONE_OPERATOR: 14,
    ACCOUNTS_RECEIVABLE: 15,
    HOUSE_KEEPING: 16,
    GUEST_MESSAGE: 17,
    RESTAURANT_PROGRAM: 18,
    RESTAURANT_WAITERS: 19,
    RESTAURANT_CASHIER: 20,
    NIGHT_AUDIT: 21,
    STOCK_ACCOUNTING_MODULE: 22,
    PURCHASING: 23,
    STOCKS_ADMINISTRATION: 24,
    ACCOUNTS_PAYABLE: 25,
    GL_SETTING: 26,
    GL_JOURNAL_TRANSACTION: 27,
    GL_REPORTS: 28,
    GL_ADJUSTMENT: 29,
    GL_BATCH_TRANSACTION: 30,
    SALES_MODULE: 31,
    SALES_SUPERVISOR: 32,
    SALES_SETTING: 33,
    RE_CHECKIN_GUEST: 34,
    DISPLAY_ROOM_RATE: 35,
    ALLOTMENT: 36,
    TELEPHONE_LIST: 37,
    INCOME_AUDIT: 38,
    STOCKS_RECEIVING: 39,
    STOCKS_OUTGOING: 40,
    COST_CONTROL: 41,
    GENERAL_CASHIER: 42,
    CHANGE_ROOM_RATE: 43,
    CANCEL_RESERVATION: 44,
    MODULE_BANQUET: 45,
    BANQUET_SETUP: 46,
    MODULE_SPACURE: 47,
    MODULE_SPACURE_SETTING: 48,
    RESTAURAT_CLOSED_BILL: 49,
    PURCHASE_REQUEST: 50,
    KEYCARD_ADMINISTRATION: 51,
    RESTAURANTVOID_ITEM: 52,
    FB_RECIPE: 53,
    CHANGE_INVENTORY_TRANSACTION_DATE: 54,
    VISUAL_BILL_TRANSFER_TO_NS_BILL: 55,
    OVERRIDE_OVERBOOKING: 56,
    GUEST_CREDIT_LIMIT: 57,
    MODULE_CLUB: 58,
    TOWEL_AND_LOCKER: 59,
    CLUB_SUPERVISOR: 60,
    CLUB_BILLING: 61,
    CLUB_SETTING: 62,
    ENTRY_WORK_ORDER: 63,
    PROCESS_WORK_ORDER: 64,
    RESTAURANT_ARTICLE_SETUP: 65,
    WORK_ORDER_SET_UP: 66,
    VOID_FO_BILL_ITEM: 67,
    DELETE_JOURNALS: 68,
    MODULE_FIXED_ASSET: 69,
    EARLY_CO: 70,
    REPORT_GENERATOR: 71,
    ADVANCE_CASH: 72,
    PURCHASE_REQUEST_APPROVAL_1: 73,
    PURCHASE_REQUEST_APPROVAL_2: 74,
    PURCHASE_REQUEST_APPROVAL_3: 75,
    PURCHASE_REQUEST_APPROVAL_4: 76,
    NIGHT_AUDIT_PROGRAM_ADMIN: 77,
    ALLOW_TO_PRINT: 78,
    DISCOUNT_FOR_POS_ITEMS: 79,
    GL_COA_SETUP: 80,
    VIEW_CCARD_NUMBER: 81,
    SYSTEM_ADMIN: 99
  }
};

export default modul;
