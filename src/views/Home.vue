<template>
  <div class="home">
    <NavBar />

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    HelloWorld,
    NavBar
  }
};
</script>
