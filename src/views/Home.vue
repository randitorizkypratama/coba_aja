<template>
  <div class="home">
    <!-- <v-app-bar app color="primary" dark>
      <v-img max-height="77" width="37" src="../assets/logoVHP.svg" alt="VHP Logo"></v-img>
    </v-app-bar>-->
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->

      <!-- <v-toolbar-title>Page title</v-toolbar-title> -->
      <v-avatar tile>
        <img src="../assets/logoVHP.svg" @click="homie" />
      </v-avatar>

      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="submit">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>-->

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title @click="submit">Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>-->

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ky from "ky";

export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("login")) {
      next({ path: "/" });
    }
    next();
  },
  name: "Home",
  data: () => ({
    // drawer: false
  }),
  components: {
    HelloWorld
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