import Vue from 'vue';
import Vuex from 'vuex';
import { generateModule } from './wrapper.store';

import layout from '~/layouts/store';

Vue.use(Vuex);

const wrapStore = (store: any) => (namespace: string) =>
  generateModule(store, namespace);

const Store = new Vuex.Store({
  modules: {
    layout,
  },
});

export default wrapStore(Store);
