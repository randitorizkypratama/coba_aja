<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 1100px; max-width: 90vw;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">Recipe</q-toolbar-title>
      </q-toolbar>
      <q-card-section style="height: auto; marginTop: -10px">
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col-5">
                <SInput
                  style="width: 180px; marginTop: -5px"
                  label-text="Category Number"
                  v-model="inputName"
                />
                <SInput
                  style="width: 180px; marginTop: -5px"
                  label-text="Recipe Number"
                  v-model="inputName"
                />
                <SInput
                  style="width: 180px; marginTop: -5px"
                  label-text="Portion"
                  v-model="inputName"
                />
                <SInput
                  style="width: 180px; marginTop: -5px"
                  label-text="Article Number"
                  v-model="inputName"
                />
                <SInput
                  style="width: 180px; marginTop: -5px"
                  label-text="Loss_factor"
                  v-model="inputName"
                />
              </div>
              <div class="col-7">
                <SInput style=" marginTop: -5px" label-text="Category Name" v-model="inputName" />
                <div class="column" style="height: 152px">
                  <div class="col">
                    <SInput style=" marginTop: -5px" label-text="Description" v-model="inputName" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <SInput
                      style=" width: 150px; marginTop: -5px"
                      label-text="Content"
                      v-model="inputName"
                    />
                  </div>
                  <div class="col">
                    <SInput
                      style=" width: 150px; marginTop: -5px"
                      label-text="Quantity"
                      v-model="inputName"
                    />
                  </div>
                </div>
                <SInput style="marginTop: -5px" label-text="Recipe Cost" v-model="inputName" />
              </div>
            </div>
            <q-btn
              style="marginTop: -7px"
              dense
              color="primary"
              icon="plus"
              label="ADD"
              class="q-mt-md full-width"
              @click="onSearch"
            />
          </div>
          <div class="col">
            <q-table
              dense
              style="marginLeft: 10px"
              :class="{ mystickyvirtscrolltable: trueandfalse }"
              :columns="tableHeaders"
              :data="data"
              separator="cell"
              :rows-per-page-options="[10, 13, 16]"
              :virtual-scroll-sticky-size-start="48"
              :pagination.sync="pagination"
              hide-bottom
              @row-click="onRowClick"
            >
              <template #header-cell-fibukonto="props">
                <q-th :props="props" class="fixed-col left">
                  {{
                  props.col.label
                  }}
                </q-th>
              </template>

              <template #body-cell-fibukonto="props">
                <q-td :props="props" class="fixed-col left">
                  {{
                  props.row.fibukonto
                  }}
                </q-td>
              </template>

              <template #header-cell-actions="props">
                <q-th :props="props" class="fixed-col right">
                  {{
                  props.col.label
                  }}
                </q-th>
              </template>

              <template #body-cell-actions="props">
                <q-td :props="props" class="fixed-col right">
                  <q-icon name="more_vert" size="16px">
                    <q-menu auto-close anchor="bottom right" self="top right">
                      <q-list>
                        <q-item clickable v-ripple @click="editItem">
                          <q-item-section>edit</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="confirm = true">
                          <q-item-section>delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-icon>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn @click="$emit('cencel')" flat label="cencel" />
        <q-btn @click="saveData" flat label="OK" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  toRefs,
} from '@vue/composition-api';
import { tableHeaders, data } from '../tables/recipe';
import { watch } from 'fs';
import { Dialog } from 'quasar';
interface State {
  isLoading: boolean;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    selected: { type: [String, Number, Object], required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
    });
    const saveData = () => {
      emit('saveData');
    };
    return {
      saveData,
      tableHeaders,
      data,
      ...toRefs(state),
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },

  components: {
    ModalRecipeNumber: () => import('./ModalRecipeNumber.vue'),
    dialogAcountNumber: () => import('./DialogAcountNumber.vue'),
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

.buttonToggle {
  margin-top: 15px;
}

.inputName {
  width: 500px;
  margin-left: 217px;
}
.articel-number {
  border-radius: 4px;
  border: 1px solid $primary;
  width: 200px;
  span {
    display: inline-block;
    padding: 3px 25px;

    &:first-child {
      border-right: 1px solid $primary;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
}

.UnitConvertion {
  border-radius: 4px;
  border: 1px solid $primary;
  width: 200px;
  span {
    display: inline-block;
    padding: 3px 25px;

    &:first-child {
      border-right: 1px solid $primary;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
