<template>
  <div class="home">
    <NavBar />
    <!-- <div>{{author}}</div>
    <div>{{mencariId(2).jenis}}</div>
    <div>{{mencariId(2).id}}</div>-->

    <HelloWorld />
    <div>{{author}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ky from "ky";
import NavBar from "@/components/Navbar.vue";
// import { mapState, mapGetters } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    const local = localStorage.getItem("login");
    if (!local) {
      next({ path: "/" });
    }
    next();
  },

  // computed: {
  //   ...mapState(["author"]),
  //   ...mapGetters(["mencariId"])
  // },

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
    (async () => {
      const parsed = await ky
        .post("http://ws1.e1-vhp.com/VHPWebBased/rest/Common/verifyToken", {
          json: {
            request: {
              userInit: users.response.userInit,
              licenseNr: users.response.licNr,
              userToken: token
            }
          }
        })
        .json();
      if (parsed.response.iResult == "0") {
        localStorage.setItem(
          "token",
          JSON.stringify(parsed.response.newUserToken)
        );
      } else {
        localStorage.clear();
        this.$router.push("/");
      }
    })();
  }
};
</script>