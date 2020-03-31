import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify.plugins';
import VueCompositionApi from '@vue/composition-api';
import { APIPlugin } from './plugins/api.plugins';

// import store from './store'

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(APIPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
