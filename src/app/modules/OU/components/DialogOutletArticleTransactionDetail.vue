<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 500px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">{{title}}</q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-table
          dense
          :loading="isLoading"
          :columns="tableHeaders"
          :data="dataDetail"
          separator="cell"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          hide-bottom>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="$emit('onDialog', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, computed, watch, reactive, toRefs,} from '@vue/composition-api';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';
import {displayTime} from '../utilsOU/utils';
import { date } from 'quasar';

interface State {
  isLoading: boolean;
  dataDetail: [];
  title: string;
}

export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dataSelected: {type: Object, required: true},
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
      dataDetail: [],
      title: '',
    });

    const fetchViewValues = (dataSelected) => {
        state.isLoading = true;
        state.dataDetail = [];

        const billdate = new Date(dataSelected.dbilldate);
        async function asyncCall() {
            const [data] = await Promise.all([
                $api.outlet.getOUCancelJournalDetail('cancelJournDispBill', {
                    rechNo: dataSelected.rechnr,
                    dept: dataSelected.dept,
                    billdate: date.formatDate(billdate, "MM/DD/YYYY")
                }),
            ]);

            if (data) {
                const charts = data || [];

                for (let i=0; i<charts.length; i++) {
                    // dataTablechartsDetail[i]["epreis"] = this.formatterMoney(dataTableDetail[i]["epreis"]);
                    // charts[i]["betrag"] = this.formatterMoney(dataTableDetail[i]["betrag"]);
                    // charts[i]["bill-datum"] = moment(dataTableDetail[i]["bill-datum"]).format(this.programProperties.formatDateRead);
                    charts[i]["bill-datum"] = date.formatDate(charts[i]["bill-datum"], 'DD/MM/YYYY');
                    charts[i]["zeit"] = displayTime(charts[i]["zeit"]);
                } 
                state.dataDetail = charts;
            }
            state.isLoading = false;
        }
        asyncCall();
    };

    watch(
      () => props.dataSelected, (dataSelected) => {
          if (dataSelected != undefined) {
              state.title = 'Restaurant Bill Detail #' + String(dataSelected.rechnr);
              fetchViewValues(dataSelected);
          }
      }
    );

    const dialogModel = computed({        
        get: () => props.dialog,
        set: (val) => {
            emit('onDialog', val);
        },
    });

    const tableHeaders = [
      {
            label: "ArtNo",
            field: "artnr",
            align: "right",
        },{
            label: "Qty", 
            field: "anzahl",
            align: "right",
        }, {
            label: "Description", 
            field: "bezeich",
            align: "left",
        }, {
            label: "Price", 
            field: "epreis",
            align: "right",
        }, {
            label: "Balance", 
            field: "betrag",
            align: "right",
            },{
            label: "No", 
            field: "waehrungsnr",
            align: "center",
        }, {
            label: "Bill Date", 
            field: "bill-datum",
            align: "left",
        },  {
            label: "Time", 
            field: "zeit",
            align: "left",
        }
    ];

    return {
      dialogModel,
      ...toRefs(state),
      tableHeaders,
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

.total-budget {
  border-radius: 4px;
  border: 1px solid $primary;

  span {
    display: inline-block;
    padding: 4px 11px;

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
