<template>
  <div>
  <div class="column justify-between">
    <div class="col-7" style="height: 580px">
        <div class="row">
      <div style="marginLeft: 10px" class="col-4">
        <div class="q-pa-lg">
          <div class="row">
            <SInput
              label-text="PO Number"
              :options="searches.store"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0]['docu-nr']"
              style=" marginRight: 20px; width: 170px"
              disable
            />
            <SInput
              label-text="Created By"
              :options="searches.store"
              style="  width: 170px"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0].besteller"
              disable
            />

            <SInput
              label-text="Department"
              :options="searches.store"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0]['angebot-lief'][0]"
              style="marginTop: -5px; marginRight: 20px; width: 170px"
              disable
            />
            <SInput
              label-text="Supplier"
              :options="searches.store"
              style=" marginTop: -5px; width: 170px"
              v-model="prepare.supplier"
              disable
            />

            <SInput
              label-text="Order Date"
              :options="searches.store"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0].bestelldatum"
              style="marginTop: -5px; marginRight: 20px; width: 170px"
              disable
            />
            <SInput
              label-text="Delivery Date"
              :options="searches.store"
              style=" marginTop: -5px; width: 170px"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0].lieferdatum"
              disable
            />

            <SInput
              label-text="Order Type"
              :options="searches.store"
              v-model="prepare.bestellart"
              style="marginTop: -5px; marginRight: 20px; width: 170px"
              disable
            />
            <SInput
              label-text="Released"
              :options="searches.store"
              style=" marginTop: -5px; width: 170px"
              v-model="prepare.tLOrderhdr['t-l-orderhdr'][0].gedruckt"
              disable
            />
            <SInput
              label-text="Currency"
              :options="searches.store"
              v-model="prepare.currencyScreenValue"
              style="marginTop: -5px; marginRight: 20px; width: 170px"
              disable
            />
          </div>
        </div>
          <div class="q-pa-md" style="max-width: 300px">
            <q-input
              v-model="prepare.comments"
              filled
              type="textarea"
            />
          </div>
      </div>
      <div style="marginLeft: -20px" class="col-8">
        <div class="q-pa-lg">
          <div class="row">
            <SInput
              label-text="Delevery Number"
              :options="searches.store"
              style="width: 155px; marginRight: 20px;"
              v-model="deliveryNumber"
              @click.prevent="dialogDeliveryNumber"
            >
            <q-icon color="primary" 
               name="mdi-magnify" 
               style="
               font-size: 20px; 
               marginRight: -10px; 
               backroundColor: red; 
               marginTop: 3px"/>
            </SInput>
            <SInput
              label-text="Stored"
              :options="searches.store"
              style="width: 155px; marginRight: 20px"
              v-model="storageNumber"
              disable
            />
            <SInput
              label-text="Item Selected"
              :options="searches.store"
              style="width: 300px;"
              v-model="itemSelected"
              disable
            />
            <SInput
              label-text="Delivery Unit"
              :options="searches.store"
              style="width: 110px;"
              v-model="deliveryUnit"
              disable
            />
            <SInput
              label-text="Content"
              :options="searches.store"
              style="width: 85px; "
              v-model="dataTable.endkum"
              disable
            />
            <SInput
              unelevated
              label-text="Delivery Unit Quantity"
              style="width: 157px; marginRight: 20px"
              v-model="DeliveryUnitQuantity"
              :disable="typeDisable"
              @blur="unitQuantity"
            />
            <SInput
              label-text="Mess Unit Quantity"
              style="width: 155px; marginRight: 20px"
              v-model="messUnitQuantity"
              :disable="typeDisable"
            />
            <SInput
              label-text="Unit Price"
              :options="searches.store"
              style="width: 182px; marginRight: 20px"
              v-model="dataTable.rechnungspreis"
              disable
            />
            <SInput
              label-text="Amount"
              :options="searches.store"
              style="width: 182px; marginRight: 20px"
              v-model="dataTable.warenwert"
              disable
            />
            <q-btn
              unelevated
              color="primary"
              max-height="10"
              label="Return"
              style="width: 90px; marginTop: 25px; height: 25px;"
              @click="Clickreturn"
              :disable="typeDisable"
            />
          </div>
          <q-card-actions align="right">
              <span style="marginRight: 100px">
                Total Amount Return:
              </span>
              <span>
                1.000.000
              </span>
          </q-card-actions>
          <q-table
            @row-click="onRowClick2"
            dense
            class="my-sticky-virtscroll-table"
            :columns="tableHeaders"
            :data="data"
            separator="cell"
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            hide-bottom
            row-key="index"
          >
            <template #header-cell-fibukonto="props">
              <q-th :props="props" class="fixed-col left">{{ props.col.label }}</q-th>
            </template>

            <template #body-cell-fibukonto="props">
              <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto }}</q-td>
            </template>

            <template #header-cell-actions="props">
              <q-th :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props" class="fixed-col right">
                <q-icon name="mdi-dots-vertical" size="16px">
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
    </div>
    </div>
    <div class="col-1">
    <q-separator />

      <q-card-actions align="right">
         <q-btn
          outline
          color="primary"
          label="Cancel"
          style="width: 100px; height: 25px; marginRight: 20px; marginTop: 10px"
        />
        <q-btn
          color="primary"
          label="save"
          style="width: 100px; height: 25px; marginRight: 50px; marginTop: 10px"
          @click="saveReturn"
        />
      </q-card-actions>
  
    </div>
    </div>
    <div>
      <q-dialog v-model="dialogModel">
        <q-card style="width: 500px;">
            <q-toolbar>
                <q-toolbar-title 
                  class="text-white text-weight-medium">
                  Select Delivery Number
                </q-toolbar-title>
             </q-toolbar>
                <q-card-section>
                  <q-table
                    dense
                    class="my-sticky-virtscroll-table"
                    :columns="DeliveryNumber"
                    :data="dataDeliveryNumber"
                    separator="cell"
                    :rows-per-page-options="[0]"
                    :pagination.sync="pagination"
                    :virtual-scroll-sticky-size-start="48"
                    hide-bottom
                    @row-click="onRowClick"
                    row-key="index"
                  />
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                  <q-btn label="Cancel" style="height: 30px" color="primary" @click="onClickCencelDeliveryNumber"/>
                  <q-btn unelevated color="primary" label="OK" style="height: 30px" @click="onClickDeliveryNumber" />
                </q-card-actions>
          </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="modalReturn" persistent>
        <q-card style="min-width: 350px">
           <q-toolbar>
                <q-toolbar-title 
                  class="text-white text-weight-medium">
                  Stock Return
                </q-toolbar-title>
             </q-toolbar>
          <q-card-section>
            <div class="text-h8">Enter Cencel Reason</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            <q-input dense v-model="reasson" autofocus @keyup.enter="prompt = false" />
          </q-card-section>
  
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Ok" v-close-popup @click="enterCencelReason"/>
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
  toRefs,
  reactive,
  watch
} from '@vue/composition-api';
import { Notify } from 'quasar';
import { tableHeaders, DeliveryNumber } from './tables/IncomingStock.tables';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: false,
      data: [],
      dataDeliveryNumber: [],
      searches: {
        departments: [],
        store: [],
      },
      checkPermission: false,
      prepare: {},
      dialogModel: false,
      storageNumber: '',
      deliveryNumber: '',
      documentNumber: '',
      itemSelected : '',
      deliveryUnit: '',
      tLOrderhdr: [],
      content: '',
      popUp: false,
      dataPopup: '',
      dataTable: [],
      modalReturn: false,
      DeliveryUnitQuantity: '',
      messUnitQuantity: '',
      typeDisable: true,
      reasson: ''
    });

    onMounted( async() => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoredCommon('checkPermission', {
        arrayNr: "39",
        expectedNr: "2"
      })])
      state.checkPermission = GET_DATA[0].zugriff;
      //  zugriff = true, maka user boleh melanjutkan ke transaksi, 
      // output webservice zugriff = false, maka tampilkan pesan 
      // “Sorry, no access right” lalu tidak perlu melanjutkan ke proses berikutnya.
    });

    watch(async() => {
      const labelStoredwithPO = localStorage.getItem('labelStoredwithPO')
      const docuNR = JSON.parse(labelStoredwithPO || '{}')
      const [GET_DATA] = await Promise.all([
          $api.inventory.apiStoredwithPO('pchaseStockInReturnPrepare', {
            bedienerPermissions: '',
            docuNr: docuNR['docu-nr']
      }),
      ])
      state.prepare = GET_DATA
      console.log('sukses', GET_DATA)
      state.tLOrderhdr = GET_DATA.tLOrderhdr['t-l-orderhdr']
      state.data = GET_DATA.tLArtikel['t-l-artikel'].map((item, i) =>
      Object.assign({}, item, GET_DATA.tLOrder['t-l-order'][i]))
    })

    watch(() => state.prepare, 
      async () => {
              const [GET_DATA] = await Promise.all([
                $api.inventory.apiStoredwithPO('poDeliverNote', {
                  docuNr: state.tLOrderhdr[0]['docu-nr']
                })
              ])
              state.dataDeliveryNumber = GET_DATA.delivernoteList['delivernote-list']  
        }
    )

    const dialogDeliveryNumber = () => {
      state.dialogModel = true
    }

    const onClickDeliveryNumber = async () => {
      state.dialogModel = false
      const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnLscheinnr', {
          docuNr: state.documentNumber,
          lscheinnr: state.deliveryNumber
        })])
        if (GET_DATA.errCode == 1) {
          Notify.create({
          message: 'No such document number',
          color: 'red',
        })
        }
    }

    const onClickCencelDeliveryNumber = () => {
      state.dialogModel = false
      state.deliveryNumber = ''
      state.storageNumber = ''
    }
    
    const storageNumber = async (rowClick) => {
        const [GET_DATA] = await Promise.all([
          $api.inventory.apiStoredwithPO('pchaseStockInReturnSelectSchein', {
          lOrderhdrDocuNr: state.tLOrderhdr[0]['docu-nr'],
          lOrderhdrLiefNr: state.tLOrderhdr[0]['lief-nr'],
          docuNr: rowClick['docu-nr'],
          lscheinnr : rowClick.lscheinnr
        })])
        state.storageNumber = GET_DATA.currLager+"." +GET_DATA.lagerBezeich
        state.deliveryNumber = rowClick.lscheinnr
        state.documentNumber = rowClick['docu-nr']
    }

    const onRowClick = (e, rowClick) => {
        storageNumber(rowClick)  
      }
    
    const onRowClick2 = (p, val) => {
        if (state.deliveryNumber !== '') {
        state.typeDisable = false
        state.dataTable = val
        state.deliveryUnit = val['lief-fax'][2]
        state.itemSelected = val.artnr + ' - ' + val.bezeich
        }
      };


    const returnBarang = async () => {
        const [GET_DATA] = await Promise.all([
          $api.inventory.apiStoredCommon('getHTParam0', {
            casetype: 1,
            inpParam: 232
          })
        ])
        if (GET_DATA.flogical == "false") {
            state.modalReturn = true
        } else {
          Notify.create({
          message: 'Inventory is running, posting not possible',
          color: 'red',
        })
        }
    }
    const Clickreturn = () => {
      returnBarang()
    }

    const cencelReason = async () => {
     const closeDate = state.dataTable['endkum'] <= 2 ? state.prepare['p224'] : state.prepare['p221']
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnQty', {
            transdate: state.prepare['p474'],
            closedate: closeDate,
            sArtnr: state.dataTable['artnr'],
            currLager: state.storageNumber.substring(0, state.storageNumber.indexOf('.')),
            qty: state.DeliveryUnitQuantity
        }),
        $api.inventory.apiStoredwithPO('pchaseStockInReturnSave', {
          lOrderRecId: state.tLOrderhdr[0]['rec-id'],
          sArtnr: state.dataTable['artnr'],
          docuNr: state.tLOrderhdr[0]['docu-nr'],
          exchgRate: state.prepare['exchgRate'],
          priceDecimal: state.prepare['priceDecimal'],
          liefNr: state.tLOrderhdr[0]['lief-nr'],
          currLager: state.storageNumber.substring(0, state.storageNumber.indexOf('.')),
          lscheinnr: state.deliveryNumber,
          fEndkum: state.prepare['fEndkum'],
          bEndkum: state.prepare['bEndkum'],
          mEndkum: state.prepare['mEndkum'],
          billdate: state.prepare['billdate'],
          fbClosedate: state.prepare['fbClosedate'],
          mClosedate: state.prepare['mClosedate'],
          reason: state.reasson,
          userInit: "01",
          qty: state.DeliveryUnitQuantity,
          price: state.DeliveryUnitQuantity,
          amount: state.dataTable['rechnungspreis'],
          tAmount: state.dataTable['warenwert']
        })
      ])
    }

    const unitQuantity = () => {
       if(state.dataTable['anzahl'] < state.DeliveryUnitQuantity) {
        state.popUp = true
        state.dataPopup = 'Wrong quantity'
         Notify.create({
          message: 'Wrong quantity',
          color: 'red',
         })
      }
    }

    const enterCencelReason = () => {
      cencelReason()
    }
    const saveData = async () => {
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnUpdateAP', {
          docuNr: state.tLOrderhdr[0]['docu-nr'],
          tAmount: state.dataTable['rechnungspreis'],
          liefNr: state.tLOrderhdr[0]['lief-nr'],
          billdate: state.prepare['billdate'],
          lscheinnr: state.deliveryNumber,
          bedienerNr: "01"
        }),
        $api.inventory.apiStoredwithPO('pchaseStockInReturnReactiveOrder', {
          caseType: 0,
          docuNr: state.tLOrderhdr[0]['docu-nr']
        })
      ])
        console.log('12345', GET_DATA)
        console.log('12345', GET_DATA2)
        console.log('12345', state.data)
      
    }
    const saveReturn = () => {
      saveData()
    }
    return {
      ...toRefs(state),
      Clickreturn,
      enterCencelReason,
      unitQuantity,
      tableHeaders,
      onClickDeliveryNumber,
      onClickCencelDeliveryNumber,
      onRowClick,
      onRowClick2,
      dialogDeliveryNumber,
      DeliveryNumber,
      saveReturn,
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
  max-height: 10px;
  height: 10px
  
}
::v-deep .table-accounting-date {
  max-height: 50vh;
  height: 500px;
  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
  #input {
    width: 20px;
  }
}
</style>
