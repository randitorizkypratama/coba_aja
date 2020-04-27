<template>
  <div>
    <q-layout view="HHh LpR fFf">
      <q-header elevated>
        <q-toolbar class="bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 50 50"
            width="44"
            height="44"
            class="q-ml-md q-mr-auto"
          >
            <path fill="none" d="M0 0h50v50H0z" />
            <g fill="#fefefe">
              <path
                d="M35 15v4h7c3 0 3 4 0 4h-7v12h5v-8h5c6-1 6-12-1-12h-9zM6 15l4 14 4-14h6l-7 20H7L0 15zM21 15h5v8h7v5h-7v7h-5z"
              />
            </g>
          </svg>

          <q-btn flat round icon="apps">
            <q-menu content-class="menu-submodule" :offset="[0, 5]" auto-close>
              <ul class="q-pa-md">
                <li v-for="menuItem in submoduleMenu" :key="menuItem.name">
                  <router-link
                    :to="menuItem.path"
                    class="column items-center justify-center text-center full-height"
                  >
                    <img
                      :src="require(`~/app/icons/${menuItem.icon}.svg`)"
                      width="50"
                      height="50"
                    />

                    {{ menuItem.name }}
                  </router-link>
                </li>
              </ul>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-drawer
        v-model="rightDrawer"
        side="right"
        bordered
        :width="50"
        persistent
      >
        <div class="column full-height">
          <q-list padding>
            <q-item
              clickable
              v-ripple
              class="q-px-sm"
              @click="reportDrawer = true"
            >
              <q-item-section class="items-center">
                <img
                  :src="require('~/app/icons/Icon-Report-List.svg')"
                  height="30px"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-list padding class="q-mt-auto q-mb-lg">
            <q-item clickable v-ripple @click="rightDrawer = false">
              <q-item-section>
                <q-icon name="arrow_forward_ios" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-drawer>
    </q-layout>

    <q-layout v-if="reportData">
      <q-drawer
        side="right"
        v-model="reportDrawer"
        overlay
        behavior="mobile"
        :width="360"
      >
        <q-toolbar class="justify-between shadow-2">
          <span class="text-weight-medium">
            {{ reportData.title }} Report List
          </span>
          <q-btn flat round icon="close" @click="reportDrawer = false" />
        </q-toolbar>

        <div class="q-pa-lg">
          <SInput label-text="Search" v-model="reportFilter" />

          <STable
            :columns="tableHeaders"
            :data="reportData.reports"
            hide-bottom
            :filter="reportFilter"
            @row-click="onRowClick"
          />
        </div>
      </q-drawer>

      <q-page-sticky position="bottom-right" :offset="[18, 28]">
        <q-btn
          v-if="!rightDrawer"
          fab
          icon="chevron_left"
          color="primary"
          @click="rightDrawer = true"
        />
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api';
import storeModule from '~/store';
import { tableHeaders } from './tables/reportList.table';

export default defineComponent({
  setup(_, { root }) {
    const rightDrawer = ref(true);
    const reportDrawer = ref(false);
    const reportData = ref(null);
    const reportFilter = ref('');
    const { submoduleMenu } = storeModule('layout').useGetters([
      'submoduleMenu',
    ]);

    watch(
      () => root.$route,
      (route) => {
        const { reportList } = route.meta;
        rightDrawer.value = !!reportList;
        reportData.value = reportList;

        if (!reportList) {
          rightDrawer.value = false;
        }
      }
    );

    const onRowClick = (_, row) => {
      root.$router.push(row.path);
    };

    return {
      submoduleMenu,
      rightDrawer,
      reportDrawer,
      reportData,
      reportFilter,
      tableHeaders,
      onRowClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-submodule {
  li {
    list-style: none;
    cursor: pointer;
    width: 88px;
    height: 90px;
    margin: 5px;

    &:hover {
      box-shadow: 0px 0px 1px #848282;
      border-radius: 2px;
    }

    a {
      text-decoration: none;
      font-size: 11px;
      line-height: normal;
      color: rgba(0, 0, 0, 0.65);

      img {
        margin-bottom: 4px;
      }
    }
  }

  ul {
    max-width: 320px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
}
</style>
