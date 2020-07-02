<template>
  <div>
    <div>
      <q-dialog seamless v-model="dialog">
        <q-card style="width: 500px;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Type Of Store Requisition</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="actualQuantity">Actual Quantity</div>
            <div class="q-pa-md">
              <q-option-group
                size="xs"
                :options="options"
                label="Notifications"
                type="radio"
                v-model="group"
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="close" label="Cancel" />
            <q-btn @click="select" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="dialogTransfer" :position="position">
        <q-card style="width: 820px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Inter Store Transfer</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <SInput
                style="margin-right: 10px; width: 180px;"
                label-text="Delivery Number"
                v-model="deliveryNumber"
                disable
                unelevated
              />
              <SSelect
                style="margin-right: 10px; width: 180px;"
                label-text="From Store"
                :options="header.fromStore"
                v-model="header.fromStore1"
              />
              <SSelect
                v-if="group == '1'"
                style="margin-right: 10px; width: 180px;"
                label-text="To Store"
                :options="header.toStore1"
                v-model="header.toStore"
              />
              <SInput
                v-else
                style="margin-right: 10px; width: 180px;"
                label-text="Account"
                @click.prevent="clickAccount"
                v-model="header.account"
              />
            </div>
            <div>
              <q-splitter v-model="splitterModel">
                <template v-slot:before>
                  <q-tabs v-model="tab" vertical active-color="primary" indicator-color="primary">
                    <q-tab name="mails" label="Header" />
                    <q-tab name="alarms" label="item" />
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
                    <q-tab-panel name="mails" :style="heightSplitter">
                      <div class="row">
                        <SSelect
                          style="margin-right: 20px; width: 300px;"
                          label-text="Department"
                          v-model="header.department1"
                          :options="header.department"
                        />
                        <q-checkbox top-label label="Approve" v-model="val" />
                      </div>
                      <v-date-picker v-model="dataDate" :popover="{ visibility: 'click' }">
                        <SInput
                          style="width: 300px;"
                          label-text="Date"
                          slot-scope="{ inputProps }"
                          placeholder="Select Date"
                          readonly
                          v-bind="inputProps"
                          clearable
                          @click.prevent="preventDate"
                        ></SInput>
                      </v-date-picker>
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <div style="margintop: -20px;" class="row">
                        <div class="col">
                          <SInput
                            style="margin-right: 20px; width: 200px;"
                            label-text="Stock Articel Name"
                            v-model="header.articelNumber"
                            @click.prevent="clickArticelNumber"
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Unit And Content Per Unit"
                            v-model="header.unitAndContent"
                            disable
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Stock Onhand"
                            v-model="stockOnhand"
                            disable
                          />
                          <SInput
                            unelevated
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Quantity Mess Unit"
                            v-model="quantityMessUnit"
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Price"
                            v-model="dataPrice"
                            disable
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Amount"
                            v-model="dataAmount"
                            disable
                          />
                          <q-btn
                            style="width: 200px; margintop: -5px; height: 25px;"
                            dense
                            max-height="10"
                            color="primary"
                            label="Add"
                            @click="clickAdd"
                          />
                        </div>
                        <div class="col" id="table-store-requisition">
                          <STable
                            :loading="isFetching"
                            :columns="tableDialogNew"
                            :data="dataTableStore"
                            :rows-per-page-options="[0]"
                            :pagination.sync="pagination"
                            hide-bottom
                            class="table-accounting-date2"
                            :style="heightTableStoreTransfer"
                            @row-click="onRowClick"
                          />
                        </div>
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="close" label="Cancel" />
            <q-btn @click="select1" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="selectStockArticel">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Select Stock Articel</q-toolbar-title>
          </q-toolbar>
          <q-card-section style="height: 300px; max-height: 50vh;">
            <div class="row">
              <div class="col-2" id="select-articel-input">
                <SInput v-model="inputselectStockArticel" />
                <q-option-group
                  size="xs"
                  v-model="groupStockArticel"
                  :options="optionsStockArticel"
                  color="primary"
                />
              </div>
              <q-separator vertical />
              <div id="select-articel-table" class="col-9">
                <STable
                  :loading="isFetching"
                  :columns="tableDialogStockArticel"
                  :data="dataStockArticel"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                  class="table-accounting-date"
                  :style="heightSelectStockArticel"
                  @row-click="onRowClicktableStockArticel"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" @click="selectStockArticel = false" />
            <q-btn flat label="Ok" color="primary" @click="onClickStockArticel" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="dialogAccount">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Select Cost Allocations</q-toolbar-title>
          </q-toolbar>
          <q-card-section style="height: 300px; max-height: 50vh;">
            <div class="row">
              <div class="col-2" id="right-cost-alecations">
                <q-option-group
                  size="xs"
                  v-model="groupAlecations"
                  :options="optionsAlecations"
                  color="primary"
                />
              </div>
              <div class="col-3" id="right-cost-alecations">
                <STable
                  :loading="isFetching"
                  :columns="tableCostCenterList"
                  :data="dataCostCenterList"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :style="heightCostAllecations"
                  hide-bottom
                  class="table-accounting-date"
                  @row-click="clickCostAllecations"
                  
                />
              </div>
              <div class="col">
                <STable
                  :loading="isFetching"
                  :columns="tableAllocationsList"
                  :data="dataAllocationsList"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :style="heightAllocationsList"
                  hide-bottom
                  class="table-accounting-date"
                  @row-click="clickCostAllecations2"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" @click="dialogAccount = false" />
            <q-btn flat label="Ok" color="primary" @click="dialogAccount = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  toRefs,
  watch,
} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import {
  tableDialogNew,
  tableDialogStockArticel,
  tableCostCenterList,
  tableAllocationsList,
} from '../tables/storeRequisition';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
import { Notify, date } from 'quasar';
import { type } from 'os';
setupCalendar({
  firstDayOfWeek: 2,
});
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dialogTransfer: { type: Boolean, required: true },
    searches: { type: Array, required: true },
  },
  components: {
    'v-date-picker': DatePicker,
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive({
      dataDate: null as any,
      options: [
        { label: 'Transfer To Other Storage', value: '1' },
        { label: 'Outgoing / Consumed', value: '2', color: 'bat' },
      ],
      group: '1',
      groupStockArticel: '1',
      optionsStockArticel: [
        {
          label: 'Number',
          value: '1',
        },
        {
          label: 'Description',
          value: '2',
        },
      ],
      groupAlecations: '1',
      optionsAlecations: [
        {
          label: 'acctNo',
          value: '1',
        },
        {
          label: 'Description',
          value: '2',
        },
      ],
      pagination: {
        rowsPerPage: 0,
      },
      tab: 'mails',
      splitterModel: 20,
      val: true,
      header: {
        department: [],
        fromStore: [],
        fromStore1: '',
        toStore1: [],
        toStore: '',
        department1: '',
        articelNumber: '',
        unitAndContent: '',
        account: ''
      },
      position: 'top',
      heightSplitter: 'height: auto',
      transdate: '',
      deliveryNumber: null,
      selectStockArticel: false,
      stockOnhand: '0',
      quantityMessUnit: '',
      dataStockArticel: [],
      dataTableStore: [] as any,
      inputselectStockArticel: '',
      dataPrice: '',
      dataAmount: '',
      bilanganPrice: 0,
      heightSelectStockArticel: '',
      heightTableStoreTransfer: '',
      dialogAccount: false,
      dataCostCenterList: [],
      dataAllocationsList: [] as any,
      heightCostAllecations: '',
      heightAllocationsList: ''
    });

    watch(
      () => state.dataDate,
      (date, prev) => {
        if (date && date !== prev) {
          state.heightSplitter = 'height: auto';
        }
      }
    );

    watch(
      () => state.quantityMessUnit,
      (quantityMessUnit, prev) => {
        if (quantityMessUnit && quantityMessUnit !== prev) {
          if (quantityMessUnit == '0') {
            Notify.create({
              message: 'Wrong Quantity',
              color: 'red',
            });
          } else if (quantityMessUnit <= state.stockOnhand) {
            const bilangan = state.bilanganPrice['vk-preis']
                .toString()
                .substr(
                  0,
                  state.bilanganPrice['vk-preis'].toString().lastIndexOf('.') +
                    3
                )
                .replace('.', ''),
              hasil = parseInt(bilangan) * parseInt(state.quantityMessUnit),
              reverse = hasil.toString().split('').reverse().join(''),
              sisa = reverse.substr(2).split('').reverse().join('').length % 3,
              ribuan = reverse
                .substr(2)
                .split('')
                .reverse()
                .join('')
                .substr(sisa)
                .match(/\d{3}/g);
            let rupiah = reverse
              .substr(2)
              .split('')
              .reverse()
              .join('')
              .substr(0, sisa);
            if (ribuan) {
              const separator = sisa ? ',' : '';
              rupiah += separator + ribuan.join(',');
            }
            state.dataAmount = `${rupiah}.${reverse
              .substr(0, 2)
              .split('')
              .reverse()
              .join('')}`;
          } else {
            Notify.create({
              message: 'Wrong Quantity',
              color: 'red',
            });
          }
        }
        if (quantityMessUnit == '') {
          state.dataAmount = '';
        }
      }
    );

    watch(
      () => state.inputselectStockArticel,
      async (groupStockArticel, prev) => {
        if (groupStockArticel && groupStockArticel !== prev) {
          const [GET_DATA] = await Promise.all([
            $api.inventory.apiStoreRequisitionCommon('getHelpInvArticle', {
              currLager: state.header.fromStore1['value'],
              recipe: false,
              sorttype: '0',
              sArtnr: '0',
              sBezeich: ' ',
            }),
          ]);
          const data = GET_DATA.sartnrList['sartnr-list'].map(
            (items, index) => ({
              artnr: items.artnr,
              bezeich: items.bezeich,
              onhand:
                items['anz-anf-best'] +
                items['anz-eingang'] -
                items['anz-ausgang'],
            })
          );
          state.dataStockArticel = data.filter((items: any) => {
            if (state.groupStockArticel == '2') {
              return items.bezeich
                .toLowerCase()
                .includes(state.inputselectStockArticel.toLowerCase());
            }
            if (state.groupStockArticel == '1') {
              return items.artnr
                .toString()
                .includes(state.inputselectStockArticel.toString());
            }
          });
          if (state.dataStockArticel.length < 8) {
            state.heightSelectStockArticel = 'auto';
          } else {
            state.heightSelectStockArticel = 'height: 250px';
          }
        }
      }
    );

    watch(
      () => state.deliveryNumber,
      async (deliveryNumber, prev) => {
        if (deliveryNumber && deliveryNumber !== prev) {
          const [GET_DATA] = await Promise.all([
            $api.inventory.apiStoreRequisition('storeRequestReturnLscheinnr', {
              lscheinnr: state.deliveryNumber,
            }),
          ]);
          if (GET_DATA.outputOkFlag == 'false') {
            Notify.create({
              message: 'Delivery Note already exists',
              color: 'red',
            });
          }
        }
      }
    );

    watch(() => state.groupAlecations,
        async  (groupAlecations, prev) => {
            if (groupAlecations && groupAlecations !== prev) {
              if (groupAlecations == '1') {
                state.dataAllocationsList = state.dataAllocationsList.sort((a, b) => {
                  return parseInt(a.fibu) - parseInt(b.fibu)
                })
                } else {
                const dataAllocationsList = state.dataAllocationsList.sort((a, b) => {
                  if (a.bezeich.toUpperCase() < b.bezeich.toUpperCase()) {
                    return -1
                  }
                })
              }
            }
          }
    )

    const GET_TRANSCODE = async () => {
      let data = [];
      const [GET_DATA, GET_DATA2, GET_DATA3] = await Promise.all([
        $api.inventory.apiStoreRequisition('storeRequestInitDisp'),
        $api.inventory.apiStoreRequisition('storeRequestNewLscheinnr', {
          lscheinnr: `R${state.transdate
            .substring(2)
            .replace('-', '')
            .replace('-', '')}001`,
          s: `R${state.transdate
            .substring(2)
            .replace('-', '')
            .replace('-', '')}`,
          recidLOphdr: data['recidLOphdr'],
        }),
        $api.inventory.apiStoreRequisitionCommon('getHelpInvArticle', {
          currLager: state.header.fromStore1['value'],
          recipe: false,
          sorttype: '0',
          sArtnr: '0',
          sBezeich: ' ',
        }),
      ]);
      data = GET_DATA;
      state.deliveryNumber = GET_DATA2.lscheinnr;
      state.dataStockArticel = GET_DATA3.sartnrList['sartnr-list'].map(
        (items, index) => ({
          artnr: items.artnr,
          bezeich: items.bezeich,
          onhand:
            items['anz-anf-best'] + items['anz-eingang'] - items['anz-ausgang'],
        })
      );
    };

    watch(
      () => state.header.fromStore1,
      (fromStore1, prev) => {
        if (fromStore1 && fromStore1 !== prev) {
          GET_TRANSCODE();
        }
      }
    );

    const preventDate = () => {
      state.heightSplitter = 'height: 380px';
    };

    const bottom = () => {
      console.log('hadfina sayhida');
    };

    const clickArticelNumber = () => {
      state.selectStockArticel = true;
      if (state.dataStockArticel.length < 8) {
        state.heightSelectStockArticel = 'auto';
      } else {
        state.heightSelectStockArticel = 'height: 250px';
      }
    };

    const onClickStockArticel = async () => {
      state.selectStockArticel = false;
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.apiStoreRequisition('storeRequestStockOH', {
          currLager: state.header.fromStore1['value'],
          sArtnr: state.header.articelNumber,
        }),
        $api.inventory.apiStoreRequisition('storeRequestPrepare', {
          userInit: '01',
        }),
      ]);
      state.stockOnhand = GET_DATA.stockOh;
      const [price] = GET_DATA2.tempLArtikel['temp-l-artikel'].filter(
        (items) => {
          return items.artnr
            .toString()
            .includes(state.header.articelNumber.toString());
        }
      );
      const sisa =
        price['vk-preis']
          .toString()
          .substring(0, price['vk-preis'].toString().lastIndexOf('.')).length %
        3;
      let rupiah = price['vk-preis']
        .toString()
        .substring(0, price['vk-preis'].toString().lastIndexOf('.'))
        .substr(0, sisa);
      const ribuan = price['vk-preis']
        .toString()
        .substring(0, price['vk-preis'].toString().lastIndexOf('.'))
        .substr(sisa)
        .match(/\d{3}/g);

      if (ribuan) {
        const separator = sisa ? ',' : '';
        rupiah += separator + ribuan.join(',');
      }

      const bilTerkecil = price['vk-preis']
        .toString()
        .substring(
          price['vk-preis'].toString().lastIndexOf('.'),
          price['vk-preis'].toString().lastIndexOf('.') + 3
        );

      state.dataPrice = rupiah + bilTerkecil;
      state.bilanganPrice = price;
    };

    const clickAdd = async () => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoreRequisitionCommon('getBediener', {
          userNo: '',
          userInit: '01',
        }),
      ]);

      if (state.bilanganPrice['betriebsnr'] == 0) {
        const [getData] = await Promise.all([
          $api.inventory.apiStoreRequisition('storeRequestCreateOpList1', {
            opListArtnr: state.header.articelNumber,
            opListFuellflag: GET_DATA.tBediener['t-bediener'][0]['nr'],
            opListStornogrund: '00000000000000000000',
            currLager: state.header.fromStore1['value'],
          }),
        ]);
        state.dataTableStore.push({
          storageNumber: state.header.fromStore1['value'].toString(),
          sUsername: getData.sUsername,
          sBezeich: getData.sBezeich,
          articelNumber: state.header.articelNumber,
          unitPrice: state.dataPrice,
          onhand: getData.sOnhand,
          quantity: state.quantityMessUnit,
          amount: state.dataAmount,
          date: date.formatDate(state.dataDate, 'DD/MM/YY'),
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          type: state.group == '1' ? 'Transfer Out' : 'Outgoing',
          acctNo: '000000',
        });
        (state.header.articelNumber = ''),
          (state.header.unitAndContent = ''),
          (state.stockOnhand = ''),
          (state.quantityMessUnit = ''),
          (state.dataPrice = ''),
          (state.dataAmount = '');
      } else {
        // const [GET_DATA] = await Promise.all([
        //   $api.inventory.apiStoreRequisition('storeRequestCreateOpList', {
        //     pvILanguage: 1,
        //     pArtnr: state.header.articelNumber,
        //     menge: state.dataPrice,
        //     currLager: state.header.fromStore1['value'],
        //     transdate: state.transdate,
        //     lscheinnr: state.deliveryNumber,
        //     bedienerNr: 1
        //   })
        // ])
        // console.log('sukses', GET_DATA)
      }

      if (state.dataTableStore.length < 10) {
        state.heightTableStoreTransfer = '';
      } else {
        state.heightTableStoreTransfer = 'height: 325px;';
      }
    };

    const apiSelect = async () => {
      const data = await Promise.all([
        $api.inventory.apiStoreRequisition('storeRequestPrepare', {
          userInit: '01',
        }),
      ]);
      state.header.department = mapGroup(
        data[0].tParameters['t-parameters'],
        'vstring',
        'varname'
      );
      state.header.fromStore = mapGroup(
        data[0].tLLager['t-l-lager'],
        'bezeich',
        'lager-nr'
      );
      state.transdate = data[0].transdate;
      if (state.group == '1') {
        state.header.toStore1 = mapGroup(
          data[0].tLLager['t-l-lager'],
          'bezeich',
          'lager-nr'
        );
      } else {
        state.header.toStore1 = [];
      }
    };
    const select = () => {
      emit('select', false, state.group);
      if (state.group == '1') {
        // state.usernameSelect = 'To Store'
      } else {
        // state.usernameSelect = 'Account'
      }
      apiSelect();
      state.deliveryNumber = null;
      state.header.fromStore1 = '';
      state.header.toStore = '';
      state.header.department1 = '';
      state.dataDate = null;
      state.header.articelNumber = '';
      state.header.unitAndContent = '';
      state.stockOnhand = '';
      state.quantityMessUnit = '';
      state.dataPrice = '';
      state.dataAmount = '';
    };
    const close = () => {
      emit('close', false);
    };
    const select1 = () => {
      emit('select1', false);
    };

    const onRowClicktableStockArticel = (a, val) => {
      state.header.articelNumber = val.artnr;
      state.header.unitAndContent = val.bezeich;
    };

    const costAllocations = async () => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoreRequisitionCommon('selectCostDept1')
      ])
      console.log('sukses', GET_DATA)
      state.dataCostCenterList = GET_DATA.costList['cost-list']
      if (state.dataCostCenterList.length < 9 ) {      
        state.heightCostAllecations = 'auto'
        
      } else{
        state.heightCostAllecations = 'height: 270px'
        
      }
    }

    const clickAccount = () => {
      state.dialogAccount = true;
      costAllocations()
    };
    const costAlications = async (val) => {
        const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoreRequisitionCommon('selectCostDept1')
      ])
      state.dataAllocationsList = GET_DATA.allocList['alloc-list'].filter((items) => {
        return items.name.toString().includes(val.num.toString())
      })
      if (state.dataAllocationsList.length < 9) {
        state.heightAllocationsList = 'auto'
      } else {
        state.heightAllocationsList = 'height: 270px'
      }
    }
    const clickCostAllecations = (a, val) => {
      costAlications(val)
    }

    const clickCostAllecations2 = (a, val) => {
      state.header.account = val.fibu
    }

    return {
      tableDialogNew,
      clickAccount,
      clickAdd,
      onClickStockArticel,
      onRowClicktableStockArticel,
      clickArticelNumber,
      tableDialogStockArticel,
      preventDate,
      bottom,
      select1,
      select,
      close,
      tableCostCenterList,
      tableAllocationsList,
      clickCostAllecations,
      clickCostAllecations2,
      ...toRefs(state),
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
#select-articel-input {
  margin-right: 10px
}
#select-articel-table {
  margin-left: 20px
}
#table-store-requisition {
  margin-left: -100px
}
#right-cost-alecations {
  margin-right: 10px
}
.actualQuantity {
  margin-left: 28px;
}
::v-deep .table-accounting-date {
  max-height: 75vh;
  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
}
::v-deep .table-accounting-date2 {
  max-height: 75vh;
  margin-left: -30px;
  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
}
</style>
