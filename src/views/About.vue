<!-- @format -->

<template>
  <v-app id="inspire" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" v-bind:style="{ backgroundColor: backgroundC }">
              <v-row>
                <v-col cols="12">
                  <v-img
                    class="logovhp mt-5 mb-5 mx-auto"
                    width="70"
                    src="../assets/logo_e1VHP.svg"
                  />
                  <h3 class="font-weight-bold">Visual Hotel Program</h3>
                </v-col>
              </v-row>
              <v-alert v-if="error" type="error">Invalid username and password</v-alert>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    name="email"
                    type="text"
                    v-model="users.email"
                    :error-messages="emailErrors"
                    required
                    outlined
                  />
                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                    v-model="users.password"
                    required
                    outlined
                  />
                  <v-select
                    v-model="users.defaultSelected"
                    :items="items"
                    item-text="label"
                    item-value="value"
                    label="Language"
                    required
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="mb-5 mt-n3 font-weight-bold"
                  color="primary"
                  block="true"
                  @click="submit"
                >Log In</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <p class="copyright">Copyright by PT. Supranusa Sindata</p>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import loginData from "@/../utils/api/useFetchLogin";
import backgroundUrl from "../assets/sign-in-bg.jpg";
import ky from "ky";
import { setToken, setLogin } from "@/../utils/local-storage";
export default {
  beforeRouteEnter(to, from, next) {
    const local = JSON.parse(localStorage.getItem("login"));
    const login = local !== null ? local.response.iResult : "err";
    if (login == 0) {
      next({ path: "home" });
    }
    next();
  },

  props: {
    source: String
  },

  data() {
    return {
      users: {
        password: "",
        defaultSelected: "ENG",
        email: ""
      },
      select: null,
      items: [],
      backgroundUrl,
      backgroundC: "rgba(255, 255, 255, 0.4)",
      error: false
    };
  },

  methods: {
    submit() {
      loginData("loginAuth", this.users).then(res => {
        if (res.response.iResult == 0) {
          setLogin(res);
          setToken(res.response.userToken);
          this.$router.push("/home");
        } else {
          this.error = true;
        }
      });
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
      this.select = null;
    }
  },
  beforeCreate() {
    loginData("loadLanguages", { iCase: 0 }).then(res => {
      const lng = res.response.tLanguages["t-languages"];
      for (const i in lng) {
        this.items.push({
          value: lng[i]["country-id"],
          label: lng[i]["country-name"]
        });
      }
    });
  }
};
</script>

<style scoped>
.copyright {
  padding-top: 50px;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  opacity: 0.75;
  margin-left: 558px;
}

.v-btn {
  box-shadow: 0 4px 8px 0 rgba(24, 144, 255, 0.37);
  text-transform: capitalize;
  border-radius: 30px;
  height: 55px;
  font-size: 16px;
}

.v-btn:hover {
  box-shadow: 0 8px 16px 0 rgba(24, 144, 255, 0.37);
  border-radius: 30px;
  text-transform: capitalize;
  font-size: 16px;
}
</style>
