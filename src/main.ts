import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const authData = localStorage.getItem("login");
console.log(authData);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
