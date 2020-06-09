<template>
  <q-layout>
    <q-page-container>
      <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <q-card>
              <q-card-section>
                <div style="text-align: center">
                  <q-img
                    class="logovhp mt-5 mb-5 mx-auto"
                    style="height: 100px; max-width: 100px"
                    src="../../assets/logo_e1VHP.svg"
                  />
                  <h6 class="font-weight-bold">Visual Hotel Program</h6>
                </div>
                <q-form class="q-gutter-md" @submit="doLogin">
                  <q-input dense square filled clearable v-model="userName" type="email" label="Username" />
                  <q-input dense square filled clearable v-model="userPswd" type="password" label="Password" />
                  <SSelect
                    dense
                    clearable
                    label-text="Language"
                    :options="searches.langs"
                    v-model="countryId"
                  />
                  <q-card-actions class="q-px-md">
                    <q-btn unelevated color="light-blue-7" size="md" class="full-width" label="Login" type="submit" />
                  </q-card-actions>
                </q-form>
              </q-card-section>
              <q-card-section class="text-center q-pa-none" />
            </q-card>
          </div>
          <p class="text-black-6 text-center">Copyright by PT. Supranusa Sindata</p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { setUsername } from '~/app/helpers/getCredentials.helpers';

const mapSelectItems = (items) =>
  items
    ? items.map((item) => ({
        label: item['country-name'],
        value: item['country-id'],
      }))
    : [];

export default defineComponent({
  setup(_, { root: { $api, $router, $q } }) {

    const state = reactive({
      isFetching: true,
      userName: null,
      userPswd: null,
      countryId: null as any,
      searches: {
        langs: [],
      },
      dialog: false,
    });

    onMounted(async () => {
      const resLangs = await $api.loginAuth.getLanguages();
      state.searches.langs = mapSelectItems(resLangs);
      state.isFetching = false;
    });

    const doLogin = () => {
      async function asyncCall() {
        const resCredentials = await Promise.all([
          $api.loginAuth.getLoginAuth({
            countryId: state.countryId.value,
            userName: state.userName,
            userPswd: state.userPswd,
          }),
        ]);
        /*const resCredentials = await $api.loginAuth.getLoginAuth({
          countryId: state.countryId.value,
          userName: state.userName,
          userPswd: state.userPswd,
        })*/
        if (resCredentials[0].iResult == 0) {
          localStorage.setItem('credentials', JSON.stringify(resCredentials[0]));
          setUsername(state.userName!);
          $router.push('/home');
        } else {
          $q.notify({
            position: 'top',
            timeout: 2000,
            message: 'Incorrect username/password',
            color: 'red',
          });
        }
      }
      asyncCall();
    };

    return {
      ...toRefs(state),
      doLogin,
    };
  },
});
</script>

<style>
.q-card {
  width: 360px;
  background-color: rgba(255, 255, 255, 0.4);
}
.q-page {
  background: lightblue url('../../assets/sign-in-bg.jpg') no-repeat fixed;
}
</style>
