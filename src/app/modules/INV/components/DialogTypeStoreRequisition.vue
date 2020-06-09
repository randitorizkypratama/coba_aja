<template>
  <div>
    <div>
      <q-dialog v-model="dialog">
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
            <q-btn @click="close" label="cencel" />
            <q-btn @click="select" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="dialogTransfer">
        <q-card style="width: 820px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Inter Store Transfer</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <SInput
                style="margin-right: 10px; width: 180px"
                label-text="Delivery Number"
                v-model="inputName"
              />
              <SSelect
                style="margin-right: 10px; width: 180px"
                label-text="From Store"
                :options="header.fromStore"
                v-model="header.fromStore1"
              />
              <SSelect
                style="margin-right: 10px; width: 180px"
                label-text="To Store"
                :options="header.fromStore"
                v-model="header.toStore"
                :disabled="disableToStore"
              />
              <SSelect
                style="margin-right: 10px; width: 180px"
                label-text="Account"
                v-model="main"
                :disabled="disableAccount"
              />
            </div>
            <div>
              <q-splitter v-model="splitterModel" style="height: auto">
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
                    <q-tab-panel name="mails">
                      <div class="row">
                        <SSelect
                          style="margin-right: 20px; width: 300px"
                          label-text="Department"
                          v-model="header.department1"
                          :options="header.department"
                        />
                        <q-checkbox top-label label="Approve" v-model="val" />
                      </div>
                      <v-date-picker
                        mode="range"
                        v-model="date"
                        :columns="2"
                        :popover="{ visibility: 'click' }"
                      >
                        <SInput
                          style="width: 300px"
                          label-text="Date"
                          slot-scope="{ inputProps }"
                          placeholder="From - Until"
                          readonly
                          v-bind="inputProps"
                          clearable
                          @clear="date = null"
                        />
                      </v-date-picker>
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <div style="marginTop: -20px" class="row">
                        <div class="col">
                          <SSelect
                            style="margin-right: 20px; width: 200px"
                            label-text="Stock Articel Name"
                            v-model="main"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px; marginTop: -10px"
                            label-text="Unit And Content Per Unit"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px; marginTop: -10px"
                            label-text="Stock Onhand"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px; marginTop: -10px"
                            label-text="Quantity Mess Unit"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px; marginTop: -10px"
                            label-text="Price"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px; marginTop: -10px"
                            label-text="Amount"
                            v-model="inputName"
                          />
                          <q-btn
                            style="width: 200px; marginTop: -10px "
                            dense
                            color="primary"
                            label="Add"
                            @click="onSearch"
                          />
                        </div>
                        <div class="col" style="marginLeft: -100px">
                          <q-table
                            class="my-sticky-virtscroll-table"
                            :columns="tableDialogNew"
                            :data="data"
                            separator="cell"
                            :rows-per-page-options="[10, 13, 16]"
                            :virtual-scroll-sticky-size-start="48"
                            :pagination.sync="pagination"
                            hide-bottom
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
            <q-btn @click="close" label="cencel" />
            <q-btn @click="select1" color="primary" label="Select" />
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
} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { tableDialogNew } from '../tables/storeRequisition';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
interface State {
  pagination: any;
  options: any;
  group: any;
  tab: any;
  splitterModel: any;
  val: boolean;
  date: any;
  header: any;
}
setupCalendar({
  firstDayOfWeek: 2,
});
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dialogTransfer: { type: Boolean, required: true },
    disableAccount: { type: Boolean, required: true },
    disableToStore: { type: Boolean, required: true },
  },
  components: {
    'v-date-picker': DatePicker,
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      date: null,
      options: [
        { label: 'Transfer To Other Storage', value: '1' },
        { label: 'Outgoing / Consumed', value: '2', color: 'bat' },
      ],
      group: '',
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
        toStore: '',
        department1: '',
      },
    });

    onMounted(async () => {
      const data = await Promise.all([
        $api.inventory.storeRequestPrepare({
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
      // console.log('sukses123', data);
    });

    function select() {
      emit('select', false, state.group);
    }
    function close() {
      emit('close', false);
    }
    function select1() {
      emit('select1', false);
    }

    return {
      tableDialogNew,
      select1,
      select,
      close,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
.actualQuantity {
  margin-left: 28px;
}

.my-sticky-virtscroll-table {
  height: auto;
}

.my-sticky-virtscroll-table .q-table__top .q-table__bottom {
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
