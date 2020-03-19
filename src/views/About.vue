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
              <!-- <div>
                <v-alert type="error">I'm an error alert.</v-alert>
              </div>-->
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
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    id="email"
                  />

                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                    v-model="users.password"
                    :error-messages="passwordErrors"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    id="password"
                  />
                  <v-select
                    v-model="defaultSelected"
                    :items="items"
                    item-text="label"
                    item-value="value"
                    :error-messages="selectErrors"
                    label="Language"
                    required
                    @change="$v.select.$touch()"
                    @blur="$v.select.$touch()"
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
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import loginData from "@/vhp-modules/login/utils/login";
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
  mixins: [validationMixin],

  props: {
    source: String
  },

  validations: {
    password: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required }
  },

  data() {
    return {
      users: {
        password: "",
        email: ""
      },
      select: null,
      defaultSelected: {
        label: "ENGLISH",
        value: "ENG"
      },
      items: [],
      backgroundUrl,
      backgroundC: "rgba(255, 255, 255, 0.4)",
      error: false
    };
  },

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("password must be at most 10 characters long");
      !this.$v.password.required && errors.push("password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      loginData("loginAuth", this.users).then(res => {
        if (res.response.iResult == 0) {
          setLogin(res);
          // localStorage.setItem("login", JSON.stringify(res));
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
    (async () => {
      const language = await ky
        .post(
          "http://54.251.169.160:8080/logserver/rest/loginServer/loadLanguages",
          {
            json: {
              request: {
                iCase: "0"
              }
            }
          }
        )
        .json();

      // console.log(language.response.tLanguages["t-languages"], "language");
      const tempDate = language.response.tLanguages["t-languages"];
      for (let i = 0; i < tempDate.length; i++) {
        const element = tempDate[i];
        this.items.push({
          value: element["country-id"],
          label: element["country-name"]
        });
        // this.items.push(element["country-name"]);
      }

      return this.items;
      //=> `{data: '🦄'}`
    })();
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
