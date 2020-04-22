import { MutationTree, GetterTree } from 'vuex';
import { LayoutState, SubmoduleList } from '../models/storeModel';

const state: LayoutState = {
  currentModule: null,
};

const mutations: MutationTree<LayoutState> = {
  SET_CURRENT_MODULE(state, currentModule) {
    state.currentModule = currentModule;
  },
};

const getters: GetterTree<LayoutState, any> = {
  submoduleMenu: (state) => {
    const submoduleList: SubmoduleList = {
      GL: [
        {
          path: '/gl/chart-of-accounts',
          name: 'Chart of Accounts',
          icon: 'GL/Icon-ChartOfAccounts',
        },
        {
          path: '/gl/general-journal',
          name: 'General Journal',
          icon: 'GL/Icon-GeneralJournal',
        },
        {
          path: '/gl/general-ledger',
          name: 'General Ledger',
          icon: 'GL/Icon-GeneralLedger',
        },
        {
          path: '/gl/posting',
          name: 'Posting',
          icon: 'GL/Icon-Posting',
        },
        {
          path: '/gl/profit-loss-budget',
          name: 'Profit And Loss Budget',
          icon: 'GL/Icon-ProfitLossBudget',
        },
        {
          path: '/gl/accounting-date-parameter',
          name: 'Accounting Date Parameter',
          icon: 'GL/Icon-AccountingDateParameter',
        },
        {
          path: '/gl/closing',
          name: 'Closing',
          icon: 'GL/Icon-Closing',
        },
      ],
      Inventory: [
        {
          path: '/inventory/supplier-profile',
          name: 'Supplier Profile',
          icon: 'Inventory/Icon-SupplierProfile',
        },
        {
          path: '/inventory/stock-item',
          name: 'Stock Item',
          icon: 'Inventory/Icon-StockItem',
        },
        {
          path: '/inventory/initial-stock',
          name: 'Initial Stock',
          icon: 'Inventory/Icon-InitialStock',
        },
        {
          path: '/inventory/store-requisition',
          name: 'Store Requisition',
          icon: 'Inventory/Icon-StoreRequisition',
        },
        {
          path: '/inventory/adjustment',
          name: 'Adjustment',
          icon: 'Inventory/Icon-Adjustment',
        },
        {
          path: '/inventory/journal',
          name: 'Journal',
          icon: 'Inventory/Icon-GeneralJournal',
        },
        {
          path: '/inventory/ledger',
          name: 'Ledger',
          icon: 'Inventory/Icon-GeneralLedger',
        },
        {
          path: '/inventory/meal-coupon',
          name: 'Meal Coupon',
          icon: 'Inventory/Icon-InitialStock',
        }
      ],
      Outlet: [
        {
          path: '/outlet/order-taker',
          name: 'Order Taker',
          icon: 'Inventory/Icon-InitialStock',
        }
      ],

    };

    if (state.currentModule) {
      return submoduleList[state.currentModule];
    }

    return state.currentModule;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
