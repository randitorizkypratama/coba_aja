<!-- @format -->

<template>
  <div class="home">
    <NavBar />

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ky from "ky";
import NavBar from "@/components/Navbar.vue";
import fetchData from "@/../utils/api/useFetchCommon";

export default {
  beforeRouteEnter(to, from, next) {
    const local = localStorage.getItem("login");
    if (!local) {
      next({ path: "/" });
    }
    next();
  },
  components: {
    HelloWorld,
    NavBar
  },
  methods: {
    submit() {
      localStorage.removeItem("login");
      this.$router.push("/");
    },
    homie() {
      this.$router.push("/home");
    }
  },

  beforeCreate() {
    const users = JSON.parse(localStorage.getItem("login"));
    const token = JSON.parse(localStorage.getItem("token"));
    fetchData("verifyToken", {
      userInit: users.response.userInit,
      licenseNr: users.response.licNr,
      userToken: token
    }).then(res => {
      if (res.response.iResult == 0) {
        localStorage.setItem(
          "token",
          JSON.stringify(res.response.newUserToken)
        );
      } else {
        localStorage.clear();
        this.$router.push("/");
      }
    });
  }
};
</script>
