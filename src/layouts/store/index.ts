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
