import { MutationTree, GetterTree } from 'vuex';
import { LayoutState } from '../models/storeModel';
import { SUBMODULE_LIST } from '~/app/constants/submoduleList.constant';

const state: LayoutState = {
  currentModule: null,
};

const mutations: MutationTree<LayoutState> = {
  SET_CURRENT_MODULE(state, currentModule) {
    state.currentModule = currentModule;
  },
};

const getters: GetterTree<LayoutState, any> = {
  submoduleMenu: (state) =>
    state.currentModule
      ? SUBMODULE_LIST[state.currentModule]
      : state.currentModule,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
