<template>
  <div>
    <div>
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
                      v-model="recipe.CategoryNumber"
                    />
                    <SInput
                      style="width: 180px; marginTop: -5px"
                      label-text="Recipe Number"
                      v-model="recipe.RecipeNumber"
                    />
                    <SInput
                      style="width: 180px; marginTop: -5px"
                      label-text="Portion"
                      v-model="recipe.Portion"
                    />
                    <SInput
                      style="width: 180px; marginTop: -5px"
                      label-text="Article Number"
                      v-model="recipe.ArticelNumber"
                      @click.prevent="dialogOnClick"
                    />
                    <SInput
                      style="width: 180px; marginTop: -5px"
                      label-text="Loss Factor"
                      v-model="recipe.LoodFactor"
                    />
                  </div>
                  <div class="col-7">
                    <SInput
                      style=" marginTop: -5px"
                      label-text="Category Name"
                      v-model="recipe.CategoryName"
                    />
                    <div class="column" style="height: 152px">
                      <div class="col">
                        <SInput
                          style=" marginTop: -5px"
                          label-text="Description"
                          v-model="recipe.Description"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <SInput
                          style=" width: 150px; marginTop: -5px"
                          label-text="Content"
                          v-model="recipe.content"
                        />
                      </div>
                      <div class="col">
                        <SInput
                          style=" width: 150px; marginTop: -5px"
                          label-text="Quantity"
                          v-model="recipe.Quantity"
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
                  @click="add"
                />
              </div>
              <div class="col">
                <q-table
                  dense
                  style="marginLeft: 10px"
                  :class="{ verticalTable: pageColumns }"
                  :columns="modalAdd"
                  :data="dataTable"
                  separator="cell"
                  :rows-per-page-options="[10, 13, 16]"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination.sync="pagination"
                  hide-bottom
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
                            <q-item clickable v-ripple @click="confirmDelete(props.row)">
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
    </div>
    <div>
      <q-dialog v-model="dialogModel">
        <q-card :class="{widthModalArrt: class2}">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Article Number</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <q-option-group
              size="xs"
              v-model="group"
              v-on:click="update"
              :options="options"
              color="primary"
              inline
            />
            <q-table
              dense
              :class="{ mystickyvirtscrolltable : page }"
              :loading="isLoading"
              :columns="columns"
              :data="data"
              separator="cell"
              :rows-per-page-options="[0]"
              :pagination.sync="pagination"
              hide-bottom
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
            </q-table>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn color="primary" label="OK" @click="dialogModel = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="confirm">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="primary" text-color="white" />
            <span class="q-ml-sm">{{modify}}</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  watch,
  toRefs,
} from '@vue/composition-api';
import { tableHeaders, stockArticle, Recipe, modalAdd } from '../tables/recipe';
import { Dialog } from 'quasar';
interface State {
  isLoading: boolean;
  dialogModel: boolean;
  group: any;
  options: any;
  columns: any;
  data: any;
  page: boolean;
  trueandfalse: any;
  className: any;
  class2: boolean;
  recipe: any;
  dataTable: any;
  pageColumns: boolean;
  confirm: boolean;
  modify: string;
  idRecid: any;
  idDialog: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    selected: { type: [String, Number, Object], required: true },
    accountId: { type: Object, default: null },
    idDialog: { type: String, default: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
      dialogModel: false,
      confirm: false,
      group: '',
      options: [
        {
          label: 'Stock Article',
          value: '1',
        },
        {
          label: 'Recipe',
          value: '2',
        },
      ],
      columns: [],
      data: [],
      page: false,
      trueandfalse: false,
      className: [],
      class2: false,
      recipe: {
        CategoryNumber: '',
        RecipeNumber: '',
        Portion: '',
        ArticelNumber: '',
        LoodFactor: '',
        CategoryName: '',
        Description: '',
        content: '',
        Quantity: '',
        Arrticel: '',
      },
      dataTable: [],
      pageColumns: false,
      idRecid: '',
      modify: '',
      idDialog: '',
    });

    const StockArticle = async () => {
      state.isLoading = true;
      state.trueandfalse = true;
      state.columns = stockArticle;
      state.class2 = true;

      const getData = await Promise.all([$api.inventory.addRecipePrepare()]);
      state.data = getData[0].tLArtikel['t-l-artikel'];
      if (state.data.length < 14) {
        state.isLoading = false;
      }
      if (state.data.length > 14) {
        state.page = true;
        state.isLoading = false;
      }
    };

    const recipe = async () => {
      state.isLoading = true;
      state.trueandfalse = false;
      state.columns = Recipe;
      state.class2 = false;
      const getData = await Promise.all([$api.inventory.addRecipePrepare()]);
      state.data = getData[0].tHRezept['t-h-rezept'];
      if (state.data.length < 14) {
        state.isLoading = false;
      }
      if (state.data.length > 14) {
        state.page = true;
        state.isLoading = false;
      }
    };

    watch(
      () => state.group,
      (val) => {
        if (val == '1') {
          state.data = [];
          state.page = false;
          StockArticle();
        }
        if (val == '2') {
          state.page = false;
          state.data = [];
          recipe();
        }
      }
    );

    watch(
      () => props.idDialog,
      (idDialog, prev) => {
        if (idDialog && idDialog !== prev) {
          state.idDialog = idDialog;
        }
      }
    );
    const GET_DATA = async (accountId) => {
      const [getData, getDataNumber] = await Promise.all([
        $api.inventory.chgRecipePrepareL({
          pvILanguage: 1,
          hArtnr: accountId.artnrrezept,
          DESCRIPTION: accountId.bezeich,
        }),
        $api.inventory.chgRecipeRetKatnr({
          katnr: accountId.kategorie,
        }),
      ]);
      state.recipe.CategoryNumber = getData.katnr;
      state.recipe.RecipeNumber = getData.tHRezept['t-h-rezept'][0].artnrrezept;
      state.recipe.Portion = getData.portion;
      state.recipe.CategoryName = getData.katbezeich;
      state.recipe.Description = getData.hBezeich;
      state.dataTable = getData.sRezlin['s-rezlin'];
      if (getData.sRezlin['s-rezlin'].length > 14) {
        state.pageColumns = true;
      }
    };

    watch(
      () => props.accountId,
      (accountId, prev) => {
        if (accountId && accountId !== prev) {
          GET_DATA(accountId);
        }
      }
    );

    const dialogOnClick = (val) => {
      state.dialogModel = true;
      state.group = '1';
    };

    const saveData = async () => {
      if (state.idDialog == '1') {
      }
      if (state.idDialog == '2') {
        await Promise.all([
          $api.inventory.chgRecipeSave({
            recId: state.idRecid['h-recid'],
            katnr: state.recipe.CategoryNumber,
            portion: state.recipe.Portion,
            'h-bezeich': state.recipe.Description,
            katbezeich: state.recipe.CategoryName,
          }),
          $api.inventory.checkTime({
            caseType: 2,
            idTable: state.idRecid['h-recid'],
          }),
        ]);
      }
      emit('save');
    };
    const add = () => {
      $api.inventory.addRecipeSave({
        sRezlin: {
          's-rezlin': [
            {
              artnr: state.recipe.ArticelNumber,
              bezeich: state.recipe.Description,
              sUnit: state.recipe.Arrticel.herkunft,
              masseinheit: state.recipe.Arrticel.masseinheit,
              menge: state.recipe.Quantity,
              cost: '28.78',
              vkPreis: state.recipe.Arrticel['vk-preis'],
              inhalt: state.recipe.content,
              lostfact: state.recipe.LoodFactor,
              recipeFlag: 'No',
            },
          ],
        },
      });
      setTimeout(() => {
        const data = $api.inventory.addRecipeCreateRezlin({
          's-artnr': state.recipe.ArticelNumber,
          qty: state.recipe.Quantity,
          'price-type': 0,
          descript: state.recipe.Description,
          inhalt: state.recipe.content,
          lostfact: state.recipe.LoodFactor,
          'vk-preis': state.recipe.Arrticel['vk-preis'],
          recipetype: 0,
        });
      }, 5000);
      $api.inventory.addRecipeCalCost({
        pArtnr: state.recipe.ArticelNumber,
        menge: state.recipe.Quantity,
      });
    };
    const onRowClick = (e, val) => {
      state.recipe.ArticelNumber = val.artnr;
      state.recipe.Arrticel = val;
    };

    const confirmDelete = async (val) => {
      state.confirm = true;
      state.idRecid = val;
      state.modify = `Do you really want to delete ${val['h-recid']} ${val.artnr} ${val.bezeich}`;
    };

    const deleteData = async () => {
      await Promise.all([
        $api.inventory.chgRecipeDelete({
          hRecid: state.idRecid['h-recid'],
        }),
        $api.inventory.checkTime({
          caseType: 3,
          idTable: state.idRecid['h-recid'],
        }),
      ]);
    };

    return {
      add,
      confirmDelete,
      deleteData,
      modalAdd,
      onRowClick,
      dialogOnClick,
      saveData,
      tableHeaders,
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
.mystickyvirtscrolltable {
  height: 410px;
}

.verticalTable {
  height: 405px;
}

.widthModalArrt {
  width: 700px;
  max-width: 90vw;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  background-color: #fff;
}

.my-sticky-virtscroll-table thead tr th {
  position: sticky;
  // z-index: 1
}
.my-sticky-virtscroll-table thead tr:last-child th {
  top: 48px;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  top: 0;
}
</style>
