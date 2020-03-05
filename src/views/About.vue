<template>
  <v-app id="inspire" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card
              class="elevation-12"
              v-bind:style="{ backgroundColor: backgroundC }"
            >
              <v-img
                height="50"
                width="50"
                src="../assets/logo_e1VHP.svg"
              ></v-img>
              <v-card-title>Visual Hotel Program</v-card-title>
              <!-- <div>
                <v-alert type="error">I'm an error alert.</v-alert>
              </div> -->
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    name="email"
                    type="text"
                    v-model="email"
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
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    id="password"
                  />
                  <v-select
                    v-model="select"
                    :items="items"
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
                <v-btn color="primary" block="true" @click="submit"
                  >Login</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
              <span>Copyright by PT. Supranusa Sindata</span>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import backgroundUrl from "../assets/sign-in-bg.jpg";
import ky from "ky";
export default {
  mixins: [validationMixin],

  props: {
    source: String
  },

  validations: {
    password: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required }
  },

  data: () => ({
    password: "",
    email: "",
    select: null,
    items: ["ENGLISH", "INDONESIA"],
    backgroundUrl,
    backgroundC: "rgba(255, 255, 255, 0.4)"
  }),

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
      (async () => {
        const parsed = await ky.get("http://localhost:3000/users").json();
        if (
          parsed[0].user == this.email &&
          parsed[0].password == this.password
        ) {
          this.$router.push("/home");
        } else {
          console.log("err");
        }
      })();
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.email = "";
      this.select = null;
    }
  }
};
</script>
