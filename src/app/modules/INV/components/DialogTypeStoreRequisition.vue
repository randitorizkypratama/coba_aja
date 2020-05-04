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
        <q-card style="width: 800px; max-width: 90vw;">
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
                v-model="main"
              />
              <SSelect
                style="margin-right: 10px; width: 180px"
                label-text="To Store"
                v-model="main"
              />
              <SSelect
                style="margin-right: 10px; width: 180px"
                label-text="Account"
                v-model="main"
              />
            </div>
            <div>
              <q-splitter v-model="splitterModel" style="height: 250px">
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
                          style="margin-right: 20px; width: 200px"
                          label-text="Account"
                          v-model="main"
                        />
                        <q-checkbox size="md" v-model="shape" val="xs" label="Size 'xs'" />
                      </div>
                      <SSelect style="width: 200px" label-text="Account" v-model="main" />
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <div class="row">
                        <div class="col">
                          <SSelect
                            style="margin-right: 20px; width: 200px"
                            label-text="Account"
                            v-model="main"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px"
                            label-text="Delivery Number"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px"
                            label-text="Delivery Number"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px"
                            label-text="Delivery Number"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px"
                            label-text="Delivery Number"
                            v-model="inputName"
                          />
                          <SInput
                            style="margin-right: 10px; width: 200px"
                            label-text="Delivery Number"
                            v-model="inputName"
                          />
                        </div>
                        <div class="col" style="marginLeft: -100px">
                          <q-table
                            class="my-sticky-virtscroll-table"
                            :columns="tableHeaders"
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
interface State {
  pagination: any;
  options: any;
  group: any;
  tab: any;
  splitterModel: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dialogTransfer: { type: Boolean, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
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
    });

    const tableHeaders = [
      {
        label: 'Date',
        field: 'DATE',
        name: 'DATE',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Delivery Number',
        field: 'st',
        name: 'st',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Delivery Number',
        field: 'st',
        name: 'st',
        align: 'left',
        sortable: false,
      },
      {
        label: 'Delivery Number',
        field: 'st',
        name: 'st',
        align: 'left',
        sortable: false,
      },
    ];

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
      tableHeaders,
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
  height: 410px;
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
