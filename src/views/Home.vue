<template>
  <div class="home">
    <v-app-bar app color="primary" dark>VHP</v-app-bar>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("login")) {
      next({ path: "/" });
    }
    next();
  },
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
