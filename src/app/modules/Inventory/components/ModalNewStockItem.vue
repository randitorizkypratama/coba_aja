<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 1100px; max-width: 90vw;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">New</q-toolbar-title>
      </q-toolbar>
      <q-card-section style="height: 400px">
        <template>
          <SInput
            style="width: 500px; marginLeft: 195px"
            label-text="Name"
            v-model="articleNumber"
            unmasked-value
          />
        </template>
        <q-splitter v-model="splitterModel" style="height: 300px; width: 900px">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical active-color="primary" indicator-color="primary">
              <q-tab name="category" label="Category" />
              <q-tab name="UnitPrice" label="Unit & Price" />
              <q-tab name="Additional" label="Additional Info" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel style="marginTop: -10px" name="category">
                <SSelect
                  label-text="Main Group"
                  :options="subMain.main"
                  v-model="subMain.mains"
                  style="width: 200px"
                  @input="clickMainGrup"
                />
                <SSelect
                  label-text="Sub Group"
                  :options="subGroup.sub"
                  v-model="subGroup.subs"
                  style="width: 200px"
                  @input="clickSubGroup"
                />
                <div class="articel-number">
                  <span>{{ totalBudget }}</span>
                  <span>0</span>
                </div>
                <q-btn-toggle
                  v-model="model"
                  style="marginTop: 15px"
                  toggle-color="primary"
                  :options="[
        {label: 'No', value: 'no'},
        {label: 'Yes', value: 'yes'},
      ]"
                />
              </q-tab-panel>

              <q-tab-panel name="UnitPrice">
                <div class="q-pa-md" style="marginLeft: -15px; marginTop: -25px">
                  <div class="q-gutter-md row items-start">
                    <SInput
                      style="width: 150px"
                      label-text="Delivery Unit"
                      v-model="articleNumber"
                      mask="##-##-####"
                      unmasked-value
                      placeholder="Box"
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Mess Unit"
                      v-model="articleNumber"
                      mask="##-##-####"
                      unmasked-value
                      placeholder="Kg"
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Recipe Unit"
                      v-model="articleNumber"
                      mask="##-##-####"
                      unmasked-value
                      placeholder="Gram"
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Recipe Number"
                      v-model="modelRecipeNumber"
                      unmasked-value
                      @click.prevent="modalRecipe"
                    />
                  </div>
                  <div class="row">
                    <div class="col">
                      Unit Convertion
                      <SInput
                        style="width: 150px;"
                        label-text="Language.Delivery_unit_conv"
                        v-model="articleNumber"
                        unmasked-value
                      />
                      <SInput
                        style="width: 150px;"
                        label-text="Language.Delivery_unit_conv"
                        v-model="articleNumber"
                        unmasked-value
                      />
                    </div>
                    <div class="col">
                      Unit Price
                      <SInput
                        style="width: 150px;"
                        label-text="Actual Purchase Price"
                        v-model="articleNumber"
                        unmasked-value
                      />
                      <SInput
                        style="width: 150px;"
                        label-text="Last Price"
                        v-model="articleNumber"
                        unmasked-value
                      />
                      <SInput
                        style="width: 150px;"
                        label-text="Average Purchase Price"
                        v-model="articleNumber"
                        unmasked-value
                      />
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="Additional">
                <SInput
                  style="width: 150px;"
                  label-text="Min Stock"
                  v-model="articleNumber"
                  unmasked-value
                />
                <SInput
                  style="width: 150px;"
                  label-text="Max Stock"
                  v-model="articleNumber"
                  unmasked-value
                />
                <SInput
                  style="width: 150px;"
                  label-text="Account Number For Direct Issue Outgoing"
                  v-model="modelAccountNumber"
                  unmasked-value
                  @click.prevent="dialogAcountNumber"
                />
                <q-btn-toggle
                  v-model="model2"
                  style="marginTop: 15px"
                  toggle-color="primary"
                  :options="[
        {label: 'No', value: 'no'},
        {label: 'Yes', value: 'yes'},
      ]"
                />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="cencel" v-close-popup />
        <q-btn @click="saveData" flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
    <ModalRecipeNumber :dialog="dialogArticel" @onDialog="onDialog1" @onRowRecipe="onRowRecipe" />
    <dialogAcountNumber :dialog="dialogAcount" @onDialog="onDialog2" @onRowAccount="onRowAccount" />
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
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
interface State {
  isLoading: boolean;
  totalBudget: number;
  columns: { month: string; actual: string; budget: string }[];
  splitterModel: number;
  model: any;
  model2: any;
  tab: string;
  subMain: any;
  subGroup: any;
  article: any;
  dialogArticel: boolean;
  dialogAcount: boolean;
  modelRecipeNumber: any;
  modelAccountNumber: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
      splitterModel: 20,
      totalBudget: 0,
      columns: [],
      model: 'no',
      model2: 'no',
      tab: 'category',
      modelRecipeNumber: '',
      modelAccountNumber: '',
      subMain: {
        main: '',
        mains: null,
      },
      subGroup: {
        sub: '',
        subs: null,
      },
      article: '',
      dialogArticel: false,
      dialogAcount: false,
    });
    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    function clickMainGrup() {
      async function asyncCall() {
        const dataSub = await Promise.all([
          $api.stockItem.getInvSubGroup({ mainNr: state.subMain.mains.value }),
        ]);
        state.subGroup.sub = mapGroup(dataSub[0], 'bezeich', 'zwkum');
      }
      asyncCall();
    }
    function saveData() {
      console.log('sukses1234', 'sukses');
    }
    function clickSubGroup() {
      async function asyncCall() {
        const dataArticle = await Promise.all([
          $api.stockItem.getInvArtNo({
            pvILanguage: 1, // buat default value = 1
            caseType: 2, // buat default value = 2
            inpInt: state.subMain.mains.value, // zwkum - SUB GROUP
            inpInt2: state.subGroup.subs.value, // endkum - MAIN GROUP
            inpChar: ' ', // buat default value = “ ”
          }),
        ]);
        state.totalBudget = dataArticle[0];
      }
      asyncCall();
    }
    function onRowRecipe(row) {
      state.modelRecipeNumber = row.kategorie;
    }

    function onRowAccount(row) {
      state.modelAccountNumber = row.fibukonto;
    }
    function modalRecipe() {
      state.dialogArticel = true;
    }
    function dialogAcountNumber() {
      state.dialogAcount = true;
    }
    onMounted(async () => {
      const dataGrop = await Promise.all([$api.stockItem.getInvMainGroup()]);
      state.subMain.main = mapGroup(dataGrop[0], 'bezeich', 'endkum');
    });

    const onDialog1 = (val) => {
      state.dialogArticel = val;
    };

    const onDialog2 = (val) => {
      state.dialogAcount = val;
    };

    return {
      onDialog1,
      saveData,
      onDialog2,
      dialogModel,
      onRowRecipe,
      onRowAccount,
      clickMainGrup,
      clickSubGroup,
      modalRecipe,
      dialogAcountNumber,
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
